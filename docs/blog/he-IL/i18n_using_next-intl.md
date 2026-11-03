---
createdAt: 2025-11-01
updatedAt: 2026-11-03
priority: 9
title: "Next.js 16 i18n עם next-intl: מדריך הגדרת App Router"
description: "הגדירו את next-intl באפליקציית Next.js 16 App Router שלב אחר שלב: ניתוב שפות (locale routing), טעינת הודעות לכל עמוד, קומפוננטות שרת ולקוח, ו-metadata עבור SEO."
keywords:
  - next-intl
  - בינאום
  - בלוג
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: גרסה ראשונית
author: aymericzip
---

# כיצד לבצע בינאום לאפליקציית Next.js באמצעות next-intl בשנת 2026

## תוכן עניינים

<TOC/>

## מה זה next-intl?

**next-intl** היא ספריית בינאום (i18n) פופולרית שתוכננה במיוחד עבור Next.js App Router. היא מספקת דרך חלקה לבנות אפליקציות Next.js רב-לשוניות עם תמיכה מעולה ב-TypeScript ואופטימיזציות מובנות.

> אם אתם מעדיפים, תוכלו לעיין גם ב[מדריך next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-i18next.md), או להשתמש ישירות ב-[Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).

- [מדריך next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

> ראו את ההשוואה במאמר [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md).

- [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## מה מראה ה-Benchmark על next-intl ב-Next.js

לפני מימוש התרגומים, חשוב להבין את פרופיל הביצועים של `next-intl`. ה-[i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md) מעריך אפליקציית Next.js זהה בת 10 עמודים ו-10 שפות על פני תצורות וספריות שונות כדי למדוד את טביעת הרגל האמיתית של ה-bundle, זליגת מחרוזות ותקורה של hydration.

- [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="next-intl,@intlayer/next-intl,next-intlayer" vertical/>

<ClickToOpenIframe
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
  width="100%"
  height="600px"
  style="border:none;"
/>

נתונים מרכזיים עבור `next-intl` ב-Next.js (ב-gzip):

| הגדרה                            | גודל ספרייה | ממוצע JS לדף | זליגת שפות אחרות | זליגת עמודים אחרים |
| :------------------------------- | ----------: | -----------: | ---------------: | -----------------: |
| בסיס (ללא i18n)                  |           - |     141.0 KB |             0.0% |               0.0% |
| `next-intl`                      |     14.7 KB |     153.6 KB |             4.2% |              89.8% |
| `@intlayer/next-intl` (compat)   |      8.0 KB |     148.7 KB |             0.0% |               0.0% |
| `next-intlayer` (Intlayer מקורי) |      5.5 KB |     141.3 KB |             0.0% |               0.0% |

מסקנות עיקריות:

- **הימנעו מקטלוג הודעות גלובלי:** בהגדרות סטנדרטיות שבהן כל ההודעות נטענות ב-root layouts, כ-89.8% מהתוכן המתורגם שנשלח לדפדפן שייך לדפים אחרים. שימוש ב-`pick(messages, ['namespace'])` לכל נתיב מבטל זליגה זו, אך דורש תחזוקה ידנית.
- **משקל זמן ריצה:** ה-runtime של `next-intl` מוסיף כ-14.7 KB gzip לכל עמוד. עבור אפליקציות `next-intl` קיימות, מתאם התאימות [`@intlayer/next-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-intl.md) משמר את אותם ה-hooks (`useTranslations`, `useFormatter` וכו') תוך הקטנת גודל זמן הריצה ל-~8.0 KB עם 0% זליגה. ספריית [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/exports.md) המקורית מקטינה את טביעת הרגל עוד יותר ל-5.5 KB.

> צפו בנתונים המלאים: [דוח ביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md), וב-[מאגר ה-benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [דוח ביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

## השוואת תכונות ב-Next.js

כיצד `next-intl` משתווה ל-`next-i18next` ול-Intlayer בתכונות שפרויקט Next.js App Router זקוק להן בדרך כלל:

| תכונה                                    | `next-intlayer` (Intlayer)                       | `next-intl`                                             | `next-i18next`                         |
| ---------------------------------------- | ------------------------------------------------ | ------------------------------------------------------- | -------------------------------------- |
| **תרגומים לצד קומפוננטות**               | ✅ תוכן ממוקם לצד כל קומפוננטה                   | ❌ JSON מרוכז                                           | ❌ JSON מרוכז                          |
| **אינטגרציה עם TypeScript**              | ✅ טיפוסים קפדניים שנוצרים אוטומטית              | ✅ טובה, דרך הרחבת `AppConfig`                          | ⚠️ בסיסית                              |
| **זיהוי תרגומים חסרים**                  | ✅ שגיאות TypeScript ואזהרות בזמן build          | ⚠️ Fallback בזמן ריצה                                   | ⚠️ Fallback בזמן ריצה                  |
| **תוכן עשיר (JSX, Markdown)**            | ✅ תמיכה ישירה                                   | ⚠️ תגיות דרך `t.rich`, ללא Markdown                     | ⚠️ תגיות דרך `<Trans>`                 |
| **תרגום באמצעות בינה מלאכותית (AI)**     | ✅ ספק ומפתח API משלכם, עם הקשר האפליקציה        | ❌ ללא                                                  | ❌ ללא                                 |
| **עורך ויזואלי / CMS**                   | ✅ עורך ויזואלי מקומי + CMS אופציונלי            | ❌ באמצעות פלטפורמות חיצוניות                           | ❌ באמצעות פלטפורמות חיצוניות          |
| **ניתוב מתורגם (Localized routing)**     | ✅ מובנה (Next.js ו-Vite)                        | ✅ מקטע `[locale]` מובנה                                | ✅ מובנה                               |
| **צורות ריבוי (Pluralization)**          | ✅ מבוסס Enumeration                             | ✅ ICU                                                  | ✅ מבוסס סיומת (`_one`, `_other`)      |
| **עיצוב (תאריכים, מספרים, מטבעות)**      | ✅ מעצבים מבוססי `Intl`                          | ✅ `useFormatter`                                       | ✅ מבוסס `Intl`                        |
| **פורמטים של תוכן**                      | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml` | ✅ `.json`, `.js`, `.ts`                                | ⚠️ `.json`                             |
| **ICU MessageFormat**                    | ✅ באמצעות `format: "icu"`                       | ✅ טבעי                                                 | ⚠️ דרך `i18next-icu`                   |
| **כלי עזר ל-SEO (hreflang, sitemap)**    | ✅ עזרי Metadata, sitemap ו-robots.txt           | ✅ טובים                                                | ✅ טובים                               |
| **Server Components**                    | ✅ גישה ישירה בכל Server Component               | ⚠️ העברת `t` או `await getTranslations()` לכל קומפוננטה | ⚠️ העברת `t` במורד עץ הקומפוננטות      |
| **Tree-shaking ברמת הקומפוננטה**         | ✅ בזמן build (Babel / SWC)                      | ⚠️ ידני, באמצעות `pick()` לפי נתיב                      | ⚠️ ידני, עם namespaces לפי נתיב        |
| **טעינה עצלה (Lazy loading)**            | ✅ לפי שפה ולפי מילון                            | ✅ לפי שפה, ניהול namespaces ידני                       | ✅ לפי שפה, ניהול namespaces ידני      |
| **גודל זמן ריצה (gzip, מתוך benchmark)** | 4.9 KB                                           | 14.7 KB                                                 | 19.7 KB                                |
| **בדיקת תרגומים חסרים ב-CI**             | ✅ `npx intlayer test`                           | ⚠️ אינו מובנה                                           | ⚠️ אינו מובנה, `saveMissing` בזמן ריצה |
| **אקוסיסטם / קהילה**                     | ⚠️ קטנה יותר, צומחת במהירות                      | ✅ גדולה                                                | ✅ גדולה מאוד                          |

> גודלי ה-runtime נלקחו מ-[דוח הביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md). לדיון מפורט, קראו את [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md).

- [דוח הביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)

## שיטות עבודה מומלצות

לפני שנצלול למימוש, להלן מספר שיטות עבודה מומלצות:

- **הגדירו את מאפייני `lang` ו-`dir` ב-HTML**  
  ב-layout הראשי, חשבו את כיוון הטקסט בעזרת `getLocaleDirection(locale)` והגדירו `<html lang={locale} dir={dir}>` לטובת נגישות ו-SEO תקינים.
- **פצלו הודעות לפי Namespace**  
  ארגנו קובצי JSON לפי שפה ו-namespace (למשל, `common.json`, `about.json`) כדי לטעון רק את מה שנחוץ.
- **צמצמו את המידע הנשלח ללקוח**  
  בעמודים השונים, שלחו רק את ה-namespaces הנדרשים ל-`NextIntlClientProvider` (לדוגמה, `pick(messages, ['common', 'about'])`).
- **העדיפו עמודים סטטיים**  
  השתמשו בעמודים סטטיים ככל האפשר עבור ביצועים מיטביים ו-SEO משופר.
- **בינאום בקומפוננטות שרת**  
  קומפוננטות שרת, כגון עמודים או רכיבים שלא סומנו ב-`client`, הן סטטיות וניתנות לרינדור מוקדם בזמן build. לכן נעביר אליהן את פונקציות התרגום כ-props.
- **הגדירו טיפוסי TypeScript**  
  עבור השפות שלכם כדי להבטיח Type Safety מלא לאורך כל האפליקציה.
- **שימוש ב-Proxy עבור הפניות (Redirection)**  
  השתמשו ב-proxy לניהול זיהוי השפה, ניתוב והפניית המשתמש לכתובת URL עם קידומת השפה המתאימה.
- **בינאום של Metadata, sitemap ו-robots.txt**  
  בצעו לוקליזציה של metadata, sitemap ו-robots.txt באמצעות הפונקציה `generateMetadata` של Next.js להבטחת גילוי טוב יותר על ידי מנועי חיפוש בכל השפות.
- **התאימו קישורים (Localize Links)**  
  התאימו קישורים באמצעות קומפוננטת `Link` מותאמת כדי להפנות את המשתמש ל-URL עם קידומת השפה הנכונה. זהו שלב חיוני לגילוי הדפים שלכם בכל השפות.
- **אוטומציה של בדיקות ותרגומים**  
  אוטומציה של בדיקות ותרגומים מונעת בזבוז זמן יקר בתחזוקת אפליקציה רב-לשונית.

> עיינו במדריך המרכז את כל מה שצריך לדעת על בינאום ו-SEO: [בינאום (i18n) ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md).

- [בינאום (i18n) ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md)

## מדריך שלב אחר שלב להגדרת next-intl באפליקציית Next.js

<iframe
  src="https://ide.intlayer.org/aymericzip/next-intl-template?file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - כיצד לבצע בינאום לאפליקציה שלכם באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> צפו ב-[תבנית האפליקציה](https://github.com/aymericzip/next-intl-template) ב-GitHub.

להלן מבנה הפרויקט שנבנה:

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # תיקיית src היא אופציונלית
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (קבוצת ניתוב כדי לא להעמיס משאבי בית על שאר הדפים)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות באמצעות npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: ספריית הבינאום המרכזית עבור Next.js App Router המספקת hooks, פונקציות שרת וספקי לקוח לניהול תרגומים.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

צרו קובץ קונפיגורציה המגדיר את השפות הנתמכות ומגדיר את תצורת הבקשה (request configuration) של next-intl. קובץ זה משמש כמקור האמת היחיד להגדרות ה-i18n ומבטיח Type Safety מלא בכל רחבי האפליקציה.

ריכוז הגדרת השפות מונע חוסר עקביות ומקל על הוספה או הסרה של שפות בעתיד. הפונקציה `getRequestConfig` רצה בכל בקשה וטוענת רק את התרגומים הנדרשים לכל עמוד, מה שמאפשר code-splitting ומקטין את גודל ה-bundle.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// הגדרת השפות הנתמכות עם type safety
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// טעינת הודעות בצורה דינמית לפי שפה לאפשור פיצול קוד
// Promise.all טוען namespaces במקביל לביצועים מיטביים
async function loadMessages(locale: Locale) {
  // טעינה של ה-namespaces שה-layout/pages צריכים בלבד
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... קובצי JSON עתידיים יתווספו כאן
  ]);

  return { common, home, about } as const;
}

// פונקציית עזר ליצירת כתובות URL מתורגמות (למשל, /about לעומת /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig רץ בכל בקשה ומספק הודעות לקומפוננטות השרת
// כאן next-intl מתחבר לרינדור צד השרת של Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // שנה אחת
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // שינוי נתיב /en/... ל- /...
  // אופציונלי: שמות נתיבים מתורגמים
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // מניעת הפניות "/" -> "/en" מעוגייה
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

</Step>
<Step number={3} title="הגדרת נתיבי שפה דינמיים">

הגדירו ניתוב דינמי לשפות על ידי יצירת תיקיית `[locale]` בתוך תיקיית האפליקציה שלכם. הדבר מאפשר ל-Next.js לטפל בניתוב מבוסס שפה שבו כל שפה הופכת למקטע ב-URL (למשל, `/en/about`, `/fr/about`).

שימוש בנתיבים דינמיים מאפשר ל-Next.js לייצר דפים סטטיים עבור כל השפות בזמן build, מה שמשפר את הביצועים ואת ה-SEO. קומפוננטת ה-layout מגדירה את מאפייני `lang` ו-`dir` ב-HTML על פי השפה, דבר מהותי לנגישות ולהבנת מנועי חיפוש.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// יצירה מוקדמת של דפים סטטיים לכל השפות בזמן build (SSG)
// משפר ביצועים ו-SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // ב-Next.js App Router, פרמטר params הוא Promise (ניתן להמתין לו באמצעות await)
  // הדבר מאפשר לפתור מקטעי נתיב דינמיים באופן אסינכרוני
  const { locale } = await params;

  // קריטי: setRequestLocale מיידע את next-intl באיזו שפה להשתמש עבור בקשה זו
  // ללא זה, פונקציית getTranslations() לא תדע באיזה locale להשתמש בקומפוננטות שרת
  setRequestLocale(locale);

  // קבלת כיוון הטקסט (LTR/RTL) להצגת HTML תקינה
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ההודעות נטענות בצד השרת. שלחו ללקוח רק את מה שנחוץ.
  // זה ממזער את גודל ה-JavaScript שנשלח לדפדפן
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // תרגומים ועיצוב בצד השרת בלבד
  // אלה רצים בשרת וניתנים להעברה כ-props לקומפוננטות
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider הופך את התרגומים לזמינים לקומפוננטות לקוח
    // העבירו רק את ה-namespaces שקומפוננטות הלקוח שלכם באמת משתמשות בהם
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

</Step>
<Step number={4} title="יצירת קובצי התרגום">

צרו קובצי JSON עבור כל שפה ו-namespace. מבנה זה מאפשר לכם לארגן תרגומים בצורה הגיונית ולטעון רק את מה שאתם צריכים לכל עמוד.

ארגון תרגומים לפי namespace (למשל, `common.json`, `about.json`) מאפשר פיצול קוד ומקטין את גודל ה-bundle.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

 </Tab>
</Tabs>

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

 </Tab>
</Tabs>

</Step>
<Step number={5} title="שימוש בתרגומים בתוך הדפים שלכם">

צרו קומפוננטת דף הטוענת תרגומים בשרת ומעבירה אותם לקומפוננטות שרת ולקוח כאחד. כך מובטח שהתרגומים נטענים לפני הרינדור ונמנע הבהוב תוכן.

טעינה בצד השרת משפרת SEO ומונעת הבהוב של תוכן לא מתורגם (FOUC). על ידי שימוש ב-`pick` כדי לשלוח רק את ה-namespaces הנדרשים ל-provider של הלקוח, אנו ממזערים את גודל ה-bundle שנשלח לדפדפן.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ההודעות נטענות בצד השרת. שלחו ללקוח רק את מה שנחוץ.
  // פעולה זו ממזערת את גודל ה-JavaScript שנשלח לדפדפן
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // תרגומים ועיצוב בצד השרת בלבד
  // אלה רצים בשרת ומועברים כ-props לקומפוננטות
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider הופך את התרגומים לזמינים לקומפוננטות לקוח
    // העבירו רק את ה-namespaces שקומפוננטות הלקוח אכן צורכות
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

</Step>
<Step number={6} title="שימוש בתרגומים בקומפוננטות לקוח">

קומפוננטות לקוח יכולות להשתמש ב-hooks בשם `useTranslations` ו-`useFormatter` כדי לגשת לתרגומים ולפונקציות עיצוב. ה-hooks הללו קוראים מתוך ההקשר (context) של `NextIntlClientProvider`.

קומפוננטות לקוח זקוקות ל-React hooks כדי לגשת לתרגומים. ה-hooks משתלבים בצורה נקייה ומספקים עדכונים ריאקטיביים כאשר ה-locale משתנה.

> אל תשכחו להוסיף את ה-namespaces הנדרשים להודעות הלקוח של הדף (כללו אך ורק את מה שקומפוננטות הלקוח צריכות בפועל).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // מיקוד ישיר לאובייקט המקונן
  // useTranslations ו-useFormatter הם hooks שקוראים מתוך ה-NextIntlClientProvider
  // הם עובדים רק אם הקומפוננטה עטופה ב-NextIntlClientProvider
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={7} title="שימוש בתרגומים בקומפוננטות שרת">

קומפוננטות שרת אינן יכולות להשתמש ב-React hooks, ולכן הן מקבלות תרגומים ומעצבים כ-props מקומפוננטות ההורה שלהן. גישה זו שומרת עליהן סינכרוניות ומאפשרת לקנן אותן בתוך קומפוננטות לקוח.

קומפוננטות שרת שעשויות להיות מקוננות תחת גבולות לקוח חייבות להיות סינכרוניות. על ידי העברת מחרוזות מתורגמות וערכים מעוצבים כ-props, אנו נמנעים מפעולות אסינכרוניות ומבטיחים רינדור תקין. חשבו מראש את התרגומים והעיצוב בקומפוננטת הדף ההורה.

```tsx fileName="src/components/ServerComponent.tsx"
// קומפוננטות שרת המקוננות בתוך קומפוננטות לקוח חייבות להיות סינכרוניות
// React אינה יכולה לבצע serialization לפונקציות אסינכרוניות מעבר לגבול שרת/לקוח
// הפתרון: חישוב מוקדם של תרגומים ועיצוב בהורה והעברתם כ-props
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> בדף או ב-layout שלכם, השתמשו ב-`getTranslations` וב-`getFormatter` מתוך `next-intl/server` כדי לחשב מראש תרגומים ועיצוב, ואז העבירו אותם כ-props לקומפוננטות השרת.

</Step>
<Step number={8} title="החלפת שפת התוכן" isOptional={true}>

כדי להחליף את שפת התוכן באמצעות next-intl, רנדרו קישורים מודעי שפה המצביעים על אותו נתיב תוך החלפת ה-locale. ה-provider משכתב כתובות URL באופן אוטומטי, כך שאתם צריכים לכוון רק לנתיב הנוכחי.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // הסרת קידומת השפה משם הנתיב לקבלת נתיב הבסיס
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Language selector">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // בניית ה-href על פי האם זו שפת ברירת המחדל
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

</Step>
<Step number={9} title="שימוש בקומפוננטת Link מתורגמת" isOptional={true}>

`next-intl` מספקת תת-חבילה בשם `next-intl/navigation` הכוללת קומפוננטת קישור מותאמת שפה, המיישמת אוטומטית את השפה הפעילה. כבר חילצנו אותה עבורכם בקובץ `@/i18n`, כך שתוכלו להשתמש בה כך:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

</Step>
<Step number={10} title="גישה לשפה הפעילה בתוך Server Actions" isOptional={true}>

פעולות שרת יכולות לקרוא את השפה הנוכחית באמצעות `next-intl/server`. הדבר שימושי לשליחת מיילים מותאמים אישית או שמירת העדפות שפה לצד נתונים שנשלחו בטפסים.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // שימוש ב-locale לבחירת תבניות, תוויות אנליטיקה וכו'
  console.log(`Received contact form from locale ${locale}`);
}
```

> פונקציית `getLocale` קוראת את השפה שנקבעה על ידי ה-proxy של `next-intl`, ולכן היא פועלת בכל מקום בשרת: Route Handlers, Server Actions ופונקציות edge.

</Step>
<Step number={11} title="בינאום של נתוני Metadata" isOptional={true}>

תרגום תוכן הוא חשוב, אך המטרה העיקרית של בינאום היא להפוך את האתר שלכם לנראה ונגיש יותר ברחבי העולם. בינאום (i18n) הוא מנוף רב-עוצמה לשיפור נראות האתר באמצעות SEO מוקפד.

נתוני Metadata מותאמים שפה מסייעים למנועי חיפוש להבין אילו שפות זמינות בדפים שלכם. זה כולל הגדרת תגיות hreflang, תרגום כותרות ותיאורים, והבטחת כתובות קנוניות (canonical URLs) מדויקות לכל שפה.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata רץ עבור כל שפה, ומייצר נתוני SEO metadata מותאמים
// זה עוזר למנועי חיפוש להבין גרסאות שפה חלופיות
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... שאר קוד העמוד
```

</Step>
<Step number={12} title="בינאום של ה-Sitemap" isOptional={true}>

צרו sitemap הכולל את כל גרסאות השפה של העמודים שלכם. הדבר מסייע למנועי חיפוש לגלות ולאנדקס את כל גרסאות השפה של התוכן.

קובץ sitemap רב-לשוני תקין מבטיח שמנועי חיפוש ימצאו את כל השפות, ובכך משפר את הדירוג בתוצאות חיפוש בינלאומיות.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * קבלת מיפוי של כל השפות והנתיבים המתורגמים שלהן
 *
 * דוגמה לפלט:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// יצירת sitemap עם כל גרסאות השפה לשיפור SEO
// שדה alternates מיידע את מנועי החיפוש על גרסאות השפה השונות
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

</Step>
<Step number={13} title="בינאום של ה-robots.txt" isOptional={true}>

צרו קובץ robots.txt שמנהל בצורה נכונה את כל גרסאות השפה של הנתיבים המוגנים שלכם. הדבר מונע ממנועי חיפוש לאנדקס עמודי ניהול (admin) או לוחות בקרה (dashboard) באף שפה.

הגדרה נכונה של robots.txt עבור כל השפות מונעת אינדוקס של עמודים רגישים כאשר הנתיבים שונים בין שפה לשפה.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// יצירת נתיבים לכל השפות (למשל, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

</Step>
<Step number={14} title="הגדרת Proxy עבור ניתוב שפות" isOptional={true}>

צרו proxy לזיהוי אוטומטי של שפת המשתמש המועדפת והפנייתו ל-URL בעל קידומת השפה המתאימה. `next-intl` מספקת פונקציית middleware נוחה שמטפלת בכך באופן אוטומטי.

ה-proxy מבטיח שמשתמשים יופנו אוטומטית לשפתם המועדפת כאשר הם מבקרים באתר שלכם. הוא גם שומר את העדפת המשתמש לביקורים עתידיים, מה שמשפר את חוויית השימוש.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware רץ לפני נתיבים, ומטפל בזיהוי שפה ובניתוב
// הגדרת localeDetection: true משתמשת ב-header של Accept-Language לזיהוי אוטומטי של השפה
export default proxy;

export const config = {
  // דילוג על נתיבי API, קבצים פנימיים של Next ונכסים סטטיים
  // Regex: התאמה לכל הנתיבים למעט אלו שמתחילים ב-api, _next, או מכילים נקודה (קבצים)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={15} title="הגדרת טיפוסי TypeScript עבור השפה" isOptional={true}>

הגדרת TypeScript תסייע לכם לקבל השלמה אוטומטית ובטיחות טיפוסים מלאה למפתחות שלכם.

לשם כך, צרו קובץ `global.ts` בשורש הפרויקט והוסיפו את הקוד הבא:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... קובצי JSON עתידיים יתווספו כאן גם כן
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

קוד זה משתמש ב-Module Augmentation כדי להוסיף את השפות וההודעות לטיפוס ה-`AppConfig` של `next-intl`.

</Step>
<Step number={16} title="אוטומציה של תרגומים באמצעות Intlayer" isOptional={true}>

Intlayer היא ספרייה **חינמית** ובעלת **קוד פתוח** שנועדה לסייע בתהליך הלוקליזציה באפליקציה שלכם. בעוד ש-next-intl מנהלת את טעינת התרגומים והצגתם, Intlayer מסייעת באוטומציה של כל תהליך העבודה (workflow).

ניהול תרגומים ידני עלול להיות גוזל זמן ומועד לשגיאות. Intlayer מבצעת אוטומציה של בדיקות, יצירה וניהול תרגומים, וחוסכת זמן תוך הבטחת עקביות בכל האפליקציה.

Intlayer מאפשרת לכם:

- **להצהיר על תוכן בכל מקום שתרצו בבסיס הקוד**  
  Intlayer מאפשרת להגדיר תוכן היכן שנוח לכם באמצעות קובצי `.content.{ts|js|json}`. זה מאפשר ארגון טוב יותר של התוכן ומבטיח קריאות ותחזוקתיות מעולות של הקוד.

- **לבדוק תרגומים חסרים**  
  Intlayer מספקת פונקציות בדיקה שניתן לשלב ב-CI/CD pipeline או בבדיקות היחידה שלכם. למידע נוסף ראו [בדיקת התרגומים שלכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md).

- **לבצע אוטומציה של תרגומים**  
  Intlayer מציעה CLI והרחבה ל-VSCode לאוטומציה של תהליך התרגום. ניתן לשלב אותם ב-CI/CD pipeline. קראו עוד על [אוטומציה של תרגומים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).  
  ניתן להשתמש ב**מפתח API משלכם ובספק הבינה המלאכותית (AI) המועדף עליכם**. הספרייה מספקת גם תרגומים מודעי הקשר, ראו [מילוי תוכן אוטומטי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md).

- **חיבור תוכן חיצוני**  
  Intlayer מאפשרת לחבר את התוכן שלכם למערכת ניהול תוכן (CMS) חיצונית, לשלוף אותו באופן ממוטב ולהטמיעו במשאבי ה-JSON שלכם. למידע נוסף ראו [משיכת תוכן חיצוני](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/function_fetching.md).

- **עורך ויזואלי**  
  Intlayer מספקת עורך ויזואלי חינמי לעריכת התוכן שלכם בצורה אינטואיטיבית. למידע נוסף ראו [עריכה ויזואלית של תרגומים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md).

ועוד הרבה מעבר. לגילוי כל היכולות שמציעה Intlayer, אנא עיינו ב[תיעוד היתרונות של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md).

- [תיעוד היתרונות של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)

לדוחות ביצועים מפורטים והשוואות נוספות, עיינו בקישורים הבאים:

- [דוח הביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [מערך הביצועים של i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [next-intl מול @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer-next-intl.md)
- [מתאם תאימות @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-intl.md)

</Step>

</Steps>
