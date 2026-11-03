---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "@intlayer/nuxt-i18n: מתאם תאימות עבור @nuxtjs/i18n"
description: "שמרו על קוד ה-@nuxtjs/i18n שלכם והגישו אותו מ-Intlayer: התקינו את @intlayer/nuxt-i18n, בצעו alias לייבואים, וגלו מה המתאם משנה מתחת למכסה המנוע."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# @intlayer/nuxt-i18n: מתאם תאימות עבור @nuxtjs/i18n

הגירת אפליקציית ה-Nuxt שלכם מ-`@nuxtjs/i18n` ל-Intlayer היא תהליך חלק באמצעות מודול המתאם של Nuxt.

## מה לעשות

כדי לאתחל את הפרויקט, הריצו:

```bash
npx intlayer init --interactive
```

פעולה זו תגדיר את קובץ `intlayer.config.ts`. לאחר מכן, הוסיפו את מודול ה-Nuxt של Intlayer (לדוגמה `@intlayer/nuxt-i18n`) במערך ה-modules של `nuxt.config.ts` שלכם. פעולה זו מחילה אוטומטית את תצורת התאימות עבור האפליקציה שלכם.

## מה קורה מתחת למכסה המנוע

`@nuxtjs/i18n` עוטפת את `vue-i18n` תוך אספקת composables לניתוב ספציפיים ל-Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

מתחת למכסה המנוע:

- **תרגומים:** מסתמך באופן טבעי על שכבת התאימות של `@intlayer/vue-i18n` עבור כל משימות תרגום המחרוזות (תומך באופן מלא בפורמטים של `vue-i18n`, צורות רבים עם pipe, ותגובתיות).
- **ניתוב (Routing):** משקף את ה-composables של הניתוב באמצעות פונקציות העזר לכתובות URL מתורגמות של Intlayer.
- **תצורה:** קורא את ה-`availableLocales` והגדרות ברירת המחדל ישירות מ-`intlayer.config.ts` שלכם כדי לתאם את דפי Nuxt באופן אוטומטי.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
