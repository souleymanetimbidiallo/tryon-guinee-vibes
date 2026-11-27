/**
 * Redimensionne une photo côté navigateur avant l'envoi :
 * plus rapide à transférer et sous la limite de 4,5 Mo de Vercel.
 * Corrige aussi l'orientation EXIF (photos de smartphone).
 */
export async function resizeImage(file: File, maxSide = 1536, quality = 0.9): Promise<File> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponible");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
  if (!blob) throw new Error("Conversion de l'image impossible");
  return new File([blob], "photo.jpg", { type: "image/jpeg" });
}
