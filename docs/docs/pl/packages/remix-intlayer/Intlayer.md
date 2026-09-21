---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentacja kontekstu Intlayer | remix-intlayer
description: Dokumentacja klucza magazynu kontekstu żądania Intlayer w aplikacjach Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - kontekst żądania
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Początkowa dokumentacja klucza kontekstu Intlayer"
author: aymericzip
---

# Klucz kontekstu żądania Intlayer

Eksport `Intlayer` służy jako identyfikator magazynu kontekstu żądania w Remix 3. Pozwala na bezpośrednie pobranie stanu Intlayer z obiektu kontekstu Remix wewnątrz procedur obsługi tras lub niestandardowego middleware.

## Użycie

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## Opis

`Intlayer` jest używany przez middleware `intlayer()` do powiązania bieżącego stanu sesji z kontekstem żądania Remix (`RequestContext`). Zazwyczaj zaleca się korzystanie z hooków, takich jak `useLocale()` lub `useIntlayer()`. Bezpośredni dostęp przez `context.get(Intlayer)` jest przydatny w niskopoziomowych procedurach obsługi middleware lub trasach API, gdzie instancja kontekstu jest przekazywana jawnie.

## Powiązana dokumentacja

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)
