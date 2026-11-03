---
createdAt: 2026-06-13
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-React Intl ל-Intlayer"
description: "למדו כיצד להגר את אפליקציית ה-React שלכם מ-react-intl ל-Intlayer באמצעות מתאם התאימות (compat adapter)."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - הגירה
  - תאימות
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-React Intl ל-Intlayer

אם אפליקציית ה-React שלכם משתמשת ב-`react-intl` (FormatJS), המעבר ל-Intlayer הוא פשוט במיוחד. שכבת התאימות שלנו מטפלת בצורה חלקה ב-ICU MessageFormat ובכל רכיבי ה-`Formatted*` הקיימים.

## מה לעשות

התחילו על ידי הרצת פקודת האתחול בפרויקט שלכם:

```bash
npx intlayer init --interactive
```

לאחר מכן, הגדירו את תוסף Vite או Next.js של Intlayer בקובץ התצורה שלכם. תוסף זה מזריק כינויים בזמן ה-build כדי לנתב מחדש ייבואי `react-intl` אל `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## מה קורה מתחת למכסה המנוע

תוסף ה-bundler מבצע כינוי (alias) מ-`react-intl` אל `@intlayer/react-intl`. במקום לנתח קובצי JSON גדולים באופן ידני ולעטוף את האפליקציה שלכם ב-`IntlProvider`, תוסף Intlayer מחלץ מפתחות באופן סטטי ומשתמש במילוני Intlayer בזמן ריצה.

מתחת למכסה המנוע:

- **ICU MessageFormat:** Intlayer משתמשת במפענח `resolveMessage(..., 'icu')` אשר תומך באופן מלא וטבעי בריבוי ICU, בחירה, עיצוב תאריכים/מספרים ותגיות טקסט עשיר.
- **קריאות מתודה ו-JSX:** `intl.formatMessage({ id: 'a.b' })` ו-`<FormattedMessage id="a.b">` מזוהים על ידי תוספי המהדר של Intlayer (`@intlayer/babel` / `@intlayer/swc`), הממירים מפתחות מנוקדים שטוחים כך שהמקטע הראשון נפתר בצורה נכונה למפתח המילון של Intlayer.
- **מפרמטים (Formatters):** `<FormattedNumber>`, `<FormattedDate>` וכדומה, מגשרים אל `core/formatters` המקורי באמצעות `Intl`.

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)
