---
createdAt: 2026-06-25
updatedAt: 2026-11-03
priority: 5
title: תיעוד תוסף Vite intlayerProxy | vite-intlayer
description: תוכנת תיווך לניתוב שפות עבור שרתי פיתוח/תצוגה מקדימה של Vite ו-SSR בייצור. מטפלת בזיהוי שפה, הפניות URL ושכתובים פנימיים.
keywords:
  - intlayerProxy
  - vite
  - תוסף
  - middleware
  - תוכנת תיווך
  - שפה
  - locale
  - ניתוב
  - בינאום
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "מיזוג configOptions לאובייקט אפשרויות יחיד; הפרוקסי מאוגד בתוך intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` הוא תוסף Vite הרושם תוכנת תיווך (middleware) לניתוב שפות עבור **כל סביבה**: שרת פיתוח, שרת תצוגה מקדימה (preview) ו-SSR בייצור (Nitro / TanStack Start).

> **החל מ-Intlayer גרסה 9** `intlayerProxy` נכלל אוטומטית בתוך תוסף ה-[`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md) הראשי ומופעל כברירת מחדל באמצעות `routing.enableProxy: true`. עליך לרשום אותו בנפרד רק אם אתה זקוק לשליטה ברמה נמוכה יותר או משתמש בו מחוץ להגדרת ה-`intlayer()` הסטנדרטית.

- [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md)

## שימוש

### כחלק מ-`intlayer()` (מומלץ, גרסאות 9+)

העבר אפשרויות `proxy` לתוסף הראשי במקום לרשום את `intlayerProxy` בנפרד:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### באופן עצמאי (כאשר נדרש)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## אפשרויות (Options)

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

כל האפשרויות הן אופציונליות ומועברות כאובייקט יחיד:

| אפשרות          | טיפוס                               | תיאור                                                                                                                                     |
| --------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | פונקציית תנאי (predicate) המחריגה בקשות מניתוב שפות. החזר `true` כדי לדלג על בקשה (לדוגמה נתיבי API, בדיקות תקינות health checks).        |
| `configOptions` | `GetConfigurationOptions`           | דריסות תצורת Intlayer המועברות ל-`getConfiguration()`. השתמש בה כאשר אתה זקוק לכך שהפרוקסי יקרא קובץ תצורה ספציפי או ידרוס ערכים מסוימים. |

### דוגמה

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` יוצר תוכנת תיווך Node.js עצמאית ובלתי תלויה בפריימוורק `(req, res, next)` המכילה את כל לוגיקת ניתוב השפות. היא שימושית בסביבות שבהן ה-API של תוספי Vite אינו זמין (למשל שרת Node.js פשוט או מודול Nitro מותאם אישית).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### SSR בייצור (TanStack Start / Nitro דרך h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## התנהגות ניתוב (Routing behaviour)

תוכנת התיווך משקפת את לוגיקת הניתוב של תוכנת התיווך ב-`next-intlayer` ותומכת בכל מצבי הניתוב של Intlayer.

### מצבי ניתוב (Routing modes)

| מצב             | כתובת URL המוצגת בדפדפן  | התנהגות                                                                                               |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `prefix`        | `/en/about`              | ברירת מחדל. קידומת שפה ב-URL. שפת ברירת המחדל מופנית ל-URL ללא קידומת אלא אם מוגדר `prefix-all`.      |
| `prefix-all`    | `/en/about`, `/fr/about` | לכל השפות, כולל ברירת המחדל, תמיד יש קידומת.                                                          |
| `no-prefix`     | `/about`                 | אין שפה ב-URL. השפה נשמרת בעוגיות בלבד; שכתוב ה-URL מתבצע פנימית.                                     |
| `search-params` | `/about?locale=en`       | השפה מועברת כפרמטר שאילתה. מתבצעת הפניה להוספה או עדכון של פרמטר ה-`locale` כאשר הוא חסר או לא עדכני. |

### סדר עדיפויות בזיהוי

1. קידומת נתיב ה-URL (לדוגמה `/fr/about` ← `fr`).
2. ערך Cookie / localStorage (`intlayer-locale`).
3. כותרת `Accept-Language`.
4. `defaultLocale` מתוך התצורה.

### מעקף אוטומטי (Automatic bypass)

תוכנת התיווך תמיד מעבירה בקשות אלו ישירות ללא טיפול בשפה:

- בקשות התואמות לתנאי ה-`ignore`.
- `/node_modules/**`
- `/@**` – נתיבים פנימיים של Vite (`@vite/`, `@fs/`, `@id/` וכו').
- `/_**` – נתיבים פנימיים של השרת (`__vite_ping`, `__manifest` וכו').
- בקשות שהנתיב שלהן מסתיים בסיומת קובץ (נכסים סטטיים). אם קיימת קידומת שפה בנתיב של נכס סטטי (לדוגמה `/fr/logo.png`), היא מוסרת כדי שניתן יהיה להגיש את הקובץ כראוי.

### ניתוב דומיינים (Domain routing)

כאשר `routing.domains` מוגדר בתצורת ה-Intlayer שלך, תוכנת התיווך מטפלת בניתוב שפות בין דומיינים:

- בקשה עבור `/zh/about` ב-`intlayer.org` מופנית אל `https://intlayer.zh/about` כאשר `domains.zh = "intlayer.zh"`.
- בקשה אל `intlayer.zh/about` משוכתבת פנימית אל `/zh/about` כך שפרמטר הנתיב `[locale]` מאוכלס כראוי.

### הגנה מפני לולאות הפניה (Redirect loop protection)

תוכנת התיווך עוקבת אחר מספרי ההפניות עבור כל צמד `originalUrl → newUrl` בתוך חלון זמן נע של 2 שניות. יותר מ-10 הפניות בתוך חלון זה מחזירות תגובת `500` עם שגיאה מפורטת במקום להמשיך בלולאה אינסופית.

## Nitro / SSR בייצור (הזרקה אוטומטית, גרסאות 9+)

כאשר משתמשים ב-`intlayerProxy` כתוסף Vite, הוא נושא מאפיין `.nitro`. תוסף הבנייה `nitro/vite` קורא מאפיין זה ומוסיף אותו אל `nitroConfig.modules`, כך ש-`intlayerNitroHandler` נרשם כ-middleware של שרת Nitro באופן אוטומטי, ואין צורך בתצורה ידנית עבור SSR בייצור.

מטפל ה-Nitro משתמש במודל האירועים Web Fetch API של h3 v2 (ולא ב-`fromNodeMiddleware`) ולכן הוא תואם לכל ה-presets של Nitro: Node, Bun, Deno וסביבות קצה (edge runtimes).

## כינויים מיושנים (Deprecated aliases)

| ייצוא מיושן                | תחליף           |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
