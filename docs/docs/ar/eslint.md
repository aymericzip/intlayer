---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: إضافة ESLint | قواعد التدقيق لـ Intlayer
description: اكتشف النصوص المكتوبة مباشرةً في الكود والاستدعاءات الديناميكية التي لا يستطيع مُصرِّف Intlayer تحسينها، باستخدام eslint-plugin-intlayer. تعمل مع ESLint و oxlint عبر React وVue وSvelte وAngular وAstro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - التدقيق
  - i18n
  - التدويل
  - no-raw-text
  - نصوص مكتوبة مباشرة في الكود
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
    changes: "بدء التاريخ"
author: aymericzip
---

# إضافة ESLint x OXLint

يكتشف `eslint-plugin-intlayer` نوعين من أخطاء i18n لا يستطيع TypeScript رؤيتهما:

1. **النص المكتوب مباشرةً في الكود** الذي لم يصل أبدًا إلى قاموس.
2. **الاستدعاءات الديناميكية** التي تجتاز فحص الأنواع وتعمل، لكن لا يستطيع مُصرِّف Intlayer تحسينها.

مفاتيح القواميس غير المعروفة، ومسارات الحقول غير المعروفة، واللغات المفقودة هي بالفعل أخطاء تصريف، لذلك لا تكرّرها هذه الإضافة.

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

يتطلب ESLint 9 أو أحدث (flat config).

## الاستخدام

تعمل الإضافة في ESLint و[oxlint](https://oxc.rs) معًا — القواعد نفسها والخيارات نفسها.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

أو فعِّل القواعد واحدة تلو الأخرى:

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

ملاحظتان: دعم إضافات JS في oxlint لا يزال في مرحلة alpha، كما أن oxlint لا يدعم المحلّلات المخصصة — لذا لا يتم تدقيق ملفات `.vue` و`.svelte` و`.astro` وقوالب Angular هناك. شغّل oxlint على ملفات JS/TS/JSX وأبقِ ESLint لبقية الملفات.

  </Tab>
</Tabs>

### التهيئات

| التهيئة         | `no-raw-text`                    | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | -------------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                             | error                   | error                     | off                      |
| `strict`        | error (+ القيم الحرفية خارج JSX) | error                   | error                     | error                    |
| `contract-only` | off                              | error                   | error                     | off                      |

تُبقي `recommended` القاعدة `no-raw-text` عند مستوى `warn` عن قصد: توجيهها إلى codebase قائمة يُظهر كل النصوص غير المترجمة دفعة واحدة، وهذا لا ينبغي أن يُعطِّل بناء مشروعك من اليوم الأول.

القاعدة `enforce-adapter-import` معطّلة افتراضيًا — فعِّلها صراحةً إن أردتها.

## القواعد

### `no-raw-text`

تُبلِّغ عن النص الموجَّه للمستخدم وغير المُعلن في قاموس. تستخدم القاعدة الآلية نفسها التي يستخدمها `intlayer extract`، لذا تُتجاهَل أسماء العلامات التجارية وأصناف CSS والمعرّفات التقنية.

```jsx
// ✗ يتم الإبلاغ عنه
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ سليم
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

تُتجاوَز ملفات إعلان المحتوى (`*.content.ts`، …).

لإصلاح ملف بأكمله دفعة واحدة، شغّل `npx intlayer extract` ودع المُصرِّف ينقل النصوص إلى قاموس نيابةً عنك.

**الخيارات**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // السمات التي تكون قيمتها نصًا موجّهًا للمستخدم.
      // الافتراضي: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // العناصر التي لا يكون محتواها أبدًا نصًا موجّهًا للمستخدم.
      // الافتراضي: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // تعبيرات نمطية لنصوص لا يُبلَّغ عنها أبدًا.
      ignorePatterns: ["^Powered by"],

      // الإبلاغ أيضًا عن القيم النصية خارج الترميز. الافتراضي: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

تشترط أن يكون مفتاح القاموس قيمة نصية حرفية.

لا يستطيع المُصرِّف تحميل قاموس مسبقًا إلا عندما يتمكن من قراءة المفتاح مباشرةً في موضع الاستدعاء. ومع مفتاح محسوب، يتخطى التحسين بصمت ويحزم بدلًا من ذلك كل القواميس.

```typescript
// ✗ يتم الإبلاغ عنه
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ المتغيّر لا يزال ليس قيمة حرفية
const key = "home";
useIntlayer(key);

// ✓ سليم
useIntlayer("home");
getTranslations({ namespace: "home" });
```

ينطبق هذا على `useIntlayer` و`getIntlayer` وكل محوّل compat (`useTranslation`، `useTranslations`، `formatMessage`، `<FormattedMessage id>`، `<Trans i18nKey>`، …).

### `no-dynamic-field-access`

تشترط أن يكون الحقل الذي تقرأه من القاموس معروفًا بشكل ساكن.

يزيل المُصرِّف الحقول التي لا يرى استخدامها. والوصول المحسوب غير مرئي له، لذلك قد تُعيد القراءة `undefined` أثناء التشغيل.

```typescript
// ✗ يتم الإبلاغ عنه
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

تُفضِّل محوّل compat `@intlayer/*` على الحزمة الأصلية. الحزمة الأصلية لا تُحلّ إلى Intlayer إلا عند تهيئة alias الخاص بأداة التحزيم؛ أما المحوّل فيفعل ذلك دائمًا. قابلة للإصلاح تلقائيًا عبر `--fix`.

```typescript
// ✗ يتم الإبلاغ عنه
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ سليم
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## أُطر العمل

تعمل جميع القواعد عبر كل تكاملات Intlayer، بما في ذلك داخل قوالب Vue وSvelte وAngular. كل ما عليك هو إخبار ESLint أي محلّل يقرأ كل نوع من الملفات.

| إطار العمل                | الملفات           | المحلّل                           |
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

ثبِّت فقط المحلّلات التي يحتاجها مشروعك.

> **قيد معروف.** في قوالب Vue وAngular، لا تفحص القاعدة `no-dynamic-field-access` تعبيرًا مثل `{{ content[key] }}`. أما القراءات الديناميكية المكتوبة داخل كتلة script فتُكتشف بشكل طبيعي.
