---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת react-intlayer
description: מימוש מותאם ל-React של Intlayer, המספק הוקים (hooks) וספקים (providers) עבור יישומי React.
keywords:
  - react-intlayer
  - react
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת כלי העזר usePathname"
  - version: 7.5.14
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת react-intlayer

חבילת `react-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי React. היא כוללת ספקי קונטקסט (context providers), הוקים (hooks) ורכיבים לניהול תוכן רב-לשוני.

## התקנה

```bash
npm install react-intlayer
```

## ייצואים

### ספקים (Providers)

ייבוא:

```tsx
import "react-intlayer";
```

| רכיב                      | תיאור                                                                                       | תיעוד קשור                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | הספק הראשי שעוטף את היישום שלך ומספק את הקונטקסט של Intlayer. כולל תמיכה בעורך כברירת מחדל. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | רכיב ספק המתמקד בתוכן ללא תכונות העורך. השתמש בו כאשר אין צורך בעורך הוויזואלי.             | -                                                                                                                             |
| `HTMLProvider`            | ספק עבור הגדרות בינאום הקשורות ל-HTML. מאפשר דריסת רכיבים עבור תגיות HTML.                  | -                                                                                                                             |

### הוקים (Hooks)

ייבוא:

```tsx
import "react-intlayer";
```

| הוק                    | תיאור                                                                                                        | תיעוד קשור                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useHTMLRenderer`      | הוק לקבלת פונקציית רינדור HTML מוגדרת מראש.                                                                  | -                                                                                                                       |
| `useMarkdownRenderer`  | הוק לקבלת פונקציית רינדור Markdown מוגדרת מראש.                                                              | -                                                                                                                       |
| `useIntlayer`          | הוק צד-לקוח הבוחר מילון לפי המפתח שלו ומחזיר את תוכנו. משתמש בשפה (locale) מהקונטקסט אם לא צוינה אחרת.       | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | הוק המעבד אובייקט מילון ומחזיר את התוכן עבור השפה הנוכחית. מעבד תרגומי `t()`, ריבוי (enumerations) ועוד.     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | הוק המטפל במילונים אסינכרוניים. מקבל מפת מילונים מבוססת Promises ומפענח אותה עבור השפה הנוכחית.              | -                                                                                                                       |
| `useDictionaryDynamic` | הוק המטפל במילונים דינמיים הנטענים לפי מפתח. משתמש פנימית ב-React Suspense עבור מצבי טעינה.                  | -                                                                                                                       |
| `useLocale`            | הוק צד-לקוח לקבלת השפה הנוכחית, שפת ברירת המחדל, השפות הזמינות ופונקציה לעדכון השפה.                         | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | הוק לקבלת השפה הנוכחית וכל השדות הקשורים (locale, defaultLocale, availableLocales, setLocale) מתוך הקונטקסט. | -                                                                                                                       |
| `usePathname`          | הוק המחזיר את נתיב ה-URL הנוכחי ללא מקטע השפה. מגיב לניווט בדפדפן דרך אירוע `popstate`.                      | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/usePathname.md)     |
| `useRewriteURL`        | הוק צד-לקוח לניהול שכתוב כתובות URL. אם קיים כלל שכתוב עבור הנתיב והשפה הנוכחיים, הוא יעדכן את ה-URL.        | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | הוק המספק פונקציית תרגום `t()` לגישה לתוכן מקונן לפי מפתח. מדמה את התבנית של i18next/next-intl.              | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | הוק המספק אובייקט `Intl` המקושר לשפה הנוכחית. מזריק אוטומטית את השפה הנוכחית ומשתמש ב-caching מותאם.         | -                                                                                                                       |
| `useLocaleStorage`     | הוק המספק שמירה מתמשכת של השפה ב-local storage או בקובצי cookies. מחזיר פונקציות getter ו-setter.            | -                                                                                                                       |
| `useLocaleCookie`      | מיושן (Deprecated). השתמש ב-`useLocaleStorage` במקום. הוק המנהל את שמירת השפה ב-cookies.                     | -                                                                                                                       |
| `useLoadDynamic`       | הוק לטעינת מילונים דינמיים באמצעות React Suspense. מקבל מפתח ו-promise, ושומר תוצאות בזיכרון מטמון.          | -                                                                                                                       |
| `useIntlayerContext`   | הוק המספק את ערכי קונטקסט הלקוח הנוכחיים של Intlayer (כגון locale, setLocale וכו').                          | -                                                                                                                       |
| `useHTMLContext`       | הוק לגישה לדריסות רכיבי HTML מתוך קונטקסט ה-HTMLProvider.                                                    | -                                                                                                                       |

### פונקציות

ייבוא:

```tsx
import "react-intlayer";
```

| פונקציה              | תיאור                                                                                                                    | תיעוד קשור                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `renderHTML`         | כלי עזר עצמאי לרינדור HTML מחוץ לרכיבים.                                                                                 | -                                                                                                      |
| `renderMarkdown`     | כלי עזר עצמאי לרינדור Markdown מחוץ לרכיבים.                                                                             | -                                                                                                      |
| `t`                  | פונקציית תרגום בצד הלקוח המחזירה את התרגום של התוכן הרב-לשוני שסופק. משתמשת בשפת הקונטקסט אם לא צוינה שפה.               | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md) |
| `getDictionary`      | מעבדת אובייקטי מילון ומחזירה תוכן עבור השפה שצוינה. מעבדת תרגומי `t()`, ריבוי (enumerations), markdown, HTML ועוד.       | -                                                                                                      |
| `getIntlayer`        | מאחזרת מילון לפי המפתח שלו מתוך ההצהרה שנוצרה ומחזירה את תוכנו עבור השפה שצוינה. גרסה מותאמת ביצועים של `getDictionary`. | -                                                                                                      |
| `setLocaleInStorage` | מגדירה את השפה באחסון (local storage או cookie בהתאם להגדרה).                                                            | -                                                                                                      |
| `setLocaleCookie`    | מיושן (Deprecated). השתמש ב-`setLocaleInStorage` במקום. מגדירה את השפה ב-cookie.                                         | -                                                                                                      |
| `localeInStorage`    | מקבלת את השפה מתוך האחסון (local storage או cookie).                                                                     | -                                                                                                      |
| `localeCookie`       | מיושן (Deprecated). השתמש ב-`localeInStorage` במקום. מקבלת את השפה מתוך ה-cookie.                                        | -                                                                                                      |

### רכיבים

ייבוא:

```tsx
import "react-intlayer";
```

או

```tsx
import "react-intlayer/markdown";
```

| רכיב               | תיאור                                                                                                          | תיעוד קשור                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `HTMLRenderer`     | מרנדר תוכן HTML עם רכיבים מותאמים אישית.                                                                       | -                                                                                                                             |
| `MarkdownProvider` | ספק עבור קונטקסט רינדור markdown. מאפשר דריסת רכיבים מותאמים אישית עבור רכיבי markdown.                        | -                                                                                                                             |
| `MarkdownRenderer` | מרנדר תוכן markdown עם רכיבים מותאמים אישית. תומך בכל תכונות ה-markdown הסטנדרטיות ובתחביר ייחודי של Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/MarkdownRenderer.md) |

### טיפוסים (Types)

ייבוא:

```tsx
import "react-intlayer";
```

| טיפוס          | תיאור                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------ |
| `IntlayerNode` | טיפוס המייצג צומת בעץ התוכן של Intlayer. משמש למניפולציית תוכן בצורה בטוחה מבחינת טיפוסים. |

### צד-שרת (react-intlayer/server)

ייבוא:

```tsx
import "react-intlayer/server";
```

| ייצוא                    | טיפוס       | תיאור                                         |
| ------------------------ | ----------- | --------------------------------------------- |
| `IntlayerServerProvider` | `Component` | ספק לרינדור בצד השרת. (גרסאות Intlayer < 9.4) |
| `IntlayerServer`         | `Component` | מעטפת צד-שרת עבור תוכן Intlayer.              |
| `t`                      | `Function`  | גרסת צד-שרת של פונקציית התרגום.               |
| `useLocale`              | `Hook`      | הוק לגישה לשפה בצד השרת.                      |
| `useIntlayer`            | `Hook`      | גרסת צד-שרת של `useIntlayer`.                 |
| `useDictionary`          | `Hook`      | גרסת צד-שרת של `useDictionary`.               |
| `useI18n`                | `Hook`      | גרסת צד-שרת של `useI18n`.                     |
| `locale`                 | `Function`  | פונקציה לקבלה או הגדרה של השפה בשרת.          |
