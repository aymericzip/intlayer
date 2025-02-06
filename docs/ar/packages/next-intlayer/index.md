# next-intlayer: حزمة NPM لجعل تطبيق Next.js متعدد اللغات (i18n)

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React و Next.js و Express.js.

**حزمة `next-intlayer`** تتيح لك جعل تطبيق Next.js الخاص بك متعدد اللغات. إنها توفر موفرات سياق و هوكات للترجمة في Next.js. بالإضافة إلى ذلك، تشمل مكون Next.js للإدماج مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، وكذلك وسائط لتحديد لغة المستخدم المفضلة وإدارة الكوكيز، والتعامل مع إعادة توجيه عناوين URL.

## لماذا تجعل تطبيق Next.js متعدد اللغات؟

جعل تطبيق Next.js الخاص بك متعدد اللغات أمر ضروري لخدمة جمهور عالمي بشكل فعال. إنه يتيح لتطبيقك تقديم محتوى ورسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة من تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر إمكانية للوصول وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## لماذا تدمج Intlayer؟

- **إدارة المحتوى المدعومة بواسطة JavaScript**: استغل مرونة JavaScript لتعريف وإدارة محتواك بشكل فعال.
- **بيئة آمنة من نوع البيانات**: استفد من TypeScript لضمان أن تعريفات محتواك دقيقة وخالية من الأخطاء.
- **ملفات محتوى مدمجة**: احتفظ بترجماتك قريبة من مكوناتها المعنية، مما يعزز من سهولة الصيانة والوضوح.

## التثبيت

قم بتثبيت الحزمة الضرورية باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## مثال للاستخدام

مع Intlayer، يمكنك إعلان محتواك بطريقة منظمة في أي مكان ضمن قاعدة الشيفرة الخاصة بك.

بشكل افتراضي، تقوم Intlayer بمسح الملفات ذات الامتداد `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> يمكنك تعديل الامتداد الافتراضي عن طريق إعداد خاصية `contentDir` في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

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

### أعلن عن محتواك

تم تصميم `next-intlayer` للعمل مع حزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). حزمة `intlayer` هي حزمة تتيح لك إعلان محتواك في أي مكان ضمن الشيفرة الخاصة بك. وهي تحول إعلانات المحتوى متعدد اللغات إلى قواميس منظمة تتكامل بسلاسة مع تطبيقك.

إليك مثال على إعلان محتوى:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
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
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
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

بمجرد أن تعلن عن محتواك، يمكنك استخدامه في شيفرتك. إليك مثال على كيفية استخدام المحتوى في مكون React:

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

## إتقان التدويل في تطبيق Next.js الخاص بك

تقدم Intlayer الكثير من الميزات لمساعدتك في جعل تطبيق Next.js الخاص بك متعدد اللغات. فيما يلي بعض الميزات الرئيسية:

- **تدويل مكونات الخادم**: تتيح لك Intlayer جعل مكونات الخادم الخاصة بك متعددة اللغات بنفس الطريقة الخاصة بمكونات العميل. وهذا يعني أنه يمكنك استخدام نفس إعلانات المحتوى لكل من مكونات العميل والخادم.
- **وسائط لاكتشاف اللغة**: تقدم Intlayer وسائط لاكتشاف اللغة المفضلة لدى المستخدم. تُستخدم هذه الوسائط لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيههم إلى عنوان URL المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).
- **تدويل البيانات الوصفية**: توفر Intlayer وسيلة لتدويل البيانات الوصفية الخاصة بك، مثل عنوان صفحتك، باستخدام دالة `generateMetadata` المقدمة من Next.js. يمكنك استخدام دالة `getTranslationContent` لترجمة البيانات الوصفية الخاصة بك.
- **تدويل ملفات sitemap.xml و robots.txt**: تتيح لك Intlayer جعل ملفات sitemap.xml و robots.txt الخاصة بك متعددة اللغات. يمكنك استخدام دالة `getMultilingualUrls` لإنشاء عناوين URL متعددة اللغات لخريطة الموقع الخاصة بك.
- **تدويل عناوين URL**: تتيح لك Intlayer جعل عناوين URL الخاصة بك متعددة اللغات باستخدام دالة `getMultilingualUrls`. تقوم هذه الدالة بإنشاء عناوين URL متعددة اللغات لخريطة الموقع الخاصة بك.

**للمزيد من المعلومات حول هذه الميزات، راجع [تعليمات Next.js للتدويل (i18n) مع Intlayer و Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).**

## الوظائف المقدمة بواسطة حزمة `next-intlayer`

تقدم حزمة `next-intlayer` أيضًا بعض الوظائف لمساعدتك في تدويل تطبيقك.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayerAsync.md)
