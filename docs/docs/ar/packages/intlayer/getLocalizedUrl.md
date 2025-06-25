---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getLocalizedUrl | intlayer
description: انظر كيف تستخدم دالة getLocalizedUrl لحزمة intlayer
keywords:
  - getLocalizedUrl
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# توثيق: وظيفة `getLocalizedUrl` في `intlayer`

## الوصف

وظيفة `getLocalizedUrl` تقوم بإنشاء رابط محلي عن طريق إضافة بادئة للرابط المعطى مع اللغة المحددة. تتعامل مع الروابط المطلقة والنسبية، مما يضمن تطبيق بادئة اللغة الصحيحة بناءً على الإعدادات.

---

## المعاملات

- `url: string`

  - **الوصف**: سلسلة النص الأصلية التي سيتم إضافة بادئة اللغة إليها.
  - **النوع**: `string`

- `currentLocale: Locales`

  - **الوصف**: اللغة الحالية التي يتم تخصيص الرابط لها.
  - **النوع**: `Locales`

- `locales: Locales[]`

  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. بشكل افتراضي، يتم توفير اللغات المكونة في المشروع.
  - **النوع**: `Locales[]`
  - **الافتراضي**: [`إعداد المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

- `defaultLocale: Locales`

  - **الوصف**: اللغة الافتراضية للتطبيق. بشكل افتراضي، يتم توفير اللغة الافتراضية المكونة في المشروع.
  - **النوع**: `Locales`
  - **الافتراضي**: [`إعداد المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

- `prefixDefault: boolean`
  - **الوصف**: ما إذا كان يجب إضافة بادئة للرابط للغة الافتراضية. بشكل افتراضي، يتم توفير القيمة المكونة في المشروع.
  - **النوع**: `boolean`
  - **الافتراضي**: [`إعداد المشروع`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

### الإرجاع

- **النوع**: `string`
- **الوصف**: الرابط المحلي للغة المحددة.

---

## أمثلة الاستخدام

### الروابط النسبية

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// النتيجة: "/fr/about" للغة الفرنسية
// النتيجة: "/about" للغة الافتراضية (الإنجليزية)
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

// النتيجة: "/fr/about" للغة الفرنسية
// النتيجة: "/about" للغة الافتراضية (الإنجليزية)
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

// النتيجة: "/fr/about" للغة الفرنسية
// النتيجة: "/about" للغة الافتراضية (الإنجليزية)
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

// النتيجة: "/fr/about" للغة الفرنسية
// النتيجة: "/about" للغة الافتراضية (الإنجليزية)
```

### الروابط المطلقة

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // إضافة بادئة للغة الافتراضية
); // النتيجة: "https://example.com/fr/about" للفرنسية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // إضافة بادئة للغة الافتراضية
); // النتيجة: "https://example.com/about" للإنجليزية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  true // إضافة بادئة للغة الافتراضية
); // النتيجة: "https://example.com/en/about" للإنجليزية
```

### لغة غير مدعومة

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH // اللغة الافتراضية
); // النتيجة: "/about" (لم يتم تطبيق بادئة للغة غير مدعومة)
```

---

## الحالات الخاصة

- **عدم وجود مقطع لغة:**

  - إذا لم يحتوي الرابط على أي مقطع لغة، تقوم الوظيفة بإضافة بادئة اللغة المناسبة بأمان.

- **اللغة الافتراضية:**

  - عندما تكون `prefixDefault` تساوي `false`، لا تضيف الوظيفة بادئة للرابط للغة الافتراضية.

- **اللغات غير المدعومة:**
  - بالنسبة للغات غير المدرجة في `locales`، لا تطبق الوظيفة أي بادئة.

---

## الاستخدام في التطبيقات

في تطبيق متعدد اللغات، يعد تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمرًا بالغ الأهمية لضمان عرض اللغة الصحيحة. فيما يلي مثال على كيفية استخدام `getLocalizedUrl` في إعداد التطبيق:

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

يضمن التكوين أعلاه أن التطبيق يتعرف على `ENGLISH` و`FRENCH` و`SPANISH` كلغات مدعومة ويستخدم `ENGLISH` كلغة احتياطية.

باستخدام هذا التكوين، يمكن لوظيفة `getLocalizedUrl` إنشاء روابط محلية ديناميكيًا بناءً على تفضيل لغة المستخدم:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // النتيجة: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // النتيجة: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // النتيجة: "/about"
```

من خلال دمج `getLocalizedUrl`، يمكن للمطورين الحفاظ على هياكل روابط متسقة عبر لغات متعددة، مما يعزز تجربة المستخدم وتحسين محركات البحث.
