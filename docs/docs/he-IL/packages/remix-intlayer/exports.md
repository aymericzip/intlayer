---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת remix-intlayer
description: אינטגרציית Remix 3 עבור Intlayer, המספקת תוכנת תיווך (middleware), קונטקסט, הוקים ומעצבי פורמט לניתוב מבוסס שפה וניהול תוכן.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת remix-intlayer

חבילת `remix-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Remix 3. בנויה במלואה על תקני אינטרנט (`Request`, `Response`, `Headers` ו-`URL`), ומציעה תוכנת תיווך לנתב (router middleware) עבור ניתוב מבוסס שפה ושכתובים פנימיים, אחסון קונטקסט, הוקים וכלי עזר לעיצוב פורמט לניהול חלק של תוכן רב-לשוני.

## התקנה

```bash
npm install remix-intlayer
```

## ייצואים

### תוכנת תיווך (Middleware)

ייבוא:

```tsx
import { intlayer } from "remix-intlayer";
```

| פונקציה    | תיאור                                                                                                                                                        | תיעוד קשור                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | תוכנת תיווך לנתב של Remix 3 המטפלת בניתוב מבוסס שפה (הפניות ושכתובים פנימיים), מפענחת את שפת הבקשה, שומרת אותה בעוגיות/כותרות, ומבססת את היקף קונטקסט הבקשה. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/intlayerMiddleware.md) |

### קונטקסט (Context)

ייבוא:

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| ייצוא                       | טיפוס        | תיאור                                                                                                                         | תיעוד קשור                                                                                                       |
| --------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | מפתח RequestContext המחזיק את ה-`IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) עבור הבקשה הנוכחית.           | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | שם המאפיין (`'intlayer'`) המותקן ישירות על קונטקסט הבקשה, המאפשר גישה דרך `context.intlayer` וכן דרך `context.get(Intlayer)`. | -                                                                                                                |

### הוקים (Hooks)

ייבוא:

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| הוק             | תיאור                                                                                                    | תיעוד קשור                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | בוחר מילון אחד לפי המפתח שלו ומחזיר את תוכנו עבור שפת הבקשה המטופלת. קורא אוטומטית מקונטקסט/אחסון הבקשה. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | מעבד אובייקט מילון מיובא ומחזיר את תוכנו עבור שפת הבקשה הנוכחית. תומך בדריסות בוררים (selectors).        | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | מחזיר את השפה שפוענחה של הבקשה הנוכחית, לצד `defaultLocale` ו-`availableLocales` שהוגדרו.                | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/remix-intlayer/useLocale.md)         |

### כלי עזר (Utilities)

ייבוא:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| פונקציה               | תיאור                                                                                                                                      | תיעוד קשור |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `createLocaleRouting` | פונקציה טהורה המחשבת החלטות ניתוב שפה (`redirect`, `rewrite` או `pass`) בהינתן בקשה, תצורה ואפשרויות.                                      | -          |
| `getIntlayerState`    | קורא את ה-`IntlayerState` הנוכחי (`locale`, `defaultLocale`, `availableLocales`) מתוך היקף הבקשה של `AsyncLocalStorage` מחוץ לרכיבי React. | -          |

### מעצבי פורמט (remix-intlayer/format)

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
} from "remix-intlayer/format";
```

| הוק               | תיאור                                                                              |
| ----------------- | ---------------------------------------------------------------------------------- |
| `useIntl`         | מחזיר מופע של Intl המקושר לשפת הבקשה עם יכולות זיכרון מטמון והרשמה כמנוי.          |
| `useDate`         | מחזיר פונקציית עיצוב תאריכים המקושרת מראש לשפת הבקשה (`Intl.DateTimeFormat`).      |
| `useNumber`       | מחזיר פונקציית עיצוב מספרים המקושרת מראש לשפת הבקשה (`Intl.NumberFormat`).         |
| `useCurrency`     | מחזיר פונקציית עיצוב מטבע המקושרת מראש לשפת הבקשה.                                 |
| `usePercentage`   | מחזיר פונקציית עיצוב אחוזים המקושרת מראש לשפת הבקשה.                               |
| `useRelativeTime` | מחזיר פונקציית עיצוב זמן יחסי המקושרת מראש לשפת הבקשה (`Intl.RelativeTimeFormat`). |
| `useList`         | מחזיר פונקציית עיצוב רשימות המקושרת מראש לשפת הבקשה (`Intl.ListFormat`).           |
| `useUnit`         | מחזיר פונקציית עיצוב יחידות מידה המקושרת מראש לשפת הבקשה.                          |
| `useCompact`      | מחזיר פונקציית עיצוב מספרים קומפקטיים המקושרת מראש לשפת הבקשה (למשל `1.5K`).       |

### כלי עזר ל-HTML‏ (remix-intlayer/html)

ייבוא:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| ייצוא             | טיפוס      | תיאור                                             |
| ----------------- | ---------- | ------------------------------------------------- |
| `renderHTML`      | `Function` | פונקציית עזר עצמאית לרינדור צומתי HTML מחוץ ל-UI. |
| `useHTML`         | `Hook`     | הוק לקבלת קונטקסט ותצורת ספק ה-HTML.              |
| `useHTMLRenderer` | `Hook`     | הוק לקבלת פונקציית רינדור HTML מוגדרת מראש.       |

### כלי עזר ל-Markdown‏ (remix-intlayer/markdown)

ייבוא:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
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
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| טיפוס                       | תיאור                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | אובייקט המצב המחזיק את `locale`, `defaultLocale` ו-`availableLocales` המאוחסנים בקונטקסט הבקשה של Remix. |
| `IntlayerMiddlewareOptions` | אפשרויות תצורה המועברות לתוכנת התיווך `intlayer()`.                                                      |
| `LocaleRoutingOptions`      | אפשרויות להתאמה אישית של קידומות שפה, זיהוי והפניות.                                                     |
| `LocaleRoutingAction`       | איחוד מובחן (Discriminated union) המייצג את החלטת הניתוב: `redirect`, `rewrite` או `pass`.               |
| `LocaleRoutingRequest`      | ייצוג מינימלי של בקשה הנדרש על ידי `createLocaleRouting`.                                                |
| `UseLocaleResult`           | הטיפוס המוחזר של `useLocale()`, המכיל את `locale`, `defaultLocale` ו-`availableLocales`.                 |
