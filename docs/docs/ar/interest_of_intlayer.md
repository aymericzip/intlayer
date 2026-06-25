---
createdAt: 2024-08-14
updatedAt: 2026-05-31
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
  - version: 8.11.2
    date: 2026-05-31
    changes: "أضف لماذا Intlayer على قسم البدائل"
  - version: 7.3.1
    date: 2025-11-27
    changes: "إصدار المترجم"
  - version: 5.8.0
    date: 2025-08-19
    changes: "تحديث الجدول المقارن"
  - version: 5.5.10
    date: 2025-06-29
    changes: "البداية التاريخية"
author: aymericzip
---

# لماذا يجب عليك التفكير في Intlayer؟

## ما هو Intlayer؟

**Intlayer** هي مكتبة internationalization مصممة خصيصًا لمطوري JavaScript. تسمح بإعلان محتواك في أي مكان في الكود الخاص بك. تحول إعلانات المحتوى متعدد اللغات إلى قواميس منظمة يمكن دمجها بسهولة في الكود الخاص بك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `next-intl` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

**حجم البندل**

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

** الصيانة **

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

**ميزة**

يقدم Intlayer مجموعة من الميزات الإضافية التي لا تتوفر في حلول i18n الأخرى، مثل [دعم Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)، [جلب خارجي المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)، [تحميل محتوى الملف](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md)، [المحتوى المباشر تحديث](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/live.md)، [محرر مرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) والمزيد.

**الأتمتة**

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

**أداء**

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

**التحجيم مع عدم وجود مطور**

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

** تصميم الإطار المتقاطع **

إذا كنت تستخدم أطر عمل مختلفة لأجزاء مختلفة من تطبيقك (على سبيل المثال، React وReact-native وVue وAngular وSvelte وما إلى ذلك)، فإن Intlayer يوفر طريقة **لاستخدام بناء جملة مشترك وتنفيذه عبر جميع أطر عمل الواجهة الأمامية الرئيسية**. ستتمكن أيضًا من مشاركة إعلان المحتوى الخاص بك عبر نظام التصميم والتطبيقات والواجهة الخلفية وما إلى ذلك.

---

## لماذا تم إنشاء Intlayer؟

تم إنشاء Intlayer لحل مشكلة شائعة تؤثر على جميع مكتبات i18n الشائعة مثل `next-intl`، `react-i18next`، `react-intl`، `next-i18next`، `react-intl`، و `vue-i18n`.

جميع هذه الحلول تعتمد على نهج مركزي لعرض وإدارة محتواك. على سبيل المثال:

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

أو هنا باستخدام namespaces:

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

يؤدي هذا النوع من المعمارية إلى إبطاء عملية التطوير وجعل codebase أكثر تعقيداً للحفاظ عليه لعدة أسباب:

1. **لأي مكون جديد تقوم بإنشاؤه، يجب عليك:**
   - إنشاء مورد/namespace جديد في مجلد `locales`
   - تذكر استيراد namespace الجديد في صفحتك
   - ترجمة محتواك (غالباً ما يتم يدويًا عبر النسخ واللصق من موفري الذكاء الاصطناعي)

2. **لأي تغيير تجريه على مكوناتك، يجب عليك:**
   - البحث عن المورد/namespace المرتبط (بعيد عن المكون)
   - ترجمة محتواك
   - التأكد من أن محتواك محدّث لأي لغة
   - التحقق من عدم تضمن namespace الخاص بك مفاتيح/قيم غير مستخدمة
   - التأكد من أن بنية ملفات JSON الخاصة بك متطابقة لجميع اللغات

في المشاريع الاحترافية التي تستخدم هذه الحلول، غالباً ما تُستخدم منصات التوطين (localization) للمساعدة في إدارة ترجمة محتواك. ومع ذلك، يمكن أن يصبح هذا مكلفاً بسرعة للمشاريع الكبيرة.

لحل هذه المشكلة، يعتمد Intlayer على نهج يحدد نطاق محتواك لكل مكون ويحافظ على محتواك قريباً من مكونك، كما نفعل غالباً مع CSS (`styled-components`)، الأنواع (types)، التوثيق (`storybook`)، أو اختبارات الوحدة (`jest`).

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
      ar: "مرحبا بالعالم",
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
   - يمكن إنشاء ملفات `.content.{{ts|mjs|cjs|json}}` باستخدام امتداد VSCode
   - أدوات إكمال الذكاء الاصطناعي في محررك (مثل GitHub Copilot) يمكنها مساعدتك في التصريح عن محتواك، مما يقلل النسخ واللصق

2. **تنظيف codebase الخاص بك**
   - تقليل التعقيد
   - زيادة قابلية الصيانة

3. **نسخ مكوناتك والمحتوى المرتبط بها بسهولة أكبر (مثال: مكونات تسجيل الدخول/التسجيل، إلخ)**
   - عن طريق تحديد خطر التأثير على محتوى المكونات الأخرى
   - عن طريق نسخ ولصق محتواك من تطبيق إلى آخر بدون تبعيات خارجية

4. **تجنب تلويث codebase الخاص بك بمفاتيح/قيم غير مستخدمة للمكونات غير المستخدمة**
   - إذا لم تستخدم مكوناً، فلن يستورد Intlayer المحتوى المرتبط به
   - إذا حذفت مكوناً، ستتذكر بسهولة أكبر إزالة المحتوى المرتبط به حيث سيكون موجوداً في نفس المجلد

5. **تقليل تكلفة الاستدلال لوكلاء الذكاء الاصطناعي للتصريح عن محتواك متعدد اللغات**
   - لن يضطر وكيل الذكاء الاصطناعي إلى مسح codebase الخاص بك بالكامل لمعرفة مكان تطبيق محتواك
   - يمكن إجراء الترجمات بسهولة من خلال أدوات إكمال الذكاء الاصطناعي في محررك (مثل GitHub Copilot)

6. **تحسين أداء التحميل**
   - إذا تم تحميل مكون بشكل كسول (lazy-loaded)، فسيتم تحميل المحتوى المرتبط به في نفس الوقت

## الميزات الإضافية لـ Intlayer

| Feature                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **دعم الأطر المتقاطعة**<br><br>Intlayer متوافق مع جميع الأطر والمكتبات الرئيسية، بما في ذلك Next.js و React و Vite و Vue.js و Nuxt و Preact و Express والمزيد.                                                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **إدارة المحتوى المدعومة بـ JavaScript**<br><br>استفد من مرونة JavaScript لتحديد وإدارة المحتوى الخاص بك بكفاءة. <br><br> - [إعلان المحتوى](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **المترجم**<br><br>يستخرج مترجم Intlayer المحتوى تلقائياً من المكونات وينشئ ملفات القاموس.<br><br> - [المترجم](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ملف إعلان المحتوى لكل لغة**<br><br>سرّع التطوير الخاص بك بإعلان المحتوى مرة واحدة، قبل الإنشاء التلقائي.<br><br> - [ملف إعلان المحتوى لكل لغة](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **بيئة آمنة من حيث النوع**<br><br>استفد من TypeScript لضمان خلو تعريفات المحتوى والكود من الأخطاء، مع الاستفادة أيضاً من إكمال تلقائي IDE.<br><br> - [تكوين TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **إعداد مبسط**<br><br>ابدأ بسرعة مع الحد الأدنى من الإعدادات. اضبط الإعدادات للدولية والتوجيه والذكاء الاصطناعي والبناء والمحتوى بسهولة. <br><br> - [استكشف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **استرجاع المحتوى المبسط**<br><br>لا حاجة لاستدعاء دالة `t` الخاصة بك لكل جزء من المحتوى. استرجع كل المحتوى الخاص بك مباشرة باستخدام hook واحد.<br><br> - [تكامل React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **تطبيق مكون الخادم المتسق**<br><br>مناسب تماماً لمكونات خادم Next.js، استخدم نفس التطبيق لكل من مكونات العميل والخادم، لا حاجة لتمرير دالة `t` عبر كل مكون خادم. <br><br> - [مكونات الخادم](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **قاعدة أكواد منظمة**<br><br>حافظ على قاعدة الأكواد الخاصة بك منظمة أكثر: 1 مكون = 1 قاموس في نفس المجلد. الترجمات القريبة من مكوناتها الخاصة تحسن الصيانة والوضوح. <br><br> - [كيف يعمل Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **التوجيه المحسّن**<br><br>دعم كامل لتوجيه التطبيق، والتكيف بسلاسة مع الهياكل المعقدة للتطبيق، لـ Next.js و React و Vite و Vue.js وغيرها.<br><br> - [استكشف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **دعم Markdown**<br><br>استيراد وتفسير ملفات اللغة والمحتوى البعيد Markdown للمحتوى متعدد اللغات مثل سياسات الخصوصية والتوثيق وغيرها. فسّر واجعل بيانات وصف Markdown متاحة في الكود الخاص بك.<br><br> - [ملفات المحتوى](https://intlayer.org/doc/concept/content/file)                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **محرر مرئي مجاني وCMS**<br><br>محرر مرئي مجاني وCMS متاحان لكتاب المحتوى، مما يزيل الحاجة إلى منصة توطين. حافظ على تزامن المحتوى باستخدام Git، أو قم بإضفاء الطابع الخارجي عليه بشكل كامل أو جزئي مع CMS.<br><br> - [محرر Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **محتوى قابل للاستبدال**<br><br>محتوى قابل للاستبدال، مما يقلل من حجم الحزمة النهائية. تحميل المحتوى لكل مكون، مع استبعاد أي محتوى غير مستخدم من الحزمة الخاصة بك. يدعم التحميل البطيء لتحسين كفاءة تحميل التطبيق. <br><br> - [تحسين بناء التطبيق](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **العرض الثابت**<br><br>لا يمنع العرض الثابت. <br><br> - [تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **الترجمة المدعومة بالذكاء الاصطناعي**<br><br>حوّل موقعك الإلكتروني إلى 231 لغة بنقرة واحدة باستخدام أدوات الترجمة المتقدمة المدعومة بالذكاء الاصطناعي من Intlayer باستخدام مفتاح API/موفر الذكاء الاصطناعي الخاص بك. <br><br> - [تكامل CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [الملء التلقائي](https://intlayer.org/doc/concept/auto-fill) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **تكامل خادم MCP**<br><br>يوفر خادم MCP (Model Context Protocol) لأتمتة IDE، مما يتيح إدارة محتوى وسير عمل i18n بسلاسة مباشرة في بيئة التطوير الخاصة بك. <br><br> - [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **امتداد VSCode**<br><br>يوفر Intlayer امتداد VSCode لمساعدتك في إدارة المحتوى والترجمات وبناء القواميس وترجمة المحتوى والمزيد. <br><br> - [امتداد VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **التشغيل المتبادل**<br><br>يسمح بالتشغيل المتبادل مع react-i18next و next-i18next و next-intl و react-intl. <br><br> - [Intlayer و react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer و next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer و next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                            |
| اختبار الترجمات المفقودة (CLI/CI)                                                                                         | ✅ CLI: npx intlayer content test (CI-friendly audit)                                                                                                                                                                                                                                                                                                                                                                  |

## مقارنة Intlayer مع الحلول الأخرى

| الميزة                                        | `intlayer`                                                                                                                          | `react-i18next`                                                                              | `react-intl` (FormatJS)                                                                                         | `lingui`                                                  | `next-intl`                                                                                  | `next-i18next`                                                                               | `vue-i18n`                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **الترجمات بالقرب من المكونات**               | ✅ نعم، المحتوى متجاور مع كل مكون                                                                                                   | ❌ لا                                                                                        | ❌ لا                                                                                                           | ❌ لا                                                     | ❌ لا                                                                                        | ❌ لا                                                                                        | ✅ نعم - باستخدام `Single File Components` (SFCs)                  |
| **تكامل TypeScript**                          | ✅ متقدم، أنواع صارمة تم إنشاؤها تلقائياً                                                                                           | ⚠️ أساسي؛ إعدادات إضافية للأمان                                                              | ✅ جيد، لكن أقل صرامة                                                                                           | ⚠️ الأنواع، يحتاج إعدادات                                 | ✅ جيد                                                                                       | ⚠️ أساسي                                                                                     | ✅ جيد (الأنواع متاحة؛ سلامة المفاتيح تحتاج إعدادات)               |
| **كشف الترجمات المفقودة**                     | ✅ خطأ TypeScript وتحذير/خطأ وقت البناء                                                                                             | ⚠️ في الغالب سلاسل احتياطية في وقت التشغيل                                                   | ⚠️ سلاسل احتياطية                                                                                               | ⚠️ يحتاج إعدادات إضافية                                   | ⚠️ احتياطي في وقت التشغيل                                                                    | ⚠️ احتياطي في وقت التشغيل                                                                    | ⚠️ احتياطي/تحذيرات في وقت التشغيل (قابلة للتكوين)                  |
| **المحتوى الغني (JSX/Markdown/المكونات)**     | ✅ دعم مباشر                                                                                                                        | ⚠️ محدود / الاستيفاء فقط                                                                     | ⚠️ بناء جملة ICU، ليس JSX حقيقي                                                                                 | ⚠️ محدود                                                  | ❌ غير مصمم للعقد الغنية                                                                     | ⚠️ محدود                                                                                     | ⚠️ محدود (المكونات عبر `<i18n-t>`، Markdown عبر المكونات الإضافية) |
| **الترجمة المدعومة بالذكاء الاصطناعي**        | ✅ نعم، يدعم موفرين ذكاء اصطناعي متعددين. قابل للاستخدام باستخدام مفاتيح API الخاصة بك. يأخذ في الاعتبار سياق التطبيق ونطاق المحتوى | ❌ لا                                                                                        | ❌ لا                                                                                                           | ❌ لا                                                     | ❌ لا                                                                                        | ❌ لا                                                                                        | ❌ لا                                                              |
| **محرر مرئي**                                 | ✅ نعم، محرر مرئي محلي + CMS اختياري؛ يمكن تخارج محتوى codebase؛ قابل للتضمين                                                       | ❌ لا / متاح عبر منصات التوطين الخارجية                                                      | ❌ لا / متاح عبر منصات التوطين الخارجية                                                                         | ❌ لا / متاح عبر منصات التوطين الخارجية                   | ❌ لا / متاح عبر منصات التوطين الخارجية                                                      | ❌ لا / متاح عبر منصات التوطين الخارجية                                                      | ❌ لا / متاح عبر منصات التوطين الخارجية                            |
| **التوجيه المترجم**                           | ✅ نعم، يدعم المسارات المترجمة في الوقت الفعلي (يعمل مع Next.js و Vite)                                                             | ⚠️ لا يوجد دعم مدمج، يتطلب مكونات إضافية (مثل `next-i18next`) أو إعدادات موجه مخصصة          | ❌ لا، فقط تنسيق الرسالة، يجب أن يكون التوجيه يدوياً                                                            | ⚠️ لا يوجد دعم مدمج، يتطلب مكونات إضافية أو إعدادات يدوية | ✅ مدمج، App Router يدعم قطاع `[locale]`                                                     | ✅ مدمج                                                                                      | ✅ مدمج                                                            |
| **توليد المسار الديناميكي**                   | ✅ نعم                                                                                                                              | ⚠️ مكون إضافي/نظام بيئي أو إعدادات يدوية                                                     | ❌ غير مقدم                                                                                                     | ⚠️ مكون إضافي/يدوي                                        | ✅ نعم                                                                                       | ✅ نعم                                                                                       | ❌ غير مقدم (Nuxt i18n يوفره)                                      |
| **الجمع بين الكلمات**                         | ✅ أنماط قائمة على التعداد                                                                                                          | ✅ قابلة للتكوين (مكونات إضافية مثل i18next-icu)                                             | ✅ (ICU)                                                                                                        | ✅ (ICU/messageformat)                                    | ✅ جيد                                                                                       | ✅ جيد                                                                                       | ✅ قواعد جمع مدمجة                                                 |
| **التنسيق (التواريخ والأرقام والعملات)**      | ✅ منسقات محسّنة (Intl تحت الغطاء)                                                                                                  | ⚠️ عبر مكونات إضافية أو استخدام Intl مخصص                                                    | ✅ منسقات ICU                                                                                                   | ✅ مساعدات ICU/CLI                                        | ✅ جيد (مساعدات Intl)                                                                        | ✅ جيد (مساعدات Intl)                                                                        | ✅ منسقات التاريخ/الرقم المدمجة (Intl)                             |
| **صيغة المحتوى**                              | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                    | ⚠️ .json                                                                                     | ✅ .json, .js                                                                                                   | ⚠️ .po, .json                                             | ✅ .json, .js, .ts                                                                           | ⚠️ .json                                                                                     | ✅ .json, .js                                                      |
| **دعم ICU**                                   | ⚠️ قيد الإنجاز                                                                                                                      | ⚠️ عبر مكون إضافي (i18next-icu)                                                              | ✅ نعم                                                                                                          | ✅ نعم                                                    | ✅ نعم                                                                                       | ⚠️ عبر مكون إضافي (`i18next-icu`)                                                            | ⚠️ عبر منسق/محول مخصص                                              |
| **مساعدات SEO (hreflang وخريطة الموقع)**      | ✅ أدوات مدمجة: مساعدات لخريطة الموقع وrobots.txt والبيانات الوصفية                                                                 | ⚠️ مكونات إضافية/يدوية المجتمع                                                               | ❌ ليس أساسياً                                                                                                  | ❌ ليس أساسياً                                            | ✅ جيد                                                                                       | ✅ جيد                                                                                       | ❌ ليس أساسياً (Nuxt i18n يوفر مساعدات)                            |
| **النظام البيئي / المجتمع**                   | ⚠️ أصغر ولكن ينمو بسرعة واستجابة                                                                                                    | ✅ الأكبر والأكثر نضجاً                                                                      | ✅ كبير                                                                                                         | ⚠️ أصغر                                                   | ✅ متوسط، يركز على Next.js                                                                   | ✅ متوسط، يركز على Next.js                                                                   | ✅ كبير في نظام Vue البيئي                                         |
| **العرض من جانب الخادم ومكونات الخادم**       | ✅ نعم، مبسط لـ SSR / React Server Components                                                                                       | ⚠️ مدعوم على مستوى الصفحة ولكن يحتاج إلى تمرير دوال t على شجرة المكونات لمكونات خادم الأطفال | ⚠️ مدعوم على مستوى الصفحة مع إعدادات إضافية، ولكن يحتاج إلى تمرير دوال t على شجرة المكونات لمكونات خادم الأطفال | ✅ مدعوم، إعدادات مطلوبة                                  | ⚠️ مدعوم على مستوى الصفحة ولكن يحتاج إلى تمرير دوال t على شجرة المكونات لمكونات خادم الأطفال | ⚠️ مدعوم على مستوى الصفحة ولكن يحتاج إلى تمرير دوال t على شجرة المكونات لمكونات خادم الأطفال | ✅ SSR عبر Nuxt/Vue SSR (لا يوجد RSC)                              |
| **Tree-shaking (تحميل المحتوى المستخدم فقط)** | ✅ نعم، لكل مكون في وقت البناء عبر مكونات Babel/SWC إضافية                                                                          | ⚠️ عادة ما يحمل الكل (يمكن تحسينه باستخدام namespaces/code-splitting)                        | ⚠️ عادة ما يحمل الكل                                                                                            | ❌ ليس الافتراضي                                          | ⚠️ جزئي                                                                                      | ⚠️ جزئي                                                                                      | ⚠️ جزئي (مع code-splitting/إعدادات يدوية)                          |
| **التحميل الكسول**                            | ✅ نعم، لكل locale / لكل قاموس                                                                                                      | ✅ نعم (مثل backends/namespaces عند الطلب)                                                   | ✅ نعم (تقسيم حزم locale)                                                                                       | ✅ نعم (استيراد فهرس ديناميكي)                            | ✅ نعم (لكل مسار/لكل locale)، يحتاج إدارة mamespace                                          | ✅ نعم (لكل مسار/لكل locale)، يحتاج إدارة mamespace                                          | ✅ نعم (رسائل locale غير متزامنة)                                  |
| **تنظيف المحتوى المستخدم**                    | ✅ نعم، لكل قاموس في وقت البناء                                                                                                     | ❌ لا، فقط عبر تجزئة namespace يدوية                                                         | ❌ لا، يتم تجميع جميع الرسائل المعلنة                                                                           | ✅ نعم، تم كشف المفاتيح غير المستخدمة وإسقاطها في البناء  | ❌ لا، يمكن إدارتها يدوياً باستخدام إدارة namespace                                          | ❌ لا، يمكن إدارتها يدوياً باستخدام إدارة namespace                                          | ❌ لا، ممكن فقط عبر التحميل الكسول اليدوي                          |
| **إدارة المشاريع الكبيرة**                    | ✅ تشجع المعيارية، مناسب لـ design-system                                                                                           | ⚠️ يحتاج انضباط ملفات جيد                                                                    | ⚠️ يمكن أن تصبح الفهارس المركزية كبيرة                                                                          | ⚠️ قد تصبح معقدة                                          | ✅ معيارية مع الإعدادات                                                                      | ✅ معيارية مع الإعدادات                                                                      | ✅ معيارية مع إعدادات Vue Router/Nuxt i18n                         |

## نجوم GitHub

تعد نجوم GitHub مؤشرًا قويًا على شعبية المشروع وثقة المجتمع وأهميته على المدى الطويل. على الرغم من أنها ليست مقياسًا مباشرًا للجودة التقنية، إلا أنها تعكس عدد المطورين الذين يجدون المشروع مفيدًا ويتابعون تقدمه ومن المحتمل أن يتبنوه. لتقدير قيمة المشروع، تساعد النجوم في مقارنة الجاذبية عبر البدائل وتوفر رؤى حول نمو النظام البيئي.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## التوافق التشغيلي

يمكن لـ `intlayer` أيضًا المساعدة في إدارة مساحات الأسماء الخاصة بـ `react-intl` و `react-i18next` و `next-intl` و `next-i18next` و `vue-i18n`.

باستخدام `intlayer`، يمكنك التصريح عن المحتوى الخاص بك بتنسيق مكتبة i18n المفضلة لديك، وسيقوم intlayer بإنشاء مساحات الأسماء الخاصة بك في الموقع الذي تختاره (مثال: `/messages/{{locale}}/{{namespace}}.json`).
