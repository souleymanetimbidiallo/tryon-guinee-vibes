
# 🧾 Cahier des charges / Rapport de présentation

## Projet : **TryOn Guinée Vibes**

**Type de projet :** Application web d’essayage virtuel de tenues guinéennes

**Auteur :** Souleymane Diallo

**Technologies :** React, TypeScript, Tailwind CSS, Node.js (API), Supabase, IA (Gemini API)

---

## 1. 🎯 Contexte et Objectif

La mode guinéenne, riche en couleurs, tissus et styles traditionnels (bazin, léppi, pagne, abaya, etc.), attire de plus en plus de jeunes et de créateurs.
Cependant, **les clients hésitent souvent à acheter en ligne** faute de pouvoir visualiser le rendu réel d’un vêtement sur eux.

L’objectif de **TryOn Guinée Vibes** est de :

* Permettre aux utilisateurs **d’essayer virtuellement** des tenues guinéennes sur leur photo.
* Promouvoir la **mode locale guinéenne** à travers une expérience numérique innovante.
* Offrir une **solution immersive et culturelle**, combinant technologie et patrimoine textile.

---

## 2. 🧩 Description du concept

L’utilisateur importe une photo de lui, choisit un style vestimentaire (ex. abaya, boubou, pagne, léppi, etc.), et l’IA habille automatiquement la personne selon le style choisi.

À la fin :
* **Télécharger** le rendu final,
* Et éventuellement, à terme, **passer commande** chez des créateurs partenaires.

---

## 3. 👥 Public cible

* **Clients guinéens** souhaitant essayer des vêtements traditionnels avant achat.
* **Créateurs et stylistes** désireux de proposer leurs modèles dans un showroom virtuel.
* **Diaspora guinéenne**, qui souhaite retrouver le style vestimentaire local depuis l’étranger.
* **Boutiques de mode**, pour digitaliser leur offre et renforcer leur visibilité.

---

## 4. ⚙️ Fonctionnalités principales

### 🧍 1. Chargement de photo

* Importation d’une image de l’utilisateur (portrait clair, fond neutre).
* Affichage d’un aperçu avant traitement.

### 👗 2. Choix du style vestimentaire

* Catalogue interactif avec filtres :

  * **Genre** : Homme / Femme / Unisexe
  * **Catégorie** : Abaya, Boubou, Pagne, Léppi, Kaftan, Complet, Chemise
  * **Détails** : tissu, couleur, broderie, longueur…
* Description et badges pour chaque style.

### 🧠 3. Génération IA

* Appel à l’API **Gemini (Google AI)** pour générer l’image habillée.
* Personnalisation du prompt selon :

  * le **genre** du style,
  * les **caractéristiques** du vêtement,
  * et la **photo** envoyée.

### 🖼️ 4. Visualisation du résultat

* **Loader animé / spinner** pendant la génération.
* **Affichage du résultat** dans une carte élégante avec :

  * Effet **confettis** de réussite 🎉
  * Bouton **Télécharger l’image**
  * Bouton **Recommencer**

### 🔄 5. Interface moderne et intuitive

* Design épuré avec **React + Tailwind CSS + shadcn/ui**.
* Composants réactifs et adaptatifs.
* Architecture claire : séparation frontend / backend.

---

## 5. 🧰 Technologies utilisées

| Domaine                 | Technologie                                             |
| ----------------------- | ------------------------------------------------------- |
| **Frontend**            | React + TypeScript + Tailwind CSS + shadcn/ui           |
| **Backend API**         | Node.js + Express ou fonctions Supabase                 |
| **IA Générative**       | Google Gemini (modèle `gemini-2.5-flash-preview-image`) |
| **Base de données**     | Supabase (PostgreSQL)                                   |
| **Stockage**            | Supabase Storage / S3                                   |
| **Outils de Dev**       | Vite, Concurrently, Nodemon, ts-node                    |
| **Versioning**          | Git / GitHub                                            |
| **Environnement local** | Docker + Supabase CLI                                   |

---

## 6. 🧠 Intelligence artificielle

L’IA reçoit la photo de l’utilisateur et un **prompt intelligent** construit ainsi :

> “Habiller la personne avec un style féminin de type *abaya en bazin bleu roi avec broderies dorées et moussor haut*.
> Respecter la posture et le visage de la personne.
> Rendu studio, réaliste et cohérent.”

L’IA génère ensuite une **image haute définition** du rendu final.

---

## 7. 🔒 Aspects éthiques et confidentialité

* Les images des utilisateurs ne sont **pas stockées** durablement.
* Traitement éphémère côté serveur.
* Aucune reconnaissance faciale ni collecte biométrique.
* Respect du RGPD et des bonnes pratiques IA (transparence, consentement).

---

## 8. 🧮 Architecture technique simplifiée

```
[Frontend React]  →  [API Node.js (TryOn)]  →  [Gemini AI]
       ↓                         ↓
 [Supabase Storage]       [Base styles.json]
```

---

## 9. 🧑‍💻 Équipe et rôles

| Rôle                                       | Nom                              | Mission                                   |
| ------------------------------------------ | -------------------------------- | ----------------------------------------- |
| **Chef de projet / Développeur Fullstack** | Souleymane Diallo                | Conception, développement, intégration IA |
| **Designer UI/UX**                         | (optionnel)                      | Création d’interfaces modernes            |
| **Consultants culturels**                  | Créateurs guinéens               | Validation des styles et textiles         |
| **Testeurs**                               | Étudiants / Utilisateurs pilotes | Feedback sur le rendu IA                  |

---

## 10. 🚀 Évolutions prévues

| Étape                             | Description                              | Priorité |
| --------------------------------- | ---------------------------------------- | -------- |
| 🔹 Ajout de styles personnalisés  | Créateurs peuvent proposer leurs modèles | Haute    |
| 🔹 Mode commande / boutique       | Passer commande après essayage           | Haute    |
| 🔹 IA d’ajustement morphologique  | Adapter le vêtement à la taille du corps | Moyenne  |
| 🔹 Application mobile             | Version Flutter ou React Native          | Moyenne  |
| 🔹 Historique des rendus          | Sauvegarde des essais utilisateurs       | Basse    |
| 🔹 Détection automatique du genre | Pré-remplissage du filtre                | Basse    |

---

## 11. 🧭 Conclusion

**TryOn Guinée Vibes** est un projet à la croisée de la **mode africaine** et de la **technologie IA**, visant à :

* valoriser les tissus et styles traditionnels guinéens,
* offrir une expérience utilisateur moderne et immersive,
* et renforcer le lien entre les créateurs locaux et le digital.

C’est une vitrine du **“Made in Guinea” intelligent**, alliant **innovation, culture et esthétique.**

---

## 12. 📎 Annexes (facultatif)

* Exemples de prompts IA
* Captures d’écran du prototype
* Liste complète des styles disponibles (`styles.json`)
* Diagramme des interactions utilisateur

---