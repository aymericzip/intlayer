---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה comparePaths | intlayer"
description: "השתמש ב-comparePaths כדי לבדוק אם שני נתיבי URL מצביעים על אותו הדף, תוך התעלמות ממקטע השפה (locale), המארח (host), מחרוזת השאילתה (query string), ה-hash והלוכסן המסיים (trailing slash)."
keywords:
  - comparePaths
  - normalizePath
  - קישור פעיל
  - ניווט
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד: הפונקציה `comparePaths` ב-`intlayer`

## תיאור

הפונקציה `comparePaths` משווה שני נתיבי URL או שמות נתיבים (pathnames) לצורך שוויון תוך התעלמות ממקטע השפה (locale segment), הפרוטוקול/מארח (host), מחרוזת השאילתה (query string), ה-hash ולוכסנים מסיימים (trailing slashes). זוהי הדרך המומלצת לקבוע אם קישור ניווט מצביע על הדף הנוכחי, למשל כדי להדגיש את הקישור הפעיל, מבלי שתצטרך לכתוב לוגיקת נרמול משלך (הנוטה לשגיאות).

באופן פנימי היא עושה שימוש חוזר ב-[`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getPathWithoutLocale.md) כדי להסיר את מקטע השפה, כך שהיא מכבדת את מצב הניתוב (routing mode) ואת השפות שהוגדרו בפרויקט שלך.

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getPathWithoutLocale.md)

החבילה מייצאת גם את פונקציית העזר הבסיסית [`normalizePath`](#normalizepath), אשר מחזירה את שם הנתיב הקנוני והבלתי תלוי בשפה המשמש להשוואה.

**תכונות עיקריות:**

- השוואה בלתי תלויה בשפה (`/fr/about` תואם ל-`/about`)
- פועל הן עם כתובות URL מוחלטות והן עם שמות נתיבים יחסיים
- מתעלם ממחרוזת שאילתה, hash ולוכסנים מסיימים
- סובלני כלפי לוכסנים מובילים חסרים וערכים ריקים (מנורמל ל-`/`)
- קל משקל, בנוי על גבי `getPathWithoutLocale`

## חתימת הפונקציה

```typescript
comparePaths(
  pathname: string,  // חובה
  href: string,      // חובה
  locales?: Locales[] // אופציונלי
): boolean

normalizePath(
  inputUrl: string,   // חובה
  locales?: Locales[] // אופציונלי
): string
```

## פרמטרים

- `pathname: string`
  - **תיאור**: מחרוזת ה-URL הראשונה או שם הנתיב להשוואה (בדרך כלל שם הנתיב הנוכחי).
  - **סוג**: `string`
  - **חובה**: כן

- `href: string`
  - **תיאור**: מחרוזת ה-URL השנייה או שם הנתיב להשוואה (בדרך כלל ה-`href` של קישור ניווט).
  - **סוג**: `string`
  - **חובה**: כן

- `locales: Locales[]`
  - **תיאור**: מערך אופציונלי של שפות נתמכות. ברירת המחדל היא השפות המוגדרות בפרויקט.
  - **סוג**: `Locales[]`
  - **חובה**: לא (אופציונלי)

### ערך מוחזר

- **סוג**: `boolean`
- **תיאור**: `true` כאשר שני הקלטים מתפענחים לאותו נתיב ללא תלות בשפה, אחרת `false`.

## דוגמאות שימוש

### שימוש בסיסי

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### כתובות URL מוחלטות ויחסיות

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### הדגשת קישור הניווט הפעיל

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

## normalizePath

`normalizePath` מחזירה את שם הנתיב הקנוני ללא תלות בשפה המשמש את `comparePaths`. היא מסירה את מקטע השפה, הפרוטוקול/מארח, מחרוזת השאילתה וה-hash, מבטיחה לוכסן מוביל יחיד, מסירה כל לוכסן מסיים (למעט בנתיב השורש) ומשתמשת ב-`/` כברירת מחדל עבור ערכים ריקים.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

## פונקציות קשורות

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getPathWithoutLocale.md)
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getPrefix.md)
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
