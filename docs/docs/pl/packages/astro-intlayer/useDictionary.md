---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentacja hooka useDictionary | astro-intlayer
description: Zobacz, jak używać hooka useDictionary w komponentach i skryptach Astro do przetwarzania obiektów słowników.
keywords:
  - useDictionary
  - słownik
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja hooka useDictionary

Hook `useDictionary` przetwarza zaimportowany lub zdefiniowany w miejscu obiekt słownika i zwraca jego zawartość dla bieżącej lokalizacji w aplikacjach Astro.

W przeciwieństwie do `useIntlayer`, który pobiera słowniki według klucza z globalnego rejestru słowników, `useDictionary` operuje bezpośrednio na obiekcie słownika.

## Użycie

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Możesz także przekazywać słowniki zdefiniowane bezpośrednio za pomocą funkcji `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      pl: "Wszelkie prawa zastrzeżone.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parametry

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Obiekt słownika lub zakwalifikowana grupa słowników.
2. **`localeOrSelector`** (opcjonalny): Konkretna lokalizacja lub obiekt selektora (`{ item }`, `{ variant }`, opcjonalnie z `locale`).

## Opis

Hook wykonuje następujące zadania:

1. **Wykrywanie lokalizacji**: Na serwerze pobiera lokalizację z `Astro.locals.intlayer`. W przeglądarce korzysta z lokalizacji magazynu po stronie klienta.
2. **Przetwarzanie treści**: Rozwiązuje tłumaczenia (`t()`), wyliczenia, warunki oraz zagnieżdżone struktury zgodnie z ustaloną lokalizacją.
3. **Selektory**: Stosuje selektory elementów lub wariantów dostarczone w argumentach.

## Powiązana dokumentacja

- [Integracja `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/astro-intlayer/useLocale.md)
