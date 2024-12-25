# البدء في إعلان المحتوى الخاص بك

## ملحقات الملفات

بشكل افتراضي، يقوم Intlayer بمراقبة جميع الملفات ذات الملحقات التالية لإعلانات المحتوى:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

ستبحث التطبيقات عن الملفات التي تتطابق مع نمط الغلوب `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` بشكل افتراضي.

تعتبر هذه الملحقات الافتراضية مناسبة لمعظم التطبيقات. ومع ذلك، إذا كان لديك متطلبات محددة، يرجى الرجوع إلى [دليل تخصيص ملحق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#content-configuration) للحصول على تعليمات حول كيفية إدارتها.

للحصول على قائمة كاملة من خيارات التكوين، قم بزيارة وثائق التكوين.

## إعلان المحتوى الخاص بك

قم بإنشاء وإدارة قواميس المحتوى الخاصة بك:

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
import { t, enu, type DeclarationContent } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة ناقص",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
} satisfies DeclarationContent<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة ناقص",
      0: "لا توجد سيارات",
      1: "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة ناقص",
      0: "لا توجد سيارات",
      1: "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "أقل من سيارة واحدة",
        "-1": "سيارة واحدة ناقص",
        "0": "لا توجد سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "الكثير من السيارات",
      },
    },
  },
}
```
