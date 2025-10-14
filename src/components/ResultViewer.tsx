import { Download, RotateCcw, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadImage } from "@/lib/api";
import { toast } from "sonner";

interface ResultViewerProps {
  resultUrl: string | null;
  loading: boolean;
  onRestart: () => void;
  onDelete: () => void;
  styleId?: string;
}

export function ResultViewer({
  resultUrl,
  loading,
  onRestart,
  onDelete,
  styleId,
}: ResultViewerProps) {
  const handleDownload = () => {
    if (!resultUrl) return;

    const filename = `tryon-guinee-${styleId || "result"}.jpg`;
    
    try {
      downloadImage(resultUrl, filename);
      toast.success("Téléchargement démarré !");
    } catch (error) {
      toast.error("Erreur lors du téléchargement");
      console.error("Download error:", error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-semibold text-lg mb-1">Génération en cours...</p>
              <p className="text-sm text-muted-foreground">
                L'IA prépare votre tenue, veuillez patienter
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!resultUrl) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] max-h-[600px] bg-muted/30">
            <img
              src={resultUrl}
              alt="Résultat de l'essayage"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="hero"
          size="lg"
          onClick={handleDownload}
          className="flex-1 min-w-[200px]"
        >
          <Download className="mr-2 h-5 w-5" />
          Télécharger l'image
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onRestart}
          className="flex-1 min-w-[150px]"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Recommencer
        </Button>
      </div>

      <div className="pt-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer ma photo
        </Button>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Note importante :</p>
        <p>
          Ceci est un aperçu visuel généré par intelligence artificielle. Le rendu peut différer
          de la réalité. Aucune commande n'est effectuée via cette application.
        </p>
      </div>
    </div>
  );
}
