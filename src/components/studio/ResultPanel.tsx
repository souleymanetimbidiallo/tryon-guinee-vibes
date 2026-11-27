"use client";

import { forwardRef, useState } from "react";
import { ASPECTS, SCENES, type Aspect, type Scene } from "@/lib/options";
import { Card, Chips, StepTitle } from "./ui";

export type Status = "idle" | "loading" | "done" | "error";

const ASPECT_CLASS: Record<Aspect, string> = {
  "3:4": "aspect-[3/4]",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "16:9": "aspect-video",
};

interface Props {
  status: Status;
  result: string | null;
  error: string | null;
  elapsed: number;
  beforeUrl: string | null;
  readyLabel: string | null;
  scene: Scene;
  onScene: (s: Scene) => void;
  sceneOriginalAllowed: boolean;
  aspect: Aspect;
  onAspect: (a: Aspect) => void;
  consent: boolean;
  onConsent: (v: boolean) => void;
  canGenerate: boolean;
  onGenerate: () => void;
  onSaveResult: (name: string) => Promise<void>;
  downloadName: string;
}

export const ResultPanel = forwardRef<HTMLDivElement, Props>(function ResultPanel(p, ref) {
  const [showBefore, setShowBefore] = useState(false);
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const done = p.status === "done" && p.result;
  const shown = done && showBefore && p.beforeUrl ? p.beforeUrl : p.result;

  return (
    <aside ref={ref} className="scroll-mt-6 lg:sticky lg:top-6 lg:self-start">
      <Card>
        <StepTitle n={3} title="Le rendu" />

        <div className="mt-4 space-y-4">
          <Chips
            label="Décor"
            value={p.scene}
            onChange={p.onScene}
            options={Object.fromEntries(
              Object.entries(SCENES).map(([k, v]) => [k, v.label]),
            ) as Record<Scene, string>}
            disabled={{ original: !p.sceneOriginalAllowed }}
          />
          <Chips label="Format" value={p.aspect} onChange={p.onAspect} options={ASPECTS} />
        </div>

        <div
          className={`relative mx-auto mt-5 flex max-h-[70vh] items-center justify-center overflow-hidden rounded-2xl bg-background ${ASPECT_CLASS[p.aspect]}`}
        >
          {done ? (
            // eslint-disable-next-line @next/next/no-img-element -- image data: générée
            <img src={shown!} alt="Rendu généré" className="h-full w-full object-contain" />
          ) : p.status === "loading" ? (
            <div className="px-6 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
              <p className="mt-4 font-medium">L&apos;IA prépare ton image…</p>
              <p className="mt-1 text-sm text-muted">{p.elapsed}s — compte 10 à 30 secondes</p>
            </div>
          ) : (
            <p className="px-6 text-center text-sm text-muted">
              {p.readyLabel ?? "Choisis qui porte la tenue et quelle tenue pour voir le rendu ici."}
            </p>
          )}
        </div>

        {p.error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">
            {p.error}
          </p>
        )}

        {done && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {p.beforeUrl && (
              <button
                type="button"
                onClick={() => setShowBefore((v) => !v)}
                className="rounded-full border border-border px-4 py-2.5 text-sm font-medium transition hover:border-foreground"
              >
                {showBefore ? "Voir le rendu" : "Voir avant"}
              </button>
            )}
            <a
              href={p.result!}
              download={p.downloadName}
              className={`rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-accent-strong ${
                p.beforeUrl ? "" : "col-span-2"
              }`}
            >
              Télécharger
            </a>

            {saved ? (
              <p className="col-span-2 text-center text-sm text-gn-green">
                Ajouté à « Mes personnages » ✓
              </p>
            ) : naming ? (
              <form
                className="col-span-2 flex gap-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await p.onSaveResult(name);
                  setSaved(true);
                  setNaming(false);
                }}
              >
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom du personnage"
                  maxLength={40}
                  className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
                >
                  OK
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setNaming(true)}
                className="col-span-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition hover:border-foreground"
              >
                Enregistrer comme personnage
              </button>
            )}
          </div>
        )}

        <label className="mt-5 flex items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={p.consent}
            onChange={(e) => p.onConsent(e.target.checked)}
            className="mt-0.5 accent-[var(--accent)]"
          />
          <span>
            J&apos;accepte que les images choisies soient envoyées au service d&apos;IA (Google
            Gemini) pour générer le rendu. Elles ne sont pas conservées sur nos serveurs.
          </span>
        </label>
        <button
          type="button"
          disabled={!p.canGenerate}
          onClick={() => {
            setShowBefore(false);
            setSaved(false);
            setNaming(false);
            setName("");
            p.onGenerate();
          }}
          className="mt-4 w-full rounded-full bg-accent px-6 py-3 font-medium text-white transition enabled:hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          {p.status === "loading" ? "Génération…" : done ? "Régénérer" : "Générer"}
        </button>
      </Card>
    </aside>
  );
});
