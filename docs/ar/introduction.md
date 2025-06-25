---
docName: introduction
url: /doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: مقدمة
description: اكتشف كيف يعمل Intlayer. اطلع على الخطوات المستخدمة من قبل Intlayer في تطبيقك. انظر ماذا تفعل الحزم المختلفة.
keywords:
  - مقدمة
  - ابدأ
  - Intlayer
  - تطبيق
  - حزم
---

# Intlayer وثائق

مرحبًا بكم في الوثائق الرسمية لـ Intlayer! هنا، ستجد كل ما تحتاجه لتكامل، تكوين، وإتقان Intlayer لجميع احتياجاتك في التدويل (i18n)، سواء كنت تعمل مع Next.js، React، Vite، Express، أو بيئة JavaScript أخرى.

## المقدمة

### ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل مصممة خصيصًا لمطوري JavaScript. يتيح لك إعلان المحتوى الخاص بك في أي مكان في الكود الخاص بك. يقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منظمة لتتكامل بسهولة في الكود الخاص بك. باستخدام TypeScript، يجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

يوفر Intlayer أيضًا محررًا بصريًا اختياريًا يتيح لك تحرير وإدارة المحتوى الخاص بك بسهولة. هذا المحرر مفيد بشكل خاص للمطورين الذين يفضلون واجهة بصرية لإدارة المحتوى، أو للفرق التي تنشئ المحتوى دون الحاجة إلى القلق بشأن الكود.

### مثال على الاستخدام

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

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحبًا بالعالم",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحبًا بالعالم",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحبًا بالعالم",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ar": "مرحبًا بالعالم"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## الميزات الرئيسية

يقدم Intlayer مجموعة متنوعة من الميزات المصممة لتلبية احتياجات تطوير الويب الحديث. فيما يلي الميزات الرئيسية، مع روابط إلى وثائق مفصلة لكل منها:

- **دعم التدويل**: عزز الوصول العالمي لتطبيقك مع دعم مدمج للتدويل.
- **محرر بصري**: حسن سير العمل الخاص بك مع إضافات المحرر المصممة لـ Intlayer. تحقق من [دليل المحرر البصري](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md).
- **مرونة التكوين**: قم بتخصيص الإعداد الخاص بك مع خيارات التكوين الشاملة المفصلة في [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).
- **أدوات CLI المتقدمة**: قم بإدارة مشاريعك بكفاءة باستخدام واجهة سطر الأوامر الخاصة بـ Intlayer. استكشف الإمكانيات في [وثائق أدوات CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

## المفاهيم الأساسية

### القاموس

نظم المحتوى متعدد اللغات الخاص بك بالقرب من الكود الخاص بك للحفاظ على كل شيء متسقًا وقابلًا للصيانة.

- **[ابدأ](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)**  
  تعرف على أساسيات إعلان المحتوى في Intlayer.

- **[الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/translation.md)**  
  فهم كيفية إنشاء الترجمات وتخزينها واستخدامها في تطبيقك.

- **[التعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/enumeration.md)**  
  إدارة مجموعات البيانات المتكررة أو الثابتة بسهولة عبر لغات مختلفة.

- **[جلب الوظائف](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/function_fetching.md)**  
  تعرف على كيفية جلب المحتوى ديناميكيًا باستخدام منطق مخصص ليتناسب مع سير عمل مشروعك.

### البيئات والتكاملات

تم تصميم Intlayer مع مراعاة المرونة، مما يوفر تكاملًا سلسًا عبر الأطر الشائعة وأدوات البناء:

- **[Intlayer مع Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)**
- **[Intlayer مع Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md)**
- **[Intlayer مع Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md)**
- **[Intlayer مع React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)**
- **[Intlayer مع Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md)**
- **[Intlayer مع Express](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_express.md)**

يتضمن كل دليل تكامل أفضل الممارسات لاستخدام ميزات Intlayer, مثل **التقديم من جانب الخادم**، **التوجيه الديناميكي**، أو **التقديم من جانب العميل**, لذلك يمكنك الحفاظ على تطبيق سريع، صديق لمحركات البحث، وقابل للتوسع بشكل كبير.

## المساهمة والتغذية الراجعة

نحن نقدر قوة المصادر المفتوحة والتطوير القائم على المجتمع. إذا كنت ترغب في اقتراح تحسينات، إضافة دليل جديد، أو تصحيح أي مشكلات في وثائقنا، فلا تتردد في تقديم طلب سحب أو فتح مشكلة في [مستودع GitHub الخاص بنا](https://github.com/aymericzip/intlayer/blob/main/docs).

**هل أنت مستعد لترجمة تطبيقك بشكل أسرع وأكثر كفاءة؟** استعرض وثائقنا لبدء استخدام Intlayer اليوم. جرب نهجًا قويًا ومبسطًا للتدويل يحافظ على تنظيم المحتوى الخاص بك ويجعل فريقك أكثر إنتاجية.

ترجمة سعيدة!
