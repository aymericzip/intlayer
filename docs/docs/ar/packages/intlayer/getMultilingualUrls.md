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
---

# التوثيق: دالة `getMultilingualUrls` في `intlayer`

## الوصف

تقوم دالة `getMultilingualUrls` بإنشاء خريطة لعناوين URL متعددة اللغات عن طريق إضافة بادئة لكل عنوان URL المعطى باستخدام كل لغة مدعومة. يمكنها التعامل مع عناوين URL المطلقة والنسبية، وتطبيق بادئة اللغة المناسبة بناءً على التكوين المقدم أو الإعدادات الافتراضية.

---

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

### القيم المرجعة

- **النوع**: `IConfigLocales<string>`
- **الوصف**: كائن يربط كل لغة بعنوان URL متعدد اللغات المقابل لها.

---

## مثال على الاستخدام

### عناوين URL النسبية

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
