---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Paquete nuxt-intlayer
description: Integración de Nuxt para Intlayer, proporcionando un módulo para aplicaciones Nuxt.
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
    changes: Documentación unificada para todas las exportaciones
---

# Paquete nuxt-intlayer

El paquete `nuxt-intlayer` proporciona un módulo de Nuxt para integrar Intlayer en tu proyecto Nuxt.

## Instalación

```bash
npm install nuxt-intlayer
```

## Exportaciones

### Módulo

El paquete `nuxt-intlayer` proporciona un módulo de Nuxt para integrar Intlayer en tu proyecto Nuxt.

Importación:

```tsx
import "nuxt-intlayer";
```

o añadiéndolo a `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Exportación | Tipo         | Descripción                                                             |
| ----------- | ------------ | ----------------------------------------------------------------------- |
| `default`   | `NuxtModule` | La exportación por defecto es el módulo de Nuxt que configura Intlayer. |
