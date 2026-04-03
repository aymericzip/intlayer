---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: کسٹم ڈومینز (Custom Domains)
description: سیکھیں کہ مخصوص ہوسٹ نیمز سے مختلف لوکلز (locales) پیش کرنے کے لیے Intlayer میں ڈومین پر مبنی لوکل راؤٹنگ کو کیسے ترتیب دینا ہے۔
keywords:
  - کسٹم ڈومینز
  - ڈومین راؤٹنگ
  - راؤٹنگ
  - بین الاقوامی کاری
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "routing.domains کنفیگریشن کے ذریعے ڈومین پر مبنی لوکل راؤٹنگ شامل کی گئی۔"
---

# کسٹم ڈومینز

Intlayer ڈومین پر مبنی لوکل راؤٹنگ کو سپورٹ کرتا ہے، جس سے آپ مخصوص ہوسٹ نیمز سے خاص لوکلز پیش کر سکتے ہیں۔ مثال کے طور پر، چینی زائرین کو `intlayer.org/zh` کے بجائے `intlayer.zh` پر بھیجا جا سکتا ہے۔

## یہ کیسے کام کرتا ہے

`routing` میں `domains` میپ ہر لوکل کو ایک ہوسٹ نیم کے ساتھ جوڑتا ہے۔ Intlayer اس میپ کو دو جگہوں پر استعمال کرتا ہے:

1. **URL جنریشن** (`getLocalizedUrl`): جب ٹارگٹ لوکل موجودہ پیج کے مقابلے میں _مختلف_ ڈومین پر ہوتا ہے، تو ایک مطلق (absolute) URL واپس کیا جاتا ہے (مثلاً `https://intlayer.zh/about`)۔ جب دونوں ڈومینز ایک جیسے ہوں، تو ایک نسبتاً (relative) URL واپس کیا جاتا ہے (مثلاً `/fr/about`)۔
2. **سرور پراکسی** (Next.js اور Vite): آنے والی درخواستوں کو اس ڈومین کی بنیاد پر ری ڈائریکٹ یا ری رائٹ کیا جاتا ہے جس پر وہ پہنچتی ہیں۔

### خصوصی بمقابلہ مشترکہ ڈومینز (Exclusive vs. shared domains)

بنیادی فرق **خصوصیت (exclusivity)** ہے:

- **خصوصی ڈومین (Exclusive domain)** — اس ہوسٹ نیم پر صرف ایک ہی لوکل میپ ہوتا ہے (مثلاً `zh → intlayer.zh`)۔ ڈومین خود ہی لوکل کی شناخت کرتا ہے، اس لیے پاتھ میں کوئی لوکل سابقہ (prefix) شامل نہیں کیا جاتا۔ `https://intlayer.zh/about` چینی مواد فراہم کرتا ہے۔
- **مشترکہ ڈومین (Shared domain)** — ایک ہی ہوسٹ نیم پر متعدد لوکلز میپ ہوتے ہیں (مثلاً `en` اور `fr` دونوں `intlayer.org` پر میپ ہوتے ہیں)۔ عام سابقہ پر مبنی راؤٹنگ لاگو ہوتی ہے۔ `intlayer.org/fr/about` فرانسیسی مواد فراہم کرتا ہے۔

## کنفیگریشن

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // مشترکہ ڈومین — en اور fr intlayer.org پر سابقہ راؤٹنگ استعمال کرتے ہیں
      en: "intlayer.org",
      // خصوصی ڈومین — zh کا اپنا ہوسٹ نیم ہے، کسی /zh/ سابقہ کی ضرورت نہیں ہے
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

جو لوکلز `domains` میں درج نہیں ہیں، وہ بغیر کسی ڈومین اوور رائیڈ کے معیاری سابقہ راؤٹنگ کا استعمال جاری رکھتے ہیں۔

## URL جنریشن

`getLocalizedUrl` کالنگ کنٹیکسٹ کی بنیاد پر خود بخود صحیح URL کی قسم تیار کرتا ہے۔

### ایک ہی ڈومین کا لوکل (نسبتاً URL)

```ts
// موجودہ پیج: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// ← "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// ← "/about"  (ڈیفالٹ لوکل، کوئی سابقہ نہیں)
```

### کراس ڈومین لوکل (مطلق URL)

```ts
// موجودہ پیج: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// ← "https://intlayer.zh/about"  (خصوصی ڈومین، کوئی /zh/ سابقہ نہیں)
```

### لوکل کے اپنے ڈومین سے پیش کرنا

```ts
// موجودہ پیج: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// ← "/about"  (پہلے سے ہی صحیح ڈومین پر ہے — نسبتاً URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// ← "https://intlayer.org/fr/about"  (intlayer.org پر واپس کراس ڈومین لنک)
```

### موجودہ ڈومین کی خودکار شناخت

`currentDomain` اختیاری ہے۔ اسے چھوڑ دینے کی صورت میں، `getLocalizedUrl` اسے اس ترتیب سے حل کرتا ہے:

1. مطلق ان پٹ URL کا ہوسٹ نیم (مثلاً `https://intlayer.org/about` ← `intlayer.org`)۔
2. براؤزر کے ماحول میں `window.location.hostname`۔
3. اگر دونوں میں سے کوئی بھی دستیاب نہ ہو (بغیر کسی واضح آپشن کے SSR)، تو ایک ہی ڈومین کے لوکلز کے لیے نسبتاً URL واپس کیا جاتا ہے اور کوئی مطلق URL تیار نہیں کیا جاتا — یہ ایک محفوظ فال بیک (fallback) ہے۔

```ts
// براؤزر — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// ← "https://intlayer.zh/about"  (ونڈو سے خودکار شناخت ہوئی)

// ایک مطلق URL سے — ڈومین کی خودکار شناخت ہوئی
getLocalizedUrl("https://intlayer.org/about", "zh");
// ← "https://intlayer.zh/about"
```

### ڈومینز کے ساتھ `getMultilingualUrls`

`getMultilingualUrls` ہر لوکل کے لیے `getLocalizedUrl` کو کال کرتا ہے، لہذا یہ کالر کے ڈومین کی بنیاد پر نسبتاً اور مطلق URLs کا مرکب تیار کرتا ہے:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

یہ مطلق URLs SEO کے لیے `<link rel="alternate" hreflang="...">` ٹیگز میں استعمال کے لیے تیار ہیں۔

## پراکسی رویہ (Proxy Behaviour)

### Next.js

`intlayerProxy` مڈل ویئر ڈومین راؤٹنگ کو خودکار طور پر سنبھالتا ہے۔ اسے اپنے `middleware.ts` میں شامل کریں:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**ری ڈائریکٹ (Redirect)** — درخواست کسی خاص لوکل سابقہ کے لیے غلط ڈومین پر پہنچتی ہے:

```
GET intlayer.org/zh/about
← 301 https://intlayer.zh/about
```

**ری رائٹ (Rewrite)** — درخواست بغیر کسی سابقہ کے لوکل کے خصوصی ڈومین پر پہنچتی ہے:

```
GET intlayer.zh/about
← ری رائٹ برائے /zh/about  (صرف اندرونی Next.js راؤٹنگ، URL صاف رہتا ہے)
```

### Vite

Vite پلگ ان `intlayerProxy` ڈیولپمنٹ کے دوران اسی منطق کا اطلاق کرتا ہے:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **نوٹ**: مقامی ڈیولپمنٹ میں آپ عام طور پر `localhost` پر ہوتے ہیں، اس لیے کراس ڈومین ری ڈائریکٹس کسی اور مقامی پورٹ کے بجائے لائیو ڈومینز کی طرف اشارہ کریں گے۔ اگر آپ کو مقامی طور پر ملٹی ڈومین راؤٹنگ ٹیسٹ کرنے کی ضرورت ہے تو ہوسٹس فائل (hosts-file) اوور رائیڈ (مثلاً `127.0.0.1 intlayer.zh`) یا ریورس پراکسی استعمال کریں۔

## لوکل سویچر (Locale Switcher)

`next-intlayer` سے `useLocale` ہک ڈومین سے آگاہ نیویگیشن کو خودکار طور پر سنبھالتا ہے۔ جب کوئی صارف مختلف ڈومین پر کسی لوکل پر سوئچ کرتا ہے، تو ہک کلائنٹ سائیڈ راؤٹر پش کے بجائے مکمل پیج نیویگیشن (`window.location.href`) کرتا ہے، کیونکہ Next.js راؤٹر اوریجنز (origins) کو عبور نہیں کر سکتا۔

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((l) => (
        <li key={l}>
          <button
            onClick={() => setLocale(l)}
            aria-current={l === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

کسی اضافی کنفیگریشن کی ضرورت نہیں ہے — `useLocale` اندرونی طور پر `window.location.hostname` کا پتہ لگاتا ہے اور `router.replace` (ایک ہی ڈومین) اور `window.location.href` (کراس ڈومین) کے درمیان فیصلہ کرتا ہے۔

## SEO: `hreflang` متبادل لنکس

ڈومین پر مبنی راؤٹنگ عام طور پر `hreflang` کے ساتھ استعمال کی جاتی ہے تاکہ سرچ انجنز کو بتایا جا سکے کہ ہر زبان کے لیے کون سا URL انڈیکس کرنا ہے۔ متبادل URLs کا مکمل سیٹ تیار کرنے کے لیے `getMultilingualUrls` کا استعمال کریں:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // مثلاً "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

یہ پیدا کرتا ہے:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## بنیادی یوٹیلٹیز

| یوٹیلٹی                                           | تفصیل                                                                                                    |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | نسبتاً یا مطلق URL واپس کرتا ہے اس پر منحصر کہ آیا ٹارگٹ لوکل موجودہ ڈومین پر ہے یا نہیں۔                |
| `getMultilingualUrls(url, { currentDomain })`     | لوکلائزڈ URLs کا ایک لوکل کیڈ (locale-keyed) میپ واپس کرتا ہے، ضرورت کے مطابق نسبتاً اور مطلق کو ملا کر۔ |
| `getPrefix(locale, { domains })`                  | خصوصی ڈومین لوکلز کے لیے خالی سابقہ واپس کرتا ہے، ورنہ عام سابقہ۔                                        |
