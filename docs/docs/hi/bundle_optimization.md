---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: i18n बंडल साइज और परफॉरमेंस को ऑप्टिमाइज़ करना
description: अंतर्राष्ट्रीयकरण (i18n) कंटेंट को ऑप्टिमाइज़ करके एप्लिकेशन बंडल साइज कम करें। जानें कि Intlayer के साथ डिक्शनरी के लिए tree shaking और lazy loading का लाभ कैसे उठाया जाए।
keywords:
  - Bundle Optimization
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "बिल्ड कॉन्फ़िगरेशन में `minify` और `purge` विकल्प जोड़ें"
---

# i18n बंडल साइज और परफॉरमेंस को ऑप्टिमाइज़ करना

JSON फाइलों पर निर्भर पारंपरिक i18n समाधानों के साथ सबसे आम चुनौतियों में से एक कंटेंट साइज को मैनेज करना है। यदि डेवलपर्स मैन्युअल रूप से कंटेंट को नेमस्पेस में अलग नहीं करते हैं, तो उपयोगकर्ता अक्सर एक ही पेज देखने के लिए हर पेज और संभावित रूप से हर भाषा के अनुवाद डाउनलोड कर लेते हैं।

उदाहरण के लिए, 10 भाषाओं में अनुवादित 10 पेजों वाले एप्लिकेशन के परिणामस्वरूप उपयोगकर्ता 100 पेजों का कंटेंट डाउनलोड कर सकता है, भले ही उन्हें केवल **एक** (वर्तमान भाषा में वर्तमान पेज) की आवश्यकता हो। इससे बैंडविड्थ की बर्बादी होती है और लोड होने का समय धीमा हो जाता है।

**Intlayer बिल्ड-टाइम ऑप्टिमाइज़ेशन के माध्यम से इस समस्या को हल करता है।** यह आपके कोड को यह पता लगाने के लिए विश्लेषण करता है कि प्रति कंपोनेंट कौन सी डिक्शनरी वास्तव में उपयोग की जाती हैं और केवल आवश्यक कंटेंट को आपके बंडल में फिर से इंजेक्ट करता है।

## विषय सूची

<TOC />

## अपने बंडल को स्कैन करें

अपने बंडल का विश्लेषण करना "भारी" JSON फाइलों और कोड-स्प्लिटिंग के अवसरों की पहचान करने का पहला कदम है। ये टूल आपके एप्लिकेशन के संकलित कोड का एक विज़ुअल ट्रीमैप (treemap) तैयार करते हैं, जिससे आप देख सकते हैं कि कौन सी लाइब्रेरी सबसे अधिक जगह घेर रही हैं।

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite हुड के नीचे Rollup का उपयोग करता है। `rollup-plugin-visualizer` प्लगइन एक इंटरैक्टिव HTML फ़ाइल जनरेट करता है जो आपके ग्राफ़ में हर मॉड्यूल का आकार दिखाता है।

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // रिपोर्ट को अपने ब्राउज़र में स्वचालित रूप से खोलें
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

App Router और Turbopack का उपयोग करने वाले प्रोजेक्ट्स के लिए, Next.js एक अंतर्निहित प्रयोगात्मक विश्लेषक (experimental analyzer) प्रदान करता है जिसके लिए किसी अतिरिक्त डिपेंडेंसी की आवश्यकता नहीं होती है।

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

यदि आप Next.js में डिफॉल्ट Webpack बंडलर का उपयोग कर रहे हैं, तो आधिकारिक बंडल विश्लेषक का उपयोग करें। अपने बिल्ड के दौरान एक एनवायरनमेंट वेरिएबल सेट करके इसे ट्रिगर करें।

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
  // आपका Next.js कॉन्फ़िगरेशन
});
```

**उपयोग:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### स्टैंडर्ड Webpack

Create React App (ejected), Angular, या कस्टम Webpack सेटअप के लिए, इंडस्ट्री-स्टैंडर्ड `webpack-bundle-analyzer` का उपयोग करें।

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

## यह कैसे काम करता है

Intlayer **प्रति-कंपोनेंट दृष्टिकोण (per-component approach)** का उपयोग करता है। ग्लोबल JSON फाइलों के विपरीत, आपका कंटेंट आपके कंपोनेंट्स के साथ या उनके भीतर परिभाषित किया जाता है। बिल्ड प्रक्रिया के दौरान, Intlayer:

1.  `useIntlayer` कॉल को खोजने के लिए आपके कोड का **विश्लेषण** करता है।
2.  संबंधित डिक्शनरी कंटेंट को **बिल्ड** करता है।
3.  आपके कॉन्फ़िगरेशन के आधार पर `useIntlayer` कॉल को ऑप्टिमाइज़्ड कोड से **बदलता** है।

यह सुनिश्चित करता है कि:

- यदि कोई कंपोनेंट इम्पोर्ट नहीं किया गया है, तो उसका कंटेंट बंडल में शामिल नहीं किया जाता है (Dead Code Elimination)।
- यदि कोई कंपोनेंट लेजी-लोडेड (lazy-loaded) है, तो उसका कंटेंट भी लेजी-लोडेड होता है।

## प्लेटफॉर्म द्वारा सेटअप

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js को ट्रांसफॉर्मेशन को संभालने के लिए `@intlayer/swc` प्लगइन की आवश्यकता होती है, क्योंकि Next.js बिल्ड के लिए SWC का उपयोग करता है।

> यह प्लगइन डिफॉल्ट रूप से इंस्टॉल नहीं किया जाता है क्योंकि SWC प्लगइन अभी भी Next.js के लिए प्रयोगात्मक हैं। यह भविष्य में बदल सकता है।

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

एक बार इंस्टॉल होने के बाद, Intlayer स्वचालित रूप से प्लगइन का पता लगाएगा और उसका उपयोग करेगा।

 </Tab>
 <Tab value="vite">

### Vite

Vite `@intlayer/babel` प्लगइन का उपयोग करता है जिसे `vite-intlayer` की डिपेंडेंसी के रूप में शामिल किया गया है। ऑप्टिमाइज़ेशन डिफॉल्ट रूप से सक्षम है। और कुछ करने की आवश्यकता नहीं है।

 </Tab>
 <Tab value="webpack">

### Webpack

Webpack पर Intlayer के साथ बंडल ऑप्टिमाइज़ेशन सक्षम करने के लिए, आपको उपयुक्त Babel (`@intlayer/babel`) या SWC (`@intlayer/swc`) प्लगइन इंस्टॉल और कॉन्फ़िगर करना होगा।

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

## कॉन्फ़िगरेशन

आप अपने `intlayer.config.ts` में `build` प्रॉपर्टी के माध्यम से कंट्रोल कर सकते हैं कि Intlayer आपके बंडल को कैसे ऑप्टिमाइज़ करता है।

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
     * बंडल साइज कम करने के लिए डिक्शनरी को मिनिफ़ाई करें।
     */
     minify: true;

    /**
     * डिक्शनरी में अप्रयुक्त कुंजियों (unused keys) को हटा दें (purge)
     */
     purge: true;

    /**
     * इंगित करता है कि क्या बिल्ड को टाइपस्क्रिप्ट प्रकारों (TypeScript types) की जांच करनी चाहिए
     */
    checkTypes: false;
  },
};

export default config;
```

> अधिकांश मामलों में `optimize` के लिए डिफॉल्ट विकल्प रखना ही बेहतर होता है।

> अधिक जानकारी के लिए कॉन्फ़िगरेशन डॉक्स देखें: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)

### बिल्ड विकल्प

`build` कॉन्फ़िगरेशन ऑब्जेक्ट के अंतर्गत निम्नलिखित विकल्प उपलब्ध हैं:

| प्रॉपर्टी      | प्रकार    | डिफॉल्ट     | विवरण                                                                                                                                                                                                          |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | कंट्रोल करता है कि बिल्ड ऑप्टिमाइज़ेशन सक्षम है या नहीं। यदि `true` है, तो Intlayer डिक्शनरी कॉल को ऑप्टिमाइज़्ड इंजेक्शन से बदल देता है। यदि `false` है, तो ऑप्टिमाइज़ेशन अक्षम है। प्रोडक्शन में `true` रखें। |
| **`minify`**   | `boolean` | `false`     | बंडल साइज कम करने के लिए डिक्शनरी को मिनिफ़ाई करना है या नहीं।                                                                                                                                                  |
| **`purge`**    | `boolean` | `false`     | डिक्शनरी में अप्रयुक्त कुंजियों को हटाना है या नहीं।                                                                                                                                                           |

### मिनिफ़िकेशन (Minification)

डिक्शनरी को मिनिफ़ाई करने से अनावश्यक व्हाइटस्पेस, कमेंट हट जाते हैं और JSON कंटेंट का आकार कम हो जाता है। यह विशेष रूप से बड़ी डिक्शनरी के लिए उपयोगी है।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> नोट: यदि `optimize` अक्षम है या यदि विजुअल एडिटर (Visual Editor) सक्षम है, तो मिनिफ़िकेशन को इग्नोर कर दिया जाता है (क्योंकि एडिटर को एडिटिंग की अनुमति देने के लिए पूर्ण कंटेंट की आवश्यकता होती है)।

### पर्जिंग (Purging)

पर्जिंग यह सुनिश्चित करता है कि केवल आपके कोड में वास्तव में उपयोग की जाने वाली कुंजियाँ ही अंतिम डिक्शनरी बंडल में शामिल की जाएं। यदि आपके पास कई कुंजियों वाली बड़ी डिक्शनरी हैं जो आपके एप्लिकेशन के हर हिस्से में उपयोग नहीं की जाती हैं, तो यह आपके बंडल के आकार को काफी कम कर सकता है।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> नोट: यदि `optimize` अक्षम है तो पर्जिंग को इग्नोर कर दिया जाता है।

### इम्पोर्ट मोड (Import Mode)

बड़े एप्लिकेशन के लिए, जिसमें कई पेज और भाषाएँ शामिल हैं, आपकी JSON फाइलें आपके बंडल साइज का एक महत्वपूर्ण हिस्सा हो सकती हैं। Intlayer आपको यह कंट्रोल करने की अनुमति देता है कि डिक्शनरी कैसे लोड की जाती हैं।

इम्पोर्ट मोड को आपकी `intlayer.config.ts` फ़ाइल में विश्व स्तर (globally) पर डिफॉल्ट रूप से परिभाषित किया जा सकता है।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

साथ ही आपकी `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` फ़ाइलों में प्रत्येक डिक्शनरी के लिए भी।

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // डिफॉल्ट इम्पोर्ट मोड को ओवरराइड करें
  content: {
    // ...
  },
};

export default appContent;
```

| प्रॉपर्टी        | प्रकार                             | डिफॉल्ट    | विवरण                                                                                                                    |
| :--------------- | :--------------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Deprecated**: इसके स्थान पर `dictionary.importMode` का उपयोग करें। यह निर्धारित करता है कि डिक्शनरी कैसे लोड होती हैं। |

`importMode` सेटिंग यह तय करती है कि डिक्शनरी कंटेंट आपके कंपोनेंट में कैसे इंजेक्ट किया जाता है।
आप इसे `intlayer.config.ts` फ़ाइल में `dictionary` ऑब्जेक्ट के तहत विश्व स्तर पर परिभाषित कर सकते हैं, या आप इसे इसकी `.content.ts` फ़ाइल में एक विशिष्ट डिक्शनरी के लिए ओवरराइट कर सकते हैं।

### 1. स्टैटिक मोड (`default`)

स्टैटिक मोड में, Intlayer `useIntlayer` को `useDictionary` से बदल देता है और डिक्शनरी को सीधे जावास्क्रिप्ट बंडल में इंजेक्ट करता है।

- **लाभ:** तत्काल रेंडरिंग (सिक्रोनस), हाइड्रेशन के दौरान कोई अतिरिक्त नेटवर्क रिक्वेस्ट नहीं।
- **नुकसान:** बंडल में उस विशिष्ट कंपोनेंट के लिए **सभी** उपलब्ध भाषाओं के अनुवाद शामिल होते हैं।
- **इनके लिए सर्वश्रेष्ठ:** सिंगल पेज एप्लिकेशन (SPA)।

**रूपांतरित कोड उदाहरण (Transformed Code Example):**

```tsx
// आपका कोड
const content = useIntlayer("my-key");

// ऑप्टिमाइज़्ड कोड (Static)
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

### 2. डायनामिक मोड (Dynamic Mode)

डायनामिक मोड में, Intlayer `useIntlayer` को `useDictionaryAsync` से बदल देता है। यह वर्तमान भाषा के लिए विशेष रूप से JSON को लेजी-लोड (lazy-load) करने के लिए `import()` (Suspense-like mechanism) का उपयोग करता है।

- **लाभ:** **भाषा-स्तर पर ट्री शेकिंग (Locale-level tree shaking)।** अंग्रेजी वर्जन देखने वाला उपयोगकर्ता _केवल_ अंग्रेजी डिक्शनरी डाउनलोड करेगा। फ्रेंच डिक्शनरी कभी लोड नहीं होगी।
- **नुकसान:** हाइड्रेशन के दौरान प्रति कंपोनेंट एक नेटवर्क रिक्वेस्ट (एसेट फेच) ट्रिगर करता है।
- **इनके लिए सर्वश्रेष्ठ:** बड़े टेक्स्ट ब्लॉक, लेख, या कई भाषाओं को सपोर्ट करने वाले एप्लिकेशन जहां बंडल साइज बहुत महत्वपूर्ण है।

**रूपांतरित कोड उदाहरण:**

```tsx
// आपका कोड
const content = useIntlayer("my-key");

// ऑप्टिमाइज़्ड कोड (Dynamic)
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

> `importMode: 'dynamic'` का उपयोग करते समय, यदि आपके पास एक ही पेज पर `useIntlayer` का उपयोग करने वाले 100 कंपोनेंट हैं, तो ब्राउज़र 100 अलग-अलग फेच का प्रयास करेगा। अनुरोधों के इस "वाटरफॉल" से बचने के लिए, कंटेंट को प्रत्येक छोटे कंपोनेंट के बजाय कम `.content` फ़ाइलों (जैसे, प्रत्येक पेज सेक्शन के लिए एक डिक्शनरी) में समूहित करें।

### 3. फेच मोड (Fetch Mode)

डायनामिक मोड के समान व्यवहार करता है लेकिन पहले Intlayer Live Sync API से डिक्शनरी लाने का प्रयास करता है। यदि API कॉल विफल हो जाती है या कंटेंट लाइव अपडेट के लिए मार्क नहीं किया गया है, तो यह डायनामिक इम्पोर्ट पर वापस आ जाता है।

> अधिक विवरण के लिए CMS डॉक्स देखें: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)

> फेच मोड में, पर्ज और मिनिफ़िकेशन का उपयोग नहीं किया जा सकता है।

## सारांश: स्टैटिक बनाम डायनामिक

| फीचर                  | स्टैटिक मोड                                   | डायनामिक मोड                          |
| :-------------------- | :-------------------------------------------- | :------------------------------------ |
| **JS बंडल साइज**      | बड़ा (इसमें कंपोनेंट की सभी भाषाएँ शामिल हैं) | सबसे छोटा (केवल कोड, कोई कंटेंट नहीं) |
| **प्रारंभिक लोड**     | तत्काल (कंटेंट बंडल में है)                   | हल्का विलंब (JSON फेच करता है)        |
| **नेटवर्क रिक्वेस्ट** | 0 अतिरिक्त रिक्वेस्ट                          | प्रति डिक्शनरी 1 रिक्वेस्ट            |
| **ट्री शेकिंग**       | कंपोनेंट-स्तर                                 | कंपोनेंट-स्तर + भाषा-स्तर             |
| **सर्वश्रेष्ठ उपयोग** | UI कंपोनेंट्स, छोटे ऐप्स                      | बहुत सारे टेक्स्ट वाले पेज, कई भाषाएं |
