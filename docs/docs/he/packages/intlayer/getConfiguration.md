---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getConfiguration | intlayer"
description: "השתמש ב-getConfiguration כדי לקרוא את תצורת Intlayer המפוענחת שלך, כולל שפות וניתוב, בצד הלקוח או בצד השרת."
keywords:
  - getConfiguration
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
  - getConfiguration
history:
  - version: 9.5.9
    date: 2026-09-25
    changes: "הוצאת getConfiguration משימוש לטובת ייבוא ישיר מ-intlayer"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getConfiguration` ב-`intlayer` (הוצאה משימוש)

> [!WARNING]
> **הוצא משימוש (Deprecated)**: הפונקציה `getConfiguration` הוצאה משימוש. הדרך המומלצת החדשה היא לייבא את `{ availableLocale, defaultLocales, internationalization, routing, ... }` (כגון `defaultLocale`, `locales`, `requiredLocales`, או `editor`) ישירות מתוך `'intlayer'`:
>
> ```typescript
> import { defaultLocale, locales, requiredLocales, editor } from "intlayer";
> ```

## תיאור

הפונקציה `getConfiguration` מאחזרת את התצורה המלאה עבור אפליקציית `intlayer` על ידי חילוץ משתני סביבה. פונקציה זו מספקת את הגמישות להשתמש באותה תצורה הן בצד הלקוח והן בצד השרת, ומבטיחה עקביות בכל חלקי האפליקציה.

## פרמטרים

הפונקציה אינה מקבלת פרמטרים. במקום זאת, היא משתמשת במשתני סביבה עבור התצורה.

### ערך מוחזר

- **סוג**: `IntlayerConfig`
- **תיאור**: אובייקט המכיל את התצורה המלאה עבור `intlayer`. התצורה כוללת את החלקים הבאים:
  - `internationalization`: הגדרות הקשורות לשפות ולמצב קפדני (strict mode).
  - `middleware`: הגדרות הקשורות לניהול כתובות URL ועוגיות (cookies).
  - `content`: הגדרות הקשורות לקובצי תוכן, תיקיות ותבניות (patterns).
  - `editor`: תצורות ייעודיות לעורך (editor).

לפרטים נוספים, עיין ב-[תיעוד תצורת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תיעוד תצורת Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

## דוגמאות שימוש

### אחזור התצורה המלאה

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// פלט:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### חילוץ `availableLocales` ו-`defaultLocale`

> [!TIP]
> **דרך מומלצת**: במקום לחלץ שפות מתוך `getConfiguration()`, ייבא אותן ישירות מתוך `'intlayer'`:
>
> ```typescript
> import { defaultLocale, locales } from "intlayer";
> ```

החלק `internationalization` בתצורה מספק הגדרות הקשורות לשפה כגון `locales` (שפות זמינות) ו-`defaultLocale` (שפת ברירת המחדל).

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // דוגמה לפלט: ["en", "fr", "es"]
console.log(defaultLocale); // דוגמה לפלט: "en"
console.log(cookieName); // פלט: "INTLAYER_LOCALE"
```

## הערות

- ודא שכל משתני הסביבה הנדרשים מוגדרים כהלכה לפני הקריאה לפונקציה זו. משתנים חסרים יגרמו לשגיאות במהלך האתחול.
- ניתן להשתמש בפונקציה זו הן בצד הלקוח והן בצד השרת, מה שהופך אותה לכלי רב-תכליתי לניהול תצורות באופן אחיד.

## שימוש באפליקציות

הפונקציה `getConfiguration` היא כלי יסוד לאתחול וניהול התצורה של אפליקציית `intlayer`. על ידי מתן גישה להגדרות כמו שפות, middleware ותיקיות תוכן, היא מבטיחה עקביות ויכולת הרחבה (scalability) בכל אפליקציה רב-לשונית מונעת-תוכן.
