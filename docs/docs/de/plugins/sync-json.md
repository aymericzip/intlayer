---
createdAt: 2025-03-13
updatedAt: 2025-10-05
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
history:
  - version: 6.1.6
    date: 2025-10-05
    changes: Erste Dokumentation des Sync JSON Plugins
---

# Sync JSON (i18n-Brücken)

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

## Schnellstart

Fügen Sie das Plugin zu Ihrer `intlayer.config.ts` hinzu und verweisen Sie auf Ihre bestehende JSON-Struktur.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Halten Sie Ihre aktuellen JSON-Dateien mit den Intlayer-Wörterbüchern synchron
  plugins: [
    syncJSON({
      // Pro-Locale, pro-Namespace Layout (z.B. next-intl, i18next mit Namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternative: Einzelne Datei pro Locale (häufig bei i18next/react-intl Setups):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Funktionsweise

- Lesen: Das Plugin entdeckt JSON-Dateien über Ihren `source`-Builder und lädt sie als Intlayer-Wörterbücher.
- Schreiben: Nach dem Build und Ausfüllen schreibt es die lokalisierten JSON-Dateien zurück an dieselben Pfade (mit einer abschließenden neuen Zeile, um Formatierungsprobleme zu vermeiden).
- Auto-Fill: Das Plugin deklariert einen `autoFill`-Pfad für jedes Wörterbuch. Das Ausführen von `intlayer fill` aktualisiert standardmäßig nur fehlende Übersetzungen in Ihren JSON-Dateien.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // erforderlich
  location?: string, // optionales Label, Standard: "plugin"
  priority?: number, // optionale Priorität zur Konfliktlösung, Standard: 0
});
```

## Mehrere JSON-Quellen und Priorität

Sie können mehrere `syncJSON`-Plugins hinzufügen, um verschiedene JSON-Quellen zu synchronisieren. Dies ist nützlich, wenn Sie mehrere i18n-Bibliotheken oder unterschiedliche JSON-Strukturen in Ihrem Projekt haben.

### Prioritätssystem

Wenn mehrere Plugins denselben Wörterbuchschlüssel ansprechen, bestimmt der Parameter `priority`, welches Plugin Vorrang hat:

- Höhere Prioritätszahlen haben Vorrang vor niedrigeren
- Die Standardpriorität von `.content`-Dateien ist `0`
- Die Standardpriorität von Plugin-Content-Dateien ist `-1`
- Plugins mit derselben Priorität werden in der Reihenfolge verarbeitet, in der sie in der Konfiguration erscheinen

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Primäre JSON-Quelle (höchste Priorität)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Fallback-JSON-Quelle (niedrigere Priorität)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Legacy-JSON-Quelle (niedrigste Priorität)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Konfliktlösung

Wenn derselbe Übersetzungsschlüssel in mehreren JSON-Quellen vorhanden ist:

1. Bestimmt das Plugin mit der höchsten Priorität den endgültigen Wert
2. Werden Quellen mit niedrigerer Priorität als Fallbacks für fehlende Schlüssel verwendet
3. Ermöglicht es Ihnen, Legacy-Übersetzungen beizubehalten und gleichzeitig schrittweise auf neue Strukturen umzusteigen

## Integrationen

Nachfolgend sind gängige Zuordnungen aufgeführt. Belassen Sie Ihre Laufzeit unverändert; fügen Sie nur das Plugin hinzu.

### i18next

Typische Dateistruktur: `./public/locales/{locale}/{namespace}.json` oder `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

JSON-Nachrichten pro Locale (oft `./messages/{locale}.json`) oder pro Namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Siehe auch: `docs/de/intlayer_with_next-intl.md`.

### react-intl

Einzelne JSON-Datei pro Locale ist üblich:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Entweder eine einzelne Datei pro Locale oder pro Namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

Die synchronisierten JSON-Dateien werden wie andere `.content`-Dateien behandelt. Das bedeutet, dass alle intlayer-Befehle für die synchronisierten JSON-Dateien verfügbar sind. Einschließlich:

- `intlayer content test`, um zu testen, ob Übersetzungen fehlen
- `intlayer content list`, um die synchronisierten JSON-Dateien aufzulisten
- `intlayer content fill`, um fehlende Übersetzungen zu ergänzen
- `intlayer content push`, um die synchronisierten JSON-Dateien zu pushen
- `intlayer content pull`, um die synchronisierten JSON-Dateien zu pullen

Siehe [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) für weitere Details.

## Einschränkungen (aktuell)

- Keine Unterstützung für Einfügungen oder Pluralformen/ICU bei der Verwendung von Drittanbieter-Bibliotheken.
- Visueller Editor ist für Nicht-Intlayer-Laufzeiten noch nicht verfügbar.
- Nur JSON-Synchronisierung; Nicht-JSON-Katalogformate werden nicht unterstützt.

## Warum das wichtig ist

- Wir können etablierte i18n-Lösungen empfehlen und Intlayer als Zusatzmodul positionieren.
- Wir nutzen deren SEO/Schlüsselwörter mit Tutorials, die abschließend vorschlagen, Intlayer zur Verwaltung von JSON einzusetzen.
- Erweitert die ansprechbare Zielgruppe von „neuen Projekten“ auf „jedes Team, das bereits i18n verwendet“.
