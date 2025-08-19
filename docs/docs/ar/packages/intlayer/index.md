---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق الحزمة | intlayer
description: تعرف على كيفية استخدام حزمة intlayer
keywords:
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer: حزمة NPM لإدارة القاموس متعدد اللغات (i18n)

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافاسكريبت. وهي متوافقة مع أُطُر العمل مثل React و Next.js و Express.js.

**حزمة `intlayer`** تتيح لك إعلان المحتوى الخاص بك في أي مكان داخل الكود الخاص بك. تقوم بتحويل إعلانات المحتوى متعددة اللغات إلى قواميس منظمة تندمج بسلاسة في تطبيقك. مع TypeScript، تعزز **Intlayer** عملية التطوير الخاصة بك من خلال توفير أدوات أقوى وأكثر كفاءة.

## لماذا تدمج Intlayer؟

- **إدارة المحتوى مدعومة بجافاسكريبت**: استغل مرونة جافاسكريبت لتعريف وإدارة المحتوى الخاص بك بكفاءة.
- **بيئة آمنة من حيث النوع**: استفد من TypeScript لضمان أن جميع تعريفات المحتوى الخاصة بك دقيقة وخالية من الأخطاء.
- **ملفات محتوى مدمجة**: احتفظ بترجماتك قريبة من مكوناتك الخاصة، مما يعزز سهولة الصيانة والوضوح.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### تكوين Intlayer

يوفر Intlayer ملف تكوين لإعداد مشروعك. ضع هذا الملف في جذر مشروعك.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## مثال على الاستخدام

مع Intlayer، يمكنك إعلان المحتوى الخاص بك بطريقة منظمة في أي مكان في قاعدة الشيفرة الخاصة بك.

بشكل افتراضي، يقوم Intlayer بمسح الملفات التي تحمل الامتداد `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> يمكنك تعديل الامتداد الافتراضي عن طريق تعيين خاصية `contentDir` في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
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
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### إعلان المحتوى الخاص بك

إليك مثال على إعلان المحتوى:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
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
      es: "Hola Mundo",
      fr: "Bonjour le monde",
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
      es: "Hola Mundo",
      fr: "Bonjour le monde",
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

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
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

### بناء القواميس الخاصة بك

يمكنك بناء القواميس الخاصة بك باستخدام أداة [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

يقوم هذا الأمر بمسح جميع ملفات `*.content.*`، وتجميعها، وكتابة النتائج في الدليل المحدد في ملف **`intlayer.config.ts`** الخاص بك (افتراضيًا، `./.intlayer`).

قد يبدو الناتج النموذجي كما يلي:

```bash
.
└── .intlayer
    ├── dictionary  # يحتوي على قاموس المحتوى الخاص بك
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # يحتوي على نقطة الدخول لقاموسك لاستخدامه في تطبيقك
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # يحتوي على تعريفات الأنواع التي تم إنشاؤها تلقائيًا لقاموسك
        ├── intlayer.d.ts  # يحتوي على تعريفات الأنواع التي تم إنشاؤها تلقائيًا لـ Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### بناء موارد i18next

يمكن تكوين Intlayer لبناء قواميس لـ [i18next](https://www.i18next.com/). للقيام بذلك، تحتاج إلى إضافة التكوين التالي إلى ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // يخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["i18next"],

    // الدليل الذي سيكتب فيه Intlayer ملفات JSON الخاصة بالرسائل
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // يخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["i18next"],

    // الدليل الذي سيكتب فيه Intlayer ملفات JSON الخاصة بالرسائل
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // يخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["i18next"],

    // الدليل الذي سيكتب فيه Intlayer ملفات JSON الخاصة بالرسائل
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

الناتج:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

على سبيل المثال، قد يبدو ملف **en/client-component.json** كما يلي:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "بعض السيارات"
}
```

### بناء قواميس next-intl

يمكن تكوين Intlayer لبناء قواميس لـ [i18next](https://www.i18next.com/) أو [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). للقيام بذلك، تحتاج إلى إضافة التكوين التالي إلى ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // يخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["next-intl"],

    // الدليل الذي سيكتب فيه Intlayer ملفات JSON الخاصة بالرسائل
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // يخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["next-intl"],

    // الدليل الذي سيكتب فيه Intlayer ملفات JSON الخاصة بالرسائل
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // يخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["next-intl"],

    // الدليل الذي سيكتب فيه Intlayer ملفات رسائل JSON الخاصة بك
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

الناتج:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

على سبيل المثال، قد يبدو ملف **en/client-component.json** كما يلي:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "مرحبا بالعالم",
  "zero_numberOfCar": "لا سيارات",
  "one_numberOfCar": "سيارة واحدة",
  "two_numberOfCar": "سيارتان",
  "other_numberOfCar": "بعض السيارات"
}
```

## أدوات CLI

يوفر Intlayer أداة CLI لـ:

- تدقيق إعلانات المحتوى الخاصة بك واستكمال الترجمات المفقودة
- بناء القواميس من إعلانات المحتوى الخاصة بك
- دفع وسحب القواميس البعيدة من نظام إدارة المحتوى الخاص بك إلى مشروع اللغة المحلية الخاص بك

راجع [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md) لمزيد من المعلومات.

## استخدام Intlayer في تطبيقك

بمجرد إعلان المحتوى الخاص بك، يمكنك استهلاك قواميس Intlayer في تطبيقك.

يتوفر Intlayer كحزمة لتطبيقك.

### تطبيق React

لاستخدام Intlayer في تطبيق React الخاص بك، يمكنك استخدام [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md).

### تطبيق Next.js

لاستخدام Intlayer في تطبيق Next.js الخاص بك، يمكنك استخدام [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md).

### تطبيق Express

لاستخدام Intlayer في تطبيق Express الخاص بك، يمكنك استخدام [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/express-intlayer/index.md).

## الوظائف المقدمة من حزمة `intlayer`

توفر حزمة `intlayer` أيضًا بعض الوظائف لمساعدتك في تعريب تطبيقك.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md)

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل
