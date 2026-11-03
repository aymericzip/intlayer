---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getPathWithoutLocale | intlayer"
description: "השתמש ב-getPathWithoutLocale כדי להסיר את מקטע השפה מתוך כתובת URL או שם נתיב, עבור כתובות URL מוחלטות ונתיבים יחסיים כאחד."
keywords:
  - getPathWithoutLocale
  - תרגום
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getPathWithoutLocale` ב-`intlayer`

## תיאור

מסירה את מקטע השפה (locale segment) מתוך כתובת ה-URL או שם הנתיב הנתון, אם הוא קיים. היא פועלת הן עם כתובות URL מוחלטות והן עם שמות נתיבים יחסיים.

## פרמטרים

- `inputUrl: string`
  - **תיאור**: מחרוזת ה-URL המלאה או שם הנתיב לעיבוד.
  - **סוג**: `string`

- `locales: Locales[]`
  - **תיאור**: מערך אופציונלי של שפות נתמכות. ברירת המחדל היא השפות המוגדרות בפרויקט.
  - **סוג**: `Locales[]`

## ערך מוחזר

- **סוג**: `string`
- **תיאור**: מחרוזת ה-URL או שם הנתיב ללא מקטע השפה.

## דוגמאות שימוש

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // פלט: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // פלט: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // פלט: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // פלט: "https://example.com/dashboard"
```
