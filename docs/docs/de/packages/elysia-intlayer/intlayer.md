---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: intlayer Elysia Plugin Dokumentation | elysia-intlayer
description: Erfahren Sie, wie Sie das intlayer-Plugin des elysia-intlayer-Pakets verwenden
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Initialisierung der Dokumentation"
author: aymericzip
---

# intlayer Elysia Plugin Dokumentation

Das `intlayer`-Plugin für Elysia ermittelt die Locale des Benutzers und injiziert ein `intlayer`-Objekt in den Route-Kontext. Es ermöglicht außerdem die Verwendung globaler Übersetzungsfunktionen innerhalb des Request-Kontexts.

## Verwendung

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    de: "Hallo",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Dieselben Helper stehen auch als eigenständige Exporte zur Verfügung, sodass Sie sie aufrufen können, ohne den Route-Kontext zu destrukturieren:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    de: "Hallo",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Beschreibung

Das Plugin führt die folgenden Aufgaben aus:

1. **Locale-Erkennung**: Es liest die vom Client explizit gesetzte Locale aus dem Storage (Cookie, Header) und greift anschließend auf die aus dem `Accept-Language`-Header ausgehandelte Locale zurück.
2. **Kontext-Injektion**: Es fügt dem Elysia-Route-Kontext eine `intlayer`-Eigenschaft hinzu, die enthält:
   - `locale`: Die für diese Anfrage zu verwendende Locale, wobei `locale_storage` Vorrang vor `locale_detected` hat.
   - `locale_storage`: Die vom Client über ein Cookie oder einen Header explizit angeforderte Locale.
   - `locale_detected`: Die aus den Request-Headern ausgehandelte Locale.
   - `defaultLocale`: Die in `intlayer.config.ts` als Fallback konfigurierte Locale.
   - `t`: Eine Übersetzungsfunktion.
   - `getIntlayer`: Eine Funktion zum Abrufen von Wörterbüchern anhand ihres Schlüssels.
   - `getDictionary`: Eine Funktion zum Verarbeiten von Wörterbuchobjekten.
3. **Kontextverwaltung**: Es verwendet `AsyncLocalStorage`, um einen asynchronen Kontext zu verwalten, wodurch die globalen Intlayer-Funktionen (`t`, `getIntlayer`, `getDictionary`) auf die anfragebezogene Locale zugreifen können, ohne das Kontextobjekt weiterreichen zu müssen.

> Anders als die Node-basierten Intlayer-Plugins setzt `elysia-intlayer` auf `AsyncLocalStorage` statt auf `cls-hooked`, da `cls-hooked` von `async_hooks.createHook` abhängt, das Bun nicht implementiert.

Der Request-Kontext wird freigegeben, sobald die Response gemappt wurde, sodass die eigenständigen Helper niemals gegen eine bereits beendete Anfrage auflösen. Werden sie außerhalb einer vom Plugin behandelten Anfrage aufgerufen, greifen sie auf die konfigurierte Standard-Locale zurück.

## Konfiguration

Das Plugin liest Ihre `intlayer.config.ts`-Datei. Sie können das Cookie und den Header anpassen, die für die Locale-Erkennung verwendet werden:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Weitere Informationen zur Konfiguration finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).
