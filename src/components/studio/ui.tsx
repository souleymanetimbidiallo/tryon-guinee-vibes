"use client";

import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5 md:p-6">{children}</section>
  );
}

export function StepTitle({ n, title, children }: { n: number; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="flex items-center gap-3 text-lg font-semibold">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm text-background">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function Tabs<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Record<T, string>;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mt-4 flex gap-1 overflow-x-auto rounded-full bg-background p-1 text-sm">
      {(Object.keys(options) as T[]).map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          className={`flex-1 rounded-full px-3 py-2 whitespace-nowrap transition ${
            value === k ? "bg-foreground text-background" : "text-muted hover:text-foreground"
          }`}
        >
          {options[k]}
        </button>
      ))}
    </div>
  );
}

export function Chips<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: T;
  options: Record<T, string>;
  onChange: (v: T) => void;
  disabled?: Partial<Record<T, boolean>>;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(options) as T[]).map((k) => (
          <button
            key={k}
            type="button"
            disabled={disabled?.[k]}
            onClick={() => onChange(k)}
            aria-pressed={value === k}
            className={`rounded-full border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
              value === k
                ? "border-accent bg-accent text-white"
                : "border-border hover:border-foreground"
            }`}
          >
            {options[k]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function DropZone({
  preview,
  title,
  hint,
  onFile,
}: {
  preview: string | null;
  title: string;
  hint: string;
  onFile: (f: File | undefined) => void;
}) {
  return (
    <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border p-6 text-center transition hover:border-accent">
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element -- URL blob: locale
        <img src={preview} alt="" className="max-h-72 rounded-xl object-contain" />
      ) : (
        <>
          <span className="text-4xl" aria-hidden>
            📷
          </span>
          <span className="font-medium">{title}</span>
          <span className="text-sm text-muted">{hint}</span>
        </>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => {
          onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {preview && <span className="text-sm text-accent underline">Changer d&apos;image</span>}
    </label>
  );
}

const urlCache = new WeakMap<Blob, string>();

/**
 * URL d'aperçu pour un Blob, mise en cache par Blob.
 * Les URL ne sont pas révoquées : la galerie reste petite et ça évite
 * les images cassées avec le double montage de React en dev.
 */
export function blobUrl(blob: Blob): string {
  let url = urlCache.get(blob);
  if (!url) {
    url = URL.createObjectURL(blob);
    urlCache.set(blob, url);
  }
  return url;
}
