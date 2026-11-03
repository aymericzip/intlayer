---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-NGX-Translate ל-Intlayer"
description: "למדו כיצד להגר את אפליקציית ה-Angular שלכם מ-ngx-translate ל-Intlayer באמצעות מתאם התאימות (compat adapter)."
keywords:
  - ngx-translate
  - angular
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-NGX-Translate ל-Intlayer

הגירת אפליקציית ה-Angular שלכם מ-`ngx-translate` ל-Intlayer היא פשוטה באמצעות מתאם התאימות, ומאפשרת לכם לעקוף את הצורך בשכתוב כל התבניות (templates) שלכם.

## מה לעשות

התחילו על ידי הרצת:

```bash
npx intlayer init --interactive
```

פקודה זו מגדירה את קובץ `intlayer.config.ts`. החליפו את הגדרות `TranslateModule.forRoot()` ואת כינויי הייבוא (import aliases) בהתאם כך שיצביעו על `@intlayer/ngx-translate`.

## מה קורה מתחת למכסה המנוע

`ngx-translate` משתמשת ב-`TranslateService` (`instant`, `get`, `stream`) לצד ה-pipe של `{{ 'KEY' | translate:params }}` וה-directive של `[translate]`.

מתחת למכסה המנוע:

- **שירותים (Services):** `TranslateService` עוטף את `getIntlayer` ו-observable של השפה, ומספק בדיוק את אותן המתודות.
- **Pipes ו-Directives:** ממומשים מחדש כדי להיפתר מול מילוני Intlayer ישירות.
- **Loaders:** הגדרות `TranslateHttpLoader` מומרות ל-stubs של אזהרה מכיוון ש-Intlayer מטבעה פותרת ואורזת את המילונים שלכם בזמן ה-build (או באמצעות dynamic imports סטנדרטיים), מה שמבטל לחלוטין את הצורך ב-HTTP loaders.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
