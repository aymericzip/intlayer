---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: כיצד לאחזר את ה-locale מתוך cookies / headers?
description: "קרא את ה-locale הנוכחי מתוך עוגיות (cookies) או כותרות הבקשה (headers) באמצעות Intlayer, בצד השרת או ב-middleware, כדי לרנדר את השפה הנכונה."
keywords:
  - cookie
  - עוגיות
  - headers
  - כותרות
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
author: aymericzip
---

# כיצד לאחזר את ה-locale מתוך עוגיות (cookies) / כותרות (headers)

## שימוש ב-Hooks (מומלץ)

עבור מרבית תרחישי השימוש, מומלץ לאחזר את ה-locale הנוכחי באמצעות ה-hook‏ `useLocale` מכיוון שהוא נפתר אוטומטית (auto-resolved). זה עובד בדומה ל-composable‏ `useLocale` ב-Vue.js.

```ts
import { useLocale } from "next-intlayer";
// או import { useLocale } from "react-intlayer";
// או import { useLocale } from "vue-intlayer";

// שימוש בצד הלקוח (Client-side)
const { locale } = useLocale();
```

עבור רכיבי שרת (Server Components), ניתן לייבא אותו מתוך:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

קיים גם ה-hook‏ `useLocaleCookie` שפותר אך ורק את ערך ה-cookie.

## הגדרת Cookie ידנית

ניתן להגדיר שם cookie מותאם אישית באופן הבא:

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // ברירת המחדל היא 'intlayer-locale'
  },
};

export default config;
```

ולאחר מכן לאחזר אותו כך:

### צד הלקוח (Client-side)

```ts
// שימוש בשם ה-cookie המוגדר כברירת מחדל
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// שימוש בשם cookie מותאם אישית
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### צד השרת (Next.js)

```ts
import { cookies } from "next/headers";

// שימוש בשם ה-cookie המוגדר כברירת מחדל
const locale = cookies().get("intlayer-locale")?.value;

// שימוש בשם cookie מותאם אישית
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### אם ה-locale עדיין לא הוגדר

ה-locale נשמר כ-cookie רק לאחר שהמשתמש בוחר במפורש את ה-locale. כברירת מחדל, עבור מבקרים חדשים, ה-locale מפוענח מתוך שדות ה-headers.

ניתן לזהות את ה-locale המועדף על המשתמש מתוך כותרות הבקשה (request headers). להלן דוגמה כיצד לטפל בכך:

```ts
/**
 * מזהה את ה-locale מתוך כותרות הבקשה
 *
 * כותרת ה-accept-language היא החשובה ביותר לזיהוי locale.
 * היא מכילה רשימת קודי שפה עם ערכי איכות (q-values) המציינים
 * את השפות המועדפות על המשתמש לפי סדר עדיפות.
 *
 * דוגמה: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US היא השפה הראשית (משתמע q=1.0)
 * - en היא האפשרות השנייה (q=0.9)
 * - fr היא האפשרות השלישית (q=0.8)
 * - es היא האפשרות הרביעית (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * דוגמה לכותרות negotiator שדפדפנים שולחים בדרך כלל
 * כותרות אלו מסייעות לקבוע את השפה המועדפת על המשתמש
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// דוגמת שימוש:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
