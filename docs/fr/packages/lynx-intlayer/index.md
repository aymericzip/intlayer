---
docName: package__lynx-intlayer
url: /doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Documentation du package | lynx-intlayer
description: Découvrez comment utiliser le package lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
---

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Elle est compatible avec des frameworks comme React, React et Express.js.

**Le package `lynx-intlayer`** vous permet d'internationaliser votre application Vite. Il inclut le plugin Metro pour configurer les variables d'environnement dans le [bundler Lynx](https://lynxjs.org/index.html).

## Pourquoi internationaliser votre application Lynx ?

Internationaliser votre application Lynx est essentiel pour servir efficacement un public mondial. Cela permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes de différents horizons linguistiques.

## Configuration

Le package `lynx-intlayer` fonctionne parfaitement avec le [`package react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/react-intlayer/index.md), et le [`package intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/fr/packages/intlayer/index.md). Consultez la documentation correspondante pour plus d'informations.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de packages préféré :

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Exemple d'utilisation

Voici un exemple montrant comment inclure les plugins dans votre configuration Vite.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... autres plugins
    pluginIntlayerLynx(),
  ],
});
```

## Maîtriser l'internationalisation de votre application Vite

Intlayer offre de nombreuses fonctionnalités pour vous aider à internationaliser votre application Vite.

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation (i18n) avec Intlayer et Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_lynx+react.md) pour les applications Lynx.**

## En savoir plus sur Intlayer

- [Site Web Intlayer](https://intlayer.org)
- [Documentation Intlayer](https://intlayer.org/doc)
- [GitHub Intlayer](https://github.com/aymericzip/intlayer)

- [Posez vos questions à notre documentation intelligente](https://intlayer.org/docchat)
