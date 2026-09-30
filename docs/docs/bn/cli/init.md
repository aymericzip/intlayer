---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: Intlayer শুরু করুন (Initialize Intlayer)
description: আপনার প্রজেক্টে কীভাবে Intlayer শুরু করবেন তা শিখুন।
keywords:
  - শুরু করা
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init এখন শুধু প্যাকেজ ইনস্টল করে ও ফ্রেমওয়ার্ক সেট আপ করে; প্রতিটি ধাপের জন্য আলাদা সাব-কমান্ড; টার্মিনাল ছাড়া --interactive ব্যর্থ হয়"
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore বিকল্প যোগ করা হয়েছে"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init কমান্ড যোগ করা হয়েছে"
author: aymericzip
---

# Intlayer শুরু করুন (Initialize Intlayer)

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

`init` কমান্ড Intlayer প্যাকেজ ইনস্টল করে এবং আপনার ফ্রেমওয়ার্ক সেট আপ করে (কনফিগারেশন ফাইল, TypeScript, বান্ডলার প্লাগইন, middleware/proxy, প্রোভাইডার)। Intlayer দিয়ে শুরু করার এটাই প্রস্তাবিত উপায়।

বাকি সবকিছু (CI ওয়ার্কফ্লো, AI স্কিল, MCP সার্ভার, এডিটর টুল, lint নিয়ম, CMS, ইনফ্রাস্ট্রাকচার) ঐচ্ছিক: `--interactive` চেকলিস্ট থেকে বেছে নিন, অথবা এর নিজস্ব সাব-কমান্ড চালান (নিচে দেখুন)।

## উপনাম (Aliases):

- `npx intlayer init`

## বিন্যাস (Arguments):

- `--project-root [projectRoot]` - ঐচ্ছিক। প্রজেক্টের রুট ডিরেক্টরি নির্দিষ্ট করুন। প্রদান করা না হলে, কমান্ডটি বর্তমান ডিরেক্টরি থেকে প্রজেক্ট রুট অনুসন্ধান করবে।
- `--no-gitignore` - ঐচ্ছিক। `.gitignore` ফাইলের স্বয়ংক্রিয় আপডেট এড়িয়ে যায়। যদি এই ফ্ল্যাগটি সেট করা থাকে, তবে `.intlayer` কে `.gitignore`-এ যোগ করা হবে না।
- `--no-framework-setup` - ঐচ্ছিক। প্রজেক্টের ফাইল পরিবর্তন না করে শুধু প্যাকেজ ইনস্টল করে।
- `--routing <routing>` - ঐচ্ছিক। লোকেল রাউটিং: `prefix-no-default` (ডিফল্ট), `prefix-all`, `no-prefix`, `search-params` বা `none`।
- `-i, --interactive` - ঐচ্ছিক। ডিফল্ট সেটের বদলে একটি চেকলিস্ট (প্যাকেজ, CI, স্কিল, MCP, VS Code, LSP, lint, CMS, ইনফ্রাস্ট্রাকচার, …) থেকে সেটআপের ধাপ বেছে নিন। টার্মিনাল প্রয়োজন: টার্মিনাল না থাকলে (AI এজেন্ট, CI) কমান্ডটি ব্যর্থ হয় এবং এর বদলে চালানোর সাব-কমান্ডগুলোর তালিকা দেখায়।
- `--no-github-actions` - ঐচ্ছিক। `--interactive` এর সাথে, নির্বাচিত থাকলেও GitHub Actions ওয়ার্কফ্লো কখনো তৈরি করে না।

## এটি কী করে:

`init` কমান্ডটি নিম্নলিখিত সেটআপ কাজগুলো সম্পাদন করে:

1. **প্রজেক্টের গঠন যাচাই করে** - নিশ্চিত করে যে আপনি `package.json` ফাইল সহ একটি বৈধ প্রজেক্ট ডিরেক্টরিতে আছেন।
2. **প্যাকেজ ইনস্টল করে** - আপনার স্ট্যাকের জন্য অনুপস্থিত Intlayer প্যাকেজ (যেমন `react-intlayer`, `vite-intlayer`) ইনস্টল করে এবং পুরনোগুলো আপগ্রেড করে।
3. **`.gitignore` আপডেট করে** - তৈরি করা ফাইলগুলোকে ভার্সন কন্ট্রোল থেকে বাদ দেওয়ার জন্য আপনার `.gitignore` ফাইলে `.intlayer` যোগ করে (`--no-gitignore` দিয়ে এটি এড়ানো যায়)।
4. **TypeScript কনফিগার করে** - Intlayer টাইপ ডেফিনিশনগুলো (`.intlayer/**/*.ts`) অন্তর্ভুক্ত করার জন্য যেকোনো `tsconfig.json` ফাইল আপডেট করে।
5. **কনফিগারেশন ফাইল তৈরি করে** - ডিফল্ট সেটিংস সহ `intlayer.config.ts` (TypeScript প্রজেক্টের জন্য) বা `intlayer.config.mjs` (JavaScript প্রজেক্টের জন্য) তৈরি করে।
6. **বান্ডলার / ফ্রেমওয়ার্ক কনফিগ আপডেট করে** - আপনার Vite, Next.js, Nuxt, Astro, … কনফিগারেশনে Intlayer প্লাগইন যোগ করে, এবং ফ্রেমওয়ার্ক সমর্থন করলে middleware/proxy ও প্রোভাইডার তৈরি করে।

## একবারে একটি ধাপ সেট আপ করুন

`--interactive` চেকলিস্টের প্রতিটি ধাপের নিজস্ব সাব-কমান্ড আছে। মানগুলো ফ্ল্যাগ হিসেবে দিলে এগুলো কোনো প্রশ্ন করে না, তাই AI এজেন্ট বা CI জব থেকে নিরাপদে চালানো যায়।

| কমান্ড                                                                | কী সেট আপ করে                                                                                |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | অনুপস্থিত Intlayer প্যাকেজ ইনস্টল করে এবং পুরনোগুলো আপগ্রেড করে                              |
| `intlayer init project [--routing <routing>]`                         | কনফিগারেশন ফাইল, TypeScript, বান্ডলার প্লাগইন, middleware/proxy, প্রোভাইডার এবং `.gitignore` |
| `intlayer init github-actions`                                        | `fill` ও `test` GitHub Actions ওয়ার্কফ্লো                                                   |
| `intlayer init vscode-extension`                                      | `.vscode/extensions.json`-এ Intlayer এক্সটেনশন সুপারিশ করে                                   |
| `intlayer init lsp`                                                   | `.vscode/settings.json`-এ Intlayer ল্যাঙ্গুয়েজ সার্ভার                                      |
| `intlayer init eslint`                                                | প্রজেক্টে আগে থেকেই linter থাকলে Intlayer lint নিয়ম (ESLint / oxlint)                       |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | AI এজেন্টের স্কিল হিসেবে Intlayer ডকুমেন্টেশন                                                |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Intlayer MCP সার্ভার                                                                         |
| `intlayer init extension [--browser <chrome/firefox>]`                | Intlayer ব্রাউজার এক্সটেনশনের স্টোর পেজ খোলে                                                 |
| `intlayer init cms`                                                   | ব্রাউজারের মাধ্যমে Intlayer CMS-এ লগ ইন করে এবং ক্রেডেনশিয়াল `.env`-এ সংরক্ষণ করে           |
| `intlayer init infra --mode <desktop/docker/compose>`                 | ডেস্কটপ অ্যাপ বা সেলফ-হোস্টেড স্ট্যাক                                                        |

### AI এজেন্ট বা CI জব থেকে

AI এজেন্টের শেলে কোনো টার্মিনাল থাকে না, তাই প্রশ্নের উত্তর দেওয়া যায় না। ডিফল্ট কমান্ড চালান, তারপর প্রয়োজনীয় সাব-কমান্ডগুলো:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

টার্মিনাল ছাড়া:

- `--skills` সেট না থাকলে `init skills` আপনার স্ট্যাকের সাথে মেলে এমন স্কিল ইনস্টল করে (যেমন `--skills Usage Content React`)।
- `--platform` সেট না থাকলে `init skills` ও `init mcp` শনাক্ত করা AI প্ল্যাটফর্ম (Claude Code, Cursor, VS Code, Windsurf, …) ব্যবহার করে, এবং কোনোটি শনাক্ত না হলে প্ল্যাটফর্মের তালিকাসহ ব্যর্থ হয়।
- `--transport` সেট না থাকলে `init mcp` `stdio` ট্রান্সপোর্ট ব্যবহার করে।
- `init infra`-এর জন্য `--mode` আবশ্যক, এবং `--browser` সেট না থাকলে `init extension` শুধু স্টোরের লিংক দেখায়।

MCP সার্ভার সবসময় প্রজেক্টের ভেতরেই কনফিগার হয় (Claude Code-এর জন্য `.mcp.json`-এ)।

## উদাহরণ:

### সাধারণ শুরু:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

এটি বর্তমান ডিরেক্টরিতে Intlayer শুরু করে, স্বয়ংক্রিয়ভাবে প্রজেক্ট রুট শনাক্ত করে।

### কাস্টম প্রজেক্ট রুট সহ শুরু:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

এটি নির্দিষ্ট ডিরেক্টরিতে Intlayer শুরু করে।

### .gitignore আপডেট না করে শুরু:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

এটি সমস্ত কনফিগারেশন ফাইল সেট করবে কিন্তু আপনার `.gitignore` ফাইলটি পরিবর্তন করবে না।

## আউটপুট উদাহরণ:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## নোট:

- এই কমান্ডটি আইডেম্পোটেন্ট (idempotent) - আপনি এটি নিরাপদে একাধিকবার চালাতে পারেন। আগে থেকে কনফিগার করা ধাপগুলো এড়িয়ে যাওয়া হবে।
- যদি কোনো কনফিগারেশন ফাইল আগে থেকেই থাকে, তবে সেটি ওভাররাইট করা হবে না।
- `include` অ্যারে নেই এমন TypeScript কনফিগারেশনগুলো (যেমন রেফারেন্স সহ সলিউশন-স্টাইল কনফিগারেশন) এড়িয়ে যাওয়া হয়।
- যদি প্রজেক্ট রুটে `package.json` খুঁজে না পাওয়া যায় তবে কমান্ডটি এরর সহ বন্ধ হয়ে যাবে।
