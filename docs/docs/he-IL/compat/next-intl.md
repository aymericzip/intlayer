---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "@intlayer/next-intl: מתאם תאימות עבור next-intl"
description: "שמרו על קוד ה-next-intl שלכם והגישו אותו מ-Intlayer: התקינו את @intlayer/next-intl, בצעו alias לייבואים, וגלו מה המתאם משנה מתחת למכסה המנוע."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# @intlayer/next-intl: מתאם תאימות עבור next-intl

למדריך מלא ומפורט שלב אחר שלב, אנא עיינו ב[מדריך ההגירה המלא מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md).

- [מדריך הגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md)

הגירה מ-`next-intl` ל-Intlayer מאפשרת לכם לשמור על הניתוב (routing) והתחביר באפליקציה שלכם ללא כל הפרעה.

## מה לעשות

הריצו את הפקודה הבאה במאגר שלכם:

```bash
npx intlayer init --interactive
```

פעולה זו תיצור קובץ `intlayer.config.ts`. בקובץ `next.config.ts` שלכם, השתמשו בעוטף התוסף כדי להזריק בצורה חלקה את כינויי (aliases) ה-`next-intl` אל `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## מה קורה מתחת למכסה המנוע

עוטף ה-bundler מחליף תרגומים, אך **משאיר את תכונות `next-intl/navigation` ללא שינוי** (למשל `Link`, `redirect`, `usePathname`).

מתחת למכסה המנוע:

- **זמן ריצה של ICU:** צורות רבים (`=0`, `one`, `other`), בחירה/selectordinal, ארגומנטים של `#`, וארגומנטים מפורמטים (`{ts, date, long}`) רצים כראוי באמצעות המפענח המשותף `resolveMessage(..., 'icu')`.
- **`useTranslations()` ו-`getTranslations()`:** קריאות התחום הישירות מחלצות את מקטע המפתח הראשון כמזהה המילון הנכון. מרחבי שמות מקוננים מתפצלים בצורה חלקה לנתיבי מילון ולקידומות.
- **עיצוב עשיר (Rich formatting):** הן `t.rich()` והן `t.markup()` ממומשים באופן טבעי ומלא, וממירים צמתים דמויי HTML למקטעי React מרונדרים.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange`, ופורמטים בעלי שמות מקובץ התצורה מגושרים ישירות אל מפרמטי ה-`Intl` המקוריים של השפה.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
