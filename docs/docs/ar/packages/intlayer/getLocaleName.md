---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getLocaleName | intlayer
description: تعرف على كيفية استخدام دالة getLocaleName لحزمة intlayer
keywords:
  - getLocaleName
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
---

# التوثيق: دالة `getLocaleName` في `intlayer`

## الوصف

تعيد دالة `getLocaleName` الاسم المحلي للغة معينة (`targetLocale`) في لغة العرض (`displayLocale`). إذا لم يتم توفير `targetLocale`، فإنها تعيد اسم `displayLocale` بلغتها الخاصة.

## المعاملات

- `displayLocale: Locales`

  - **الوصف**: اللغة التي سيتم عرض اسم اللغة الهدف بها.
  - **النوع**: تعداد أو سلسلة تمثل اللغات الصالحة.

- `targetLocale?: Locales`
  - **الوصف**: اللغة التي سيتم تعريب اسمها.
  - **النوع**: اختياري. تعداد أو سلسلة تمثل اللغات الصالحة.

## القيم المرجعة

- **النوع**: `string`
- **الوصف**: الاسم المعرب لـ `targetLocale` في `displayLocale`، أو اسم `displayLocale` نفسه إذا لم يتم توفير `targetLocale`. إذا لم يتم العثور على ترجمة، فإنه يعيد `"Unknown locale"`.

## مثال على الاستخدام

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

getLocaleName("unknown-locale"); // الناتج: "Unknown locale"
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

getLocaleName("unknown-locale"); // الناتج: "Unknown locale"
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

getLocaleName("unknown-locale"); // الناتج: "Unknown locale"
```

## الحالات الخاصة

- **عدم توفير `targetLocale`:**
- تقوم الدالة بشكل افتراضي بإرجاع اسم `displayLocale` الخاص به.
- **الترجمات المفقودة:**
  - إذا لم يحتوي `localeNameTranslations` على إدخال لـ `targetLocale` أو لـ `displayLocale` المحدد، فإن الدالة تعود إلى `ownLocalesName` أو تُرجع `"Unknown locale"`.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
