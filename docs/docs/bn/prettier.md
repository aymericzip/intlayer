---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Prettier x Oxfmt প্লাগইন | Intlayer অনুবাদ সাজান এবং .value ঠিক করুন
description: "আপনার কনটেন্ট ডিক্লারেশনে t(), plural(), enu() ও select()-এর locale সাজান, এবং যেখানে কনটেন্ট স্ট্রিং হিসেবে ব্যবহৃত হয় সেখানে .value যোগ করুন যাতে ভিজ্যুয়াল এডিটরের সাথে টাইপ ঠিক থাকে। Prettier ও oxfmt-এর সাথে কাজ করে।"
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
  - ভিজ্যুয়াল এডিটর
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "স্ট্রিং হিসেবে ব্যবহৃত কনটেন্টে .value যোগ করার সুবিধা যুক্ত হয়েছে"
  - version: 9.7.1
    date: 2026-11-03
    changes: "প্রাথমিক ইতিহাস"
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt-এর সাথে ব্যবহার যোগ করা হয়েছে"
author: aymericzip
---

# Prettier x Oxfmt প্লাগইন

Prettier প্রতিবার কোনো ফাইল ফরম্যাট করলে `prettier-plugin-intlayer` দুটি কাজ করে:

1. **আপনার অনুবাদগুলো** একটি নির্দিষ্ট ক্রমে সাজায়। Diff ছোট থাকে, merge conflict কম হয় এবং অনুপস্থিত locale সহজে চোখে পড়ে।
2. **যেখানে কনটেন্ট স্ট্রিং হিসেবে ব্যবহৃত হয় সেখানে `.value` যোগ করে**, যাতে ভিজ্যুয়াল এডিটর চালু হলেও আপনার টাইপ ঠিক থাকে।

```ts
// আগে
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// পরে
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## ইনস্টলেশন

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Prettier ৩ বা তার পরবর্তী সংস্করণ প্রয়োজন।

আপনার প্রজেক্ট ইতিমধ্যে Prettier ব্যবহার করলে, `intlayer init prettier` প্লাগইনটি ইনস্টল করবে এবং আপনার কনফিগারেশনে এটি স্বয়ংক্রিয়ভাবে যুক্ত করবে।

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt থার্ড-পার্টি প্লাগইন লোড করতে পারে না, তাই সাজানোর কাজ Prettier-এর মাধ্যমে হয়। oxfmt-এর পাশাপাশি Prettier ইনস্টল করুন। এটি শুধু আপনার কন্টেন্ট ঘোষণাগুলি সাজাতে ব্যবহৃত হয়; আপনার প্রজেক্ট oxfmt-ই ফরম্যাট করে।

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

Prettier ৩ বা তার পরবর্তী সংস্করণ প্রয়োজন। `intlayer init` শুধু সেই প্রজেক্টগুলিতে প্লাগইন সেট আপ করে যেগুলি আগে থেকেই Prettier ব্যবহার করে, তাই নিচে দেখানো মতো এটি নিজে কনফিগার করুন।

  </Tab>
</Tabs>

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

শুধু কনটেন্ট ডিক্লারেশন সাজাতে একটি override ব্যবহার করুন। তখন `.value` যোগ করা আপনার কম্পোনেন্টে প্রয়োগ হবে না:

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

ফরম্যাট স্ক্রিপ্ট দুটি টুল চালায়, প্রত্যেকটির একটি করে কাজ:

1. **Prettier** প্লাগইন চালায়। প্রথম glob কনটেন্ট ডিক্লারেশন সাজায়, দ্বিতীয়টি কম্পোনেন্টে `.value` যোগ করে। শুধু সাজাতে চাইলে দ্বিতীয় glob বাদ দিন।
2. **oxfmt** কন্টেন্ট ঘোষণাসহ পুরো প্রজেক্ট ফরম্যাট করে।

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

এই ক্রম বজায় রাখুন। oxfmt Prettier-এর লেখা লেআউট নিজের লেআউট দিয়ে বদলে দেয়, কিন্তু কখনও অবজেক্টের key-এর ক্রম বদলায় না, তাই সাজানো ক্রম বজায় থাকে।

এই সেটআপের কিছু সীমাবদ্ধতা আছে:

- **সেভ করার সময় ফরম্যাট।** oxfmt দিয়ে ফরম্যাট করা এডিটর প্লাগইন চালায় না। এর বদলে `format` স্ক্রিপ্ট চালান।
- **Check মোড।** oxfmt দিয়ে ফরম্যাট করা ফাইলে `prettier --check` ব্যবহার করবেন না: লেআউট আলাদা হওয়ায় এটি প্রতিটি ফাইল রিপোর্ট করে। CI-তে ক্রম যাচাই করতে `format` স্ক্রিপ্ট চালান এবং পরিবর্তন থাকলে job ব্যর্থ করুন:

```bash
npm run format && git diff --exit-code
```

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### একই অনুবাদ

`*.content.*` ফাইলে, যে `t()`-এর সব locale-এ একই string থাকে, সেটি ওই string দিয়ে প্রতিস্থাপিত হয়। সাধারণ string প্রতিটি locale-কে দেওয়া হয়, তাই আউটপুট বদলায় না।

```ts
// আগে
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// পরে
nextjs: "Next.js",
```

একটি মাত্র locale, type argument (`t<string>()`), comment বা non-string value থাকা `t()` যেমন আছে তেমন রাখা হয়। এটি বন্ধ করতে `intlayerCollapseIdenticalTranslations: false` সেট করুন।

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

## স্ট্রিং হিসেবে ব্যবহৃত কনটেন্ট

[ভিজ্যুয়াল এডিটর](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) চালু থাকলে (`editor.enabled: true`), `useIntlayer` বা `getIntlayer` থেকে ফেরত আসা ফিল্ড স্ট্রিং নয়, রেন্ডারযোগ্য নোড। এটিকে নেটিভ এলিমেন্টের attribute-এ দিলে বা এর ওপর স্ট্রিং মেথড কল করলে আর টাইপ-চেক পাস হয় না। Template literals, স্ট্রিং জোড়া এবং `String()` যেকোনো টাইপ গ্রহণ করে, তাই এগুলো অপরিবর্তিত থাকে। প্লাগইনটি `.value` যোগ করে, যা এডিটর চালু থাকুক বা না থাকুক স্ট্রিংটি ধরে রাখে।

```tsx
// আগে
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// পরে
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

যা পুনর্লিখিত হয়:

- স্ট্রিং মেথড: `content.name.toUpperCase()`
- নেটিভ এলিমেন্টের attributes: `<img alt={content.alt} />`

যা অপরিবর্তিত থাকে, কারণ এগুলো নোড গ্রহণ করে:

- JSX children: `<h1>{content.title}</h1>`
- কম্পোনেন্ট props: `<Card title={content.title} />`
- tagged templates: `` html`<h1>${content.title}</h1>` `` (Lit)

এটি কনটেন্ট ডিক্লারেশনে নয়, কম্পোনেন্টে প্রযোজ্য, তাই প্লাগইনটি আপনার কম্পোনেন্ট ফাইলে চালাতে হবে। যে ভেরিয়েবলের নাম ফাইলের অন্য কোথাও আবার ঘোষণা করা হয়েছে সেটি বাদ দেওয়া হয়। Vue ও Svelte টেমপ্লেট পুনর্লিখিত হয় না: সেগুলোর জন্য [ESLint নিয়ম `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/eslint.md) ব্যবহার করুন, এতেও autofix আছে।

এটি JSX child থেকে `.value`-ও সরিয়ে দেয়: `<h1>{content.title.value}</h1>` হয়ে যায় `<h1>{content.title}</h1>`, যাতে ভিজ্যুয়াল এডিটর টেক্সটটি নির্বাচন করতে পারে। এটি React, Next.js, Preact, Solid ও React Native-এ প্রযোজ্য।

`intlayerNodeValueAccess: false` দিয়ে বন্ধ করুন।

## অপশন

| অপশন                                    | ডিফল্ট    | বর্ণনা                                                                                                           |
| --------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | `t()`-এ প্রথমে রাখা লোক্যালগুলি, এই ক্রমে। সব লোক্যাল সাজাতে `[]` পাস করুন।                                                 |
| `intlayerSortContentKeys`               | `false`  | `*.content.*` ফাইলগুলিতে, অভিধানের কন্টেন্ট কী এবং নেস্টেড অবজেক্টগুলিও সাজান।                                           |
| `intlayerCollapseIdenticalTranslations` | `true`   | `*.content.*` ফাইলে, যে `t()`-এর সব locale-এ একই string থাকে, সেটিকে ওই string দিয়ে প্রতিস্থাপন করে।                |
| `intlayerNodeValueAccess`               | `true`   | যেখানে কনটেন্ট স্ট্রিং হিসেবে ব্যবহৃত হয় সেখানে `.value` যোগ করে (`alt={content.alt}`, `content.name.toUpperCase()`)। |

## যা অপরিবর্তিত রাখা হয়

- স্প্রেড (`...base`), কম্পিউটেড কী (`[key]`), মেথড বা ডুপ্লিকেট কী ধারণকারী অবজেক্ট।
- এমন `plural()` ম্যাপ যার কী CLDR বিভাগ নয়।
- এমন `enu()` ম্যাপ যার নতুন ক্রম সমাধান করা সামগ্রীকে পরিবর্তন করে।
- হেল্পারের মতো নামযুক্ত কিন্তু অবজেক্ট ব্যতীত অন্য আর্গুমেন্ট দেওয়া অন্যান্য ফাংশন কল।

মন্তব্যগুলি যে কী-এর অন্তর্গত তার সাথে স্থানান্তরিত হয়।

## সমর্থিত পার্সার

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` এবং `jsonc`। Vue, Svelte এবং Astro ফাইলের `<script>` ব্লকগুলি এই পার্সারগুলির সাথে ফর্ম্যাট করা হয়।

> **জানা সীমাবদ্ধতা।** Prettier প্রতিটি পার্সারে কেবল একটি প্লাগইন চালায়। যদি অন্য কোনো প্লাগইন জাভাস্ক্রিপ্ট/টাইপস্ক্রিপ্ট পার্সারকেও প্রতিস্থাপন করে (উদাহরণস্বরূপ `prettier-plugin-tailwindcss`), তবে কেবল তালিকায় থাকা শেষ প্লাগইনটি সেই ফাইলগুলিতে প্রয়োগ হবে। দ্বন্দ্ব এড়াতে একটি override সহ `prettier-plugin-intlayer` কে `*.content.*` ফাইলে সীমাবদ্ধ করুন। oxfmt-এ Tailwind ক্লাসগুলি তার বিল্ট-ইন `sortTailwindcss` অপশন দিয়ে সাজানো হয়, তাই এই দ্বন্দ্ব ঘটে না। সেক্ষেত্রে কম্পোনেন্টে `.value`-এর জন্য [ESLint নিয়ম `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/eslint.md)-এর ওপর নির্ভর করুন।
