# الوثائق: دالة `getLocaleLang` في `intlayer`

## الوصف:

تقوم دالة `getLocaleLang` باستخراج رمز اللغة من سلسلة المنطقة. تدعم المناطق التي تحتوي على أو بدون رموز الدول. إذا لم يتم توفير منطقة، فإنها تعود بشكل افتراضي بإرجاع سلسلة فارغة.

## المعلمات:

- `locale?: Locales`

  - **الوصف**: سلسلة المنطقة (مثل `Locales.ENGLISH_UNITED_STATES`، `Locales.FRENCH_CANADA`) التي يتم استخراج رمز اللغة منها.
  - **النوع**: `Locales` (اختياري)

## العائدات:

- **النوع**: `string`
- **الوصف**: رمز اللغة المستخرج من المنطقة. إذا لم يتم توفير المنطقة، فإنها تعود بسلسلة فارغة (`''`).

## مثال على الاستخدام:

### استخراج رموز اللغة:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

// إرجاع رمز اللغة من منطقة اللغة الإنجليزية - الولايات المتحدة
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
// إرجاع رمز اللغة من منطقة اللغة الإنجليزية
getLocaleLang(Locales.ENGLISH); // Output: "en"
// إرجاع رمز اللغة من منطقة اللغة الفرنسية - كندا
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
// إرجاع رمز اللغة من منطقة اللغة الفرنسية
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

// إرجاع رمز اللغة من منطقة اللغة الإنجليزية - الولايات المتحدة
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
// إرجاع رمز اللغة من منطقة اللغة الإنجليزية
getLocaleLang(Locales.ENGLISH); // Output: "en"
// إرجاع رمز اللغة من منطقة اللغة الفرنسية - كندا
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
// إرجاع رمز اللغة من منطقة اللغة الفرنسية
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

// إرجاع رمز اللغة من منطقة اللغة الإنجليزية - الولايات المتحدة
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
// إرجاع رمز اللغة من منطقة اللغة الإنجليزية
getLocaleLang(Locales.ENGLISH); // Output: "en"
// إرجاع رمز اللغة من منطقة اللغة الفرنسية - كندا
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
// إرجاع رمز اللغة من منطقة اللغة الفرنسية
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

## الحالات الحديّة:

- **لا توجد منطقة مقدمة:**

  - تعود الدالة بسلسلة فارغة عندما يكون `locale` غير معرّف.

- **سلاسل المناطق غير الصحيحة:**
  - إذا كانت `locale` لا تتبع تنسيق `language-country` (مثل `Locales.ENGLISH-US`)، فإن الدالة تعود بشكل آمن بالجزء قبل `'-'` أو بالسلسلة بالكامل إذا لم يكن هناك `'-'`.
