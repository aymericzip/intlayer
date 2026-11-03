---
createdAt: 2025-11-16
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getPrefix | intlayer"
description: "השתמש ב-getPrefix כדי לקבל את קידומת ה-URL של שפה בהתאם למצב הניתוב שלך, בשני פורמטים המוכנים לקישורים ולנתיבים."
keywords:
  - getPrefix
  - קידומת
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד: הפונקציה `getPrefix` ב-`intlayer`

## תיאור

הפונקציה `getPrefix` קובעת את קידומת ה-URL עבור שפה נתונה בהתבסס על תצורת מצב הניתוב. היא משווה את השפה עם שפת ברירת המחדל ומחזירה אובייקט המכיל פורמטים שונים של קידומת לבנייה גמישה של כתובות URL.

**תכונות עיקריות:**

- מקבלת שפה כפרמטר ראשון (חובה)
- אובייקט `options` אופציונלי עם `defaultLocale` ו-`mode`
- מחזירה אובייקט עם המאפיינים `prefix` ו-`localePrefix`
- תומכת בכל מצבי הניתוב: `prefix-no-default`, `prefix-all`, `no-prefix` ו-`search-params`
- כלי עזר קל משקל לקביעת המועד שבו יש להוסיף קידומות שפה

## חתימת הפונקציה

```typescript
getPrefix(
  locale: Locales,               // חובה
  options?: {                    // אופציונלי
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // למשל, 'fr/' או ''
  localePrefix?: Locale; // למשל, 'fr' או undefined
}
```

## פרמטרים

- `locale: Locales`
  - **תיאור**: השפה שעבורה יש לייצר את הקידומת. אם הערך הוא falsy (undefined, null, מחרוזת ריקה), הפונקציה מחזירה מחרוזת ריקה.
  - **סוג**: `Locales`
  - **חובה**: כן

- `options?: object`
  - **תיאור**: אובייקט תצורה לקביעת הקידומת.
  - **סוג**: `object`
  - **חובה**: לא (אופציונלי)

  - `options.defaultLocale?: Locales`
    - **תיאור**: שפת ברירת המחדל של האפליקציה. אם אינה מסופקת, נעשה שימוש בשפת ברירת המחדל המוגדרת מתוך תצורת הפרויקט שלך.
    - **סוג**: `Locales`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **תיאור**: מצב ניתוב כתובות ה-URL לטיפול בשפות. אם אינו מסופק, נעשה שימוש במצב המוגדר מתוך תצורת הפרויקט שלך.
    - **סוג**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#middleware)
    - **מצבים**:
      - `prefix-no-default`: מחזירה מחרוזות ריקות כאשר השפה תואמת לשפת ברירת המחדל
      - `prefix-all`: מחזירה קידומת לכל השפות כולל ברירת המחדל
      - `no-prefix`: מחזירה מחרוזות ריקות (ללא קידומת בכתובות URL)
      - `search-params`: מחזירה מחרוזות ריקות (השפה נמצאת בפרמטרי שאילתה)

### ערך מוחזר

- **סוג**: `GetPrefixResult`
- **תיאור**: אובייקט המכיל פורמטים שונים של קידומת:
  - `prefix`: קידומת הנתיב עם לוכסן מסיים (למשל, `'fr/'`, `''`)
  - `localePrefix`: מזהה השפה ללא לוכסנים (למשל, `'fr'`, `undefined`)

## דוגמאות שימוש

### שימוש בסיסי

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getPrefix, Locales } from "intlayer";

// בדיקת קידומת עבור שפה אנגלית
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// מחזירה: { prefix: 'en/', localePrefix: 'en' }

// בדיקת קידומת עבור שפה צרפתית
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// מחזירה: { prefix: 'fr/', localePrefix: 'fr' }
```

### מצבי ניתוב שונים

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: תמיד מחזירה קידומת
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// מחזירה: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: אין קידומת כאשר השפה תואמת לברירת המחדל
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// מחזירה: { prefix: '', localePrefix: undefined }

// prefix-no-default: מחזירה קידומת כאשר השפה שונה מברירת המחדל
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// מחזירה: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix ו-search-params: לעולם אינה מחזירה קידומת
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// מחזירה: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// מחזירה: { prefix: '', localePrefix: undefined }
```

### דוגמה מעשית

```typescript
import { getPrefix, Locales } from "intlayer";

// בניית כתובות URL עם הקידומת המתאימה עבור שפה ספציפית
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// שימוש ב-prefix לבניית נתיב
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// תוצאה: "/fr/about"

// שימוש ב-localePrefix לזיהוי השפה
console.log(`Current locale: ${localePrefix}`);
// פלט: "Current locale: fr"
```

## פונקציות קשורות

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getMultilingualUrls.md)

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // קידומת הנתיב עם לוכסן מסיים (למשל, 'fr/' או '')
  localePrefix?: Locale; // מזהה השפה ללא לוכסנים (למשל, 'fr' או undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
