---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Wie Sie Ihre react-i18next JSON-Übersetzungen mit Intlayer automatisieren
description: Automatisieren Sie Ihre JSON-Übersetzungen mit Intlayer und react-i18next für eine verbesserte Internationalisierung in React-Anwendungen.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internationalisierung
  - i18n
  - Blog
  - React
  - JavaScript
  - TypeScript
  - Inhaltsverwaltung
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: LoadJSON-Plugin hinzugefügt
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin
---

# Wie Sie Ihre react-i18next JSON-Übersetzungen mit Intlayer automatisieren

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für die Inhaltsverwaltung in React-Anwendungen.

Siehe einen konkreten Vergleich mit react-i18next in unserem Blogbeitrag [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md).

## Warum Intlayer mit react-i18next kombinieren?

Während Intlayer eine ausgezeichnete eigenständige i18n-Lösung bietet (siehe unseren [React-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)), möchten Sie es möglicherweise aus mehreren Gründen mit react-i18next kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte react-i18next-Implementierung und möchten schrittweise auf die verbesserte Entwicklererfahrung von Intlayer migrieren.
2. **Altsystemanforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden react-i18next-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit react-i18next vertraut, möchte jedoch eine bessere Inhaltsverwaltung.
4. **Verwendung von Intlayer-Funktionen**: Sie möchten Intlayer-Funktionen wie Inhaltsdeklaration, Übersetzungsautomatisierung, Testen von Übersetzungen und mehr nutzen.

**Dafür kann Intlayer als Adapter für react-i18next implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und mehr.**

Diese Anleitung zeigt Ihnen, wie Sie das überlegene Inhaltsdeklarationssystem von Intlayer nutzen können, während Sie die Kompatibilität mit react-i18next beibehalten.

## Inhaltsverzeichnis

<TOC/>

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer mit react-i18next

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
- **@intlayer/sync-json-plugin**: Plugin zum Exportieren von Intlayer-Inhaltsdeklarationen in ein mit react-i18next kompatibles JSON-Format

### Schritt 2: Implementieren Sie das Intlayer-Plugin, um das JSON zu umschließen

Erstellen Sie eine Intlayer-Konfigurationsdatei, um Ihre unterstützten Sprachen zu definieren:

**Wenn Sie auch JSON-Wörterbücher für react-i18next exportieren möchten**, fügen Sie das `syncJSON`-Plugin hinzu:

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin umschließt das JSON automatisch. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Inhaltsdeklarationsdateien (`.content`-Dateien) koexistiert, geht Intlayer folgendermaßen vor:

    1. Lädt sowohl JSON- als auch Inhaltsdeklarationsdateien und transformiert sie in ein Intlayer-Wörterbuch.
    2. Wenn es Konflikte zwischen dem JSON und den Inhaltsdeklarationsdateien gibt, führt Intlayer eine Zusammenführung aller Wörterbücher durch. Dies hängt von der Priorität der Plugins und der der Inhaltsdeklarationsdatei ab (alle sind konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON oder über das CMS vorgenommen werden, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Um weitere Details zum `syncJSON`-Plugin zu erfahren, lesen Sie bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

### (Optional) Schritt 3: Implementierung von JSON-Übersetzungen pro Komponente

Standardmäßig lädt, kombiniert und synchronisiert Intlayer sowohl JSON- als auch Inhaltsdeklarationsdateien. Weitere Informationen finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md). Wenn Sie jedoch möchten, können Sie mit einem Intlayer-Plugin auch eine Verwaltung von JSON-Übersetzungen pro Komponente implementieren, die überall in Ihrem Codebasis lokalisiert sind.

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
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
# Ignoriere von Intlayer generierte Dateien
.intlayer
```

Diese Dateien können während Ihres Build-Prozesses neu generiert werden und müssen nicht in die Versionskontrolle aufgenommen werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
