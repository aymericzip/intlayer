---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getLocaleName | intlayer"
description: "השתמש ב-getLocaleName כדי לקבל את שמה של שפה בשפה אחרת, למשל 'French' או 'français', כדי לתייג בורר שפות."
keywords:
  - getLocaleName
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
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: "הוספת פוליפילים (polyfills) עבור React Native וסביבות ישנות יותר"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getLocaleName` ב-`intlayer`

## תיאור

הפונקציה `getLocaleName` מחזירה את השם המתורגם של שפה נתונה (`targetLocale`) בשפת התצוגה (`displayLocale`). אם לא סופקה `targetLocale`, היא מחזירה את שמה של `displayLocale` בשפה שלה עצמה.

## פרמטרים

- `displayLocale: Locales`
  - **תיאור**: השפה שבה יוצג שמה של שפת היעד.
  - **סוג**: Enum או מחרוזת המייצגים שפות תקינות.

- `targetLocale?: Locales`
  - **תיאור**: השפה שאת שמה מעוניינים לתרגם.
  - **סוג**: אופציונלי. Enum או מחרוזת המייצגים שפות תקינות.

## ערך מוחזר

- **סוג**: `string`
- **תיאור**: השם המתורגם של `targetLocale` ב-`displayLocale`, או שמה העצמי של `displayLocale` אם `targetLocale` לא סופקה. אם לא נמצא תרגום, היא מחזירה `"Unknown locale"`.

## דוגמאות שימוש

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // פלט: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // פלט: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // פלט: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // פלט: "English"

getLocaleName(Locales.FRENCH); // פלט: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // פלט: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // פלט: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // פלט: "French"

getLocaleName(Locales.CHINESE); // פלט: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // פלט: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // פלט: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // פלט: "Chinese"

getLocaleName("unknown-locale"); // פלט: "Unknown locale"
```

## מקרי קצה

- **לא סופק `targetLocale`:**
  - הפונקציה מחזירה כברירת מחדל את שמה של `displayLocale` בשפתה שלה.
- **תרגומים חסרים:**
  - אם `localeNameTranslations` אינו מכיל רשומה עבור `targetLocale` או עבור `displayLocale` הספציפית, הפונקציה חוזרת ל-`ownLocalesName` או מחזירה `"Unknown locale"`.

## פוליפילים עבור React Native וסביבות ישנות יותר

הפונקציה `getLocaleName` מסתמכת על ה-API של `Intl.DisplayNames`, אשר אינו זמין ב-React Native או בסביבות JavaScript ישנות יותר. אם אתה משתמש ב-`getLocaleName` בסביבות אלו, עליך להוסיף פוליפילים (polyfills).

ייבא את הפוליפילים בשלב מוקדם באפליקציה שלך, רצוי בקובץ נקודת הכניסה (למשל, `index.js`, `App.tsx` או `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

לפרטים נוספים, עיין ב-[תיעוד הפוליפילים של FormatJS](https://formatjs.io/docs/polyfills/intl-displaynames/).
