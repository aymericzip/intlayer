---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von Lingui zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Anwendung von Lingui zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von Lingui zu Intlayer

Wenn Ihr Projekt derzeit auf Linguis makrobasierter Kompilierung basiert, ermöglicht Ihnen die Migration zu Intlayer, Ihre leistungsstarken Makro-Workflows beizubehalten und sie nativ mit Intlayers JSON-Kompilierungsstrategie zu unterstützen.

## Was zu tun ist

Um zu beginnen, initialisieren Sie Intlayer in Ihrem Projekt:

```bash
npx intlayer init
```

Dies erstellt Ihre `intlayer.config.ts`. Stellen Sie sicher, dass Sie `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` in Ihrem Build-Schritt behalten, damit es _vor_ dem Intlayer-Compiler ausgeführt wird. Verwenden Sie dann den Bundler-Plugin-Alias, um `@lingui/core` und `@lingui/react` zu `@intlayer/lingui` weiterzuleiten.

## Was im Hintergrund geschieht

Lingui verwendet Makros (wie `` t`Hello ${name}` `` und `<Trans>`), die in Laufzeitaufrufe wie `i18n._(id, values)` kompiliert werden.

Im Hintergrund:

- **Makros:** Sie kompilieren genau wie zuvor, ohne Unterbrechung in Ihrer Quellsyntax.
- **Laufzeitübersetzung:** Das aliasierte `i18n._()` verwendet Intlayer-Wörterbücher. Sowohl explizit benannte IDs als auch Hash-IDs werden mithilfe der `.po`-Sync-Plugins von Intlayer vollständig zugeordnet, um Schlüssel sicher zu aggregieren und zu bereinigen.
- **ICU-Fähigkeiten:** Die Unterstützung für Pluralisierung, Auswahl und ICU-Varianten bleibt dank des einheitlichen ICU-Parsers von Intlayer robust und gewährleistet identische Rendering-Ausgaben.
