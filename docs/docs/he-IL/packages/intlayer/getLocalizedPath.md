---
createdAt: 2026-01-22
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getLocalizedPath | intlayer"
description: "השתמש ב-getLocalizedPath כדי להמיר נתיב פנימי לצורתו המתורגמת, תוך החלת כללי השכתוב המותאמים אישית שלך וקידומת השפה."
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-08-19
    changes: "החלת קידומת השפה ודיוק טיפוס הערך המוחזר (narrowing) מתוך כללי השכתוב שהוצהרו"
  - version: 8.0.0
    date: 2026-01-22
    changes: "מימוש שכתוב כתובות URL מותאמות אישית"
author: aymericzip
---

# תיעוד: הפונקציה `getLocalizedPath` ב-`intlayer`

## תיאור

הפונקציה `getLocalizedPath` מתרגמת נתיב קנוני (נתיב אפליקציה פנימי): היא מפענחת את כללי השכתוב המותאמים אישית, ולאחר מכן מחילה את קידומת השפה של מצב הניתוב שלך. היא שימושית במיוחד ליצירת כתובות URL ידידותיות ל-SEO המשתנות בהתאם לשפה.

היא המקבילה היחסית של [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md), ועבור קלט יחסי שתיהן מחזירות את אותו הערך. בשונה מ-`getLocalizedUrl`, היא לעולם אינה מחזירה כתובת URL מוחלטת: תצורת ה-`domains` אינה נלקחת בחשבון, כך ששפה המוגשת מדומיין משלה עדיין תניב נתיב בלבד. קלט מוחלט מתקבל, אך ה-origin שלו מושמט, ורק הנתיב, מחרוזת השאילתה וה-hash נשמרים.

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md)

**תכונות עיקריות:**

- תומכת בפרמטרי ניתוב דינמיים באמצעות תחביר `[param]`.
- מפענחת נתיבים על פי כללי שכתוב מותאמים אישית המוגדרים בתצורה שלך.
- מחילה את קידומת השפה של מצב הניתוב המוגדר (`prefix-no-default`, `prefix-all`, …).
- מטפלת אוטומטית בחזרה לנתיב הקנוני אם לא נמצא כלל שכתוב עבור השפה שצוינה.
- מדייקת את טיפוס הערך המוחזר (type narrowing): נתיב מילולי (literal) מתפענח למחרוזת מילולית מקומית בזמן הידור.

## חתימת הפונקציה

```typescript
getLocalizedPath(
  canonicalPath: string,     // חובה
  locale?: Locales,          // אופציונלי
  options?: {                // אופציונלי
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
    rewrite?: RoutingConfig['rewrite'];
  }
): string
```

## פרמטרים

### פרמטרי חובה

- `canonicalPath: string`
  - **תיאור**: הנתיב הפנימי של האפליקציה (למשל, `/about`, `/product/[id]`).
  - **סוג**: `string`
  - **חובה**: כן

### פרמטרים אופציונליים

- `locale?: Locales`
  - **תיאור**: שפת היעד שעבורה יש לתרגם את הנתיב.
  - **סוג**: `Locales`
  - **ברירת מחדל**: שפת ברירת המחדל מתוך תצורת הפרויקט שלך.

- `options?: object`
  - **תיאור**: עקיפת הגדרות ניתוב (routing overrides). ברירת המחדל של כל ערך נלקחת מתצורת הפרויקט שלך.
  - **סוג**: `object`

  - `options.locales?: Locales[]`: שפות נתמכות. **ברירת מחדל**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales`: שפת ברירת המחדל. **ברירת מחדל**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`: אופן הופעת השפה בנתיב. **ברירת מחדל**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']`: כללי שכתוב מותאמים אישית. **ברירת מחדל**: `configuration.routing.rewrite`

## ערך מוחזר

- **סוג**: `string`
- **תיאור**: הנתיב המתורגם עבור השפה שצוינה.

הטיפוס מדויק (narrowed) מתוך כללי השכתוב שהוצהרו בתצורה שלך, כך שהעורך מציג את הנתיב המפוענח במקום טיפוס `string` כללי:

```typescript codeFormat="typescript"
// תצורה: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (אף כלל שכתוב אינו תואם, מוחלת קידומת בלבד)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

אותו דיוק טיפוסים זורם גם ל-[`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md), אשר מחילה את כללי השכתוב לפני הוספת קידומת השפה.

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md)

שני מקרים נשארים מורחבים ל-`string`, מכיוון שלא ניתן לפענח אותם בזמן הידור:

- נתיב שאינו מחרוזת מילולית (למשל נתיב שנבנה מתוך משתנה);
- נתיב המותאם לפי כלל המשתמש בפרמטר רב-מקטעים או אופציונלי (`[...slug]`, `[[...slug]]`, `:param?`).

## דוגמאות שימוש

### שימוש בסיסי (עם תצורה)

אם הגדרת כללי שכתוב מותאמים אישית בקובץ `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// תצורה: mode 'prefix-no-default', defaultLocale 'en',
//                { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// פלט: "/fr/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// פלט: "/about" (שפת ברירת מחדל, ללא קידומת)
```

### שימוש עם נתיבים דינמיים

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// תצורה: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// פלט: "/fr/produit/123"
```

### כללי שכתוב ידניים

באפשרותך גם להעביר כללי שכתוב ידניים לפונקציה:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, { rewrite: manualRules });
// פלט: "/fr/contactez-nous"
```

### השמטת השפה

כאשר לא סופקה שפה, הנתיב מתורגם עבור שפת ברירת המחדל שהוגדרה:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// תצורה: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// פלט: "/about"
```

## פונקציות קשורות

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getCanonicalPath.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getPathWithoutLocale.md)
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md)
