---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
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
  - version: 9.5.13
    date: 2026-09-29
    changes: "init اب صرف پیکجز انسٹال کرتا ہے اور فریم ورک سیٹ اپ کرتا ہے؛ ہر مرحلے کے لیے الگ سب کمانڈ؛ ٹرمینل کے بغیر --interactive ناکام ہوتا ہے"
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore آپشن شامل کیا گیا"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init کمانڈ کا مواد شامل کیا گیا"
author: aymericzip
---

# Intlayer شروع کریں (Init)

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

`init` کمانڈ Intlayer کے پیکجز انسٹال کرتی ہے اور آپ کا فریم ورک سیٹ اپ کرتی ہے (کنفیگریشن فائل، TypeScript، بنڈلر پلگ ان، middleware/proxy، پرووائیڈرز)۔ Intlayer شروع کرنے کا یہی تجویز کردہ طریقہ ہے۔

باقی سب کچھ (CI ورک فلوز، AI اسکلز، MCP سرور، ایڈیٹر ٹولز، lint قواعد، CMS، انفراسٹرکچر) اختیاری ہے: اسے `--interactive` چیک لسٹ سے منتخب کریں، یا اس کی مخصوص سب کمانڈ چلائیں (نیچے دیکھیں)۔

## عرفی نام (Aliases):

- `npx intlayer init`

## دلائل (Arguments):

- `--project-root [projectRoot]` - اختیاری۔ پروجیکٹ کی جڑ (root) ڈائریکٹری متعین کریں۔ اگر نہیں دی گئی، تو کمانڈ موجودہ ورکنگ ڈائریکٹری سے شروع کر کے پروجیکٹ روٹ تلاش کرے گی۔
- `--no-gitignore` - اختیاری۔ `.gitignore` فائل کی خودکار اپ ڈیٹ کو نظر انداز کرتا ہے۔ اگر یہ فلیگ لگا ہو، تو `.intlayer` کو `.gitignore` میں شامل نہیں کیا جائے گا۔
- `--no-framework-setup` - اختیاری۔ پروجیکٹ فائلوں کو چھوئے بغیر صرف پیکجز انسٹال کرتا ہے۔
- `--routing <routing>` - اختیاری۔ لوکیل روٹنگ: `prefix-no-default` (ڈیفالٹ)، `prefix-all`، `no-prefix`، `search-params` یا `none`۔
- `--content <layout>` - اختیاری۔ مواد کا اعلان کیسے کیا جاتا ہے:
  - `multilingual` - `{fileName}.content.{ts,json}` کمپوننٹ کے ساتھ، تمام لوکیلز ایک ہی فائل میں (`compiler.output` سیٹ کرتا ہے)۔
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` کمپوننٹ کے ساتھ (`compiler.output` اور `dictionary.locale` سیٹ کرتا ہے)۔
  - `centralized` - فی لوکیل ایک `/locales/{locale}.{json,po}` کیٹلاگ (`syncJSON` / `syncPO` پلگ ان شامل کرتا ہے)۔
  - `namespaces` - `/locales/{locale}/{namespace}.{json,po}` کیٹلاگز (`syncJSON` / `syncPO` پلگ ان شامل کرتا ہے)۔
- `--content-format <format>` - اختیاری، `--content` کے ساتھ۔ `multilingual` / `per-locale` کے لیے `ts` یا `json`، `centralized` / `namespaces` کے لیے `json` یا `po`۔ پہلے والا ڈیفالٹ ہے۔
- `--message-format <format>` - اختیاری، JSON میں `--content centralized` یا `namespaces` کے ساتھ۔ کیٹلاگز کا میسج سنٹیکس: `icu` (ڈیفالٹ)، `i18next`، `vue-i18n` یا `intlayer`۔
- `-i, --interactive` - اختیاری۔ ڈیفالٹ سیٹ کے بجائے ایک چیک لسٹ (پیکجز، CI، اسکلز، MCP، VS Code، LSP، lint، CMS، انفراسٹرکچر، …) سے سیٹ اپ کے مراحل منتخب کریں۔ ٹرمینل ضروری ہے: ٹرمینل نہ ہو (AI ایجنٹ، CI) تو کمانڈ ناکام ہو جاتی ہے اور اس کی جگہ چلانے کے لیے سب کمانڈز کی فہرست دکھاتی ہے۔
- `--no-github-actions` - اختیاری۔ `--interactive` کے ساتھ، منتخب ہونے پر بھی GitHub Actions ورک فلوز کبھی نہیں بناتا۔

## یہ کیا کرتا ہے:

`init` کمانڈ درج ذیل سیٹ اپ کام انجام دیتی ہے:

1. **پروجیکٹ کے ڈھانچے کی تصدیق** - یقینی بناتی ہے کہ آپ ایک درست پروجیکٹ ڈائریکٹری میں ہیں جس میں `package.json` فائل موجود ہے۔
2. **پیکجز انسٹال کرتا ہے** - آپ کے اسٹیک کے لیے غائب Intlayer پیکجز (مثلاً `react-intlayer`، `vite-intlayer`) انسٹال کرتا ہے اور پرانے پیکجز اپ گریڈ کرتا ہے۔
3. **`.gitignore` کو اپ ڈیٹ کرنا** - آپ کی `.gitignore` فائل میں `.intlayer` شامل کرتی ہے تاکہ تیار کردہ فائلوں کو ورژن کنٹرول سے خارج کیا جا سکے (`--no-gitignore` کے ذریعے اسے نظر انداز کیا جا سکتا ہے)۔
4. **TypeScript کو کنفیگر کرنا** - کسی بھی `tsconfig.json` فائلوں کو اپ ڈیٹ کرتی ہے تاکہ Intlayer کی ٹائپ ڈیفینیشنز (`.intlayer/**/*.ts`) شامل کی جا سکیں۔
5. **کنفیگریشن فائل بنانا** - ڈیفالٹ سیٹنگز کے ساتھ `intlayer.config.ts` (TypeScript پروجیکٹس کے لیے) یا `intlayer.config.mjs` (JavaScript پروجیکٹس کے لیے) تیار کرتی ہے۔
6. **بنڈلر / فریم ورک کنفیگ اپ ڈیٹ کرتا ہے** - آپ کی Vite، Next.js، Nuxt، Astro، … کنفیگریشن میں Intlayer پلگ ان شامل کرتا ہے، اور فریم ورک سپورٹ کرے تو middleware/proxy اور پرووائیڈرز بناتا ہے۔

## ایک وقت میں ایک مرحلہ سیٹ اپ کریں

`--interactive` چیک لسٹ کے ہر مرحلے کی اپنی سب کمانڈ ہے۔ جب قدریں فلیگز کے طور پر دی جائیں تو یہ کوئی سوال نہیں پوچھتیں، اس لیے انہیں AI ایجنٹ یا CI جاب سے محفوظ طریقے سے چلایا جا سکتا ہے۔

| کمانڈ                                                                 | کیا سیٹ اپ کرتی ہے                                                                      |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | غائب Intlayer پیکجز انسٹال کرتی ہے اور پرانے اپ گریڈ کرتی ہے                            |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | کنفیگریشن فائل، TypeScript، بنڈلر پلگ ان، middleware/proxy، پرووائیڈرز اور `.gitignore` |
| `intlayer init github-actions`                                        | `fill` اور `test` GitHub Actions ورک فلوز                                               |
| `intlayer init vscode-extension`                                      | `.vscode/extensions.json` میں Intlayer ایکسٹینشن کی سفارش کرتی ہے                       |
| `intlayer init lsp`                                                   | `.vscode/settings.json` میں Intlayer لینگویج سرور                                       |
| `intlayer init eslint`                                                | اگر پروجیکٹ پہلے سے lint استعمال کرتا ہو تو Intlayer lint قواعد (ESLint / oxlint)       |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | AI ایجنٹ اسکلز کی صورت میں Intlayer دستاویزات                                           |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Intlayer MCP سرور                                                                       |
| `intlayer init extension [--browser <chrome/firefox>]`                | Intlayer براؤزر ایکسٹینشن کا اسٹور صفحہ کھولتی ہے                                       |
| `intlayer init cms`                                                   | براؤزر کے ذریعے Intlayer CMS میں لاگ ان کرتی ہے اور اسناد `.env` میں محفوظ کرتی ہے      |
| `intlayer init infra --mode <desktop/docker/compose>`                 | ڈیسک ٹاپ ایپ یا سیلف ہوسٹڈ اسٹیک                                                        |

### AI ایجنٹ یا CI جاب سے

AI ایجنٹ کے شیل میں ٹرمینل نہیں ہوتا، اس لیے کسی سوال کا جواب نہیں دیا جا سکتا۔ ڈیفالٹ کمانڈ چلائیں، پھر اپنی ضرورت کی سب کمانڈز:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

ٹرمینل کے بغیر:

- `init skills` آپ کے اسٹیک سے مطابقت رکھنے والی اسکلز انسٹال کرتا ہے، جب تک `--skills` سیٹ نہ ہو (مثلاً `--skills Usage Content React`)۔
- `init skills` اور `init mcp` شناخت شدہ AI پلیٹ فارم (Claude Code، Cursor، VS Code، Windsurf، …) استعمال کرتے ہیں، جب تک `--platform` سیٹ نہ ہو، اور کوئی پلیٹ فارم نہ ملے تو پلیٹ فارمز کی فہرست کے ساتھ ناکام ہو جاتے ہیں۔
- `init mcp` `stdio` ٹرانسپورٹ استعمال کرتا ہے، جب تک `--transport` سیٹ نہ ہو۔
- `init infra` کے لیے `--mode` ضروری ہے، اور `init extension` صرف اسٹور لنکس دکھاتا ہے، جب تک `--browser` سیٹ نہ ہو۔

MCP سرور ہمیشہ پروجیکٹ کے اندر کنفیگر ہوتا ہے (Claude Code کے لیے `.mcp.json` میں)۔

## مثالیں:

### بنیادی انیشلائزیشن:

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

یہ خودکار طور پر پروجیکٹ روٹ کا پتہ لگا کر موجودہ ڈائریکٹری میں Intlayer شروع کرتا ہے۔

### اپنی مرضی کے پروجیکٹ روٹ کے ساتھ شروع کرنا:

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

یہ متعین کردہ ڈائریکٹری میں Intlayer شروع کرتا ہے۔

### .gitignore اپ ڈیٹ کیے بغیر شروع کرنا:

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

- یہ کمانڈ آئیڈیمپوٹنٹ (idempotent) ہے - آپ اسے محفوظ طریقے سے کئی بار چلا سکتے ہیں۔ پہلے سے کنفیگر شدہ مراحل کو خود بخود نظر انداز کر دیا جائے گا۔
- اگر کوئی کنفیگریشن فائل پہلے سے موجود ہے، تو اسے اوور رائٹ نہیں کیا جائے گا۔
- ایسی TypeScript کنفیگریشنز جن میں `include` ارے نہیں ہوتی (مثلاً حوالہ جات کے ساتھ سلوشن اسٹائل کنفیگریشنز) انہیں نظر انداز کر دیا جاتا ہے۔
- اگر پروجیکٹ روٹ میں `package.json` نہیں ملتی، تو کمانڈ غلطی (error) دے کر رک جائے گی۔
