---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getLocaleLang | intlayer
description: انظر كيف تستخدم دالة getLocaleLang لحزمة intlayer
keywords:
  - getLocaleLang
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

To translate this file into Arabic (العربية):

# التوثيق: وظيفة `getLocaleLang` في `intlayer`

## الوصف

وظيفة `getLocaleLang` تستخرج رمز اللغة من سلسلة اللغة المحلية. تدعم اللغات المحلية مع أو بدون رموز الدول. إذا لم يتم توفير لغة محلية، فإنها تعود افتراضياً بسلسلة فارغة.

## المعلمات

- `locale?: Locales`

  - **الوصف**: سلسلة اللغة المحلية (على سبيل المثال، `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) التي يتم استخراج رمز اللغة منها.
  - **النوع**: `Locales` (اختياري)

## الإرجاع

- **النوع**: `string`
- **الوصف**: رمز اللغة المستخرج من اللغة المحلية. إذا لم يتم توفير اللغة المحلية، فإنه يعود بسلسلة فارغة (`''`).

## مثال على الاستخدام

### استخراج رموز اللغات:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // الناتج: "en"
getLocaleLang(Locales.ENGLISH); // الناتج: "en"
getLocaleLang(Locales.FRENCH_CANADA); // الناتج: "fr"
getLocaleLang(Locales.FRENCH); // الناتج: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // الناتج: "en"
getLocaleLang(Locales.ENGLISH); // الناتج: "en"
getLocaleLang(Locales.FRENCH_CANADA); // الناتج: "fr"
getLocaleLang(Locales.FRENCH); // الناتج: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // الناتج: "en"
getLocaleLang(Locales.ENGLISH); // الناتج: "en"
getLocaleLang(Locales.FRENCH_CANADA); // الناتج: "fr"
getLocaleLang(Locales.FRENCH); // الناتج: "fr"
```

## الحالات الخاصة

- **عدم توفير لغة محلية:**

  - تعود الوظيفة بسلسلة فارغة عندما تكون `locale` غير معرفة.

- **سلاسل لغة محلية غير صحيحة:**
  - إذا لم تتبع `locale` تنسيق `language-country` (على سبيل المثال، `Locales.ENGLISH-US`)، فإن الوظيفة تعود بأمان بالجزء قبل `'-'` أو السلسلة الكاملة إذا لم يكن هناك `'-'`.

[رابط التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/**/*.md)
