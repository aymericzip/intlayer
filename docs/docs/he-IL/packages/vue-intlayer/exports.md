---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת vue-intlayer
description: שילוב מותאם ל-Vue עבור Intlayer, המספק תוספים ו-composables עבור יישומי Vue.
keywords:
  - vue-intlayer
  - vue
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
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

# חבילת vue-intlayer

חבילת `vue-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Vue. היא כוללת תוסף Vue ו-composables לטיפול בתוכן רב-לשוני.

## התקנה

```bash
npm install vue-intlayer
```

## ייצואים

### תוסף (Plugin)

ייבוא:

```tsx
import "vue-intlayer";
```

| פונקציה           | תיאור                                |
| ----------------- | ------------------------------------ |
| `installIntlayer` | תוסף Vue להתקנת Intlayer ביישום שלך. |

### Composables

ייבוא:

```tsx
import "vue-intlayer";
```

| Composable             | תיאור                                                                                         | תיעוד קשור                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | מבוסס על `useDictionary`, אך מזריק גרסה מותאמת של המילון מתוך ההצהרה שנוצרה.                  | -                                                                                                                        |
| `useDictionary`        | מעבד אובייקטים הדומים למילונים (מפתח, תוכן). מעבד תרגומי `t()`, ריבוי (enumerations) ועוד.    | -                                                                                                                        |
| `useDictionaryAsync`   | זהה ל-`useDictionary`, אך מטפל במילונים אסינכרוניים.                                          | -                                                                                                                        |
| `useDictionaryDynamic` | זהה ל-`useDictionary`, אך מטפל במילונים דינמיים.                                              | -                                                                                                                        |
| `useLocale`            | מחזיר את השפה הנוכחית ופונקציה להגדרתה.                                                       | -                                                                                                                        |
| `usePathname`          | מחזיר את הנתיב הנוכחי כ-`ComputedRef<string>` כאשר מקטע השפה מוסר. מגיב ל-`popstate`.         | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vue-intlayer/usePathname.md)     |
| `useRewriteURL`        | ‏Composable צד-לקוח לניהול שכתוב כתובות URL. מעדכן אוטומטית את ה-URL אם קיים כלל שכתוב מקומי. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | מחזיר את אובייקט ה-Intl עבור השפה הנוכחית.                                                    | -                                                                                                                        |
| `useLoadDynamic`       | ‏Composable לטעינת מילונים דינמיים.                                                           | -                                                                                                                        |

### פונקציות

ייבוא:

```tsx
import "vue-intlayer";
```

| פונקציה         | תיאור                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------ |
| `getDictionary` | מעבד אובייקטים הדומים למילונים (מפתח, תוכן). מעבד תרגומי `t()`, ריבוי (enumerations) ועוד. |
| `getIntlayer`   | מבוסס על `getDictionary`, אך מזריק גרסה מותאמת של המילון מתוך ההצהרה שנוצרה.               |

### Markdown

ייבוא:

```tsx
import "vue-intlayer/markdown";
```

| פונקציה                   | תיאור                                         |
| ------------------------- | --------------------------------------------- |
| `installIntlayerMarkdown` | תוסף Vue להתקנת Intlayer Markdown ביישום שלך. |
