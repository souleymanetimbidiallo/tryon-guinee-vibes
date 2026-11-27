import { MANNEQUIN, SCENES, type Mannequin, type Scene } from "./options";
import { CATEGORY_LABELS, type Headwrap, type Style } from "./styles";

const HEADWRAPS: Record<Headwrap, string> = {
  "moussor-haut": "un moussor assorti noué haut sur la tête",
  "moussor-bas": "un moussor assorti noué bas",
  turban: "un turban assorti",
};

const SKIN: Record<Mannequin["skin"], string> = {
  "tres-fonce": "peau très foncée",
  fonce: "peau foncée",
  moyen: "peau métissée",
  clair: "peau claire",
};
const BODY: Record<Mannequin["body"], string> = {
  mince: "silhouette mince",
  moyenne: "silhouette moyenne",
  ronde: "silhouette ronde et généreuse",
};
const POSE: Record<Mannequin["pose"], string> = {
  face: "debout de face, en pied, regard vers l'objectif",
  "trois-quarts": "debout de trois-quarts, en pied, posture élégante",
  marche: "en train de marcher vers l'objectif, en pied, mouvement naturel du tissu",
};

export type Who =
  | { kind: "photo" }
  | { kind: "mannequin"; mannequin: Mannequin };

export type What =
  | { kind: "catalogue"; style: Style; hasReference: boolean; hasFabric: boolean }
  | { kind: "custom"; note?: string };

export interface PromptInput {
  who: Who;
  what: What;
  scene: Scene;
}

/**
 * Seule source de vérité pour le prompt. Les images sont envoyées dans cet ordre :
 * [photo de la personne si who=photo] puis [photo de la tenue si elle existe].
 */
export function buildPrompt({ who, what, scene }: PromptInput): string {
  const lines: string[] = ["Tu es un outil de stylisme virtuel spécialisé dans la mode guinéenne."];

  // --- Numérotation des images
  let n = 0;
  const personImg = who.kind === "photo" ? ++n : null;
  const garmentImg =
    (what.kind === "catalogue" && what.hasReference) || what.kind === "custom" ? ++n : null;
  const fabricImg = what.kind === "catalogue" && what.hasFabric ? ++n : null;

  // --- Qui
  if (who.kind === "photo") {
    lines.push(`L'image ${personImg} est la personne à habiller.`);
  } else {
    const m = who.mannequin;
    lines.push(
      `Génère ${m.gender === "female" ? "une mannequin femme" : "un mannequin homme"} adulte d'Afrique de l'Ouest, ` +
        `${MANNEQUIN.age[m.age]}, ${SKIN[m.skin]}, ${BODY[m.body]}, ${POSE[m.pose]}. ` +
        `Visage naturel et réaliste, pas une célébrité.`,
    );
  }

  // --- Quoi
  if (what.kind === "catalogue") {
    const s = what.style;
    const cut =
      s.gender === "male"
        ? "coupe masculine adaptée à la morphologie"
        : s.gender === "female"
          ? "coupe féminine (taille marquée, aisance aux hanches)"
          : "coupe unisexe droite";
    const head =
      s.gender === "female" && s.headwrap ? ` Ajoute ${HEADWRAPS[s.headwrap]}.` : "";
    const garment = [
      `${CATEGORY_LABELS[s.category].toLowerCase()} en ${s.fabric} ${s.color}`,
      s.embroidery ? `avec broderies ${s.embroidery}` : "",
      `longueur ${s.length}`,
      cut,
    ]
      .filter(Boolean)
      .join(", ");
    lines.push(`Tenue : ${garment}.${head}`);
    if (garmentImg) {
      lines.push(
        `L'image ${garmentImg} montre la tenue de référence : reproduis fidèlement CE vêtement ` +
          `(coupe, couleur, motifs, emplacement des broderies).`,
      );
    }
    if (fabricImg) {
      lines.push(
        `L'image ${fabricImg} est un échantillon du tissu : confectionne la tenue dans CE tissu exact. ` +
          `Reproduis fidèlement ses couleurs, ses motifs, l'échelle des motifs et sa texture ; ` +
          `n'invente pas d'autre motif.`,
      );
    }
  } else {
    lines.push(
      `L'image ${garmentImg} montre le vêtement à faire porter (il peut être posé à plat, sur cintre ou porté). ` +
        `Reproduis-le fidèlement : coupe, couleur exacte, motifs du tissu, broderies et finitions.`,
    );
    if (what.note) lines.push(`Précisions sur la tenue : ${what.note}`);
  }

  if (garmentImg) {
    lines.push(
      `N'utilise jamais le visage ni le corps d'une personne présente sur l'image ${garmentImg}.`,
    );
  }

  // --- Contraintes
  const rules =
    who.kind === "photo"
      ? [
          "Conserver exactement le visage, l'identité, la carnation, la coiffure et l'expression de la personne.",
          "Conserver la pose et les proportions du corps ; les mains restent visibles par-dessus le vêtement.",
          "Remplacer uniquement les vêtements.",
        ]
      : ["La personne doit être un adulte, entièrement habillé de façon élégante et pudique."];

  lines.push(
    "",
    "Contraintes impératives :",
    ...rules.map((r) => `- ${r}`),
    "- Plis et tombé réalistes, texture du tissu crédible.",
    `- ${SCENES[scene].prompt}`,
    "- Rendu photo réaliste, qualité magazine de mode. Aucun texte, logo ni filigrane.",
  );

  return lines.join("\n");
}
