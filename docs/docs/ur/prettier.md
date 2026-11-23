---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Prettier x Oxfmt پلگ اِن | Intlayer تراجم ترتیب دیں اور .value درست کریں
description: "اپنے مواد کے اعلانات میں t()، plural()، enu() اور select() کے locales ترتیب دیں، اور جہاں مواد سٹرنگ کے طور پر استعمال ہو وہاں .value شامل کریں تاکہ ویژول ایڈیٹر کے ساتھ ٹائپس درست رہیں۔ Prettier اور oxfmt کے ساتھ کام کرتا ہے۔"
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
  - ویژول ایڈیٹر
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "سٹرنگ کے طور پر استعمال ہونے والے مواد کے لیے .value شامل کرنا متعارف کرایا گیا"
  - version: 9.7.1
    date: 2026-11-03
    changes: "ابتدائی تاریخ"
  - version: 9.7.1
    date: 2026-11-03
    changes: "oxfmt کے ساتھ استعمال شامل کیا گیا"
author: aymericzip
---

# Prettier x Oxfmt پلگ ان

جب بھی Prettier کوئی فائل فارمیٹ کرتا ہے، `prettier-plugin-intlayer` دو کام کرتا ہے:

1. **آپ کے تراجم کو** ایک مقررہ ترتیب میں رکھتا ہے۔ Diffs چھوٹے رہتے ہیں، merge conflicts کم ہوتے ہیں اور غائب locale آسانی سے نظر آتا ہے۔
2. **جہاں مواد سٹرنگ کے طور پر استعمال ہو وہاں `.value` شامل کرتا ہے**، تاکہ ویژول ایڈیٹر فعال ہونے پر بھی آپ کے ٹائپس درست رہیں۔

```ts
// پہلے
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// بعد میں
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## انسٹالیشن

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

اس کے لیے Prettier ورژن 3 یا اس کے بعد کا ورژن درکار ہے۔

اگر آپ کا پروجیکٹ پہلے ہی Prettier استعمال کرتا ہے تو `intlayer init prettier` پلگ ان انسٹال کرتا ہے اور اسے آپ کی کنفیگریشن میں شامل کرتا ہے۔

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt تھرڈ پارٹی پلگ انز لوڈ نہیں کر سکتا، اس لیے ترتیب Prettier کے ذریعے ہوتی ہے۔ oxfmt کے ساتھ Prettier انسٹال کریں۔ یہ صرف آپ کے مواد کے اعلانات کو ترتیب دینے کے لیے استعمال ہوتا ہے؛ آپ کے پروجیکٹ کو oxfmt ہی فارمیٹ کرتا رہتا ہے۔

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

اس کے لیے Prettier ورژن 3 یا اس کے بعد کا ورژن درکار ہے۔ `intlayer init` پلگ ان کو صرف ان پروجیکٹس میں سیٹ کرتا ہے جو پہلے سے Prettier استعمال کرتے ہیں، اس لیے اسے نیچے دکھائے گئے طریقے سے خود کنفیگر کریں۔

  </Tab>
</Tabs>

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

صرف مواد کے اعلانات ترتیب دینے کے لیے override استعمال کریں۔ تب `.value` شامل کرنا آپ کے کمپوننٹس پر لاگو نہیں ہوگا:

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

فارمیٹ اسکرپٹ دو ٹولز چلاتا ہے، ہر ایک کا ایک ہی کام ہے:

1. **Prettier** پلگ اِن چلاتا ہے۔ پہلا glob مواد کے اعلانات ترتیب دیتا ہے، دوسرا کمپوننٹس میں `.value` شامل کرتا ہے۔ اگر صرف ترتیب چاہیے تو دوسرا glob ہٹا دیں۔
2. **oxfmt** مواد کے اعلانات سمیت پورے پروجیکٹ کو فارمیٹ کرتا ہے۔

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

یہی ترتیب رکھیں۔ oxfmt، Prettier کے لکھے ہوئے لے آؤٹ کو اپنے لے آؤٹ سے بدل دیتا ہے، لیکن آبجیکٹ کیز کی ترتیب کبھی نہیں بدلتا، اس لیے ترتیب برقرار رہتی ہے۔

اس سیٹ اپ کی کچھ حدود ہیں:

- **محفوظ کرنے پر فارمیٹ۔** oxfmt سے فارمیٹ کرنے والا ایڈیٹر پلگ اِن نہیں چلاتا۔ اس کی بجائے `format` اسکرپٹ چلائیں۔
- **Check موڈ۔** oxfmt سے فارمیٹ شدہ فائلوں پر `prettier --check` استعمال نہ کریں: لے آؤٹ مختلف ہوتے ہیں، اس لیے یہ ہر فائل کی اطلاع دیتا ہے۔ CI میں ترتیب چیک کرنے کے لیے `format` اسکرپٹ چلائیں اور تبدیلیاں ہونے پر job کو ناکام کریں:

```bash
npm run format && git diff --exit-code
```

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### یکساں ترجمے

`*.content.*` فائلوں میں، جس `t()` کی تمام locales میں ایک ہی string ہو، اسے اسی string سے بدل دیا جاتا ہے۔ سادہ string ہر locale کو دی جاتی ہے، اس لیے نتیجہ نہیں بدلتا۔

```ts
// پہلے
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// بعد میں
nextjs: "Next.js",
```

ایک ہی locale، type argument (`t<string>()`)، comment یا غیر string ویلیوز والا `t()` برقرار رکھا جاتا ہے۔ اسے بند کرنے کے لیے `intlayerCollapseIdenticalTranslations: false` سیٹ کریں۔

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

## سٹرنگ کے طور پر استعمال ہونے والا مواد

[ویژول ایڈیٹر](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) فعال ہونے پر (`editor.enabled: true`)، `useIntlayer` یا `getIntlayer` سے واپس آنے والا فیلڈ سٹرنگ نہیں بلکہ رینڈر ہونے والا نوڈ ہوتا ہے۔ اسے کسی نیٹو عنصر کے attribute میں دینا یا اس پر سٹرنگ میتھڈ کال کرنا اب ٹائپ چیک پاس نہیں کرتا۔ Template literals، سٹرنگ جوڑنا اور `String()` کوئی بھی ٹائپ قبول کرتے ہیں، اس لیے یہ جوں کے توں رہتے ہیں۔ پلگ اِن `.value` شامل کرتا ہے، جو ایڈیٹر فعال ہو یا نہ ہو، سٹرنگ رکھتا ہے۔

```tsx
// پہلے
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// بعد میں
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

دوبارہ لکھے جاتے ہیں:

- سٹرنگ میتھڈز: `content.name.toUpperCase()`
- نیٹو عناصر کے attributes: `<img alt={content.alt} />`

بغیر تبدیلی کے چھوڑے جاتے ہیں، کیونکہ یہ نوڈ قبول کرتے ہیں:

- JSX children: `<h1>{content.title}</h1>`
- کمپوننٹ props: `<Card title={content.title} />`
- tagged templates: `` html`<h1>${content.title}</h1>` `` (Lit)

یہ مواد کے اعلانات پر نہیں بلکہ کمپوننٹس پر لاگو ہوتا ہے، اس لیے پلگ اِن کو آپ کی کمپوننٹ فائلوں پر چلنا چاہیے۔ جس ویری ایبل کا نام فائل میں کہیں اور دوبارہ اعلان کیا گیا ہو اسے چھوڑ دیا جاتا ہے۔ Vue اور Svelte ٹیمپلیٹس دوبارہ نہیں لکھے جاتے: ان کے لیے [ESLint رول `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/eslint.md) استعمال کریں، جس میں autofix بھی ہے۔

یہ JSX child سے `.value` بھی ہٹاتا ہے: `<h1>{content.title.value}</h1>` بن جاتا ہے `<h1>{content.title}</h1>`، تاکہ ویژول ایڈیٹر متن منتخب کر سکے۔ یہ React، Next.js، Preact، Solid اور React Native پر لاگو ہوتا ہے۔

`intlayerNodeValueAccess: false` سے بند کریں۔

## اختیارات

| آپشن                                    | ڈیفالٹ   | تفصیل                                                                                                                |
| --------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | وہ لوکیلز جو `t()` میں سب سے پہلے رکھے جاتے ہیں، اسی ترتیب میں۔ تمام لوکیلز ترتیب دینے کے لیے `[]` دیں۔              |
| `intlayerSortContentKeys`               | `false`  | `*.content.*` فائلوں میں ڈکشنری کے مواد کی کیز اور اندرونی آبجیکٹس کو بھی ترتیب دیں۔                                 |
| `intlayerCollapseIdenticalTranslations` | `true`   | `*.content.*` فائلوں میں، جس `t()` کی تمام locales میں ایک ہی string ہو، اسے اسی string سے بدلتا ہے۔                 |
| `intlayerNodeValueAccess`               | `true`   | جہاں مواد سٹرنگ کے طور پر استعمال ہو وہاں `.value` شامل کرتا ہے (`alt={content.alt}`، `content.name.toUpperCase()`)۔ |

## کیا بغیر تبدیلی کے رہتا ہے

- اسپریڈ (`...base`)، حسابی کی (`[key]`)، طریقہ یا ڈپلیکیٹ کی رکھنے والے آبجیکٹس۔
- `plural()` میپس جن کی کی CLDR زمرہ نہیں ہے۔
- `enu()` میپس جن کی نئی ترتیب حل شدہ مواد کو تبدیل کر دے گی۔
- کسی بھی دوسرے فنکشن کی کالز جس کا نام ہیلپر جیسا ہو لیکن اسے غیر آبجیکٹ دلیل دی گئی ہو۔

تبصرے اس کی کے ساتھ منتقل ہوتے ہیں جس سے ان کا تعلق ہے۔

## معاون پارسرز

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` اور `jsonc`۔ Vue، Svelte اور Astro فائلوں کے `<script>` بلاکس ان پارسرز کے ساتھ فارمیٹ کیے جاتے ہیں۔

> **معلوم حد بندی۔** Prettier فی پارسر صرف ایک پلگ ان چلاتا ہے۔ اگر کوئی دوسرا پلگ ان بھی JavaScript/TypeScript پارسرز کی جگہ لیتا ہے (مثال کے طور پر `prettier-plugin-tailwindcss`) تو ان فائلوں پر صرف آخری درج کردہ لاگو ہوتا ہے۔ تنازعہ سے بچنے کے لیے override کے ساتھ `prettier-plugin-intlayer` کو `*.content.*` فائلوں تک محدود کریں۔ oxfmt میں Tailwind کلاسز اس کے بلٹ ان `sortTailwindcss` آپشن سے ترتیب دی جاتی ہیں، اس لیے یہ ٹکراؤ پیش نہیں آتا۔ اس صورت میں، کمپوننٹس میں `.value` کے لیے [ESLint رول `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/eslint.md) پر انحصار کریں۔
