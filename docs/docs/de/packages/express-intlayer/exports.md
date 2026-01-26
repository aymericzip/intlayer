---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer Paketdokumentation
description: Express-Middleware für Intlayer, die Übersetzungsfunktionen und Lokalerkennung bereitstellt.
keywords:
  - express-intlayer
  - express
  - middleware
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# express-intlayer-Paket

Das Paket `express-intlayer` stellt eine Middleware für Express-Anwendungen zur Internationalisierung bereit. Es erkennt die Locale des Benutzers und bietet Übersetzungsfunktionen.

## Installation

```bash
npm install express-intlayer
```

## Exporte

### Middleware

Import:

```tsx
import "express-intlayer";
```

| Funktion   | Beschreibung                                                                                                                                                                                                                                                                                                  | Zugehörige Dokumentation                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Express-Middleware, die die Locale des Benutzers erkennt und `res.locals` mit Intlayer-Daten befüllt. Führt die Lokalerkennung über Cookies/Headers durch, injiziert `t`, `getIntlayer` und `getDictionary` in `res.locals` und richtet ein CLS-Namespace für den Zugriff während des Request-Lifecycles ein. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/express-intlayer/intlayer.md) |

### Funktionen

Import:

```tsx
import "express-intlayer";
```

| Funktion        | Beschreibung                                                                                                                                                                                                                            | Zugehöriges Dokument                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `t`             | Übersetzungsfunktion, die Inhalte für die aktuelle Locale abruft. Arbeitet innerhalb des von der `intlayer`-Middleware verwalteten Request-Lifecycles. Verwendet CLS (Async Local Storage), um auf den Request-Kontext zuzugreifen.     | [Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/translation.md) |
| `getIntlayer`   | Ruft ein Wörterbuch anhand seines Schlüssels aus der generierten Deklaration ab und gibt dessen Inhalt für die angegebene Locale zurück. Optimierte Version von `getDictionary`. Verwendet CLS, um auf den Request-Kontext zuzugreifen. | -                                                                                                              |
| `getDictionary` | Verarbeitet Wörterbuchobjekte und gibt Inhalte für die angegebene Locale zurück. Verarbeitet `t()`-Übersetzungen, Enumerationen, Markdown, HTML usw. Verwendet CLS, um auf den Request-Kontext zuzugreifen.                             | -                                                                                                              |
