---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier x Oxfmt پلگ ان | Intlayer کے ترجمات ترتیب دیں
description: "prettier-plugin-intlayer کے ذریعے t() کے لوکیلز، plural() کے زمروں، enu() کی شرائط، select() کے کیسز اور اپنے مواد کے اعلانات کی چابیاں ترتیب دیں۔ Prettier اور oxfmt دونوں کے ساتھ کام کرتا ہے۔"
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - فارمیٹنگ
  - ترجمات ترتیب دیں
  - لوکیلز ترتیب دیں
  - i18n
  - بین الاقوامیت
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "ابتدائی تاریخ"
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt کے ساتھ استعمال شامل کیا گیا"
author: aymericzip
---

# Prettier x Oxfmt پلگ ان

`prettier-plugin-intlayer` ہر بار جب Prettier کسی فائل کو فارمیٹ کرتا ہے تو آپ کے ترجمات کی کیز (keys) کو ایک مقررہ ترتیب میں رکھتا ہے۔ ڈفس (diffs) مختصر رہتے ہیں، ضم کرنے کے تنازعات (merge conflicts) کم ہوتے ہیں اور لاپتہ لوکیل کو تلاش کرنا آسان ہو جاتا ہے۔

```ts
// پہلے
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// بعد میں
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## انسٹالیشن

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

اس کے لیے Prettier ورژن 3 یا اس کے بعد کا ورژن درکار ہے۔

اگر آپ کا پروجیکٹ پہلے ہی Prettier استعمال کرتا ہے تو `intlayer init prettier` پلگ ان انسٹال کرتا ہے اور اسے آپ کی کنفیگریشن میں شامل کرتا ہے۔

## استعمال

یہ پلگ ان Prettier اور [oxfmt](https://oxc.rs/docs/guide/usage/formatter) دونوں کے ساتھ کام کرتا ہے۔

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

پلگ ان کو اپنی Prettier کنفیگریشن میں شامل کریں:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

اسے صرف اپنے مواد کے اعلانات پر لاگو کرنے کے لیے override کا استعمال کریں:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt، Prettier پلگ انز لوڈ نہیں کرتا۔ Prettier کو پلگ ان صرف اپنے مواد کے اعلانات پر چلانے دیں، پھر oxfmt کو پورے پروجیکٹ کو فارمیٹ کرنے دیں:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"]
      }
    }
  ]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

یہی ترتیب رکھیں۔ oxfmt لے آؤٹ کو اپنے انداز میں دوبارہ لکھتا ہے، لیکن آبجیکٹ کی چابیوں کی ترتیب کبھی نہیں بدلتا، اس لیے ترتیب برقرار رہتی ہے۔

  </Tab>
</Tabs>

## کیا ترتیب دیا جاتا ہے

### `t()`: لوکیلز

پن کیے گئے لوکیلز سب سے پہلے آتے ہیں (پہلے سے طے شدہ `en`)۔ باقی لوکیلز حروف تہجی کی ترتیب میں آتے ہیں۔

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR ترتیب

زمرے سب سے چھوٹی مقدار سے لے کر فال بیک تک ہوتے ہیں: `zero`، `one`، `two`، `few`، `many`، `other`۔

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: چڑھتی ہوئی حدیں (ascending thresholds)

شرائط کو پہلے ان کے نمبر اور پھر آپریٹر (`<1`, `<=1`, `1`, `>=1`, `>1`) کے مطابق ترتیب دیا جاتا ہے۔ `fallback` سب سے آخر میں جاتا ہے۔

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

رن ٹائم پر پہلی مماثل شرط جیت جاتی ہے۔ پلگ ان نئی ترتیب صرف اس وقت لاگو کرتا ہے جب ہر مقدار اب بھی ایک ہی مواد پر حل ہوتی ہے۔ جب ترتیب نتیجہ کا فیصلہ کرتی ہے تو آبجیکٹ کو ویسا ہی چھوڑ دیا جاتا ہے جیسا لکھا گیا تھا۔ مثال کے طور پر `{ '<1': …, '<=-2.3': … }` میں `'<1'` کی تمام منفی اعداد کو پکڑتی ہے۔

### `select()`: حروف تہجی کے لحاظ سے

کیسز کو حروف تہجی کے لحاظ سے ترتیب دیا جاتا ہے اور `fallback` آخر میں آتا ہے۔

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

بغیر کسی `fallback` یا `other` کی کے، آخری کیس کو فال بیک کے طور پر استعمال کیا جاتا ہے۔ وہ کیس آخر میں رہتا ہے اور صرف اس سے پہلے کے کیسز ہی ترتیب دیے جاتے ہیں۔

### `.content.json` فائلیں

سیریلائزڈ فارم کو بھی اسی طرح ترتیب دیا جاتا ہے: `{ "nodeType": "translation", "translation": { … } }`، نیز `plural`، `enumeration` اور `select` نوڈز۔

### مواد کی کیز (اختیاری)

`intlayerSortContentKeys: true` کے ساتھ، پلگ ان ڈکشنری کے `content` کی کیز کو بھی ہر نیسٹنگ سطح پر حروف تہجی کے لحاظ سے ترتیب دیتا ہے۔ یہ صرف `*.content.*` فائلوں پر لاگو ہوتا ہے۔

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

ترتیب ہر ہیلپر فنکشن (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) کے ذریعے ان کے اندر موجود آبجیکٹس تک پہنچنے کے لیے جاری رہتی ہے۔ ہر ہیلپر کا اپنا کی میپ اپنی ترتیب برقرار رکھتا ہے۔ `cond()` اور `gender()` کو دی گئی کیز کو کبھی دوبارہ ترتیب نہیں دیا جاتا کیونکہ ان کی آخری کی فال بیک کے طور پر کام کرتی ہے۔ `content` کے متوازی فیلڈز (`key`, `title`, `locale`…) اپنی حالت پر برقرار رہتے ہیں۔

## اختیارات

| آپشن                      | ڈیفالٹ   | تفصیل                                                                                                   |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]` | وہ لوکیلز جو `t()` میں سب سے پہلے رکھے جاتے ہیں، اسی ترتیب میں۔ تمام لوکیلز ترتیب دینے کے لیے `[]` دیں۔ |
| `intlayerSortContentKeys` | `false`  | `*.content.*` فائلوں میں ڈکشنری کے مواد کی کیز اور اندرونی آبجیکٹس کو بھی ترتیب دیں۔                    |

## کیا بغیر تبدیلی کے رہتا ہے

- اسپریڈ (`...base`)، حسابی کی (`[key]`)، طریقہ یا ڈپلیکیٹ کی رکھنے والے آبجیکٹس۔
- `plural()` میپس جن کی کی CLDR زمرہ نہیں ہے۔
- `enu()` میپس جن کی نئی ترتیب حل شدہ مواد کو تبدیل کر دے گی۔
- کسی بھی دوسرے فنکشن کی کالز جس کا نام ہیلپر جیسا ہو لیکن اسے غیر آبجیکٹ دلیل دی گئی ہو۔

تبصرے اس کی کے ساتھ منتقل ہوتے ہیں جس سے ان کا تعلق ہے۔

## معاون پارسرز

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` اور `jsonc`۔ Vue، Svelte اور Astro فائلوں کے `<script>` بلاکس ان پارسرز کے ساتھ فارمیٹ کیے جاتے ہیں۔

> **معلوم حد بندی۔** Prettier فی پارسر صرف ایک پلگ ان چلاتا ہے۔ اگر کوئی دوسرا پلگ ان بھی JavaScript/TypeScript پارسرز کی جگہ لیتا ہے (مثال کے طور پر `prettier-plugin-tailwindcss`) تو ان فائلوں پر صرف آخری درج کردہ لاگو ہوتا ہے۔ تنازعہ سے بچنے کے لیے override کے ساتھ `prettier-plugin-intlayer` کو `*.content.*` فائلوں تک محدود کریں۔ oxfmt میں Tailwind کلاسز اس کے بلٹ ان `sortTailwindcss` آپشن سے ترتیب دی جاتی ہیں، اس لیے یہ ٹکراؤ پیش نہیں آتا۔
