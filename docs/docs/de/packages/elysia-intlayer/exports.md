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

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` ist eine Peer-Dependency (`>=1.0.0`). Elysia zielt auf die **Bun**-Runtime ab.

## Exporte

### Plugin

Import:

```ts
import { intlayer } from "elysia-intlayer";
```

| Funktion   | Beschreibung                                                                                                                                                                                                                                                                                                                                 | Zugehörige Dokumentation                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Elysia-Plugin, das Intlayer in Ihre Elysia-Anwendung integriert. Übernimmt die Locale-Erkennung aus dem Storage (Cookies, Header) und anschließend aus `Accept-Language`, injiziert ein `intlayer`-Objekt mit `locale`, `t`, `getIntlayer` und `getDictionary` in den Route-Kontext und richtet den `AsyncLocalStorage`-Request-Kontext ein. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/elysia-intlayer/intlayer.md) |

### Funktionen

Import:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Funktion        | Beschreibung                                                                                                                                                                                                                                                                                        | Zugehörige Dokumentation                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Globale Übersetzungsfunktion, die den Inhalt für die aktuelle Locale in Elysia abruft. Verwendet `AsyncLocalStorage`, um auf den vom `intlayer`-Plugin eingerichteten Request-Kontext zuzugreifen, und greift außerhalb davon auf die Standard-Locale zurück. Auch über `intlayer.t` erreichbar.    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md) |
| `getIntlayer`   | Ruft ein Wörterbuch anhand seines Schlüssels aus der generierten Deklaration ab und gibt dessen Inhalt für die aktuelle Locale zurück. Optimierte Variante von `getDictionary`. Verwendet `AsyncLocalStorage`, um auf den Request-Kontext zuzugreifen. Auch über `intlayer.getIntlayer` erreichbar. | -                                                                                                      |
| `getDictionary` | Verarbeitet Wörterbuchobjekte und gibt den Inhalt für die aktuelle Locale zurück. Verarbeitet `t()`-Übersetzungen, Enumerationen, Markdown, HTML usw. Verwendet `AsyncLocalStorage`, um auf den Request-Kontext zuzugreifen. Auch über `intlayer.getDictionary` erreichbar.                         | -                                                                                                      |

### Typen

Import:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Typ                 | Beschreibung                                                                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Form des `intlayer`-Objekts, das in jeden Route-Kontext injiziert wird: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Signatur der Übersetzungsfunktion, die eine Locale-Map in den Inhalt der aktuellen Request-Locale übersetzt.                                                                 |

## Verwendung

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Laden Sie das Internationalisierungs-Plugin
  .use(intlayer())
  // Locale und Helper aus dem Route-Context lesen
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      de: "Hallo",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Oder die Standalone-Helper verwenden, die an die aktuelle Anfrage gebunden sind
  .get("/t_example", () =>
    t({
      de: "Beispiel für zurückgegebene Inhalte auf Deutsch",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Das Plugin registriert seinen Context über ein **globales** `derive`, das Elysia als `Partial<{ intlayer: IntlayerContext }>` typisiert. Zur Laufzeit ist der Wert für alle nach `.use(intlayer())` registrierten Routen immer vorhanden — verwenden Sie daher die Non-Null-Assertion (`intlayer!.locale`) oder Optional Chaining, um TypeScript im `strict`-Modus zufriedenzustellen.

## Zugehörige Dokumentation

- [Elysia i18n - Vollständiger Leitfaden zum Übersetzen deiner App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_elysia.md)
- [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
