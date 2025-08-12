---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق الحزمة | next-intlayer
description: تعرف على كيفية استخدام حزمة next-intlayer
keywords:
  - Intlayer
  - next-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer: حزمة NPM لتدويل تطبيق Next.js

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. وهي متوافقة مع أُطُر العمل مثل React و Next.js و Express.js.

**حزمة `next-intlayer`** تتيح لك تدويل تطبيق Next.js الخاص بك. توفر مزودي السياق (context providers) وخطافات (hooks) لتدويل Next.js. بالإضافة إلى ذلك، تتضمن إضافة Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، وكذلك وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه عناوين URL.

## لماذا تقوم بتدويل تطبيق Next.js الخاص بك؟

يُعد تدويل تطبيق Next.js الخاص بك أمرًا ضروريًا لخدمة جمهور عالمي بفعالية. فهو يتيح لتطبيقك تقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر سهولة وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## لماذا تدمج Intlayer؟

- **إدارة المحتوى مدعومة بجافاسكريبت**: استغل مرونة جافاسكريبت لتعريف وإدارة المحتوى الخاص بك بكفاءة.
- **بيئة آمنة من حيث النوع**: استفد من TypeScript لضمان دقة جميع تعريفات المحتوى وخلوها من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك قريبة من مكوناتها الخاصة، مما يعزز سهولة الصيانة والوضوح.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## مثال على الاستخدام

مع Intlayer، يمكنك إعلان المحتوى الخاص بك بطريقة منظمة في أي مكان في قاعدة الشيفرة الخاصة بك.

بشكل افتراضي، يقوم Intlayer بفحص الملفات التي تحمل الامتداد `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> يمكنك تعديل الامتداد الافتراضي عن طريق تعيين خاصية `contentDir` في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.ts
        │   └── index.tsx
        └── ServerComponent
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.mjs
        │   └── index.mjx
        └── ServerComponent
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### أعلن عن المحتوى الخاص بك

تم تصميم `next-intlayer` للعمل مع [حزمة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/index.md). `intlayer` هي حزمة تتيح لك إعلان المحتوى الخاص بك في أي مكان داخل الكود الخاص بك. تقوم بتحويل إعلانات المحتوى متعددة اللغات إلى قواميس منظمة تندمج بسلاسة في تطبيقك.

إليك مثالاً على إعلان المحتوى:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "ar": "مرحبا بالعالم",
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
        ">19": "الكثير من السيارات"
      }
    }
  }
}
```

### استخدام المحتوى في الكود الخاص بك

بمجرد أن تعلن عن المحتوى الخاص بك، يمكنك استخدامه في الكود الخاص بك. إليك مثال على كيفية استخدام المحتوى في مكون React:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## إتقان التدويل لتطبيق Next.js الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق Next.js الخاص بك. فيما يلي بعض الميزات الرئيسية:

- **تدويل مكونات الخادم**: يتيح لك Intlayer تدويل مكونات الخادم بنفس طريقة مكونات العميل. هذا يعني أنه يمكنك استخدام نفس إعلانات المحتوى لكل من مكونات العميل والخادم.
- **الوسيط لاكتشاف اللغة**: يوفر Intlayer وسيطًا لاكتشاف اللغة المفضلة للمستخدم. يُستخدم هذا الوسيط لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيهه إلى عنوان URL المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).
- **تدويل البيانات الوصفية**: يوفر Intlayer طريقة لتدويل بياناتك الوصفية، مثل عنوان الصفحة، باستخدام دالة `generateMetadata` التي يوفرها Next.js. يمكنك استخدام دالة `getTranslation` لترجمة بياناتك الوصفية.
- **التدويل لملفات sitemap.xml و robots.txt**: يتيح لك Intlayer تدويل ملفات sitemap.xml و robots.txt الخاصة بك. يمكنك استخدام دالة `getMultilingualUrls` لتوليد عناوين URL متعددة اللغات لخريطة الموقع الخاصة بك.
- **التدويل لعناوين URL**: يتيح لك Intlayer تدويل عناوين URL الخاصة بك باستخدام دالة `getMultilingualUrls`. تقوم هذه الدالة بتوليد عناوين URL متعددة اللغات لخريطة الموقع.

**لتعلم المزيد عن هذه الميزات، راجع دليل [التدويل في Next.js (i18n) مع Intlayer و Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md).**

## الدوال المقدمة من حزمة `next-intlayer`

توفر حزمة `next-intlayer` أيضًا بعض الدوال لمساعدتك في تعريب تطبيقك.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md)

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل
