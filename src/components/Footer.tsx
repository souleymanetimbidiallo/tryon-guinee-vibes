import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>© 2025 TryOn Guinée - Essayage virtuel de tenues guinéennes</span>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p className="font-medium">
              Aperçu visuel non contractuel – Aucune commande n'est effectuée
            </p>
            <p className="text-xs mt-1">Application de démonstration</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
