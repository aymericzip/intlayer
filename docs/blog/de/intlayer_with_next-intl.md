---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Wie Sie Ihre next-intl JSON-Übersetzungen mit Intlayer automatisieren
description: Automatisieren Sie Ihre JSON-Übersetzungen mit Intlayer und next-intl für eine verbesserte Internationalisierung in Next.js-Anwendungen.
slugs:
  - blog
  - intlayer-with-next-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin
---

# Wie Sie Ihre next-intl JSON-Übersetzungen mit Intlayer automatisieren

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in Next.js-Anwendungen.

Sehen Sie einen konkreten Vergleich mit next-intl in unserem Blogbeitrag [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

## Warum Intlayer mit next-intl kombinieren?

Während Intlayer eine ausgezeichnete eigenständige i18n-Lösung bietet (siehe unseren [Next.js-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)), möchten Sie es möglicherweise aus mehreren Gründen mit next-intl kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte next-intl-Implementierung und möchten schrittweise zur verbesserten Entwicklererfahrung von Intlayer migrieren.
2. **Altsystemanforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden next-intl-Plugins oder Workflows.
3. **Teamvertrautheit**: Ihr Team ist mit next-intl vertraut, möchte aber ein besseres Content-Management.

**Dafür kann Intlayer als Adapter für next-intl implementiert werden, um Ihre JSON-Übersetzungen in CLI- oder CI/CD-Pipelines zu automatisieren, Ihre Übersetzungen zu testen und mehr.**

Dieser Leitfaden zeigt Ihnen, wie Sie das überlegene Content-Deklarationssystem von Intlayer nutzen und gleichzeitig die Kompatibilität mit next-intl beibehalten.

## Inhaltsverzeichnis

<TOC/>

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer mit next-intl

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete:

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
- **@intlayer/sync-json-plugin**: Plugin zum Exportieren von Intlayer-Content-Deklarationen in ein next-intl-kompatibles JSON-Format

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

Wenn Änderungen über die CLI zur Übersetzung des JSON vorgenommen werden oder das CMS verwendet wird, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

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
