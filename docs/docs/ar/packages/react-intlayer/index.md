---
docName: package__react-intlayer
url: https://intlayer.org/doc/packages/react-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق الحزمة | react-intlayer
description: تعرف على كيفية استخدام حزمة react-intlayer
keywords:
  - Intlayer
  - react-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
---

# react-intlayer: حزمة NPM لتدويل (i18n) تطبيق React

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافاسكريبت. وهي متوافقة مع أُطُر مثل React وReact وExpress.js.

**حزمة `react-intlayer`** تتيح لك تدويل تطبيق React الخاص بك. فهي توفر موفري السياق (context providers) وخطافات (hooks) لتدويل React.

## لماذا تقوم بتدويل تطبيق React الخاص بك؟

تدويل تطبيق React الخاص بك أمر ضروري لخدمة جمهور عالمي بشكل فعال. فهو يسمح لتطبيقك بتقديم المحتوى والرسائل بلغة كل مستخدم المفضلة. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك بجعله أكثر وصولاً وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## لماذا تدمج Intlayer؟

- **إدارة المحتوى مدعومة بجافاسكريبت**: استغل مرونة جافاسكريبت لتعريف وإدارة المحتوى الخاص بك بكفاءة.
- **بيئة آمنة من حيث النوع**: استغل TypeScript لضمان أن جميع تعريفات المحتوى الخاصة بك دقيقة وخالية من الأخطاء.
- **ملفات محتوى مدمجة**: احتفظ بترجماتك قريبة من مكوناتها الخاصة، مما يعزز سهولة الصيانة والوضوح.

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

مع Intlayer، يمكنك إعلان المحتوى الخاص بك بطريقة منظمة في أي مكان في قاعدة الشيفرة الخاصة بك.

بشكل افتراضي، يقوم Intlayer بفحص الملفات التي تحمل الامتداد `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> يمكنك تعديل الامتداد الافتراضي عن طريق تعيين خاصية `contentDir` في [ملف التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

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

### إعلان المحتوى الخاص بك

تم تصميم `react-intlayer` للعمل مع حزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/index.md). `intlayer` هي حزمة تتيح لك إعلان المحتوى الخاص بك في أي مكان في الكود الخاص بك. تقوم بتحويل إعلانات المحتوى متعددة اللغات إلى قواميس منظمة تندمج بسلاسة في تطبيقك.

إليك مثال على إعلان المحتوى:

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "مرحبا بالعالم",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
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
      en: "مرحبا بالعالم",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
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
      en: "مرحبا بالعالم",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
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
        "es": "Hola Mundo"
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
        ">19": "العديد من السيارات"
      }
    }
  }
}
```

### استخدام المحتوى في الكود الخاص بك

بمجرد أن تقوم بإعلان المحتوى الخاص بك، يمكنك استخدامه في الكود الخاص بك. فيما يلي مثال على كيفية استخدام المحتوى في مكون React:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء إعلان المحتوى المرتبط

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
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء إعلان المحتوى المرتبط

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
  const { myTranslatedContent } = useIntlayer("component-1"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## إتقان التدويل في تطبيق React الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق React الخاص بك.

**لمعرفة المزيد عن هذه الميزات، راجع دليل [التدويل في React (i18n) مع Intlayer و Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md) لتطبيق Vite و React، أو دليل [التدويل في React (i18n) مع Intlayer و React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md) لتطبيق React Create App.**

## الوظائف المقدمة من حزمة `react-intlayer`

توفر حزمة `react-intlayer` أيضًا بعض الوظائف لمساعدتك في تدويل تطبيقك.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayerAsync.md)

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل
