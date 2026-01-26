---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: "توثيق الدالة getCanonicalPath | intlayer"
description: "اطّلع على كيفية استخدام الدالة getCanonicalPath لحزمة intlayer"
keywords:
  - getCanonicalPath
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "تنفيذ إعادة كتابة عناوين URL المخصصة"
---

# الوثائق: دالة `getCanonicalPath` في `intlayer`

## الوصف

تقوم الدالة `getCanonicalPath` بتحويل مسار URL مموّلد حسب اللغة (مثال: `/a-propos`) إلى مسار التطبيق القانوني الداخلي المقابل (مثال: `/about`). وهذا أمر أساسي للـrouters لمطابقة المسار الداخلي الصحيح بغض النظر عن لغة عنوان URL.

**الميزات الرئيسية:**

- تدعم معلمات المسارات الديناميكية باستخدام صيغة `[param]`.
- تطابق المسارات المموّلة حسب اللغة مع قواعد إعادة الكتابة المخصصة المعرفة في إعداداتك.
- تعيد المسار الأصلي إذا لم يتم العثور على قاعدة إعادة كتابة مطابقة.

---

## توقيع الدالة

```typescript
getCanonicalPath(
  localizedPath: string,         // مطلوب
  locale: Locales,               // مطلوب
  rewriteRules?: RoutingConfig['rewrite'] // اختياري
): string
```

---

## المعلمات

### المعلمات المطلوبة

- `localizedPath: string`
  - **الوصف**: المسار المحلي كما يظهر في المتصفح (على سبيل المثال، `/a-propos`).
  - **النوع**: `string`
  - **مطلوب**: نعم

- `locale: Locales`
  - **الوصف**: اللوكال المستخدم للمسار الجاري حله.
  - **النوع**: `Locales`
  - **مطلوب**: نعم

### المعلمات الاختيارية

- `rewriteRules?: RoutingConfig['rewrite']`
  - **الوصف**: كائن يعرّف قواعد إعادة كتابة مخصصة. إذا لم يتم تزويده، فإنه يأخذ القيمة الافتراضية من الخاصية `routing.rewrite` في تكوين مشروعك.
  - **النوع**: `RoutingConfig['rewrite']`
  - **الافتراضي**: `configuration.routing.rewrite`

---

## القيمة المرجعة

- **النوع**: `string`
- **الوصف**: المسار الرسمي الداخلي.

---

## مثال على الاستخدام

### الاستخدام الأساسي (مع التكوين)

إذا كنت قد قمت بتكوين قواعد إعادة كتابة مخصصة في الملف `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// التكوين: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// المخرجات: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// المخرجات: "/about"
```

### الاستخدام مع المسارات الديناميكية

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// التكوين: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// المخرجات: "/product/123"
```

### قواعد إعادة الكتابة اليدوية

You can also pass manual rewrite rules to the function:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// الناتج: "/contact"
```

---

## الدوال ذات الصلة

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedPath.md): يحوّل مسارًا canonical إلى ما يعادله محليًا.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md): ينشئ URL مُعربًا بالكامل (بما في ذلك البروتوكول والمضيف وبادئة اللغة).
