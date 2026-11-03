---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת vite-intlayer
description: תוסף Vite עבור Intlayer, המספק כינויי מילון (aliases), מעקבים (watchers), ניתוב שפות ואופטימיזציות בנייה.
keywords:
  - vite-intlayer
  - vite
  - תוסף
  - plugin
  - בינאום
  - i18n
  - פרוקסי
  - ניתוב
  - tree-shaking
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "עדכון אינדקס ייצואים – ה-proxy וה-compiler מאוגדים כעת בתוך intlayer(); נוסף תיעוד עבור intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת vite-intlayer

חבילת `vite-intlayer` מספקת תוסף Vite לשילוב Intlayer ביישום מבוסס Vite שלך. היא מטפלת בהידור מילונים, מעקב בשרת הפיתוח (dev-server watching), כינויי מודולים (module aliases), תוכנת תיווך לניתוב שפות (locale-routing middleware), ואופטימיזציות בזמן בנייה (tree-shaking, minification).

## התקנה

```bash
npm install vite-intlayer
```

## ייצואים

### תוספים (Plugins)

ייבוא:

```ts
import { ... } from "vite-intlayer";
```

| ייצוא                      | תיאור                                                                                                                             | תיעוד קשור                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | תוסף Vite הראשי. מכין מילונים, מגדיר כינויים, מפעיל מעקבים בשרת הפיתוח, ומאגד (החל מגרסה 9) את ה-proxy וה-compiler.               | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**מיושן**) כינוי עבור `intlayer`.                                                                                                | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**מיושן**) כינוי עבור `intlayer`.                                                                                                | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | תוסף תוכנת תיווך לניתוב שפות (זיהוי, הפניה מחדש, שכתוב). החל מגרסה 9 הוא מאוגד בתוך `intlayer()` – יש לרשום בנפרד רק במקרה הצורך. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**מיושן**) כינוי עבור `intlayerProxy`.                                                                                           | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**מיושן**) כינוי עבור `intlayerProxy`.                                                                                           | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | מחלץ הצהרות תוכן מוטבעות מתוך רכיבים וכותב אותן למילונים. החל מגרסה 9 הוא מאוגד בתוך `intlayer()`.                                | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | מסיר שדות מילון שאינם בשימוש (Tree-shaking) מחבילת הייצור (production bundle).                                                    | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | מבצע דחיסה (minification) לקובצי JSON של מילונים מהודרים ובאופן אופציונלי מקצר שמות שדות (mangling).                              | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayerMinify.md)     |

### כלי עזר (Utilities)

| ייצוא                        | תיאור                                                                                    | תיעוד קשור                                                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | מחזיר תוכנת תיווך Node.js בלתי תלויה בפריימוורק `(req, res, next)` עם לוגיקת ניתוב שפות. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/vite-intlayer/intlayerProxy.md) |

### טיפוסים (Types)

| ייצוא                        | תיאור                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | אפשרויות המתקבלות על ידי `intlayer()`. מרחיב את `GetConfigurationOptions` עם `compatCallers` ו-`proxy`.       |
| `IntlayerProxyPluginOptions` | אפשרויות המתקבלות על ידי `intlayerProxy()` ו-`createIntlayerProxyHandler()`. כולל `ignore` ו-`configOptions`. |
| `IntlayerCompilerOptions`    | אפשרויות המתקבלות על ידי `intlayerCompiler()`. כולל `configOptions` ו-`compilerConfig`.                       |
| `CompatCallerConfig`         | ייצוא מחדש מ-`@intlayer/babel`. מתאר תבנית קריאה למתאם תאימות עבור ניתוח שימוש בשדות.                         |
