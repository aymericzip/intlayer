````markdown
# Documentation: `getLocaleName` Function in `intlayer`

## Description:

تُعيد دالة `getLocaleName` اسم اللغة المحلية لـ `targetLocale` المحدد باللغة المعروضة `displayLocale`. إذا لم يتم توفير `targetLocale`، تُعيد اسم `displayLocale` بلغتها الخاصة.

## Parameters:

- `displayLocale: Locales`

  - **وصف**: اللغة التي سيتم عرض اسم اللغة المستهدفة بها.
  - **النوع**: تعداد أو سلسلة تمثل اللغات الصحيحة.

- `targetLocale?: Locales`
  - **وصف**: اللغة التي يتم تعريب اسمها.
  - **النوع**: اختياري. تعداد أو سلسلة تمثل اللغات الصحيحة.

## Returns:

- **النوع**: `string`
- **وصف**: الاسم المعرب لـ `targetLocale` في `displayLocale`، أو اسم `displayLocale` الخاص إذا لم يتم توفير `targetLocale`. إذا لم يتم العثور على ترجمة، فإنها تعيد `"Unknown locale"`.

## Example Usage:

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```
````

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

## Edge Cases:

- **لم يتم توفير `targetLocale`:**
  - تقوم الدالة بشكل افتراضي بإعادة اسم `displayLocale` الخاص بها.
- **ترجمات مفقودة:**
  - إذا لم تحتوي `localeNameTranslations` على إدخال لـ `targetLocale` أو `displayLocale` المحدد، تتراجع الدالة إلى `ownLocalesName` أو تعيد `"Unknown locale"`.

```

```
