export type Gender = "female" | "male" | "unisex";

export type Category =
  | "abaya"
  | "boubou"
  | "pagne"
  | "leppi"
  | "complet"
  | "chemise"
  | "kaftan"
  | "robe";

export type Headwrap = "moussor-haut" | "moussor-bas" | "turban";

export interface Style {
  id: string;
  label: string;
  description: string;
  gender: Gender;
  category: Category;
  fabric: string;
  color: string;
  embroidery?: string;
  length: string;
  headwrap?: Headwrap;
  /** Photo d'une TENUE de référence dans /public — envoyée à l'IA en plus du texte. */
  image?: string;
  /** Photo d'un TISSU (échantillon) : l'IA confectionne la coupe décrite dans ce tissu. */
  fabricImage?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  abaya: "Abaya",
  boubou: "Boubou",
  pagne: "Pagne",
  leppi: "Léppi",
  complet: "Complet",
  chemise: "Chemise",
  kaftan: "Kaftan",
  robe: "Robe",
};

export const GENDER_LABELS: Record<Gender, string> = {
  female: "Femme",
  male: "Homme",
  unisex: "Unisexe",
};

export const STYLES: Style[] = [
  {
    id: "abaya-bazin-bleuroi",
    label: "Abaya Bazin Bleu Roi",
    description: "Abaya élégante en bazin bleu roi avec broderies dorées",
    gender: "female",
    category: "abaya",
    fabric: "bazin",
    color: "bleu roi",
    embroidery: "dorées",
    length: "cheville",
    headwrap: "moussor-haut",
    image: "/styles/abaya-bazin-bleuroi.jpg",
  },
  {
    id: "abaya-bordeaux-argent",
    label: "Abaya Bordeaux & Argent",
    description: "Abaya bordeaux aux broderies argentées",
    gender: "female",
    category: "abaya",
    fabric: "bazin",
    color: "bordeaux",
    embroidery: "argentées",
    length: "cheville",
    headwrap: "moussor-haut",
    image: "/styles/abaya-bordeaux-argent.jpg",
  },
  {
    id: "abaya-vert-or",
    label: "Abaya Bazin Vert Émeraude",
    description: "Abaya en bazin vert avec ornements dorés",
    gender: "female",
    category: "abaya",
    fabric: "bazin",
    color: "vert émeraude",
    embroidery: "dorées",
    length: "cheville",
    headwrap: "moussor-haut",
  },
  {
    id: "pagne-wax-classic",
    label: "Ensemble Pagne Wax",
    description: "Pagne coloré avec haut assorti et turban",
    gender: "female",
    category: "pagne",
    fabric: "wax",
    color: "multicolore",
    length: "genou",
    headwrap: "turban",
  },
  {
    id: "leppi-indigo-femme",
    label: "Léppi Indigo (Femme)",
    description: "Ensemble léppi du Fouta-Djalon, voile assorti",
    gender: "female",
    category: "leppi",
    fabric: "léppi (coton tissé en bandes et teint à l'indigo, rayures bleu clair sur fond bleu nuit)",
    color: "indigo",
    length: "longue",
    headwrap: "moussor-bas",
    fabricImage: "/tissus/leppi.jpg",
  },
  {
    id: "boubou-bazin-blanc-homme",
    label: "Grand Boubou Blanc",
    description: "Grand boubou blanc avec broderies dorées sur la poitrine",
    gender: "male",
    category: "boubou",
    fabric: "bazin",
    color: "blanc",
    embroidery: "dorées sur la poitrine",
    length: "longue",
    image: "/styles/boubou-bazin-blanc-homme.jpg",
  },
  {
    id: "boubou-bleu-or-homme",
    label: "Grand Boubou Bleu & Or",
    description: "Grand boubou bleu roi, plastron brodé or",
    gender: "male",
    category: "boubou",
    fabric: "bazin",
    color: "bleu roi",
    embroidery: "dorées en plastron et aux poignets",
    length: "longue",
    image: "/styles/boubou-bleu-or-homme.jpg",
  },
  {
    id: "boubou-indigo-homme",
    label: "Boubou Indigo & Argent",
    description: "Boubou majestueux indigo avec broderies argentées",
    gender: "male",
    category: "boubou",
    fabric: "bazin",
    color: "indigo",
    embroidery: "argentées",
    length: "longue",
    image: "/styles/boubou-indigo.jpg",
  },
  {
    id: "complet-bazin-3p",
    label: "Complet 3 pièces Bazin",
    description: "Tunique, pantalon et manteau long en bazin bleu nuit",
    gender: "male",
    category: "complet",
    fabric: "bazin",
    color: "bleu nuit",
    embroidery: "discrètes",
    length: "mi-longue",
    image: "/styles/complet-bazin-3p.jpg",
  },
  {
    id: "chemise-bazin",
    label: "Chemise Bazin",
    description: "Chemise bazin ajustée, broderies aux manchettes",
    gender: "male",
    category: "chemise",
    fabric: "bazin",
    color: "blanc cassé",
    embroidery: "aux manchettes",
    length: "hanche",
  },
  {
    id: "leppi-indigo-homme",
    label: "Grand Boubou Léppi",
    description: "Grand boubou et pantalon en léppi, plastron brodé bleu ciel",
    gender: "male",
    category: "boubou",
    fabric: "léppi (coton tissé en bandes et teint à l'indigo, rayures bleu clair sur fond bleu nuit)",
    color: "indigo",
    embroidery: "plastron bleu ciel brodé de motifs géométriques",
    length: "longue",
    fabricImage: "/tissus/leppi.jpg",
  },
  {
    id: "kendeli-ensemble-homme",
    label: "Ensemble Kendeli",
    description: "Tunique longue et pantalon en kendeli de Kindia, bonnet assorti",
    gender: "male",
    category: "complet",
    fabric: "kendeli de Kindia (coton teint à la réserve, fond violet foncé, motifs lavande)",
    color: "violet",
    length: "mi-mollet, avec pantalon et bonnet assortis",
    fabricImage: "/tissus/kendeli.jpg",
  },
  {
    id: "kendeli-pagne-femme",
    label: "Pagne Kendeli",
    description: "Camisole, pagne et foulard en kendeli de Kindia",
    gender: "female",
    category: "pagne",
    fabric: "kendeli de Kindia (coton teint à la réserve, fond violet foncé, motifs lavande)",
    color: "violet",
    length: "cheville",
    headwrap: "turban",
    fabricImage: "/tissus/kendeli.jpg",
  },
  {
    id: "foret-sacree-boubou-homme",
    label: "Grand Boubou Forêt Sacrée",
    description: "Grand boubou en tissu forêt sacrée, plastron à motifs",
    gender: "male",
    category: "boubou",
    fabric: "tissu forêt sacrée (coton ocre orangé, motifs bleu nuit appliqués au pochoir)",
    color: "ocre",
    embroidery: "plastron aux motifs du tissu",
    length: "longue",
    fabricImage: "/tissus/foret-sacree.jpg",
  },
  {
    id: "foret-sacree-femme",
    label: "Ensemble Forêt Sacrée",
    description: "Robe ample et foulard en tissu forêt sacrée",
    gender: "female",
    category: "robe",
    fabric: "tissu forêt sacrée (coton ocre orangé, motifs bleu nuit appliqués au pochoir)",
    color: "ocre",
    length: "cheville",
    headwrap: "turban",
    fabricImage: "/tissus/foret-sacree.jpg",
  },
  {
    id: "bakha-homme",
    label: "Tunique Bakha Bleu Ciel",
    description: "Tunique et pantalon en bazin bakha, broderies argentées",
    gender: "male",
    category: "complet",
    fabric: "bazin bakha (damassé brillant à rayures et motifs tissés)",
    color: "bleu ciel",
    embroidery: "argentées en plastron",
    length: "genou, avec pantalon assorti",
    fabricImage: "/tissus/bakha.jpg",
  },
  {
    id: "bakha-robe-femme",
    label: "Robe Bakha Bleu Ciel",
    description: "Robe évasée en bazin bakha, manches évasées, voile assorti",
    gender: "female",
    category: "robe",
    fabric: "bazin bakha (damassé brillant à rayures et motifs tissés)",
    color: "bleu ciel",
    length: "cheville, jupe évasée et manches évasées",
    headwrap: "moussor-haut",
    fabricImage: "/tissus/bakha.jpg",
  },
  {
    id: "kaftan-unisex-indigo",
    label: "Kaftan Indigo",
    description: "Kaftan droit indigo, broderie poitrine",
    gender: "unisex",
    category: "kaftan",
    fabric: "bazin",
    color: "indigo",
    embroidery: "sur la poitrine",
    length: "mi-longue",
  },
];

export function getStyle(id: string): Style | undefined {
  return STYLES.find((s) => s.id === id);
}
