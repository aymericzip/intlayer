---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getLocalizedUrl | intlayer
description: تعرف على كيفية استخدام دالة getLocalizedUrl لحزمة intlayer
keywords:
  - getLocalizedUrl
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "بدء التاريخ"
author: aymericzip
---

# التوثيق: دالة `getLocalizedUrl` في `intlayer`

## الوصف

تقوم دالة `getLocalizedUrl` بإنشاء عنوان URL محلي عن طريق إضافة بادئة اللغة المحددة إلى عنوان URL المعطى. تتعامل مع عناوين URL المطلقة والنسبية على حد سواء، مما يضمن تطبيق بادئة اللغة الصحيحة بناءً على التكوين.

**المميزات الرئيسية:**

- معاملان فقط مطلوبان: `url` و `currentLocale`
- كائن `options` اختياري يحتوي على `locales` و `defaultLocale` و `mode`
- يستخدم تكوين التدويل في مشروعك كقيم افتراضية
- يمكن استخدامه بمعاملات بسيطة للحالات البسيطة أو تخصيصه بالكامل للسيناريوهات المعقدة
- يدعم أوضاع توجيه متعددة: `prefix-no-default` و `prefix-all` و `no-prefix` و `search-params`

---

## توقيع الدالة

```typescript
getLocalizedUrl(
  url: string,                   // مطلوب
  currentLocale: Locales,        // مطلوب
  options?: {                    // اختياري
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## المعاملات

### المعاملات المطلوبة

- `url: string`
  - **Description**: سلسلة URL الأصلية التي سيتم بادئتها بلغة.
  - **Type**: `string`
  - **Required**: Yes

- `currentLocale: Locales`
  - **Description**: اللغة الحالية التي يتم تحديث URL لها.
  - **Type**: `Locales`
  - **Required**: Yes

### المعاملات الاختيارية

- `options?: object`
  - **الوصف**: كائن التكوين لسلوك تحديد موقع عناوين URL.
  - **النوع**: `object`
  - **مطلوب**: لا (اختياري)

  - `options.locales?: Locales[]`
    - **الوصف**: مصفوفة اللغات المدعومة. إذا لم يتم توفيرها، فسيتم استخدام اللغات المكونة من تكوين مشروعك.
    - **النوع**: `Locales[]`
    - **القيمة الافتراضية**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **الوصف**: اللغة الافتراضية للتطبيق. إذا لم يتم توفيرها، فسيتم استخدام اللغة الافتراضية المكونة من تكوين مشروعك.
    - **النوع**: `Locales`
    - **القيمة الافتراضية**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **الوصف**: وضع التوجيه للعنوان لمعالجة اللغة. إذا لم يتم توفيره، فسيتم استخدام الوضع المكون من تكوين مشروعك.
    - **النوع**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **القيمة الافتراضية**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)
    - **الأوضاع**:
      - `prefix-no-default`: بدون بادئة للغة الافتراضية، بادئة لجميع اللغات الأخرى
      - `prefix-all`: بادئة لجميع اللغات بما في ذلك اللغة الافتراضية
      - `no-prefix`: بدون بادئة لغة في العنوان
      - `search-params`: استخدام معاملات الاستعلام للغة (مثل `?locale=fr`)

### الإرجاع

- **النوع**: `string`
- **الوصف**: عنوان URL المحلي للغة المحددة.

---

## مثال على الاستخدام

### الاستخدام الأساسي (المعاملات المطلوبة فقط)

عندما تكون قد قمت بتكوين مشروعك بإعدادات التدويل، يمكنك استخدام الدالة بالمعاملات المطلوبة فقط:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// يستخدم إعدادات مشروعك للمحليات و defaultLocale و mode
getLocalizedUrl("/about", Locales.FRENCH);
// Output: "/fr/about" (افترض أن الفرنسية مدعومة و mode هو 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Output: "/about" أو "/en/about" (حسب إعداد mode لديك)
```

### الاستخدام المتقدم (مع معاملات اختيارية)

يمكنك تجاوز التكوين الافتراضي بتوفير معامل `options` الاختياري:

### عناوين URL النسبية

```typescript codeFormat={["typescript", "esm"]}
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// الناتج: "/fr/about" للغة الفرنسية
// الناتج: "/about" للغة الافتراضية (الإنجليزية)
```

### تجاوز الإعدادات الجزئية

يمكنك أيضًا توفير بعض المعاملات الاختيارية فقط. ستستخدم الدالة إعدادات مشروعك لأي معاملات لم تحددها:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// تجاوز اللغات فقط، استخدم إعدادات المشروع لـ defaultLocale و mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// تجاوز mode فقط، استخدم إعدادات المشروع لـ locales و defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // فرض البادئة لجميع اللغات بما في ذلك اللغة الافتراضية
});

// تجاوز خيارات متعددة
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // استخدم معاملات الاستعلام: /about?locale=fr
});
```

### عناوين URL المطلقة

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // بادئة اللغة الافتراضية
); // الناتج: "https://example.com/fr/about" للغة الفرنسية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // بادئة اللغة الافتراضية
); // الناتج: "https://example.com/about" للغة الإنجليزية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  true // بادئة اللغة الافتراضية
); // الناتج: "https://example.com/en/about" للغة الإنجليزية
```

### لغة غير مدعومة

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH // اللغة الافتراضية
); // الناتج: "/about" (لا يتم تطبيق بادئة للغة غير المدعومة)
```

---

## الحالات الخاصة

- **عدم وجود جزء اللغة:**
  - إذا لم يحتوي عنوان URL على جزء اللغة، تقوم الدالة بإضافة بادئة اللغة المناسبة بأمان.

- **اللغة الافتراضية:**
  - عندما تكون قيمة `prefixDefault` هي `false`، لا تضيف الدالة بادئة للغة الافتراضية في عنوان URL.

- **اللغات غير المدعومة:**
  - بالنسبة للغات غير المدرجة في `locales`، لا تطبق الدالة أي بادئة.

- **أنماط التوجيه:**
  - `'prefix-no-default'`: اللغة الافتراضية بدون بادئة، والبقية لها بادئات (على سبيل المثال، `/about`, `/fr/about`)
  - `'prefix-all'`: جميع اللغات لها بادئات (على سبيل المثال، `/en/about`, `/fr/about`)
  - `'no-prefix'`: لا توجد بادئات لغة في عناوين URL (يتم التعامل مع اللغة في مكان آخر)
  - `'search-params'`: يتم تحديد اللغة عبر معامل الاستعلام (على سبيل المثال، `/about?locale=fr`)

---

## الاستخدام في التطبيقات

في تطبيق متعدد اللغات، يعد تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمرًا حيويًا لضمان عرض اللغة الصحيحة. فيما يلي مثال على كيفية استخدام `getLocalizedUrl` في إعداد التطبيق:

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

يضمن التكوين أعلاه أن يتعرف التطبيق على اللغات `ENGLISH` و `FRENCH` و `SPANISH` كلغات مدعومة ويستخدم `ENGLISH` كلغة احتياطية.

باستخدام هذا التكوين، يمكن لدالة `getLocalizedUrl` إنشاء روابط URL محلية ديناميكيًا بناءً على تفضيل لغة المستخدم:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // الناتج: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // الناتج: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // الناتج: "/about"
```

من خلال دمج دالة `getLocalizedUrl`، يمكن للمطورين الحفاظ على هياكل روابط URL متسقة عبر لغات متعددة، مما يعزز تجربة المستخدم وتحسين محركات البحث (SEO).
