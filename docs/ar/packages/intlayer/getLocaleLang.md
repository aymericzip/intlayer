# Documentation: `getLocaleLang` Function in `intlayer`

## Description:

تقوم دالة `getLocaleLang` باستخراج رمز اللغة من سلسلة اللغة المحلية. تدعم اللغات المحلية مع أو بدون رموز البلاد. إذا لم يتم توفير لغة محلية، فإنها تعود افتراضيًا إلى إرجاع سلسلة فارغة.

## Parameters:

- `locale?: Locales`

  - **Description**: سلسلة اللغة المحلية (مثل `Locales.ENGLISH_UNITED_STATES`، `Locales.FRENCH_CANADA`) التي يتم استخراج رمز اللغة منها.
  - **Type**: `Locales` (اختياري)

## Returns:

- **Type**: `string`
- **Description**: رمز اللغة المستخرج من اللغة المحلية. إذا لم يتم توفير اللغة المحلية، فإنها تعود بسلسلة فارغة (`''`).

## Example Usage:

### Extracting Language Codes:

```typescript
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // الناتج: "en"
getLocaleLang(Locales.ENGLISH); // الناتج: "en"
getLocaleLang(Locales.FRENCH_CANADA); // الناتج: "fr"
getLocaleLang(Locales.FRENCH); // الناتج: "fr"
```

## Edge Cases:

- **No Locale Provided:**

  - تقوم الدالة بإرجاع سلسلة فارغة عندما تكون `locale` غير معرف.

- **Malformed Locale Strings:**
  - إذا كانت `locale` لا تتبع تنسيق `language-country` (مثل `Locales.ENGLISH-US`)، فإن الدالة تعود بأمان بالجزء الذي يأتي قبل `'-'` أو بالسلسلة الكاملة إذا لم يكن هناك `'-'`.
