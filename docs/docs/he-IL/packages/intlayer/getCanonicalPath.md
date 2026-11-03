---
createdAt: 2026-01-22
updatedAt: 2026-11-03
priority: 5
title: תיעוד הפונקציה getCanonicalPath | intlayer
description: "השתמש ב-getCanonicalPath כדי למפות נתיב URL מתורגם כמו /a-propos בחזרה לנתיב הפנימי שלו כמו /about לצורך ניתוב."
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "מימוש שכתוב כתובות URL מותאמות אישית (custom URL rewrites)"
author: aymericzip
---

# תיעוד: הפונקציה `getCanonicalPath` ב-`intlayer`

## תיאור

הפונקציה `getCanonicalPath` מפענחת נתיב URL מתורגם (למשל, `/a-propos`) בחזרה לנתיב הקנוני הפנימי של האפליקציה (למשל, `/about`). פונקציה זו חיונית עבור נתבים (routers) על מנת להתאים לנתיב הפנימי הנכון ללא תלות בשפת ה-URL.

**תכונות עיקריות:**

- תומכת בפרמטרי ניתוב דינמיים באמצעות תחביר `[param]`.
- מתאימה נתיבים מתורגמים לכללי שכתוב מותאמים אישית המוגדרים בתצורה שלך.
- מחזירה את הנתיב המקורי אם לא נמצא כלל שכתוב תואם.

## חתימת הפונקציה

```typescript
getCanonicalPath(
  localizedPath: string,         // חובה
  locale: Locales,               // חובה
  rewriteRules?: RoutingConfig['rewrite'] // אופציונלי
): string
```

## פרמטרים

### פרמטרי חובה

- `localizedPath: string`
  - **תיאור**: הנתיב המתורגם כפי שמופיע בדפדפן (למשל, `/a-propos`).
  - **סוג**: `string`
  - **חובה**: כן

- `locale: Locales`
  - **תיאור**: השפה המשמשת עבור הנתיב המפוענח.
  - **סוג**: `Locales`
  - **חובה**: כן

### פרמטרים אופציונליים

- `rewriteRules?: RoutingConfig['rewrite']`
  - **תיאור**: אובייקט המגדיר כללי שכתוב מותאמים אישית. אם אינו מסופק, ברירת המחדל היא המאפיין `routing.rewrite` מתוך תצורת הפרויקט שלך.
  - **סוג**: `RoutingConfig['rewrite']`
  - **ברירת מחדל**: `configuration.routing.rewrite`

## ערך מוחזר

- **סוג**: `string`
- **תיאור**: הנתיב הקנוני הפנימי.

## דוגמאות שימוש

### שימוש בסיסי (עם תצורה)

אם הגדרת כללי שכתוב מותאמים אישית בקובץ `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// תצורה: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// פלט: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// פלט: "/about"
```

### שימוש עם נתיבים דינמיים

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// תצורה: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// פלט: "/product/123"
```

### כללי שכתוב ידניים

באפשרותך גם להעביר כללי שכתוב ידניים לפונקציה:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// פלט: "/contact"
```

## פונקציות קשורות

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedPath.md)
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)
