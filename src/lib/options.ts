/**
 * Options partagées client / serveur. Le serveur n'accepte QUE ces valeurs
 * (liste blanche) : aucun texte libre de l'utilisateur ne va dans le prompt,
 * sauf la note de tenue, bornée en longueur.
 */

export const SCENES = {
  original: { label: "Décor d'origine", prompt: "Conserver le décor d'origine de la photo." },
  studio: { label: "Studio", prompt: "Fond de studio uni et clair, éclairage doux de photographe de mode." },
  conakry: {
    label: "Rue de Conakry",
    prompt: "Décor extérieur : une rue animée de Conakry en fin d'après-midi, lumière dorée, arrière-plan légèrement flou.",
  },
  ceremonie: {
    label: "Cérémonie",
    prompt: "Décor : salle de cérémonie guinéenne (mariage ou baptême) élégante, lumière chaude, arrière-plan flou.",
  },
  fouta: {
    label: "Fouta-Djalon",
    prompt: "Décor extérieur : paysage verdoyant du Fouta-Djalon, collines et cascade au loin, lumière naturelle.",
  },
} as const;
export type Scene = keyof typeof SCENES;

export const ASPECTS = {
  "3:4": "Portrait 3:4",
  "9:16": "Story / Reels 9:16",
  "1:1": "Carré 1:1",
  "16:9": "Paysage 16:9",
} as const;
export type Aspect = keyof typeof ASPECTS;

export const MANNEQUIN = {
  gender: { female: "Femme", male: "Homme" },
  skin: {
    "tres-fonce": "Teint très foncé",
    fonce: "Teint foncé",
    moyen: "Teint métissé",
    clair: "Teint clair",
  },
  body: { mince: "Silhouette mince", moyenne: "Silhouette moyenne", ronde: "Silhouette ronde" },
  age: { "20-30": "20–30 ans", "30-45": "30–45 ans", "45-60": "45–60 ans" },
  pose: {
    face: "Debout, de face",
    "trois-quarts": "De trois-quarts",
    marche: "En marche",
  },
} as const;

export type Mannequin = { [K in keyof typeof MANNEQUIN]: keyof (typeof MANNEQUIN)[K] };

export const DEFAULT_MANNEQUIN: Mannequin = {
  gender: "female",
  skin: "fonce",
  body: "moyenne",
  age: "20-30",
  pose: "face",
};

export const GARMENT_NOTE_MAX = 300;

export function isKeyOf<T extends object>(obj: T, key: unknown): key is keyof T {
  return typeof key === "string" && Object.hasOwn(obj, key);
}
