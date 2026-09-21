---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentacja hooka useIntlayer | remix-intlayer
description: Zobacz, jak używać hooka useIntlayer w aplikacjach Remix 3, aby uzyskać dostęp do zlokalizowanej zawartości według klucza.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - internacjonalizacja
  - dokumentacja
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Początkowa dokumentacja hooka useIntlayer"
author: aymericzip
---

# Dokumentacja hooka useIntlayer

Hook `useIntlayer` umożliwia pobieranie zlokalizowanej zawartości ze słownika Intlayer według klucza w aplikacjach Remix 3.

Automatycznie odczytuje aktywny język z bieżącego kontekstu żądania (za pośrednictwem `AsyncLocalStorage`), dzięki czemu nie trzeba przekazywać języka przez procedury obsługi tras, szablony widoków ani komponenty.

## Użycie

### W procedurach obsługi tras

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### W szablonach widoków i komponentach

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parametry

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Unikalny klucz słownika (zgodnie z definicją w plikach deklaracji `.content.ts`).
2. **`localeOrSelector`** (opcjonalnie): Określony język lub obiekt selektora (`{ item }`, `{ variant }`, opcjonalnie z `locale`). Jeśli zostanie podany, nadpisuje język wykryty z kontekstu żądania.

## Opis

Hook wykonuje następujące zadania:

1. **Wykrywanie języka z kontekstu**: Wykrywa bieżący język z zakresu `AsyncLocalStorage` powiązanego z żądaniem, ustanowionego przez middleware `intlayer()`.
2. **Pobieranie słownika**: Pobiera wstępnie skompilowany słownik odpowiadający podanemu kluczowi.
3. **Przetwarzanie tłumaczeń**: Rozwiązuje tłumaczenia, wyliczenia, markdown i zawartość warunkową dla ustalonego języka.
4. **Obsługa fallbacku**: W przypadku wywołania poza aktywnym kontekstem żądania HTTP (np. zadania w tle lub testy jednostkowe bez middleware) bezpiecznie powraca do skonfigurowanego `defaultLocale`.

## Powiązana dokumentacja

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)
