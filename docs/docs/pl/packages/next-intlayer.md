---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu next-intlayer
description: Integracja Intlayer specyficzna dla Next.js, zapewniająca middleware i providery dla App Router i Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Pakiet next-intlayer

Pakiet `next-intlayer` dostarcza niezbędnych narzędzi do integracji Intlayer z aplikacjami Next.js. Obsługuje zarówno App Router, jak i Page Router, w tym middleware do routingu opartego na lokalizacji.

## Instalacja

```bash
npm install next-intlayer
```

## Eksporty

### Middleware

| Funkcja              | Opis                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware Next.js obsługujący routing i przekierowania oparte na locale. |

### Providery

| Komponent                | Opis                                                                |
| ------------------------ | ------------------------------------------------------------------- |
| `IntlayerClientProvider` | Provider dla komponentów po stronie klienta w Next.js.              |
| `IntlayerServerProvider` | Provider dla komponentów po stronie serwera w Next.js (App Router). |

### Hooki (po stronie klienta)

Reeksportuje większość hooków z `react-intlayer`.

| Hook            | Opis                                                   |
| --------------- | ------------------------------------------------------ |
| `useIntlayer`   | Wybiera słownik według jego klucza i zwraca zawartość. |
| `useDictionary` | Wybiera słownik według jego klucza i zwraca zawartość. |
| `useLocale`     | Zwraca bieżący locale i funkcję do jego ustawienia.    |
| `useI18n`       | Zwraca bieżące wartości kontekstu Intlayer.            |

### Funkcje (po stronie serwera)

| Funkcja                | Opis                                                                             |
| ---------------------- | -------------------------------------------------------------------------------- |
| `t`                    | Wersja funkcji tłumaczenia działająca po stronie serwera dla Next.js App Router. |
| `generateStaticParams` | Generuje statyczne parametry dla dynamicznych tras Next.js.                      |

### Typy

| Typ                  | Opis                                         |
| -------------------- | -------------------------------------------- |
| `NextPageIntlayer`   | Typ dla stron Next.js z obsługą Intlayer.    |
| `NextLayoutIntlayer` | Typ dla layoutów Next.js z obsługą Intlayer. |
