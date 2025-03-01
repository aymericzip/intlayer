# next-intlayer: حزمة NPM لتدويل (i18n) تطبيق Next.js

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وNext.js وExpress.js.

**حزمة `next-intlayer`** تتيح لك تدويل تطبيق Next.js الخاص بك. توفر موفري السياق وخطافات لتدويل Next.js. بالإضافة إلى ذلك، تتضمن مكون إضافي لـ Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى وسيط لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، ومعالجة إعادة توجيه الروابط.

## لماذا تدويل تطبيق Next.js الخاص بك؟

تدويل تطبيق Next.js الخاص بك أمر ضروري لخدمة جمهور عالمي بفعالية. يتيح لتطبيقك تقديم المحتوى والرسائل بلغة المستخدم المفضلة. هذه القدرة تعزز تجربة المستخدم وتوسع نطاق تطبيقك بجعله أكثر وصولًا وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## لماذا دمج Intlayer؟

- **إدارة محتوى مدعومة بـ JavaScript**: استغل مرونة JavaScript لتعريف وإدارة المحتوى بكفاءة.
- **بيئة آمنة من الأخطاء**: استفد من TypeScript لضمان أن تكون جميع تعريفات المحتوى دقيقة وخالية من الأخطاء.
- **ملفات محتوى متكاملة**: احتفظ بترجماتك قريبة من مكوناتها ذات الصلة، مما يعزز القابلية للصيانة والوضوح.

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

مع Intlayer، يمكنك إعلان المحتوى الخاص بك بطريقة منظمة في أي مكان في قاعدة الكود الخاصة بك.

بشكل افتراضي، يقوم Intlayer بفحص الملفات ذات الامتداد `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> يمكنك تعديل الامتداد الافتراضي عن طريق تعيين خاصية `contentDir` في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

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

### إعلان المحتوى الخاص بك

`next-intlayer` مصمم للعمل مع [حزمة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). `intlayer` هي حزمة تتيح لك إعلان المحتوى الخاص بك في أي مكان في الكود الخاص بك. تقوم بتحويل إعلانات المحتوى متعدد اللغات إلى قواميس منظمة تندمج بسلاسة في تطبيقك.

إليك مثال على إعلان المحتوى:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
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

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
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

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
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

بمجرد إعلان المحتوى الخاص بك، يمكنك استخدامه في الكود الخاص بك. إليك مثال على كيفية استخدام المحتوى في مكون React:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // إنشاء إعلان محتوى ذي صلة

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
  const { myTranslatedContent } = useIntlayer("client-component"); // إنشاء إعلان محتوى ذي صلة

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
  const { myTranslatedContent } = useIntlayer("client-component"); // إنشاء إعلان محتوى ذي صلة

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## إتقان تدويل تطبيق Next.js الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق Next.js الخاص بك. إليك بعض الميزات الرئيسية:

- **تدويل مكونات الخادم**: يتيح لك Intlayer تدويل مكونات الخادم بنفس طريقة مكونات العميل. هذا يعني أنه يمكنك استخدام نفس إعلانات المحتوى لكل من مكونات العميل والخادم.
- **وسيط لاكتشاف اللغة**: يوفر Intlayer وسيطًا لاكتشاف اللغة المفضلة للمستخدم. يُستخدم هذا الوسيط لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيههم إلى الرابط المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).
- **تدويل البيانات الوصفية**: يوفر Intlayer طريقة لتدويل البيانات الوصفية الخاصة بك، مثل عنوان صفحتك، باستخدام وظيفة `generateMetadata` التي يوفرها Next.js. يمكنك استخدام وظيفة `getTranslation` لترجمة البيانات الوصفية الخاصة بك.
- **تدويل sitemap.xml وrobots.txt**: يتيح لك Intlayer تدويل ملفات sitemap.xml وrobots.txt الخاصة بك. يمكنك استخدام وظيفة `getMultilingualUrls` لإنشاء روابط متعددة اللغات لملف sitemap الخاص بك.
- **تدويل الروابط**: يتيح لك Intlayer تدويل الروابط الخاصة بك باستخدام وظيفة `getMultilingualUrls`. تقوم هذه الوظيفة بإنشاء روابط متعددة اللغات لملف sitemap الخاص بك.

**لتعلم المزيد عن هذه الميزات، راجع دليل [تدويل Next.js (i18n) مع Intlayer وNext.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).**

## الوظائف التي توفرها حزمة `next-intlayer`

توفر حزمة `next-intlayer` أيضًا بعض الوظائف لمساعدتك في تدويل تطبيقك.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayerAsync.md)
