---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von React Intl zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre React-Anwendung von react-intl zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von React Intl zu Intlayer

Wenn Ihre React-Anwendung `react-intl` (FormatJS) verwendet, ist der Übergang zu Intlayer ein Kinderspiel. Unser Compat-Layer behandelt ICU MessageFormat und alle bestehenden `Formatted*`-Komponenten nahtlos.

## Was zu tun ist

Beginnen Sie mit der Ausführung des Initialisierungsbefehls in Ihrem Projekt:

```bash
npx intlayer init
```

Richten Sie dann das Intlayer Vite- oder Next.js-Plugin in Ihrer Konfiguration ein. Dieses Plugin injiziert Build-Zeit-Aliase, um `react-intl`-Imports zu `@intlayer/react-intl` weiterzuleiten.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Was im Hintergrund geschieht

Das Bundler-Plugin aliasiert `react-intl` zu `@intlayer/react-intl`. Anstatt große JSON-Dateien manuell zu parsen und Ihre Anwendung in einem `IntlProvider` zu umhüllen, extrahiert das Intlayer-Plugin Schlüssel statisch und verwendet Intlayer-Wörterbücher zur Laufzeit.

Im Hintergrund:

- **ICU MessageFormat:** Intlayer verwendet den `resolveMessage(..., 'icu')`-Resolver, der die ICU-Pluralisierung, Auswahl, Datums-/Zahlenformatierung und Rich-Text-Tags vollständig nativ unterstützt.
- **Methoden- & JSX-Aufrufer:** `intl.formatMessage({ id: 'a.b' })` und `<FormattedMessage id="a.b">` werden durch die Intlayer-Compiler-Plugins (`@intlayer/babel` / `@intlayer/swc`) identifiziert, wobei flache, gepunktete Schlüssel so konvertiert werden, dass das erste Segment korrekt zum Intlayer-Wörterbuchschlüssel aufgelöst wird.
- **Formatter:** `<FormattedNumber>`, `<FormattedDate>` etc. überbrücken zu den nativen `core/formatters` mithilfe von `Intl`.
