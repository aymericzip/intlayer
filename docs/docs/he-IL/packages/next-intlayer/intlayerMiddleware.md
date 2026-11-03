---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד intlayerMiddleware | next-intlayer
description: גלה כיצד להשתמש בפונקציה intlayerMiddleware עבור חבילת next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - תוכנת תיווך
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: "שינוי שם intlayerMiddleware ל-intlayerProxy"
  - version: 8.0.0
    date: 2026-01-21
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד intlayerProxy (intlayerMiddleware)

הפונקציה `intlayerProxy` (`intlayerMiddleware` עבור nextjs < 16) היא תוכנת תיווך (middleware) של Next.js המטפלת בניתוב ובהפניות מבוססות שפה. היא מזהה אוטומטית את השפה המועדפת על המשתמש ומפנה אותו לנתיב המתורגם המתאים בעת הצורך.

## שימוש

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## תיאור

ה-middleware מבצע את המשימות הבאות:

1. **זיהוי שפה (Locale Detection)**: בודק את נתיב ה-URL, העוגיות (cookies) וכותרת ה-`Accept-Language` כדי לקבוע את שפת המשתמש.
2. **הפניה מחדש (Redirection)**: אם ה-URL אינו מכיל קידומת שפה והתצורה דורשת זאת (או בהתבסס על העדפות המשתמש), הוא מפנה ל-URL המותאם לשפה.
3. **ניהול עוגיות (Cookie Management)**: יכול לשמור את השפה שזוהתה בתוך cookie עבור בקשות עתידיות.

## פרמטרים

הפונקציה מקבלת את ה-`NextRequest` הסטנדרטי של Next.js כפרמטר בשימוש ישיר, או שניתן לייצא אותה כפי שמוצג למעלה.

## תצורה

להגדרת ה-middleware, ניתן להגדיר את אפשרות ה-`routing` בקובץ `intlayer.config.ts`. ראה [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) לפרטים נוספים.

- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
