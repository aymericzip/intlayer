---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: i18n بنڈل سائز اور کارکردگی کی آپٹیمائزیشن
description: انٹرنیشنلائزیشن (i18n) مواد کو آپٹیمائز کرکے اپنی ایپلیکیشن کے بنڈل سائز کو کم کریں۔ جانیں کہ Intlayer کے ساتھ ڈکشنریوں کے لیے ٹری شیکنگ (tree shaking) اور لیزی لوڈنگ (lazy loading) کا استعمال کیسے کریں۔
keywords:
  - Bundle Optimisation
  - Content Automation
  - Dynamic Content
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
    changes: "Babel/Webpack کے لیے `intlayerPurgeBabelPlugin` اور `intlayerMinifyBabelPlugin` شامل کیا گیا؛ پلگ ان پائپ لائن کو واضح کیا گیا"
  - version: 8.7.0
    date: 2026-04-08
    changes: "بلڈ کنفیگریشن میں `minify` اور `purge` آپشنز شامل کیے گئے"
author: aymericzip
---

# i18n بنڈل سائز اور کارکردگی کی آپٹیمائزیشن

روایتی i18n سلوشنز جو JSON فائلوں پر انحصار کرتے ہیں، ان کے ساتھ ایک سب سے عام چیلنج مواد کے سائز کا انتظام (management) کرنا ہے۔ اگر ڈیویلپرز دستی (manually) طور پر مواد کو نیم اسپیسز (namespaces) میں الگ نہیں کرتے ہیں، تو صارفین اکثر ہر صفحے اور ممکنہ طور پر ہر زبان کے ترجمے ڈاؤن لوڈ کر لیتے ہیں، صرف ایک صفحہ دیکھنے کے لیے۔

مثال کے طور پر، 10 زبانوں میں ترجمہ شدہ 10 صفحات والی ایپلیکیشن کے نتیجے میں صارف 100 صفحات کے مواد کو ڈاؤن لوڈ کر سکتا ہے، حالانکہ اسے صرف **ایک** کی ضرورت ہوتی ہے (موجودہ زبان میں موجودہ صفحہ)۔ اس سے بینڈوڈتھ (bandwidth) ضائع ہوتی ہے اور لوڈ ہونے میں زیادہ وقت لگتا ہے۔

**Intlayer اس مسئلے کو بلڈ ٹائم آپٹیمائزیشن کے ذریعے حل کرتا ہے۔** یہ آپ کے کوڈ کا تجزیہ (analyze) کرتا ہے تاکہ معلوم کیا جا سکے کہ ہر جزو (component) کے لیے بالکل کون سی ڈکشنریاں استعمال ہو رہی ہیں، اور آپ کے بنڈل میں صرف ضروری مواد کو دوبارہ انجیکٹ (re-inject) کرتا ہے۔

## فہرستِ مضامین

<TOC />

## اپنے بنڈل کا تجزیہ کریں

"بھاری" JSON فائلوں اور کوڈ-اسپلٹنگ کے مواقع کی نشاندہی کرنے کا پہلا قدم آپ کے بنڈل کا تجزیہ کرنا ہے۔ یہ ٹولز آپ کی ایپلیکیشن کے مرتب شدہ (compiled) کوڈ کا ایک بصری ٹری میپ (treemap) تیار کرتے ہیں، جس سے آپ دیکھ سکتے ہیں کہ کون سی لائبریریاں سب سے زیادہ جگہ لے رہی ہیں۔

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite اندرونِ خانہ Rollup استعمال کرتا ہے۔ `rollup-plugin-visualizer` ایک انٹرایکٹو HTML فائل بناتا ہے جو آپ کے گراف میں ہر ماڈیول کا سائز دکھاتا ہے۔

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // خود بخود رپورٹ براؤزر میں کھولیں
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

ایسے پروجیکٹس جو App Router اور Turbopack استعمال کرتے ہیں، ان کے لیے Next.js ایک بلٹ ان (built-in)، تجرباتی اینالائزر فراہم کرتا ہے جسے کسی اضافی ڈیپینڈنسی (dependency) کی ضرورت نہیں ہوتی۔

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

اگر آپ Next.js میں ڈیفالٹ Webpack بنڈلر استعمال کر رہے ہیں تو آفیشل بنڈل اینالائزر استعمال کریں۔ اپنی بلڈ کے دوران ایک انوائرنمنٹ ویری ایبل (environment variable) سیٹ کر کے اسے ٹرگر کریں۔

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
  // آپ کا Next.js کنفیگ
});
```

**استعمال:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standard Webpack

Create React App (ejected)، Angular، یا کسٹم Webpack سیٹ اپ کے لیے، انڈسٹری اسٹینڈرڈ `webpack-bundle-analyzer` کا استعمال کریں۔

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

## یہ کیسے کام کرتا ہے

Intlayer ایک **فی جزو (per-component)** طریقہ کار استعمال کرتا ہے۔ عالمی (global) JSON فائلوں کے برعکس، آپ کا مواد آپ کے اجزاء (components) کے ساتھ یا ان کے اندر وضع (define) کیا جاتا ہے۔ بلڈ کے عمل کے دوران، Intlayer مندرجہ ذیل کام کرے گا:

1. `useIntlayer` کی کالز کو تلاش کرنے کے لیے آپ کے کوڈ کا **تجزیہ (Analyze)** کرے گا۔
2. متعلقہ ڈکشنری کا مواد **تیار (Build)** کرے گا۔
3. آپ کی کنفیگریشن کے مطابق آپٹیمائز شدہ کوڈ کے ساتھ `useIntlayer` کی کال کو **تبدیل (Replace)** کر دے گا۔

یہ یقینی بناتا ہے کہ:

- اگر کسی جزو کو درآمد (import) نہیں کیا گیا ہے، تو اس کا مواد بنڈل میں شامل نہیں ہوگا (Dead Code Elimination)۔
- اگر کوئی جزو لیزی لوڈ (lazy-loaded) ہے، تو اس کا مواد بھی لیزی لوڈ ہوگا۔

## پلگ ان کا حوالہ (Plugin Reference)

Intlayer کا بلڈ آپٹیمائزیشن کئی الگ الگ پلگ انز میں تقسیم ہے، جن میں سے ہر ایک کی صرف ایک ذمہ داری ہے۔ ہر ایک پلگ ان کیا کرتا ہے اسے سمجھنے سے انہیں ترتیب دیتے وقت الجھن سے بچا جا سکتا ہے۔

### Babel پلگ انز (`@intlayer/babel`)

یہ براہ راست Webpack پر مبنی سیٹ اپس کے لیے `babel.config.js` میں استعمال ہوتے ہیں (جیسے Babel کے ساتھ Next.js، CRA، کسٹم Webpack وغیرہ)۔

| پلگ ان                        | یہ کیا کرتا ہے                                                                                                                                              |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | `.content.ts` فائلوں کو اسکین کرتا ہے اور مرتب کی گئی (compiled) ڈکشنریوں کو `.intlayer/` میں لکھتا ہے                                                      |
| `intlayerOptimizeBabelPlugin` | `useIntlayer('key')` کو `useDictionary(hash)` میں بدل دیتا ہے اور متعلقہ ڈکشنری کا `import` شامل (inject) کرتا ہے                                           |
| `intlayerPurgeBabelPlugin`    | تمام سورس (source) فائلوں کو اسکین کرتا ہے، مرتب شدہ `.intlayer/**/*.json` ڈکشنری فائلوں سے **غیر استعمال شدہ مواد (unused content fields)** کو ہٹا دیتا ہے |
| `intlayerMinifyBabelPlugin`   | JSON فائلوں اور سورس کوڈ دونوں میں **مواد کی فیلڈ کیز (keys) کا نام بدل کر** چھوٹے حروف تہجی (alias) رکھ دیتا ہے (جیسے `title` → `a`)                       |

> **پلگ ان کی ترتیب اہم ہے۔** آپ کے `babel.config.js` میں purge اور minify کے پلگ انز کا optimize پلگ ان سے **پہلے** ہونا لازمی ہے۔ optimize مرحلہ (pass) `useIntlayer('key')` کو ایک مبہم `useDictionary(hash)` کال سے بدل دیتا ہے، جس سے ڈکشنری کی (key) کی وہ معلومات مٹ جاتی ہے جس کی purge اور minify مراحل کو ضرورت ہوتی ہے تاکہ وہ جان سکیں کہ کون سی فیلڈز استعمال ہو رہی ہیں۔

ہر Babel پلگ ان کے ساتھ ایک آپشنز ہیلپر (options helper) منسلک ہوتا ہے جو کنفیگ لوڈ ہونے کے وقت ایک بار آپ کے `intlayer.config.ts` کو پڑھتا ہے اور پہلے سے حل شدہ (pre-resolved) ویلیوز (values) واپس کرتا ہے:

| آپشنز ہیلپر (Options helper) | کس کے ساتھ استعمال ہوتا ہے    |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite پلگ انز (`vite-intlayer`)

Vite کے صارفین **انہیں کبھی بھی براہ راست کنفیگر نہیں کرتے**۔ جب آپ `vite.config.ts` میں `withIntlayer()` کو کال کرتے ہیں تو یہ خود بخود وائر اپ ہو جاتے ہیں۔ `intlayer.config.ts` میں موجود `build.purge` اور `build.minify` فلیگز بغیر کسی اضافی پلگ ان رجسٹریشن کے اس رویے (behaviour) کو ٹوگل (toggle) کرتے ہیں۔

| اندرونی Vite پلگ ان | مساوی رویہ (Equivalent behaviour)                                                               |
| :------------------ | :---------------------------------------------------------------------------------------------- |
| Usage analyzer      | بالکل `intlayerPurgeBabelPlugin` کے تجزیاتی (analyse) مرحلے کی طرح                              |
| Dictionary prune    | بالکل `intlayerPurgeBabelPlugin` کے JSON رائٹ (write) مرحلے کی طرح                              |
| Dictionary minify   | بالکل `intlayerMinifyBabelPlugin` کے JSON رائٹ مرحلے کی طرح                                     |
| Babel transform     | بالکل `intlayerMinifyBabelPlugin` کے سورس کوڈ کے رینیم اور `intlayerOptimizeBabelPlugin` کی طرح |

## پلیٹ فارم کے لحاظ سے سیٹ اپ

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js کو آپٹیمائز پاس (import rewrite) کے لیے `@intlayer/swc` پلگ ان کی ضرورت ہوتی ہے، کیونکہ Next.js بلڈز کے لیے SWC کا استعمال کرتا ہے۔

> یہ پلگ ان بائی ڈیفالٹ انسٹال نہیں ہوتا کیونکہ SWC کے پلگ انز Next.js کے لیے اب بھی تجرباتی مراحل میں ہیں۔ یہ مستقبل میں بدل سکتا ہے۔

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

انسٹال ہونے کے بعد، Intlayer خود بخود پلگ ان کو شناخت کر کے اس کا استعمال شروع کر دے گا۔

**purge اور minify** مراحل (فیلڈ کو ہٹانے اور رینیم کرنے) کے لیے، اس کے ساتھ `@intlayer/babel` انسٹال کریں اور Babel کے پلگ انز کو شامل کریں۔ چونکہ Next.js ٹرانسفارمیشن کے لیے SWC استعمال کرتا ہے لیکن پھر بھی پلگ ان کنفیگریشن کے لیے `babel.config.js` کو ایویلیوایٹ (evaluate) کرتا ہے، اس لیے Babel پلگ انز SWC سے پہلے ایک پری-پاس (pre-pass) کے طور پر چلتے ہیں۔

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
    // Purge: غیر استعمال شدہ مواد کو .intlayer/**/*.json سے ہٹا دیں
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: JSON اور سورس کوڈ میں مواد کی فیلڈ کیز کا نام بدلیں
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // نوٹ: intlayerOptimizeBabelPlugin کی یہاں ضرورت نہیں ہے کیونکہ
    // @intlayer/swc اسے useIntlayer → useDictionary ری رائٹ کو سنبھالتا ہے۔
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite `@intlayer/babel` کا پلگ ان استعمال کرتا ہے، جسے `vite-intlayer` کی ڈیپینڈنسی کے طور پر شامل کیا گیا ہے۔ پوری آپٹیمائزیشن پائپ لائن — امپورٹ ری رائٹ (import rewrite)، پرج (purge)، اور منی فائی (minify) — بائی ڈیفالٹ فعال ہے اور اس کے لیے کسی اضافی پلگ ان رجسٹریشن کی ضرورت نہیں ہے۔

اپنے `intlayer.config.ts` میں متعلقہ فلیگز (flags) سیٹ کر کے پرج اور منی فائی کو فعال کریں:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // بنڈل کیے گئے JSON سے غیر استعمال شدہ مواد کو ہٹا دیں
    minify: true, // مواد کی فیلڈ کیز کو چھوٹے عرفی ناموں (aliases) میں بدل دیں
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (اور Next.js بیبل (Babel) کے ساتھ)

`@intlayer/babel` انسٹال کریں:

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

چاروں پلگ انز کو مناسب ترتیب میں `babel.config.js` کے اندر شامل کریں:

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
    // Extract: compile .content.ts files → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: remove unused fields from .intlayer/**/*.json
    //    (intlayer.config.ts میں موجود build.purge فلیگ کو پڑھتا ہے)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: rename field keys in JSON + source code
    //    (intlayer.config.ts میں موجود build.minify فلیگ کو پڑھتا ہے)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: rewrite useIntlayer('key') → useDictionary(hash)
    //    یہ سب سے آخر میں ہونا چاہیے کیونکہ یہ ڈکشنری کی (key) کو مٹا دیتا ہے۔
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## کنفیگریشن

آپ یہ کنٹرول کر سکتے ہیں کہ Intlayer آپ کے بنڈل کو کس طرح آپٹیمائز کرتا ہے، یہ آپ کی `intlayer.config.ts` کی فلیگ `build` کی پراپرٹی کا استعمال کر کے کیا جا سکتا ہے۔

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.URDU],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // بلڈ ٹائم پر useIntlayer() کالز کو براہ راست ڈکشنری امپورٹس (imports) سے بدل دیں۔
    // undefined = خودکار (پروڈکشن میں فعال)، true = ہمیشہ، false = کبھی نہیں۔
    optimize: undefined,

    // مرتب شدہ ڈکشنریوں میں موجود مواد کی فیلڈ کیز کا نام چھوٹے حروفِ تہجی
    // عرفی ناموں (مثلاً title → a) میں تبدیل کریں۔ اس سے JSON کا سائز کم ہوتا ہے؛ اس کے لیے optimize کی ضرورت ہوتی ہے۔
    minify: true,

    // سورس کوڈ میں ان مواد کی فیلڈز کو ہٹا دیں جو کبھی ایکسیس نہیں ہوتی ہیں۔
    // اس کے لیے optimize کی ضرورت ہوتی ہے۔
    purge: true,
  },
};

export default config;
```

> زیادہ تر معاملات میں `optimize` کے لیے ڈیفالٹ ویلیو (`undefined`) رکھنا تجویز کیا جاتا ہے۔

> تمام آپشنز کے لیے کنفیگریشن کا حوالہ دیکھیں: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md)

### بلڈ کے آپشنز (Build Options)

| پراپرٹی        | قسم (Type)            | ڈیفالٹ      | تفصیل (Description)                                                                                                                                                                                                                         |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean / undefined` | `undefined` | امپورٹ ری رائٹ (import rewrite) پاس کو فعال بناتا ہے۔ `undefined` = صرف پروڈکشن بلڈز میں فعال ہوتا ہے۔ `false` کرنے پر پرج (purge) اور منی فائی (minify) بھی غیر فعال ہو جاتے ہیں۔                                                          |
| **`minify`**   | `boolean`             | `false`     | مرتب شدہ JSON فائلوں میں مواد کی فیلڈ کیز (keys) کو چھوٹے حروف تہجی والے عرفی ناموں (aliases) میں بدل دیتا ہے۔ سورس کوڈ میں بھی ملنے والی پراپرٹی ایکسیسز کو تبدیل کرتا ہے۔ اگر `optimize` کی ویلیو `false` ہو تو اس کا کوئی اثر نہیں ہوتا۔ |
| **`purge`**    | `boolean`             | `false`     | مرتب شدہ JSON فائلوں سے ان مواد کی فیلڈز کو ہٹا دیتا ہے جن تک سورس کوڈ میں کبھی بھی رسائی نہیں کی گئی۔ اگر `optimize` کی ویلیو `false` ہو تو اس کا کوئی اثر نہیں ہوتا۔                                                                      |

### منی فیکیشن (فیلڈ کی کا نام بدلنا)

`build.minify` آپ کے JavaScript بنڈل کو منی فائی **نہیں** کرتا — یہ کام آپ کا بنڈلر کرتا ہے۔ اس کے بجائے، یہ ہر یوزر کے ڈیفائن کردہ مواد کی فیلڈ کی (key) کو ایک چھوٹے حروف تہجی عرفی نام (alias) میں بدل کر مرتب شدہ ڈکشنری کی JSON فائلوں کو سکیڑتا ہے:

```
// منی فیکیشن سے پہلے
{ "title": "ہیلو", "subtitle": "دنیا" }

// منی فیکیشن کے بعد
{ "a": "ہیلو", "b": "دنیا" }
```

اسی طرح سورس کوڈ میں موجود تمام پراپرٹی ایکسیس پر بھی یہی تبدیلی لاگو ہوتی ہے، اس لیے مرتب شدہ آؤٹ پٹ میں `content.title` بدل کر `content.a` بن جاتا ہے۔ رن ٹائم کا رویہ مکمل طور پر یکساں رہتا ہے۔

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> منی فیکیشن کو چھوڑ (skipped) دیا جاتا ہے جب `optimize` کی ویلیو `false` ہو، یا جب `editor.enabled` کی ویلیو `true` ہو (ویژول ایڈیٹر کو ایڈیٹنگ کی اجازت دینے کے لیے اصل فیلڈ کے ناموں کی ضرورت ہوتی ہے)۔

> منی فیکیشن ان ڈکشنریوں کے لیے بھی نظرانداز کی جاتی ہے جنہیں `importMode: 'fetch'` کے ذریعے لوڈ کیا گیا ہو کیونکہ ان کا JSON ریموٹ API سے اصل فیلڈ ناموں کے ساتھ پیش کیا جاتا ہے — کلائنٹ سائیڈ کیز کا نام بدلنے سے سرور/کلائنٹ کا کنٹریکٹ (contract) ٹوٹ جائے گا۔

### پرجنگ (غیر استعمال شدہ فیلڈز کو ہٹانا)

`build.purge` تجزیہ کرتا ہے کہ سورس کوڈ میں دراصل کن مواد کی فیلڈز تک رسائی حاصل کی گئی ہے اور باقی تمام فیلڈز کو مرتب شدہ JSON فائلوں سے ہٹا دیتا ہے۔

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**مثال:** پانچ فیلڈز پر مشتمل ایک ڈکشنری جس میں سے صرف دو استعمال ہوئی ہوں:

```
// پرج کرنے سے پہلے
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// پرج کرنے کے بعد (سورس کوڈ میں صرف title + subtitle ایکسیس ہوئے)
{ "title": "…", "subtitle": "…" }
```

> جب `optimize` کی ویلیو `false` ہو یا جب `editor.enabled` کی ویلیو `true` ہو تو پرجنگ (Purging) چھوڑ (skipped) دی جاتی ہے۔

> پرجنگ کو حفاظتی تدابیر (conservatively) کے طور پر ان حالات میں بھی چھوڑ دیا جاتا ہے جب کوئی سورس فائل پارس (parse) نہیں ہو پاتی، یا جب `useIntlayer` کا نتیجہ کسی ویری ایبل کو تفویض (assign) کر دیا جائے اور پھر ان طریقوں سے آگے بڑھایا جائے جن کا اسٹیٹک اینالائزر کھوج نہیں لگا سکتا (جیسے اسپریڈ کو کسی آبجیکٹ میں ڈالنا، ڈسٹرکچر کیے بغیر پروپ کے طور پر بھیجنا)۔ ان صورتوں میں، مکمل ڈکشنری محفوظ رکھی جاتی ہے۔

### امپورٹ موڈ (Import Mode)

بڑی ایپلیکیشنز، جن میں متعدد صفحات اور مقامات (locales) شامل ہوں، ان کا JSON بنڈل کے سائز کا ایک اہم حصہ ہو سکتا ہے۔ Intlayer آپ کو یہ اختیار دیتا ہے کہ آپ `importMode` کا استعمال کرتے ہوئے ڈکشنری کے لوڈ ہونے کے طریقہ کار کو کنٹرول کریں۔

### عالمی (Global) تعریف

امپورٹ موڈ کو آپ کی `intlayer.config.ts` فائل میں عالمی سطح پر ڈیفائن کیا جا سکتا ہے۔

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // ڈیفالٹ 'static' ہے
  },
};

export default config;
```

### فی ڈکشنری (Per-dictionary) کی تعریف

آپ کسی بھی انفرادی ڈکشنری کے لیے اس کی `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` فائل کے ذریعے امپورٹ موڈ کو اوور رائڈ (override) کر سکتے ہیں۔

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // ڈیفالٹ امپورٹ موڈ کو اوور رائڈ کریں
  content: {
    // ...
  },
};

export default appContent;
```

| پراپرٹی          | قسم (Type)                         | ڈیفالٹ     | تفصیل (Description)                                                                                                                            |
| :--------------- | :--------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **منسوخ (Deprecated)**: اس کی جگہ `dictionary.importMode` استعمال کریں۔ اس بات کا تعین کرتا ہے کہ ڈکشنریاں کیسے لوڈ ہوں گی (نیچے ملاحظہ کریں)۔ |

`importMode` کی سیٹنگ یہ طے کرتی ہے کہ ڈکشنری کا مواد آپ کے جزو (component) میں کیسے شامل ہوگا۔ آپ اسے عالمی سطح پر `intlayer.config.ts` میں `dictionary` آبجیکٹ کے تحت رکھ سکتے ہیں یا پھر کسی ایک مخصوص ڈکشنری کے لیے اس کی `.content.ts` فائل میں اوور رائڈ کر سکتے ہیں۔

### 1. اسٹیٹک موڈ (Static Mode - `default`)

اسٹیٹک موڈ میں، Intlayer `useIntlayer` کی جگہ پر `useDictionary` رکھ دیتا ہے اور ڈکشنری کو براہ راست JavaScript بنڈل میں انجیکٹ کر دیتا ہے۔

- **فوائد:** فوری رینڈرنگ (سنکرونس - synchronous)، ہائیڈریشن (hydration) کے دوران کسی اضافی نیٹ ورک ریکویسٹ (network request) کی ضرورت نہیں پڑتی۔
- **نقصانات:** اس بنڈل میں متعلقہ جزو کے لیے دستیاب **تمام** زبانوں کا ترجمہ شامل ہوتا ہے۔
- **بہترین استعمال:** سنگل پیج ایپلیکیشنز (SPA) کے لیے۔

**ٹرانسفارم ہونے کے بعد کوڈ کی مثال:**

```tsx
// آپ کا کوڈ
const content = useIntlayer("my-key");

// ٹرانسفارم ہونے کے بعد آپٹیمائز شدہ کوڈ کی مثال (اسٹیٹک)
// یہ صرف وضاحت کے لیے ہے، اصل کوڈ آپٹیمائزیشن کے مقاصد کی وجہ سے مختلف ہو سکتا ہے
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      ur: "میرا عنوان",
    },
  },
});
```

### 2. ڈائنامک موڈ (Dynamic Mode)

ڈائنامک موڈ میں، Intlayer `useIntlayer` کی جگہ پر `useDictionaryAsync` رکھ دیتا ہے۔ یہ خصوصاً متعلقہ زبان (locale) کے JSON کو لیزی-لوڈ کرنے کے لیے `import()` (جو سسپنس جیسی تکنیک ہے) کا استعمال کرتا ہے۔

- **فوائد:** **لوکیل-لیول ٹری شیکنگ (Locale-level tree shaking)۔** جو صارف انگریزی ورژن دیکھ رہا ہے، وہ _صرف_ انگریزی ڈکشنری ہی ڈاؤن لوڈ کرے گا۔ اردو ڈکشنری لوڈ نہیں کی جائے گی۔
- **نقصانات:** ہائیڈریشن کے دوران ہر جزو (component) کے لیے ایک نیٹ ورک ریکویسٹ (نیٹ ورک فیچ) بھیجی جاتی ہے۔
- **بہترین استعمال:** متن سے بھرپور حصوں، مضامین، یا ایسی بڑی ایپلیکیشنز کے لیے جہاں زبانوں کی تعداد بہت زیادہ ہو اور بنڈل کا سائز بہت اہمیت رکھتا ہو۔

**ٹرانسفارم ہونے کے بعد کوڈ کی مثال:**

```tsx
// آپ کا کوڈ
const content = useIntlayer("my-key");

// ٹرانسفارم ہونے کے بعد آپٹیمائز شدہ کوڈ کی مثال (ڈائنامک)
// یہ صرف وضاحت کے لیے ہے، اصل کوڈ آپٹیمائزیشن کے مقاصد کی وجہ سے مختلف ہو سکتا ہے
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  ur: () =>
    import(".intlayer/dynamic_dictionary/my-key/ur.json").then(
      (mod) => mod.default
    ),
});
```

> `importMode: 'dynamic'` کے استعمال کے دوران، اگر ایک صفحے پر آپ کے پاس 100 ایسے اجزاء ہیں جو `useIntlayer` کو کال کر رہے ہیں، تو براؤزر 100 الگ الگ ریکویسٹ بھیجنے کی کوشش کرے گا۔ اس ریکویسٹ کی "آبشار (waterfall)" سے بچنے کے لیے، بہتر ہے کہ مواد کو چھوٹے چھوٹے ایٹم اجزاء کی بجائے چند بڑے حصوں (جیسے کہ ایک سیکشن کے لیے ایک ڈکشنری) میں وضع کریں۔ آپ مختلف `.content` فائلوں کے لیے ایک جیسی کی (key) بھی استعمال کر سکتے ہیں۔ Intlayer انہیں ایک واحد ڈکشنری میں ضم کر دے گا۔

### 3. فیچ موڈ (Fetch Mode)

یہ موڈ بالکل ڈائنامک موڈ کی طرح برتاؤ کرتا ہے لیکن پہلے Intlayer Live Sync API سے ڈکشنری کو لانے (fetch کرنے) کی کوشش کرتا ہے۔ اگر API کال ناکام ہو جائے یا مواد لائیو اپڈیٹ کے لیے نشان زد (marked) نہ ہو، تو یہ واپس ڈائنامک امپورٹ کی طرف چلا جاتا ہے (fallback)۔

**ٹرانسفارم ہونے کے بعد کوڈ کی مثال:**

```tsx
// آپ کا کوڈ
const content = useIntlayer("my-key");

// آپٹیمائز شدہ کوڈ کی مثال (فیچ)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  ur: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/ur").then((res) =>
      res.json()
    ),
});
```

> مزید تفصیلات کے لیے CMS کی دستاویزات دیکھیں: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/intlayer_CMS.md)

> فیچ موڈ میں، پرج (purge) اور منی فائی (minify) کو استعمال نہیں کیا جا سکتا کیونکہ JSON کو ریموٹ API کی مدد سے اصل ناموں (original field names) کے ذریعے پیش کیا جاتا ہے۔

## خلاصہ: اسٹیٹک بمقابلہ ڈائنامک

| خصوصیت                      | اسٹیٹک موڈ (Static Mode)                    | ڈائنامک موڈ (Dynamic Mode)               |
| :-------------------------- | :------------------------------------------ | :--------------------------------------- |
| **JS بنڈل کا سائز**         | زیادہ بڑا (تمام زبانوں کے مواد پر مشتمل)    | سب سے چھوٹا (صرف کوڈ، کوئی مواد نہیں)    |
| **شروعاتی لوڈنگ**           | فوری (مواد پہلے سے ہی بنڈل کے اندر ہوتا ہے) | تھوڑی تاخیر (JSON کو فیچ کیا جاتا ہے)    |
| **نیٹ ورک ریکویسٹس**        | 0 اضافی ریکویسٹ                             | 1 ریکویسٹ فی ڈکشنری کی (key)             |
| **ٹری شیکنگ**               | صرف کمپوننٹ کی حد تک                        | کمپوننٹ اور لوکیل دونوں کے لیے           |
| **بہترین استعمال کا میدان** | UI کمپوننٹس، اور چھوٹی ایپس                 | ٹیکسٹ سے بھرپور صفحات، کثیر اللسانی ایپس |
