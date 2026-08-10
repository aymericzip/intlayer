---
createdAt: 2025-11-25
updatedAt: 2026-08-09
title: i18n বান্ডেল সাইজ ও পারফরম্যান্স অপ্টিমাইজেশন
description: আপনার অ্যাপ্লিকেশনের বান্ডেল সাইজ কমান আন্তর্জাতিকীকরণ (i18n) কন্টেন্ট অপ্টিমাইজ করে। Intlayer-এর মাধ্যমে ডিকশনারির জন্য ট্রি শেকিং (tree shaking) এবং লেজি লোডিং (lazy loading) কীভাবে ব্যবহার করবেন তা জানুন।
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
  - version: 9.2.1
    date: 2026-08-09
    changes: "`purge` এবং `minify` এখন `@intlayer/swc`-এর মাধ্যমে Next.js-এ কাজ করে — `babel.config.js` প্রয়োজন নেই"
  - version: 8.12.0
    date: 2026-06-24
    changes: "রেফারেন্স টেবিলে Babel প্লাগইনগুলিকে প্রয়োজনীয় পাইপলাইন ক্রমে তালিকাভুক্ত করা (extract → purge → minify → optimize)"
  - version: 8.12.0
    date: 2026-06-07
    changes: "Babel/Webpack-এর জন্য `intlayerPurgeBabelPlugin` এবং `intlayerMinifyBabelPlugin` যোগ করা হয়েছে; প্লাগিন পাইপলাইন পরিষ্কার করা হয়েছে"
  - version: 8.7.0
    date: 2026-04-08
    changes: "বিল্ড কনফিগারেশনে `minify` এবং `purge` অপশন যোগ করা হয়েছে"
author: aymericzip
---

# i18n বান্ডেল সাইজ ও পারফরম্যান্স অপ্টিমাইজেশন

JSON ফাইল ব্যবহার করে এমন প্রচলিত i18n সলিউশনগুলোর অন্যতম প্রধান সমস্যা হলো কন্টেন্টের সাইজ ম্যানেজ করা। ডেভেলপাররা যদি ম্যানুয়ালি কন্টেন্টকে নেমস্পেস-এ আলাদা না করেন, তবে ব্যবহারকারীরা প্রায়শই শুধুমাত্র একটি পেজ দেখার জন্য প্রতিটি পেজ এবং সম্ভাব্য প্রতিটি ভাষার অনুবাদ ডাউনলোড করে ফেলেন।

উদাহরণস্বরূপ, ১০টি পেজ এবং ১০টি ভাষায় অনুবাদিত একটি অ্যাপ্লিকেশনের ক্ষেত্রে, একজন ব্যবহারকারী হয়তো ১০০টি পেজের কন্টেন্ট ডাউনলোড করে ফেলতে পারে, যদিও তার প্রয়োজন শুধুমাত্র **একটি** (বর্তমান ভাষায় বর্তমান পেজটি)। এতে ব্যান্ডউইথ নষ্ট হয় এবং লোড হতে অনেক বেশি সময় লাগে।

**Intlayer বিল্ড-টাইম অপ্টিমাইজেশনের মাধ্যমে এই সমস্যার সমাধান করে।** এটি আপনার কোড বিশ্লেষণ করে ঠিক কোন কম্পোনেন্টের জন্য কোন ডিকশনারিগুলো ব্যবহৃত হচ্ছে তা শনাক্ত করে এবং কেবল প্রয়োজনীয় কন্টেন্টটুকুই আপনার বান্ডেলের মধ্যে পুনরায় প্রবেশ করায়।

## সূচিপত্র

<TOC />

## আপনার বান্ডেল বিশ্লেষণ করুন

"ভারী" JSON ফাইল এবং কোড-স্প্লিটিং-এর সুযোগ চিহ্নিত করার প্রথম ধাপ হলো আপনার বান্ডেল বিশ্লেষণ করা। এই টুলগুলো আপনার অ্যাপ্লিকেশনের কম্পাইল করা কোডের একটি ভিজ্যুয়াল ট্রিম্যাপ (treemap) তৈরি করে, যা দিয়ে আপনি ঠিক বুঝতে পারবেন কোন লাইব্রেরিগুলো সবচেয়ে বেশি জায়গা নিচ্ছে।

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite এর ভেতরে Rollup ব্যবহার করে কাজ করে। `rollup-plugin-visualizer` একটি ইন্টারেক্টিভ HTML ফাইল তৈরি করে যা আপনার গ্রাফের প্রতিটি মডিউলের সাইজ দেখায়।

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // ব্রাউজারে স্বয়ংক্রিয়ভাবে রিপোর্ট খুলবে
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

App Router এবং Turbopack ব্যবহার করা প্রজেক্টগুলোর জন্য Next.js একটি বিল্ট-ইন, পরীক্ষামূলক অ্যানালাইজার সরবরাহ করে যার জন্য অতিরিক্ত কোনো ডিপেন্ডেন্সির প্রয়োজন হয় না।

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

যদি আপনি Next.js-এ ডিফল্ট Webpack বান্ডলার ব্যবহার করেন, তবে অফিশিয়াল বান্ডেল অ্যানালাইজার ব্যবহার করুন। বিল্ড করার সময় একটি পরিবেশ চলক (environment variable) সেট করে এটি ট্রিগার করতে পারেন।

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

**ব্যবহারবিধি:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standard Webpack

Create React App (ejected), Angular, অথবা কাস্টম Webpack সেটআপের জন্য, বহুল প্রচলিত `webpack-bundle-analyzer` ব্যবহার করুন।

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

## কীভাবে কাজ করে

Intlayer **প্রতি-কম্পোনেন্ট (per-component) কৌশল** ব্যবহার করে। গ্লোবাল JSON ফাইলগুলোর বিপরীতে, আপনার কন্টেন্টগুলো সরাসরি কম্পোনেন্টের পাশে বা ভেতরে সংজ্ঞায়িত করা থাকে। বিল্ড প্রক্রিয়ার সময়, Intlayer যা করে:

1. আপনার কোড **বিশ্লেষণ** করে `useIntlayer` কলগুলো খুঁজে বের করে।
2. সংশ্লিষ্ট ডিকশনারি কন্টেন্ট **বিল্ড** করে।
3. আপনার কনফিগারেশনের উপর ভিত্তি করে অপ্টিমাইজ করা কোড দিয়ে `useIntlayer` কলটিকে **প্রতিস্থাপন** করে।

এটি নিশ্চিত করে যে:

- যদি কোনো কম্পোনেন্ট ইমপোর্ট (import) করা না হয়, তবে তার কন্টেন্ট বান্ডেলে অন্তর্ভুক্ত হয় না (Dead Code Elimination)।
- যদি কোনো কম্পোনেন্ট লেজি-লোড (lazy-loaded) হয়, তবে তার কন্টেন্টও লেজি-লোড হয়।

## প্লাগিন রেফারেন্স

Intlayer-এর বিল্ড অপ্টিমাইজেশন কয়েকটি আলাদা প্লাগিনে বিভক্ত, যার প্রত্যেকটির একটি সুনির্দিষ্ট দায়িত্ব রয়েছে। কনফিগারেশন সেট আপ করার সময় কোনো প্লাগিন কী করে তা জানা থাকলে বিভ্রান্তি এড়ানো যায়।

### Babel প্লাগিনসমূহ (`@intlayer/babel`)

এগুলো Webpack-ভিত্তিক সেটআপগুলোর জন্য (Babel সহ Next.js, CRA, কাস্টম Webpack ইত্যাদি) সরাসরি `babel.config.js`-এ ব্যবহৃত হয়।

নিচের টেবিলটি সেগুলিকে প্রয়োজনীয় পাইপলাইন ক্রমে তালিকাভুক্ত করে (একই ক্রম যেভাবে সেগুলি `babel.config.js`-এ থাকতে হবে):

| প্লাগিন                       | কী কাজ করে                                                                                                                                  |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`  | `.content.ts` ফাইলগুলো স্ক্যান করে এবং কম্পাইল করা ডিকশনারিগুলো `.intlayer/`-এ লেখে                                                         |
| `intlayerPurgeBabelPlugin`    | সব সোর্স ফাইল স্ক্যান করে, এবং কম্পাইল করা `.intlayer/**/*.json` ডিকশনারি ফাইলগুলো থেকে **অব্যবহৃত কন্টেন্ট ফিল্ড** সরিয়ে দেয়             |
| `intlayerMinifyBabelPlugin`   | JSON ফাইল এবং সোর্স কোড—উভয় জায়গাতেই **কন্টেন্ট ফিল্ডের কী (keys) গুলোকে** ছোট অক্ষরের ছদ্মনামে (alias) রূপান্তর করে (যেমন `title` → `a`) |
| `intlayerOptimizeBabelPlugin` | `useIntlayer('key')` কে `useDictionary(hash)`-এ রূপান্তর করে এবং সঠিক ডিকশনারির `import` যোগ করে                                            |

> **প্লাগিনের ক্রম অত্যন্ত গুরুত্বপূর্ণ।** আপনার `babel.config.js` ফাইলে purge এবং minify প্লাগিনগুলো অবশ্যই optimize প্লাগিনের **আগে** রাখতে হবে। optimize পাস `useIntlayer('key')` কে একটি অস্বচ্ছ `useDictionary(hash)` কল দিয়ে প্রতিস্থাপন করে, যার ফলে ডিকশনারির কী-এর তথ্য হারিয়ে যায়, অথচ purge এবং minify ধাপগুলোতে কোন ফিল্ডগুলো ব্যবহৃত হচ্ছে তা চেনার জন্য ঐ তথ্যগুলো অপরিহার্য।

প্রতিটি Babel প্লাগিনের সাথে একটি অপশন হেল্পার (options helper) আছে যা কনফিগারেশন লোড করার সময় আপনার `intlayer.config.ts` একবার পড়ে এবং প্রাক-নির্ধারিত মানগুলো (pre-resolved values) ফেরত দেয়:

| অপশন হেল্পার                 | কোন প্লাগিনের সাথে ব্যবহৃত হয় |
| :--------------------------- | :----------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`   |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`     |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`    |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin`  |

### Vite প্লাগিনসমূহ (`vite-intlayer`)

Vite ব্যবহারকারীদের **কখনোই এগুলো সরাসরি কনফিগার করতে হয় না**। আপনি যখন `vite.config.ts`-এ `withIntlayer()` কল করেন, তখন এগুলো স্বয়ংক্রিয়ভাবে যুক্ত হয়ে যায়। `intlayer.config.ts`-এর `build.purge` এবং `build.minify` ফ্ল্যাগগুলো কোনো অতিরিক্ত প্লাগিন রেজিস্টার করা ছাড়াই তাদের নির্দিষ্ট কাজ সম্পাদন করে।

| অভ্যন্তরীণ Vite প্লাগিন | সমতুল্য আচরণ                                                                                  |
| :---------------------- | :-------------------------------------------------------------------------------------------- |
| Usage analyzer          | `intlayerPurgeBabelPlugin`-এর অ্যানালাইজ পাসের সমতুল্য                                        |
| Dictionary prune        | `intlayerPurgeBabelPlugin`-এর JSON লেখার পাসের সমতুল্য                                        |
| Dictionary minify       | `intlayerMinifyBabelPlugin`-এর JSON লেখার পাসের সমতুল্য                                       |
| Babel transform         | `intlayerMinifyBabelPlugin`-এর সোর্স কোড রিনেম করা + `intlayerOptimizeBabelPlugin`-এর সমতুল্য |

### SWC প্লাগইন (`@intlayer/swc`)

Next.js ব্যবহারকারীরাও **কখনও এগুলি সরাসরি কনফিগার করেন না**। **v9.2.1** থেকে, `next.config.ts`-এর `withIntlayer()` কেবল `build.purge` ও `build.minify` ফ্ল্যাগের ভিত্তিতেই সম্পূর্ণ পাইপলাইন চালায় — purge, minify এবং import পুনর্লিখন।

কাজটি দুই ভাগে বিভক্ত, কারণ একটি SWC Wasm প্লাগইন একবারে একটি ফাইল রূপান্তর করে এবং ফাইল সিস্টেমে তার প্রবেশাধিকার নেই:

| ধাপ                                      | কোথায় চলে                      | কী করে                                                                                                |
| :--------------------------------------- | :------------------------------ | :---------------------------------------------------------------------------------------------------- |
| ব্যবহার বিশ্লেষণ + JSON purge/minify     | Node, `withIntlayer()`-এর ভিতরে | প্রতিটি কম্পোনেন্ট সোর্স ফাইল পড়ে, `.intlayer/**/*.json` পুনর্লিখন করে এবং পুনঃনামকরণ টেবিল তৈরি করে |
| সোর্স পুনর্লিখন (`content.title` → `.a`) | `@intlayer/swc` (Wasm)          | পুনঃনামকরণ টেবিলগুলি আপনার কোডের সংশ্লিষ্ট প্রপার্টি অ্যাক্সেসে প্রয়োগ করে                           |
| Import পুনর্লিখন (`useIntlayer` → dict)  | `@intlayer/swc` (Wasm)          | `intlayerOptimizeBabelPlugin`-এর অনুরূপ                                                               |

_কোন_ ফিল্ডগুলি অব্যবহৃত এবং প্রতিটি _কোন_ উপনাম পাবে তা নির্ধারণ করতে ফাইল-জুড়ে অবস্থা এবং ফাইল I/O প্রয়োজন, তাই সেই অর্ধেকটি Node-এ চলে; SWC প্লাগইন কেবল ফলাফল টেবিলগুলি পায়।

## প্ল্যাটফর্ম অনুযায়ী সেটআপ

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js-এর জন্য `@intlayer/swc` প্লাগইন প্রয়োজন, কারণ Next.js বিল্ডের জন্য SWC ব্যবহার করে। **v9.2.1** থেকে এই একটি প্যাকেজই পুরো পাইপলাইন সামলায় — অপ্টিমাইজ (import পুনর্লিখন), purge এবং minify।

> এই প্লাগিনটি ডিফল্টভাবে ইনস্টল হয় না কারণ SWC প্লাগিনগুলো Next.js-এর জন্য এখনও পরীক্ষামূলক পর্যায়ে রয়েছে। এটি ভবিষ্যতে পরিবর্তন হতে পারে।

> **Next.js 16.1.0 হল ন্যূনতম সংস্করণ।** এটি SWC-এর ফরওয়ার্ড-সামঞ্জস্যপূর্ণ Wasm প্লাগইন ABI-এর উপর নির্মিত প্রথম রিলিজ; এর আগের রিলিজগুলি প্লাগইনটি প্রত্যাখ্যান করে। `withIntlayer` আপনার প্রকল্পের Next.js সংস্করণ পড়ে এবং 16.1.0-এর নিচে প্লাগইনটি নিবন্ধনই করে না — সেই বিল্ডগুলি তবুও সফল হয়, শুধু বান্ডল অপ্টিমাইজেশন ছাড়া চলে।

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

একবার ইনস্টল হয়ে গেলে, Intlayer স্বয়ংক্রিয়ভাবে প্লাগিনটি শনাক্ত করবে এবং ব্যবহার করবে।

**Purge ও minify** ধাপগুলির (ফিল্ড অপসারণ ও ফিল্ড পুনঃনামকরণ) জন্য কোনো অতিরিক্ত প্যাকেজ বা `babel.config.js` লাগে না। আপনার কনফিগ `withIntlayer` দিয়ে মুড়ে দিন এবং `intlayer.config.ts`-এ ফ্ল্যাগগুলি চালু করুন:

```typescript fileName="next.config.ts"
import { withIntlayer } from "next-intlayer/server";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {/* আপনার কনফিগ */};

export default withIntlayer(nextConfig);
```

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // বান্ডল করা JSON থেকে অব্যবহৃত কনটেন্ট ফিল্ড সরিয়ে দেয়
    minify: true, // কনটেন্ট ফিল্ড কী-গুলিকে সংক্ষিপ্ত উপনামে পরিবর্তন করে
  },
};

export default config;
```

`next build` চলাকালীন `withIntlayer` আপনার সোর্স বিশ্লেষণ করে, কম্পাইল করা অভিধানগুলি পুনর্লিখন করে এবং ফলস্বরূপ ফিল্ড-পুনঃনামকরণ টেবিলগুলি `@intlayer/swc`-কে পাঠায়, যা আপনার কোডের সংশ্লিষ্ট প্রপার্টি অ্যাক্সেস হালনাগাদ করে।

> `withIntlayerSync` নয়, অ্যাসিঙ্ক্রোনাস `withIntlayer` ব্যবহার করুন। সিঙ্ক্রোনাস সংস্করণটি বিশ্লেষণ পাইপলাইন চালায় না, তাই এর সঙ্গে purge ও minify কোনো প্রভাব ফেলে না।

> Purge ও minify কেবল `next build`-এ চলে — অপ্টিমাইজ পাইপলাইন `next dev` চলাকালীন বন্ধ থাকে।

> কম্প্যাট-অ্যাডাপ্টার কলার কনফিগার করা থাকলেও এগুলি নিষ্ক্রিয় হয়ে যায় (`swcExtraCallers`, যা `@intlayer/next-intl` বা `@intlayer/react-i18next`-এর মতো কম্প্যাট প্যাকেজগুলি সেট করে): সেই কল সাইটগুলি ব্যবহার বিশ্লেষকের কাছে অদৃশ্য, তাই purge এমন ফিল্ড মুছে ফেলত যা কোড এখনও পড়ে। Import পুনর্লিখন সক্রিয় থাকে।

**আগের সংস্করণগুলিতে (9.2.1-এর পূর্বে)** `@intlayer/babel` এবং `intlayerPurgeBabelPlugin` ও `intlayerMinifyBabelPlugin` ঘোষণাকারী একটি `babel.config.js` প্রয়োজন ছিল। সেই ফাইলটি আর প্রয়োজন নেই এবং মুছে ফেলা যায়।

 </Tab>
 <Tab value="vite">

### Vite

Vite `@intlayer/babel` প্লাগিনটি ব্যবহার করে, যা `vite-intlayer`-এর একটি ডিপেন্ডেন্সি হিসেবে অন্তর্ভুক্ত। পুরো অপ্টিমাইজেশন পাইপলাইন — import রূপান্তর, purge, এবং minify — ডিফল্টভাবে সক্রিয় থাকে এবং এর জন্য অতিরিক্ত কোনো প্লাগিন রেজিস্টার করার প্রয়োজন নেই।

`intlayer.config.ts`-এ নির্দিষ্ট ফ্ল্যাগ সেট করে purge এবং minify চালু করুন:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // বান্ডেল করা JSON থেকে অব্যবহৃত কন্টেন্ট ফিল্ড রিমুভ করবে
    minify: true, // কন্টেন্ট ফিল্ড কী-গুলোকে ছোট ছদ্মনামে রিনেম করবে
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (এবং Babel সহ Next.js)

`@intlayer/babel` ইনস্টল করুন:

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

সঠিক ক্রমে চারটে প্লাগিনই `babel.config.js`-এ যোগ করুন:

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
    // Extract: .content.ts ফাইলগুলো কম্পাইল করে → .intlayer/**/*.json তৈরি করে
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: .intlayer/**/*.json থেকে অব্যবহৃত ফিল্ড রিমুভ করে
    //    (intlayer.config.ts-এর build.purge ফ্ল্যাগ পড়ে কাজ করে)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: JSON + সোর্স কোডে ফিল্ড কী রিনেম করে
    //    (intlayer.config.ts-এর build.minify ফ্ল্যাগ পড়ে কাজ করে)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: useIntlayer('key') কে → useDictionary(hash) এ রূপান্তর করে
    //    এটি অবশ্যই সবার শেষে থাকতে হবে, কারণ এটি ডিকশনারির কী মুছে দেয়।
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## কনফিগারেশন

আপনি আপনার `intlayer.config.ts` ফাইলের `build` প্রপার্টির মাধ্যমে Intlayer কীভাবে আপনার বান্ডেল অপ্টিমাইজ করবে তা নিয়ন্ত্রণ করতে পারবেন।

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.BENGALI],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // বিল্ড-টাইমে useIntlayer() কলগুলোকে সরাসরি ডিকশনারি ইমপোর্ট দিয়ে প্রতিস্থাপন করে।
    // undefined = auto (production-এ চালু থাকে), true = সর্বদা, false = কখনোই না।
    optimize: undefined,

    // কম্পাইল করা ডিকশনারিতে কন্টেন্ট ফিল্ডের কী-গুলোকে ছোট অক্ষরের ছদ্মনামে
    // রিনেম করে (যেমন title → a)। এটি JSON সাইজ ছোট করে; এর জন্য optimize চালু থাকা প্রয়োজন।
    minify: true,

    // সোর্স কোডে যেসব কন্টেন্ট ফিল্ড কখনোই অ্যাক্সেস করা হয় না সেগুলোকে সরিয়ে দেয়।
    // এর জন্য optimize চালু থাকা প্রয়োজন।
    purge: true,
  },
};

export default config;
```

> বেশিরভাগ ক্ষেত্রে `optimize`-এর ডিফল্ট মান (`undefined`) রাখাটাই বাঞ্ছনীয়।

> সমস্ত অপশনের জন্য কনফিগারেশন রেফারেন্স দেখুন: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md)

### বিল্ড অপশনসমূহ

| প্রপার্টি      | ধরন                   | ডিফল্ট      | বিবরণ                                                                                                                                                                                                   |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean / undefined` | `undefined` | ইমপোর্ট রূপান্তর পাসটি চালু করে। `undefined` = শুধুমাত্র প্রোডাকশন বিল্ডে সক্রিয় থাকে। `false` দিলে purge এবং minify-ও নিষ্ক্রিয় হয়ে যায়।                                                           |
| **`minify`**   | `boolean`             | `false`     | কম্পাইল করা JSON ফাইলে কন্টেন্ট ফিল্ডের কী-গুলোকে ছোট অক্ষরের ছদ্মনামে রিনেম করে। সেই সাথে সোর্স কোডে থাকা প্রপার্টি অ্যাক্সেসগুলোও পরিবর্তন করে। `optimize` যদি `false` থাকে তবে এটি কোনো কাজ করবে না। |
| **`purge`**    | `boolean`             | `false`     | সোর্স কোডে যেসব কন্টেন্ট ফিল্ড স্ট্যাটিক্যালি কখনোই অ্যাক্সেস করা হয়নি সেগুলোকে কম্পাইল করা JSON ফাইল থেকে রিমুভ করে দেয়। `optimize` যদি `false` থাকে তবে এটি কোনো কাজ করবে না।                       |

### Minification (ফিল্ডের কী রিনেম করা)

`build.minify` কিন্তু আপনার JavaScript বান্ডেলটিকে **মিনিফাই করে না** — সেটি আপনার বান্ডলার-এর দায়িত্ব। এর পরিবর্তে, এটি আপনার ডিফাইন করা প্রতিটি কন্টেন্ট ফিল্ডের কী-কে ছোট অক্ষরের ছদ্মনাম (alias) দিয়ে রিপ্লেস করে কম্পাইল করা ডিকশনারি JSON ফাইলের সাইজ ছোট করে:

```
// মিনিফাই করার আগে
{ "title": "হ্যালো", "subtitle": "বিশ্ব" }

// মিনিফাই করার পরে
{ "a": "হ্যালো", "b": "বিশ্ব" }
```

আপনার সোর্স কোডের সব প্রপার্টি অ্যাক্সেসেও একই রিনেম প্রক্রিয়া প্রয়োগ করা হয়, ফলে কম্পাইল করা আউটপুটে `content.title` হয়ে যায় `content.a`। রানটাইমে এর কাজ হুবহু একই থাকে।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> যখন `optimize` `false` থাকে বা যখন `editor.enabled` `true` থাকে তখন মিনিফিকেশন বাদ দেওয়া হয় (ভিজ্যুয়াল এডিটরের এডিটিং সচল রাখার জন্য অরিজিনাল ফিল্ডের নামগুলো প্রয়োজন)।

> Next.js-এ, `@intlayer/swc` ইনস্টল না থাকলে বা লোড করা না গেলে (16.1.0-এর নিচের Next.js) minification-ও এড়িয়ে যাওয়া হয়। সোর্সের অ্যাক্সেসগুলি পুনর্লিখন করে এই প্লাগইনই, তাই এটি ছাড়া অভিধান পুনঃনামকরণ করলে আপনার কোড এমন ফিল্ড নাম পড়তে থাকবে যা আর নেই।

> `importMode: 'fetch'` এর মাধ্যমে লোড করা ডিকশনারিগুলোর ক্ষেত্রেও মিনিফিকেশন করা হয় না, কারণ அவற்றின் JSON একটি রিমোট API থেকে অরিজিনাল ফিল্ডের নাম ব্যবহার করে সার্ভ করা হয় — ক্লায়েন্ট-সাইডে কী-গুলোর নাম পরিবর্তন করলে সার্ভার/ক্লায়েন্ট চুক্তি ভেঙে যাবে।

### Purging (অব্যবহৃত ফিল্ড সরিয়ে ফেলা)

`build.purge` বিশ্লেষণ করে দেখে আপনার সোর্স কোডে ঠিক কোন কন্টেন্ট ফিল্ডগুলো অ্যাক্সেস করা হচ্ছে এবং কম্পাইল করা JSON ফাইল থেকে বাকি সমস্ত ফিল্ড সরিয়ে দেয়।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**উদাহরণ:** পাঁচটি ফিল্ডযুক্ত একটি ডিকশনারি যার মধ্যে মাত্র দুটি ব্যবহৃত হয়েছে:

```
// purge করার আগে
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// purge করার পরে (সোর্সে কেবল title + subtitle অ্যাক্সেস করা হয়েছে)
{ "title": "…", "subtitle": "…" }
```

> যখন `optimize` `false` থাকে বা `editor.enabled` `true` থাকে তখন Purge বাদ দেওয়া হয়। Next.js-এ `@intlayer/swc` অনুপলব্ধ হলে এবং কম্প্যাট-অ্যাডাপ্টার কলার কনফিগার করা থাকলে এটি অতিরিক্তভাবে এড়িয়ে যাওয়া হয়।

> যদি কোনো সোর্স ফাইল পার্স (parse) করা না যায়, অথবা `useIntlayer`-এর রেজাল্ট কোনো ভেরিয়েবলে অ্যাসাইন করে এমনভাবে পাস করা হয় যা স্ট্যাটিক অ্যানালাইজার ট্র্যাক করতে পারে না (যেমন, কোনো অবজেক্টের মধ্যে স্প্রেড করা, অথবা ডিস্ট্রাকচার না করেই প্রপ হিসেবে পাস করা), সেক্ষেত্রে সুরক্ষার খাতিরে Purge প্রক্রিয়াটি এড়িয়ে যাওয়া হয়। এই ধরনের ক্ষেত্রে সম্পূর্ণ ডিকশনারিটি অক্ষত রাখা হয়।

### Import Mode

অনেক পেজ ও লোকেলের সমন্বয়ে তৈরি বড় অ্যাপ্লিকেশনগুলোর ক্ষেত্রে, JSON আপনার বান্ডেল সাইজের একটি বড় অংশ দখল করতে পারে। Intlayer-এর `importMode` অপশন ব্যবহার করে আপনি নিয়ন্ত্রণ করতে পারবেন ডিকশনারিগুলো কীভাবে লোড হবে।

### গ্লোবাল ডেফিনেশন (Global definition)

আপনার `intlayer.config.ts` ফাইলে গ্লোবালি ইমপোর্ট মোড নির্ধারণ করা যেতে পারে।

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // ডিফল্ট হলো 'static'
  },
};

export default config;
```

### প্রতি-ডিকশনারি ডেফিনেশন (Per-dictionary definition)

আপনি চাইলে নির্দিষ্ট কোনো ডিকশনারির জন্য তার নিজস্ব `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` ফাইলে গিয়ে ইমপোর্ট মোড ওভাররাইড করতে পারেন।

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // ডিফল্ট ইমপোর্ট মোডকে ওভাররাইড করে
  content: {
    // ...
  },
};

export default appContent;
```

| প্রপার্টি        | ধরন                                | ডিফল্ট     | বিবরণ                                                                                                                                     |
| :--------------- | :--------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Deprecated (বাতিলযোগ্য)**: এর পরিবর্তে `dictionary.importMode` ব্যবহার করুন। এটি নির্ধারণ করে ডিকশনারিগুলো কীভাবে লোড হবে (নিচে দেখুন)। |

`importMode` সেটিং ঠিক করে দেয় কীভাবে আপনার কম্পোনেন্টে ডিকশনারির কন্টেন্ট যুক্ত হবে। এটি আপনি গ্লোবালি `intlayer.config.ts`-এ `dictionary` অবজেক্টের অধীনে ডিফাইন করতে পারেন, অথবা নির্দিষ্ট ডিকশনারির `.content.ts` ফাইলে গিয়ে তা ওভাররাইড করতে পারেন।

### ১. স্ট্যাটিক মোড (Static Mode - `default`)

স্ট্যাটিক মোডে, Intlayer `useIntlayer` কে `useDictionary` দিয়ে প্রতিস্থাপন করে এবং সরাসরি JavaScript বান্ডেলের মধ্যে ডিকশনারি যুক্ত করে দেয়।

- **সুবিধা (Pros):** তাৎক্ষণিক রেন্ডারিং (সিঙ্ক্রোনাস), হাইড্রেশনের সময় অতিরিক্ত কোনো নেটওয়ার্ক রিকোয়েস্ট হয় না।
- **অসুবিধা (Cons):** এই বান্ডেলের মধ্যে ওই নির্দিষ্ট কম্পোনেন্টের জন্য **সবগুলো** ভাষার অনুবাদই থেকে যায়।
- **উপযুক্ত ক্ষেত্র (Best for):** সিঙ্গেল পেজ অ্যাপ্লিকেশন (SPA)।

**রূপান্তরিত কোডের উদাহরণ:**

```tsx
// আপনার কোড
const content = useIntlayer("my-key");

// রূপান্তরের পরে অপ্টিমাইজ করা কোডের ইলাস্ট্রেশন (Static)
// এটি কেবল বোঝানোর সুবিধার্থে দেওয়া হলো, আসল কোডটি অপ্টিমাইজেশনের কারণে কিছুটা ভিন্ন হতে পারে
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      bn: "আমার শিরোনাম",
    },
  },
});
```

### ২. ডাইনামিক মোড (Dynamic Mode)

ডাইনামিক মোডে, Intlayer `useIntlayer` কে `useDictionaryAsync` দিয়ে প্রতিস্থাপন করে। এটি `import()` মেকানিজম (Suspense-এর মতো) ব্যবহার করে, যাতে শুধুমাত্র বর্তমান লোকেলের JSON-টি নির্দিষ্টভাবে লেজি-লোড করা যায়।

- **সুবিধা (Pros):** **লোকেল-লেভেল ট্রি শেকিং (Locale-level tree shaking)।** যে ইউজার ইংরেজি ভার্সন দেখছেন তিনি _কেবলমাত্র_ ইংরেজি ডিকশনারিটিই ডাউনলোড করবেন। বাংলা ডিকশনারি কখনোই লোড হবে না।
- **অসুবিধা (Cons):** হাইড্রেশনের সময় প্রতি কম্পোনেন্টে একটি করে নেটওয়ার্ক রিকোয়েস্ট (asset fetch) ফায়ার করে।
- **উপযুক্ত ক্ষেত্র (Best for):** বড় বড় টেক্সট ব্লক, আর্টিকেল, বা এমন অ্যাপ্লিকেশন যা বহু ভাষা সাপোর্ট করে যেখানে বান্ডেল সাইজ একটি বড় ফ্যাক্টর।

**রূপান্তরিত কোডের উদাহরণ:**

```tsx
// আপনার কোড
const content = useIntlayer("my-key");

// রূপান্তরের পরে অপ্টিমাইজ করা কোডের ইলাস্ট্রেশন (Dynamic)
// এটি কেবল বোঝানোর সুবিধার্থে দেওয়া হলো, আসল কোডটি অপ্টিমাইজেশনের কারণে কিছুটা ভিন্ন হতে পারে
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  bn: () =>
    import(".intlayer/dynamic_dictionary/my-key/bn.json").then(
      (mod) => mod.default
    ),
});
```

> যখন আপনি `importMode: 'dynamic'` ব্যবহার করছেন, তখন যদি একই পেজে ১০০টি কম্পোনেন্ট `useIntlayer` ব্যবহার করে, তবে ব্রাউজার ১০০টি আলাদা ফেচ (fetch) করার চেষ্টা করবে। রিকোয়েস্টের এই "ওয়াটারফল" এড়াতে, প্রতিটি ছোট কম্পোনেন্টের জন্য একটি করে ফাইল না বানিয়ে, কন্টেন্টগুলোকে কমসংখ্যক `.content` ফাইলে (যেমন, প্রতিটি পেজ সেকশনের জন্য একটি ডিকশনারি) গ্রুপ করে ফেলুন। আপনি একই কী ব্যবহার করে একাধিক `.content` ফাইলও ব্যবহার করতে পারেন। Intlayer সেগুলো একত্র করে একটি সিঙ্গেল ডিকশনারি তৈরি করবে।

### ৩. ফেচ মোড (Fetch Mode)

এটি ডাইনামিক মোডের মতোই কাজ করে, তবে প্রথমেই Intlayer Live Sync API থেকে ডিকশনারি ফেচ করার চেষ্টা করে। যদি API কলটি ব্যর্থ হয় বা কন্টেন্টটি লাইভ আপডেটের জন্য চিহ্নিত না থাকে, তখন এটি পুনরায় ডাইনামিক ইমপোর্টে (dynamic import) ফিরে যায়।

**রূপান্তরিত কোডের উদাহরণ:**

```tsx
// আপনার কোড
const content = useIntlayer("my-key");

// অপ্টিমাইজ করা কোডের ইলাস্ট্রেশন (Fetch)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  bn: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/bn").then((res) =>
      res.json()
    ),
});
```

> আরও বিস্তারিত জানতে CMS ডকুমেন্টেশন দেখুন: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/intlayer_CMS.md)

> ফেচ মোডে purge বা minification প্রযোজ্য হয় না কারণ JSON একটি রিমোট API থেকে অরিজিনাল ফিল্ডের নামেই পরিবেশন করা হয়।

## সারসংক্ষেপ: স্ট্যাটিক বনাম ডাইনামিক (Static vs Dynamic)

| বৈশিষ্ট্য                 | স্ট্যাটিক মোড (Static Mode)                 | ডাইনামিক মোড (Dynamic Mode)                    |
| :------------------------ | :------------------------------------------ | :--------------------------------------------- |
| **JS বান্ডেল সাইজ**       | বড় (কম্পোনেন্টের সব ভাষা অন্তর্ভুক্ত থাকে) | সবচেয়ে ছোট (শুধুমাত্র কোড থাকে, কন্টেন্ট নয়) |
| **প্রাথমিক লোড**          | তাৎক্ষণিক (কন্টেন্ট বান্ডেলের ভেতরেই থাকে)  | সামান্য দেরি হয় (JSON ফেচ করে)                |
| **নেটওয়ার্ক রিকোয়েস্ট** | 0 (অতিরিক্ত কোনো রিকোয়েস্ট নেই)            | প্রতি ডিকশনারি কী-এর জন্য ১টি রিকোয়েস্ট       |
| **ট্রি শেকিং**            | কম্পোনেন্ট-লেভেল                            | কম্পোনেন্ট-লেভেল + লোকেল-লেভেল                 |
| **সেরা ব্যবহারক্ষেত্র**   | UI কম্পোনেন্ট, ছোট অ্যাপ                    | টেক্সট-বহুল পেজ, অনেকগুলো ভাষা                 |
