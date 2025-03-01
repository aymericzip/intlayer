# Intlayer: طريقة أقرب لترجمة تطبيقك

**Intlayer** هي مكتبة للتدويل مصممة خصيصًا لمطوري JavaScript. تتيح لك إعلان المحتوى الخاص بك في أي مكان في الكود الخاص بك. تقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منظمة لتتكامل بسهولة في الكود الخاص بك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

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
      ar: "مرحبا بالعالم",
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
      ar: "مرحبا بالعالم",
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
      ar: "مرحبا بالعالم",
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

- **إدارة محتوى مدعومة بـ JavaScript**: استغل مرونة JavaScript لتعريف وإدارة المحتوى الخاص بك بكفاءة.
- **بيئة آمنة النوع**: استفد من TypeScript لضمان أن جميع تعريفات المحتوى دقيقة وخالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك بالقرب من مكوناتها ذات الصلة، مما يعزز القابلية للصيانة والوضوح.
- **إعداد مبسط**: ابدأ بسرعة مع الحد الأدنى من التكوين، خاصةً الأمثل لمشاريع Next.js.
- **دعم مكونات الخادم**: مناسب تمامًا لمكونات خادم Next.js، مما يضمن عرضًا سلسًا من جانب الخادم.
- **تحسين التوجيه**: دعم كامل لتوجيه تطبيق Next.js، يتكيف بسلاسة مع هياكل التطبيقات المعقدة.
- **التشغيل البيني**: يسمح بالتشغيل البيني مع [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_react-i18next.md)، [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_next-i18next.md)، [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_next-intl.md)، و [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_react-intl.md).
