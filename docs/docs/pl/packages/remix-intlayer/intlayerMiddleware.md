---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentacja middleware intlayer | remix-intlayer
description: Dowiedz się, jak używać middleware intlayer w Remix 3 do wykrywania języka, obsługi przekierowań i wstrzykiwania stanu Intlayer do kontekstu żądania.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Początkowa dokumentacja middleware intlayer"
author: aymericzip
---

# Middleware intlayer

Funkcja middleware `intlayer` konfiguruje internacjonalizację dla każdego żądania w aplikacjach Remix 3. Wykrywa język każdego przychodzącego żądania, stosuje reguły przekierowań URL i zachowuje stan języka w kontekście żądania.

## Użycie

Zarejestruj middleware w swoim routerze Remix:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## Jak to działa

Middleware wykonuje następujące zadania dla każdego przychodzącego żądania:

1. **Wykrywanie języka**: Wyodrębnia język z prefiksu ścieżki URL (np. `/pl/about`), plików cookie lub nagłówka `Accept-Language` zgodnie z konfiguracją Intlayer.
2. **Przekierowanie URL**: Jeśli żądana ścieżka nie zawiera prefiksu języka, a konfiguracja wymaga routingu z prefiksem, middleware zwraca odpowiedź przekierowującą (302/307/308) na odpowiedni adres URL z prefiksem.
3. **Wypełnianie kontekstu żądania**: Zapisuje aktualnie ustalony język w kontekście żądania Remix przy użyciu klucza `Intlayer`, umożliwiając hookom (`useLocale`, `useIntlayer`, `useDictionary`) bezpośredni dostęp.
4. **Zarządzanie plikami cookie**: Ustawia nagłówek `Set-Cookie`, gdy zachodzi potrzeba utrwalenia preferowanego języka użytkownika.

## Powiązana dokumentacja

- [Kontekst żądania `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/Intlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useIntlayer.md)
