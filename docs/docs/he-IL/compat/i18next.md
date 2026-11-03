---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "@intlayer/i18next: מתאם תאימות עבור i18next"
description: "שמרו על קוד ה-i18next שלכם והגישו אותו מ-Intlayer: התקינו את @intlayer/i18next, בצעו alias לייבואים, וגלו מה המתאם משנה מתחת למכסה המנוע."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# @intlayer/i18next: מתאם תאימות עבור i18next

למדריך מפורט שלב אחר שלב, אנא עיינו ב[מדריך ההגירה המלא מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md).

- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)

Intlayer משכפלת בצורה מושלמת את מאפייני זמן הריצה המרכזיים של `i18next`. באמצעות חבילת התאימות, אפליקציות ה-Vanilla או המודולים הפנימיים שלכם יכולים להמשיך להשתמש בתחביר המוכר.

## מה לעשות

כדי להתחיל, אתחלו את Intlayer בפרויקט שלכם:

```bash
npx intlayer init --interactive
```

אם אתם משתמשים ב-Vite, כללו את תוסף Intlayer כדי לנתב את הייבואים אל `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## מה קורה מתחת למכסה המנוע

התוסף `i18nextVitePlugin` מבצע כינוי (alias) לייבואי `i18next` ומפנה אותם אל `@intlayer/i18next`, ובכך נמנע ניפוח של ה-bundle מהכללת קובצי JSON.

מתחת למכסה המנוע:

- **תצורת מופע (Instance configuration):** `createInstance` מנתח ומחיל נסיגות (fallbacks) של מרחבי שמות בצורה נכונה, תוך ניצול צינור ההידור של Intlayer לשליפת מילונים.
- **אינטרפולציה (Interpolation):** תמיכה טבעית בהחלפות `{{name}}` ובקינון רקורסיבי של `$t(key)`.
- **הקשר וצורות רבים (Context & Plurals):** מזהה ופותר פורמטי סיומות כגון `key_male` ו-`key_one`/`key_other` תוך הערכה מול `Intl.PluralRules` התקני.
- **החזרת אובייקטים (Return objects):** המצב `returnObjects: true` מחלץ בבטחה עצים מתוך מילוני Intlayer.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
