---
createdAt: 2025-12-30
updatedAt: 2025-12-30
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Optie --no-gitignore toegevoegd"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Commando init toegevoegd"
---

# Initialiseer Intlayer

```bash
npx intlayer init
```

Het `init` commando configureert Intlayer automatisch in uw project door de benodigde bestanden en instellingen aan te maken. Dit is de aanbevolen manier om met Intlayer aan de slag te gaan.

## Aliassen:

- `npx intlayer init`

## Argumenten:

- `--project-root [projectRoot]` - Optioneel. Specificeer de hoofdmap van het project. Indien niet opgegeven, zoekt het commando naar de projectmap vanaf de huidige werkmap.
- `--no-gitignore` - Optioneel. Slaat het automatisch bijwerken van het `.gitignore`-bestand over. Als deze vlag is ingesteld, wordt `.intlayer` niet toegevoegd aan `.gitignore`.

## Wat het doet:

Het `init` commando voert de volgende configuratietaken uit:

1. **Valideert projectstructuur** - Garandeert dat u zich in een geldige projectmap bevindt met een `package.json` bestand.
2. **Werkt `.gitignore` bij** - Voegt `.intlayer` toe aan uw `.gitignore` bestand om gegenereerde bestanden uit te sluiten van versiebeheer (kan worden overgeslagen met `--no-gitignore`).
3. **Configureert TypeScript** - Werkt eventuele `tsconfig.json` bestanden bij om Intlayer type-definities op te nemen (`.intlayer/**/*.ts`).
4. **Maakt configuratiebestand aan** - Genereert een `intlayer.config.ts` (voor TypeScript-projecten) of `intlayer.config.mjs` (voor JavaScript-projecten) met standaardinstellingen.
5. **Werkt Vite-config bij** - Indien een Vite-configuratiebestand wordt gedetecteerd, wordt de import voor de `vite-intlayer` plugin toegevoegd.
6. **Werkt Next.js-config bij** - Indien een Next.js-configuratiebestand wordt gedetecteerd, wordt de import voor de `next-intlayer` plugin toegevoegd.

## Voorbeelden:

### Basis initialisatie:

```bash
npx intlayer init
```

Dit initialiseert Intlayer in de huidige map en detecteert automatisch de hoofdmap van het project.

### Initialiseren met aangepaste projectmap:

```bash
npx intlayer init --project-root ./mijn-project
```

Dit initialiseert Intlayer in de opgegeven directory.

### Initialiseren zonder .gitignore bij te werken:

```bash
npx intlayer init --no-gitignore
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
