# بدء إعلان المحتوى الخاص بك

<iframe title="i18n, Markdown, JSON… one single solution to manage it all | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## امتدادات الملفات

بشكل افتراضي، يراقب Intlayer جميع الملفات ذات الامتدادات التالية لإعلانات المحتوى:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

سيبحث التطبيق عن الملفات التي تطابق النمط `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` بشكل افتراضي.

هذه الامتدادات الافتراضية مناسبة لمعظم التطبيقات. ومع ذلك، إذا كانت لديك متطلبات محددة، راجع [دليل تخصيص امتداد المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#content-configuration) للحصول على تعليمات حول كيفية إدارتها.

للحصول على قائمة كاملة بخيارات التكوين، قم بزيارة وثائق التكوين.

## إعلان المحتوى الخاص بك

قم بإنشاء وإدارة القواميس الخاصة بك:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

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
  externalContent: string;
  insertionContent: string;
  fileContent: string;
  nestedContent: any;
  markdownContent: any;
  jsxContent: any;
}

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
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      ar: "محتوى عربي",
    }),
    quantityContent: enu({
      "<-1": "أقل من سيارة واحدة بالسالب",
      "-1": "سيارة واحدة بالسالب",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعل",
      false: "التحقق معطل",
    }),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتداخل
      "login.button" // [اختياري] المسار إلى المحتوى للتداخل
    ),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# مثال Markdown"),

    /*
     * متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
     */
    jsxContent: <h1>عنواني</h1>,
  },
} satisfies Dictionary<Content>; // [اختياري] القاموس هو عام ويسمح لك بتقوية تنسيق القاموس الخاص بك
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

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
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      ar: "محتوى عربي",
    }),
    quantityContent: enu({
      "<-1": "أقل من سيارة واحدة بالسالب",
      "-1": "سيارة واحدة بالسالب",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعل",
      false: "التحقق معطل",
    }),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتداخل
      "login.button" // [اختياري] المسار إلى المحتوى للتداخل
    ),
    markdownContent: md("# مثال Markdown"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
    jsxContent: <h1>عنواني</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
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
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      ar: "محتوى عربي",
    }),
    quantityContent: enu({
      "<-1": "أقل من سيارة واحدة بالسالب",
      "-1": "سيارة واحدة بالسالب",
      "0": "لا توجد سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعل",
      false: "التحقق معطل",
    }),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتداخل
      "login.button" // [اختياري] المسار إلى المحتوى للتداخل
    ),
    markdownContent: md("# مثال Markdown"),
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
        "ar": "محتوى عربي",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "لا توجد سيارات",
        "1": "سيارة واحدة",
        "<-1": "أقل من سيارة واحدة بالسالب",
        "-1": "سيارة واحدة بالسالب",
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
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# مثال Markdown",
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

## تداخل الوظائف

يمكنك بدون مشكلة تداخل الوظائف داخل بعضها البعض.

مثال:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "جون دو";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','ar').hiMessage` يعيد `['مرحبًا', ' ', 'جون دو']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        ar: "مرحبًا",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يتداخل فيه الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','ar').advancedContent(true)(10) يعيد 'تم العثور على عناصر متعددة'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          ar: "لم يتم العثور على عناصر",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          ar: "تم العثور على عنصر واحد",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          ar: "تم العثور على عناصر متعددة",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        ar: "لا توجد بيانات صالحة متاحة",
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
    // `getIntlayer('page','ar').hiMessage` يعيد `['مرحبًا', ' ', 'جون دو']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        ar: "مرحبًا",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يتداخل فيه الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','ar').advancedContent(true)(10) يعيد 'تم العثور على عناصر متعددة'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          ar: "لم يتم العثور على عناصر",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          ar: "تم العثور على عنصر واحد",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          ar: "تم العثور على عناصر متعددة",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        ar: "لا توجد بيانات صالحة متاحة",
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
    // `getIntlayer('page','ar').hiMessage` يعيد `['مرحبًا', ' ', 'جون دو']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        ar: "مرحبًا",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يتداخل فيه الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','ar').advancedContent(true)(10) يعيد 'تم العثور على عناصر متعددة'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          ar: "لم يتم العثور على عناصر",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          ar: "تم العثور على عنصر واحد",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          ar: "تم العثور على عناصر متعددة",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        ar: "لا توجد بيانات صالحة متاحة",
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
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
            "ar": "مرحبًا",
          },
        },
        " ",
        "جون دو",
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
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "ar": "لم يتم العثور على عناصر",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "ar": "تم العثور على عنصر واحد",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "ar": "تم العثور على عناصر متعددة",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
            "ar": "لا توجد بيانات صالحة متاحة",
          },
        },
      },
    },
  },
}
```
