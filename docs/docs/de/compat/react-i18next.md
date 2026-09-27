---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/react-i18next: Kompatibilitätsadapter für react-i18next"
description: "Behalten Sie Ihren react-i18next-Code und liefern Sie ihn mit Intlayer aus: @intlayer/react-i18next installieren, Imports umleiten und sehen, was der Adapter intern ändert."
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

# @intlayer/react-i18next: Kompatibilitätsadapter für react-i18next

Für ein vollständiges und detailliertes Schritt-für-Schritt-Tutorial lesen Sie bitte unsere vollständige [react-i18next Migrationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md).

- [react-i18next Migrationsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_react-i18next_to_intlayer.md)

Die Verwendung des Compat-Adapters von Intlayer ermöglicht Ihnen die Migration von `react-i18next` ohne Änderungen an den Imports Ihres Quellcodes.

## Was zu tun ist

Um das Projekt zu initialisieren, führen Sie aus:

```bash
npx intlayer init --interactive
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

> Um zu verstehen, woher diese Bibliotheken kommen, lesen Sie die Geschichte von i18n in JavaScript.

- [Die Geschichte von i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/history_of_i18n.md)
