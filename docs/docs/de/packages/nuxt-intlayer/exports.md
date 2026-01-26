---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: nuxt-intlayer Paketdokumentation
description: Nuxt-Integration für Intlayer, stellt ein Modul für Nuxt-Anwendungen bereit.
keywords:
  - nuxt-intlayer
  - nuxt
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# nuxt-intlayer Paket

Das `nuxt-intlayer`-Paket stellt ein Nuxt-Modul bereit, um Intlayer in Ihr Nuxt-Projekt zu integrieren.

## Installation

```bash
npm install nuxt-intlayer
```

## Exporte

### Modul

Das `nuxt-intlayer`-Paket stellt ein Nuxt-Modul bereit, um Intlayer in Ihr Nuxt-Projekt zu integrieren.

Import:

```tsx
import "nuxt-intlayer";
```

oder durch Hinzufügen zu `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Export    | Typ          | Beschreibung                                                      |
| --------- | ------------ | ----------------------------------------------------------------- |
| `default` | `NuxtModule` | Der Standardexport ist das Nuxt-Modul, das Intlayer konfiguriert. |
