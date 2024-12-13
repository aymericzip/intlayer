# بدء العمل بإعلان المحتوى الخاص بك

## قم بتكوين Intlayer لمشروعك

[انظر كيف تستخدم intlayer مع NextJS](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md)

[انظر كيف تستخدم intlayer مع ReactJS](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md)

[انظر كيف تستخدم intlayer مع Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md)

## تثبيت الحزمة

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## إدارة المحتوى الخاص بك

قم بإنشاء وإدارة قواميس المحتوى الخاصة بك:

### استخدام TypeScript

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "ابدأ بالتعديل",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "أقل من سيارة واحدة",
        "-1": "سيارة واحدة ناقص",
        "0": "لا توجد سيارات",
        "1": "سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
      }),
    },
  },
} satisfies DeclarationContent;

// يجب تصدير المحتوى كافتراضي
export default pageContent;
```

### استخدام وحدات ECMAScript

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "ابدأ بالتعديل",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة ناقص",
      0: "لا توجد سيارات",
      1: "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
  },
};

// يجب تصدير المحتوى كافتراضي
export default pageContent;
```

### استخدام وحدات CommonJS

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "ابدأ بالتعديل",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة ناقص",
      0: "لا توجد سيارات",
      1: "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
  },
};

// يجب تصدير المحتوى كافتراضي
module.exports = pageContent;
```

### استخدام JSON

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "ابدأ بالتعديل",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "أقل من سيارة واحدة",
      "-1": "سيارة واحدة ناقص",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    },
  },
}
```

تحذير، إعلان محتوى JSON يجعل من المستحيل تنفيذ [جلب الوظائف](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/function_fetching.md)
