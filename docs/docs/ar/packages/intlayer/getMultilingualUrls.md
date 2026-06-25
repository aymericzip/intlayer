---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getMultilingualUrls | intlayer
description: تعرف على كيفية استخدام دالة getMultilingualUrls لحزمة intlayer
keywords:
  - getMultilingualUrls
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "بداية التاريخ"
author: aymericzip
---

# التوثيق: دالة `getMultilingualUrls` في `intlayer`

## الوصف

تقوم دالة `getMultilingualUrls` بإنشاء خريطة من عناوين URL متعددة اللغات عن طريق إضافة بادئة للعنوان المحدد بكل لغة مدعومة. يمكنها التعامل مع عناوين URL المطلقة والنسبية، وتطبيق بادئة اللغة المناسبة بناءً على الإعدادات المقدمة أو الإعدادات الافتراضية.

**الميزات الرئيسية:**

- مطلوب معامل واحد فقط: `url`
- كائن `options` اختياري يحتوي على `locales` و`defaultLocale` و`mode`
- يستخدم إعدادات الدولية في مشروعك كإعدادات افتراضية
- يدعم أوضاع التوجيه المتعددة: `prefix-no-default` و`prefix-all` و`no-prefix` و`search-params`
- يعيد كائن خريطة مع جميع اللغات كمفاتيح وعناوين URL المقابلة لها كقيم

---

## الوصف

تقوم دالة `getMultilingualUrls` بإنشاء خريطة لعناوين URL متعددة اللغات عن طريق إضافة بادئة لكل عنوان URL المعطى باستخدام كل لغة مدعومة. يمكنها التعامل مع عناوين URL المطلقة والنسبية، وتطبيق بادئة اللغة المناسبة بناءً على التكوين المقدم أو الإعدادات الافتراضية.

---

## المعاملات

## المعاملات

- `url: string`
  - **الوصف**: سلسلة عنوان URL الأصلية التي سيتم إضافة بادئات اللغات إليها.
  - **النوع**: `string`

- `locales: Locales[]`
  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. القيمة الافتراضية هي اللغات المعرفة في المشروع.
  - **النوع**: `Locales[]`
  - **الافتراضي**: `localesDefault`

- `defaultLocale: Locales`
  - **الوصف**: اللغة الافتراضية للتطبيق. القيمة الافتراضية هي اللغة الافتراضية المعرفة في المشروع.
  - **النوع**: `Locales`
  - **الافتراضي**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **الوصف**: ما إذا كان يجب إضافة بادئة للغة الافتراضية. القيمة الافتراضية هي القيمة المعرفة في المشروع.
  - **النوع**: `boolean`
  - **الافتراضي**: `prefixDefaultDefault`

### المعاملات الاختيارية

- `options?: object`
  - **الوصف**: كائن الإعدادات لسلوك تحديد موقع عنوان URL.
  - **النوع**: `object`
  - **مطلوب**: لا (اختياري)

  - `options.locales?: Locales[]`
    - **الوصف**: مصفوفة اللغات المدعومة. إذا لم يتم توفيرها، يتم استخدام اللغات المكونة من إعدادات المشروع الخاص بك.
    - **النوع**: `Locales[]`
    - **القيمة الافتراضية**: [`إعدادات المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **الوصف**: اللغة الافتراضية للتطبيق. إذا لم يتم توفيرها، يتم استخدام اللغة الافتراضية المكونة من إعدادات المشروع الخاص بك.
    - **النوع**: `Locales`
    - **القيمة الافتراضية**: [`إعدادات المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **الوصف**: وضع توجيه عنوان URL لمعالجة اللغة. إذا لم يتم توفيره، يتم استخدام الوضع المكون من إعدادات المشروع الخاص بك.
    - **النوع**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **القيمة الافتراضية**: [`إعدادات المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)
    - **الأوضاع**:
      - `prefix-no-default`: لا توجد بادئة للغة الافتراضية، بادئة لجميع الأخرى
      - `prefix-all`: بادئة لجميع اللغات بما فيها الافتراضية
      - `no-prefix`: لا توجد بادئة لغة في عنوان URL
      - `search-params`: استخدام معاملات الاستعلام للغة (على سبيل المثال، `?locale=fr`)

### القيم المرجعة

- **النوع**: `IConfigLocales<string>`
- **الوصف**: كائن يربط كل لغة بعنوان URL متعدد اللغات المقابل لها.

---

## مثال على الاستخدام

### الاستخدام الأساسي (استخدام إعدادات المشروع)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// يستخدم إعدادات مشروعك للغات وdefaultLocale والوضع mode
getMultilingualUrls("/dashboard");
// الإخراج (بافتراض أن إعدادات المشروع تحتوي على en و fr مع وضع 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### عناوين URL النسبية

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// الناتج: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### عناوين URL المطلقة

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// الناتج: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

### أنماط التوجيه المختلفة

```typescript
// prefix-no-default: بدون بادئة للغة الافتراضية
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// الإخراج: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: بادئة لجميع اللغات
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// الإخراج: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: بدون بادئة اللغة في العناوين
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// الإخراج: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: اللغة كمعامل استعلام
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// الإخراج: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## الحالات الخاصة

- **عدم وجود جزء اللغة:**
  - تقوم الدالة بإزالة أي جزء لغة موجود في عنوان URL قبل إنشاء الخرائط متعددة اللغات.

- **اللغة الافتراضية:**
  - عندما تكون قيمة `prefixDefault` هي `false`، لا تقوم الدالة بإضافة بادئة للعنوان الخاص باللغة الافتراضية.

- **اللغات غير المدعومة:**
  - يتم اعتبار اللغات الموجودة فقط في مصفوفة `locales` عند إنشاء عناوين URL.

---

## الاستخدام في التطبيقات

في تطبيق متعدد اللغات، يعد تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمرًا حيويًا لضمان عرض اللغة الصحيحة. فيما يلي مثال على كيفية استخدام `getMultilingualUrls` في إعداد التطبيق:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// تكوين اللغات المدعومة واللغة الافتراضية
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

تضمن التهيئة أعلاه أن يتعرف التطبيق على اللغات المدعومة وهي `ENGLISH` و `FRENCH` و `SPANISH` ويستخدم `ENGLISH` كلغة احتياطية.

باستخدام هذه التهيئة، يمكن للدالة `getMultilingualUrls` إنشاء خرائط عناوين URL متعددة اللغات بشكل ديناميكي بناءً على اللغات المدعومة في التطبيق:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// الناتج:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// الناتج:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

من خلال دمج `getMultilingualUrls`، يمكن للمطورين الحفاظ على هياكل عناوين URL متسقة عبر لغات متعددة، مما يعزز تجربة المستخدم وتحسين محركات البحث (SEO).
