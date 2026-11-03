---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת solid-intlayer
description: שילוב מותאם ל-Solid עבור Intlayer, המספק ספקים והוקים עבור יישומי Solid.
keywords:
  - solid-intlayer
  - solidjs
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
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

# חבילת solid-intlayer

חבילת `solid-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Solid. היא כוללת ספקים והוקים לטיפול בתוכן רב-לשוני.

## התקנה

```bash
npm install solid-intlayer
```

## ייצואים

### ספק (Provider)

ייבוא:

```tsx
import "solid-intlayer";
```

| רכיב               | תיאור                                                         | תיעוד קשור                                                                                                                    |
| ------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | הספק הראשי שעוטף את היישום שלך ומספק את הקונטקסט של Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/solid-intlayer/IntlayerProvider.md) |

### הוקים (Hooks)

ייבוא:

```tsx
import "solid-intlayer";
```

| הוק                    | תיאור                                                                                      | תיעוד קשור                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | מבוסס על `useDictionary`, אך מזריק גרסה מותאמת ביצועים של המילון מתוך ההצהרה שנוצרה.       | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | מעבד אובייקטים הדומים למילונים (מפתח, תוכן). מעבד תרגומי `t()`, ריבוי (enumerations) ועוד. | -                                                                                                                       |
| `useDictionaryAsync`   | זהה ל-`useDictionary`, אך מטפל במילונים אסינכרוניים.                                       | -                                                                                                                       |
| `useDictionaryDynamic` | זהה ל-`useDictionary`, אך מטפל במילונים דינמיים.                                           | -                                                                                                                       |
| `useLocale`            | מחזיר את השפה הנוכחית ופונקציה להגדרתה.                                                    | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/solid-intlayer/useLocale.md)         |
| `usePathname`          | מחזיר את הנתיב הנוכחי כ-`Accessor<string>` כאשר מקטע השפה מוסר. מגיב ל-`popstate`.         | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/solid-intlayer/usePathname.md)     |
| `useRewriteURL`        | הוק צד-לקוח לניהול שכתוב כתובות URL. מעדכן אוטומטית את ה-URL אם קיים כלל שכתוב מקומי.      | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | מחזיר את אובייקט ה-Intl עבור השפה הנוכחית.                                                 | -                                                                                                                       |
| `useLoadDynamic`       | הוק לטעינת מילונים דינמיים.                                                                | -                                                                                                                       |
| `t`                    | בוחר תוכן בהתבסס על השפה הנוכחית.                                                          | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md)                  |

### רכיבים

ייבוא:

```tsx
import "solid-intlayer";
```

| רכיב               | תיאור                             |
| ------------------ | --------------------------------- |
| `MarkdownProvider` | ספק עבור קונטקסט רינדור Markdown. |
