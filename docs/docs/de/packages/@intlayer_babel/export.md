---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "@intlayer/babel-Paketdokumentation"
description: Babel-Plugins für Intlayer zur Handhabung der Inhaltsextraktion, Importoptimierung, Bereinigung ungenutzter Felder und Maskierung von Feldnamen während des Builds.
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - internationalisierung
  - i18n
  - compiler
  - optimieren
  - bereinigen
  - minifizieren
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Vereinheitlichte Dokumentation aller Exporte"
author: aymericzip
---

# @intlayer/babel-Paket

Das Paket `@intlayer/babel` stellt eine Reihe spezialisierter Babel-Plugins für Intlayer bereit. Diese Plugins decken den gesamten Build-Zyklus ab: Extrahieren von Inhaltsdeklarationen, Umschreiben von `useIntlayer`- / `getIntlayer`-Aufrufen in optimierte Wörterbuch-Importe, Bereinigen ungenutzter Felder und Minimieren von Feldnamen.

## Installation

```bash
npm install @intlayer/babel
```

## Exporte

Import:

```ts
import { ... } from "@intlayer/babel";
```

---

### Plugins

| Funktion / Klasse              | Beschreibung                                                                                                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Babel-Plugin, das übersetzbare Inhalte aus Quelldateien extrahiert und `useIntlayer` / `getIntlayer` hooks automatisch einfügt. Entwickelt für die Verwendung mit Next.js und Babel-basierten Build-Tools.                    |
| `intlayerOptimizeBabelPlugin`  | Babel-Plugin, das `useIntlayer`- und `getIntlayer`-Aufrufe transformiert und deren Importe in optimierte JSON-Wörterbuch-Importe umschreibt (statisch, dynamisch oder über fetch).                                            |
| `intlayerPurgeBabelPlugin`     | Babel-Plugin, das Quelldateien analysiert und kompilierte Wörterbuch-JSON-Dateien umschreibt, um ungenutzte Felder zu entfernen (`build.purge`) oder sie in kurze Aliase umzubenennen (`build.minify`).                       |
| `intlayerMinifyBabelPlugin`    | Babel-Plugin, das Quelldateien so umschreibt, dass sie die kurzen Feld-Aliase verwenden, die während der Minifizierungsphase zugewiesen wurden (z. B. `content.title` ← `content.a`). Basiert auf `intlayerPurgeBabelPlugin`. |
| `makeFieldRenameBabelPlugin`   | Factory-Funktion, die ein Babel-Plugin erzeugt, um Zugriffe auf Inhaltsfelder von Wörterbüchern in Quelldateien entsprechend der in `PruneContext` befüllten `dictionaryKeyToFieldRenameMap` umzubenennen.                    |
| `makeUsageAnalyzerBabelPlugin` | Factory-Funktion, die ein Babel-Plugin erzeugt, um die Verwendung von `useIntlayer` / `getIntlayer` im Quellcode zu analysieren und Feldnutzungsdaten im gemeinsamen `PruneContext` zu aggregieren.                           |
| `getSharedPruneContext`        | Hilfsfunktion, die das gemeinsame `PruneContext`-Objekt für das angegebene Basisverzeichnis zurückgibt, oder `null`, wenn es noch nicht initialisiert wurde.                                                                  |

---

### Hilfsprogramme zur Plugin-Konfiguration

| Funktion                   | Beschreibung                                                                                                                                                                |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Lädt die Intlayer-Konfiguration und gibt `ExtractPluginOptions` zurück, die für die Verwendung mit `intlayerExtractBabelPlugin` bereit sind.                                |
| `getOptimizePluginOptions` | Lädt die Intlayer-Konfiguration und kompilierte Wörterbücher und gibt `OptimizePluginOptions` zurück, die für die Verwendung mit `intlayerOptimizeBabelPlugin` bereit sind. |
| `getPurgePluginOptions`    | Lädt die Intlayer-Konfiguration und gibt `PurgePluginOptions` zurück, die für die Verwendung mit `intlayerPurgeBabelPlugin` bereit sind.                                    |
| `getMinifyPluginOptions`   | Lädt die Intlayer-Konfiguration und gibt `MinifyPluginOptions` zurück, die für die Verwendung mit `intlayerMinifyBabelPlugin` bereit sind.                                  |

---

### Typen

| Typ                     | Beschreibung                                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | Compiler-Modus: `'dev'` für die Entwicklung mit HMR-Unterstützung oder `'build'` für Produktions-Builds.                            |
| `ExtractPluginOptions`  | Optionen für `intlayerExtractBabelPlugin`: Dateiliste, Konfiguration, `onExtract`-Callback usw.                                     |
| `ExtractResult`         | Extraktionsergebnis: Wörterbuchschlüssel, Dateipfad, Inhalt und Sprache.                                                            |
| `OptimizePluginOptions` | Optionen für `intlayerOptimizeBabelPlugin`: Wörterbuchpfade, Importmodus, Moduszuordnung pro Wörterbuch usw.                        |
| `PurgePluginOptions`    | Optionen für `intlayerPurgeBabelPlugin`: Basisverzeichnis, Bereinigungs-/Minifizierungs-/Optimierungs-Flags, Komponentendateiliste. |
| `MinifyPluginOptions`   | Optionen für `intlayerMinifyBabelPlugin`: Basisverzeichnis, Minifizierungs-/Optimierungs-/editorEnabled-Flags.                      |
| `PruneContext`          | Gemeinsamer Zustand zwischen Analyse- und Bereinigungs-Plugins: Feldnutzungszuordnungen, Umbenennungszuordnungen usw.               |
| `DictionaryFieldUsage`  | Ergebnis der Feldnutzung für ein einzelnes Wörterbuch: `Set<string>` oder `'all'`, wenn die statische Analyse nicht eindeutig ist.  |
| `NestedRenameEntry`     | Knoten im Umbenennungsbaum: der `shortName` und die Zuordnung der Unterknoten.                                                      |
| `NestedRenameMap`       | Eine Ebene im Umbenennungsbaum: `Map<string, NestedRenameEntry>`.                                                                   |
| `CompatCallerConfig`    | Konfiguration für einen kompatiblen Nutzungsanalysator für `compat-adapter`-Pakete (Name des Aufrufers und Verarbeitungsoptionen).  |
| `ScriptBlock`           | Skriptblock, der aus einer SFC-Datei (Vue oder Svelte) extrahiert wurde: Inhalt, Start-Offset und End-Offset.                       |

---

### Hilfsfunktionen

| Funktion                          | Beschreibung                                                                                                                                                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | Konvertiert eine Ganzzahl (beginnend bei Null) in einen kurzen alphabetischen Bezeichner: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, etc.                                          |
| `buildNestedRenameMapFromContent` | Erstellt rekursiv eine `NestedRenameMap` aus dem Inhaltswert eines kompilierten Wörterbuchs unter Berücksichtigung von Intlayer-Knotenstrukturen (translation, enumeration usw.). |
| `createPruneContext`              | Erstellt ein neues leeres `PruneContext`-Objekt, das mit Standardwerten initialisiert ist.                                                                                        |
| `extractScriptBlocks`             | Extrahiert `<script>`-Blöcke aus SFC-Dateien (Vue / Svelte) für die anschließende Babel-Analyse.                                                                                  |
| `BABEL_PARSER_OPTIONS`            | Konstante, die Babel-Parser-Optionen darstellt und die unterstützten Frameworks (React/Vue/Svelte/Angular/...) abdeckt.                                                           |
| `INTLAYER_CALLER_NAMES`           | Konstante Liste der ursprünglichen Intlayer-Aufrufernamen: `['useIntlayer', 'getIntlayer']`.                                                                                      |

---

## Beispielhafte Verwendung

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **Hinweis:** Das `intlayerPurgeBabelPlugin` muss **vor** `intlayerMinifyBabelPlugin` deklariert werden, da Letzteres die von Ersterem erstellte Umbenennungszuordnung liest. Zudem muss beiden `intlayerOptimizeBabelPlugin` vorausgehen, damit es die Wörterbuchschlüssel sehen kann, bevor die `useIntlayer`-Aufrufe umgeschrieben werden.
