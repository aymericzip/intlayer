---
createdAt: 2026-06-11
updatedAt: 2026-09-26
priority: 5
title: ویب سائٹ اسکین کریں
description: کسی بھی ویب سائٹ کے صفحے کے سائز کی پیمائش کرنے اور i18n/SEO کی صحت کا آڈٹ کرنے کے لیے Intlayer CLI اسکین کمانڈ استعمال کرنے کا طریقہ سیکھیں۔
keywords:
  - اسکین
  - SEO
  - i18n
  - آڈٹ
  - CLI
  - Intlayer
  - صفحے کا سائز
  - بنڈل
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "روٹنگ حکمت عملی اور i18n اسٹیک (لائبریریاں، TMS) کا پتہ لگائیں؛ hreflang باہمی تعلق، og:locale اور زبان سوئچر کے چیک شامل کریں؛ robots.txt سائٹ میپس، سائٹ میپ انڈیکس اور gzip کمپریسڈ سائٹ میپس کو فالو کریں"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci` فلیگ شامل کیا گیا"
  - version: 9.0.0
    date: 2026-06-11
    changes: "اسکین (scan) کمانڈ شامل کی گئی"
author: aymericzip
---

# ویب سائٹ اسکین کریں

`scan` کمانڈ ایک عوامی (public) URL حاصل کرتی ہے، صفحے کے کل سائز کی پیمائش کرتی ہے، اور صفحے کی i18n اور SEO کی صحت کا آڈٹ کرتی ہے۔ یہ ایک سکورڈ رپورٹ (0-100) تیار کرتی ہے جس میں HTML صفات، کینونیکل لنکس، hreflang ٹیگز اور ان کے واپسی لنکس، robots.txt، سائٹ میپس، مقامی کردہ اندرونی لنکس، اور JavaScript بنڈل میں لوکلز کا وزن شامل ہوتا ہے۔

یہ یہ بھی بتاتی ہے کہ سائٹ اپنے URLs میں لوکل کو کیسے انکوڈ کرتی ہے (روٹنگ حکمت عملی) اور وہ کون سا فریم ورک، i18n لائبریری، ترجمہ کے انتظام کا نظام (TMS) یا ترجمہ پراکسی استعمال کرتی ہے۔ یہی چیک [آن لائن i18n SEO اسکینر](https://intlayer.org/i18n-seo-scanner) اور Intlayer Chrome ایکسٹینشن کو بھی سپورٹ کرتے ہیں۔

کسی اضافی انحصار کی ضرورت نہیں ہے۔ جب [puppeteer](https://pptr.dev/) انسٹال ہوتا ہے، تو اسکین زیادہ درست بنڈل تجزیہ کے لیے سست روی سے لوڈ ہونے والے (lazy-loaded) JavaScript حصوں کو پکڑ سکتا ہے؛ ورنہ یہ HTML میں اعلان کردہ فوری لوڈ ہونے والے اسکرپٹس کے معائنے پر واپس چلا جاتا ہے۔

## استعمال

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

### مثال

```bash packageManager="npm"
npx intlayer scan https://example.com
```

مثالی آؤٹ پٹ:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

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

## اختیارات

### `<url>` (ضروری)

اسکین کرنے کے لیے مکمل طور پر اہل URL (مثال کے طور پر `https://example.com`)۔

### `--no-deep`

گہرے رینڈر پر مبنی اسکین کو غیر فعال کریں۔

پہلے سے طے شدہ طور پر، یہ کمانڈ [puppeteer](https://pptr.dev/) کا استعمال کرتے ہوئے صفحے کو ہیڈ لیس براؤزر میں رینڈر کرنے، سست لوڈ ہونے والے JavaScript حصوں کو پکڑنے، اور اصل منتقلی سائز کی پیمائش کرنے کی کوشش کرتی ہے۔ اگر puppeteer انسٹال نہیں ہے، تو کمانڈ خود بخود بنیادی موڈ پر واپس چلی جاتی ہے۔

جب puppeteer دستیاب ہو تب بھی بنیادی موڈ پر مجبور کرنے کے لیے `--no-deep` فراہم کریں۔

> مثال: `npx intlayer scan https://example.com --no-deep`

### `--json`

فارمیٹ شدہ رپورٹ کے بجائے اسکین کا مکمل نتیجہ ایک JSON آبجیکٹ کے طور پر آؤٹ پٹ کریں۔ پروگراماتی استعمال یا CI پائپ لائنوں کے لیے کارآمد۔

> مثال: `npx intlayer scan https://example.com --json`

### معیاری کنفیگریشن کے اختیارات

- **`--base-dir`** — `intlayer.config.*` فائل کا پتہ لگانے کے لیے استعمال ہونے والی بنیادی ڈائریکٹری۔
- **`-e, --env`** — ہدف کا ماحول (مثال کے طور پر `development` یا `production`)۔
- **`--env-file`** — اپنی مرضی کے مطابق `.env` فائل کا راستہ۔
- **`--no-cache`** — کنفیگریشن کیشے کو غیر فعال کریں۔
- **`--ci`** — monorepo کے ہر Intlayer پروجیکٹ میں کمانڈ چلاتا ہے (پروجیکٹ ڈائریکٹری سے چلانے پر صرف موجودہ پروجیکٹ میں)۔ ہر پروجیکٹ کی اسناد `INTLAYER_PROJECT_CREDENTIALS` کے ذریعے شامل کی جا سکتی ہیں، جو پروجیکٹ پاتھ کو `{ "clientId", "clientSecret" }` سے نقشہ کرنے والا ایک JSON آبجیکٹ ہے۔
- **`--verbose`** — تفصیلی لاگنگ کو فعال کریں (CLI موڈ میں پہلے سے طے شدہ)۔
- **`--prefix`** — اپنی مرضی کے مطابق لاگ کا سابقہ۔

## روٹنگ کی حکمت عملی

صفحے کے hreflang متبادلات کی طرف سے شیئر کیا گیا لوکل پیٹرن یہ ظاہر کرتا ہے کہ سائٹ اپنے لوکلز کو کس طرح روٹ کرتی ہے۔ متبادلات کے بغیر، صرف اسکین شدہ URL کا استعمال کیا جاتا ہے (کم اعتماد)۔

| حکمت عملی           | مثال                                |
| ------------------- | ----------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`            |
| `prefix-no-default` | `/about` (ڈیفالٹ لوکل), `/fr/about` |
| `search-params`     | `/about?lang=fr`                    |
| `subdomain`         | `fr.example.com`                    |
| `domain`            | `example.fr`, `example.de`          |
| `no-prefix`         | ہر لوکل کے لیے ایک ہی URL (کوکی)    |

لنک، کینونیکل، robots.txt اور سائٹ میپ کے چیک اس حکمت عملی کے ذریعے ہر URL کو پڑھتے ہیں۔ مثال کے طور پر، بغیر سابقہ والا لنک `prefix-no-default` سائٹ کے ڈیفالٹ لوکل پر درست ہے، اور `?lang=` کے بغیر والا لنک `search-params` سائٹ پر لوکل سے باہر نکل جاتا ہے۔

## شناخت شدہ اسٹیک

فریم ورکس، i18n لائبریریاں (Intlayer، i18next، react-i18next، next-i18next، next-intl، use-intl، react-intl، vue-i18n، @nuxtjs/i18n، Lingui، svelte-i18n، Paraglide، ngx-translate، Transloco، Polylang، WPML…)، ترجمہ کے انتظام کے سسٹمز (Crowdin، Phrase، Lokalise، locize، Transifex، Tolgee، Localazy، SimpleLocalize، Localizely، Smartling، Intlayer CMS) اور ترجمہ پراکسیز (Weglot، Localize، GTranslate…) کو HTML، لوڈ کردہ وسائل اور JavaScript بنڈلز سے شناخت کیا جاتا ہے۔ ڈیپ موڈ window گلوبل ویری ایبلز اور کوکیز کو بھی پڑھتا ہے۔

## کیا چیک کیا جاتا ہے

| چیک                             | تفصیل                                                                                                   | سکور کا وزن |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------- |
| `html lang`                     | `<html lang>` صفت موجود ہے اور ایک درست BCP 47 ٹیگ ہے                                                   | 9           |
| `html dir`                      | دائیں سے بائیں لکھی جانے والی زبانوں کے لیے `dir="rtl"` سیٹ ہے (`ltr` ڈیفالٹ ہے)                        | 3           |
| `locale signals consistent`     | `<html lang>`، URL کی لوکل اور خود کی طرف اشارہ کرنے والا hreflang اندراج ایک دوسرے سے مطابقت رکھتے ہیں | 5           |
| `og:locale`                     | `og:locale` سیٹ ہے اور `<html lang>` سے مطابقت رکھتا ہے                                                 | 3           |
| `canonical`                     | ایک کینونیکل لنک موجود ہے اور کسی دوسرے لوکل ورژن کی طرف اشارہ نہیں کرتا                                | 10          |
| `hreflang`                      | درست کوڈز، مطلق URLs، بغیر کسی نقل اور اپنے حوالے کے ساتھ hreflang ٹیگز موجود ہیں                       | 9           |
| `x-default hreflang`            | ایک `x-default` hreflang متبادل موجود ہے                                                                | 7           |
| `hreflang alternates link back` | متبادلات 200 کے ساتھ جواب دیتے ہیں، ری ڈائریکٹ نہیں ہوتے، واپس لنک دیتے ہیں اور زبان کا اعلان کرتے ہیں  | 8           |
| `localized links`               | اندرونی لنکس صفحے کی لوکل کی طرف اشارہ کرتے ہیں                                                         | 8           |
| `all links keep the locale`     | کوئی بھی اندرونی لنک لوکل کو تبدیل یا ختم نہیں کرتا                                                     | 6           |
| `language switcher`             | دیگر لوکل ورژنز کے لیے کرال کے قابل `<a href>` لنکس موجود ہیں                                           | 6           |
| `robots.txt present`            | `/robots.txt` ایک 200 جواب واپس کرتا ہے                                                                 | 10          |
| `robots.txt localized URLs`     | نہ تو سائٹ اور نہ ہی اس کے مقامی URLs گوگل بوٹ کے لیے بلاک ہیں                                          | 8           |
| `sitemap present`               | سائٹ میپ مل گیا ہے (robots.txt میں `Sitemap:` ہدایات، `/sitemap.xml`، `/sitemap_index.xml`)             | 10          |
| `sitemap locale coverage`       | ہر لوکل درج ہے، اور متبادلات والی اندراجات خود کو بھی درج کرتی ہیں                                      | 9           |
| `sitemap alternates`            | سائٹ میپ میں `hreflang` متبادل لنکس شامل ہیں                                                            | 8           |
| `sitemap x-default`             | سائٹ میپ میں ایک `x-default` hreflang شامل ہے                                                           | 7           |
| `unused bundle content`         | مرکزی JS بنڈل دیگر لوکلز کے غیر ضروری ترجمے شامل نہیں کرتا                                              | 8           |

انتباہ سے وزن کا نصف ملتا ہے۔ حتمی سکور تمام چلائے جانے والے چیکوں کا وزنی مجموعہ فیصد کے طور پر ہوتا ہے (0-100)۔ ناکام ہونے والے چیکس پہلے پائے جانے والے مسائل کو پرنٹ کرتے ہیں؛ مکمل تفصیلات کے لیے `--json` استعمال کریں۔

## پروگراماتی طور پر اسکین فنکشن کا استعمال

`scan` فنکشن کو بھی `@intlayer/cli` سے برآمد کیا جاتا ہے تاکہ اسے آپ کے اپنے اسکرپٹس سے کال کیا جا سکے:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

کم درجے کی رسائی کے لیے، `@intlayer/engine/scan` سے `scanWebsite` ایک منظم `ScanResult` آبجیکٹ لوٹاتا ہے:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
