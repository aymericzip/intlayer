---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: i18n Bundelgrootte & Prestatie-optimalisatie
description: Verklein de bundelgrootte van uw applicatie door internationalisatie (i18n) content te optimaliseren. Leer hoe u tree shaking en lazy loading kunt inzetten voor woordenboeken met Intlayer.
keywords:
  - Bundel optimalisatie
  - Content automatisering
  - Dynamische content
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Toevoeging van `intlayerPurgeBabelPlugin` en `intlayerMinifyBabelPlugin` voor Babel/Webpack; verduidelijking van de plugin-pipeline"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Toevoeging van de `minify` en `purge` opties aan de buildconfiguratie"
author: aymericzip
---

# i18n Bundelgrootte & Prestatie-optimalisatie

Een van de meest voorkomende uitdagingen bij traditionele i18n-oplossingen die op JSON-bestanden vertrouwen, is het beheren van de contentgrootte. Als ontwikkelaars de content niet handmatig scheiden in namespaces, downloaden gebruikers vaak vertalingen voor elke pagina en mogelijk voor elke taal, alleen maar om één enkele pagina te bekijken.

Bijvoorbeeld, een applicatie met 10 pagina's die in 10 talen zijn vertaald, kan ertoe leiden dat een gebruiker de content van 100 pagina's downloadt, terwijl ze er maar **één** nodig hebben (de huidige pagina in de huidige taal). Dit leidt tot verspilde bandbreedte en tragere laadtijden.

**Intlayer lost dit probleem op door build-time optimalisatie.** Het analyseert uw code om te detecteren welke woordenboeken daadwerkelijk per component worden gebruikt en voegt alleen de benodigde content weer in uw bundel in.

## Inhoudsopgave

<TOC />

## Analyseer uw bundel

Het analyseren van uw bundel is de eerste stap bij het identificeren van "zware" JSON-bestanden en mogelijkheden voor code-splitting. Deze tools genereren een visuele treemap van de gecompileerde code van uw applicatie, zodat u precies kunt zien welke bibliotheken de meeste ruimte innemen.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite gebruikt Rollup onder de motorkap. De `rollup-plugin-visualizer` genereert een interactief HTML-bestand dat de grootte van elke module in uw graaf toont.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Open het rapport automatisch in uw browser
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Voor projecten die de App Router en Turbopack gebruiken, biedt Next.js een ingebouwde experimentele analyzer die geen extra afhankelijkheden vereist.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Als u de standaard Webpack-bundler in Next.js gebruikt, gebruik dan de officiële bundle analyzer. Activeer deze door een omgevingsvariabele in te stellen tijdens uw build.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Uw Next.js configuratie
});
```

**Gebruik:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standaard Webpack

Voor Create React App (ejected), Angular, of aangepaste Webpack setups, gebruik de industriestandaard `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Hoe het werkt

Intlayer gebruikt een **per-component benadering**. In tegenstelling tot globale JSON-bestanden wordt uw content gedefinieerd naast of binnen uw componenten. Tijdens het build-proces zal Intlayer:

1. Uw code **analyseren** om `useIntlayer`-aanroepen te vinden.
2. De corresponderende woordenboekcontent **bouwen**.
3. De `useIntlayer`-aanroep **vervangen** door geoptimaliseerde code op basis van uw configuratie.

Dit zorgt ervoor dat:

- Als een component niet is geïmporteerd, de content ervan niet in de bundel wordt opgenomen (Dead Code Elimination).
- Als een component lazy-loaded is, de content ervan ook lazy-loaded is.

## Plugin Referentie

De build-optimalisatie van Intlayer is opgesplitst in verschillende discrete plugins, elk met één enkele verantwoordelijkheid. Begrijpen wat elke plugin doet voorkomt verwarring bij het instellen.

### Babel plugins (`@intlayer/babel`)

Deze worden direct in `babel.config.js` gebruikt voor Webpack-gebaseerde setups (Next.js met Babel, CRA, aangepaste Webpack, enz.).

| Plugin                        | Wat het doet                                                                                                                         |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Scant `.content.ts`-bestanden en schrijft gecompileerde woordenboeken naar `.intlayer/`                                              |
| `intlayerOptimizeBabelPlugin` | Herschrijft `useIntlayer('key')` → `useDictionary(hash)` en voegt de bijpassende woordenboek `import` in                             |
| `intlayerPurgeBabelPlugin`    | Scant alle bronbestanden en verwijdert **ongebruikte contentvelden** uit de gecompileerde `.intlayer/**/*.json`-woordenboekbestanden |
| `intlayerMinifyBabelPlugin`   | **Hernoemt contentveld-sleutels** naar korte alfabetische aliassen (`title` → `a`) in zowel JSON-bestanden als de broncode           |

> **De volgorde van plugins is belangrijk.** In uw `babel.config.js` moeten de purge- en minify-plugins **vóór** de optimize-plugin staan. De optimize-stap vervangt `useIntlayer('key')` door een ondoorzichtige `useDictionary(hash)` aanroep, waardoor de woordenboeksleutelinformatie wordt gewist die de purge- en minify-stappen nodig hebben om te bepalen welke velden worden gebruikt.

Elke Babel-plugin heeft een bijpassende optie-helper die uw `intlayer.config.ts` één keer leest tijdens het laden van de configuratie en vooraf opgeloste waarden retourneert:

| Optie helper                 | Gebruikt met                  |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite plugins (`vite-intlayer`)

Vite gebruikers **configureren deze nooit direct**. Ze worden automatisch gekoppeld wanneer u `withIntlayer()` aanroept in `vite.config.ts`. De `build.purge` en `build.minify` vlaggen in `intlayer.config.ts` schakelen het corresponderende gedrag in of uit zonder extra pluginregistratie.

| Interne Vite plugin | Equivalent gedrag                                                                         |
| :------------------ | :---------------------------------------------------------------------------------------- |
| Usage analyzer      | Zelfde als `intlayerPurgeBabelPlugin` analyse-stap                                        |
| Dictionary prune    | Zelfde als `intlayerPurgeBabelPlugin` JSON-schrijfstap                                    |
| Dictionary minify   | Zelfde als `intlayerMinifyBabelPlugin` JSON-schrijfstap                                   |
| Babel transform     | Zelfde als `intlayerMinifyBabelPlugin` broncode hernoemen + `intlayerOptimizeBabelPlugin` |

## Setup per platform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js vereist de `@intlayer/swc` plugin voor de optimize-stap (import-herschrijving), omdat Next.js SWC gebruikt voor builds.

> Deze plugin is niet standaard geïnstalleerd omdat SWC plugins nog experimenteel zijn voor Next.js. Dit kan in de toekomst veranderen.

<Tabs>
 <Tab value="npm">

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

 </Tab>
 <Tab value="Crates.io (rust)">

```toml fileName="Cargo.toml"
[dependencies]
intlayer-swc-plugin = "*"
```

[View on Crates.io](https://crates.io/crates/intlayer-swc-plugin)

 </Tab>
</Tabs>

Zodra geïnstalleerd, zal Intlayer de plugin automatisch detecteren en gebruiken.

Voor de **purge en minify** stappen (veldverwijdering en veldhernoeming), installeert u `@intlayer/babel` en voegt u de Babel-plugins toe. Omdat Next.js SWC gebruikt voor transformatie maar nog steeds `babel.config.js` evalueert voor pluginconfiguratie, draaien de Babel-plugins als een pre-stap voor SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: verwijder ongebruikte contentvelden uit .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: hernoem contentveld-sleutels in JSON + broncode
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Let op: intlayerOptimizeBabelPlugin is hier NIET nodig omdat
    // @intlayer/swc de useIntlayer → useDictionary herschrijving afhandelt.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite gebruikt de `@intlayer/babel` plugin, die is opgenomen als een afhankelijkheid van `vite-intlayer`. De volledige optimalisatie-pipeline — import herschrijven, purgen en minificeren — is standaard ingeschakeld en vereist geen extra pluginregistratie.

Schakel purge en minify in door de corresponderende vlaggen in `intlayer.config.ts` in te stellen:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // verwijder ongebruikte contentvelden uit gebundelde JSON
    minify: true, // hernoem contentveld-sleutels naar korte aliassen
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (en Next.js met Babel)

Installeer `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Voeg alle vier de plugins toe aan `babel.config.js` in de juiste volgorde:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: compileer .content.ts bestanden → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: verwijder ongebruikte velden uit .intlayer/**/*.json
    //    (leest de intlayer.config.ts build.purge vlag)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: hernoem veldsleutels in JSON + broncode
    //    (leest de intlayer.config.ts build.minify vlag)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: herschrijf useIntlayer('key') → useDictionary(hash)
    //    Moet als laatste komen omdat dit de woordenboeksleutel wist.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Configuratie

U kunt bepalen hoe Intlayer uw bundel optimaliseert via de `build` eigenschap in uw `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.DUTCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Vervang useIntlayer() aanroepen door directe woordenboek-imports tijdens build-time.
    // undefined = automatisch (ingeschakeld in productie), true = altijd, false = nooit.
    optimize: undefined,

    // Hernoem contentveld-sleutels in gecompileerde woordenboeken naar korte
    // alfabetische aliassen (bijv. title → a). Verkleint de JSON-grootte; vereist optimize.
    minify: true,

    // Verwijder contentvelden die nooit worden aangesproken in de broncode.
    // Vereist optimize.
    purge: true,
  },
};

export default config;
```

> Het wordt in de meeste gevallen aanbevolen om de standaardwaarde (`undefined`) voor `optimize` te behouden.

> Zie de configuratie-referentie voor alle opties: [Configuratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md)

### Build Opties

| Eigenschap     | Type                  | Standaardwaarde | Beschrijving                                                                                                                                                                                                        |
| :------------- | :-------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean / undefined` | `undefined`     | Schakelt de import-herschrijvingstap in. `undefined` = alleen actief in productiebuilds. `false` schakelt purge en minify ook uit.                                                                                  |
| **`minify`**   | `boolean`             | `false`         | Hernoemt contentveld-sleutels in gecompileerde JSON-bestanden naar korte alfabetische aliassen. Herschrijft ook de bijbehorende eigendomsaanroepen in de broncode. Heeft geen effect wanneer `optimize` `false` is. |
| **`purge`**    | `boolean`             | `false`         | Verwijdert contentvelden die in de broncode nooit statisch worden aangesproken uit gecompileerde JSON-bestanden. Heeft geen effect wanneer `optimize` `false` is.                                                   |

### Minificatie (veld-sleutel hernoemen)

`build.minify` minificeert uw JavaScript bundel **niet** — uw bundler doet dat. In plaats daarvan verkleint het de gecompileerde woordenboek JSON-bestanden door elke door de gebruiker gedefinieerde contentveld-sleutel te vervangen door een korte alfabetische alias:

```
// Voor minificatie
{ "title": "Hallo", "subtitle": "Wereld" }

// Na minificatie
{ "a": "Hallo", "b": "Wereld" }
```

Dezelfde hernoeming wordt toegepast op alle eigendomsaanroepen in uw broncode, dus `content.title` wordt `content.a` in de gecompileerde uitvoer. Het runtime gedrag is identiek.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Minificatie wordt overgeslagen wanneer `optimize` `false` is of wanneer `editor.enabled` `true` is (de visuele editor vereist de originele veldnamen om bewerken mogelijk te maken).

> Minificatie wordt ook overgeslagen voor woordenboeken die geladen worden via `importMode: 'fetch'` omdat hun JSON wordt geserveerd vanuit een externe API met de originele veldnamen — het hernoemen van de client-side sleutels zou het server/client contract verbreken.

### Purging (verwijderen van ongebruikte velden)

`build.purge` analyseert welke contentvelden daadwerkelijk in uw broncode worden aangesproken en verwijdert alle overige uit de gecompileerde JSON-bestanden.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Voorbeeld:** een woordenboek met vijf velden waarvan er slechts twee worden gebruikt:

```
// Voor purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Na purge (alleen title + subtitle aangesproken in broncode)
{ "title": "…", "subtitle": "…" }
```

> Purge wordt overgeslagen wanneer `optimize` `false` is of wanneer `editor.enabled` `true` is.

> Purge wordt ook conservatief overgeslagen wanneer een bronbestand niet geparseerd kan worden, of wanneer het resultaat van `useIntlayer` wordt toegewezen aan een variabele en wordt doorgegeven op manieren die de statische analyzer niet kan volgen (bijv. uitgespreid in een object, doorgegeven als een prop zonder destructuring). In dergelijke gevallen wordt het volledige woordenboek behouden.

### Import Modus

Voor grote applicaties, inclusief verschillende pagina's en locales, kan uw JSON een aanzienlijk deel van uw bundelgrootte uitmaken. Intlayer stelt u in staat om te bepalen hoe woordenboeken worden geladen met behulp van de `importMode` optie.

### Globale definitie

De import modus kan globaal worden gedefinieerd in uw `intlayer.config.ts` bestand.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Standaard is 'static'
  },
};

export default config;
```

### Per-woordenboek definitie

U kunt de import modus voor individuele woordenboeken overschrijven in hun `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` bestanden.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Overschrijf de standaard import modus
  content: {
    // ...
  },
};

export default appContent;
```

| Eigenschap       | Type                               | Standaardwaarde | Beschrijving                                                                                                |
| :--------------- | :--------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`      | **Verouderd**: Gebruik in plaats daarvan `dictionary.importMode`. Bepaalt hoe woordenboeken worden geladen. |

De instelling `importMode` bepaalt hoe de content van het woordenboek in uw component wordt geïnjecteerd. U kunt het globaal definiëren in `intlayer.config.ts` onder het object `dictionary`, of u kunt het overschrijven per woordenboek in het betreffende `.content.ts` bestand.

### 1. Statische Modus (`default`)

In de statische modus vervangt Intlayer `useIntlayer` door `useDictionary` en injecteert het woordenboek direct in de JavaScript-bundel.

- **Voordelen:** Directe rendering (synchroon), geen extra netwerkverzoeken tijdens hydratatie.
- **Nadelen:** De bundel bevat vertalingen voor **alle** beschikbare talen voor die specifieke component.
- **Beste voor:** Single Page Applications (SPA).

**Getransformeerd codevoorbeeld:**

```tsx
// Uw code
const content = useIntlayer("my-key");

// Geoptimaliseerd code-illustratie na transformatie (Static)
// Dit is alleen ter illustratie, de daadwerkelijke code zal om optimalisatieredenen afwijken
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      nl: "Mijn titel",
    },
  },
});
```

### 2. Dynamische Modus

In de dynamische modus vervangt Intlayer `useIntlayer` door `useDictionaryAsync`. Dit maakt gebruik van `import()` (Suspense-achtig mechanisme) om specifiek de JSON voor de huidige locale lazy-loaded binnen te halen.

- **Voordelen:** **Tree shaking op locale-niveau.** Een gebruiker die de Engelse versie bekijkt, zal _alleen_ het Engelse woordenboek downloaden. Het Nederlandse woordenboek wordt nooit geladen.
- **Nadelen:** Triggered een netwerkverzoek (asset fetch) per component tijdens hydratatie.
- **Beste voor:** Grote tekstblokken, artikelen of applicaties die veel talen ondersteunen waarbij de bundelgrootte cruciaal is.

**Getransformeerd codevoorbeeld:**

```tsx
// Uw code
const content = useIntlayer("my-key");

// Geoptimaliseerd code-illustratie na transformatie (Dynamic)
// Dit is alleen ter illustratie, de daadwerkelijke code zal om optimalisatieredenen afwijken
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  nl: () =>
    import(".intlayer/dynamic_dictionary/my-key/nl.json").then(
      (mod) => mod.default
    ),
});
```

> Bij het gebruik van `importMode: 'dynamic'`, en u heeft 100 componenten die `useIntlayer` gebruiken op een enkele pagina, zal de browser 100 aparte fetches proberen uit te voeren. Om deze "waterval" van verzoeken te voorkomen, groepeer content in minder `.content`-bestanden (bijv. één woordenboek per paginasectie) in plaats van één per atoom-component. U kunt ook meerdere `.content`-bestanden met dezelfde sleutel gebruiken. Intlayer voegt deze samen tot één enkel woordenboek.

### 3. Fetch Modus

Gedraagt zich vergelijkbaar met de Dynamische modus maar probeert eerst woordenboeken op te halen via de Intlayer Live Sync API. Als de API-aanroep mislukt of de content niet is gemarkeerd voor live updates, valt deze terug op de dynamische import.

**Getransformeerd codevoorbeeld:**

```tsx
// Uw code
const content = useIntlayer("my-key");

// Geoptimaliseerde code-illustratie (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  nl: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/nl").then((res) =>
      res.json()
    ),
});
```

> Zie CMS documentatie voor meer details: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md)

> In de fetch modus worden purge en minificatie niet toegepast omdat de JSON wordt geserveerd vanuit een externe API die de originele veldnamen gebruikt.

## Samenvatting: Statisch vs Dynamisch

| Functie               | Statische Modus                             | Dynamische Modus                    |
| :-------------------- | :------------------------------------------ | :---------------------------------- |
| **JS Bundelgrootte**  | Groter (bevat alle talen voor de component) | Kleinst (alleen code, geen content) |
| **Initiële Laadtijd** | Direct (Content zit in bundel)              | Lichte vertraging (Haalt JSON op)   |
| **Netwerkverzoeken**  | 0 extra verzoeken                           | 1 verzoek per woordenboeksleutel    |
| **Tree Shaking**      | Component-niveau                            | Component-niveau + Locale-niveau    |
| **Beste Use Case**    | UI Componenten, Kleine Apps                 | Tekstzware pagina's, Veel Talen     |
