---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package nuxt-intlayer
description: Intégration Nuxt pour Intlayer, fournissant un module pour les applications Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package nuxt-intlayer

Le package `nuxt-intlayer` fournit un module Nuxt pour intégrer Intlayer dans votre projet Nuxt.

## Installation

```bash
npm install nuxt-intlayer
```

## Exports

### Module

Le package `nuxt-intlayer` fournit un module Nuxt pour intégrer Intlayer dans votre projet Nuxt.

Import :

```tsx
import "nuxt-intlayer";
```

ou en l'ajoutant à `nuxt.config.ts` :

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Exportation | Type         | Description                                                           |
| ----------- | ------------ | --------------------------------------------------------------------- |
| `default`   | `NuxtModule` | L'export par défaut correspond au module Nuxt qui configure Intlayer. |
