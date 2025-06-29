---
docName: intlayer_with_express
url: https://intlayer.org/doc/environment/express
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: ترجم موقعك الإلكتروني Express (i18n)
description: اكتشف كيفية جعل الواجهة الخلفية لـ vite متعددة اللغات. اتبع الوثائق لتدويل (i18n) وترجمتها.
keywords:
  - دولية
  - توثيق
  - Intlayer
  - Express
  - JavaScript
  - الخلفية
---

# البدء في التدويل (i18n) باستخدام Intlayer و Express

`express-intlayer` هو وسيط قوي للتدويل (i18n) لتطبيقات Express، مصمم لجعل خدماتك الخلفية متاحة عالميًا من خلال توفير استجابات محلية بناءً على تفضيلات العميل.

## لماذا تدويل الخلفية؟

تدويل الخلفية أمر ضروري لخدمة جمهور عالمي بفعالية. يسمح لتطبيقك بتقديم المحتوى والرسائل بلغة كل مستخدم المفضلة. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق وصول تطبيقك بجعله أكثر سهولة وملاءمة للأشخاص من خلفيات لغوية مختلفة.

### حالات استخدام عملية

- **عرض أخطاء الخلفية بلغة المستخدم**: عند حدوث خطأ، عرض الرسائل بلغة المستخدم الأصلية يحسن الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل التوست أو النوافذ المنبثقة.

- **استرجاع المحتوى متعدد اللغات**: بالنسبة للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بلغات متعددة. هذا أمر حيوي للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات والمحتويات الأخرى باللغة المفضلة للمستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملاتية، حملات تسويقية، أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **إشعارات دفع متعددة اللغات**: بالنسبة لتطبيقات الهاتف المحمول، إرسال إشعارات الدفع بلغة المستخدم المفضلة يمكن أن يعزز التفاعل والاحتفاظ. هذه اللمسة الشخصية يمكن أن تجعل الإشعارات تبدو أكثر ملاءمة وقابلة للتنفيذ.

- **اتصالات أخرى**: أي شكل من أشكال الاتصال من الخلفية، مثل رسائل SMS، تنبيهات النظام، أو تحديثات واجهة المستخدم، يستفيد من أن يكون بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم بشكل عام.

من خلال تدويل الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة رئيسية في توسيع خدماتك عالميًا.

## البدء

### التثبيت

لبدء استخدام `express-intlayer`، قم بتثبيت الحزمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### الإعداد

قم بتكوين إعدادات التدويل عن طريق إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

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

### إعداد تطبيق Express

قم بإعداد تطبيق Express الخاص بك لاستخدام `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// تحميل معالج طلبات التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      ar: "مثال على المحتوى المُعاد باللغة العربية",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// تحميل معالج طلبات التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      ar: "مثال على المحتوى المُعاد باللغة العربية",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// تحميل معالج طلبات التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      ar: "مثال على المحتوى المُعاد باللغة العربية",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### التوافق

`express-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite

كما يعمل بسلاسة مع أي حل تدويل عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال الرؤوس أو الكوكيز:

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
  // ... خيارات التكوين الأخرى
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
  // ... خيارات التكوين الأخرى
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

بشكل افتراضي، سيقوم `express-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة، قم بزيارة [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### تكوين TypeScript

يستفيد `express-intlayer` من قدرات TypeScript القوية لتعزيز عملية التدويل. يضمن التحقق الثابت من TypeScript أن كل مفتاح ترجمة يتم حسابه، مما يقلل من خطر فقدان الترجمات ويحسن القابلية للصيانة.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من تضمين الأنواع المولدة تلقائيًا (افتراضيًا في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... إعدادات TypeScript الحالية الخاصة بك
  "include": [
    // ... إعدادات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```
