---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת react-native-intlayer
description: תמיכת React Native עבור Intlayer, המספקת ספקים, הוקים, polyfills ותצורת Metro.
keywords:
  - react-native-intlayer
  - react-native
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "ייצוא מחדש של כל ה-API של react-intlayer (הוקים, כלי עזר, נתיבי משנה של format/html/markdown) כך שיישום React Native תלוי אך ורק ב-react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת react-native-intlayer

חבילת `react-native-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי React Native. היא מייצאת מחדש את מלוא ה-API של `react-intlayer` (הוקים וכלי עזר) עם `IntlayerProvider` המותאם ל-React Native, בתוספת ה-polyfills ותצורת ה-Metro הנדרשים על ידי React Native.

> ביישום React Native, ייבא את **הכל** מתוך `react-native-intlayer`. אין צורך להתקין או לייבא את `react-intlayer` ישירות.

## התקנה

```bash
npm install react-native-intlayer
```

## ייצואים

### ספק (Provider)

| רכיב               | תיאור                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | רכיב ספק שעוטף את היישום שלך ומספק את קונטקסט ה-Intlayer. מחיל אוטומטית את ה-polyfills הנדרשים. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### הוקים וכלי עזר

אלה מיוצאים מחדש מ-`react-intlayer`, כך שתוכל לייבא אותם ישירות מ-`react-native-intlayer`:

| ייצוא                                                                                                             | תיאור                              |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `useIntlayer`                                                                                                     | גישה לתוכן מתורגם עבור מפתח מילון. |
| `useLocale`                                                                                                       | קריאה ושינוי של השפה הנוכחית.      |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | טעינת תוכן מילון בדרכים שונות.     |
| `useI18n`                                                                                                         | הוק תואם i18next.                  |
| `t`                                                                                                               | כלי עזר לתרגום מוטבע (inline).     |
| `getIntlayer`, `getDictionary`                                                                                    | Getters אימפרטיביים לתוכן.         |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | כלי עזר לשמירה מתמשכת של השפה.     |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| פונקציה            | תיאור                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| `intlayerPolyfill` | פונקציה המפעילה את ה-polyfills הנדרשים עבור React Native לתמיכה ב-Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> ה-polyfill מוחל אוטומטית בעת ייבוא `IntlayerProvider`. קרא ל-`intlayerPolyfill` ידנית רק אם אתה זקוק ל-polyfills לפני טעינת הספק (mount).

### מעצבי פורמט (Formatters)

הוקים לעיצוב מספרים, תאריכים ועיצובים מבוססי Intl נוספים זמינים מתוך נתיב המשנה `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### רינדור Markdown ו-HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### תצורת Metro

חבילת `react-native-intlayer` מספקת כלי עזר לתצורת Metro כדי להבטיח ש-Intlayer פועל כהלכה עם React Native.

| פונקציה                   | תיאור                                                                         |
| ------------------------- | ----------------------------------------------------------------------------- |
| `configMetroIntlayer`     | פונקציה אסינכרונית המכינה את Intlayer וממזגת את תצורת ה-Metro.                |
| `configMetroIntlayerSync` | פונקציה סינכרונית הממזגת את תצורת ה-Metro ללא הכנת משאבי Intlayer מראש.       |
| `exclusionList`           | יוצרת תבנית RegExp עבור ה-blockList של Metro כדי להחריג קובצי תוכן מה-bundle. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
