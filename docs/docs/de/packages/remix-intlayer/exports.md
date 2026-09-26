---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: remix-intlayer Paketdokumentation
description: Remix 3 Integration für Intlayer, die Middleware, Kontext, Hooks und Formatierer für sprachenbasiertes Routing und Inhaltsverwaltung bereitstellt.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Einheitliche Dokumentation für alle Exporte"
author: aymericzip
---

# remix-intlayer Paket

Das `remix-intlayer`-Paket bietet die erforderlichen Werkzeuge zur Integration von Intlayer in Remix 3-Anwendungen. Vollständig auf Webstandards aufgebaut (`Request`, `Response`, `Headers` und `URL`), bietet es eine Router-Middleware für sprachenbasiertes Routing und interne Umschreibungen, Kontextspeicherung, Hooks und Formatierungsdienstprogramme für die Verwaltung mehrsprachiger Inhalte.

## Installation

```bash
npm install remix-intlayer
```

## Exporte

### Middleware

Import:

```tsx
import { intlayer } from "remix-intlayer";
```

| Funktion   | Beschreibung                                                                                                                                                                                                               | Zugehörige Doc                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Remix 3-Router-Middleware, die sprachenbasiertes Routing (Weiterleitungen und interne Umschreibungen) handhabt, die Request-Locale auflöst, sie in Cookies/Headern speichert und den Request-Kontextbereich initialisiert. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/intlayerMiddleware.md) |

### Kontext

Import:

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| Export                      | Typ          | Beschreibung                                                                                                                                         | Zugehörige Doc                                                                                                |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | RequestContext-Schlüssel, der den `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) für die aktuelle Anfrage enthält.                  | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | Eigenschaftsname (`'intlayer'`), der direkt auf dem Request-Kontext installiert ist, zugänglich über `context.intlayer` und `context.get(Intlayer)`. | -                                                                                                             |

### Hooks

Import:

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| Hook            | Beschreibung                                                                                                                                                     | Zugehörige Doc                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Wählt ein Wörterbuch anhand seines Schlüssels aus und gibt dessen Inhalt für die Locale der aktuellen Anfrage zurück. Liest automatisch aus dem Request-Kontext. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Transformiert ein importiertes Wörterbuchobjekt und gibt dessen Inhalt für die aktuelle Request-Locale zurück. Unterstützt Selektoren.                           | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Gibt die aufgelöste Locale der aktuellen Anfrage zusammen mit `defaultLocale` und `availableLocales` zurück.                                                     | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useLocale.md)         |

### Hilfsprogramme

Import:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Funktion              | Beschreibung                                                                                                                                | Zugehörige Doc |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `createLocaleRouting` | Reine Funktion, die Routing-Entscheidungen (`redirect`, `rewrite` oder `pass`) basierend auf Anfrage, Konfiguration und Optionen berechnet. | -              |
| `getIntlayerState`    | Liest den aktuellen `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) aus dem `AsyncLocalStorage`-Requestbereich.             | -              |

### Formatierer (remix-intlayer/format)

Import:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Beschreibung                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Gibt eine an die Request-Locale gebundene Intl-Instanz mit Caching- und Abonnementfunktionen zurück.             |
| `useDate`         | Gibt eine an die Request-Locale gebundene Datumsformatierungsfunktion zurück (`Intl.DateTimeFormat`).            |
| `useNumber`       | Gibt eine an die Request-Locale gebundene Zahlenformatierungsfunktion zurück (`Intl.NumberFormat`).              |
| `useCurrency`     | Gibt eine an die Request-Locale gebundene Währungsformatierungsfunktion zurück.                                  |
| `usePercentage`   | Gibt eine an die Request-Locale gebundene Prozentformatierungsfunktion zurück.                                   |
| `useRelativeTime` | Gibt eine an die Request-Locale gebundene relative Zeitformatierungsfunktion zurück (`Intl.RelativeTimeFormat`). |
| `useList`         | Gibt eine an die Request-Locale gebundene Listenformatierungsfunktion zurück (`Intl.ListFormat`).                |
| `useUnit`         | Gibt eine an die Request-Locale gebundene Einheitenformatierungsfunktion zurück.                                 |
| `useCompact`      | Gibt eine an die Request-Locale gebundene kompakte Zahlenformatierungsfunktion zurück (z. B. `1.5K`).            |

### HTML-Dienstprogramme (remix-intlayer/html)

Import:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Export            | Typ        | Beschreibung                                                                         |
| ----------------- | ---------- | ------------------------------------------------------------------------------------ |
| `renderHTML`      | `Function` | Dienstprogrammfunktion zum Rendern von HTML-Knoten außerhalb der Benutzeroberfläche. |
| `useHTML`         | `Hook`     | Hook zum Abrufen des HTML-Provider-Kontexts und der Konfiguration.                   |
| `useHTMLRenderer` | `Hook`     | Hook zum Abrufen einer vorkonfigurierten HTML-Renderer-Funktion.                     |

### Markdown-Dienstprogramme (remix-intlayer/markdown)

Import:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Export                | Typ        | Beschreibung                                                         |
| --------------------- | ---------- | -------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Kompiliert Markdown-Zeichenfolgen in eine strukturierte Darstellung. |
| `renderMarkdown`      | `Function` | Rendert Markdown-Inhalte in Ausgabeknoten.                           |
| `parseMarkdown`       | `Function` | Analysiert rohen Markdown-Inhalt in einen AST.                       |
| `useMarkdown`         | `Hook`     | Hook für den Zugriff auf den Markdown-Provider-Kontext.              |
| `useMarkdownRenderer` | `Hook`     | Hook zum Abrufen einer vorkonfigurierten Markdown-Renderer-Funktion. |

### Typen

Import:

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Typ                         | Beschreibung                                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Zustandsobjekt mit `locale`, `defaultLocale` und `availableLocales`, das im Remix-Kontext gespeichert ist. |
| `IntlayerMiddlewareOptions` | Konfigurationsoptionen für die `intlayer()`-Middleware.                                                    |
| `LocaleRoutingOptions`      | Optionen zur Anpassung von Locale-Präfixen, Erkennung und Weiterleitungen.                                 |
| `LocaleRoutingAction`       | Diskriminierte Union, die die Routing-Entscheidung darstellt: `redirect`, `rewrite` oder `pass`.           |
| `LocaleRoutingRequest`      | Minimale Anfrage-Darstellung für `createLocaleRouting`.                                                    |
| `UseLocaleResult`           | Rückgabetyp von `useLocale()`, der `locale`, `defaultLocale` und `availableLocales` enthält.               |
