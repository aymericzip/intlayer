---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von Polyglot.js zu Intlayer"
description: "Erfahren Sie, wie Sie von Polyglot.js zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von Polyglot.js zu Intlayer

Wenn Sie Airbnbs Polyglot.js verwenden, ist die Migration zu Intlayer mithilfe des Compat-Layers äußerst unkompliziert.

## Was zu tun ist

Führen Sie einfach den Initialisierungsbefehl in Ihrem Projekt aus:

```bash
npx intlayer init
```

Dadurch wird `intlayer.config.ts` generiert. Sie können dann den Bundler-Plugin-Alias verwenden, um Polyglot-Imports transparent zu `@intlayer/polyglot` weiterzuleiten.

## Was im Hintergrund geschieht

Die Syntax von Polyglot.js basiert typischerweise auf `polyglot.t('key', {name})` mit `%{name}`-Interpolationen und `smart_count`-Pluralen, die durch `"singular |||| plural"` getrennt sind.

Im Hintergrund:

- **Interpolation:** Der Compat-Layer behandelt `%{var}`-Platzhalter nativ.
- **Plurale:** Die Zeichenkette wird bei `||||` aufgeteilt und gegen native `Intl.PluralRules` gemäß der aktiven Locale ausgewertet, wobei Polygots eigene Bucket-Reihenfolge pro Locale gespiegelt wird.
- **Wörterbücher:** Sie umgehen die Notwendigkeit, riesige JSON-Konfigurationen an `new Polyglot()` bereitzustellen – Intlayer verwaltet die Wörterbücher dynamisch und bereinigt sie automatisch.
