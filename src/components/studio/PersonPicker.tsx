"use client";

import type { Character } from "@/lib/characters-db";
import { MANNEQUIN, type Mannequin } from "@/lib/options";
import { Card, Chips, DropZone, StepTitle, Tabs, blobUrl } from "./ui";

export type WhoMode = "photo" | "personnage" | "mannequin";

const WHO_TABS: Record<WhoMode, string> = {
  photo: "Une photo",
  personnage: "Mes personnages",
  mannequin: "Mannequin IA",
};

export function PersonPicker(props: {
  mode: WhoMode;
  onMode: (m: WhoMode) => void;
  photoPreview: string | null;
  onPhoto: (f: File | undefined) => void;
  onSavePhoto: () => void;
  characters: Character[];
  characterId: string | null;
  onCharacter: (id: string) => void;
  onDeleteCharacter: (id: string) => void;
  mannequin: Mannequin;
  onMannequin: (m: Mannequin) => void;
}) {
  const { mode, mannequin, onMannequin } = props;

  return (
    <Card>
      <StepTitle n={1} title="Qui porte la tenue ?" />
      <Tabs value={mode} options={WHO_TABS} onChange={props.onMode} />

      {mode === "photo" && (
        <>
          <DropZone
            preview={props.photoPreview}
            title="Importer ou prendre une photo"
            hint="De face, bien éclairée, idéalement en pied"
            onFile={props.onPhoto}
          />
          {props.photoPreview && (
            <button
              type="button"
              onClick={props.onSavePhoto}
              className="mt-3 text-sm text-accent underline"
            >
              Enregistrer dans mes personnages
            </button>
          )}
        </>
      )}

      {mode === "personnage" &&
        (props.characters.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-background p-5 text-sm text-muted">
            Aucun personnage pour l&apos;instant. Importe une photo ou génère un mannequin, puis
            enregistre-le : tu pourras le réhabiller autant de fois que tu veux en gardant le même
            visage.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {props.characters.map((c) => (
              <div key={c.id} className="group relative">
                <button
                  type="button"
                  onClick={() => props.onCharacter(c.id)}
                  aria-pressed={c.id === props.characterId}
                  className={`block w-full overflow-hidden rounded-2xl border-2 text-left transition ${
                    c.id === props.characterId ? "border-accent" : "border-transparent hover:border-border"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- URL blob: locale */}
                  <img src={blobUrl(c.blob)} alt={c.name} className="aspect-[3/4] w-full object-cover" />
                  <span className="block truncate p-2 text-xs font-medium">{c.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Supprimer « ${c.name} » ?`)) props.onDeleteCharacter(c.id);
                  }}
                  aria-label={`Supprimer ${c.name}`}
                  className="absolute top-1.5 right-1.5 hidden h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white group-hover:flex"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))}

      {mode === "mannequin" && (
        <div className="mt-5 space-y-4">
          {(Object.keys(MANNEQUIN) as (keyof Mannequin)[]).map((key) => (
            <Chips
              key={key}
              label={MANNEQUIN_LABELS[key]}
              value={mannequin[key]}
              options={MANNEQUIN[key] as Record<string, string>}
              onChange={(v) => onMannequin({ ...mannequin, [key]: v })}
            />
          ))}
          <p className="text-xs text-muted">
            Astuce : enregistre le mannequin généré dans « Mes personnages » pour le réutiliser avec
            le même visage.
          </p>
        </div>
      )}
    </Card>
  );
}

const MANNEQUIN_LABELS: Record<keyof Mannequin, string> = {
  gender: "Genre",
  skin: "Teint",
  body: "Silhouette",
  age: "Âge",
  pose: "Pose",
};
