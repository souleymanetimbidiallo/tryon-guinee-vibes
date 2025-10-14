import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            TryOn Guinée
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Accueil
          </Link>
          <Link
            to="/tryon"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/tryon" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Essayage
          </Link>
          <Link
            to="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/about" ? "text-primary" : "text-muted-foreground"
            )}
          >
            À propos
          </Link>
        </nav>

        {location.pathname !== "/tryon" && (
          <Link to="/tryon">
            <Button variant="hero" size="lg">
              Essayer maintenant
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
