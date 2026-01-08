---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: Wie Sie Ihre i18next JSON-Übersetzungen mit Intlayer automatisieren
description: Automatisieren Sie Ihre JSON-Übersetzungen mit Intlayer und i18next für eine verbesserte Internationalisierung in JavaScript-Anwendungen.
keywords:
  - Intlayer
  - i18next
  - Internationalisierung
  - i18n
  - Lokalisierung
  - Übersetzung
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Migration
  - Integration
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Hinzufügen des loadJSON-Plugins
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin
---

# Wie Sie Ihre i18next JSON-Übersetzungen mit Intlayer automatisieren

<iframe title="Wie Sie Ihre i18next JSON-Übersetzungen mit Intlayer automatisieren" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in JavaScript-Anwendungen.

Siehe einen konkreten Vergleich mit i18next in unserem Blogbeitrag [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

## Warum Intlayer mit i18next kombinieren?

Während Intlayer eine hervorragende eigenständige i18n-Lösung bietet (siehe unseren [Next.js-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)), möchten Sie es aus mehreren Gründen möglicherweise mit i18next kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte i18next-Implementierung und möchten schrittweise auf die verbesserte Entwicklererfahrung von Intlayer migrieren.
2. **Legacy-Anforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden i18next-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit i18next vertraut, möchte aber ein besseres Content-Management.
4. **Verwendung von Intlayer-Funktionen**: Sie möchten Intlayer-Funktionen wie Inhaltsdeklaration, Verwaltung von Übersetzungsschlüsseln, Übersetzungsstatus und mehr nutzen.

**Dafür kann Intlayer als Adapter für i18next implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und vieles mehr.**

Diese Anleitung zeigt Ihnen, wie Sie das überlegene Inhaltsdeklarationssystem von Intlayer nutzen können und gleichzeitig die Kompatibilität mit i18next beibehalten.

## Inhaltsverzeichnis

<TOC/>

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer mit i18next

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Paketbeschreibungen:**

- **intlayer**: Kernbibliothek für Internationalisierungsmanagement, Inhaltsdeklaration und Build
- **@intlayer/sync-json-plugin**: Plugin zum Exportieren von Intlayer-Inhaltsdeklarationen in ein mit i18next kompatibles JSON-Format

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin wird das JSON automatisch umschließen. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON neben den Intlayer-Inhaltsdeklarationsdateien (`.content`-Dateien) koexistiert, wird Intlayer folgendermaßen vorgehen:

    1. Sowohl JSON- als auch Inhaltsdeklarationsdateien laden und in ein Intlayer-Wörterbuch umwandeln.
    2. Wenn es Konflikte zwischen dem JSON und den Inhaltsdeklarationsdateien gibt, wird Intlayer alle Wörterbücher zusammenführen. Dies hängt von der Priorität der Plugins und der der Inhaltsdeklarationsdatei ab (alles ist konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON vorgenommen werden oder das CMS verwendet wird, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Um weitere Details zum `syncJSON`-Plugin zu erfahren, lesen Sie bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

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
