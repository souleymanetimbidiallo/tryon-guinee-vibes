import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

interface ConsentNoticeProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ConsentNotice({ checked, onCheckedChange }: ConsentNoticeProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-card-foreground mb-2">
              Protection de vos données
            </h3>
            <p className="text-sm text-muted-foreground">
              Votre photo sera utilisée uniquement pour générer l'aperçu visuel et ne sera pas
              stockée de façon permanente. Vous pouvez supprimer votre photo à tout moment.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
            <Label
              htmlFor="consent"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              J'accepte le traitement temporaire de ma photo pour l'aperçu
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
