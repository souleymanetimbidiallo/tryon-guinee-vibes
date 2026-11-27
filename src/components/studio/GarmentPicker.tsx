"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GARMENT_NOTE_MAX } from "@/lib/options";
import { CATEGORY_LABELS, GENDER_LABELS, STYLES, type Gender, type Style } from "@/lib/styles";
import { Card, DropZone, StepTitle, Tabs } from "./ui";

export type WhatMode = "catalogue" | "custom";

const WHAT_TABS: Record<WhatMode, string> = {
  catalogue: "Catalogue",
  custom: "Ma tenue",
};

const SWATCHES: Record<string, string> = {
  "bleu roi": "#1f3fa8",
  bordeaux: "#6d1a2a",
  "vert émeraude": "#0f7a52",
  multicolore: "conic-gradient(#ce1126, #fcd116, #009460, #1f3fa8, #ce1126)",
  indigo: "#2b2f6b",
  blanc: "#f4f1ea",
  "blanc cassé": "#ece4d4",
  "bleu nuit": "#1b2340",
  violet: "#3b1f5e",
  ocre: "#d9822b",
  "bleu ciel": "#8fb3e8",
};

export function GarmentPicker(props: {
  mode: WhatMode;
  onMode: (m: WhatMode) => void;
  styleId: string | null;
  onStyle: (s: Style) => void;
  garmentPreview: string | null;
  onGarment: (f: File | undefined) => void;
  note: string;
  onNote: (n: string) => void;
}) {
  const [gender, setGender] = useState<Gender | "all">("all");
  const styles = useMemo(
    () =>
      gender === "all" ? STYLES : STYLES.filter((s) => s.gender === gender || s.gender === "unisex"),
    [gender],
  );

  return (
    <Card>
      <StepTitle n={2} title="Quelle tenue ?" />
      <Tabs value={props.mode} options={WHAT_TABS} onChange={props.onMode} />

      {props.mode === "catalogue" ? (
        <>
          <div className="mt-4 flex gap-2 text-sm">
            {(["all", "female", "male"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`rounded-full border px-3 py-1 transition ${
                  gender === g ? "border-foreground" : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {g === "all" ? "Tout" : GENDER_LABELS[g]}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {styles.map((s) => (
              <StyleCard
                key={s.id}
                style={s}
                selected={s.id === props.styleId}
                onSelect={() => props.onStyle(s)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <DropZone
            preview={props.garmentPreview}
            title="Photo de la tenue"
            hint="Posée à plat, sur cintre ou portée — bien éclairée, couleurs fidèles"
            onFile={props.onGarment}
          />
          <label className="mt-4 block text-sm font-medium" htmlFor="garment-note">
            Précisions (facultatif)
          </label>
          <textarea
            id="garment-note"
            value={props.note}
            maxLength={GARMENT_NOTE_MAX}
            onChange={(e) => props.onNote(e.target.value)}
            rows={2}
            placeholder="Ex. : bazin riche, longueur cheville, porté avec moussor assorti"
            className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-accent"
          />
          <p className="mt-1 text-right text-xs text-muted">
            {props.note.length}/{GARMENT_NOTE_MAX}
          </p>
        </>
      )}
    </Card>
  );
}

function StyleCard({
  style,
  selected,
  onSelect,
}: {
  style: Style;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group overflow-hidden rounded-2xl border-2 text-left transition ${
        selected ? "border-accent" : "border-transparent hover:border-border"
      }`}
    >
      <div className="relative aspect-[3/4] bg-background">
        {style.image || style.fabricImage ? (
          <Image
            src={(style.image ?? style.fabricImage)!}
            alt={style.label}
            fill
            sizes="(min-width: 640px) 200px, 45vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <span
              className="h-14 w-14 rounded-full border border-border"
              style={{ background: SWATCHES[style.color] ?? "#ccc" }}
            />
            <span className="text-xs text-muted">Aperçu à venir</span>
          </div>
        )}
        {!style.image && style.fabricImage && (
          <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            Tissu
          </span>
        )}
        {selected && (
          <span className="absolute top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-white">
            Choisi
          </span>
        )}
      </div>
      <div className="p-2.5">
        <p className="text-sm leading-tight font-medium">{style.label}</p>
        <p className="mt-0.5 text-xs text-muted">
          {CATEGORY_LABELS[style.category]} · {GENDER_LABELS[style.gender]}
        </p>
      </div>
    </button>
  );
}
