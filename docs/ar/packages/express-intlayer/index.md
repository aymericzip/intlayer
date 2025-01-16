# express-intlayer: حزمة JavaScript لتدويل (i18n) تطبيق Express.js

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React و Next.js و Express.js.

**حزمة `express-intlayer`** تتيح لك تدويل تطبيق Express.js الخاص بك. إنها توفر وسيطًا لاكتشاف اللغة المفضلة للمستخدم، وتعيد القاموس المناسب للمستخدم.

## لماذا يجب تدويل الواجهة الخلفية الخاصة بك؟

تدويل الواجهة الخلفية الخاصة بك أمر ضروري لخدمة جمهور عالمي بفعالية. إنها تمكن تطبيقك من تقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة من تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر سهولة وملاءمة للناس من خلفيات لغوية مختلفة.

### حالات الاستخدام العملية

- **عرض أخطاء الواجهة الخلفية بلغة المستخدم**: عند حدوث خطأ، فإن عرض الرسائل باللغة الأم للمستخدم يحسن الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل النوافذ المنبثقة أو النماذج.

- **استرجاع محتوى متعدد اللغات**: لتطبيقات تسحب المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بعدة لغات. هذا أمر حيوي للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات وغيرها من المحتويات باللغة المفضلة للمستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملاتية أو حملات تسويقية أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **إشعارات دفع متعددة اللغات**: لتطبيقات الهواتف المحمولة، إرسال إشعارات دفع بلغة المستخدم المفضلة يمكن أن يعزز من التفاعل والحفاظ على المستخدمين. يمكن أن تجعل هذه اللمسة الشخصية الإشعارات تبدو أكثر صلة وقابلة للتنفيذ.

- **اتصالات أخرى**: أي شكل من أشكال الاتصال من الواجهة الخلفية، مثل رسائل SMS، أو تنبيهات النظام، أو تحديثات واجهة المستخدم، يستفيد من أن يكون باللغة الخاصة بالمستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم الكلية.

من خلال تدويل الواجهة الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعلها خطوة رئيسية في توسيع خدماتك عالميًا.

## لماذا دمج Intlayer؟

- **بيئة آمنة من نوعها**: استغل TypeScript لضمان أن جميع تعريفات المحتوى الخاصة بك دقيقة وخالية من الأخطاء.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مديري الحزم المفضلين لديك:

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

> لمشاهدة قائمة كاملة بالمعلمات المتاحة، يرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## مثال على الاستخدام

قم بإعداد تطبيق Express الخاص بك لاستخدام `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// قم بتحميل معالج طلب التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المعاد بلغة الإنجليزية",
      fr: "مثال على المحتوى المعاد بالفرنسية",
      "es-ES": "مثال على المحتوى المعاد بالإسبانية (إسبانيا)",
      "es-MX": "مثال على المحتوى المعاد بالإسبانية (المكسيك)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`الاستماع على البورت 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// قم بتحميل معالج طلب التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المعاد بلغة الإنجليزية",
      fr: "مثال على المحتوى المعاد بالفرنسية",
      "es-MX": "مثال على المحتوى المعاد بالإسبانية (المكسيك)",
      "es-ES": "مثال على المحتوى المعاد بالإسبانية (إسبانيا)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`الاستماع على البورت 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// قم بتحميل معالج طلب التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المعاد بلغة الإنجليزية",
      fr: "مثال على المحتوى المعاد بالفرنسية",
      "es-MX": "مثال على المحتوى المعاد بالإسبانية (المكسيك)",
      "es-ES": "مثال على المحتوى المعاد بالإسبانية (إسبانيا)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`الاستماع على البورت 3000`));
```

### التوافق

`express-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite

كما أنه يعمل بسلاسة مع أي حل تدويل عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال الرؤوس أو ملفات الكوكيز:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات تكوين أخرى
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

بشكل افتراضي، سيقوم `express-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

## الوظائف المقدمة بواسطة حزمة `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/express-intlayer/t.md)
