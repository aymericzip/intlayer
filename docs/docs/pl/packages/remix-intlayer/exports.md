---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentacja pakietu remix-intlayer
description: Dokumentacja eksportów pakietu remix-intlayer, zapewniającego internacjonalizację (i18n) dla aplikacji Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Początkowa dokumentacja eksportów remix-intlayer"
author: aymericzip
---

# Pakiet remix-intlayer

Pakiet `remix-intlayer` dostarcza narzędzia do integracji Intlayer z aplikacjami Remix 3. Zawiera middleware do wykrywania języka (locale) żądania, dostęp do kontekstu żądania oraz hooki do pobierania słowników i zarządzania językami.

## Instalacja

```bash
npm install remix-intlayer
```

## Eksporty pakietu

### Middleware

| Eksport    | Typ                | Opis                                                                                                             | Powiązana dokumentacja                                                                                                             |
| ---------- | ------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Funkcja middleware | Middleware dla Remix 3 wykrywające język żądania, zarządzające przekierowaniami i wypełniające kontekst żądania. | [Middleware intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/intlayerMiddleware.md) |

### Przechowywanie kontekstu

| Eksport                     | Typ                            | Opis                                                                                                                                                            | Powiązana dokumentacja                                                                                                 |
| --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | Klucz RequestContext / magazyn | Klucz kontekstu żądania używany do pobierania stanu Intlayer z kontekstu żądania Remix 3 (`context.get(Intlayer)`).                                             | [Kontekst Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                       | Nazwa właściwości (`'intlayer'`) zainstalowana bezpośrednio w kontekście żądania, umożliwiająca dostęp poprzez `context.intlayer` oraz `context.get(Intlayer)`. | -                                                                                                                      |

### Hooki

| Eksport         | Typ  | Opis                                                                                                      | Powiązana dokumentacja                                                                                                       |
| --------------- | ---- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Hook | Pobiera i przetwarza zawartość słownika na podstawie klucza dla bieżącego języka żądania.                 | [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Zwraca zawartość zaimportowanego obiektu słownika odpowiadającą bieżącemu językowi żądania.               | [Hook useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Zapewnia dostęp do bieżącego języka żądania, domyślnego języka oraz listy dostępnych języków w projekcie. | [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)         |

### Narzędzia pomocnicze

Import:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Funkcja               | Opis                                                                                                                                                  | Powiązana dokumentacja |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `createLocaleRouting` | Czysta funkcja obliczająca decyzję o routingu na podstawie locale (`redirect`, `rewrite` lub `pass`) dla danego żądania, konfiguracji i opcji.        | -                      |
| `getIntlayerState`    | Odczytuje bieżący stan `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) z zakresu żądania `AsyncLocalStorage` poza komponentami React. | -                      |

### Formatery (remix-intlayer/format)

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
} from "remix-intlayer/format";
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

### Narzędzia HTML (remix-intlayer/html)

Import:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Eksport           | Typ        | Opis                                                               |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| `renderHTML`      | `Function` | Samodzielna funkcja narzędziowa do renderowania węzłów HTML.       |
| `useHTML`         | `Hook`     | Hook do pobierania kontekstu dostawcy HTML oraz konfiguracji.      |
| `useHTMLRenderer` | `Hook`     | Hook do uzyskania wstępnie skonfigurowanej funkcji renderera HTML. |

### Narzędzia Markdown (remix-intlayer/markdown)

Import:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
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
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Typ                         | Opis                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Obiekt stanu przechowujący `locale`, `defaultLocale` i `availableLocales` w kontekście żądania Remix. |
| `IntlayerMiddlewareOptions` | Opcje konfiguracyjne przekazywane do middleware `intlayer()`.                                         |
| `LocaleRoutingOptions`      | Opcje dostosowujące prefiksowanie locale, wykrywanie i przekierowania.                                |
| `LocaleRoutingAction`       | Dyskryminowana unia reprezentująca decyzję o routingu: `redirect`, `rewrite` lub `pass`.              |
| `LocaleRoutingRequest`      | Minimalna reprezentacja żądania wymagana przez `createLocaleRouting`.                                 |
| `UseLocaleResult`           | Typ zwracany przez `useLocale()`, zawierający `locale`, `defaultLocale` i `availableLocales`.         |
