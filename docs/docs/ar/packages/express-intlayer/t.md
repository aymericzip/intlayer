---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: توثيق دالة t | express-intlayer
description: تعرف على كيفية استخدام دالة t لحزمة express-intlayer
keywords:
  - t
  - الترجمة
  - Intlayer
  - التدويل
  - التوثيق
  - Express
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
---

# التوثيق: دالة `t` في `express-intlayer`

تُعد دالة `t` في حزمة `express-intlayer` الأداة الأساسية لتوفير استجابات مترجمة في تطبيق Express الخاص بك. فهي تُبسّط التدويل (i18n) من خلال اختيار المحتوى ديناميكيًا بناءً على اللغة المفضلة للمستخدم.

---

## نظرة عامة

تُستخدم دالة `t` لتعريف واسترجاع الترجمات لمجموعة معينة من اللغات. حيث تحدد تلقائيًا اللغة المناسبة للإرجاع بناءً على إعدادات طلب العميل، مثل رأس `Accept-Language`. وإذا لم تكن اللغة المفضلة متاحة، فإنها تعود بسلاسة إلى اللغة الافتراضية المحددة في تكوينك.

---

## الميزات الرئيسية

- **التوطين الديناميكي**: تختار تلقائيًا الترجمة الأنسب للعميل.
- **الرجوع إلى اللغة الافتراضية**: يعود إلى اللغة الافتراضية إذا لم تكن اللغة المفضلة للعميل متاحة، مما يضمن استمرارية تجربة المستخدم.
- **خفيف وسريع**: مصمم للتطبيقات عالية الأداء، مما يضمن الحد الأدنى من التحميل.
- **دعم الوضع الصارم**: فرض الالتزام الصارم باللغات المعلنة لسلوك موثوق.

---

## توقيع الدالة

```typescript
t(translations: Record<string, string>): string;
```

### المعاملات

- `translations`: كائن حيث تكون المفاتيح هي رموز اللغات (مثل `en`، `fr`، `es-MX`) والقيم هي النصوص المترجمة المقابلة.

### القيمة المرجعة

- نص يمثل المحتوى باللغة المفضلة للعميل.

---

## تحميل معالج طلبات التدويل

لضمان عمل وظيفة التدويل التي يوفرها `express-intlayer` بشكل صحيح، يجب عليك **تحميل وسيط التدويل** في بداية تطبيق Express الخاص بك. هذا يتيح وظيفة `t` ويضمن التعامل الصحيح مع اكتشاف اللغة والترجمة.

ضع وسيط `app.use(intlayer())` **قبل أي مسارات** في تطبيقك لضمان استفادة جميع المسارات من التدويل:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// تحميل معالج طلبات التدويل
app.use(intlayer());

// تعريف المسارات بعد تحميل الوسيط
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

// تحميل معالج طلبات التدويل
app.use(intlayer());

// تعريف المسارات بعد تحميل الوسيط
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

// تحميل معالج طلبات التدويل
app.use(intlayer());

// تعريف المسارات الخاصة بك بعد تحميل الوسيط
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

### لماذا هذا مطلوب

- **كشف اللغة**: يقوم وسيط `intlayer` بمعالجة الطلبات الواردة لاكتشاف اللغة المفضلة للمستخدم بناءً على الرؤوس، ملفات تعريف الارتباط، أو طرق التكوين الأخرى.
- **سياق الترجمة**: يقوم بإعداد السياق اللازم لوظيفة `t` للعمل بشكل صحيح، مما يضمن أن الترجمات تُعاد باللغة الصحيحة.
- **منع الأخطاء**: بدون هذا الوسيط، استخدام وظيفة `t` سيؤدي إلى أخطاء وقت التشغيل لأن معلومات اللغة اللازمة لن تكون متاحة.

---

## أمثلة الاستخدام

### مثال أساسي

قدم محتوى محليًا بلغات مختلفة:

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

- العميل الذي لديه `Accept-Language: fr` سيستلم `Bienvenue!`.
- سيستلم العميل الذي يملك `Accept-Language: es` الرسالة `¡Bienvenido!`.
- سيستلم العميل الذي يملك `Accept-Language: de` الرسالة `Welcome!` (اللغة الافتراضية).

### التعامل مع الأخطاء

توفير رسائل الخطأ بعدة لغات:

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
      en: "حدث خطأ غير متوقع.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### استخدام المتغيرات المحلية

حدد الترجمات للمتغيرات الخاصة بالمحلية:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "مرحباً!",
      "en-GB": "مرحباً، يا صديقي!",
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
      en: "مرحباً!",
      "en-GB": "مرحباً، يا صديقي!",
      fr: "مرحباً!",
      "es-MX": "مرحباً، يا صديقي!",
      "es-ES": "مرحباً!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "مرحباً!",
      "en-GB": "مرحباً، يا صديقي!",
      fr: "مرحباً!",
      "es-MX": "مرحباً، يا صديقي!",
      "es-ES": "مرحباً!",
    })
  );
});
```

---

## مواضيع متقدمة

### آلية التراجع

إذا لم يكن الموقع المفضل متاحًا، فإن دالة `t` ستتراجع إلى الموقع الافتراضي المحدد في الإعدادات:

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

- إذا كانت `defaultLocale` هي `Locales.CHINESE` وطلب العميل `Locales.DUTCH`، فسيتم إرجاع الترجمة الافتراضية لقيمة `Locales.CHINESE`.
- إذا لم يتم تعريف `defaultLocale`، فستعود دالة `t` إلى قيمة `Locales.ENGLISH`.

---

### فرض وضع الصرامة

قم بتكوين دالة `t` لفرض الالتزام الصارم باللغات المعلنة:

| الوضع       | السلوك                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------- |
| `strict`    | يجب توفير ترجمات لجميع اللغات المعلنة. اللغات المفقودة ستؤدي إلى رمي أخطاء.               |
| `inclusive` | يجب أن تحتوي اللغات المعلنة على ترجمات. اللغات المفقودة تؤدي إلى تحذيرات ولكن يتم قبولها. |
| `loose`     | يتم قبول أي لغة موجودة، حتى لو لم يتم الإعلان عنها.                                       |

مثال على التكوين:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... تكوينك الحالي
  internationalization: {
    // ... تكوين التدويل الحالي الخاص بك
    strictMode: "strict", // فرض الوضع الصارم
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... تكوينك الحالي
  internationalization: {
    // ... تكوين التدويل الحالي الخاص بك
    strictMode: "strict", // فرض الوضع الصارم
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... تكوينك الحالي
  internationalization: {
    // ... تكوين التدويل الحالي الخاص بك
    strictMode: "strict", // فرض الوضع الصارم
  },
};

module.exports = config;
```

---

### تكامل TypeScript

دالة `t` آمنة من حيث النوع عند استخدامها مع TypeScript. عرّف كائن ترجمات آمن من حيث النوع:

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

| المشكلة             | السبب                                  | الحل                                                    |
| ------------------- | -------------------------------------- | ------------------------------------------------------- |
| دالة `t` لا تعمل    | لم يتم تحميل الوسيط (middleware)       | تأكد من إضافة `app.use(intlayer())` قبل تعريف المسارات. |
| خطأ في نقص الترجمات | تم تفعيل الوضع الصارم بدون جميع اللغات | قم بتوفير جميع الترجمات المطلوبة.                       |

---

## نصائح للاستخدام الفعال

1. **مركزة الترجمات**: استخدم وحدة مركزية أو ملفات JSON لإدارة الترجمات لتحسين سهولة الصيانة.
2. **التحقق من الترجمات**: تأكد من أن كل نسخة لغوية لها ترجمة مقابلة لمنع الرجوع غير الضروري.
3. **الدمج مع التدويل في الواجهة الأمامية**: قم بمزامنة التدويل في الواجهة الأمامية لتوفير تجربة مستخدم سلسة عبر التطبيق.
4. **قياس الأداء**: اختبر أوقات استجابة تطبيقك عند إضافة الترجمات لضمان تأثير ضئيل.

---

## الخاتمة

تُعد دالة `t` أداة قوية للتدويل في جانب الخادم. باستخدامها بشكل فعال، يمكنك إنشاء تطبيق أكثر شمولية وسهل الاستخدام لجمهور عالمي. للاستخدام المتقدم وخيارات التكوين التفصيلية، يرجى الرجوع إلى [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل
