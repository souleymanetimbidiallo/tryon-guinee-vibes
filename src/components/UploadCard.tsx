import { useCallback, useState } from "react";
import { Upload, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  onImageSelected: (imageDataUrl: string, file: File) => void;
  currentImage: string | null;
  disabled?: boolean;
}

export function UploadCard({ onImageSelected, currentImage, disabled }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner une image (PNG, JPG, WEBP)");
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        alert("L'image ne doit pas dépasser 20 Mo");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelected(result, file);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleClear = useCallback(() => {
    onImageSelected("", null as any);
  }, [onImageSelected]);

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {currentImage ? (
          <div className="relative aspect-[3/4] max-h-[500px]">
            <img
              src={currentImage}
              alt="Photo uploadée"
              className="w-full h-full object-contain rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleClear}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Photo chargée
            </div>
          </div>
        ) : (
          <label
            className={cn(
              "flex flex-col items-center justify-center py-12 cursor-pointer",
              disabled && "cursor-not-allowed"
            )}
          >
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-foreground mb-1">
              Glissez votre photo ici
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              ou cliquez pour sélectionner
            </p>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled}
            />
            <Button variant="secondary" size="sm" disabled={disabled} type="button">
              Choisir une photo
            </Button>
          </label>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-4 text-sm">
        <p className="font-medium text-foreground mb-2">Conseils pour une photo optimale :</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• Fond simple et uni de préférence</li>
          <li>• Visage bien visible et éclairé</li>
          <li>• Position debout, vue de face</li>
          <li>• Format PNG, JPG ou WEBP (max 20 Mo)</li>
        </ul>
      </div>
    </div>
  );
}
