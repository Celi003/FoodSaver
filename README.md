
# Food Saver

Ce dépôt contient l'implémentation front-end d'un prototype d'interface "Onboarding Flow Design" basé sur un design Figma.

Le design d'origine est disponible sur Figma : https://www.figma.com/design/MwikqlKaI2mXAZ7FRaJwXz/Onboarding-Flow-Design

## Aperçu

Il s'agit d'une application React + Vite (TypeScript/TSX) organisée en composants réutilisables. Le projet contient des écrans pour différents rôles (donor, farmer, receiver), des composants UI génériques et quelques styles globaux.

## Prérequis

- Node.js (recommandé >= 16)
- npm (ou un autre gestionnaire de paquets compatible)

Sous Windows, ouvrez PowerShell pour exécuter les commandes ci-dessous.

## Installation

1. Installer les dépendances :

```powershell
npm install
```

2. Lancer le serveur de développement (Vite) :

```powershell
npm run dev
```

Le serveur démarrera généralement sur http://localhost:5173 (Vite affiche l'URL dans la console).

## Scripts utiles (dans `package.json`)

- `dev` : démarre le serveur de développement Vite
- `build` : génère une version de production
- `preview` : prévisualise la build de production localement

Vérifiez `package.json` pour la liste exacte des scripts disponibles.

## Structure du projet

Arborescence principale (fichiers et dossiers importants) :

- `index.html` - page HTML racine
- `vite.config.ts` - configuration Vite
- `package.json` - dépendances et scripts
- `src/` - code source de l'application
  - `main.tsx` - point d'entrée React
  - `App.tsx` - composant racine
  - `index.css` et `styles/globals.css` - styles globaux
  - `assets/` - images et ressources
  - `components/` - écrans et composants principaux
    - `BottomNav.tsx`, `RoleSelection.tsx`, `SignUpLogin.tsx`, `SplashScreen.tsx`, etc.
    - `figma/ImageWithFallback.tsx` - utilitaire d'images
    - `ui/` - bibliothèque de composants UI réutilisables (boutons, formulaires, dialogues, etc.)
  - `guidelines/` - directives de design et guides (ex. `Guidelines.md`)

Les composants `src/components/ui/*` fournissent une base de primitives visuelles (buttons, inputs, modals, etc.) qui sont utilisées dans les écrans de l'application.

## Composants et pages clés

- Écrans destinés aux rôles : `Donor*`, `Farmer*`, `Receiver*` — créations, transactions et suivi.
- Navigation basse : `BottomNav.tsx`.
- Composants UI partagés : `button.tsx`, `input.tsx`, `dialog.tsx`, `table.tsx`, etc.

## Données et types (extrait)

Voici un résumé des principales formes de données utilisées dans l'application (définies dans `src/App.tsx`) :

- Donation :
  - `id`, `title`, `description`, `type`, `quantity`, `image`
  - `donor` (nom, verified, type)
  - `location` (address, distance)
  - `deadline` (Date)
  - `status` : `available | reserved | completed | cancelled`
  - `price` (optionnel, pour les produits d'agriculteurs)
  - `receiver` (optionnel)
  - `instructions` (optionnel)

- Message :
  - `id`, `sender` (`donor` | `receiver`), `text`, `timestamp`

Ces types donnent une idée du modèle de données attendu par les composants (création, listing, suivi, transactions).

## Notes techniques importantes

- L'application est une SPA simple sans routeur externe (ex. React Router) : la navigation entre écrans est gérée via un état local `currentPage` dans `src/App.tsx`.
- Stack : React 18 (TSX) + Vite. Styles via Tailwind (le fichier `src/index.css` contient la sortie Tailwind préparée).
- UI : nombreuses primitives Radix UI + librairies utiles (lucide-react, embla-carousel, react-hook-form, recharts, sonner, sweetalert2, ...).
- Scripts disponibles : `dev`, `build`, `preview` (ce dernier permet de prévisualiser la build de production localement).
- Il n'y a actuellement pas de configuration de tests automatisés ni de CI détectée (tests, linting ou workflows GitHub Actions). Il est recommandé d'ajouter ces éléments pour la production.





