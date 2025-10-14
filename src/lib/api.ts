import { TryOnBody, TryOnResponse } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function tryOnAPI(body: TryOnBody): Promise<TryOnResponse> {
  try {
    // Convert data URL to pure base64 if needed
    let base64Data = body.personImageBase64;
    if (base64Data && base64Data.includes(",")) {
      base64Data = base64Data.split(",")[1];
    }

    const response = await fetch(`${SUPABASE_URL}/functions/v1/tryon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        personImageBase64: base64Data,
        personImageUrl: body.personImageUrl,
        style: body.style,
        quality: body.quality || "hd",
        watermark: body.watermark || false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API error: ${response.status}`);
    }

    const data: TryOnResponse = await response.json();
    return data;
  } catch (error) {
    console.error("TryOn API error:", error);
    throw error;
  }
}

export function createDownloadUrl(url: string): string {
  // Data URLs can be downloaded directly
  return url;
}

export function downloadImage(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
