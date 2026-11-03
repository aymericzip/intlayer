---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת next-intlayer
description: שילוב מותאם ל-Next.js עבור Intlayer, המספק תוכנת תיווך (middleware) וספקים עבור App Router ו-Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 10.0.0
    date: 2026-06-23
    changes: "הוספת כלי העזר usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת next-intlayer

חבילת `next-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Next.js. היא תומכת הן ב-App Router והן ב-Page Router, כולל middleware לניתוב מבוסס שפה.

## התקנה

```bash
npm install next-intlayer
```

## ייצואים

### תוכנת תיווך (Middleware)

ייבוא:

```tsx
import "next-intlayer/middleware";
```

| פונקציה              | תיאור                                                                                                          | תיעוד קשור                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | תוכנת תיווך של Next.js לטיפול בניתוב והפניות מבוססות שפה. מזהה שפה מתוך כותרות/עוגיות ומפנה לנתיב השפה המתאים. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/intlayerMiddleware.md) |

### כלי עזר לתצורה (Configuration Helpers)

ייבוא:

```tsx
import "next-intlayer/server";
```

| פונקציה            | תיאור                                                                                                                                      | תיעוד קשור |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `withIntlayer`     | פונקציית עזר אסינכרונית לעטיפת תצורת Next.js, המבטיחה שמילוני Intlayer מוכנים לפני הבנייה. מכינה את קובצי התוכן ומגדירה תוספי webpack/SWC. | -          |
| `withIntlayerSync` | פונקציית עזר סינכרונית לעטיפת תצורת Next.js, אידיאלית לתצורות שבהן אסינכרוניות אינה אפשרית או רצויה. אינה מכינה מילונים בעת הפעלת השרת.    | -          |

### ספקים (Providers)

ייבוא:

```tsx
import "next-intlayer";
```

או

```tsx
import "next-intlayer/server";
```

| רכיב                     | תיאור                                                                                                                                                                        | תיעוד קשור |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `IntlayerProvider`       | ספק מאוחד עבור Next.js App Router. מותקן פעם אחת ב-layout של השפה, מאתחל את קונטקסט השרת התחום לבקשה _וגם_ מתקין את ספק הלקוח. (Intlayer >= 9.4)                             | -          |
| `IntlayerClientProvider` | **מיושן (Deprecated)**. השתמש ב-`IntlayerProvider` מתוך `next-intlayer/server`. ספק עבור רכיבי צד-לקוח ב-Next.js App Router. עוטף את `IntlayerProvider` מתוך react-intlayer. | -          |
| `IntlayerServerProvider` | **מיושן (Deprecated)**. השתמש ב-`IntlayerProvider` מתוך `next-intlayer/server`. מספק קונטקסט שפה בשרת. (Intlayer < 9.4)                                                      | -          |
| `IntlayerServer`         | מעטפת צד-שרת עבור תוכן Intlayer ב-App Router. מבטיחה טיפול תקין בשפה ברכיבי שרת (Server Components).                                                                         | -          |
| `HTMLProvider`           | ספק להגדרות בינאום הקשורות ל-HTML. מאפשר דריסת רכיבים עבור תגיות HTML.                                                                                                       | -          |
| `HTMLRenderer`           | מרנדר תוכן HTML עם רכיבים מותאמים אישית.                                                                                                                                     | -          |
| `MarkdownProvider`       | ספק לקונטקסט רינדור Markdown. מאפשר דריסת רכיבים מותאמים אישית עבור רכיבי Markdown.                                                                                          | -          |
| `MarkdownRenderer`       | מרנדר תוכן Markdown עם רכיבים מותאמים אישית.                                                                                                                                 | -          |

### הוקים (צד לקוח)

ייבוא:

```tsx
import "next-intlayer";
```

מייצא מחדש (re-exports) את רוב ההוקים מ-`react-intlayer`.

| הוק                    | תיאור                                                                                                              | תיעוד קשור                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | הוק צד-לקוח הבוחר מילון לפי המפתח שלו ומחזיר את תוכנו. משתמש בשפה מתוך הקונטקסט אם לא צוינה שפה.                   | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | הוק המעבד אובייקט מילון ומחזיר את התוכן עבור השפה הנוכחית. מעבד תרגומי `t()`, ריבוי (enumerations) ועוד.           | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | הוק המטפל במילונים אסינכרוניים. מקבל מפת מילונים מבוססת Promises ומפענח אותה עבור השפה הנוכחית.                    | -                                                                                                                       |
| `useDictionaryDynamic` | הוק המטפל במילונים דינמיים הנטענים לפי מפתח. משתמש פנימית ב-React Suspense עבור מצבי טעינה.                        | -                                                                                                                       |
| `useLocale`            | הוק צד-לקוח לקבלת השפה הנוכחית ופונקציה להגדרתה. מותאם במיוחד עבור Next.js App Router עם תמיכה בניווט.             | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useLocale.md)         |
| `usePathname`          | הוק המחזיר את נתיב ה-Next.js הנוכחי ללא מקטע השפה. עוטף את `usePathname` מ-`next/navigation` ומסיר את קידומת השפה. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/usePathname.md)      |
| `useRewriteURL`        | הוק צד-לקוח לניהול שכתוב כתובות URL. מעדכן אוטומטית את ה-URL אם קיים כלל שכתוב מקומי יפה יותר.                     | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | הוק ייעודי ל-Next.js Page Router עבור ניהול שפות. מטפל בהפניות וטעינה מחדש של הדף בעת החלפת שפה.                   | -                                                                                                                       |
| `useI18n`              | הוק המספק פונקציית תרגום `t()` לגישה לתוכן מקונן לפי מפתח. מדמה את התבנית של i18next/next-intl.                    | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | הוק המספק אובייקט `Intl` המקושר לשפה הנוכחית. מזריק אוטומטית את השפה הנוכחית ומשתמש ב-caching מותאם.               | -                                                                                                                       |
| `useLoadDynamic`       | הוק לטעינת מילונים דינמיים באמצעות React Suspense. מקבל מפתח ו-promise, ושומר תוצאות בזיכרון מטמון.                | -                                                                                                                       |
| `useHTMLRenderer`      | הוק לקבלת פונקציית רינדור HTML מוגדרת מראש.                                                                        | -                                                                                                                       |
| `useMarkdownRenderer`  | הוק לקבלת פונקציית רינדור Markdown מוגדרת מראש.                                                                    | -                                                                                                                       |

### פונקציות (צד שרת)

ייבוא:

```tsx
import "next-intlayer/server";
```

| פונקציה                | תיאור                                                                                                                                         | תיעוד קשור                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | גרסת צד-שרת של פונקציית התרגום עבור Next.js App Router. מחזירה את תרגום התוכן הרב-לשוני עבור שפת השרת.                                        | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md) |
| `getLocale`            | פונקציית עזר לחילוץ השפה הנוכחית מתוך כותרות (headers) ועוגיות (cookies) של Next.js. מיועדת לרכיבי שרת, פעולות שרת (Server Actions) או נתבים. | -                                                                                                      |
| `generateStaticParams` | מייצרת פרמטרים סטטיים עבור נתיבים דינמיים ב-Next.js בהתבסס על השפות שהוגדרו. מחזירה מערך של אובייקטי שפה לצורך pre-rendering.                 | -                                                                                                      |
| `locale`               | פונקציה לקבלה או הגדרה של השפה בקונטקסט השרת (App Router). מספקת ניהול שפה ברכיבי שרת (Server Components).                                    | -                                                                                                      |

### טיפוסים (Types)

ייבוא:

```tsx
import "next-intlayer";
```

| טיפוס                  | תיאור                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | טיפוס עבור דפי Next.js עם תמיכת Intlayer. טיפוס גנרי הכולל פרמטר של שפה (locale).                         |
| `Next14PageIntlayer`   | טיפוס עבור דפי Next.js 14 עם תמיכת Intlayer.                                                              |
| `Next15PageIntlayer`   | טיפוס עבור דפי Next.js 15 עם תמיכת Intlayer.                                                              |
| `NextLayoutIntlayer`   | טיפוס עבור layouts של Next.js עם תמיכת Intlayer. טיפוס גנרי הכולל פרמטר של שפה (locale).                  |
| `Next14LayoutIntlayer` | טיפוס עבור layouts של Next.js 14 עם תמיכת Intlayer.                                                       |
| `Next15LayoutIntlayer` | טיפוס עבור layouts של Next.js 15 עם תמיכת Intlayer.                                                       |
| `LocalParams`          | טיפוס עבור פרמטרי נתיב של Next.js עם שפה. אובייקט בעל מאפיין `locale`.                                    |
| `LocalPromiseParams`   | טיפוס עבור פרמטרי נתיב של Next.js עם שפה (גרסה אסינכרונית). Promise המתפענח לאובייקט בעל מאפיין `locale`. |
