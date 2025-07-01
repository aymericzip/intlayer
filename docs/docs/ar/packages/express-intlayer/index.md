---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق الحزمة | express-intlayer
description: تعرف على كيفية استخدام حزمة express-intlayer
keywords:
  - Intlayer
  - express-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - express-intlayer
---

# express-intlayer: حزمة جافاسكريبت لتدويل تطبيق Express.js

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافاسكريبت. وهي متوافقة مع أُطُر العمل مثل React و Next.js و Express.js.

**حزمة `express-intlayer`** تتيح لك تدويل تطبيق Express.js الخاص بك. فهي توفر وسيطًا (middleware) لاكتشاف اللغة المفضلة للمستخدم، وتعيد القاموس المناسب للمستخدم.

## لماذا تقوم بتدويل الواجهة الخلفية (Backend) الخاصة بك؟

تدويل الواجهة الخلفية أمر ضروري لخدمة جمهور عالمي بفعالية. فهو يسمح لتطبيقك بتقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك بجعله أكثر وصولًا وملاءمة للأشخاص من خلفيات لغوية مختلفة.

### حالات استخدام عملية

- **عرض أخطاء الواجهة الخلفية بلغة المستخدم**: عند حدوث خطأ، فإن عرض الرسائل بلغة المستخدم الأم يحسن الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل الإشعارات المنبثقة أو النوافذ الحوارية.

- **استرجاع المحتوى متعدد اللغات**: بالنسبة للتطبيقات التي تستخرج المحتوى من قاعدة بيانات، يضمن التدويل إمكانية تقديم هذا المحتوى بعدة لغات. هذا أمر حيوي للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات والمحتويات الأخرى باللغة التي يفضلها المستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملاتية، حملات تسويقية، أو إشعارات، فإن إرسال الرسائل بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **الإشعارات الفورية متعددة اللغات**: بالنسبة لتطبيقات الهواتف المحمولة، يمكن أن يعزز إرسال الإشعارات الفورية بلغة المستخدم المفضلة التفاعل والاحتفاظ به. هذه اللمسة الشخصية تجعل الإشعارات تبدو أكثر صلة وقابلية للتنفيذ.

- **الاتصالات الأخرى**: أي شكل من أشكال الاتصال من الخلفية، مثل رسائل SMS، تنبيهات النظام، أو تحديثات واجهة المستخدم، يستفيد من كونه بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم بشكل عام.

من خلال تدويل الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة أساسية في توسيع خدماتك على مستوى العالم.

## لماذا تدمج Intlayer؟

- **بيئة آمنة من حيث النوع**: استفد من TypeScript لضمان أن جميع تعريفات المحتوى الخاصة بك دقيقة وخالية من الأخطاء.

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

### تكوين Intlayer

يوفر Intlayer ملف تكوين لإعداد مشروعك. ضع هذا الملف في جذر مشروعك.

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

> للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

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
      fr: "مثال على المحتوى المعاد بالفرنسية",
      "es-ES": "مثال على المحتوى المعاد بالإسبانية (إسبانيا)",
      "es-MX": "مثال على المحتوى المعاد بالإسبانية (المكسيك)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`يتم الاستماع على المنفذ 3000`));
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
      en: "مثال على المحتوى المعاد بالإنجليزية",
      fr: "مثال على المحتوى المعاد بالفرنسية",
      "es-MX": "مثال على المحتوى المعاد بالإسبانية (المكسيك)",
      "es-ES": "مثال على المحتوى المعاد بالإسبانية (إسبانيا)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`يتم الاستماع على المنفذ 3000`));
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
      en: "مثال على المحتوى المعاد بالإنجليزية",
      fr: "مثال على المحتوى المعاد بالفرنسية",
      "es-MX": "مثال على المحتوى المعاد بالإسبانية (المكسيك)",
      "es-ES": "مثال على المحتوى المعاد بالإسبانية (إسبانيا)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`يتم الاستماع على المنفذ 3000`));
```

### التوافق

`express-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite

كما يعمل بسلاسة مع أي حل للتدويل عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال الرؤوس أو ملفات تعريف الارتباط:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات تكوين أخرى
  middleware: {
    headerName: "my-locale-header", // اسم رأس اللغة
    cookieName: "my-locale-cookie", // اسم ملف تعريف الارتباط للغة
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
    headerName: "my-locale-header", // اسم رأس اللغة
    cookieName: "my-locale-cookie", // اسم ملف تعريف الارتباط للغة
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... خيارات التهيئة الأخرى
  middleware: {
    headerName: "my-locale-header", // اسم رأس اللغة
    cookieName: "my-locale-cookie", // اسم ملف تعريف الارتباط للغة
  },
};

module.exports = config;
```

بشكل افتراضي، سيقوم `express-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

## الوظائف المقدمة من حزمة `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/express-intlayer/t.md)

## تاريخ الوثائق

- 5.5.10 - 2025-06-29: بداية التاريخ
