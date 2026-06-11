---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: اسٹینڈ اکیلے بنڈل (Standalone Bundle)
description: سیکھیں کہ ایپ کے مواد کے لیے اسٹینڈ اکیلے JavaScript بنڈل کیسے تیار کیا جائے۔
keywords:
  - Standalone
  - بنڈل
  - CLI
  - Intlayer
  - ایڈیٹر
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "اسٹینڈ اکیلے کمانڈ کی دستاویزات کا آغاز"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# اسٹینڈ اکیلے بنڈل (Standalone Bundle)

`standalone` کمانڈ آپ کو ایک اسٹینڈ اکیلے JavaScript بنڈل تیار کرنے کی اجازت دیتی ہے جس میں Intlayer اور کوئی بھی دیگر متعین پیکیجز شامل ہوتے ہیں۔ یہ خاص طور پر ان ماحولوں میں Intlayer استعمال کرنے کے لیے مفید ہے جہاں پیکیج منیجر یا بنڈلر نہیں ہوتا، جیسے کہ ایک سادہ HTML/JS ایپ۔

یہ بنڈل [esbuild](https://esbuild.github.io/) کا استعمال کرتے ہوئے مطلوبہ پیکیجز اور ان کے انحصار (dependencies) کو ایک واحد فائل میں یکجا کرتا ہے جسے کسی بھی ویب پروجیکٹ میں آسانی سے درآمد کیا جا سکتا ہے۔

## استعمال

```bash packageManager="npm"
npx intlayer standalone --packages [پیکیجز...] [اختیارات]
```

```bash packageManager="yarn"
yarn intlayer standalone --packages [پیکیجز...] [اختیارات]
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages [پیکیجز...] [اختیارات]
```

```bash packageManager="bun"
bun x intlayer standalone --packages [پیکیجز...] [اختیارات]
```

## اختیارات

- `-o, --outfile [outfile]` - اختیاری۔ آؤٹ پٹ فائل کا نام۔ ڈیفالٹ: `intlayer-bundle.js`۔
- `--packages [پیکیجز...]` - لازمی۔ بنڈل میں شامل کرنے کے لیے پیکیجز کی فہرست (مثلاً: `intlayer`, `vanilla-intlayer`)۔
- `--version [version]` - اختیاری۔ بنڈل کرنے کے لیے پیکیجز کا ورژن۔ اگر متعین نہ ہو تو ڈیفالٹ طور پر Intlayer CLI کا ورژن استعمال کیا جاتا ہے۔
- `--minify` - اختیاری۔ آیا آؤٹ پٹ کو چھوٹا (minify) کرنا ہے یا نہیں۔ ڈیفالٹ: `true`۔
- `--platform [platform]` - اختیاری۔ بنڈل کے لیے ٹارگٹ پلیٹ فارم (مثلاً: `browser`, `node`)۔ ڈیفالٹ: `browser`۔
- `--format [format]` - اختیاری۔ بنڈل کے لیے آؤٹ پٹ فارمیٹ (مثلاً: `esm`, `cjs`, `iife`)۔ ڈیفالٹ: `esm`۔

## عمومی اختیارات

- `--env-file [envFile]` - انوائرمنٹ فائل۔
- `-e, --env [env]` - ماحول۔
- `--base-dir [baseDir]` - بیس ڈائریکٹری۔
- `--no-cache` - کیشے کو غیر فعال کریں۔
- `--verbose` - تفصیلی آؤٹ پٹ دکھائیں۔

## مثالیں:

### Vanilla JS کے لیے بنڈل بنانا:

```bash packageManager="npm"
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

```bash packageManager="yarn"
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

```bash packageManager="bun"
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

یہ ایک `intlayer.js` فائل بنائے گا جس میں `intlayer` اور `vanilla-intlayer` دونوں پیکیجز شامل ہوں گے، جو چھوٹے کیے گئے ہوں گے اور ESM فارمیٹ میں ہوں گے، اور ایک `<script>` ٹیگ کے ذریعے براؤزر میں استعمال کے لیے تیار ہوں گے۔

### مخصوص ورژن کا بنڈل بنانا:

```bash packageManager="npm"
npx intlayer standalone --packages intlayer --version 8.6.4
```

```bash packageManager="yarn"
yarn intlayer standalone --packages intlayer --version 8.6.4
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages intlayer --version 8.6.4
```

```bash packageManager="bun"
bun x intlayer standalone --packages intlayer --version 8.6.4
```

### دوسرے فارمیٹ میں بنڈل بنانا:

```bash packageManager="npm"
npx intlayer standalone --packages intlayer --format iife
```

```bash packageManager="yarn"
yarn intlayer standalone --packages intlayer --format iife
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages intlayer --format iife
```

```bash packageManager="bun"
bun x intlayer standalone --packages intlayer --format iife
```

## یہ کیا کرتا ہے:

1. **ایک عارضی ماحول بناتا ہے** - انحصار کو منظم کرنے کے لیے ایک عارضی ڈائریکٹری ترتیب دیتا ہے۔
2. **پیکیجز نصب کرتا ہے** - مطلوبہ پیکیجز اور ان کے انحصار کو نصب کرنے کے لیے `npm` یا `bun` (اگر دستیاب ہو) کا استعمال کرتا ہے۔
3. **انٹری پوائنٹ تیار کرتا ہے** - ایک عارضی انٹری پوائنٹ فائل بناتا ہے جو تمام مطلوبہ پیکیجز کو ایکسپورٹ کرتی ہے اور براؤزر میں چلنے پر انہیں عالمی متغیرات (global variables) کے طور پر ظاہر کرتی ہے۔
4. **esbuild کے ساتھ بنڈل کرتا ہے** - ہر چیز کو ایک فائل میں یکجا کرنے کے لیے esbuild کا استعمال کرتا ہے، اور درخواست کے مطابق منی فکیشن اور فارمیٹنگ لاگو کرتا ہے۔
5. **فائل تیار کرتا ہے** - تیار شدہ بنڈل کو متعین آؤٹ پٹ پاتھ پر لکھتا ہے۔

## عالمی متغیرات (Global Variables)

جب بنڈل براؤزر میں لوڈ ہوتا ہے، تو یہ مطلوبہ پیکیجز کو `window` آبجیکٹ پر عالمی متغیرات کے طور پر ظاہر کرتا ہے۔ متغیرات کے نام پیکیج کے ناموں سے لیے جاتے ہیں (مثلاً: `intlayer` بن جاتا ہے `Intlayer` ، اور `vanilla-intlayer` بن جاتا ہے `VanillaIntlayer`)۔

```javascript
// بنڈل سے Intlayer تک رسائی
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
