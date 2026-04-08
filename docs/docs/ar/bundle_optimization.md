---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: تحسين حجم وأداء حزمة i18n
description: تقليل حجم حزمة التطبيق من خلال تحسين محتوى التدويل (i18n). تعلّم كيفية الاستفادة من tree shaking والتحميل الكسول للقواميس باستخدام Intlayer.
keywords:
  - تحسين الحزمة
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "إضافة خيارات `minify` و `purge` إلى تكوين البناء"
---

# تحسين حجم وأداء حزمة i18n

واحدة من أكثر التحديات شيوعًا مع حلول i18n التقليدية التي تعتمد على ملفات JSON هي إدارة حجم المحتوى. إذا لم يقم المطورون بفصل المحتوى يدويًا إلى مساحات أسماء، غالبًا ما ينتهي الأمر بالمستخدمين إلى تنزيل ترجمات لكل صفحة وربما لكل لغة لمجرد عرض صفحة واحدة.

على سبيل المثال، قد يؤدي تطبيق يحتوي على 10 صفحات مترجمة إلى 10 لغات إلى قيام المستخدم بتنزيل محتوى 100 صفحة، على الرغم من حاجته إلى **صفحة واحدة** فقط (الصفحة الحالية باللغة الحالية). هذا يؤدي إلى هدر في عرض النطاق الترددي وبطء في أوقات التحميل.

**تحل Intlayer هذه المشكلة من خلال تحسين وقت البناء.** تقوم بتحليل الكود الخاص بك لاكتشاف القواميس المستخدمة فعليًا لكل مكون وتعيد حقن المحتوى الضروري فقط في الحزمة الخاصة بك.

## جدول المحتويات

<TOC />

## فحص حزمتك

يعد تحليل حزمتك الخطوة الأولى في تحديد ملفات JSON "الثقيلة" وفرص تقسيم الكود. تولد هذه الأدوات خريطة شجرية (treemap) مرئية للكود المجمع لتطبيقك، مما يسمح لك برؤية أي المكتبات تستهلك أكبر مساحة.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

يستخدم Vite مكتبة Rollup في الخلفية. تولد إضافة `rollup-plugin-visualizer` ملف HTML تفاعلي يوضح حجم كل وحدة في الرسم البياني الخاص بك.

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

للمشاريع التي تستخدم App Router و Turbopack، يوفر Next.js محللاً تجريبيًا مدمجاً لا يتطلب أي تبعات إضافية.

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

إذا كنت تستخدم مجمع Webpack الافتراضي في Next.js، فاستخدم محلل الحزمة الرسمي. قم بتفعيله عن طريق تعيين متغير بيئة أثناء البناء.

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
  // تكوين Next.js الخاص بك
});
```

**الاستخدام:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack القياسي

بالنسبة لـ Create React App (ejected)، أو Angular، أو إعدادات Webpack المخصصة، استخدم `webpack-bundle-analyzer` القياسي في الصناعة.

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

## كيف تعمل

تستخدم Intlayer **نهجًا لكل مكون**. على عكس ملفات JSON العالمية، يتم تعريف المحتوى الخاص بك بجانب مكوناتك أو داخلها. خلال عملية البناء، تقوم Intlayer بـ:

1.  **تحليل** الكود الخاص بك للعثور على استدعاءات `useIntlayer`.
2.  **بناء** محتوى القاموس المقابل.
3.  **استبدال** استدعاء `useIntlayer` بكود محسن بناءً على تكوينك.

هذا يضمن أن:

- إذا لم يتم استيراد مكون، فلن يتم تضمين محتواه في الحزمة (إزالة الكود الميت).
- إذا تم تحميل مكون بشكل كسول، فسيتم أيضًا تحميل محتواه بشكل كسول.

## الإعداد حسب المنصة

<Tabs>
 <Tab value="nextjs">

### Next.js

يتطلب Next.js إضافة `@intlayer/swc` للتعامل مع التحويل، حيث يستخدم Next.js SWC في عمليات البناء.

> هذه الإضافة ليست مثبتة افتراضيًا لأن إضافات SWC لا تزال تجريبية لـ Next.js. قد يتغير ذلك في المستقبل.

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

بمجرد التثبيت، سيتعرف Intlayer تلقائيًا على الإضافة ويستخدمها.

 </Tab>
 <Tab value="vite">

### Vite

يستخدم Vite إضافة `@intlayer/babel` التي تدرج كاعتماد ضمن `vite-intlayer`. يتم تمكين التحسين بشكل افتراضي. لا يلزم القيام بأي شيء آخر.

 </Tab>
 <Tab value="webpack">

### Webpack

لتمكين تحسين الحزمة مع Intlayer على Webpack، تحتاج إلى تثبيت وتكوين إضافة Babel المناسبة (`@intlayer/babel`) أو SWC (`@intlayer/swc`).

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

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## التكوين

يمكنك التحكم في كيفية تحسين Intlayer لحزمتك عبر خاصية `build` في ملف `intlayer.config.ts` الخاص بك.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * تصغير القواميس لتقليل حجم الحزمة.
     */
     minify: true;

    /**
     * تطهير المفاتيح غير المستخدمة في القواميس
     */
     purge: true;

    /**
     * يشير إلى ما إذا كان يجب على البناء التحقق من أنواع TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> يُنصح بالاحتفاظ بالخيار الافتراضي لـ `optimize` في معظم الحالات.

> راجع توثيق التكوين لمزيد من التفاصيل: [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

### خيارات البناء

الخيارات التالية متاحة ضمن كائن تكوين `build`:

| الخاصية        | النوع     | القيمة الافتراضية | الوصف                                                                                                                                                                                                              |
| :------------- | :-------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined`       | يتحكم فيما إذا كان تفعيل تحسين البناء ممكّنًا. إذا كانت القيمة `true`، يقوم Intlayer باستبدال استدعاءات القاموس بحقنات محسّنة. إذا كانت `false`، يتم تعطيل التحسين. من المثالي تعيينها إلى `true` في بيئة الإنتاج. |
| **`minify`**   | `boolean` | `false`           | ما إذا كان سيتم تصغير القواميس لتقليل حجم الحزمة.                                                                                                                                                                  |
| **`purge`**    | `boolean` | `false`           | ما إذا كان سيتم تطهير المفاتيح غير المستخدمة في القواميس.                                                                                                                                                          |

### التصغير (Minification)

يؤدي تصغير القواميس إلى إزالة المسافات البيضاء والتعليقات غير الضرورية وتقليل حجم محتوى JSON. هذا مفيد بشكل خاص للقواميس الكبيرة.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> ملاحظة: يتم تجاهل التصغير إذا تم تعطيل `optimize` أو إذا تم تمكين المحرر المرئي (Visual Editor) (لأن المحرر يحتاج إلى المحتوى الكامل للسماح بالتحرير).

### التطهير (Purging)

يضمن التطهير تضمين المفاتيح المستخدمة فعليًا في الكود الخاص بك فقط في حزمة القاموس النهائية. يمكن أن يقلل هذا بشكل كبير من حجم الحزمة الخاصة بك إذا كان لديك قواميس كبيرة تحتوي على العديد من المفاتيح التي لا تُستخدم في كل جزء من تطبيقك.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> ملاحظة: يتم تجاهل التطهير إذا تم تعطيل `optimize`.

### وضع الاستيراد (Import Mode)

بالنسبة للتطبيقات الكبيرة، التي تتضمن عدة صفحات ولغات، يمكن لملفات JSON أن تمثل جزءًا كبيرًا من حجم الحزمة. يسمح لك Intlayer بالتحكم في كيفية تحميل القواميس.

يمكن تعريف وضع الاستيراد افتراضيًا بشكل عالمي في ملف `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

وكذلك لكل قاموس في ملفات `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` الخاصة بك.

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

| الخاصية          | النوع                              | القيمة الافتراضية | الوصف                                                                                                          |
| :--------------- | :--------------------------------- | :---------------- | :------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`        | **برجاء استبداله:** استخدم `dictionary.importMode` بدلاً منه. يحدد كيفية تحميل القواميس (انظر التفاصيل أدناه). |

تحدد إعدادات `importMode` كيفية حقن محتوى القاموس في مكونك.
يمكنك تعريفه عالميًا في ملف `intlayer.config.ts` تحت كائن `dictionary` أو تجاوزه لقاموس معين في ملف `.content.ts` الخاص به.

### 1. الوضع الثابت (`default`)

في الوضع الثابت، يقوم Intlayer باستبدال `useIntlayer` بـ `useDictionary` ويحقن القاموس مباشرة في حزمة جافا سكريبت.

- **الإيجابيات:** عرض فوري (متزامن)، بدون طلبات شبكة إضافية أثناء التهيئة.
- **السلبيات:** الحزمة تتضمن ترجمات **لكل** اللغات المتاحة لذلك المكون المحدد.
- **الأفضل لـ:** تطبيقات الصفحة الواحدة (SPA).

**مثال على الكود المحول:**

```tsx
// كودك
const content = useIntlayer("my-key");

// الكود المحسن (الوضع الثابت)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. الوضع الديناميكي

في الوضع الديناميكي، يستبدل Intlayer الدالة `useIntlayer` بـ `useDictionaryAsync`. تستخدم هذه الدالة `import()` (آلية تشبه Suspense) لتحميل ملف JSON الخاص باللغة الحالية بشكل كسول.

- **الإيجابيات:** **تحسين على مستوى اللغة (Locale-level tree shaking).** المستخدم الذي يعرض النسخة الإنجليزية سيقوم بتحميل قاموس اللغة الإنجليزية فقط. قاموس اللغة الفرنسية لن يتم تحميله أبدًا.
- **السلبيات:** يؤدي إلى طلب شبكة (جلب الأصول) لكل مكون أثناء عملية التهيئة (hydration).
- **الأفضل لـ:** كتل نصية كبيرة، مقالات، أو تطبيقات تدعم العديد من اللغات حيث يكون حجم الحزمة أمرًا حاسمًا.

**مثال على الكود المحول:**

```tsx
// كودك
const content = useIntlayer("my-key");

// الكود المحسن (الديناميكي)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> عند استخدام `importMode: 'dynamic'`، إذا كان لديك 100 مكون يستخدم `useIntlayer` في صفحة واحدة، سيحاول المتصفح إجراء 100 طلب تحميل منفصل. لتجنب هذا "تسلسل" الطلبات، قم بتجميع المحتوى في عدد أقل من ملفات `.content` (مثل قاموس واحد لكل قسم من الصفحة) بدلاً من واحد لكل مكون ذرة.

### 3. وضع الجلب (Fetch Mode)

يتصرف بشكل مشابه للوضع الديناميكي لكنه يحاول أولاً جلب القواميس من واجهة برمجة تطبيقات المزامنة الحية Intlayer Live Sync API. إذا فشل استدعاء API أو لم يكن المحتوى معلمًا للتحديثات الحية، فإنه يعود إلى الاستيراد الديناميكي.

> راجع توثيق CMS لمزيد من التفاصيل: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

> في وضع الجلب، لا يمكن استخدام التطهير والتصغير.

## الملخص: الوضع الثابت مقابل الوضع الديناميكي

| الميزة                   | الوضع الثابت                             | الوضع الديناميكي                                    |
| :----------------------- | :--------------------------------------- | :-------------------------------------------------- |
| **حجم حزمة جافا سكريبت** | أكبر (يشمل جميع اللغات للمكون)           | الأصغر (كود فقط، بدون محتوى)                        |
| **التحميل الأولي**       | فوري (المحتوى موجود في الحزمة)           | تأخير بسيط (يجلب JSON)                              |
| **طلبات الشبكة**         | 0 طلبات إضافية                           | طلب واحد لكل قاموس                                  |
| **Tree Shaking**         | على مستوى المكون                         | على مستوى المكون + مستوى اللغة                      |
| **أفضل استخدام**         | مكونات واجهة المستخدم، التطبيقات الصغيرة | الصفحات التي تحتوي على نصوص كثيرة، العديد من اللغات |
