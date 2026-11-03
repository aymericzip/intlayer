---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת intlayer
description: חבילת הליבה של Intlayer, המספקת את פונקציות הבסיס והטיפוסים לבינאום.
keywords:
  - intlayer
  - ליבה
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "תיעוד getIntlayer, getIntlayerAsync, getDictionary ו-getDictionaryAsync"
  - version: 9.0.0
    date: 2026-06-23
    changes: "הוספת פונקציית העזר comparePaths"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד עבור כל הייצואים (exports)"
author: aymericzip
---

# חבילת intlayer

חבילת `intlayer` היא ספריית הליבה של המערכת האקולוגית של Intlayer. היא מספקת את הפונקציות, הטיפוסים ופונקציות העזר החיוניות לניהול תוכן רב-לשוני באפליקציות JavaScript ו-TypeScript.

## התקנה

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="bun"
bun add intlayer
```

## ייצואים (Exports)

### תצורה (Configuration)

ייבוא:

```tsx
import "intlayer";
```

| משתנה              | טיפוס                  | תיאור                                                                                                  | תיעוד קשור                                                                                                                 |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | אובייקט התצורה של Intlayer.                                                                            | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | מחזיר את אובייקט התצורה של Intlayer. (**הוצא משימוש (Deprecated)**: השתמש ב-`configuration` במקום זאת) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | רשימת כל השפות הנתמכות.                                                                                | -                                                                                                                          |
| `requiredLocales`  | `Locales[]`            | רשימת כל שפות החובה.                                                                                   | -                                                                                                                          |
| `defaultLocale`    | `Locales`              | שפת ברירת המחדל.                                                                                       | -                                                                                                                          |

### טיפוסים (Types)

ייבוא:

```tsx
import "intlayer";
```

| טיפוס                 | תיאור                                                |
| --------------------- | ---------------------------------------------------- |
| `Dictionary`          | טיפוס המילון המשמש להגדרת המבנה של מילון.            |
| `DeclarationContent`  | (**הוצא משימוש**) השתמש ב-`Dictionary<T>` במקום זאת. |
| `IntlayerConfig`      | הטיפוס המגדיר את תצורת Intlayer.                     |
| `ContentNode`         | צומת בתוכן המילון.                                   |
| `Locale`              | הטיפוס המייצג שפה (locale).                          |
| `LocalesValues`       | הערכים האפשריים עבור שפה.                            |
| `StrictModeLocaleMap` | מפת שפות עם בדיקת טיפוסים קפדנית.                    |

### פונקציות תוכן

ייבוא:

```tsx
import "intlayer";
```

| פונקציה                  | טיפוס      | תיאור                                                                                                 | תיעוד קשור                                                                                                                     |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | בוחרת תוכן בהתבסס על השפה הנוכחית.                                                                    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/translation.md)                      |
| `enu` / `getEnumeration` | `Function` | בוחרת תוכן בהתבסס על כמות (quantity).                                                                 | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/enumeration.md)                      |
| `cond` / `getCondition`  | `Function` | בוחרת תוכן בהתבסס על תנאי בוליאני.                                                                    | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/condition.md)                          |
| `gender`                 | `Function` | בוחרת תוכן בהתבסס על מגדר.                                                                            | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)                                |
| `insert`                 | `Function` | משלבת ערכים לתוך מחרוזת תוכן.                                                                         | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)                          |
| `nest` / `getNesting`    | `Function` | מקננת מילון אחר.                                                                                      | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/nesting.md)                              |
| `md`                     | `Function` | מעבדת תוכן Markdown.                                                                                  | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)                            |
| `html`                   | `Function` | מעבדת תוכן HTML.                                                                                      | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/html.md)                                    |
| `file`                   | `Function` | מטפלת בתוכן קובץ.                                                                                     | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/file.md)                                    |
| `getDictionary`          | `Function` | מעבדת אובייקטים שנראים כמו מילונים (key, content). היא מעבדת תרגומי `t()`, ריבוי (enumerations) וכו'. | [getDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getDictionary.md)           |
| `getDictionaryAsync`     | `Function` | טוענת מקטע (chunk) שפה בודד של מילון מתוך מפת טוענים לכל שפה, ולאחר מכן מעבדת אותו.                   | [getDictionaryAsync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getDictionaryAsync.md) |
| `getIntlayer`            | `Function` | מבוססת על `getDictionary`, אך מזריקה גרסה מותאמת של המילון מתוך ההצהרה שנוצרה.                        | [getIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md)               |
| `getIntlayerAsync`       | `Function` | המקבילה האסינכרונית של `getIntlayer`, הטוענת רק את השפה המבוקשת. עבור metadata, טוענים ופונקציות שרת. | [getIntlayerAsync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayerAsync.md)     |

### כלי עזר לבינאום (Localization Utilities)

ייבוא:

```tsx
import "intlayer";
```

| פונקציה                | טיפוס      | תיאור                                    | תיעוד קשור                                                                                                                         |
| ---------------------- | ---------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | מזהה את השפה מתוך מחרוזת או נתיב.        | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | מחלצת את חלק השפה מתוך locale.           | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | מחזירה את שם התצוגה של שפה.              | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | מפענחת נתיב קנוני לנתיב מותאם שפה.       | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | מפענחת נתיב מותאם שפה לנתיב קנוני.       | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | מייצרת כתובת URL מותאמת שפה.             | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | מייצרת כתובות URL עבור כל השפות הנתמכות. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | מסירה את קידומת השפה מנתיב.              | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | מחלצת את קידומת השפה מנתיב.              | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getPrefix.md)                       |
| `comparePaths`         | `Function` | משווה בין שני נתיבים תוך התעלמות מהשפה.  | [comparePaths](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/comparePaths.md)                 |
| `normalizePath`        | `Function` | מנרמלת נתיב לנתיב בלתי תלוי בשפה.        | [comparePaths](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/comparePaths.md)                 |
| `getHTMLTextDir`       | `Function` | מחזירה את כיוון הטקסט (LTR/RTL).         | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | מאמתת קידומת שפה.                        | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/validatePrefix.md)             |

### כלי עזר לדפדפן (Browser Utilities)

ייבוא:

```tsx
import "intlayer";
```

| פונקציה                | טיפוס      | תיאור                              |
| ---------------------- | ---------- | ---------------------------------- |
| `getBrowserLocale`     | `Function` | מזהה את השפה המועדפת בדפדפן.       |
| `getCookie`            | `Function` | מאחזרת ערך של עוגייה (cookie).     |
| `getLocaleFromStorage` | `Function` | מאחזרת את השפה מתוך האחסון המקומי. |
| `setLocaleInStorage`   | `Function` | שומרת את השפה באחסון המקומי.       |

### מעצבים (Formatters)

ייבוא:

```tsx
import "intlayer";
```

| פונקציה        | תיאור                              |
| -------------- | ---------------------------------- |
| `number`       | מעצבת מספר.                        |
| `currency`     | מעצבת ערך מטבע.                    |
| `percentage`   | מעצבת אחוזים.                      |
| `compact`      | מעצבת מספר בצורה מקוצרת (compact). |
| `date`         | מעצבת תאריך.                       |
| `relativeTime` | מעצבת זמן יחסי.                    |
| `units`        | מעצבת ערך עם יחידות מידה.          |
| `Intl`         | אובייקט ה-Intl הסטנדרטי.           |
