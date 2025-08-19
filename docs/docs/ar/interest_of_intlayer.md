---
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: أهمية Intlayer
description: اكتشف فوائد ومزايا استخدام Intlayer في مشاريعك. فهم لماذا يتميز Intlayer بين الأُطُر الأخرى.
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

# لماذا يجب أن تفكر في Intlayer؟

## ما هو Intlayer؟

**Intlayer** هو مكتبة تعريب (تدويل) مصممة خصيصًا لمطوري جافا سكريبت. يسمح لك بالإعلان عن محتواك في كل مكان داخل الكود الخاص بك. يقوم بتحويل إعلانات المحتوى متعدد اللغات إلى قواميس منظمة لتتكامل بسهولة في كودك. باستخدام TypeScript، يجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

## لماذا تم إنشاء Intlayer؟

تم إنشاء Intlayer لحل مشكلة شائعة تؤثر على جميع مكتبات i18n الشائعة مثل `next-intl`، `react-i18next`، `react-intl`، `next-i18next`، `react-intl`، و `vue-i18n`.

تعتمد كل هذه الحلول على نهج مركزي لقائمة وإدارة المحتوى الخاص بك. على سبيل المثال:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

أو هنا باستخدام المساحات الاسمية:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

هذا النوع من البنية يبطئ عملية التطوير ويجعل قاعدة الشيفرة أكثر تعقيدًا للصيانة لأسباب عدة:

1. **لأي مكون جديد يتم إنشاؤه، يجب عليك:**
   - إنشاء المورد/المساحة الاسمية الجديدة في مجلد `locales`
   - تذكر استيراد المساحة الاسمية الجديدة في صفحتك
   - ترجمة المحتوى الخاص بك (غالبًا ما يتم ذلك يدويًا عن طريق النسخ/اللصق من مزودي الذكاء الاصطناعي)

2. **لأي تغيير يتم على مكوناتك، يجب عليك:**
   - البحث عن المورد/المساحة الاسمية ذات الصلة (بعيدًا عن المكون)
   - ترجمة المحتوى الخاص بك
   - التأكد من تحديث المحتوى الخاص بك لكل لغة
   - التحقق من أن المساحة الاسمية لا تحتوي على مفاتيح/قيم غير مستخدمة
   - التأكد من أن هيكل ملفات JSON هو نفسه لجميع اللغات

في المشاريع الاحترافية التي تستخدم هذه الحلول، غالبًا ما تُستخدم منصات الترجمة للمساعدة في إدارة ترجمة المحتوى الخاص بك. ومع ذلك، يمكن أن يصبح هذا مكلفًا بسرعة للمشاريع الكبيرة.

لحل هذه المشكلة، تعتمد Intlayer نهجًا يقوم بتحديد نطاق المحتوى الخاص بك لكل مكون ويحافظ على المحتوى قريبًا من المكون الخاص بك، كما نفعل غالبًا مع CSS (`styled-components`)، وأنواع البيانات، والوثائق (`storybook`)، أو اختبارات الوحدة (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// تعريف محتوى المثال للمكون
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

تتيح لك هذه الطريقة:

1. **زيادة سرعة التطوير**
   - يمكن إنشاء ملفات `.content.{{ts|mjs|cjs|json}}` باستخدام إضافة VSCode
   - يمكن لأدوات الإكمال التلقائي المعتمدة على الذكاء الاصطناعي في بيئة التطوير الخاصة بك (مثل GitHub Copilot) مساعدتك في إعلان المحتوى الخاص بك، مما يقلل من النسخ/اللصق

2. **تقليل تعقيد قاعدة الشيفرة الخاصة بك**

3. **زيادة قابلية صيانة قاعدة الشيفرة الخاصة بك**

4. **تكرار مكوناتك والمحتوى المرتبط بها بسهولة أكبر (مثال: مكونات تسجيل الدخول/التسجيل، إلخ)**
   - من خلال الحد من خطر التأثير على محتوى المكونات الأخرى
   - من خلال نسخ/لصق المحتوى الخاص بك من تطبيق إلى آخر بدون تبعيات خارجية

5. **تجنب تلويث قاعدة الشيفرة الخاصة بك بمفاتيح/قيم غير مستخدمة للمكونات غير المستخدمة**
   - إذا لم تستخدم مكونًا، فلن تحتاج إلى استيراد محتواه
   - إذا قمت بحذف مكون، ستتذكر بسهولة أكبر إزالة المحتوى المرتبط به لأنه سيكون موجودًا في نفس المجلد

6. **تقليل تكلفة التفكير لوكلاء الذكاء الاصطناعي لإعلان المحتوى متعدد اللغات الخاص بك**
   - لن يضطر وكيل الذكاء الاصطناعي إلى مسح قاعدة الشيفرة الخاصة بك بالكامل لمعرفة مكان تنفيذ المحتوى الخاص بك
   - يمكن إجراء الترجمات بسهولة بواسطة أدوات الإكمال التلقائي للذكاء الاصطناعي في بيئة التطوير الخاصة بك (مثل GitHub Copilot)

7. **تحسين أداء التحميل**
   - إذا تم تحميل مكون بشكل كسول، فسيتم تحميل المحتوى المرتبط به في نفس الوقت

## الميزات الإضافية لـ Intlayer

| الميزة                                                                                                                 | الوصف                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **دعم عبر الأُطُر المختلفة**<br><br>يتوافق Intlayer مع جميع الأُطُر والمكتبات الرئيسية، بما في ذلك Next.js و React و Vite و Vue.js و Nuxt و Preact و Express والمزيد.                                                                                                                                                                                                                                                                           |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true)       | **إدارة المحتوى باستخدام جافاسكريبت**<br><br>استفد من مرونة جافاسكريبت لتعريف وإدارة محتواك بكفاءة. <br><br> - [إعلان المحتوى](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                                        |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ملف إعلان المحتوى لكل لغة**<br><br>سرّع عملية تطويرك من خلال إعلان محتواك مرة واحدة، قبل التوليد التلقائي.<br><br> - [ملف إعلان المحتوى لكل لغة](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                            |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **بيئة آمنة من حيث النوع**<br><br>استفد من TypeScript لضمان أن تعريفات المحتوى والرمز الخاص بك خالية من الأخطاء، مع الاستفادة أيضًا من الإكمال التلقائي في بيئة التطوير المتكاملة (IDE).<br><br> - [تكوين TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                 |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **إعداد مبسط**<br><br>ابدأ بسرعة مع أقل قدر من التهيئة. قم بضبط الإعدادات الخاصة بالتدويل، التوجيه، الذكاء الاصطناعي، البناء، وإدارة المحتوى بسهولة.<br><br> - [استكشاف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                             |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **استرجاع المحتوى المبسط**<br><br>لا حاجة لاستدعاء دالة `t` لكل قطعة محتوى. استرجع كل محتواك مباشرة باستخدام هوك واحد.<br><br> - [تكامل React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                                           |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **تنفيذ متسق لمكونات الخادم**<br><br>مناسب تمامًا لمكونات الخادم في Next.js، استخدم نفس التنفيذ لكل من مكونات العميل والخادم، لا حاجة لتمرير دالة `t` الخاصة بك عبر كل مكون خادم. <br><br> - [مكونات الخادم](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                                   |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **قاعدة شفرة منظمة**<br><br>حافظ على تنظيم قاعدة الشفرة الخاصة بك بشكل أفضل: مكون واحد = قاموس واحد في نفس المجلد. الترجمة القريبة من مكوناتها تعزز من سهولة الصيانة والوضوح. <br><br> - [كيف يعمل Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                               |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **توجيه محسّن**<br><br>دعم كامل لتوجيه التطبيقات، يتكيف بسلاسة مع هياكل التطبيقات المعقدة، لـ Next.js و React و Vite و Vue.js، وغيرها.<br><br> - [استكشاف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                           |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **دعم ماركداون**<br><br>استيراد وتفسير ملفات اللغة وملفات ماركداون عن بُعد للمحتوى متعدد اللغات مثل سياسات الخصوصية، الوثائق، إلخ. تفسير وجعل بيانات التعريف الخاصة بماركداون متاحة في كودك.<br><br> - [ملفات المحتوى](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                           |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **محرر مرئي مجاني ونظام إدارة محتوى**<br><br>يتوفر محرر مرئي مجاني ونظام إدارة محتوى لكتاب المحتوى، مما يلغي الحاجة إلى منصة تعريب. حافظ على تزامن محتواك باستخدام Git، أو قم بتفويضه كليًا أو جزئيًا باستخدام نظام إدارة المحتوى.<br><br> - [محرر Intlayer](https://intlayer.org/doc/concept/editor) <br> - [نظام إدارة محتوى Intlayer](https://intlayer.org/doc/concept/cms)                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                           | **محتوى قابل للتقليل الشجري**<br><br>محتوى قابل للتقليل الشجري، مما يقلل من حجم الحزمة النهائية. يقوم بتحميل المحتوى لكل مكون، مستبعدًا أي محتوى غير مستخدم من الحزمة الخاصة بك. يدعم التحميل الكسول لتحسين كفاءة تحميل التطبيق. <br><br> - [تحسين بناء التطبيق](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                    |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **العرض الثابت**<br><br>لا يعوق العرض الثابت.<br><br> - [تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                            |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **الترجمة المدعومة بالذكاء الاصطناعي**<br><br>حوّل موقعك الإلكتروني إلى 231 لغة بنقرة واحدة فقط باستخدام أدوات الترجمة المتقدمة المدعومة بالذكاء الاصطناعي من Intlayer باستخدام مزود الذكاء الاصطناعي الخاص بك/مفتاح API الخاص بك. <br><br> - [تكامل CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [واجهة سطر أوامر Intlayer](https://intlayer.org/doc/concept/cli) <br> - [الملء التلقائي](https://intlayer.org/doc/concept/auto-fill) |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **تكامل خادم MCP**<br><br>يوفر خادم MCP (بروتوكول سياق النموذج) لأتمتة بيئة التطوير المتكاملة (IDE)، مما يتيح إدارة محتوى سلسة وسير عمل التدويل (i18n) مباشرة داخل بيئة التطوير الخاصة بك. <br><br> - [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)                                                                                                                                                   |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **امتداد VSCode**<br><br>يوفر Intlayer امتدادًا لـ VSCode لمساعدتك في إدارة المحتوى والترجمات الخاصة بك، وبناء قواميسك، وترجمة المحتوى الخاص بك، والمزيد.<br><br> - [امتداد VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                 |
| ![ميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **التشغيل البيني**<br><br>يتيح التشغيل البيني مع react-i18next و next-i18next و next-intl و react-intl. <br><br> - [Intlayer و react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer و next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer و next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                                          |

## مقارنة Intlayer مع الحلول الأخرى

| الميزة                                                 | Intlayer                                                                                                                  | React-i18next / i18next                                                     | React-Intl (FormatJS)                  | LinguiJS                              | next-intl                             | next-i18next                          | vue-i18n                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------------------------ |
| **الترجمات بالقرب من المكونات**                        | نعم، المحتوى موضوع بجانب كل مكون                                                                                          | لا                                                                          | لا                                     | لا                                    | لا                                    | لا                                    | نعم - باستخدام `مكونات الملف الواحد` (SFCs)            |
| **تكامل TypeScript**                                   | متقدم، أنواع صارمة مولدة تلقائيًا                                                                                         | أساسي؛ إعداد إضافي للسلامة                                                  | جيد، لكنه أقل صرامة                    | أنواع، يحتاج إلى إعداد                | جيد                                   | أساسي                                 | جيد (الأنواع متاحة؛ يحتاج إعداد لأمان المفاتيح)        |
| **كشف الترجمات المفقودة**                              | خطأ/تحذير أثناء وقت البناء                                                                                                | في الغالب سلاسل بديلة أثناء وقت التشغيل                                     | سلاسل بديلة                            | يحتاج إلى إعداد إضافي                 | سلاسل بديلة أثناء وقت التشغيل         | سلاسل بديلة أثناء وقت التشغيل         | سلاسل بديلة أثناء وقت التشغيل/تحذيرات (قابلة للتكوين)  |
| **المحتوى الغني (JSX/Markdown/المكونات)**              | دعم مباشر، حتى لعقد React                                                                                                 | محدود / فقط التداخل                                                         | صيغة ICU، ليست JSX حقيقية              | محدود                                 | غير مصمم للعقد الغنية                 | محدود                                 | محدود (المكونات عبر `<i18n-t>`، Markdown عبر الإضافات) |
| **الترجمة المدعومة بالذكاء الاصطناعي**                 | نعم، يدعم عدة مزودي ذكاء اصطناعي. يمكن استخدامه باستخدام مفاتيح API الخاصة بك. يأخذ في الاعتبار سياق تطبيقك ونطاق المحتوى | لا                                                                          | لا                                     | لا                                    | لا                                    | لا                                    | لا                                                     |
| **المحرر المرئي**                                      | نعم، محرر مرئي محلي + نظام إدارة محتوى اختياري؛ يمكنه إخراج محتوى قاعدة الشيفرة؛ قابل للتضمين                             | لا / متوفر عبر منصات الترجمة الخارجية                                       | لا / متوفر عبر منصات الترجمة الخارجية  | لا / متوفر عبر منصات الترجمة الخارجية | لا / متوفر عبر منصات الترجمة الخارجية | لا / متوفر عبر منصات الترجمة الخارجية | لا / متوفر عبر منصات الترجمة الخارجية                  |
| **التوجيه المحلي**                                     | مدمج، دعم الوسيط                                                                                                          | إضافات أو إعداد يدوي                                                        | غير مدمج                               | إعداد يدوي/إضافة                      | مدمج                                  | مدمج                                  | يدوي عبر Vue Router (يتعامل Nuxt i18n معه)             |
| **توليد المسار الديناميكي**                            | نعم                                                                                                                       | إضافة/نظام بيئي أو إعداد يدوي                                               | غير متوفر                              | إضافة/يدوي                            | نعم                                   | نعم                                   | غير متوفر (يوفره Nuxt i18n)                            |
| **التصريف الجمعي**                                     | أنماط قائمة على التعداد؛ راجع الوثائق                                                                                     | قابل للتكوين (إضافات مثل i18next-icu)                                       | متقدم (ICU)                            | متقدم (ICU/messageformat)             | جيد                                   | جيد                                   | متقدم (قواعد الجمع المدمجة)                            |
| **التنسيق (التواريخ، الأرقام، العملات)**               | منسقات محسّنة (Intl تحت الغطاء)                                                                                           | عبر الإضافات أو استخدام Intl مخصص                                           | منسقات ICU متقدمة                      | مساعدو ICU/CLI                        | جيد (مساعدو Intl)                     | جيد (مساعدو Intl)                     | منسقات مدمجة للتواريخ/الأرقام (Intl)                   |
| **تنسيق المحتوى**                                      | .tsx, .ts, .js, .json, .md, .txt                                                                                          | .json                                                                       | .json, .js                             | .po, .json                            | .json, .js, .ts                       | .json                                 | .json, .js                                             |
| **دعم ICU**                                            | جاري العمل عليه (ICU الأصلي)                                                                                              | عبر الإضافة (i18next-icu)                                                   | نعم                                    | نعم                                   | نعم                                   | عبر الإضافة (i18next-icu)             | عبر مهيئ/مجمّع مخصص                                    |
| **مساعدو تحسين محركات البحث (hreflang، خريطة الموقع)** | أدوات مدمجة: مساعدات لخريطة الموقع، **robots.txt**، البيانات الوصفية                                                      | إضافات المجتمع/يدوي                                                         | ليست جزءًا أساسيًا                     | ليست جزءًا أساسيًا                    | جيد                                   | جيد                                   | ليست جزءًا أساسيًا (يوفر Nuxt i18n مساعدات)            |
| **النظام البيئي / المجتمع**                            | أصغر ولكنها تنمو بسرعة وتتميز بالتفاعل                                                                                    | الأكبر والأكثر نضجًا                                                        | كبير، مؤسسي                            | ينمو، أصغر                            | متوسط الحجم، يركز على Next.js         | متوسط الحجم، يركز على Next.js         | كبير في نظام Vue البيئي                                |
| **التصيير على جانب الخادم ومكونات الخادم**             | نعم، مُبسّط للتصيير على جانب الخادم / مكونات خادم React                                                                   | مدعوم، يتطلب بعض الإعدادات                                                  | مدعوم في Next.js                       | مدعوم                                 | دعم كامل                              | دعم كامل                              | التصيير على جانب الخادم عبر Nuxt/Vue SSR (بدون RSC)    |
| **تحليل الشجرة (تحميل المحتوى المستخدم فقط)**          | نعم، لكل مكون أثناء وقت البناء عبر إضافات Babel/SWC                                                                       | عادةً ما يتم تحميل الكل (يمكن تحسينه باستخدام المساحات الاسمية/تقسيم الكود) | عادةً ما يتم تحميل الكل                | ليس افتراضيًا                         | جزئي                                  | جزئي                                  | جزئي (مع تقسيم الكود/إعداد يدوي)                       |
| **التحميل الكسول**                                     | نعم، لكل لغة/لكل مكون                                                                                                     | نعم (مثل الخلفيات/الأسماء عند الطلب)                                        | نعم (تقسيم حزم اللغة)                  | نعم (استيراد الكتالوجات الديناميكي)   | نعم (لكل مسار/لكل لغة)                | نعم (لكل مسار/لكل لغة)                | نعم (رسائل اللغة غير المتزامنة)                        |
| **إدارة المشاريع الكبيرة**                             | يشجع على التصميم المعياري، مناسب لنظام التصميم                                                                            | يحتاج إلى انضباط جيد في الملفات                                             | يمكن أن تصبح الكتالوجات المركزية كبيرة | قد تصبح معقدة                         | معياري مع الإعداد                     | معياري مع الإعداد                     | معياري مع إعداد Vue Router/Nuxt i18n                   |

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات           |
| ------- | ---------- | ------------------- |
| 5.8.0   | 2025-08-19 | تحديث جدول المقارنة |
| 5.5.10  | 2025-06-29 | بدء التاريخ         |
