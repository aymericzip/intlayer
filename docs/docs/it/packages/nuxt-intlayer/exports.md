---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto nuxt-intlayer
description: Integrazione Nuxt per Intlayer, fornisce un modulo per applicazioni Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# pacchetto nuxt-intlayer

Il pacchetto `nuxt-intlayer` fornisce un modulo Nuxt per integrare Intlayer nel tuo progetto Nuxt.

## Installazione

```bash
npm install nuxt-intlayer
```

## Esportazioni

### Modulo

Il pacchetto `nuxt-intlayer` fornisce un modulo Nuxt per integrare Intlayer nel tuo progetto Nuxt.

Importazione:

```tsx
import "nuxt-intlayer";
```

oppure aggiungendo a `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Esportazione | Tipo         | Descrizione                                                   |
| ------------ | ------------ | ------------------------------------------------------------- |
| `default`    | `NuxtModule` | L'export predefinito è il modulo Nuxt che configura Intlayer. |
