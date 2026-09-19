---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: Dokumentacja pakietu astro-intlayer
description: Integracja Astro dla Intlayer, zapewniająca routing oparty na lokalizacji, middleware, hooki, magazyn klienta i zarządzanie słownikami.
keywords:
  - astro-intlayer
  - astro
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Dodano dokumentację hooków useIntlayer, useDictionary, useLocale, middleware i formaterów"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Ujednolicona dokumentacja dla wszystkich eksportów"
author: aymericzip
---

# Pakiet astro-intlayer

Pakiet `astro-intlayer` dostarcza narzędzi do integracji Intlayer z aplikacjami Astro. Konfiguruje routing oparty na lokalizacji, zarządzanie słownikami, przepisywanie stron w czasie budowy, middleware zapytań oraz hooki do pobierania wielojęzycznych treści zarówno w komponentach `.astro` renderowanych po stronie serwera, jak i w skryptach klienta.

## Instalacja

```bash
npm install astro-intlayer
```

## Eksporty

### Integracja

Pakiet `astro-intlayer` dostarcza integrację Astro, która konfiguruje Intlayer w projekcie.

Import:

```tsx
import { intlayer } from "astro-intlayer";
```

lub import domyślny w `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Funkcja    | Opis                                                                                                                                                                                                     | Powiązana dokumentacja                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Integracja Astro, która przygotowuje słowniki, konfiguruje wtyczki Vite (aliasy, proxy routingu, usuwanie zbędnego kodu), automatycznie rejestruje middleware oraz generuje wstępnie renderowane strony. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/intlayer.md) |

### Hooki (Serwer i Klient)

Import:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Opis                                                                                                                                                                                      | Powiązana dokumentacja                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Pobiera słownik na podstawie klucza i zwraca zlokalizowaną treść. W sekcji frontmatter `.astro` odczytuje lokalizację z `Astro.locals`. W `<script>` klienta korzysta z magazynu klienta. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Przetwarza obiekt słownika i zwraca treść dla ustalonej lokalizacji. Działa w frontmatter oraz skryptach klienta.                                                                         | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Zwraca aktualną lokalizację, domyślną lokalizację, dostępne lokalizacje oraz funkcję do aktualizacji lokalizacji.                                                                         | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Import:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Eksport     | Typ                 | Opis                                                                                                                                                                  | Powiązana dokumentacja                                                                                          |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware Astro, które wykrywa lokalizację zapytania i dołącza `Astro.locals.intlayer`. Rejestrowane automatycznie przez `intlayer()` lub importowane do kompozycji. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/onRequest.md) |

### Narzędzia pomocnicze

Import:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Funkcja             | Opis                                                                                                        | Powiązana dokumentacja |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------- |
| `getIntlayerLocals` | Funkcja pomocnicza do pobierania obiektu `IntlayerLocals` z kontekstu zapytania poza zakresem Astro.locals. | -                      |

### Narzędzia klienta (astro-intlayer/client)

Import:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Po zaimportowaniu w przeglądarce lub wewnątrz tagów `<script>` klienta, `astro-intlayer` automatycznie mapuje do `astro-intlayer/client` (opartego na `vanilla-intlayer`), zapewniając gettery słowników po stronie klienta, subskrypcje magazynu oraz narzędzia do utrwalania lokalizacji.

### Formatery (astro-intlayer/format)

Import:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| Hook              | Opis                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Zwraca instancję Intl powiązaną z lokalizacją zapytania lub klienta, z obsługą pamięci podręcznej.        |
| `useDate`         | Zwraca funkcję formatowania daty powiązaną z bieżącą lokalizacją (`Intl.DateTimeFormat`).                 |
| `useNumber`       | Zwraca funkcję formatowania liczb powiązaną z bieżącą lokalizacją (`Intl.NumberFormat`).                  |
| `useCurrency`     | Zwraca funkcję formatowania waluty powiązaną z bieżącą lokalizacją.                                       |
| `usePercentage`   | Zwraca funkcję formatowania wartości procentowych powiązaną z bieżącą lokalizacją.                        |
| `useRelativeTime` | Zwraca funkcję formatowania czasu względnego powiązaną z bieżącą lokalizacją (`Intl.RelativeTimeFormat`). |
| `useList`         | Zwraca funkcję formatowania list powiązaną z bieżącą lokalizacją (`Intl.ListFormat`).                     |
| `useUnit`         | Zwraca funkcję formatowania jednostek powiązaną z bieżącą lokalizacją.                                    |
| `useCompact`      | Zwraca funkcję kompaktowego formatowania liczb powiązaną z bieżącą lokalizacją (np. `1.5K`).              |

### Narzędzia HTML (astro-intlayer/html)

Import:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Eksport           | Typ        | Opis                                                               |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| `renderHTML`      | `Function` | Samodzielna funkcja narzędziowa do renderowania węzłów HTML.       |
| `useHTML`         | `Hook`     | Hook do pobierania kontekstu dostawcy HTML oraz konfiguracji.      |
| `useHTMLRenderer` | `Hook`     | Hook do uzyskania wstępnie skonfigurowanej funkcji renderera HTML. |

### Narzędzia Markdown (astro-intlayer/markdown)

Import:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Eksport               | Typ        | Opis                                                                   |
| --------------------- | ---------- | ---------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Kompiluje ciągi znaków markdown do postaci ustrukturyzowanej.          |
| `renderMarkdown`      | `Function` | Renderuje zawartość markdown do węzłów wyjściowych.                    |
| `parseMarkdown`       | `Function` | Analizuje surową zawartość markdown do drzewa AST.                     |
| `useMarkdown`         | `Hook`     | Hook do pobierania kontekstu dostawcy markdown.                        |
| `useMarkdownRenderer` | `Hook`     | Hook do uzyskania wstępnie skonfigurowanej funkcji renderera Markdown. |

### Typy

Import:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Typ               | Opis                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | Obiekt dołączony do `Astro.locals.intlayer` zawierający `locale`, `defaultLocale` oraz `availableLocales`. |
| `UseLocaleProps`  | Opcjonalne właściwości konfiguracyjne akceptowane przez `useLocale()`.                                     |
| `UseLocaleResult` | Typ zwracany przez `useLocale()`, zapewniający właściwości lokalizacji i metody aktualizacji.              |
