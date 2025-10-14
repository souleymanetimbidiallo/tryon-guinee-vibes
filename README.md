# TryOn Guinée 🇬🇳

Application web d'essayage virtuel de tenues traditionnelles guinéennes utilisant l'intelligence artificielle.

## 🎯 Fonctionnalités

- **Upload de photo** : Glissez-déposez ou sélectionnez votre photo
- **Catalogue de styles** : Abaya, Boubou, Pagne, Léppi avec options de personnalisation
- **Génération IA** : Aperçu réaliste avec conservation du visage et de la pose
- **Téléchargement** : Enregistrez vos essayages virtuels
- **Respect de la vie privée** : Traitement temporaire sans stockage permanent

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ et npm

### Installation

```bash
# Cloner le projet
git clone <URL_DU_REPO>
cd tryon-guinee

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

## 🔧 Variables d'environnement

Créez un fichier `.env.local` à la racine (optionnel pour le mode démo) :

```env
# API IA (optionnel - fonctionne en mode démo sans ces variables)
VITE_GENAI_API_URL=https://api.example-ia.com/generate
VITE_GENAI_API_KEY=votre-clé-api
VITE_GENAI_MODEL=nano-banana-v2
```

**Mode démo** : L'application fonctionne sans clé API, elle retournera l'image originale comme placeholder.

## 📦 Structure du projet

```
src/
├── components/        # Composants React réutilisables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── UploadCard.tsx
│   ├── StyleSelector.tsx
│   ├── ResultViewer.tsx
│   └── ConsentNotice.tsx
├── pages/            # Pages principales
│   ├── Index.tsx     # Page d'accueil
│   ├── TryOn.tsx     # Page d'essayage
│   └── About.tsx     # À propos
├── store/            # État global (Zustand)
│   └── useTryOnStore.ts
├── lib/              # Utilitaires
│   ├── types.ts      # Types TypeScript
│   ├── prompt.ts     # Génération de prompts IA
│   └── api.ts        # Appels API simulés
└── data/
    └── styles.json   # Catalogue des styles
```

## 🎨 Technologies utilisées

- **React** 18+ avec TypeScript
- **Vite** pour le build
- **Tailwind CSS** pour le style
- **Zustand** pour la gestion d'état
- **shadcn/ui** pour les composants UI
- **Lucide React** pour les icônes

## 🧪 Mode démo vs Production

### Mode démo (par défaut)
- Aucune clé API requise
- Retourne l'image originale avec métadonnées simulées
- Délai de 2s simulé pour imiter le traitement IA

### Mode production
- Nécessite les variables d'environnement configurées
- Appelle l'API IA réelle avec les prompts générés
- Traitement réel avec le modèle configuré

Pour activer le mode production, modifiez `DEMO_MODE` dans `src/lib/api.ts`

## 📝 Styles disponibles

- **Abaya** : Bazin en différentes couleurs (bleu roi, bordeaux, vert émeraude)
- **Boubou** : Grand boubou traditionnel (blanc, indigo)
- **Pagne** : Ensemble pagne et haut (wax, bazin)
- **Léppi** : Tissu traditionnel à rayures (indigo, rouge)

Chaque style inclut des options de :
- Tissu (bazin, wax, léppi)
- Couleur
- Broderies
- Longueur
- Type de moussor/turban

## 🔒 Vie privée & RGPD

- Consentement explicite requis avant traitement
- Aucun stockage permanent des photos
- Bouton de suppression accessible à tout moment
- Traitement temporaire en mémoire uniquement

## 📄 License

Ce projet est une démonstration. Aucune utilisation commerciale sans autorisation.

---

**Note** : Ceci est une application de démonstration. Les aperçus générés sont non contractuels et peuvent différer de la réalité. Aucune commande ni paiement n'est effectué via cette plateforme.
