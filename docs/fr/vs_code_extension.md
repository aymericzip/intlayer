---
docName: vscode_extension
url: /doc/vs-code-extension
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/vs_code_extension.md
createdAt: 2025-03-17
updatedAt: 2025-03-17
title: Extension officielle VS Code
description: Découvrez comment utiliser l'extension Intlayer dans VS Code pour améliorer votre flux de travail. Naviguez rapidement entre les contenus localisés et gérez vos dictionnaires efficacement.
keywords:
  - Extension VS Code
  - Intlayer
  - Localisation
  - Outils de développement
  - React
  - Next.js
  - JavaScript
  - TypeScript
---

# Extension VS Code Officielle pour Intlayer

## Aperçu

**Intlayer** est l'extension officielle pour Visual Studio Code dédiée à **Intlayer**, conçue pour améliorer l'expérience des développeurs lorsqu'ils travaillent avec du contenu localisé dans des projets **React, Next.js et JavaScript**.

Avec cette extension, les développeurs peuvent **naviguer rapidement** vers leurs dictionnaires de contenu, gérer les fichiers de localisation et optimiser leur flux de travail grâce à des commandes d'automatisation puissantes.

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Lien de l'extension : [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Fonctionnalités

### Navigation Instantanée

**Support Aller à la Définition** – Utilisez `Cmd+Click` (Mac) ou `Ctrl+Click` (Windows/Linux) sur une clé `useIntlayer` pour ouvrir instantanément le fichier de contenu correspondant.  
**Intégration Transparente** – Fonctionne parfaitement avec les projets **react-intlayer** et **next-intlayer**.  
**Support Multilingue** – Prend en charge le contenu localisé dans différentes langues.  
**Intégration VS Code** – S'intègre harmonieusement avec la navigation et la palette de commandes de VS Code.

### Commandes de Gestion des Dictionnaires

Gérez vos dictionnaires de contenu directement depuis VS Code :

- **Construire les Dictionnaires** (`extension.buildDictionaries`) – Générez des fichiers de contenu en fonction de la structure de votre projet.
- **Envoyer les Dictionnaires** (`extension.pushDictionaries`) – Téléchargez le contenu le plus récent des dictionnaires vers votre dépôt.
- **Récupérer les Dictionnaires** (`extension.pullDictionaries`) – Synchronisez le contenu le plus récent des dictionnaires depuis votre dépôt vers votre environnement local.

### Générateur de Déclaration de Contenu

Générez facilement des fichiers de dictionnaire structurés dans différents formats :

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **Module ES (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Installation

Vous pouvez installer **Intlayer** directement depuis le Marketplace de VS Code :

1. Ouvrez **VS Code**.
2. Accédez au **Marketplace des Extensions**.
3. Recherchez **"Intlayer"**.
4. Cliquez sur **Installer**.

Alternativement, installez-le via la ligne de commande :

```sh
code --install-extension intlayer
```

## Utilisation

### Navigation Rapide

1. Ouvrez un projet utilisant **react-intlayer**.
2. Localisez un appel à `useIntlayer()`, tel que :

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Commandez-cliquez** (`⌘+Click` sur macOS) ou **Ctrl+Click** (sur Windows/Linux) sur la clé (par exemple, `"app"`).
4. VS Code ouvrira automatiquement le fichier de dictionnaire correspondant, par exemple, `src/app.content.ts`.

### Gestion des Dictionnaires de Contenu

#### Construction des Dictionnaires

Générez tous les fichiers de contenu des dictionnaires avec :

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Recherchez **Construire les Dictionnaires** et exécutez la commande.

#### Envoi des Dictionnaires

Téléchargez le contenu le plus récent des dictionnaires :

1. Ouvrez la **Palette de Commandes**.
2. Recherchez **Envoyer les Dictionnaires**.
3. Sélectionnez les dictionnaires à envoyer et confirmez.

#### Récupération des Dictionnaires

Synchronisez le contenu le plus récent des dictionnaires :

1. Ouvrez la **Palette de Commandes**.
2. Recherchez **Récupérer les Dictionnaires**.
3. Choisissez les dictionnaires à récupérer.

### Personnalisation des Chemins des Fichiers de Dictionnaire

Par défaut, l'extension suit la structure standard des projets **Intlayer**. Cependant, vous pouvez configurer des chemins personnalisés :

1. Ouvrez **Paramètres (`Cmd + ,` sur macOS / `Ctrl + ,` sur Windows/Linux)`**.
2. Recherchez `Intlayer`.
3. Ajustez le paramètre du chemin des fichiers de contenu.

## Développement & Contribution

Vous souhaitez contribuer ? Nous accueillons les contributions de la communauté !

URL du dépôt : https://github.com/aymericzip/intlayer-vs-code-extension

### Premiers Pas

Clonez le dépôt et installez les dépendances :

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Utilisez le gestionnaire de paquets `npm` pour garantir la compatibilité avec le package `vsce` pour construire et publier l'extension.

### Exécution en Mode Développement

1. Ouvrez le projet dans **VS Code**.
2. Appuyez sur `F5` pour lancer une nouvelle fenêtre **Extension Development Host**.

### Soumettre une Pull Request

Si vous améliorez l'extension, soumettez une PR sur [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Retours & Problèmes

Vous avez trouvé un bug ou avez une demande de fonctionnalité ? Ouvrez une issue sur notre **dépôt GitHub** :

[Issues GitHub](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licence

Intlayer est publié sous la **Licence MIT**.
