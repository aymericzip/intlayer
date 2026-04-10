---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Optimalizace velikosti bundle i18n a výkonu
description: Snižte velikost bundle vaší aplikace optimalizací obsahu internacionalizace (i18n). Naučte se využívat tree shaking a lazy loading pro slovníky s Intlayer.
keywords:
  - Optimalizace bundle
  - Automatizace obsahu
  - Dynamický obsah
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
    changes: "Přidány volby `minify` a `purge` do konfigurace buildu"
---

# Optimalizace velikosti bundle i18n a výkonu

Jednou z nejčastějších výzev u tradičních řešení i18n spoléhajících na JSON soubory je správa velikosti obsahu. Pokud vývojáři ručně nerozdělí obsah do jmenných prostorů (namespaces), uživatelé často končí stahováním překladů pro každou stránku a potenciálně pro každý jazyk jen proto, aby si zobrazili jednu stránku.

Například aplikace s 10 stránkami přeloženými do 10 jazyků může vést k tomu, že uživatel stahuje obsah 100 stránek, i když potřebuje pouze **jednu** (aktuální stránku v aktuálním jazyce). To vede k plýtvání šířkou pásma a pomalejšímu načítání.

**Intlayer řeší tento problém prostřednictvím optimalizace v době sestavení (build-time optimization).** Analyzuje váš kód, aby zjistil, které slovníky jsou skutečně použity pro jednotlivé komponenty, a do vašeho bundle znovu vloží pouze nezbytný obsah.

## Obsah

<TOC />

## Skenování bundle

Analýza vašeho bundle je prvním krokem k identifikaci "těžkých" JSON souborů a příležitostí pro rozdělení kódu (code-splitting). Tyto nástroje generují vizuální mapu (treemap) zkompilovaného kódu vaší aplikace, což vám umožní přesně vidět, které knihovny zabírají nejvíce místa.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite využívá Rollup pod kapotou. Plugin `rollup-plugin-visualizer` generuje interaktivní HTML soubor zobrazující velikost každého modulu ve vašem grafu.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Automaticky otevřít zprávu v prohlížeči
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

Pro projekty využívající App Router a Turbopack poskytuje Next.js vestavěný experimentální analyzátor, který nevyžaduje žádné další závislosti.

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

Pokud v Next.js používáte výchozí bundler Webpack, použijte oficiální analyzátor bundle. Aktivujte jej nastavením proměnné prostředí během sestavení.

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
  // Vaše konfigurace Next.js
});
```

**Použití:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standardní Webpack

Pro Create React App (ejected), Angular nebo vlastní nastavení Webpacku použijte průmyslový standard `webpack-bundle-analyzer`.

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

## Jak to funguje

Intlayer využívá **přístup na úrovni komponent**. Na rozdíl od globálních JSON souborů je váš obsah definován vedle vašich komponent nebo uvnitř nich. Během procesu sestavení Intlayer:

1.  **Analyzuje** váš kód, aby našel volání `useIntlayer`.
2.  **Sestaví** odpovídající obsah slovníku.
3.  **Nahradí** volání `useIntlayer` optimalizovaným kódem na základě vaší konfigurace.

To zajišťuje, že:

- Pokud komponenta není importována, její obsah není zahrnut do bundle (Dead Code Elimination).
- Pokud je komponenta načítána líně (lazy-loaded), její obsah je také načítán líně.

## Nastavení podle platformy

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js vyžaduje plugin `@intlayer/swc` pro zpracování transformace, protože Next.js používá SWC pro sestavení.

> Tento plugin není nainstalován ve výchozím nastavení, protože SWC pluginy jsou pro Next.js stále experimentální. V budoucnu se to může změnit.

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

Po instalaci Intlayer automaticky rozpozná a použije plugin.

 </Tab>
 <Tab value="vite">

### Vite

Vite využívá plugin `@intlayer/babel`, který je součástí závislostí `vite-intlayer`. Optimalizace je ve výchozím nastavení povolena. Není třeba nic dalšího dělat.

 </Tab>
 <Tab value="webpack">

### Webpack

Chcete-li povolit optimalizaci bundle s Intlayer na Webpacku, musíte nainstalovat a nakonfigurovat příslušný plugin Babel (`@intlayer/babel`) nebo SWC (`@intlayer/swc`).

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

## Konfigurace

Způsob, jakým Intlayer optimalizuje váš bundle, můžete ovládat pomocí vlastnosti `build` ve vašem `intlayer.config.ts`.

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
     * Minifikovat slovníky pro snížení velikosti bundle.
     */
     minify: true;

    /**
     * Odstranit (purge) nepoužívané klíče ve slovnících
     */
     purge: true;

    /**
     * Indikuje, zda má build kontrolovat typy TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> Ponechání výchozí volby pro `optimize` je doporučeno ve většině případů.

> Podrobnosti naleznete v dokumentaci konfigurace: [Konfigurace](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md)

### Možnosti buildu

V objektu konfigurace `build` jsou k dispozici následující možnosti:

| Vlastnost      | Typ       | Výchozí     | Popis                                                                                                                                                                                                         |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean` | `undefined` | Ovládá, zda je povolena optimalizace buildu. Pokud je `true`, Intlayer nahradí volání slovníku optimalizovanými injekcemi. Pokud je `false`, optimalizace je vypnuta. Ideálně nastaveno na `true` v produkci. |
| **`minify`**   | `boolean` | `false`     | Zda se mají minifikovat slovníky pro snížení velikosti bundle.                                                                                                                                                |
| **`purge`**    | `boolean` | `false`     | Zda se mají odstranit nepoužívané klíče ve slovnících.                                                                                                                                                        |

### Minifikace

Minifikace slovníků odstraňuje nepotřebné bílé znaky, komentáře a snižuje velikost obsahu JSON. To je užitečné zejména u velkých slovníků.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Poznámka: Minifikace je ignorována, pokud je `optimize` zakázáno nebo pokud je povolen Visual Editor (protože editor potřebuje úplný obsah pro umožnění úprav).

### Purging (Čištění)

Purging zajišťuje, že do finálního bundle slovníků budou zahrnuty pouze klíče skutečně použité ve vašem kódu. To může výrazně snížit velikost vašeho bundle, pokud máte velké slovníky s mnoha klíči, které nejsou použity v každé části vaší aplikace.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Poznámka: Purging je ignorován, pokud je `optimize` zakázáno.

### Režim importu (Import Mode)

U velkých aplikací zahrnujících několik stránek a lokalit mohou vaše JSON soubory představovat významnou část velikosti vašeho bundle. Intlayer vám umožňuje kontrolovat, jak jsou slovníky načítány.

Režim importu lze definovat výchozí globálně ve vašem souboru `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Stejně jako pro každý slovník ve vašich souborech `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Přepsat výchozí režim importu
  content: {
    // ...
  },
};

export default appContent;
```

| Vlastnost        | Typ                                | Výchozí    | Popis                                                                                                                  |
| :--------------- | :--------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Zastaralé**: Místo toho použijte `dictionary.importMode`. Určuje, jak jsou slovníky načítány (viz podrobnosti níže). |

Nastavení `importMode` určuje, jak je obsah slovníku vložen do vaší komponenty.
Můžete jej definovat globálně v souboru `intlayer.config.ts` pod objektem `dictionary`, nebo jej můžete přepsat pro konkrétní slovník v jeho souboru `.content.ts`.

### 1. Statický režim (`default`)

V statickém režimu Intlayer nahradí `useIntlayer` za `useDictionary` a vloží slovník přímo do JavaScript bundle.

- **Klady:** Okamžité vykreslení (synchronní), nulové dodatečné síťové požadavky během hydratace.
- **Zápory:** Bundle obsahuje překlady pro **všechny** dostupné jazyky pro danou konkrétní komponentu.
- **Nejlepší pro:** Single Page Applications (SPA).

**Příklad transformovaného kódu:**

```tsx
// Váš kód
const content = useIntlayer("my-key");

// Optimalizovaný kód (Statický)
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

### 2. Dynamický režim

V dynamickém režimu Intlayer nahradí `useIntlayer` za `useDictionaryAsync`. To využívá `import()` (mechanismus podobný Suspense) k línému načítání konkrétně JSON pro aktuální lokalitu.

- **Klady:** **Tree shaking na úrovni lokality.** Uživatel prohlížející anglickou verzi stáhne _pouze_ anglický slovník. Francouzský slovník se nikdy nenačte.
- **Zápory:** Vyvolá síťový požadavek (stažení assetu) na komponentu během hydratace.
- **Nejlepší pro:** Velké bloky textu, články nebo aplikace podporující mnoho jazyků, kde je velikost bundle kritická.

**Příklad transformovaného kódu:**

```tsx
// Váš kód
const content = useIntlayer("my-key");

// Optimalizovaný kód (Dynamický)
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

> Při použití `importMode: 'dynamic'`, pokud máte na jedné stránce 100 komponent využívajících `useIntlayer`, prohlížeč se pokusí o 100 samostatných stažení. Chcete-li se vyhnout tomuto "vodopádu" požadavků, seskupte obsah do menšího počtu souborů `.content` (např. jeden slovník na sekci stránky) namísto jednoho na komponentu.

### 3. Režim Fetch

Chová se podobně jako dynamický režim, ale nejprve se pokusí načíst slovníky z API Intlayer Live Sync. Pokud volání API selže nebo obsah není označen pro živé aktualizace, vrátí se k dynamickému importu.

> Podrobnosti naleznete v dokumentaci CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md)

> V režimu fetch nelze použít purge a minifikaci.

## Shrnutí: Statický vs Dynamický

| Funkce                 | Statický režim                                 | Dynamický režim                      |
| :--------------------- | :--------------------------------------------- | :----------------------------------- |
| **Velikost JS bundle** | Větší (obsahuje všechny jazyky pro komponentu) | Nejmenší (pouze kód, žádný obsah)    |
| **Počáteční načtení**  | Okamžité (Obsah je v bundle)                   | Mírné zpoždění (Načítá JSON)         |
| **Síťové požadavky**   | 0 dodatečných požadavků                        | 1 požadavek na slovník               |
| **Tree Shaking**       | Úroveň komponenty                              | Úroveň komponenty + Úroveň lokality  |
| **Nejlepší využití**   | UI komponenty, malé aplikace                   | Stránky s hodně textem, mnoho jazyků |
