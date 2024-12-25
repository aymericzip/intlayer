# وثائق Intlayer

مرحبًا بكم في وثائق Intlayer. يوفر هذا الدليل نظرة عامة على Intlayer وميزاته الرئيسية وكيفية استخدام هذه الوثائق بشكل فعال لتعزيز تجربة تطويرك.

## مقدمة

### ما هو Intlayer؟

**Intlayer** هو مكتبة دولية مصممة خصيصًا لمطوري JavaScript. يسمح لك بإعلان محتواك في كل مكان في الكود الخاص بك. يقوم بتحويل إعلان المحتوى متعدد اللغات إلى قواميس منسقة للتكامل بسهولة في كودك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أقوى وأكثر كفاءة.

كما توفر Intlayer محررًا بصريًا اختياريًا يسمح لك بسهولة تحرير وإدارة محتواك. هذا المحرر مفيد بشكل خاص للمطورين الذين يفضلون واجهة بصرية لإدارة المحتوى، أو للفرق التي تولد المحتوى دون الحاجة للقلق بشأن الكود.

## مثال على الاستخدام

```bash codeFormat="typescript"
.
└── Components
    └── myComponent
       ├── index.content.ts
       └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── myComponent
       ├── index.content.cjs
       └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── myComponent
       ├── index.content.mjs
       └── index.js
```

```tsx fileName="src/components/myComponent/myComponent.content.ts" contentDeclarationFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="src/components/myComponent/myComponent.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
// محتوى المكون
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

```javascript fileName="src/components/myComponent/myComponent.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
// محتوى المكون
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

```json fileName="src/components/myComponent/myComponent.content.json" contentDeclarationFormat="json"
{
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

```tsx fileName="src/components/myComponent/MyComponent.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/myComponent/MyComponent.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/myComponent/MyComponent.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### الميزات الرئيسية

تقدم Intlayer مجموعة متنوعة من الميزات المصممة لتلبية احتياجات تطوير الويب الحديث. أدناه الميزات الرئيسية، مع الروابط إلى الوثائق التفصيلية لكل منها:

- **دعم التدويل**: عزز الوصول العالمي لتطبيقك مع دعم مدمج للتدويل.
- **محرر بصري**: تحسين سير عمل تطويرك من خلال مكونات المحرر المصممة لـ Intlayer. اطّلع على [دليل المحرر البصري](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).
- **مرونة التكوين**: تخصيص إعدادك مع خيارات تكوين واسعة مفصلة في [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).
- **أدوات CLI متقدمة**: إدارة مشاريعك بكفاءة باستخدام واجهة سطر الأوامر الخاصة بـ Intlayer. استكشف الإمكانيات في [وثائق أدوات CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).
- **التوافق مع i18n**: تعمل Intlayer بسلاسة مع مكتبات التدويل الأخرى. تحقق من [دليل i18n](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_i18next.md) لمزيد من المعلومات.

### المنصات المدعومة

تم تصميم Intlayer للعمل بسلاسة مع تطبيقات Next.js وReact. كما أنها تدعم Vite وCreate React App.

- **تكامل Next.js**: استغل قوة Next.js داخل Intlayer من أجل تقديم الصفحات على الخادم وتوليد المواقع الثابتة. التفاصيل متاحة في [دليل تكامل Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).
- **تكامل Vite وReact**: استغل Vite داخل Intlayer من أجل تقديم الصفحات على الخادم وتوليد المواقع الثابتة. التفاصيل متاحة في [دليل تكامل Vite وReact](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md).
- **تكامل Create React App**: استغل قوة Create React App داخل Intlayer من أجل تقديم الصفحات على الخادم وتوليد المواقع الثابتة. التفاصيل متاحة في [دليل تكامل Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).

### كيفية استخدام هذه الوثائق

للحصول على أقصى استفادة من هذه الوثائق:

1. **انتقل إلى الأقسام ذات الصلة**: استخدم الروابط المقدمة أعلاه للانتقال مباشرة إلى الأقسام التي تلبي احتياجاتك.
2. **أمثلة تفاعلية**: حيثما كان ذلك ممكنًا، استفد من الأمثلة التفاعلية لرؤية كيفية عمل الميزات في الوقت الفعلي.
3. **التعليقات والمساهمات**: تعليقاتك ذات قيمة. إذا كان لديك اقتراحات أو تصحيحات، يرجى النظر في المساهمة في الوثائق.
