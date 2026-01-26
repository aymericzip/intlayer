---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer Paketdokumentation
description: Vue-spezifische Integration für Intlayer, die Plugins und Composables für Vue-Anwendungen bereitstellt.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Einheitliche Dokumentation für alle Exporte
---

# vue-intlayer Paket

Das `vue-intlayer`-Paket stellt die notwendigen Werkzeuge zur Integration von Intlayer in Vue-Anwendungen bereit. Es enthält ein Vue-Plugin und Composables zur Verwaltung mehrsprachiger Inhalte.

## Installation

```bash
npm install vue-intlayer
```

## Exports

### Plugin

| Funktion          | Beschreibung                                                |
| ----------------- | ----------------------------------------------------------- |
| `installIntlayer` | Vue-Plugin, um Intlayer in Ihrer Anwendung zu installieren. |

### Composables

| Composable      | Beschreibung                                                                        |
| --------------- | ----------------------------------------------------------------------------------- |
| `useIntlayer`   | Wählt ein Wörterbuch anhand seines Schlüssels aus und gibt den Inhalt zurück.       |
| `useDictionary` | Wählt ein Wörterbuch anhand seines Schlüssels aus und gibt den Inhalt zurück.       |
| `useLocale`     | Gibt die aktuelle Locale und eine Funktion zurück, mit der sie gesetzt werden kann. |
| `useIntl`       | Gibt das Intl-Objekt für die aktuelle Locale zurück.                                |

### Funktionen

| Funktion        | Beschreibung                          |
| --------------- | ------------------------------------- |
| `getDictionary` | Ruft ein Wörterbuch ab.               |
| `getIntlayer`   | Ruft Inhalte aus einem Wörterbuch ab. |

### Markdown

| Funktion                  | Beschreibung                                                         |
| ------------------------- | -------------------------------------------------------------------- |
| `installIntlayerMarkdown` | Vue-Plugin, um Intlayer Markdown in Ihrer Anwendung zu installieren. |
