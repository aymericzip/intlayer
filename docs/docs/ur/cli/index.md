---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - آپ کی کثیر لسانی ویب سائٹ کے لیے تمام Intlayer CLI کمانڈز
description: اپنی کثیر لسانی ویب سائٹ کو منظم کرنے کے لیے Intlayer CLI کا استعمال سیکھیں۔ چند منٹوں میں اپنے پروجیکٹ کو ترتیب دینے کے لیے اس آن لائن دستاویزات کے مراحل پر عمل کریں۔
keywords:
  - CLI
  - کمانڈ لائن انٹرفیس
  - بین الاقوامی کاری
  - دستاویزات
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "اسٹینڈ اکیلے (standalone) کمانڈ کا مواد شامل کیا گیا"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI کمانڈ کا مواد شامل کیا گیا"
  - version: 7.5.11
    date: 2026-01-06
    changes: "پروجیکٹس کی فہرست (list projects) کمانڈ شامل کی گئی"
  - version: 7.5.9
    date: 2025-12-30
    changes: "انیشئیلائز (init) کمانڈ شامل کی گئی"
  - version: 7.2.3
    date: 2025-11-22
    changes: "ایکسٹریکٹ (extract) کمانڈ شامل کی گئی"
  - version: 7.1.0
    date: 2025-11-05
    changes: "ترجمہ کمانڈ میں skipIfExists آپشن شامل کیا گیا"
  - version: 6.1.4
    date: 2025-01-27
    changes: "CLI دلائل اور کمانڈز کے لیے عرفی نام (aliases) شامل کیے گئے"
  - version: 6.1.3
    date: 2025-10-05
    changes: "کمانڈز میں بلڈ آپشن شامل کیا گیا"
  - version: 6.1.2
    date: 2025-09-26
    changes: "ورژن کمانڈ شامل کی گئی"
  - version: 6.1.0
    date: 2025-09-26
    changes: "CLI کے ذریعے verbose آپشن کو ڈیفالٹ طور پر true سیٹ کیا گیا"
  - version: 6.1.0
    date: 2025-09-23
    changes: "واچ (watch) کمانڈ اور with آپشن شامل کیا گیا"
  - version: 6.0.1
    date: 2025-09-23
    changes: "ایڈیٹر کمانڈ شامل کی گئی"
  - version: 6.0.0
    date: 2025-09-17
    changes: "کنٹینٹ ٹیسٹ اور لسٹ کمانڈز شامل کی گئیں"
  - version: 5.5.11
    date: 2025-07-11
    changes: "CLI کمانڈ پیرامیٹرز کی دستاویزات اپ ڈیٹ کی گئیں"
  - version: 5.5.10
    date: 2025-06-29
    changes: "تاریخ کا آغاز"
---

# Intlayer CLI - آپ کی کثیر لسانی ویب سائٹ کے لیے تمام Intlayer CLI کمانڈز

---

## فہرست مواد

<TOC/>

---

## پیکیج نصب کرنا

npm کا استعمال کرتے ہوئے ضروری پیکیجز نصب کریں:

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

> اگر `intlayer` پیکیج پہلے ہی نصب ہے، تو CLI خود بخود نصب ہو جاتی ہے۔ آپ اس مرحلے کو چھوڑ سکتے ہیں۔

## intlayer-cli پیکیج

`intlayer-cli` پیکیج آپ کے [Intlayer اعلانات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) کو لغات (dictionaries) میں ٹرانسپائل کرنے کے لیے ڈیزائن کیا گیا ہے۔

یہ پیکیج تمام Intlayer فائلوں کو ٹرانسپائل کرتا ہے، جیسے: `src/**/*.content.{ts|js|mjs|cjs|json}`۔ [دیکھیں کہ اپنی Intlayer اعلان فائلوں کا اعلان کیسے کریں](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)۔

Intlayer لغات کی تشریح کرنے کے لیے، آپ انٹرپریٹرز استعمال کر سکتے ہیں، جیسے: [react-intlayer](https://www.npmjs.com/package/react-intlayer) یا [next-intlayer](https://www.npmjs.com/package/next-intlayer)۔

## کنفیگ فائل تعاون

Intlayer کئی کنفیگریشن فائل فارمیٹس قبول کرتا ہے:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

دستیاب زبانوں یا دیگر پیرامیٹرز کو ترتیب دینے کا طریقہ سیکھنے کے لیے، [یہاں کنفیگریشن دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) دیکھیں۔

## Intlayer کمانڈز چلانا

### توثیق (Authentication)

- **[لاگ ان](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/login.md)** - Intlayer CMS سے توثیق کریں اور رسائی کی اسناد حاصل کریں

### بنیادی کمانڈز

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/build.md)** - اپنے مواد کے اعلان والی فائلوں سے اپنی لغات بنائیں
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/watch.md)** - تبدیلیوں کی نگرانی کریں اور لغات کو خود بخود دوبارہ بنائیں
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/standalone.md)** - Intlayer اور متعین پیکیجز پر مشتمل ایک اسٹینڈ اکیلے JavaScript بنڈل تیار کریں
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/version.md)** - نصب شدہ Intlayer CLI ورژن چیک کریں
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/list_projects.md)** - ڈائریکٹری یا گٹ ریپوزٹری میں موجود تمام Intlayer پروجیکٹس کی فہرست دیکھیں

### لغت کا انتظام

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/push.md)** - لغات کو Intlayer ایڈیٹر اور CMS پر بھیجیں
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/pull.md)** - Intlayer ایڈیٹر اور CMS سے لغات لائیں (fetch)
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/fill.md)** - AI کا استعمال کرتے ہوئے لغات کو پُر کریں، آڈٹ کریں اور ترجمہ کریں
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/test.md)** - لاپتہ تراجم کی جانچ اور نشاندہی کریں
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/list.md)** - اپنے پروجیکٹ میں مواد کے اعلان والی تمام فائلوں کی فہرست دیکھیں

### جزو کا انتظام (Component Management)

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/extract.md)** - جزو کے قریب ایک .content فائل میں اجزاء سے اسٹرنگز نکالیں

### کنفیگریشن

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/init.md)** - خودکار کنفیگریشن کے ساتھ اپنے پروجیکٹ میں Intlayer ترتیب دیں
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/configuration.md)** - اپنی Intlayer کنفیگریشن حاصل کریں اور اسے CMS پر بھیجیں

### دستاویز کا انتظام (Doc Management)

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/doc-translate.md)** - AI کا استعمال کرتے ہوئے دستاویزات کی فائلوں کا خودکار ترجمہ کریں
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/doc-review.md)** - معیار اور مطابقت کے لیے دستاویزات کی فائلوں کا جائزہ لیں

### ایڈیٹر اور لائیو سنک (Live Sync)

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/editor.md)** - Intlayer ایڈیٹر کمانڈز استعمال کریں
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/live.md)** - CMS سے مواد کی تبدیلیوں کو ریئل ٹائم میں لاگو کرنے کے لیے لائیو سنک کا استعمال کریں

### CI/CD اور خودکاری

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/ci.md)** - CI/CD پائپ لائنز کے لیے خودکار طور پر شامل اسناد کے ساتھ Intlayer کمانڈز پر عمل کریں

### ڈویلپر ٹولز

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/sdk.md)** - اپنے کوڈ میں Intlayer CLI SDK استعمال کریں
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/debug.md)** - Intlayer CLI کے مسائل کوڈیبگ کریں اور حل کریں

## اپنی `package.json` فائل میں intlayer کمانڈز استعمال کریں

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
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **نوٹ**: آپ چھوٹے عرفی نام (short aliases) بھی استعمال کر سکتے ہیں:
>
> - `npx intlayer list`: یہ `npx intlayer content list` کی جگہ لیتا ہے
> - `npx intlayer test`: یہ `npx intlayer content test` کی جگہ لیتا ہے
> - `npx intlayer projects-list` یا `npx intlayer pl`: یہ `npx intlayer projects list` کی جگہ لیتا ہے
