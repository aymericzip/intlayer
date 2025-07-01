---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md
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
---

# التوثيق: دالة `getLocalizedUrl` في `intlayer`

## الوصف

تقوم دالة `getLocalizedUrl` بإنشاء عنوان URL محلي عن طريق إضافة بادئة اللغة المحددة إلى عنوان URL المعطى. تتعامل مع عناوين URL المطلقة والنسبية على حد سواء، مما يضمن تطبيق بادئة اللغة الصحيحة بناءً على التكوين.

---

## المعاملات

- `url: string`

  - **الوصف**: سلسلة عنوان URL الأصلية التي سيتم إضافة بادئة اللغة إليها.
  - **النوع**: `string`

- `currentLocale: Locales`

  - **الوصف**: اللغة الحالية التي يتم تعريب العنوان لها.
  - **النوع**: `Locales`

- `locales: Locales[]`

  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. بشكل افتراضي، يتم توفير اللغات المكونة في المشروع.
  - **النوع**: `Locales[]`
  - **الافتراضي**: [`تكوين المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

- `defaultLocale: Locales`

  - **الوصف**: اللغة الافتراضية للتطبيق. بشكل افتراضي، يتم توفير اللغة الافتراضية المكونة في المشروع.
  - **النوع**: `Locales`
  - **الافتراضي**: [`تكوين المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

- `prefixDefault: boolean`
  - **الوصف**: ما إذا كان يجب إضافة بادئة للعنوان الافتراضي. بشكل افتراضي، يتم توفير القيمة المكونة في المشروع.
  - **النوع**: `boolean`
  - **الافتراضي**: [`تكوين المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md#middleware)

### الإرجاع

- **النوع**: `string`
- **الوصف**: عنوان URL المحلي للغة المحددة.

---

## مثال على الاستخدام

### عناوين URL النسبية

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

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

---

## الاستخدام في التطبيقات

في تطبيق متعدد اللغات، يعد تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمرًا حيويًا لضمان عرض اللغة الصحيحة. فيما يلي مثال على كيفية استخدام `getLocalizedUrl` في إعداد التطبيق:

```tsx codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
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

يضمن التكوين أعلاه أن يتعرف التطبيق على اللغات `ENGLISH` و `FRENCH` و `SPANISH` كلغات مدعومة ويستخدم `ENGLISH` كلغة احتياطية.

باستخدام هذا التكوين، يمكن لدالة `getLocalizedUrl` إنشاء روابط URL محلية ديناميكيًا بناءً على تفضيل لغة المستخدم:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // الناتج: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // الناتج: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // الناتج: "/about"
```

من خلال دمج دالة `getLocalizedUrl`، يمكن للمطورين الحفاظ على هياكل روابط URL متسقة عبر لغات متعددة، مما يعزز تجربة المستخدم وتحسين محركات البحث (SEO).

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ
