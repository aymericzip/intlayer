# intlayer: حزمة NPM لإدارة القاموس متعدد اللغات (i18n)

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React، Next.js، و Express.js.

**حزمة `intlayer`** تتيح لك إعلان المحتوى الخاص بك في أي مكان في الكود الخاص بك. تقوم بتحويل إعلانات المحتوى متعدد اللغات إلى قواميس منظمة تتكامل بسلاسة مع تطبيقك. مع TypeScript، **تعزز Intlayer** تطويرك من خلال توفير أدوات أقوى وأكثر كفاءة.

## لماذا دمج Intlayer؟

- **إدارة المحتوى المدعومة بـ JavaScript**: استغل مرونة JavaScript لتعريف وإدارة المحتوى الخاص بك بكفاءة.
- **بيئة آمنة من الأخطاء**: استفد من TypeScript لضمان أن تكون جميع تعريفات المحتوى دقيقة وخالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك بالقرب من مكوناتها ذات الصلة، مما يعزز القابلية للصيانة والوضوح.

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

### إعداد Intlayer

يوفر Intlayer ملف إعداد لتكوين مشروعك. ضع هذا الملف في جذر مشروعك.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// إعداد اللغات الافتراضية
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
// إعداد اللغات الافتراضية
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
// إعداد اللغات الافتراضية
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

> للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## مثال على الاستخدام

مع Intlayer، يمكنك إعلان المحتوى الخاص بك بطريقة منظمة في أي مكان في قاعدة الكود الخاصة بك.

بشكل افتراضي، يقوم Intlayer بفحص الملفات ذات الامتداد `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> يمكن تعديل الامتداد الافتراضي عن طريق تعيين خاصية `contentDir` في [ملف الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

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
// إعلان المحتوى المترجم
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحباً بالعالم",
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

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
// إعلان المحتوى المترجم
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحباً بالعالم",
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

```jsx filePath="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
// إعلان المحتوى المترجم
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ar: "مرحباً بالعالم",
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

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ar": "مرحباً بالعالم"
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

### بناء القواميس الخاصة بك

يمكنك بناء القواميس الخاصة بك باستخدام [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

...
