---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: hono-intlayer Paketdokumentation
description: Hono-Middleware für Intlayer, die Übersetzungsfunktionen und Spracherkennung bietet.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# hono-intlayer Paket

Das Paket `hono-intlayer` bietet eine Middleware für Hono-Anwendungen zur Handhabung der Internationalisierung. Sie erkennt die Sprache des Benutzers und füllt das Kontextobjekt.

## Installation

```bash
npm install hono-intlayer
```

## Exporte

### Middleware

Importieren:

```tsx
import { intlayer } from "hono-intlayer";
```

| Funktion   | Beschreibung                                                                                                                                                                                                                                                                                            | Verwandte Doc                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Hono-Middleware, die Intlayer in Ihre Hono-Anwendung integriert. Handhabt die Spracherkennung aus dem Speicher (Cookies, Header), füllt den Kontext mit `t`, `getIntlayer` und `getDictionary` und richtet den CLS-Namespace für den programmatischen Zugriff während des Anforderungslebenszyklus ein. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/hono-intlayer/intlayer.md) |

### Funktionen

Importieren:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Funktion        | Beschreibung                                                                                                                                                                                                                                                                               | Verwandte Doc                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Globale Übersetzungsfunktion, die Inhalte für die aktuelle Sprache in Hono abruft. Nutzt CLS (Async Local Storage) und muss innerhalb eines durch die `intlayer`-Middleware verwalteten Anforderungskontexts verwendet werden. Kann auch über den Kontext aufgerufen werden.               | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `getIntlayer`   | Ruft ein Wörterbuch anhand seines Schlüssels aus der generierten Deklaration ab und gibt dessen Inhalt für die angegebene Sprache zurück. Optimierte Version von `getDictionary`. Verwendet CLS für den Zugriff auf den Anforderungskontext. Kann auch über den Kontext aufgerufen werden. | -                                                                                                      |
| `getDictionary` | Verarbeitet Wörterbuchobjekte und gibt Inhalte für die angegebene Sprache zurück. Verarbeitet `t()`-Übersetzungen, Aufzählungen, Markdown, HTML usw. Verwendet CLS für den Zugriff auf den Anforderungskontext. Kann auch über den Kontext aufgerufen werden.                              | -                                                                                                      |
