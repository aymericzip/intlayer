---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentacja middleware onRequest | astro-intlayer
description: Zobacz, jak używać middleware onRequest w aplikacjach Astro do ustalania lokalizacji zapytania i uzupełniania Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja middleware Astro onRequest

Middleware `onRequest` z modułu `astro-intlayer/middleware` określa lokalizację każdego przychodzącego zapytania HTTP i uzupełnia obiekt `Astro.locals.intlayer`.

Po zarejestrowaniu integracji `intlayer()` w pliku `astro.config.mjs`, to middleware jest wstrzykiwane automatycznie. Bezpośredni import jest wymagany tylko wtedy, gdy ręcznie komponujesz łańcuch middleware Astro za pomocą `sequence(...)`.

## Użycie

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Dostęp do ustalonej lokalizacji w niestandardowym middleware
  const { locale } = context.locals.intlayer;
  console.log(`Obsługa zapytania dla lokalizacji: ${locale}`);

  return next();
});
```

## Opis

Middleware wykonuje następujące operacje:

1. **Wykrywanie lokalizacji**:
   - **URL**: Analizuje prefiks ścieżki URL lub parametr zapytania `?locale=` (chyba że `routing.mode` ustawiono na `no-prefix`).
   - **Ciasteczka / Nagłówki**: Sprawdza utrwalone ciasteczka lokalizacji lub wartości niestandardowych nagłówków.
   - **Accept-Language**: Wykorzystuje preferencje językowe przeglądarki w przypadku braku wcześniejszych danych.
   - Dla stron wstępnie renderowanych (`context.isPrerendered`) lokalizacja jest pobierana ściśle z adresu URL, co zapobiega ostrzeżeniom podczas budowania Astro.
2. **Wypełnianie kontekstu**: Uzupełnia `Astro.locals.intlayer` o:
   - `locale`: Ustaloną lokalizację.
   - `defaultLocale`: Domyślną lokalizację rezerwową.
   - `availableLocales`: Tablicę skonfigurowanych lokalizacji.
3. **Zakres AsyncLocalStorage**: Obejmuje dalsze przetwarzanie zapytania zakresem `AsyncLocalStorage`, co pozwala funkcjom `useIntlayer()`, `useDictionary()` oraz `useLocale()` na dostęp do stanu zapytania bez przekazywania argumentów.

## Typ `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Powiązana dokumentacja

- [Integracja `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useLocale.md)
