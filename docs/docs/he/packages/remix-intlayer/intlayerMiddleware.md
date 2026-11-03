---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד תוכנת תיווך intlayer | remix-intlayer
description: גלה כיצד להשתמש בתוכנת התיווך (middleware) intlayer ביישומי Remix 3 לניתוב מבוסס שפה וניהול קונטקסט הבקשה.
keywords:
  - intlayer
  - intlayerMiddleware
  - remix
  - remix-3
  - middleware
  - תוכנת תיווך
  - ניתוב
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד תוכנת תיווך intlayer ל-Remix 3

תוכנת התיווך (middleware) `intlayer` עבור Remix 3 מנהלת את שכבת הבינאום לאורך כל היישום שלך. בנויה על תקני אינטרנט (`Request` ו-`Response`), היא מטפלת בניתוב שפות (הפניות ושכתובים פנימיים), מזהה את שפת הבקשה, שומרת אותה בעוגיות וכותרות, ומבססת היקף `AsyncLocalStorage` כך שמטפלים ורכיבים במורד הזרם יכולים לגשת לתרגומים ללא prop drilling.

## שימוש

רשום את ה-middleware של `intlayer` בעת אתחול נתב ה-Remix 3 שלך:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// מגיש `/`, `/fr`, `/es`, השפה מפוענחת מתוך הבקשה
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## תיאור

תוכנת התיווך `intlayer` מבצעת את המשימות הבאות:

1. **הכנת מילונים**: מפעילה את `prepareIntlayer` בעת ההפעלה כדי להבטיח שכל המילונים שנוצרו בנויים וזמינים.
2. **ניתוב שפות (Locale Routing)**: מעריכה את הבקשה מול אסטרטגיית הניתוב שהוגדרה (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **הפניות (Redirects)**: אם משתמש מבקר ב-`/about` ויש לנתבו לקידומת שפה (לדוגמה `/fr/about`), תוכנת התיווך מפיקה תגובת הפניה עם כותרות `location` ו-`Set-Cookie` מתאימות.
   - **שכתובים פנימיים (Internal Rewrites)**: כאשר משתמש ניגש אל `/fr/about`, ה-URL משוכתב פנימית כך שמטפל הנתיב שלך מתאים ל-`/about`, בעוד שהשפה שפוענחה נלכדת כ-`fr`.
   - **כינויי URL מקומיים**: מכבדת כללי שכתוב כתובות URL שהוגדרו ב-`intlayer.config.ts` (למשל, שכתוב `/fr/about` אל `/fr/a-propos`).
3. **פענוח שפה (Locale Resolution)**: מזהה את השפה הפעילה על סמך קידומת URL, עוגיות שמורות, כותרות מותאמות אישית או העדפות דפדפן בכותרת `Accept-Language`.
4. **הזרקת קונטקסט (Context Injection)**:
   - מצרפת את `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) ל-`RequestContext` של Remix תחת המפתח `Intlayer` ו-`context.intlayer`.
   - מריצה את שאר הבקשה בתוך היקף `AsyncLocalStorage` (`requestStorage`), מה שמאפשר קריאה נקייה ל-`useIntlayer`, `useDictionary` ו-`useLocale` במטפלים, בתצוגות וברכיבים.
5. **שמירה מתמשכת (Persistence)**: מצרפת כותרות שפה ועוגיות יוצאות לתגובת ה-HTTP הסופית כדי לשמר את העדפת המשתמש.

## פרמטרים

הפונקציה `intlayer` מקבלת אופציונלית את `IntlayerMiddlewareOptions`:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // דריסות תצורת ניתוב מותאמות אישית
};

const middleware = intlayer(options);
```

## גישה ישירה לקונטקסט

בנוסף לשימוש בהוקים, ניתן לגשת ל-`IntlayerState` שפוענח ישירות מתוך קונטקסט הבקשה של Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // דרך context.get()
  const state = context.get(Intlayer);

  // או דרך מאפיין context.intlayer הישיר
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## תיעוד קשור

- [קונטקסט `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/Intlayer.md)
- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/useIntlayer.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/useLocale.md)
