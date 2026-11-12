---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useIntlayer | remix-intlayer
description: גלה כיצד להשתמש בהוק useIntlayer ביישומי Remix 3 כדי לגשת לתוכן מתורגם לפי מפתח.
keywords:
  - useIntlayer
  - מילון
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד ההוק useIntlayer

ההוק `useIntlayer` מאפשר לך לאחזר תוכן מתורגם מתוך מילון Intlayer לפי מפתח ביישומי Remix 3.

הוא קורא אוטומטית את השפה הפעילה מקונטקסט הבקשה הנוכחית (באמצעות `AsyncLocalStorage`), כך שאין צורך להעביר את השפה דרך מטפלי נתיבים, תבניות תצוגה או רכיבים.

## שימוש

### במטפלי נתיבים (Route Handlers)

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### בתבניות תצוגה / רכיבים

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## פרמטרים

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: המפתח הייחודי של המילון (כפי שהוגדר בקובצי הצהרת התוכן `.content.ts` שלך).
2. **`localeOrSelector`** (אופציונלי): שפה ספציפית או אובייקט בורר (`{ item }`, `{ variant }`, אופציונלית עם `locale`). כאשר מסופק, הוא דורס את השפה שזוהתה מקונטקסט הבקשה.

## תיאור

ההוק מבצע את המשימות הבאות:

1. **אחזור שפת הקונטקסט**: מזהה את השפה הנוכחית מתוך היקף ה-`AsyncLocalStorage` התחום לבקשה שבוסס על ידי ה-middleware של `intlayer()`.
2. **אחזור מילון**: מאחזר את המילון המהודר מראש התואם למפתח שסופק.
3. **עיבוד תרגום**: מפענח תרגומים, ריבוי (enumerations), Markdown ותוכן מותנה עבור השפה שפוענחה.
4. **טיפול בנסיגה (Fallback Handling)**: אם נקרא מחוץ לקונטקסט של בקשת HTTP פעילה (למשל משימות רקע או בדיקות יחידה ללא middleware), הוא נסוג בצורה חלקה אל ה-`defaultLocale` שהוגדר.

## תיעוד קשור

- [תוכנת תיווך `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/intlayerMiddleware.md)
- [הוק `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/useDictionary.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/useLocale.md)
