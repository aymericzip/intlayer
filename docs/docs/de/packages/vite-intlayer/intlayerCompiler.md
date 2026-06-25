---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerCompiler Vite-Plugin-Dokumentation | vite-intlayer
description: Vite-Plugin, das Inline-Intlayer-Inhaltsdeklarationen aus Komponentendateien extrahiert und sie während der Build-/Transformationszeit in Wörterbuch-JSON-Dateien schreibt.
keywords:
  - intlayerCompiler
  - vite
  - plugin
  - compiler
  - content
  - dictionary
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "In intlayer() integriert; Dokumentation initialisiert"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` ist ein Vite-Plugin, das Komponenten-Quelldateien nach **Inline-Intlayer-Inhaltsdeklarationen** scannt — also Inhalten, die direkt in einer Komponente statt in einer separaten `.content.ts`-Datei definiert sind — und diese während der Transformationsphase in Wörterbuch-JSON-Dateien schreibt.

> **Seit Intlayer v9** ist `intlayerCompiler` automatisch im Hauptplugin [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md) enthalten, wenn sowohl `compiler.enabled` auf `true` gesetzt als auch `compiler.output` in Ihrer Intlayer-Konfiguration konfiguriert ist. Sie müssen es nur dann separat registrieren, wenn Sie die volle Kontrolle über die Compiler-spezifische Konfiguration wünschen.

## Verwendung

### Als Teil von `intlayer()` (empfohlen, v9+)

Aktivieren Sie den Compiler in Ihrer Intlayer-Konfiguration:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // Ort, an den extrahierte Wörterbücher geschrieben werden
  },
});
```

Verwenden Sie dann das Standard-Plugin ohne zusätzliche Registrierung:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone (falls erforderlich)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## Optionen

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| Option           | Typ                       | Beschreibung                                                                                              |
| ---------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Intlayer-Konfigurations-Overrides, die an `getConfiguration()` weitergeleitet werden.                     |
| `compilerConfig` | `Partial<CompilerConfig>` | Overrides für den Compiler-spezifischen Konfigurationsabschnitt (z. B. `enabled`, `output`, `filesList`). |

### Beispiel

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## Funktionsweise

### Transformationsphase

Für jede Quelldatei, die auf `compiler.filesList` passt, führt das Compiler-Plugin folgende Schritte aus:

1. Übergibt den Dateiinhalt an `extractContent` aus `@intlayer/babel`.
2. Ruft für jede gefundene Deklaration `onExtract` auf, wodurch die resultierende Wörterbuch-JSON-Datei in `compiler.output` geschrieben wird.
3. Gibt den transformierten Quellcode zurück, bei dem Inline-Deklarationen durch Standardaufrufe von `useIntlayer('key')` / `getIntlayer('key')` ersetzt wurden.

Unterstützte Dateitypen: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

Wenn eine Komponentendatei im Entwicklungsmodus gespeichert wird, führt der Compiler folgende Schritte aus:

1. Erkennt die Dateiänderung über Vites `handleHotUpdate`-Hook.
2. Extrahiert den Inhalt der aktualisierten Datei erneut.
3. Schreibt die aktualisierte Wörterbuch-JSON-Datei.
4. Löst einen vollständigen Seitenreload aus (`server.ws.send({ type: 'full-reload' })`).

Ein Debounce von 500 ms verhindert, dass das Schreiben des Wörterbuchs selbst (das ebenfalls ein Dateiänderungsereignis auslöst) eine unendliche Extraktionsschleife verursacht.

### Deduplizierung

`intlayerCompiler` verwendet denselben Deduplizierungsmechanismus (`createPrimaryInstanceGuard`) wie die anderen gebündelten Plugins. Wenn sowohl `intlayer()` (das den Compiler bündelt) als auch ein manueller `intlayerCompiler()`-Aufruf vorhanden sind, wird nur die erste registrierte Instanz ausgeführt — es werden keine Wörterbücher doppelt geschrieben.
