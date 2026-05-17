---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: أهمية Intlayer
description: اكتشف فوائد ومزايا استخدام Intlayer في مشاريعك. افهم لماذا يبرز Intlayer بين الأطر الأخرى.
keywords:
  - فوائد
  - مزايا
  - Intlayer
  - إطار عمل
  - مقارنة
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "إصدار المترجم"
  - version: 5.8.0
    date: 2025-08-19
    changes: "تحديث الجدول المقارن"
  - version: 5.5.10
    date: 2025-06-29
    changes: "البداية التاريخية"
---

# لماذا يجب عليك التفكير في Intlayer؟

## ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل مصممة خصيصًا لمطوري JavaScript. يتيح التصريح عن محتواك في كل مكان في الكود الخاص بك. يقوم بتحويل التصريحات للمحتوى متعدد اللغات إلى قواميس منظمة لتتكامل بسهولة في الكود الخاص بك. باستخدام TypeScript، يجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

## لماذا تم إنشاء Intlayer؟

تم إنشاء Intlayer لحل مشكلة شائعة تؤثر على جميع مكتبات i18n الشائعة مثل `next-intl` و `react-i18next` و `react-intl` و `next-i18next` و `react-intl` و `vue-i18n`.

تعتمد جميع هذه الحلول نهجًا مركزيًا لسرد وإدارة محتواك. على سبيل المثال:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

أو هنا باستخدام مساحات الأسماء:

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

هذا النوع من الهندسة يبطئ عملية التطوير ويجعل قاعدة الكود أكثر تعقيدًا في الصيانة لعدة أسباب:

1. **لأي مكون جديد يتم إنشاؤه، يجب عليك:**
   - إنشاء المورد الجديد/مساحة الاسم الجديدة في مجلد `locales`
   - تذكر استيراد مساحة الاسم الجديدة في صفحتك
   - ترجمة محتواك (غالبًا ما يتم ذلك يدويًا عن طريق النسخ/اللصق من موفري الذكاء الاصطناعي)

2. **لأي تغيير يتم إجراؤه على مكوناتك، يجب عليك:**
   - البحث عن المورد/مساحة الاسم المتعلقة (بعيدًا عن المكون)
   - ترجمة محتواك
   - التأكد من تحديث محتواك لأي لغة
   - التحقق من أن مساحة الاسم الخاصة بك لا تتضمن مفاتيح/قيم غير مستخدمة
   - التأكد من أن هيكل ملفات JSON الخاص بك هو نفسه لجميع اللغات

في المشاريع المهنية التي تستخدم هذه الحلول، غالبًا ما يتم استخدام منصات التعريب للمساعدة في إدارة ترجمة محتواك. ومع ذلك، يمكن أن يصبح هذا مكلفًا بسرعة للمشاريع الكبيرة.

لحل هذه المشكلة، يعتمد Intlayer نهجًا يحدد نطاق محتواك لكل مكون ويبقي محتواك قريبًا من المكون الخاص بك، كما نفعل غالبًا مع CSS (`styled-components`) أو الأنواع أو التوثيق (`storybook`) أو اختبارات الوحدة (`jest`).

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

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

يتيح لك هذا النهج:

1. **زيادة سرعة التطوير**
   - يمكن إنشاء ملفات `.content.{{ts|mjs|cjs|json}}` باستخدام إضافة VSCode
   - يمكن لأدوات الإكمال التلقائي للذكاء الاصطناعي في بيئة التطوير الخاصة بك (مثل GitHub Copilot) مساعدتك في التصريح عن محتواك، مما يقلل من النسخ/اللصق

2. **تنظيف قاعدة الكود الخاصة بك**
   - تقليل التعقيد
   - زيادة القابلية للصيانة

3. **تكرار مكوناتك والمحتوى المتعلق بها بسهولة أكبر (مثال: مكونات تسجيل الدخول/التسجيل، إلخ.)**
   - عن طريق الحد من مخاطر التأثير على محتوى المكونات الأخرى
   - عن طريق نسخ/لصق محتواك من تطبيق إلى آخر دون تبعيات خارجية

4. **تجنب تلويث قاعدة الكود الخاصة بك بمفاتيح/قيم غير مستخدمة للمكونات غير المستخدمة**
   - إذا لم تستخدم مكونًا، فلن يقوم Intlayer باستيراد المحتوى المتعلق به
   - إذا قمت بحذف مكون، ستتذكر بسهولة أكبر إزالة المحتوى المتعلق به لأنه سيكون موجودًا في نفس المجلد

5. **تقليل تكلفة التفكير لعملاء الذكاء الاصطناعي للتصريح عن محتواك متعدد اللغات**
   - لن يضطر عميل الذكاء الاصطناعي إلى مسح قاعدة الكود بالكامل لمعرفة مكان تنفيذ محتواك
   - يمكن إجراء الترجمات بسهولة بواسطة أدوات الإكمال التلقائي للذكاء الاصطناعي في بيئة التطوير الخاصة بك (مثل GitHub Copilot)

6. **تحسين أداء التحميل**
   - إذا تم تحميل المكون بشكل كسول، فسيتم تحميل المحتوى المتعلق به في نفس الوقت

## ميزات إضافية لـ Intlayer

| الميزة                                                                                                                    | الوصف                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![الميزة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                           | **دعم أطر عمل متعددة**<br><br>يتوافق Intlayer مع جميع أطر العمل والمكتبات الرئيسية، بما في ذلك Next.js و React و Vite و Vue.js و Nuxt و Preact و Express والمزيد.                                                                                                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **إدارة المحتوى المدعومة بـ JavaScript**<br><br>استغل مرونة JavaScript لتعريف وإدارة محتواك بكفاءة. <br><br> - [التصريح عن المحتوى](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="الميزة" width="700">   | **المترجم**<br><br>يقوم مترجم Intlayer باستخراج المحتوى تلقائيًا من المكونات وإنشاء ملفات القواميس.<br><br> - [المترجم](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ملف التصريح عن المحتوى لكل لغة**<br><br>سرع تطويرك عن طريق التصريح عن محتواك مرة واحدة، قبل التوليد التلقائي.<br><br> - [ملف التصريح عن المحتوى لكل لغة](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **بيئة آمنة النوع (Type-Safe)**<br><br>استفد من TypeScript لضمان خلو تعريفات المحتوى والكود الخاص بك من الأخطاء، مع الاستفادة أيضًا من الإكمال التلقائي في بيئة التطوير.<br><br> - [تكوين TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **إعداد مبسط**<br><br>ابدأ العمل بسرعة مع الحد الأدنى من التكوين. اضبط إعدادات التدويل والتوجيه والذكاء الاصطناعي والبناء ومعالجة المحتوى بسهولة. <br><br> - [استكشف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **استرجاع محتوى مبسط**<br><br>لا حاجة لاستدعاء وظيفة `t` لكل قطعة من المحتوى. استرجع كل محتواك مباشرة باستخدام خطاف واحد.<br><br> - [تكامل React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **تنفيذ ثابت لمكونات الخادم**<br><br>مناسب تمامًا لمكونات خادم Next.js، استخدم نفس التنفيذ لكل من مكونات العميل والخادم، لا حاجة لتمرير وظيفة `t` عبر كل مكون خادم. <br><br> - [مكونات الخادم](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **قاعدة كود منظمة**<br><br>حافظ على قاعدة الكود الخاصة بك أكثر تنظيمًا: مكون واحد = قاموس واحد في نفس المجلد. الترجمات القريبة من مكوناتها الخاصة تعزز القابلية للصيانة والوضوح. <br><br> - [كيف يعمل Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **توجيه محسن**<br><br>دعم كامل لتوجيه التطبيق، والتكيف بسلاسة مع هياكل التطبيقات المعقدة، لـ Next.js و React و Vite و Vue.js وغيرها.<br><br> - [استكشف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **دعم Markdown**<br><br>استيراد وتفسير ملفات اللغة و Markdown عن بعد للمحتوى متعدد اللغات مثل سياسات الخصوصية والتوثيق وما إلى ذلك. تفسير وجعل البيانات الوصفية لـ Markdown متاحة في الكود الخاص بك.<br><br> - [ملفات المحتوى](https://intlayer.org/doc/concept/content/file)                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **محرر مرئي ونظام إدارة محتوى مجاني**<br><br>يتوفر محرر مرئي ونظام إدارة محتوى مجاني لكتاب المحتوى، مما يزيل الحاجة إلى منصة تعريب. حافظ على محتواك متزامنًا باستخدام Git، أو قم بإخراجه كليًا أو جزئيًا باستخدام نظام إدارة المحتوى.<br><br> - [محرر Intlayer](https://intlayer.org/doc/concept/editor) <br> - [نظام إدارة محتوى Intlayer](https://intlayer.org/doc/concept/cms)                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **محتوى قابل للتقليم (Tree-shakable)**<br><br>محتوى قابل للتقليم، مما يقلل من حجم الحزمة النهائية. يحمل المحتوى لكل مكون، مع استبعاد أي محتوى غير مستخدم من حزمتك. يدعم التحميل الكسول لتعزيز كفاءة تحميل التطبيق. <br><br> - [تحسين بناء التطبيق](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **الرندرة الثابتة**<br><br>لا يعيق الرندرة الثابتة. <br><br> - [تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **ترجمة مدعومة بالذكاء الاصطناعي**<br><br>حول موقعك الإلكتروني إلى 231 لغة بنقرة واحدة فقط باستخدام أدوات الترجمة المتقدمة المدعومة بالذكاء الاصطناعي من Intlayer باستخدام موفر الذكاء الاصطناعي الخاص بك/مفتاح API. <br><br> - [تكامل CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [واجهة أوامر Intlayer](https://intlayer.org/doc/concept/cli) <br> - [التعبئة التلقائية](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **تكامل خادم MCP**<br><br>يوفر خادم MCP (بروتوكول سياق النموذج) لأتمتة بيئة التطوير المتكاملة (IDE)، مما يتيح إدارة محتوى وسلسة وسير عمل i18ن مباشرة داخل بيئة التطوير الخاصة بك. <br><br> - [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/ar/mcp_server.md)                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **إضافة VSCode**<br><br>يوفر Intlayer إضافة لـ VSCode لمساعدتك في إدارة المحتوى والترجمات، وبناء القواميس، وترجمة المحتوى، والمزيد. <br><br> - [إضافة VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **التوافق التشغيلي**<br><br>يتيح التوافق التشغيلي مع react-i18next و next-i18next و next-intl و react-intl. <br><br> - [Intlayer و react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer و next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer و next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                       |
| اختبار الترجمات المفقودة (CLI/CI)                                                                                         | ✅ CLI: npx intlayer content test (تدقيق متوافق مع CI)                                                                                                                                                                                                                                                                                                                                                                           |

## مقارنة Intlayer مع الحلول الأخرى

| الميزة                                    | `intlayer`                                                                                                               | `react-i18next`                                                                           | `react-intl` (FormatJS)                                                                                   | `lingui`                                                      | `next-intl`                                                                               | `next-i18next`                                                                            | `vue-i18n`                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **الترجمات بالقرب من المكونات**           | ✅ نعم، المحتوى موجود بجانب كل مكون                                                                                      | ❌ لا                                                                                     | ❌ لا                                                                                                     | ❌ لا                                                         | ❌ لا                                                                                     | ❌ لا                                                                                     | ✅ نعم - باستخدام `Single File Components` (SFCs)         |
| **تكامل TypeScript**                      | ✅ متقدم، أنواع صارمة يتم توليدها تلقائيًا                                                                               | ⚠️ أساسي؛ يتطلب تكوينًا إضافيًا للأمان                                                    | ✅ جيد، لكنه أقل صرامة                                                                                    | ⚠️ يتطلب تكوين الأنواع                                        | ✅ جيد                                                                                    | ⚠️ أساسي                                                                                  | ✅ جيد (الأنواع متاحة؛ يتطلب أمان المفاتيح إعدادًا)       |
| **كشف الترجمات المفقودة**                 | ✅ تمييز أخطاء TypeScript وخطأ/تحذير وقت البناء                                                                          | ⚠️ غالبًا سلاسل نصية بديلة وقت التشغيل                                                    | ⚠️ سلاسل نصية بديلة                                                                                       | ⚠️ يتطلب تكوينًا إضافيًا                                      | ⚠️ بديل وقت التشغيل                                                                       | ⚠️ بديل وقت التشغيل                                                                       | ⚠️ بديل/تحذيرات وقت التشغيل (قابلة للتكوين)               |
| **المحتوى الغني (JSX/Markdown/المكونات)** | ✅ دعم مباشر                                                                                                             | ⚠️ محدود / استكمال فقط                                                                    | ⚠️ بناء جملة ICU، ليس JSX حقيقيًا                                                                         | ⚠️ محدود                                                      | ❌ غير مصمم للعقد الغنية                                                                  | ⚠️ محدود                                                                                  | ⚠️ محدود (المكونات عبر `<i18n-t>`، Markdown عبر الإضافات) |
| **الترجمة المدعومة بالذكاء الاصطناعي**    | ✅ نعم، يدعم موفري ذكاء اصطناعي متعددين. يمكن استخدامه بمفاتيح API الخاصة بك. يأخذ في الاعتبار سياق تطبيقك ونطاق المحتوى | ❌ لا                                                                                     | ❌ لا                                                                                                     | ❌ لا                                                         | ❌ لا                                                                                     | ❌ لا                                                                                     | ❌ لا                                                     |
| **المحرر المرئي**                         | ✅ نعم، محرر مرئي محلي + نظام إدارة محتوى اختياري؛ يمكنه إخراج محتوى قاعدة الكود؛ قابل للتضمين                           | ❌ لا / متاح عبر منصات تعريب خارجية                                                       | ❌ لا / متاح عبر منصات تعريب خارجية                                                                       | ❌ لا / متاح عبر منصات تعريب خارجية                           | ❌ لا / متاح عبر منصات تعريب خارجية                                                       | ❌ لا / متاح عبر منصات تعريب خارجية                                                       | ❌ لا / متاح عبر منصات تعريب خارجية                       |
| **التوجيه المترجم**                       | ✅ نعم، يدعم المسارات المترجمة بشكل افتراضي (يعمل مع Next.js و Vite)                                                     | ⚠️ لا يوجد دعم مدمج، يتطلب إضافات (مثل `next-i18next`) أو تكوين موجه مخصص                 | ❌ لا، تنسيق الرسائل فقط، يجب أن يكون التوجيه يدويًا                                                      | ⚠️ لا يوجد دعم مدمج، يتطلب إضافات أو تكوينًا يدويًا           | ✅ مدمج، يدعم App Router مقطع `[locale]`                                                  | ✅ مدمج                                                                                   | ✅ مدمج                                                   |
| **توليد المسارات الديناميكية**            | ✅ نعم                                                                                                                   | ⚠️ إعداد يدوي أو عبر الإضافات/النظام البيئي                                               | ❌ غير متوفر                                                                                              | ⚠️ إعداد يدوي أو عبر الإضافات                                 | ✅ نعم                                                                                    | ✅ نعم                                                                                    | ❌ غير متوفر (يوفر Nuxt i18n ذلك)                         |
| **الجمع**                                 | ✅ أنماط تعتمد على التعداد                                                                                               | ✅ قابل للتكوين (إضافات مثل i18next-icu)                                                  | ✅ (ICU)                                                                                                  | ✅ (ICU/messageformat)                                        | ✅ جيد                                                                                    | ✅ جيد                                                                                    | ✅ قواعد جمع مدمجة                                        |
| **التنسيق (التواريخ، الأرقام، العملات)**  | ✅ منسقات محسنة (Intl تحت الغطاء)                                                                                        | ⚠️ عبر الإضافات أو استخدام Intl المخصص                                                    | ✅ منسقات ICU                                                                                             | ✅ مساعدو ICU/CLI                                             | ✅ جيد (مساعدو Intl)                                                                      | ✅ جيد (مساعدو Intl)                                                                      | ✅ منسقات تاريخ/أرقام مدمجة (Intl)                        |
| **تنسيق المحتوى**                         | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml قيد العمل)                                                                   | ⚠️ .json                                                                                  | ✅ .json, .js                                                                                             | ⚠️ .po, .json                                                 | ✅ .json, .js, .ts                                                                        | ⚠️ .json                                                                                  | ✅ .json, .js                                             |
| **دعم ICU**                               | ⚠️ قيد العمل                                                                                                             | ⚠️ عبر إضافة (i18next-icu)                                                                | ✅ نعم                                                                                                    | ✅ نعم                                                        | ✅ نعم                                                                                    | ⚠️ عبر إضافة (`i18next-icu`)                                                              | ⚠️ عبر منسق/مترجم مخصص                                    |
| **مساعدو SEO (hreflang, sitemap)**        | ✅ أدوات مدمجة: مساعدون لـ sitemap و robots.txt والبيانات الوصفية                                                        | ⚠️ إضافات المجتمع/يدوي                                                                    | ❌ ليس أساسيًا                                                                                            | ❌ ليس أساسيًا                                                | ✅ جيد                                                                                    | ✅ جيد                                                                                    | ❌ ليس أساسيًا (يوفر Nuxt i18n المساعدين)                 |
| **النظام البيئي / المجتمع**               | ⚠️ أصغر ولكنه ينمو بسرعة وتفاعلي                                                                                         | ✅ الأكبر والأكثر نضجًا                                                                   | ✅ كبير                                                                                                   | ⚠️ أصغر                                                       | ✅ متوسط الحجم، يركز على Next.js                                                          | ✅ متوسط الحجم، يركز على Next.js                                                          | ✅ كبير في نظام Vue البيئي                                |
| **الرندرة من جانب الخادم ومكونات الخادم** | ✅ نعم، مبسط لـ SSR / مكونات خادم React                                                                                  | ⚠️ مدعوم على مستوى الصفحة ولكن يجب تمرير وظائف t على شجرة المكونات لمكونات الخادم التابعة | ⚠️ مدعوم على مستوى الصفحة مع إعداد إضافي، ولكن يجب تمرير وظائف t على شجرة المكونات لمكونات الخادم التابعة | ✅ مدعوم، يتطلب إعدادًا                                       | ⚠️ مدعوم على مستوى الصفحة ولكن يجب تمرير وظائف t على شجرة المكونات لمكونات الخادم التابعة | ⚠️ مدعوم على مستوى الصفحة ولكن يجب تمرير وظائف t على شجرة المكونات لمكونات الخادم التابعة | ✅ SSR عبر Nuxt/Vue SSR (لا يوجد RSC)                     |
| **التقليم (تحميل المحتوى المستخدم فقط)**  | ✅ نعم، لكل مكون في وقت البناء عبر إضافات Babel/SWC                                                                      | ⚠️ عادة ما يحمل الكل (يمكن تحسينه باستخدام مساحات الأسماء/تقسيم الكود)                    | ⚠️ عادة ما يحمل الكل                                                                                      | ❌ ليس افتراضيًا                                              | ⚠️ جزئي                                                                                   | ⚠️ جزئي                                                                                   | ⚠️ جزئي (مع تقسيم الكود/الإعداد اليدوي)                   |
| **التحميل الكسول**                        | ✅ نعم، لكل لغة / لكل قاموس                                                                                              | ✅ نعم (مثل الخلفيات/مساحات الأسماء عند الطلب)                                            | ✅ نعم (تقسيم حزم اللغة)                                                                                  | ✅ نعم (استيراد الكتالوج الديناميكي)                          | ✅ نعم (لكل مسار/لكل لغة)، يتطلب إدارة مساحات الأسماء                                     | ✅ نعم (لكل مسار/لكل لغة)، يتطلب إدارة مساحات الأسماء                                     | ✅ نعم (رسائل لغة غير متزامنة)                            |
| **تنقية المحتوى غير المستخدم**            | ✅ نعم، لكل قاموس في وقت البناء                                                                                          | ❌ لا، فقط عبر تقسيم مساحات الأسماء يدويًا                                                | ❌ لا، يتم تجميع جميع الرسائل المصرح عنها                                                                 | ✅ نعم، يتم اكتشاف المفاتيح غير المستخدمة وإسقاطها عند البناء | ❌ لا، يمكن إدارتها يدويًا مع إدارة مساحات الأسماء                                        | ❌ لا، يمكن إدارتها يدويًا مع إدارة مساحات الأسماء                                        | ❌ لا، ممكن فقط عبر التحميل الكسول اليدوي                 |
| **إدارة المشاريع الكبيرة**                | ✅ يشجع على النمطية، مناسب لأنظمة التصميم                                                                                | ⚠️ يتطلب انضباطًا جيدًا في الملفات                                                        | ⚠️ الكتالوجات المركزية يمكن أن تصبح كبيرة                                                                 | ⚠️ يمكن أن تصبح معقدة                                         | ✅ نمطي مع الإعداد                                                                        | ✅ نمطي مع الإعداد                                                                        | ✅ نمطي مع إعداد Vue Router/Nuxt i18n                     |

---

## نجوم GitHub

تعد نجوم GitHub مؤشرًا قويًا على شعبية المشروع وثقة المجتمع وأهميته على المدى الطويل. على الرغم من أنها ليست مقياسًا مباشرًا للجودة التقنية، إلا أنها تعكس عدد المطورين الذين يجدون المشروع مفيدًا ويتابعون تقدمه ومن المحتمل أن يتبنوه. لتقدير قيمة المشروع، تساعد النجوم في مقارنة الجاذبية عبر البدائل وتوفر رؤى حول نمو النظام البيئي.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## التوافق التشغيلي

يمكن لـ `intlayer` أيضًا المساعدة في إدارة مساحات الأسماء الخاصة بـ `react-intl` و `react-i18next` و `next-intl` و `next-i18next` و `vue-i18n`.

باستخدام `intlayer`، يمكنك التصريح عن المحتوى الخاص بك بتنسيق مكتبة i18n المفضلة لديك، وسيقوم intlayer بإنشاء مساحات الأسماء الخاصة بك في الموقع الذي تختاره (مثال: `/messages/{{locale}}/{{namespace}}.json`).
