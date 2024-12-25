# البدء بتدويل (i18n) باستخدام Intlayer و Express

`express-intlayer` هو وسيط قوي لتدويل (i18n) لتطبيقات Express، مصمم لجعل خدماتك الخلفية متاحة عالمياً من خلال تقديم استجابات محلية بناءً على تفضيلات العميل.

## لماذا يجب تدويل خلفيتك؟

تدويل خلفيتك أمر أساسي لخدمة جمهور عالمي بشكل فعال. يتيح لتطبيقك تقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر وصولاً وملاءمة للأشخاص من خلفيات لغوية مختلفة.

### حالات الاستخدام العملية

- **عرض أخطاء الخلفية بلغة المستخدم**: عندما يحدث خطأ، فإن عرض الرسائل بلغة المستخدم الأصلية يحسن الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص لرسائل الخطأ الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل الإشعارات أو النوافذ المنبثقة.

- **استرجاع محتوى متعدد اللغات**: بالنسبة للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بعدة لغات. هذه نقطة حاسمة بالنسبة للمنصات مثل مواقع التجارة الإلكترونية أو نظم إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات ومحتويات أخرى بلغة المستخدم المفضلة.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملات، حملات تسويقية، أو إشعارات، فإن إرسال الرسائل الإلكترونية بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **إشعارات دفع متعددة اللغات**: بالنسبة لتطبيقات الهاتف المحمول، فإن إرسال إشعارات دفع بلغة المستخدم المفضلة يمكن أن يعزز التفاعل والاحتفاظ. يمكن أن تجعل هذه اللمسة الشخصية الإشعارات تبدو أكثر صلة وقابلة للتنفيذ.

- **الاتصالات الأخرى**: أي شكل من أشكال الاتصال من الخلفية، مثل رسائل SMS، التنبيهات النظامية، أو تحديثات واجهة المستخدم، تستفيد من كونها بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم بشكل عام.

من خلال تدويل الخلفية، يضمن تطبيقك احترام الاختلافات الثقافية، لكنه أيضاً يتماشى بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة رئيسية في توسيع خدماتك على مستوى العالم.

## البدء

### التثبيت

للبدء باستخدام `express-intlayer`، قم بتثبيت الحزمة باستخدام npm:

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

قم بتكوين إعدادات التدويل من خلال إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

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

إعداد تطبيق Express الخاص بك لاستخدام `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// تحميل معالج طلب التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المعاد في الإنجليزية",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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

// تحميل معالج طلب التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المعاد في الإنجليزية",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
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

// تحميل معالج طلب التدويل
app.use(intlayer());

// المسارات
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "مثال على المحتوى المعاد في الإنجليزية",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// بدء الخادم
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### التوافق

`express-intlayer` متوافق تماماً مع:

- `react-intlayer` لتطبيقات React
- `next-intlayer` لتطبيقات Next.js

كما أنه يعمل بسلاسة مع أي حل دولي عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط للكشف عن اللغة من خلال رؤوس أو ملفات تعريف الارتباط:

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

> لمزيد من المعلومات حول تكوين المواضيع المتقدمة، قم بزيارة [التوثيق الخاص بنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## مدعوم بواسطة TypeScript

يستفيد `express-intlayer` من القدرات القوية لـ TypeScript لتحسين عملية التدويل. يضمن التدويل الثابت لـ TypeScript أن كل مفتاح ترجمة يتم احتسابه، مما يقلل من خطر فقدان الترجمات ويحسن قابلية الصيانة.

> تأكد من تضمين الأنواع المولدة (بشكل افتراضي في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.
