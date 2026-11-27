# TryOn Guinée

Essayage virtuel de tenues guinéennes (abaya, boubou, léppi, pagne…) par IA.

**Stack** : Next.js 16 (App Router) · Tailwind CSS 4 · Google Gemini (`@google/genai`)

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigne GEMINI_API_KEY
npm run dev                  # http://localhost:3000
```

## Structure

```
src/
  app/
    page.tsx              accueil
    essayer/page.tsx      page d'essayage
    api/tryon/route.ts    appel Gemini (clé côté serveur uniquement)
  components/studio/
    TryOnStudio.tsx       état + appel API
    PersonPicker.tsx      photo · mes personnages · mannequin IA
    GarmentPicker.tsx     catalogue · photo de tenue
    ResultPanel.tsx       décor, format, rendu, enregistrement
  lib/
    styles.ts             catalogue (ajoute un style ici)
    prompt.ts             prompt unique (4 combinaisons qui × quoi)
    options.ts            décors, formats, mannequin (liste blanche serveur)
    characters-db.ts      galerie de personnages (IndexedDB, navigateur)
    rate-limit.ts         limite d'essais par IP
    resize-image.ts       redimensionnement côté navigateur
public/styles/            photos de référence des tenues
```

## Ajouter une tenue

1. Dépose une photo de la tenue (fond uni, en pied) dans `public/styles/`.
2. Ajoute une entrée dans `STYLES` (`src/lib/styles.ts`) avec `image: "/styles/ma-tenue.jpg"`.

La photo de référence est envoyée à Gemini avec la photo de l'utilisateur : le rendu suit
le vrai vêtement, pas seulement sa description.

## Modes

| Qui porte la tenue | Quelle tenue | Usage typique |
| --- | --- | --- |
| Une photo | Catalogue | Essayage avant achat |
| Mes personnages | Catalogue ou photo de tenue | Personnages récurrents (images, vidéos) |
| Mannequin IA | Photo de tenue | Lookbook pour créateurs |

Astuce : génère un mannequin, puis « Enregistrer comme personnage » pour le réutiliser
avec le même visage.

Les personnages sont stockés dans le navigateur (IndexedDB) : ils ne quittent l'appareil
qu'au moment d'une génération, et ne sont pas synchronisés entre appareils.

## Variables d'environnement

| Variable             | Rôle                                          |
| -------------------- | --------------------------------------------- |
| `GEMINI_API_KEY`     | Clé Google AI Studio (obligatoire)            |
| `GEMINI_MODEL`       | Modèle image (défaut `gemini-2.5-flash-image`) |
| `TRYON_MAX_PER_HOUR` | Essais max par IP et par heure (défaut 10)     |
