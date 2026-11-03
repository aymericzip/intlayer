---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת preact-intlayer
description: שילוב מותאם ל-Preact עבור Intlayer, המספק ספקים והוקים עבור יישומי Preact.
keywords:
  - preact-intlayer
  - preact
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת כלי העזר usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת preact-intlayer

חבילת `preact-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Preact. היא כוללת ספקים והוקים לטיפול בתוכן רב-לשוני.

## התקנה

```bash
npm install preact-intlayer
```

## ייצואים

### ספק (Provider)

| רכיב               | תיאור                                                         |
| ------------------ | ------------------------------------------------------------- |
| `IntlayerProvider` | הספק הראשי שעוטף את היישום שלך ומספק את הקונטקסט של Intlayer. |

### הוקים (Hooks)

| הוק             | תיאור                                                                                      | תיעוד קשור                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | מבוסס על `useDictionary`, אך מזריק גרסה מותאמת של המילון מתוך ההצהרה שנוצרה.               | -                                                                                                                    |
| `useDictionary` | מעבד אובייקטים הדומים למילונים (מפתח, תוכן). מעבד תרגומי `t()`, ריבוי (enumerations) ועוד. | -                                                                                                                    |
| `useLocale`     | מחזיר את השפה הנוכחית ופונקציה להגדרתה.                                                    | -                                                                                                                    |
| `usePathname`   | הוק המחזיר את הנתיב הנוכחי עם הסרת מקטע השפה. מגיב לניווט בדפדפן דרך `popstate`.           | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/preact-intlayer/usePathname.md) |
| `t`             | בוחר תוכן בהתבסס על השפה הנוכחית.                                                          | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md)               |

### רכיבים

| רכיב               | תיאור                                        |
| ------------------ | -------------------------------------------- |
| `MarkdownProvider` | ספק עבור קונטקסט רינדור Markdown.            |
| `MarkdownRenderer` | מרנדר תוכן Markdown עם רכיבים מותאמים אישית. |
