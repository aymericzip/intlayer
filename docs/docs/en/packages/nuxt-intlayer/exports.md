---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: nuxt-intlayer Package Documentation
description: Nuxt integration for Intlayer, providing a module for Nuxt applications.
keywords:
  - nuxt-intlayer
  - nuxt
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# nuxt-intlayer Package

The `nuxt-intlayer` package provides a Nuxt module to integrate Intlayer into your Nuxt project.

## Installation

```bash
npm install nuxt-intlayer
```

## Exports

### Module

The `nuxt-intlayer` package provides a Nuxt module to integrate Intlayer into your Nuxt project.

Import:

```tsx
import "nuxt-intlayer";
```

or adding to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Export    | Type         | Description                                                     |
| --------- | ------------ | --------------------------------------------------------------- |
| `default` | `NuxtModule` | The default export is the Nuxt module that configures Intlayer. |
