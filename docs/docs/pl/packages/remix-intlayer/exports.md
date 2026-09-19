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

| Eksport    | Typ                            | Opis                                                                                                                | Powiązana dokumentacja                                                                                                 |
| ---------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | Klucz RequestContext / magazyn | Klucz kontekstu żądania używany do pobierania stanu Intlayer z kontekstu żądania Remix 3 (`context.get(Intlayer)`). | [Kontekst Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/Intlayer.md) |

### Hooki

| Eksport         | Typ  | Opis                                                                                                      | Powiązana dokumentacja                                                                                                       |
| --------------- | ---- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Hook | Pobiera i przetwarza zawartość słownika na podstawie klucza dla bieżącego języka żądania.                 | [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Zwraca zawartość zaimportowanego obiektu słownika odpowiadającą bieżącemu językowi żądania.               | [Hook useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Zapewnia dostęp do bieżącego języka żądania, domyślnego języka oraz listy dostępnych języków w projekcie. | [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)         |

## Szybki start

### Konfiguracja routera z middleware

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### Wykorzystanie treści w widokach i komponentach

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
