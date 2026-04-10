---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Optimalisatie van i18n-bundelgrootte en prestaties
description: Verminder de bundelgrootte van uw applicatie door internationaliseringsinhoud (i18n) te optimaliseren. Leer hoe u tree shaking en lazy loading kunt inzetten voor woordenboeken met Intlayer.
keywords:
  - Bundeloptimalisatie
  - Inhoudsautomatisering
  - Dynamische inhoud
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Opties `minify` en `purge` toegevoegd aan de build-configuratie"
---

# Optimalisatie van i18n-bundelgrootte en prestaties

Een van de meest voorkomende uitdagingen bij traditionele i18n-oplossingen die afhankelijk zijn van JSON-bestanden, is het beheren van de omvang van de inhoud. Als ontwikkelaars de inhoud niet handmatig scheiden in namespaces, downloaden gebruikers vaak vertalingen voor elke pagina en mogelijk elke taal, alleen maar om een enkele pagina te bekijken.

Bijvoorbeeld, een applicatie met 10 pagina's vertaald in 10 talen kan ertoe leiden dat een gebruiker de inhoud van 100 pagina's downloadt, ook al hebben ze er maar **één** nodig (de huidige pagina in de huidige taal). Dit leidt tot verspilling van bandbreedte en langzamere laadtijden.

**Intlayer lost dit probleem op via optimalisatie tijdens de build.** Het analyseert uw code om te detecteren welke woordenboeken daadwerkelijk per component worden gebruikt en injecteert alleen de noodzakelijke inhoud opnieuw in uw bundel.

## Inhoudsopgave

<TOC />

## Scan uw bundel

Het analyseren van uw bundel is de eerste stap bij het identificeren van "zware" JSON-bestanden en mogelijkheden voor code-splitting. Deze tools genereren een visuele treemap van de gecompileerde code van uw applicatie, zodat u precies kunt zien welke bibliotheken de meeste ruimte in beslag nemen.

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
      open: true, // Open het rapport automatisch in je browser
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

Als u de standaard Webpack-bundler in Next.js gebruikt, gebruik dan de officiële bundel-analyzer. Activeer deze door een omgevingsvariabele in te stellen tijdens uw build.

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

Voor Create React App (ejected), Angular of aangepaste Webpack-setups, gebruikt u de industriestandaard `webpack-bundle-analyzer`.

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

```typescript fileName="webpack.config.ts
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

Intlayer gebruikt een **per-component aanpak**. In tegenstelling tot globale JSON-bestanden, wordt uw inhoud gedefinieerd naast of binnen uw componenten. Tijdens het build-proces zal Intlayer:

1.  Uw code **analyseren** om `useIntlayer`-aanroepen te vinden.
2.  De bijbehorende woordenboekinhoud **bouwen**.
3.  De `useIntlayer`-aanroep **vervangen** door geoptimaliseerde code op basis van uw configuratie.

Dit zorgt ervoor dat:

- Als een component niet wordt geïmporteerd, de inhoud ervan niet in de bundel wordt opgenomen (Dead Code Elimination).
- Als een component lazy-loaded is, de inhoud ervan ook lazy-loaded is.

## Installatie per platform

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js vereist de `@intlayer/swc` plugin om de transformatie af te handelen, aangezien Next.js SWC gebruikt voor builds.

> Deze plugin is niet standaard geïnstalleerd omdat SWC-plugins nog experimenteel zijn voor Next.js. Dit kan in de toekomst veranderen.

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

Eenmaal geïnstalleerd, zal Intlayer de plugin automatisch detecteren en gebruiken.

 </Tab>
 <Tab value="vite">

### Vite

Vite gebruikt de `@intlayer/babel` plugin die als afhankelijkheid van `vite-intlayer` is opgenomen. De optimalisatie is standaard ingeschakeld. Verder hoeft u niets te doen.

 </Tab>
 <Tab value="webpack">

### Webpack

Om bundeloptimalisatie met Intlayer op Webpack in te schakelen, moet u de juiste Babel (`@intlayer/babel`) of SWC (`@intlayer/swc`) plugin installeren en configureren.

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

```typescript fileName="babel.config.js"
const {
  getOptimizePluginOptions,
  intlayerOptimizeBabelPlugin,
} = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
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
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Minificeer de woordenboeken om de bundelgrootte te verkleinen.
     */
     minify: true;

    /**
     * Verwijder ongebruikte sleutels in woordenboeken (purge)
     */
     purge: true;

    /**
     * Geeft aan of de build TypeScript-typen moet controleren
     */
    checkTypes: false;
  },
};

export default config;
```

> Het wordt in de meeste gevallen aanbevolen om de standaardoptie voor `optimize` te behouden.

> Zie de configuratie-doc voor meer details: [Configuratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md)

### Build-opties

De volgende opties zijn beschikbaar onder het `build` configuratie-object:

| Eigenschap     | Type      | Standaard   | Beschrijving                                                                                                                                                                                                               |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Bepaalt of build-optimalisatie is ingeschakeld. Indien `true`, vervangt Intlayer woordenboekaanroepen door geoptimaliseerde injecties. Indien `false`, is optimalisatie uitgeschakeld. Ideaal ingesteld op `true` in prod. |
| **`minify`**   | `boolean` | `false`     | Of de woordenboeken moeten worden geminificeerd om de bundelgrootte te verkleinen.                                                                                                                                         |
| **`purge`**    | `boolean` | `false`     | Of de ongebruikte sleutels in woordenboeken moeten worden verwijderd.                                                                                                                                                      |

### Minificatie

Het minificeren van woordenboeken verwijdert onnodige witruimte, opmerkingen en vermindert de omvang van de JSON-inhoud. Dit is vooral handig voor grote woordenboeken.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Opmerking: Minificatie wordt genegeerd als `optimize` is uitgeschakeld of als de Visual Editor is ingeschakeld (omdat de editor de volledige inhoud nodig heeft om bewerkingen toe te staan).

### Purging (Opschonen)

Purging zorgt ervoor dat alleen de sleutels die daadwerkelijk in uw code worden gebruikt, worden opgenomen in de uiteindelijke woordenboekbundel. Dit kan de omvang van uw bundel aanzienlijk verkleinen als u grote woordenboeken heeft met veel sleutels die niet in elk deel van uw applicatie worden gebruikt.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Opmerking: Purging wordt genegeerd als `optimize` is uitgeschakeld.

### Import Mode

Voor grote applicaties met meerdere pagina's en locales kunnen uw JSON-bestanden een aanzienlijk deel van uw bundelgrootte uitmaken. Met Intlayer kunt u bepalen hoe woordenboeken worden geladen.

De import mode kan standaard globaal worden gedefinieerd in uw `intlayer.config.ts` bestand.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Evenals voor elk woordenboek in uw `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` bestanden.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Overschrijf de standaard import mode
  content: {
    // ...
  },
};

export default appContent;
```

| Eigenschap       | Type                               | Standaard  | Beschrijving                                                                                                                        |
| :--------------- | :--------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Verouderd**: Gebruik in plaats daarvan `dictionary.importMode`. Bepaalt hoe woordenboeken worden geladen (zie details hieronder). |

De `importMode` instelling bepaalt hoe de woordenboekinhoud in uw component wordt geïnjecteerd.
U kunt dit globaal definiëren in het `intlayer.config.ts` bestand onder het `dictionary` object, of u kunt het overschrijven voor een specifiek woordenboek in het bijbehorende `.content.ts` bestand.

### 1. Statische Modus (`default`)

In de statische modus vervangt Intlayer `useIntlayer` door `useDictionary` en injecteert het woordenboek rechtstreeks in de JavaScript-bundel.

- **Voordelen:** Directe rendering (synchroon), nul extra netwerkverzoeken tijdens hydratatie.
- **Nadelen:** De bundel bevat vertalingen voor **alle** beschikbare talen voor dat specifieke component.
- **Beste voor:** Single Page Applications (SPA).

**Voorbeeld van getransformeerde code:**

```tsx
// Uw code
const content = useIntlayer("my-key");

// Geoptimaliseerde code (Statisch)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Dynamische Modus

In de dynamische modus vervangt Intlayer `useIntlayer` door `useDictionaryAsync`. Dit maakt gebruik van `import()` (Suspense-achtig mechanisme) om specifiek de JSON voor de huidige locale lazy te laden.

- **Voordelen:** **Tree shaking op locale-niveau.** Een gebruiker die de Engelse versie bekijkt, downloadt _alleen_ het Engelse woordenboek. Het Franse woordenboek wordt nooit geladen.
- **Nadelen:** Activeert een netwerkverzoek (asset fetch) per component tijdens hydratatie.
- **Beste voor:** Grote tekstblokken, artikelen of applicaties die veel talen ondersteunen waarbij bundelgrootte kritiek is.

**Voorbeeld van getransformeerde code:**

```tsx
// Uw code
const content = useIntlayer("my-key");

// Geoptimaliseerde code (Dynamisch)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Wanneer u `importMode: 'dynamic'` gebruikt en u heeft 100 componenten die `useIntlayer` op een enkele pagina gebruiken, zal de browser 100 afzonderlijke fetches proberen. Om deze "waterval" van verzoeken te vermijden, groepeert u de inhoud in minder `.content` bestanden (bijv. één woordenboek per paginasectie) in plaats van één per atoomcomponent.

### 3. Fetch Mode

Gedraagt zich vergelijkbaar met de dynamische modus, maar probeert eerst woordenboeken op te halen uit de Intlayer Live Sync API. Als de API-aanroep mislukt of de inhoud niet is gemarkeerd voor live updates, valt het terug op de dynamische import.

> Zie CMS-documentatie voor meer details: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md)

> In fetch mode kunnen purging en minificatie niet worden gebruikt.

## Samenvatting: Statisch vs Dynamisch

| Functie              | Statische Modus                              | Dynamische Modus                    |
| :------------------- | :------------------------------------------- | :---------------------------------- |
| **JS-bundelgrootte** | Groter (bevat alle talen voor het component) | Kleinste (alleen code, geen inhoud) |
| **Initiële Load**    | Direct (inhoud zit in bundel)                | Lichte vertraging (haalt JSON op)   |
| **Netwerkverzoeken** | 0 extra verzoeken                            | 1 verzoek per woordenboek           |
| **Tree Shaking**     | Component-niveau                             | Component-niveau + Locale-niveau    |
| **Beste Use Case**   | UI-componenten, kleine apps                  | Pagina's met veel tekst, veel talen |
