---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getTranslation | intlayer"
description: "השתמש ב-getTranslation (כינוי: t) כדי לבחור את התוכן של שפה נתונה מתוך מפת תרגומים, עם חזרה לשפת ברירת המחדל."
keywords:
  - getTranslation
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
  - getTranslation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תיעוד: הפונקציה `getTranslationContent` ב-`intlayer`

## תיאור

הפונקציה `getTranslation` (המוכרת גם בכינוי `t` או `getTranslationContent`) מאחזרת את התוכן המתאים לשפה ספציפית מתוך קבוצת תכנים מותאמת לשפות. אם השפה שצוינה אינה נמצאת, היא חוזרת כברירת מחדל ומחזירה את התוכן של שפת ברירת המחדל המוגדרת בפרויקט.

לפרטים נוספים על אופן הגדרת תרגומים, עיין ב-[תיעוד Translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/translation.md).

- [תיעוד Translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/translation.md)

## פרמטרים

- `languageContent: CustomizableLanguageContent<Content>`
  - **תיאור**: אובייקט המכיל תרגומים עבור שפות שונות. כל מפתח מייצג שפה, וערכו הוא התוכן התואם.
  - **סוג**: `CustomizableLanguageContent<Content>`
    - `Content` יכול להיות מכל סוג, ברירת המחדל היא `string`.

- `locale: Locales`
  - **תיאור**: השפה שעבורה יש לאחזר את התוכן.
  - **סוג**: `Locales`

## ערך מוחזר

- **סוג**: `Content`
- **תיאור**: התוכן המתאים לשפה שצוינה. אם השפה אינה נמצאת, מוחזר התוכן של שפת ברירת המחדל.

## דוגמאות שימוש

### שימוש בסיסי

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // פלט: "Hello"
```

### שפה חסרה:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // פלט: "Hello" (תוכן שפת ברירת המחדל)
```

### שימוש בטיפוסי תוכן מותאמים אישית:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    he: { greeting: "שלום" },
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // פלט: "Bonjour"
```

## מקרי קצה

- **שפה לא נמצאה:**
  - כאשר ה-`locale` לא נמצא בתוך `languageContent`, הפונקציה מחזירה את התוכן עבור שפת ברירת המחדל.
- **תוכן שפה חלקי:**
  - אם שפה מוגדרת באופן חלקי, הפונקציה אינה ממזגת תכנים. היא מאחזרת במדויק את הערך של השפה שצוינה או חוזרת לברירת המחדל.
- **אכיפת TypeScript:**
  - אם השפות ב-`languageContent` אינן תואמות את תצורת הפרויקט, TypeScript יאכוף הגדרה של כל שפות החובה, מה שמבטיח שהתוכן שלם ובטוח מבחינת טיפוסים.
