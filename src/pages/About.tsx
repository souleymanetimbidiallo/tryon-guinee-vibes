import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Shield, Info } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              À propos de TryOn Guinée
            </h1>
            <p className="text-lg text-muted-foreground">
              Découvrez la beauté des tenues traditionnelles guinéennes grâce à l'intelligence artificielle
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        TryOn Guinée est une application de démonstration qui utilise l'intelligence
                        artificielle pour vous permettre de visualiser comment vous apparaîtriez dans
                        des tenues traditionnelles guinéennes.
                      </p>
                      <p>
                        Cette plateforme met en valeur la richesse culturelle de la Guinée à travers
                        ses tenues emblématiques : l'abaya en bazin, le majestueux boubou, le coloré
                        pagne wax, et l'authentique léppi.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">Les tenues disponibles</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Abaya</h3>
                        <p className="text-muted-foreground">
                          Élégante tunique longue en bazin, ornée de broderies délicates. Disponible
                          en différentes couleurs avec options de moussor assorti.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Boubou</h3>
                        <p className="text-muted-foreground">
                          Grand boubou traditionnel pour homme, confectionné en bazin avec broderies
                          sur la poitrine. Un symbole de prestige et d'élégance.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Pagne</h3>
                        <p className="text-muted-foreground">
                          Ensemble pagne et haut assorti en tissu wax coloré ou bazin. Souvent
                          accompagné d'un turban ou moussor pour un look complet.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Léppi</h3>
                        <p className="text-muted-foreground">
                          Tissu traditionnel à rayures indigo ou rouge, tissé à la main. Un héritage
                          culturel guinéen authentique.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">Important à savoir</h2>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="font-medium text-foreground mb-2">
                          ⚠️ Application de démonstration
                        </p>
                        <p className="text-sm">
                          TryOn Guinée est un projet de démonstration. Les aperçus générés sont
                          purement visuels et non contractuels. Ils peuvent différer de la réalité.
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="font-medium text-foreground mb-2">
                          🛍️ Aucune vente
                        </p>
                        <p className="text-sm">
                          Cette application ne permet pas d'effectuer des commandes ou des achats.
                          Elle est uniquement destinée à l'essayage virtuel.
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="font-medium text-foreground mb-2">
                          🔒 Confidentialité
                        </p>
                        <p className="text-sm">
                          Vos photos ne sont pas stockées de façon permanente. Le traitement est
                          temporaire et vous pouvez supprimer vos données à tout moment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                    <p className="text-muted-foreground mb-4">
                      Pour toute question ou suggestion concernant TryOn Guinée, n'hésitez pas à
                      nous contacter.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email de contact : <span className="font-medium">contact@tryon-guinee.com</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center pt-8">
              <Link to="/tryon">
                <Button variant="hero" size="lg">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Essayer maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
