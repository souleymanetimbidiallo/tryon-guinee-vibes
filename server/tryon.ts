import 'dotenv/config';
import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:8080" })); 
app.use(express.json({ limit: "15mb" }));

const { GENAI_API_URL, GENAI_API_KEY, GENAI_MODEL = "gemini-2.5-flash-image-preview" } = process.env;

console.log(
  "[TryOn API] model=%s urlModelPath=%s key=%s",
  process.env.GENAI_MODEL,
  process.env.GENAI_API_URL?.split("/models/")[1],
  process.env.GENAI_API_KEY ? process.env.GENAI_API_KEY.slice(0,6) + "****" : "ABSENTE"
);


function makeDemo() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='768' height='1024'>
    <rect width='100%' height='100%' fill='#f5f6f8'/>
    <text x='50%' y='50%' text-anchor='middle' font-family='sans-serif' font-size='24' fill='#222'>
      Démo TryOn Guinée (ajoute GENAI_API_KEY côté serveur)
    </text></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

app.post("/api/tryon", async (req, res) => {
  try {
    const { personImageBase64, personImageUrl, style, quality = "hd", watermark = false } = req.body || {};
    if (!personImageBase64 && !personImageUrl) return res.status(400).json({ error: "Aucune image fournie" });

    // Mode démo si pas de clé
    if (!GENAI_API_KEY) return res.json({ resultUrl: makeDemo(), meta: { demo: true } });

    let base64 = personImageBase64 as string | undefined;
    if (!base64 && personImageUrl) {
      const r = await fetch(personImageUrl);
      const buf = Buffer.from(await r.arrayBuffer());
      base64 = buf.toString("base64");
    }

    const prompt = `Habiller la personne avec une ${style?.category || "abaya"} en ${style?.fabric || "bazin"} ${style?.color || "bleu"},
    broderies ${style?.embroidery || "dorées"}, longueur ${style?.length || "cheville"}.
    Conserver visage/cheveux/mains visibles, pose identique, plis réalistes, rendu studio propre.`;

    const resp = await fetch(`${GENAI_API_URL}?key=${GENAI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user",
          parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: base64 } }]
        }],
      }),
    });

    if (!resp.ok) return res.status(502).json({ error: "API IA error", details: await resp.text() });

    const data = await resp.json();
    const part = data?.candidates?.[0]?.content?.parts?.find((p: any) => p?.inlineData?.data);
    if (!part?.inlineData?.data) return res.status(500).json({ error: "Pas d'image IA", raw: data });

    const mime = part.inlineData.mimeType || "image/png";
    res.json({ resultUrl: `data:${mime};base64,${part.inlineData.data}`, meta: { model: GENAI_MODEL, quality, watermark } });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Unexpected error" });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`TryOn dev API running http://localhost:${PORT}/api/tryon`));
