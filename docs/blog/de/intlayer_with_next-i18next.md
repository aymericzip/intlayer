---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer und next-i18next
description: Integration von Intlayer mit next-i18next für eine umfassende Internationalisierungslösung in Next.js
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
  - version: 7.0.0
    date: 2025-10-29
    changes: Wechsel zum syncJSON-Plugin und umfassende Überarbeitung
---

# Next.js Internationalisierung (i18n) mit next-i18next und Intlayer

## Inhaltsverzeichnis

<TOC/>

## Was ist next-i18next?

**next-i18next** ist eines der beliebtesten Internationalisierungs- (i18n) Frameworks für Next.js-Anwendungen. Es basiert auf dem leistungsstarken **i18next**-Ökosystem und bietet eine umfassende Lösung zur Verwaltung von Übersetzungen, Lokalisierung und Sprachwechsel in Next.js-Projekten.

Allerdings bringt next-i18next einige Herausforderungen mit sich:

- **Komplexe Konfiguration**: Die Einrichtung von next-i18next erfordert mehrere Konfigurationsdateien und eine sorgfältige Einrichtung der i18n-Instanzen auf Server- und Client-Seite.
- **Verstreute Übersetzungen**: Übersetzungsdateien werden typischerweise in separaten Verzeichnissen von den Komponenten gespeichert, was die Konsistenz erschwert.
- **Manuelle Namespace-Verwaltung**: Entwickler müssen Namespaces manuell verwalten und sicherstellen, dass die Übersetzungsressourcen korrekt geladen werden.
- **Begrenzte Typsicherheit**: Die TypeScript-Unterstützung erfordert zusätzliche Konfiguration und bietet keine automatische Typgenerierung für Übersetzungen.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek, die entwickelt wurde, um die Schwächen traditioneller i18n-Lösungen zu beheben. Sie bietet einen modernen Ansatz für das Content-Management in Next.js-Anwendungen.

Eine konkrete Gegenüberstellung mit next-intl finden Sie in unserem Blogbeitrag [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md).

## Warum Intlayer mit next-i18next kombinieren?

Während Intlayer eine ausgezeichnete eigenständige i18n-Lösung bietet (siehe unseren [Next.js-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)), möchten Sie es möglicherweise aus mehreren Gründen mit next-i18next kombinieren:

1. **Bestehender Codebestand**: Sie haben eine etablierte next-i18next-Implementierung und möchten schrittweise zur verbesserten Entwicklererfahrung von Intlayer migrieren.
2. **Altsystemanforderungen**: Ihr Projekt erfordert Kompatibilität mit bestehenden i18next-Plugins oder Workflows.
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

**Paket-Erklärungen:**

- **intlayer**: Kernbibliothek für Inhaltsdeklaration und -verwaltung
- **next-intlayer**: Next.js-Integrationsschicht mit Build-Plugins
- **i18next**: Kern-i18n-Framework
- **next-i18next**: Next.js-Wrapper für i18next
- **i18next-resources-to-backend**: Dynamisches Ressourcenladen für i18next
- **@intlayer/sync-json-plugin**: Plugin zum Synchronisieren von Intlayer-Inhaltsdeklarationen im i18next JSON-Format

### Schritt 2: Implementieren Sie das Intlayer-Plugin zum Verpacken des JSON

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Das `syncJSON`-Plugin wird das JSON automatisch umschließen. Es liest und schreibt die JSON-Dateien, ohne die Inhaltsarchitektur zu verändern.

Wenn Sie möchten, dass dieses JSON zusammen mit Intlayer-Inhaltsdeklarationsdateien (`.content`-Dateien) koexistiert, wird Intlayer folgendermaßen vorgehen:

    1. Lädt sowohl JSON- als auch Inhaltsdeklarationsdateien und transformiert sie in ein Intlayer-Wörterbuch.
    2. Wenn es Konflikte zwischen den JSON- und den Inhaltsdeklarationsdateien gibt, wird Intlayer alle Wörterbücher zusammenführen. Dies geschieht abhängig von der Priorität der Plugins und der der Inhaltsdeklarationsdatei (alle sind konfigurierbar).

Wenn Änderungen über die CLI zur Übersetzung der JSON-Dateien oder über das CMS vorgenommen werden, aktualisiert Intlayer die JSON-Datei mit den neuen Übersetzungen.

---

## Git-Konfiguration

Schließen Sie generierte Dateien von der Versionskontrolle aus:

```plaintext fileName=".gitignore"
# Ignoriere von Intlayer generierte Dateien
.intlayer
intl
```

Diese Dateien werden während des Build-Prozesses automatisch neu generiert und müssen nicht in Ihr Repository eingecheckt werden.

### VS Code Erweiterung

Für eine verbesserte Entwicklererfahrung installieren Sie die offizielle **Intlayer VS Code Erweiterung**:

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
