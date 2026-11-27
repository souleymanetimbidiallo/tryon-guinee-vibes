"use client";

import { useEffect, useRef, useState } from "react";
import {
  type Character,
  dataUrlToBlob,
  deleteCharacter,
  listCharacters,
  saveCharacter,
} from "@/lib/characters-db";
import { DEFAULT_MANNEQUIN, MANNEQUIN, type Aspect, type Mannequin, type Scene } from "@/lib/options";
import { resizeImage } from "@/lib/resize-image";
import { STYLES, type Style } from "@/lib/styles";
import { GarmentPicker, type WhatMode } from "./GarmentPicker";
import { PersonPicker, type WhoMode } from "./PersonPicker";
import { ResultPanel, type Status } from "./ResultPanel";
import { blobUrl } from "./ui";

export function TryOnStudio() {
  // Qui
  const [whoMode, setWhoMode] = useState<WhoMode>("photo");
  const [photo, setPhoto] = useState<File | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterId, setCharacterId] = useState<string | null>(null);
  const [mannequin, setMannequin] = useState<Mannequin>(DEFAULT_MANNEQUIN);
  // Quoi
  const [whatMode, setWhatMode] = useState<WhatMode>("catalogue");
  const [styleId, setStyleId] = useState<string | null>(null);
  const [garment, setGarment] = useState<File | null>(null);
  const [note, setNote] = useState("");
  // Rendu
  const [scene, setScene] = useState<Scene>("original");
  const [aspect, setAspect] = useState<Aspect>("3:4");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const character = characters.find((c) => c.id === characterId) ?? null;
  const style = STYLES.find((s) => s.id === styleId) ?? null;

  const personBlob: Blob | null =
    whoMode === "photo" ? photo : whoMode === "personnage" ? (character?.blob ?? null) : null;
  const whoReady = whoMode === "mannequin" || Boolean(personBlob);
  const whatReady = whatMode === "catalogue" ? Boolean(style) : Boolean(garment);

  useEffect(() => {
    listCharacters()
      .then(setCharacters)
      .catch(() => setError("Galerie de personnages indisponible dans ce navigateur."));
  }, []);

  useEffect(() => {
    if (status !== "loading") return;
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 500);
    return () => clearInterval(id);
  }, [status]);

  async function readImage(file: File | undefined, set: (f: File) => void) {
    if (!file) return;
    setError(null);
    try {
      set(await resizeImage(file));
    } catch {
      setError("Impossible de lire cette image. Essaie une photo JPEG ou PNG.");
    }
  }

  function changeWho(mode: WhoMode) {
    setWhoMode(mode);
    if (mode === "mannequin" && scene === "original") setScene("studio");
  }

  function chooseStyle(s: Style) {
    setStyleId(s.id);
    if (s.gender === "female" || s.gender === "male") {
      setMannequin((m) => ({ ...m, gender: s.gender as Mannequin["gender"] }));
    }
  }

  async function addCharacter(name: string, blob: Blob) {
    try {
      const small = await resizeImage(new File([blob], "personnage", { type: blob.type }), 1280);
      const c = await saveCharacter(name, small);
      setCharacters((list) => [c, ...list]);
      return c;
    } catch {
      setError("Impossible d'enregistrer ce personnage.");
    }
  }

  async function generate() {
    if (!whoReady || !whatReady) return;
    setStatus("loading");
    setElapsed(0);
    setError(null);
    setResult(null);
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const body = new FormData();
    if (personBlob) body.append("photo", new File([personBlob], "personne.jpg", { type: personBlob.type }));
    else {
      for (const key of Object.keys(MANNEQUIN) as (keyof Mannequin)[]) {
        body.append(`m_${key}`, mannequin[key]);
      }
    }
    if (whatMode === "custom" && garment) {
      body.append("garment", garment);
      if (note.trim()) body.append("garmentNote", note.trim());
    } else if (style) {
      body.append("styleId", style.id);
    }
    body.append("scene", scene);
    body.append("aspect", aspect);

    try {
      const res = await fetch("/api/tryon", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.image) throw new Error(json.error || `Erreur ${res.status}`);
      setResult(json.image);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inattendue");
      setStatus("error");
    }
  }

  const readyLabel =
    whoReady && whatReady
      ? `Prêt : ${
          whoMode === "mannequin" ? "mannequin IA" : whoMode === "personnage" ? character?.name : "ta photo"
        } × ${whatMode === "catalogue" ? style?.label : "ta tenue"}`
      : null;

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
      <div className="space-y-8">
        <PersonPicker
          mode={whoMode}
          onMode={changeWho}
          photoPreview={photo ? blobUrl(photo) : null}
          onPhoto={(f) => readImage(f, setPhoto)}
          onSavePhoto={async () => {
            if (!photo) return;
            const name = prompt("Nom du personnage ?", "");
            if (name === null) return;
            const c = await addCharacter(name, photo);
            if (c) {
              setCharacterId(c.id);
              setWhoMode("personnage");
            }
          }}
          characters={characters}
          characterId={characterId}
          onCharacter={setCharacterId}
          onDeleteCharacter={async (id) => {
            await deleteCharacter(id).catch(() => {});
            setCharacters((list) => list.filter((c) => c.id !== id));
            if (characterId === id) setCharacterId(null);
          }}
          mannequin={mannequin}
          onMannequin={setMannequin}
        />

        <GarmentPicker
          mode={whatMode}
          onMode={setWhatMode}
          styleId={styleId}
          onStyle={chooseStyle}
          garmentPreview={garment ? blobUrl(garment) : null}
          onGarment={(f) => readImage(f, setGarment)}
          note={note}
          onNote={setNote}
        />
      </div>

      <ResultPanel
        ref={resultRef}
        status={status}
        result={result}
        error={error}
        elapsed={elapsed}
        beforeUrl={personBlob ? blobUrl(personBlob) : null}
        readyLabel={readyLabel}
        scene={scene}
        onScene={setScene}
        sceneOriginalAllowed={whoMode !== "mannequin"}
        aspect={aspect}
        onAspect={setAspect}
        consent={consent}
        onConsent={setConsent}
        canGenerate={whoReady && whatReady && consent && status !== "loading"}
        onGenerate={generate}
        onSaveResult={async (name) => {
          if (!result) return;
          await addCharacter(name, await dataUrlToBlob(result));
        }}
        downloadName={`tryon-guinee-${style?.id ?? "tenue"}.png`}
      />
    </div>
  );
}
