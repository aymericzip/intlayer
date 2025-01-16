# intlayer: حزمة NPM لإدارة إعلان المحتوى متعدد اللغات (i18n)

**Intlayer** هي مجموعة من الحزم مصممة خصيصاً لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React و Next.js و Express.js.

**حزمة `intlayer`** تتيح لك إعلان المحتوى في أي مكان في كودك. تقوم بتحويل إعلانات المحتوى متعدد اللغات إلى قواميس منظمة تتكامل بسلاسة في تطبيقك. مع TypeScript، تعمل **Intlayer** على تحسين تطويرك من خلال توفير أدوات أقوى وأكثر كفاءة.

## لماذا يجب دمج Intlayer؟

- **إدارة المحتوى المدعومة بواسطة JavaScript**: استغل مرونة JavaScript لتحديد وإدارة المحتوى بكفاءة.
- **بيئة آمنة نوعياً**: استغل TypeScript لضمان أن جميع تعريفات المحتوى لديك دقيقة وخالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك قريبة من مكوناتها المعنية، مما يزيد من قابلية الصيانة والوضوح.

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

توفر Intlayer ملف إعداد لضبط مشروعك. ضع هذا الملف في جذر مشروعك.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ARABIC, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ARABIC,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ARABIC, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ARABIC,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ARABIC, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ARABIC,
  },
};

module.exports = config;
```

> للحصول على قائمة كاملة بالمعلمات المتاحة، يرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## مثال على الاستخدام

مع Intlayer، يمكنك إعلان محتواك بطريقة منظمة في أي مكان ضمن قاعدة الكود الخاصة بك.

بشكل افتراضي، يقوم Intlayer بمسح الملفات ذات الامتداد `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> يمكنك تعديل الامتداد الافتراضي من خلال ضبط خاصية `contentDir` في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

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

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      ar: "مرحبا بالعالم",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      ar: "مرحبا بالعالم",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      ar: "مرحبا بالعالم",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "ar": "مرحبا بالعالم",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "أقل من سيارة واحدة",
        "-1": "سيارة واحدة",
        "0": "لا توجد سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "الكثير من السيارات"
      }
    }
  }
}
```

### بناء قواميسك

يمكنك بناء قواميسك باستخدام [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

يسجل هذا الأمر كافة الملفات `*.content.*`، ويجمعها، ويكتب النتائج في الدليل المحدد في **`intlayer.config.ts`** (بشكل افتراضي، `./.intlayer`).

قد يبدو الإخراج النموذجي كما يلي:

```bash
.
├── .intlayer
│   ├── dictionary  # يحتوي على قاموس المحتوى الخاص بك
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # يحتوي على نقطة الدخول لقاموسك لاستخدامه في تطبيقك
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # يحتوي على تعريفات النوع التلقائية لقاموسك
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # يحتوي على تعريفات النوع التلقائية لـ Intlayer
```

### بناء موارد i18next

يمكن تكوين Intlayer لبناء القواميس لـ [i18next](https://www.i18next.com/). لذلك، تحتاج إلى إضافة التكوين التالي إلى ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // يُخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["i18next"],

    // الدليل الذي ستكتب فيه Intlayer ملفات JSON الرسائل الخاصة بك
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
    // يُخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["i18next"],

    // الدليل الذي ستكتب فيه Intlayer ملفات JSON الرسائل الخاصة بك
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
    // يُخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["i18next"],

    // الدليل الذي ستكتب فيه Intlayer ملفات JSON الرسائل الخاصة بك
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> للحصول على قائمة كاملة بالمعلمات المتاحة، يرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

الإخراج:

```bash
.
└── i18next
    └── resources
        ├── ar
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

على سبيل المثال، قد يبدو **ar/client-component.json** كما يلي:

```json filePath="intlayer/dictionary/ar/client-component.json"
{
  "myTranslatedContent": "مرحبا بالعالم",
  "zero_numberOfCar": "لا توجد سيارات",
  "one_numberOfCar": "سيارة واحدة",
  "two_numberOfCar": "سيارتان",
  "other_numberOfCar": "بعض السيارات"
}
```

### بناء قواميس i18next أو next-intl

يمكن تكوين Intlayer لبناء القواميس لـ [i18next](https://www.i18next.com/) أو [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). لذلك تحتاج إلى إضافة التكوين التالي إلى ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // يُخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["next-intl"],

    // الدليل الذي ستكتب فيه Intlayer ملفات JSON الرسائل الخاصة بك
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
    // يُخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["next-intl"],

    // الدليل الذي ستكتب فيه Intlayer ملفات JSON الرسائل الخاصة بك
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
    // يُخبر Intlayer بإنشاء ملفات الرسائل لـ i18next
    dictionaryOutput: ["next-intl"],

    // الدليل الذي ستكتب فيه Intlayer ملفات JSON الرسائل الخاصة بك
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> للحصول على قائمة كاملة بالمعلمات المتاحة، يرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

الإخراج:

```bash
.
└── intl
    └── messages
        ├── ar
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

على سبيل المثال، قد يبدو **ar/client-component.json** كما يلي:

```json filePath="intlayer/dictionary/ar/client-component.json"
{
  "myTranslatedContent": "مرحبا بالعالم",
  "zero_numberOfCar": "لا توجد سيارات",
  "one_numberOfCar": "سيارة واحدة",
  "two_numberOfCar": "سيارتان",
  "other_numberOfCar": "بعض السيارات"
}
```

## أدوات CLI

توفر Intlayer أداة CLI لـ:

- تدقيق إعلانات المحتوى الخاص بك وإكمال الترجمات المفقودة
- بناء القواميس من إعلانات المحتوى الخاصة بك
- دفع وسحب القواميس البعيدة من CMS الخاص بك إلى مشروع اللغة الخاصة بك

استشر [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md) لمزيد من المعلومات.

## استخدام Intlayer في تطبيقك

بمجرد إعلان محتواك، يمكنك استهلاك قواميس Intlayer الخاصة بك في تطبيقك.

Intlayer متاحة كحزمة لتطبيقك.

### تطبيق React

لاستخدام Intlayer في تطبيق React الخاص بك، يمكنك استخدام [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md).

### تطبيق Next.js

لاستخدام Intlayer في تطبيق Next.js الخاص بك، يمكنك استخدام [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/index.md).

### تطبيق Express

لاستخدام Intlayer في تطبيق Express الخاص بك، يمكنك استخدام [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/express-intlayer/index.md).

## الوظائف المقدمة من حزمة `intlayer`

تقدم حزمة `intlayer` أيضاً بعض الوظائف لمساعدتك في دولنة تطبيقك.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getConfiguration.md)
- [`getTranslationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getTranslationContent.md)
- [`getEnumerationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getEnumerationContent.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getPathWithoutLocale.md)
