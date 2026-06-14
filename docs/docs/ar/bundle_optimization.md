---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: تحسين حجم وأداء حزمة i18n
description: قم بتقليل حجم حزمة تطبيقك عن طريق تحسين محتوى التدويل (i18n). تعلم كيفية الاستفادة من "tree shaking" والتحميل الكسول (lazy loading) للقواميس مع Intlayer.
keywords:
  - تحسين الحزمة (Bundle Optimization)
  - أتمتة المحتوى
  - المحتوى الديناميكي
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "تمت إضافة `intlayerPurgeBabelPlugin` و `intlayerMinifyBabelPlugin` لـ Babel/Webpack؛ توضيح مسار الإضافات (plugin pipeline)"
  - version: 8.7.0
    date: 2026-04-08
    changes: "إضافة خياري `minify` و `purge` لإعدادات البناء"
author: aymericzip
---

# تحسين حجم وأداء حزمة i18n

أحد أكثر التحديات شيوعًا مع حلول i18n التقليدية التي تعتمد على ملفات JSON هو إدارة حجم المحتوى. إذا لم يقم المطورون بتقسيم المحتوى يدويًا إلى مساحات أسماء (namespaces)، فغالبًا ما ينتهي الأمر بالمستخدمين بتنزيل الترجمات الخاصة بكل صفحة وربما لكل لغة فقط لعرض صفحة واحدة.

على سبيل المثال، تطبيق يحتوي على 10 صفحات مترجمة إلى 10 لغات قد يتسبب في قيام المستخدم بتنزيل محتوى الـ 100 صفحة، على الرغم من أنه يحتاج فقط إلى **واحدة** (الصفحة الحالية باللغة الحالية). يؤدي هذا إلى إهدار عرض النطاق الترددي وبطء في أوقات التحميل.

**يحل Intlayer هذه المشكلة من خلال التحسين في وقت البناء.** فهو يحلل الكود الخاص بك لاكتشاف القواميس التي يتم استخدامها فعليًا لكل مكون ويعيد إدراج المحتوى الضروري فقط في حزمتك.

## جدول المحتويات

<TOC />

## قم بتحليل حزمتك

يُعد تحليل حزمتك هو الخطوة الأولى لتحديد ملفات JSON "الثقيلة" وفرص تقسيم الكود (code-splitting). تُنشئ هذه الأدوات مخططًا شجريًا (treemap) مرئيًا للكود المترجم لتطبيقك، مما يسمح لك بمعرفة أي المكتبات تستهلك المساحة الأكبر بالضبط.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

يستخدم Vite الـ Rollup تحت الغطاء. تُنشئ الإضافة `rollup-plugin-visualizer` ملف HTML تفاعليًا يوضح حجم كل وحدة في الرسم البياني الخاص بك.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // افتح التقرير تلقائيًا في متصفحك
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

للمشاريع التي تستخدم الـ App Router والـ Turbopack، يوفر Next.js محللًا تجريبيًا مدمجًا لا يتطلب أي تبعيات إضافية.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

إذا كنت تستخدم مُحزم Webpack الافتراضي في Next.js، فاستخدم المحلل الرسمي للحزم (bundle analyzer). قم بتشغيله عن طريق تعيين متغير بيئة أثناء البناء.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // إعدادات Next.js الخاصة بك
});
```

**الاستخدام:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standard Webpack

لـ Create React App (ejected)، أو Angular، أو إعدادات Webpack المخصصة، استخدم المعيار الصناعي `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## كيف يعمل

يستخدم Intlayer **نهجًا لكل مكون**. بخلاف ملفات JSON العامة، يتم تعريف المحتوى الخاص بك بجانب مكوناتك أو بداخلها. أثناء عملية البناء، يقوم Intlayer بـ:

1. **تحليل** الكود الخاص بك للعثور على استدعاءات `useIntlayer`.
2. **بناء** محتوى القاموس المقابل.
3. **استبدال** استدعاء `useIntlayer` بكود مُحسّن استنادًا إلى إعداداتك.

يضمن هذا ما يلي:

- إذا لم يتم استيراد مكون، فلن يتم تضمين محتواه في الحزمة (Dead Code Elimination).
- إذا كان المكون محملًا بكسل (lazy-loaded)، فسيتم تحميل محتواه بكسل أيضًا.

## مرجع الإضافات

يتم تقسيم تحسين البناء في Intlayer إلى عدة إضافات منفصلة، لكل منها مسؤولية واحدة. ففهم ما تفعله كل إضافة يمنع الارتباك عند إعدادها.

### إضافات Babel (`@intlayer/babel`)

تُستخدم هذه مباشرة في `babel.config.js` للإعدادات المستندة إلى Webpack (مثل Next.js مع Babel، CRA، Webpack المخصص، إلخ).

| الإضافة                       | ما تفعله                                                                                                             |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | تمسح ملفات `.content.ts` وتكتب القواميس المجمعة إلى `.intlayer/`                                                     |
| `intlayerOptimizeBabelPlugin` | تعيد كتابة `useIntlayer('key')` → `useDictionary(hash)` وتحقن الـ `import` المطابق للقاموس                           |
| `intlayerPurgeBabelPlugin`    | تمسح جميع ملفات المصدر، تزيل **حقول المحتوى غير المستخدمة** من ملفات القاموس المجمعة `.intlayer/**/*.json`           |
| `intlayerMinifyBabelPlugin`   | **تعيد تسمية مفاتيح حقول المحتوى** إلى أسماء مستعارة أبجدية قصيرة (`title` → `a`) في كل من ملفات JSON والكود المصدري |

> **ترتيب الإضافات مهم.** في `babel.config.js` يجب أن تظهر إضافات التطهير (purge) والتصغير (minify) **قبل** إضافة التحسين (optimize). تقوم خطوة التحسين باستبدال `useIntlayer('key')` باستدعاء مبهم لـ `useDictionary(hash)`، مما يمحو معلومات مفتاح القاموس التي تحتاجها خطوات التطهير والتصغير لتحديد الحقول المستخدمة.

يحتوي كل مُكوّن إضافي في Babel على مساعد خيارات مطابق يقرأ `intlayer.config.ts` الخاص بك مرة واحدة في وقت تحميل الإعدادات ويُرجع قيمًا محلولة مسبقًا:

| مساعد الخيارات (Options helper) | يُستخدم مع                    |
| :------------------------------ | :---------------------------- |
| `getExtractPluginOptions()`     | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()`    | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`       | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`      | `intlayerMinifyBabelPlugin`   |

### إضافات Vite (`vite-intlayer`)

لا يحتاج مستخدمو Vite **مطلقًا لإعداد هذه بشكل مباشر**. يتم ربطها تلقائيًا عند استدعاء `withIntlayer()` في `vite.config.ts`. تقوم الأعلام `build.purge` و `build.minify` في `intlayer.config.ts` بتبديل السلوك المقابل دون أي تسجيل إضافي للإضافات.

| إضافة Vite الداخلية | السلوك المكافئ                                                                                 |
| :------------------ | :--------------------------------------------------------------------------------------------- |
| Usage analyzer      | نفس مسار التحليل في `intlayerPurgeBabelPlugin`                                                 |
| Dictionary prune    | نفس مسار كتابة JSON في `intlayerPurgeBabelPlugin`                                              |
| Dictionary minify   | نفس مسار كتابة JSON في `intlayerMinifyBabelPlugin`                                             |
| Babel transform     | نفس مسار إعادة تسمية كود المصدر لـ `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## الإعداد حسب المنصة

<Tabs>
 <Tab value="nextjs">

### Next.js

يتطلب Next.js إضافة `@intlayer/swc` لخطوة التحسين (إعادة كتابة الاستيراد)، لأن Next.js يستخدم SWC للبناء.

> لا يتم تثبيت هذا المكون الإضافي افتراضيًا لأن مكونات SWC لا تزال تجريبية لـ Next.js. قد يتغير هذا في المستقبل.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

بمجرد التثبيت، سيكتشف Intlayer ويستخدم الإضافة تلقائيًا.

بالنسبة لخطوات **التطهير (purge) والتصغير (minify)** (إزالة الحقول وإعادة تسميتها)، قم بتثبيت `@intlayer/babel` بجانبه وأضف إضافات Babel. نظرًا لأن Next.js يستخدم SWC للتحويل ولكنه لا يزال يقيّم `babel.config.js` لإعدادات الإضافات، يتم تشغيل إضافات Babel كخطوة مسبقة قبل SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: يزيل حقول المحتوى غير المستخدمة من .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: يعيد تسمية مفاتيح حقول المحتوى في ملف JSON + الكود المصدري
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // ملاحظة: intlayerOptimizeBabelPlugin غير مطلوب هنا لأن
    // @intlayer/swc يتعامل مع إعادة كتابة useIntlayer → useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

يستخدم Vite الإضافة `@intlayer/babel`، والتي يتم تضمينها كتبعية لـ `vite-intlayer`. يتم تشغيل خط أنابيب التحسين الكامل - إعادة كتابة الاستيراد والتطهير والتصغير - افتراضيًا ولا يتطلب أي تسجيل إضافي.

قم بتفعيل الـ purge و الـ minify عن طريق ضبط الأعلام المقابلة في `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // يزيل حقول المحتوى غير المستخدمة من ملفات JSON المجمعة
    minify: true, // يعيد تسمية مفاتيح حقول المحتوى إلى أسماء مستعارة قصيرة
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (و Next.js مع Babel)

تثبيت `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

أضف جميع الإضافات الأربعة إلى `babel.config.js` بالترتيب الصحيح:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: يجمّع ملفات .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: يزيل الحقول غير المستخدمة من .intlayer/**/*.json
    //    (يقرأ العلم build.purge من intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: يعيد تسمية مفاتيح الحقول في JSON + الكود المصدري
    //    (يقرأ العلم build.minify من intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: يعيد كتابة useIntlayer('key') → useDictionary(hash)
    //    يجب أن يأتي أخيرًا لأنه يمحو مفتاح القاموس.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## التكوين (Configuration)

يمكنك التحكم في كيفية قيام Intlayer بتحسين حزمتك عبر الخاصية `build` في ملف `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // استبدال استدعاءات useIntlayer() باستيرادات مباشرة للقاموس في وقت البناء.
    // undefined = تلقائي (مُمكّن في الإنتاج), true = دائمًا, false = أبدًا.
    optimize: undefined,

    // إعادة تسمية مفاتيح حقول المحتوى في القواميس المجمعة إلى أسماء مستعارة
    // أبجدية قصيرة (مثل title → a). يقلل من حجم JSON؛ يتطلب optimize.
    minify: true,

    // إزالة حقول المحتوى التي لا يتم الوصول إليها أبدًا في الكود المصدري.
    // يتطلب optimize.
    purge: true,
  },
};

export default config;
```

> يُوصى بالاحتفاظ بالقيمة الافتراضية (`undefined`) للتحسين `optimize` في معظم الحالات.

> راجع مرجع التكوين للحصول على جميع الخيارات: [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

### خيارات البناء (Build Options)

| الخاصية        | النوع                 | الافتراضي   | الوصف                                                                                                                                                                                             |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean / undefined` | `undefined` | يفعّل خطوة إعادة كتابة الاستيراد. `undefined` = نشط فقط في البناء المخصص للإنتاج. `false` يعطل التطهير (purge) والتصغير (minify) أيضًا.                                                           |
| **`minify`**   | `boolean`             | `false`     | يعيد تسمية مفاتيح حقول المحتوى في ملفات JSON المجمعة إلى أسماء مستعارة أبجدية قصيرة. يعيد كتابة وصول الخصائص المطابقة في الكود المصدري أيضًا. لا يكون له تأثير إذا كان الـ `optimize` هو `false`. |
| **`purge`**    | `boolean`             | `false`     | يزيل حقول المحتوى التي لا يتم الوصول إليها بشكل ثابت من ملفات JSON المجمعة. لا يكون له تأثير إذا كان الـ `optimize` هو `false`.                                                                   |

### التصغير (إعادة تسمية مفتاح الحقل)

إن الخاصية `build.minify` **لا** تُصغّر حزمة JavaScript الخاصة بك — يُعالج المُحزم الخاص بك ذلك. وبدلاً من ذلك، فإنها تُقلص ملفات JSON الخاصة بالقاموس المجمع عن طريق استبدال كل مفتاح حقل محتوى محدد من قبل المستخدم باسم مستعار أبجدي قصير:

```
// قبل التصغير
{ "title": "مرحبًا", "subtitle": "بالعالم" }

// بعد التصغير
{ "a": "مرحبًا", "b": "بالعالم" }
```

يتم تطبيق نفس إعادة التسمية على جميع عمليات الوصول إلى الخصائص في كود المصدر الخاص بك، وبالتالي يصبح `content.title` `content.a` في المخرجات المجمعة. ويكون السلوك أثناء وقت التشغيل متطابقًا.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> يتم تخطي التصغير عندما يكون `optimize` في وضع `false` أو عندما يكون `editor.enabled` في وضع `true` (يحتاج المحرر المرئي إلى أسماء الحقول الأصلية للسماح بالتحرير).

> يتم أيضًا تخطي التصغير بالنسبة للقواميس التي تم تحميلها عبر `importMode: 'fetch'` لأن ملف JSON الخاص بهم يُقدّم من واجهة برمجة تطبيقات (API) بعيدة باستخدام أسماء الحقول الأصلية — سيؤدي تغيير أسماء المفاتيح من جانب العميل إلى كسر العقد بين الخادم/العميل.

### التطهير (إزالة الحقول غير المستخدمة)

يحلل `build.purge` حقول المحتوى التي يتم الوصول إليها فعليًا في الكود المصدري الخاص بك ويزيل كل الحقول الأخرى من ملفات JSON المجمعة.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**مثال:** قاموس يحتوي على خمسة حقول يتم استخدام اثنين منها فقط:

```
// قبل التطهير
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// بعد التطهير (تم الوصول إلى title + subtitle فقط في المصدر)
{ "title": "…", "subtitle": "…" }
```

> يتم تخطي التطهير (Purge) عندما يكون `optimize` في وضع `false` أو عندما يكون `editor.enabled` في وضع `true`.

> يتم أيضًا تخطي التطهير كإجراء احترازي عندما يتعذر تحليل ملف المصدر، أو عندما يتم تعيين نتيجة `useIntlayer` لمتغير ويتم تمريرها بطرق لا يستطيع المحلل الثابت تتبعها (مثل وضعها في كائن بطريقة النشر، تمريرها كخاصية بدون تفكيك الهيكل). في تلك الحالات، يتم الاحتفاظ بالقاموس بالكامل.

### وضع الاستيراد (Import Mode)

بالنسبة للتطبيقات الكبيرة، التي تتضمن العديد من الصفحات واللغات، قد يمثل ملف JSON الخاص بك جزءًا كبيرًا من حجم الحزمة. يسمح لك Intlayer بالتحكم في كيفية تحميل القواميس باستخدام خيار `importMode`.

### التعريف العام

يمكن تحديد وضع الاستيراد بشكل عام في ملف `intlayer.config.ts` الخاص بك.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // الافتراضي هو 'static'
  },
};

export default config;
```

### التعريف لكل قاموس

يمكنك تجاوز وضع الاستيراد (import mode) لقواميس فردية في ملفات `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` الخاصة بها.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // تجاوز وضع الاستيراد الافتراضي
  content: {
    // ...
  },
};

export default appContent;
```

| الخاصية          | النوع                              | الافتراضي  | الوصف                                                                                        |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **مُلغى**: استخدم `dictionary.importMode` بدلاً منه. يحدد كيفية تحميل القواميس (انظر أدناه). |

يُحدد إعداد `importMode` كيفية حقن محتوى القاموس في المكون الخاص بك. يمكنك تعريفه بشكل عام في `intlayer.config.ts` تحت كائن `dictionary`، أو تجاوزه لكل قاموس على حدة في ملف `.content.ts` الخاص به.

### 1. الوضع الثابت (Static Mode - `default`)

في الوضع الثابت، يستبدل Intlayer استدعاء `useIntlayer` بـ `useDictionary` ويحقن القاموس مباشرة في حزمة JavaScript.

- **المميزات:** تقديم فوري (متزامن)، بدون طلبات شبكة إضافية أثناء مرحلة الإماهة (hydration).
- **العيوب:** تتضمن الحزمة ترجمات لـ **جميع** اللغات المتاحة لذلك المكون المحدد.
- **الأفضل لـ:** تطبيقات الصفحة الواحدة (SPA).

**مثال على الكود المحول:**

```tsx
// الكود الخاص بك
const content = useIntlayer("my-key");

// رسم توضيحي للكود المحسن بعد التحويل (الوضع الثابت)
// هذا لأغراض التوضيح فقط، سيكون الكود الفعلي مختلفًا لأسباب التحسين
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      ar: "عنواني",
    },
  },
});
```

### 2. الوضع الديناميكي (Dynamic Mode)

في الوضع الديناميكي، يستبدل Intlayer الـ `useIntlayer` بـ `useDictionaryAsync`. يستخدم هذا الـ `import()` (آلية تشبه الـ Suspense) لتحميل ملف JSON للغة الحالية خصيصًا بكسل.

- **المميزات:** **هز الشجرة على مستوى اللغة (Locale-level tree shaking).** سيقوم المستخدم الذي يشاهد النسخة الإنجليزية بتنزيل القاموس الإنجليزي _فقط_. لن يتم تحميل القاموس العربي أبدًا.
- **العيوب:** يطلق طلب شبكة (إحضار أصول) لكل مكون أثناء الإماهة (hydration).
- **الأفضل لـ:** كتل النصوص الكبيرة، أو المقالات، أو التطبيقات التي تدعم لغات متعددة حيث يكون حجم الحزمة أمرًا بالغ الأهمية.

**مثال على الكود المحول:**

```tsx
// الكود الخاص بك
const content = useIntlayer("my-key");

// رسم توضيحي للكود المحسن بعد التحويل (الوضع الديناميكي)
// هذا لأغراض التوضيح فقط، سيكون الكود الفعلي مختلفًا لأسباب التحسين
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  ar: () =>
    import(".intlayer/dynamic_dictionary/my-key/ar.json").then(
      (mod) => mod.default
    ),
});
```

> عند استخدام `importMode: 'dynamic'`، إذا كان لديك 100 مكون تستخدم `useIntlayer` على صفحة واحدة، سيحاول المتصفح القيام بـ 100 عملية جلب (fetch) منفصلة. لتجنب "شلال" الطلبات هذا، قم بتجميع المحتوى في ملفات `.content` أقل (على سبيل المثال، قاموس واحد لكل قسم في الصفحة) بدلاً من واحد لكل مكون دقيق (atom component). يمكنك أيضًا استخدام ملفات `.content` متعددة تستخدم نفس المفتاح. وسيقوم Intlayer بدمجها في قاموس واحد.

### 3. وضع الجلب (Fetch Mode)

يتصرف بشكل مشابه للوضع الديناميكي ولكنه يحاول جلب القواميس من Intlayer Live Sync API أولاً. إذا فشل استدعاء API أو لم يتم تمييز المحتوى للتحديثات المباشرة، فإنه يتراجع ليعمل باستخدام الاستيراد الديناميكي (dynamic import).

**مثال على الكود المحول:**

```tsx
// الكود الخاص بك
const content = useIntlayer("my-key");

// رسم توضيحي للكود المحسن (وضع الجلب)
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  ar: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/ar").then((res) =>
      res.json()
    ),
});
```

> راجع وثائق نظام إدارة المحتوى (CMS) لمزيد من التفاصيل: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

> في وضع الجلب (fetch)، لا يتم تطبيق التطهير (purge) والتصغير (minification) لأن ملف JSON يتم تقديمه من API بعيدة باستخدام أسماء الحقول الأصلية.

## ملخص: الثابت مقابل الديناميكي

| الميزة                       | الوضع الثابت (Static Mode)                    | الوضع الديناميكي (Dynamic Mode)              |
| :--------------------------- | :-------------------------------------------- | :------------------------------------------- |
| **حجم حزمة JS**              | أكبر (يتضمن جميع اللغات للمكون)               | أصغر (كود فقط، بدون محتوى)                   |
| **التحميل الأولي**           | فوري (المحتوى موجود في الحزمة)                | تأخير طفيف (يجلب الـ JSON)                   |
| **طلبات الشبكة**             | 0 طلبات إضافية                                | طلب واحد لكل مفتاح قاموس                     |
| **هز الشجرة (Tree Shaking)** | على مستوى المكون                              | على مستوى المكون + مستوى اللغة               |
| **أفضل حالة استخدام**        | مكونات واجهة المستخدم (UI)، التطبيقات الصغيرة | الصفحات ذات النصوص الكثيرة، العديد من اللغات |
