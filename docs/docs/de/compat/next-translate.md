---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von Next Translate zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Next.js-Anwendung von next-translate zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von Next Translate zu Intlayer

Die Migration von `next-translate` zu Intlayer ist ein nahezu direkter Ersatz, der Ihre bestehende Syntax und Tags beibehält.

## Was zu tun ist

Initialisieren Sie Intlayer in Ihrem Projekt:

```bash
npx intlayer init
```

Die CLI richtet Ihre Konfiguration ein. Anschließend können Sie das Intlayer-Plugin in Ihrer `next.config.ts` anwenden, das Build-Zeit-Subpfad-Aliase injiziert und `next-translate/useTranslation` auf `@intlayer/next-translate` abbildet.

## Was im Hintergrund geschieht

`next-translate` stellt Hooks wie `useTranslation('ns')`, `t('ns:key.path')` und die `<Trans>`-Komponente bereit.

Im Hintergrund:

- **Interpolation & Plurale:** Es basiert eng auf dem `react-i18next`-Adapter-Verhalten. `{{var}}`-Platzhalter und Pluralisierung, die aus Suffixen wie `key_0`, `key_one` und `key_other` zugeordnet werden, werden dynamisch behandelt.
- **`<Trans>`-Komponente:** Direkt unterstützt für HTML-ähnliches Tag-Parsing neben einem arraybasierten `components`-Prop.
- **Namespaces:** Subpfad-Aliasing stellt sicher, dass Ihr `useTranslation` auf die korrekten internen Wörterbuch-Namespaces verweist, ohne manuelle Änderungen.
