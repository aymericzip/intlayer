---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useLocale | next-intlayer
description: "השתמש ב-useLocale ב-Next.js כדי לקרוא את השפה הנוכחית ולהחליף שפות, תוך עדכון אוטומטי של הנתיב המתורגם."
keywords:
  - useLocale
  - מילון
  - מפתח
  - Intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: "ברירת מחדל של `onLocaleChange` נקבעה ל-`replace`"
  - version: 6.2.0
    date: 2025-10-09
    changes: "הוספת תיעוד להוק `useLocale` עם אפשרות `onLocaleChange`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "התחלת היסטוריה"
author: aymericzip
---

# שילוב ב-Next.js: תיעוד ההוק `useLocale` עבור `next-intlayer`

סעיף זה מציע תיעוד מפורט על ההוק `useLocale` המותאם ליישומי Next.js מתוך ספריית `next-intlayer`. הוא מיועד לטפל בשינויי שפה ובניתוב בצורה יעילה.

## ייבוא `useLocale` ב-Next.js

כדי להשתמש בהוק `useLocale` ביישום ה-Next.js שלך, ייבא אותו כפי שמוצג להלן:

```javascript
import { useLocale } from "next-intlayer"; // משמש לניהול שפות וניתוב ב-Next.js
```

## שימוש

להלן כיצד ליישם את ההוק `useLocale` בתוך רכיב Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## פרמטרים

ההוק `useLocale` מקבל את הפרמטרים הבאים:

- **`onLocaleChange`**: מחרוזת הקובעת כיצד יש לעדכן את ה-URL בעת שינוי השפה. היא יכולה להיות `"replace"`, `"push"` או `"none"`.

  > ניקח דוגמה:
  >
  > 1. אתה נמצא ב-`/fr/home`
  > 2. אתה מנווט ל-`/fr/about`
  > 3. אתה משנה את השפה ל-`/es/about`
  > 4. אתה לוחץ על כפתור ה-"חזור" (back) בדפדפן
  >
  > ההתנהגות תשתנה בהתאם לערך של `onLocaleChange`:
  >
  > - `"replace"` (ברירת מחדל): מחליף את ה-URL הנוכחי ב-URL המתורגם החדש, ומגדיר את העוגייה (cookie).
  >   -> כפתור ה-"חזור" יחזור ל-`/es/home`
  > - `"push"`: מוסיף את ה-URL המתורגם החדש להיסטוריית הדפדפן, ומגדיר את העוגייה.
  >   -> כפתור ה-"חזור" יחזור ל-`/fr/about`
  > - `"none"`: מעדכן רק את השפה בקונטקסט הלקוח, ומגדיר את העוגייה, מבלי לשנות את ה-URL.
  >   -> כפתור ה-"חזור" יחזור ל-`/fr/home`
  > - `(locale) => void`: מגדיר את העוגייה ומפעיל פונקציה מותאמת אישית שתתבצע בעת שינוי השפה.
  >
  >   אפשרות `undefined` היא התנהגות ברירת המחדל, מכיוון שאנו ממליצים להשתמש ברכיב ה-`Link` כדי לנווט לשפה החדשה.
  >   דוגמה:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     About
  >   </Link>
  >   ```

## ערכים מוחזרים

בעת הפעלת ההוק `useLocale`, הוא מחזיר אובייקט המכיל את המאפיינים הבאים:

- **`locale`**: השפה הנוכחית כפי שנקבעה בקונטקסט של React.
- **`defaultLocale`**: השפה הראשית שהוגדרה בקונפיגורציה.
- **`availableLocales`**: רשימה של כל השפות הזמינות כפי שהוגדרו בקונפיגורציה.
- **`setLocale`**: פונקציה לשינוי שפת היישום ועדכון ה-URL בהתאם. היא מטפלת בכללי הקידומת (prefix), האם להוסיף את השפה לנתיב או לא על סמך התצורה. משתמשת ב-`useRouter` מ-`next/navigation` עבור פונקציות ניווט כגון `push` ו-`refresh`.
- **`pathWithoutLocale`**: מאפיין מחושב המחזיר את הנתיב ללא השפה. שימושי להשוואת כתובות URL. לדוגמה, אם השפה הנוכחית היא `fr`, וה-URL הוא `fr/my_path`, הנתיב ללא שפה הוא `/my_path`. משתמש ב-`usePathname` מ-`next/navigation` לקבלת הנתיב הנוכחי.

## סיכום

ההוק `useLocale` מ-`next-intlayer` הוא כלי מכריע לניהול שפות ביישומי Next.js. הוא מציע גישה משולבת להתאמת היישום שלך למספר שפות על ידי טיפול חלק באחסון שפה, ניהול מצב ושינויי כתובות URL.
