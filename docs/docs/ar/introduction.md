---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: مقدمة
description: اكتشف كيف يعمل Intlayer. شاهد الخطوات التي يستخدمها Intlayer في تطبيقك. تعرف على ما تفعله الحزم المختلفة.
keywords:
  - مقدمة
  - البدء
  - Intlayer
  - تطبيق
  - حزم
slugs:
  - doc
  - get-started
---

# توثيق Intlayer

مرحبًا بك في التوثيق الرسمي لـ Intlayer! هنا، ستجد كل ما تحتاجه لدمج وتكوين وإتقان Intlayer لجميع احتياجات التدويل (i18n) الخاصة بك، سواء كنت تعمل مع Next.js أو React أو Vite أو Express أو بيئة جافاسكريبت أخرى.

## مقدمة

### ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل مصممة خصيصًا لمطوري جافاسكريبت. تتيح لك الإعلان عن المحتوى الخاص بك في أي مكان داخل الكود الخاص بك. تقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منظمة لتسهيل دمجها في كودك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

كما توفر Intlayer محررًا بصريًا اختياريًا يتيح لك تحرير وإدارة المحتوى الخاص بك بسهولة. هذا المحرر مفيد بشكل خاص للمطورين الذين يفضلون واجهة بصرية لإدارة المحتوى، أو للفرق التي تقوم بإنشاء المحتوى دون الحاجة للقلق بشأن الكود.

### مثال على الاستخدام

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
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
        "es": "Hola Mundo"
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

يقدم Intlayer مجموعة متنوعة من الميزات المصممة لتلبية احتياجات تطوير الويب الحديث. فيما يلي الميزات الرئيسية، مع روابط إلى الوثائق التفصيلية لكل منها:

- **دعم التدويل**: عزز الوصول العالمي لتطبيقك من خلال دعم مدمج للتدويل.
- **المحرر المرئي**: حسّن سير عمل التطوير الخاص بك باستخدام إضافات المحرر المصممة لـ Intlayer. اطلع على [دليل المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).
- **مرونة التكوين**: قم بتخصيص إعداداتك باستخدام خيارات تكوين واسعة مفصلة في [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).
- **أدوات CLI المتقدمة**: قم بإدارة مشاريعك بكفاءة باستخدام واجهة سطر الأوامر الخاصة بـ Intlayer. استكشف الإمكانيات في [توثيق أدوات CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

## المفاهيم الأساسية

### القاموس

نظم محتواك متعدد اللغات بالقرب من الكود الخاص بك للحفاظ على كل شيء متسقًا وقابلًا للصيانة.

- **[البدء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)**  
  تعلّم أساسيات إعلان المحتوى الخاص بك في Intlayer.

- **[الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)**  
  افهم كيف يتم إنشاء الترجمات وتخزينها واستخدامها في تطبيقك.

- **[التعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md)**  
  قم بإدارة مجموعات البيانات المتكررة أو الثابتة بسهولة عبر لغات متعددة.

- **[الشرط](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/conditional.md)**  
  تعلّم كيفية استخدام المنطق الشرطي في Intlayer لإنشاء محتوى ديناميكي.

- **[الإدراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)**  
  اكتشف كيفية إدراج القيم في سلسلة نصية باستخدام عناصر نائبة للإدراج.

- **[جلب الدوال](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/function_fetching.md)**  
  تعرف على كيفية جلب المحتوى ديناميكيًا باستخدام منطق مخصص ليتناسب مع سير عمل مشروعك.

- **[ماركداون](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)**  
  تعلّم كيفية استخدام ماركداون في Intlayer لإنشاء محتوى غني.

- **[تضمين الملفات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/file_embeddings.md)**  
  اكتشف كيفية تضمين ملفات خارجية في Intlayer لاستخدامها في محرر المحتوى.

- **[التداخل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/nesting.md)**  
  فهم كيفية تداخل المحتوى في Intlayer لإنشاء هياكل معقدة.

### البيئات والتكاملات

لقد قمنا ببناء Intlayer مع وضع المرونة في الاعتبار، مقدمين تكاملًا سلسًا عبر الأُطُر وأدوات البناء الشائعة:

- **[Intlayer مع Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)**
- **[Intlayer مع Next.js 14 (موجه التطبيق)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_14.md)**
- **[Intlayer مع Next.js موجه الصفحات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_page_router.md)**
- **[Intlayer مع React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)**
- **[Intlayer مع Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)**
- **[Intlayer مع React Native و Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react_native+expo.md)**
- **[Intlayer مع Lynx و React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_lynx+react.md)**
- **[Intlayer مع Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_express.md)**

تتضمن كل دليل تكامل أفضل الممارسات لاستخدام ميزات Intlayer، مثل **التصيير على جانب الخادم**، **التوجيه الديناميكي**، أو **التصيير على جانب العميل**، حتى تتمكن من الحفاظ على تطبيق سريع، صديق لمحركات البحث، وقابل للتوسع بشكل كبير.

## المساهمة والتعليقات

نحن نقدر قوة البرمجيات مفتوحة المصدر والتطوير المدفوع من قبل المجتمع. إذا كنت ترغب في اقتراح تحسينات، إضافة دليل جديد، أو تصحيح أي مشاكل في وثائقنا، فلا تتردد في تقديم طلب سحب (Pull Request) أو فتح مشكلة في [مستودع GitHub الخاص بنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**هل أنت مستعد لترجمة تطبيقك بشكل أسرع وأكثر كفاءة؟** اغمر نفسك في وثائقنا لبدء استخدام Intlayer اليوم. اختبر نهجًا قويًا ومنظمًا للتدويل يحافظ على تنظيم محتواك ويجعل فريقك أكثر إنتاجية.

---

## تاريخ الوثائق

- 5.5.10 - 2025-06-29: بداية التاريخ
