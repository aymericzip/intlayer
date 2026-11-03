---
createdAt: 2026-06-25
updatedAt: 2026-11-03
priority: 5
title: תיעוד תוסף Vite intlayerCompiler | vite-intlayer
description: תוסף Vite המחלץ הצהרות תוכן מוטבעות של Intlayer מקובצי רכיבים וכותב אותן לקובצי מילון JSON בזמן בנייה וטרנספורמציה.
keywords:
  - intlayerCompiler
  - vite
  - תוסף
  - מהדר
  - compiler
  - תוכן
  - מילון
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "אוגד בתוך intlayer(); התחלת תיעוד"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` הוא תוסף Vite הסורק קובצי מקור של רכיבים לאיתור **הצהרות תוכן מוטבעות של Intlayer**, תוכן המוגדר ישירות בתוך רכיב ולא בקובץ `.content.ts` נפרד, וכותב אותן לקובצי JSON של מילונים במהלך שלב הטרנספורמציה (transform phase).

> **החל מ-Intlayer גרסה 9** `intlayerCompiler` נכלל אוטומטית בתוך תוסף ה-[`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vite-intlayer/intlayer.md) הראשי כאשר גם `compiler.enabled` מוגדר כ-`true` וגם `compiler.output` מוגדר בתצורת ה-Intlayer שלך. עליך לרשום אותו בנפרד רק כאשר אתה מעוניין בשליטה מלאה על תצורה ייעודית של המהדר.

- [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vite-intlayer/intlayer.md)

## שימוש

### כחלק מ-`intlayer()` (מומלץ, גרסאות 9+)

הפעל את המהדר דרך תצורת ה-Intlayer שלך:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // היכן שנכתבים המילונים שחולצו
  },
});
```

לאחר מכן השתמש בתוסף הסטנדרטי ללא רישום נוסף:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### באופן עצמאי (כאשר נדרש)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## אפשרויות (Options)

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| אפשרות           | טיפוס                     | תיאור                                                                            |
| ---------------- | ------------------------- | -------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | דריסות תצורת Intlayer המועברות ל-`getConfiguration()`.                           |
| `compilerConfig` | `Partial<CompilerConfig>` | דריסות עבור החלק הייעודי למהדר בתצורה (לדוגמה `enabled`, `output`, `filesList`). |

### דוגמה

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## כיצד זה עובד

### שלב הטרנספורמציה (Transform phase)

עבור כל קובץ מקור התואם ל-`compiler.filesList`, תוסף המהדר:

1. מעביר את תוכן הקובץ דרך `extractContent` מתוך `@intlayer/babel`.
2. קורא ל-`onExtract` עבור כל הצהרה שנמצאה, אשר כותבת את מילון ה-JSON שנוצר אל `compiler.output`.
3. מחזיר את קוד המקור המותמר כאשר ההצהרות המוטבעות מוחלפות בקריאות סטנדרטיות של `useIntlayer('key')` / `getIntlayer('key')`.

סוגי קבצים נתמכים: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

כאשר קובץ רכיב נשמר במצב פיתוח, המהדר:

1. מזהה את השינוי בקובץ באמצעות הוק ה-`handleHotUpdate` של Vite.
2. מחלץ מחדש את התוכן מהקובץ המעודכן.
3. כותב את ה-JSON של המילון המעודכן.
4. מפעיל טעינה מחדש מלאה של הדף (`server.ws.send({ type: 'full-reload' })`).

השהיה (debounce) של 500 מילי-שניות מונעת מכתיבת המילון עצמה (שגם מפעילה אירוע שינוי קובץ) לגרום ללולאה אינסופית של חילוץ מחדש.

### מניעת כפילויות (Deduplication)

`intlayerCompiler` משתמש באותו מנגנון `createPrimaryInstanceGuard` למניעת כפילויות כמו שאר התוספים המאוגדים. כאשר גם `intlayer()` (המאגד את המהדר) וגם קריאה ידנית ל-`intlayerCompiler()` קיימים, רק המופע הראשון שנרשם ירוץ, ושום מילון לא ייכתב פעמיים.
