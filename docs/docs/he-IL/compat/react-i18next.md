---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "@intlayer/react-i18next: מתאם תאימות עבור react-i18next"
description: "שמרו על קוד ה-react-i18next שלכם והגישו אותו מ-Intlayer: התקינו את @intlayer/react-i18next, בצעו alias לייבואים, וגלו מה המתאם משנה מתחת למכסה המנוע."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# @intlayer/react-i18next: מתאם תאימות עבור react-i18next

למדריך מלא ומפורט שלב אחר שלב, אנא עיינו ב[מדריך ההגירה המלא מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md).

- [מדריך הגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md)

שימוש במתאם התאימות של Intlayer מאפשר לכם להגר מ-`react-i18next` ללא כל שינוי בייבואי קוד המקור שלכם.

## מה לעשות

כדי לאתחל את הפרויקט, הריצו:

```bash
npx intlayer init --interactive
```

במהלך האתחול, Intlayer תתקין את `@intlayer/react-i18next` ותיצור את `intlayer.config.ts`. ב-bundler שלכם (כמו Vite), החילו את תוסף Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## מה קורה מתחת למכסה המנוע

התוסף `reactI18nextVitePlugin` עוטף את תוסף הליבה `vite-intlayer` ומזריק כינויי פתרון (resolve aliases) עבור `react-i18next` ו-`i18next`, כשהוא מנתב אותם מחדש אל `@intlayer/react-i18next` ו-`@intlayer/i18next`.

מתחת למכסה המנוע:

- **`useTranslation` ו-`withTranslation`:** משוכתבים לשימוש ב-hooks המקוריים של Intlayer, ומעניקים לכם השלמת TypeScript אוטומטית עבור מפתחות המילון שלכם. הוא תומך בצורה חלקה במרחבי שמות (למשל `t('namespace:key')`).
- **צורות רבים והקשר (Plurals & Context):** מטפל בריבוי מבוסס סיומות של i18next (`key_one`, `key_other`) באמצעות `Intl.PluralRules` המקורי וסיומות הקשר (`key_male`).
- **רכיב `<Trans>`:** ממומש מחדש לתמיכה ב-prop ה-`components`, בצורות אובייקט ומערך, ובתגיות ממוספרות `<1>...</1>` הממופות ישירות לצומתי ה-React שלכם.
- **מופע `i18n`:** פותר מפתחות ישירות מ-Intlayer מבלי למשוך קובצי JSON גדולים, מה שמביא לגודל bundle קטן משמעותית.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
