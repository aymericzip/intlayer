# Documentation: `t` Function in `express-intlayer`

تطبيق `t` في حزمة `express-intlayer` هو الأداة الأساسية لتوفير استجابة محلية في تطبيق Express الخاص بك. يبسط التدويل (i18n) من خلال اختيار المحتوى ديناميكيًا بناءً على اللغة المفضلة للمستخدم.

---

## نظرة عامة

تستخدم وظيفة `t` لتعريف واسترجاع الترجمات لمجموعة معينة من اللغات. تحدد تلقائيًا اللغة المناسبة لإرجاعها استنادًا إلى إعدادات طلب العميل، مثل رأس `Accept-Language`. إذا كانت اللغة المفضلة غير متاحة، فإنها تعود بسلاسة إلى اللغة الافتراضية المحددة في إعداداتك.

---

## الميزات الرئيسية

- **التعريب الديناميكي**: تختار تلقائيًا الترجمة الأنسب للعميل.
- **العودة إلى اللغة الافتراضية**: تعود إلى اللغة الافتراضية إذا كانت اللغة المفضلة للعميل غير متاحة، مما يضمن استمرارية تجربة المستخدم.
- **خفيف وسريع**: مصمم للتطبيقات عالية الأداء، مما يضمن الحد الأدنى من الحمل.
- **دعم الوضع الصارم**: فرض الالتزام الصارم باللغات المعلنة لضمان سلوك موثوق.

---

## توقيع الوظيفة

```typescript
t(translations: Record<string, string>): string;
```

### المعلمات

- `translations`: كائن حيث تكون المفاتيح هي رموز اللغات (مثل `en`، `fr`، `es-MX`) والقيم هي السلاسل المترجمة المقابلة.

### الإرجاع

- سلسلة تمثل المحتوى بلغة العميل المفضلة.

---

## تحميل معالج طلب التدويل

لضمان أن وظيفة التدويل المقدمة بواسطة `express-intlayer` تعمل بشكل صحيح، يجب عليك **تحميل** البرنامج الوسيط للتدويل في بداية تطبيق Express الخاص بك. يُمكن ذلك وظيفة `t` ويضمن التعامل الصحيح مع كشف اللغة والترجمة.

قم بإضافة البرنامج الوسيط `app.use(intlayer())` **قبل أي مسارات** في تطبيقك لضمان أن جميع المسارات تستفيد من التدويل:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// تحميل معالج طلب التدويل
app.use(intlayer());

// تعريف المسارات الخاصة بك بعد تحميل البرنامج الوسيط
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
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

// تعريف المسارات الخاصة بك بعد تحميل البرنامج الوسيط
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
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

// تعريف المسارات الخاصة بك بعد تحميل البرنامج الوسيط
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### لماذا يُعتبر ذلك مطلوبًا

- **كشف اللغة**: تعمل الوسيطة `intlayer` على معالجة الطلبات الواردة للكشف عن اللغة المفضلة للمستخدم بناءً على الرؤوس، والكوكيز، أو طرق أخرى مكونة.
- **سياق الترجمة**: يحدد السياق الضروري لعمل وظيفة `t` بشكل صحيح، مما يضمن إرجاع الترجمات باللغة الصحيحة.
- **منع الأخطاء**: بدون هذا البرنامج الوسيط، سيؤدي استخدام وظيفة `t` إلى حدوث أخطاء وقت التشغيل لأن معلومات اللغة اللازمة لن تكون متاحة.

---

## أمثلة الاستخدام

### مثال أساسي

قدم المحتوى المحلي بلغات مختلفة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
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
    })
  );
});
```

**طلبات العميل:**

- عميل لديه `Accept-Language: fr` سيتلقى `Bienvenue!`.
- عميل لديه `Accept-Language: es` سيتلقى `¡Bienvenido!`.
- عميل لديه `Accept-Language: de` سيتلقى `Welcome!` (اللغة الافتراضية).

### التعامل مع الأخطاء

توفير رسائل خطأ بلغات متعددة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
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
    })
  );
});
```

---

### استخدام متغيرات اللغة

قم بتحديد الترجمات للمتغيرات الخاصة باللغة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
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
    })
  );
});
```

---

## مواضيع متقدمة

### آلية العودة

إذا كانت اللغة المفضلة غير متاحة، ستعود وظيفة `t` إلى اللغة الافتراضية المحددة في الإعدادات:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

على سبيل المثال:

- إذا كانت `defaultLocale` هي `Locales.CHINESE` وطلب عميل `Locales.DUTCH`، ستكون الترجمة التي تم إرجاعها تعود إلى قيمة `Locales.CHINESE`.
- إذا كانت `defaultLocale` غير محددة، ستعود وظيفة `t` إلى قيمة `Locales.ENGLISH`.

---

### تنفيذ الوضع الصارم

قم بتكوين وظيفة `t` لفرض الالتزام الصارم باللغات المعلنة:

| الوضع           | السلوك                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------ |
| `strict`        | يجب أن تحتوي جميع اللغات المعلنة على ترجمات مقدمة. ستؤدي الغائب من اللغات إلى حدوث أخطاء.  |
| `required_only` | يجب أن تحتوي اللغات المعلنة على ترجمات. يؤدي الغائب من اللغات إلى تحذيرات ولكن يتم قبولها. |
| `loose`         | يتم قبول أي لغة موجودة، حتى لو لم يتم إعلانها.                                             |

مثال على الإعداد:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... إعداداتك الحالية
  internationalization: {
    // ... إعدادات التدويل الحالية
    strictMode: "strict", // فرض الوضع الصارم
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... إعداداتك الحالية
  internationalization: {
    // ... إعدادات التدويل الحالية
    strictMode: "strict", // فرض الوضع الصارم
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعداداتك الحالية
  internationalization: {
    // ... إعدادات التدويل الحالية
    strictMode: "strict", // فرض الوضع الصارم
  },
};

module.exports = config;
```

---

### تكامل TypeScript

تكون وظيفة `t` آمنة من النوع عند استخدامها مع TypeScript. قم بتعريف كائن ترجمات آمن من النوع:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### الأخطاء الشائعة واستكشاف الأخطاء وإصلاحها

| المشكلة                 | السبب                               | الحل                                              |
| ----------------------- | ----------------------------------- | ------------------------------------------------- |
| وظيفة `t` لا تعمل       | البرنامج الوسيط غير محمل            | تأكد من إضافة `app.use(intlayer())` قبل المسارات. |
| خطأ في الترجمات الغائبة | الوضع الصارم مفعّل بدون جميع اللغات | قم بتوفير جميع الترجمات المطلوبة.                 |

---

## نصائح للاستخدام الفعال

1. **مركز الترجمات**: استخدم وحدة مركزية أو ملفات JSON لإدارة الترجمات لتحسين القابلية للصيانة.
2. **تحقق من الترجمات**: تأكد من أن كل متغير لغة له ترجمة مقابلة لمنع العودة بشكل غير ضروري.
3. **دمج مع i18n للواجهة الأمامية**: تنسيق مع التدويل في الواجهة الأمامية لتجربة مستخدم سلسة عبر التطبيق.
4. **اختبار الأداء**: اختبر أوقات استجابة تطبيقك عند إضافة الترجمات لضمان تأثيرات ضئيلة.

---

## الخاتمة

تعتبر وظيفة `t` أداة قوية للتدويل في الجهة الخلفية. من خلال استخدامها بشكل فعال، يمكنك إنشاء تطبيق أكثر شمولاً وصديقاً للمستخدم لجمهور عالمي. للاستخدام المتقدم وخيارات التكوين التفصيلية، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).
