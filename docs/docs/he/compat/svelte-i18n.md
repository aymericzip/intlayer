---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-Svelte I18n ל-Intlayer"
description: "למדו כיצד להגר את אפליקציית ה-Svelte שלכם מ-svelte-i18n ל-Intlayer באמצעות מתאם התאימות (compat adapter)."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-Svelte I18n ל-Intlayer

העברת אפליקציית ה-Svelte שלכם מ-`svelte-i18n` ל-Intlayer אורכת רגעים ספורים באמצעות מתאם התאימות.

## מה לעשות

פשוט הריצו את פקודת האתחול בפרויקט שלכם:

```bash
npx intlayer init --interactive
```

פעולה זו מייצרת את קובץ `intlayer.config.ts`. ודאו שתוספי ה-SvelteKit / Vite שלכם עטופים בתוסף הכינויים של Intlayer כדי למפות בצורה חלקה את `svelte-i18n` אל `@intlayer/svelte-i18n`.

## מה קורה מתחת למכסה המנוע

`svelte-i18n` מסתמכת על stores בשימוש תדיר (`$_`, `$t`, `$format` וכו') ועל ICU MessageFormat.

מתחת למכסה המנוע:

- **Stores:** Intlayer מבצעת proxy ל-stores של `svelte-i18n`. ה-`$_` הופך ל-derived store של השפה הנוכחית המחזיר resolver של Intlayer.
- **מפתחות:** המפתחות השטוחים שלכם (למשל `$_('home.title')`) מוערכים כך שמקטע הנתיב הראשון מייצג את מילון Intlayer.
- **תחביר ICU:** מטופל במלואו על ידי מנתח ה-ICU המשותף (המקביל לניתוח של `intl-messageformat`).
- **מפרמטים (Formatters):** קריאות `$date`, `$time`, `$number` מנותבות מחדש בבטחה למפרמטי הליבה המקוריים של Intlayer.
- **ניתוח Babel/SWC:** המנתח של Intlayer קורא את קוראי ה-Svelte store (`$_`) בתוך קובצי המקור `.svelte` שלכם לפני ההידור כדי לבנות אוטומטית את מקטעי המילון הרלוונטיים.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
