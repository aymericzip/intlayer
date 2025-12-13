---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Wie Sie Ihre react-intl JSON-Übersetzungen mit Intlayer automatisieren
description: Automatisieren Sie Ihre JSON-Übersetzungen mit Intlayer und react-intl für eine verbesserte Internationalisierung in React-Anwendungen.
keywords:
  - react-intl
  - Intlayer
  - Internationalisierung
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: LoadJSON-Plugin hinzugefügt
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin
---

# Wie Sie Ihre react-intl JSON-Übersetzungen mit Intlayer automatisieren

<iframe title="Wie Sie Ihre react-intl JSON-Übersetzungen mit Intlayer automatisieren" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in React-Anwendungen.

Sehen Sie einen konkreten Vergleich mit react-intl in unserem Blogbeitrag [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md).

## Warum Intlayer mit react-intl kombinieren?

Während Intlayer eine hervorragende eigenständige i18n-Lösung bietet (siehe unseren [React-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)), möchten Sie es aus mehreren Gründen möglicherweise mit react-intl kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte react-intl-Implementierung und möchten schrittweise auf die verbesserte Entwicklererfahrung von Intlayer migrieren.
2. **Altsystemanforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden react-intl-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit react-intl vertraut, möchte aber ein besseres Content-Management.
4. **Verwendung von Intlayer-Funktionen**: Sie möchten Intlayer-Funktionen wie Inhaltsdeklaration, Übersetzungsautomatisierung, Testen von Übersetzungen und mehr nutzen.

**Dafür kann Intlayer als Adapter für react-intl implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und vieles mehr.**

Diese Anleitung zeigt Ihnen, wie Sie das überlegene Inhaltsdeklarationssystem von Intlayer nutzen können und gleichzeitig die Kompatibilität mit react-intl beibehalten.

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer mit react-intl

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

- **intlayer**: Kernbibliothek für Internationalisierungsmanagement, Inhaltsdeklaration und Build
- **@intlayer/sync-json-plugin**: Plugin zum Exportieren von Intlayer-Inhaltsdeklarationen in ein mit react-intl kompatibles JSON-Format

### Schritt 2: Implementieren Sie das Intlayer-Plugin zum Verpacken des JSON

Erstellen Sie eine Intlayer-Konfigurationsdatei, um Ihre unterstützten Sprachen zu definieren:

**Wenn Sie auch JSON-Wörterbücher für react-intl exportieren möchten**, fügen Sie das `syncJSON`-Plugin hinzu:

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin wird das JSON automatisch verpacken. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Inhaltsdeklarationsdateien (`.content`-Dateien) koexistiert, geht Intlayer folgendermaßen vor:

    1. Lädt sowohl JSON- als auch Inhaltsdeklarationsdateien und transformiert sie in ein Intlayer-Wörterbuch.
    2. Wenn es Konflikte zwischen dem JSON und den Inhaltsdeklarationsdateien gibt, führt Intlayer eine Zusammenführung aller Wörterbücher durch. Dies hängt von der Priorität der Plugins und der der Inhaltsdeklarationsdatei ab (alles ist konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON vorgenommen werden oder das CMS verwendet wird, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Um weitere Details zum `syncJSON`-Plugin zu erfahren, lesen Sie bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

### (Optional) Schritt 3: Implementierung von JSON-Übersetzungen pro Komponente

Standardmäßig lädt, kombiniert und synchronisiert Intlayer sowohl JSON- als auch Inhaltsdeklarationsdateien. Weitere Informationen finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md). Wenn Sie jedoch möchten, können Sie mit einem Intlayer-Plugin auch eine Verwaltung von JSON-Übersetzungen pro Komponente implementieren, die überall in Ihrem Code lokalisiert sind.

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

Dies lädt alle JSON-Dateien im `src`-Verzeichnis, die dem Muster `{key}.i18n.json` entsprechen, und lädt sie als Intlayer-Wörterbücher.

## Git-Konfiguration

Es wird empfohlen, automatisch generierte Intlayer-Dateien zu ignorieren:

```plaintext fileName=".gitignore"
# Dateien, die von Intlayer generiert werden, ignorieren
.intlayer
```

Diese Dateien können während Ihres Build-Prozesses neu generiert werden und müssen nicht in die Versionskontrolle aufgenommen werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
