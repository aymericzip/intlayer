---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Optimalizace Velikosti Bundle & Výkonu i18n
description: Zmenšete velikost svého aplikačního bundlu optimalizací obsahu pro internacionalizaci (i18n). Zjistěte, jak v Intlayer využít tree shaking a líné načítání (lazy loading) pro slovníky.
keywords:
  - Optimalizace Bundlu
  - Automatizace Obsahu
  - Dynamický Obsah
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
    changes: "Přidány `intlayerPurgeBabelPlugin` a `intlayerMinifyBabelPlugin` pro Babel/Webpack; vyjasnění fungování pipeline pluginů"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Přidány možnosti `minify` a `purge` do konfigurace sestavení (build)"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Optimalizace Velikosti Bundle & Výkonu i18n

Jednou z nejčastějších výzev u tradičních i18n řešení spoléhajících na JSON soubory je správa velikosti obsahu. Pokud vývojáři ručně nerozdělují obsah do jmenných prostorů (namespaces), uživatelé často skončí stahováním překladů pro každou stránku a potenciálně pro každý jazyk, jen aby si prohlédli jednu jedinou stránku.

Například aplikace s 10 stránkami přeloženými do 10 jazyků může vést k tomu, že si uživatel stáhne obsah v rozsahu 100 stránek, i když ve skutečnosti potřebuje pouze **jednu** (aktuální stránku v aktuálním jazyce). To vede k plýtvání šířkou pásma a delším časům načítání.

**Intlayer řeší tento problém pomocí optimalizace v čase sestavení (build-time).** Analyzuje váš kód, detekuje, které slovníky se skutečně používají u konkrétní komponenty, a vloží do vašeho bundlu pouze tento nezbytný obsah.

## Obsah

<TOC />

## Analyzujte svůj bundle

Analýza bundlu je prvním krokem k odhalení „těžkých“ JSON souborů a příležitostí k rozdělení kódu (code-splitting). Tyto nástroje generují vizuální stromovou mapu kompilovaného kódu vaší aplikace, což vám umožňuje přesně vidět, které knihovny zabírají nejvíce místa.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite využívá Rollup na pozadí. Plugin `rollup-plugin-visualizer` vygeneruje interaktivní HTML soubor zobrazující velikost každého modulu ve vašem grafu.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Automaticky otevře report ve vašem prohlížeči
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

Pokud používáte výchozí Webpack bundler v Next.js, použijte oficiální bundle analyzer. Spustíte jej nastavením proměnné prostředí během sestavování.

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

Pro Create React App (ejected), Angular nebo vlastní konfigurace Webpack použijte průmyslový standard `webpack-bundle-analyzer`.

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

Intlayer používá **přístup na úrovni komponent (per-component)**. Na rozdíl od globálních JSON souborů se váš obsah definuje společně s komponentami nebo přímo v nich. Během procesu sestavování (build) Intlayer provede následující:

1. **Analyzuje** váš kód, aby vyhledal volání `useIntlayer`.
2. **Sestaví** (Build) příslušný obsah ze slovníků.
3. **Nahradí** volání `useIntlayer` optimalizovaným kódem v závislosti na vaší konfiguraci.

Tím zajistí, že:

- Pokud komponenta není importována, její obsah se do bundlu nezahrne (Odstranění mrtvého kódu / Dead Code Elimination).
- Pokud je komponenta načítána líně (lazy-loaded), její obsah je také načítán líně.

## Referenční příručka k pluginům

Optimalizace sestavení pomocí Intlayer je rozdělena do několika samostatných pluginů, z nichž každý má jedinou zodpovědnost. Pochopení jejich funkcí zabrání zmatkům při jejich nastavování.

### Babel pluginy (`@intlayer/babel`)

Tyto pluginy se používají přímo v `babel.config.js` pro sestavení založená na Webpacku (Next.js s Babelem, CRA, vlastní Webpack atd.).

| Plugin                        | K čemu slouží                                                                                                                |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Prohledá soubory `.content.ts` a zapíše zkompilované slovníky do složky `.intlayer/`                                         |
| `intlayerOptimizeBabelPlugin` | Přepíše `useIntlayer('key')` na `useDictionary(hash)` a vloží odpovídající `import` slovníku                                 |
| `intlayerPurgeBabelPlugin`    | Prohledá všechny zdrojové soubory a odstraní **nepoužívaná pole obsahu** z kompilovaných slovníků `.intlayer/**/*.json`      |
| `intlayerMinifyBabelPlugin`   | **Přejmenuje klíče polí obsahu** na krátké abecední aliasy (např. `title` → `a`) jak v JSON souborech, tak ve zdrojovém kódu |

> **Záleží na pořadí pluginů.** Ve vašem `babel.config.js` musí pluginy pro purge a minify následovat **před** optimalizačním (optimize) pluginem. Krok optimalizace totiž nahrazuje volání `useIntlayer('key')` neprůhledným `useDictionary(hash)`, což odstraní informaci o klíči slovníku. Tuto informaci potřebují pluginy purge a minify k identifikaci použitých polí.

Každý Babel plugin má odpovídajícího pomocníka (options helper), který při načítání konfigurace jednou přečte váš soubor `intlayer.config.ts` a vrátí předem vyřešené hodnoty:

| Pomocník pro volby           | Používá se s                  |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite pluginy (`vite-intlayer`)

Uživatelé Vite **tyto pluginy nikdy nenastavují přímo**. Propojí se automaticky po volání `withIntlayer()` ve `vite.config.ts`. Příznaky (flags) `build.purge` a `build.minify` v konfiguraci `intlayer.config.ts` zajišťují odpovídající chování bez potřeby dodatečné registrace pluginů.

| Interní Vite plugin | Ekvivalentní chování                                                                                   |
| :------------------ | :----------------------------------------------------------------------------------------------------- |
| Usage analyzer      | Stejné jako analytický průchod (analyse pass) `intlayerPurgeBabelPlugin`                               |
| Dictionary prune    | Stejné jako zápis JSON pro `intlayerPurgeBabelPlugin`                                                  |
| Dictionary minify   | Stejné jako zápis JSON pro `intlayerMinifyBabelPlugin`                                                 |
| Babel transform     | Stejné jako přejmenování zdrojového kódu v `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Nastavení podle platforem

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js využívá SWC pro sestavování, takže k průchodu pro optimalizaci (přepis importů) potřebuje plugin `@intlayer/swc`.

> Tento plugin se neinstaluje ve výchozím nastavení, jelikož SWC pluginy jsou pro Next.js zatím experimentální. V budoucnu se to může změnit.

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

Po instalaci plugin Intlayer automaticky rozpozná a použije.

Pro **purge a minify** (odstranění polí a jejich přejmenování) nainstalujte ještě `@intlayer/babel` a přidejte Babel pluginy. Ačkoliv Next.js pro transformaci používá SWC, stále vyhodnocuje `babel.config.js` kvůli konfiguraci pluginů. Tím pádem Babel pluginy poběží jako přípravný krok před SWC.

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
    // Purge: odstraní nepoužívaná pole obsahu z .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: přejmenuje klíče polí v JSON + ve zdrojovém kódu
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Poznámka: intlayerOptimizeBabelPlugin zde NENÍ POTŘEBA, jelikož
    // přepis useIntlayer → useDictionary řeší balíček @intlayer/swc.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite využívá plugin `@intlayer/babel`, který je zahrnut v závislostech u `vite-intlayer`. Kompletní pipeline optimalizace — přepis importů, purge a minify — je ve výchozím stavu aktivní a nevyžaduje žádnou další registraci pluginů.

Purge a minify zapnete nastavením odpovídajících příznaků v souboru `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // odstraní nepoužívaná pole obsahu z bundlovaného JSONu
    minify: true, // přejmenuje klíče polí obsahu na krátké aliasy
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (a Next.js s Babelem)

Nainstalujte `@intlayer/babel`:

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

Přidejte do `babel.config.js` všechny čtyři pluginy ve správném pořadí:

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
    // Extract: kompiluje .content.ts soubory → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: odstraní nepoužívaná pole z .intlayer/**/*.json
    //    (čte hodnotu příznaku build.purge v intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: přejmenuje klíče polí v JSON + zdrojovém kódu
    //    (čte hodnotu příznaku build.minify v intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: přepíše useIntlayer('key') → useDictionary(hash)
    //    Musí být poslední, protože vymaže klíč slovníku.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Konfigurace

Způsob optimalizace bundlu přes Intlayer můžete řídit pomocí vlastnosti `build` ve svém souboru `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.CZECH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Nahrazuje volání useIntlayer() přímo importy slovníků během sestavení.
    // undefined = auto (aktivní v produkci), true = vždy, false = nikdy.
    optimize: undefined,

    // Přejmenuje klíče polí v kompilovaných slovnících na krátké abecední
    // aliasy (např. title → a). Snižuje velikost JSONu; vyžaduje optimize.
    minify: true,

    // Odstraní pole obsahu, ke kterým ve zdrojovém kódu není žádný přístup.
    // Vyžaduje optimize.
    purge: true,
  },
};

export default config;
```

> Ve většině případů se doporučuje ponechat výchozí hodnotu (`undefined`) u parametru `optimize`.

> Přehled všech možností naleznete v referenční příručce: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/configuration.md)

### Volby pro sestavení (Build Options)

| Vlastnost      | Typ                    | Výchozí     | Popis                                                                                                                                                                                                                 |
| :------------- | :--------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | Povolí průchod pro přepis importů. `undefined` = aktivní pouze v produkčním sestavení. `false` vypíná rovněž purge a minify.                                                                                          |
| **`minify`**   | `boolean`              | `false`     | Přejmenuje klíče polí obsahu v kompilovaných JSON souborech na krátké abecední aliasy. Stejně tak přepíše odpovídající přístupy k vlastnostem ve zdrojovém kódu. Nefunguje, pokud je `optimize` nastaveno na `false`. |
| **`purge`**    | `boolean`              | `false`     | Z kompilovaných JSON souborů odstraní obsahová pole, k nimž se ve zdrojovém kódu staticky nepřistupuje. Nefunguje, pokud je `optimize` nastaveno na `false`.                                                          |

### Minifikace (přejmenování klíčů)

Volba `build.minify` **neminifikuje** váš JavaScriptový bundle — to má na starosti váš bundler. Namísto toho zmenšuje velikost kompilovaných JSON slovníků tak, že nahradí všechny uživatelem definované klíče obsahových polí za krátké abecední aliasy:

```
// Před minifikací
{ "title": "Ahoj", "subtitle": "Světe" }

// Po minifikaci
{ "a": "Ahoj", "b": "Světe" }
```

Stejné přejmenování proběhne i u všech přístupů k vlastnostem ve zdrojovém kódu, takže v kompilovaném výstupu se z `content.title` stane `content.a`. Chování aplikace v reálném čase se tím nijak nezmění.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> K minifikaci nedojde, pokud je `optimize` nastaveno na `false` nebo pokud `editor.enabled` odpovídá hodnotě `true` (vizuální editor totiž potřebuje znát původní názvy polí, aby umožnil jejich editaci).

> Stejně tak se minifikace ignoruje u slovníků načítaných přes `importMode: 'fetch'`, protože takové JSON soubory pocházejí z externího API pod svými původními názvy polí — přejmenování klíčů na straně klienta by rozbilo vazbu server-klient.

### Purge (odstranění nepoužitých polí)

Volba `build.purge` analyzuje, ke kterým obsahovým polím se ve zdrojovém kódu skutečně přistupuje, a odstraní všechna ostatní pole z kompilovaných JSON souborů.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Příklad:** Pokud má slovník pět polí, ale použita jsou pouze dvě:

```
// Před provedením purge
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Po provedení purge (ve zdrojovém kódu je přístup pouze na title + subtitle)
{ "title": "…", "subtitle": "…" }
```

> K purge nedojde, jestliže je `optimize` nastaveno na `false` nebo jestliže je `editor.enabled` `true`.

> Z bezpečnostních důvodů k purge nedojde ani tehdy, pokud nelze správně rozebrat (parse) nějaký zdrojový soubor. Dále se vynechá v situaci, kdy je výsledek z volání `useIntlayer` uložen do proměnné a předán dál způsobem, který statický analyzátor neumí sledovat (např. spread operátorem do objektu, nebo předáním přes properties (props) bez použití destrukce). V těchto případech zůstává celý slovník zachován.

### Importovací režim (Import Mode)

V případě rozsáhlých aplikací zahrnujících mnoho stránek a jazyků se JSON soubory mohou stát velkou zátěží pro výslednou velikost vašeho bundlu. Intlayer vám prostřednictvím volby `importMode` dovoluje kontrolovat způsob, jakým se slovníky načítají.

### Globální definice

Importovací režim lze globálně definovat v souboru `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Výchozí hodnota je 'static'
  },
};

export default config;
```

### Definice pro konkrétní slovník

Importovací režim můžete upravit nezávisle pro každý jednotlivý slovník v odpovídajícím souboru `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Přepíše výchozí hodnotu
  content: {
    // ...
  },
};

export default appContent;
```

| Vlastnost        | Typ                                | Výchozí    | Popis                                                                                                                      |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Zastaralé**: Použijte raději `dictionary.importMode`. Určuje, jakým způsobem se načítají slovníky (více informací níže). |

Nastavení `importMode` ovlivňuje způsob, jakým je obsah slovníku vkládán do vaší komponenty. Lze je nakonfigurovat globálně přes vlastnost `dictionary` v `intlayer.config.ts`, anebo lokálně u konkrétního slovníku v jeho `.content.ts` souboru.

### 1. Statický režim (Static Mode - `default`)

Při použití statického režimu Intlayer převede volání `useIntlayer` na `useDictionary` a obsah slovníku je vložen přímo do JavaScriptového bundlu.

- **Výhody:** Okamžité vykreslování (synchronní krok), během hydratace nevznikají žádné další síťové požadavky.
- **Nevýhody:** Bundle obsahuje překlady pro **všechny** dostupné jazyky dané komponenty.
- **Vhodné pro:** Single Page Aplikace (SPA).

**Ukázka transformovaného kódu:**

```tsx
// Váš kód
const content = useIntlayer("my-key");

// Příklad optimalizovaného kódu po transformaci (Static)
// Toto je pouze ilustrativní příklad, skutečný kód se kvůli dalším optimalizacím liší
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      cs: "Můj nadpis",
    },
  },
});
```

### 2. Dynamický režim (Dynamic Mode)

V dynamickém režimu Intlayer nahradí `useIntlayer` voláním `useDictionaryAsync`. Využije přitom mechanismu `import()` (podobné použití jako React Suspense) k asynchronnímu (lazy) stažení pouze těch JSON souborů, které odpovídají aktuálnímu jazyku.

- **Výhody:** **Tree shaking na úrovni jazyků (locale).** Pokud si uživatel otevře anglickou verzi, stáhne si _pouze_ anglický slovník. Český slovník se nikdy nenačte.
- **Nevýhody:** Během hydratace dojde k jednomu síťovému požadavku na danou komponentu (asset fetch).
- **Vhodné pro:** Velké textové bloky, dlouhé články nebo multijazyčné aplikace, u nichž je nezbytně nutné omezit velikost bundlu na absolutní minimum.

**Ukázka transformovaného kódu:**

```tsx
// Váš kód
const content = useIntlayer("my-key");

// Příklad optimalizovaného kódu po transformaci (Dynamic)
// Toto je pouze ilustrativní příklad, skutečný kód se kvůli dalším optimalizacím liší
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  cs: () =>
    import(".intlayer/dynamic_dictionary/my-key/cs.json").then(
      (mod) => mod.default
    ),
});
```

> Při použití `importMode: 'dynamic'` pamatujte, že pokud na jedné stránce máte např. 100 komponent volajících `useIntlayer`, prohlížeč vyvolá hned 100 oddělených stahování. Abyste předešli takovému zahlcení (tzv. "waterfall"), pokuste se seskupit obsah do méně souborů `.content` (např. jeden slovník pro celou sekci), namísto abyste dělali samostatný slovník pro úplně každou malou součástku na stránce. Stejně tak platí, že si můžete připravit i více `.content` souborů majících stejný klíč – Intlayer je sám sloučí do jedné velké struktury (jediného slovníku).

### 3. Fetch režim (Fetch Mode)

Z pohledu chování jde o něco velice podobného dynamickému režimu, avšak nejdříve se vždy zkusí stáhnout slovníky přímo z Intlayer Live Sync API. Jestliže API spojení selže, nebo jestliže příslušný obsah není označen k živé aktualizaci (live updates), vrátí se aplikace automaticky ke stažení přes dynamický import.

**Ukázka transformovaného kódu:**

```tsx
// Váš kód
const content = useIntlayer("my-key");

// Příklad optimalizovaného kódu (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  cs: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/cs").then((res) =>
      res.json()
    ),
});
```

> Další informace hledejte přímo v dokumentaci k CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/cs/intlayer_CMS.md)

> Při zapnutém Fetch režimu neprobíhá žádný purge (čištění) ani minifikace, jelikož JSON poskytuje samotné externí API pod jeho původními názvy atributů.

## Shrnutí: Statický vs Dynamický

| Vlastnost              | Statický režim (Static Mode)                   | Dynamický režim (Dynamic Mode)              |
| :--------------------- | :--------------------------------------------- | :------------------------------------------ |
| **Velikost JS Bundlu** | Větší (Zahrnuje všechny jazyky pro komponentu) | Nejmenší (Obsahuje pouze kód, žádný obsah)  |
| **Při načtení**        | Okamžitě (Obsah je rovnou součástí bundlu)     | Mírná zpoždění (Sťahuje dodatečné JSON)     |
| **Síťové požadavky**   | 0 požadavků navíc                              | 1 požadavek pro každý klíč slovníku         |
| **Tree Shaking**       | Pouze na úrovni jednotlivých komponent         | Na úrovni komponent i na úrovni jazyka      |
| **Nejlepší scénář**    | Uživatelské prvky UI, jednodušší malé aplikace | Rozsáhlé textové strany a vícejazyčné celky |
