---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von i18next zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Vanilla JS/TS-Anwendung von i18next zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von i18next zu Intlayer

Für ein detailliertes Schritt-für-Schritt-Tutorial lesen Sie bitte unsere vollständige [i18next Migrationsanleitung](../migration_from_i18next_to_intlayer.md).

Intlayer repliziert die wichtigsten Laufzeiteigenschaften von `i18next` perfekt. Durch die Verwendung des Compat-Pakets können Ihre Vanilla-Anwendungen oder internen Module die vertraute Syntax weiterhin nutzen.

## Was zu tun ist

Um zu beginnen, initialisieren Sie Intlayer in Ihrem Projekt:

```bash
npx intlayer init
```

Wenn Sie Vite verwenden, fügen Sie das Intlayer-Plugin hinzu, um Imports zu `@intlayer/i18next` weiterzuleiten:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Was im Hintergrund geschieht

Das `i18nextVitePlugin` aliasiert `i18next`-Imports zu `@intlayer/i18next` und vermeidet so Bundle-Aufblähung durch JSON-Datei-Einschlüsse.

Im Hintergrund:

- **Instanzkonfiguration:** `createInstance` analysiert und wendet Namespace-Fallbacks korrekt an und nutzt dabei Intlayers Kompilierungs-Pipeline für den Wörterbuchabruf.
- **Interpolation:** Native Unterstützung für `{{name}}`-Ersetzungen und rekursives `$t(key)`-Verschachteln.
- **Kontext & Plurale:** Identifiziert und löst Suffix-Formate wie `key_male` und `key_one`/`key_other` auf, die gegen Standard-`Intl.PluralRules` ausgewertet werden.
- **Rückgabeobjekte:** Der Modus `returnObjects: true` extrahiert sicher Bäume aus Intlayer-Wörterbüchern.
