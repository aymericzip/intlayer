---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-Lingui ל-Intlayer"
description: "למדו כיצד להגר את האפליקציה שלכם מ-Lingui ל-Intlayer באמצעות מתאם התאימות (compat adapter)."
keywords:
  - lingui
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-Lingui ל-Intlayer

אם הפרויקט שלכם מסתמך כיום על הידור מבוסס מאקרו של Lingui, מעבר ל-Intlayer מאפשר לכם לשמור על תהליכי המאקרו העוצמתיים שלכם תוך גיבוים באופן טבעי באמצעות אסטרטגיית הידור ה-JSON של Intlayer.

## מה לעשות

כדי להתחיל, אתחלו את Intlayer בפרויקט שלכם:

```bash
npx intlayer init --interactive
```

פעולה זו יוצרת את קובץ `intlayer.config.ts` שלכם. ודאו שאתם שומרים את `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` בשלב ה-build שלכם כדי שירוצו _לפני_ מהדר Intlayer. לאחר מכן, השתמשו בכינוי (alias) של תוסף ה-bundler כדי לנתב את `@lingui/core` ואת `@lingui/react` אל `@intlayer/lingui`.

## מה קורה מתחת למכסה המנוע

Lingui משתמשת במאקרואים (כגון `` t`Hello ${name}` `` ו-`<Trans>`) אשר מהודרים לקריאות זמן ריצה כמו `i18n._(id, values)`.

מתחת למכסה המנוע:

- **מאקרואים (Macros):** הם מהודרים בדיוק כפי שהיה קודם לכן, ומבטיחים שלא תהיה כל הפרעה לתחביר המקור שלכם.
- **תרגום בזמן ריצה:** הקריאה `i18n._()` בעלת הכינוי (alias) משתמשת במילוני Intlayer. הן מזהים בעלי שם מפורש והן מזהים מחושבים (hashed IDs) ממופים במלואם באמצעות תוספי הסנכרון של `.po` ב-Intlayer כדי לאסוף ולגזום מפתחות באופן מאובטח.
- **יכולות ICU:** תמיכה בריבוי (pluralization), בחירה (selection) וגרסאות ICU נותרת חזקה הודות למנתח ה-ICU המאוחד של Intlayer, מה שמבטיח פלטי רינדור זהים.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
