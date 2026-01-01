---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: كيفية ترجمة الـ backend الخاص بـ Fastify – دليل التدويل (i18n) 2026
description: اكتشف كيفية جعل خادم Fastify الخاص بك متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - Fastify
  - JavaScript
  - الخادم
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: إضافة أمر init
  - version: 7.6.0
    date: 2025-12-31
    changes: تهيئة السجل
---

# ترجمة موقع الويب الخاص بخادم Fastify باستخدام Intlayer | التدويل (i18n)

`fastify-intlayer` هو ملحق (plugin) قوي للتدويل (i18n) لتطبيقات Fastify، مصمم لجعل خدمات الـ backend الخاصة بك متاحة عالميًا من خلال تقديم استجابات محلية حسب تفضيلات العميل.

### حالات استخدام عملية

- **عرض أخطاء الـ backend بلغة المستخدم**: عند حدوث خطأ، عرض الرسائل بلغة المستخدم الأم يُحسّن الفهم ويقلل الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية للأخطاء التي قد تُعرض في مكونات الواجهة الأمامية مثل toasts أو modals.

`fastify-intlayer` هو مكون إضافي قوي للتدويل (i18n) لتطبيقات Fastify، مصمم لجعل خدمات backend الخاصة بك متاحة عالميًا من خلال تقديم استجابات مَحَلّية بناءً على تفضيلات العميل.

### حالات استخدام عملية

- **عرض أخطاء الخادم بلغة المستخدم**: عندما يحدث خطأ، فإن عرض الرسائل بلغة المستخدم الأم يحسّن الفهم ويقلل الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية للأخطاء التي قد تُعرض في مكونات الواجهة الأمامية مثل toasts أو modals.
- **استرجاع محتوى متعدد اللغات**: بالنسبة للتطبيقات التي تجلب المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بعدة لغات. هذا أمر حاسم لمنصات مثل مواقع e-commerce أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات ومحتويات أخرى باللغة التي يفضلها المستخدم.
- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت transactional emails أو حملات تسويقية أو notifications، فإن إرسال الرسائل البريدية بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.
- **الإشعارات المتعددة اللغات (Multilingual Push Notifications)**: بالنسبة لتطبيقات الجوال، إرسال إشعارات الدفع بلغة مفضلة لدى المستخدم يمكن أن يعزز التفاعل والاحتفاظ بالمستخدمين. تضيف هذه اللمسة الشخصية شعورًا بأن الإشعارات ذات صلة وقابلة للتنفيذ.
- **وسائل اتصال أخرى**: أي شكل من أشكال الاتصال من الـ backend، مثل رسائل SMS أو تنبيهات النظام أو تحديثات واجهة المستخدم، يستفيد من تقديمه بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم العامة.

من خلال تدويل الـ backend، لا يحترم تطبيقك الفروق الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة أساسية لتوسيع نطاق خدماتك عالميًا.

## البدء

### التثبيت

لبدء استخدام `fastify-intlayer`، قم بتثبيت الحزمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### الإعداد

قم بتكوين إعدادات التدويل بإنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### إعلان المحتوى

أنشئ وادِر تعريفات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ar: "مثال على المحتوى المعاد باللغة الإنجليزية",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ar: "مثال على المحتوى المعاد باللغة الإنجليزية",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ar: "مثال على المحتوى المعاد باللغة الإنجليزية",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ar: "مثال على المحتوى المعاد باللغة الإنجليزية",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "ar": "مثال على المحتوى المعاد باللغة الإنجليزية",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى (content declarations) في أي مكان داخل تطبيقك طالما أنها مضمنة في دليل `contentDir` (افتراضياً `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضياً `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### إعداد تطبيق Fastify

أعد إعداد تطبيق Fastify لاستخدام `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// تحميل إضافة التدويل
await fastify.register(intlayer);

// المسارات
fastify.get("/t_example", async (_req, reply) => {
  return t({
    ar: "مثال على المحتوى المُعاد باللغة الإنجليزية",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// بدء الخادم
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// تحميل إضافة التدويل
await fastify.register(intlayer);

// المسارات
fastify.get("/t_example", async (_req, reply) => {
  return t({
    ar: "مثال على المحتوى المعاد باللغة العربية",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

javascript fileName="src/index.mjs" codeFormat="esm"
fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// بدء الخادم
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// غلاف بدء الخادم لـ async/await
const start = async () => {
  try {
    // تحميل مكون التدويل
    await fastify.register(intlayer);

    // المسارات
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        ar: "مثال على المحتوى المعاد باللغة العربية",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Start server wrapper for async/await
const start = async () => {
  try {
    // Load internationalization plugin
    await fastify.register(intlayer);

    // Routes
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        ar: "مثال على المحتوى المعاد باللغة العربية",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### التوافق

`fastify-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md)>) لتطبيقات React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md)>) لتطبيقات Next.js

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md)>) لتطبيقات React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md)>) لتطبيقات Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md)>) لتطبيقات Vite

كما يعمل بسلاسة مع أي حل للتدويل عبر بيئات متعددة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الـ middleware لاكتشاف اللغة عبر الرؤوس أو الكوكيز:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات التكوين الأخرى
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... خيارات تكوين أخرى
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... خيارات تكوين أخرى
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

بشكل افتراضي، سيقوم `fastify-intlayer` بتفسير رأس الطلب `Accept-Language` لتحديد اللغة المفضلة لدى العميل.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة، قم بزيارة [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### تكوين TypeScript

`fastify-intlayer` يستفيد من القدرات القوية لـ TypeScript لتحسين عملية التدويل. يضمن نظام الكتابة الثابتة في TypeScript أن كل مفتاح ترجمة مغطى، مما يقلل من خطر فقدان الترجمات ويحسن قابلية الصيانة.

تأكد من تضمين الأنواع المولدة تلقائياً (بشكل افتراضي في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائياً
  ],
}
```

### امتداد VS Code

لتحسين تجربة التطوير مع Intlayer، يمكنك تثبيت الامتداد الرسمي **Intlayer VS Code Extension**.

[التثبيت من سوق إضافات VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يقدّم هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات مُضمّنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع وثائق امتداد Intlayer لـ VS Code: [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

### تكوين Git

يوصى بتجاهل الملفات التي يولّدها Intlayer. يتيح ذلك تجنّب عمل commit لها في مستودع Git الخاص بك.

لتحقيق ذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer

```
