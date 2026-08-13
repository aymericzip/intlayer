---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint Plugin | Lint-regels voor Intlayer
description: Detecteer hardgecodeerde strings, dynamische aanroepen die de Intlayer-compiler niet kan optimaliseren en ongebruikte woordenboekinhoud met eslint-plugin-intlayer. Werkt met ESLint en oxlint op React, Vue, Svelte, Angular en Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internationalisering
  - no-raw-text
  - Hardgecodeerde strings
  - Ongebruikte vertalingen
  - Dode inhoud
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Initiële geschiedenis"
author: aymericzip
---

# ESLint x OXLint Plugin

`eslint-plugin-intlayer` detecteert het soort i18n-fouten dat TypeScript niet kan opmerken:

1. **Hardgecodeerde tekst** die nooit in een woordenboek is opgenomen.
2. **Dynamische aanroepen** die type-checks doorstaan en functioneren, maar die de Intlayer-compiler niet kan optimaliseren.
3. **Dode inhoud (Dead content)** — woordenboeken en velden die nergens in het project worden gelezen (opt-in).

Onbekende woordenboeksleutels, onbekende veldpaden en ontbrekende locales zijn al compilatiefouten, dus de plugin herhaalt deze niet.

## Installatie

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Vereist ESLint 9 of nieuwer (flat config).

## Gebruik

De plugin werkt in zowel ESLint als [oxlint](https://oxc.rs) — dezelfde regels, dezelfde opties.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Of schakel regels één voor één in:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Twee kanttekeningen: de JS-pluginondersteuning in oxlint is nog in alfa en oxlint ondersteunt geen aangepaste parsers — dus `.vue`-, `.svelte`-, `.astro`-bestanden en Angular-templates worden daar niet gecontroleerd. Voer oxlint uit op uw JS/TS/JSX-bestanden en behoud ESLint voor de rest.

`no-unused-content` is hierboven opzettelijk weggelaten: het vereist de werkmap en het gecontroleerde bestandspad uit de regelcontext, wat de alfa JS-plugin-bridge niet garandeert. Voer dit uit onder ESLint.

  </Tab>
</Tabs>

### Configuraties

| Configuratie    | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                        | error                   | error                     | off                      | off                 |
| `strict`        | error (+ niet-JSX literals) | error                   | error                     | error                    | off                 |
| `contract-only` | off                         | error                   | error                     | off                      | off                 |

`recommended` houdt `no-raw-text` opzettelijk op `warn`: als u dit toepast op een bestaande codebase, worden alle onvertaalde strings in één keer zichtbaar, wat uw build niet vanaf dag één zou moeten laten mislukken.

`enforce-adapter-import` staat standaard uit — schakel dit expliciet in als u het wilt gebruiken.

`no-unused-content` staat uit in elke configuratie, inclusief `strict`. Het is de enige regel die uw Intlayer-configuratie leest en bronbestanden van schijf doorzoekt, dus het inschakelen ervan moet een bewuste keuze zijn in plaats van iets wat een preset automatisch doet.

## Regels

### `no-raw-text`

Meldt gebruikersgerichte tekst die niet in een woordenboek is gedeclareerd. Het gebruikt dezelfde detectie als `intlayer extract`, waardoor merknamen, CSS-klassen en technische identifiers worden genegeerd.

```jsx
// ✗ Gemeld
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Goed
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Bestanden voor inhoudsdeclaratie (`*.content.ts`, …) worden overgeslagen.

Om een heel bestand in één keer te herstellen, voert u `npx intlayer extract` uit en laat u de compiler de strings voor u naar een woordenboek verplaatsen.

**Opties**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attributen waarvan de waarde gebruikersgerichte tekst is.
      // Standaard: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementen waarvan de inhoud nooit gebruikersgerichte tekst is.
      // Standaard: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Reguliere expressies voor tekst die nooit gemeld mag worden.
      ignorePatterns: ["^Powered by"],

      // Meld ook string-literals buiten markup. Standaard: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Vereist dat de woordenboeksleutel een string-literal is.

De compiler kan een woordenboek alleen vooraf laden wanneer deze de sleutel direct op de aanroeplocatie kan lezen. Bij een berekende sleutel wordt de optimalisatie stilzwijgend overgeslagen en worden in plaats daarvan alle woordenboeken gebundeld.

```typescript
// ✗ Gemeld
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Een variabele is nog steeds geen literal
const key = "home";
useIntlayer(key);

// ✓ Goed
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Dit geldt voor `useIntlayer`, `getIntlayer` en elke compatibiliteitsadapter (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Vereist dat het veld dat u uit een woordenboek leest statisch bekend is.

De compiler verwijdert velden waarvan hij niet ziet dat ze worden gebruikt. Een dynamisch berekende toegang is onzichtbaar voor de compiler, waardoor het lezen tijdens runtime `undefined` kan retourneren.

```typescript
// ✗ Gemeld
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Goed
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Geeft de voorkeur aan de `@intlayer/*` compatibiliteitsadapter boven het originele pakket. Het origineel verwijst alleen naar Intlayer als de bundler-alias is geconfigureerd; de adapter doet dit altijd. Automatisch te herstellen met `--fix`.

```typescript
// ✗ Gemeld
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Goed
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Standaard uitgeschakeld.** Meldt inhoud die nergens in uw project wordt gelezen, plus woordenboeksleutels die op meer dan één plek zijn gedeclareerd.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Gemeld wanneer geen enkele aanroeper in het project om "home" vraagt
  content: {
    title: t({ nl: "Titel", en: "Title" }),

    // ✗ Gemeld wanneer niets `hero` leest
    hero: {
      subtitle: t({ nl: "Subtitel", en: "Subtitle" }),
    },
  },
};
```

In tegenstelling tot de andere regels kan deze regel niet alleen oordelen op basis van het geopende bestand — een veld is alleen ongebruikt ten opzichte van het hele project. Bij de eerste inhoudsdeclaratie van een lint-run laadt deze uw Intlayer-configuratie, scant de bronbestanden die de configuratie declareert (`build.traversePattern`, `compiler.transformPattern`) en voert dezelfde gebruiksanalysator uit die `@intlayer/lsp` en de doorhaling "ongebruikt" in de VS Code-extensie aandrijft. Het resultaat wordt gedurende `cacheTtl` milliseconden in de cache opgeslagen, zodat de scan eenmaal per run plaatsvindt in plaats van per bestand.

**Opties**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Meld woordenboeksleutels waarnaar niets verwijst. Standaard: true
      reportUnusedDictionaries: true,

      // Meld inhoudsvelden die niets leest. Standaard: true
      reportUnusedFields: true,

      // Meld sleutels die op meer dan één plek zijn gedeclareerd. Standaard: true
      reportDuplicateKeys: true,

      // Reguliere expressies voor veldpaden die nooit gemeld mogen worden.
      ignoreFields: ["^meta"],

      // Projectroot waar de scan begint. Standaard: de werkmap van ESLint
      baseDir: process.cwd(),

      // Hoe lang een projectscan wordt hergebruikt, in ms. Standaard: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Verlaag `cacheTtl` wanneer u lint vanuit een langlopende editorserver en wilt dat bewerkingen sneller worden weergegeven; stel `baseDir` in wanneer een enkele lint-run meerdere Intlayer-projecten in een monorepo omvat.

> **Neigt naar stilte.** Een vals-positief resultaat zou hier een vertaling verwijderen, dus er wordt niets gemeld wanneer het woordenboek wordt gebruikt op een manier die de analyse niet kan volgen: het inhoudsobject in zijn geheel doorgegeven, een vertaalfunctie die eraan is gebonden (`const t = useTranslations("home")`), een declaratie bereikt via een directe import (`useDictionary(myDictionary)`), een `nest()` vanuit een ander woordenboek of een veldenlijst die niet-exhaustief is gemaakt door een spread. Single-file componenten (`.vue`, `.svelte`, `.astro`) tellen alsof ze elk veld gebruiken van de woordenboeken die ze vermelden, omdat hun scriptblokken hier niet worden geparseerd.

`reportDuplicateKeys` leest de niet-samengevoegde woordenboeken die de build wegschrijft onder `.intlayer/`, dus het blijft stil totdat het project ten minste eenmaal is gebouwd. Twee declaraties die een sleutel delen worden samengevoegd, wat een legitiem patroon is — het rapport bestaat omdat een veld dat aan beide zijden is gedefinieerd stilzwijgend slechts een van de twee waarden behoudt.

De analyser wordt geladen vanuit `@intlayer/lsp`, dat als ESM wordt gedistribueerd. De regel vereist daarom een Node-versie die een ES-module kan `require()`-en — Node 20.19+ of 22.12+. Op oudere versies meldt het niets in plaats van de lint-run te laten mislukken.

## Frameworks

Elke regel werkt in alle Intlayer-integraties, inclusief binnen Vue-, Svelte- en Angular-templates. U hoeft ESLint alleen te vertellen welke parser elk bestandstype leest.

| Framework                 | Bestanden         | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular-templates         | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Installeer alleen de parsers die uw project nodig heeft.

> **Bekende beperking.** In Vue- en Angular-templates wordt een expressie zoals `{{ content[key] }}` niet gecontroleerd door `no-dynamic-field-access`. Dynamische aanroepen geschreven in het scriptblok worden normaal opgevangen.
