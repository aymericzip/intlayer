---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: Dokumentation des astro-intlayer Pakets
description: Astro-Integration für Intlayer, die Setup für locale-basiertes Routing, Middleware, Hooks, Client-Store und Wörterbuchverwaltung bereitstellt.
keywords:
  - astro-intlayer
  - astro
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Dokumentation für useIntlayer, useDictionary, useLocale Hooks, Middleware und Formatierer hinzugefügt"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Vereinheitlichte Dokumentation für alle Exporte"
author: aymericzip
---

# astro-intlayer Paket

Das Paket `astro-intlayer` bietet die erforderlichen Werkzeuge zur Integration von Intlayer in Astro-Anwendungen. Es konfiguriert locale-basiertes Routing, Wörterbuchverwaltung, Seiten-Umschreiben während des Builds, Request-Middleware und Hooks für den Zugriff auf mehrsprachige Inhalte in serverseitig gerenderten `.astro`-Komponenten und clientseitigen Skripten.

## Installation

```bash
npm install astro-intlayer
```

## Exporte

### Integration

Das Paket `astro-intlayer` bietet eine Astro-Integration, die Intlayer in Ihrem Projekt einrichtet.

Import:

```tsx
import { intlayer } from "astro-intlayer";
```

oder Standard-Import in `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Funktion   | Beschreibung                                                                                                                                                                                                          | Zugehörige Dokumentation                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Astro-Integration, die Wörterbücher vorbereitet, Vite-Plugins konfiguriert (Aliase, Routing-Proxy, Bereinigung), Request-Middleware automatisch registriert und vorgerenderte Seiten an umgeschriebenen URLs ausgibt. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/intlayer.md) |

### Hooks (Server und Client)

Import:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Beschreibung                                                                                                                                                                                               | Zugehörige Dokumentation                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Wählt ein Wörterbuch anhand seines Schlüssels aus und gibt dessen lokalisierten Inhalt zurück. Im `.astro`-Frontmatter liest es das Anfrage-Locale aus `Astro.locals`. Im `<script>` aus dem Client-Store. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Transformiert ein Wörterbuchobjekt und gibt den Inhalt für das aufgelöste Locale zurück. Funktioniert im Frontmatter und in Client-Skripten.                                                               | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Gibt das aktuelle Locale, das Standard-Locale, die verfügbaren Locales und eine Funktion zum Aktualisieren des Locales zurück.                                                                             | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Import:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Export      | Typ                 | Beschreibung                                                                                                                                                                 | Zugehörige Dokumentation                                                                                        |
| ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Astro-Middleware, die das Anfrage-Locale erkennt und `Astro.locals.intlayer` anhängt. Wird automatisch von `intlayer()` registriert oder manuell zur Komposition importiert. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/onRequest.md) |

### Dienstprogramme

Import:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Funktion            | Beschreibung                                                                                                                   | Zugehörige Dokumentation |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `getIntlayerLocals` | Hilfsfunktion zum Abrufen des aktuellen `IntlayerLocals`-Objekts aus dem Request-Speicherbereich außerhalb von `Astro.locals`. | -                        |

### Client-Dienstprogramme (astro-intlayer/client)

Import:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Beim Import im Browser oder in Client-`<script>`-Tags verweist `astro-intlayer` automatisch auf `astro-intlayer/client` (bereitgestellt von `vanilla-intlayer`), was clientseitige Wörterbuch-Getter, Store-Abonnenten und Locale-Persistenz-Werkzeuge bereitstellt.

### Formatierer (astro-intlayer/format)

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
} from "astro-intlayer/format";
```

| Hook              | Beschreibung                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Gibt eine Intl-Instanz gebunden an das Locale zurück mit Caching- und Abonnementfunktionen.                      |
| `useDate`         | Gibt eine Datumsformatierungsfunktion gebunden an das aktuelle Locale zurück (`Intl.DateTimeFormat`).            |
| `useNumber`       | Gibt eine Zahlenformatierungsfunktion gebunden an das aktuelle Locale zurück (`Intl.NumberFormat`).              |
| `useCurrency`     | Gibt eine Währungsformatierungsfunktion gebunden an das aktuelle Locale zurück.                                  |
| `usePercentage`   | Gibt eine Prozentformatierungsfunktion gebunden an das aktuelle Locale zurück.                                   |
| `useRelativeTime` | Gibt eine relative Zeitformatierungsfunktion gebunden an das aktuelle Locale zurück (`Intl.RelativeTimeFormat`). |
| `useList`         | Gibt eine Listenformatierungsfunktion gebunden an das aktuelle Locale zurück (`Intl.ListFormat`).                |
| `useUnit`         | Gibt eine Einheitenformatierungsfunktion gebunden an das aktuelle Locale zurück.                                 |
| `useCompact`      | Gibt eine kompakte Zahlenformatierungsfunktion gebunden an das aktuelle Locale zurück (z. B. `1.5K`).            |

### HTML-Dienstprogramme (astro-intlayer/html)

Import:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Export            | Typ        | Beschreibung                                                       |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| `renderHTML`      | `Function` | Eigenständige Hilfsfunktion zum Rendern von HTML-Knoten.           |
| `useHTML`         | `Hook`     | Hook zum Abrufen des HTML-Provider-Kontexts und der Konfiguration. |
| `useHTMLRenderer` | `Hook`     | Hook zum Abrufen einer vorkonfigurierten HTML-Renderer-Funktion.   |

### Markdown-Dienstprogramme (astro-intlayer/markdown)

Import:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Export                | Typ        | Beschreibung                                                         |
| --------------------- | ---------- | -------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Kompiliert Markdown-Zeichenfolgen in eine strukturierte Darstellung. |
| `renderMarkdown`      | `Function` | Rendert Markdown-Inhalt in Ausgabeknoten.                            |
| `parseMarkdown`       | `Function` | Analysiert rohen Markdown-Inhalt in einen AST.                       |
| `useMarkdown`         | `Hook`     | Hook zum Abrufen des Markdown-Provider-Kontexts.                     |
| `useMarkdownRenderer` | `Hook`     | Hook zum Abrufen einer vorkonfigurierten Markdown-Renderer-Funktion. |

### Typen

Import:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Typ               | Beschreibung                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `IntlayerLocals`  | Das an `Astro.locals.intlayer` angehängte Objekt mit `locale`, `defaultLocale` und `availableLocales`. |
| `UseLocaleProps`  | Optionale Konfigurationseigenschaften, die von `useLocale()` akzeptiert werden.                        |
| `UseLocaleResult` | Der Rückgabetyp von `useLocale()`, der Locale-Eigenschaften und Aktualisierungsmethoden bereitstellt.  |
