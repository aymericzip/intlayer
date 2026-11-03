---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getHTMLTextDir | intlayer"
description: "השתמש ב-getHTMLTextDir כדי לקבל את כיוון הטקסט של שפה (ltr, rtl או auto) ולהגדיר את תכונת dir של ה-HTML שלך."
keywords:
  - getHTMLTextDir
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
  - getHTMLTextDir
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getHTMLTextDir` ב-`intlayer`

## תיאור

הפונקציה `getHTMLTextDir` קובעת את כיוון הטקסט (`ltr`, `rtl`, או `auto`) בהתבסס על השפה שסופקה. היא נועדה לעזור למפתחים להגדיר את מאפיין `dir` ב-HTML לצורך רינדור תקין של טקסט.

## פרמטרים

- `locale?: Locales`
  - **תיאור**: מחרוזת השפה (למשל, `Locales.ENGLISH`, `Locales.HEBREW`, `Locales.ARABIC`) המשמשת לקביעת כיוון הטקסט.
  - **סוג**: `Locales` (אופציונלי)

## ערך מוחזר

- **סוג**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **תיאור**: כיוון הטקסט המתאים לשפה:
  - `'ltr'` עבור שפות משמאל לימין.
  - `'rtl'` עבור שפות מימין לשמאל.
  - `'auto'` אם השפה אינה מזוהה.

## דוגמאות שימוש

### קביעת כיוון טקסט

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getHTMLTextDir, Locales } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // פלט: "ltr"
getHTMLTextDir(Locales.FRENCH); // פלט: "ltr"
getHTMLTextDir(Locales.ARABIC); // פלט: "rtl"
getHTMLTextDir(Locales.HEBREW); // פלט: "rtl"
```

## מקרי קצה

- **לא סופקה שפה:**
  - הפונקציה מחזירה `'auto'` כאשר `locale` הוא `undefined`.

- **שפה לא מזוהה:**
  - עבור שפות שאינן מזוהות, הפונקציה מחזירה כברירת מחדל את הערך `'auto'`.

## שימוש ברכיבים

ניתן להשתמש בפונקציה `getHTMLTextDir` כדי להגדיר באופן דינמי את המאפיין `dir` במסמך HTML לצורך רינדור טקסט תקין בהתאם לשפה.

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import type { FC, PropsWithChildren } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} lang={locale}>
    <body>{children}</body>
  </html>
);
```

בדוגמה לעיל, המאפיין `dir` מוגדר באופן דינמי על פי השפה.
