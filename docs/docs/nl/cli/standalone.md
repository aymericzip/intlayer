---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Standalone Bundel
description: Leer hoe u een zelfstandige JavaScript-bundel van de applicatie-inhoud kunt maken.
keywords:
  - Standalone
  - Bundel
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Initialisatie van de documentatie voor het standalone commando"
---

# Standalone Bundel

Met het `standalone` commando kunt u een zelfstandige JavaScript-bundel maken die Intlayer en eventuele andere gespecificeerde pakketten bevat. Dit is met name handig voor het gebruik van Intlayer in omgevingen zonder pakketbeheerder of bundler, zoals een eenvoudige HTML/JS-applicatie.

De bundel maakt gebruik van [esbuild](https://esbuild.github.io/) om de gevraagde pakketten en hun afhankelijkheden te combineren in een enkel bestand dat eenvoudig in elk webproject kan worden geïmporteerd.

## Gebruik

```bash
npx intlayer standalone --packages [pakketten...] [opties]
```

## Opties

- `-o, --outfile [outfile]` - Optioneel. De naam van het uitvoerbestand. Standaard: `intlayer-bundle.js`.
- `--packages [pakketten...]` - Vereist. Een lijst met pakketten die in de bundel moeten worden opgenomen (bijv. `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Optioneel. De versie van de pakketten die gebundeld moeten worden. Indien niet gespecificeerd, wordt standaard de versie van de Intlayer CLI gebruikt.
- `--minify` - Optioneel. Of de uitvoer moet worden geminimaliseerd. Standaard: `true`.
- `--platform [platform]` - Optioneel. Het doelplatform voor de bundel (bijv. `browser`, `node`). Standaard: `browser`.
- `--format [format]` - Optioneel. Het uitvoerformaat voor de bundel (bijv. `esm`, `cjs`, `iife`). Standaard: `esm`.

## Algemene Opties

- `--env-file [envFile]` - Omgevingsbestand.
- `-e, --env [env]` - Omgeving.
- `--base-dir [baseDir]` - Basisdirectory.
- `--no-cache` - Cache uitschakelen.
- `--verbose` - Gedetailleerde uitvoer.

## Voorbeelden:

### Een bundel maken voor Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Dit maakt een bestand `intlayer.js` aan met daarin zowel de `intlayer` als `vanilla-intlayer` pakketten, geminimaliseerd en in ESM-formaat, klaar voor gebruik in een browser via een `<script>` tag.

### Een specifieke versie bundelen:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Bundelen met een ander formaat:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Wat het doet:

1. **Maakt een tijdelijke omgeving aan** - Richt een tijdelijke directory in om afhankelijkheden te beheren.
2. **Installeert pakketten** - Gebruikt `npm` of `bun` (indien beschikbaar) om de gevraagde pakketten en hun afhankelijkheden te installeren.
3. **Genereert een toegangspunt** - Maakt een tijdelijk toegangspuntbestand aan dat alle gevraagde pakketten exporteert en ze blootstelt als globale variabelen bij uitvoering in een browser.
4. **Bundelt met esbuild** - Gebruikt esbuild om alles te combineren in een enkel bestand, met toepassing van minimalisatie en formatering zoals gevraagd.
5. **Genereert het bestand** - Schrijft de resulterende bundel naar het opgegeven uitvoerpad.

## Globale Variabelen

Wanneer de bundel in een browser wordt geladen, stelt deze de gevraagde pakketten bloot als globale variabelen op het `window` object. De variabelenamen zijn gebaseerd op de pakketnamen (bijv. `intlayer` wordt `Intlayer`, `vanilla-intlayer` wordt `VanillaIntlayer`).

```javascript
// Toegang tot Intlayer vanuit de bundel
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
