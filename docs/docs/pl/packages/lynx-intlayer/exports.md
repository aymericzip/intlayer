---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Dokumentacja pakietu lynx-intlayer
description: "Pakiet lynx-intlayer integruje Intlayer z aplikacjami Lynx, dostarczając polyfille i helpery potrzebne do obsługi locale na urządzeniach mobilnych."
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Ujednolicona dokumentacja dla wszystkich eksportów"
author: aymericzip
---

# Pakiet lynx-intlayer

Pakiet `lynx-intlayer` dostarcza niezbędnych narzędzi do integracji Intlayer z aplikacjami Lynx.

## Instalacja

```bash
npm install lynx-intlayer
```

## Eksporty

### Polyfill

Import:

```tsx
import "lynx-intlayer";
```

| Funkcja            | Opis                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funkcja, która stosuje niezbędne polyfille, aby Lynx obsługiwał Intlayer. |

### Wtyczka Rsbuild

Pakiet `lynx-intlayer` dostarcza wtyczkę Rsbuild do integracji Intlayer z procesem budowania Lynx.

Import:

```tsx
import "lynx-intlayer";
```

| Funkcja              | Opis                                                            |
| -------------------- | --------------------------------------------------------------- |
| `pluginIntlayerLynx` | Wtyczka Rsbuild integrująca Intlayer z procesem budowania Lynx. |
