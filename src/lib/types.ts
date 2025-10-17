export type Gender = "male" | "female" | "unisex";

export type StyleCategory = "abaya" | "boubou" | "pagne" | "leppi" | "complet" | "chemise" | "kaftan" | "autre";

export type HeadwrapType = "moussor-haut" | "moussor-bas" | "turban" | "none";

export interface Style {
  id: string;
  label: string;
  category: StyleCategory;
  fabric?: string;
  color?: string;
  embroidery?: string;
  length?: string;
  headwrap?: HeadwrapType;
  description?: string;
  gender: Gender;
}

export interface TryOnBody {
  personImageBase64?: string;
  personImageUrl?: string;
  style: {
    category: StyleCategory;
    fabric?: string;
    color?: string;
    embroidery?: string;
    headwrap?: HeadwrapType;
    length?: string;
  };
  quality?: "sd" | "hd";
  watermark?: boolean;
}

export interface TryOnResponse {
  resultUrl: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}
