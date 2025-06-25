---
docName: package__react-intlayer
url: https://intlayer.org/doc/packages/react-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق حزمة | react-intlayer
description: انظر كيف تستخدم حزمة react-intlayer
keywords:
  - Intlayer
  - react-intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# react-intlayer: حزمة NPM لتدويل (i18n) تطبيق React

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وExpress.js.

**حزمة `react-intlayer`** تتيح لك تدويل تطبيق React الخاص بك. توفر مزودي السياق وخطافات لتدويل React.

## لماذا تدويل تطبيق React الخاص بك؟

تدويل تطبيق React الخاص بك أمر ضروري لخدمة جمهور عالمي بفعالية. يتيح لتطبيقك تقديم المحتوى والرسائل بلغة المستخدم المفضلة. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر وصولًا وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## لماذا دمج Intlayer؟

- **إدارة المحتوى المدعومة بـ JavaScript**: استغل مرونة JavaScript لتعريف وإدارة المحتوى بكفاءة.
- **بيئة آمنة من الأخطاء**: استفد من TypeScript لضمان أن تكون جميع تعريفات المحتوى دقيقة وخالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك قريبة من مكوناتها ذات الصلة، مما يعزز القابلية للصيانة والوضوح.

## التثبيت

قم بتثبيت الحزمة المطلوبة باستخدام مدير الحزم المفضل لديك:

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

مع Intlayer، يمكنك تعريف المحتوى الخاص بك بطريقة منظمة في أي مكان في قاعدة الكود الخاصة بك.

بشكل افتراضي، يقوم Intlayer بمسح الملفات ذات الامتداد `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

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

### تعريف المحتوى الخاص بك

`react-intlayer` مصمم للعمل مع حزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). `intlayer` هي حزمة تتيح لك تعريف المحتوى الخاص بك في أي مكان في الكود الخاص بك. تقوم بتحويل تعريفات المحتوى متعدد اللغات إلى قواميس منظمة تتكامل بسلاسة مع تطبيقك.

إليك مثال على تعريف المحتوى:

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحبًا بالعالم",
    }),
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx fileName="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحبًا بالعالم",
    }),
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};

export default component1Content;
```

```jsx fileName="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحبًا بالعالم",
    }),
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};

module.exports = component1Content;
```

```json fileName="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ar": "مرحبًا بالعالم"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "أقل من ناقص سيارة واحدة",
        "-1": "ناقص سيارة واحدة",
        "0": "لا سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "الكثير من السيارات"
      }
    }
  }
}
```

### استخدام المحتوى في الكود الخاص بك

بمجرد تعريف المحتوى الخاص بك، يمكنك استخدامه في الكود الخاص بك. إليك مثال على كيفية استخدام المحتوى في مكون React:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء تعريف المحتوى المرتبط

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
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء تعريف المحتوى المرتبط

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
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء تعريف المحتوى المرتبط

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## إتقان تدويل تطبيق React الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق React الخاص بك.

**لتعلم المزيد عن هذه الميزات، راجع [دليل تدويل React (i18n) مع Intlayer و Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md) لتطبيق Vite و React، أو [دليل تدويل React (i18n) مع Intlayer و React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md) لتطبيق React Create App.**

## الوظائف التي توفرها حزمة `react-intlayer`

توفر حزمة `react-intlayer` أيضًا بعض الوظائف لمساعدتك في تدويل تطبيقك.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayerAsync.md)
