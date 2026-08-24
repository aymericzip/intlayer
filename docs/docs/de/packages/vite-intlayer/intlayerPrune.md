---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite Plugin Dokumentation | vite-intlayer
description: Anleitung zur Verwendung des intlayerPrune-Plugins des vite-intlayer-Pakets
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokumentation initialisiert"
author: aymericzip
---

# intlayerPrune Vite Plugin Dokumentation

Das `intlayerPrune` Vite-Plugin wird verwendet, um ungenutzte Wörterbücher aus Ihrem Anwendungs-Bundle mittels Tree-Shaking zu entfernen. Dadurch wird die endgültige Bundle-Größe reduziert, da nur die notwendigen mehrsprachigen Inhalte enthalten bleiben.

> Das Plugin ist bereits enthalten und wird automatisch konfiguriert, wenn Sie [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md) verwenden. Sie müssen es nur manuell registrieren, wenn Sie den Plugin-Stack selbst zusammenstellen.

## Verwendung

### As part of `intlayer()` (recommended)

Enable pruning through your Intlayer config and the main plugin handles everything:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // aktiviert sowohl Pruning als auch Minifizierung
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Wenn Sie den Plugin-Stack manuell zusammenstellen, teilen `intlayerPrune` und `intlayerMinify` ein `PruneContext`-Objekt, das einmal erstellt und an beide übergeben werden muss:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // optional, liest aus demselben Kontext
  ],
});
```

## Funktionsweise

### 1. Nutzungsanalyse (buildStart)

Während `buildStart` scannt das `intlayerOptimize`-Plugin (auch Teil von `intlayer()`) jede Komponenten-Quelldatei in `build.filesList`. Für jeden `useIntlayer('key')`- oder `getIntlayer('key')`-Aufruf wird genau aufgezeichnet, auf welche Felder zugegriffen wird, z. B.:

```ts
const { title, description } = useIntlayer("myDict");
// records: myDict → { title, description }
```

Dies erstellt `pruneContext.fieldUsageMap`, bevor `transform`-Aufrufe ausgeführt werden.

### 2. JSON Pruning (transform, enforce: 'pre')

Wenn Vite eine kompilierte Dictionary-JSON-Datei verarbeitet, fängt `intlayerPrune` sie vor Vites integrierter JSON → ESM-Konvertierung ab. Es liest die Feldnutzungs-Map aus `pruneContext` und entfernt alle Content-Felder, die nicht im aufgezeichneten Usage-Set enthalten sind.

Zwei Content-Formen werden unterstützt:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Felder werden pro Locale innerhalb von `translation` entfernt.
- **Dynamic (per-locale) dictionaries** — flach `{ fieldA: ..., fieldB: ... }`. Felder werden auf oberster Ebene entfernt.

### 3. Edge cases

Falls die Inhaltsstruktur eines Wörterbuchs nicht erkannt werden kann (z. B. eine ungewöhnliche verschachtelte Form), wird sie zu `pruneContext.dictionariesWithEdgeCases` hinzugefügt und **bleibt unverändert**. Eine Warnung wird protokolliert. `intlayerMinify` überspringt diese Wörterbücher ebenfalls.

### 4. Field-rename map

Wenn das Pruning erfolgreich ist, schreibt `intlayerPrune` auch `pruneContext.dictionaryKeyToFieldRenameMap` — eine Zuordnung von ursprünglichen Feldnamen zu kurzen Aliasen. `intlayerMinify` liest diese Map, um Felder in der Ausgabe-JSON umzubenennen, und der Babel-Umbenennungs-Pass von `intlayerOptimize` aktualisiert entsprechend Eigenschaftszugriffe in Quelldateien.

## Aktivierungsbedingungen

`intlayerPrune` ist aktiv **nur** wenn alle folgenden Bedingungen erfüllt sind:

1. Der Vite-Befehl ist `build`.
2. `build.optimize` ist `true` (oder `undefined`, was standardmäßig `true` für Builds ist).
3. `build.purge` ist `true` in Ihrer Intlayer-Konfiguration.

Es bleibt aktiv, wenn `editor.enabled` auf `true` steht: Der visuelle Editor löst jede Bearbeitung über `dictionaryKey` + `keyPath` anhand der unzusammengeführten Wörterbücher auf, die dieses Plugin nie berührt, und ein bereinigtes Feld wird von keiner Komponente gelesen — es wird also nie gerendert und ist auf der Seite nie auswählbar.
