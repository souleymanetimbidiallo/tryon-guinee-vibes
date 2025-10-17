// src/lib/api.ts
import type { TryOnBody, TryOnResponse } from "./types";

// 1) Priorité à l'API locale (serveur Express): http://localhost:8787/api/tryon
// 2) Sinon fallback Supabase functions si VITE_SUPABASE_URL est défini
const LOCAL_API = import.meta.env.VITE_TRYON_API_URL || "http://localhost:8787/api/tryon";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function pickApiEndpoint() {
  // Si on a configuré VITE_TRYON_API_URL OU que le serveur local tourne, utilise-le
  if (LOCAL_API) return { url: LOCAL_API, headers: { "Content-Type": "application/json" } as Record<string, string> };
  // Sinon, tente Supabase (hébergé)
  if (SUPABASE_URL) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (SUPABASE_KEY) headers["Authorization"] = `Bearer ${SUPABASE_KEY}`;
    return { url: `${SUPABASE_URL}/functions/v1/tryon`, headers };
  }
  throw new Error("Aucune API configurée (VITE_TRYON_API_URL ou VITE_SUPABASE_URL).");
}

export async function tryOnAPI(body: TryOnBody): Promise<TryOnResponse> {
  // Nettoie le base64 si c'est un dataURL
  let base64 = body.personImageBase64;
  if (base64 && base64.includes(",")) base64 = base64.split(",")[1];

  const { url, headers } = pickApiEndpoint();

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      personImageBase64: base64,
      personImageUrl: body.personImageUrl,
      style: body.style,
      quality: body.quality || "hd",
      watermark: body.watermark || false,
    }),
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch {
    // no-op
  }

  if (!res.ok) {
    // Fais remonter l’erreur lisible
    const msg = json?.error || json?.details || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  if (!json?.resultUrl) {
    throw new Error("Pas d'image dans la réponse IA");
  }

  return json as TryOnResponse;
}

export function createDownloadUrl(url: string): string {
  return url; // data: URLs téléchargeables directement
}

export function downloadImage(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
