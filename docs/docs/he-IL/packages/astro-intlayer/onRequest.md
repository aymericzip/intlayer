---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד תוכנת תיווך onRequest | astro-intlayer
description: גלה כיצד להשתמש בתוכנת התיווך (middleware) onRequest ביישומי Astro כדי לפענח את שפת הבקשה ולאכלס את Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - תוכנת תיווך
  - astro
  - astro-intlayer
  - Astro.locals
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד תוכנת תיווך onRequest ל-Astro

תוכנת התיווך `onRequest` מתוך `astro-intlayer/middleware` מפענחת את השפה של כל בקשת HTTP נכנסת ומאכלסת את `Astro.locals.intlayer`.

כאשר אתה רושם את אינטגרציית `intlayer()` ב-`astro.config.mjs`, תוכנת תיווך זו מוזרקת אוטומטית. עליך לייבא אותה ישירות רק אם אתה מרכיב ידנית middleware של Astro באמצעות `sequence(...)`.

## שימוש

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // גישה לשפה שפוענחה בתוך ה-middleware המותאם אישית שלך
  const { locale } = context.locals.intlayer;
  console.log(`Handling request for locale: ${locale}`);

  return next();
});
```

## תיאור

תוכנת התיווך מבצעת את הפעולות הבאות:

1. **זיהוי שפה (Locale Detection)**:
   - **URL**: מנתחת את קידומת נתיב ה-URL או את פרמטר החיפוש `?locale=` (אלא אם `routing.mode` מוגדר כ-`no-prefix`).
   - **עוגיות / כותרות (Cookies / Headers)**: בודקת עוגיות שפה שנשמרו או ערכי כותרות מותאמים אישית.
   - **Accept-Language**: נסוגה למשא ומתן שפות מועדפות של הדפדפן.
   - עבור דפים שעברו prerender (`context.isPrerendered`), השפה מחולצת אך ורק מתוך ה-URL כדי למנוע אזהרות בנייה של Astro.
2. **אכלוס קונטקסט (Context Population)**: מאכלסת את `Astro.locals.intlayer` עם:
   - `locale`: השפה שפוענחה.
   - `defaultLocale`: שפת ברירת המחדל לגיבוי (fallback).
   - `availableLocales`: מערך השפות המוגדרות.
3. **היקף AsyncLocalStorage**: עוטפת את עיבוד הבקשה במורד הזרם בתוך היקף `AsyncLocalStorage`, מה שמאפשר ל-`useIntlayer()`, `useDictionary()` ו-`useLocale()` לגשת למצב הבקשה ללא צורך בהעברת ארגומנטים.

## טיפוס `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## תיעוד קשור

- [אינטגרציית `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/intlayer.md)
- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useIntlayer.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useLocale.md)
