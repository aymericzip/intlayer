# Intlayer: طريقة أقرب لترجمة تطبيقك

**Intlayer** هي مكتبة دولية مصممة خصيصًا لمطوري JavaScript. تتيح لك إعلان المحتوى في كل مكان في كودك. تقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منظمة لتتكامل بسهولة في كودك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكفأ.

## مثال للاستخدام

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
import { type DeclarationContent, t } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

## لماذا اخترت Intlayer؟

- **إدارة محتوى مدعومة بواسطة JavaScript**: استغل مرونة JavaScript لتعريف وإدارة محتواك بكفاءة.
- **بيئة آمنة من النوع**: استغل TypeScript لضمان أن جميع تعريفات المحتوى لديك دقيقية وخالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك قريبة من مكوناتها الخاصة، مما يعزز القابلية للصيانة والوضوح.
- **إعداد مبسط**: ابدأ بسرعة مع الحد الأدنى من التكوين، وتم تحسينه بشكل خاص لمشاريع Next.js.
- **دعم مكونات الخادم**: مناسب تمامًا لمكونات خادم Next.js، مما يضمن تقديم سلس من جانب الخادم.
- **توجيه معزز**: دعم كامل لتوجيه تطبيق Next.js، متكيفًا بسلاسة مع الهياكل المعقدة للتطبيقات.
- **التشغيل البيني**: السماح بالتشغيل البيني مع i18next. (بيتا)
