---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד אינטגרציית intlayer | astro-intlayer
description: גלה כיצד להגדיר ולהשתמש באינטגרציית Astro של intlayer ב-astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - אינטגרציה
  - i18n
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "עדכון תיעוד אינטגרציה עם פרטי middleware והוקים"
  - version: 8.0.0
    date: 2026-01-21
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד אינטגרציית intlayer ל-Astro

אינטגרציית `intlayer` עבור Astro מגדירה את הפרויקט שלך עבור בינאום רב-לשוני (i18n). היא מטפלת בהכנת מילונים בזמן בנייה, הזרקת תוספי Vite, רישום אוטומטי של middleware לבקשות, והפקת דפי prerender מתורגמים.

## שימוש

הוסף את `intlayer()` לקובץ ה-`astro.config.mjs` שלך:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

ה-codemod של Astro CLI‏ (`astro add astro-intlayer`) מייצר גם ייבוא ברירת מחדל הנתמך במלואו:

```ts
import intlayer from "astro-intlayer";
```

## תיאור

האינטגרציה מתחברת למחזור חיי הבנייה וזמן הריצה של Astro:

1. **הגדרת תצורה (`astro:config:setup`)**:
   - **הכנת מילונים**: מכינה מילוני Intlayer וטיפוסים שנוצרו לפני ריצת הבנייה.
   - **תוספי Vite**: מזריקה תוספים עבור כינויי Vite (המאפשרים ייבוא מילונים חלק), פרוקסי לניתוב שפות וניפוי (pruning) לבנייה.
   - **רישום תוכנת תיווך**: מזריקה אוטומטית את `astro-intlayer/middleware` לשרשרת ה-middleware של הפרויקט שלך, ומאכלסת את `Astro.locals.intlayer` בכל בקשה נכנסת.
2. **סיום בנייה (`astro:build:done`)**:
   - **שכתוב דפים**: בודקת כללי שכתוב כתובות URL מותאמות לשפה ומפיקה דפי HTML של prerender בנתיבים המתורגמים המתאימים.

## מה מסופק ישירות מהקופסה

לאחר הגדרתה, יישום ה-Astro שלך יכול להשתמש מיד ב:

- ההוקים `useIntlayer`, `useDictionary` ו-`useLocale` בתוך ה-frontmatter של רכיבי `.astro`.
- האובייקט `Astro.locals.intlayer` בנקודות קצה (endpoints) ובדפים של Astro.
- ייבויי צד-לקוח בבלוקי `<script>` המשקפים את אותו ממשק API עם עדכונים תגובתיים (reactive).
- מעצבי פורמט מובנים תחת `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency` וכו').

## תיעוד קשור

- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useIntlayer.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useLocale.md)
- [תוכנת תיווך `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/onRequest.md)
