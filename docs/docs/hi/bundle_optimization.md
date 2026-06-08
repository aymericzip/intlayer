---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: i18n बंडल साइज़ और परफॉरमेंस ऑप्टिमाइज़ेशन
description: अंतर्राष्ट्रीयकरण (i18n) कंटेंट को ऑप्टिमाइज़ करके अपने एप्लिकेशन के बंडल साइज़ को कम करें। जानें कि Intlayer के साथ डिक्शनरी के लिए ट्री शेकिंग (tree shaking) और लेज़ी लोडिंग (lazy loading) का उपयोग कैसे करें।
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
    changes: "Babel/Webpack के लिए `intlayerPurgeBabelPlugin` और `intlayerMinifyBabelPlugin` जोड़ा गया; प्लगइन पाइपलाइन को स्पष्ट किया गया"
  - version: 8.7.0
    date: 2026-04-08
    changes: "बिल्ड कॉन्फ़िगरेशन में `minify` और `purge` विकल्प जोड़े गए"
---

# i18n बंडल साइज़ और परफॉरमेंस ऑप्टिमाइज़ेशन

JSON फ़ाइलों पर निर्भर पारंपरिक i18n सॉल्यूशन्स के साथ सबसे आम चुनौतियों में से एक कंटेंट के साइज़ को मैनेज करना है। यदि डेवलपर्स मैन्युअल रूप से कंटेंट को अलग-अलग नेमस्पेस में नहीं बांटते हैं, तो उपयोगकर्ता अक्सर केवल एक पेज देखने के लिए हर पेज के और संभावित रूप से हर भाषा के अनुवाद डाउनलोड कर लेते हैं।

उदाहरण के लिए, 10 भाषाओं में अनुवादित 10 पेजों वाले एप्लिकेशन के परिणामस्वरूप उपयोगकर्ता 100 पेजों का कंटेंट डाउनलोड कर सकता है, भले ही उसे केवल **एक** पेज (वर्तमान भाषा में वर्तमान पेज) की आवश्यकता हो। इससे बैंडविड्थ बर्बाद होती है और लोड होने में अधिक समय लगता है।

**Intlayer इस समस्या को बिल्ड-टाइम ऑप्टिमाइज़ेशन के माध्यम से हल करता है।** यह आपके कोड का विश्लेषण करता है ताकि यह पता लगाया जा सके कि प्रति कंपोनेंट कौन सी डिक्शनरी वास्तव में उपयोग की जा रही हैं और केवल आवश्यक कंटेंट को ही आपके बंडल में फिर से शामिल (re-inject) करता है।

## विषय सूची

<TOC />

## अपने बंडल का विश्लेषण करें

अपने बंडल का विश्लेषण करना "भारी" JSON फ़ाइलों और कोड-स्प्लिटिंग के अवसरों की पहचान करने का पहला कदम है। ये टूल आपके एप्लिकेशन के कंपाइल किए गए कोड का एक विज़ुअल ट्री-मैप (treemap) जनरेट करते हैं, जिससे आप ठीक-ठीक देख सकते हैं कि कौन सी लाइब्रेरी सबसे ज़्यादा जगह ले रही हैं।

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite हुड के नीचे (under the hood) Rollup का उपयोग करता है। `rollup-plugin-visualizer` एक इंटरैक्टिव HTML फ़ाइल जनरेट करता है जो आपके ग्राफ़ में प्रत्येक मॉड्यूल का आकार दिखाती है।

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // अपने ब्राउज़र में रिपोर्ट अपने आप खोलें
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

App Router और Turbopack का उपयोग करने वाले प्रोजेक्ट्स के लिए, Next.js एक अंतर्निहित, प्रायोगिक एनालाइज़र प्रदान करता है जिसके लिए किसी अतिरिक्त डिपेंडेंसी (dependency) की आवश्यकता नहीं होती।

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

यदि आप Next.js में डिफ़ॉल्ट Webpack बंडलर का उपयोग कर रहे हैं, तो आधिकारिक बंडल एनालाइज़र का उपयोग करें। अपने बिल्ड के दौरान एक एनवायरनमेंट वेरिएबल सेट करके इसे ट्रिगर करें।

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
  // आपका Next.js कॉन्फिग
});
```

**उपयोग:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standard Webpack

Create React App (ejected), Angular, या कस्टम Webpack सेटअप के लिए, उद्योग मानक (industry standard) `webpack-bundle-analyzer` का उपयोग करें।

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

## यह कैसे काम करता है

Intlayer एक **प्रति-कंपोनेंट (per-component) दृष्टिकोण** का उपयोग करता है। वैश्विक (global) JSON फ़ाइलों के विपरीत, आपका कंटेंट आपके कंपोनेंट के साथ या उसके भीतर परिभाषित किया जाता है। बिल्ड प्रक्रिया के दौरान, Intlayer यह करेगा:

1. `useIntlayer` कॉल खोजने के लिए आपके कोड का **विश्लेषण** करेगा।
2. संबंधित डिक्शनरी कंटेंट **बनाएगा** (Build)।
3. आपके कॉन्फ़िगरेशन के आधार पर ऑप्टिमाइज़ किए गए कोड के साथ `useIntlayer` कॉल को **बदलेगा**।

यह सुनिश्चित करता है कि:

- यदि कोई कंपोनेंट आयात (import) नहीं किया गया है, तो उसका कंटेंट बंडल में शामिल नहीं होता है (Dead Code Elimination)।
- यदि कोई कंपोनेंट लेज़ी-लोडेड (lazy-loaded) है, तो उसका कंटेंट भी लेज़ी-लोडेड हो जाता है।

## प्लगइन संदर्भ (Plugin Reference)

Intlayer का बिल्ड ऑप्टिमाइज़ेशन कई अलग-अलग प्लगइन्स में विभाजित है, जिनमें से प्रत्येक की एक ही ज़िम्मेदारी है। यह समझने से कि प्रत्येक प्लगइन क्या करता है, उन्हें कॉन्फ़िगर करते समय भ्रम से बचा जा सकता है।

### Babel प्लगइन्स (`@intlayer/babel`)

इनका उपयोग सीधे तौर पर Webpack-आधारित सेटअप (Babel के साथ Next.js, CRA, कस्टम Webpack, आदि) के लिए `babel.config.js` में किया जाता है।

| प्लगइन                        | यह क्या करता है                                                                                                                                     |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | `.content.ts` फ़ाइलों को स्कैन करता है और कंपाइल की गई डिक्शनरी को `.intlayer/` में लिखता है                                                        |
| `intlayerOptimizeBabelPlugin` | `useIntlayer('key')` को `useDictionary(hash)` में फिर से लिखता है (rewrite) और मिलान वाली डिक्शनरी का `import` इंजेक्ट करता है                      |
| `intlayerPurgeBabelPlugin`    | सभी स्रोत (source) फ़ाइलों को स्कैन करता है, संकलित (compiled) `.intlayer/**/*.json` डिक्शनरी फ़ाइलों से **अप्रयुक्त कंटेंट फ़ील्ड** को हटा देता है |
| `intlayerMinifyBabelPlugin`   | JSON फ़ाइलों और स्रोत कोड दोनों में **कंटेंट फ़ील्ड कीज़ (keys) का नाम बदलकर** छोटे अल्फाबेटिकल उपनाम (alias) कर देता है (जैसे `title` → `a`)       |

> **प्लगइन का क्रम महत्वपूर्ण है।** आपके `babel.config.js` में purge और minify प्लगइन ऑप्टिमाइज़ (optimize) प्लगइन से **पहले** आने चाहिए। ऑप्टिमाइज़ पास `useIntlayer('key')` को एक अपारदर्शी (opaque) `useDictionary(hash)` कॉल से बदल देता है, जिससे डिक्शनरी की-की (key) जानकारी मिट जाती है, जिसकी आवश्यकता purge और minify पास को यह पहचानने के लिए होती है कि किन फ़ील्ड्स का उपयोग किया जा रहा है।

प्रत्येक Babel प्लगइन में एक संगत (corresponding) विकल्प सहायक (options helper) होता है जो कॉन्फ़िग लोड के समय एक बार आपके `intlayer.config.ts` को पढ़ता है और पहले से हल (pre-resolved) किए गए मान लौटाता है:

| Options helper               | किसके साथ उपयोग किया जाता है  |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite प्लगइन्स (`vite-intlayer`)

Vite उपयोगकर्ता **इन्हें कभी भी सीधे कॉन्फ़िगर नहीं करते हैं**। जब आप `vite.config.ts` में `withIntlayer()` कॉल करते हैं तो वे स्वचालित रूप से जुड़ जाते हैं। `intlayer.config.ts` में `build.purge` और `build.minify` फ़्लैग किसी अतिरिक्त प्लगइन पंजीकरण (registration) के बिना संगत (corresponding) व्यवहार को टॉगल करते हैं।

| इंटरनल Vite प्लगइन | समकक्ष व्यवहार (Equivalent behaviour)                                                          |
| :----------------- | :--------------------------------------------------------------------------------------------- |
| Usage analyzer     | `intlayerPurgeBabelPlugin` के एनालाइज़ (analyse) पास के समान                                   |
| Dictionary prune   | `intlayerPurgeBabelPlugin` के JSON राइट पास के समान                                            |
| Dictionary minify  | `intlayerMinifyBabelPlugin` के JSON राइट पास के समान                                           |
| Babel transform    | `intlayerMinifyBabelPlugin` के स्रोत कोड का नाम बदलने और `intlayerOptimizeBabelPlugin` के समान |

## प्लेटफ़ॉर्म के अनुसार सेटअप

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js को ऑप्टिमाइज़ (import rewrite) पास के लिए `@intlayer/swc` प्लगइन की आवश्यकता होती है, क्योंकि Next.js बिल्ड के लिए SWC का उपयोग करता है।

> यह प्लगइन डिफ़ॉल्ट रूप से इंस्टॉल नहीं होता है क्योंकि SWC प्लगइन्स अभी भी Next.js के लिए प्रायोगिक (experimental) हैं। भविष्य में यह बदल सकता है।

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

एक बार इंस्टॉल हो जाने पर, Intlayer स्वचालित रूप से प्लगइन का पता लगाएगा और उसका उपयोग करेगा।

**purge और minify** पास (फ़ील्ड हटाना और फ़ील्ड का नाम बदलना) के लिए, इसके साथ `@intlayer/babel` इंस्टॉल करें और Babel प्लगइन्स जोड़ें। क्योंकि Next.js ट्रांसफ़ॉर्मेशन के लिए SWC का उपयोग करता है लेकिन फिर भी प्लगइन कॉन्फ़िगरेशन के लिए `babel.config.js` का मूल्यांकन (evaluates) करता है, Babel प्लगइन्स SWC से पहले एक प्री-पास के रूप में चलते हैं।

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
    // Purge: .intlayer/**/*.json से अप्रयुक्त कंटेंट फ़ील्ड हटाएँ
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: JSON + स्रोत कोड में कंटेंट फ़ील्ड कीज़ (keys) का नाम बदलें
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // नोट: यहाँ intlayerOptimizeBabelPlugin की आवश्यकता नहीं है क्योंकि
    // @intlayer/swc ही useIntlayer → useDictionary रीराइट (rewrite) को संभालता है।
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite `@intlayer/babel` प्लगइन का उपयोग करता है, जिसे `vite-intlayer` की डिपेंडेंसी के रूप में शामिल किया गया है। पूर्ण ऑप्टिमाइज़ेशन पाइपलाइन — इम्पोर्ट रीराइट, पर्ज और मिनिफ़ाई — डिफ़ॉल्ट रूप से सक्षम है और इसके लिए किसी अतिरिक्त प्लगइन पंजीकरण (registration) की आवश्यकता नहीं है।

`intlayer.config.ts` में संगत फ़्लैग सेट करके purge और minify को सक्षम करें:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // बंडल किए गए JSON से अप्रयुक्त (unused) कंटेंट फ़ील्ड हटाएँ
    minify: true, // कंटेंट फ़ील्ड कीज़ का नाम बदलकर छोटे उपनाम (aliases) करें
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (और Babel के साथ Next.js)

`@intlayer/babel` इंस्टॉल करें:

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

सभी चार प्लगइन्स को सही क्रम में `babel.config.js` में जोड़ें:

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
    // Extract: .content.ts फ़ाइलों को संकलित (compile) करें → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: .intlayer/**/*.json से अप्रयुक्त (unused) फ़ील्ड हटाएँ
    //    (intlayer.config.ts में मौजूद build.purge फ़्लैग को पढ़ता है)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: JSON + स्रोत कोड में फ़ील्ड कीज़ का नाम बदलें
    //    (intlayer.config.ts में मौजूद build.minify फ़्लैग को पढ़ता है)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: useIntlayer('key') → useDictionary(hash) को फिर से लिखें
    //    इसे अंत में आना चाहिए क्योंकि यह डिक्शनरी की (key) को मिटा देता है।
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## कॉन्फ़िगरेशन

आप अपने `intlayer.config.ts` में `build` प्रॉपर्टी के ज़रिए यह नियंत्रित कर सकते हैं कि Intlayer आपके बंडल को कैसे ऑप्टिमाइज़ करे।

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.HINDI],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // बिल्ड-टाइम पर useIntlayer() कॉल को सीधे डिक्शनरी आयात (imports) से बदलें।
    // undefined = ऑटो (प्रोडक्शन में सक्षम), true = हमेशा, false = कभी नहीं।
    optimize: undefined,

    // संकलित डिक्शनरी में कंटेंट फ़ील्ड कीज़ का नाम छोटे अल्फाबेटिकल
    // उपनामों (aliases) (जैसे title → a) में बदलें। JSON साइज़ कम करता है; optimize की आवश्यकता है।
    minify: true,

    // ऐसे कंटेंट फ़ील्ड हटाएँ जिन्हें स्रोत कोड में कभी एक्सेस नहीं किया जाता है।
    // optimize की आवश्यकता है।
    purge: true,
  },
};

export default config;
```

> ज़्यादातर मामलों में `optimize` के लिए डिफ़ॉल्ट मान (`undefined`) रखने की अनुशंसा की जाती है।

> सभी विकल्पों के लिए कॉन्फ़िगरेशन संदर्भ देखें: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

### बिल्ड विकल्प

| प्रॉपर्टी      | प्रकार                 | डिफ़ॉल्ट    | विवरण                                                                                                                                                                                                                               |
| :------------- | :--------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | इम्पोर्ट रीराइट (import rewrite) पास को सक्षम करता है। `undefined` = केवल प्रोडक्शन बिल्ड में सक्रिय। `false` पर्ज (purge) और मिनिफ़ाई (minify) को भी अक्षम कर देता है।                                                             |
| **`minify`**   | `boolean`              | `false`     | संकलित JSON फ़ाइलों में कंटेंट फ़ील्ड कीज़ का नाम छोटे अल्फाबेटिकल उपनामों (aliases) में बदल देता है। स्रोत कोड में मेल खाने वाले प्रॉपर्टी एक्सेस को भी फिर से लिखता है। जब `optimize` `false` हो तो इसका कोई प्रभाव नहीं होता है। |
| **`purge`**    | `boolean`              | `false`     | संकलित JSON फ़ाइलों से उन कंटेंट फ़ील्ड्स को हटा देता है जिन्हें स्रोत कोड में कभी भी स्थिर (statically) रूप से एक्सेस नहीं किया जाता है। जब `optimize` `false` हो तो इसका कोई प्रभाव नहीं होता है।                                 |

### Minification (फ़ील्ड की का नाम बदलना)

`build.minify` आपके JavaScript बंडल को **मिनिफ़ाई नहीं करता है** — आपका बंडलर वह काम संभालता है। इसके बजाय, यह उपयोगकर्ता द्वारा परिभाषित प्रत्येक कंटेंट फ़ील्ड की (key) को एक छोटे अल्फाबेटिकल उपनाम (alias) से बदलकर संकलित डिक्शनरी JSON फ़ाइलों को सिकोड़ता है:

```
// मिनिफिकेशन से पहले
{ "title": "हैलो", "subtitle": "दुनिया" }

// मिनिफिकेशन के बाद
{ "a": "हैलो", "b": "दुनिया" }
```

यही नाम बदलना आपके स्रोत कोड में सभी प्रॉपर्टी एक्सेस पर लागू होता है, इसलिए संकलित आउटपुट में `content.title`, `content.a` बन जाता है। रनटाइम व्यवहार पूरी तरह समान रहता है।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> जब `optimize` `false` होता है या जब `editor.enabled` `true` होता है (विज़ुअल एडिटर को संपादन (editing) की अनुमति देने के लिए मूल फ़ील्ड नामों की आवश्यकता होती है) तो मिनिफिकेशन छोड़ दिया जाता है (skipped)।

> `importMode: 'fetch'` के माध्यम से लोड की गई डिक्शनरी के लिए भी मिनिफिकेशन छोड़ दिया जाता है क्योंकि उनका JSON मूल फ़ील्ड नामों का उपयोग करके रिमोट API से परोसा (served) जाता है — क्लाइंट-साइड कीज़ का नाम बदलने से सर्वर/क्लाइंट अनुबंध (contract) टूट जाएगा।

### Purging (अप्रयुक्त फ़ील्ड हटाना)

`build.purge` विश्लेषण करता है कि आपके स्रोत कोड में वास्तव में किन कंटेंट फ़ील्ड्स को एक्सेस किया गया है और संकलित JSON फ़ाइलों से अन्य सभी को हटा देता है।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**उदाहरण:** पाँच फ़ील्ड वाली डिक्शनरी जहाँ केवल दो का उपयोग किया जाता है:

```
// पर्ज (purge) से पहले
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// पर्ज (purge) के बाद (स्रोत में केवल title + subtitle एक्सेस किए गए)
{ "title": "…", "subtitle": "…" }
```

> जब `optimize` `false` होता है या जब `editor.enabled` `true` होता है तो पर्ज (Purge) छोड़ दिया जाता है (skipped)।

> पर्ज (Purge) को उस समय भी सुरक्षित (conservatively) रूप से छोड़ दिया जाता है जब किसी स्रोत फ़ाइल को पार्स (parse) नहीं किया जा सकता है, या जब `useIntlayer` के परिणाम को किसी वेरिएबल को सौंपा (assigned) जाता है और उन तरीकों से पास किया जाता है जिन्हें स्टेटिक एनालाइज़र ट्रैक नहीं कर सकता है (जैसे किसी ऑब्जेक्ट में स्प्रेड (spread) करना, डिस्ट्रक्चरिंग के बिना प्रोप (prop) के रूप में पास करना)। उन मामलों में, पूरी डिक्शनरी सुरक्षित (preserved) रखी जाती है।

### इम्पोर्ट मोड (Import Mode)

कई पेजों और लोकेल्स वाले बड़े एप्लिकेशन्स के लिए, आपका JSON आपके बंडल साइज़ का एक महत्वपूर्ण हिस्सा हो सकता है। Intlayer आपको `importMode` विकल्प का उपयोग करके डिक्शनरी को लोड करने के तरीके को नियंत्रित करने की अनुमति देता है।

### ग्लोबल परिभाषा (Global definition)

इम्पोर्ट मोड को आपके `intlayer.config.ts` फ़ाइल में विश्व स्तर पर (globally) परिभाषित किया जा सकता है।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // डिफ़ॉल्ट 'static' है
  },
};

export default config;
```

### प्रति-डिक्शनरी (Per-dictionary) परिभाषा

आप अलग-अलग डिक्शनरी के लिए उनके `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` फ़ाइलों में इम्पोर्ट मोड को ओवरराइड कर सकते हैं।

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // डिफ़ॉल्ट इम्पोर्ट मोड को ओवरराइड करें
  content: {
    // ...
  },
};

export default appContent;
```

| प्रॉपर्टी        | प्रकार                             | डिफ़ॉल्ट   | विवरण                                                                                                                                         |
| :--------------- | :--------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **नापसंद (Deprecated)**: इसके बजाय `dictionary.importMode` का उपयोग करें। यह निर्धारित करता है कि डिक्शनरी कैसे लोड की जाती हैं (नीचे देखें)। |

`importMode` सेटिंग यह निर्धारित करती है कि डिक्शनरी का कंटेंट आपके कंपोनेंट में कैसे इंजेक्ट किया जाता है। आप इसे `intlayer.config.ts` में `dictionary` ऑब्जेक्ट के अंतर्गत विश्व स्तर पर परिभाषित कर सकते हैं, या इसे प्रति-डिक्शनरी (per-dictionary) आधार पर इसकी `.content.ts` फ़ाइल में ओवरराइड कर सकते हैं।

### 1. स्टेटिक मोड (Static Mode - `default`)

स्टेटिक मोड में, Intlayer `useIntlayer` को `useDictionary` से बदल देता है और डिक्शनरी को सीधे JavaScript बंडल में इंजेक्ट कर देता है।

- **फ़ायदे:** तुरंत प्रतिपादन (synchronous), हाइड्रेशन (hydration) के दौरान कोई अतिरिक्त नेटवर्क अनुरोध (requests) नहीं।
- **नुकसान:** बंडल में उस विशिष्ट कंपोनेंट के लिए उपलब्ध **सभी** भाषाओं के अनुवाद शामिल होते हैं।
- **इसके लिए सर्वोत्तम:** सिंगल पेज एप्लिकेशन (SPA)।

**रूपांतरित कोड उदाहरण (Transformed code example):**

```tsx
// आपका कोड
const content = useIntlayer("my-key");

// रूपांतरण के बाद अनुकूलित (Optimised) कोड चित्रण (स्टेटिक)
// यह केवल चित्रण के लिए है, वास्तविक कोड अनुकूलन (optimisation) कारणों से अलग होगा
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      hi: "मेरा शीर्षक",
    },
  },
});
```

### 2. डायनामिक मोड (Dynamic Mode)

डायनामिक मोड में, Intlayer `useIntlayer` को `useDictionaryAsync` से बदल देता है। यह विशेष रूप से वर्तमान लोकेल (locale) के लिए JSON को लेज़ी-लोड करने के लिए `import()` (एक सस्पेंस (Suspense)-जैसा तंत्र) का उपयोग करता है।

- **फ़ायदे:** **लोकेल-स्तर ट्री शेकिंग (Locale-level tree shaking)।** अंग्रेजी संस्करण देखने वाला उपयोगकर्ता _केवल_ अंग्रेजी डिक्शनरी डाउनलोड करेगा। हिंदी डिक्शनरी कभी लोड नहीं होती है।
- **नुकसान:** हाइड्रेशन के दौरान प्रति कंपोनेंट एक नेटवर्क अनुरोध (asset fetch) ट्रिगर करता है।
- **इसके लिए सर्वोत्तम:** बड़े टेक्स्ट ब्लॉक, लेख, या एप्लिकेशन जो कई भाषाओं का समर्थन करते हैं जहां बंडल का आकार महत्वपूर्ण होता है।

**रूपांतरित कोड उदाहरण (Transformed code example):**

```tsx
// आपका कोड
const content = useIntlayer("my-key");

// रूपांतरण के बाद अनुकूलित (Optimised) कोड चित्रण (डायनामिक)
// यह केवल चित्रण के लिए है, वास्तविक कोड अनुकूलन (optimisation) कारणों से अलग होगा
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  hi: () =>
    import(".intlayer/dynamic_dictionary/my-key/hi.json").then(
      (mod) => mod.default
    ),
});
```

> जब `importMode: 'dynamic'` का उपयोग किया जाता है, यदि आपके पास एक ही पेज पर `useIntlayer` का उपयोग करने वाले 100 कंपोनेंट हैं, तो ब्राउज़र 100 अलग-अलग फ़ेच (fetches) का प्रयास करेगा। अनुरोधों के इस "वाटरफ़ॉल (waterfall)" से बचने के लिए, सामग्री को प्रति एटम कंपोनेंट एक के बजाय कम `.content` फ़ाइलों (जैसे पेज अनुभाग (section) प्रति एक डिक्शनरी) में समूहित करें। आप कई `.content` फ़ाइलों का भी उपयोग कर सकते हैं जो समान की (key) का उपयोग करती हैं। Intlayer उन्हें एकल डिक्शनरी में मिला (merge) देगा।

### 3. फ़ेच मोड (Fetch Mode)

यह डायनामिक मोड के समान व्यवहार करता है लेकिन पहले Intlayer Live Sync API से डिक्शनरी लाने (fetch) का प्रयास करता है। यदि API कॉल विफल हो जाता है या सामग्री को लाइव अपडेट के लिए चिह्नित नहीं किया गया है, तो यह डायनामिक इम्पोर्ट पर वापस आ जाता है (falls back)।

**रूपांतरित कोड उदाहरण (Transformed code example):**

```tsx
// आपका कोड
const content = useIntlayer("my-key");

// अनुकूलित (Optimised) कोड चित्रण (फ़ेच)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  hi: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/hi").then((res) =>
      res.json()
    ),
});
```

> अधिक विवरण के लिए CMS दस्तावेज़ देखें: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)

> फ़ेच मोड में, पर्ज (purge) और मिनिफिकेशन (minification) लागू नहीं होते हैं क्योंकि JSON मूल फ़ील्ड नामों का उपयोग करके रिमोट API से परोसा (served) जाता है।

## सारांश: स्टेटिक बनाम डायनामिक (Static vs Dynamic)

| फ़ीचर                     | स्टेटिक मोड                                 | डायनामिक मोड                           |
| :------------------------ | :------------------------------------------ | :------------------------------------- |
| **JS बंडल साइज़**         | बड़ा (कंपोनेंट के लिए सभी भाषाएँ शामिल हैं) | सबसे छोटा (केवल कोड, कोई सामग्री नहीं) |
| **प्रारंभिक लोड**         | त्वरित (सामग्री बंडल में है)                | मामूली देरी (JSON फ़ेच करता है)        |
| **नेटवर्क अनुरोध**        | 0 अतिरिक्त अनुरोध                           | 1 अनुरोध प्रति डिक्शनरी की (key)       |
| **ट्री शेकिंग**           | कंपोनेंट-स्तर                               | कंपोनेंट-स्तर + लोकेल-स्तर             |
| **सर्वोत्तम उपयोग मामला** | UI कंपोनेंट, छोटे ऐप्स                      | भारी पाठ वाले पृष्ठ, अनेक भाषाएँ       |
