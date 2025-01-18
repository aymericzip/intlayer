# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description

تقوم دالة `getLocalizedUrl` بإنشاء عنوان URL محلي عن طريق إضافة بادئة اللغة المحددة. فهي تعالج كل من عناوين URL المطلقة والنسبية، مع ضمان تطبيق بادئة اللغة الصحيحة بناءً على التكوين.

---

## Parameters

- `url: string`

  - **Description**: سلسلة عنوان URL الأصلية التي سيتم إضافة بادئة اللغة إليها.
  - **Type**: `string`

- `currentLocale: Locales`

  - **Description**: اللغة الحالية التي يتم تخصيص عنوان URL لها.
  - **Type**: `Locales`

- `locales: Locales[]`

  - **Description**: مصفوفة اختيارية من اللغات المدعومة. بشكل افتراضي، يتم توفير اللغات المكونة في المشروع.
  - **Type**: `Locales[]`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description**: اللغة الافتراضية للتطبيق. بشكل افتراضي، يتم توفير اللغة الافتراضية المكونة في المشروع.
  - **Type**: `Locales`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: ما إذا كان يجب إضافة بادئة للغة الافتراضية. بشكل افتراضي، يتم توفير القيمة المكونة في المشروع.
  - **Type**: `boolean`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md#middleware)

### Returns

- **Type**: `string`
- **Description**: عنوان URL المحلي للغة المحددة.

---

## Example Usage

### Relative URLs

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" للغة الفرنسية
// Output: "/about" للغة الافتراضية (الإنجليزية)
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

// Output: "/fr/about" للغة الفرنسية
// Output: "/about" للغة الافتراضية (الإنجليزية)
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

// Output: "/fr/about" للغة الفرنسية
// Output: "/about" للغة الافتراضية (الإنجليزية)
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

// Output: "/fr/about" للغة الفرنسية
// Output: "/about" للغة الافتراضية (الإنجليزية)
```

### Absolute URLs

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // بادئة اللغة الافتراضية
); // Output: "https://example.com/fr/about" للغة الفرنسية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  false // بادئة اللغة الافتراضية
); // Output: "https://example.com/about" للغة الإنجليزية

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH, // اللغة الافتراضية
  true // بادئة اللغة الافتراضية
); // Output: "https://example.com/en/about" للغة الإنجليزية
```

### Unsupported Locale

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // اللغة الحالية
  [Locales.ENGLISH, Locales.FRENCH], // اللغات المدعومة
  Locales.ENGLISH // اللغة الافتراضية
); // Output: "/about" (لا توجد بادئة مضافة للغة غير المدعومة)
```

---

## Edge Cases

- **No Locale Segment:**

  - إذا لم يحتوي عنوان URL على أي جزء من اللغة، تقوم الدالة بإضافة بادئة اللغة المناسبة بأمان.

- **Default Locale:**

  - عندما تكون `prefixDefault` تساوي `false`، لا تضيف الدالة بادئة إلى عنوان URL للغة الافتراضية.

- **Unsupported Locales:**
  - بالنسبة للغات التي لا ترد في `locales`، لا تضيف الدالة أي بادئة.

---

## Usage in Applications

في تطبيق متعدد اللغات، يعتبر تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمرًا حاسمًا لضمان عرض اللغة الصحيحة. أدناه مثال على كيفية استخدام `getLocalizedUrl` في إعداد التطبيق:

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

تضمن الإعدادات أعلاه أن يتعرف التطبيق على `ENGLISH` و `FRENCH` و `SPANISH` كلغات مدعومة ويستخدم `ENGLISH` كلغة بديلة.

باستخدام هذا الإعداد، يمكن لدالة `getLocalizedUrl` إنشاء عناوين URL محلية ديناميكيًا بناءً على تفضيل لغة المستخدم:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

من خلال دمج `getLocalizedUrl`، يمكن للمطورين الحفاظ على هياكل عناوين URL متسقة عبر عدة لغات، مما يعزز تجربة المستخدم وتحسين SEO.
