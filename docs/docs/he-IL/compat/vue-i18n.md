---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "@intlayer/vue-i18n: מתאם תאימות עבור vue-i18n"
description: "שמרו על קוד ה-vue-i18n שלכם והגישו אותו מ-Intlayer: התקינו את @intlayer/vue-i18n, בצעו alias לייבואים, וגלו מה המתאם משנה מתחת למכסה המנוע."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# @intlayer/vue-i18n: מתאם תאימות עבור vue-i18n

אם אפליקציית ה-Vue שלכם משתמשת כיום ב-`vue-i18n`, תוכלו להגר ל-Intlayer מבלי לשכתב את הרכיבים או את ה-hooks של התרגום שלכם. Intlayer מספקת מתאם תאימות שמשקף בצורה מושלמת את ה-API של `vue-i18n` תוך ניצול התכונות העוצמתיות של Intlayer מתחת למכסה המנוע.

## מה לעשות

כדי להתחיל, פשוט הריצו את פקודת האתחול בפרויקט שלכם:

```bash
npx intlayer init --interactive
```

במהלך האתחול, Intlayer תגדיר את קובץ התצורה שלכם (`intlayer.config.ts`) ותכין את הפרויקט להגירה. תצטרכו רק להוסיף את תוסף Intlayer לתצורת ה-Vite שלכם כדי לבצע כינוי (alias) אוטומטי לייבואי `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## מה קורה מתחת למכסה המנוע

התוסף `vueI18nVitePlugin` מזריק כינוי מודול לתוך ה-bundler שלכם. כל ייבוא של `vue-i18n` בבסיס הקוד שלכם ינותב מחדש באופן שקוף אל `@intlayer/vue-i18n`.

**מתחת למכסה המנוע, המתאם מטפל בתחביר המורכב של `vue-i18n` באופן טבעי:**

- **אינטרפולציה וצורות רבים:** פותר אינטרפולציות של `{name}` ורשימות `{0}`. צורות רבים עם pipe (כגון `"car | cars"`) מומרות לצומתי enumeration/plural של Intlayer בהתבסס על סמנטיקה מיקומית.
- **פורמטים:** פונקציות כמו `d()` ו-`n()` עוטפות את `Intl` מתחת למכסה המנוע, ומכבדות את `datetimeFormats` ואת `numberFormats` שהוגדרו באפשרויות שלכם.
- **מצב גלובלי ומקומי:** ה-`global.locale` ממופה ל-`WritableComputedRef` המגובה על ידי לקוח Intlayer, כך שהתגובתיות מתנהגת בדיוק כמצופה (למשל `locale.value = 'fr'`).
- **Directives:** ה-directive של `v-t` רשום ומתפקד כרגיל.

האפליקציה שלכם ממשיכה להתרנדר בדיוק כפי שהיה קודם לכן, אך התוכן מופעל על ידי מילוני ה-Intlayer שלכם, מה שמעניק לכם type safety, אופטימיזציית חבילה טובה יותר ואינטגרציית CMS חלקה.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
