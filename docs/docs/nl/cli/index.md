---
createdAt: 2024-08-11
updatedAt: 2026-09-12
priority: 8
title: CLI - Alle Intlayer CLI-commando's voor uw meertalige website
description: Ontdek hoe u de Intlayer CLI gebruikt om uw meertalige website te beheren. Volg de stappen in deze online documentatie om uw project in slechts enkele minuten op te zetten.
keywords:
  - CLI
  - Command Line Interface
  - Internationalisering
  - Documentatie
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "Het `ci`-commando vervangen door de `--ci`-vlag"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Scan commando toegevoegd"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Standalone commando toegevoegd"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI commando toegevoegd"
  - version: 7.5.11
    date: 2026-01-06
    changes: "List projects commando toegevoegd"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init commando toegevoegd"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Extract commando toegevoegd"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Optie skipIfExists toegevoegd aan translate commando"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Aliassen toegevoegd voor CLI-argumenten en -commando's"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Build-optie toegevoegd aan commando's"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Version commando toegevoegd"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Verbose optie standaard op true gezet via CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Watch commando en with optie toegevoegd"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Editor commando toegevoegd"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Content test en list commando's toegevoegd"
  - version: 5.5.11
    date: 2025-07-11
    changes: "CLI-commando parameter documentatie bijgewerkt"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geschiedenis geïnitialiseerd"
author: aymericzip
---

# Intlayer CLI - Alle Intlayer CLI-commando's voor uw meertalige website

## Inhoudsopgave

<TOC/>

## Pakket installeren

Installeer de benodigde pakketten met npm:

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

> Als het pakket `intlayer` al is geïnstalleerd, wordt de CLI automatisch mee geïnstalleerd. U kunt deze stap overslaan.

## pakket intlayer-cli

Het `intlayer-cli` pakket is bedoeld om uw [intlayer declaraties](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md) te transpileren naar woordenboeken.

Dit pakket transpileert alle intlayer bestanden, zoals `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Bekijk hoe u uw Intlayer declaratiebestanden declareert](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Om intlayer woordenboeken te interpreteren kunt u interpreters gebruiken, zoals [react-intlayer](https://www.npmjs.com/package/react-intlayer) of [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Ondersteuning configuratiebestanden

Intlayer accepteert meerdere formaten voor configuratiebestanden:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Om te zien hoe u beschikbare talen of andere parameters configureert, raadpleegt u de [configuratie-documentatie hier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md).

## Intlayer-commando's uitvoeren

### Authenticatie

- **[Inloggen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/login.md)** - Authenticeren bij het Intlayer CMS en inloggegevens verkrijgen

### Kerncommando's

- [Woordenboeken Bouwen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/build.md)
- [Woordenboeken Controleren (Watch)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/watch.md)
- [Standalone Bundel Maken](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/standalone.md)
- [CLI-versie Controleren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/version.md)
- [Projecten Schatten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/list_projects.md)

### Woordenboekbeheer

- [Woordenboeken Pushen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/push.md)
- [Woordenboeken Pulleren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/pull.md)
- [Woordenboeken Invullen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/fill.md)
- [Ontbrekende Vertalingen Testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/test.md)
- [Inhoudsdeclaratiebestanden Schatten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/list.md)

### Componentbeheer

- **[Strings Extraheren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/extract.md)** - Extraheer strings uit componenten naar een .content bestand in de buurt van de component

### Configuratie

- **[Intlayer Initialiseren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/init.md)** - Stel Intlayer in uw project in met automatische configuratie
- **[Configuratie Beheren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/configuration.md)** - Haal uw Intlayer-configuratie op en stuur deze naar het CMS

### Documentbeheer

- [Document Vertalen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/doc-translate.md)
- [Document Beoordelen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/doc-review.md)

### Editor & Live Sync

- [Editor-commando's](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/editor.md)
- [Live Sync-commando's](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/live.md)

### Audit & Diagnostiek

- **[Website Scannen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/scan.md)** - Meet de paginagrootte en controleer de i18n/SEO-status van elke openbare URL

### Ontwikkelingstools

- [CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/sdk.md)
- [Debug Intlayer-commando](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/debug.md)

## Gebruik intlayer commando's in uw `package.json`

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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Opmerking**: U kunt ook de kortere aliassen gebruiken:
>
> - `npx intlayer list` in plaats van `npx intlayer content list`
> - `npx intlayer test` in plaats van `npx intlayer content test`
> - `npx intlayer projects-list` of `npx intlayer pl` in plaats van `npx intlayer projects list`
