---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer شروع کریں (Init)
description: سیکھیں کہ اپنے پروجیکٹ میں Intlayer کو کیسے شروع کیا جائے۔
keywords:
  - شروع (Init)
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
    changes: "--no-gitignore آپشن شامل کیا گیا"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init کمانڈ کا مواد شامل کیا گیا"
---

# Intlayer شروع کریں (Init)

```bash
npx intlayer init
```

`init` کمانڈ ضروری فائلیں اور ترتیبات بنا کر آپ کے پروجیکٹ میں Intlayer کو خودکار طور پر کنفیگر کرتی ہے۔ Intlayer کے ساتھ شروع کرنے کا یہ تجویز کردہ طریقہ ہے۔

## عرفی نام (Aliases):

- `npx intlayer init`

## دلائل (Arguments):

- `--project-root [projectRoot]` - اختیاری۔ پروجیکٹ کی جڑ (root) ڈائریکٹری متعین کریں۔ اگر نہیں دی گئی، تو کمانڈ موجودہ ورکنگ ڈائریکٹری سے شروع کر کے پروجیکٹ روٹ تلاش کرے گی۔
- `--no-gitignore` - اختیاری۔ `.gitignore` فائل کی خودکار اپ ڈیٹ کو نظر انداز کرتا ہے۔ اگر یہ فلیگ لگا ہو، تو `.intlayer` کو `.gitignore` میں شامل نہیں کیا جائے گا۔

## یہ کیا کرتا ہے:

`init` کمانڈ درج ذیل سیٹ اپ کام انجام دیتی ہے:

1. **پروجیکٹ کے ڈھانچے کی تصدیق** - یقینی بناتی ہے کہ آپ ایک درست پروجیکٹ ڈائریکٹری میں ہیں جس میں `package.json` فائل موجود ہے۔
2. **`.gitignore` کو اپ ڈیٹ کرنا** - آپ کی `.gitignore` فائل میں `.intlayer` شامل کرتی ہے تاکہ تیار کردہ فائلوں کو ورژن کنٹرول سے خارج کیا جا سکے (`--no-gitignore` کے ذریعے اسے نظر انداز کیا جا سکتا ہے)۔
3. **TypeScript کو کنفیگر کرنا** - کسی بھی `tsconfig.json` فائلوں کو اپ ڈیٹ کرتی ہے تاکہ Intlayer کی ٹائپ ڈیفینیشنز (`.intlayer/**/*.ts`) شامل کی جا سکیں۔
4. **کنفیگریشن فائل بنانا** - ڈیفالٹ سیٹنگز کے ساتھ `intlayer.config.ts` (TypeScript پروجیکٹس کے لیے) یا `intlayer.config.mjs` (JavaScript پروجیکٹس کے لیے) تیار کرتی ہے۔
5. **Vite کنفیگریشن اپ ڈیٹ کرنا** - اگر کسی Vite کنفیگ فائل کا پتہ چلتا ہے، تو یہ `vite-intlayer` پلگ ان کے لیے امپورٹ شامل کرتی ہے۔
6. **Next.js کنفیگریشن اپ ڈیٹ کرنا** - اگر کسی Next.js کنفیگ فائل کا پتہ چلتا ہے، تو یہ `next-intlayer` پلگ ان کے لیے امپورٹ شامل کرتی ہے۔

## مثالیں:

### بنیادی انیشلائزیشن:

```bash
npx intlayer init
```

یہ خودکار طور پر پروجیکٹ روٹ کا پتہ لگا کر موجودہ ڈائریکٹری میں Intlayer شروع کرتا ہے۔

### اپنی مرضی کے پروجیکٹ روٹ کے ساتھ شروع کرنا:

```bash
npx intlayer init --project-root ./my-project
```

یہ متعین کردہ ڈائریکٹری میں Intlayer شروع کرتا ہے۔

### .gitignore اپ ڈیٹ کیے بغیر شروع کرنا:

```bash
npx intlayer init --no-gitignore
```

یہ تمام کنفیگریشن فائلیں ترتیب دے دے گا لیکن آپ کی `.gitignore` فائل میں ترمیم نہیں کرے گا۔

## آؤٹ پٹ کی مثال:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## نوٹ:

- یہ کمانڈ آئیڈیمپوٹنٹ (idempotent) ہے — آپ اسے محفوظ طریقے سے کئی بار چلا سکتے ہیں۔ پہلے سے کنفیگر شدہ مراحل کو خود بخود نظر انداز کر دیا جائے گا۔
- اگر کوئی کنفیگریشن فائل پہلے سے موجود ہے، تو اسے اوور رائٹ نہیں کیا جائے گا۔
- ایسی TypeScript کنفیگریشنز جن میں `include` ارے نہیں ہوتی (مثلاً حوالہ جات کے ساتھ سلوشن اسٹائل کنفیگریشنز) انہیں نظر انداز کر دیا جاتا ہے۔
- اگر پروجیکٹ روٹ میں `package.json` نہیں ملتی، تو کمانڈ غلطی (error) دے کر رک جائے گی۔
