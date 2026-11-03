---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: "תיעוד חבילת angular-intlayer"
description: "אינטגרציה ייעודית ל-Angular עבור Intlayer, המספקת providers ושירותים עבור אפליקציות Angular."
keywords:
  - angular-intlayer
  - angular
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת פונקציית העזר usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד עבור כל הייצואים (exports)"
author: aymericzip
---

# חבילת angular-intlayer

חבילת `angular-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer באפליקציות Angular. היא כוללת providers ושירותים לניהול תוכן רב-לשוני.

## התקנה

```bash
npm install angular-intlayer
```

## ייצואים (Exports)

ייבוא:

```tsx
import "angular-intlayer";
```

### הגדרה (Setup)

| פונקציה           | תיאור                                                        |
| ----------------- | ------------------------------------------------------------ |
| `provideIntlayer` | פונקציה להגדרת Intlayer (provider) באפליקציית ה-Angular שלך. |

### Hooks

| Hook                   | תיאור                                                                                                        | תיעוד קשור                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | מבוסס על `useDictionary`, אך מזריק גרסה מותאמת של המילון מתוך ההצהרה שנוצרה.                                 | -                                                                                                                     |
| `useDictionary`        | מעבד אובייקטים שנראים כמו מילונים (key, content). הוא מעבד תרגומי `t()`, ריבוי וכו'.                         | -                                                                                                                     |
| `useDictionaryAsync`   | זהה ל-`useDictionary`, אך מטפל במילונים אסינכרוניים.                                                         | -                                                                                                                     |
| `useDictionaryDynamic` | זהה ל-`useDictionary`, אך מטפל במילונים דינמיים.                                                             | -                                                                                                                     |
| `useLocale`            | מחזיר את השפה הנוכחית ופונקציה להגדרתה.                                                                      | -                                                                                                                     |
| `usePathname`          | מחזיר את שם הנתיב הנוכחי כ-`Signal<string>` כאשר מקטע השפה הוסר. ריאקטיבי ל-`popstate` באמצעות `DestroyRef`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/angular-intlayer/usePathname.md) |
| `useIntl`              | מחזיר את אובייקט ה-Intl עבור השפה הנוכחית.                                                                   | -                                                                                                                     |
| `useLoadDynamic`       | Hook לטעינת מילונים דינמיים.                                                                                 | -                                                                                                                     |

### רכיבים (Components)

| רכיב                        | תיאור                              |
| --------------------------- | ---------------------------------- |
| `IntlayerMarkdownComponent` | רכיב Angular המרנדר תוכן Markdown. |
