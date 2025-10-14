import { Style, StyleCategory } from "./types";

export function buildPrompt(style: Style | Style['category']): string {
  const styleData = typeof style === "string" 
    ? { category: style } 
    : style;

  const { category, fabric, color, embroidery, length, headwrap } = styleData as any;

  const baseInstruction = "Conserver le visage, les cheveux et les mains visibles par-dessus, respecter la pose exacte, plis réalistes, éclairage studio naturel, rendu professionnel.";

  switch (category) {
    case "abaya":
      return `Habiller la personne avec une abaya ${fabric ? `en ${fabric}` : ""} ${color || ""}, coupe évasée ${length || "à la cheville"}, ${embroidery ? `broderies ${embroidery} sur col et poignets` : "finitions élégantes"}${headwrap ? `, ${headwrapDescription(headwrap)}` : ""}. ${baseInstruction}`;

    case "boubou":
      return `Grand boubou ${color || "traditionnel"} ${fabric ? `en ${fabric}` : ""}, ${embroidery ? `broderies ${embroidery}` : "broderies poitrine"}, coupe ample ${length || "longue"}, tombé majestueux. ${baseInstruction}`;

    case "pagne":
      return `Ensemble pagne ${fabric ? `${fabric}` : "wax"} ${color ? `motif ${color}` : "motifs traditionnels"}, longueur ${length || "genou"}, haut assorti, plis naturels${headwrap ? `, ${headwrapDescription(headwrap)}` : ""}. ${baseInstruction}`;

    case "leppi":
      return `Ensemble léppi ${color ? `${color}` : "indigo"} à rayures traditionnelles, coupe ${length || "longue"}, tissage authentique, tombé élégant. ${baseInstruction}`;

    default:
      return `Habiller la personne avec une tenue traditionnelle guinéenne ${color || ""}, finitions soignées, tombé naturel. ${baseInstruction}`;
  }
}

function headwrapDescription(headwrap: string): string {
  switch (headwrap) {
    case "moussor-haut":
      return "moussor élégant noué haut sur la tête";
    case "moussor-bas":
      return "moussor traditionnel noué bas";
    case "turban":
      return "turban coloré assorti";
    default:
      return "";
  }
}
