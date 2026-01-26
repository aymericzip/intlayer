---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu astro-intlayer
description: Integracja Astro dla Intlayer, zapewniająca konfigurację routingu zależnego od locale i zarządzanie słownikami.
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet astro-intlayer

Pakiet `astro-intlayer` dostarcza niezbędnych narzędzi do integracji Intlayer z aplikacjami Astro. Konfiguruje routing zależny od locale oraz zarządzanie słownikami.

## Instalacja

```bash
npm install astro-intlayer
```

## Eksporty

### Integracja

Pakiet `astro-intlayer` udostępnia integrację dla Astro, umożliwiając skonfigurowanie Intlayer w Twoim projekcie.

Import:

```tsx
import "astro-intlayer";
```

lub dodając do `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Funkcja    | Opis                                                                |
| ---------- | ------------------------------------------------------------------- |
| `intlayer` | Integracja dla Astro, która konfiguruje Intlayer w Twoim projekcie. |
