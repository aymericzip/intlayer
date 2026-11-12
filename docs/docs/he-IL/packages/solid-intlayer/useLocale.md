---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useLocale | solid-intlayer
description: "השתמש ב-useLocale ב-Solid כדי לקרוא את השפה הנוכחית, שפת ברירת המחדל והשפות הזמינות, ולהחליף שפה מכל רכיב."
keywords:
  - useLocale
  - שפה
  - locale
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# תיעוד ההוק useLocale

ההוק `useLocale` מאפשר לך לנהל את השפה הנוכחית ביישום ה-Solid שלך. הוא מספק גישה לשפה הנוכחית (כ-accessor), שפת ברירת המחדל, השפות הזמינות ופונקציה לעדכון השפה.

## שימוש

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## תיאור

ההוק מחזיר אובייקט עם המאפיינים הבאים:

1. **locale**: ‏Accessor של Solid ‏(`() => string`) המחזיר את השפה הנוכחית.
2. **defaultLocale**: שפת ברירת המחדל המוגדרת ב-`intlayer.config.ts` שלך.
3. **availableLocales**: מערך של כל השפות הנתמכות ביישום שלך.
4. **setLocale**: פונקציה לעדכון שפת היישום. היא מטפלת גם בשמירה מתמשכת (עוגיות/local storage) אם הופעלה.

## פרמטרים

- **props** (אופציונלי):
  - **onLocaleChange**: פונקציית callback המופעלת בכל פעם שהשפה משתנה.
  - **isCookieEnabled**: האם לשמור את השפה בעוגייה (cookie).
