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

<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

** الصيانة **

<Accordion header="قابلية الصيانة">

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

</Accordion>

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

</Accordion>

**ميزة**

يقدم Intlayer مجموعة من الميزات الإضافية التي لا تتوفر في حلول i18n الأخرى، مثل [دعم Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)، [جلب خارجي المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)، [تحميل محتوى الملف](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md)، [المحتوى المباشر تحديث](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/live.md)، [محرر مرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) والمزيد.

**الأتمتة**

<Accordion header="الأتمتة">

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

</Accordion>

**أداء**

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

</Accordion>

**التحجيم مع عدم وجود مطور**

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

</Accordion>

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
   - يمكن إنشاء ملفات `.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` باستخدام امتداد VSCode
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

| Feature                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **دعم الأطر المتقاطعة**<br><br>Intlayer متوافق مع جميع الأطر والمكتبات الرئيسية، بما في ذلك Next.js و React و Vite و Vue.js و Nuxt و Preact و Express والمزيد.                                                                                                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **إدارة المحتوى المدعومة بـ JavaScript**<br><br>استفد من مرونة JavaScript لتحديد وإدارة المحتوى الخاص بك بكفاءة. <br><br> - [إعلان المحتوى](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **المترجم**<br><br>يستخرج مترجم Intlayer المحتوى تلقائياً من المكونات وينشئ ملفات القاموس.<br><br> - [المترجم](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ملف إعلان المحتوى لكل لغة**<br><br>سرّع التطوير الخاص بك بإعلان المحتوى مرة واحدة، قبل الإنشاء التلقائي.<br><br> - [ملف إعلان المحتوى لكل لغة](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **بيئة آمنة من حيث النوع**<br><br>استفد من TypeScript لضمان خلو تعريفات المحتوى والكود من الأخطاء، مع الاستفادة أيضاً من إكمال تلقائي IDE.<br><br> - [تكوين TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **إعداد مبسط**<br><br>ابدأ بسرعة مع الحد الأدنى من الإعدادات. اضبط الإعدادات للدولية والتوجيه والذكاء الاصطناعي والبناء والمحتوى بسهولة. <br><br> - [استكشف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **استرجاع المحتوى المبسط**<br><br>لا حاجة لاستدعاء دالة `t` الخاصة بك لكل جزء من المحتوى. استرجع كل المحتوى الخاص بك مباشرة باستخدام hook واحد.<br><br> - [تكامل React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **تطبيق مكون الخادم المتسق**<br><br>مناسب تماماً لمكونات خادم Next.js، استخدم نفس التطبيق لكل من مكونات العميل والخادم، لا حاجة لتمرير دالة `t` عبر كل مكون خادم. <br><br> - [مكونات الخادم](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **قاعدة أكواد منظمة**<br><br>حافظ على قاعدة الأكواد الخاصة بك منظمة أكثر: 1 مكون = 1 قاموس في نفس المجلد. الترجمات القريبة من مكوناتها الخاصة تحسن الصيانة والوضوح. <br><br> - [كيف يعمل Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **التوجيه المحسّن**<br><br>دعم كامل لتوجيه التطبيق، والتكيف بسلاسة مع الهياكل المعقدة للتطبيق، لـ Next.js و React و Vite و Vue.js وغيرها.<br><br> - [استكشف تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **دعم Markdown**<br><br>استيراد وتفسير ملفات اللغة والمحتوى البعيد Markdown للمحتوى متعدد اللغات مثل سياسات الخصوصية والتوثيق وغيرها. فسّر واجعل بيانات وصف Markdown متاحة في الكود الخاص بك.<br><br> - [ملفات المحتوى](https://intlayer.org/doc/concept/content/file)                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **محرر مرئي مجاني وCMS**<br><br>محرر مرئي مجاني وCMS متاحان لكتاب المحتوى، مما يزيل الحاجة إلى منصة توطين. حافظ على تزامن المحتوى باستخدام Git، أو قم بإضفاء الطابع الخارجي عليه بشكل كامل أو جزئي مع CMS.<br><br> - [محرر Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **محتوى قابل للاستبدال**<br><br>محتوى قابل للاستبدال، مما يقلل من حجم الحزمة النهائية. تحميل المحتوى لكل مكون، مع استبعاد أي محتوى غير مستخدم من الحزمة الخاصة بك. يدعم التحميل البطيء لتحسين كفاءة تحميل التطبيق. <br><br> - [تحسين بناء التطبيق](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **العرض الثابت**<br><br>لا يمنع العرض الثابت. <br><br> - [تكامل Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **الترجمة المدعومة بالذكاء الاصطناعي**<br><br>حوّل موقعك الإلكتروني إلى 231 لغة بنقرة واحدة باستخدام أدوات الترجمة المتقدمة المدعومة بالذكاء الاصطناعي من Intlayer باستخدام مفتاح API/موفر الذكاء الاصطناعي الخاص بك. <br><br> - [تكامل CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [الملء التلقائي](https://intlayer.org/doc/concept/auto-fill)                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **تكامل خادم MCP**<br><br>يوفر خادم MCP (Model Context Protocol) لأتمتة IDE، مما يتيح إدارة محتوى وسير عمل i18n بسلاسة مباشرة في بيئة التطوير الخاصة بك. <br><br> - [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)                                                                                                                                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **امتداد VSCode**<br><br>يوفر Intlayer امتداد VSCode لمساعدتك في إدارة المحتوى والترجمات وبناء القواميس وترجمة المحتوى والمزيد. <br><br> - [امتداد VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **التشغيل المتبادل**<br><br>يسمح بالتشغيل المتبادل مع react-i18next و next-i18next و next-intl و react-intl. <br><br> - [Intlayer و react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer و next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer و next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [محوّلات التوافق في Intlayer](https://intlayer.org/doc/compatibility) |
| اختبار الترجمات المفقودة (CLI/CI)                                                                                         | ✅ CLI: npx intlayer content test (CI-friendly audit)                                                                                                                                                                                                                                                                                                                                                                                                    |

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

إذا كنت ترغب في الاستمرار في استخدام واجهة برمجة التطبيقات الخاصة بمكتبة i18n الحالية لديك، فإن `intlayer` يوفر أيضًا **محوّلات التوافق (compat adapters)**: حزم تكشف نفس واجهة برمجة التطبيقات تمامًا مثل `react-i18next` و `next-intl` و `react-intl` و `vue-i18n` وغيرها، لكن يتم تزويدها بقواميس Intlayer. هذا يتيح لك الترحيل تدريجيًا دون إعادة كتابة الشيفرة الخاصة بك. راجع [توثيق محوّلات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md).

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات JavaScript؟">

تتعايش ثلاثة أجيال:

- **مكتبات كتالوجات وقت التشغيل**: `i18next`، `react-i18next`، `next-i18next`، `vue-i18n`، `ngx-translate`.
- **مكتبات رسائل وقت البناء**: `Lingui`، `Paraglide`، `react-intl`، و `next-intl`.
- **مكتبات طبقة المحتوى (Content layer)**: `Intlayer`. إعلان بجانب المكون، تصفية تلقائية، أنواع TypeScript، ترجمة بالذكاء الاصطناعي، ومحرر مرئي.

انظر المقارنة الكاملة في هذا الدليل.

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة (bundle) تطبيقي؟">

أقل بكثير من الإعدادات القائمة على فضاءات الأسماء، لأن الصفحة لا تُحمّل أبدًا كتالوجًا لا تعرضه. يُحل المحتوى المعروض على الخادم مباشرة على الخادم، ويستبدل مترجم وقت البناء استدعاءات `useIntlayer` بإدخالات القاموس الدقيقة التي يستخدمها المكون، لذلك يتم التخلص من المفاتيح واللغات غير المستخدمة. تقسم [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) الباقي حسب اللغة. مقارنة بالبدائل التقليدية، يقلل Intlayer حجم الحزمة والصفحة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يمكنني الترحيل من i18next أو next-intl أو react-i18next دون إعادة كتابة مكوناتي؟">

نعم، وبطريقتين. يمكنك ترحيل المحتوى تدريجيًا باستخدام [دليل ترحيل i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md) أو [دليل ترحيل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md). أو يمكنك الاحتفاظ بواجهة برمجة التطبيقات الحالية بالكامل: تكشف [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) نفس واجهات `i18next` و `react-i18next` و `next-intl` و `next-i18next` و `react-intl` و `use-intl` و `vue-i18n` و `Lingui`، ولكنها مدعومة بقواميس Intlayer، بحيث تتغير الاستيرادات فقط بينما يظل كود المكون كما هو.

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء على كود JSX و TSX و Vue و Svelte، منشئًا القواميس عند كل تغيير دون الحاجة إلى إدارة المفاتيح يدويًا.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="كيف يختلف Intlayer عن next-intl؟">

`next-intl` هي طبقة رسائل لـ Next.js تعتمد على ملفات JSON لكل لغة. يصرح Intlayer بالمحتوى مباشرة بجوار المكون، ويزيل الإدخالات غير المستخدمة في وقت البناء، وينشئ أنواع TypeScript صارمة لكل قاموس، ويوفر ترجمة مدمجة بالذكاء الاصطناعي ومحررًا مرئيًا.

</Question>

<Question title="كيف يختلف Intlayer عن i18next و react-i18next؟">

يحل `i18next` المفاتيح النصية في وقت التشغيل، مما يعني أن الخطأ الإملائي في اسم المفتاح يفشل بصمت ويعرض نصًا فارغًا. يفحص Intlayer المفاتيح بشكل ثابت أثناء الترجمة، ويستبعد اللغات غير المستخدمة من الحزمة، ويؤتمت سير عمل الترجمة.

</Question>

<Question title="هل Intlayer أسرع أو أخف من البدائل؟">

من حيث حجم الحزمة والصفحة، نعم: يؤدي عدم تحميل الكتالوجات التي لا تعرضها الصفحة إلى تقليل حجم الحزمة بنسبة تصل إلى 50%. من حيث أداء وقت التشغيل، تقضي الترجمة المسبقة على تكلفة التحليل في وقت التشغيل. انظر [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يستحق ترحيل تطبيق حالي؟">

يعتمد ذلك على القيود التي تواجهها. إذا كانت مشكلتك هي الحجم الكبير للحزمة، أو الترجمات المفقودة دون تحذير، أو صعوبة تحرير النصوص لغير المطورين، فإن Intlayer يحل ذلك؛ تسمح محولات التوافق بالترحيل التدريجي دون إعادة كتابة الكود.

</Question>

<Question title="ما الذي يقدمه Intlayer ولا تقدمه مكتبات i18n الأخرى؟">

دعم [محتوى Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)، جلب المحتوى من CMS، محرر مرئي متكامل، ترجمة تلقائية بالذكاء الاصطناعي باستخدام الخيار `--git-diff`، وإكمال تلقائي لـ TypeScript بناءً على تحليل المكون.

</Question>

<Question title="هل يمكنني استخدام Intlayer كمدير ترجمة فقط والاحتفاظ بمكتبتي الحالية؟">

نعم. يمكن لـ Intlayer إنشاء فضاءات أسماء بالتنسيق والموقع المتوقعين بواسطة مكتبتك الحالية (على سبيل المثال `/messages/{locale}/{namespace}.json`)، مما يتيح لك الاستمتاع بـ CLI ومحرر Intlayer دون تغيير كود تطبيقك.

</Question>

<Question title="هل Intlayer مفتوح المصدر ومجاني؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي هو خدمة مدفوعة اختيارية ويمكن أيضًا [استضافتها ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>
