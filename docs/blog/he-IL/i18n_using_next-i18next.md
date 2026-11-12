---
createdAt: 2025-11-01
updatedAt: 2026-11-03
priority: 9
title: "Next.js 16 i18n עם next-i18next: מדריך הגדרת App Router"
description: "הגדירו את next-i18next ו-i18next באפליקציית Next.js 16 App Router שלב אחר שלב: namespaces, ניתוב שפות (locale routing), קומפוננטות שרת ולקוח, ו-metadata עבור SEO."
keywords:
  - next-i18next
  - i18next
  - בינאום
  - בלוג
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: גרסה ראשונית
author: aymericzip
---

# כיצד לבצע בינאום לאפליקציית Next.js באמצעות next-i18next בשנת 2026

## תוכן עניינים

<TOC/>

## מה זה next-i18next?

**next-i18next** הוא פתרון בינאום (i18n) פופולרי עבור אפליקציות Next.js. בעוד שחבילת `next-i18next` המקורית תוכננה עבור ה-Pages Router, מדריך זה מדגים כיצד לממש את i18next עם ה-**App Router** המודרני באמצעות שימוש ישיר ב-`i18next` וב-`react-i18next`.

באמצעות גישה זו, תוכלו:

- **לארגן תרגומים** באמצעות namespaces (למשל, `common.json`, `about.json`) לניהול תוכן מיטבי.
- **לטעון תרגומים ביעילות** על ידי טעינת ה-namespaces הנדרשים בלבד עבור כל דף, ובכך להקטין את גודל ה-bundle.
- **לתמוך בקומפוננטות שרת ולקוח כאחד** עם ניהול נכון של SSR ו-hydration.
- **להבטיח תמיכה ב-TypeScript** עם הגדרת locales בטוחה מסוגים ומפתחות תרגום מוקלדים.
- **לבצע אופטימיזציה ל-SEO** באמצעות בינאום נכון של metadata, sitemap ו-robots.txt.

> כחלופה, תוכלו לעיין גם ב[מדריך next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-intl.md), או להשתמש ישירות ב-[Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).

- [מדריך next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

> ראו את ההשוואה במאמר [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md).

- [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## מה מראה ה-Benchmark על next-i18next ב-Next.js

לפני שנצלול להגדרות, חיוני להבין את השפעת הביצועים וגודל ה-bundle של ספריית ה-i18n שבחרתם. ה-[i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md) מריץ אפליקציית Next.js זהה בת 10 עמודים ו-10 שפות על פני ספריות ה-i18n המובילות כדי למדוד את טביעת הרגל האמיתית של ה-bundle, זליגת מחרוזות (string leakage) ותקורה של hydration.

- [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="next-i18next,@intlayer/next-i18next,next-intlayer" vertical/>

<ClickToOpenIframe
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
  width="100%"
  height="600px"
  style="border:none;"
/>

נתונים מרכזיים עבור `next-i18next` ב-Next.js (ב-gzip):

| הגדרה                             | גודל ספרייה | ממוצע JS לדף | זליגת שפות אחרות | זליגת עמודים אחרים |
| :-------------------------------- | ----------: | -----------: | ---------------: | -----------------: |
| בסיס (ללא i18n)                   |           - |     141.0 KB |             0.0% |               0.0% |
| `next-i18next`                    |     19.7 KB |     169.5 KB |            50.0% |              89.8% |
| `@intlayer/next-i18next` (compat) |      9.4 KB |     150.7 KB |             0.0% |               0.0% |
| `next-intlayer` (Intlayer מקורי)  |      5.5 KB |     141.3 KB |             0.0% |               0.0% |

מסקנות עיקריות:

- **פיצול Namespaces הוא הכרחי:** בהגדרות בסיסיות, `next-i18next` שולחת כל namespace בכל עמוד (~89.8% זליגת עמודים). פיצול ל-namespaces לפי נתיב וטעינתם באופן עצל מקטינים את ה-JS של העמוד, אך דורשים ארגון ידני קפדני.
- **משקל זמן ריצה:** ה-runtime של לקוח `i18next` שוקל כ-19.7 KB gzip בכל עמוד. עבור בסיסי קוד קיימים, מתאם ה-compat של [`@intlayer/next-i18next`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-i18next.md) שומר על אותו API של `i18next` תוך צמצום זמן הריצה ל-9.4 KB וביטול מוחלט של זליגת תוכן. ספריית [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/exports.md) המקורית יורדת ל-5.5 KB בלבד.

> צפו בנתונים המלאים: [דוח ביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md), וב-[מאגר ה-benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [דוח ביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

## השוואת תכונות ב-Next.js

כיצד `next-i18next` משתווה ל-`next-intl` ול-Intlayer בתכונות שפרויקט Next.js App Router זקוק להן בדרך כלל:

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

## מדריך שלב אחר שלב להגדרת i18next באפליקציית Next.js

<iframe
  src="https://ide.intlayer.org/aymericzip/next-i18next-template?file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - כיצד לבצע בינאום לאפליקציה שלכם באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> צפו ב-[תבנית האפליקציה](https://github.com/aymericzip/next-i18next-template) ב-GitHub.

להלן מבנה הפרויקט שנבנה:

```bash
.
├── i18n.config.ts
└── src # תיקיית src היא אופציונלית
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (קבוצת ניתוב כדי לא להעמיס הודעות בית על שאר הדפים)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות באמצעות npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: תשתית הבינאום המרכזית שמנהלת את טעינת התרגומים והטיפול בהם.
- **react-i18next**: חיבורי React עבור i18next המספקים hooks כגון `useTranslation` עבור קומפוננטות לקוח.
- **i18next-resources-to-backend**: תוסף המאפשר טעינה דינמית של קובצי תרגום, כך שתוכלו לטעון רק את ה-namespaces הנדרשים.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

צרו קובץ קונפיגורציה להגדרת השפות הנתמכות, שפת ברירת המחדל ופונקציות עזר ללוקליזציה של כתובות URL. קובץ זה משמש כמקור האמת היחיד להגדרות ה-i18n שלכם ומבטיח Type Safety מלא בכל רחבי האפליקציה.

ריכוז הגדרת השפות מונע חוסר עקביות ומקל על הוספה או הסרה של שפות בעתיד. פונקציות העזר מבטיחות יצירת כתובות URL עקבית עבור SEO וניתוב.

```ts fileName="i18n.config.ts"
// הגדרת השפות הנתמכות כמערך קבוע לטובת type safety
// ההגדרה 'as const' גורמת ל-TypeScript להסיק טיפוסים ליטרליים במקום string[]
export const locales = ["en", "fr"] as const;

// חילוץ טיפוס ה-Locale מתוך מערך ה-locales
// פעולה זו יוצרת union type: "en" | "fr"
export type Locale = (typeof locales)[number];

// הגדרת שפת ברירת המחדל כאשר לא צוינה שפה
export const defaultLocale: Locale = "en";

// שפות הנכתבות מימין לשמאל (RTL) הזקוקות להתאמת כיווניות טקסט מיוחדת
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// בדיקה האם שפה מסוימת דורשת כיווניות RTL
// משמש לשפות כמו ערבית, עברית, פרסית ואורדו
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// יצירת נתיב מותאם שפה עבור locale ונתיב נתונים
// לנתיבי שפת ברירת המחדל אין קידומת (למשל, "/about" במקום "/en/about")
// שפות אחרות מקבלות קידומת (למשל, "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// כתובת בסיס עבור כתובות URL אבסולוטיות (בשימוש ב-sitemaps, metadata וכו')
const ORIGIN = "https://example.com";

// יצירת כתובת URL אבסולוטית עם קידומת שפה
// משמש עבור metadata של SEO, קובצי sitemap וכתובות canonical
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// משמש להגדרת עוגיית ה-locale בדפדפן
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // שנה אחת
    "SameSite=Lax",
  ].join("; ");
}
```

</Step>
<Step number={3} title="ריכוז ה-Namespaces של התרגום">

צרו מקור אמת יחיד עבור כל namespace שהאפליקציה שלכם חושפת. שימוש חוזר ברשימה זו שומר על תיאום מלא בין קוד השרת, הלקוח וכלי הפיתוח ומאפשר הקלדה חזקה של פונקציות העזר.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

</Step>
<Step number={4} title="הקלדה חזקה של מפתחות תרגום באמצעות TypeScript">

הרחיבו את `i18next` כך שיצביע על קובצי השפה הקנוניים שלכם (בדרך כלל אנגלית). כך TypeScript יסיק מפתחות תקפים לכל namespace, וקריאות ל-`t()` ייבדקו מקצה לקצה בזמן קומפילציה.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> טיפ: שמרו הצהרה זו תחת `src/types` (צרו את התיקייה אם היא אינה קיימת). Next.js כבר כולל את `src` בקובץ `tsconfig.json`, כך שההרחבה תזוהה אוטומטית. אם לא, הוסיפו את השורה הבאה לקובץ `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

כעת תוכלו ליהנות מהשלמה אוטומטית ובדיקות תקינות בזמן הידור:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// תקין, מוקלד: t("counter.increment")
// שגיאה, נכשל בקומפילציה: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

</Step>
<Step number={5} title="הגדרת אתחול i18n בצד השרת">

צרו פונקציית אתחול בצד השרת הטוענת תרגומים עבור קומפוננטות שרת. פונקציה זו מייצרת מופע i18next נפרד עבור SSR, ומבטיחה שהתרגומים ייטענו עוד לפני הרינדור.

קומפוננטות שרת זקוקות למופע i18next משלהן מכיוון שהן רצות בהקשר שונה מקומפוננטות לקוח. טעינה מוקדמת של תרגומים בשרת מונעת הבהוב של תוכן לא מתורגם (FOUC) ומשפרת את ה-SEO בכך שהיא מבטיחה שמנועי חיפוש יראו תוכן מתורגם במלואו.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// הגדרת טעינת משאבים דינמית עבור i18next
// פונקציה זו מייבאת דינמית קובצי JSON של תרגום לפי שפה ו-namespace
// דוגמה: locale="fr", namespace="about" -> מייבא את "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * אתחול מופע i18next עבור רינדור בצד השרת (SSR)
 *
 * @returns מופע i18next מאותחל ומוכן לשימוש בצד השרת
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // יצירת מופע i18next חדש (נפרד ממופע צד הלקוח)
  const i18n = createInstance();

  // אתחול עם אינטגרציית React ומטעין ה-backend
  await i18n
    .use(initReactI18next) // הפעלת תמיכה ב-React hooks
    .use(backend) // הפעלת טעינת משאבים דינמית
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // טעינת ה-namespaces המוגדרים בלבד לשיפור ביצועים
      defaultNS: "common", // namespace ברירת מחדל כאשר לא צוין כזה
      interpolation: { escapeValue: false }, // אין צורך ב-escape ל-HTML (React מטפלת בהגנת XSS)
      react: { useSuspense: false }, // השבתת Suspense לטובת תאימות SSR
      returnNull: false, // החזרת מחרוזת ריקה במקום null עבור מפתחות חסרים
      initImmediate: false, // השהיית האתחול עד לטעינת המשאבים (SSR מהיר יותר)
    });
  return i18n;
}
```

</Step>
<Step number={6} title="יצירת Provider עבור i18n בצד הלקוח">

צרו קומפוננטת לקוח (Provider) העוטפת את האפליקציה בהקשר של i18next. ספק זה מקבל תרגומים שנטענו מראש מהשרת כדי למנוע הבהוב של תוכן לא מתורגם (FOUC) ולמנוע משיכה כפולה של נתונים.

קומפוננטות לקוח זקוקות למופע i18next משלהן שרץ בדפדפן. על ידי קבלת משאבים שנטענו מראש מהשרת, אנו מבטיחים hydration חלק. ה-provider מנהל גם שינויי שפה וטעינת namespaces באופן דינמי.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// הגדרת טעינת משאבים דינמית בצד הלקוח
// תבנית זהה לצד השרת, אך מופע זה רץ בדפדפן
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // משאבים שנטענו מראש מהשרת (מונע FOUC - הבהוב תוכן לא מתורגם)
  // פורמט: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Provider של i18n בצד הלקוח שעוטף את האפליקציה ב-context של i18next
 * מקבל משאבים שנטענו מראש מהשרת כדי למנוע בקשות כפולות
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // יצירת מופע i18n פעם אחת באמצעות lazy initializer של useState
  // זה מבטיח שהמופע ייווצר פעם אחת בלבד ולא בכל רינדור
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // אם סופקו משאבים (מהשרת), השתמש בהם כדי למנוע טעינה בצד הלקוח
        // זה מונע FOUC ומשפר את מהירות הטעינה הראשונית
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // מניעת החזרת ערכי undefined
      });

    return i18nInstance;
  });

  // עדכון השפה כאשר ה-prop של locale משתנה
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // הבטחה שכל ה-namespaces הנדרשים נטענים בצד הלקוח
  // שימוש ב-join("|") כתלות כדי להשוות מערכים בצורה נכונה
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // אספקת מופע i18n לכל קומפוננטות הבן דרך React context
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

</Step>
<Step number={7} title="הגדרת נתיבי שפה דינמיים">

הגדירו ניתוב דינמי לשפות על ידי יצירת תיקיית `[locale]` בתוך תיקיית האפליקציה שלכם. הדבר מאפשר ל-Next.js לטפל בניתוב מבוסס שפה שבו כל שפה הופכת למקטע ב-URL (למשל, `/en/about`, `/fr/about`).

שימוש בנתיבים דינמיים מאפשר ל-Next.js לייצר דפים סטטיים עבור כל השפות בזמן build, מה שמשפר את הביצועים ואת ה-SEO. קומפוננטת ה-layout מגדירה את מאפייני `lang` ו-`dir` ב-HTML על פי השפה, דבר מהותי לנגישות ולהבנת מנועי חיפוש.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// השבתת פרמטרים דינמיים - כל השפות חייבות להיות ידועות בזמן build
// פעולה זו מבטיחה יצירה סטטית לכל נתיבי השפות
export const dynamicParams = false;

/**
 * יצירת פרמטרים סטטיים לכל השפות בזמן build
 * Next.js יבצע pre-render של דפים לכל שפה שמוחזרת כאן
 * דוגמה: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * רכיב Layout שורש המנהל מאפייני HTML ספציפיים לשפה
 * מגדיר את מאפיין lang וכיוון הטקסט (ltr/rtl) על פי השפה
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // אימות השפה מפרמטרי ה-URL
  // במקרה של שפה לא חוקית, חוזרים לשפת ברירת המחדל
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? params.locale
    : defaultLocale;

  // קביעת כיוון הטקסט על פי השפה
  // שפות RTL כמו עברית וערבית זקוקות ל-dir="rtl" להצגה תקינה
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

</Step>
<Step number={8} title="יצירת קובצי התרגום">

צרו קובצי JSON עבור כל שפה ו-namespace. מבנה זה מאפשר לכם לארגן תרגומים בצורה הגיונית ולטעון רק את מה שאתם צריכים לכל עמוד.

ארגון תרגומים לפי namespace (למשל, `common.json`, `about.json`) מאפשר פיצול קוד (code splitting) ומקטין את גודל ה-bundle.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

 </Tab>
</Tabs>

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="src/locales/fr/home.json"
{
  "title": "Accueil",
  "description": "Description de la page d'accueil",
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!",
  "aboutPage": "Page À propos",
  "documentation": "Documentation"
}
```

 </Tab>
</Tabs>

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "description": "Cliquez sur le bouton pour augmenter le compteur"
  }
}
```

 </Tab>
</Tabs>

</Step>
<Step number={9} title="שימוש בתרגומים בתוך הדפים שלכם">

צרו קומפוננטת דף המאתחלת את i18next בשרת ומעבירה את התרגומים לקומפוננטות שרת ולקוח כאחד. כך מובטח שהתרגומים נטענים לפני הרינדור ונמנע הבהוב של תוכן.

אתחול בצד השרת טוען תרגומים לפני רינדור הדף, משפר SEO ומונע FOUC. העברת המשאבים שנטענו מראש ל-Provider של הלקוח מונעת בקשות כפולות ומבטיחה תהליך hydration חלק.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * קומפוננטת שרת של הדף המטפלת באתחול ה-i18n
 * טוענת תרגומים מראש בשרת ומעבירה אותם לקומפוננטות הלקוח
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // הגדרת ה-namespaces שהדף הזה זקוק להם
  // שימוש חוזר ברשימה המרוכזת לטובת type safety והשלמה אוטומטית
  const pageNamespaces = allNamespaces;

  // אתחול i18next בשרת עם ה-namespaces הנדרשים
  // טוען את קובצי ה-JSON של התרגום בצד השרת
  const i18n = await initI18next(locale, pageNamespaces);

  // קבלת פונקציית תרגום מקובעת עבור ה-namespace "about"
  // getFixedT מקבע את ה-namespace, כך שכותבים t("title") במקום t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // חילוץ חבילות התרגום ממופע ה-i18n
  // נתונים אלו מועברים ל-I18nProvider לביצוע hydration בצד הלקוח
  // מונע FOUC ומונע קריאות כפולות
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={10} title="שימוש בתרגומים בקומפוננטות לקוח">

קומפוננטות לקוח יכולות להשתמש ב-hook בשם `useTranslation` כדי לגשת לתרגומים. ה-hook מספק גישה לפונקציית התרגום ולמופע ה-i18n, ומאפשר לתרגם תוכן ולגשת לפרטי השפה הנוכחית.

קומפוננטות לקוח זקוקות ל-React hooks כדי לגשת לתרגומים. ה-hook משתלב בצורה חלקה ומספק עדכונים ריאקטיביים כאשר השפה משתנה.

> ודאו שהדף או ה-provider כוללים רק את ה-namespaces שאתם צריכים (למשל, `about`).  
> אם אתם משתמשים ב-React בגרסה נמוכה מ-19, בצעו memoization למעצבים כבדים כמו `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * דוגמה לקומפוננטת לקוח המשתמשת ב-React hooks עבור תרגומים
 * יכולה להשתמש ב-useState, useEffect וב-useTranslation
 */
const ClientComponent = () => {
  // useTranslation מספק גישה לפונקציית התרגום ולמופע ה-i18n
  // ציינו את ה-namespace כדי לטעון תרגומים רק עבור "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // יצירת מעצב מספרים המותאם לשפה הנוכחית
  // i18n.language מספק את ה-locale הנוכחי (למשל, "en", "he", "fr")
  // Intl.NumberFormat מעצב מספרים בהתאם למוסכמות השפה
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* עיצוב מספר בהתאם לכללי השפה */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

</Step>
<Step number={11} title="שימוש בתרגומים בקומפוננטות שרת">

קומפוננטות שרת אינן יכולות להשתמש ב-React hooks, ולכן הן מקבלות תרגומים דרך props מקומפוננטות ההורה שלהן. גישה זו שומרת על קומפוננטות השרת סינכרוניות ומאפשרת לקנן אותן בתוך קומפוננטות לקוח.

קומפוננטות שרת שעשויות להיות מקוננות תחת גבולות לקוח חייבות להיות סינכרוניות. על ידי העברת המחרוזות המתורגמות ונתוני השפה כ-props, אנו נמנעים מפעולות אסינכרוניות ומבטיחים רינדור תקין.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // פונקציית תרגום שמועברת מקומפוננטת שרת אב
  // קומפוננטות שרת אינן משתמשות ב-hooks, ולכן התרגומים מגיעים כ-props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * דוגמה לקומפוננטת שרת - מקבלת תרגומים כ-props
 * יכולה להיות מקוננת בתוך קומפוננטות לקוח
 * אינה יכולה להשתמש ב-React hooks
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // עיצוב מספר בצד השרת לפי ה-locale
  // רץ בשרת בזמן SSR ומשפר את הטעינה הראשונית
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* שימוש בפונקציית התרגום שהועברה כ-prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

</Step>
<Step number={12} title="החלפת שפת התוכן" isOptional={true}>

כדי להחליף את שפת התוכן ב-Next.js, הדרך המומלצת היא שימוש בכתובות URL עם קידומת שפה ובקישורי Next.js. הדוגמה שלהלן קוראת את ה-locale הנוכחי מהנתיב, מסירה אותו מה-pathname ומרנדרת קישור אחד לכל שפה זמינה.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Language selector">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

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
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

</Step>
<Step number={13} title="בניית קומפוננטת Link מתורגמת" isOptional={true}>

שימוש חוזר בכתובות URL מתורגמות ברחבי האפליקציה שומר על ניווט עקבי וידידותי ל-SEO. עטפו את `next/link` בעזר קטן שמוסיף קידומת של השפה הפעילה לנתיבים פנימיים ומשאיר כתובות חיצוניות ללא שינוי.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> טיפ: מאחר ש-`LocalizedLink` הוא תחליף ישיר (drop-in replacement), ניתן לבצע הגירה הדרגתית על ידי החלפת הייבוא ולאפשר לקומפוננטה לנהל את כתובות ה-URL הייעודיות לשפה.

</Step>
<Step number={14} title="גישה לשפה הפעילה בתוך Server Actions" isOptional={true}>

פעולות שרת (Server Actions) זקוקות לעיתים קרובות לשפה הנוכחית עבור שליחת מיילים, לוגים או שילוב מערכות צד שלישי. שלבו את עוגיית ה-locale שהוגדרה על ידי ה-proxy יחד עם ה-header של `Accept-Language` כגיבוי.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// דוגמה ל-server action שמשתמש בשפה הנוכחית
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // שימוש בשפה עבור פעולות נלוות מתורגמות (אימיילים, CRM וכו')
  console.log(`Stuff from server with locale ${locale}`);
}
```

> מאחר שפונקציית העזר נסמכת על עוגיות ו-headers של Next.js, היא פועלת ב-Route Handlers, Server Actions ובהקשרי שרת נוספים.

</Step>
<Step number={15} title="בינאום של נתוני Metadata" isOptional={true}>

תרגום תוכן הוא חשוב, אך המטרה העיקרית של בינאום היא להפוך את האתר שלכם לנראה ונגיש יותר ברחבי העולם. בינאום (i18n) הוא מנוף רב-עוצמה לשיפור נראות האתר באמצעות SEO מוקפד.

נתוני Metadata מותאמים שפה מסייעים למנועי חיפוש להבין אילו שפות זמינות בדפים שלכם. זה כולל הגדרת תגיות hreflang, תרגום כותרות ותיאורים, והבטחת כתובות קנוניות (canonical URLs) מדויקות לכל שפה.

להלן רשימת שיטות מומלצות ל-SEO רב-לשוני:

- הגדירו תגיות hreflang בתגית ה-`<head>` כדי לעזור למנועי חיפוש להבין אילו שפות זמינות בעמוד.
- רשמו את כל תרגומי העמוד בקובץ sitemap.xml באמצעות סכמת XML של `http://www.w3.org/1999/xhtml`.
- אל תשכחו להחריג דפים עם קידומת שפה מקובץ ה-robots.txt (למשל, `/dashboard`, `/fr/dashboard`, `/es/dashboard`).
- השתמשו בקומפוננטת Link מותאמת כדי להפנות לדף המתורגם הרלוונטי ביותר (למשל, בצרפתית `<a href="/fr/about">À propos</a>`).

מפתחים נוטים לשכוח לקשר כראוי בין גרסאות הדפים בשפות השונות. בואו נתקן זאת:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * יצירת נתוני SEO metadata עבור כל גרסת שפה של הדף
 * פונקציה זו רצה עבור כל שפה בזמן build
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // ייבוא דינמי של קובץ התרגום עבור שפה זו
  // משמש לשליפת כותרת ותיאור מתורגמים עבור ה-metadata
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // יצירת מיפוי hreflang לכל השפות
  // עוזר למנועי חיפוש להבין חלופות שפה
  // פורמט: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // כתובת Canonical עבור גרסת שפה זו
      canonical: absoluteUrl(locale, "/about"),
      // חלופות שפה ל-SEO (תגיות hreflang)
      // "x-default" מציין את גרסת שפת ברירת המחדל
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

</Step>
<Step number={16} title="בינאום של ה-Sitemap" isOptional={true}>

צרו sitemap הכולל את כל גרסאות השפה של העמודים שלכם. הדבר מסייע למנועי חיפוש לגלות ולאנדקס את כל גרסאות השפה של התוכן.

קובץ sitemap רב-לשוני תקין מבטיח שמנועי חיפוש ימצאו את כל השפות, ובכך משפר את הדירוג בתוצאות חיפוש בינלאומיות.

```ts fileName="src/app/sitemap.ts"
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
<Step number={17} title="בינאום של ה-robots.txt" isOptional={true}>

צרו קובץ robots.txt שמנהל בצורה נכונה את כל גרסאות השפה של הנתיבים המוגנים שלכם. הדבר מונע ממנועי חיפוש לאנדקס עמודי ניהול (admin) או לוחות בקרה (dashboard) באף שפה.

הגדרה נכונה של robots.txt עבור כל השפות מונעת אינדוקס של עמודים רגישים בכל שפה שהיא, דבר קריטי לאבטחה ולפרטיות.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// יצירת נתיבים לכל השפות (למשל, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

</Step>
<Step number={18} title="הגדרת Middleware עבור ניתוב שפות" isOptional={true}>

צרו proxy לזיהוי אוטומטי של שפת המשתמש המועדפת והפנייתו ל-URL בעל קידומת השפה המתאימה. הדבר משפר את חוויית המשתמש על ידי הצגת תוכן בשפתו המועדפת.

Middleware מבטיח שמשתמשים יופנו אוטומטית לשפתם המועדפת בעת ביקור באתר ושומר את העדפתם בעוגייה לביקורים עתידיים.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Regex לזיהוי קבצים בעלי סיומת (למשל, .js, .css, .png)
// משמש להחרגת נכסים סטטיים מניתוב שפות
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * חילוץ שפה מתוך ה-header של Accept-Language
 * מטפל בפורמטים כמו "fr-CA", "en-US" וכו'
 * חוזר לשפת ברירת המחדל אם שפת הדפדפן אינה נתמכת
 */
const pickLocale = (accept: string | null) => {
  // קבלת העדפת השפה הראשונה (למשל, "fr-CA" מתוך "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // חילוץ קוד שפת הבסיס (למשל, "fr" מתוך "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // בדיקה האם השפה נתמכת, אחרת שימוש בברירת מחדל
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy של Next.js לזיהוי שפה וניתוב
 * רץ בכל בקשה לפני רינדור העמוד
 * מפנה אוטומטית לכתובות עם קידומת שפה לפי הצורך
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // דילוג על פעולת ה-proxy עבור רכיבים פנימיים של Next.js, נתיבי API וקבצים סטטיים
  // לאלה לא אמורה להיות קידומת שפה
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // בדיקה האם ל-URL כבר יש קידומת שפה
  // דוגמה: "/fr/about" או "/en" יחזירו true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // אם אין קידומת שפה, מזהים את השפה ומפנים
  if (!hasLocale) {
    // ניסיון ראשוני לקרוא שפה מעוגייה (העדפת משתמש קודמת)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // שימוש בשפה מהעוגייה אם היא חוקית, אחרת זיהוי מ-headers של הדפדפן
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // שכפול ה-URL לעריכת הנתיב
    const url = request.nextUrl.clone();
    // הוספת קידומת השפה לנתיב
    // טיפול ייעודי בנתיב השורש למניעת לוכסן כפול
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // יצירת תגובת הפניה והגדרת עוגיית ה-locale
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // התאמה לכל הנתיבים למעט:
    // - נתיבי API (/api/*)
    // - קבצים פנימיים של Next.js (/_next/*)
    // - קבצים סטטיים (/static/*)
    // - קבצים עם סיומת (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

</Step>
<Step number={19} title="אוטומציה של תרגומים באמצעות Intlayer" isOptional={true}>

Intlayer היא ספרייה **חינמית** ובעלת **קוד פתוח** שנועדה לסייע בתהליך הלוקליזציה באפליקציה שלכם. בעוד ש-i18next מנהלת את טעינת התרגומים והצגתם, Intlayer מסייעת באוטומציה של כל תהליך העבודה (workflow).

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
- [i18next מול @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer-i18next.md)
- [מתאם תאימות @intlayer/next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-i18next.md)

</Step>

</Steps>

<Sponsor startDate="2026-08-24" endDate="2027-08-24">

ברגע שהגדרתם namespaces כמו common.json ו-about.json מוקלדים באמצעות הרחבת המודול של i18next, הגדרתם למעשה סכמת תוכן. השאלה הבאה היא היכן הסכמה הזו חיה ומי עורך אותה. Sanity מתייחסת לכך כרכיב ממעלה ראשונה: אתם ממדלים שדות, הפניות ואימותים בקוד, והעורכים עובדים מול אותו מודל ישירות ב-Sanity Studio במקום לערוך ידנית קובצי JSON עבור כל שפה.

התוכן מאוחסן ב-Content Lake כ-JSON מובנה, ניתן לשאילתה באמצעות GROQ ומוגש דרך API, כאשר ה-locale מוגדר כשדה ולא כתיקייה. עבור תצורת Next.js App Router, תוכלו לשלוף namespace בשרת, להעביר אותו ל-provider של ה-i18n בדיוק כפי שתבנית זו דורשת, ולאפשר לאותו מקור להזין אפליקציות, אימיילים וסוכנים. ככל שמספר השפות והמשטחים גדל, הסכמה נשארת החוזה הקבוע, ושכבת המסירה ממשיכה להיות i18next.

</Sponsor>
