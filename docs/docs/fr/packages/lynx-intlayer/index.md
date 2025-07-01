---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Documentation du package | lynx-intlayer
description: Voir comment utiliser le package lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - lynx-intlayer
---

# lynx-intlayer : Internationaliser (i18n) une application Lynx

**Intlayer** est une suite de packages conçue spécifiquement pour les développeurs JavaScript. Il est compatible avec des frameworks comme React, React, et Express.js.

**Le package `lynx-intlayer`** vous permet d'internationaliser votre application Vite. Il inclut le plugin Metro pour définir la configuration via des variables d'environnement dans le [Lynx bundler](https://lynxjs.org/index.html).

## Pourquoi internationaliser votre application Lynx ?

L'internationalisation de votre application Lynx est essentielle pour servir efficacement un public mondial. Elle permet à votre application de fournir du contenu et des messages dans la langue préférée de chaque utilisateur. Cette capacité améliore l'expérience utilisateur et élargit la portée de votre application en la rendant plus accessible et pertinente pour des personnes issues de différents horizons linguistiques.

## Configuration

Le package `lynx-intlayer` fonctionne parfaitement avec le [`package react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/index.md), et le [`package intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/intlayer/index.md). Consultez la documentation correspondante pour plus d'informations.

## Installation

Installez le package nécessaire en utilisant votre gestionnaire de paquets préféré :

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

Voici un exemple de comment inclure les plugins dans votre configuration vite.

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

**Pour en savoir plus sur ces fonctionnalités, consultez le guide [Internationalisation React (i18n) avec Intlayer et Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_lynx+react.md) pour l'application Lynx.**

## En savoir plus sur Intlayer

- [Site web d'Intlayer](https://intlayer.org)
- [Documentation d'Intlayer](https://intlayer.org/doc)
- [GitHub d'Intlayer](https://github.com/aymericzip/intlayer)

- [Posez vos questions à notre documentation intelligente](https://intlayer.org/doc/chat)

## Historique de la documentation

- 5.5.10 - 2025-06-29 : Historique initial
