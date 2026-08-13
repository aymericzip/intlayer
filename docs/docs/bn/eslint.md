---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint প্লাগইন | Intlayer-এর জন্য lint নিয়ম
description: eslint-plugin-intlayer দিয়ে হার্ডকোড করা স্ট্রিং এবং Intlayer কম্পাইলার যেসব ডায়নামিক কল অপটিমাইজ করতে পারে না সেগুলো ধরুন। ESLint ও oxlint-এ কাজ করে — React, Vue, Svelte, Angular এবং Astro জুড়ে।
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - আন্তর্জাতিকীকরণ
  - no-raw-text
  - হার্ডকোড করা স্ট্রিং
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

`eslint-plugin-intlayer` দুই ধরনের i18n ভুল ধরে, যেগুলো TypeScript দেখতে পায় না:

1. **হার্ডকোড করা টেক্সট** যা কখনও কোনো dictionary-তে পৌঁছায়নি।
2. **ডায়নামিক কল** যেগুলো টাইপ-চেক পাস করে এবং চলে, কিন্তু Intlayer কম্পাইলার অপটিমাইজ করতে পারে না।

অজানা dictionary key, অজানা field path এবং অনুপস্থিত locale ইতিমধ্যেই কম্পাইল ত্রুটি, তাই প্লাগইনটি সেগুলো পুনরাবৃত্তি করে না।

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

ESLint 9 বা তার নতুন সংস্করণ প্রয়োজন (flat config)।

## ব্যবহার

প্লাগইনটি ESLint এবং [oxlint](https://oxc.rs) — উভয়েই চলে; একই নিয়ম, একই অপশন।

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

অথবা নিয়মগুলো একটি একটি করে চালু করুন:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
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

দুটি বিষয় খেয়াল রাখুন: oxlint-এ JS প্লাগইন সমর্থন এখনও alpha পর্যায়ে, এবং oxlint কাস্টম parser সমর্থন করে না — তাই `.vue`, `.svelte`, `.astro` ফাইল ও Angular টেমপ্লেট সেখানে lint হয় না। আপনার JS/TS/JSX ফাইলে oxlint চালান এবং বাকিগুলোর জন্য ESLint রাখুন।

  </Tab>
</Tabs>

### কনফিগারেশন

| কনফিগারেশন      | `no-raw-text`                   | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ------------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                            | error                   | error                     | off                      |
| `strict`        | error (+ JSX-এর বাইরের literal) | error                   | error                     | error                    |
| `contract-only` | off                             | error                   | error                     | off                      |

`recommended` ইচ্ছাকৃতভাবে `no-raw-text` কে `warn` স্তরে রাখে: এটিকে বিদ্যমান codebase-এ প্রয়োগ করলে সব অননুবাদিত স্ট্রিং একসাথে সামনে চলে আসে, আর তাতে প্রথম দিনেই আপনার build ভাঙা উচিত নয়।

`enforce-adapter-import` ডিফল্টভাবে বন্ধ — প্রয়োজন হলে স্পষ্টভাবে চালু করুন।

## নিয়মসমূহ

### `no-raw-text`

ব্যবহারকারীর জন্য উদ্দিষ্ট এমন টেক্সট রিপোর্ট করে যা কোনো dictionary-তে ঘোষিত নয়। এটি `intlayer extract`-এর মতোই শনাক্তকরণ ব্যবহার করে, তাই ব্র্যান্ডের নাম, CSS ক্লাস এবং কারিগরি শনাক্তকারী উপেক্ষা করা হয়।

```jsx
// ✗ রিপোর্ট করা হয়
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ ঠিক আছে
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

কনটেন্ট ডিক্লারেশন ফাইল (`*.content.ts`, …) বাদ দেওয়া হয়।

একটি সম্পূর্ণ ফাইল একবারে ঠিক করতে `npx intlayer extract` চালান এবং কম্পাইলারকে স্ট্রিংগুলো dictionary-তে সরাতে দিন।

**অপশন**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // যেসব অ্যাট্রিবিউটের মান ব্যবহারকারীর জন্য উদ্দিষ্ট টেক্সট।
      // ডিফল্ট: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // যেসব এলিমেন্টের ভেতরের লেখা কখনও ব্যবহারকারীর টেক্সট নয়।
      // ডিফল্ট: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // যেসব টেক্সট কখনও রিপোর্ট হবে না তার রেগুলার এক্সপ্রেশন।
      ignorePatterns: ["^Powered by"],

      // markup-এর বাইরের string literal-ও রিপোর্ট করুন। ডিফল্ট: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

dictionary key একটি string literal হওয়া আবশ্যক করে।

কম্পাইলার কেবল তখনই একটি dictionary আগে থেকে লোড করতে পারে যখন সে কল-সাইটে key সরাসরি পড়তে পারে। কম্পিউটেড key হলে সে নীরবে অপটিমাইজেশন এড়িয়ে যায় এবং তার বদলে সব dictionary বান্ডল করে ফেলে।

```typescript
// ✗ রিপোর্ট করা হয়
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ ভেরিয়েবল তবুও literal নয়
const key = "home";
useIntlayer(key);

// ✓ ঠিক আছে
useIntlayer("home");
getTranslations({ namespace: "home" });
```

এটি `useIntlayer`, `getIntlayer` এবং প্রতিটি compat অ্যাডাপ্টারের (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …) ক্ষেত্রে প্রযোজ্য।

### `no-dynamic-field-access`

dictionary থেকে আপনি যে field পড়ছেন সেটি স্থিরভাবে জানা থাকা আবশ্যক করে।

কম্পাইলার সেসব field সরিয়ে ফেলে যেগুলোর ব্যবহার সে দেখতে পায় না। কম্পিউটেড অ্যাক্সেস তার কাছে অদৃশ্য, তাই রানটাইমে পড়ার সময় `undefined` ফিরতে পারে।

```typescript
// ✗ রিপোর্ট করা হয়
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ ঠিক আছে
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

মূল প্যাকেজের বদলে `@intlayer/*` compat অ্যাডাপ্টারকে প্রাধান্য দেয়। মূল প্যাকেজ কেবল তখনই Intlayer-এ resolve হয় যখন bundler alias কনফিগার করা থাকে; অ্যাডাপ্টার সবসময়ই হয়। `--fix` দিয়ে স্বয়ংক্রিয়ভাবে ঠিক করা যায়।

```typescript
// ✗ রিপোর্ট করা হয়
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ ঠিক আছে
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## ফ্রেমওয়ার্ক

সব নিয়ম Intlayer-এর সব ইন্টিগ্রেশনে কাজ করে, এমনকি Vue, Svelte ও Angular টেমপ্লেটের ভেতরেও। আপনাকে শুধু ESLint-কে জানাতে হবে কোন parser কোন ফাইল টাইপ পড়বে।

| ফ্রেমওয়ার্ক              | ফাইল              | Parser                            |
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

আপনার প্রকল্পের জন্য প্রয়োজনীয় parser গুলোই কেবল ইনস্টল করুন।

> **জানা সীমাবদ্ধতা।** Vue ও Angular টেমপ্লেটে `{{ content[key] }}`-এর মতো এক্সপ্রেশন `no-dynamic-field-access` দ্বারা পরীক্ষা করা হয় না। script ব্লকে লেখা ডায়নামিক রিড স্বাভাবিকভাবেই ধরা পড়ে।
