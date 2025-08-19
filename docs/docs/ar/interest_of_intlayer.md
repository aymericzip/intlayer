---
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: أهمية Intlayer
description: اكتشف فوائد ومزايا استخدام Intlayer في مشاريعك. افهم لماذا يتميز Intlayer بين الأُطُر الأخرى.
keywords:
  - الفوائد
  - المزايا
  - Intlayer
  - إطار العمل
  - المقارنة
slugs:
  - doc
  - why
---

# لماذا يجب أن تفكر في استخدام Intlayer؟

## ما هو Intlayer؟

**Intlayer** هو مكتبة تعريب مصممة خصيصًا لمطوري جافاسكريبت. يسمح لك بالإعلان عن محتواك في كل مكان داخل كودك. يقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منظمة لتسهيل دمجها في كودك. باستخدام TypeScript، يجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

## السبب في إنشاء Intlayer؟

تم إنشاء Intlayer لحل مشكلة شائعة تواجه جميع مكتبات i18n الشائعة مثل `next-intl`، `react-i18next`، `react-intl`، `next-i18next`، `react-intl`، و `vue-i18n`.

تعتمد كل هذه الحلول على طريقة مركزية لقائمة وإدارة المحتوى الخاص بك. على سبيل المثال:

```bash
.
├── locales
│   └── en.json
│   └── fr.json
│   └── es.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            ├── index.content.ts
            └── index.tsx
```

أو هنا باستخدام المساحات الاسمية (namespaces):

```bash
.
├── locales
│   ├── en
│   │  └── navbar.json
│   │  └── footer.json
│   ├── fr
│   │  └── navbar.json
│   │  └── footer.json
│   └── es
│      └── navbar.json
│      └── footer.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            ├── index.content.ts
            └── index.tsx
```

هذا النوع من البنية يبطئ عملية التطوير ويجعل قاعدة الشيفرة أكثر تعقيدًا للصيانة لأسباب عدة:

- لأي مكون جديد يتم إنشاؤه يجب عليك
  - إنشاء المورد / المساحة الاسمية الجديدة في مجلد `locales`
  - التفكير في استيراد المساحة الاسمية الجديدة في صفحتك
  - ترجمة المحتوى الخاص بك (غالبًا ما يتم يدويًا عن طريق النسخ/اللصق من مزود الذكاء الاصطناعي)
- لأي تغيير يتم على مكوناتك، يجب عليك
  - البحث عن المورد / المساحة الاسمية ذات الصلة (بعيدًا عن المكون)
  - ترجمة المحتوى الخاص بك
  - التأكد من تحديث المحتوى الخاص بك لكل لغة
  - التأكد من أن المساحة الاسمية لا تحتوي على مفاتيح/قيم غير مستخدمة
  - أن تكون بنية ملف JSON متشابهة لجميع اللغات

في المشاريع الاحترافية التي تستخدم هذه الحلول، غالبًا ما تُستخدم منصات الترجمة للمساعدة في إدارة ترجمة المحتوى الخاص بك. ولكن يمكن أن تصبح مكلفة بسرعة في المشاريع الكبيرة.

لحل هذه المشكلة، تعتمد Intlayer نهجًا يأخذ في الاعتبار تحديد نطاق المحتوى الخاص بك لكل مكون، والحفاظ على المحتوى قريبًا من المكون الخاص بك، كما نفعل غالبًا مع CSS (`styled-components`)، الوثائق (`storybook`)، أو اختبارات الوحدة (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// محتوى مثال المكون مع الترجمات
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// محتوى مثال المكون مع الترجمات
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// محتوى مثال المكون مع الترجمات
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

// مكون مثال يستخدم المحتوى المترجم
export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// مكون مثال يستخدم المحتوى المترجم
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
// استيراد useIntlayer باستخدام commonjs
const { useIntlayer } = require("react-intlayer");

// مكون مثال يستخدم المحتوى المترجم
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

تسمح هذه الطريقة بـ:

- زيادة سرعة التطوير
  - يمكن إنشاء ملفات `.content` باستخدام إضافة VSCode
  - يمكن لأدوات الإكمال التلقائي المعتمدة على الذكاء الاصطناعي في بيئة التطوير الخاصة بك (مثل GitHub Copilot) مساعدتك في إعلان المحتوى، مما يقلل من النسخ/اللصق
- تقليل تعقيد قاعدة الشيفرة الخاصة بك
- زيادة قابلية صيانة قاعدة الشيفرة الخاصة بك
- تكرار مكوناتك والمحتوى المرتبط بها بسهولة أكبر (مثال: مكونات تسجيل الدخول / التسجيل، إلخ)
  - عن طريق الحد من خطر التأثير على محتوى المكونات الأخرى
  - عن طريق نسخ/لصق المحتوى الخاص بك من تطبيق إلى آخر بدون تبعيات خارجية
- تجنب تلوث قاعدة الشيفرة الخاصة بك بمفاتيح/قيم غير مستخدمة لمكونات غير مستخدمة
  - إذا لم تستخدم مكونًا، فلست بحاجة إلى استيراد محتواه
  - إذا حذفت مكونًا، سيكون من الأسهل التفكير في إزالة المحتوى المرتبط به لأنه سيكون موجودًا في نفس المجلد
- تقليل تكلفة التفكير لوكلاء الذكاء الاصطناعي لإعلان المحتوى متعدد اللغات الخاص بك
  - لن يضطر وكيل الذكاء الاصطناعي إلى سرد كل قاعدة الشيفرة الخاصة بك لمعرفة مكان تنفيذ المحتوى الخاص بك
  - يمكن إجراء الترجمات بسهولة بواسطة أدوات الذكاء الاصطناعي للإكمال التلقائي في بيئة التطوير المتكاملة الخاصة بك (مثل GitHub Copilot)
- تحسين أداء التحميل
  - إذا تم تحميل مكون بشكل كسول، فسيتم تحميل المحتوى المرتبط به في نفس الوقت

## الميزات الإضافية لـ Intlayer

| الميزة                                                                                                                 | الوصف                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **دعم عبر الأُطُر المختلفة**<br><br>يتوافق Intlayer مع جميع الأُطُر والمكتبات الرئيسية، بما في ذلك Next.js و React و Vite و Vue.js و Nuxt و Preact و Express والمزيد.                                                                                                                                                                                                                                                                        |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true)       | **إدارة المحتوى بواسطة جافاسكريبت**<br><br>استفد من مرونة جافاسكريبت لتعريف وإدارة المحتوى الخاص بك بكفاءة. <br><br> - [إعلان المحتوى](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                             |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ملف إعلان المحتوى لكل لغة**<br><br>سرّع تطويرك من خلال إعلان محتواك مرة واحدة، قبل التوليد التلقائي.<br><br> - [ملف إعلان المحتوى لكل لغة](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                               |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **بيئة آمنة من حيث النوع**<br><br>استفد من TypeScript لضمان أن تعريفات المحتوى والرمز الخاص بك خالية من الأخطاء، مع الاستفادة أيضًا من الإكمال التلقائي في بيئة التطوير المتكاملة (IDE).<br><br> - [تكوين TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                              |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **إعداد مبسط**<br><br>ابدأ بسرعة مع أقل قدر من التهيئة. قم بضبط الإعدادات الخاصة بالتدويل، التوجيه، الذكاء الاصطناعي، البناء، وإدارة المحتوى بسهولة.<br><br> - [استكشاف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                          |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **استرجاع المحتوى المبسط**<br><br>لا حاجة لاستدعاء دالة `t` لكل قطعة محتوى. استرجع كل محتواك مباشرة باستخدام هوك واحد.<br><br> - [تكامل React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                                        |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **تنفيذ متسق لمكونات الخادم**<br><br>مناسب تمامًا لمكونات الخادم في Next.js، استخدم نفس التنفيذ لكل من مكونات العميل والخادم، لا حاجة لتمرير دالة `t` الخاصة بك عبر كل مكون خادم. <br><br> - [مكونات الخادم](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                                |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **قاعدة شفرة منظمة**<br><br>حافظ على تنظيم قاعدة الشفرة الخاصة بك بشكل أفضل: مكون واحد = قاموس واحد في نفس المجلد. الترجمات قريبة من مكوناتها الخاصة، مما يعزز سهولة الصيانة والوضوح. <br><br> - [كيف يعمل Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                    |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **توجيه محسّن**<br><br>دعم كامل لتوجيه التطبيقات، يتكيف بسلاسة مع هياكل التطبيقات المعقدة، لـ Next.js و React و Vite و Vue.js، وغيرها.<br><br> - [استكشاف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                        |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **دعم Markdown**<br><br>استيراد وتفسير ملفات اللغة وملفات Markdown البعيدة للمحتوى متعدد اللغات مثل سياسات الخصوصية، الوثائق، وغيرها. تفسير وجعل بيانات التعريف الخاصة بـ Markdown متاحة في كودك.<br><br> - [ملفات المحتوى](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                    | **محرر بصري مجاني ونظام إدارة محتوى**<br><br>يتوفر محرر بصري مجاني ونظام إدارة محتوى لكتاب المحتوى، مما يلغي الحاجة إلى منصة تعريب. حافظ على تزامن محتواك باستخدام Git، أو قم بتفريغه كليًا أو جزئيًا باستخدام نظام إدارة المحتوى.<br><br> - [محرر Intlayer](https://intlayer.org/doc/concept/editor) <br> - [نظام إدارة محتوى Intlayer](https://intlayer.org/doc/concept/cms)                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                           | **محتوى قابل للتقليل حسب الاستخدام (Tree-shakable Content)**<br><br>محتوى قابل للتقليل حسب الاستخدام، مما يقلل من حجم الحزمة النهائية. يقوم بتحميل المحتوى لكل مكون على حدة، مستثنيًا أي محتوى غير مستخدم من الحزمة الخاصة بك. يدعم التحميل الكسول لتحسين كفاءة تحميل التطبيق.<br><br> - [تحسين بناء التطبيق](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                    |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **العرض الثابت**<br><br>لا يعيق العرض الثابت.<br><br> - [تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                   | **الترجمة المدعومة بالذكاء الاصطناعي**<br><br>حوّل موقعك الإلكتروني إلى 231 لغة بنقرة واحدة فقط باستخدام أدوات الترجمة المتقدمة المدعومة بالذكاء الاصطناعي من Intlayer والتي تستخدم مزود الذكاء الاصطناعي / مفتاح API الخاص بك. <br><br> - [تكامل CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [واجهة سطر أوامر Intlayer](https://intlayer.org/doc/concept/cli) <br> - [الملء التلقائي](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                              | **تكامل خادم MCP**<br><br>يوفر خادم MCP (بروتوكول سياق النموذج) لأتمتة بيئة التطوير المتكاملة (IDE)، مما يتيح إدارة المحتوى وسير العمل الدولي (i18n) بسلاسة مباشرة داخل بيئة التطوير الخاصة بك. <br><br> - [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)                                                                                                                                           |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **امتداد VSCode**<br><br>يوفر Intlayer امتدادًا لـ VSCode لمساعدتك في إدارة المحتوى والترجمات الخاصة بك، وبناء قواميسك، وترجمة المحتوى الخاص بك، والمزيد.<br><br> - [امتداد VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                              |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **التشغيل البيني**<br><br>يسمح بالتشغيل البيني مع react-i18next و next-i18next و next-intl و react-intl. <br><br> - [Intlayer و react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer و next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer و next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                                      |

## مقارنة Intlayer مع الحلول الأخرى

| الميزة                                             | Intlayer                                                                                                                      | React-i18next / i18next                                                       | React-Intl (FormatJS)                  | LinguiJS                              | next-intl                             | next-i18next                          | vue-i18n                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------------------------ |
| الترجمات بالقرب من المكونات                        | نعم، المحتوى موضوع بجانب كل مكون                                                                                              | لا                                                                            | لا                                     | لا                                    | لا                                    | لا                                    | نعم - باستخدام `مكونات الملف الواحد` (SFCs)            |
| تكامل TypeScript                                   | متقدم، أنواع صارمة مولدة تلقائيًا                                                                                             | أساسي؛ إعداد إضافي للسلامة                                                    | جيد، لكنه أقل صرامة                    | تعريفات الأنواع، يحتاج إعداد          | جيد                                   | أساسي                                 | جيد (الأنواع متوفرة؛ يحتاج إعداد لأمان المفاتيح)       |
| اكتشاف الترجمات المفقودة                           | خطأ/تحذير أثناء وقت البناء                                                                                                    | في الغالب سلاسل بديلة أثناء وقت التشغيل                                       | سلاسل بديلة                            | يحتاج إلى إعداد إضافي                 | سلاسل بديلة أثناء وقت التشغيل         | سلاسل بديلة أثناء وقت التشغيل         | سلاسل بديلة أثناء وقت التشغيل/تحذيرات (قابلة للتكوين)  |
| المحتوى الغني (JSX/Markdown/المكونات)              | دعم مباشر، حتى لعقد React                                                                                                     | محدود / فقط التداخل                                                           | صيغة ICU، ليست JSX حقيقية              | محدود                                 | غير مصمم للعقد الغنية                 | محدود                                 | محدود (المكونات عبر `<i18n-t>`, Markdown عبر الإضافات) |
| الترجمة المدعومة بالذكاء الاصطناعي                 | نعم، تدعم عدة مزودي خدمات ذكاء اصطناعي. يمكن استخدامها باستخدام مفاتيح API الخاصة بك. ضع في اعتبارك سياق تطبيقك ونطاق المحتوى | لا                                                                            | لا                                     | لا                                    | لا                                    | لا                                    | لا                                                     |
| المحرر المرئي                                      | نعم، محرر مرئي محلي + نظام إدارة محتوى اختياري؛ يمكنه إخراج محتوى قاعدة الشيفرة؛ قابل للتضمين                                 | لا / متوفر عبر منصات الترجمة الخارجية                                         | لا / متوفر عبر منصات الترجمة الخارجية  | لا / متوفر عبر منصات الترجمة الخارجية | لا / متوفر عبر منصات الترجمة الخارجية | لا / متوفر عبر منصات الترجمة الخارجية | لا / متوفر عبر منصات الترجمة الخارجية                  |
| التوجيه المحلي                                     | مدمج، مع دعم للوسيط                                                                                                           | إضافات أو إعداد يدوي                                                          | غير مدمج                               | إعداد يدوي/إضافة                      | مدمج                                  | مدمج                                  | يدوي عبر Vue Router (يتولى Nuxt i18n التعامل معه)      |
| إنشاء المسارات الديناميكية                         | نعم                                                                                                                           | مكون إضافي/نظام بيئي أو إعداد يدوي                                            | غير متوفر                              | مكون إضافي/يدوي                       | نعم                                   | نعم                                   | غير متوفر (يوفره Nuxt i18n)                            |
| **التعددية**                                       | أنماط قائمة على التعداد؛ راجع الوثائق                                                                                         | قابل للتكوين (إضافات مثل i18next-icu)                                         | متقدم (ICU)                            | متقدم (ICU/messageformat)             | جيد                                   | جيد                                   | متقدم (قواعد التعددية المدمجة)                         |
| **التنسيق (التواريخ، الأرقام، العملات)**           | منسقات محسّنة (Intl في الخلفية)                                                                                               | عبر الإضافات أو استخدام Intl مخصص                                             | منسقات ICU متقدمة                      | مساعدو ICU/CLI                        | جيد (مساعدو Intl)                     | جيد (مساعدو Intl)                     | منسقات مدمجة للتاريخ/الرقم (Intl)                      |
| تنسيق المحتوى                                      | .tsx, .ts, .js, .json, .md, .txt                                                                                              | .json                                                                         | .json, .js                             | .po, .json                            | .json, .js, .ts                       | .json                                 | .json, .js                                             |
| دعم ICU                                            | جاري العمل عليه (ICU أصلي)                                                                                                    | عبر الإضافة (i18next-icu)                                                     | نعم                                    | نعم                                   | نعم                                   | عبر الإضافة (i18next-icu)             | عبر مهيئ/مجمّع مخصص                                    |
| مساعدو تحسين محركات البحث (hreflang، خريطة الموقع) | أدوات مدمجة: مساعدات لخريطة الموقع، **robots.txt**، البيانات الوصفية                                                          | إضافات المجتمع/يدوي                                                           | ليست جزءًا أساسيًا                     | ليست جزءًا أساسيًا                    | جيد                                   | جيد                                   | ليست جزءًا أساسيًا (يوفر Nuxt i18n مساعدات)            |
| النظام البيئي / المجتمع                            | أصغر ولكنها تنمو بسرعة وتتمتع بالتفاعل                                                                                        | الأكبر والأكثر نضجًا                                                          | كبير، مؤسسي                            | ينمو، أصغر                            | متوسط الحجم، يركز على Next.js         | متوسط الحجم، يركز على Next.js         | كبير في نظام Vue البيئي                                |
| العرض من جانب الخادم ومكونات الخادم                | نعم، مُبسطة للعرض من جانب الخادم / مكونات خادم React                                                                          | مدعومة، مع الحاجة لبعض الإعدادات                                              | مدعومة في Next.js                      | مدعومة                                | دعم كامل                              | دعم كامل                              | العرض من جانب الخادم عبر Nuxt/Vue SSR (بدون RSC)       |
| التخلص من الشجر (تحميل المحتوى المستخدم فقط)       | نعم، لكل مكون أثناء وقت البناء عبر إضافات Babel/SWC                                                                           | عادةً ما يتم تحميل الكل (يمكن تحسينه باستخدام المساحات الاسمية/تقسيم الشيفرة) | عادةً ما يتم تحميل الكل                | ليس الافتراضي                         | جزئي                                  | جزئي                                  | جزئي (مع تقسيم الشيفرة/إعداد يدوي)                     |
| التحميل الكسول                                     | نعم، لكل لغة/لكل مكون                                                                                                         | نعم (مثلاً، الخلفيات/المساحات الاسمية عند الطلب)                              | نعم (تقسيم حزم اللغة)                  | نعم (استيراد الكتالوجات الديناميكي)   | نعم (لكل مسار/لكل لغة)                | نعم (لكل مسار/لكل لغة)                | نعم (رسائل اللغة غير المتزامنة)                        |
| إدارة المشاريع الكبيرة                             | يشجع على التكويد النمطي، مناسب لنظام التصميم                                                                                  | يحتاج إلى انضباط جيد في الملفات                                               | يمكن أن تصبح الكتالوجات المركزية كبيرة | قد تصبح معقدة                         | نمطي مع الإعداد                       | نمطي مع الإعداد                       | نمطي مع إعداد Vue Router/Nuxt i18n                     |

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات           |
| ------- | ---------- | ------------------- |
| 5.8.0   | 2025-08-19 | تحديث جدول المقارنة |
| 5.5.10  | 2025-06-29 | بداية التاريخ       |
