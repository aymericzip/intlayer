---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: أهمية Intlayer
description: اكتشف فوائد ومزايا استخدام Intlayer في مشاريعك. افهم لماذا يتميز Intlayer بين الأُطُر الأخرى.
keywords:
  - فوائد
  - مزايا
  - Intlayer
  - إطار عمل
  - مقارنة
---

# Intlayer: طريقة مخصصة لترجمة موقعك الإلكتروني

**Intlayer** هي مكتبة تعريب مصممة خصيصًا لمطوري جافاسكريبت. تتيح لك إعلان المحتوى الخاص بك في كل مكان داخل الكود الخاص بك. تقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منظمة لتسهيل دمجها في الكود الخاص بك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

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
// محتوى مثال المكون
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
// محتوى مثال المكون
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

// مثال لمكون يستخدم intlayer لجلب المحتوى المترجم
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

| الميزة                                  | الوصف                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **إدارة المحتوى المدعومة بجافا سكريبت** | استغل مرونة جافا سكريبت لتعريف وإدارة المحتوى الخاص بك بكفاءة.                                                                                                                                                                                                                                                                                                                                                                                                        |
| **بيئة آمنة من حيث النوع**              | استغل قوة TypeScript لضمان أن جميع تعريفات المحتوى الخاصة بك دقيقة وخالية من الأخطاء.                                                                                                                                                                                                                                                                                                                                                                                 |
| **ملفات المحتوى المتكاملة**             | احتفظ بترجماتك قريبة من مكوناتها الخاصة، مما يعزز سهولة الصيانة والوضوح.                                                                                                                                                                                                                                                                                                                                                                                              |
| **إعداد مبسط**                          | ابدأ بسرعة مع أقل إعداد ممكن، مُحسّن بشكل خاص لمشاريع Next.js.                                                                                                                                                                                                                                                                                                                                                                                                        |
| **دعم مكونات الخادم**                   | مناسب تمامًا لمكونات خادم Next.js، مما يضمن عرضًا سلسًا على جانب الخادم.                                                                                                                                                                                                                                                                                                                                                                                              |
| **التوجيه المحسن**                      | دعم كامل لتوجيه تطبيق Next.js، يتكيف بسلاسة مع هياكل التطبيقات المعقدة.                                                                                                                                                                                                                                                                                                                                                                                               |
| **قاعدة شفرة منظمة**                    | حافظ على تنظيم قاعدة الشفرة الخاصة بك بشكل أفضل: مكون واحد = قاموس واحد في نفس المجلد.                                                                                                                                                                                                                                                                                                                                                                                |
| **الترجمة التلقائية في CI**             | املأ ترجماتك تلقائيًا في CI باستخدام مفتاح API الخاص بـ OpenAI، مما يلغي الحاجة إلى منصة L10n.                                                                                                                                                                                                                                                                                                                                                                        |
| **تكامل خادم MCP**                      | يوفر خادم MCP (بروتوكول سياق النموذج) لأتمتة بيئة التطوير المتكاملة (IDE)، مما يتيح إدارة المحتوى بسلاسة وسير عمل التدويل (i18n) مباشرة داخل بيئة التطوير الخاصة بك. [تعرف على المزيد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md).                                                                                                                                                                                                  |
| **دعم لغة ماركداون**                    | استيراد وتفسير ملفات ماركداون للمحتوى متعدد اللغات مثل سياسات الخصوصية.                                                                                                                                                                                                                                                                                                                                                                                               |
| **محرر بصري مجاني ونظام إدارة محتوى**   | يتوفر محرر بصري مجاني ونظام إدارة محتوى إذا كنت بحاجة إلى العمل مع كتّاب المحتوى لترجماتك، مما يلغي الحاجة إلى منصة تعريب ويسمح بفصل المحتوى عن قاعدة الشيفرة.                                                                                                                                                                                                                                                                                                        |
| **استرجاع المحتوى المبسط**              | لا حاجة لاستدعاء دالة `t` لكل قطعة محتوى؛ يمكنك استرجاع كل المحتوى الخاص بك مباشرة باستخدام هوك واحد فقط.                                                                                                                                                                                                                                                                                                                                                             |
| **تنفيذ متسق**                          | نفس التنفيذ لكل من مكونات العميل والخادم، لا حاجة لتمرير دالة `t` الخاصة بك عبر كل مكون خادم.                                                                                                                                                                                                                                                                                                                                                                         |
| **محتوى قابل للتقليل الشجري**           | المحتوى قابل للتقليل الشجري، مما يخفف من حجم الحزمة النهائية.                                                                                                                                                                                                                                                                                                                                                                                                         |
| **العرض الثابت غير المعوق**             | لا يقوم Intlayer بحجب العرض الثابت كما يفعل `next-intl`.                                                                                                                                                                                                                                                                                                                                                                                                              |
| **التشغيل البيني**                      | يسمح بالتشغيل البيني مع [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react-i18next.md)، [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_next-i18next.md)، [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_next-intl.md)، و [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react-intl.md). |

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
