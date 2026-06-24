---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z Next Translate do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Next.js z next-translate do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z Next Translate do Intlayer

Migracja z `next-translate` do Intlayer to prawie drop-in replacement, który zachowuje istniejącą składnię i tagi.

## Co zrobić

Zainicjuj Intlayer w swoim projekcie:

```bash
npx intlayer init
```

CLI będzie budować twoją konfigurację. Możesz następnie zastosować wtyczkę Intlayer w swoim `next.config.ts`, która wstrzykuje aliasy ścieżki czasu budowania mapujące `next-translate/useTranslation` do `@intlayer/next-translate`.

## Co się dzieje za kulisami

`next-translate` zapewnia hooki takie jak `useTranslation('ns')`, `t('ns:key.path')` i komponent `<Trans>`.

Za kulisami:

- **Interpolacja i liczba mnoga:** Opiera się ściśle na zachowaniu adaptera `react-i18next`. Dynamicznie obsługiwane są symbole zastępcze `{{var}}` i pluralizacja mapowana z sufiksów takich jak `key_0`, `key_one` i `key_other`.
- **Komponent `<Trans>`:** Bezpośrednio obsługiwany do parsowania tagów podobnych do HTML wraz z prop `components` na podstawie tablic.
- **Przestrzenie nazw:** Aliasing ścieżki podrzędnej zapewnia, że twoje referencje `useTranslation` odwołują się do prawidłowych wewnętrznych słowników przestrzeni nazw bez ręcznej modyfikacji.
