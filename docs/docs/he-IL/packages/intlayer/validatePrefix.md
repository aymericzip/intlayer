---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה validatePrefix | intlayer"
description: "השתמש ב-validatePrefix כדי לבדוק אם מקטע URL הוא קידומת שפה תקינה בהתאם לתצורת Intlayer שלך."
keywords:
  - validatePrefix
  - תרגום
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד הפונקציה validatePrefix

הפונקציה `validatePrefix` בודקת אם קידומת נתונה היא קידומת שפה תקינה בהתאם לתצורה.

## שימוש

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// פלט: true
```

## פרמטרים

| פרמטר    | טיפוס    | תיאור           |
| -------- | -------- | --------------- |
| `prefix` | `string` | הקידומת לאימות. |

## ערך מוחזר

`true` אם הקידומת תקינה, אחרת `false`.
