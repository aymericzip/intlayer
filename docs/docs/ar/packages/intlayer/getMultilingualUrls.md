---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getMultilingualUrls | intlayer
description: انظر كيف تستخدم دالة getMultilingualUrls لحزمة intlayer
keywords:
  - getMultilingualUrls
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# توثيق: وظيفة `getMultilingualUrls` في `intlayer`

## الوصف

تقوم وظيفة `getMultilingualUrls` بإنشاء خريطة لعناوين URL متعددة اللغات عن طريق إضافة بادئة لكل لغة مدعومة إلى عنوان URL المعطى. يمكنها التعامل مع عناوين URL المطلقة والنسبية، وتطبيق بادئة اللغة المناسبة بناءً على التكوين المقدم أو الإعدادات الافتراضية.

---

## المعلمات

- `url: string`

  - **الوصف**: سلسلة عنوان URL الأصلية التي سيتم إضافة بادئات اللغات إليها.
  - **النوع**: `string`

- `locales: Locales[]`

  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. الافتراضي هو اللغات المكونة في المشروع.
  - **النوع**: `Locales[]`
  - **الافتراضي**: `localesDefault`

- `defaultLocale: Locales`

  - **الوصف**: اللغة الافتراضية للتطبيق. الافتراضي هو اللغة الافتراضية المكونة في المشروع.
  - **النوع**: `Locales`
  - **الافتراضي**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **الوصف**: ما إذا كان يجب إضافة بادئة للغة الافتراضية. الافتراضي هو القيمة المكونة في المشروع.
  - **النوع**: `boolean`
  - **الافتراضي**: `prefixDefaultDefault`

### الإرجاع

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
// الإخراج: {
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
// الإخراج: {
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
// الإخراج: {
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
// الإخراج: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## الحالات الخاصة

- **عدم وجود جزء للغة:**

  - تقوم الوظيفة بإزالة أي جزء لغة موجود من عنوان URL قبل إنشاء الخرائط متعددة اللغات.

- **اللغة الافتراضية:**

  - عندما تكون `prefixDefault` تساوي `false`، لا تضيف الوظيفة بادئة للغة الافتراضية.

- **اللغات غير المدعومة:**
  - يتم النظر فقط في اللغات المقدمة في مصفوفة `locales` لإنشاء عناوين URL.

---

## الاستخدام في التطبيقات

في تطبيق متعدد اللغات، يعد تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمرًا بالغ الأهمية لضمان عرض اللغة الصحيحة. أدناه مثال على كيفية استخدام `getMultilingualUrls` في إعداد التطبيق:

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

يضمن التكوين أعلاه أن التطبيق يتعرف على `ENGLISH` و `FRENCH` و `SPANISH` كلغات مدعومة ويستخدم `ENGLISH` كلغة احتياطية.

باستخدام هذا التكوين، يمكن لوظيفة `getMultilingualUrls` إنشاء خرائط عناوين URL متعددة اللغات ديناميكيًا بناءً على اللغات المدعومة للتطبيق:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// الإخراج:
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
// الإخراج:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

من خلال دمج `getMultilingualUrls`، يمكن للمطورين الحفاظ على هياكل عناوين URL متسقة عبر لغات متعددة، مما يعزز تجربة المستخدم وتحسين محركات البحث.
