---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: i18n বান্ডেল সাইজ এবং পারফরম্যান্স অপ্টিমাইজ করা
description: আন্তর্জাতিকীকরণ (i18n) কন্টেন্ট অপ্টিমাইজ করে অ্যাপ্লিকেশনের বান্ডেল সাইজ কমান। Intlayer-এর মাধ্যমে ডিকশনারির জন্য কীভাবে tree shaking এবং lazy loading ব্যবহার করবেন তা শিখুন।
keywords:
  - বান্ডেল অপ্টিমাইজেশন
  - কন্টেন্ট অটোমেশন
  - ডাইনামিক কন্টেন্ট
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
    changes: "বিল্ড কনফিগারেশনে `minify` এবং `purge` অপশন যুক্ত করা হয়েছে"
---

# i18n বান্ডেল সাইজ এবং পারফরম্যান্স অপ্টিমাইজ করা

JSON ফাইলের ওপর নির্ভরশীল প্রচলিত i18n সমাধানগুলোর প্রধান চ্যালেঞ্জ হলো কন্টেন্ট সাইজ ম্যানেজ করা। যদি ডেভেলপাররা ম্যানুয়ালি কন্টেন্টকে নেমস্পেসে আলাদা না করেন, তবে ব্যবহারকারীরা প্রায়ই প্রতিটি পেজ এবং সম্ভাব্যভাবে প্রতিটি ভাষার অনুবাদ ডাউনলোড করেন, এমনকি একটি মাত্র পেজ দেখার জন্য।

উদাহরণস্বরূপ, ১০টি ভাষায় অনূদিত ১০টি পেজের একটি অ্যাপ্লিকেশনের ক্ষেত্রে একজন ব্যবহারকারী ১০০টি পেজের কন্টেন্ট ডাউনলোড করতে পারেন, যদিও তার প্রয়োজন মাত্র **একটি** (বর্তমান ভাষায় বর্তমান পেজটি)। এটি ব্যান্ডউইথের অপচয় করে এবং লোডিং সময় বাড়িয়ে দেয়।

**Intlayer বিল্ড-টাইম অপ্টিমাইজেশনের মাধ্যমে এই সমস্যার সমাধান করে।** এটি আপনার কোড বিশ্লেষণ করে এবং প্রতিটি কম্পোনেন্টে প্রকৃতপক্ষে কোন ডিকশনারিগুলো ব্যবহৃত হচ্ছে তা শনাক্ত করে এবং শুধুমাত্র প্রয়োজনীয় কন্টেন্টগুলো আপনার বান্ডেলে যুক্ত করে।

## সূচিপত্র

<TOC />

## আপনার বান্ডেল স্ক্যান করুন

বান্ডেল বিশ্লেষণ করা হলো "ভারী" JSON ফাইল এবং কোড-স্প্লিটিং (code-splitting) এর সুযোগ শনাক্ত করার প্রথম ধাপ। এই টুলগুলো আপনার অ্যাপ্লিকেশনের কম্পাইল করা কোডের একটি ভিজ্যুয়াল ট্রিম্যাপ (treemap) তৈরি করে, যা আপনাকে দেখতে সাহায্য করে কোন লাইব্রেরিগুলো সবচেয়ে বেশি জায়গা নিচ্ছে।

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite এর ব্যাকএন্ডে Rollup ব্যবহৃত হয়। `rollup-plugin-visualizer` প্লাগইনটি একটি ইন্টারঅ্যাক্টিভ HTML ফাইল তৈরি করে যা আপনার গ্রাফের প্রতিটি মডিউলের সাইজ দেখায়।

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // রিপোর্টটি আপনার ব্রাউজারে স্বয়ংক্রিয়ভাবে খুলবে
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

যেসব প্রজেক্টে App Router এবং Turbopack ব্যবহৃত হচ্ছে, সেগুলোর জন্য Next.js একটি বিল্ট-ইন এক্সপেরিমেন্টাল অ্যানালাইজার প্রদান করে যা ব্যবহারের জন্য বাড়তি কোনো ডিপেন্ডেন্সির প্রয়োজন হয় না।

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

যদি আপনি Next.js-এ ডিফল্ট Webpack বন্ডলার ব্যবহার করেন, তবে অফিশিয়াল বান্ডেল অ্যানালাইজার ব্যবহার করুন। বিল্ড করার সময় একটি এনভায়রনমেন্ট ভেরিয়েবল সেট করে এটি চালু করুন।

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
  // আপনার Next.js কনফিগারেশন
});
```

**ব্যবহার পদ্ধতি:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### স্ট্যান্ডার্ড Webpack

Create React App (ejected), Angular বা কাস্টম Webpack সেটআপের জন্য ইন্ডাস্ট্রি-স্ট্যান্ডার্ড `webpack-bundle-analyzer` ব্যবহার করুন।

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

## এটি কীভাবে কাজ করে

Intlayer **প্রতি-কম্পোনেন্ট পলি (per-component approach)** ব্যবহার করে। গ্লোবাল JSON ফাইলের বিপরীতে, আপনার কন্টেন্টটি আপনার কম্পোনেন্টের সাথেই বা এর ভেতরে ডিফাইন করা থাকে। বিল্ড প্রসেসের সময়, Intlayer যা করে:

১. `useIntlayer` কলগুলো খুঁজে পেতে আপনার কোডটি **বিশ্লেষণ** করে।
২. সংশ্লিষ্ট ডিকশনারি কন্টেন্টগুলো **তৈরি (build)** করে।
৩. আপনার কনফিগারেশনের ওপর ভিত্তি করে `useIntlayer` কলটিকে অপ্টিমাইজ করা কোড দ্বারা **প্রতিস্থাপন** করে।

এটি নিশ্চিত করে যে:

- যদি কোনো কম্পোনেন্ট ইমপোর্ট করা না হয়, তবে এর কন্টেন্ট বান্ডেলে অন্তর্ভুক্ত হবে না (Dead Code Elimination)।
- যদি কোনো কম্পোনেন্ট লেজি-লোডেড (lazy-loaded) হয়, তবে এর কন্টেন্টও লেজি-লোড হবে।

## প্ল্যাটফর্ম অনুযায়ী সেটআপ

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js-এ ট্রান্সফর্মেশন হ্যান্ডেল করার জন্য `@intlayer/swc` প্লাগইনটির প্রয়োজন হয়, কারণ Next.js বিল্ড করার জন্য SWC ব্যবহার করে।

> এই প্লাগইনটি ডিফল্টভাবে ইনস্টল করা থাকে না কারণ SWC প্লাগইনগুলো এখনও Next.js-এর জন্য এক্সপেরিমেন্টাল পর্যায়ে রয়েছে। ভবিষ্যতে এটি পরিবর্তিত হতে পারে।

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

ইনস্টল করার পর, Intlayer স্বয়ংক্রিয়ভাবে প্লাগইনটি শনাক্ত করবে এবং ব্যবহার করবে।

 </Tab>
 <Tab value="vite">

### Vite

Vite `@intlayer/babel` প্লাগইন ব্যবহার করে যা `vite-intlayer`-এর ডিপেন্ডেন্সি হিসেবে যুক্ত থাকে। অপ্টিমাইজেশন ডিফল্টভাবে চালু থাকে। বাড়তি কিছু করার প্রয়োজন নেই।

 </Tab>
 <Tab value="webpack">

### Webpack

Webpack-এ Intlayer-এর মাধ্যমে বান্ডেল অপ্টিমাইজেশন চালু করার জন্য আপনাকে প্রয়োজনীয় Babel (`@intlayer/babel`) বা SWC (`@intlayer/swc`) প্লাগইন ইনস্টল এবং কনফিগার করতে হবে।

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
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## কনফিগারেশন

আপনি আপনার `intlayer.config.ts`-এর `build` প্রপার্টির মাধ্যমে Intlayer কীভাবে আপনার বান্ডেল অপ্টিমাইজ করবে তা নিয়ন্ত্রণ করতে পারেন।

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
     * বান্ডেল সাইজ কমাতে ডিকশনারিগুলো মিনিফাই করুন।
     */
     minify: true;

    /**
     * ডিকশনারিতে অব্যবহৃত কীগুলো (keys) মুছে ফেলুন (purge)
     */
     purge: true;

    /**
     * বিল্ড করার সময় টাইপস্ক্রিপ্ট টাইপগুলো চেক করা হবে কিনা তা নির্দেশ করে
     */
    checkTypes: false;
  },
};

export default config;
```

> বেশিরভাগ ক্ষেত্রে `optimize` অপশনটি ডিফল্ট অবস্থায় রাখাই শ্রেয়।

> বিস্তারিত জানার জন্য কনফিগারেশন ডকুমেন্ট দেখুন: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md)

### বিল্ড অপশন

`build` কনফিগারেশন অবজেক্টের অধীনে নিচের অপশনগুলো উপলব্ধ রয়েছে:

| প্রপার্টি      | টাইপ      | ডিফল্ট      | বর্ণনা                                                                                                                                                                                                                    |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean` | `undefined` | বিল্ড অপ্টিমাইজেশন চালু আছে কিনা তা নিয়ন্ত্রণ করে। যদি `true` হয়, তবে Intlayer ডিকশনারি কলগুলোকে অপ্টিমাইজড ইনজেকশন দ্বারা প্রতিস্থাপন করে। যদি `false` হয়, তবে অপ্টিমাইজেশন বন্ধ থাকে। প্রোডাকশনে `true` সেট করা ভালো। |
| **`minify`**   | `boolean` | `false`     | বান্ডেল সাইজ কমাতে ডিকশনারিগুলো মিনিফাই করা হবে কিনা।                                                                                                                                                                     |
| **`purge`**    | `boolean` | `false`     | ডিকশনারিতে অব্যবহৃত কীগুলো মুছে ফেলা হবে কিনা।                                                                                                                                                                            |

### মিনিফিকেশন (Minification)

ডিকশনারি মিনিফাই করার ফলে অপ্রয়োজনীয় হোয়াইটস্পেস, কমেন্ট মুছে যায় এবং JSON কন্টেন্টের সাইজ কমে যায়। বড় ডিকশনারির ক্ষেত্রে এটি অত্যন্ত উপযোগী।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> দ্রষ্টব্য: যদি `optimize` বন্ধ করা থাকে অথবা যদি ভিজ্যুয়াল এডিটর (Visual Editor) চালু থাকে তবে মিনিফিকেশন কাজ করবে না (কারণ এডিটর ব্যবহারের জন্য পূর্ণ কন্টেন্টের প্রয়োজন হয়)।

### পার্জিং (Purging)

পার্জিং নিশ্চিত করে যে শুধুমাত্র আপনার কোডে ব্যবহৃত কীগুলোই চূড়ান্ত ডিকশনারি বান্ডেলে অন্তর্ভুক্ত হবে। যদি আপনার কাছে অনেকগুলো কী সম্বলিত বড় ডিকশনারি থাকে যেগুলো অ্যাপ্লিকেশনের সব জায়গায় ব্যবহৃত হয় না, তবে এটি আপনার বান্ডেল সাইজ উল্লেখযোগ্যভাবে কমাতে পারি।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> দ্রষ্টব্য: যদি `optimize` বন্ধ থাকে তবে পার্জিং কাজ করবে না।

### ইমপোর্ট মোড (Import Mode)

বড় অ্যাপ্লিকেশনের ক্ষেত্রে অনেকগুলো পেজ এবং লোকাল (locale) থাকলে আপনার JSON ফাইলগুলো বান্ডেল সাইজের একটি বড় অংশ দখল করতে পারে। Intlayer আপনাকে নিয়ন্ত্রণ করতে দেয় কীভাবে ডিকশনারিগুলো লোড হবে।

আপনার `intlayer.config.ts` ফাইলে বিশ্বব্যাপী (globally) ডিফল্ট ইমপোর্ট মোড ডিফাইন করা যেতে পারে।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

পাশাপাশি আপনার `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` ফাইলগুলোতে প্রতিটি ডিকশনারির জন্যও এটি করা যায়।

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // ডিফল্ট ইমপোর্ট মোড ওভাররাইড করুন
  content: {
    // ...
  },
};

export default appContent;
```

| প্রপার্টি        | টাইপ                               | ডিফল্ট     | বর্ণনা                                                                                                             |
| :--------------- | :--------------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **অপ্রচলিত (Deprecated)**: পরিবর্তে `dictionary.importMode` ব্যবহার করুন। ডিকশনারি কীভাবে লোড হবে তা নির্ধারণ করে। |

`importMode` সেটিং ঠিক করে কীভাবে ডিকশনারি কন্টেন্ট আপনার কম্পোনেন্টে যুক্ত করা হবে।
আপনি এটি `intlayer.config.ts` ফাইলের `dictionary` অবজেক্টের অধীনে গ্লোবালি ডিফাইন করতে পারেন অথবা কোনো নির্দিষ্ট ডিকশনারির জন্য তার `.content.ts` ফাইলে ওভাররাইট করতে পারেন।

### ১. স্ট্যাটিক মোড (Static Mode - ডিফল্ট)

স্ট্যাটিক মোডে Intlayer `useIntlayer`-কে `useDictionary` দ্বারা প্রতিস্থাপন করে এবং ডিকশনারিটিকে সরাসরি জাভাস্ক্রিপ্ট বান্ডেলে যুক্ত করে।

- **সুবিধা:** তাৎক্ষণিক রেন্ডারিং (সিঙ্ক্রোনাস), হাইড্রেশনের সময় আলাদা কোনো নেটওয়ার্ক রিকোয়েস্টের প্রয়োজন হয় না।
- **অসুবিধা:** বান্ডেলে সংশ্লিষ্ট কম্পোনেন্টের জন্য উপলব্ধ **সবগুলো** ভাষার অনুবাদ অন্তর্ভুক্ত থাকে।
- **উপযোগিতা:** সিঙ্গেল পেজ অ্যাপ্লিকেশন (SPA)।

**কোড পরিবর্তনের উদাহরণ:**

```tsx
// আপনার কোড
const content = useIntlayer("my-key");

// অপ্টিমাইজ করা কোড (Static)
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

### ২. ডাইনামিক মোড (Dynamic Mode)

ডাইনামিক মোডে Intlayer `useIntlayer`-কে `useDictionaryAsync` দ্বারা প্রতিস্থাপন করে। এটি বর্তমান লোকাল (locale)-এর নির্দিষ্ট JSON ফাইলকে লেজি-লোড (lazy-load) করতে `import()` ব্যবহার করে।

- **সুবিধা:** **ভাষা-স্তরের ট্রি শেকিং (Locale-level tree shaking)।** একজন ব্যবহারকারী ইংরেজি ভার্সন দেখলে _শুধুমাত্র_ ইংরেজি ডিকশনারি ডাউনলোড করবেন। ফ্রেঞ্চ ডিকশনারি কখনোই লোড হবে না।
- **অসুবিধা:** হাইড্রেশনের সময় প্রতি কম্পোনেন্টে একটি করে নেটওয়ার্ক রিকোয়েস্ট তৈরি হয়।
- **উপযোগিতা:** বড় টেক্সট ব্লক, আর্টিকেল বা অনেক ভাষা সাপোর্ট করে এমন অ্যাপ্লিকেশন যেখানে বান্ডেল সাইজ অত্যন্ত গুরুত্বপূর্ণ।

**কোড পরিবর্তনের উদাহরণ:**

```tsx
// আপনার কোড
const content = useIntlayer("my-key");

// অপ্টিমাইজ করা কোড (Dynamic)
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

> `importMode: 'dynamic'` ব্যবহার করার সময় যদি একটি পেজে ১০০টি কম্পোনেন্ট `useIntlayer` ব্যবহার করে, তবে ব্রাউজার ১০০টি আলাদা ডাউনলোড রিকোয়েস্ট পাঠাবে। এই রিকোয়েস্টের "তুষারপাত" (waterfall) এড়াতে প্রতিটি ছোট কম্পোনেন্টের পরিবর্তে কম সংখ্যক `.content` ফাইলে কন্টেন্টগুলো গ্রুপ করুন (যেমন: প্রতিটি পেজ সেকশনের জন্য একটি ডিকশনারি)।

### ৩. ফেচ মোড (Fetch Mode)

এটি ডাইনামিক মোডের মতোই কাজ করে, তবে এটি প্রথমে Intlayer Live Sync API থেকে ডিকশনারিগুলো আনার চেষ্টা করে। যদি API কল ব্যর্থ হয় বা কন্টেন্ট লাইভ আপডেটের জন্য চিহ্নিত করা না থাকে, তবে এটি ডাইনামিক ইমপোর্টে ফিরে যায়।

> বিস্তারিত জানতে CMS ডকুমেন্ট দেখুন: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md)

> ফেচ মোডে পার্জিং (purge) এবং মিনিফিকেশন ব্যবহার করা যায় না।

## সারসংক্ষেপ: স্ট্যাটিক বনাম ডাইনামিক

| ফিচার                         | স্ট্যাটিক মোড                              | ডাইনামিক মোড                              |
| :---------------------------- | :----------------------------------------- | :---------------------------------------- |
| **JS বান্ডেল সাইজ**           | তুলনামূলক বড় (সব ভাষা অন্তর্ভুক্ত করে)    | সবচেয়ে ছোট (শুধুমাত্র কোড, কন্টেন্ট নেই) |
| **প্রাথমিক লোড**              | তাৎক্ষণিক (কন্টেন্ট বান্ডেলের ভেতরেই থাকে) | সামান্য দেরি (JSON ফেচ করে আনে)           |
| **নেটওয়ার্ক রিকোয়েস্ট**     | ০টি অতিরিক্ত রিকোয়েস্ট                    | ডিকশনারি পিছু ১টি রিকোয়েস্ট              |
| **ট্রি শেকিং (Tree Shaking)** | কম্পোনেন্ট-স্তরে                           | কম্পোনেন্ট-স্তর + ভাষা-স্তরে              |
| **উপযোগিতা**                  | UI কম্পোনেন্ট, ছোট অ্যাপ্লিকেশন            | বেশি টেক্সটযুক্ত পেজ, অনেকগুলো ভাষা       |
