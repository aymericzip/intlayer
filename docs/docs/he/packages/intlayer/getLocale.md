---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getLocale | intlayer"
description: "השתמש ב-getLocale כדי לזהות את השפה מתוך מחרוזת כגון כתובת URL או נתיב, עם חזרה לשפת ברירת המחדל שלך."
keywords:
  - getLocale
  - תרגום
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד הפונקציה getLocale

הפונקציה `getLocale` מאפשרת לך לזהות את השפה (locale) מתוך מחרוזת נתונה, כגון כתובת URL או נתיב.

## שימוש

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// פלט: 'fr'
```

## פרמטרים

| פרמטר  | טיפוס    | תיאור                                    |
| ------ | -------- | ---------------------------------------- |
| `path` | `string` | הנתיב או המחרוזת שמתוכם יש לחלץ את השפה. |

## ערך מוחזר

השפה שזוהתה, או שפת ברירת המחדל אם לא זוהתה שפה.
