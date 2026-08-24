---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Dokumentacja pakietu elysia-intlayer
description: Wtyczka Elysia dla Intlayer, zapewniająca funkcje tłumaczeń i wykrywanie locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Ujednolicona dokumentacja dla wszystkich eksportów"
author: aymericzip
---

# Pakiet elysia-intlayer

Pakiet `elysia-intlayer` udostępnia wtyczkę dla aplikacji Elysia do obsługi internationalization (i18n). Wykrywa locale użytkownika i wstrzykuje obiekt `intlayer` do kontekstu route.

## Instalacja

```bash
npm install elysia-intlayer
```

## Eksporty

### Wtyczka

Import:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Funkcja    | Opis                                                                                                                                                                                                                                                                                                                           | Powiązana dokumentacja                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Wtyczka Elysia integrująca Intlayer z Twoją aplikacją Elysia. Obsługuje wykrywanie locale ze storage (cookies, headers), a następnie z `Accept-Language`, wstrzykuje obiekt `intlayer` udostępniający `locale`, `t`, `getIntlayer` i `getDictionary` do kontekstu route oraz konfiguruje kontekst żądania `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/elysia-intlayer/intlayer.md) |

### Funkcje

Import:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Funkcja         | Opis                                                                                                                                                                                                                                                                    | Powiązana dokumentacja                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Globalna funkcja tłumaczenia pobierająca treść dla bieżącego locale w Elysia. Używa `AsyncLocalStorage`, aby uzyskać dostęp do kontekstu żądania skonfigurowanego przez wtyczkę `intlayer`, a poza nim wraca do domyślnego locale. Dostępna również przez `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `getIntlayer`   | Pobiera słownik po kluczu z wygenerowanej deklaracji i zwraca jego treść dla bieżącego locale. Zoptymalizowana wersja `getDictionary`. Używa `AsyncLocalStorage`, aby uzyskać dostęp do kontekstu żądania. Dostępna również przez `intlayer.getIntlayer`.               | -                                                                                                      |
| `getDictionary` | Przetwarza obiekty słowników i zwraca treść dla bieżącego locale. Przetwarza tłumaczenia `t()`, enumeracje, markdown, HTML itd. Używa `AsyncLocalStorage`, aby uzyskać dostęp do kontekstu żądania. Dostępna również przez `intlayer.getDictionary`.                    | -                                                                                                      |

### Typy

Import:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Typ                 | Opis                                                                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Kształt obiektu `intlayer` wstrzykiwanego do każdego kontekstu route: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Sygnatura funkcji tłumaczenia, przekształcającej locale map w treść odpowiadającą locale bieżącego żądania.                                                                |
