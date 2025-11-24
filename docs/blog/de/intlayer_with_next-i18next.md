---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer und next-i18next
description: Integration von Intlayer mit next-i18next für eine umfassende Next.js Internationalisierungslösung
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internationalisierung
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Hinzufügen des loadJSON-Plugins
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin und umfassende Neufassung
---

# Next.js Internationalisierung (i18n) mit next-i18next und Intlayer

## Inhaltsverzeichnis

<TOC/>

## Was ist next-i18next?

**next-i18next** ist eines der beliebtesten Internationalisierungs- (i18n) Frameworks für Next.js-Anwendungen. Es basiert auf dem leistungsstarken **i18next**-Ökosystem und bietet eine umfassende Lösung zur Verwaltung von Übersetzungen, Lokalisierung und Sprachwechsel in Next.js-Projekten.

Allerdings bringt next-i18next einige Herausforderungen mit sich:

- **Komplexe Konfiguration**: Die Einrichtung von next-i18next erfordert mehrere Konfigurationsdateien und eine sorgfältige Einrichtung der i18n-Instanzen auf Server- und Client-Seite.
- **Verteilte Übersetzungen**: Übersetzungsdateien werden typischerweise in separaten Verzeichnissen von den Komponenten gespeichert, was die Konsistenz erschwert.
- **Manuelle Namespace-Verwaltung**: Entwickler müssen Namespaces manuell verwalten und sicherstellen, dass die Übersetzungsressourcen korrekt geladen werden.
- **Begrenzte Typsicherheit**: TypeScript-Unterstützung erfordert zusätzliche Konfiguration und bietet keine automatische Typgenerierung für Übersetzungen.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in Next.js-Anwendungen.

Eine konkrete Gegenüberstellung mit next-intl finden Sie in unserem Blogbeitrag [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md).

## Warum Intlayer mit next-i18next kombinieren?

Während Intlayer eine ausgezeichnete eigenständige i18n-Lösung bietet (siehe unseren [Next.js-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)), möchten Sie es möglicherweise aus mehreren Gründen mit next-i18next kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte next-i18next-Implementierung und möchten schrittweise zur verbesserten Entwicklererfahrung von Intlayer migrieren.
2. **Legacy-Anforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden i18next-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit next-i18next vertraut, möchte aber ein besseres Content-Management.

**Dafür kann Intlayer als Adapter für next-i18next implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und mehr.**

Dieser Leitfaden zeigt Ihnen, wie Sie das überlegene Inhaltsdeklarationssystem von Intlayer nutzen können, während Sie die Kompatibilität mit next-i18next beibehalten.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer mit next-i18next

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Paket-Erklärungen:**

- **intlayer**: Kernbibliothek für Inhaltsdeklaration und -verwaltung
- **@intlayer/sync-json-plugin**: Plugin zum Synchronisieren von Intlayer-Inhaltsdeklarationen im i18next JSON-Format

### Schritt 2: Implementieren Sie das Intlayer-Plugin, um das JSON zu umschließen

Erstellen Sie eine Intlayer-Konfigurationsdatei, um Ihre unterstützten Sprachen zu definieren:

**Wenn Sie auch JSON-Wörterbücher für i18next exportieren möchten**, fügen Sie das `syncJSON`-Plugin hinzu:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
typescript fileName="intlayer.config.ts"
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin umschließt das JSON automatisch. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Inhaltsdeklarationsdateien (`.content` Dateien) koexistiert, geht Intlayer folgendermaßen vor:

    1. Lädt sowohl JSON- als auch Inhaltsdeklarationsdateien und transformiert sie in ein Intlayer-Wörterbuch.
    2. Wenn es Konflikte zwischen dem JSON und den Inhaltsdeklarationsdateien gibt, führt Intlayer eine Zusammenführung aller Wörterbücher durch. Dies hängt von der Priorität der Plugins und der der Inhaltsdeklarationsdatei ab (alle sind konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON vorgenommen werden oder das CMS verwendet wird, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Für weitere Details zum `syncJSON`-Plugin lesen Sie bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

---

### (Optional) Schritt 3: Implementierung von JSON-Übersetzungen pro Komponente

Standardmäßig lädt, verbindet und synchronisiert Intlayer sowohl JSON- als auch Inhaltsdeklarationsdateien. Weitere Informationen finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md). Wenn Sie jedoch möchten, können Sie mit einem Intlayer-Plugin auch eine Verwaltung von JSON-Übersetzungen pro Komponente implementieren, die überall in Ihrem Codebasis lokalisiert sind.

Dafür können Sie das `loadJSON`-Plugin verwenden.

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
      priority: 1, // Stellt sicher, dass diese JSON-Dateien Vorrang vor Dateien in `./public/locales/en/${key}.json` haben
    }),
    /**
     * Lädt die JSON-Dateien und schreibt die Ausgabe sowie Übersetzungen zurück in die JSON-Dateien im locales-Verzeichnis
     */
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Dies lädt alle JSON-Dateien im `src`-Verzeichnis, die dem Muster `{key}.i18n.json` entsprechen, und lädt sie als Intlayer-Wörterbücher.

---

## Git-Konfiguration

Schließen Sie generierte Dateien von der Versionskontrolle aus:

```plaintext fileName=".gitignore"
# Dateien ignorieren, die von Intlayer generiert werden
.intlayer
```

Diese Dateien werden während des Build-Prozesses automatisch neu generiert und müssen nicht in Ihr Repository eingecheckt werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
