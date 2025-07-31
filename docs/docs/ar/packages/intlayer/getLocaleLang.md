---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getLocaleLang | intlayer
description: تعرف على كيفية استخدام دالة getLocaleLang لحزمة intlayer
keywords:
  - getLocaleLang
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleLang
---

# التوثيق: دالة `getLocaleLang` في `intlayer`

## الوصف

تقوم دالة `getLocaleLang` باستخراج رمز اللغة من سلسلة الموقع locale. تدعم المواقع التي تحتوي على رموز دولية أو بدونها. إذا لم يتم توفير موقع، فإنها تعيد قيمة فارغة بشكل افتراضي.

## المعاملات

- `locale?: Locales`

  - **الوصف**: سلسلة الموقع (مثل `Locales.ENGLISH_UNITED_STATES`، `Locales.FRENCH_CANADA`) التي يتم استخراج رمز اللغة منها.
  - **النوع**: `Locales` (اختياري)

## القيم المرجعة

- **النوع**: `string`
- **الوصف**: رمز اللغة المستخرج من الموقع. إذا لم يتم توفير الموقع، تعيد قيمة فارغة (`''`).

## مثال على الاستخدام

### استخراج رموز اللغة:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
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

- **عدم توفير الموقع:**

- تُعيد الدالة سلسلة فارغة عندما يكون `locale` غير معرف (`undefined`).

- **سلاسل الموقع المشوهة:**
  - إذا لم يتبع `locale` تنسيق `language-country` (مثلًا، `Locales.ENGLISH-US`)، فإن الدالة تُعيد بأمان الجزء الذي يسبق `'-'` أو السلسلة كاملة إذا لم يكن هناك `'-'`.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
