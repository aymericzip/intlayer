---
docName: package__express-intlayer__t
url: https://intlayer.org/doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: توثيق دالة t | express-intlayer
description: انظر كيف يمكنك استخدام دالة t لحزمة express-intlayer
keywords:
  - t
  - ترجمة
  - Intlayer
  - التدويل
  - التوثيق
  - Express
  - JavaScript
  - React
---

# التوثيق: وظيفة `t` في `express-intlayer`

وظيفة `t` في حزمة `express-intlayer` هي الأداة الأساسية لتوفير استجابات مترجمة في تطبيق Express الخاص بك. تبسط عملية التدويل (i18n) عن طريق اختيار المحتوى ديناميكيًا بناءً على اللغة المفضلة للمستخدم.

---

## نظرة عامة

تُستخدم وظيفة `t` لتعريف واسترجاع الترجمات لمجموعة معينة من اللغات. تقوم تلقائيًا بتحديد اللغة المناسبة للإرجاع بناءً على إعدادات طلب العميل، مثل ترويسة `Accept-Language`. إذا كانت اللغة المفضلة غير متوفرة، فإنها تعود بسلاسة إلى اللغة الافتراضية المحددة في التكوين الخاص بك.

---

## الميزات الرئيسية

- **التوطين الديناميكي**: تختار تلقائيًا الترجمة الأكثر ملاءمة للعميل.
- **الرجوع إلى اللغة الافتراضية**: تعود إلى اللغة الافتراضية إذا لم تكن اللغة المفضلة للعميل متوفرة، مما يضمن استمرارية تجربة المستخدم.
- **خفيفة وسريعة**: مصممة للتطبيقات عالية الأداء، مما يضمن الحد الأدنى من العبء.
- **دعم الوضع الصارم**: فرض الالتزام الصارم باللغات المعلنة لضمان السلوك الموثوق.

---

## توقيع الوظيفة

```typescript
t(translations: Record<string, string>): string;
```

### المعاملات

- `translations`: كائن حيث تكون المفاتيح رموز اللغات (مثل `en`, `fr`, `es-MX`) والقيم هي النصوص المترجمة المقابلة.

### الإرجاع

- سلسلة نصية تمثل المحتوى بلغة العميل المفضلة.

---

## تحميل معالج طلبات التدويل

لضمان عمل وظيفة التدويل التي توفرها `express-intlayer` بشكل صحيح، **يجب** تحميل الوسيط الخاص بالتدويل في بداية تطبيق Express الخاص بك. يتيح ذلك وظيفة `t` ويضمن التعامل الصحيح مع اكتشاف اللغة والترجمة.

ضع الوسيط `app.use(intlayer())` **قبل أي مسارات** في تطبيقك لضمان استفادة جميع المسارات من التدويل:

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
      ar: "مرحبًا بالعالم!",
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
      ar: "مرحبًا بالعالم!",
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

// تعريف المسارات بعد تحميل الوسيط
app.get("/", (_req, res) => {
  res.send(
    t({
      ar: "مرحبًا بالعالم!",
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### لماذا هذا مطلوب

- **اكتشاف اللغة**: يقوم الوسيط `intlayer` بمعالجة الطلبات الواردة لاكتشاف اللغة المفضلة للمستخدم بناءً على الترويسات أو الكوكيز أو الطرق الأخرى المكونة.
- **سياق الترجمة**: يهيئ السياق اللازم لوظيفة `t` للعمل بشكل صحيح، مما يضمن أن الترجمات تُرجع باللغة الصحيحة.
- **منع الأخطاء**: بدون هذا الوسيط، ستؤدي محاولة استخدام وظيفة `t` إلى أخطاء أثناء التشغيل لأن معلومات اللغة اللازمة لن تكون متوفرة.

---

## أمثلة الاستخدام

### مثال أساسي

تقديم محتوى مترجم بلغات مختلفة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      ar: "أهلاً وسهلاً!",
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
      ar: "أهلاً وسهلاً!",
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
      ar: "أهلاً وسهلاً!",
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**طلبات العميل:**

- العميل مع `Accept-Language: fr` سيتلقى `Bienvenue!`.
- العميل مع `Accept-Language: es` سيتلقى `¡Bienvenido!`.
- العميل مع `Accept-Language: de` سيتلقى `Welcome!` (اللغة الافتراضية).

### التعامل مع الأخطاء

توفير رسائل خطأ بلغات متعددة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      ar: "حدث خطأ غير متوقع.",
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
      ar: "حدث خطأ غير متوقع.",
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
      ar: "حدث خطأ غير متوقع.",
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
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
      ar: "مرحبًا!",
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
      ar: "مرحبًا!",
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
      ar: "مرحبًا!",
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

## المواضيع المتقدمة

### آلية الرجوع

إذا كانت اللغة المفضلة غير متوفرة، فإن وظيفة `t` ستعود إلى اللغة الافتراضية المحددة في التكوين:

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

- إذا كانت `defaultLocale` هي `Locales.CHINESE` وطلب العميل `Locales.DUTCH`، فستكون الترجمة المرجعة هي القيمة الافتراضية لـ `Locales.CHINESE`.

---

---

### فرض وضع صارم

قم بتكوين وظيفة `t` لفرض الالتزام الصارم باللغات المعلنة:

| الوضع       | السلوك                                                                               |
| ----------- | ------------------------------------------------------------------------------------ |
| `strict`    | يجب توفير ترجمات لجميع اللغات المعلنة. ستظهر أخطاء إذا كانت هناك لغات مفقودة.        |
| `inclusive` | يجب أن تحتوي اللغات المعلنة على ترجمات. اللغات المفقودة ستظهر تحذيرات ولكنها مقبولة. |
| `loose`     | يتم قبول أي لغة موجودة، حتى لو لم تكن معلنة.                                         |

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

وظيفة `t` آمنة من حيث النوع عند استخدامها مع TypeScript. قم بتعريف كائن ترجمات آمن من حيث النوع:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  ar: "صباح الخير!",
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
  ar: "صباح الخير!",
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
  ar: "صباح الخير!",
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

| المشكلة                  | السبب                                  | الحل                                              |
| ------------------------ | -------------------------------------- | ------------------------------------------------- |
| وظيفة `t` لا تعمل        | لم يتم تحميل الوسيط                    | تأكد من إضافة `app.use(intlayer())` قبل المسارات. |
| خطأ في الترجمات المفقودة | تم تمكين الوضع الصارم بدون جميع اللغات | قم بتوفير جميع الترجمات المطلوبة.                 |

---

## نصائح للاستخدام الفعّال

1. **مركزية الترجمات**: استخدم وحدة مركزية أو ملفات JSON لإدارة الترجمات لتحسين قابلية الصيانة.
2. **التحقق من الترجمات**: تأكد من أن كل متغير لغة يحتوي على ترجمة مقابلة لمنع العودة غير الضرورية.
3. **الدمج مع التدويل الأمامي**: قم بمزامنة التدويل مع الواجهة الأمامية لتجربة مستخدم سلسة عبر التطبيق.
4. **قياس الأداء**: اختبر أوقات استجابة التطبيق عند إضافة الترجمات لضمان تأثير ضئيل.

---

## الخاتمة

وظيفة `t` هي أداة قوية لتدويل الواجهة الخلفية. باستخدامها بفعالية، يمكنك إنشاء تطبيق أكثر شمولاً وسهولة في الاستخدام لجمهور عالمي. للحصول على استخدام متقدم وخيارات تكوين مفصلة، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).
