---
docName: package__express-intlayer
url: /doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق حزمة | express-intlayer
description: انظر كيف تستخدم حزمة express-intlayer
keywords:
  - Intlayer
  - express-intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# express-intlayer: حزمة JavaScript لتدويل (i18n) تطبيق Express.js

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React و Next.js و Express.js.

**حزمة `express-intlayer`** تتيح لك تدويل تطبيق Express.js الخاص بك. توفر وسيطًا لاكتشاف اللغة المفضلة للمستخدم، وتعيد القاموس المناسب للمستخدم.

## لماذا تدويل الواجهة الخلفية؟

تدويل الواجهة الخلفية أمر ضروري لخدمة جمهور عالمي بفعالية. يتيح لتطبيقك تقديم المحتوى والرسائل بلغة كل مستخدم مفضلة. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر سهولة وملاءمة للأشخاص من خلفيات لغوية مختلفة.

### حالات الاستخدام العملية

- **عرض أخطاء الواجهة الخلفية بلغة المستخدم**: عند حدوث خطأ، عرض الرسائل بلغة المستخدم الأصلية يحسن الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل التوست أو النوافذ المنبثقة.

- **استرجاع المحتوى متعدد اللغات**: بالنسبة للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التدويل إمكانية تقديم هذا المحتوى بلغات متعددة. هذا أمر حاسم للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات والمحتويات الأخرى باللغة المفضلة للمستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملاتية أو حملات تسويقية أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **إشعارات الدفع متعددة اللغات**: بالنسبة لتطبيقات الهاتف المحمول، يمكن أن يؤدي إرسال إشعارات الدفع بلغة المستخدم المفضلة إلى تعزيز التفاعل والاحتفاظ. هذه اللمسة الشخصية يمكن أن تجعل الإشعارات تبدو أكثر صلة وقابلية للتنفيذ.

- **الاتصالات الأخرى**: أي شكل من أشكال الاتصال من الواجهة الخلفية، مثل رسائل SMS أو تنبيهات النظام أو تحديثات واجهة المستخدم، يستفيد من أن يكون بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم العامة.

من خلال تدويل الواجهة الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة رئيسية في توسيع خدماتك على مستوى العالم.

## لماذا دمج Intlayer؟

- **بيئة آمنة من الأخطاء**: استفد من TypeScript لضمان أن تكون جميع تعريفات المحتوى دقيقة وخالية من الأخطاء.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### إعداد Intlayer

يوفر Intlayer ملف إعداد لتكوين مشروعك. ضع هذا الملف في جذر مشروعك.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite

كما يعمل بسلاسة مع أي حل تدويل عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال الرؤوس أو الكوكيز:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات الإعداد الأخرى
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
  // ... خيارات الإعداد الأخرى
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
  // ... خيارات الإعداد الأخرى
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

بشكل افتراضي، سيقوم `express-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

## الوظائف التي يوفرها حزمة `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar-GB/packages/express-intlayer/t.md)
