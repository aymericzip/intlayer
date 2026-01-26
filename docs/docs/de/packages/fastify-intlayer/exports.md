---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: fastify-intlayer Paketdokumentation
description: Fastify-Plugin für Intlayer, das Übersetzungsfunktionen und Locale-Erkennung bereitstellt.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# fastify-intlayer Paket

Das `fastify-intlayer`-Paket stellt ein Plugin für Fastify-Anwendungen bereit, um Internationalisierung zu unterstützen. Es erkennt die Locale des Benutzers und erweitert das Request-Objekt.

## Installation

```bash
npm install fastify-intlayer
```

## Exporte

### Plugin

Import:

```tsx
import "fastify-intlayer";
```

| Funktion   | Beschreibung                                                                                                                                                                                                                                                                                                                     | Zugehörige Dokumentation                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Fastify-Plugin, das Intlayer in Ihre Fastify-Anwendung integriert. Erkennt die Locale aus Storage (Cookies, Header), dekoriert das Request-Objekt mit `intlayer`-Daten, die `t`, `getIntlayer` und `getDictionary` enthalten, und richtet einen CLS-Namespace für programmgesteuerten Zugriff während des Request-Lifecycle ein. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/fastify-intlayer/intlayer.md) |

### Funktionen

Importieren:

```tsx
import "fastify-intlayer";
```

| Funktion        | Beschreibung                                                                                                                                                                                                                                                                                          | Zugehörige Doku                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Globale Übersetzungsfunktion, die Inhalte für die aktuelle Locale in Fastify abruft. Verwendet CLS (Async Local Storage) und muss innerhalb eines vom `intlayer`-Plugin verwalteten Request-Kontexts verwendet werden. Kann auch über `req.intlayer.t` aufgerufen werden.                             | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `getIntlayer`   | Ruft ein Dictionary anhand seines Schlüssels aus der generierten Deklaration ab und gibt dessen Inhalte für die angegebene Locale zurück. Optimierte Version von `getDictionary`. Verwendet CLS, um auf den Request-Kontext zuzugreifen. Kann auch über `req.intlayer.getIntlayer` aufgerufen werden. | -                                                                                                      |
| `getDictionary` | Verarbeitet Wörterbuchobjekte und liefert Inhalte für die angegebene Locale. Verarbeitet `t()`-Übersetzungen, Enumerationen, Markdown, HTML usw. Verwendet CLS, um auf den Request-Kontext zuzugreifen. Kann auch über `req.intlayer.getDictionary` aufgerufen werden.                                | -                                                                                                      |
