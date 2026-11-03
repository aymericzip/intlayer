---
createdAt: 2026-06-25
updatedAt: 2026-11-03
priority: 5
title: "תיעוד חבילת @intlayer/babel"
description: "תוספי Babel עבור Intlayer לטיפול בחילוץ תוכן, אופטימיזציית ייבוא, גיזום שדות שאינם בשימוש וערבול (mangling) של שמות שדות במהלך הבנייה."
keywords:
  - "@intlayer/babel"
  - babel
  - תוסף
  - בינאום
  - i18n
  - מהדר
  - אופטימיזציה
  - purge
  - מיניפיקציה
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "תיעוד מאוחד עבור כל הייצואים (exports)"
author: aymericzip
---

# חבילת @intlayer/babel

חבילת `@intlayer/babel` מספקת סט תוספי Babel ייעודיים עבור Intlayer. תוספים אלה מכסים את מחזור הבנייה המלא: חילוץ הצהרות תוכן, שכתוב קריאות `useIntlayer` / `getIntlayer` לייבויי מילונים מותאמים (optimized), גיזום שדות שאינם בשימוש ומיניפיקציה של שמות שדות.

## התקנה

```bash
npm install @intlayer/babel
```

## ייצואים (Exports)

ייבוא:

```ts
import { ... } from "@intlayer/babel";
```

### תוספים (Plugins)

| פונקציה / מחלקה                | תיאור                                                                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | תוסף Babel המחלץ תוכן הניתן לתרגום מקובצי המקור ומזריק hooks של `useIntlayer` / `getIntlayer` באופן אוטומטי. מיועד לשימוש עם Next.js וכלי בנייה מבוססי Babel.        |
| `intlayerOptimizeBabelPlugin`  | תוסף Babel המתמיר קריאות `useIntlayer` ו-`getIntlayer` ומשכתב את הייבואים שלהן לייבויי מילוני JSON מותאמים (סטטיים, דינמיים או באמצעות fetch).                       |
| `intlayerPurgeBabelPlugin`     | תוסף Babel המנתח קובצי מקור ומשכתב קובצי JSON מקומפלים של מילונים כדי להסיר שדות שאינם בשימוש (`build.purge`) או לשנות את שמם לכינויים קצרים (`build.minify`).       |
| `intlayerMinifyBabelPlugin`    | תוסף Babel המשכתב קובצי מקור כדי להשתמש בכינויי השדות הקצרים שהוקצו במהלך שלב המיניפיקציה (למשל `content.title` ← `content.a`). מסתמך על `intlayerPurgeBabelPlugin`. |
| `makeFieldRenameBabelPlugin`   | פונקציית factory המייצרת תוסף Babel לשינוי שמות גישה לשדות תוכן של מילון בקובצי מקור בהתאם ל-`dictionaryKeyToFieldRenameMap` שמאוכלס ב-`PruneContext`.               |
| `makeUsageAnalyzerBabelPlugin` | פונקציית factory המייצרת תוסף Babel לניתוח השימוש ב-`useIntlayer` / `getIntlayer` בקוד המקור ואיסוף נתוני השימוש בשדות בתוך ה-`PruneContext` המשותף.                 |
| `getSharedPruneContext`        | פונקציית עזר המחזירה את אובייקט ה-`PruneContext` המשותף עבור תיקיית הבסיס שצוינה, או `null` אם טרם אותחל.                                                            |

### כלי עזר לתצורת תוספים

| פונקציה                    | תיאור                                                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | טוענת את תצורת Intlayer ומחזירה `ExtractPluginOptions` מוכנות לשימוש עם `intlayerExtractBabelPlugin`.                      |
| `getOptimizePluginOptions` | טוענת את תצורת Intlayer ומילונים מקומפלים, ומחזירה `OptimizePluginOptions` מוכנות לשימוש עם `intlayerOptimizeBabelPlugin`. |
| `getPurgePluginOptions`    | טוענת את תצורת Intlayer ומחזירה `PurgePluginOptions` מוכנות לשימוש עם `intlayerPurgeBabelPlugin`.                          |
| `getMinifyPluginOptions`   | טוענת את תצורת Intlayer ומחזירה `MinifyPluginOptions` מוכנות לשימוש עם `intlayerMinifyBabelPlugin`.                        |

### טיפוסים (Types)

| טיפוס                   | תיאור                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `CompilerMode`          | מצב המהדר: `'dev'` לפיתוח עם תמיכה ב-HMR, או `'build'` לבניות ייצור (production).                      |
| `ExtractPluginOptions`  | אפשרויות עבור `intlayerExtractBabelPlugin`: רשימת קבצים, תצורה, callback של `onExtract` וכו'.          |
| `ExtractResult`         | תוצאת החילוץ: מפתח מילון, נתיב קובץ, תוכן ושפה.                                                        |
| `OptimizePluginOptions` | אפשרויות עבור `intlayerOptimizeBabelPlugin`: נתיבי מילונים, מצב ייבוא, מפת מצבים לכל מילון וכו'.       |
| `PurgePluginOptions`    | אפשרויות עבור `intlayerPurgeBabelPlugin`: תיקיית בסיס, דגלי purge/minify/optimize, רשימת קובצי רכיבים. |
| `MinifyPluginOptions`   | אפשרויות עבור `intlayerMinifyBabelPlugin`: תיקיית בסיס, דגלי minify/optimize/editorEnabled.            |
| `PruneContext`          | מצב משותף בין תוספי ניתוח וגיזום: מפות שימוש בשדות, מפות שינוי שמות וכו'.                              |
| `DictionaryFieldUsage`  | תוצאת שימוש בשדות עבור מילון בודד: `Set<string>` או `'all'` כאשר הניתוח הסטטי אינו חד-משמעי.           |
| `NestedRenameEntry`     | צומת בעץ שינוי השמות: ה-shortName ומפת הילדים (children map).                                          |
| `NestedRenameMap`       | רמה אחת בעץ שינוי השמות: `Map<string, NestedRenameEntry>`.                                             |
| `CompatCallerConfig`    | תצורה עבור מנתח שימוש תואם עבור חבילות מתאמי תאימות (compat-adapter) (שם הקורא ואפשרויות עיבוד).       |
| `ScriptBlock`           | בלוק סקריפט שחולץ מקובץ SFC (Vue או Svelte): תוכן, היסט התחלה (start offset) והיסט סיום.               |

### פונקציות עזר

| פונקציה                           | תיאור                                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | ממירה מספר שלם (החל מאפס) למזהה אלפביתי קצר: `0` ← `'a'`, `25` ← `'z'`, `26` ← `'aa'` וכו'.                             |
| `buildNestedRenameMapFromContent` | בונה באופן רקורסיבי `NestedRenameMap` מערך התוכן של מילון מקומפל, תוך שמירה על מבני צומתי Intlayer (תרגום, ריבוי וכו'). |
| `createPruneContext`              | יוצרת אובייקט `PruneContext` ריק חדש המאותחל עם ערכי ברירת מחדל.                                                        |
| `extractScriptBlocks`             | מחלצת בלוקי `<script>` מקובצי SFC (Vue / Svelte) עבור ניתוח Babel עוקב.                                                 |
| `BABEL_PARSER_OPTIONS`            | קבוע המייצג את אפשרויות המנתח של Babel המכסות את הפריימוורקים הנתמכים (React/Vue/Svelte/Angular/...).                   |
| `INTLAYER_CALLER_NAMES`           | רשימה קבועה של שמות קוראים מקוריים של Intlayer: `['useIntlayer', 'getIntlayer']`.                                       |

## דוגמת שימוש

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **הערה:** יש להצהיר על `intlayerPurgeBabelPlugin` **לפני** `intlayerMinifyBabelPlugin`, מכיוון שהאחרון קורא את מפת שינוי השמות שנבנתה על ידי הראשון. בנוסף, על שניהם להיות מוקדמים על ידי `intlayerOptimizeBabelPlugin` כדי שיוכל לראות את מפתחות המילון לפני שקריאות `useIntlayer` משוכתבות.
