---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getMultilingualUrls | intlayer"
description: "השתמש ב-getMultilingualUrls כדי לייצר את הגרסה המותאמת של כתובת URL עבור כל שפה נתמכת, עבור תגי hreflang ומפות אתר (sitemaps)."
keywords:
  - getMultilingualUrls
  - תרגום
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
  - getMultilingualUrls
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: "שכתוב לשימוש בפרמטר options עם mode במקום prefixDefault"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getMultilingualUrls` ב-`intlayer`

## תיאור

הפונקציה `getMultilingualUrls` מייצרת מיפוי של כתובות URL רב-לשוניות על ידי הוספת קידומת של כל שפה נתמכת לכתובת ה-URL הנתונה. היא מטפלת בכתובות URL מוחלטות ויחסיות כאחד, ומחילה את קידומת השפה המתאימה על סמך התצורה שסופקה או ערכי ברירת המחדל.

**תכונות עיקריות:**

- נדרש פרמטר אחד בלבד: `url`
- אובייקט `options` אופציונלי עם `locales`, `defaultLocale` ו-`mode`
- משתמשת בתצורת הבינאום של הפרויקט שלך כערכי ברירת מחדל
- תומכת במספר מצבי ניתוב: `prefix-no-default`, `prefix-all`, `no-prefix` ו-`search-params`
- מחזירה אובייקט מיפוי שבו כל השפות הן המפתחות וכתובות ה-URL התואמות הן הערכים

## חתימת הפונקציה

```typescript
getMultilingualUrls(
  url: string,                   // חובה
  options?: {                    // אופציונלי
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

## פרמטרים

### פרמטרי חובה

- `url: string`
  - **תיאור**: מחרוזת ה-URL המקורית שעבורה יש להוסיף קידומות שפה.
  - **סוג**: `string`
  - **חובה**: כן

### פרמטרים אופציונליים

- `options?: object`
  - **תיאור**: אובייקט תצורה עבור התנהגות התאמת כתובות ה-URL לשפות.
  - **סוג**: `object`
  - **חובה**: לא (אופציונלי)

  - `options.locales?: Locales[]`
    - **תיאור**: מערך של שפות נתמכות. אם אינו מסופק, נעשה שימוש בשפות המוגדרות מתוך תצורת הפרויקט שלך.
    - **סוג**: `Locales[]`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **תיאור**: שפת ברירת המחדל של האפליקציה. אם אינה מסופקת, נעשה שימוש בשפת ברירת המחדל המוגדרת מתוך תצורת הפרויקט שלך.
    - **סוג**: `Locales`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **תיאור**: מצב ניתוב כתובות ה-URL עבור טיפול בשפות. אם אינו מסופק, נעשה שימוש במצב המוגדר מתוך תצורת הפרויקט שלך.
    - **סוג**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md#middleware)
    - **מצבים**:
      - `prefix-no-default`: אין קידומת עבור שפת ברירת המחדל, קידומת עבור כל השאר
      - `prefix-all`: קידומת עבור כל השפות, כולל ברירת המחדל
      - `no-prefix`: ללא קידומת שפה בכתובת ה-URL
      - `search-params`: שימוש בפרמטרי שאילתה עבור השפה (למשל `?locale=fr`)

### ערך מוחזר

- **סוג**: `StrictModeLocaleMap<string>`
- **תיאור**: אובייקט הממפה כל שפה לכתובת ה-URL הרב-לשונית התואמת שלה.

## דוגמאות שימוש

### שימוש בסיסי (משתמש בתצורת הפרויקט)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// משתמש בתצורת הפרויקט עבור locales, defaultLocale ו-mode
getMultilingualUrls("/dashboard");
// פלט (בהנחה שתצורת הפרויקט כוללת en, fr עם מצב 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### כתובות URL יחסיות עם אפשרויות

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### כתובות URL מוחלטות

```typescript
getMultilingualUrls("https://example.com/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// פלט: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

### מצבי ניתוב שונים

```typescript
// prefix-no-default: אין קידומת לשפת ברירת המחדל
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: קידומת עבור כל השפות
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// פלט: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: ללא קידומת שפה בכתובות ה-URL
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// פלט: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: שפה כפרמטר שאילתה
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// פלט: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

## מקרי קצה

- **אין מקטע שפה:**
  - הפונקציה מסירה כל מקטע שפה קיים מתוך ה-URL לפני יצירת המיפויים הרב-לשוניים.

- **שפת ברירת מחדל:**
  - כאשר `mode` הוא `'prefix-no-default'`, הפונקציה אינה מוסיפה קידומת ל-URL עבור שפת ברירת המחדל.
  - כאשר `mode` הוא `'prefix-all'`, הפונקציה מוסיפה קידומת לכל השפות כולל ברירת המחדל.

- **שפות שאינן נתמכות:**
  - רק השפות שסופקו במערך `locales` נלקחות בחשבון ליצירת כתובות ה-URL.

- **מצבי ניתוב:**
  - `'prefix-no-default'`: לשפת ברירת המחדל אין קידומת, לאחרות יש (למשל, `/dashboard`, `/fr/dashboard`)
  - `'prefix-all'`: לכל השפות יש קידומת (למשל, `/en/dashboard`, `/fr/dashboard`)
  - `'no-prefix'`: ללא קידומות שפה בכתובות URL (כל השפות מחזירות את אותו ה-URL)
  - `'search-params'`: השפה מצוינת באמצעות פרמטר שאילתה (למשל, `/dashboard?locale=fr`)

## שימוש באפליקציות

באפליקציה רב-לשונית, הגדרת הגדרות הבינאום עם `locales` ו-`defaultLocale` חיונית כדי להבטיח שהשפה הנכונה תוצג. להלן דוגמה לאופן שבו ניתן להשתמש ב-`getMultilingualUrls` בהגדרת אפליקציה:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// תצורה עבור שפות נתמכות ושפת ברירת מחדל
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;
```

התצורה לעיל מבטיחה שהאפליקציה תזהה את `ENGLISH`, `FRENCH` ו-`SPANISH` כשפות נתמכות ותשתמש ב-`ENGLISH` כשפת הגיבוי.

באמצעות תצורה זו, הפונקציה `getMultilingualUrls` יכולה לייצר באופן דינמי מיפויי URL רב-לשוניים בהתבסס על השפות הנתמכות באפליקציה:

```typescript
// שימוש בתצורת הפרויקט (אין צורך באפשרויות)
getMultilingualUrls("/dashboard");
// פלט:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// עם אפשרויות מפורשות
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// כתובות URL מוחלטות במצב prefix-all
getMultilingualUrls("https://example.com/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// פלט:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

על ידי שילוב `getMultilingualUrls`, מפתחים יכולים לשמור על מבני URL עקביים במגוון שפות, ולשפר הן את חוויית המשתמש והן את ה-SEO.
