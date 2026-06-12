---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: ওয়েবসাইট স্ক্যান করুন
description: যেকোনো ওয়েবসাইটের পেজ সাইজ পরিমাপ করতে এবং i18n/SEO স্বাস্থ্য অডিট করতে Intlayer CLI scan কমান্ড কীভাবে ব্যবহার করবেন তা শিখুন।
keywords:
  - স্ক্যান
  - SEO
  - i18n
  - অডিট
  - CLI
  - Intlayer
  - পেজের সাইজ
  - বান্ডল
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 8.13.0
    date: 2026-06-11
    changes: "scan কমান্ড যোগ করা হয়েছে"
author: aymericzip
---

# ওয়েবসাইট স্ক্যান করুন

`scan` কমান্ডটি একটি পাবলিক URL-এর তথ্য সংগ্রহ করে, মোট পেজের সাইজ পরিমাপ করে এবং পেজের i18n ও SEO স্বাস্থ্য অডিট করে। এটি একটি স্কোর করা রিপোর্ট (০–১০০) তৈরি করে যা HTML বৈশিষ্ট্য, ক্যানোনিকাল লিংক, hreflang ট্যাগ, robots.txt, sitemap.xml, স্থানীয়কৃত অভ্যন্তরীণ লিংক এবং JavaScript বান্ডলে থাকা লোকালগুলোর ফাইল সাইজের ওজনের তথ্য কভার করে।

কোনো অতিরিক্ত ডিপেন্ডেন্সির প্রয়োজন নেই। যখন [puppeteer](https://pptr.dev/) ইনস্টল করা থাকে, তখন স্ক্যানটি আরও সুনির্দিষ্ট বান্ডল বিশ্লেষণের জন্য অলসভাবে লোড হওয়া (lazy-loaded) JavaScript অংশগুলো ক্যাপচার করতে পারে; অন্যথায় এটি HTML-এ ঘোষিত সরাসরি লোড হওয়া স্ক্রিপ্টগুলো পরীক্ষা করতে ফিরে যায়।

## ব্যবহার

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### উদাহরণ

```bash packageManager="npm"
npx intlayer scan https://example.com
```

আউটপুট নমুনা:

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## অপশনসমূহ

### `<url>` (প্রয়োজনীয়)

স্ক্যান করার জন্য সম্পূর্ণ উপযুক্ত URL (যেমন: `https://example.com`)।

### `--no-deep`

গভীর রেন্ডার-ভিত্তিক স্ক্যানিং নিষ্ক্রিয় করুন।

ডিফল্টরূপে কমান্ডটি একটি হেডলেস ব্রাউজারে পেজটি রেন্ডার করতে, অলসভাবে লোড হওয়া JavaScript অংশগুলো ক্যাপচার করতে এবং প্রকৃত স্থানান্তর সাইজ পরিমাপ করতে [puppeteer](https://pptr.dev/)-কে ব্যবহার করার চেষ্টা করে। যদি puppeteer ইনস্টল করা না থাকে, তবে কমান্ডটি স্বয়ংক্রিয়ভাবে বেসিক মোডে ফিরে যায়।

puppeteer উপলব্ধ থাকা অবস্থায়ও বেসিক মোড জোরদার করতে `--no-deep` পাস করুন।

> উদাহরণ: `npx intlayer scan https://example.com --no-deep`

### `--json`

একটি ফরম্যাট করা রিপোর্টের পরিবর্তে সম্পূর্ণ স্ক্যানের ফলাফল একটি JSON অবজেক্ট হিসেবে আউটপুট করুন। প্রোগ্রাম্যাটিক ব্যবহার বা CI পাইপলাইনের জন্য দরকারী।

> উদাহরণ: `npx intlayer scan https://example.com --json`

### স্ট্যান্ডার্ড কনফিগারেশন অপশনসমূহ

- **`--base-dir`** — `intlayer.config.*` ফাইলটি সনাক্ত করতে ব্যবহৃত বেস ডিরেক্টরি।
- **`-e, --env`** — লক্ষ্য পরিবেশ (যেমন: `development`, `production`)।
- **`--env-file`** — একটি কাস্টম `.env` ফাইলের পাথ।
- **`--no-cache`** — কনফিগারেশন ক্যাশে নিষ্ক্রিয় করুন।
- **`--verbose`** — বিস্তারিত লগিং সক্ষম করুন (CLI মোডে ডিফল্ট)।
- **`--prefix`** — কাস্টম লগ প্রিফিক্স।

## কী কী পরীক্ষা করা হয়

| পরীক্ষা                   | বিবরণ                                                       | স্কোর ওজন |
| ------------------------- | ----------------------------------------------------------- | --------- |
| `html lang`               | `<html lang="…">` বৈশিষ্ট্যটি উপস্থিত আছে                   | ৯         |
| `html dir`                | `<html dir="…">` विशेषता मौजूद है                           | ৩         |
| `canonical`               | `<link rel="canonical">` উপস্থিত আছে                        | ১০        |
| `hreflang`                | `<link rel="alternate" hreflang="…">` ট্যাগগুলো উপস্থিত আছে | ৯         |
| `x-default hreflang`      | একটি `x-default` hreflang বিকল্প বিদ্যমান আছে               | ৭         |
| `localized links`         | কমপক্ষে একটি অভ্যন্তরীণ লিংকে ভাষার অংশ অন্তর্ভুক্ত রয়েছে  | ৫         |
| `all links localized`     | প্রতিটি অভ্যন্তরীণ লিংকে ভাষার অংশ অন্তর্ভুক্ত রয়েছে       | ৫         |
| `current locale`          | পেজের ভাষা সনাক্ত করা যেতে পারে                             | ৩         |
| `robots.txt present`      | `/robots.txt` একটি ২০০ রেসপন্স প্রদান করে                   | ১০        |
| `robots.txt locale paths` | robots.txt-এ কোনো ভাষার পথ অবরুদ্ধ নেই                      | ১০        |
| `sitemap.xml present`     | `/sitemap.xml` একটি ২০০ রেসপন্স প্রদান করে                  | ১০        |
| `sitemap locale coverage` | সনাক্ত করা প্রতিটি ভাষা সাইটম্যাপে প্রদর্শিত হয়            | ১০        |
| `sitemap alternates`      | সাইটম্যাপে `hreflang` বিকল্প লিংকগুলো অন্তর্ভুক্ত রয়েছে    | ৫         |
| `sitemap x-default`       | সাইটম্যাপে একটি `x-default` hreflang অন্তর্ভুক্ত রয়েছে     | ৫         |
| `unused bundle content`   | JS বান্ডলটি অতিরিক্ত অব্যবহৃত ভাষার ডেটা বহন করে না         | ৯         |

চূড়ান্ত স্কোর হলো সমস্ত সফল পরীক্ষার ওজনযুক্ত যোগফল যা শতাংশে (০-১০০) প্রকাশ করা হয়।

## প্রোগ্রাম্যাটিকভাবে স্ক্যান ফাংশন ব্যবহার করা

`scan` ফাংশনটি `@intlayer/cli` থেকেও রপ্তানি করা হয় যাতে এটি আপনার নিজস্ব স্ক্রিপ্ট থেকে কল করা যেতে পারে:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

নিম্ন-স্তরের অ্যাক্সেসের জন্য, `@intlayer/chokidar/scan` থেকে `scanWebsite` একটি কাঠামোগত `ScanResult` অবজেক্ট প্রদান করে:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```

---
