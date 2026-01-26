---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu vite-intlayer
description: Wtyczka Vite dla Intlayer, dostarczająca aliasy słowników i obserwatory.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet vite-intlayer

Pakiet `vite-intlayer` dostarcza wtyczkę Vite do integracji Intlayer z Twoją aplikacją opartą na Vite.

## Instalacja

```bash
npm install vite-intlayer
```

## Eksporty

### Wtyczka

Import:

```tsx
import "vite-intlayer";
```

| Funkcja              | Opis                                                                                            | Powiązana dokumentacja                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Główny plugin Vite, który integruje Intlayer z procesem budowania.                              | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Przestarzały**) Alias dla `intlayer`.                                                        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Wtyczka middleware do środowiska deweloperskiego obsługująca wykrywanie lokalizacji i routingu. | -                                                                                                                      |
| `intlayerMiddleware` | (**Przestarzały**) Alias dla `intlayerProxy`.                                                   | -                                                                                                                      |
| `intlayerPrune`      | Wtyczka do tree-shake i usuwania nieużywanych słowników podczas builda.                         | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayerPrune.md) |
