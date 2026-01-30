---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: adonis-intlayer Paketdokumentation
description: AdonisJS-Middleware für Intlayer, die Übersetzungsfunktionen und Locale-Erkennung bereitstellt.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Initiale Dokumentation
---

# adonis-intlayer Paket

Das Paket `adonis-intlayer` bietet eine Middleware für AdonisJS-Anwendungen zur Handhabung der Internationalisierung. Es erkennt die Locale des Benutzers und stellt Übersetzungsfunktionen bereit.

## Installation

```bash
npm install adonis-intlayer
```

## Exporte

### Middleware

Das Paket bietet eine AdonisJS-Middleware zur Handhabung der Internationalisierung.

| Funktion             | Beschreibung                                                                                                                                                                                                                                                                                                | Zugehörige Dokumentation                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | AdonisJS-Middleware, die die Locale des Benutzers erkennt und den Anfragekontext mit Intlayer-Daten füllt. Sie richtet außerdem einen CLS (Async Local Storage)-Namensraum für den Zugriff auf den Anfrage-Lebenszyklus ein, was die Verwendung globaler Funktionen wie `t`, `getIntlayer` usw. ermöglicht. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/adonis-intlayer/intlayer.md) |

### Funktionen

| Funktion        | Beschreibung                                                                                                                                                                                                                                     | Zugehörige Dokumentation                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Übersetzungsfunktion, die Inhalte für die aktuelle Locale abruft. Funktioniert innerhalb des Anfrage-Lebenszyklus, der von der `intlayer`-Middleware verwaltet wird. Verwendet CLS (Async Local Storage), um auf den Anfragekontext zuzugreifen. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `getIntlayer`   | Ruft ein Wörterbuch anhand seines Schlüssels aus der generierten Deklaration ab und gibt dessen Inhalt für die angegebene Locale zurück. Optimierte Version von `getDictionary`. Verwendet CLS, um auf den Anfragekontext zuzugreifen.           | -                                                                                                      |
| `getDictionary` | Verarbeitet Wörterbuchobjekte und gibt Inhalte für die angegebene Locale zurück. Verarbeitet `t()`-Übersetzungen, Enumerationen, Markdown, HTML usw. Verwendet CLS, um auf den Anfragekontext zuzugreifen.                                       | -                                                                                                      |
| `getLocale`     | Ruft die aktuelle Locale über CLS aus dem Anfragekontext ab.                                                                                                                                                                                     | -                                                                                                      |
