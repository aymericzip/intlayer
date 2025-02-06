# react-intlayer: حزمة NPM لتدويل (i18n) تطبيق React

**Intlayer** هو مجموعة من الحزم مصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React و Express.js.

**حزمة `react-intlayer`** تتيح لك تدويل تطبيق React الخاص بك. إنها توفر موفري سياق ورفوف لتدويل React.

## لماذا تدول تطبيق React الخاص بك؟

تدويل تطبيق React الخاص بك أمر ضروري لخدمة جمهور عالمي بفعالية. يتيح لتطبيقك تقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر وصولًا وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## لماذا دمج Intlayer؟

- **إدارة محتوى مدعومة بواسطة JavaScript**: استخدم مرونة JavaScript لتعريف وإدارة المحتوى بكفاءة.
- **بيئة آمنة من النوع**: استغل TypeScript لضمان دقة وتعريفات المحتوى الخاصة بك خالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك بالقرب من مكوناتها، مما يعزز القابلية للصيانة والوضوح.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## مثال على الاستخدام

مع Intlayer، يمكنك إعلان محتواك بطريقة منظمة في أي مكان داخل قاعدة الشيفرة الخاصة بك.

بشكل افتراضي، يقوم Intlayer بمسح الملفات ذات الامتداد `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> يمكنك تعديل الامتداد الافتراضي عن طريق تعيين خاصية `contentDir` في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### أعلن عن محتواك

تم تصميم `react-intlayer` للعمل مع حزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). `intlayer` هي حزمة تسمح لك بإعلان محتواك في أي مكان في الشيفرة الخاصة بك. إنها تتحول إلى إعلانات محتوى متعددة اللغات إلى قواميس منظمة تندمج بسلاسة في تطبيقك.

إليك مثال على إعلان المحتوى:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### استخدم المحتوى في الشيفرة الخاصة بك

بمجرد أن تعلن عن محتواك، يمكنك استخدامه في الشيفرة الخاصة بك. إليك مثال على كيفية استخدام المحتوى في مكون React:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء إعلان محتوى ذي صلة

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء إعلان محتوى ذي صلة

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء إعلان محتوى ذي صلة

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## إتقان تدويل تطبيق React الخاص بك

يوفر Intlayer الكثير من الميزات لمساعدتك في تدويل تطبيق React الخاص بك.

**لتتعلم المزيد عن هذه الميزات، راجع [دليل تدويل React (i18n) مع Intlayer و Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md) لتطبيق Vite و React، أو [دليل تدويل React (i18n) مع Intlayer و React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md) لتطبيق Create React.**

## الوظائف المقدمة من حزمة `react-intlayer`

تقدم حزمة `react-intlayer` أيضًا بعض الوظائف لمساعدتك في تدويل تطبيقك.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayerAsync.md)
