import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Upload, Sparkles, Download, Shield } from "lucide-react";
import heroImage from "@/assets/hero-guinea.jpg";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full">
                  <span className="text-sm font-medium text-secondary">
                    ✨ Essayage virtuel de tenues guinéennes
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Découvrez votre style{" "}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    guinéen
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Téléchargez votre photo, choisissez parmi nos tenues traditionnelles (abaya, boubou, pagne, léppi) et voyez le résultat instantanément grâce à l'intelligence artificielle.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/tryon">
                    <Button variant="hero" size="lg" className="text-base">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Essayer maintenant
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="text-base">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
                  <img
                    src={heroImage}
                    alt="Tenue traditionnelle guinéenne"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                En seulement trois étapes simples, visualisez-vous dans des tenues traditionnelles guinéennes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="relative hover:shadow-lg transition-shadow">
                <CardContent className="pt-12 pb-8 px-6 text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                      <Upload className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-primary/20 mb-4">01</div>
                  <h3 className="text-xl font-semibold mb-3">Importez votre photo</h3>
                  <p className="text-muted-foreground">
                    Téléchargez une photo claire sur fond simple. Notre système garantit la confidentialité de vos données.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative hover:shadow-lg transition-shadow">
                <CardContent className="pt-12 pb-8 px-6 text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-amber-400 flex items-center justify-center shadow-lg">
                      <Sparkles className="h-8 w-8 text-secondary-foreground" />
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-secondary/20 mb-4">02</div>
                  <h3 className="text-xl font-semibold mb-3">Choisissez votre style</h3>
                  <p className="text-muted-foreground">
                    Parcourez notre collection : abaya bazin, boubou, pagne wax, léppi traditionnel et plus encore.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative hover:shadow-lg transition-shadow">
                <CardContent className="pt-12 pb-8 px-6 text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shadow-lg">
                      <Download className="h-8 w-8 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-accent/20 mb-4">03</div>
                  <h3 className="text-xl font-semibold mb-3">Téléchargez le résultat</h3>
                  <p className="text-muted-foreground">
                    Visualisez votre aperçu en quelques secondes et téléchargez l'image pour la partager.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-20">
          <div className="container">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">
                      Votre vie privée est notre priorité
                    </h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        TryOn Guinée est une application de démonstration qui utilise l'intelligence artificielle pour générer des aperçus visuels. Voici ce que vous devez savoir :
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Vos photos ne sont pas stockées de façon permanente</li>
                        <li>Aucune commande ni paiement n'est effectué via cette application</li>
                        <li>Les aperçus générés sont purement indicatifs et non contractuels</li>
                        <li>Vous pouvez supprimer votre photo à tout moment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary-glow to-secondary">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Prêt à découvrir votre style guinéen ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Essayez dès maintenant l'expérience d'essayage virtuel et explorez la richesse des tenues traditionnelles guinéennes
            </p>
            <Link to="/tryon">
              <Button variant="secondary" size="lg" className="text-base font-semibold">
                <Sparkles className="mr-2 h-5 w-5" />
                Commencer l'essayage
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
