---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: "תיעוד חבילת fastify-intlayer"
description: "תוסף Fastify עבור Intlayer, המספק פונקציות תרגום וזיהוי שפה."
keywords:
  - fastify-intlayer
  - fastify
  - תוסף
  - plugin
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד עבור כל הייצואים (exports)"
author: aymericzip
---

# חבילת fastify-intlayer

חבילת `fastify-intlayer` מספקת תוסף עבור אפליקציות Fastify לניהול בינאום. היא מזהה את שפת המשתמש ומעטרת (decorates) את אובייקט הבקשה.

## התקנה

```bash
npm install fastify-intlayer
```

## ייצואים (Exports)

### תוסף (Plugin)

ייבוא:

```tsx
import "fastify-intlayer";
```

| פונקציה    | תיאור                                                                                                                                                                                                                                                  | תיעוד קשור                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | תוסף Fastify המשלב את Intlayer באפליקציית ה-Fastify שלך. מטפל בזיהוי שפה מאחסון (עוגיות, כותרות), מעטר את אובייקט הבקשה בנתוני `intlayer` הכוללים את `t`, `getIntlayer` ו-`getDictionary`, ומגדיר מרחב שמות CLS לגישה פרוגרמטית במהלך מחזור חיי הבקשה. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/fastify-intlayer/intlayer.md) |

### פונקציות

ייבוא:

```tsx
import "fastify-intlayer";
```

| פונקציה         | תיאור                                                                                                                                                                                                   | תיעוד קשור                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | פונקציית תרגום גלובלית המאחזרת תוכן עבור השפה הנוכחית ב-Fastify. עושה שימוש ב-CLS (Async Local Storage) וחייבת לפעול בתוך הקשר בקשה המנוהל על ידי תוסף `intlayer`. ניתנת לגישה גם דרך `req.intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md) |
| `getIntlayer`   | מאחזרת מילון לפי המפתח שלו מתוך ההצהרה שנוצרה ומחזירה את התוכן שלו עבור השפה שצוינה. גרסה מותאמת של `getDictionary`. משתמשת ב-CLS לגישה להקשר הבקשה. ניתנת לגישה גם דרך `req.intlayer.getIntlayer`.     | -                                                                                                      |
| `getDictionary` | מעבדת אובייקטי מילון ומחזירה תוכן עבור השפה שצוינה. מעבדת תרגומי `t()`, ריבוי, markdown, HTML וכו'. משתמשת ב-CLS לגישה להקשר הבקשה. ניתנת לגישה גם דרך `req.intlayer.getDictionary`.                    | -                                                                                                      |
