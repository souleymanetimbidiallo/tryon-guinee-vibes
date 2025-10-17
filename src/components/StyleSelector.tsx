import { useState, useMemo } from "react";
import { Style } from "@/lib/types";
import stylesData from "@/data/styles.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sparkles, Users } from "lucide-react";

interface StyleSelectorProps {
  onStyleSelected: (style: Style) => void;
  selectedStyle: Style | null;
  disabled?: boolean;
}

export function StyleSelector({
  onStyleSelected,
  selectedStyle,
  disabled,
}: StyleSelectorProps) {
  const styles = stylesData as Style[];

  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female" | "unisex">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Catégories (affichées selon le genre sélectionné)
  const baseCategories = [
    { id: "all", label: "Tous" },
    { id: "abaya", label: "Abaya" },
    { id: "pagne", label: "Pagne" },
    { id: "leppi", label: "Léppi" },
    { id: "boubou", label: "Boubou" },
    { id: "complet", label: "Complet" },
    { id: "chemise", label: "Chemise" },
    { id: "kaftan", label: "Kaftan" }
  ];

  // Optionnel : masquer certaines catégories si un genre est choisi
  const categories = useMemo(() => {
    if (genderFilter === "male") {
      return baseCategories.filter(c => ["all", "boubou", "leppi", "complet", "chemise", "kaftan"].includes(c.id));
    }
    if (genderFilter === "female") {
      return baseCategories.filter(c => ["all", "abaya", "pagne", "leppi", "kaftan"].includes(c.id));
    }
    return baseCategories;
  }, [genderFilter]);

  const filteredStyles = useMemo(() => {
    return styles.filter((s) => {
      const okGender = genderFilter === "all" ? true : s.gender === genderFilter || s.gender === "unisex";
      const okCategory = categoryFilter === "all" ? true : s.category === categoryFilter;
      return okGender && okCategory;
    });
  }, [styles, genderFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          Choisissez votre style
        </h3>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Genre */}
          <Badge
            variant={genderFilter === "all" ? "default" : "outline"}
            className={cn("cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}
            onClick={() => !disabled && setGenderFilter("all")}
          >
            Tous genres
          </Badge>
          <Badge
            variant={genderFilter === "female" ? "default" : "outline"}
            className={cn("cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}
            onClick={() => !disabled && setGenderFilter("female")}
          >
            Femme
          </Badge>
          <Badge
            variant={genderFilter === "male" ? "default" : "outline"}
            className={cn("cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}
            onClick={() => !disabled && setGenderFilter("male")}
          >
            Homme
          </Badge>
          <Badge
            variant={genderFilter === "unisex" ? "default" : "outline"}
            className={cn("cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}
            onClick={() => !disabled && setGenderFilter("unisex")}
          >
            Unisexe
          </Badge>
        </div>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={categoryFilter === cat.id ? "default" : "outline"}
              className={cn(
                "cursor-pointer hover:bg-primary/10 transition-colors",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !disabled && setCategoryFilter(cat.id)}
            >
              {cat.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Liste des styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStyles.map((style) => (
          <Card
            key={style.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg",
              selectedStyle?.id === style.id
                ? "ring-2 ring-primary shadow-[var(--shadow-elegant)]"
                : "hover:ring-1 hover:ring-muted-foreground/50",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !disabled && onStyleSelected(style)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    {style.label}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {style.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">
                    {style.gender === "male" ? "Homme" : style.gender === "female" ? "Femme" : "Unisexe"}
                  </Badge>
                  {style.fabric && <Badge variant="secondary" className="text-xs">{style.fabric}</Badge>}
                  {style.color && <Badge variant="outline" className="text-xs">{style.color}</Badge>}
                  {style.embroidery && <Badge variant="outline" className="text-xs">{style.embroidery}</Badge>}
                </div>

                {selectedStyle?.id === style.id && (
                  <div className="pt-2 border-t">
                    <p className="text-xs font-medium text-primary">✓ Style sélectionné</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStyles.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Aucun style disponible pour ces filtres
        </p>
      )}
    </div>
  );
}
