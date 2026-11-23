---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: إضافة Prettier x Oxfmt | ترتيب ترجمات Intlayer وإصلاح .value
description: "رتّب لغات t() وplural() وenu() وselect() في تعريفات المحتوى، وأضف .value حيث يُستخدم المحتوى كنص لتبقى الأنواع صالحة مع المحرر المرئي. تعمل مع Prettier وoxfmt."
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
  - المحرر المرئي
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "إضافة إعادة كتابة .value للمحتوى المستخدم كنص"
  - version: 9.7.1
    date: 2026-11-03
    changes: "السجل الأولي"
  - version: 9.7.1
    date: 2026-11-03
    changes: "إضافة الاستخدام مع oxfmt"
author: aymericzip
---

# ملحق Prettier x Oxfmt

تقوم `prettier-plugin-intlayer` بأمرين في كل مرة ينسّق فيها Prettier ملفًا:

1. **ترتّب ترجماتك** بترتيب ثابت. تبقى الفروقات صغيرة، وتقل تعارضات الدمج، ويسهل اكتشاف لغة مفقودة.
2. **تضيف `.value`** حيث يُستخدم المحتوى كنص، لتبقى أنواعك صالحة بعد تفعيل المحرر المرئي.

```ts
// قبل
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// بعد
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## التثبيت

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

يتطلب Prettier الإصدار 3 أو أحدث.

إذا كان مشروعك يستخدم Prettier بالفعل، فإن الأمر `intlayer init prettier` يقوم بتثبيت الملحق وإضافته إلى ملف التكوين نيابةً عنك.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

لا يستطيع oxfmt تحميل ملحقات خارجية، لذا يتم الترتيب عبر Prettier. ثبّت Prettier إلى جانب oxfmt. يُستخدم فقط لترتيب إعلانات المحتوى، ويستمر oxfmt في تنسيق مشروعك.

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

يتطلب Prettier الإصدار 3 أو أحدث. لا يُعدّ الأمر `intlayer init` الملحق إلا في المشاريع التي تستخدم Prettier بالفعل، لذا قم بتكوينه يدويًا كما هو موضح أدناه.

  </Tab>
</Tabs>

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

لترتيب تعريفات المحتوى فقط، استخدم override. عندها لا تُطبَّق إعادة كتابة `.value` على مكوّناتك:

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

يشغّل سكربت التنسيق أداتين، لكل منهما مهمة واحدة:

1. يشغّل **Prettier** الإضافة. يرتّب الـ glob الأول تعريفات المحتوى، ويضيف الثاني `.value` في مكوّناتك. احذف الـ glob الثاني إذا كنت تريد الترتيب فقط.
2. **oxfmt** ينسّق المشروع بالكامل، بما في ذلك إعلانات المحتوى.

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

حافظ على هذا الترتيب. يستبدل oxfmt التنسيق الذي كتبه Prettier بتنسيقه الخاص، لكنه لا يعيد ترتيب مفاتيح الكائنات أبدًا، لذا يبقى الترتيب محفوظًا.

لهذا الإعداد بعض القيود:

- **التنسيق عند الحفظ.** المحرر الذي ينسّق باستخدام oxfmt لا يشغّل الإضافة. شغّل سكربت `format` بدلًا من ذلك.
- **وضع check.** لا تستخدم `prettier --check` على الملفات التي نسّقها oxfmt: التنسيقات مختلفة، لذا سيُبلغ عن كل ملف. للتحقق من الترتيب في CI، شغّل سكربت `format` واجعل الـ job يفشل عند وجود تغييرات:

```bash
npm run format && git diff --exit-code
```

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### الترجمات المتطابقة

في ملفات `*.content.*`، يُستبدل `t()` الذي تحتوي جميع لغاته على النص نفسه بهذا النص. يُقدَّم النص العادي لكل اللغات، لذا لا تتغير النتيجة.

```ts
// قبل
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// بعد
nextjs: "Next.js",
```

يُحتفظ بـ `t()` الذي يحتوي على لغة واحدة، أو وسيط نوع (`t<string>()`)، أو تعليق، أو قيم غير نصية. اضبط `intlayerCollapseIdenticalTranslations: false` لتعطيل ذلك.

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

## المحتوى المستخدم كنص

عند تفعيل [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) (`editor.enabled: true`)، يكون الحقل الذي يُرجعه `useIntlayer` أو `getIntlayer` عقدة قابلة للعرض وليس نصًا. تمريره إلى سمة عنصر أصلي أو استدعاء دالة نصية عليه لم يعد يجتاز فحص الأنواع. القوالب النصية والدمج و`String()` تقبل أي نوع فتبقى كما هي. تضيف الإضافة `.value` التي تحتوي على النص سواء كان المحرر مفعّلًا أم لا.

```tsx
// قبل
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// بعد
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

ما يُعاد كتابته:

- دوال النص: `content.name.toUpperCase()`
- سمات العناصر الأصلية: `<img alt={content.alt} />`

ما يُترك دون تغيير لأنه يقبل عقدة:

- أبناء JSX: `<h1>{content.title}</h1>`
- خصائص المكوّنات: `<Card title={content.title} />`
- القوالب الموسومة: `` html`<h1>${content.title}</h1>` `` (Lit)

ينطبق هذا على المكوّنات لا على تعريفات المحتوى، لذا يجب تشغيل الإضافة على ملفات مكوّناتك. يتم تخطي أي متغير يُعاد تعريف اسمه في مكان آخر من الملف. لا تُعاد كتابة قوالب Vue وSvelte: استخدم لها [قاعدة ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)، وهي تدعم الإصلاح التلقائي أيضًا.

كما تزيل `.value` من عنصر JSX ابن: يصبح `<h1>{content.title.value}</h1>` هو `<h1>{content.title}</h1>`، ليتمكن المحرر المرئي من تحديد النص. ينطبق ذلك على React وNext.js وPreact وSolid وReact Native.

عطّلها باستخدام `intlayerNodeValueAccess: false`.

## الخيارات

| الخيار                                  | القيمة الافتراضية | الوصف                                                                                     |
| --------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]`         | اللغات المحفوظة أولاً في `t()`، بهذا الترتيب. مرر `[]` لترتيب كل اللغات أبجديًا.             |
| `intlayerSortContentKeys`               | `false`          | في ملفات `*.content.*`، يتم أيضًا فرز مفاتيح محتوى القاموس والكائنات المتداخلة.            |
| `intlayerCollapseIdenticalTranslations` | `true`           | في ملفات `*.content.*`، يستبدل `t()` الذي تحتوي جميع لغاته على النص نفسه بهذا النص.       |
| `intlayerNodeValueAccess`               | `true`           | تضيف `.value` حيث يُستخدم المحتوى كنص (`alt={content.alt}`، `content.name.toUpperCase()`). |

## ما يترك دون تغيير

- الكائنات التي تحتوي على spread (`...base`)، أو مفتاح محسوب (`[key]`)، أو دالة، أو مفتاح مكرر.
- خرائط `plural()` بمفتاح لا يمثل فئة CLDR.
- خرائط `enu()` التي قد يؤدي تغيير ترتيبها إلى تغيير المحتوى المحلول.
- استدعاءات أي دالة أخرى مسماة كدالة مساعدة ولكن تم تمرير وسيط ليس كائنًا إليها.

تتحرك التعليقات مع المفتاح الذي تنتمي إليه.

## المحللات المدعومة (Parsers)

`babel` و `babel-flow` و `babel-ts` و `typescript` و `flow` و `acorn` و `espree` و `meriyah` و `json` و `json5` و `jsonc`. يتم أيضًا تنسيق كتل `<script>` في ملفات Vue و Svelte و Astro باستخدام هذه المحللات.

> **قيد معروف.** يشغل Prettier ملحقًا واحدًا فقط لكل محلل. إذا استبدل ملحق آخر محللات JavaScript/TypeScript أيضًا (على سبيل المثال `prettier-plugin-tailwindcss`)، فسيتم تطبيق آخر ملحق مدرج فقط على تلك الملفات. حدد نطاق `prettier-plugin-intlayer` لملفات `*.content.*` باستخدام override لتجنب التعارض. مع oxfmt، تُرتَّب أصناف Tailwind عبر خياره المدمج `sortTailwindcss`، لذا لا ينطبق هذا التعارض. في هذه الحالة، اعتمد على [قاعدة ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md) لإضافة `.value` في المكوّنات.
