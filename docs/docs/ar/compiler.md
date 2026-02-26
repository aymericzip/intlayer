---
createdAt: 2025-09-09
updatedAt: 2026-02-25
title: مترجم Intlayer | استخراج المحتوى الآلي للتدويل
description: قم بأتمتة عملية التدويل الخاصة بك باستخدام مترجم Intlayer. استخرج المحتوى مباشرة من مكوناتك لتحقيق تدويل أسرع وأكثر كفاءة في Vite و Next.js والمزيد.
keywords:
  - Intlayer
  - مترجم
  - التدويل
  - i18n
  - الأتمتة
  - الاستخراج
  - السرعة
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: تحديث خيارات المترجم
  - version: 7.3.1
    date: 2025-11-27
    changes: إصدار المترجم
---

# مترجم Intlayer | استخراج المحتوى الآلي للتدويل

## ما هو مترجم Intlayer؟

يعد **مترجم Intlayer** أداة قوية مصممة لأتمتة عملية التدويل (i18n) في تطبيقاتك. يقوم بفحص شفرة المصدر الخاصة بك (JSX، TSX، Vue، Svelte) بحثًا عن إعلانات المحتوى، ويستخرجها، ويولد تلقائيًا ملفات القاموس اللازمة. يتيح لك هذا الاحتفاظ بالمحتوى بجانب مكوناتك بينما يتولى Intlayer إدارة ومزامنة قواميسك.

## لماذا تستخدم مترجم Intlayer؟

- **الأتمتة**: يلغي النسخ واللصق اليدوي للمحتوى في القواميس.
- **السرعة**: استخراج المحتوى بشكل محسن لضمان بقاء عملية البناء سريعة.
- **تجربة المطور**: احتفظ بإعلانات المحتوى في المكان الذي تُستخدم فيه، مما يحسن من سهولة الصيانة.
- **التحديثات الحية**: يدعم استبدال الوحدات الساخنة (HMR) لتلقي ردود فعل فورية أثناء التطوير.

راجع منشور المدونة [المترجم مقابل i18n التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md) لمقارنة أعمق.

## لماذا لا تستخدم مترجم Intlayer؟

بينما يوفر المترجم تجربة ممتازة "تعمل مباشرة"، فإنه يقدم أيضًا بعض المقايضات التي يجب أن تكون على دراية بها:

- **الغموض الاستدلالي**: يجب على المترجم تخمين ما هو المحتوى الموجه للمستخدم مقابل منطق التطبيق (على سبيل المثال، `className="active"`، رموز الحالة، معرفات المنتجات). في قواعد التعليمات البرمجية المعقدة، يمكن أن يؤدي هذا إلى إيجابيات خاطئة أو سلاسل مفقودة تتطلب تعليقات يدوية واستثناءات.
- **الاستخراج الثابت فقط**: يعتمد الاستخراج القائم على المترجم على التحليل الثابت. لا يمكن اكتشاف السلاسل التي توجد فقط في وقت التشغيل (رموز أخطاء API، حقول CMS، إلخ) أو ترجمتها بواسطة المترجم وحده، لذلك لا يزال لديك حاجة إلى استراتيجية i18n وقت التشغيل التكميلية.

لمقارنة معمارية أعمق، راجع منشور المدونة [المترجم مقابل i18n التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md).

كبديل، لأتمتة عملية i18n الخاصة بك مع الحفاظ على السيطرة الكاملة على المحتوى الخاص بك، يوفر Intlayer أيضًا أمر الاستخراج التلقائي `intlayer extract` (راجع [وثائق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md))، أو أمر `Intlayer: extract content to Dictionary` من امتداد Intlayer VS Code (راجع [وثائق امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)).

## الاستخدام

<Tabs>
 <Tab value='vite'>

### Vite

بالنسبة للتطبيقات المبنية على Vite (React، Vue، Svelte، إلخ)، أسهل طريقة لاستخدام المترجم هي من خلال إضافة `vite-intlayer`.

#### التثبيت

```bash
npm install vite-intlayer
```

#### التهيئة

قم بتحديث ملف `vite.config.ts` ليشمل إضافة `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // يضيف إضافة المترجم
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### دعم الأُطُر

تقوم إضافة Vite بالكشف التلقائي والتعامل مع أنواع الملفات المختلفة:

- **React / JSX / TSX**: يتم التعامل معها بشكل أصلي.
- **Vue**: يتطلب `@intlayer/vue-compiler`.
- **Svelte**: يتطلب `@intlayer/svelte-compiler`.

تأكد من تثبيت حزمة المترجم المناسبة لإطار العمل الخاص بك:

```bash
# لـ Vue
npm install @intlayer/vue-compiler

# لـ Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

بالنسبة لتطبيقات Next.js أو التطبيقات الأخرى المبنية على Webpack والتي تستخدم Babel، يمكنك تكوين المترجم باستخدام إضافة `@intlayer/babel`.

#### التثبيت

```bash
npm install @intlayer/babel
```

#### التهيئة

قم بتحديث ملف `babel.config.js` (أو `babel.config.json`) ليشمل إضافة الاستخراج. نحن نوفر مساعدًا `getExtractPluginOptions` لتحميل تكوين Intlayer الخاص بك تلقائيًا.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

يضمن هذا التكوين استخراج المحتوى المعلن في مكوناتك تلقائيًا واستخدامه لتوليد القواميس أثناء عملية البناء.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>

### التكوين المخصص

لتخصيص سلوك المترجم، يمكنك تحديث ملف `intlayer.config.ts` في جذر مشروعك.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * يشير إلى ما إذا كان يجب تمكين المترجم.
     * اضبطه على 'build-only' لتخطي المترجم أثناء التطوير وتسريع أوقات البدء.
     */
    enabled: true,

    /**
     * نمط لاجتياز الكود المراد تحسينه.
     */
    transformPattern: [
      "**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}",
      "!**/node_modules/**",
    ],

    /**
     * نمط للاستبعاد من التحسين.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * دليل الإخراج للقواميس المحسنة.
     */
    outputDir: "i18n",

    /**
     * بادئة مفتاح القاموس
     */
    dictionaryKeyPrefix: "", // إزالة بادئة القاعدة

    /**
     * يشير إلى ما إذا كان يجب حفظ المكونات بعد تحويلها.
     * بهذه الطريقة، يمكن تشغيل المترجم مرة واحدة فقط لتحويل التطبيق، ثم يمكن إزالته.
     */
    saveComponents: false,
  },
};

export default config;
```

### ملء الترجمات المفقودة

يوفر Intlayer أداة CLI لمساعدتك في ملء الترجمات المفقودة. يمكنك استخدام أمر `intlayer` لاختبار وملء الترجمات المفقودة من الكود الخاص بك.

```bash
npx intlayer test         # اختبار ما إذا كانت هناك ترجمات مفقودة
```

```bash
npx intlayer fill         # ملء الترجمات المفقودة
```

> لمزيد من التفاصيل، راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/ci.md)
