---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerProxy Vite-Plugin-Dokumentation | vite-intlayer
description: Sprach-Routing-Middleware für Vite-Entwicklungs-/Vorschau-Server und Produktions-SSR. Verwaltet Spracherkennung, URL-Redirections und interne Rewrites.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - locale
  - routing
  - internationalization
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "configOptions in ein einzelnes Option-Objekt zusammengeführt; Proxy in intlayer() gebündelt"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` ist ein Vite-Plugin, das eine Sprach-Routing-Middleware für **jede Umgebung** registriert: Entwicklungs-Server, Vorschau-Server und Produktions-SSR (Nitro / TanStack Start).

> **Seit Intlayer v9** ist `intlayerProxy` automatisch im Hauptplugin [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md) enthalten und standardmäßig über `routing.enableProxy: true` aktiviert. Sie müssen es nur separat registrieren, wenn Sie eine Kontrolle auf niedrigerer Ebene benötigen oder es außerhalb des Standard-Setups von `intlayer()` verwenden.

## Verwendung

### Als Teil von `intlayer()` (empfohlen, v9+)

Übergeben Sie `proxy`-Optionen an das Hauptplugin, anstatt `intlayerProxy` separat zu registrieren:

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

### Standalone (falls erforderlich)

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
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Alle Optionen sind optional und werden als einzelnes Objekt übergeben:

| Option          | Typ                                 | Beschreibung                                                                                                                                                                                     |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ignore`        | `(req: IncomingMessage) => boolean` | Prädikat, das Anfragen vom Sprach-Routing ausschließt. Gibt `true` zurück, um eine Anfrage zu überspringen (z. B. API-Routen, Health-Checks).                                                    |
| `configOptions` | `GetConfigurationOptions`           | Intlayer-Konfigurations-Overrides, die an `getConfiguration()` weitergeleitet werden. Verwenden Sie dies, wenn der Proxy eine bestimmte Konfigurationsdatei lesen oder Werte überschreiben soll. |

### Beispiel

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` erstellt eine eigenständige, Framework-agnostische Node.js-Middleware `(req, res, next)`, die die gesamte Sprach-Routing-Logik enthält. Sie ist nützlich in Umgebungen, in denen die Vite-Plugin-API nicht verfügbar ist (z. B. ein reiner Node.js-Server oder ein benutzerdefiniertes Nitro-Modul).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### Produktions-SSR (TanStack Start / Nitro über h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Routing-Verhalten

Die Middleware spiegelt die Routing-Logik der `next-intlayer`-Middleware wider und unterstützt alle Intlayer-Routing-Modi.

### Routing-Modi

| Modus           | URL im Browser sichtbar  | Verhalten                                                                                                                                        |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `prefix`        | `/de/about`              | Standard. Sprachpräfix in der URL. Die Standardsprache leitet auf die URL ohne Präfix um, es sei denn, `prefix-all` ist aktiv.                   |
| `prefix-all`    | `/en/about`, `/de/about` | Alle Sprachen — einschließlich der Standardsprache — sind immer präfigiert.                                                                      |
| `no-prefix`     | `/about`                 | Keine Sprache in der URL. Die Sprache wird nur in Cookies gespeichert; URL-Rewrites erfolgen intern.                                             |
| `search-params` | `/about?locale=de`       | Sprache wird als Query-Parameter übergeben. Leitet um, um den `locale`-Parameter hinzuzufügen/zu aktualisieren, wenn er fehlt oder veraltet ist. |

### Erkennungspriorität

1. URL-Pfadpräfix (z. B. `/de/about` → `de`).
2. Cookie- / localStorage-Wert (`intlayer-locale`).
3. `Accept-Language`-Header.
4. `defaultLocale` aus der Konfiguration.

### Automatischer Bypass

Die Middleware leitet diese Anfragen immer direkt und ohne Sprachbehandlung weiter:

- Anfragen, die dem `ignore`-Prädikat entsprechen.
- `/node_modules/**`
- `/@**` – Vite-Interna (`@vite/`, `@fs/`, `@id/` usw.).
- `/_**` – Server-Interna (`__vite_ping`, `__manifest` usw.).
- Anfragen, deren Pfad mit einer Dateiendung endet (statische Assets). Wenn ein Sprachpräfix im Pfad eines statischen Assets vorhanden ist (z. B. `/de/logo.png`), wird es entfernt, damit die Datei korrekt ausgeliefert werden kann.

### Domain-Routing

Wenn `routing.domains` in Ihrer Intlayer-Konfiguration konfiguriert ist, verarbeitet die Middleware das domänenübergreifende Sprach-Routing:

- Eine Anfrage für `/zh/about` auf `intlayer.org` wird an `https://intlayer.zh/about` weitergeleitet, wenn `domains.zh = "intlayer.zh"`.
- Eine Anfrage an `intlayer.zh/about` wird intern in `/zh/about` umgeschrieben, sodass der Routing-Parameter `[locale]` befüllt wird.

### Schutz vor Redirect-Schleifen

Die Middleware verfolgt die Anzahl der Weiterleitungen pro `originalUrl → newUrl`-Paar innerhalb eines gleitenden 2-Sekunden-Fensters. Mehr als 10 Weiterleitungen innerhalb dieses Fensters geben eine `500`-Antwort mit einem beschreibenden Fehler zurück, anstatt ewig im Kreis zu leiten.

## Nitro / Produktions-SSR (automatische Injektion, v9+)

Wenn `intlayerProxy` als Vite-Plugin verwendet wird, trägt es eine `.nitro`-Eigenschaft. Das Build-Plugin `nitro/vite` liest diese Eigenschaft und fügt sie in `nitroConfig.modules` ein, sodass `intlayerNitroHandler` automatisch als Nitro-Server-Middleware registriert wird — für das Produktions-SSR ist keine manuelle Konfiguration erforderlich.

Der Nitro-Handler verwendet das Web Fetch API-Ereignismodell von h3 v2 (nicht `fromNodeMiddleware`), sodass er mit allen Nitro-Presets kompatibel ist: Node, Bun, Deno, Edge-Laufzeiten.

## Veraltete Aliase

| Veralteter Export          | Ersatz          |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
