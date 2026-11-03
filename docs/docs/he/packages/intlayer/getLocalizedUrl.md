---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getLocalizedUrl | intlayer"
description: "השתמש ב-getLocalizedUrl כדי להוסיף קידומת שפה לכתובת URL יחסית או מוחלטת, בהתאם למצב הניתוב ולהגדרות שפת ברירת המחדל שלך."
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: "שכתוב לשימוש בפרמטר options עם mode במקום prefixDefault"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getLocalizedUrl` ב-`intlayer`

## תיאור

הפונקציה `getLocalizedUrl` מייצרת כתובת URL מותאמת שפה על ידי הוספת קידומת השפה שצוינה לכתובת ה-URL הנתונה. היא מטפלת בכתובות URL מוחלטות ויחסיות כאחד, ומבטיחה שקידומת השפה הנכונה תוחל על פי התצורה.

**תכונות עיקריות:**

- נדרשים 2 פרמטרים בלבד: `url` ו-`currentLocale`
- אובייקט `options` אופציונלי עם `locales`, `defaultLocale` ו-`mode`
- משתמשת בתצורת הבינאום של הפרויקט שלך כערכי ברירת מחדל
- ניתנת לשימוש עם מינימום פרמטרים למקרים פשוטים או בהתאמה אישית מלאה לתרחישים מורכבים
- תומכת במספר מצבי ניתוב: `prefix-no-default`, `prefix-all`, `no-prefix` ו-`search-params`

## חתימת הפונקציה

```typescript
getLocalizedUrl(
  url: string,                   // חובה
  currentLocale: Locales,        // חובה
  options?: {                    // אופציונלי
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

## פרמטרים

### פרמטרי חובה

- `url: string`
  - **תיאור**: מחרוזת ה-URL המקורית שעבורה יש להוסיף קידומת שפה.
  - **סוג**: `string`
  - **חובה**: כן

- `currentLocale: Locales`
  - **תיאור**: השפה הנוכחית שעבורה מותאמת כתובת ה-URL.
  - **סוג**: `Locales`
  - **חובה**: כן

### פרמטרים אופציונליים

- `options?: object`
  - **תיאור**: אובייקט תצורה עבור התנהגות התאמת ה-URL לשפה.
  - **סוג**: `object`
  - **חובה**: לא (אופציונלי)

  - `options.locales?: Locales[]`
    - **תיאור**: מערך של שפות נתמכות. אם אינו מסופק, נעשה שימוש בשפות המוגדרות מתוך תצורת הפרויקט שלך.
    - **סוג**: `Locales[]`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **תיאור**: שפת ברירת המחדל של האפליקציה. אם אינה מסופקת, נעשה שימוש בשפת ברירת המחדל המוגדרת מתוך תצורת הפרויקט שלך.
    - **סוג**: `Locales`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **תיאור**: מצב ניתוב כתובות ה-URL עבור טיפול בשפות. אם אינו מסופק, נעשה שימוש במצב המוגדר מתוך תצורת הפרויקט שלך.
    - **סוג**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **ברירת מחדל**: [`תצורת הפרויקט`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md#middleware)
    - **מצבים**:
      - `prefix-no-default`: אין קידומת עבור שפת ברירת המחדל, קידומת עבור כל השאר
      - `prefix-all`: קידומת עבור כל השפות, כולל ברירת המחדל
      - `no-prefix`: ללא קידומת שפה בכתובת ה-URL
      - `search-params`: שימוש בפרמטרי שאילתה עבור השפה (למשל `?locale=fr`)

### ערך מוחזר

- **סוג**: `string`
- **תיאור**: כתובת ה-URL המותאמת עבור השפה שצוינה.

## דוגמאות שימוש

### שימוש בסיסי (פרמטרי חובה בלבד)

כאשר הגדרת את הפרויקט שלך עם הגדרות בינאום, תוכל להשתמש בפונקציה עם פרמטרי החובה בלבד:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// משתמש בתצורת הפרויקט עבור locales, defaultLocale ו-mode
getLocalizedUrl("/about", Locales.FRENCH);
// פלט: "/fr/about" (בהנחה שצרפתית נתמכת והמצב הוא 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// פלט: "/about" או "/en/about" (בהתאם להגדרת המצב שלך)
```

### שימוש מתקדם (עם פרמטרים אופציונליים)

באפשרותך לעקוף את תצורת ברירת המחדל על ידי העברת פרמטר ה-`options` האופציונלי:

### כתובות URL יחסיות (כל האפשרויות צוינו)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// ציון מפורש של כל הפרמטרים האופציונליים
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט: "/fr/about" עבור השפה הצרפתית

getLocalizedUrl("/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט: "/about" עבור שפת ברירת המחדל (אנגלית)
```

### עקיפת תצורה חלקית

באפשרותך גם לספק רק חלק מהפרמטרים האופציונליים. הפונקציה תשתמש בתצורת הפרויקט עבור כל פרמטר שלא ציינת:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// עקיפת השפות בלבד, שימוש בתצורת הפרויקט עבור defaultLocale ו-mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// עקיפת המצב בלבד, שימוש בתצורת הפרויקט עבור locales ו-defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // אילוץ קידומת עבור כל השפות כולל ברירת המחדל
});

// עקיפת מספר אפשרויות
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // שימוש בפרמטרי שאילתה: /about?locale=fr
});
```

### כתובות URL מוחלטות

```typescript
getLocalizedUrl("https://example.com/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט: "https://example.com/fr/about" עבור צרפתית

getLocalizedUrl("https://example.com/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט: "https://example.com/about" עבור אנגלית (ללא קידומת לברירת מחדל)

getLocalizedUrl("https://example.com/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// פלט: "https://example.com/en/about" עבור אנגלית (קידומת לכולן)

getLocalizedUrl("https://example.com/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// פלט: "https://example.com/about?locale=fr" (שימוש בפרמטרי שאילתה)
```

### שפה שאינה נתמכת

```typescript
getLocalizedUrl("/about", Locales.ITALIAN, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// פלט: "/about" (לא מוחלת קידומת עבור שפה שאינה נתמכת)
```

## מקרי קצה

- **אין מקטע שפה:**
  - אם כתובת ה-URL אינה מכילה מקטע שפה כלשהו, הפונקציה מוסיפה בבטחה את קידומת השפה המתאימה על סמך מצב הניתוב.

- **שפת ברירת מחדל:**
  - כאשר `mode` הוא `'prefix-no-default'`, הפונקציה אינה מוסיפה קידומת ל-URL עבור שפת ברירת המחדל.
  - כאשר `mode` הוא `'prefix-all'`, הפונקציה מוסיפה קידומת לכל השפות כולל שפת ברירת המחדל.

- **שפות שאינן נתמכות:**
  - עבור שפות שאינן מופיעות ברשימת ה-`locales`, הפונקציה אינה מחילה קידומת כלל.

- **מצבי ניתוב:**
  - `'prefix-no-default'`: לשפת ברירת המחדל אין קידומת, לאחרות יש (למשל, `/about`, `/fr/about`)
  - `'prefix-all'`: לכל השפות יש קידומת (למשל, `/en/about`, `/fr/about`)
  - `'no-prefix'`: ללא קידומות שפה בכתובות URL (השפה מטופלת במקום אחר)
  - `'search-params'`: השפה מצוינת באמצעות פרמטר שאילתה (למשל, `/about?locale=fr`)

## שימוש באפליקציות

באפליקציה רב-לשונית, הגדרת הגדרות הבינאום עם `locales` ו-`defaultLocale` קריטית כדי להבטיח שהשפה הנכונה תוצג. להלן דוגמה לאופן שבו ניתן להשתמש ב-`getLocalizedUrl` בהגדרת אפליקציה:

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

באמצעות תצורה זו, הפונקציה `getLocalizedUrl` יכולה לייצר באופן דינמי כתובות URL מותאמות שפה בהתבסס על העדפת השפה של המשתמש:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // פלט: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // פלט: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // פלט: "/about"
```

על ידי שילוב `getLocalizedUrl`, מפתחים יכולים לשמור על מבני URL עקביים במגוון שפות, ולשפר הן את חוויית המשתמש והן את ה-SEO.
