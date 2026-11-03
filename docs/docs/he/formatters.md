---
createdAt: 2024-08-13
updatedAt: 2026-11-03
priority: 8
title: "מעצבים (Formatters): מספרים, תאריכים ומטבעות לפי שפה"
description: "עצבו מספרים, אחוזים, מטבעות, תאריכים, זמן יחסי ויחידות מידה לפי שפה באמצעות עזרי ה-Intl השמורים במטמון של Intlayer."
keywords:
  - מעצבים
  - Formatters
  - Intl
  - מספר
  - מטבע
  - אחוז
  - תאריך
  - זמן יחסי
  - יחידות
  - קומפקטי
  - רשימה
  - בינאום
slugs:
  - doc
  - formatters
history:
  - version: 9.6.0
    date: 2026-10-02
    changes: "מעצבים נסוגים לשפת הבקשה, ולאחר מכן לשפה השמורה, כאשר לא מועברת שפה"
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 8.0.0
    date: 2026-01-20
    changes: "הוספת useIntl"
  - version: 6.2.0
    date: 2025-10-14
    changes: "הסרת getIntlayerAsync ממעצבים"
  - version: 5.8.0
    date: 2025-08-20
    changes: "הוספת מעצבי vue"
  - version: 5.8.0
    date: 2025-08-18
    changes: "הוספת תיעוד מעצבים"
  - version: 5.8.0
    date: 2025-08-20
    changes: "הוספת תיעוד מעצב רשימות"
  - version: 5.8.0
    date: 2025-08-20
    changes: "הוספת כלי שירות נוספים של Intl (DisplayNames, Collator, PluralRules)"
  - version: 5.8.0
    date: 2025-08-20
    changes: "הוספת כלי שירות לשפות (getLocaleName, getLocaleLang, getLocaleFromPath וכו')"
  - version: 5.8.0
    date: 2025-08-20
    changes: "הוספת כלי עזר לטיפול בתוכן (getContent, getTranslation, getIntlayer וכו')"
author: aymericzip
---

# מעצבי Intlayer (Formatters)

## תוכן עניינים

<TOC/>

## סקירה כללית

Intlayer מספק כלי עזר לעיצוב מודע-שפה הבנויים על גבי ה-APIs המקוריים של `Intl`. מעצבים אלו משתמשים אוטומטית בשפה הנוכחית מתוך הקשר האפליקציה שלכם, מה שמייתר את הצורך להעביר פרמטרי שפה ידנית.

**עבור React, Vue, ושלדי פיתוח נוספים**, השתמשו ב-hooks/composables הייעודיים לכל framework הנקשרים אוטומטית להקשר השפה של האפליקציה שלכם:

| Framework                | ייבוא (Import)                   |
| ------------------------ | -------------------------------- |
| **React** (לקוח)         | `react-intlayer/format`          |
| **React** (שרת)          | `react-intlayer/server/format`   |
| **Next.js** (לקוח)       | `next-intlayer/client/format`    |
| **Next.js** (שרת)        | `next-intlayer/server/format`    |
| **Vue**                  | `vue-intlayer/format`            |
| **Preact**               | `preact-intlayer/format`         |
| **Vanilla JS / Node.js** | `intlayer` (אין צורך ב-provider) |

## באיזו שפה נעשה שימוש?

כאשר אתם מעבירים אפשרות `locale`, היא תמיד קובעת. אחרת, המעצבים, ה-hooks שלהם (`useNumber`, `useDate`, `useList` וכו') ו-`useIntl` מפענחים את השפה בסדר הבא:

1. **השפה של ה-provider** (`IntlayerProvider`), עבור hooks ו-composables.
2. **השפה של הבקשה הנוכחית**, בשרת, כאשר אינטגרציה של Intlayer מטפלת בה (`express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `remix-intlayer`, `astro-intlayer` וכו').
3. **השפה השמורה בדפדפן** (cookie, `localStorage`, `sessionStorage`), זו שבורר השפות שלכם שומר.
4. **ה-`defaultLocale`** של התצורה שלכם.

```ts
import { number, list } from "intlayer";

// שפה שמורה: fr
number(1234.5); // "1 234,5"
list(["apple", "banana"]); // "apple et banana"
```

מחוץ ל-provider או לאינטגרציית שרת, השרת מעצב עם ה-`defaultLocale` בעוד שהדפדפן משתמש בשפה השמורה, מה שעלול לגרום לאי-התאמת הידרציה (hydration mismatch). עבור דפים מרונדרי שרת, השתמשו ב-provider או העבירו את ה-`locale` במפורש.

- [האם ניתן להשתמש ב-Intlayer ללא provider גלובלי?](https://github.com/aymericzip/intlayer/blob/main/docs/frequent_questions/he/use_without_provider.md)

## מעצבי React

### תחילת עבודה מהירה

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
  useIntl,
} from "react-intlayer/format";
// לקוח Next.js: "next-intlayer/client/format"
// שרת Next.js: "next-intlayer/server/format"
// Preact: "preact-intlayer/format"

const PriceDisplay = () => {
  const currency = useCurrency();
  const percentage = usePercentage();

  return (
    <div>
      <p>מחיר: {currency(1234.5, { currency: "EUR" })}</p>
      <p>הנחה: {percentage(0.25)}</p>
    </div>
  );
};
```

### Hooks זמינים

כל ה-hooks משתמשים אוטומטית בשפה מתוך `IntlayerProvider` (או `IntlayerClientProvider` / `IntlayerServerProvider`).

| Hook                | תיאור                        | דוגמת פלט                     |
| ------------------- | ---------------------------- | ----------------------------- |
| `useNumber()`       | עיצוב מספרים עם הפרדת אלפים  | `"123,456.789"`               |
| `useCurrency()`     | עיצוב ערכי מטבע              | `"€1,234.50"`                 |
| `usePercentage()`   | עיצוב אחוזים                 | `"25%"`                       |
| `useDate()`         | עיצוב תאריכים ושעות          | `"Aug 2, 2025"`               |
| `useRelativeTime()` | עיצוב זמן יחסי               | `"in 3 days"`                 |
| `useUnit()`         | עיצוב ערכים עם יחידות מידה   | `"5 kilometers"`              |
| `useCompact()`      | עיצוב מספרים בסימון קומפקטי  | `"1.2K"`                      |
| `useList()`         | עיצוב מערכים כרשימות         | `"apple, banana, and orange"` |
| `useIntl()`         | קבלת אובייקט `Intl` קשור-שפה | גישה מלאה ל-API של `Intl`     |

### דוגמה מלאה

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date(Date.now() + 86400000))}</p>
      <p>{unit(5, { unit: "kilometer" })}</p>
    </div>
  );
};
```

### Hook ה-`useIntl`

ה-hook‏ `useIntl` מספק גישה ישירה לאובייקט `Intl` הקשור לשפה הנוכחית. הדבר שימושי כאשר אתם זקוקים ל-API המלא של `Intl` (למשל `DisplayNames`,‏ `Collator`,‏ `PluralRules`) עם הזרקת שפה אוטומטית.

```tsx
import { useIntl } from "react-intlayer/format";

const MyComponent = () => {
  const intl = useIntl(); // משתמש בשפת ההקשר

  // API סטנדרטי של Intl, אך השפה מוזרקת אוטומטית כאשר אינה מוגדרת
  const formatted = new intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(123.45);

  // ניתן עדיין לעקוף את השפה במידת הצורך
  const date = new intl.DateTimeFormat("fr-FR").format(new Date());

  // גישה לתכונות Intl נוספות
  const displayNames = new intl.DisplayNames(undefined, { type: "language" });
  const languageName = displayNames.of("fr"); // "French" (או מותאם לשפה)

  return (
    <div>
      <p>{formatted}</p>
      <p>{date}</p>
      <p>{languageName}</p>
    </div>
  );
};
```

## מעצבי Vue

### תחילת עבודה מהירה

```vue
<script setup>
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
  useIntl,
} from "vue-intlayer/format";

const currency = useCurrency();
const percentage = usePercentage();
</script>

<template>
  <div>
    <p>מחיר: {{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>הנחה: {{ percentage.value(0.25) }}</p>
  </div>
</template>
```

### Composables זמינים

כל ה-composables מחזירים computed refs המשתמשים אוטומטית בשפה מתוך ה-`IntlayerProvider` המוזרק.

| Composable          | תיאור                        | דוגמת פלט                     |
| ------------------- | ---------------------------- | ----------------------------- |
| `useNumber()`       | עיצוב מספרים עם הפרדת אלפים  | `"123,456.789"`               |
| `useCurrency()`     | עיצוב ערכי מטבע              | `"€1,234.50"`                 |
| `usePercentage()`   | עיצוב אחוזים                 | `"25%"`                       |
| `useDate()`         | עיצוב תאריכים ושעות          | `"Aug 2, 2025"`               |
| `useRelativeTime()` | עיצוב זמן יחסי               | `"in 3 days"`                 |
| `useUnit()`         | עיצוב ערכים עם יחידות מידה   | `"5 kilometers"`              |
| `useCompact()`      | עיצוב מספרים בסימון קומפקטי  | `"1.2K"`                      |
| `useList()`         | עיצוב מערכים כרשימות         | `"apple, banana, and orange"` |
| `useIntl()`         | קבלת אובייקט `Intl` קשור-שפה | גישה מלאה ל-API של `Intl`     |

### דוגמה מלאה

```vue
<script setup>
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";

const number = useNumber();
const currency = useCurrency();
const date = useDate();
const percentage = usePercentage();
const compact = useCompact();
const list = useList();
const relativeTime = useRelativeTime();
const unit = useUnit();
</script>

<template>
  <div>
    <p>{{ number.value(123456.789) }}</p>
    <p>{{ currency.value(1234.5, { currency: "EUR" }) }}</p>
    <p>{{ date.value(new Date(), "short") }}</p>
    <p>{{ percentage.value(0.25) }}</p>
    <p>{{ compact.value(1200) }}</p>
    <p>{{ list.value(["apple", "banana", "orange"]) }}</p>
    <p>{{ relativeTime.value(new Date(), new Date(Date.now() + 86400000)) }}</p>
    <p>{{ unit.value(5, { unit: "kilometer" }) }}</p>
  </div>
</template>
```

### Composable ה-`useIntl`

ה-composable‏ `useIntl` מספק גישה ישירה לאובייקט `Intl` הקשור לשפה הנוכחית. הדבר שימושי כאשר אתם זקוקים ל-API המלא של `Intl` עם הזרקת שפה אוטומטית.

```vue
<script setup>
import { useIntl } from "vue-intlayer/format";

const intl = useIntl(); // משתמש בשפת ההקשר

// API סטנדרטי של Intl, אך השפה מוזרקת אוטומטית כאשר אינה מוגדרת
const formatted = new intl.value.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
}).format(123.45);

// ניתן עדיין לעקוף את השפה במידת הצורך
const date = new intl.value.DateTimeFormat("fr-FR").format(new Date());

// גישה לתכונות Intl נוספות
const displayNames = new intl.value.DisplayNames(undefined, {
  type: "language",
});
const languageName = displayNames.of("fr");
</script>

<template>
  <div>
    <p>{{ formatted }}</p>
    <p>{{ date }}</p>
    <p>{{ languageName }}</p>
  </div>
</template>
```

## מעצבי Vanilla JS / Node.js

עבור הקשרים שאינם משתמשים ב-framework, ייבאו מעצבים ישירות מתוך `intlayer`. האפשרות `locale` היא אופציונלית: בלעדיה, נעשה שימוש בשפת הבקשה, לאחר מכן בשפה השמורה, ולבסוף ב-`defaultLocale`.

### ייבוא (Import)

```ts
import {
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
} from "intlayer";
```

### פונקציות עיצוב

#### `number(value, options?)`

מעצב ערך מספרי באמצעות קיבוץ אלפים ונקודה עשרונית מותאמי שפה.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
number(123456.789); // "123,456.789" (ב-en-US)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

#### `percentage(value, options?)`

מעצב מספר כמחרוזת אחוזים. ערכים הגדולים מ-1 מנורמלים (למשל `25` ← `25%`, `0.25` ← `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

#### `currency(value, options?)`

מעצב ערך כמטבע מקומי. ברירת המחדל היא `USD`.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - נפוצים: `currency`, `currencyDisplay` (`"symbol" | "code" | "name"`)

```ts
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

#### `date(date, optionsOrPreset?)`

מעצב ערך תאריך/שעה.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` או תבנית מוגדרת מראש (preset): `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

```ts
date(new Date(), "short"); // למשל "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

#### `relativeTime(from, to?, options?)`

מעצב זמן יחסי בין שני מועדים.

- **from**: `Date | string | number`
- **to**: `Date | string | number` (ברירת מחדל: `new Date()`)
- **options**: `{ locale?, unit?, numeric?, style? }`

```ts
const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "בעוד 3 ימים"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "לפני שעתיים"
```

#### `units(value, options?)`

מעצב ערך מספרי עם יחידת מידה.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - נפוצים: `unit` (למשל `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)

```ts
units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B"
```

#### `compact(value, options?)`

מעצב מספר בסימון קומפקטי.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

```ts
compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

#### `list(values, options?)`

מעצב מערך למחרוזת רשימה מקומית.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - נפוצים: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)

```ts
list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
```

## Intl שמור במטמון (Cached Intl)

האובייקט `Intl` המיוצא מ-`intlayer` הוא מעטפת שמורה במטמון (cached wrapper) סביב `Intl` הגלובלי. הוא שומר ב-memoization מופעי מעצבים (`NumberFormat`, `DateTimeFormat` וכו') כדי למנוע את יצירתם מחדש שוב ושוב, ובכך משפר ביצועים.

```ts
import { Intl } from "intlayer";

// עיצוב מספרים ומטבע
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// שמות תצוגה עבור שפות, אזורים וכו'
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// Collation לצורך מיון מחרוזות
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (שווה)

// חוקי רבים (Plural rules)
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

### תכונות Intl נוספות

#### `Intl.DisplayNames`

עבור שמות מקומיים של שפות, אזורים, מטבעות ומערכות כתב:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

#### `Intl.Collator`

להשוואת מחרוזות ומיון מודע-שפה:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

#### `Intl.PluralRules`

לקביעת צורות רבים בשפות שונות:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## כלי עזר לשפות (Locale Utilities)

### `getLocaleName(displayLocale, targetLocale?)`

מחזיר את שמה המקומי של שפה:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

### `getLocaleLang(locale?)`

מחלץ את קוד השפה מתוך מחרוזת שפה מלאה:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
```

### `getLocaleFromPath(inputUrl)`

מחלץ את מקטע השפה מתוך URL או pathname:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (שפת ברירת מחדל)
```

### `getPathWithoutLocale(inputUrl, locales?)`

מסיר את מקטע השפה מתוך URL:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
```

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

מייצר כתובת URL מותאמת לשפה:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
```

### `getHTMLTextDir(locale?)`

מחזיר את כיוון הטקסט (LTR / RTL) עבור שפה:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

## כלי עזר לטיפול בתוכן

### `getContent(node, nodeProps, locale?)`

ממיר צומת תוכן עם כל התוספים הזמינים:

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

### `getTranslation(languageContent, locale?, fallback?)`

מחלץ תוכן עבור שפה ספציפית:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  { en: "Hello", fr: "Bonjour", de: "Hallo" },
  "fr",
  true
); // "Bonjour"
```

### `getIntlayer(dictionaryKey, locale?, plugins?)`

שולף וממיר תוכן מתוך מילון:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
```

## הערות

- כל פונקציות העזר מקבלות גם קלטי מחרוזת (`string`); הם מומרים פנימית למספרים או תאריכים.
- השפה מוגדרת כברירת מחדל לפי `internationalization.defaultLocale` אם לא סופקה במפורש.
- כלי שירות אלו הם מעטפות קלות (thin wrappers); לצורכי עיצוב מתקדמים, העבירו את אפשרויות ה-`Intl` הסטנדרטיות.
