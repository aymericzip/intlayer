---
docName: dictionary__get_started
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: القاموس | البدء
description: اكتشف كيفية إعلان واستخدام القواميس في موقعك متعدد اللغات. اتبع الخطوات في هذا التوثيق عبر الإنترنت لإعداد مشروعك في دقائق قليلة.
keywords:
  - البدء
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# البدء في إعلان المحتوى الخاص بك

<iframe title="i18n، ماركداون، JSON… حل واحد لإدارة كل شيء | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## امتدادات الملفات

بشكل افتراضي، يقوم Intlayer بمراقبة جميع الملفات التي تحمل الامتدادات التالية لإعلانات المحتوى:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

سيبحث التطبيق عن الملفات التي تطابق نمط `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` بشكل افتراضي.

هذه الامتدادات الافتراضية مناسبة لمعظم التطبيقات. ومع ذلك، إذا كانت لديك متطلبات محددة، يرجى الرجوع إلى [دليل تخصيص امتدادات المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#content-configuration) للحصول على تعليمات حول كيفية إدارتها.

للحصول على قائمة كاملة بخيارات التكوين، قم بزيارة وثائق التكوين.

## إعلان المحتوى الخاص بك

قم بإنشاء وإدارة قواميسك:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "مرحبا بالعالم",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // بيئة جافا سكريبت الحالية
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعل",
      false: "التحقق معطل",
    }),
    insertionContent: insert("مرحبًا {{name}}!"),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتداخل
      "login.button" // [اختياري] مسار المحتوى للتداخل
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# مثال على ماركداون"),

    /*
     * متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
     */
    jsxContent: <h1>عنواني</h1>,
  },
} satisfies Dictionary<Content>; // [اختياري] القاموس عام ويسمح لك بتقوية تنسيق قاموسك
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "مرحبًا بالعالم",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "محتوى إنجليزي",
      "en-GB": "محتوى إنجليزي (المملكة المتحدة)",
      fr: "محتوى فرنسي",
      es: "محتوى إسباني",
    }),
    quantityContent: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعل",
      false: "التحقق معطل",
    }),
    insertionContent: insert("مرحبًا {{name}}!"),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتضمين
      "login.button" // [اختياري] المسار إلى المحتوى للتضمين
    ),
    markdownContent: md("# مثال على ماركداون"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
    jsxContent: <h1>عنواني</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "مرحبا بالعالم",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعل",
      false: "التحقق معطل",
    }),
    insertionContent: insert("مرحبًا {{name}}!"),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتضمين
      "login.button" // [اختياري] المسار إلى المحتوى للتضمين
    ),
    markdownContent: md("# مثال على ماركداون"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
    jsxContent: <h1>عنواني</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "مرحبًا بالعالم",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "لا سيارات",
        "1": "سيارة واحدة",
        "<-1": "أقل من ناقص سيارة واحدة",
        "-1": "ناقص سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "التحقق مفعل",
        "false": "التحقق معطل",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "مرحباً {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# مثال على ماركداون",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["عنواني"],
      },
    },
  },
}
```

## تداخل الدوال

يمكنك بدون مشكلة تداخل الدوال داخل دوال أخرى.

مثال:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` تُرجع `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يتداخل فيه الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','en').advancedContent(true)(10)` تُرجع 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "لم يتم العثور على أي عناصر",
          es: "لم يتم العثور على عناصر",
        }),
        "1": t({
          en: "تم العثور على عنصر واحد",
          fr: "تم العثور على عنصر واحد",
          es: "تم العثور على عنصر واحد",
        }),
        ">1": t({
          en: "تم العثور على عدة عناصر",
          fr: "تم العثور على عدة عناصر",
          es: "تم العثور على عدة عناصر",
        }),
      }),
      false: t({
        en: "لا توجد بيانات صالحة متاحة",
        fr: "لا توجد بيانات صالحة متاحة",
        es: "لا توجد بيانات صالحة متاحة",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "جون دو";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يدمج الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','en').advancedContent(true)(10) returns 'Multiple items found'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "تم العثور على عدة عناصر",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "لا تتوفر بيانات صالحة",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "جون دو";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "مرحباً",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يدمج الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','en').advancedContent(true)(10)` يعيد 'تم العثور على عناصر متعددة'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "لم يتم العثور على عناصر",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "تم العثور على عنصر واحد",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "تم العثور على عناصر متعددة",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "لا توجد بيانات صالحة متاحة",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "مرحباً",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "لم يتم العثور على عناصر",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "تم العثور على عنصر واحد",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "تم العثور على عدة عناصر",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "لا توجد بيانات صالحة متاحة",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

## موارد إضافية

لمزيد من التفاصيل في Intlayer، يرجى الرجوع إلى الموارد التالية:

- [توثيق إعلان المحتوى حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/per_locale_file.md)
- [توثيق محتوى الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)
- [توثيق محتوى التعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md)
- [توثيق محتوى الشرط](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/condition.md)
- [توثيق محتوى الإدراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)
- [توثيق محتوى الملف](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/file.md)
- [توثيق محتوى التداخل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/nesting.md)
- [توثيق محتوى ماركداون](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)
- [توثيق محتوى جلب الدوال](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/function_fetching.md)

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
