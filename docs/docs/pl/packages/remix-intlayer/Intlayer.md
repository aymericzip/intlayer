---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
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

Gdy middleware `intlayer()` zostaje wykonane, zapisuje obiekt `IntlayerState` w kontekście żądania pod kluczem `Intlayer`. Możesz go pobrać w dowolnej procedurze obsługi trasy:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Dostęp przez context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Możesz również uzyskać do niego dostęp za pomocą skróconej formy bezpośredniej właściwości `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Struktura `IntlayerState`

Obiekt `IntlayerState` zawiera:

| Właściwość         | Typ                 | Opis                                                                      |
| ------------------ | ------------------- | ------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Lokalizacja ustalona dla bieżącego żądania.                               |
| `defaultLocale`    | `DeclaredLocales`   | Lokalizacja zapasowa zdefiniowana w `intlayer.config.ts`.                 |
| `availableLocales` | `DeclaredLocales[]` | Lista wszystkich obsługiwanych lokalizacji skonfigurowanych dla projektu. |

## Powiązana dokumentacja

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useIntlayer.md)
