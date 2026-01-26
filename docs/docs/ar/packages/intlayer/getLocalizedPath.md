---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: توثيق الدالة getLocalizedPath | intlayer
description: تعرف على كيفية استخدام الدالة getLocalizedPath لحزمة intlayer
keywords:
  - getLocalizedPath
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: تنفيذ قواعد إعادة كتابة URL مخصصة
---

# التوثيق: الدالة `getLocalizedPath` في `intlayer`

## الوصف

تقوم دالة `getLocalizedPath` بتحويل المسار القانوني (المسار الداخلي للتطبيق) إلى نظيره المحلي بناءً على الـ locale وقواعد إعادة الكتابة (rewrite rules) المقدمة. تكون هذه الدالة مفيدة بشكل خاص عند إنشاء عناوين URL صديقة لمحركات البحث تختلف بحسب اللغة.

**الميزات الرئيسية:**

- يدعم معلمات المسارات الديناميكية باستخدام صيغة `[param]`.
- يحوّل المسارات وفقًا لقواعد إعادة الكتابة المخصصة (rewrite rules) المعرفة في تكوين المشروع.
- يتعامل تلقائيًا مع الرجوع إلى المسار القانوني إذا لم يتم العثور على قاعدة إعادة كتابة للـ locale المحدد.

---

## Function Signature

```typescript
getLocalizedPath(
  canonicalPath: string,         // مطلوب
  locale: Locales,               // مطلوب
  rewriteRules?: RoutingConfig['rewrite'] // اختياري
): string
```

---

## Parameters

### المعلمات المطلوبة

- `canonicalPath: string`
  - **الوصف**: المسار الداخلي للتطبيق (على سبيل المثال، `/about`, `/product/[id]`).
  - **النوع**: `string`
  - **مطلوب**: نعم

- `locale: Locales`
  - **الوصف**: المحلي/اللغة المستهدفة التي يجب أن يتم تعريب المسار بناءً عليها.
  - **النوع**: `Locales`
  - **مطلوب**: نعم

### المعلمات الاختيارية

- `rewriteRules?: RoutingConfig['rewrite']`
  - **الوصف**: كائن يعرّف قواعد إعادة الكتابة المخصصة. إذا لم يتم توفيره، فسيكون الافتراضي هو الخاصية `routing.rewrite` من تكوين مشروعك.
  - **النوع**: `RoutingConfig['rewrite']`
  - **الافتراضي**: `configuration.routing.rewrite`

---

## القيمة المرجعة

- **النوع**: `string`
- **الوصف**: المسار المعرب للمحلي المحدد.

---

## مثال على الاستخدام

### الاستخدام الأساسي (مع التكوين)

إذا قمت بتكوين إعادة كتابة مخصصة في `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// التكوين: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// الإخراج: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// الإخراج: "/about"
```

### الاستخدام مع المسارات الديناميكية

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// التكوين: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// الإخراج: "/produit/123"
```

### قواعد إعادة الكتابة اليدوية

يمكنك أيضًا تمرير قواعد إعادة كتابة يدوية إلى الدالة:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

---

## الدوال ذات الصلة

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getCanonicalPath.md): يُعيد مسارًا مترجمًا إلى مساره القانوني الداخلي.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md): يولِّد عنوان URL مُحَلَّى بالكامل (بما في ذلك البروتوكول والمضيف وبادئة اللغة).
