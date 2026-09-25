---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "Befehl upgrade hinzufügen"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Befehl init infra hinzufügen"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Befehl `ci` durch das Flag `--ci` ersetzt"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Befehl scan hinzugefügt"
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
author: aymericzip
---

# Intlayer CLI - Alle Intlayer-CLI-Befehle für Ihre mehrsprachige Website

## Inhaltsverzeichnis

<TOC/>

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

Dieses Paket transpiliert alle Intlayer-Dateien, wie z. B. `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Erfahren Sie, wie Sie Ihre Intlayer-Deklarationsdateien deklarieren](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/login" />
</TechGrid>

> `intlayer login` stellt einen **Zugangsschlüssel** (`clientId` / `clientSecret`) aus, den jeder authentifizierte Befehl verwendet. Das Geheimnis ist eine serverseitige Anmeldeinformation und gelangt niemals in Ihr Client-Bundle — siehe [Zugangsschlüssel sichern](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/login.md#zugangsschlüssel-sichern).

### Kernbefehle

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/list_projects" />
</TechGrid>

### Wörterbuchverwaltung

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/list" />
</TechGrid>

### Komponentenverwaltung

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract" />
</TechGrid>

### Konfiguration

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/configuration" />
</TechGrid>

### Dokumentationsverwaltung

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-review" />
</TechGrid>

### Editor & Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/live" />
</TechGrid>

### Auditierung & Diagnose

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/scan" />
</TechGrid>

### Entwicklungstools

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/debug" />
</TechGrid>

## Intlayer-Befehle in Ihrer `package.json` verwenden

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Hinweis**: Sie können auch die kürzeren Aliase verwenden:
>
> - `npx intlayer list` anstelle von `npx intlayer content list`
> - `npx intlayer test` anstelle von `npx intlayer content test`
> - `npx intlayer projects-list` oder `npx intlayer pl` anstelle von `npx intlayer projects list`
