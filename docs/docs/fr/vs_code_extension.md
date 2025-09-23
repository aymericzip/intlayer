---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: Extension officielle VS Code
description: Apprenez à utiliser l'extension Intlayer dans VS Code pour améliorer votre flux de développement. Naviguez rapidement entre les contenus localisés et gérez efficacement vos dictionnaires.
keywords:
  - Extension VS Code
  - Intlayer
  - Localisation
  - Outils de développement
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Extension officielle VS Code

## Vue d'ensemble

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) est l'extension officielle Visual Studio Code pour **Intlayer**, conçue pour améliorer l'expérience développeur lors du travail avec du contenu localisé dans vos projets.

![Extension Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Lien de l'extension : [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Fonctionnalités

### Navigation instantanée

**Support de Aller à la définition** – Utilisez `⌘ + Clic` (Mac) ou `Ctrl + Clic` (Windows/Linux) sur une clé `useIntlayer` pour ouvrir instantanément le fichier de contenu correspondant.  
**Intégration transparente** – Fonctionne sans effort avec les projets **react-intlayer** et **next-intlayer**.  
**Support multilingue** – Prend en charge le contenu localisé dans différentes langues.  
**Intégration VS Code** – S'intègre parfaitement à la navigation et à la palette de commandes de VS Code.

### Commandes de gestion des dictionnaires

Gérez vos dictionnaires de contenu directement depuis VS Code :

- **Construire les dictionnaires** – Générez des fichiers de contenu basés sur la structure de votre projet.
- **Pousser les dictionnaires** – Téléchargez le contenu le plus récent des dictionnaires vers votre dépôt.
- **Tirer les dictionnaires** – Synchronisez le contenu le plus récent des dictionnaires depuis votre dépôt vers votre environnement local.
- **Remplir les dictionnaires** – Remplissez les dictionnaires avec le contenu de votre projet.
- **Tester les dictionnaires** – Identifiez les traductions manquantes ou incomplètes.

### Générateur de déclaration de contenu

Générez facilement des fichiers de dictionnaire structurés dans différents formats :

Si vous travaillez actuellement sur un composant, il générera pour vous le fichier `.content.{ts,tsx,js,jsx,mjs,cjs,json}`.

Exemple de composant :

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

Fichier généré au format TypeScript :

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

Formats disponibles :

- **TypeScript (`.ts`)**
- **Module ES (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Onglet Intlayer (Barre d'activité)

Ouvrez l’onglet Intlayer en cliquant sur l’icône Intlayer dans la barre d’activités de VS Code. Il contient deux vues :

- **Recherche** : Une barre de recherche en direct pour filtrer rapidement les dictionnaires et leur contenu. La saisie met à jour les résultats instantanément.
- **Dictionnaires** : Une vue arborescente de vos environnements/projets, des clés de dictionnaire, et des fichiers contribuant aux entrées. Vous pouvez :
  - Cliquer sur un fichier pour l’ouvrir dans l’éditeur.
  - Utiliser la barre d’outils pour exécuter des actions : Construire, Pull, Push, Remplir, Actualiser, Tester, et Créer un fichier de dictionnaire.
  - Utiliser le menu contextuel pour des actions spécifiques à l’élément :
    - Sur un dictionnaire : Pull ou Push
    - Sur un fichier : Remplir le dictionnaire
  - Lorsque vous changez d’éditeur, l’arborescence révélera le fichier correspondant s’il appartient à un dictionnaire.

## Installation

Vous pouvez installer **Intlayer** directement depuis le Marketplace de VS Code :

1. Ouvrez **VS Code**.
2. Allez dans le **Marketplace des extensions**.
3. Recherchez **"Intlayer"**.
4. Cliquez sur **Installer**.

## Utilisation

### Navigation rapide

1. Ouvrez un projet utilisant **react-intlayer**.
2. Localisez un appel à `useIntlayer()`, par exemple :

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-clic** (`⌘+Click` sur macOS) ou **Ctrl-clic** (sur Windows/Linux) sur la clé (par exemple, `"app"`).
4. VS Code ouvrira automatiquement le fichier de dictionnaire correspondant, par exemple `src/app.content.ts`.

### Gestion des dictionnaires de contenu

### Onglet Intlayer (Barre d’activités)

Utilisez l’onglet latéral pour parcourir et gérer les dictionnaires :

- Ouvrez l’icône Intlayer dans la barre d’activités.
- Dans **Recherche**, tapez pour filtrer les dictionnaires et les entrées en temps réel.
- Dans **Dictionnaires**, parcourez les environnements, les dictionnaires et les fichiers. Utilisez la barre d’outils pour Construire, Tirer, Pousser, Remplir, Actualiser, Tester et Créer un fichier de dictionnaire. Faites un clic droit pour les actions contextuelles (Tirer/Pousser sur les dictionnaires, Remplir sur les fichiers). Le fichier actuellement ouvert dans l’éditeur se révèle automatiquement dans l’arborescence lorsque c’est applicable.

#### Construction des dictionnaires

Générez tous les fichiers de contenu des dictionnaires avec :

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Recherchez **Construire les dictionnaires** et exécutez la commande.

#### Pousser les dictionnaires

Téléchargez le contenu le plus récent des dictionnaires :

1. Ouvrez la **Palette de commandes**.
2. Recherchez **Pousser les dictionnaires**.
3. Sélectionnez les dictionnaires à pousser et confirmez.

#### Tirer les dictionnaires

Synchronisez le contenu le plus récent des dictionnaires :

1. Ouvrez la **Palette de commandes**.
2. Recherchez **Pull Dictionaries**.
3. Choisissez les dictionnaires à synchroniser.

#### Remplissage des dictionnaires

Remplissez les dictionnaires avec le contenu de votre projet :

1. Ouvrez la **Palette de commandes**.
2. Recherchez **Fill Dictionaries**.
3. Exécutez la commande pour peupler les dictionnaires.

#### Test des dictionnaires

Validez les dictionnaires et trouvez les traductions manquantes :

1. Ouvrez la **Palette de commandes**.
2. Recherchez **Test Dictionaries**.
3. Passez en revue les problèmes signalés et corrigez-les si nécessaire.

## Historique de la documentation

| Version | Date       | Modifications      |
| ------- | ---------- | ------------------ |
| 5.5.10  | 2025-06-29 | Historique initial |
