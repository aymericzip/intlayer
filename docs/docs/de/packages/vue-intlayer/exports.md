---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des vue-intlayer-Pakets
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
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname-Dienstprogramm hinzufügen"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Vereinheitlichte Dokumentation für alle Exporte"
author: aymericzip
---

# vue-intlayer-Paket

Das `vue-intlayer`-Paket stellt die notwendigen Werkzeuge bereit, um Intlayer in Vue-Anwendungen zu integrieren. Es enthält ein Vue-Plugin und Composables zur Verwaltung mehrsprachiger Inhalte.

## Installation

```bash
npm install vue-intlayer
```

## Exporte

### Plugin

Importieren:

```tsx
import "vue-intlayer";
```

| Funktion          | Beschreibung                                                |
| ----------------- | ----------------------------------------------------------- |
| `installIntlayer` | Vue-Plugin, um Intlayer in Ihrer Anwendung zu installieren. |

### Composable-Funktionen

Import:

```tsx
import "vue-intlayer";
```

| Composable             | Beschreibung                                                                                                                                            | Zugehörige Dokumentation                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basierend auf `useDictionary`, injiziert jedoch eine optimierte Version des Dictionarys aus der generierten Deklaration.                                | -                                                                                                                     |
| `useDictionary`        | Verarbeitet Objekte, die wie Dictionaries aussehen (key, content). Es verarbeitet `t()`-Übersetzungen, Enumerationen usw.                               | -                                                                                                                     |
| `useDictionaryAsync`   | Wie `useDictionary`, behandelt aber asynchrone Wörterbücher.                                                                                            | -                                                                                                                     |
| `useDictionaryDynamic` | Wie `useDictionary`, behandelt aber dynamische Wörterbücher.                                                                                            | -                                                                                                                     |
| `useLocale`            | Gibt die aktuelle Locale und eine Funktion zurück, um sie zu setzen.                                                                                    | -                                                                                                                     |
| `usePathname`          | Gibt den aktuellen Pfadnamen (pathname) als `ComputedRef<string>` zurück, bei dem das Locale-Segment entfernt wurde. Reaktiv auf `popstate`.            | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vue-intlayer/usePathname.md)     |
| `useRewriteURL`        | Clientseitiges Composable zur Verwaltung von URL-Umschreibungen. Aktualisiert die URL automatisch, wenn eine lokalisierte Umschreibregel vorhanden ist. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Gibt das Intl-Objekt für die aktuelle Locale zurück.                                                                                                    | -                                                                                                                     |
| `useLoadDynamic`       | Composable zum Laden dynamischer Wörterbücher.                                                                                                          | -                                                                                                                     |

### Funktionen

Import:

```tsx
import "vue-intlayer";
```

| Funktion        | Beschreibung                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Verarbeitet Objekte, die wie Wörterbücher aussehen (Schlüssel, Inhalt). Verarbeitet `t()`-Übersetzungen, Enumerationen etc. |
| `getIntlayer`   | Basierend auf `getDictionary`, fügt es jedoch eine optimierte Version des Wörterbuchs aus der generierten Deklaration ein.  |

### Markdown

Import:

```tsx
import "vue-intlayer/markdown";
```

| Funktion                  | Beschreibung                                                         |
| ------------------------- | -------------------------------------------------------------------- |
| `installIntlayerMarkdown` | Vue-Plugin, um Intlayer Markdown in Ihrer Anwendung zu installieren. |
