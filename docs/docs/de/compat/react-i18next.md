---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von react-i18next zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre React-Anwendung von react-i18next zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von react-i18next zu Intlayer

Für ein vollständiges und detailliertes Schritt-für-Schritt-Tutorial lesen Sie bitte unsere vollständige [react-i18next Migrationsanleitung](../migration_from_react-i18next_to_intlayer.md).

Die Verwendung des Compat-Adapters von Intlayer ermöglicht Ihnen die Migration von `react-i18next` ohne Änderungen an den Imports Ihres Quellcodes.

## Was zu tun ist

Um das Projekt zu initialisieren, führen Sie aus:

```bash
npx intlayer init
```

Während der Initialisierung installiert Intlayer `@intlayer/react-i18next` und erstellt `intlayer.config.ts`. Wenden Sie in Ihrem Bundler (wie Vite) das Intlayer-Plugin an:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Was im Hintergrund geschieht

Das `reactI18nextVitePlugin` umhüllt das Kern-`vite-intlayer`-Plugin und injiziert Auflösungs-Aliase für `react-i18next` und `i18next`, die sie zu `@intlayer/react-i18next` und `@intlayer/i18next` weiterleiten.

Im Hintergrund:

- **`useTranslation` & `withTranslation`:** Neu geschrieben, um Intlayers native Hooks zu verwenden, und bietet Ihnen automatische TypeScript-Vervollständigung für Ihre Wörterbuchschlüssel. Unterstützt nahtlos Namespaces (z.B. `t('namespace:key')`).
- **Plurale & Kontext:** Behandelt i18nexts suffixbasierte Pluralisierung (`key_one`, `key_other`) mithilfe nativer `Intl.PluralRules` und Kontextsuffixe (`key_male`).
- **`<Trans>`-Komponente:** Neu implementiert, um das `components`-Prop, Objekt- und Array-Formen und nummerierte Tags `<1>...</1>` zu unterstützen, die direkt Ihren React-Knoten zugeordnet werden.
- **`i18n`-Instanz:** Löst Schlüssel direkt aus Intlayer auf, ohne große JSON-Dateien abzurufen, was zu deutlich kleineren Bundle-Größen führt.
