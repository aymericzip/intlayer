---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Wie Sie Ihre react-intl JSON-Übersetzungen mit Intlayer automatisieren
description: Automatisieren Sie Ihre JSON-Übersetzungen mit Intlayer und react-intl für verbesserte Internationalisierung in React-Anwendungen.
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
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin
---

# Wie Sie Ihre react-intl JSON-Übersetzungen mit Intlayer automatisieren

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in React-Anwendungen.

Sehen Sie einen konkreten Vergleich mit react-intl in unserem Blogbeitrag [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md).

## Warum Intlayer mit react-intl kombinieren?

Während Intlayer eine hervorragende eigenständige i18n-Lösung bietet (siehe unseren [React-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)), möchten Sie es möglicherweise aus mehreren Gründen mit react-intl kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte react-intl-Implementierung und möchten schrittweise auf die verbesserte Entwicklererfahrung von Intlayer umsteigen.
2. **Altsystemanforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden react-intl-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit react-intl vertraut, möchte aber ein besseres Content-Management.

**Dafür kann Intlayer als Adapter für react-intl implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und mehr.**

Dieser Leitfaden zeigt Ihnen, wie Sie das überlegene Content-Deklarationssystem von Intlayer nutzen können, während Sie die Kompatibilität mit react-intl beibehalten.

## Inhaltsverzeichnis

<TOC/>

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

**Paketbeschreibungen:**

- **intlayer**: Kernbibliothek für Internationalisierungsmanagement, Content-Deklaration und Build-Prozesse
- **@intlayer/sync-json-plugin**: Plugin zum Exportieren von Intlayer-Content-Deklarationen in ein mit react-intl kompatibles JSON-Format

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin umschließt das JSON automatisch. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Content-Deklarationsdateien (`.content`-Dateien) koexistiert, geht Intlayer folgendermaßen vor:

    1. Lädt sowohl JSON- als auch Content-Deklarationsdateien und transformiert sie in ein Intlayer-Wörterbuch.

2. Wenn es Konflikte zwischen den JSON- und den Inhaltsdeklarationsdateien gibt, wird Intlayer alle Wörterbücher zusammenführen. Dies geschieht abhängig von der Priorität der Plugins und der der Inhaltsdeklarationsdatei (alle sind konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON oder über das CMS vorgenommen werden, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Für weitere Details zum `syncJSON`-Plugin siehe bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

## Git-Konfiguration

Es wird empfohlen, automatisch generierte Intlayer-Dateien zu ignorieren:

```plaintext fileName=".gitignore"
# Dateien, die von Intlayer generiert werden, ignorieren
.intlayer
```

Diese Dateien können während Ihres Build-Prozesses neu generiert werden und müssen nicht in die Versionskontrolle übernommen werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
