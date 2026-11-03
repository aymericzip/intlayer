---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getEnumeration | intlayer"
description: "השתמש ב-getEnumeration (כינוי: enu) כדי לבחור תוכן התואם לכמות מתוך אובייקט ריבוי (enumeration), בהתבסס על התנאים שלו."
keywords:
  - getEnumeration
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
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getEnumeration` ב-`intlayer`

## תיאור

הפונקציה `getEnumeration` (המוכרת גם בכינוי `enu`) מאחזרת תוכן המתאים לכמות מסוימת בהתבסס על תנאים שהוגדרו מראש באובייקט ריבוי (enumeration). התנאים מוגדרים כמפתחות, והעדיפות שלהם נקבעת לפי סדר הופעתם באובייקט.

לפרטים נוספים על אופן הגדרת ריבוי (enumerations), עיין ב-[תיעוד Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/enumeration.md).

- [תיעוד Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/enumeration.md)

## פרמטרים

- `enumerationContent: QuantityContent<Content>`
  - **תיאור**: אובייקט שבו המפתחות מייצגים תנאים (למשל `<=`, `<`, `>=`, `=`) והערכים מייצגים את התוכן המתאים. סדר המפתחות מגדיר את עדיפות ההתאמה שלהם.
  - **סוג**: `QuantityContent<Content>`
    - `Content` יכול להיות מכל סוג.

- `quantity: number`
  - **תיאור**: הערך המספרי המשמש להתאמה מול התנאים בתוך `enumerationContent`.
  - **סוג**: `number`

## ערך מוחזר

- **סוג**: `Content`
- **תיאור**: התוכן המתאים לתנאי הראשון שנמצא תואם בתוך ה-`enumerationContent`. אם לא נמצאה התאמה, ההתנהגות נקבעת לפי המימוש (למשל שגיאה או תוכן גיבוי).

## דוגמאות שימוש

### שימוש בסיסי

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "You have less than -2.3",
    "<1": "You have less than one",
    "2": "You have two",
    ">=3": "You have three or more",
  },
  2
);

console.log(content); // פלט: "You have two"
```

### עדיפות של תנאים

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four",
    "2": "You have two",
  },
  2
);

console.log(content); // פלט: "You have less than four"
```

## מקרי קצה

- **אין תנאי תואם:**
  - אם אף תנאי אינו תואם לכמות שסופקה, הפונקציה תחזיר `undefined` או תטפל בתרחיש ברירת המחדל/גיבוי באופן מפורש.

- **תנאים חופפים:**
  - אם תנאים חופפים זה לזה, התנאי התואם הראשון (לפי סדר האובייקט) יקבל עדיפות.

- **מפתחות לא תקינים:**
  - הפונקציה מניחה שכל המפתחות ב-`enumerationContent` תקינים וניתנים לפענוח כתנאים. מפתחות לא תקינים או מעוצבים בצורה שגויה עלולים להוביל להתנהגות בלתי צפויה.

- **אכיפת TypeScript:**
  - הפונקציה מבטיחה שטיפוס ה-`Content` יהיה עקבי בכל המפתחות, ומאפשרת בטיחות טיפוסים (type safety) עבור התוכן המאוחזר.

## הערות

- כלי העזר `findMatchingCondition` משמש לקביעת התנאי המתאים על בסיס הכמות הנתונה.
