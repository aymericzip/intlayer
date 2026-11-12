---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת svelte-intlayer
description: שילוב מותאם ל-Svelte עבור Intlayer, המספק פונקציות הגדרה ו-stores עבור יישומי Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
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

# חבילת svelte-intlayer

חבילת `svelte-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Svelte. היא כוללת פונקציות הגדרה ו-stores לטיפול בתוכן רב-לשוני.

## התקנה

```bash
npm install svelte-intlayer
```

## ייצואים

### הגדרה (Setup)

ייבוא:

```tsx
import "svelte-intlayer";
```

| פונקציה         | תיאור                                        |
| --------------- | -------------------------------------------- |
| `setupIntlayer` | פונקציה להגדרת Intlayer ביישום ה-Svelte שלך. |

### חנות (Store)

ייבוא:

```tsx
import "svelte-intlayer";
```

| חנות (Store)    | תיאור                                           |
| --------------- | ----------------------------------------------- |
| `intlayerStore` | Store של Svelte המכיל את מצב ה-Intlayer הנוכחי. |

### הוקים / קונטקסט (Context)

ייבוא:

```tsx
import "svelte-intlayer";
```

| פונקציה                | תיאור                                                                                       | תיעוד קשור                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | מבוסס על `useDictionary`, אך מזריק גרסה מותאמת של המילון מתוך ההצהרה שנוצרה.                | -                                                                                                                           |
| `useDictionary`        | מעבד אובייקטים הדומים למילונים (מפתח, תוכן). מעבד תרגומי `t()`, ריבוי (enumerations) ועוד.  | -                                                                                                                           |
| `useDictionaryAsync`   | זהה ל-`useDictionary`, אך מטפל במילונים אסינכרוניים.                                        | -                                                                                                                           |
| `useDictionaryDynamic` | זהה ל-`useDictionary`, אך מטפל במילונים דינמיים.                                            | -                                                                                                                           |
| `useLocale`            | מחזיר את השפה הנוכחית ופונקציה להגדרתה.                                                     | -                                                                                                                           |
| `usePathname`          | מחזיר את הנתיב הנוכחי כחנות `Readable<string>` כאשר מקטע השפה מוסר. מגיב ל-`popstate`.      | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/svelte-intlayer/usePathname.md)     |
| `useRewriteURL`        | פונקציית צד-לקוח לניהול שכתוב כתובות URL. מעדכנת אוטומטית את ה-URL אם קיים כלל שכתוב מקומי. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | מחזיר את אובייקט ה-Intl עבור השפה הנוכחית.                                                  | -                                                                                                                           |

### Markdown

ייבוא:

```tsx
import "svelte-intlayer";
```

| פונקציה               | תיאור                                                  |
| --------------------- | ------------------------------------------------------ |
| `setIntlayerMarkdown` | פונקציה להגדרת קונטקסט ה-markdown ביישום ה-Svelte שלך. |
