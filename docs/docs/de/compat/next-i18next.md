---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next: Kompatibilitätsadapter für next-i18next"
description: "Behalten Sie Ihren next-i18next-Code und liefern Sie ihn mit Intlayer aus: @intlayer/next-i18next installieren, Imports umleiten und sehen, was der Adapter intern ändert."
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

# @intlayer/next-i18next: Kompatibilitätsadapter für next-i18next

Für ein vollständiges und detailliertes Schritt-für-Schritt-Tutorial lesen Sie bitte unsere vollständige [next-i18next Migrationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-i18next_to_intlayer.md).

Intlayer behandelt alle Next.js Pages Router- und App Router-Implementierungen transparent. Die Verwendung des Adapters ermöglicht Ihnen die Migration Ihrer `next-i18next`-Implementierung ohne Code-Umschreiben.

## Was zu tun ist

Um zu beginnen, führen Sie aus:

```bash
npx intlayer init --interactive
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

> Um zu verstehen, woher diese Bibliotheken kommen, lesen Sie die Geschichte von i18n in JavaScript.

- [Die Geschichte von i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)
