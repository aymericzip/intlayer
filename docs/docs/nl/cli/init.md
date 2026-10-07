---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: Initialiseer Intlayer
description: Leer hoe u Intlayer in uw project kunt initialiseren.
keywords:
  - Initialiseren
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init installeert alleen de pakketten en richt het framework in; één subcommando per stap; --interactive faalt zonder terminal"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Optie --no-gitignore toegevoegd"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Commando init toegevoegd"
author: aymericzip
---

# Initialiseer Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Het commando `init` installeert de Intlayer-pakketten en richt je framework in (configuratiebestand, TypeScript, bundler-plugin, middleware/proxy, providers). Dit is de aanbevolen manier om met Intlayer te beginnen.

Al het andere (CI-workflows, AI-skills, MCP-server, editor-tools, lint-regels, CMS, infrastructuur) is optioneel: kies het in de `--interactive`-checklist of voer het bijbehorende subcommando uit (zie hieronder).

## Aliassen:

- `npx intlayer init`

## Argumenten:

- `--project-root [projectRoot]` - Optioneel. Specificeer de hoofdmap van het project. Indien niet opgegeven, zoekt het commando naar de projectmap vanaf de huidige werkmap.
- `--no-gitignore` - Optioneel. Slaat het automatisch bijwerken van het `.gitignore`-bestand over. Als deze vlag is ingesteld, wordt `.intlayer` niet toegevoegd aan `.gitignore`.
- `--no-framework-setup` - Optioneel. Installeert alleen de pakketten, zonder de projectbestanden aan te passen.
- `--routing <routing>` - Optioneel. Locale-routing: `prefix-no-default` (standaard), `prefix-all`, `no-prefix`, `search-params` of `none`.
- `--content <layout>` - Optioneel. Hoe inhoud wordt gedeclareerd:
  - `multilingual` - `{fileName}.content.{ts,json}` naast het component, elke locale in één bestand (stelt `compiler.output` in).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` naast het component (stelt `compiler.output` en `dictionary.locale` in).
  - `centralized` - één `/locales/{locale}.{json,po}`-catalogus per locale (voegt de `syncJSON` / `syncPO`-plugin toe).
  - `namespaces` - `/locales/{locale}/{namespace}.{json,po}`-catalogi (voegt de `syncJSON` / `syncPO`-plugin toe).
- `--content-format <format>` - Optioneel, met `--content`. `ts` of `json` voor `multilingual` / `per-locale`, `json` of `po` voor `centralized` / `namespaces`. Standaard de eerste.
- `-i, --interactive` - Optioneel. Kies de stappen uit een checklist (pakketten, CI, skills, MCP, VS Code, LSP, lint, CMS, infrastructuur, …) in plaats van de standaardset. Vereist een terminal: zonder terminal (AI-agent, CI) faalt het commando en toont het de subcommando's die je in plaats daarvan kunt uitvoeren.
- `--no-github-actions` - Optioneel. Met `--interactive` worden de GitHub Actions-workflows nooit aangemaakt, ook niet als ze geselecteerd zijn.

## Wat het doet:

Het `init` commando voert de volgende configuratietaken uit:

1. **Valideert projectstructuur** - Garandeert dat u zich in een geldige projectmap bevindt met een `package.json` bestand.
2. **Installeert de pakketten** - Installeert de ontbrekende Intlayer-pakketten voor je stack (bijv. `react-intlayer`, `vite-intlayer`) en werkt verouderde pakketten bij.
3. **Werkt `.gitignore` bij** - Voegt `.intlayer` toe aan uw `.gitignore` bestand om gegenereerde bestanden uit te sluiten van versiebeheer (kan worden overgeslagen met `--no-gitignore`).
4. **Configureert TypeScript** - Werkt eventuele `tsconfig.json` bestanden bij om Intlayer type-definities op te nemen (`.intlayer/**/*.ts`).
5. **Maakt configuratiebestand aan** - Genereert een `intlayer.config.ts` (voor TypeScript-projecten) of `intlayer.config.mjs` (voor JavaScript-projecten) met standaardinstellingen.
6. **Werkt de bundler- / frameworkconfiguratie bij** - Voegt de Intlayer-plugin toe aan je Vite-, Next.js-, Nuxt-, Astro-, …-configuratie en maakt de middleware/proxy en providers aan wanneer het framework dat ondersteunt.

## Eén stap tegelijk instellen

Elke stap van de `--interactive`-checklist heeft een eigen subcommando. Ze stellen geen vragen wanneer hun waarden als flags worden meegegeven, dus je kunt ze veilig uitvoeren vanuit een AI-agent of een CI-job.

| Commando                                                              | Wat het instelt                                                                              |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Installeert ontbrekende Intlayer-pakketten en werkt verouderde bij                           |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Configuratiebestand, TypeScript, bundler-plugin, middleware/proxy, providers en `.gitignore` |
| `intlayer init github-actions`                                        | De GitHub Actions-workflows `fill` en `test`                                                 |
| `intlayer init vscode-extension`                                      | Raadt de Intlayer-extensie aan in `.vscode/extensions.json`                                  |
| `intlayer init lsp`                                                   | De Intlayer-taalserver in `.vscode/settings.json`                                            |
| `intlayer init eslint`                                                | De Intlayer-lintregels (ESLint / oxlint), als het project al lint                            |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | De Intlayer-documentatie als skills voor AI-agents                                           |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | De Intlayer MCP-server                                                                       |
| `intlayer init extension [--browser <chrome/firefox>]`                | Opent de storepagina van de Intlayer-browserextensie                                         |
| `intlayer init cms`                                                   | Logt in op het Intlayer CMS via je browser en slaat de inloggegevens op in `.env`            |
| `intlayer init infra --mode <desktop/docker/compose>`                 | De desktop-app of een zelf-gehoste stack                                                     |

### Vanuit een AI-agent of een CI-job

De shell van een AI-agent heeft geen terminal, dus een vraag kan niet worden beantwoord. Gebruik het standaardcommando en daarna de subcommando's die je nodig hebt:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Zonder terminal:

- `init skills` installeert de skills die bij je stack passen, tenzij `--skills` is ingesteld (bijv. `--skills Usage Content React`).
- `init skills` en `init mcp` gebruiken het gedetecteerde AI-platform (Claude Code, Cursor, VS Code, Windsurf, …), tenzij `--platform` is ingesteld, en falen met de lijst van platforms als er geen wordt gedetecteerd.
- `init mcp` gebruikt het transport `stdio`, tenzij `--transport` is ingesteld.
- `init infra` vereist `--mode`, en `init extension` toont alleen de storelinks, tenzij `--browser` is ingesteld.

De MCP-server wordt altijd binnen het project geconfigureerd (voor Claude Code in `.mcp.json`).

## Voorbeelden:

### Basis initialisatie:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Dit initialiseert Intlayer in de huidige map en detecteert automatisch de hoofdmap van het project.

### Initialiseren met aangepaste projectmap:

```bash packageManager="npm"
npx intlayer init --project-root ./mijn-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./mijn-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./mijn-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./mijn-project
```

Dit initialiseert Intlayer in de opgegeven directory.

### Initialiseren zonder .gitignore bij te werken:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Dit configureert alle configuratiebestanden maar wijzigt uw `.gitignore` niet.

## Voorbeeld van uitvoer:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Opmerkingen:

- Het commando is idempotent - u kunt het veilig meerdere keren uitvoeren. Reeds geconfigureerde stappen worden overgeslagen.
- Indien er al een configuratiebestand bestaat, wordt dit niet overschreven.
- TypeScript-configuratiebestanden zonder een `include` array (bijv. solution-style configuraties met references) worden overgeslagen.
- Het commando stopt met een foutmelding als er geen `package.json` wordt gevonden in de hoofdmap van het project.
