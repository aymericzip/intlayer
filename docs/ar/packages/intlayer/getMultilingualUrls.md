# الوثائق: دالة `getMultilingualUrls` في `intlayer`

## الوصف:

تقوم دالة `getMultilingualUrls` بإنشاء خريطة من عناوين URL متعددة اللغات عن طريق إضافة بادئة عناوين URL المعطاة بكل لغة مدعومة. يمكنها التعامل مع كل من عناوين URL المطلقة والنسبية، وتطبيق بادئة اللغة المناسبة بناءً على التكوين المقدم أو القيم الافتراضية.

---

## المعاملات:

- `url: string`

  - **الوصف**: سلسلة عنوان URL الأصلية المراد إضافة بادئات اللغات إليها.
  - **النوع**: `string`

- `locales: Locales[]`

  - **الوصف**: مصفوفة اختيارية من اللغات المدعومة. يتم تعيينها على القيم الافتراضية للغات المعرفة في المشروع.
  - **النوع**: `Locales[]`
  - **الافتراضي**: `localesDefault`

- `defaultLocale: Locales`

  - **الوصف**: اللغة الافتراضية للتطبيق. يتم تعيينها على اللغة الافتراضية المعرفة في المشروع.
  - **النوع**: `Locales`
  - **الافتراضي**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **الوصف**: ما إذا كان يجب إضافة بادئة اللغة الافتراضية. يتم تعيينها على القيمة المعينة في المشروع.
  - **النوع**: `boolean`
  - **الافتراضي**: `prefixDefaultDefault`

### النتيجة:

- **النوع**: `IConfigLocales<string>`
- **الوصف**: كائن يربط كل لغة بالرابط متعدد اللغات المقابل.

---

## مثال على الاستخدام:

### عناوين URL النسبية:

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// النتيجة: {
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
// النتيجة: {
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
// النتيجة: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### عناوين URL المطلقة:

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// النتيجة: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## حالات الشذوذ:

- **عدم وجود جزء اللغة:**

  - تقوم الدالة بإزالة أي جزء لغة موجود من عنوان URL قبل إنشاء الخرائط متعددة اللغات.

- **اللغة الافتراضية:**

  - عندما تكون `prefixDefault` تساوي `false`، لا تضيف الدالة بادئة للغة الافتراضية.

- **اللغات غير المدعومة:**
  - يتم اعتبار اللغات المقدمة فقط في مصفوفة `locales` لتوليد عناوين URL.

---

## الاستخدام في التطبيقات:

في تطبيق متعدد اللغات، يعد تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمرًا حاسمًا لضمان عرض اللغة الصحيحة. أدناه مثال على كيفية استخدام `getMultilingualUrls` في إعداد التطبيق:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// التكوين للغات المدعومة واللغة الافتراضية
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

باستخدام هذا التكوين، يمكن لدالة `getMultilingualUrls` توليد خريطة عناوين URL متعددة اللغات ديناميكيًا بناءً على اللغات المدعومة في التطبيق:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// النتيجة:
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
// النتيجة:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

من خلال دمج `getMultilingualUrls`، يمكن للمطورين الحفاظ على هياكل عناوين URL متسقة عبر عدة لغات، مما يعزز كل من تجربة المستخدم وSEO.
