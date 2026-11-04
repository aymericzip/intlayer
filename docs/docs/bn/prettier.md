---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt প্লাগইন | Intlayer অনুবাদ সাজান
description: "prettier-plugin-intlayer দিয়ে t() এর লোক্যাল, plural() এর বিভাগ, enu() এর শর্ত, select() এর কেস এবং আপনার কন্টেন্ট ঘোষণার কীগুলি সাজান। Prettier এবং oxfmt দুটির সাথেই কাজ করে।"
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - ফর্ম্যাটিং
  - অনুবাদ সাজান
  - লোক্যাল সাজান
  - i18n
  - আন্তর্জাতিকীকরণ
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "প্রাথমিক ইতিহাস"
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt-এর সাথে ব্যবহার যোগ করা হয়েছে"
author: aymericzip
---

# Prettier x Oxfmt প্লাগইন

`prettier-plugin-intlayer` প্রতিবার যখন Prettier একটি ফাইল ফর্ম্যাট করে তখন আপনার অনুবাদের কীগুলি একটি নির্দিষ্ট ক্রমে সাজিয়ে দেয়। ডিফস (diffs) ছোট থাকে, মার্জ দ্বন্দ্ব কম হয় এবং অনুপস্থিত লোক্যাল সহজেই চিহ্নিত করা যায়।

```ts
// আগে
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// পরে
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## ইনস্টলেশন

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Prettier ৩ বা তার পরবর্তী সংস্করণ প্রয়োজন।

আপনার প্রজেক্ট ইতিমধ্যে Prettier ব্যবহার করলে, `intlayer init prettier` প্লাগইনটি ইনস্টল করবে এবং আপনার কনফিগারেশনে এটি স্বয়ংক্রিয়ভাবে যুক্ত করবে।

## ব্যবহার

প্লাগইনটি Prettier এবং [oxfmt](https://oxc.rs/docs/guide/usage/formatter) দুটির সাথেই কাজ করে।

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

আপনার Prettier কনফিগারেশনে প্লাগইনটি যুক্ত করুন:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

এটি শুধুমাত্র আপনার কন্টেন্ট ঘোষণাগুলিতে প্রয়োগ করতে, একটি override ব্যবহার করুন:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt Prettier প্লাগইন লোড করে না। Prettier দিয়ে শুধু আপনার কন্টেন্ট ঘোষণাগুলিতে প্লাগইনটি চালান, তারপর oxfmt দিয়ে পুরো প্রজেক্ট ফরম্যাট করুন:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"]
      }
    }
  ]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

এই ক্রম বজায় রাখুন। oxfmt নিজের স্টাইলে লেআউট নতুন করে লেখে, কিন্তু অবজেক্টের কীগুলির ক্রম কখনও বদলায় না, তাই সাজানো ক্রম বজায় থাকে।

  </Tab>
</Tabs>

## যা সাজানো হয়

### `t()`: লোক্যাল

পিন করা লোক্যালগুলি প্রথমে আসে (ডিফল্টভাবে `en`)। অন্যান্য লোক্যালগুলি বর্ণানুক্রমিকভাবে সাজানো হয়।

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR ক্রম

বিভাগগুলি ক্ষুদ্রতম পরিমাণ থেকে ফলব্যাকে যায়: `zero`, `one`, `two`, `few`, `many`, `other`।

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: ঊর্ধ্বমুখী সীমা

শর্তগুলি তাদের সংখ্যা অনুযায়ী এবং তারপর অপারেটর (`<1`, `<=1`, `1`, `>=1`, `>1`) দ্বারা সাজানো হয়। `fallback` শেষে থাকে।

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

রানটাইমে প্রথম মিলে যাওয়া শর্তটি কার্যকর হয়। প্লাগইনটি নতুন ক্রম তখনই প্রয়োগ করে যখন প্রতিটি পরিমাণ এখনও একই বিষয়বস্তু প্রদান করে। যখন ক্রম ফলাফলের সিদ্ধান্ত নেয়, তখন অবজেক্টটি যেভাবে লেখা হয়েছে সেভাবেই রেখে দেওয়া হয়। উদাহরণস্বরূপ, `{ '<1': …, '<=-2.3': … }`-এ `'<1'` কী প্রতিটি ঋণাত্মক সংখ্যাকে গ্রহণ করে।

### `select()`: বর্ণানুক্রমিক

কেসগুলি বর্ণানুক্রমিকভাবে সাজানো হয় এবং `fallback` শেষে রাখা হয়।

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

কোনো `fallback` বা `other` কী না থাকলে, শেষ কেসটি ফলব্যাক হিসাবে ব্যবহৃত হয়। সেই কেসটি শেষে থাকে এবং শুধুমাত্র এর আগের কেসগুলি সাজানো হয়।

### `.content.json` ফাইল

সিরিয়ালাইজড ফর্মটিও একইভাবে সাজানো হয়: `{ "nodeType": "translation", "translation": { … } }`, পাশাপাশি `plural`, `enumeration` এবং `select` নোডগুলিও।

### কন্টেন্ট কী (ঐচ্ছিক)

`intlayerSortContentKeys: true` সহ, প্লাগইনটি প্রতিটি নেস্টিং স্তরে অভিধানের `content`-এর কীগুলিও বর্ণানুক্রমিকভাবে সাজায়। এটি শুধুমাত্র `*.content.*` ফাইলগুলিতে প্রযোজ্য।

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

ভেতরের অবজেক্টগুলিতে পৌঁছানোর জন্য প্রতিটি হেল্পার (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) দিয়ে সর্টিং চলতে থাকে। প্রতিটি হেল্পারের নিজস্ব কী ম্যাপ তার নিজস্ব ক্রম বজায় রাখে। `cond()` এবং `gender()`-এ পাস করা কীগুলি কখনই পুনর্বিন্যাস করা হয় না কারণ তাদের শেষ কীটি ফলব্যাক হিসাবে কাজ করে। `content`-এর পাশের ক্ষেত্রগুলি (`key`, `title`, `locale`…) অপরিবর্তিত থাকে।

## অপশন

| অপশন                      | ডিফল্ট    | বর্ণনা                                                                 |
| ------------------------- | -------- | -------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]` | `t()`-এ প্রথমে রাখা লোক্যালগুলি, এই ক্রমে। সব লোক্যাল সাজাতে `[]` পাস করুন।       |
| `intlayerSortContentKeys` | `false`  | `*.content.*` ফাইলগুলিতে, অভিধানের কন্টেন্ট কী এবং নেস্টেড অবজেক্টগুলিও সাজান। |

## যা অপরিবর্তিত রাখা হয়

- স্প্রেড (`...base`), কম্পিউটেড কী (`[key]`), মেথড বা ডুপ্লিকেট কী ধারণকারী অবজেক্ট।
- এমন `plural()` ম্যাপ যার কী CLDR বিভাগ নয়।
- এমন `enu()` ম্যাপ যার নতুন ক্রম সমাধান করা সামগ্রীকে পরিবর্তন করে।
- হেল্পারের মতো নামযুক্ত কিন্তু অবজেক্ট ব্যতীত অন্য আর্গুমেন্ট দেওয়া অন্যান্য ফাংশন কল।

মন্তব্যগুলি যে কী-এর অন্তর্গত তার সাথে স্থানান্তরিত হয়।

## সমর্থিত পার্সার

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` এবং `jsonc`। Vue, Svelte এবং Astro ফাইলের `<script>` ব্লকগুলি এই পার্সারগুলির সাথে ফর্ম্যাট করা হয়।

> **জানা সীমাবদ্ধতা।** Prettier প্রতিটি পার্সারে কেবল একটি প্লাগইন চালায়। যদি অন্য কোনো প্লাগইন জাভাস্ক্রিপ্ট/টাইপস্ক্রিপ্ট পার্সারকেও প্রতিস্থাপন করে (উদাহরণস্বরূপ `prettier-plugin-tailwindcss`), তবে কেবল তালিকায় থাকা শেষ প্লাগইনটি সেই ফাইলগুলিতে প্রয়োগ হবে। দ্বন্দ্ব এড়াতে একটি override সহ `prettier-plugin-intlayer` কে `*.content.*` ফাইলে সীমাবদ্ধ করুন। oxfmt-এ Tailwind ক্লাসগুলি তার বিল্ট-ইন `sortTailwindcss` অপশন দিয়ে সাজানো হয়, তাই এই দ্বন্দ্ব ঘটে না।
