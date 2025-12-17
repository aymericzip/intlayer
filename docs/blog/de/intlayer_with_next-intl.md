---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: So automatisieren Sie Ihre next-intl JSON-Übersetzungen mit Intlayer
description: Automatisieren Sie Ihre JSON-Übersetzungen mit Intlayer und next-intl für eine verbesserte Internationalisierung in Next.js-Anwendungen.
keywords:
  - Intlayer
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Hinzufügen des loadJSON-Plugins
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin
---

# So automatisieren Sie Ihre next-intl JSON-Übersetzungen mit Intlayer

<iframe title="So automatisieren Sie Ihre next-intl JSON-Übersetzungen mit Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in Next.js-Anwendungen.

Sehen Sie einen konkreten Vergleich mit next-intl in unserem Blogbeitrag [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

## Warum Intlayer mit next-intl kombinieren?

Während Intlayer eine hervorragende eigenständige i18n-Lösung bietet (siehe unseren [Next.js-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)), möchten Sie es möglicherweise aus mehreren Gründen mit next-intl kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte next-intl-Implementierung und möchten schrittweise zur verbesserten Entwicklererfahrung von Intlayer migrieren.
2. **Legacy-Anforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden next-intl-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit next-intl vertraut, möchte jedoch ein besseres Content-Management.

**Dafür kann Intlayer als Adapter für next-intl implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und mehr.**

Dieser Leitfaden zeigt Ihnen, wie Sie das überlegene Content-Deklarationssystem von Intlayer nutzen können, während die Kompatibilität mit next-intl erhalten bleibt.

## Inhaltsverzeichnis

<TOC/>

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer mit next-intl

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete:

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

**Paketbeschreibungen:**

- **intlayer**: Kernbibliothek für Internationalisierungsmanagement, Content-Deklaration und -Erstellung
- **@intlayer/sync-json-plugin**: Plugin zum Exportieren von Intlayer-Content-Deklarationen in ein mit next-intl kompatibles JSON-Format

### Schritt 2: Implementieren Sie das Intlayer-Plugin zum Verpacken des JSON

Erstellen Sie eine Intlayer-Konfigurationsdatei, um Ihre unterstützten Sprachen zu definieren:

**Wenn Sie auch JSON-Wörterbücher für next-intl exportieren möchten**, fügen Sie das `syncJSON`-Plugin hinzu:

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
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin verpackt das JSON automatisch. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Content-Deklarationsdateien (`.content`-Dateien) koexistiert, geht Intlayer folgendermaßen vor:

    1. Lädt sowohl JSON- als auch Content-Deklarationsdateien und transformiert sie in ein Intlayer-Wörterbuch.
    2. Wenn es Konflikte zwischen den JSON- und den Inhaltsdeklarationsdateien gibt, wird Intlayer alle Wörterbücher zusammenführen. Dies hängt von der Priorität der Plugins und der der Inhaltsdeklarationsdatei ab (alle sind konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON oder über das CMS vorgenommen werden, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Für weitere Details zum `syncJSON`-Plugin siehe bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

### (Optional) Schritt 3: Implementierung von JSON-Übersetzungen pro Komponente

Standardmäßig lädt, verbindet und synchronisiert Intlayer sowohl JSON- als auch Inhaltsdeklarationsdateien. Weitere Details finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md). Wenn Sie jedoch möchten, können Sie mit einem Intlayer-Plugin auch eine komponentenbezogene Verwaltung von JSON-Übersetzungen implementieren, die überall in Ihrem Codebasis lokalisiert sind.

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
      priority: 1, // Stellt sicher, dass diese JSON-Dateien Vorrang vor Dateien in `./locales/en/${key}.json` haben
    }),
    /**
     * Lädt und schreibt die Ausgabe sowie Übersetzungen zurück in die JSON-Dateien im locales-Verzeichnis
     */
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Dies lädt alle JSON-Dateien im Verzeichnis `src`, die dem Muster `{key}.i18n.json` entsprechen, und lädt sie als Intlayer-Wörterbücher.

## Git-Konfiguration

Es wird empfohlen, automatisch generierte Intlayer-Dateien zu ignorieren:

```plaintext fileName=".gitignore"
# Dateien ignorieren, die von Intlayer generiert werden
.intlayer
```

Diese Dateien können während Ihres Build-Prozesses neu generiert werden und müssen nicht in die Versionskontrolle übernommen werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
