---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getLocaleName | intlayer
description: انظر كيف تستخدم دالة getLocaleName لحزمة intlayer
keywords:
  - getLocaleName
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# وثائق: وظيفة `getLocaleName` في `intlayer`

## الوصف

وظيفة `getLocaleName` تُرجع الاسم المحلي للغة معينة (`targetLocale`) في لغة العرض (`displayLocale`). إذا لم يتم توفير `targetLocale`، فإنها تُرجع اسم `displayLocale` بلغته الخاصة.

## المعاملات

- `displayLocale: Locales`

  - **الوصف**: اللغة التي سيتم عرض اسم اللغة المستهدفة بها.
  - **النوع**: Enum أو سلسلة نصية تمثل لغات صالحة.

- `targetLocale?: Locales`
  - **الوصف**: اللغة التي سيتم توطين اسمها.
  - **النوع**: اختياري. Enum أو سلسلة نصية تمثل لغات صالحة.

## القيم المُعادة

- **النوع**: `string`
- **الوصف**: الاسم المحلي لـ `targetLocale` في `displayLocale`، أو اسم `displayLocale` الخاص إذا لم يتم توفير `targetLocale`. إذا لم يتم العثور على ترجمة، فإنها تُرجع `"لغة غير معروفة"`.

## أمثلة الاستخدام

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // الناتج: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // الناتج: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // الناتج: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // الناتج: "English"

getLocaleName(Locales.FRENCH); // الناتج: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // الناتج: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // الناتج: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // الناتج: "French"

getLocaleName(Locales.CHINESE); // الناتج: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // الناتج: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // الناتج: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // الناتج: "Chinese"

getLocaleName("unknown-locale"); // الناتج: "لغة غير معروفة"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // الناتج: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // الناتج: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // الناتج: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // الناتج: "English"

getLocaleName(Locales.FRENCH); // الناتج: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // الناتج: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // الناتج: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // الناتج: "French"

getLocaleName(Locales.CHINESE); // الناتج: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // الناتج: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // الناتج: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // الناتج: "Chinese"

getLocaleName("unknown-locale"); // الناتج: "لغة غير معروفة"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // الناتج: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // الناتج: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // الناتج: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // الناتج: "English"

getLocaleName(Locales.FRENCH); // الناتج: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // الناتج: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // الناتج: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // الناتج: "French"

getLocaleName(Locales.CHINESE); // الناتج: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // الناتج: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // الناتج: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // الناتج: "Chinese"

getLocaleName("unknown-locale"); // الناتج: "لغة غير معروفة"
```

## الحالات الخاصة

- **عدم توفير `targetLocale`:**
  - تقوم الوظيفة افتراضيًا بإرجاع اسم `displayLocale` الخاص.
- **الترجمات المفقودة:**
  - إذا لم يحتوي `localeNameTranslations` على إدخال لـ `targetLocale` أو `displayLocale` المحدد، فإن الوظيفة تعود إلى `ownLocalesName` أو تُرجع `"لغة غير معروفة"`.
