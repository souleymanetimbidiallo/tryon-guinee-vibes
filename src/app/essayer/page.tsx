import type { Metadata } from "next";
import { TryOnStudio } from "@/components/studio/TryOnStudio";

export const metadata: Metadata = {
  title: "Studio — TryOn Guinée",
};

export default function EssayerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <h1 className="font-display text-3xl font-semibold md:text-4xl">Studio</h1>
      <p className="mt-2 text-muted">Ta photo, un personnage ou un mannequin IA — habillé de la tenue de ton choix.</p>
      <TryOnStudio />
    </div>
  );
}
