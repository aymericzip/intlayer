---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: adapter zgodności dla next-intl"
description: "Zachowaj kod next-intl i serwuj go przez Intlayer: zainstaluj @intlayer/next-intl, ustaw aliasy importów i zobacz, co adapter zmienia pod spodem."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-intl: adapter zgodności dla next-intl

Aby zapoznać się z kompletnym i szczegółowym samouczkiem krok po kroku, zapraszamy do naszego pełnego [Przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md).

- [Przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md)

Migracja z `next-intl` do Intlayer pozwala ci utrzymać routing aplikacji i składnię całkowicie niezakłócone.

## Co zrobić

Wykonaj następujące polecenie w swoim repozytorium:

```bash
npx intlayer init --interactive
```

To będzie tworzyć `intlayer.config.ts`. W swoim `next.config.ts`, użyj opakowania wtyczki aby bezproblemowo wstrzyknąć aliasy `next-intl` do `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Co się dzieje za kulisami

Opakowywacz bundlera zastępuje tłumaczenia, ale **pozostawia funkcje `next-intl/navigation` nienaruszone** (np. `Link`, `redirect`, `usePathname`).

Za kulisami:

- **Runtime ICU:** Liczby mnoga (`=0`, `one`, `other`), select/selectordinal, argumenty `#` i sformatowane argumenty (`{ts, date, long}`) działają poprawnie używając wspólnego `resolveMessage(..., 'icu')` resolver.
- **`useTranslations()` & `getTranslations()`:** Wywołania zakresu bare wyodrębniają pierwszy segment klucza jako prawidłowy identyfikator słownika. Zagnieżdżone przestrzenie nazw łagodnie dzielą się na ścieżki słownika i prefiksy.
- **Formatowanie bogate:** Zarówno `t.rich()` jak i `t.markup()` są w pełni natywnie implementowane, konwertując węzły podobne do HTML na wyrenderowane fragmenty React.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` i nazwane formaty z konfiguracji mostu do podstawowych natywnych `Intl` formatów.

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj historię i18n w JavaScript.

- [Historia i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)
