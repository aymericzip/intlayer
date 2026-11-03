---
createdAt: 2026-09-13
updatedAt: 2026-11-03
priority: 8
title: "next-intl מול @intlayer/next-intl: אותו ה-API, חבילת קוד (Bundle) שונה"
description: "יישום Next.js שומר על הייבואים של next-intl, המוגשים דרך מתאם @intlayer/next-intl. מדידת גודל bundle, דליפות, גודל קומפוננטה והידרציה."
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - מתאם תאימות
  - הגירה
  - בינאום
  - i18n
  - Benchmark
  - גודל bundle
  - בלוג
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl מול @intlayer/next-intl: אותו ה-API, חבילת קוד (Bundle) שונה

![next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` הוא מתאם תאימות (compat adapter): הוא חושף את ה-API המוכר של `next-intl` (כגון `useTranslations`, ‏`getTranslations`, ‏`useLocale`, ‏`t.rich()`, צורות רבים ב-ICU, ‏`NextIntlClientProvider`...) ומגיש אותו מתוך מילונים שקומפלו על ידי Intlayer. קוד האפליקציה אינו משתנה, אך ה-bundle משתנה באופן משמעותי.

מאמר זה משווה בין השניים על אותו יישום Next.js, שנבנה פעם אחת עם `next-intl` ופעם שנייה עם המתאם. הנתונים מגיעים מ-[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), חבילת בדיקות קוד פתוח המתעדת את מה שהדפדפן מוריד בפועל. אם ברצונכם לקרוא השוואה בין שתי הספריות כספריות עצמאיות, עיינו ב-[next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer.md). מאמר זה עוסק בשינויים שמביא המתאם כאשר משאירים את הקומפוננטות ללא שינוי.

- [next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer.md)

<TOC/>

> **תקציר (tl;dr)**: באותו יישום Next.js, החלפת `next-intl` ב-`@intlayer/next-intl` הפחיתה את ה-JavaScript הממוצע לדף מ-**153.6 KB ל-147.5 KB** ב-gzip, את גודל הקומפוננטה הממוצע מ-**21.8 KB ל-8.1 KB**, ביטלה דליפת מחרוזות מדפים זרים מ-**~90% ל-0%**, וקיצרה את משך ההידרציה מ-**14.7 ms ל-12.8 ms**, מבלי לערוך אף קומפוננטה. ב-TanStack Start, המקבילה עבור `use-intl` (המתאם `@intlayer/use-intl`) קיצצה את הקומפוננטות מ-**76-87 KB ל-9-11 KB** והאיצה את החלפת השפה מ-**7-21 ms ל-4-9 ms**. המתאם מוסיף **8.0 KB** של זמן ריצה לעומת **14.7 KB** ב-`next-intl` ו-**5.5 KB** ב-`next-intlayer` המקורית. הניתוב וה-middleware ממומשים מחדש על גבי תצורת הניתוב של Intlayer; נתיבים מתורגמים (`pathnames`) הם התכונה היחידה שאינה מועברת.

## מהו בעצם `@intlayer/next-intl`

`next-intl` פועלת בזמן ריצה: `getRequestConfig` טוען קובץ `messages/{locale}.json` לכל בקשה, `NextIntlClientProvider` שולח אותו לצד הלקוח, ו-`useTranslations("about")` קורא מפתחות מאותו אובייקט בעת הרינדור. כל אופטימיזציה (פיצול ל-namespaces, סינון `pick(messages, [...])` לכל דף, טעינה עצלה) היא באחריותכם הבלעדית.

`@intlayer/next-intl` שומרת על החלק הראשון והאחרון בשרשרת זו ומחליפה את התווך. הקומפוננטות שלכם עדיין קוראות ל-`useTranslations("about")`; מה שהן מקבלות בפועל מגיע ממילון Intlayer שקומפל בזמן build, מתוחם בדיוק לאותה קומפוננטה, ובשפה הפעילה בלבד.

שלושה מנגנונים גורמים לזה לעבוד:

1. **כינויי ייבוא (Import aliasing):** הפונקציה `createNextIntlPlugin()` מתוך `@intlayer/next-intl/plugin` עוטפת את `withIntlayer` ומוסיפה כינויים ל-Webpack ול-Turbopack כך ש-`next-intl`, ‏`next-intl/server`, ‏`next-intl/navigation` ו-`next-intl/middleware` מנותבים אל `@intlayer/next-intl`. אין צורך לשנות אף שורת ייבוא בקוד שלכם.
2. **JSON כמקור האמת:** תוסף `syncJSON` קורא את קובץ `messages/{locale}.json` הקיים שלכם, מפצל את המפתחות ברמה העליונה למילון נפרד לכל namespace, וכותב תרגומים בחזרה לאותם קבצים בדיוק כאשר ה-CLI או ה-CMS מעדכנים אותם. תהליך העבודה של המתרגמים נותר ללא שינוי.
3. **קישור ברמת מוקד הקריאה (Call-site binding):** שלב האופטימיזציה של Intlayer (דרך Babel או SWC) משכתב את הקריאה `useTranslations("about")` לקריאה שמקבלת ישירות את מילון `about`. הקומפוננטה אינה ניגשת עוד לעץ הודעות גלובלי, אלא אך ורק לתוכן שלה.

```tsx fileName="app/[locale]/about/page.tsx"
// הקוד שלכם, ללא שינוי
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="מה שהקומפיילר מפיק (בגרסה מופשטת)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

שכתוב זה הוא הסיבה לכך שגודל הקומפוננטה ודליפת הדפים מצטמצמים: דף מושך אך ורק את המילונים של הקומפוננטות שהוא מרנדר, ורק בשפה המוגשת באותו רגע.

## מה המתאם שומר, ממה הוא מתעלם ומה אינו מוחלף

| ה-API של `next-intl`                                                 | עם `@intlayer/next-intl`                                                                                              |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ נשמר. נקשר למילון `ns` בזמן build. המפתחות מוקלדים ומאומתים מול התוכן שלכם.                                        |
| `getTranslations({ locale, namespace })`                             | ✅ נשמר                                                                                                               |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ נשמר. צורות רבים ב-ICU, ‏`select`, ‏`selectordinal`, ‏`#`, ‏`{ts, date, long}` מעובדים דרך מפענח ה-ICU של Intlayer |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ נשמר                                                                                                               |
| `useFormatter()`                                                     | ✅ נשמר. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` מגשרים ל-`Intl` המקורי                         |
| `NextIntlClientProvider`                                             | ✅ נשמר. הפרופס `messages`, `timeZone` ו-`now` **מתקבלים אך מתעלמים מהם** (אזהרת פיתוח תציין זאת)                     |
| `getMessages()`                                                      | ✅ נשמר לצורכי תאימות; אינו נחוץ עוד                                                                                  |
| `getRequestConfig()` ב-`src/i18n.ts`                                 | ⚠️ אינו נחוץ. המילונים מתקמפלים בזמן build; אין טעינת הודעות לכל בקשה                                                 |
| `defineRouting()`                                                    | ✅ נשמר. שדות שלא צוינו (`locales`, `defaultLocale`, `localePrefix`) נקראים מתוך `intlayer.config.ts`                 |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ נשמר. ממומש מחדש על גבי תצורת הניתוב של Intlayer; הארגומנט `routing` מתקבל אך מתעלמים ממנו                         |
| `pathnames` (שמות נתיבים מתורגמים)                                   | ❌ מתקבל עבור בדיקת טיפוסים, **אינו מפוענח**. שמרו על נתיבים רגילים או העבירו מיפוי זה ל-`rewrite` של Intlayer        |
| `createMiddleware()`                                                 | ✅ נשמר. מחזיר את הפרוקסי של Intlayer; מגדיר את ה-cookie בשם `NEXT_LOCALE` כדי ש-`useLocale()` והמחליף ימשיכו לעבוד   |
| עוגיית `NEXT_LOCALE`                                                 | ✅ נקראת כברירת מחדל (אלא אם הגדרתם את `routing.storage` בעצמכם)                                                      |
| שימוש ב-`useTranslations()` ללא ציון namespace                       | ⚠️ עובד, אך מוקד הקריאה אינו נקשר מראש: הוא מפוענח דרך רישום בזמן ריצה. ציינו namespace כדי ליהנות מהחיסכון ב-bundle  |

## מבחן הביצועים (Benchmark)

### מה נבדק

חבילת [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) בונה **את אותו יישום בדיוק** בכל הגדרה: **10 דפים** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 שפות** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), קומפוננטות זהות ותוכן זהה. הדפים נמדדים ב-`en` וב-`fr`.

`next-intl` נבנתה בארבע אסטרטגיות טעינה שונות, מהתצורה הנאיבית (קובץ `messages/{locale}.json` נטען במלואו) ועד לאופטימלית (namespace אחד לכל נתיב + `pick()` לכל דף). המתאם נבנה על **אותן קומפוננטות של התצורה הנאיבית**, כאשר שונו רק `next.config.ts` ו-`intlayer.config.ts`. אין צורך בגרסת "scoped" ייעודית: הקומפיילר תוחם תוכן לכל קומפוננטה, כך ששורות ה-`static` וה-`dynamic` כבר מבודדות וממוטבות מראש.

לכל בנייה, חבילת הבדיקות מודדת:

- **גודל ספרייה (Lib size)**: משקל gzip של קומפוננטה ריקה שמייבאת רק את ספריית ה-i18n (העלות הקבועה של זמן הריצה).
- **ממוצע JS לדף (Page JS)**: משקל ה-JavaScript המורד ב-gzip לכל דף, בממוצע על פני כל הדפים והשפות.
- **אחוז דליפת שפה (Locale leak %)**: חלקן של מחרוזות מתורגמות ב-JS שהורד השייכות לשפה שהמשתמש **אינו** צופה בה.
- **אחוז דליפת דפים (Page leak %)**: חלקן של מחרוזות מתורגמות ב-JS שהורד השייכות לדף שהמשתמש **אינו** נמצא בו.
- **ממוצע לקומפוננטה (Component avg)**: משקל ממוצע ב-gzip של כל קומפוננטה כשהיא מקומפלת בבידוד.
- **תגובתיות מקצה לקצה (E2E reactivity)**: זמן שעון בין בחירת שפה חדשה לעדכון `html[lang]` ב-DOM (נבדק ב-Playwright, ממוצע של 5 חזרות).
- **הידרציה (Hydration)**: משך שלב ההידרציה של React.

> הנתונים להלן מגיעים מהרצה מיום **12 בספטמבר 2026** עם `next-intl` / `use-intl` 4.14.2 ו-`@intlayer/*` 9.5.1. יישום הבדיקה קטן במכוון (עשרות בודדות של מחרוזות לכל שפה), כך שאחוזי הדליפה מתארים **דפוס עקרוני**: הם צומחים ככל שנפח התוכן גדל, בעוד שעלות זמן הריצה נשארת קבועה.

### תוצאות ב-Next.js

<I18nBenchmark framework="nextjs" packages="next-intl,@intlayer/next-intl,next-intlayer" vertical/>

| הגדרה                     | אסטרטגיה       | גודל ספרייה (gz) | ממוצע JS לדף (gz) | דליפת שפה | דליפת דפים | ממוצע לקומפוננטה (gz) | תגובתיות E2E |     הידרציה |
| ------------------------- | -------------- | ---------------: | ----------------: | --------: | ---------: | --------------------: | -----------: | ----------: |
| **בסיס** (ללא i18n)       | -              |           0.0 KB |          141.0 KB |      0.0% |       0.0% |                0.9 KB |      13.4 ms |     11.8 ms |
| `next-intl`               | static         |          14.7 KB |          153.6 KB |      4.2% |      89.8% |               21.8 KB |      16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |          14.7 KB |          153.6 KB |      9.7% |      89.9% |               21.8 KB |      15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |          14.7 KB |          153.6 KB |      0.0% |       0.0% |               80.1 KB |      17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |          14.7 KB |          153.6 KB |      0.0% |       0.0% |               22.9 KB |      17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |       **8.0 KB** |      **147.5 KB** |  **0.0%** |   **0.0%** |            **8.1 KB** |  **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |       **8.0 KB** |      **148.7 KB** |  **0.0%** |   **0.0%** |            **8.1 KB** |  **11.7 ms** | **12.8 ms** |
| `next-intlayer` (טבעי)    | static         |           5.5 KB |          141.3 KB |      0.0% |       0.0% |                8.5 KB |      15.5 ms |     16.9 ms |
| `next-intlayer` (טבעי)    | dynamic        |           5.5 KB |          141.3 KB |      0.0% |       0.0% |                6.9 KB |      15.3 ms |     15.9 ms |

**כיצד לקרוא את התוצאות**

- **אותן קומפוננטות, 6 KB פחות לדף:** בניית האפליקציה הנאיבית עם המתאם מגיעה ל-**147.5 KB**, פחות מכל תצורה של `next-intl` כולל התצורה הממוטבת ביותר (153.6 KB). ההבדל נובע ישירות ממשקל זמן הריצה: 8.0 KB לעומת 14.7 KB, המשולמים בכל דף.
- **הדליפה יורדת ל-0% מבלי לגעת בקומפוננטות:** המערך הנאיבי ב-`next-intl` שולח כ-90% מחרוזות מדפים זרים בכל דף. הגעה ל-0% ב-`next-intl` מחייבת מעבר לתצורות `scoped-*`: יצירת namespace לכל נתיב והפעלת `pick(messages, [...])` בכל דף. המתאם מגיע ל-0% ישירות מהקוד הנאיבי משום ששלב האופטימיזציה קושר כל קריאת `useTranslations("ns")` למילון הייעודי שלה.
- **קומפוננטות מתכווצות פי 2.7:** קומפוננטה המקומפלת בבידוד שוקלת בממוצע **21.8 KB** ב-`next-intl` (משום שהיא מקושרת ל-provider ולעץ ההודעות כולו) לעומת **8.1 KB** עם המתאם. בתצורת `scoped-static` של `next-intl` מספר זה אף מזנק ל-80 KB.
- **הידרציה מהירה יותר ב-2 ms** (12.8 לעומת 14.7 ms): אין צורך לבצע דה-סריאליזציה לאובייקט הודעות גדול מתוך נתוני ה-RSC לפני ש-React יכולה לבצע הידרציה.
- **המתאם אינו זמן הריצה הטבעי:** `next-intlayer` מגיעה ל-**141.3 KB**, תוספת של 0.3 KB בלבד מעל אפליקציית הבסיס, עם זמן ריצה של 5.5 KB. המתאם נושא את מעטפת ה-API של `next-intl` (כגון `useFormatter`, `t.rich`, ומפענח ה-ICU) על גבי ליבת Intlayer, ומכאן 8.0 KB ותוספת של 6 KB לדף. הוא מהווה גשר מצוין, ולא היעד הסופי.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> הטבלה המלאה זמינה ב-[דוח ה-benchmark של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md).

- [דוח ה-benchmark של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

### תוצאות ב-TanStack Start (`use-intl`)

`use-intl` היא ליבת הספרייה הבלתי-תלויה של `next-intl`. המתאם שלה, `@intlayer/use-intl`, פועל לפי אותו עקרון באמצעות תוסף Vite (`@intlayer/use-intl/plugin`).

| הגדרה                    | אסטרטגיה       | גודל ספרייה (gz) | ממוצע JS לדף (gz) | דליפת שפה | דליפת דפים | ממוצע לקומפוננטה (gz) | תגובתיות E2E |     הידרציה |
| ------------------------ | -------------- | ---------------: | ----------------: | --------: | ---------: | --------------------: | -----------: | ----------: |
| **בסיס** (ללא i18n)      | -              |           0.0 KB |          111.0 KB |      0.0% |       0.0% |                0.7 KB |       8.1 ms |     21.6 ms |
| `use-intl`               | static         |          14.1 KB |          179.8 KB |     50.0% |      89.8% |               76.0 KB |       6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |          14.1 KB |          119.4 KB |      0.0% |      89.8% |               75.9 KB |       7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |          14.1 KB |          128.7 KB |      0.0% |       0.0% |               87.1 KB |      20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |          14.1 KB |          128.7 KB |      0.0% |       0.0% |               87.1 KB |      13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |       **7.3 KB** |          135.8 KB |     49.7% |   **0.0%** |           **10.9 KB** |   **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |       **7.3 KB** |      **129.7 KB** |  **0.0%** |   **0.0%** |            **9.3 KB** |   **8.7 ms** |     16.1 ms |
| `intlayer` (טבעי)        | static         |           5.0 KB |          125.8 KB |     50.0% |       0.0% |                8.1 KB |       3.2 ms |     11.5 ms |
| `intlayer` (טבעי)        | dynamic        |           5.0 KB |          118.6 KB |      0.0% |       0.0% |                6.3 KB |       3.6 ms |     14.1 ms |

**כיצד לקרוא את התוצאות**

- **במשקל הבתים לדף התוצאה כמעט זהה מול `use-intl` הממוטבת.** `@intlayer/use-intl` במצב `dynamic` ‏(129.7 KB) קרובה בטווח של 1 KB ל-`use-intl` ב-`scoped-dynamic` ‏(128.7 KB). שורת ה-`dynamic` הפשוטה של `use-intl` אמנם קלה יותר (119.4 KB), אך היא מדליפה 90% ממחרוזות הדפים הזרים. ה-0% דליפה של המתאם הוא מה ששומר על גודל קבוע ככל שהתוכן צומח.
- **קומפוננטות קטנות פי 7-9:** קומפוננטות `use-intl` שוקלות בממוצע **76-87 KB** בכל אסטרטגיה, משום ש-`useTranslations` קשורה לכל אובייקט ההודעות של ה-provider. המתאם מוריד זאת ל-**9-11 KB**.
- **החלפת שפה מהירה בהרבה:** התצורות הממוטבות של `use-intl` דורשות **13-21 ms** לעדכון `html[lang]`; המתאם דורש **4-9 ms** בלבד.
- **שורת `static` שומרת על כל השפות:** במצב `static` המתאם מציג 49.7% דליפת שפה, בדיוק כמו Intlayer הטבעית במצב זה. שורת הגדרה בודדת (`importMode: 'dynamic'`) מסירה זאת לחלוטין.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> הטבלה המלאה זמינה ב-[דוח ה-benchmark של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md).

- [דוח ה-benchmark של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

## מדוע המספרים משתנים

![קומפיילר Intlayer מחלץ תוכן מקומפוננטות](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

שום דבר בקומפוננטה עצמה לא השתנה, ולכן השיפורים נובעים במלואם מהגורם שאליו `useTranslations` קשורה.

**עם `next-intl`**, הקישור נעשה דרך ה-provider. ‏`NextIntlClientProvider` מקבל את כל אובייקט ה-`messages` עבור השפה; כל קריאת `useTranslations("about")` קוראת ממנו. ה-bundler רואה קומפוננטה שמייבאת hook יחיד הקורא מ-context אחד, ואינו יכול לדעת שנעשה שימוש רק בענף של `about`. כל הנתיבים חולקים את אותו אובייקט הודעות, ולכן דליפת הדפים עומדת על כ-90% עד שמפצלים את הקבצים ידנית, והבזבוז גדל בשני הצירים במקביל:

![דליפת תוכן תיאורטית לפי ארכיטקטורה](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # כל ה-namespaces, כל הדפים
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**עם `@intlayer/next-intl`**, הקישור נעשה ברמת המילון. תוסף `syncJSON` הופך את `messages/en.json` למילון נפרד לכל מפתח ראשי; הקומפיילר מזהה איזו קומפוננטה קוראת ל-`useTranslations("about")` ומעביר לה ישירות את מילון `about`, בשפה הפעילה, כייבוא שניתן למעקב ולפיצול ב-bundler.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # ללא שינוי, עדיין מקור האמת
│   └── fr.json
├── .intlayer/                        # נוצר אוטומטית: מילון אחד לכל namespace, לכל שפה
└── src
    ├── middleware.ts                 # createMiddleware() מחזיר כעת את הפרוקסי של Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (ללא פרופ messages)
        └── about/page.tsx            # useTranslations("about")  ← ללא שינוי
```

הקובץ `src/i18n.ts` והפרופ `messages` נעלמים. כל השאר נשאר זהה לחלוטין.

## הגירה בשלושה שלבים

<Steps>
<Step number={1} title="התקנה">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

הפקודה מזהה את `next-intl` ומתקינה את `intlayer`, ‏`next-intlayer`, ‏`@intlayer/next-intl` ואת `@intlayer/sync-json-plugin`. השאירו את `next-intl` מותקנת: היא peer dependency של המתאם ומספקת את הטיפוסים.

</Step>
<Step number={2} title="כיוון Intlayer אל קובצי ההודעות שלכם">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" אורז את כל השפות; "dynamic" טוען את השפה הפעילה לפי דרישה
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // מחזיקי מקום ב-ICU: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

הקבצים `messages/{locale}.json` נשארים במקומם. כל מפתח ראשי הופך למילון; `useTranslations("about")` ממופה למילון `about`.

</Step>
<Step number={3} title="עטיפת next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

הפונקציה `createNextIntlPlugin()` משלבת את `withIntlayer` (מעקב תוכן, קימפול מילונים, שלב האופטימיזציה) ואת הכינויים של `next-intl` ל-`@intlayer/next-intl` עבור Webpack ו-Turbopack. בצעו build, והתוצאות בטבלאות שלעיל שלכם.

</Step>
</Steps>

### מה ניתן למחוק לאחר מכן

| קובץ / דפוס                                 | סיבה                                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `getRequestConfig` ב-`src/i18n.ts`          | אין צורך בטעינת הודעות לכל בקשה. השאירו את הקובץ רק אם הוא מייצא עזרי `createNavigation` |
| `messages={...}` ב-`NextIntlClientProvider` | המתאם קורא פלט מקומפל; מתעלמים מהפרופ והוא מתריע באזהרה בסביבת פיתוח                     |
| `await getMessages()` ב-layouts             | מאותה סיבה בדיוק                                                                         |
| שימוש ב-`pick(messages, [...])` לכל דף      | הקומפיילר מבצע את הסינון והבחירה באופן אוטומטי, ברמת הקומפוננטה                          |

### מה מרוויחים מעבר לחיסכון בבתים

- **מפתחות בעלי טיפוסים קפדניים:** הקריאה `useTranslations("about")` מוקלדת ומאומתת מול מילון `about`. קריאה ל-`t("does.not.exist")` הופכת לשגיאת TypeScript ברורה, ולא לנפילת ריצה שקטה.
- **`npx intlayer test`** מכשיל את ה-CI כאשר בשפה מסוימת חסר מפתח. **`npx intlayer fill`** מתרגם מפתחות חסרים באמצעות הספק לבחירתכם (OpenAI, Anthropic, Mistral, Gemini...) באמצעות המפתח שלכם, וכותב את התוצאה בחזרה ל-`messages/{locale}.json`.
- **העורך החזותי וה-CMS** פועלים על אותם מילונים, כך שמשתמשים ללא רקע טכני יכולים לערוך את `messages/fr.json` דרך ממשק גרפי והקובץ מתעדכן.
- **מעבר הדרגתי ל-`.content.ts`:** כל קומפוננטה יכולה לעבור מ-`useTranslations("about")` ל-`useIntlayer("about")` עם קובץ תוכן צמוד, קומפוננטה אחר קומפוננטה. מילוני JSON ו-`.content.ts` מתקיימים במקביל ומתמזגים.

## מגבלות שיש להכיר לפני שמתחילים

<AccordionGroup>
<Accordion header="הגדרות הניתוב עוברות אל intlayer.config.ts">

הפונקציות `createNavigation(routing)` ו-`createMiddleware(routing)` שומרות על החתימה שלהן אך מתעלמות מהארגומנט: השפות, שפת ברירת המחדל ואסטרטגיית הקידומת מגיעות מהגדרות ה-`routing` של Intlayer. אם אתם משתמשים ב-`pathnames` מתורגמים של `next-intl` (למשל מ-`/about` ל-`/a-propos`), המתאם אינו מפענח אותם ישירות; תכונת ה-`routing.rewrite` של Intlayer מכסה מקרה זה, אך מדובר בהגדרה נפרדת.

</Accordion>
<Accordion header="קריאה ל-useTranslations() ללא namespace אינה נקשרת מראש">

שלב האופטימיזציה זקוק ל-namespace סטטי כדי לדעת איזה מילון לייבא. קריאה ריקה עדיין עובדת, אך דרך רישום בזמן ריצה שמפנה לכל המילונים, שזו בדיוק הדליפה שרציתם למנוע. הקפידו להעביר את ה-namespace.

</Accordion>
<Accordion header="המתאם אינו חינמי מבחינת משקל">

8.0 KB של זמן ריצה לעומת 5.5 KB עבור `next-intlayer`, ותוספת של כ-6-7 KB לדף לעומת הבנייה הטבעית. זהו המחיר של תמיכה במעטפת ה-API של `next-intl`. ברגע שכל הקומפוננטות הועברו ל-`useIntlayer`, ניתן להסיר את המתאם לחלוטין.

</Accordion>
<Accordion header="מתעלמים מ-messages, timeZone ו-now ב-provider">

מעבדי הפורמט מגובים ב-`Intl` המקורי ורק השפה משפיעה על הפלט שלהם. אם אתם מסתמכים על אזור זמן כפוי או על ערך `now` קבוע עבור תאריכים יציבים בהידרציה, טפלו בכך במוקד הקריאה. ראו [עיצוב תאריכים, זמנים ומספרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/date_time_number_formatting_locales.md).

- [עיצוב תאריכים, זמנים ומספרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/date_time_number_formatting_locales.md)

</Accordion>
</AccordionGroup>

## מתי להשתמש בכל אפשרות?

<AccordionGroup>
<Accordion header="הישארו עם next-intl">

האפליקציה שלכם קטנה, גודל ה-bundle אינו מהווה דאגה, והצוות שלכם מרגיש בנוח עם ניהול ידני של namespaces ו-`pick()` בכל דף.

</Accordion>
<Accordion header="השתמשו ב-@intlayer/next-intl">

אתם עובדים כיום עם `next-intl` ורוצים את היתרונות של bundle קל, 0% דליפה, הידרציה מהירה, מפתחות מוקלדים וכלי CLI / CMS ללא צורך בשכתוב קוד. זוהי נקודת הכניסה המומלצת לכל בסיס קוד קיים של `next-intl`.

</Accordion>
<Accordion header="עברו ל-Intlayer טבעי (next-intlayer)">

עבור פרויקטים חדשים, או לאחר שהמתאם השלים את משימת ההגירה. זוהי האפשרות הקלה ביותר (5.5 KB, תוספת של 0.3 KB לדף מעל יישום בסיס) הפותחת תמיכה מלאה ב-Server Components סינכרוניים, קובצי `.content.ts` לכל קומפוננטה וארגז הכלים המלא. התחילו עם [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).

- [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

</Accordion>
</AccordionGroup>

## שאלות נפוצות (FAQ)

<FAQ>

<Question title="האם קוד האפליקציה שלי באמת נשאר ללא שינוי?">

ב-Next.js, כן לחלוטין עבור הקומפוננטות: הבנייה במבחן הביצועים שינתה אך ורק את `next.config.ts` ואת `intlayer.config.ts`. הפונקציה `getRequestConfig` ב-`src/i18n.ts`, הפרופ `messages` ב-provider וקריאות `pick()` בכל דף הופכים לקוד לא פעיל שתוכלו למחוק.

</Question>

<Question title="מה קורה להודעות ICU?">

הן ממשיכות לעבוד כרגיל. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` ו-`{ts, date, long}` מפוענחים על ידי מפענח ה-ICU של Intlayer. ראו [הסבר על פורמט הודעות ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md).

- [הסבר על פורמט הודעות ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/icu_message_format.md)

</Question>

<Question title="מדוע המתאם כבד יותר מ-next-intlayer הטבעית?">

הוא נושא את מעטפת ה-API של `next-intl` על גבי הליבה של Intlayer: `useFormatter`, `t.rich`, מפענח ה-ICU ועוזרי הניווט. מדובר ב-8.0 KB לעומת 5.5 KB, ותוספת של כ-6 KB לדף. הוא משמש כגשר מעבר ולא כיעד הסופי.

</Question>

<Question title="האם ניתן להגר קומפוננטה אחר קומפוננטה?">

כן. כל קומפוננטה יכולה לעבור מ-`useTranslations("about")` ל-`useIntlayer("about")` עם קובץ `.content.ts` צמוד. מילוני JSON ו-`.content.ts` מתקיימים זה לצד זה ומתמזגים באופן שקוף.

</Question>

<Question title="האם נתיבים מתורגמים (pathnames) עובדים?">

לא דרך הגדרת ה-`pathnames` של `next-intl`: המתאם מקבל אותה עבור בדיקת טיפוסים בלבד, אך אינו מפענח אותה. השתמשו ב-`routing.rewrite` של Intlayer במקום זאת.

</Question>

</FAQ>

## השוואות קשורות

סדרת מתאמי התאימות:

- [i18next מול @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer-i18next.md)
- [Lingui מול @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer-lingui.md)
- [vue-i18n מול @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/vue-i18n_vs_intlayer-vue-i18n.md)

השוואת הספריות ראש בראש:

- [next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer.md)
- [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)
- [האם next-intl מיושנת ב-2026?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_next-intl_outdated.md)

תיעוד ומדריכים:

- [מתאם תאימות: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/next-intl.md)
- [מדריך הגירה: מ-next-intl ל-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-intl_to_intlayer.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [תרגום ב-AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md)

דוחות benchmark:

- [סקירת ה-benchmark המקיפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/svelte.md)

> כדי להבין את מקורן של ספריות אלו, קראו על ההיסטוריה של בינאום ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## סיכום

`@intlayer/next-intl` עושה דבר אחד מרכזי: היא משנה את הגורם שאליו `useTranslations` קשורה, מ-provider המחזיק בכל ההודעות למילון שקומפל במיוחד עבור אותה קומפוננטה. באותו יישום Next.js הדבר מביא לחיסכון של **6 KB לדף**, **קומפוננטות קטנות פי 2.7**, **0% דליפת תוכן** וקיצור של **2 ms במשך ההידרציה**, עוד לפני שפותחים קובץ קומפוננטה כלשהו. הניתוב וה-middleware שומרים על ה-API המוכר שלהם על גבי תצורת הניתוב של Intlayer, וזמן הריצה הטבעי של `next-intlayer` נשאר קל אף יותר.

כל הנתונים הגולמיים, יישומי הבדיקה והסקריפטים זמינים במאגר [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). הריצו אותם בעצמכם.

עיינו במסמך ['למה Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) לפרטים נוספים.

- [למה Intlayer? יתרונות על פני ספריות i18n אחרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
