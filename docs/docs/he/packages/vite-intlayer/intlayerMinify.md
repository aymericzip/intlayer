---
createdAt: 2026-06-25
updatedAt: 2026-11-03
priority: 5
title: תיעוד תוסף Vite intlayerMinify | vite-intlayer
description: תוסף Vite הדוחס קובצי JSON של מילוני Intlayer מהודרים ובאופן אופציונלי מקצר שמות שדות תוכן כדי להקטין את גודל ה-bundle.
keywords:
  - intlayerMinify
  - vite
  - תוסף
  - דחיסה
  - minify
  - גודל bundle
  - מילון
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "התחלת תיעוד"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` הוא תוסף Vite הדוחס קובצי JSON של מילונים מהודרים במהלך בניית ייצור (production build). הוא מסיר את כל הרווחים הלבנים המיותרים, ובשילוב עם `intlayerPrune`, משנה באופן אופציונלי את שמות שדות התוכן לכינויים אלפביתיים קצרים (`a`, `b`, `c`, …) כדי להקטין עוד יותר את גודל ה-bundle.

> התוסף כבר כלול ומוגדר אוטומטית בעת שימוש ב-[`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md). עליך לרשום אותו ידנית רק אם אתה מרכיב את מחסנית התוספים בעצמך.

- [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md)

## שימוש

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## תנאי הפעלה

`intlayerMinify` פעיל **רק** כאשר כל שלושת התנאים הבאים מתקיימים:

1. פקודת ה-Vite היא `build` (ולא `serve` / פיתוח).
2. `build.optimize` מוגדר כ-`true` (או `undefined`, שמוגדר כברירת מחדל כ-`true` עבור בנייה).
3. `build.minify` מוגדר כ-`true` בתצורת ה-Intlayer שלך.

כאשר `editor.enabled` מוגדר כ-`true`, התוסף עדיין פועל אך **מדלג על שינוי שמות שדות (field renaming)**: שינוי שמות משכתב את מפתחות התוכן שהמפרש עובר עליהם, כך שה-`keyPath` שהעורך הוויזואלי מקבל כבר לא יתאים למילונים הבלתי ממוזגים שהוא עורך. דחיסת הרווחים הלבנים והסרת המטא-נתונים ברמה העליונה נשארות פעילות.

## מה נדחס

התוסף מתמקד בשני מיקומי מילונים (כפי שפוענחו מתוך `intlayer.system`):

- `dictionariesDir`: מילונים סטטיים לכל השפות (לדוגמה `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir`: מילונים דינמיים לפי שפה

> מילונים במצב Fetch (`fetchDictionariesDir`) **לעולם אינם** נדחסים מכיוון שהם מוגשים מ-API מרוחק בזמן ריצה באמצעות שמות השדות המקוריים שלהם. שינוי שמות שדות ייצור חוסר התאמה בין תגובת השרת לבין גישת המאפיינים בצד הלקוח.

## קיצור שמות שדות (Field-name mangling / דחיסת מאפיינים)

כאשר `intlayerPrune` ניתח את בסיס הקוד ואכלס את `pruneContext.dictionaryKeyToFieldRenameMap`, תוסף ה-`intlayerMinify` משנה גם את שמות שדות התוכן לכינויים קצרים. לדוגמה:

```jsonc
// לפני
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// אחרי (עם קיצור שמות)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

גישות המאפיינים התואמות בקובצי המקור משוכתבות על ידי מעבר Babel בתוך `intlayerOptimize`, כך שההתנהגות בזמן ריצה נותרת ללא שינוי.

שדות פנימיים של Intlayer (`nodeType`, `translation` וכו') לעולם אינם משנים את שמם.

## מילוני מקרי קצה (Edge-case dictionaries)

מילונים המסומנים ב-`pruneContext.dictionariesWithEdgeCases` (חריגות מבניות שזוהו במהלך שלב ה-prune) מדולגים לחלוטין, אינם נדחסים ושמותיהם אינם מקוצרים, כדי למנוע אספקת נתונים פגומים.

## קבוצות מוכשרות (Qualified groups: אוספים / וריאנטים / רשומות מטא)

עבור מילונים עם מערך `qualifierTypes` (אוספים, וריאנטים ורשומות מטא), התוסף שומר על מערך ה-`qualifierTypes` ועל מפת הצד `meta` כפי שהם. רק רשומות ה-`content` עוברות קיצור שמות שדות. המפתחות המורכבים (המשמשים להתאמת בוררים בזמן ריצה) לעולם אינם משתנים.
