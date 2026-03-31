---
createdAt: 2025-12-30
updatedAt: 2025-12-30
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore বিকল্প যোগ করা হয়েছে"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init কমান্ড যোগ করা হয়েছে"
---

# Intlayer শুরু করুন (Initialize Intlayer)

```bash
npx intlayer init
```

`init` কমান্ডটি প্রয়োজনীয় ফাইল এবং সেটিংস তৈরি করে আপনার প্রজেক্টে স্বয়ংক্রিয়ভাবে Intlayer কনফিগার করে। এটি Intlayer ব্যবহার শুরু করার প্রস্তাবিত উপায়।

## উপনাম (Aliases):

- `npx intlayer init`

## বিন্যাস (Arguments):

- `--project-root [projectRoot]` - ঐচ্ছিক। প্রজেক্টের রুট ডিরেক্টরি নির্দিষ্ট করুন। প্রদান করা না হলে, কমান্ডটি বর্তমান ডিরেক্টরি থেকে প্রজেক্ট রুট অনুসন্ধান করবে।
- `--no-gitignore` - ঐচ্ছিক। `.gitignore` ফাইলের স্বয়ংক্রিয় আপডেট এড়িয়ে যায়। যদি এই ফ্ল্যাগটি সেট করা থাকে, তবে `.intlayer` কে `.gitignore`-এ যোগ করা হবে না।

## এটি কী করে:

`init` কমান্ডটি নিম্নলিখিত সেটআপ কাজগুলো সম্পাদন করে:

১. **প্রজেক্টের গঠন যাচাই করে** - নিশ্চিত করে যে আপনি `package.json` ফাইল সহ একটি বৈধ প্রজেক্ট ডিরেক্টরিতে আছেন।
২. **`.gitignore` আপডেট করে** - তৈরি করা ফাইলগুলোকে ভার্সন কন্ট্রোল থেকে বাদ দেওয়ার জন্য আপনার `.gitignore` ফাইলে `.intlayer` যোগ করে (`--no-gitignore` দিয়ে এটি এড়ানো যায়)।
৩. **TypeScript কনফিগার করে** - Intlayer টাইপ ডেফিনিশনগুলো (`.intlayer/**/*.ts`) অন্তর্ভুক্ত করার জন্য যেকোনো `tsconfig.json` ফাইল আপডেট করে।
৪. **কনফিগারেশন ফাইল তৈরি করে** - ডিফল্ট সেটিংস সহ `intlayer.config.ts` (TypeScript প্রজেক্টের জন্য) বা `intlayer.config.mjs` (JavaScript প্রজেক্টের জন্য) তৈরি করে।
৫. **Vite কনফিগারেশন আপডেট করে** - যদি কোনো Vite কনফিগারেশন ফাইল পাওয়া যায়, তবে এটি `vite-intlayer` প্লাগইনের জন্য ইম্পোর্ট যোগ করে।
৬. **Next.js কনফিগারেশন আপডেট করে** - যদি কোনো Next.js কনফিগারেশন ফাইল পাওয়া যায়, তবে এটি `next-intlayer` প্লাগইনের জন্য ইম্পোর্ট যোগ করে।

## উদাহরণ:

### সাধারণ শুরু:

```bash
npx intlayer init
```

এটি বর্তমান ডিরেক্টরিতে Intlayer শুরু করে, স্বয়ংক্রিয়ভাবে প্রজেক্ট রুট শনাক্ত করে।

### কাস্টম প্রজেক্ট রুট সহ শুরু:

```bash
npx intlayer init --project-root ./my-project
```

এটি নির্দিষ্ট ডিরেক্টরিতে Intlayer শুরু করে।

### .gitignore আপডেট না করে শুরু:

```bash
npx intlayer init --no-gitignore
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

- এই কমান্ডটি আইডেম্পোটেন্ট (idempotent) — আপনি এটি নিরাপদে একাধিকবার চালাতে পারেন। আগে থেকে কনফিগার করা ধাপগুলো এড়িয়ে যাওয়া হবে।
- যদি কোনো কনফিগারেশন ফাইল আগে থেকেই থাকে, তবে সেটি ওভাররাইট করা হবে না।
- `include` অ্যারে নেই এমন TypeScript কনফিগারেশনগুলো (যেমন রেফারেন্স সহ সলিউশন-স্টাইল কনফিগারেশন) এড়িয়ে যাওয়া হয়।
- যদি প্রজেক্ট রুটে `package.json` খুঁজে না পাওয়া যায় তবে কমান্ডটি এরর সহ বন্ধ হয়ে যাবে।
