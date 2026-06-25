---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von next-intl zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Next.js-Anwendung von next-intl zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von next-intl zu Intlayer

Für ein vollständiges und detailliertes Schritt-für-Schritt-Tutorial lesen Sie bitte unsere vollständige [next-intl Migrationsanleitung](../migration_from_next-intl_to_intlayer.md).

Die Migration von `next-intl` zu Intlayer ermöglicht es Ihnen, Ihr Anwendungsrouting und Ihre Syntax vollständig ungestört beizubehalten.

## Was zu tun ist

Führen Sie den folgenden Befehl in Ihrem Repository aus:

```bash
npx intlayer init
```

Dadurch wird eine `intlayer.config.ts` erstellt. Verwenden Sie in Ihrer `next.config.ts` den Plugin-Wrapper, um die `next-intl`-Aliase nahtlos zu `@intlayer/next-intl` weiterzuleiten.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Was im Hintergrund geschieht

Der Bundler-Wrapper ersetzt Übersetzungen, **lässt die `next-intl/navigation`-Funktionen jedoch intakt** (z.B. `Link`, `redirect`, `usePathname`).

Im Hintergrund:

- **ICU-Laufzeit:** Plurale (`=0`, `one`, `other`), select/selectordinal, `#`-Argumente und formatierte Argumente (`{ts, date, long}`) werden korrekt mit dem gemeinsamen `resolveMessage(..., 'icu')`-Resolver ausgeführt.
- **`useTranslations()` & `getTranslations()`:** Die einfachen Scope-Aufrufe extrahieren das erste Schlüsselsegment als korrekten Wörterbuch-Bezeichner. Verschachtelte Namespaces werden elegant in Wörterbuchpfade und Präfixe aufgeteilt.
- **Rich Formatting:** Sowohl `t.rich()` als auch `t.markup()` sind vollständig nativ implementiert und konvertieren HTML-ähnliche Knoten in gerenderte React-Abschnitte.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` und benannte Formate aus der Konfiguration überbrücken zu den nativen `Intl`-Formatierern des Kerns.
