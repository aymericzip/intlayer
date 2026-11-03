---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "@intlayer/next-i18next: מתאם תאימות עבור next-i18next"
description: "שמרו על קוד ה-next-i18next שלכם והגישו אותו מ-Intlayer: התקינו את @intlayer/next-i18next, בצעו alias לייבואים, וגלו מה המתאם משנה מתחת למכסה המנוע."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# @intlayer/next-i18next: מתאם תאימות עבור next-i18next

למדריך מלא ומפורט שלב אחר שלב, אנא עיינו ב[מדריך ההגירה המלא מ-next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-i18next_to_intlayer.md).

- [מדריך הגירה מ-next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-i18next_to_intlayer.md)

Intlayer מטפלת בכל מימושי Pages Router ו-App Router ב-Next.js בצורה שקופה. שימוש במתאם מאפשר לכם להגר את מימוש ה-`next-i18next` שלכם ללא שכתוב קוד כלל.

## מה לעשות

כדי להתחיל, הריצו:

```bash
npx intlayer init --interactive
```

פעולה זו יוצרת את קובץ ההגדרה הנדרש של Intlayer. כדי לעבור ל-Intlayer מאחורי הקלעים, עדכנו את `next.config.ts` שלכם:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## מה קורה מתחת למכסה המנוע

התוסף `createNextI18nPlugin` משלב את ההתנהגות הטבעית של Next.js יחד עם תוסף הליבה `next-intlayer`, ומזריק את כל כינויי ה-Webpack/Turbopack הנדרשים עבור `next-i18next`, `react-i18next` ו-`i18next`.

מתחת למכסה המנוע:

- **`serverSideTranslations` ו-`appWithTranslation`:** הם מתפקדים כעת כעוטפים (wrappers) עבור ה-loaders הפנימיים של Intlayer, ועוקפים הזרקת קובצי JSON סטטיים גדולים.
- **Client hooks:** מאציל באופן מיידי ל-`@intlayer/react-i18next` תוך שמירה על כל תכונות העיצוב, צורות הרבים ומרחבי השמות המקוננים.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
