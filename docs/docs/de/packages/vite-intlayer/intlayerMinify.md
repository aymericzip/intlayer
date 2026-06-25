---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerMinify Vite-Plugin-Dokumentation | vite-intlayer
description: Vite-Plugin, das kompilierte Intlayer-Wörterbuch-JSON-Dateien minifiziert und optional Inhaltsfeldnamen maskiert, um die Bundle-Größe zu reduzieren.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minify
  - bundle size
  - dictionary
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Dokumentation initialisiert"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` ist ein Vite-Plugin, das kompilierte Wörterbuch-JSON-Dateien während eines Produktions-Builds minifiziert. Es entfernt alle unnötigen Leerzeichen und benennt in Kombination mit `intlayerPrune` optional Inhaltsfeldnamen in kurze alphabetische Aliase (`a`, `b`, `c`, …) um, um die Bundle-Größe weiter zu reduzieren.

> Das Plugin ist bereits automatisch enthalten und konfiguriert, wenn Sie [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/intlayer.md) verwenden. Sie müssen es nur dann manuell registrieren, wenn Sie den Plugin-Stack selbst zusammenstellen.

## Verwendung

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Aktivierungsbedingungen

`intlayerMinify` ist **nur** aktiv, wenn alle drei folgenden Bedingungen erfüllt sind:

1. Der Vite-Befehl lautet `build` (nicht `serve` / dev).
2. `build.optimize` ist `true` (oder `undefined`, was standardmäßig `true` für Builds ist).
3. `build.minify` ist in Ihrer Intlayer-Konfiguration auf `true` gesetzt.

Es wird automatisch **deaktiviert**, wenn `editor.enabled` auf `true` gesetzt ist, da der Editor den vollständigen, für Menschen lesbaren Wörterbuchinhalt benötigt.

## Was wird minifiziert

Das Plugin zielt auf zwei Wörterbuchverzeichnisse ab (wie in `intlayer.system` aufgelöst):

- `dictionariesDir` — statische Wörterbücher für alle Sprachen (z. B. `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — dynamische Wörterbücher pro Sprache

> Wörterbücher im Fetch-Modus (`fetchDictionariesDir`) werden **nie** minifiziert, da sie zur Laufzeit von einer Remote-API unter ihren ursprünglichen Feldnamen bereitgestellt werden. Das Umbenennen von Feldern würde eine Diskrepanz zwischen der Serverantwort und den clientseitigen Eigenschaftszugriffen verursachen.

## Feldnamen-Maskierung (Eigenschafts-Minifizierung)

Wenn `intlayerPrune` die Codebasis analysiert und `pruneContext.dictionaryKeyToFieldRenameMap` befüllt hat, benennt `intlayerMinify` auch Inhaltsfeldnamen in kurze Aliase um. Zum Beispiel:

```json
// vorher
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// nachher (mit Maskierung)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Die entsprechenden Eigenschaftszugriffe in den Quelldateien werden durch den Babel-Durchlauf in `intlayerOptimize` umbenannt, sodass das Laufzeitverhalten unverändert bleibt.

Interne Intlayer-Felder (`nodeType`, `translation` usw.) werden niemals umbenannt.

## Edge-Case-Wörterbücher

Wörterbücher, die in `pruneContext.dictionariesWithEdgeCases` gekennzeichnet sind (strukturelle Anomalien, die während der Prune-Phase festgestellt wurden), werden vollständig übersprungen — weder minifiziert noch maskiert —, um die Auslieferung fehlerhafter Daten zu vermeiden.

## Qualifizierte Gruppen (Sammlungen / Varianten / Meta-Einträge)

Bei Wörterbüchern mit einem `qualifierTypes`-Array (Sammlungen, Varianten und Meta-Einträge) behält das Plugin das `qualifierTypes`-Array und das `meta`-Side-Map wortwörtlich bei. Nur die `content`-Einträge werden in ihren Feldnamen maskiert. Die zusammengesetzten Schlüssel (die für den Selektor-Abgleich zur Laufzeit verwendet werden) werden niemals berührt.
