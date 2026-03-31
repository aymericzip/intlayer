---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - Alle Intlayer-CLI-Befehle für Ihre mehrsprachige Website
description: Erfahren Sie, wie Sie das Intlayer-CLI zur Verwaltung Ihrer mehrsprachigen Website verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - CLI
  - Command Line Interface
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Standalone-Befehl hinzugefügt"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI-Befehl hinzugefügt"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Befehl zur Projektliste hinzugefügt"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Befehl init hinzugefügt"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Befehl extract hinzugefügt"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Option skipIfExists zum translate-Befehl hinzugefügt"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Aliase für CLI-Argumente und -Befehle hinzugefügt"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Build-Option zu Befehlen hinzugefügt"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Version-Befehl hinzugefügt"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Verbose-Option standardmäßig auf wahr gesetzt via CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Watch-Befehl und with-Option hinzugefügt"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Editor-Befehl hinzugefügt"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Befehle content test und list hinzugefügt"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Dokumentation der CLI-Befehlsparameter aktualisiert"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Verlauf initialisiert"
---

# Intlayer CLI - Alle Intlayer-CLI-Befehle für Ihre mehrsprachige Website

---

## Inhaltsverzeichnis

<TOC/>

---

## Paket installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Wenn das Paket `intlayer` bereits installiert ist, wird das CLI automatisch mitinstalliert. Sie können diesen Schritt überspringen.

## Paket intlayer-cli

Das Paket `intlayer-cli` dient dazu, Ihre [Intlayer-Deklarationen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md) in Wörterbücher zu transpilieren.

Dieses Paket transpiliert alle Intlayer-Dateien, wie z. B. `src/**/*.content.{ts|js|mjs|cjs|json}`. [Erfahren Sie, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Um Intlayer-Wörterbücher zu interpretieren, können Sie Interpreter wie [react-intlayer](https://www.npmjs.com/package/react-intlayer) oder [next-intlayer](https://www.npmjs.com/package/next-intlayer) verwenden.

## Unterstützung von Konfigurationsdateien

Intlayer akzeptiert verschiedene Formate für Konfigurationsdateien:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Um zu erfahren, wie Sie verfügbare Sprachen oder andere Parameter konfigurieren, lesen Sie die [Konfigurationsdokumentation hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Intlayer-Befehle ausführen

### Authentifizierung

- **[Anmelden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/login.md)** - Bei Intlayer CMS authentifizieren und Zugangsdaten erhalten

### Kernbefehle

- **[Wörterbücher erstellen (Build)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/build.md)** - Erstellen Sie Ihre Wörterbücher aus Inhaltsdeklarationsdateien
- **[Wörterbücher überwachen (Watch)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/watch.md)** - Änderungen überwachen und Wörterbücher automatisch erstellen
- **[Standalone-Bundle erstellen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/standalone.md)** - Erstellen Sie ein eigenständiges JavaScript-Bundle, das Intlayer und angegebene Pakete enthält
- **[CLI-Version prüfen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/version.md)** - Installierte Intlayer-CLI-Version prüfen
- **[Projekte auflisten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/list_projects.md)** - Listen Sie alle Intlayer-Projekte in einem Verzeichnis oder Git-Repository auf

### Wörterbuchverwaltung

- **[Wörterbücher pushen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/push.md)** - Wörterbücher an den Intlayer-Editor und das CMS senden
- **[Wörterbücher pullen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/pull.md)** - Wörterbücher vom Intlayer-Editor und dem CMS abrufen
- **[Wörterbücher ausfüllen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md)** - Wörterbücher mithilfe von KI ausfüllen, prüfen und übersetzen
- **[Fehlende Übersetzungen testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/test.md)** - Fehlende Übersetzungen testen und identifizieren
- **[Inhaltsdeklarationsdateien auflisten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/list.md)** - Listen Sie alle Inhaltsdeklarationsdateien in Ihrem Projekt auf

### Komponentenverwaltung

- **[Strings extrahieren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md)** - Extrahieren Sie Strings aus Komponenten in eine .content-Datei in der Nähe der Komponente

### Konfiguration

- **[Intlayer initialisieren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/init.md)** - Richten Sie Intlayer in Ihrem Projekt mit automatischer Konfiguration ein
- **[Konfiguration verwalten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/configuration.md)** - Rufen Sie Ihre Intlayer-Konfiguration ab und senden Sie sie an das CMS

### Dokumentationsverwaltung

- **[Dokument übersetzen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-translate.md)** - Dokumentationsdateien automatisch mithilfe von KI übersetzen
- **[Dokument überprüfen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-review.md)** - Dokumentationsdateien auf Qualität und Konsistenz überprüfen

### Editor & Live Sync

- **[Editor-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/editor.md)** - Verwenden Sie die Befehle des Intlayer-Editors
- **[Live Sync-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live.md)** - Verwenden Sie Live Sync, um Inhaltsänderungen aus dem CMS zur Laufzeit zu übernehmen

### CI/CD & Automatisierung

- **[CI-Befehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/ci.md)** - Führen Sie Intlayer-Befehle mit automatisch eingefügten Zugangsdaten für CI/CD-Pipelines aus

### Entwicklungstools

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/sdk.md)** - Verwenden Sie das Intlayer-CLI-SDK in Ihrem eigenen Code
- **[Intlayer-Befehl debuggen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/debug.md)** - Debugging und Fehlerbehebung bei Intlayer-CLI-Problemen

## Intlayer-Befehle in Ihrer `package.json` verwenden

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Hinweis**: Sie können auch die kürzeren Aliase verwenden:
>
> - `npx intlayer list` anstelle von `npx intlayer content list`
> - `npx intlayer test` anstelle von `npx intlayer content test`
> - `npx intlayer projects-list` oder `npx intlayer pl` anstelle von `npx intlayer projects list`
