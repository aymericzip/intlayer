---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu nuxt-intlayer
description: Integracja Nuxt dla Intlayer, dostarczająca moduł dla aplikacji Nuxt.
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
    changes: Ujednolicona dokumentacja wszystkich eksportów
---

# Pakiet nuxt-intlayer

Pakiet `nuxt-intlayer` dostarcza moduł Nuxt umożliwiający integrację Intlayer z Twoim projektem Nuxt.

## Instalacja

```bash
npm install nuxt-intlayer
```

## Eksporty

### Moduł

Pakiet `nuxt-intlayer` dostarcza moduł Nuxt umożliwiający integrację Intlayer z Twoim projektem Nuxt.

Import:

```tsx
import "nuxt-intlayer";
```

lub dodając do `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Eksport   | Typ          | Opis                                                        |
| --------- | ------------ | ----------------------------------------------------------- |
| `default` | `NuxtModule` | Eksport domyślny to moduł Nuxt, który konfiguruje Intlayer. |
