# البدء في إعلان المحتوى الخاص بك

## امتدادات الملفات

بشكل افتراضي، يقوم Intlayer بمراقبة جميع الملفات ذات الامتدادات التالية لإعلانات المحتوى:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

سيقوم التطبيق بالبحث عن الملفات التي تطابق نمط النمط `./src/**/*.content.{ts,tsx,js,mjs,cjs}` بشكل افتراضي.

تعتبر هذه الامتدادات الافتراضية مناسبة لمعظم التطبيقات. ومع ذلك، إذا كانت لديك متطلبات محددة، راجع دليل تخصيص امتدادات المحتوى للحصول على التعليمات حول كيفية إدارتها.

للحصول على قائمة كاملة بخيارات التكوين، قم بزيارة وثائق التكوين.

## أعلن عن محتواك

إنشاء وإدارة قواميس المحتوى الخاصة بك:

### باستخدام TypeScript

```typescript
// src/app/[locale]/page.content.ts
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
      "<-1": "أقل من سيارة واحدة ناقص",
      "-1": "سيارة واحدة ناقص",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### باستخدام وحدات ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

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
      "<-1": "أقل من سيارة واحدة ناقص",
      "-1": "سيارة واحدة ناقص",
      0: "لا توجد سيارات",
      1: "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};
```

### باستخدام وحدات CommonJS

```javascript
// src/app/[locale]/page.content.cjs

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
      "<-1": "أقل من سيارة واحدة ناقص",
      "-1": "سيارة واحدة ناقص",
      0: "لا توجد سيارات",
      1: "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
  },
};
```

### باستخدام JSON

```json5
// src/app/[locale]/page.content.json

{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "ترجمة",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "تعداد",
      "enumeration": {
        "<-1": "أقل من سيارة واحدة ناقص",
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

تحذير، إعلان محتوى JSON يجعل من المستحيل تنفيذ [جلب الوظائف](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/function_fetching.md)
