---
createdAt: 2025-03-13
updatedAt: 2026-06-21
title: Sync JSON Plugin
description: Synchronisieren Sie Intlayer-Wörterbücher mit Drittanbieter-i18n-JSON-Dateien (i18next, next-intl, react-intl, vue-i18n und mehr). Behalten Sie Ihr bestehendes i18n bei und verwenden Sie Intlayer, um Ihre Nachrichten zu verwalten, zu übersetzen und zu testen.
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - Übersetzungen
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "Option `splitKeys` hinzugefügt (ein Wörterbuch pro Top-Level-Namespace-Schlüssel) für next-intl / react-intl Single-File-Layouts"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Unterstützung für ICU- und i18next-Formate hinzugefügt"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Erste Dokumentation des Sync JSON Plugins"
author: aymericzip
---

# Sync JSON (i18n-Brücken) - Sync JSON mit ICU / i18next-Unterstützung

<iframe title="Wie Sie Ihre JSON-Übersetzungen mit Intlayer synchronisiert halten" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Verwenden Sie Intlayer als Ergänzung zu Ihrem bestehenden i18n-Stack. Dieses Plugin hält Ihre JSON-Nachrichten mit den Intlayer-Wörterbüchern synchron, sodass Sie:

- i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n usw. beibehalten können.
- Ihre Nachrichten mit Intlayer (CLI, CI, Anbieter, CMS) verwalten und übersetzen, ohne Ihre App umzustrukturieren.
- Tutorials und SEO-Inhalte für jedes Ökosystem bereitstellen und gleichzeitig Intlayer als JSON-Verwaltungsschicht vorschlagen.

Hinweise und aktueller Umfang:

- Die Externalisierung zum CMS funktioniert für Übersetzungen und klassischen Text.
- Noch keine Unterstützung für Einfügungen, Pluralformen/ICU oder erweiterte Laufzeitfunktionen anderer Bibliotheken.
- Der visuelle Editor wird für Ausgaben von Drittanbieter-i18n noch nicht unterstützt.

### Wann Sie dieses Plugin verwenden sollten

- Sie verwenden bereits eine i18n-Bibliothek und speichern Nachrichten in JSON-Dateien.
- Sie möchten KI-unterstütztes Ausfüllen, Tests in CI und Content-Operationen durchführen, ohne Ihre Rendering-Laufzeit zu ändern.

## Installation

```bash
pnpm add -D @intlayer/sync-json-plugin
# oder
npm i -D @intlayer/sync-json-plugin
```

## Plugins

Dieses Paket bietet zwei Plugins:

- `loadJSON`: Lädt JSON-Dateien in Intlayer-Wörterbücher.
  - Dieses Plugin wird verwendet, um JSON-Dateien aus einer Quelle zu laden, und diese werden in Intlayer-Wörterbücher geladen. Es kann die gesamte Codebasis durchsuchen und nach bestimmten JSON-Dateien suchen.
    Dieses Plugin kann verwendet werden
    - wenn Sie eine i18n-Bibliothek verwenden, die einen bestimmten Speicherort für Ihre zu ladenden JSON-Dateien vorschreibt (z.B. `next-intl`, `i18next`, `react-intl`, `vue-i18n` usw.), Sie aber Ihre Inhaltsdeklaration an einer beliebigen Stelle in Ihrer Codebasis platzieren möchten.
    - Es kann auch verwendet werden, wenn Sie Ihre Nachrichten von einer Remote-Quelle (z.B. einem CMS, einer API usw.) abrufen und Ihre Nachrichten in JSON-Dateien speichern möchten.

  > Im Hintergrund scannt dieses Plugin die gesamte Codebasis, sucht nach bestimmten JSON-Dateien und lädt sie in Intlayer-Wörterbücher.
  > Beachten Sie, dass dieses Plugin die Ausgabe und Übersetzungen nicht zurück in die JSON-Dateien schreibt.

- `syncJSON`: Synchronisiert JSON-Dateien mit Intlayer-Wörterbüchern.
  - Dieses Plugin wird verwendet, um JSON-Dateien mit Intlayer-Wörterbüchern zu synchronisieren. Es kann den angegebenen Speicherort scannen und die JSON-Dateien laden, die dem Muster für bestimmte JSON-Dateien entsprechen. Dieses Plugin ist nützlich, wenn Sie die Vorteile von Intlayer nutzen möchten, während Sie eine andere i18n-Bibliothek verwenden.

## Beide Plugins verwenden

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Halten Sie Ihre aktuellen JSON-Dateien mit den Intlayer-Wörterbüchern synchron
  plugins: [
    /**
     * Lädt alle JSON-Dateien im src-Verzeichnis, die dem Muster {key}.i18n.json entsprechen
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Stellt sicher, dass diese JSON-Dateien Vorrang vor Dateien unter `./locales/en/${key}.json` haben
      format: "intlayer", // Format des JSON-Inhalts
    }),
    /**
     * Lädt die Ausgabe und Übersetzungen und schreibt sie zurück in die JSON-Dateien im locales-Verzeichnis
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Schnellstart

Fügen Sie das Plugin zu Ihrer `intlayer.config.ts` hinzu und verweisen Sie auf Ihre bestehende JSON-Struktur.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Halten Sie Ihre aktuellen JSON-Dateien mit den Intlayer-Wörterbüchern synchron
  plugins: [
    syncJSON({
      // Pro-Locale, pro-Namespace Layout (z.B. next-intl, i18next mit Namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternative: Einzelne Datei pro Locale (häufig bei i18next/react-intl Setups):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Funktionsweise

- Lesen: Das Plugin entdeckt JSON-Dateien über Ihren `source`-Builder und lädt sie als Intlayer-Wörterbücher.
- Schreiben: Nach dem Build und Ausfüllen schreibt es die lokalisierten JSON-Dateien zurück an dieselben Pfade (mit einer abschließenden neuen Zeile, um Formatierungsprobleme zu vermeiden).
- Auto-Fill: Das Plugin deklariert einen `autoFill`-Pfad für jedes Wörterbuch. Das Ausführen von `intlayer fill` aktualisiert standardmäßig nur fehlende Übersetzungen in Ihren JSON-Dateien.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // erforderlich
  location?: string, // optionales Label, Standard: "plugin"
  priority?: number, // optionale Priorität zur Konfliktlösung, Standard: 0
  format?: 'intlayer' | 'icu' | 'i18next', // optionaler Formatierer, verwendet für Intlayer-Runtime-Kompatibilität
  splitKeys?: boolean, // optional, teilt eine einzelne Datei in ein Wörterbuch pro Top-Level-Schlüssel (automatisch erkannt)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Gibt den Formatierer an, der für den Wörterbuchinhalt bei der Synchronisierung von JSON-Dateien verwendet werden soll. Dies ermöglicht die Verwendung verschiedener Nachrichtenformatierungssyntaxen, die mit der Intlayer-Runtime kompatibel sind.

- `undefined`: Es wird kein Formatierer verwendet, der JSON-Inhalt wird unverändert verwendet.
- `'intlayer'`: Der Standard-Intlayer-Formatierer (Standard).
- `'icu'`: Verwendet ICU-Nachrichtenformatierung (kompatibel mit Bibliotheken wie react-intl, vue-i18n).
- `'i18next'`: Verwendet i18next-Nachrichtenformatierung (kompatibel mit i18next, next-i18next, Solid-i18next).

> Beachten Sie, dass die Verwendung eines Formatierers Ihren JSON-Inhalt bei Ein- und Ausgabe transformiert. Bei komplexen JSON-Regeln wie ICU-Pluralen kann das Parsing keine 1-zu-1-Zuordnung zwischen Ein- und Ausgabe garantieren.
> Wenn Sie die Intlayer-Runtime nicht verwenden, sollten Sie möglicherweise keinen Formatierer festlegen.

**Beispiel:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // i18next-Formatierung für Kompatibilität verwenden
}),
```

#### `splitKeys` (boolean)

Steuert, ob eine einzelne JSON-Datei, deren **Top-Level-Schlüssel Namespaces sind**, zu einem Wörterbuch pro Top-Level-Schlüssel werden soll, anstatt eines einzelnen Wörterbuchs, das die gesamte Datei enthält.

Dies entspricht dem Namespace-Modell von Bibliotheken wie `next-intl` und `react-intl`, bei denen eine `messages/{locale}.json`-Datei mehrere Namespaces durch ihre Top-Level-Schlüssel gruppiert, wobei jeder unabhängig angesprochen wird (z.B. `useTranslations('Hero')` löst sich in das `Hero`-Wörterbuch auf).

- `undefined` (Standard): **automatisch erkannt** — die Datei wird aufgeteilt, wenn das `source`-Muster kein `{key}`-Segment enthält (eine Datei enthält jeden Namespace), und andernfalls als einzelnes Wörterbuch beibehalten (eine Datei pro Schlüssel).
- `true`: teilt jeden Top-Level-Schlüssel immer in ein eigenes Wörterbuch auf.
- `false`: niemals aufteilen; die gesamte Datei wird zu einem einzigen Wörterbuch.

Angenommen, eine einzelne `messages/{locale}.json`-Datei:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // impliziert, da das Muster kein `{key}`-Segment enthält
}),
```

Dies erzeugt drei Wörterbücher — `Hero`, `Nav` und `About` — sodass `useTranslations('Hero')` (next-intl) korrekt aufgelöst wird. Beim Zurückschreiben werden alle Namespaces wieder in derselben pro-Locale-Datei zusammengeführt.

> Wenn Sie das explizite `{key}`-Segment in Ihrer `source` beibehalten (z.B. `./locales/${locale}/${key}.json`), ist jede Datei bereits ein Namespace, sodass die Aufteilung standardmäßig deaktiviert ist.

### Mehrere JSON-Quellen und Priorität

Sie können mehrere `syncJSON`-Plugins hinzufügen, um verschiedene JSON-Quellen zu synchronisieren. Dies ist nützlich, wenn Sie mehrere i18n-Bibliotheken oder unterschiedliche JSON-Strukturen in Ihrem Projekt haben.

#### Prioritätssystem

Wenn mehrere Plugins denselben Wörterbuchschlüssel ansprechen, bestimmt der Parameter `priority`, welches Plugin Vorrang hat:

- Höhere Prioritätszahlen haben Vorrang vor niedrigeren
- Die Standardpriorität von `.content`-Dateien ist `0`
- Die Standardpriorität von Plugins ist `0`
- Plugins mit derselben Priorität werden in der Reihenfolge verarbeitet, in der sie in der Konfiguration erscheinen

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Primäre JSON-Quelle (höchste Priorität)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Fallback-JSON-Quelle (niedrigere Priorität)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Legacy-JSON-Quelle (niedrigste Priorität)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON Plugin

### Schnellstart

Fügen Sie das Plugin zu Ihrer `intlayer.config.ts` hinzu, um vorhandene JSON-Dateien als Intlayer-Wörterbücher zu importieren. Dieses Plugin ist schreibgeschützt (keine Schreibvorgänge auf die Festplatte):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Importiert JSON-Nachrichten, die sich überall in Ihrem Quellbaum befinden
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Lädt eine einzelne Locale pro Plugin-Instanz (standardmäßig die Standard-Locale der Konfiguration)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative: Pro-Locale-Layout, weiterhin schreibgeschützt (nur die ausgewählte Locale wird geladen):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Nur Dateien für Locales.FRENCH werden aus diesem Muster geladen
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Funktionsweise

- Entdecken: Erstellt einen Glob aus Ihrem `source`-Builder und sammelt passende JSON-Dateien.
- Importieren: Lädt jede JSON-Datei als Intlayer-Wörterbuch mit der angegebenen `locale`.
- Schreibgeschützt: Schreibt oder formatiert keine Ausgabedateien; verwenden Sie `syncJSON`, wenn Sie eine Roundtrip-Synchronisierung benötigen.
- Auto-Fill bereit: Definiert ein `fill`-Muster, sodass `intlayer content fill` fehlende Schlüssel füllen kann.

### API

```ts
loadJSON({
  // Erstellt Pfade zu Ihren JSON-Dateien. `locale` ist optional, wenn Ihre Struktur kein Locale-Segment hat
  source: ({ key, locale }) => string,

  // Ziel-Locale für die von dieser Plugin-Instanz geladenen Wörterbücher
  // Standardmäßig configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optionales Label zur Identifizierung der Quelle
  location?: string, // Standard: "plugin"

  // Priorität zur Konfliktlösung gegenüber anderen Quellen
  priority?: number, // Standard: 0

  // Optionaler Formatierer für den JSON-Inhalt
  format?: 'intlayer' | 'icu' | 'i18next', // Standard: 'intlayer'

  // Teilt eine einzelne Datei in ein Wörterbuch pro Top-Level-Schlüssel (automatisch erkannt)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Gibt den Formatierer an, der für den Wörterbuchinhalt beim Laden von JSON-Dateien verwendet werden soll. Dies ermöglicht die Verwendung verschiedener Nachrichtenformatierungssyntaxen, die mit verschiedenen i18n-Bibliotheken kompatibel sind.

- `'intlayer'`: Der Standard-Intlayer-Formatierer (Standard).
- `'icu'`: Verwendet ICU-Nachrichtenformatierung (kompatibel mit Bibliotheken wie react-intl, vue-i18n).
- `'i18next'`: Verwendet i18next-Nachrichtenformatierung (kompatibel mit i18next, next-i18next, Solid-i18next).

**Beispiel:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // ICU-Formatierung für Kompatibilität verwenden
}),
```

#### `splitKeys` (boolean)

Gleiches Verhalten wie bei [`syncJSON`](#splitkeys-boolean): Wenn eine einzelne JSON-Datei mehrere Namespaces durch ihre Top-Level-Schlüssel gruppiert, wird jeder Top-Level-Schlüssel zu einem eigenen Wörterbuch.

- `undefined` (Standard): **automatisch erkannt** — Aufteilung, wenn das `source`-Muster kein `{key}`-Segment enthält, andernfalls ein einzelnes Wörterbuch.
- `true` / `false`: Aufteilung erzwingen oder deaktivieren.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys automatisch aktiviert: `Hero`, `Nav`, `About`, … jeder wird zu einem Wörterbuch
}),
```

### Verhalten und Konventionen

- Wenn Ihre `source`-Maske einen Locale-Platzhalter enthält, werden nur Dateien für die ausgewählte `locale` importiert.
- Wenn in Ihrer Maske kein `{key}`-Segment vorhanden ist, wird jeder Top-Level-Schlüssel der Datei standardmäßig zu einem eigenen Wörterbuch (siehe [`splitKeys`](#splitkeys-boolean)). Setzen Sie `splitKeys: false`, um stattdessen die gesamte Datei als ein einziges `index`-Wörterbuch zu laden.
- Schlüssel werden aus Dateipfaden abgeleitet, indem der `{key}`-Platzhalter in Ihrem `source`-Builder ersetzt wird.
- Das Plugin verwendet nur entdeckte Dateien und erstellt keine fehlenden Locales oder Schlüssel.
- Der `fill`-Pfad wird aus Ihrer `source` abgeleitet und verwendet, um fehlende Werte über die CLI zu aktualisieren, wenn Sie sich dafür entscheiden.

## Konfliktlösung

Wenn derselbe Übersetzungsschlüssel in mehreren JSON-Quellen vorhanden ist:

1. Bestimmt das Plugin mit der höchsten Priorität den endgültigen Wert
2. Werden Quellen mit niedrigerer Priorität als Fallbacks für fehlende Schlüssel verwendet
3. Ermöglicht es Ihnen, Legacy-Übersetzungen beizubehalten und gleichzeitig schrittweise auf neue Strukturen umzusteigen

## CLI

Die synchronisierten JSON-Dateien werden wie andere `.content`-Dateien behandelt. Das bedeutet, dass alle intlayer-Befehle für die synchronisierten JSON-Dateien verfügbar sind. Einschließlich:

- `intlayer content test`, um zu testen, ob Übersetzungen fehlen
- `intlayer content list`, um die synchronisierten JSON-Dateien aufzulisten
- `intlayer content fill`, um fehlende Übersetzungen zu ergänzen
- `intlayer content push`, um die synchronisierten JSON-Dateien zu pushen
- `intlayer content pull`, um die synchronisierten JSON-Dateien zu pullen

Siehe [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) für weitere Details.

## Einschränkungen (aktuell)

- Keine Unterstützung für Einfügungen oder Pluralformen/ICU bei der Verwendung von Drittanbieter-Bibliotheken.
- Visueller Editor ist für Nicht-Intlayer-Laufzeiten noch nicht verfügbar.
- Nur JSON-Synchronisierung; Nicht-JSON-Katalogformate werden nicht unterstützt.

## Warum das wichtig ist

- Wir können etablierte i18n-Lösungen empfehlen und Intlayer als Zusatzmodul positionieren.
- Wir nutzen deren SEO/Schlüsselwörter mit Tutorials, die abschließend vorschlagen, Intlayer zur Verwaltung von JSON einzusetzen.
- Erweitert die ansprechbare Zielgruppe von „neuen Projekten“ auf „jedes Team, das bereits i18n verwendet“.
