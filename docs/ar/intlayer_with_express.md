# البدء في التعريب (i18n) مع Intlayer و Express

`express-intlayer` هو وسيلة قوية للتعريب (i18n) لتطبيقات Express، مصممة لجعل خدماتك الخلفية متاحة عالميًا من خلال توفير ردود محلية بناءً على تفضيلات العميل.

## لماذا تعريب الخلفية الخاصة بك؟

تعريب الخلفية الخاصة بك أمر ضروري لتقديم خدمة فعالة لجمهور عالمي. إنه يتيح لتطبيقك توصيل المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق وصول تطبيقك من خلال جعله أكثر ملاءمة وملاءمة للأشخاص من خلفيات لغوية مختلفة.

### استخدامات عملية

- **عرض أخطاء الخلفية بلغة المستخدم**: عند حدوث خطأ، فإن عرض الرسائل بلغة المستخدم الأصلية يحسن الفهم ويقلل من الإحباط. هذه الميزة مفيدة بشكل خاص لرسائل الخطأ الديناميكية التي يمكن عرضها في مكونات الواجهة الأمامية مثل التنبيهات أو النوافذ المنبثقة.

- **استرجاع المحتوى متعدد اللغات**: للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التعريب أنه يمكنك تقديم هذا المحتوى بعدة لغات. هذا أمر بالغ الأهمية للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات ومحتويات أخرى باللغة المفضلة للمستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملاتية أو حملات تسويقية أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل ملحوظ من التفاعل والفعالية.

- **إشعارات دفع متعددة اللغات**: بالنسبة للتطبيقات المحمولة، يمكن أن يساعد إرسال إشعارات الدفع بلغة المستخدم المفضلة في تعزيز التفاعل والاحتفاظ. هذه اللمسة الشخصية يمكن أن تجعل الإشعارات تبدو أكثر ملاءمة وقابلة للتنفيذ.

- **الاتصالات الأخرى**: أي شكل من أشكال الاتصالات من الخلفية، مثل رسائل SMS، أو تنبيهات النظام، أو تحديثات واجهة المستخدم، تستفيد من كونها باللغة الخاصة بالمستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم العامة.

من خلال تعريب الخلفية، لا يحترم تطبيقك الفروق الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة رئيسية في توسيع خدماتك على مستوى العالم.

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

قم بتكوين إعدادات التعريب من خلال إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

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

// تحميل معالج طلبات التعريب
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المرسل باللغة الإنجليزية",
      fr: "مثال على المحتوى المرسل باللغة الفرنسية",
      "es-ES": "مثال على المحتوى المرسل باللغة الإسبانية (إسبانيا)",
      "es-MX": "مثال على المحتوى المرسل باللغة الإسبانية (المكسيك)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`استماع على المنفذ 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// تحميل معالج طلبات التعريب
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المرسل باللغة الإنجليزية",
      fr: "مثال على المحتوى المرسل باللغة الفرنسية",
      "es-MX": "مثال على المحتوى المرسل باللغة الإسبانية (المكسيك)",
      "es-ES": "مثال على المحتوى المرسل باللغة الإسبانية (إسبانيا)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`استماع على المنفذ 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// تحميل معالج طلبات التعريب
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المرسل باللغة الإنجليزية",
      fr: "مثال على المحتوى المرسل باللغة الفرنسية",
      "es-MX": "مثال على المحتوى المرسل باللغة الإسبانية (المكسيك)",
      "es-ES": "مثال على المحتوى المرسل باللغة الإسبانية (إسبانيا)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`استماع على المنفذ 3000`));
```

### التوافق

`express-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite

كما أنه يعمل بسلاسة مع أي حل لتعريب مختلف عبر بيئات متعددة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيطة لاكتشاف اللغة من خلال رؤوس أو ملفات تعريف الارتباط:

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

بشكل افتراضي، سيفسر `express-intlayer` رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة، قم بزيارة [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## مدعوم بواسطة TypeScript

يستفيد `express-intlayer` من القدرات القوية لـ TypeScript لتعزيز عملية التعريب. يضمن نظام typing الثابت في TypeScript أن كل مفتاح ترجمة محسوب، مما يقلل من مخاطر سوء الفهم أو فقدان الترجمات ويزيد من القابلية للصيانة.

> تأكد من تضمين الأنواع التي تم إنشاؤها (بشكل افتراضي في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.
