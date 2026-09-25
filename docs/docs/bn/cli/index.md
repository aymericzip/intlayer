---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: CLI - আপনার বহুভাষিক ওয়েবসাইটের জন্য সমস্ত Intlayer CLI কমান্ড
description: আপনার বহুভাষিক ওয়েবসাইট পরিচালনা করতে Intlayer CLI কীভাবে ব্যবহার করবেন তা আবিষ্কার করুন। কয়েক মিনিটের মধ্যে আপনার প্রজেক্ট সেট আপ করতে এই অনলাইন ডকুমেন্টেশনের ধাপগুলো অনুসরণ করুন।
keywords:
  - CLI
  - কমান্ড লাইন ইন্টারফেস
  - আন্তর্জাতিকীকরণ
  - ডকুমেন্টেশন
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "`ci` কমান্ডকে `--ci` ফ্ল্যাগ দিয়ে প্রতিস্থাপন"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan কমান্ড যোগ করা হয়েছে"
  - version: 8.6.4
    date: 2026-03-31
    changes: "standalone কমান্ড যোগ করা হয়েছে"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI কমান্ড যোগ করা হয়েছে"
  - version: 7.5.11
    date: 2026-01-06
    changes: "list projects কমান্ড যোগ করা হয়েছে"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init কমান্ড যোগ করা হয়েছে"
  - version: 7.2.3
    date: 2025-11-22
    changes: "extract কমান্ড যোগ করা হয়েছে"
  - version: 7.1.0
    date: 2025-11-05
    changes: "translate কমান্ডে skipIfExists বিকল্প যোগ করা হয়েছে"
  - version: 6.1.4
    date: 2025-01-27
    changes: "CLI আর্গুমেন্ট এবং কমান্ডের জন্য উপনাম যোগ করা হয়েছে"
  - version: 6.1.3
    date: 2025-10-05
    changes: "কমান্ডে buildবিকল্প যোগ করা হয়েছে"
  - version: 6.1.2
    date: 2025-09-26
    changes: "version কমান্ড যোগ করা হয়েছে"
  - version: 6.1.0
    date: 2025-09-26
    changes: "CLI-এর মাধ্যমে default হিসেবে verbose বিকল্পকে true সেট করা হয়েছে"
  - version: 6.1.0
    date: 2025-09-23
    changes: "watch কমান্ড এবং with বিকল্প যোগ করা হয়েছে"
  - version: 6.0.1
    date: 2025-09-23
    changes: "editor কমান্ড যোগ করা হয়েছে"
  - version: 6.0.0
    date: 2025-09-17
    changes: "content test এবং list কমান্ড যোগ করা হয়েছে"
  - version: 5.5.11
    date: 2025-07-11
    changes: "CLI কমান্ড প্যারামিটার ডকুমেন্টেশন আপডেট করা হয়েছে"
  - version: 5.5.10
    date: 2025-06-29
    changes: "ইতিহাস শুরু"
author: aymericzip
---

# Intlayer CLI - আপনার বহুভাষিক ওয়েবসাইটের জন্য সমস্ত Intlayer CLI কমান্ড

## সূচিপত্র

<TOC/>

## প্যাকেজ ইনস্টল করা

npm ব্যবহার করে প্রয়োজনীয় প্যাকেজগুলো ইনস্টল করুন:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> যদি `intlayer` প্যাকেজ ইতিমধ্যে ইনস্টল করা থাকে, তবে CLI স্বয়ংক্রিয়ভাবে ইনস্টল হয়ে যায়। আপনি এই ধাপটি এড়িয়ে যেতে পারেন।

## intlayer-cli প্যাকেজ

`intlayer-cli` প্যাকেজটি আপনার [Intlayer ঘোষণাগুলো](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) ডিকশনারিতে ট্রান্সপাইল করার জন্য ডিজাইন করা হয়েছে।

এই প্যাকেজটি সমস্ত Intlayer ফাইল ট্রান্সপাইল করে, যেমন: `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [দেখুন কীভাবে আপনার Intlayer ঘোষণা ফাইলগুলো ঘোষণা করবেন](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

Intlayer ডিকশনারিগুলো ব্যাখ্যা করার জন্য আপনি ইন্টারপ্রেটার ব্যবহার করতে পারেন, যেমন: [react-intlayer](https://www.npmjs.com/package/react-intlayer) বা [next-intlayer](https://www.npmjs.com/package/next-intlayer)।

## কনফিগারেশন ফাইল সমর্থন

Intlayer একাধিক কনফিগারেশন ফাইল ফরম্যাট গ্রহণ করে:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

উপলব্ধ ভাষা বা অন্যান্য প্যারামিটার কীভাবে কনফিগার করবেন তা জানতে, [এখানে কনফিগারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) দেখুন।

## Intlayer কমান্ড চালানো

### প্রমাণীকরণ (Authentication)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/login" />
</TechGrid>

### কোর কমান্ড (Core Commands)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/list_projects" />
</TechGrid>

### ডিকশনারি ম্যানেজমেন্ট (Dictionary Management)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/list" />
</TechGrid>

### উপাদান ম্যানেজমেন্ট (Component Management)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/extract" />
</TechGrid>

### কনফিগারেশন

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/configuration" />
</TechGrid>

### ডকুমেন্ট ম্যানেজমেন্ট (Doc Management)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/doc-review" />
</TechGrid>

### এডিটর এবং লাইভ সিঙ্ক (Editor and Live Sync)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/live" />
</TechGrid>

### অডিটিং এবং ডায়াগনস্টিকস

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/scan" />
</TechGrid>

### ডেভেলপার সরঞ্জাম (Developer Tools)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/debug" />
</TechGrid>

## আপনার `package.json` ফাইলে intlayer কমান্ড ব্যবহার করুন

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **নোট**: আপনি ছোট উপনামগুলোও (short aliases) ব্যবহার করতে পারেন:
>
> - `npx intlayer list`: এটি `npx intlayer content list`-কে প্রতিস্থাপন করে।
> - `npx intlayer test`: এটি `npx intlayer content test`-কে প্রতিস্থাপন করে।
> - `npx intlayer projects-list` বা `npx intlayer pl`: এটি `npx intlayer projects list`-কে প্রতিস্থাপন করে।
