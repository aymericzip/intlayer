---
createdAt: 2024-08-11
updatedAt: 2026-03-31
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
---

# Intlayer CLI - Alle Intlayer CLI-commando's voor uw meertalige website

---

## Inhoudsopgave

<TOC/>

---

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

Dit pakket transpileert alle intlayer bestanden, zoals `src/**/*.content.{ts|js|mjs|cjs|json}`. [Bekijk hoe u uw Intlayer declaratiebestanden declareert](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

- **[Inloggen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/login.md)** - Authenticeren bij het Intlayer CMS en inloggegevens verkrijgen

### Kerncommando's

- **[Woordenboeken Bouwen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/build.md)** - Bouw uw woordenboeken vanuit inhoudsdeclaratiebestanden
- **[Woordenboeken Controleren (Watch)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/watch.md)** - Controleer op wijzigingen en bouw woordenboeken automatisch opnieuw
- **[Standalone Bundel Maken](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/standalone.md)** - Maak een zelfstandige JavaScript-bundel met Intlayer en gespecificeerde pakketten
- **[CLI-versie Controleren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/version.md)** - Controleer de geïnstalleerde Intlayer CLI-versie
- **[Projecten Schatten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/list_projects.md)** - Lijst van alle Intlayer-projecten in een map of git-repository

### Woordenboekbeheer

- **[Woordenboeken Pushen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/push.md)** - Stuur woordenboeken naar de Intlayer-editor en het CMS
- **[Woordenboeken Pulleren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/pull.md)** - Haal woordenboeken op uit de Intlayer-editor en het CMS
- **[Woordenboeken Invullen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/fill.md)** - Woordenboeken invullen, auditen en vertalen met behulp van AI
- **[Ontbrekende Vertalingen Testen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/test.md)** - Ontbrekende vertalingen testen en identificeren
- **[Inhoudsdeclaratiebestanden Schatten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/list.md)** - Lijst van alle inhoudsdeclaratiebestanden in uw project

### Componentbeheer

- **[Strings Extraheren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/extract.md)** - Extraheer strings uit componenten naar een .content bestand in de buurt van de component

### Configuratie

- **[Intlayer Initialiseren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/init.md)** - Stel Intlayer in uw project in met automatische configuratie
- **[Configuratie Beheren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/configuration.md)** - Haal uw Intlayer-configuratie op en stuur deze naar het CMS

### Documentbeheer

- **[Document Vertalen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/doc-translate.md)** - Vertaal documentatiebestanden automatisch met behulp van AI
- **[Document Beoordelen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/doc-review.md)** - Bekijk documentatiebestanden voor kwaliteit en consistentie

### Editor & Live Sync

- **[Editor-commando's](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/editor.md)** - Gebruik de Intlayer editor-commando's
- **[Live Sync-commando's](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/live.md)** - Gebruik Live Sync om inhoudswijzigingen vanuit het CMS tijdens runtime toe te passen

### CI/CD & Automatisering

- **[CI-commando](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/ci.md)** - Voer Intlayer-commando's uit met automatisch geïnjecteerde inloggegevens voor CI/CD-pipelines

### Ontwikkelingstools

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/sdk.md)** - Gebruik de Intlayer CLI SDK in uw eigen code
- **[Debug Intlayer-commando](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/debug.md)** - Debug en los problemen met de Intlayer CLI op

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
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Opmerking**: U kunt ook de kortere aliassen gebruiken:
>
> - `npx intlayer list` in plaats van `npx intlayer content list`
> - `npx intlayer test` in plaats van `npx intlayer content test`
> - `npx intlayer projects-list` of `npx intlayer pl` in plaats van `npx intlayer projects list`
