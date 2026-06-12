---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Sync PO Plugin
description: Synchronisieren Sie Intlayer-Wörterbücher mit Gettext PO-Dateien. Behalten Sie Ihr bestehendes i18n bei, während Sie Intlayer zum Verwalten, Übersetzen und Testen Ihrer Nachrichten verwenden.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - Übersetzungen
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Erste Dokumentation für das Sync PO Plugin"
author: aymericzip
---

# Sync PO (i18n Brücken) - Sync PO mit ICU / i18next Unterstützung

Verwenden Sie Intlayer als Add-on zu Ihrem bestehenden i18n-Stack. Dieses Plugin hält Ihre Gettext PO-Nachrichten mit Intlayer-Wörterbüchern synchron, damit Sie:

- Ihren bestehenden PO-basierten Übersetzungs-Workflow beibehalten können.
- Ihre Nachrichten mit Intlayer (CLI, CI, Anbieter, CMS) verwalten und übersetzen können, ohne Ihre App zu refaktorisieren.
- Tutorials und SEO-Inhalte für jedes Ökosystem bereitstellen können, während Sie Intlayer als PO-Verwaltungsebene vorschlagen.

Hinweise und aktueller Umfang:

- Externalisierung in das CMS funktioniert für Übersetzungen und klassischen Text.
- Noch keine Unterstützung für Platzhalter, Plurale/ICU oder fortgeschrittene Laufzeitfunktionen anderer Bibliotheken innerhalb der PO-Einträge selbst.
- Der visuelle Editor wird für i18n-Ausgaben von Drittanbietern noch nicht unterstützt.

### Wann Sie dieses Plugin verwenden sollten

- Sie verwenden bereits Gettext PO-Dateien für Ihre Übersetzungen.
- Sie möchten KI-gestütztes Ausfüllen, Tests in der CI und Content-Ops nutzen, ohne Ihre Rendering-Laufzeit zu ändern.

## Installation

```bash
pnpm add -D @intlayer/sync-po-plugin
# oder
npm i -D @intlayer/sync-po-plugin
```

## Plugins

Dieses Paket bietet zwei Plugins:

- `loadPO`: Lädt PO-Dateien in Intlayer-Wörterbücher.
  - Dieses Plugin wird verwendet, um PO-Dateien aus einer Quelle zu laden und in Intlayer-Wörterbücher zu integrieren. Es kann die gesamte Codebasis scannen und nach spezifischen PO-Dateien suchen.
    Dieses Plugin kann verwendet werden:
    - wenn Sie eine i18n-Bibliothek verwenden, die einen bestimmten Ort für das Laden Ihrer PO-Dateien vorschreibt, Sie aber Ihre Inhaltsdeklaration an einer beliebigen Stelle in Ihrer Codebasis platzieren möchten.
    - Es kann auch verwendet werden, wenn Sie Ihre Nachrichten von einer Remote-Quelle (z. B. einem CMS, einer API usw.) abrufen und Ihre Nachrichten in PO-Dateien speichern möchten.

  > Unter der Haube scannt dieses Plugin die gesamte Codebasis, sucht nach spezifischen PO-Dateien und lädt sie in Intlayer-Wörterbücher.
  > Beachten Sie, dass dieses Plugin die Ausgabe und Übersetzungen nicht zurück in die PO-Dateien schreibt.

- `syncPO`: Synchronisiert PO-Dateien mit Intlayer-Wörterbüchern.
  - Dieses Plugin wird verwendet, um PO-Dateien mit Intlayer-Wörterbüchern zu synchronisieren. Es kann den angegebenen Ort scannen und die PO-Dateien laden, die dem Muster für spezifische PO-Dateien entsprechen. Dieses Plugin ist nützlich, wenn Sie die Vorteile von Intlayer nutzen möchten, während Sie eine andere i18n-Bibliothek verwenden.

## Verwendung beider Plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Halten Sie Ihre aktuellen PO-Dateien mit Intlayer-Wörterbüchern synchron
  plugins: [
    /**
     * Lädt alle PO-Dateien in src, die dem Muster {key}.i18n.po entsprechen
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Stellt sicher, dass diese PO-Dateien Vorrang vor Dateien unter `./locales/en/${key}.po` haben
    }),
    /**
     * Lädt die Ausgabe und Übersetzungen und schreibt sie zurück in die PO-Dateien im Verzeichnis locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncPO` Plugin

### Schnellstart

Fügen Sie das Plugin zu Ihrer `intlayer.config.ts` hinzu und verweisen Sie auf Ihre bestehende PO-Struktur.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Halten Sie Ihre aktuellen PO-Dateien mit Intlayer-Wörterbüchern synchron
  plugins: [
    syncPO({
      // Layout pro Sprache und pro Namespace
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternative: Eine Datei pro Sprache:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Wie es funktioniert

- Lesen: Das Plugin entdeckt PO-Dateien über Ihren `source`-Builder und lädt sie als Intlayer-Wörterbücher.
- Schreiben: Nach dem Build und Ausfüllen schreibt es lokalisierte PO-Dateien zurück in dieselben Pfade (mit korrekten Gettext-Headern).
- Automatisches Ausfüllen: Das Plugin deklariert einen `autoFill`-Pfad für jedes Wörterbuch. Das Ausführen von `intlayer fill` aktualisiert standardmäßig nur fehlende Übersetzungen in Ihren PO-Dateien.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // erforderlich
  location?: string, // optionales Label, Standard: "sync-po::path/to/source"
  priority?: number, // optionale Priorität für die Konfliktlösung, Standard: 0
```

### Mehrere PO-Quellen und Priorität

Sie können mehrere `syncPO`-Plugins hinzufügen, um verschiedene PO-Quellen zu synchronisieren. Dies ist nützlich, wenn Sie mehrere Übersetzungsquellen oder unterschiedliche PO-Strukturen in Ihrem Projekt haben.

#### Prioritätssystem

Wenn mehrere Plugins auf denselben Wörterbuchschlüssel abzielen, bestimmt der Parameter `priority`, welches Plugin Vorrang hat:

- Höhere Prioritätszahlen gewinnen gegenüber niedrigeren
- Die Standardpriorität von `.content`-Dateien ist `0`
- Die Standardpriorität von Plugins ist `0`
- Plugins mit derselben Priorität werden in der Reihenfolge verarbeitet, in der sie in der Konfiguration erscheinen

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Primäre PO-Quelle (höchste Priorität)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Fallback PO-Quelle (niedrigere Priorität)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Legacy PO-Quelle (niedrigste Priorität)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load PO Plugin

### Schnellstart

Fügen Sie das Plugin zu Ihrer `intlayer.config.ts` hinzu, um bestehende PO-Dateien als Intlayer-Wörterbücher zu erfassen. Dieses Plugin ist schreibgeschützt (keine Schreibvorgänge auf die Festplatte):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Erfassen Sie PO-Nachrichten, die sich an einer beliebigen Stelle in Ihrem Quellbaum befinden
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Lädt eine einzelne Sprache pro Plugin-Instanz (standardmäßig die defaultLocale der Konfiguration)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative: Layout pro Sprache, weiterhin schreibgeschützt (nur die ausgewählte Sprache wird geladen):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Nur Dateien für Locales.FRENCH werden über dieses Muster geladen
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Wie es funktioniert

- Entdecken: Erstellt einen Glob aus Ihrem `source`-Builder und sammelt passende PO-Dateien.
- Erfassen: Lädt jede PO-Datei mit der angegebenen `locale` als Intlayer-Wörterbuch.
- Schreibgeschützt: Schreibt oder formatiert keine Ausgabedateien; verwenden Sie `syncPO`, wenn Sie eine bidirektionale Synchronisierung benötigen.
- Bereit für automatisches Ausfüllen: Definiert einen `fill`-Pfad, damit `intlayer content fill` fehlende Schlüssel ausfüllen kann.

### API

```ts
loadPO({
  // Pfade zu Ihren PO-Dateien erstellen. `locale` ist optional, wenn Ihre Struktur kein Sprachsegment hat
  source: ({ key, locale }) => string,

  // Zielsprache für die von dieser Plugin-Instanz geladenen Wörterbücher
  // Standardmäßig configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optionales Label zur Identifizierung der Quelle
  location?: string, // Standard: "plugin"

  // Priorität für die Konfliktlösung mit anderen Quellen
  priority?: number, // Standard: 0
});
```

### Verhalten und Konventionen

- Wenn Ihre `source`-Maske einen Sprach-Platzhalter enthält, werden nur Dateien für die ausgewählte `locale` erfasst.
- Wenn kein `{key}`-Segment in Ihrer Maske vorhanden ist, lautet der Wörterbuchschlüssel "index".
- Schlüssel werden aus Dateipfaden abgeleitet, indem der Platzhalter `{key}` in Ihrem `source`-Builder ersetzt wird.
- Das Plugin verwendet nur entdeckte Dateien und erzeugt keine fehlenden Sprachen oder Schlüssel.
- Der `fill`-Pfad wird aus Ihrer `source` abgeleitet und verwendet, um fehlende Werte über die CLI zu aktualisieren, wenn Sie sich dafür entscheiden.

## Konfliktlösung

Wenn derselbe Übersetzungsschlüssel in mehreren PO-Quellen vorhanden ist:

1. Das Plugin mit der höchsten Priorität bestimmt den endgültigen Wert
2. Quellen mit niedrigerer Priorität werden als Fallback für fehlende Schlüssel verwendet
3. Dies ermöglicht es Ihnen, Legacy-Übersetzungen beizubehalten, während Sie schrittweise zu neuen Strukturen migrieren

## CLI

Die synchronisierten PO-Dateien werden wie andere `.content`-Dateien behandelt. Das bedeutet, dass alle Intlayer-Befehle für die synchronisierten PO-Dateien verfügbar sind. Einschließlich:

- `intlayer content test`, um zu testen, ob Übersetzungen fehlen
- `intlayer content list`, um die synchronisierten PO-Dateien aufzulisten
- `intlayer content fill`, um fehlende Übersetzungen auszufüllen
- `intlayer content push`, um die synchronisierten PO-Dateien hochzuladen
- `intlayer content pull`, um die synchronisierten PO-Dateien herunterzuladen

Weitere Details finden Sie im [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

## Einschränkungen (aktuell)

- Keine Unterstützung für Platzhalter oder Plurale/ICU bei der Zieladressierung von Drittanbieter-Bibliotheken.
- Der visuelle Editor ist für Nicht-Intlayer-Laufzeiten noch nicht verfügbar.
- Nur PO-Synchronisation; andere Katalogformate als PO werden nicht unterstützt.

## Warum das wichtig ist

- Wir können etablierte i18n-Lösungen empfehlen und Intlayer als Add-on positionieren.
- Wir nutzen deren SEO/Keywords mit Tutorials, die damit enden, Intlayer für die PO-Verwaltung vorzuschlagen.
- Erweitert die Zielgruppe von „neuen Projekten“ auf „jedes Team, das bereits i18n verwendet“.
