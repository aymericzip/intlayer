---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: توثيق دالة t | hono-intlayer
description: تعرف على كيفية استخدام دالة t لحزمة hono-intlayer
keywords:
  - t
  - ترجمة
  - Intlayer
  - تدويل
  - توثيق
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: تهيئة السجل
---

# توثيق: دالة `t` في `hono-intlayer`

دالة `t` في حزمة `hono-intlayer` هي الأداة الأساسية لتقديم ردود محلية في تطبيق Hono الخاص بك. فهي تبسط عملية التدويل (i18n) من خلال اختيار المحتوى ديناميكيًا بناءً على اللغة المفضلة للمستخدم.

---

## نظرة عامة

تُستخدم دالة `t` لتعريف واسترجاع الترجمات لمجموعة معينة من اللغات. وهي تحدد تلقائيًا اللغة المناسبة للإرجاع بناءً على إعدادات طلب العميل، مثل عنوان `Accept-Language`. إذا كانت اللغة المفضلة غير متوفرة، فإنها تعود بسلاسة إلى اللغة الافتراضية المحددة في التكوين الخاص بك.

---

## الميزات الرئيسية

- **التوطين الديناميكي**: تختار تلقائيًا الترجمة الأكثر ملاءمة للعميل.
- **العودة إلى اللغة الافتراضية**: تعود إلى اللغة الافتراضية إذا كانت لغة العميل المفضلة غير متوفرة، مما يضمن استمرارية تجربة المستخدم.
- **خفيفة وسريعة**: مصممة للتطبيقات عالية الأداء، مما يضمن أقل قدر من الحمل الإضافي.
- **دعم الوضع الصارم**: فرض الالتزام الصارم باللغات المعلنة لسلوك موثوق.

---

## توقيع الدالة

```typescript
t(translations: Record<string, string>): string;
```

### المعلمات

- `translations`: كائن تكون المفاتيح فيه هي رموز اللغة (مثل `en` و `fr` و `ar`) والقيم هي السلاسل المترجمة المقابلة.

### المرتجعات

- سلسلة نصية تمثل المحتوى بالغة المفضلة للعميل.

---

## تحميل معالج طلبات التدويل

لضمان عمل وظيفة التدويل التي توفرها `hono-intlayer` بشكل صحيح، **يجب** عليك تحميل الوسيط (middleware) الخاص بالتدويل في بداية تطبيق Hono الخاص بك. هذا يفعل دالة `t` ويضمن المعالجة السليمة لاكتشاف اللغة والترجمة.

ضع وسيط `app.use("*", intlayer())` **قبل أي مسارات** في تطبيقك لضمان استفادة جميع المسارات من التدويل:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// تحميل معالج طلبات التدويل
app.use("*", intlayer());

// حدد مساراتك بعد تحميل الوسيط
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ar: "مرحباً بك في العالم!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// تحميل معالج طلبات التدويل
app.use("*", intlayer());

// حدد مساراتك بعد تحميل الوسيط
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ar: "مرحباً بك في العالم!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// تحميل معالج طلبات التدويل
app.use("*", intlayer());

// حدد مساراتك بعد تحميل الوسيط
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ar: "مرحباً بك في العالم!",
    })
  );
});
```

### لماذا هذا مطلوب

- **اكتشاف اللغة**: يقوم وسيط `intlayer` بمعالجة الطلبات الواردة لاكتشاف اللغة المفضلة للمستخدم بناءً على العناوين أو ملفات تعريف الارتباط أو الطرق الأخرى المكونة.
- **سياق الترجمة**: يقوم بإعداد السياق اللازم لتعمل دالة `t` بشكل صحيح، مما يضمن إرجاع الترجمات باللغة الصحيحة.
- **منع الأخطاء**: بدون هذا الوسيط، سيؤدي استخدام دالة `t` إلى أخطاء في وقت التشغيل لأن معلومات اللغة اللازمة لن تكون متوفرة.

---

## أمثلة الاستخدام

### مثال أساسي

تقديم محتوى محلي بلغات مختلفة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      ar: "مرحباً بك!",
    })
  );
});
```

**طلبات العميل:**

- العميل الذي لديه `Accept-Language: fr` سيتلقى `Bienvenue!`.
- العميل الذي لديه `Accept-Language: ar` سيتلقى `مرحباً بك!`.
- العميل الذي لديه `Accept-Language: de` سيتلقى `Welcome!` (اللغة الافتراضية).

### معالجة الأخطاء

تقديم رسائل خطأ بلغات متعددة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      ar: "حدث خطأ غير متوقع.",
    }),
    500
  );
});
```

---

### استخدام متغيرات اللغة

تحديد ترجمات لمتغيرات خاصة باللغة:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      ar: "مرحباً!",
    })
  );
});
```

---

## مواضيع متقدمة

### آلية العودة (Fallback)

إذا كانت اللغة المفضلة غير متوفرة، فستعود دالة `t` إلى اللغة الافتراضية المحددة في التكوين:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### فرض الوضع الصارم

تكوين دالة `t` لفرض الالتزام الصارم باللغات المعلنة:

| الوضع       | السلوك                                                                                |
| ----------- | ------------------------------------------------------------------------------------- |
| `strict`    | يجب تقديم ترجمات لجميع اللغات المعلنة. اللغات المفقودة ستؤدي إلى حدوث أخطاء.          |
| `inclusive` | يجب أن تحتوي اللغات المعلنة على ترجمات. اللغات المفقودة تثير تحذيرات ولكن يتم قبولها. |
| `loose`     | يتم قبول أي لغة موجودة، حتى لو لم يتم الإعلان عنها.                                   |

---

### تكامل TypeScript

دالة `t` آمنة من حيث النوع عند استخدامها مع TypeScript. قم بتعريف كائن ترجمات آمن النوع:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  ar: "صباح الخير!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### الأخطاء الشائعة واستكشاف الأخطاء وإصلاحها

| المشكلة                 | السبب                                  | الحل                                                   |
| ----------------------- | -------------------------------------- | ------------------------------------------------------ |
| دالة `t` لا تعمل        | لم يتم تحميل الوسيط                    | تأكد من إضافة `app.use("*", intlayer())` قبل المسارات. |
| خطأ في الترجمة المفقودة | تم تمكين الوضع الصارم بدون جميع اللغات | قم بتقديم جميع الترجمات المطلوبة.                      |

---

## الخاتمة

دالة `t` هي أداة قوية لتدويل الواجهة الخلفية. من خلال استخدامها بفعالية، يمكنك إنشاء تطبيق أكثر شمولاً وسهولة في الاستخدام لجمهور عالمي. للحصول على استخدام متقدم وخيارات تكوين مفصلة، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
