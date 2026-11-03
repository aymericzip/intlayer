---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד תוסף Vite intlayerPrune | vite-intlayer
description: תוסף Vite המסיר שדות מילון שאינם בשימוש (Tree-shaking) מחבילת הייצור כדי להקטין את גודל ה-bundle.
keywords:
  - intlayerPrune
  - vite
  - תוסף
  - tree-shaking
  - גודל bundle
  - מילון
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "הרחבה עם ניפוי ברמת השדות, pruneContext ופרטי מקרי קצה"
  - version: 8.0.0
    date: 2026-01-21
    changes: "התחלת תיעוד"
author: aymericzip
---

# intlayerPrune

`intlayerPrune` הוא תוסף Vite המסיר שדות תוכן שאינם בשימוש מקובצי JSON של מילונים מהודרים במהלך בניית ייצור (production build). במקום לשלוח כל שדה מכל מילון, רק השדות שניגשים אליהם בפועל בקוד המקור שלך נכללים ב-bundle.

> התוסף כבר כלול ומוגדר אוטומטית בעת שימוש ב-[`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md). עליך לרשום אותו ידנית רק אם אתה מרכיב את מחסנית התוספים בעצמך.

- [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md)

## שימוש

### כחלק מ-`intlayer()` (מומלץ)

הפעל ניפוי (pruning) דרך תצורת ה-Intlayer שלך והתוסף הראשי יטפל בהכל:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // מפעיל הן את prune והן את minify
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### באופן עצמאי

אם אתה מרכיב את מחסנית התוספים ידנית, `intlayerPrune` ו-`intlayerMinify` חולקים אובייקט `PruneContext` שיש ליצור פעם אחת ולהעביר לשניהם:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // אופציונלי, קורא מאותו הקונטקסט
  ],
});
```

## כיצד זה עובד

### 1. ניתוח שימוש (buildStart)

במהלך `buildStart`, תוסף ה-`intlayerOptimize` (שגם מהווה חלק מ-`intlayer()`) סורק כל קובץ מקור של רכיב הרשום ב-`build.filesList`. עבור כל קריאה ל-`useIntlayer('key')` או ל-`getIntlayer('key')`, הוא מתעד בדיוק לאילו שדות מתבצעת גישה, לדוגמה:

```ts
const { title, description } = useIntlayer("myDict");
// מתעד: myDict → { title, description }
```

פעולה זו בונה את `pruneContext.fieldUsageMap` לפני שרצות קריאות `transform` כלשהן.

### 2. ניפוי JSON‏ (transform, enforce: 'pre')

כאשר Vite מעבד קובץ מילון JSON מהודר, `intlayerPrune` מיירט אותו לפני המרת ה-JSON המובנית של Vite ל-ESM. הוא קורא את מפת השימוש בשדות מתוך `pruneContext` ומסיר כל שדה תוכן שאינו בקבוצת השימוש המתועדת.

שני מבני תוכן נתמכים:

- **מילונים סטטיים**: `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. שדות מנופים לפי שפה בתוך `translation`.
- **מילונים דינמיים (לפי שפה)**: שטוחים `{ fieldA: ..., fieldB: ... }`. שדות מנופים ברמה העליונה.

### 3. מקרי קצה

אם לא ניתן לזהות את מבנה התוכן של מילון מסוים (למשל מבנה מקונן חריג), הוא מתווסף ל-`pruneContext.dictionariesWithEdgeCases` ו**נשאר ללא שינוי**. נרשמת אזהרה בלוג. תוסף ה-`intlayerMinify` מדלג גם הוא על מילונים אלה.

### 4. מפת שינוי שמות שדות (Field-rename map)

כאשר הניפוי מצליח, `intlayerPrune` כותב גם את `pruneContext.dictionaryKeyToFieldRenameMap`, מיפוי משמות השדות המקוריים לכינויים קצרים. `intlayerMinify` קורא מפה זו כדי לשנות שמות שדות ב-JSON הסופי, ומעבר ה-rename של Babel ב-`intlayerOptimize` מעדכן בהתאם את גישות המאפיינים בקובצי המקור.

## תנאי הפעלה

`intlayerPrune` פעיל **רק** כאשר כל התנאים הבאים מתקיימים:

1. פקודת ה-Vite היא `build`.
2. `build.optimize` מוגדר כ-`true` (או `undefined`, שמוגדר כברירת מחדל כ-`true` עבור בנייה).
3. `build.purge` מוגדר כ-`true` בתצורת ה-Intlayer שלך.

הוא נשאר פעיל כאשר `editor.enabled` מוגדר כ-`true`: העורך הוויזואלי מפענח כל עריכה באמצעות `dictionaryKey` + `keyPath` מול המילונים הבלתי ממוזגים, שתוסף זה לעולם אינו נוגע בהם, ושדה שנופה הוא שדה שאף רכיב אינו קורא, ולכן הוא לעולם אינו מרונדר ולעולם אינו ניתן לבחירה בדף.
