---
createdAt: 2026-06-22
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק usePathname | react-intlayer
description: למד כיצד להשתמש בהוק usePathname מתוך חבילת react-intlayer כדי לקבל את נתיב ה-URL הנוכחי ללא מקטע השפה (locale).
keywords:
  - usePathname
  - pathname
  - נתיב
  - react
  - intlayer
  - ניתוב
  - בינאום
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת כלי העזר usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "אתחול היסטוריה"
author: aymericzip
---

# שילוב ב-React: תיעוד ההוק `usePathname`

ההוק `usePathname` מתוך `react-intlayer` מחזיר את נתיב הדפדפן הנוכחי לאחר הסרת מקטע השפה. הוא מסתמך על `window.location.pathname` המקורי ומגיב לאירועי ניווט בדפדפן באמצעות `popstate`.

## ייבוא `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## סקירה כללית

בשונה מהוקי ניתוב ספציפיים לפריימוורקים (כמו אלה ב-`next-intlayer` או ב-`react-router`), הוק זה הוא פתרון קל משקל ובלתי תלוי בפריימוורק עבור יישומי React טהורים. הוא מחלץ את ה-URL הנוכחי ומסיר כל קידומת שפה תואמת (לדוגמה, `/en/about` הופך ל-`/about`).

## שימוש

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Home
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        About
      </a>
    </nav>
  );
};

export default Navigation;
```

## ערך מוחזר

| טיפוס    | תיאור                                                                                 |
| -------- | ------------------------------------------------------------------------------------- |
| `string` | נתיב הדפדפן הנוכחי עם הסרת קידומת השפה (לדוגמה, `/fr/dashboard` הופך ל-`/dashboard`). |

## התנהגות

- **הסרת שפה (Locale Stripping)**: משתמש בכלי העזר `getPathWithoutLocale` מאחורי הקלעים כדי לזהות ולהסיר אוטומטית את השפה מהנתיב בהתבסס על תצורת ה-Intlayer של היישום.
- **תגובתיות (Reactivity)**: מאזין לאירוע `popstate`. כאשר המשתמש מנווט באמצעות כפתורי הקדימה/אחורה של הדפדפן או כאשר מופעלים `pushState`/`replaceState`, ההוק מעדכן את הנתיב המוחזר.
- **נסיגה ברינדור צד-שרת (SSR Fallback)**: בשרת (שבו `window` אינו מוגדר), ברירת המחדל היא החזרת `/` מאחר שאין לו גישה לכתובת ה-URL של הבקשה בקונטקסט React טהור.

## תיעוד קשור

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getPathWithoutLocale.md)
