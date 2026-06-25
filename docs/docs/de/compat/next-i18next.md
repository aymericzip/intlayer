---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von next-i18next zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Next.js-Anwendung von next-i18next zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von next-i18next zu Intlayer

Für ein vollständiges und detailliertes Schritt-für-Schritt-Tutorial lesen Sie bitte unsere vollständige [next-i18next Migrationsanleitung](../migration_from_next-i18next_to_intlayer.md).

Intlayer behandelt alle Next.js Pages Router- und App Router-Implementierungen transparent. Die Verwendung des Adapters ermöglicht Ihnen die Migration Ihrer `next-i18next`-Implementierung ohne Code-Umschreiben.

## Was zu tun ist

Um zu beginnen, führen Sie aus:

```bash
npx intlayer init
```

Dies erstellt die erforderliche Intlayer-Setup-Datei. Um im Hintergrund zu Intlayer zu wechseln, aktualisieren Sie Ihre `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Was im Hintergrund geschieht

Das `createNextI18nPlugin` kombiniert das native Verhalten von Next.js mit dem Kern-`next-intlayer`-Plugin und injiziert alle erforderlichen Webpack/Turbopack-Aliase für `next-i18next`, `react-i18next` und `i18next`.

Im Hintergrund:

- **`serverSideTranslations` & `appWithTranslation`:** Sie fungieren nun als Wrapper für Intlayers interne Loader und umgehen die umfangreiche statische JSON-Injektion.
- **Client-Hooks:** Delegiert sofort an `@intlayer/react-i18next` und behält alle Formatierungs-, Plural- und verschachtelte Namespace-Funktionen bei.
