---
createdAt: 2025-03-17
updatedAt: 2025-06-29
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

### Navigation Instantanée

**Support Aller à la Définition** – Utilisez `Cmd+Click` (Mac) ou `Ctrl+Click` (Windows/Linux) sur une clé `useIntlayer` pour ouvrir instantanément le fichier de contenu correspondant.  
**Intégration Transparente** – Fonctionne sans effort avec les projets **react-intlayer** et **next-intlayer**.  
**Support Multilingue** – Prend en charge le contenu localisé dans différentes langues.  
**Intégration VS Code** – S'intègre parfaitement à la navigation et à la palette de commandes de VS Code.

### Commandes de Gestion des Dictionnaires

Gérez vos dictionnaires de contenu directement depuis VS Code :

- **Construire les Dictionnaires** (`extension.buildDictionaries`) – Génère les fichiers de contenu en fonction de la structure de votre projet.
- **Pousser les Dictionnaires** (`extension.pushDictionaries`) – Télécharge le contenu le plus récent des dictionnaires vers votre dépôt.
- **Tirer les Dictionnaires** (`extension.pullDictionaries`) – Synchronise le contenu le plus récent des dictionnaires depuis votre dépôt vers votre environnement local.

### Générateur de Déclaration de Contenu

Générez facilement des fichiers de dictionnaire structurés dans différents formats :

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **Module ES (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Installation

Vous pouvez installer **Intlayer** directement depuis le Marketplace de VS Code :

1. Ouvrez **VS Code**.
2. Allez dans le **Marketplace des Extensions**.
3. Recherchez **"Intlayer"**.
4. Cliquez sur **Installer**.

Sinon, installez-le via la ligne de commande :

```sh
code --install-extension intlayer
```

## Utilisation

### Navigation Rapide

1. Ouvrez un projet utilisant **react-intlayer**.
2. Localisez un appel à `useIntlayer()`, par exemple :

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Cliquez en maintenant la touche Commande** (`⌘+Click` sur macOS) ou **Ctrl+Click** (sur Windows/Linux) sur la clé (par exemple, `"app"`).
4. VS Code ouvrira automatiquement le fichier de dictionnaire correspondant, par exemple `src/app.content.ts`.

### Gestion des dictionnaires de contenu

#### Génération des dictionnaires

Générez tous les fichiers de contenu des dictionnaires avec :

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Recherchez **Build Dictionaries** et exécutez la commande.

#### Envoi des dictionnaires

Téléversez le contenu le plus récent des dictionnaires :

1. Ouvrez la **Palette de commandes**.
2. Recherchez **Push Dictionaries**.
3. Sélectionnez les dictionnaires à envoyer et confirmez.

#### Récupération des dictionnaires

Synchronisez le contenu le plus récent des dictionnaires :

1. Ouvrez la **Palette de commandes**.
2. Recherchez **Pull Dictionaries**.
3. Choisissez les dictionnaires à récupérer.

## Développement & Contribution

Vous souhaitez contribuer ? Nous accueillons avec plaisir les contributions de la communauté !

URL du dépôt : https://github.com/aymericzip/intlayer-vs-code-extension

### Pour commencer

Clonez le dépôt et installez les dépendances :

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Utilisez le gestionnaire de paquets `npm` pour assurer la compatibilité avec le paquet `vsce` pour construire et publier l'extension.

### Exécuter en mode développement

1. Ouvrez le projet dans **VS Code**.
2. Appuyez sur `F5` pour lancer une nouvelle fenêtre **Extension Development Host**.

### Soumettre une Pull Request

Si vous améliorez l'extension, soumettez une PR sur [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Retour d'expérience & Problèmes

Vous avez trouvé un bug ou vous souhaitez proposer une fonctionnalité ? Ouvrez un ticket sur notre **dépôt GitHub** :

[Problèmes GitHub](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licence

Intlayer est publié sous la **licence MIT**.

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
