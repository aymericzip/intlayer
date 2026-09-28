---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
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

# Dokumentacja middleware intlayer dla Remix 3

Middleware `intlayer` dla Remix 3 zarządza warstwą internacjonalizacji w całej aplikacji. Zbudowany na standardach webowych (`Request` i `Response`), obsługuje routing oparty na języku (przekierowania i wewnętrzne przepisywanie adresów), wykrywa język żądania, utrwala go w plikach cookie i nagłówkach oraz tworzy zakres `AsyncLocalStorage`, dzięki czemu dalsze handlery i komponenty mogą uzyskać dostęp do tłumaczeń bez przekazywania propsów w dół drzewa.

## Użycie

Zarejestruj middleware `intlayer` podczas inicjalizacji routera Remix 3:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Obsługuje `/`, `/fr`, `/es`, język jest ustalany na podstawie żądania
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Opis

Middleware `intlayer` wykonuje następujące zadania:

1. **Przygotowanie słowników**: Uruchamia `prepareIntlayer` przy starcie, aby zapewnić, że wszystkie wygenerowane słowniki są zbudowane i dostępne.
2. **Routing oparty na języku**: Ocenia żądanie zgodnie ze skonfigurowaną strategią routingu (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Przekierowania**: Jeśli użytkownik odwiedza `/about` i powinien zostać skierowany do ścieżki z prefiksem języka (np. `/fr/about`), middleware zwraca odpowiedź przekierowującą z odpowiednimi nagłówkami `location` i `Set-Cookie`.
   - **Wewnętrzne przepisywanie**: Gdy użytkownik wchodzi na `/fr/about`, adres URL jest wewnętrznie przepisywany, aby handler trasy dopasował `/about`, a ustalony język jest zapisywany jako `fr`.
   - **Zlokalizowane aliasy URL**: Respektuje reguły przepisywania URL zdefiniowane w `intlayer.config.ts` (np. przepisanie `/fr/about` na `/fr/a-propos`).
3. **Ustalanie języka**: Wykrywa aktywny język na podstawie prefiksu URL, zapisanych plików cookie, niestandardowych nagłówków lub preferencji przeglądarki `Accept-Language`.
4. **Wstrzykiwanie kontekstu**:
   - Dołącza `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) do `RequestContext` Remix pod kluczem `Intlayer` oraz w `context.intlayer`.
   - Wykonuje resztę żądania w zakresie `AsyncLocalStorage` (`requestStorage`), umożliwiając wygodne wywoływanie `useIntlayer`, `useDictionary` i `useLocale` w handlerach, widokach i komponentach.
5. **Utrwalanie**: Dołącza wychodzące nagłówki i pliki cookie języka do końcowej odpowiedzi HTTP, aby zachować preferencję użytkownika.

## Parametry

Funkcja `intlayer` przyjmuje opcjonalne `IntlayerMiddlewareOptions`:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Niestandardowe nadpisania konfiguracji routingu
};

const middleware = intlayer(options);
```

## Bezpośredni dostęp do kontekstu

Oprócz korzystania z hooków możesz uzyskać dostęp do ustalonego `IntlayerState` bezpośrednio z kontekstu żądania Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Przez context.get()
  const state = context.get(Intlayer);

  // Lub przez bezpośrednią właściwość context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Powiązana dokumentacja

- [Kontekst żądania `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/Intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)
