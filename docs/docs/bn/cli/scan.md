---
createdAt: 2026-06-11
updatedAt: 2026-09-26
priority: 5
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "রাউটিং কৌশল এবং i18n স্ট্যাক (লাইব্রেরি, টিএমএস) সনাক্তকরণ; hreflang পারস্পরিকতা, og:locale এবং ভাষা পরিবর্তনকারী পরীক্ষা যোগ করা; robots.txt সাইটম্যাপ, সাইটম্যাপ ইনডেক্স এবং gzip সংকুচিত সাইটম্যাপ অনুসরণ"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci` ফ্ল্যাগ যোগ করা হয়েছে"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan কমান্ড যোগ করা হয়েছে"
author: aymericzip
---

# ওয়েবসাইট স্ক্যান করুন

`scan` কমান্ডটি একটি পাবলিক URL-এর তথ্য সংগ্রহ করে, মোট পেজের সাইজ পরিমাপ করে এবং পেজের i18n ও SEO স্বাস্থ্য অডিট করে। এটি একটি স্কোর করা রিপোর্ট (০–১০০) তৈরি করে যা HTML বৈশিষ্ট্য, ক্যানোনিকাল লিংক, hreflang ট্যাগ এবং তাদের পারস্পরিক লিংক, robots.txt, সাইটম্যাপ, স্থানীয়কৃত অভ্যন্তরীণ লিংক এবং JavaScript বান্ডলে থাকা লোকালগুলোর ফাইল সাইজের ওজনের তথ্য কভার করে।

এটি আরও রিপোর্ট করে যে সাইটটি কীভাবে তার URL-এ ভাষা এনকোড করে (রাউটিং কৌশল) এবং কোন ফ্রেমওয়ার্ক, i18n লাইব্রেরি, অনুবাদ ব্যবস্থাপনা সিস্টেম (TMS) বা অনুবাদ প্রক্সি ব্যবহার করে। এই একই পরীক্ষাগুলো [অনলাইন i18n SEO স্ক্যানার](https://intlayer.org/i18n-seo-scanner) এবং Intlayer Chrome এক্সটেনশনে ব্যবহৃত হয়।

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0
  i18n library next-intl
  TMS Crowdin
Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
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

- **`--base-dir`**: `intlayer.config.*` ফাইলটি সনাক্ত করতে ব্যবহৃত বেস ডিরেক্টরি।
- **`-e, --env`**: লক্ষ্য পরিবেশ (যেমন: `development`, `production`)।
- **`--env-file`**: একটি কাস্টম `.env` ফাইলের পাথ।
- **`--no-cache`**: কনফিগারেশন ক্যাশে নিষ্ক্রিয় করুন।
- **`--ci`**: মনোরেপোর প্রতিটি Intlayer প্রজেক্টে কমান্ডটি চালায় (প্রজেক্ট ডিরেক্টরি থেকে চালালে শুধুমাত্র বর্তমান প্রজেক্টে)। প্রজেক্ট-ভিত্তিক ক্রেডেনশিয়াল `INTLAYER_PROJECT_CREDENTIALS`-এর মাধ্যমে ইনজেক্ট করা যায়, যা প্রজেক্ট পাথকে `{ "clientId", "clientSecret" }`-এ ম্যাপ করা একটি JSON অবজেক্ট।
- **`--verbose`**: বিস্তারিত লগিং সক্ষম করুন (CLI মোডে ডিফল্ট)।
- **`--prefix`**: কাস্টম লগ প্রিফিক্স।

## রাউটিং কৌশল

পেজের hreflang বিকল্প লিংকগুলোর মধ্যে মিল থাকা ভাষার প্যাটার্ন প্রকাশ করে যে সাইটটি কীভাবে তার ভাষাগুলোকে রাউট করে। বিকল্প লিংক না থাকলে, কেবল স্ক্যান করা URL-টি ব্যবহার করা হয় (কম নির্ভরযোগ্যতা)।

| কৌশল                | উদাহরণ                                   |
| ------------------- | ---------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                 |
| `prefix-no-default` | `/about` (ডিফল্ট ভাষা), `/fr/about`      |
| `search-params`     | `/about?lang=fr`                         |
| `subdomain`         | `fr.example.com`                         |
| `domain`            | `example.fr`, `example.de`               |
| `no-prefix`         | প্রতিটি ভাষার জন্য একটি একক URL (cookie) |

লিংক, ক্যানোনিকাল, robots.txt এবং সাইটম্যাপ পরীক্ষাগুলো এই কৌশলের মাধ্যমে প্রতিটি URL বিশ্লেষণ করে। উদাহরণস্বরূপ, একটি `prefix-no-default` সাইটের ডিফল্ট ভাষার জন্য উপসর্গবিহীন লিংক সঠিক, এবং `search-params` সাইটে `?lang=` বিহীন একটি লিংক ভাষাকে ত্যাগ করে।

## সনাক্তকৃত স্ট্যাক

HTML, লোড করা রিসোর্স এবং JavaScript বান্ডেল থেকে ফ্রেমওয়ার্ক, i18n লাইব্রেরি (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), অনুবাদ ব্যবস্থাপনা সিস্টেম (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) এবং অনুবাদ প্রক্সি (Weglot, Localize, GTranslate…) সনাক্ত করা হয়। ডিপ মোড window গ্লোবাল ভেরিয়েবল এবং কুকিজও রিড করে।

## কী কী পরীক্ষা করা হয়

| পরীক্ষা                         | বিবরণ                                                                                             | স্কোর ওজন |
| ------------------------------- | ------------------------------------------------------------------------------------------------- | --------- |
| `html lang`                     | `<html lang>` উপস্থিত এবং একটি বৈধ BCP 47 ট্যাগ                                                   | ৯         |
| `html dir`                      | ডান-থেকে-বাম ভাষার জন্য `dir="rtl"` সেট করা হয়েছে (`ltr` হলো ডিফল্ট)                             | ৩         |
| `locale signals consistent`     | `<html lang>`, URL-এর ভাষা এবং স্ব-উল্লেখিত hreflang এন্ট্রি একে অপরের সাথে সামঞ্জস্যপূর্ণ        | ৫         |
| `og:locale`                     | `og:locale` সেট করা আছে এবং `<html lang>`-এর সাথে মিল রয়েছে                                      | ৩         |
| `canonical`                     | একটি ক্যানোনিকাল লিংক বিদ্যমান এবং অন্য কোনো ভাষার সংস্করণের দিকে নির্দেশ করে না                  | ১০        |
| `hreflang`                      | বৈধ কোড, পরম URL, কোনো অনুলিপি ছাড়া এবং নিজস্ব রেফারেন্স সহ hreflang ট্যাগ বিদ্যমান রয়েছে        | ৯         |
| `x-default hreflang`            | একটি `x-default` hreflang বিকল্প বিদ্যমান আছে                                                     | ৭         |
| `hreflang alternates link back` | বিকল্প পেজগুলো ২০০ কোডে সাড়া দেয়, পুনর্নির্দেশিত হয় না, পাল্টা লিংক দেয় এবং ভাষা ঘোষণা করে        | ৮         |
| `localized links`               | অভ্যন্তরীণ লিংকগুলো পেজের ভাষার দিকে নির্দেশ করে                                                  | ৮         |
| `all links keep the locale`     | কোনো অভ্যন্তরীণ লিংক ভাষা পরিবর্তন বা বাদ দেয় না                                                  | ৬         |
| `language switcher`             | অন্যান্য ভাষার সংস্করণে যাওয়ার জন্য ক্রলযোগ্য `<a href>` লিংক বিদ্যমান রয়েছে                      | ৬         |
| `robots.txt present`            | `/robots.txt` একটি ২০০ রেসপন্স প্রদান করে                                                         | ১০        |
| `robots.txt localized URLs`     | সাইট বা এর স্থানীয়কৃত URL-গুলোর কোনোটিই Googlebot-এর জন্য অবরুদ্ধ নয়                             | ৮         |
| `sitemap present`               | সাইটম্যাপ পাওয়া গেছে (robots.txt-এর `Sitemap:` নির্দেশাবলী, `/sitemap.xml`, `/sitemap_index.xml`) | ১০        |
| `sitemap locale coverage`       | প্রতিটি ভাষা তালিকাভুক্ত রয়েছে, এবং বিকল্পযুক্ত এন্ট্রিগুলো নিজেদেরও তালিকাভুক্ত করে              | ৯         |
| `sitemap alternates`            | সাইটম্যাপে `hreflang` বিকল্প লিংকগুলো অন্তর্ভুক্ত রয়েছে                                           | ৮         |
| `sitemap x-default`             | সাইটম্যাপে একটি `x-default` hreflang অন্তর্ভুক্ত রয়েছে                                            | ৭         |
| `unused bundle content`         | প্রধান JS বান্ডলটি অন্য ভাষার অনুবাদগুলো অতিরিক্ত বহন করে না                                      | ৮         |

সতর্কতা অর্ধেকের ওজন লাভ করে। চূড়ান্ত স্কোর হলো সমস্ত সফল পরীক্ষার ওজনযুক্ত যোগফল যা শতাংশে (০-১০০) প্রকাশ করা হয়। ব্যর্থ পরীক্ষাগুলো প্রথমে পাওয়া সমস্যাগুলো প্রদর্শন করে; সম্পূর্ণ বিবরণের জন্য `--json` ব্যবহার করুন।

## প্রোগ্রাম্যাটিকভাবে স্ক্যান ফাংশন ব্যবহার করা

`scan` ফাংশনটি `@intlayer/cli` থেকেও রপ্তানি করা হয় যাতে এটি আপনার নিজস্ব স্ক্রিপ্ট থেকে কল করা যেতে পারে:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

নিম্ন-স্তরের অ্যাক্সেসের জন্য, `@intlayer/engine/scan` থেকে `scanWebsite` একটি কাঠামোগত `ScanResult` অবজেক্ট প্রদান করে:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
