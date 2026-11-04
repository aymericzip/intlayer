---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt Plugin | Intlayer vertalingen sorteren
description: "Sorteer de locales van t(), de categorieën van plural(), de voorwaarden van enu(), de cases van select() en de sleutels van je inhoudsdeclaraties met prettier-plugin-intlayer. Werkt met Prettier en oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Formatteren
  - Vertalingen sorteren
  - Locales sorteren
  - i18n
  - Internationalisering
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Initiële geschiedenis"
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt-gebruik toegevoegd"
author: aymericzip
---

# Prettier x Oxfmt Plugin

`prettier-plugin-intlayer` zet de sleutels van je vertalingen in een vaste volgorde telkens wanneer Prettier een bestand formatteert. Diffs blijven klein, merge-conflicten worden zeldzamer en een ontbrekende locale valt meteen op.

```ts
// voor
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// na
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Installatie

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Vereist Prettier 3 of nieuwer.

Als je project al Prettier gebruikt, installeert `intlayer init prettier` de plugin en voegt deze automatisch toe aan je configuratie.

## Gebruik

De plugin werkt met Prettier en met [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Voeg de plugin toe aan je Prettier-configuratie:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Om het alleen toe te passen op je inhoudsdeclaraties, gebruik je een override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt laadt geen Prettier-plugins. Laat Prettier de plugin alleen op je inhoudsdeclaraties toepassen en laat oxfmt daarna het hele project formatteren:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"]
      }
    }
  ]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Houd deze volgorde aan. oxfmt herschrijft de opmaak in zijn eigen stijl, maar verandert nooit de volgorde van objectsleutels, dus de sortering blijft behouden.

  </Tab>
</Tabs>

## Wat wordt gesorteerd

### `t()`: locales

De vastgezette (pinned) locales komen eerst (`en` standaard). De overige locales volgen in alfabetische volgorde.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR-volgorde

Categorieën lopen van de kleinste hoeveelheid naar de fallback: `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: oplopende drempelwaarden

Voorwaarden worden gesorteerd op hun getal, vervolgens op operator (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` komt als laatste.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

Tijdens runtime wint de eerste overeenkomende voorwaarde. De plugin past de nieuwe volgorde alleen toe wanneer elke hoeveelheid nog steeds naar dezelfde inhoud resulteert. Wanneer volgorde het resultaat bepaalt, blijft het object ongewijzigd zoals geschreven. In `{ '<1': …, '<=-2.3': … }` vangt de sleutel `'<1'` bijvoorbeeld elk negatief getal op.

### `select()`: alfabetisch

Cases worden alfabetisch gesorteerd en `fallback` komt als laatste.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

Zonder een `fallback`- of `other`-sleutel wordt de laatste case gebruikt als fallback. Die case blijft achteraan en alleen de cases ervoor worden gesorteerd.

### `.content.json` bestanden

De geserialiseerde vorm wordt op dezelfde manier gesorteerd: `{ "nodeType": "translation", "translation": { … } }`, evenals `plural`-, `enumeration`- en `select`-nodes.

### Inhoudssleutels (opt-in)

Met `intlayerSortContentKeys: true` sorteert de plugin ook de sleutels van `content` in het woordenboek alfabetisch, op elk nestingsniveau. Dit is alleen van toepassing op `*.content.*`-bestanden.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Het sorteren gaat door via elke helperfunctie (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) om de objecten daarin te bereiken. De interne sleutelstructuur van elke helper behoudt zijn eigen volgorde. Sleutels die aan `cond()` en `gender()` worden doorgegeven, worden nooit opnieuw gerangschikt, omdat hun laatste sleutel de fallback is. Velden naast `content` (`key`, `title`, `locale`…) blijven zoals ze zijn.

## Opties

| Optie                     | Standaard | Beschrijving                                                                                                    |
| ------------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`  | Locales die vooraan worden gehouden in `t()`, in deze volgorde. Geef `[]` door om alle locales te sorteren.     |
| `intlayerSortContentKeys` | `false`   | In `*.content.*`-bestanden ook de inhoudssleutels van het woordenboek en geneste objecten alfabetisch sorteren. |

## Wat onaangeroerd blijft

- Objecten met spread (`...base`), berekende sleutel (`[key]`), methode of dubbele sleutel.
- `plural()`-mappings met een sleutel die geen CLDR-categorie is.
- `enu()`-mappings waarvan een nieuwe volgorde de uiteindelijke inhoud zou veranderen.
- Aanroepen van andere functies die dezelfde naam hebben als een helper maar een argument krijgen dat geen object is.

Opmerkingen (comments) verhuizen mee met de sleutel waarbij ze horen.

## Ondersteunde parsers

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` en `jsonc`. De `<script>`-blokken van Vue-, Svelte- en Astro-bestanden worden met deze parsers geformatteerd.

> **Bekende beperking.** Prettier voert slechts één plugin per parser uit. Als een andere plugin ook de JavaScript/TypeScript-parsers vervangt (bijvoorbeeld `prettier-plugin-tailwindcss`), is alleen de laatst vermelde van toepassing op die bestanden. Beperk `prettier-plugin-intlayer` tot `*.content.*`-bestanden met een override om het conflict te vermijden. Met oxfmt worden Tailwind-klassen gesorteerd door de ingebouwde optie `sortTailwindcss`, dus dit conflict treedt niet op.
