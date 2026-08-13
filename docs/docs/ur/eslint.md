---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint پلگ ان | Intlayer کے لیے لنٹ قواعد
description: eslint-plugin-intlayer کے ذریعے ہارڈ کوڈ شدہ سٹرنگز، ایسی ڈائنامک کالز جنہیں Intlayer کمپائلر بہتر نہیں بنا سکتا، اور غیر استعمال شدہ ڈکشنری مواد کو پکڑیں۔ React، Vue، Svelte، Angular اور Astro میں ESLint اور oxlint کے ساتھ کام کرتا ہے۔
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - لنٹنگ
  - i18n
  - بین الاقوامیت
  - no-raw-text
  - ہارڈ کوڈ شدہ سٹرنگز
  - غیر استعمال شدہ ترجمے
  - غیر فعال مواد
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

`eslint-plugin-intlayer` ان i18n غلطیوں کو پکڑتا ہے جنہیں TypeScript نہیں پکڑ سکتا:

1. **ہارڈ کوڈ شدہ متن (Hardcoded text)** جو کبھی ڈکشنری میں شامل نہیں ہوا۔
2. **ڈائنامک کالز (Dynamic calls)** جو ٹائپ چیک پاس کرتی ہیں اور چلتی ہیں، لیکن Intlayer کمپائلر انہیں آپٹمائز نہیں کر سکتا۔
3. **غیر فعال مواد (Dead content)** — ڈکشنریز اور فیلڈز جنہیں پروجیکٹ میں کہیں بھی نہیں پڑھا جاتا (آپٹ ان)۔

نامعلوم ڈکشنری کیز، نامعلوم فیلڈ پاتھز اور غائب لوکیلز پہلے ہی کمپائل نقائص ہیں، اس لیے پلگ ان ان کو دوبارہ رپورٹ نہیں کرتا۔

## انسٹالیشن

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

ESLint 9 یا اس سے نیا ورژن (flat config) درکار ہے۔

## استعمال

یہ پلگ ان ESLint اور [oxlint](https://oxc.rs) دونوں میں یکساں قواعد اور اختیارات کے ساتھ کام کرتا ہے۔

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

یا قواعد کو ایک ایک کر کے فعال کریں:

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
      "intlayer/no-unused-content": "warn",
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

دو اہم باتیں: oxlint کی JS پلگ ان سپورٹ ابھی الفا مرحلے میں ہے، اور oxlint کسٹم پارسرز کو سپورٹ نہیں کرتا — لہذا `.vue`، `.svelte`، `.astro` اور Angular ٹیمپلیٹس وہاں لنٹ نہیں ہوتے۔ اپنی JS/TS/JSX فائلوں پر oxlint چلائیں اور باقی کے لیے ESLint برقرار رکھیں۔

`no-unused-content` کو اوپر جان بوجھ کر چھوڑ دیا گیا ہے: اسے رول سیاق و سباق سے ورکنگ ڈائرکٹری اور لنٹ شدہ فائل پاتھ کی ضرورت ہوتی ہے، جس کی الفا JS پلگ ان برج ضمانت نہیں دیتا۔ اسے ESLint کے تحت چلائیں۔

  </Tab>
</Tabs>

### کنفیگریشنز (Configs)

| کنفیگ           | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                    | error                   | error                     | off                      | off                 |
| `strict`        | error (+ نان JSX لٹرلز) | error                   | error                     | error                    | off                 |
| `contract-only` | off                     | error                   | error                     | off                      | off                 |

`recommended` جان بوجھ کر `no-raw-text` کو `warn` پر رکھتا ہے: اسے کسی موجودہ کوڈ بیس پر لاگو کرنے سے تمام غیر ترجمہ شدہ سٹرنگز ایک ساتھ سامنے آ جاتی ہیں، جس سے پہلے ہی دن آپ کا بلڈ فیل نہیں ہونا چاہیے۔

`enforce-adapter-import` پہلے سے غیر فعال ہے — اگر آپ چاہیں تو اسے واضح طور پر فعال کریں۔

`no-unused-content` ہر کنفیگ میں بند ہے، بشمول `strict`۔ یہ واحد قاعدہ ہے جو آپ کی Intlayer کنفیگریشن کو پڑھتا ہے اور ڈسک سے آپ کی سورس فائلوں کو اسکین کرتا ہے، اس لیے اسے آن کرنا ایک دانستہ انتخاب ہونا چاہیے۔

## قواعد

### `no-raw-text`

صارف کے سامنے آنے والے ایسے متن کی رپورٹ کرتا ہے جو ڈکشنری میں ڈکلیئر نہیں ہے۔ یہ `intlayer extract` جیسی شناخت استعمال کرتا ہے، اس لیے برانڈ نام، CSS کلاسز اور تکنیکی شناخت کنندگان کو نظر انداز کر دیا جاتا ہے۔

```jsx
// ✗ رپورٹ کیا گیا
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ درست
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

مواد کے اعلامیہ کی فائلیں (`*.content.ts`, …) چھوڑ دی جاتی ہیں۔

ایک ساتھ پوری فائل کو ٹھیک کرنے کے لیے، `npx intlayer extract` چلائیں اور کمپائلر کو سٹرنگز کو ڈکشنری میں منتقل کرنے دیں۔

**اختیارات**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // وہ اوصاف جن کی قدر صارف کے سامنے آنے والا متن ہے۔
      // ڈیفالٹ: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // وہ عناصر جن کا مواد کبھی بھی صارف کے سامنے آنے والا متن نہیں ہوتا۔
      // ڈیفالٹ: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // کبھی رپورٹ نہ کیے جانے والے متن کے ریگولر ایکسپریشنز۔
      ignorePatterns: ["^Powered by"],

      // مارک اپ سے باہر سٹرنگ لٹرلز کی بھی رپورٹ کریں۔ ڈیفالٹ: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

ڈکشنری کی کے سٹرنگ لٹرل ہونے کا تقاضا کرتا ہے۔

کمپائلر صرف اسی صورت میں ڈکشنری کو پری لوڈ کر سکتا ہے جب وہ کال سائٹ پر براہ راست کی کو پڑھ سکے۔ حسابی کی کے ساتھ یہ خاموشی سے اصلاح کو چھوڑ دیتا ہے اور اس کے بجائے ہر ڈکشنری کو بنڈل کر دیتا ہے۔

```typescript
// ✗ رپورٹ کیا گیا
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ متغیر اب بھی لٹرل نہیں ہے
const key = "home";
useIntlayer(key);

// ✓ درست
useIntlayer("home");
getTranslations({ namespace: "home" });
```

یہ `useIntlayer`، `getIntlayer` اور ہر مطابقت پذیر اڈاپٹر (`useTranslation`، `useTranslations`، `formatMessage`، `<FormattedMessage id>`، `<Trans i18nKey>`، …) پر لاگو ہوتا ہے۔

### `no-dynamic-field-access`

ڈکشنری سے پڑھی جانے والی فیلڈ کے جامد طور پر معلوم ہونے کا تقاضا کرتا ہے۔

کمپائلر ان فیلڈز کو ہٹا دیتا ہے جنہیں وہ استعمال ہوتے ہوئے نہیں دیکھتا۔ ایک حسابی رسائی اس کے لیے غیر مرئی ہوتی ہے، اس لیے رن ٹائم پر پڑھنا `undefined` واپس کر سکتا ہے۔

```typescript
// ✗ رپورٹ کیا گیا
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ درست
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

اصل پیکیج کے مقابلے `@intlayer/*` مطابقت پذیر اڈاپٹر کو ترجیح دیتا ہے۔ اصل پیکیج صرف اس وقت Intlayer پر حل ہوتا ہے جب بنڈلر عرف تشکیل دیا گیا ہو؛ اڈاپٹر ہمیشہ حل ہوتا ہے۔ `--fix` کے ساتھ خودکار طور پر درست کیا جا سکتا ہے۔

```typescript
// ✗ رپورٹ کیا گیا
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ درست
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**پہلے سے غیر فعال ہے۔** ایسے مواد کی رپورٹ کرتا ہے جسے پروجیکٹ میں کوئی نہیں پڑھتا، نیز ایک سے زیادہ جگہوں پر ڈکلیئر کی گئی ڈکشنری کیز۔

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ تب رپورٹ ہوتا ہے جب پروجیکٹ میں کوئی "home" کی درخواست نہیں کرتا
  content: {
    title: t({ ur: "عنوان", en: "Title" }),

    // ✗ جب کوئی چیز `hero` نہیں پڑھتی تو رپورٹ ہوتا ہے
    hero: {
      subtitle: t({ ur: "ذیلی عنوان", en: "Subtitle" }),
    },
  },
};
```

دوسرے قواعد کے برعکس، یہ قاعدہ صرف سامنے موجود فائل سے فیصلہ نہیں کر سکتا — ایک فیلڈ صرف پورے پروجیکٹ کے تناظر میں غیر استعمال شدہ ہوتی ہے۔ لنٹ رن کے پہلے مواد کے اعلان پر یہ آپ کی Intlayer کنفیگریشن لوڈ کرتا ہے، ان سورس فائلوں کو اسکین کرتا ہے جن کا وہ کنفیگریشن اعلان کرتی ہے (`build.traversePattern`, `compiler.transformPattern`) اور وہی تجزیہ کار چلاتا ہے جو `@intlayer/lsp` اور VS Code ایکسٹینشن میں "غیر استعمال شدہ" کو سپورٹ کرتا ہے۔ نتیجہ `cacheTtl` ملی سیکنڈ کے لیے محفوظ ہوتا ہے، اس لیے اسکین ہر فائل کے بجائے فی رن ایک بار ہوتا ہے۔

**اختیارات**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // ان ڈکشنری کیز کی رپورٹ کریں جن کا کوئی حوالہ نہیں ہے۔ ڈیفالٹ: true
      reportUnusedDictionaries: true,

      // ان فیلڈز کی رپورٹ کریں جنہیں کچھ نہیں پڑھتا۔ ڈیفالٹ: true
      reportUnusedFields: true,

      // ایک سے زیادہ جگہوں پر ڈکلیئر کیز کی رپورٹ کریں۔ ڈیفالٹ: true
      reportDuplicateKeys: true,

      // فیلڈ پاتھز کے ریگولر ایکسپریشنز جنہیں کبھی رپورٹ نہیں کیا جائے گا۔
      ignoreFields: ["^meta"],

      // پروجیکٹ روٹ جہاں سے اسکین شروع ہوتا ہے۔ ڈیفالٹ: ESLint کی ورکنگ ڈائرکٹری
      baseDir: process.cwd(),

      // ایک پروجیکٹ اسکین کو کتنی دیر تک دوبارہ استعمال کیا جائے گا (ms میں)۔ ڈیفالٹ: 30000
      cacheTtl: 30000,
    },
  ],
}
```

جب آپ طویل مدتی ایڈیٹر سرور سے لنٹ کر رہے ہوں اور چاہتے ہیں کہ ترامیم جلد نظر آئیں تو `cacheTtl` کو کم کریں؛ جب ایک ہی لنٹ رن ایک مونوریپو میں متعدد Intlayer پروجیکٹس پر محیط ہو تو `baseDir` سیٹ کریں۔

> **یہ خاموش رہنے کو ترجیح دیتا ہے۔** یہاں غلط مثبت رپورٹ ایک ترجمہ کو حذف کر سکتی ہے، اس لیے جب ڈکشنری کو ایسے طریقے سے استعمال کیا جاتا ہے جسے تجزیہ ٹریک نہیں کر سکتا تو کچھ بھی رپورٹ نہیں کیا جاتا: پورا مواد کا آبجیکٹ پاس کرنا، اس سے منسلک ٹرانسلیٹر فنکشن (`const t = useTranslations("home")`)، براہ راست درآمد کے ذریعے رسائی حاصل کردہ اعلان (`useDictionary(myDictionary)`)، کسی دوسری ڈکشنری سے `nest()`، یا اسپرڈ آپریٹر کی وجہ سے غیر جامع بنائی گئی فیلڈ لسٹ۔ سنگل فائل اجزاء (`.vue`, `.svelte`, `.astro`) کو ان تمام فیلڈز کا استعمال کرتے ہوئے شمار کیا جاتا ہے جن کا وہ ذکر کرتے ہیں، کیونکہ ان کے اسکرپٹ بلاکس یہاں پارس نہیں ہوتے۔

`reportDuplicateKeys` ان ان مرجڈ ڈکشنریز کو پڑھتا ہے جنہیں بلڈ `.intlayer/` کے تحت لکھتا ہے، اس لیے یہ تب تک خاموش رہتا ہے جب تک کہ پروجیکٹ کو کم از کم ایک بار بلڈ نہ کیا جائے۔ دو اعلانات جو ایک کی کا اشتراک کرتے ہیں وہ ضم ہو جاتے ہیں، جو کہ ایک درست پیٹرن ہے — رپورٹ اس لیے موجود ہے کیونکہ دونوں طرف بیان کردہ فیلڈ خاموشی سے صرف ایک قدر رکھتی ہے۔

تجزیہ کار `@intlayer/lsp` سے لوڈ ہوتا ہے، جو ESM کے طور پر فراہم کیا جاتا ہے۔ اس لیے قاعدے کے لیے ایسے Node ورژن کی ضرورت ہوتی ہے جو ES ماڈیول کو `require()` کر سکے — Node 20.19+ یا 22.12+۔ پرانے ورژنز پر یہ لنٹ رن کو فیل کرنے کے بجائے کچھ بھی رپورٹ نہیں کرتا۔

## فریم ورکس

ہر قاعدہ تمام Intlayer انٹیگریشنز میں کام کرتا ہے، بشمول Vue، Svelte اور Angular ٹیمپلیٹس۔ آپ کو صرف ESLint کو بتانے کی ضرورت ہے کہ کون سا پارسر ہر فائل کی قسم کو پڑھتا ہے۔

| فریم ورک                  | فائلیں            | پارسر (Parser)                    |
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

صرف وہی پارسر انسٹال کریں جن کی آپ کے پروجیکٹ کو ضرورت ہے۔

> **معلوم حد بندی۔** Vue اور Angular ٹیمپلیٹس میں `{{ content[key] }}` جیسے ایکسپریشن کو `no-dynamic-field-access` کے ذریعے چیک نہیں کیا جاتا۔ اسکرپٹ بلاک کے اندر لکھی گئی ڈائنامک ریڈنگز معمول کے مطابق پکڑی جاتی ہیں۔
