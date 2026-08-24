---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer Paketdokumentation
description: Elysia-Plugin für Intlayer, das Übersetzungsfunktionen und Locale-Erkennung bereitstellt.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Vereinheitlichte Dokumentation für alle Exporte"
author: aymericzip
---

# elysia-intlayer Paket

Das `elysia-intlayer`-Paket stellt ein Plugin für Elysia-Anwendungen bereit, um Internationalisierung zu unterstützen. Es erkennt die Locale des Benutzers und injiziert ein `intlayer`-Objekt in den Route-Kontext.

## Installation

```bash
npm install elysia-intlayer
```

## Exporte

### Plugin

Import:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Funktion   | Beschreibung                                                                                                                                                                                                                                                                                                                                 | Zugehörige Dokumentation                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Elysia-Plugin, das Intlayer in Ihre Elysia-Anwendung integriert. Übernimmt die Locale-Erkennung aus dem Storage (Cookies, Header) und anschließend aus `Accept-Language`, injiziert ein `intlayer`-Objekt mit `locale`, `t`, `getIntlayer` und `getDictionary` in den Route-Kontext und richtet den `AsyncLocalStorage`-Request-Kontext ein. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/elysia-intlayer/intlayer.md) |

### Funktionen

Import:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Funktion        | Beschreibung                                                                                                                                                                                                                                                                                        | Zugehörige Dokumentation                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Globale Übersetzungsfunktion, die den Inhalt für die aktuelle Locale in Elysia abruft. Verwendet `AsyncLocalStorage`, um auf den vom `intlayer`-Plugin eingerichteten Request-Kontext zuzugreifen, und greift außerhalb davon auf die Standard-Locale zurück. Auch über `intlayer.t` erreichbar.    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `getIntlayer`   | Ruft ein Wörterbuch anhand seines Schlüssels aus der generierten Deklaration ab und gibt dessen Inhalt für die aktuelle Locale zurück. Optimierte Variante von `getDictionary`. Verwendet `AsyncLocalStorage`, um auf den Request-Kontext zuzugreifen. Auch über `intlayer.getIntlayer` erreichbar. | -                                                                                                      |
| `getDictionary` | Verarbeitet Wörterbuchobjekte und gibt den Inhalt für die aktuelle Locale zurück. Verarbeitet `t()`-Übersetzungen, Enumerationen, Markdown, HTML usw. Verwendet `AsyncLocalStorage`, um auf den Request-Kontext zuzugreifen. Auch über `intlayer.getDictionary` erreichbar.                         | -                                                                                                      |

### Typen

Import:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Typ                 | Beschreibung                                                                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Form des `intlayer`-Objekts, das in jeden Route-Kontext injiziert wird: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Signatur der Übersetzungsfunktion, die eine Locale-Map in den Inhalt der aktuellen Request-Locale übersetzt.                                                                 |
