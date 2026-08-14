---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: إضافة ESLint | قواعد الفحص (Lint) لـ Intlayer
description: اكتشف النصوص المكتوبة يدويًا (hardcoded)، والاستدعاءات الديناميكية التي لا يمكن لمترجم Intlayer تحسينها، ومحتوى القواميس غير المستخدم، باستخدام eslint-plugin-intlayer. متوافقة مع ESLint و oxlint عبر React و Vue و Svelte و Angular و Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - الفحص
  - i18n
  - التدويل
  - no-raw-text
  - نصوص مكتوبة يدويًا
  - ترجمات غير مستخدمة
  - محتوى غير مستخدم
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
    changes: "السجل الأولي"
author: aymericzip
---

# إضافة ESLint x OXLint

تلتقط `eslint-plugin-intlayer` أنواع أخطاء التدويل (i18n) التي لا يستطيع TypeScript اكتشافها:

1. **النصوص المكتوبة يدويًا (Hardcoded text)** التي لم يتم نقلها إلى القاموس مطلقًا.
2. **الاستدعاءات الديناميكية** التي تجتاز فحص الأنواع وتعمل، لكن مترجم Intlayer لا يمكنه تحسينها.
3. **المحتوى غير المستخدم (Dead content)** — القواميس والحقول التي لا يقرأها أي شيء في المشروع (اختياري بالطلب).

المفاتيح غير المعروفة ومسارات الحقول غير المعروفة واللغات المفقودة هي بالفعل أخطاء تجميع، لذا لا تعيد الإضافة تكرارها.

## التثبيت

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

تتطلب الإصدار 9 من ESLint أو أحدث (flat config). ESLint 10 مدعوم.

## الاستخدام

تعمل الإضافة في كل من ESLint و [oxlint](https://oxc.rs) — بنفس القواعد ونفس الخيارات.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

أو انشر أحد الإعدادات وحدّد مستويات الخطورة بنفسك:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
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

تنبيهان: لا يزال دعم إضافات JS في oxlint تجريبيًا (alpha)، كما أن oxlint لا يدعم المحللات المخصصة (custom parsers) — وبالتالي لا يتم فحص ملفات `.vue` و `.svelte` و `.astro` وقوالب Angular هناك. قم بتشغيل oxlint على ملفات JS/TS/JSX واحتفظ بـ ESLint للباقي.

تم استبعاد `no-unused-content` أعلاه عمدًا: فهي تحتاج إلى دليل العمل ومسار الملف المفحوص من سياق القاعدة، وهو ما لا يضمنه جسر إضافات JS التجريبي. قم بتشغيلها تحت ESLint.

  </Tab>
</Tabs>

### الإعدادات المسبقة (Configs)

| الإعداد         | `no-raw-text`           | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                    | error                   | error                     | off                      | off                 |
| `strict`        | error (+ نصوص خارج JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                     | error                   | error                     | off                      | off                 |

يحتفظ `recommended` بـ `no-raw-text` عند مستوى `warn` عمدًا: توجيهه إلى قاعدة تعليمات برمجية حالية يُظهر جميع النصوص غير المترجمة دفعة واحدة، وهو ما لا ينبغي أن يعطل عملية البناء من اليوم الأول.

`enforce-adapter-import` معطلة افتراضيًا — قم بتمكينها بشكل صريح إذا أردت ذلك.

`no-unused-content` معطلة في كل الإعدادات، بما في ذلك `strict`. إنها القاعدة الوحيدة التي تقرأ إعدادات Intlayer وتفحص ملفات المصدر من القرص، لذا يجب أن يكون تفعيلها خيارًا مقصودًا بدلاً من شيء يتم تفعيله تلقائيًا.

## القواعد

### `no-raw-text`

تبلغ عن النصوص الموجهة للمستخدم غير المصرح بها في القاموس. تستخدم نفس آلية الكشف مثل `intlayer extract`، لذلك يتم تجاهل أسماء العلامات التجارية وفئات CSS والمعرفات التقنية.

```jsx
// ✗ تم الإبلاغ عنه
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ سليم
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

يتم تخطي ملفات الإعلان عن المحتوى (`*.content.ts`, …).

لإصلاح ملف بالكامل مرة واحدة، قم بتشغيل `npx intlayer extract` ودع المترجم ينقل النصوص إلى قاموس نيابة عنك.

**الخيارات**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // السمات التي قيمتها نص موجه للمستخدم.
      // الافتراضي: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // العناصر التي لا يكون محتواها نصًا موجهًا للمستخدم أبدًا.
      // الافتراضي: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // تعبيرات نمطية للنصوص التي لا يجب الإبلاغ عنها أبدًا.
      ignorePatterns: ["^Powered by"],

      // الإبلاغ أيضًا عن السلاسل النصية الصريحة خارج وسوم العرض. الافتراضي: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

تتطلب أن يكون مفتاح القاموس سلسلة نصية صريحة (string literal).

لا يمكن للمترجم تحميل القاموس مسبقًا إلا عندما يتمكن من قراءة المفتاح مباشرة في موقع الاستدعاء. عند استخدام مفتاح محسوب، يتخطى التحسين بصمت ويقوم بحزم جميع القواميس بدلاً من ذلك.

```typescript
// ✗ تم الإبلاغ عنه
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ المتغير لا يزال ليس قيمة صريحة
const key = "home";
useIntlayer(key);

// ✓ سليم
useIntlayer("home");
getTranslations({ namespace: "home" });
```

ينطبق هذا على `useIntlayer` و `getIntlayer` وجميع محولات التوافق (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

تتطلب أن يكون الحقل الذي تقرأه من القاموس معروفًا بشكل ثابت.

يقوم المترجم بإزالة الحقول التي لا يرى أنها مستخدمة. الوصول الديناميكي غير مرئي بالنسبة له، وبالتالي قد تُرجع القراءة `undefined` أثناء التشغيل.

```typescript
// ✗ تم الإبلاغ عنه
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ سليم
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

تفضل استخدام محول التوافق `@intlayer/*` على الحزمة الأصلية. لا يتم حل الحزمة الأصلية إلى Intlayer إلا عند تكوين الاسم المستعار في أداة التجميع؛ بينما يعمل المحول دائمًا. قابلة للإصلاح التلقائي باستخدام `--fix`.

```typescript
// ✗ تم الإبلاغ عنه
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ سليم
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**معطلة افتراضيًا.** تبلغ عن المحتوى الذي لا يقرأه أي شيء في مشروعك، بالإضافة إلى مفاتيح القاموس المصرح بها في أكثر من مكان.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ يتم الإبلاغ عنه إذا لم يطلب أي مستدعي "home" في المشروع
  content: {
    title: t({ ar: "العنوان", en: "Title" }),

    // ✗ يتم الإبلاغ عنه عندما لا يقرأ أي شيء `hero`
    hero: {
      subtitle: t({ ar: "العنوان الفرعي", en: "Subtitle" }),
    },
  },
};
```

على عكس القواعد الأخرى، لا يمكن لهذه القاعدة الإجابة من الملف الحالي فقط — فالحقل يعتبر غير مستخدم بالنسبة للمشروع بأكمله فقط. عند أول إعلان محتوى في فحص الفاحص، تقوم بتحميل تكوين Intlayer الخاص بك، وفحص ملفات المصدر التي يعلن عنها التكوين (`build.traversePattern`, `compiler.transformPattern`)، وتشغيل نفس محلل الاستخدام الذي يشغل `@intlayer/lsp` والخط المشطوب "غير مستخدم" في إضافة VS Code. يتم تخزين النتيجة مؤقتًا لمدى `cacheTtl` مللي ثانية، بحيث يتم الفحص مرة واحدة لكل تشغيل بدلاً من مرة واحدة لكل ملف.

**الخيارات**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // الإبلاغ عن مفاتيح القواميس التي لا يشير إليها أي شيء. الافتراضي: true
      reportUnusedDictionaries: true,

      // الإبلاغ عن حقول المحتوى التي لا يقرأها أي شيء. الافتراضي: true
      reportUnusedFields: true,

      // الإبلاغ عن المفاتيح المصرح بها في أكثر من مكان. الافتراضي: true
      reportDuplicateKeys: true,

      // تعبيرات نمطية لمسارات الحقول التي لا يجب الإبلاغ عنها أبدًا.
      ignoreFields: ["^meta"],

      // جذر المشروع الذي يبدأ منه الفحص. الافتراضي: دليل عمل ESLint
      baseDir: process.cwd(),

      // مدة إعادة استخدام فحص المشروع، بالمللي ثانية. الافتراضي: 30000
      cacheTtl: 30000,
    },
  ],
}
```

قم بتقليل `cacheTtl` عند الفحص من خادم محرر طويل الأمد وتريد أن تظهر تعديلاتك بشكل أسرع؛ قم بتعيين `baseDir` عندما يمتد فحص واحد عبر عدة مشاريع Intlayer في مستودع موحد (monorepo).

> **تميل إلى التزام الصمت.** الإيجابية الخاطئة هنا تحذف ترجمة، لذا لا يتم الإبلاغ عن أي شيء عند استهلاك القاموس بطريقة لا يمكن للتحليل تتبعها: تمرير كائن المحتوى ككل، دالة ترجمة مرتبطة به (`const t = useTranslations("home")`)، إعلان تم الوصول إليه من خلال استيراد مباشر (`useDictionary(myDictionary)`)، استخدام `nest()` من قاموس آخر، أو قائمة حقول غير شاملة بسبب استخدام عامل النشر (spread). يتم احتساب مكونات الملف الواحد (`.vue`, `.svelte`, `.astro`) على أنها تستخدم كل حقل من القواميس المذكورة لأن كتل البرمجة النصية الخاصة بها لا يتم تحليلها هنا.

تقرأ `reportDuplicateKeys` القواميس غير المدمجة التي يكتبها البناء تحت `.intlayer/`، لذا تظل هادئة حتى يتم بناء المشروع مرة واحدة على الأقل. يتم دمج إعلانين يشتركان في نفس المفتاح وهو نمط مشروع — يوجد التقرير لأن حقلاً محددًا على كلا الجانبين يحتفظ بصمت بقيمة واحدة فقط من القيمتين.

يتم تحميل المحلل من `@intlayer/lsp`، والذي يتم توزيعه كـ ESM. وبالتالي تتطلب القاعدة إصدار Node قادرًا على تنفيذ `require()` لوحدة ES — مثل Node 20.19+ أو 22.12+. في أي إصدار أقدم، لا تبلغ عن شيء بدلاً من التسبب في فشل الفحص.

## أطر العمل (Frameworks)

تعمل كل قاعدة عبر جميع تكاملات Intlayer، بما في ذلك داخل قوالب Vue و Svelte و Angular. ما عليك سوى إخبار ESLint بالمحلل الذي يقرأ كل نوع ملف.

| إطار العمل                | الملفات           | المحلل (Parser)                   |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| قوالب Angular             | `.component.html` | `@angular-eslint/template-parser` |
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

قم بتثبيت المحللات التي يحتاجها مشروعك فقط.

> **قيد معروف.** في قوالب Vue و Angular، التعبير مثل `{{ content[key] }}` لا يتم فحصه بواسطة `no-dynamic-field-access`. يتم التقاط القراءات الديناميكية المكتوبة داخل كتلة البرمجة النصية كالمعتاد.
