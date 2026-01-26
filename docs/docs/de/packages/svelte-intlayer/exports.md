---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: svelte-intlayer Paketdokumentation
description: Svelte-spezifische Integration für Intlayer, die Setup-Funktionen und Stores für Svelte-Anwendungen bereitstellt.
keywords:
  - svelte-intlayer
  - svelte
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# svelte-intlayer Paket

Das `svelte-intlayer`-Paket stellt die notwendigen Werkzeuge bereit, um Intlayer in Svelte-Anwendungen zu integrieren. Es enthält Setup-Funktionen und Stores zur Verwaltung mehrsprachiger Inhalte.

## Installation

```bash
npm install svelte-intlayer
```

## Exporte

### Einrichtung

Importieren:

```tsx
import "svelte-intlayer";
```

| Funktion        | Beschreibung                                                    |
| --------------- | --------------------------------------------------------------- |
| `setupIntlayer` | Funktion zum Einrichten von Intlayer in Ihrer Svelte-Anwendung. |

### Store

Importieren:

```tsx
import "svelte-intlayer";
```

| Store           | Beschreibung                                              |
| --------------- | --------------------------------------------------------- |
| `intlayerStore` | Svelte-Store, der den aktuellen Intlayer-Zustand enthält. |

### Hooks (Kontext)

Importieren:

```tsx
import "svelte-intlayer";
```

| Funktion               | Beschreibung                                                                                                                                 | Verwandte Doku                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Basierend auf `useDictionary`, injiziert jedoch eine optimierte Version des Dictionarys aus der generierten Deklaration.                     | -                                                                                                                        |
| `useDictionary`        | Verarbeitet Objekte, die wie Dictionaries aufgebaut sind (key, content). Verarbeitet `t()`-Übersetzungen, enumerations, etc.                 | -                                                                                                                        |
| `useDictionaryAsync`   | Wie `useDictionary`, behandelt jedoch asynchrone Dictionaries.                                                                               | -                                                                                                                        |
| `useDictionaryDynamic` | Wie `useDictionary`, behandelt jedoch dynamische Dictionaries.                                                                               | -                                                                                                                        |
| `useLocale`            | Gibt die aktuelle Locale zurück und eine Funktion, um sie zu setzen.                                                                         | -                                                                                                                        |
| `useRewriteURL`        | Clientseitige Funktion zum Verwalten von URL-Rewrites. Aktualisiert die URL automatisch, wenn eine lokalisierte Rewrite-Regel vorhanden ist. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Gibt das Intl-Objekt für die aktuelle Locale zurück.                                                                                         | -                                                                                                                        |

### Markdown

Importieren:

```tsx
import "svelte-intlayer";
```

| Funktion              | Beschreibung                                                             |
| --------------------- | ------------------------------------------------------------------------ |
| `setIntlayerMarkdown` | Funktion, um den Markdown-Kontext in Ihrer Svelte-Anwendung festzulegen. |
