---
createdAt: 2026-06-11
updatedAt: 2026-06-11
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
  - version: 9.0.0
    date: 2026-06-11
    changes: "اسکین (scan) کمانڈ شامل کی گئی"
author: aymericzip
---

# ویب سائٹ اسکین کریں

`scan` کمانڈ ایک عوامی (public) URL حاصل کرتی ہے، صفحے کے کل سائز کی پیمائش کرتی ہے، اور صفحے کی i18n اور SEO کی صحت کا آڈٹ کرتی ہے۔ یہ ایک سکورڈ رپورٹ (0-100) تیار کرتی ہے جس میں HTML صفات، کینونیکل لنکس، hreflang ٹیگز، robots.txt، sitemap.xml، مقامی کردہ اندرونی لنکس، اور JavaScript بنڈل میں لوکلز کا وزن شامل ہوتا ہے۔

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
- **`--verbose`** — تفصیلی لاگنگ کو فعال کریں (CLI موڈ میں پہلے سے طے شدہ)۔
- **`--prefix`** — اپنی مرضی کے مطابق لاگ کا سابقہ۔

## کیا چیک کیا جاتا ہے

| چیک                       | تفصیل                                                               | سکور کا وزن |
| ------------------------- | ------------------------------------------------------------------- | ----------- |
| `html lang`               | `<html lang="…">` صفت موجود ہے                                      | 9           |
| `html dir`                | `<html dir="…">` صفت موجود ہے                                       | 3           |
| `canonical`               | `<link rel="canonical">` موجود ہے                                   | 10          |
| `hreflang`                | `<link rel="alternate" hreflang="…">` ٹیگز موجود ہیں                | 9           |
| `x-default hreflang`      | ایک `x-default` hreflang متبادل موجود ہے                            | 7           |
| `localized links`         | کم از کم ایک اندرونی لنک میں زبان کا حصہ شامل ہے                    | 5           |
| `all links localized`     | ہر اندرونی لنک میں زبان کا حصہ شامل ہے                              | 5           |
| `current locale`          | صفحہ کی زبان کا پتہ لگایا جا سکتا ہے                                | 3           |
| `robots.txt present`      | `/robots.txt` ایک 200 جواب واپس کرتا ہے                             | 10          |
| `robots.txt locale paths` | robots.txt میں کوئی زبان کا راستہ بلاک نہیں ہے                      | 10          |
| `sitemap.xml present`     | `/sitemap.xml` ایک 200 جواب واپس کرتا ہے                            | 10          |
| `sitemap locale coverage` | ہر پتہ چلنے والی زبان سائٹ میپ میں ظاہر ہوتی ہے                     | 10          |
| `sitemap alternates`      | سائٹ میپ میں `hreflang` متبادل لنکس شامل ہیں                        | 5           |
| `sitemap x-default`       | سائٹ میپ میں ایک `x-default` hreflang شامل ہے                       | 5           |
| `unused bundle content`   | JS بنڈل ضرورت سے زیادہ غیر استعمال شدہ زبان کا ڈیٹا نہیں لے جاتا ہے | 9           |

آخری سکور تمام کامیاب چیکوں کا وزنی مجموعہ فیصد کے طور پر ہوتا ہے (0-100)۔

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
