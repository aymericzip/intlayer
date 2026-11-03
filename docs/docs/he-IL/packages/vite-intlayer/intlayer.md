---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד תוסף Vite intlayer | vite-intlayer
description: מדריך מקיף לתוסף Vite intlayer() – הכנת מילונים, כינויים, מעקב פיתוח, פרוקסי לניתוב שפות ומהדר.
keywords:
  - intlayer
  - vite
  - תוסף
  - פרוקסי
  - מהדר
  - compiler
  - בינאום
  - i18n
  - ניתוב
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "פרוקסי ומהדר מאוגדים בתוך intlayer(); נוספה אפשרות proxy, compatCallers, routing.enableProxy"
  - version: 8.0.0
    date: 2026-01-21
    changes: "התחלת תיעוד"
author: aymericzip
---

# תוסף Vite intlayer

התוסף `intlayer` הוא נקודת הכניסה היחידה לשילוב Intlayer ביישום Vite. רשום אותו פעם אחת והכל עובד ישירות מהקופסה: הידור מילונים, כינויי מודולים, מעקב בשרת הפיתוח, תוכנת תיווך לניתוב שפות ואופטימיזציות לבניית ייצור.

## שימוש

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
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` מרחיב את `GetConfigurationOptions` (ראה `@intlayer/config`) עם השדות הנוספים הבאים:

| אפשרות          | טיפוס                           | ברירת מחדל  | תיאור                                                                                                                  |
| --------------- | ------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | תבניות קריאה נוספות עבור חבילות מתאמי תאימות (כגון `@intlayer/react-i18next`). מועברות למנתח השימוש בשדות בזמן הבנייה. |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | אפשרויות המועברות לפרוקסי ניתוב השפות המאוגד. השתמש ב-`ignore` כדי להחריג נתיבים מסוימים (כגון נתיבי API) מניתוב שפות. |

כל שאר האפשרויות (`override`, `configFile`, …) מועברות ישירות ל-`getConfiguration()`.

### דוגמאות

#### החרגת נתיבי API מניתוב שפות

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

#### שימוש בנתיב מותאם אישית לקובץ התצורה

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### שימוש עם קריאות תאימות (compat-adapter callers)

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## מה התוסף עושה

### 1. הכנת מילונים

לפני תחילת הבנייה (ופעם בשעה במצב פיתוח), `intlayer` קורא ל-`prepareIntlayer` כדי להדר את כל קובצי `.content.ts` לקובצי מילון JSON מותאמים המאוחסנים ב-`.intlayer/`.

### 2. כינויי מודולים (Module aliases)

התוסף מוסיף כינויי פיענוח (resolve aliases) ב-Vite כך ש-`import { myDict } from 'intlayer/dictionaries/my-dict'` מתפענח לקובץ ה-JSON המהודר בדיסק. בניית SSR משתמשת ב-`ssr.noExternal` כדי להבטיח שכל חבילות `@intlayer/*` מאוגדות עם הכינויים שהוחלו.

### 3. מעקב שרת פיתוח (Dev-server watcher)

במצב פיתוח מופעל מעקב באמצעות `chokidar`. כאשר קובץ `.content.ts` משתנה, המילונים מהודרים מחדש ומנגנון ה-HMR של Vite מפיץ את העדכון לדפדפן.

### 4. פרוקסי ניתוב שפות מאוגד (גרסאות 9+)

החל מגרסה 9 של Intlayer, תוכנת התיווך `intlayerProxy` נרשמת אוטומטית בתוך `intlayer()`. היא מטפלת ב:

- זיהוי שפה מתוך קידומת ה-URL, עוגיות וכותרת `Accept-Language`.
- הפניות 301 כאשר השפה שזוהתה אינה תואמת ל-URL הנוכחי.
- שכתוב כתובות URL פנימי כך שהפריימוורק מזהה את פרמטר הנתיב `[locale]` הנכון.

הפרוקסי נשלט באמצעות `routing.enableProxy` (ברירת מחדל `true`) בתצורת ה-Intlayer שלך. כדי להשבית אותו לחלוטין:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

להתאמת התנהגות הפרוקסי ללא קריאה נפרדת ל-`intlayerProxy()`, העבר אפשרויות `proxy` לתוסף הראשי:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

עיין ב-[תיעוד intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vite-intlayer/intlayerProxy.md) לעיון בהתנהגות הניתוב המלאה.

- [תיעוד intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vite-intlayer/intlayerProxy.md)

### 5. מהדר מאוגד (גרסאות 9+)

כאשר `compiler.enabled` מוגדר כ-`true` **וגם** `compiler.output` מוגדר בתצורת ה-Intlayer שלך, `intlayer()` רושם את `intlayerCompiler` אוטומטית. המהדר מחלץ הצהרות תוכן מוטבעות שנכתבו ישירות בתוך קובצי הרכיבים וכותב אותן למילונים בזמן הטרנספורמציה (transform time). עיין ב-[תיעוד intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vite-intlayer/intlayerCompiler.md).

- [תיעוד intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vite-intlayer/intlayerCompiler.md)

### 6. אופטימיזציות בנייה

במהלך בניית ייצור (production build) התוסף מוסיף:

- **intlayerOptimize** – טרנספורמציית Babel המשכתבת את `useIntlayer('key')` ל-`useDictionary(hash)` ומזריקה ייבויי JSON ישירים.
- **intlayerPrune** – מסיר שדות תוכן שאינם בשימוש מתוך ה-JSON של המילון.
- **intlayerMinify** – דוחס את ה-JSON של המילון ובאופן אופציונלי מקצר שמות שדות.

אופטימיזציות אלו אינן פעילות במצב פיתוח.

## כינויים מיושנים (Deprecated aliases)

| ייצוא מיושן      | תחליף      |
| ---------------- | ---------- |
| `intlayerPlugin` | `intlayer` |
| `intLayerPlugin` | `intlayer` |
