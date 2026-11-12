---
createdAt: 2026-04-03
updatedAt: 2026-11-03
priority: 8
title: "דומיינים מותאמים אישית: דומיין אחד לכל שפה"
description: "הגדירו ניתוב שפות מבוסס דומיין ב-Intlayer כדי להגיש שפות שונות משמות מארח ייעודיים."
keywords:
  - דומיינים מותאמים אישית
  - ניתוב דומיינים
  - ניתוב
  - בינאום
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "צמצום טיפוס ההחזרה של getLocalizedUrl ו-getLocalizedPath מתוך routing.domains, והפקת חלופות מפת אתר מודעות לדומיין."
  - version: 8.7.0
    date: 2026-04-03
    changes: "הוספת ניתוב שפות מבוסס דומיין באמצעות תצורת routing.domains."
author: aymericzip
---

# דומיינים מותאמים אישית (Custom Domains)

Intlayer תומך בניתוב שפות מבוסס דומיין, מה שמאפשר לכם להגיש שפות ספציפיות מתוך שמות מארח (hostnames) ייעודיים. לדוגמה, מבקרים בסינית יכולים להיות מנותבים אל `intlayer.zh` במקום `intlayer.org/zh`.

## כיצד זה פועל

מפת ה-`domains` תחת הגדרת `routing` משייכת כל שפה לשם מארח. Intlayer משתמש במפה זו בשני מקומות:

1. **יצירת כתובות URL** (`getLocalizedUrl`): כאשר שפת היעד שוכנת בדומיין _שונה_ מהדף הנוכחי, מוחזרת כתובת URL מוחלטת (לדוגמה `https://intlayer.zh/about`). כאשר שני הדומיינים תואמים, מוחזרת כתובת URL יחסית (לדוגמה `/fr/about`).
2. **שרת Proxy** (ב-Next.js וב-Vite): בקשות נכנסות מנותבות מחדש (redirect) או משוכתבות (rewrite) בהתבסס על הדומיין שאליו הן מגיעות.

### דומיינים בלעדיים מול דומיינים משותפים

ההבחנה המרכזית היא **בלעדיות (exclusivity)**:

- **דומיין בלעדי (Exclusive domain)**, רק שפה אחת ממופה לשם מארח זה (לדוגמה `zh → intlayer.zh`). הדומיין עצמו מזהה את השפה, ולכן לא מתווספת קידומת שפה לנתיב. הכתובת `https://intlayer.zh/about` מגישה תוכן בסינית.
- **דומיין משותף (Shared domain)**, מספר שפות ממופות לאותו שם מארח (לדוגמה `en` ו-`fr` שתיהן ממופות ל-`intlayer.org`). במקרה זה חל ניתוב רגיל מבוסס קידומת. הכתובת `intlayer.org/fr/about` מגישה תוכן בצרפתית.

## הגדרות (Configuration)

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.CHINESE],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // דומיין משותף - en ו-fr משתמשים בניתוב קידומות ב-intlayer.org
      en: "intlayer.org",
      // דומיין בלעדי - ל-zh יש שם מארח משלו, אין צורך בקידומת /zh/
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

שפות שאינן רשומות תחת `domains` ממשיכות להשתמש בניתוב הקידומות הסטנדרטי ללא שום דריסת דומיין.

## יצירת כתובות URL

הפונקציה `getLocalizedUrl` מייצרת אוטומטית את סוג ה-URL הנכון בהתאם להקשר הקריאה.

### שפה באותו הדומיין (URL יחסי)

```ts
// דף נוכחי: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (שפת ברירת מחדל, ללא קידומת)
```

### שפה בדומיין צולב (URL מוחלט)

```ts
// דף נוכחי: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (דומיין בלעדי, ללא קידומת /zh/)
```

### הגשה מתוך הדומיין הייעודי של השפה

```ts
// דף נוכחי: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (כבר נמצא בדומיין הנכון - URL יחסי)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (קישור חוצה-דומיינים בחזרה ל-intlayer.org)
```

### זיהוי אוטומטי של הדומיין הנוכחי

הפרמטר `currentDomain` הוא אופציונלי. כאשר הוא מושמט, `getLocalizedUrl` מפענח אותו בסדר הבא:

1. שם המארח של כתובת קלט מוחלטת (לדוגמה `https://intlayer.org/about` ← `intlayer.org`).
2. `window.location.hostname` בסביבת דפדפן.
3. אם אף אחד מהם אינו זמין (SSR, יצירה סטטית), מוחזר ה-URL המוחלט בדומיין של השפה, וזהו ה-fallback הבטוח. לא ניתן להסתמך שם על URL יחסי: הקידומת של שפה בעלת דומיין בלעדי כבר הוסרה, ולכן היא הייתה מתפענחת לשפה השגויה בכל דומיין שמגיש את הדף במקרה.

```ts
// דפדפן - window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (מזוהה אוטומטית מתוך window)

// מתוך כתובת URL מוחלטת - הדומיין מזוהה אוטומטית
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` עם דומיינים

הפונקציה `getMultilingualUrls` קוראת ל-`getLocalizedUrl` עבור כל שפה, ולכן היא מייצרת שילוב של כתובות URL יחסיות ומוחלטות בהתאם לדומיין של הקורא:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

כתובות URL מוחלטות אלו מוכנות לשימוש בתגי `<link rel="alternate" hreflang="...">` עבור SEO.

## הסקת טיפוסים (Type Inference)

ההגדרה `routing.domains` עוברת סריאליזציה לתוך ה-module augmentation שנוצר, כך ש-`getLocalizedUrl` ו-`getLocalizedPath` מצמצמים את טיפוס ההחזרה שלהם ל-URL המדויק שאליו שפה מנותבת-דומיין מתפענחת, כולל השמטת הקידומת.

```ts
// routing: { mode: 'prefix-no-default', domains: { en: 'intlayer.org', zh: 'intlayer.zh' } }

getLocalizedUrl("/about", "zh");
//     ^? "https://intlayer.zh/about" | "/about"

getLocalizedPath("/about", "zh");
//     ^? "/about"   (לעולם לא origin, וללא קידומת /zh/)
```

טיפוס ה-URL הוא ה-**איחוד (union)** של שני הערכים שהפונקציה יכולה להחזיר: ה-URL המוחלט בדומיין של השפה, וה-URL היחסי המוחזר כאשר הדף המרונדר כבר נמצא באותו הדומיין. לפונקציה `getLocalizedPath` אין עמימות כזו, היא לעולם אינה פולטת origin, ולכן היא נשארת ליטרל יחיד.

שפות החולקות דומיין שומרות על הקידומת הרגילה שלהן גם בטיפוס:

```ts
getLocalizedUrl("/about", "fr");
//     ^? "https://intlayer.org/fr/about" | "/fr/about"
```

> בנו מחדש את הטיפוסים (`npx intlayer build`, או כל הפעלה של שרת פיתוח) לאחר שינוי `routing.domains`, הצמצום מגיע מתוך ה-`__RoutingRegistry` שנוצר, ולא ישירות מקובץ התצורה עצמו.

## התנהגות Proxy

### Next.js

ה-middleware של `intlayerProxy` מטפל בניתוב דומיינים באופן אוטומטי. הוסיפו אותו לקובץ `middleware.ts` שלכם:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**הפניה (Redirect)**, בקשה מגיעה לדומיין השגוי עבור קידומת שפה נתונה:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**שכתוב (Rewrite)**, בקשה מגיעה לדומיין הבלעדי של השפה ללא קידומת:

```
GET intlayer.zh/about
→ rewrite to /zh/about  (ניתוב פנימי של Next.js בלבד, ה-URL נשאר נקי)
```

### Vite

תוסף ה-Vite של `intlayerProxy` מחיל את אותה הלוגיקה בזמן פיתוח:

> החל מ-Intlayer v9, ה-`intlayerProxy()` ארוז ישירות בתוך התוסף `intlayer()` ומופעל כברירת מחדל דרך האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר לצורך תאימות לאחור ועבור מערכות שצריכות לשלוט בסדר התוספים. הגדירו `routing.enableProxy: false` כדי לבטל. עיינו ב[הערות שחרור גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות שחרור גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> **הערה**: בפיתוח מקומי אתם נמצאים בדרך כלל ב-`localhost`, ולכן הפניות חוצות-דומיינים יצביעו על הדומיינים החיים ולא על פורט מקומי אחר. השתמשו בדריסת קובץ hosts (למשל `127.0.0.1 intlayer.zh`) או ב-reverse proxy אם עליכם לבדוק ניתוב מרובה דומיינים באופן מקומי.

## בורר שפות (Locale Switcher)

ה-hook‏ `useLocale` מתוך `next-intlayer` מטפל אוטומטית בניווט מודע-דומיין. כאשר משתמש עובר לשפה בדומיין אחר, ה-hook מבצע ניווט דף מלא (`window.location.href`) במקום ביצוע router push בצד הלקוח, כיוון שהנתב של Next.js אינו יכול לחצות origins.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {localeEl.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

אין צורך בהגדרות נוספות, ה-`useLocale` מזהה פנימית את `window.location.hostname` ומחליט בין `router.replace` (באותו הדומיין) לבין `window.location.href` (בדומיין צולב).

## SEO: קישורי חלופה של `hreflang`

ניתוב מבוסס דומיין משמש בדרך כלל יחד עם `hreflang` כדי לומר למנועי חיפוש איזה URL לאנדקס עבור כל שפה. השתמשו ב-`getMultilingualUrls` כדי לייצר את הסט המלא של כתובות ה-URL החלופיות:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // למשל "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

זה מייצר:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## כלי שירות מרכזיים

| כלי שירות                                         | תיאור                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | מחזיר URL יחסי או מוחלט בהתאם לשאלה האם שפת היעד נמצאת בדומיין הנוכחי.            |
| `getMultilingualUrls(url, { currentDomain })`     | מחזיר מפה עם מפתחות שפה של כתובות URL מתורגמות, המשלבת יחסיות ומוחלטות לפי הצורך. |
| `getPrefix(locale, { domains })`                  | מחזיר קידומת ריקה עבור שפות בעלות דומיין בלעדי, וקידומת רגילה אחרת.               |
| `getLocalizedPath(path, locale, { domains })`     | מחזיר את הנתיב המוגש בדומיין של השפה, ללא הקידומת שלו, לעולם לא origin.           |
| `generateSitemap(entries, { domains })`           | פולט חלופות `hreflang` המצביעות על הדומיין הייעודי של כל שפה.                     |
