import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GENAI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GENAI_MODEL = "gemini-2.0-flash";

function makeDemoPlaceholder(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024">
    <rect width="100%" height="100%" fill="#f5f6f8"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle"
      font-family="sans-serif" font-size="28" fill="#222">
      Aperçu démo — TryOn Guinée
    </text>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
      font-family="sans-serif" font-size="16" fill="#555">
      Ajoute ta clé serveur pour activer l'IA
    </text>
  </svg>`;
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { personImageBase64, personImageUrl, style, quality = "hd", watermark = false } = body || {};

    console.log("TryOn request received", { hasBase64: !!personImageBase64, hasUrl: !!personImageUrl, style });

    if (!personImageBase64 && !personImageUrl) {
      return new Response(
        JSON.stringify({ error: "Aucune image fournie" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GENAI_KEY = Deno.env.get('GENAI_API_KEY') || "";

    // Mode démo : pas de clé → placeholder
    if (!GENAI_KEY) {
      console.log("Demo mode: no API key configured");
      return new Response(
        JSON.stringify({ resultUrl: makeDemoPlaceholder(), meta: { demo: true } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Récupère l'image en base64
    let imageBase64 = personImageBase64 as string | undefined;
    if (!imageBase64 && personImageUrl) {
      console.log("Fetching image from URL");
      const r = await fetch(personImageUrl);
      const buf = await r.arrayBuffer();
      imageBase64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    }

    const prompt = `
Habiller la personne avec une ${style?.category || "abaya"} en ${style?.fabric || "bazin"} ${style?.color || "bleu"},
broderies ${style?.embroidery || "dorées"}, longueur ${style?.length || "cheville"}.
Conserver le visage, les cheveux et les mains visibles par-dessus, respecter la pose, plis réalistes, rendu studio propre.
    `.trim();

    console.log("Calling Gemini API with prompt:", prompt);

    const resp = await fetch(`${GENAI_URL}?key=${GENAI_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error("Gemini API error:", resp.status, err);
      return new Response(
        JSON.stringify({ error: "Erreur API IA", details: err }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await resp.json();
    console.log("Gemini API response received");

    const part = data?.candidates?.[0]?.content?.parts?.find((p: any) => p?.inlineData?.data);

    if (!part?.inlineData?.data) {
      console.error("No image in Gemini response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Pas d'image dans la réponse IA", raw: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const mime = part.inlineData.mimeType || "image/png";
    const b64 = part.inlineData.data;
    const dataUrl = `data:${mime};base64,${b64}`;

    console.log("Successfully generated image");

    return new Response(
      JSON.stringify({ 
        resultUrl: dataUrl, 
        width: 768,
        height: 1024,
        meta: { model: GENAI_MODEL, quality, watermark, demo: false } 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e: any) {
    console.error("Unexpected error:", e);
    return new Response(
      JSON.stringify({ error: e?.message || "Erreur inattendue" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
