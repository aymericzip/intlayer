---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: ESLint প্লাগইন | Intlayer এর জন্য লিন্ট নিয়ম
description: eslint-plugin-intlayer ব্যবহার করে হার্ডকোডেড স্ট্রিং, ডাইনামিক কল যা Intlayer কম্পাইলার অপ্টিমাইজ করতে পারে না এবং অব্যবহৃত ডিকশনারি সামগ্রী শনাক্ত করুন। React, Vue, Svelte, Angular এবং Astro জুড়ে ESLint এবং oxlint এর সাথে কাজ করে।
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - লিন্টিং
  - i18n
  - আন্তর্জাতিকীকরণ
  - no-raw-text
  - হার্ডকোডেড স্ট্রিং
  - অব্যবহৃত অনুবাদ
  - মৃত সামগ্রী
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
    changes: "প্রাথমিক ইতিহাস"
author: aymericzip
---

# ESLint x OXLint প্লাগইন

`eslint-plugin-intlayer` এমন ধরনের i18n ভুলগুলো শনাক্ত করে যা TypeScript ধরতে পারে না:

1. **হার্ডকোডেড টেক্সট** যা কখনই কোনো ডিকশনারিতে স্থান পায়নি।
2. **ডাইনামিক কল** যা টাইপ-চেক পাস করে এবং রান হয়, কিন্তু Intlayer কম্পাইলার অপ্টিমাইজ করতে পারে না।
3. **মৃত সামগ্রী (Dead content)** — ডিকশনারি এবং ফিল্ড যা প্রজেক্টের কোথাও রিড করা হয় না (ঐচ্ছিক/opt-in)।

অজানা ডিকশনারি কি, অজানা ফিল্ড পাথ এবং অনুপস্থিত লোকেলগুলো ইতিমধ্যেই কম্পাইল এরর, তাই প্লাগইন সেগুলো পুনরাবৃত্তি করে না।

## ইনস্টলেশন

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

ESLint 9 বা পরবর্তী সংস্করণ (flat config) প্রয়োজন। ESLint 10 সমর্থিত।

## ব্যবহার

প্লাগইনটি ESLint এবং [oxlint](https://oxc.rs) উভয় পরিবেশেই একই নিয়ম ও একই বিকল্প সহ কাজ করে।

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

অথবা একটি কনফিগ ছড়িয়ে দিন এবং তীব্রতা নিজে নির্ধারণ করুন:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
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

দুটি বিষয় মনে রাখবেন: oxlint এর JS প্লাগইন সমর্থন এখনও আলফা পর্যায়ে রয়েছে এবং oxlint কাস্টম পার্সার সমর্থন করে না — তাই `.vue`, `.svelte`, `.astro` এবং Angular টেমপ্লেট সেখানে লিন্ট করা হয় না। আপনার JS/TS/JSX ফাইলগুলোর জন্য oxlint চালান এবং বাকিগুলোর জন্য ESLint ব্যবহার করুন।

উপরে `no-unused-content` ইচ্ছাকৃতভাবে বাদ দেওয়া হয়েছে: এটির রুল কনটেক্সট থেকে ওয়ার্কিং ডিরেক্টরি এবং লিন্ট করা ফাইল পাথ প্রয়োজন, যা আলফা JS প্লাগইন ব্রিজ নিশ্চিত করে না। এটি ESLint এর অধীনে চালান।

  </Tab>
</Tabs>

### কনফিগারেশনসমূহ (Configs)

| কনফিগারেশন      | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                    | error                   | error                     | off                      | off                 |
| `strict`        | error (+ অ-JSX লিটারেল) | error                   | error                     | error                    | off                 |
| `contract-only` | off                     | error                   | error                     | off                      | off                 |

`recommended` ইচ্ছাকৃতভাবে `no-raw-text` কে `warn` হিসেবে রাখে: এটি বিদ্যমান কোনো কোডবেসে প্রয়োগ করলে সমস্ত অননূদিত স্ট্রিং একসাথে প্রকাশ পায়, যা প্রথম দিনেই আপনার বিল্ড ভেঙে ফেলা উচিত নয়।

`enforce-adapter-import` ডিফল্টভাবে বন্ধ থাকে — প্রয়োজন হলে স্পষ্টভাবে সক্ষম করুন।

`no-unused-content` প্রতিটি কনফিগারেশনেই বন্ধ থাকে, যার মধ্যে `strict` ও অন্তর্ভুক্ত। এটি একমাত্র নিয়ম যা আপনার Intlayer কনফিগারেশন পড়ে এবং ডিস্ক থেকে সোর্স ফাইলগুলো স্ক্যান করে, তাই এটি চালু করা একটি সুচিন্তিত সিদ্ধান্ত হওয়া উচিত।

## নিয়মাবলী

### `no-raw-text`

ডিকশনারিতে ঘোষিত নয় এমন ব্যবহারকারী-মুখী টেক্সট রিপোর্ট করে। এটি `intlayer extract` এর মতো একই সনাক্তকরণ ব্যবহার করে, তাই ব্র্যান্ডের নাম, CSS ক্লাস এবং প্রযুক্তিগত শনাক্তকারীগুলোকে উপেক্ষা করা হয়।

```jsx
// ✗ রিপোর্ট করা হয়েছে
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ সঠিক
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

কন্টেন্ট ডিক্লারেশন ফাইলগুলো (`*.content.ts`, …) বাদ দেওয়া হয়।

একবারে পুরো ফাইল ঠিক করতে, `npx intlayer extract` চালান এবং কম্পাইলারকে স্ট্রিংগুলো ডিকশনারিতে সরিয়ে নিতে দিন।

**বিকল্পসমূহ**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // যেসব বৈশিষ্ট্যের মান ব্যবহারকারী-মুখী টেক্সট।
      // ডিফল্ট: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // যেসব উপাদানের সামগ্রী কখনই ব্যবহারকারী-মুখী টেক্সট নয়।
      // ডিফল্ট: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // কখনই রিপোর্ট না করার টেক্সটের জন্য রেগুলার এক্সপ্রেশন।
      ignorePatterns: ["^Powered by"],

      // মার্কআপের বাইরের স্ট্রিং লিটারেলগুলোও রিপোর্ট করবেন কিনা। ডিফল্ট: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

ডিকশনারি কি একটি স্ট্রিং লিটারেল হওয়া প্রয়োজন।

কম্পাইলার কেবল তখনই একটি ডিকশনারি প্রি-লোড করতে পারে যখন এটি কল সাইটে সরাসরি কি পড়তে পারে। একটি কম্পিউটেড কি-এর ক্ষেত্রে এটি নীরবে অপ্টিমাইজেশন এড়িয়ে যায় এবং পরিবর্তে প্রতিটি ডিকশনারি বান্ডেল করে।

```typescript
// ✗ রিপোর্ট করা হয়েছে
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ ভেরিয়েবল এখনও লিটারেল নয়
const key = "home";
useIntlayer(key);

// ✓ সঠিক
useIntlayer("home");
getTranslations({ namespace: "home" });
```

এটি `useIntlayer`, `getIntlayer` এবং প্রতিটি সামঞ্জস্যপূর্ণ অ্যাডাপ্টারের (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …) ক্ষেত্রে প্রযোজ্য।

### `no-dynamic-field-access`

ডিকশনারি থেকে যে ফিল্ডটি আপনি পড়েন তা স্ট্যাটিকভাবে জানা থাকা প্রয়োজন।

কম্পাইলার সেই ফিল্ডগুলো সরিয়ে দেয় যেগুলোর ব্যবহার সে দেখতে পায় না। একটি কম্পিউটেড অ্যাক্সেস কম্পাইলারের কাছে অদৃশ্য থাকে, তাই রানটাইমে রিড `undefined` রিটার্ন করতে পারে।

```typescript
// ✗ রিপোর্ট করা হয়েছে
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ সঠিক
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

মূল প্যাকেজের চেয়ে `@intlayer/*` কম্প্যাটিবিলিটি অ্যাডাপ্টারকে অগ্রাধিকার দেয়। মূল প্যাকেজ শুধুমাত্র তখনই Intlayer এ সমাধান হয় যখন বান্ডলার উপনাম কনফিগার করা থাকে; অ্যাডাপ্টার সর্বদা সমাধান করে। `--fix` এর মাধ্যমে স্বয়ংক্রিয়ভাবে সংশোধনযোগ্য।

```typescript
// ✗ রিপোর্ট করা হয়েছে
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ সঠিক
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**ডিফল্টভাবে বন্ধ।** প্রজেক্টে কোনো অংশ যে সামগ্রী পড়ে না, এবং একাধিক স্থানে ঘোষিত ডিকশনারি কিগুলো রিপোর্ট করে।

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ প্রজেক্টে কোনো কলার "home" না চাইলে রিপোর্ট করা হয়
  content: {
    title: t({ bn: "শিরোনাম", en: "Title" }),

    // ✗ যখন কিছুই `hero` পড়ে না তখন রিপোর্ট করা হয়
    hero: {
      subtitle: t({ bn: "উপশিরোনাম", en: "Subtitle" }),
    },
  },
};
```

অন্যান্য নিয়মের মতো এটি কেবল সামনে থাকা ফাইল থেকে সিদ্ধান্ত নিতে পারে না — একটি ফিল্ড শুধুমাত্র সম্পূর্ণ প্রজেক্টের সাপেক্ষেই অব্যবহৃত হিসেবে গণ্য হয়। লিন্ট রানের প্রথম কন্টেন্ট ডিক্লারেশনে এটি আপনার Intlayer কনফিগারেশন লোড করে, সেই কনফিগারেশনে ঘোষিত সোর্স ফাইলগুলো স্ক্যান করে (`build.traversePattern`, `compiler.transformPattern`) এবং একই ব্যবহার বিশ্লেষক চালায় যা `@intlayer/lsp` এবং VS Code এক্সটেনশনের "অব্যবহৃত" স্ট্রাইকথ্রু সমর্থন করে। ফলাফলটি `cacheTtl` মিলিসেকেন্ডের জন্য ক্যাশ থাকে, তাই প্রতিটি ফাইলের পরিবর্তে প্রতি রানে একবার স্ক্যান হয়।

**বিকল্পসমূহ**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // যে ডিকশনারি কিগুলোতে কিছুই রেফারেন্স করে না তা রিপোর্ট করুন। ডিফল্ট: true
      reportUnusedDictionaries: true,

      // যে কন্টেন্ট ফিল্ডগুলো কিছুই পড়ে না তা রিপোর্ট করুন। ডিফল্ট: true
      reportUnusedFields: true,

      // একাধিক স্থানে ঘোষিত কিগুলো রিপোর্ট করুন। ডিফল্ট: true
      reportDuplicateKeys: true,

      // কখনই রিপোর্ট না করার ফিল্ড পাথের রেগুলার এক্সপ্রেশন।
      ignoreFields: ["^meta"],

      // প্রজেক্ট রুট যেখান থেকে স্ক্যান শুরু হয়। ডিফল্ট: ESLint ওয়ার্কিং ডিরেক্টরি
      baseDir: process.cwd(),

      // প্রজেক্ট স্ক্যান কতক্ষণ পুনঃব্যবহার করা হবে (ms এ)। ডিফল্ট: 30000
      cacheTtl: 30000,
    },
  ],
}
```

যখন আপনি দীর্ঘমেয়াদী এডিটর সার্ভার থেকে লিন্ট করেন এবং চান পরিবর্তনগুলো দ্রুত প্রতিফলিত হোক, তখন `cacheTtl` হ্রাস করুন; একটি মনোরেপোতে একাধিক Intlayer প্রজেক্ট বিস্তৃত হলে `baseDir` সেট করুন।

> **ভুল রিপোর্টিং এড়াতে এটি নীরব থাকতে পছন্দ করে।** একটি মিথ্যা ইতিবাচক রিপোর্ট একটি অনুবাদ মুছে দিতে পারে, তাই যখন ডিকশনারি এমনভাবে ব্যবহার করা হয় যা বিশ্লেষণ ট্র্যাক করতে পারে না, তখন কিছুই রিপোর্ট করা হয় না: সামগ্রী অবজেক্টটি সম্পূর্ণরূপে পাস করা, এটি থেকে আবদ্ধ একটি অনুবাদক ফাংশন (`const t = useTranslations("home")`), সরাসরি ইম্পোর্টের মাধ্যমে পৌঁছানো একটি ঘোষণা (`useDictionary(myDictionary)`), অন্য ডিকশনারি থেকে একটি `nest()`, বা স্প্রেড অপারেটর দ্বারা অসম্পূর্ণ করা একটি ফিল্ড তালিকা। একক-ফাইল উপাদানগুলো (`.vue`, `.svelte`, `.astro`) তাদের উল্লিখিত ডিকশনারির প্রতিটি ফিল্ড ব্যবহার করছে বলে গণ্য হয়, কারণ তাদের স্ক্রিপ্ট ব্লকগুলো এখানে পার্স করা হয় না।

`reportDuplicateKeys` বিল্ডের মাধ্যমে `.intlayer/` এর অধীনে সংরক্ষিত অপরিশোধিত ডিকশনারি পড়ে, তাই প্রজেক্টটি কমপক্ষে একবার বিল্ড না হওয়া পর্যন্ত এটি নীরব থাকে। দুটি ঘোষণা একই কি শেয়ার করলে সেগুলো মার্জ হয়, যা একটি বৈধ প্যাটার্ন — রিপোর্টটি বিদ্যমান কারণ উভয় পাশে সংজ্ঞায়িত একটি ফিল্ড নীরবে দুটি মানের মধ্যে কেবল একটি ধরে রাখে।

বিশ্লেষকটি `@intlayer/lsp` থেকে লোড হয়, যা ESM হিসেবে সরবরাহ করা হয়। তাই নিয়মটির জন্য একটি Node সংস্করণ প্রয়োজন যা একটি ES মডিউলকে `require()` করতে সক্ষম — Node 20.19+ বা 22.12+। পুরনো সংস্করণে এটি লিন্ট রান ব্যর্থ না করে কিছুই রিপোর্ট করে না।

## ফ্রেমওয়ার্কসমূহ

প্রতিটি নিয়ম Vue, Svelte এবং Angular টেমপ্লেট সহ সমস্ত Intlayer ইন্টিগ্রেশনে কাজ করে। আপনাকে শুধুমাত্র ESLint কে জানাতে হবে কোন পার্সার প্রতিটি ফাইলের ধরন পড়ে।

| ফ্রেমওয়ার্ক              | ফাইলসমূহ          | পার্সার                           |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular টেমপ্লেট          | `.component.html` | `@angular-eslint/template-parser` |
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

আপনার প্রজেক্টের জন্য প্রয়োজনীয় পার্সারগুলো কেবল ইনস্টল করুন।

> **পরিচিত সীমাবদ্ধতা।** Vue এবং Angular টেমপ্লেটে `{{ content[key] }}` এর মতো এক্সপ্রেশন `no-dynamic-field-access` দ্বারা পরীক্ষা করা হয় না। স্ক্রিপ্ট ব্লকে লেখা ডাইনামিক রিডগুলো স্বাভাবিকভাবেই ধরা পড়ে।
