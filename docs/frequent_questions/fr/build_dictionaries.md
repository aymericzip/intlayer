---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comment construire des dictionnaires ?
description: Apprenez comment construire des dictionnaires.
keywords:
  - construire
  - dictionnaires
  - intlayer
  - commande
  - surveillance
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Construire des dictionnaires

## Comment construire des dictionnaires

Intlayer fournit un outil en ligne de commande pour construire des dictionnaires.

```bash
npx intlayer dictionaries build
```

Cette commande :

- Analyse tous les fichiers de déclaration de contenu (`.content.{ts,tsx,js,mjs,cjs,json,...}`) dans votre projet.
- Génère des dictionnaires et les stocke dans le dossier `.intlayer/dictionary`.

### Mode Surveillance

Si vous souhaitez mettre à jour automatiquement les dictionnaires lorsque des modifications sont apportées aux fichiers de déclaration de contenu, exécutez la commande suivante :

```bash
npx intlayer dictionaries build --watch
```

Dans ce mode, Intlayer analysera et construira les dictionnaires chaque fois que des modifications seront apportées aux fichiers de déclaration de contenu et mettra automatiquement à jour le dossier `.intlayer/dictionary`.

### Utilisation de l'extension VSCode

Vous pouvez également utiliser l’[extension Intlayer pour VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/fr/vs_code_extension.md) pour améliorer votre expérience Intlayer dans VSCode.

### Utilisation du plugin pour votre framework d’application préféré

Si vous utilisez un framework comme Next.js (Webpack / Turbopack), Vite, ou React Native, Lynx, etc., Intlayer fournit un plugin que vous pouvez utiliser pour intégrer Intlayer dans votre application.

Intlayer construira les dictionnaires avant la compilation de votre application.
De la même manière, en mode développement, Intlayer surveillera les modifications apportées à vos fichiers de déclaration de contenu et reconstruira automatiquement les dictionnaires.

Référez-vous donc à la documentation spécifique de votre framework pour apprendre comment intégrer le plugin.
