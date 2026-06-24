---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z next-intl do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Next.js z next-intl do Intlayer za pomocą adaptera kompatybilności."
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

# Migracja z next-intl do Intlayer

Aby zapoznać się z kompletnym i szczegółowym samouczkiem krok po kroku, zapraszamy do naszego pełnego [Przewodnika migracji z next-intl](../migration_from_next-intl_to_intlayer.md).

Migracja z `next-intl` do Intlayer pozwala ci utrzymać routing aplikacji i składnię całkowicie niezakłócone.

## Co zrobić

Wykonaj następujące polecenie w swoim repozytorium:

```bash
npx intlayer init
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
