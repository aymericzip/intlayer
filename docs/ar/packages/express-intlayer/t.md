# وثائق: وظيفة `t` في `express-intlayer`

وظيفة `t` في حزمة `express-intlayer` هي الأداة الأساسية لتوفير استجابات مترجمة في تطبيق Express الخاص بك. تبسط عملية التدويل (i18n) من خلال اختيار المحتوى ديناميكيًا بناءً على اللغة المفضلة للمستخدم.

---

## نظرة عامة

تُستخدم وظيفة `t` لتعريف واسترجاع الترجمات لمجموعة معينة من اللغات. تحدد تلقائيًا اللغة المناسبة للإرجاع بناءً على إعدادات طلب العميل، مثل ترويسة `Accept-Language`. إذا لم تكن اللغة المفضلة متوفرة، فإنها تعود بسلاسة إلى اللغة الافتراضية المحددة في التكوين الخاص بك.

---

## الميزات الرئيسية

- **التدويل الديناميكي**: يختار الترجمة الأنسب للعميل تلقائيًا.
- **العودة إلى اللغة الافتراضية**: يعود إلى اللغة الافتراضية إذا لم تكن اللغة المفضلة للعميل متوفرة، مما يضمن استمرارية تجربة المستخدم.
- **خفيف وسريع**: مصمم للتطبيقات عالية الأداء، مما يضمن الحد الأدنى من التأثير.
- **دعم الوضع الصارم**: يفرض الالتزام الصارم باللغات المعلنة لضمان السلوك الموثوق.

---

## توقيع الوظيفة

```typescript
t(translations: Record<string, string>): string;
```

### المعلمات

- `translations`: كائن حيث تكون المفاتيح رموز اللغات (مثل `en`, `fr`, `es-MX`) والقيم هي النصوص المترجمة المقابلة.

### الإرجاع

- سلسلة نصية تمثل المحتوى بلغة العميل المفضلة.

---

## تحميل معالج طلب التدويل

لضمان عمل وظيفة التدويل التي يوفرها `express-intlayer` بشكل صحيح، **يجب** تحميل الوسيط الخاص بالتدويل في بداية تطبيق Express الخاص بك. يتيح ذلك وظيفة `t` ويضمن التعامل الصحيح مع اكتشاف اللغة والترجمة.

ضع الوسيط `app.use(intlayer())` **قبل أي مسارات** في تطبيقك لضمان استفادة جميع المسارات من التدويل:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// تحميل معالج طلب التدويل
app.use(intlayer());

// تعريف المسارات بعد تحميل الوسيط
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ar: "مرحبًا، العالم!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// تحميل معالج طلب التدويل
app.use(intlayer());

// تعريف المسارات بعد تحميل الوسيط
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ar: "مرحبًا، العالم!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// تحميل معالج طلب التدويل
app.use(intlayer());

// تعريف المسارات بعد تحميل الوسيط
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ar: "مرحبًا، العالم!",
    })
  );
});
```

### لماذا هذا مطلوب

- **اكتشاف اللغة**: يقوم الوسيط `intlayer` بمعالجة الطلبات الواردة لاكتشاف اللغة المفضلة للمستخدم بناءً على الترويسات أو الكوكيز أو الطرق الأخرى المكونة.
- **سياق الترجمة**: يهيئ السياق اللازم لوظيفة `t` للعمل بشكل صحيح، مما يضمن إرجاع الترجمات باللغة الصحيحة.
- **منع الأخطاء**: بدون هذا الوسيط، ستؤدي وظيفة `t` إلى أخطاء وقت التشغيل لأن معلومات اللغة اللازمة لن تكون متوفرة.

---

## أمثلة الاستخدام

### مثال أساسي

تقديم محتوى مترجم بلغات مختلفة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
      ar: "مرحبًا!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
      ar: "مرحبًا!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
      ar: "مرحبًا!",
    })
  );
});
```

**طلبات العميل:**

- العميل مع `Accept-Language: fr` سيستلم `Bienvenue!`.
- العميل مع `Accept-Language: es` سيستلم `¡Bienvenido!`.
- العميل مع `Accept-Language: de` سيستلم `Welcome!` (اللغة الافتراضية).

### معالجة الأخطاء

توفير رسائل خطأ بلغات متعددة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
      ar: "حدث خطأ غير متوقع.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
      ar: "حدث خطأ غير متوقع.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
      ar: "حدث خطأ غير متوقع.",
    })
  );
});
```

---

### استخدام المتغيرات المحلية

تحديد الترجمات للمتغيرات المحلية المحددة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
      ar: "مرحبًا!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
      ar: "مرحبًا!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
      ar: "مرحبًا!",
    })
  );
});
```

---

## مواضيع متقدمة

### آلية العودة

إذا لم تكن اللغة المفضلة متوفرة، فإن وظيفة `t` ستعود إلى اللغة الافتراضية المحددة في التكوين:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

---

## الخاتمة

وظيفة `t` هي أداة قوية للتدويل في الخلفية. باستخدامها بشكل فعال، يمكنك إنشاء تطبيق أكثر شمولية وملاءمة للمستخدمين على مستوى العالم. لمزيد من الاستخدامات المتقدمة وخيارات التكوين التفصيلية، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).
