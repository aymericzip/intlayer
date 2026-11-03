---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת astro-intlayer
description: אינטגרציית Astro עבור Intlayer, המספקת הגדרות לניתוב מבוסס שפה, תוכנת תיווך (middleware), הוקים, חנות לקוח וניהול מילונים.
keywords:
  - astro-intlayer
  - astro
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "הוספת תיעוד עבור useIntlayer, useDictionary, useLocale הוקים, middleware ומעצבי פורמטים (formatters)"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת astro-intlayer

חבילת `astro-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Astro. היא מגדירה ניתוב מבוסס שפה, ניהול מילונים, שכתוב דפים בזמן בנייה, middleware לבקשות והוקים לגישה לתוכן רב-לשוני הן ברכיבי `.astro` המרונדרים בשרת והן בסקריפטים בצד הלקוח.

## התקנה

```bash
npm install astro-intlayer
```

## ייצואים

### אינטגרציה (Integration)

חבילת `astro-intlayer` מספקת אינטגרציית Astro שמגדירה את Intlayer בפרויקט שלך.

ייבוא:

```tsx
import { intlayer } from "astro-intlayer";
```

או ייבוא ברירת מחדל ב-`astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| פונקציה    | תיאור                                                                                                                                                                                      | תיעוד קשור                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | אינטגרציית Astro המכינה מילונים, מגדירה תוספי Vite (כינויים, פרוקסי לניתוב, ניפוי prune), רושמת אוטומטית middleware לבקשות, ומפיקה דפים שעברו prerender בכתובות URL משוכתבות ומותאמות שפה. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/intlayer.md) |

### הוקים (שרת ולקוח)

ייבוא:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| הוק             | תיאור                                                                                                                                                                                       | תיעוד קשור                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | בוחר מילון אחד לפי המפתח שלו ומחזיר את תוכנו המתורגם. ב-frontmatter של `.astro`, הוא קורא את שפת הבקשה מתוך `Astro.locals`. ב-`<script>` של הלקוח, הוא קורא מתוך חנות הלקוח (client store). | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | מעבד אובייקט מילון ומחזיר תוכן עבור השפה המפוענחת. עובד הן ב-frontmatter והן בסקריפטים של הלקוח.                                                                                            | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | מחזיר את השפה הנוכחית, שפת ברירת המחדל, השפות הזמינות ופונקציה לעדכון השפה.                                                                                                                 | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useLocale.md)         |

### תוכנת תיווך (astro-intlayer/middleware)

ייבוא:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| ייצוא       | טיפוס               | תיאור                                                                                                                                         | תיעוד קשור                                                                                                      |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | תוכנת תיווך של Astro המזהה את שפת הבקשה ומצרפת את `Astro.locals.intlayer`. נרשמת אוטומטית על ידי `intlayer()`, או מיובאת ידנית להרכבה עצמאית. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/onRequest.md) |

### כלי עזר (Utilities)

ייבוא:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| פונקציה             | תיאור                                                                                                              | תיעוד קשור |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- |
| `getIntlayerLocals` | פונקציית עזר לאחזור אובייקט ה-`IntlayerLocals` הנוכחי מתוך היקף אחסון הבקשה (storage scope) מחוץ ל-`Astro.locals`. | -          |

### כלי עזר ללקוח (astro-intlayer/client)

ייבוא:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

כאשר מייבאים בדפדפן או בתוך תגיות `<script>` של הלקוח, `astro-intlayer` ממופה אוטומטית אל `astro-intlayer/client` (המופעל על ידי `vanilla-intlayer`), ומספק getters למילונים בצד הלקוח, מנויים לחנות וכלים לשמירה מתמשכת של השפה.

### מעצבי פורמט (astro-intlayer/format)

ייבוא:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| הוק               | תיאור                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `useIntl`         | מחזיר מופע של Intl המקושר לשפת הבקשה או הלקוח עם יכולות זיכרון מטמון (caching) והרשמה כמנוי. |
| `useDate`         | מחזיר פונקציית עיצוב תאריכים המקושרת מראש לשפה הנוכחית (`Intl.DateTimeFormat`).              |
| `useNumber`       | מחזיר פונקציית עיצוב מספרים המקושרת מראש לשפה הנוכחית (`Intl.NumberFormat`).                 |
| `useCurrency`     | מחזיר פונקציית עיצוב מטבע המקושרת מראש לשפה הנוכחית.                                         |
| `usePercentage`   | מחזיר פונקציית עיצוב אחוזים המקושרת מראש לשפה הנוכחית.                                       |
| `useRelativeTime` | מחזיר פונקציית עיצוב זמן יחסי המקושרת מראש לשפה הנוכחית (`Intl.RelativeTimeFormat`).         |
| `useList`         | מחזיר פונקציית עיצוב רשימות המקושרת מראש לשפה הנוכחית (`Intl.ListFormat`).                   |
| `useUnit`         | מחזיר פונקציית עיצוב יחידות מידה המקושרת מראש לשפה הנוכחית.                                  |
| `useCompact`      | מחזיר פונקציית עיצוב מספרים קומפקטיים המקושרת מראש לשפה הנוכחית (למשל `1.5K`).               |

### כלי עזר ל-HTML‏ (astro-intlayer/html)

ייבוא:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| ייצוא             | טיפוס      | תיאור                                       |
| ----------------- | ---------- | ------------------------------------------- |
| `renderHTML`      | `Function` | פונקציית עזר עצמאית לרינדור צומתי HTML.     |
| `useHTML`         | `Hook`     | הוק לקבלת קונטקסט ותצורת ספק ה-HTML.        |
| `useHTMLRenderer` | `Hook`     | הוק לקבלת פונקציית רינדור HTML מוגדרת מראש. |

### כלי עזר ל-Markdown‏ (astro-intlayer/markdown)

ייבוא:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| ייצוא                 | טיפוס      | תיאור                                           |
| --------------------- | ---------- | ----------------------------------------------- |
| `compileMarkdown`     | `Function` | מהדר מחרוזות Markdown לייצוג מובנה.             |
| `renderMarkdown`      | `Function` | מרנדר תוכן Markdown לצומתי פלט.                 |
| `parseMarkdown`       | `Function` | מפענח תוכן Markdown גולמי ל-AST.                |
| `useMarkdown`         | `Hook`     | הוק לקבלת קונטקסט ספק ה-Markdown.               |
| `useMarkdownRenderer` | `Hook`     | הוק לקבלת פונקציית רינדור Markdown מוגדרת מראש. |

### טיפוסים (Types)

ייבוא:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| טיפוס             | תיאור                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | האובייקט המצורף ל-`Astro.locals.intlayer` המכיל את `locale`, `defaultLocale` ו-`availableLocales`. |
| `UseLocaleProps`  | מאפייני תצורה אופציונליים המתקבלים על ידי `useLocale()`.                                           |
| `UseLocaleResult` | הטיפוס המוחזר של `useLocale()`, המספק מאפייני שפה ומתודות עדכון.                                   |
