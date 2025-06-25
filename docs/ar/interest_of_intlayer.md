---
docName: interest_of_intlayer
url: /doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2024-08-14
title: اهتمام لبرنامج Intlayer
description: اكتشف مزايا وفوائد استخدام Intlayer في مشاريعك. افهم لماذا يتفوق Intlayer بين الأطر الأخرى.
keywords:
  - فوائد
  - إيجابيات
  - Intlayer
  - إطار العمل
  - مقارنة
---

# Intlayer: طريقة مخصصة لترجمة موقعك

**Intlayer** هي مكتبة دولية مصممة خصيصًا لمطوري JavaScript. تتيح إعلان المحتوى الخاص بك في كل مكان في الكود الخاص بك. تحول إعلان المحتوى متعدد اللغات إلى قواميس منظمة للتكامل بسهولة في الكود الخاص بك. باستخدام TypeScript، يجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

## مثال على الاستخدام

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

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

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## لماذا تختار Intlayer؟

- **إدارة المحتوى بواسطة JavaScript**: استفد من مرونة JavaScript لتعريف وإدارة المحتوى الخاص بك بكفاءة.
- **بيئة آمنة للنوع**: استفد من TypeScript لضمان دقة جميع تعريفات المحتوى الخاصة بك وخالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك بالقرب من مكوناتها المعنية، مما يعزز قابلية الصيانة والوضوح.
- **إعداد مبسط**: ابدأ العمل بسرعة مع الحد الأدنى من التكوين، محسّن بشكل خاص لمشاريع Next.js.
- **دعم مكونات الخادم**: مناسب تمامًا لمكونات خادم Next.js، مما يضمن عرضًا سلسًا من جانب الخادم.
- **توجيه محسن**: دعم كامل لتوجيه تطبيق Next.js، يتكيف بسلاسة مع هياكل التطبيقات المعقدة.
- **قاعدة كود منظمة**: حافظ على قاعدة الكود الخاصة بك أكثر تنظيماً: 1 مكون = 1 قاموس في نفس المجلد.
- **أنواع TypeScript التلقائية**: يتم تنفيذ أنواع TypeScript تلقائيًا، مما يمنع كسر الكود من المفاتيح المعاد تسميتها أو المحذوفة.
- **الترجمة التلقائية في CI**: املأ ترجماتك تلقائيا في CI باستخدام مفتاح OpenAI API الخاص بك، مما يلغي الحاجة لمنصة L10n.
- **تكامل خادم MCP**: يوفر خادم MCP (Model Context Protocol) لأتمتة IDE، مما يتيح إدارة المحتوى وسير عمل i18n بسلاسة مباشرة داخل بيئة التطوير الخاصة بك. [تعلم أكثر](https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md).
- **دعم Markdown**: استيراد وتفسير ملفات markdown للمحتوى متعدد اللغات مثل سياسات الخصوصية.
- **محرر مرئي و CMS مجاني**: يتوفر محرر مرئي و CMS مجاني إذا كنت بحاجة إلى العمل مع كتاب المحتوى لترجماتك، مما يلغي مرة أخرى الحاجة إلى منصة توطين ويسمح بتخارج المحتوى من قاعدة الكود.
- **استرجاع محتوى مبسط**: لا حاجة لاستدعاء دالة `t` الخاصة بك لكل جزء من المحتوى؛ استرجع كل المحتوى الخاص بك مباشرة باستخدام خطاف واحد.
- **تنفيذ متسق**: نفس التنفيذ لكل من مكونات العميل والخادم، لا حاجة لتمرير دالة `t` الخاصة بك عبر كل مكون خادم.
- **محتوى قابل للهز**: المحتوى قابل للهز، مما يخفف الحزمة النهائية.
- **عرض ثابت غير محظور**: لا يحظر Intlayer العرض الثابت كما يفعل `next-intl`.
- **التشغيل البيني**: السماح بالتشغيل البيني مع [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-i18next.md)، [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-i18next.md)، [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-intl.md)، و [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-intl.md).
