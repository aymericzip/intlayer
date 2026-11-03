---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד קונטקסט Intlayer | remix-intlayer
description: גלה כיצד להשתמש במפתח ובמאפיין של קונטקסט הבקשה Intlayer ביישומי Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - קונטקסט
  - context
  - RequestContext
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד קונטקסט Intlayer

ב-`remix-intlayer`, ‏`Intlayer` הוא מפתח ה-`RequestContext` המשמש לגישה למצב הבינאום בתוך מטפלי בקשות (request handlers) של Remix 3.

## שימוש

כאשר תוכנת התיווך `intlayer()` רצה, היא שומרת אובייקט `IntlayerState` בקונטקסט הבקשה תחת המפתח `Intlayer`. ניתן לאחזר אותו בתוך כל מטפל נתיב:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // גישה דרך context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

ניתן גם לגשת אליו באמצעות קיצור הדרך של המאפיין הישיר `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## מבנה `IntlayerState`

האובייקט `IntlayerState` מכיל:

| מאפיין             | טיפוס               | תיאור                                                  |
| ------------------ | ------------------- | ------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | השפה שפוענחה עבור הבקשה הנוכחית.                       |
| `defaultLocale`    | `DeclaredLocales`   | שפת ברירת המחדל לגיבוי שהוגדרה ב-`intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | רשימת כל השפות הנתמכות שהוגדרו לפרויקט.                |

## תיעוד קשור

- [תוכנת תיווך `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/intlayerMiddleware.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/useLocale.md)
- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/useIntlayer.md)
