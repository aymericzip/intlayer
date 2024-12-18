# Documentation: `getLocaleName` Function in `intlayer`

## الوصف:

تُرجع دالة `getLocaleName` الاسم المحلي لأي منطقة معينة (`targetLocale`) باللغة المعروضة (`displayLocale`). إذا لم يتم توفير `targetLocale`، فإنها تُرجع اسم `displayLocale` بلغتها الخاصة.

## المعاملات:

- `displayLocale: Locales`

  - **الوصف**: المنطقة التي سيتم عرض اسم المنطقة المستهدفة بها.
  - **النوع**: Enum أو سلسلة تمثل المناطق الصالحة.

- `targetLocale?: Locales`
  - **الوصف**: المنطقة التي يجب ت Localization اسمها.
  - **النوع**: اختياري. Enum أو سلسلة تمثل المناطق الصالحة.

## العائدات:

- **النوع**: `string`
- **الوصف**: الاسم المحلي لـ `targetLocale` في `displayLocale`، أو اسم `displayLocale` نفسه إذا لم يتم توفير `targetLocale`. إذا لم يتم العثور على ترجمة، فإنه يُرجع `"Unknown locale"`.

## مثال على الاستخدام:

```typescript
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // الإخراج: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // الإخراج: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // الإخراج: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // الإخراج: "English"

getLocaleName(Locales.FRENCH); // الإخراج: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // الإخراج: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // الإخراج: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // الإخراج: "French"

getLocaleName(Locales.CHINESE); // الإخراج: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // الإخراج: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // الإخراج: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // الإخراج: "Chinese"

getLocaleName("unknown-locale"); // الإخراج: "Unknown locale"
```

## حالات الحواف:

- **عدم توفير `targetLocale`:**
  - بشكل افتراضي، تقوم الدالة بإرجاع اسم `displayLocale` نفسه.
- **ترجمات مفقودة:**
  - إذا لم تحتوي `localeNameTranslations` على إدخال لـ `targetLocale` أو `displayLocale` المحددة، فإن الدالة تلجأ إلى `ownLocalesName` أو تُرجع `"Unknown locale"`.
