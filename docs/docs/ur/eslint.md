---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint پلگ ان | Intlayer کے لیے lint قواعد
description: eslint-plugin-intlayer کے ساتھ ہارڈ کوڈ شدہ سٹرنگز اور وہ ڈائنامک کالز پکڑیں جنہیں Intlayer کمپائلر بہتر نہیں بنا سکتا۔ ESLint اور oxlint کے ساتھ کام کرتا ہے — React، Vue، Svelte، Angular اور Astro میں۔
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - بین الاقوامی کاری
  - no-raw-text
  - ہارڈ کوڈ شدہ سٹرنگز
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "ابتدائی تاریخ"
author: aymericzip
---

# ESLint x OXLint پلگ ان

`eslint-plugin-intlayer` i18n کی وہ دو قسم کی غلطیاں پکڑتا ہے جو TypeScript نہیں دیکھ سکتا:

1. **ہارڈ کوڈ شدہ متن** جو کبھی کسی dictionary تک نہیں پہنچا۔
2. **ڈائنامک کالز** جو ٹائپ چیک پاس کر لیتی ہیں اور چلتی بھی ہیں، مگر Intlayer کمپائلر انہیں بہتر نہیں بنا سکتا۔

نامعلوم dictionary keys، نامعلوم field paths اور غائب locales پہلے ہی کمپائل کی خامیاں ہیں، اس لیے یہ پلگ ان انہیں دہراتا نہیں۔

## تنصیب

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

ESLint 9 یا اس سے نیا ورژن درکار ہے (flat config)۔

## استعمال

یہ پلگ ان ESLint اور [oxlint](https://oxc.rs) دونوں میں چلتا ہے — وہی قواعد، وہی اختیارات۔

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

یا قواعد کو ایک ایک کرکے فعال کریں:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

دو باتیں ذہن میں رکھیں: oxlint میں JS پلگ ان کی سپورٹ ابھی alpha مرحلے میں ہے، اور oxlint حسبِ ضرورت parser کی سپورٹ نہیں دیتا — چنانچہ `.vue`، `.svelte`، `.astro` فائلیں اور Angular ٹیمپلیٹس وہاں lint نہیں ہوتیں۔ اپنی JS/TS/JSX فائلوں پر oxlint چلائیں اور باقی کے لیے ESLint رکھیں۔

  </Tab>
</Tabs>

### کنفیگریشنز

| کنفیگریشن       | `no-raw-text`                  | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ------------------------------ | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                           | error                   | error                     | off                      |
| `strict`        | error (+ JSX سے باہر literals) | error                   | error                     | error                    |
| `contract-only` | off                            | error                   | error                     | off                      |

`recommended` جان بوجھ کر `no-raw-text` کو `warn` پر رکھتا ہے: اسے کسی موجودہ codebase پر لگانے سے تمام غیر ترجمہ شدہ سٹرنگز ایک ساتھ سامنے آ جاتی ہیں، اور اس سے پہلے ہی دن آپ کا build نہیں ٹوٹنا چاہیے۔

`enforce-adapter-import` بطورِ ڈیفالٹ بند ہے — ضرورت ہو تو اسے واضح طور پر فعال کریں۔

## قواعد

### `no-raw-text`

صارف کو دکھائی دینے والے اُس متن کی نشاندہی کرتا ہے جو کسی dictionary میں ڈیکلیئر نہیں کیا گیا۔ یہ `intlayer extract` جیسی ہی شناخت استعمال کرتا ہے، اس لیے برانڈ کے نام، CSS کلاسز اور تکنیکی شناخت کار نظر انداز ہو جاتے ہیں۔

```jsx
// ✗ نشاندہی کی جاتی ہے
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ ٹھیک ہے
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

مواد کی ڈیکلیریشن فائلیں (`*.content.ts`، …) چھوڑ دی جاتی ہیں۔

پوری فائل کو ایک ساتھ درست کرنے کے لیے `npx intlayer extract` چلائیں اور کمپائلر کو سٹرنگز dictionary میں منتقل کرنے دیں۔

**اختیارات**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // وہ ایٹریبیوٹس جن کی قدر صارف کو دکھائی دینے والا متن ہے۔
      // ڈیفالٹ: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // وہ عناصر جن کا مواد کبھی صارف کا متن نہیں ہوتا۔
      // ڈیفالٹ: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // اُس متن کے لیے ریگولر ایکسپریشنز جس کی کبھی نشاندہی نہ ہو۔
      ignorePatterns: ["^Powered by"],

      // markup سے باہر کے string literals کی بھی نشاندہی کریں۔ ڈیفالٹ: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

لازم کرتا ہے کہ dictionary key ایک string literal ہو۔

کمپائلر کسی dictionary کو صرف اسی وقت پہلے سے لوڈ کر سکتا ہے جب وہ کال کی جگہ پر key کو براہِ راست پڑھ سکے۔ حساب شدہ key کی صورت میں وہ خاموشی سے بہتری کا مرحلہ چھوڑ دیتا ہے اور اس کے بجائے تمام dictionaries بنڈل کر دیتا ہے۔

```typescript
// ✗ نشاندہی کی جاتی ہے
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ ویری ایبل پھر بھی literal نہیں ہے
const key = "home";
useIntlayer(key);

// ✓ ٹھیک ہے
useIntlayer("home");
getTranslations({ namespace: "home" });
```

یہ `useIntlayer`، `getIntlayer` اور ہر compat اڈاپٹر (`useTranslation`، `useTranslations`، `formatMessage`، `<FormattedMessage id>`، `<Trans i18nKey>`، …) پر لاگو ہوتا ہے۔

### `no-dynamic-field-access`

لازم کرتا ہے کہ آپ dictionary سے جو field پڑھ رہے ہیں وہ سٹیٹک طور پر معلوم ہو۔

کمپائلر اُن fields کو ہٹا دیتا ہے جن کا استعمال اسے نظر نہیں آتا۔ حساب شدہ رسائی اس کے لیے غیر مرئی ہوتی ہے، اس لیے رن ٹائم پر پڑھنے سے `undefined` مل سکتا ہے۔

```typescript
// ✗ نشاندہی کی جاتی ہے
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ ٹھیک ہے
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

اصل پیکیج کے بجائے `@intlayer/*` compat اڈاپٹر کو ترجیح دیتا ہے۔ اصل پیکیج صرف اُسی وقت Intlayer پر resolve ہوتا ہے جب bundler کا alias کنفیگر ہو؛ اڈاپٹر ہمیشہ ہوتا ہے۔ `--fix` کے ذریعے خودکار طور پر درست ہو جاتا ہے۔

```typescript
// ✗ نشاندہی کی جاتی ہے
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ ٹھیک ہے
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## فریم ورکس

تمام قواعد Intlayer کے تمام انضمامات میں کام کرتے ہیں، بشمول Vue، Svelte اور Angular ٹیمپلیٹس کے اندر۔ آپ کو صرف ESLint کو بتانا ہے کہ کون سا parser کس فائل قسم کو پڑھے گا۔

| فریم ورک                  | فائلیں            | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular ٹیمپلیٹس          | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

صرف وہی parsers انسٹال کریں جن کی آپ کے پروجیکٹ کو ضرورت ہے۔

> **معلوم حد۔** Vue اور Angular ٹیمپلیٹس میں `{{ content[key] }}` جیسی expression کو `no-dynamic-field-access` نہیں جانچتا۔ script بلاک میں لکھی گئی ڈائنامک ریڈز معمول کے مطابق پکڑی جاتی ہیں۔
