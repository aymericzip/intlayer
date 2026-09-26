---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentacja hooka useDictionary | remix-intlayer
description: Zobacz, jak używać hooka useDictionary w aplikacjach Remix 3, aby rozwiązywać obiekty słowników dla bieżącego języka żądania.
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Początkowa dokumentacja hooka useDictionary"
author: aymericzip
---

# Dokumentacja hooka useDictionary

Hook `useDictionary` przekształca zaimportowany lub wbudowany obiekt słownika i zwraca jego zawartość rozwiązaną dla języka bieżącego żądania w aplikacjach Remix 3.

W przeciwieństwie do `useIntlayer`, który pobiera słowniki na podstawie ich klucza tekstowego z globalnego rejestru słowników, `useDictionary` przyjmuje bezpośrednio obiekt słownika.

## Użycie

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Możesz także przekazywać wbudowane słowniki zdefiniowane za pomocą `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        pl: "Wszelkie prawa zastrzeżone.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parametry

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Obiekt słownika lub kwalifikowana grupa słowników.
2. **`localeOrSelector`** (opcjonalnie): Określony język lub obiekt selektora (`{ item }`, `{ variant }`, opcjonalnie z `locale`). Ma pierwszeństwo przed językiem żądania, jeśli zostanie podany.

## Opis

Hook wykonuje następujące zadania:

1. **Wykrywanie języka**: Odczytuje aktywny język żądania z magazynu `AsyncLocalStorage` utworzonego przez middleware `intlayer()`.
2. **Rozwiązywanie zawartości**: Ewaluuje tłumaczenia (`t()`), wyliczenia, warunki i zagnieżdżone struktury zgodnie z ustalonym językiem.
3. **Przetwarzanie selektorów**: Stosuje wszelkie selektory elementów lub wariantów określone w argumentach.

## Powiązana dokumentacja

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/remix-intlayer/useLocale.md)
