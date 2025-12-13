---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer und vue-i18n
description: Integration von Intlayer mit vue-i18n für eine umfassende Internationalisierungslösung in Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisierung
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Hinzufügen des loadJSON-Plugins
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin und umfassende Überarbeitung
---

# Vue.js Internationalisierung (i18n) mit vue-i18n und Intlayer

<iframe title="Wie Sie Ihre vue-i18n JSON-Übersetzungen mit Intlayer automatisieren" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in Vue.js- und Nuxt-Anwendungen.

Siehe einen konkreten Vergleich mit vue-i18n in unserem Blogbeitrag [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer.md).

## Warum Intlayer mit vue-i18n kombinieren?

Während Intlayer eine hervorragende eigenständige i18n-Lösung bietet (siehe unseren [Vue.js-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md)), möchten Sie es möglicherweise aus mehreren Gründen mit vue-i18n kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte vue-i18n-Implementierung und möchten schrittweise auf die verbesserte Entwicklererfahrung von Intlayer migrieren.
2. **Legacy-Anforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden vue-i18n-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit vue-i18n vertraut, möchte jedoch ein besseres Content-Management.
4. **Verwendung von Intlayer-Funktionen**: Sie möchten Intlayer-Funktionen wie Content-Deklaration, Übersetzungsautomatisierung, Testen von Übersetzungen und mehr nutzen.

**Dafür kann Intlayer als Adapter für vue-i18n implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und vieles mehr.**

Diese Anleitung zeigt Ihnen, wie Sie das überlegene Content-Deklarationssystem von Intlayer nutzen können, während Sie die Kompatibilität mit vue-i18n beibehalten.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer mit vue-i18n

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

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

- **intlayer**: Kernbibliothek für Content-Deklaration und -Verwaltung
- **@intlayer/sync-json-plugin**: Plugin zum Synchronisieren von Intlayer-Content-Deklarationen mit dem vue-i18n JSON-Format

### Schritt 2: Implementieren Sie das Intlayer-Plugin, um das JSON zu umschließen

Erstellen Sie eine Intlayer-Konfigurationsdatei, um Ihre unterstützten Sprachen festzulegen:

**Wenn Sie auch JSON-Wörterbücher für vue-i18n exportieren möchten**, fügen Sie das `syncJSON`-Plugin hinzu:

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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin umschließt das JSON automatisch. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Content-Deklarationsdateien (`.content`-Dateien) koexistiert, geht Intlayer folgendermaßen vor:

    1. Lädt sowohl JSON- als auch Content-Deklarationsdateien und transformiert sie in ein Intlayer-Wörterbuch.
    2. Wenn es Konflikte zwischen dem JSON und den Content-Deklarationsdateien gibt, führt Intlayer eine Zusammenführung aller Wörterbücher durch. Dies hängt von der Priorität der Plugins und der Content-Deklarationsdatei ab (alle sind konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON vorgenommen werden oder über das CMS, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Um weitere Details zum `syncJSON`-Plugin zu sehen, lesen Sie bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

---

### (Optional) Schritt 3: Implementierung von komponentenbezogenen JSON-Übersetzungen

Standardmäßig lädt, kombiniert und synchronisiert Intlayer sowohl JSON- als auch Content-Deklarationsdateien. Weitere Informationen finden Sie in der [Content-Deklarationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md). Wenn Sie jedoch möchten, können Sie mit einem Intlayer-Plugin auch eine komponentenbezogene Verwaltung von JSON implementieren, das überall in Ihrem Code lokalisiert ist.

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
     * Lädt und schreibt die Ausgabe und Übersetzungen zurück in die JSON-Dateien im locales-Verzeichnis
     */
    syncJSON({
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
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
# Ignoriere von Intlayer generierte Dateien
.intlayer
```

Diese Dateien werden während des Build-Prozesses automatisch neu generiert und müssen nicht in Ihr Repository übernommen werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
