---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des Pakets vite-intlayer
description: Vite-Plugin für Intlayer, das Wörterbuch-Aliase und Watcher bereitstellt.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Export-Index aktualisiert – Proxy und Compiler nun in intlayer() gebündelt; Doku für intlayerProxy, intlayerCompiler, intlayerMinify hinzugefügt"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Vereinheitlichte Dokumentation für alle Exporte"
author: aymericzip
---

# Paket vite-intlayer

Das `vite-intlayer`-Paket stellt ein Vite-Plugin bereit, um Intlayer in Ihre auf Vite basierende Anwendung zu integrieren.

## Installation

```bash
npm install vite-intlayer
```

## Exporte

### Plugin

Import:

```tsx
import "vite-intlayer";
```

| Funktion                   | Beschreibung                                                                                                                                   | Verwandtes Dokument                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Haupt-Vite-Plugin. Bereitet Wörterbücher vor, konfiguriert Aliase, startet Dev-Server-Watcher und bündelt (seit v9) Proxy und Compiler.        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Veraltet**) Alias für `intlayer`.                                                                                                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Veraltet**) Alias für `intlayer`.                                                                                                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Locale-Routing-Middleware-Plugin (Erkennung, Weiterleitung, Rewrite). Seit v9 in `intlayer()` gebündelt – nur bei Bedarf separat registrieren. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Veraltet**) Alias für `intlayerProxy`.                                                                                                      | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Veraltet**) Alias für `intlayerProxy`.                                                                                                      | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Extrahiert Inline-Inhaltsdeklarationen aus Komponenten und schreibt sie in Wörterbücher. Seit v9 in `intlayer()` gebündelt.                    | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Entfernt ungenutzte Wörterbuchfelder per Tree-Shaking aus dem Produktions-Bundle.                                                              | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Minimiert kompilierte Wörterbuch-JSON-Dateien und verkürzt optional Feldnamen.                                                                 | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerMinify.md)     |

### Utilities

| Export                       | Description                                                                                            | Related Doc                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Gibt eine Framework-agnostische Node.js `(req, res, next)` Middleware mit Locale-Routing-Logik zurück. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayerProxy.md) |

### Typen

| Export                       | Beschreibung                                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Von `intlayer()` akzeptierte Optionen. Erweitert `GetConfigurationOptions` mit `compatCallers` und `proxy`.          |
| `IntlayerProxyPluginOptions` | Von `intlayerProxy()` und `createIntlayerProxyHandler()` akzeptierte Optionen. Umfasst `ignore` und `configOptions`. |
| `IntlayerCompilerOptions`    | Von `intlayerCompiler()` akzeptierte Optionen. Umfasst `configOptions` und `compilerConfig`.                         |
| `CompatCallerConfig`         | Neu-Export von `@intlayer/babel`. Beschreibt ein compat-adapter caller pattern für die Feldnutzungsanalyse.          |
