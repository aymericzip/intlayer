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
  - Content Management
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin
---

# Wie Sie Ihre react-i18next JSON-Übersetzungen mit Intlayer automatisieren

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in React-Anwendungen.

Siehe einen konkreten Vergleich mit react-i18next in unserem Blogbeitrag [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/react-i18next_vs_react-intl_vs_intlayer.md).

## Warum Intlayer mit react-i18next kombinieren?

Während Intlayer eine hervorragende eigenständige i18n-Lösung bietet (siehe unseren [React-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)), möchten Sie es möglicherweise aus mehreren Gründen mit react-i18next kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte react-i18next-Implementierung und möchten schrittweise auf die verbesserte Entwicklererfahrung von Intlayer migrieren.
2. **Altsystem-Anforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden react-i18next-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit react-i18next vertraut, möchte jedoch ein besseres Content-Management.

**Dafür kann Intlayer als Adapter für react-i18next implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und mehr.**

Dieser Leitfaden zeigt Ihnen, wie Sie das überlegene Content-Deklarationssystem von Intlayer nutzen und gleichzeitig die Kompatibilität mit react-i18next beibehalten.

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

**Paketbeschreibungen:**

- **intlayer**: Kernbibliothek für Internationalisierungsmanagement, Content-Deklaration und Build-Prozesse
- **@intlayer/sync-json-plugin**: Plugin zum Exportieren von Intlayer-Content-Deklarationen in ein mit react-i18next kompatibles JSON-Format

### Schritt 2: Implementieren Sie das Intlayer-Plugin zum Verpacken des JSON

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin umschließt das JSON automatisch. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Content-Deklarationsdateien (`.content`-Dateien) koexistiert, geht Intlayer folgendermaßen vor:

    1. Lade sowohl JSON- als auch Inhaltsdeklarationsdateien und transformiere sie in ein Intlayer-Wörterbuch.
    2. Wenn es Konflikte zwischen den JSON- und den Inhaltsdeklarationsdateien gibt, wird Intlayer alle Wörterbücher zusammenführen. Dies hängt von der Priorität der Plugins und der Inhaltsdeklarationsdatei ab (alle sind konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung des JSON vorgenommen werden oder das CMS verwendet wird, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

Für weitere Details zum `syncJSON`-Plugin siehe bitte die [syncJSON Plugin-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/plugins/sync-json.md).

## Git-Konfiguration

Es wird empfohlen, automatisch generierte Intlayer-Dateien zu ignorieren:

```plaintext fileName=".gitignore"
# Ignoriere automatisch generierte Intlayer-Dateien
.intlayer
```

Diese Dateien können während Ihres Build-Prozesses neu generiert werden und müssen nicht in die Versionskontrolle übernommen werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
