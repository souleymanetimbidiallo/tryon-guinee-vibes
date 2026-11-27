import { readFile } from "node:fs/promises";
import path from "node:path";
import { ApiError, GoogleGenAI } from "@google/genai";
import {
  ASPECTS,
  DEFAULT_MANNEQUIN,
  GARMENT_NOTE_MAX,
  MANNEQUIN,
  SCENES,
  isKeyOf,
  type Mannequin,
} from "@/lib/options";
import { buildPrompt, type What, type Who } from "@/lib/prompt";
import { rateLimit } from "@/lib/rate-limit";
import { getStyle } from "@/lib/styles";

export const maxDuration = 60;

const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // Vercel limite le corps des requêtes à ~4,5 Mo
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-image";

type Part = { text: string } | { inlineData: { mimeType: string; data: string } };

class BadRequest extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function fail(status: number, error: string, headers?: HeadersInit) {
  return Response.json({ error }, { status, headers });
}

function optionalImage(form: FormData, name: string): File | null {
  const value = form.get(name);
  if (value === null || value === "") return null;
  if (!(value instanceof File) || value.size === 0) throw new BadRequest(400, "Image invalide.");
  if (!ALLOWED_TYPES.has(value.type)) throw new BadRequest(415, "Format accepté : JPEG, PNG ou WebP.");
  return value;
}

function parseMannequin(form: FormData): Mannequin {
  const m = { ...DEFAULT_MANNEQUIN };
  for (const key of Object.keys(MANNEQUIN) as (keyof Mannequin)[]) {
    const v = form.get(`m_${key}`);
    if (v === null) continue;
    if (!isKeyOf(MANNEQUIN[key], v)) throw new BadRequest(400, "Option de mannequin invalide.");
    (m as Record<string, string>)[key] = v;
  }
  return m;
}

async function toPart(file: File | Buffer, mimeType = "image/jpeg"): Promise<Part> {
  const buf = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
  return {
    inlineData: { mimeType: file instanceof File ? file.type : mimeType, data: buf.toString("base64") },
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fail(503, "Service non configuré (GEMINI_API_KEY manquante).");

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return fail(429, "Trop d'essais. Réessaie un peu plus tard.", {
      "Retry-After": String(limit.retryAfter),
    });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Requête invalide.");
  }

  let who: Who;
  let what: What;
  const images: Part[] = [];

  try {
    // --- Qui porte la tenue
    const photo = optionalImage(form, "photo");
    who = photo ? { kind: "photo" } : { kind: "mannequin", mannequin: parseMannequin(form) };

    // --- Quelle tenue
    const garment = optionalImage(form, "garment");
    const style = getStyle(String(form.get("styleId") ?? ""));
    const note = String(form.get("garmentNote") ?? "").trim().slice(0, GARMENT_NOTE_MAX);

    if (garment) {
      what = { kind: "custom", note: note || undefined };
    } else if (style) {
      what = {
        kind: "catalogue",
        style,
        hasReference: Boolean(style.image),
        hasFabric: Boolean(style.fabricImage),
      };
    } else {
      throw new BadRequest(400, "Choisis une tenue du catalogue ou envoie une photo de tenue.");
    }

    if ((photo?.size ?? 0) + (garment?.size ?? 0) > MAX_TOTAL_BYTES) {
      throw new BadRequest(413, "Images trop lourdes (4 Mo au total).");
    }

    // L'ordre des images doit correspondre à la numérotation du prompt.
    if (photo) images.push(await toPart(photo));
    if (garment) images.push(await toPart(garment));
    else if (style) {
      for (const file of [style.image, style.fabricImage]) {
        if (file) images.push(await toPart(await readFile(path.join(process.cwd(), "public", file))));
      }
    }
  } catch (e) {
    if (e instanceof BadRequest) return fail(e.status, e.message);
    throw e;
  }

  const sceneRaw = form.get("scene");
  let scene = isKeyOf(SCENES, sceneRaw) ? sceneRaw : "studio";
  if (scene === "original" && who.kind !== "photo") scene = "studio";

  const aspectRaw = form.get("aspect");
  const aspectRatio = isKeyOf(ASPECTS, aspectRaw) ? aspectRaw : "3:4";

  const prompt = buildPrompt({ who, what, scene });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }, ...images] }],
      config: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio } },
    });

    const image = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)
      ?.inlineData;

    if (!image?.data) {
      console.warn("[tryon] pas d'image", response.candidates?.[0]?.finishReason, response.text);
      return fail(
        422,
        "L'IA n'a pas pu générer d'image. Essaie une autre photo ou une autre tenue.",
      );
    }

    return Response.json({ image: `data:${image.mimeType ?? "image/png"};base64,${image.data}` });
  } catch (e) {
    console.error("[tryon] erreur Gemini", e);
    if (e instanceof ApiError && e.status === 429) {
      return fail(503, "Le service est très sollicité. Réessaie dans un instant.");
    }
    return fail(502, "Erreur du service de génération.");
  }
}
