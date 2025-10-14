import { useState } from "react";
import { Style } from "@/lib/types";
import stylesData from "@/data/styles.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

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
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tous" },
    { id: "abaya", label: "Abaya" },
    { id: "boubou", label: "Boubou" },
    { id: "pagne", label: "Pagne" },
    { id: "leppi", label: "Léppi" },
  ];

  const filteredStyles =
    categoryFilter === "all"
      ? styles
      : styles.filter((s) => s.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          Choisissez votre style
        </h3>
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
                  {style.fabric && (
                    <Badge variant="secondary" className="text-xs">
                      {style.fabric}
                    </Badge>
                  )}
                  {style.color && (
                    <Badge variant="outline" className="text-xs">
                      {style.color}
                    </Badge>
                  )}
                  {style.embroidery && (
                    <Badge variant="outline" className="text-xs">
                      {style.embroidery}
                    </Badge>
                  )}
                </div>

                {selectedStyle?.id === style.id && (
                  <div className="pt-2 border-t">
                    <p className="text-xs font-medium text-primary">
                      ✓ Style sélectionné
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStyles.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Aucun style disponible dans cette catégorie
        </p>
      )}
    </div>
  );
}
