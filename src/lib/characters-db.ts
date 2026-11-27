/**
 * Galerie « Mes personnages », stockée dans le navigateur (IndexedDB).
 * Rien n'est envoyé au serveur tant qu'on ne lance pas une génération.
 * Limite : propre à ce navigateur / cet appareil.
 */

export interface Character {
  id: string;
  name: string;
  blob: Blob;
  createdAt: number;
}

const DB_NAME = "tryon-guinee";
const STORE = "characters";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await open();
  try {
    return await new Promise<T>((resolve, reject) => {
      const req = fn(db.transaction(STORE, mode).objectStore(STORE));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
}

export async function listCharacters(): Promise<Character[]> {
  const all = await run<Character[]>("readonly", (s) => s.getAll());
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export async function saveCharacter(name: string, blob: Blob): Promise<Character> {
  const character: Character = {
    id: crypto.randomUUID(),
    name: name.trim() || "Sans nom",
    blob,
    createdAt: Date.now(),
  };
  await run("readwrite", (s) => s.put(character));
  return character;
}

export async function deleteCharacter(id: string): Promise<void> {
  await run("readwrite", (s) => s.delete(id));
}

export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  return (await fetch(dataUrl)).blob();
}
