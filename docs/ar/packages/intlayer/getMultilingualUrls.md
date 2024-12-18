# Documentation: `getMultilingualUrls` Function in `intlayer`

## Description:

The `getMultilingualUrls` function generates a mapping of multilingual URLs by prefixing the given URL with each supported locale. It can handle both absolute and relative URLs, applying the appropriate locale prefix based on the provided configuration or defaults.

---

## Parameters:

- `url: string`

  - **الوصف**: السلسلة الأصلية لعنوان URL التي سيتم إرفاقها باللغات المحلية.
  - **النوع**: `string`

- `locales: Locales[]`

  - **الوصف**: مصفوفة اختيارية من اللغات المحلية المدعومة. الافتراضي هو اللغات المحلية المكونة في المشروع.
  - **النوع**: `Locales[]`
  - **الافتراضي**: `localesDefault`

- `defaultLocale: Locales`

  - **الوصف**: اللغة المحلية الافتراضية للتطبيق. الافتراضي هو اللغة المحلية الافتراضية المكونة في المشروع.
  - **النوع**: `Locales`
  - **الافتراضي**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **الوصف**: ما إذا كان يجب إدخال البادئة للغة المحلية الافتراضية. الافتراضي هو القيمة المكونة في المشروع.
  - **النوع**: `boolean`
  - **الافتراضي**: `prefixDefaultDefault`

### Returns:

- **النوع**: `IConfigLocales<string>`
- **الوصف**: كائن يطابق كل لغة محلية مع عنوان URL متعدد اللغات الخاص بها.

---

## Example Usage:

### Relative URLs:

```typescript
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Absolute URLs:

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Edge Cases:

- **لا يوجد قسم لغة محلية:**

  - تقوم الدالة بإزالة أي قسم لغة محلية موجود من عنوان URL قبل إنشاء الخرائط متعددة اللغات.

- **اللغة المحلية الافتراضية:**

  - عندما تكون `prefixDefault` هي `false`، فإن الدالة لا تضع بادئة لعنوان URL للغة المحلية الافتراضية.

- **لغات محلية غير مدعومة:**
  - فقط اللغات المحلية المقدمة في مصفوفة `locales` يتم اعتبارها لإنشاء عناوين URL.

---

## Usage in Applications:

في تطبيق متعدد اللغات، فإن تكوين إعدادات التدويل باستخدام `locales` و `defaultLocale` أمر بالغ الأهمية لضمان عرض اللغة الصحيحة. فيما يلي مثال على كيفية استخدام `getMultilingualUrls` في إعداد التطبيق:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// تكوين اللغات المدعومة واللغة المحلية الافتراضية
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

التهيئة أعلاه تضمن أن التطبيق recognizes اللغة `ENGLISH` و `FRENCH` و `SPANISH` كلغات مدعومة وتستخدم `ENGLISH` كبديل.

باستخدام هذا التكوين، يمكن لدالة `getMultilingualUrls` توليد خرائط عناوين URL متعددة اللغات استنادًا إلى اللغات المحلية المدعومة في التطبيق:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Output:
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
// Output:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

من خلال دمج `getMultilingualUrls`، يمكن للمطورين الحفاظ على هياكل URL متسقة عبر عدة لغات، مما يعزز تجربة المستخدم وSEO.
