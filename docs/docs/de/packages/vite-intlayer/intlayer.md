---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite Plugin Dokumentation | vite-intlayer
description: Anleitung zur Verwendung des intlayer-Plugins für das vite-intlayer-Paket
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokumentation initialisiert"
author: aymericzip
---

# intlayer Vite Plugin Dokumentation

Das `intlayer` Vite-Plugin integriert die Intlayer-Konfiguration in den Build-Prozess. Es verwaltet Dictionary-Aliase, startet im Entwicklungsmodus den Dictionary-Watcher und bereitet Dictionaries für den Build vor.

## Verwendung

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Optionen

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` erweitert `GetConfigurationOptions` (siehe `@intlayer/config`) mit den folgenden zusätzlichen Feldern:

| Option          | Type                            | Default     | Beschreibung                                                                                                                                                                  |
| --------------- | ------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Zusätzliche Caller-Muster für compat-adapter-Pakete (z. B. `@intlayer/react-i18next`). Wird zur Build-Zeit an den Field-Usage-Analysierer übergeben.                          |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Optionen, die an den gebündelten Locale-Routing-Proxy weitergeleitet werden. Verwenden Sie `ignore`, um bestimmte Pfade (z. B. API-Routen) von Locale-Routing auszuschließen. |

Alle anderen Optionen (`override`, `configFile`, …) werden direkt an `getConfiguration()` weitergeleitet.

### Beispiele

#### API-Routen von der Locale-Routing ignorieren

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Mit einem benutzerdefinierten Konfigurationsdateipfad

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Mit compat-adapter Aufrufern

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Was das Plugin macht

### 1. Dictionary preparation

Vor dem Start des Builds (und einmal pro Stunde in der Entwicklung) ruft `intlayer` `prepareIntlayer` auf, um alle `.content.ts` Dateien in optimierte JSON-Wörterbücher zu kompilieren, die in `.intlayer/` gespeichert werden.

### 2. Module aliases

Das Plugin fügt Vite-Resolve-Aliase hinzu, damit `import { myDict } from 'intlayer/dictionaries/my-dict'` zur kompilierten JSON-Datei auf der Festplatte aufgelöst wird. SSR-Builds verwenden `ssr.noExternal`, um sicherzustellen, dass alle `@intlayer/*`-Packages mit angewendeten Aliasen gebündelt werden.

### 3. Dev-server watcher

Im Entwicklungsmodus wird ein `chokidar` Watcher gestartet. Wenn sich eine `.content.ts` Datei ändert, werden die Wörterbücher neu kompiliert und Vites HMR propagiert das Update zum Browser.

### 4. Bundled locale-routing proxy (v9+)

Seit Intlayer v9 wird die `intlayerProxy` Middleware automatisch innerhalb von `intlayer()` registriert. Sie verwaltet:

- Locale-Erkennung anhand des URL-Präfix, Cookies und `Accept-Language`-Header.
- 301-Weiterleitungen, wenn die erkannte Locale nicht mit der aktuellen URL übereinstimmt.
- Interne URL-Umschreibungen, damit das Framework den korrekten `[locale]`-Routenparameter sieht.

Der Proxy wird durch `routing.enableProxy` (Standard `true`) in deiner Intlayer-Konfiguration gesteuert. Um ihn vollständig zu deaktivieren:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Um das Proxy-Verhalten ohne einen separaten `intlayerProxy()`-Aufruf anzupassen, übergebe `proxy`-Optionen an das Haupt-Plugin:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Siehe die [intlayerProxy-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerProxy.md) für die vollständige Routing-Verhaltenreferenz.

### 5. Bundled compiler (v9+)

Wenn `compiler.enabled` auf `true` gesetzt ist **und** `compiler.output` in Ihrer Intlayer-Konfiguration definiert ist, registriert `intlayer()` `intlayerCompiler` automatisch. Der Compiler extrahiert Inline-Content-Deklarationen, die direkt in Komponentendateien geschrieben sind, und schreibt sie zur Transform-Zeit in Dictionaries. Siehe [intlayerCompiler-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerCompiler.md).

### 6. Build-Optimierungen

Während eines Production-Builds fügt das Plugin folgende Komponenten hinzu:

- **intlayerOptimize** – Babel-Transformation, die `useIntlayer('key')` → `useDictionary(hash)` umschreibt und direkte JSON-Importe einfügt.
- **intlayerPrune** – entfernt ungenutzte Content-Felder aus dem Dictionary-JSON.
- **intlayerMinify** – komprimiert Dictionary-JSON und mangelt optional Feldnamen.

Diese sind im Development-Modus inaktiv.

## Veraltete Aliase

| Veralteter Export | Ersatz     |
| ----------------- | ---------- |
| `intlayerPlugin`  | `intlayer` |
| `intLayerPlugin`  | `intlayer` |
