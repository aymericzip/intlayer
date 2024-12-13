# Intlayer: طريقة أقرب لترجمة تطبيقك

**Intlayer** هي مكتبة دولية مصممة خصيصًا لمطوري JavaScript. تسمح بتصريح المحتوى الخاص بك في كل مكان في شفرتك. تقوم بتحويل تصاريح المحتوى متعدد اللغات إلى قواميس منظمة لتتكامل بسهولة في شفرتك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

## مثال على الاستخدام

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحبا بالعالم", // ترجمة إلى العربية
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## لماذا تختار Intlayer؟

- **إدارة محتوى مدعومة من JavaScript**: استغل مرونة JavaScript لتعريف وإدارة محتواك بكفاءة.
- **بيئة آمنة من النوع**: استخدم TypeScript لضمان دقة جميع تعريفات المحتوى الخاصة بك وخلوها من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك بالقرب من مكوناتها، مما يعزز القابلية للصيانة والوضوح.
- **إعداد مبسط**: ابدأ بسرعة مع تكوين بسيط للغاية، مصمم خصيصًا لمشاريع Next.js.
- **دعم مكونات الخادم**: مناسب تمامًا لمكونات خادم Next.js، مما يضمن عملية التقديم من جانب الخادم بسلاسة.
- **التوجيه المعزز**: دعم كامل لتوجيه تطبيقات Next.js، مما يتكيف بسلاسة مع هياكل التطبيقات المعقدة.
- **التوافقية**: يسمح بالتوافق مع i18next. (نسخة تجريبية)
