---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentation du package | vite-intlayer
description: Découvrez comment utiliser le package vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer : Package NPM pour internationaliser (i18n) une application Vite

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

**Le package `vite-intlayer`** vous permet d'internationaliser votre application Vite. Il inclut le plugin Vite pour définir la configuration via des variables d'environnement dans le [bundler Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Il fournit également un middleware pour détecter la langue préférée de l'utilisateur et rediriger l'utilisateur vers l'URL appropriée telle que spécifiée dans la [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/configuration.md).

## Pourquoi internationaliser votre application Vite ?

Internationaliser votre application Vite est essentiel pour servir efficacement un public mondial. Cela permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différentes origines linguistiques.

## Configuration

Le package `vite-intlayer` fonctionne parfaitement avec le [`package react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md), et le [`package intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/index.md). Consultez la documentation correspondante pour plus d'informations.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Exemple d'utilisation

Voici un exemple de la manière d'inclure les plugins dans votre configuration vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerMiddlewarePlugin()],
});
```

> Le plugin Vite `intlayer()` est utilisé pour intégrer Intlayer avec Vite. Il assure la génération des fichiers de déclaration de contenu et les surveille en mode développement. Il définit les variables d'environnement Intlayer au sein de l'application Vite. De plus, il fournit des alias pour optimiser les performances.

> Le plugin `intlayerMiddlewarePlugin()` ajoute un routage côté serveur à votre application. Ce plugin détectera automatiquement la locale actuelle en fonction de l'URL et définira le cookie de locale approprié. Si aucune locale n'est spécifiée, le plugin déterminera la locale la plus appropriée en fonction des préférences linguistiques du navigateur de l'utilisateur. Si aucune locale n'est détectée, il redirigera vers la locale par défaut.

## Maîtriser l'internationalisation de votre application Vite

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application Vite.

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation React (i18n) avec Intlayer, Vite et React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_vite+react.md) pour les applications Vite et React.**

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
