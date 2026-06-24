---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z next-i18next do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Next.js z next-i18next do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z next-i18next do Intlayer

Aby zapoznać się z kompletnym i szczegółowym samouczkiem krok po kroku, zapraszamy do naszego pełnego [Przewodnika migracji z next-i18next](../migration_from_next-i18next_to_intlayer.md).

Intlayer obsługuje wszystkie implementacje Next.js Pages Router i App Router transparentnie. Korzystając z adaptera możesz przeprowadzić migrację swojej implementacji `next-i18next` bez przepisywania kodu.

## Co zrobić

Aby rozpocząć, uruchom:

```bash
npx intlayer init
```

To tworzy wymagany plik konfiguracji Intlayer. Aby przełączyć się na Intlayer za kulisami, zaktualizuj swój `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Co się dzieje za kulisami

Plugin `createNextI18nPlugin` komponuje natywne zachowanie Next.js wraz z podstawową wtyczką `next-intlayer`, wstrzykując wszystkie wymagane aliasy Webpack/Turbopack dla `next-i18next`, `react-i18next` i `i18next`.

Za kulisami:

- **`serverSideTranslations` & `appWithTranslation`:** Teraz funkcjonują jako opakowania dla wewnętrznych zaladowników Intlayer, omijając dużą statyczną iniekcję JSON.
- **Hooki klienckie:** Delegują natychmiast do `@intlayer/react-i18next` zachowując wszystkie funkcje formatowania, liczby mnogiej i zagnieżdżone przestrzenie nazw.
