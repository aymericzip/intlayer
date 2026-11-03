---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getLocaleLang | intlayer"
description: "השתמש ב-getLocaleLang כדי לחלץ את קוד השפה מתוך מחרוזת שפה (locale) כגון en-US, עם או בלי קוד מדינה."
keywords:
  - getLocaleLang
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
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getLocaleLang` ב-`intlayer`

## תיאור

הפונקציה `getLocaleLang` מחלצת את קוד השפה מתוך מחרוזת locale. היא תומכת בשפות עם או בלי קודי מדינה. אם לא מסופקת שפה, היא מחזירה כברירת מחדל מחרוזת ריקה.

## פרמטרים

- `locale?: Locales`
  - **תיאור**: מחרוזת השפה (למשל, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) שמתוכה מחולץ קוד השפה.
  - **סוג**: `Locales` (אופציונלי)

## ערך מוחזר

- **סוג**: `string`
- **תיאור**: קוד השפה שחולץ מתוך השפה. אם השפה אינה מסופקת, מוחזרת מחרוזת ריקה (`''`).

## דוגמאות שימוש

### חילוץ קודי שפה:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // פלט: "en"
getLocaleLang(Locales.ENGLISH); // פלט: "en"
getLocaleLang(Locales.FRENCH_CANADA); // פלט: "fr"
getLocaleLang(Locales.FRENCH); // פלט: "fr"
```

## מקרי קצה

- **לא סופקה שפה:**
  - הפונקציה מחזירה מחרוזת ריקה כאשר `locale` הוא `undefined`.

- **מחרוזות שפה שאינן תקינות:**
  - אם ה-`locale` אינו עוקב אחר הפורמט `language-country` (למשל, `Locales.ENGLISH-US`), הפונקציה מחזירה בבטחה את החלק שלפני ה-`'-'` או את המחרוזת כולה אם אין מקף `'-'`.
