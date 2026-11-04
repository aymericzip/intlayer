---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: ملحق Prettier x Oxfmt | ترتيب ترجمات Intlayer
description: "رتب اللغات في t()، وفئات plural()، وشروط enu()، وحالات select() ومفاتيح إعلانات المحتوى لديك باستخدام prettier-plugin-intlayer. يعمل مع Prettier وoxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - التنسيق
  - ترتيب الترجمات
  - ترتيب اللغات
  - i18n
  - التدويل
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "السجل الأولي"
  - version: 9.7.1
    date: 2026-11-03
    changes: "إضافة الاستخدام مع oxfmt"
author: aymericzip
---

# ملحق Prettier x Oxfmt

يقوم `prettier-plugin-intlayer` بوضع مفاتيح ترجماتك بترتيب ثابت في كل مرة يقوم فيها Prettier بتنسيق ملف. تظل الفروقات (diffs) صغيرة، وتصبح تعارضات الدمج أقل تكرارًا، ويسهل اكتشاف أي لغة مفقودة.

```ts
// قبل
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// بعد
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## التثبيت

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

يتطلب Prettier الإصدار 3 أو أحدث.

إذا كان مشروعك يستخدم Prettier بالفعل، فإن الأمر `intlayer init prettier` يقوم بتثبيت الملحق وإضافته إلى ملف التكوين نيابةً عنك.

## الاستخدام

يعمل الملحق مع Prettier ومع [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

أضف الملحق إلى ملف تكوين Prettier:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

لتطبيقه فقط على ملفات تعريف المحتوى الخاصة بك، استخدم التجاوز (override):

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

لا يحمّل oxfmt ملحقات Prettier. اجعل Prettier يشغّل الملحق على إعلانات المحتوى فقط، ثم اجعل oxfmt ينسّق المشروع بالكامل:

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

حافظ على هذا الترتيب. يعيد oxfmt كتابة التنسيق بأسلوبه الخاص، لكنه لا يعيد ترتيب مفاتيح الكائنات أبدًا، لذا يبقى الترتيب كما هو.

  </Tab>
</Tabs>

## ما الذي يتم ترتيبه

### `t()`: اللغات

تأتي اللغات المثبتة أولاً (`en` افتراضيًا). وتتبعها بقية اللغات حسب الترتيب الأبجدي.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזمנה לא נמצאה",
});
```

### `plural()`: ترتيب CLDR

تنتقل الفئات من أصغر كمية إلى القيمة الاحتياطية (fallback): `zero`، `one`، `two`، `few`، `many`، `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: حدود تصاعدية

يتم فرز الشروط حسب رقمها، ثم حسب المعامل (`<1`، `<=1`، `1`، `>=1`، `>1`). يوضع `fallback` في النهاية.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

في وقت التشغيل، يسري أول شرط مطابق. يطبق الملحق الترتيب الجديد فقط عندما تؤول كل كمية إلى نفس المحتوى. عندما يحدد الترتيب النتيجة، يترك الكائن كما كُتب تمامًا. على سبيل المثال، في `{ '<1': …, '<=-2.3': … }` يلتقط المفتاح `'<1'` كل رقم سالب.

### `select()`: أبجديًا

يتم ترتيب الحالات أبجديًا ويوضع `fallback` في النهاية.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

بدون مفتاح `fallback` أو `other`، يتم استخدام الحالة الأخيرة كقيمة احتياطية. تظل تلك الحالة في النهاية ويتم ترتيب الحالات التي تسبقها فقط.

### ملفات `.content.json`

يتم ترتيب الشكل التسلسلي بنفس الطريقة: `{ "nodeType": "translation", "translation": { … } }`، بالإضافة إلى عقد `plural` و `enumeration` و `select`.

### مفاتيح المحتوى (اختياري)

باستخدام `intlayerSortContentKeys: true`، يقوم الملحق أيضًا بفرز مفاتيح `content` في القاموس أبجديًا في كل مستويات التداخل. ينطبق هذا فقط في ملفات `*.content.*`.

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

يستمر الترتيب عبر كل دالة مساعدة (`t`، `plural`، `enu`، `select`، `cond`، `gender`، `md`، `insert`، `nest`، `file`…) للوصول إلى الكائنات داخلها. يحتفظ مخطط المفاتيح الخاص بكل مساعد بترتيبه. لا يُعاد ترتيب المفاتيح الممررة إلى `cond()` و `gender()` أبدًا لأن آخر مفتاح يعمل كقيمة احتياطية. تظل الحقول المجاورة لـ `content` (`key`، `title`، `locale`…) كما هي.

## الخيارات

| الخيار                    | القيمة الافتراضية | الوصف                                                                          |
| ------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| `intlayerPinnedLocales`   | `["en"]`         | اللغات المحفوظة أولاً في `t()`، بهذا الترتيب. مرر `[]` لترتيب كل اللغات أبجديًا.  |
| `intlayerSortContentKeys` | `false`          | في ملفات `*.content.*`، يتم أيضًا فرز مفاتيح محتوى القاموس والكائنات المتداخلة. |

## ما يترك دون تغيير

- الكائنات التي تحتوي على spread (`...base`)، أو مفتاح محسوب (`[key]`)، أو دالة، أو مفتاح مكرر.
- خرائط `plural()` بمفتاح لا يمثل فئة CLDR.
- خرائط `enu()` التي قد يؤدي تغيير ترتيبها إلى تغيير المحتوى المحلول.
- استدعاءات أي دالة أخرى مسماة كدالة مساعدة ولكن تم تمرير وسيط ليس كائنًا إليها.

تتحرك التعليقات مع المفتاح الذي تنتمي إليه.

## المحللات المدعومة (Parsers)

`babel` و `babel-flow` و `babel-ts` و `typescript` و `flow` و `acorn` و `espree` و `meriyah` و `json` و `json5` و `jsonc`. يتم أيضًا تنسيق كتل `<script>` في ملفات Vue و Svelte و Astro باستخدام هذه المحللات.

> **قيد معروف.** يشغل Prettier ملحقًا واحدًا فقط لكل محلل. إذا استبدل ملحق آخر محللات JavaScript/TypeScript أيضًا (على سبيل المثال `prettier-plugin-tailwindcss`)، فسيتم تطبيق آخر ملحق مدرج فقط على تلك الملفات. حدد نطاق `prettier-plugin-intlayer` لملفات `*.content.*` باستخدام override لتجنب التعارض. مع oxfmt، تُرتَّب أصناف Tailwind عبر خياره المدمج `sortTailwindcss`، لذا لا ينطبق هذا التعارض.
