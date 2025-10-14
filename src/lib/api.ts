import { TryOnBody, TryOnResponse } from "./types";
import { buildPrompt } from "./prompt";

const DEMO_MODE = true; // Set to false when real API is available

export async function tryOnAPI(body: TryOnBody): Promise<TryOnResponse> {
  // In demo mode, simulate API delay and return the original image with overlay text
  if (DEMO_MODE) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo, return the original image as result
        // In production, this would call the real AI API
        const resultUrl = body.personImageBase64 || body.personImageUrl || "";
        
        resolve({
          resultUrl,
          width: 1024,
          height: 1024,
          meta: {
            demo: true,
            prompt: buildPrompt(body.style as any),
            style: body.style,
          },
        });
      }, 2000); // Simulate 2s processing
    });
  }

  // Real API call (when API key is available)
  try {
    const response = await fetch("/api/tryon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: TryOnResponse = await response.json();
    return data;
  } catch (error) {
    console.error("TryOn API error:", error);
    throw error;
  }
}

export function createDownloadUrl(url: string): string {
  // In demo mode, return the URL as-is for direct download
  if (DEMO_MODE) {
    return url;
  }

  // In production, call sign-download endpoint
  return `/api/sign-download?url=${encodeURIComponent(url)}`;
}

export function downloadImage(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
