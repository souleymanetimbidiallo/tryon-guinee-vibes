import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UploadCard } from "@/components/UploadCard";
import { StyleSelector } from "@/components/StyleSelector";
import { ResultViewer } from "@/components/ResultViewer";
import { ConsentNotice } from "@/components/ConsentNotice";
import { Button } from "@/components/ui/button";
import { useTryOnStore } from "@/store/useTryOnStore";
import { tryOnAPI } from "@/lib/api";
import { Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function TryOn() {
  const {
    userImage,
    selectedStyle,
    resultUrl,
    loading,
    hasConsented,
    setUserImage,
    setSelectedStyle,
    setResultUrl,
    setLoading,
    setConsent,
    reset,
  } = useTryOnStore();

  const canGenerate = userImage && selectedStyle && hasConsented && !loading;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setLoading(true);
    setResultUrl(null);

    try {
      // Extract base64 from data URL
      const base64Data = userImage.split(",")[1] || userImage;

      const response = await tryOnAPI({
        personImageBase64: base64Data,
        style: {
          category: selectedStyle.category,
          fabric: selectedStyle.fabric,
          color: selectedStyle.color,
          embroidery: selectedStyle.embroidery,
          headwrap: selectedStyle.headwrap,
          length: selectedStyle.length,
        },
        quality: "hd",
      });

      setResultUrl(response.resultUrl);
      toast.success("Votre tenue a été générée avec succès !");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Une erreur est survenue lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer votre photo ?")) {
      reset();
      toast.success("Photo supprimée avec succès");
    }
  };

  const handleRestart = () => {
    reset();
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Essayage Virtuel
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment vous seriez dans une tenue traditionnelle guinéenne en quelques clics
            </p>
          </div>

          {!resultUrl ? (
            <div className="space-y-12">
              {/* Step 1: Upload */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    1
                  </div>
                  <h2 className="text-2xl font-semibold">Importez votre photo</h2>
                </div>
                <div className="max-w-2xl">
                  <UploadCard
                    onImageSelected={setUserImage}
                    currentImage={userImage}
                    disabled={loading}
                  />
                </div>
              </section>

              {/* Consent */}
              {userImage && (
                <section>
                  <div className="max-w-2xl">
                    <ConsentNotice
                      checked={hasConsented}
                      onCheckedChange={setConsent}
                    />
                  </div>
                </section>
              )}

              {/* Step 2: Style Selection */}
              {userImage && hasConsented && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      2
                    </div>
                    <h2 className="text-2xl font-semibold">Choisissez votre style</h2>
                  </div>
                  <StyleSelector
                    onStyleSelected={setSelectedStyle}
                    selectedStyle={selectedStyle}
                    disabled={loading}
                  />
                </section>
              )}

              {/* Step 3: Generate */}
              {userImage && selectedStyle && hasConsented && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      3
                    </div>
                    <h2 className="text-2xl font-semibold">Générez votre aperçu</h2>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={handleGenerate}
                      disabled={!canGenerate}
                      className="text-base"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Générer mon essayage
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
                <h2 className="text-2xl font-semibold">Votre résultat</h2>
              </div>
              <ResultViewer
                resultUrl={resultUrl}
                loading={loading}
                onRestart={handleRestart}
                onDelete={handleDelete}
                styleId={selectedStyle?.id}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
