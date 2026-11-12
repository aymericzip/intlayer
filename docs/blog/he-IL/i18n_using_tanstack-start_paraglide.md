---
createdAt: 2026-09-26
updatedAt: 2026-11-03
priority: 9
title: "TanStack Start i18n עם Paraglide JS: מדריך הגדרה לשנת 2026"
description: "תרגמו את אפליקציית ה-TanStack Start שלכם עם Paraglide JS: אסטרטגיית URL, שכתוב נתב (router rewrite), SSR middleware, hreflang, sitemap ו-robots.txt, כולל נתוני ביצועים (benchmark)."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - בינאום
  - i18n
  - SEO
  - React
  - בלוג
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "גרסה ראשונית"
author: aymericzip
---

# כיצד לבצע בינאום לאפליקציית TanStack Start באמצעות Paraglide JS בשנת 2026

## תוכן עניינים

<TOC/>

## מה זה Paraglide JS?

**Paraglide JS** (מבית inlang) היא ספריית i18n **מבוססת קומפיילר**. במקום לספק ספריית זמן ריצה (runtime) שמחפשת מפתחות בתוך אובייקט JSON, היא מקמפלת כל הודעה לפונקציית JavaScript מוקלדת (`m.about_title()`). הודעות שאינן בשימוש מוסרות על ידי ה-bundler בתהליך tree-shaking, ושגיאת כתיב במפתח הופכת לשגיאת קומפילציה ברורה.

Paraglide היא גישת ה-i18n המשמשת בדוגמאות הרשמיות של TanStack Router, והיא משתלבת עם TanStack Start באמצעות שלושה חלקים:

- **תוסף Vite** שמקמפל את ההודעות ואת זמן הריצה אל תוך `src/paraglide`;
- **Server middleware** הפותר ומזהה את השפה עבור כל בקשה;
- **שכתוב נתב (Router rewrite)** הממפה כתובות URL מתורגמות (`/fr/about`) אל עץ הניתוב הקיים שלכם (`/about`), כך שאין צורך במקטע `$locale`.

מדריך זה מגדיר את שלושת החלקים הללו, ומכסה את כל מה ש-Paraglide משאירה ליישום שלכם: `lang` ו-`dir`, בורר שפות, metadata מתורגם, כתובות `canonical`, תגיות `hreflang` עם `x-default`, שפות Open Graph, נתוני JSON-LD, מפת אתר (sitemap), קובץ `robots.txt`, רינדור מוקדם ועמודי 404 מתורגמים.

> מחפשים סטאק אחר?

- [מדריך TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_use-intl.md)
- [מדריך TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_lingui.md)
- [מדריך TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

> משווים בין שתי הגישות מבוססות הקומפיילר? קראו [האם Intlayer קלה יותר מ-Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_intlayer_lighter_than_paraglide.md).

- [האם Intlayer קלה יותר מ-Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_intlayer_lighter_than_paraglide.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## מה מראה ה-Benchmark על Paraglide ב-TanStack Start

ה-[i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) מריץ אפליקציית TanStack Start זהה בת 10 עמודים ו-10 שפות עם כל ספרייה מובילה ומודד מה הדפדפן מוריד בפועל.

- [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

נתונים מרכזיים עבור `@inlang/paraglide-js@2.15.1`, שנמדדו ב-2026-09-26 (gzip):

| הגדרה                     | גודל ספרייה | JS לכל עמוד | זליגת שפות אחרות | זליגת עמודים אחרים | טעינת עמוד |
| :------------------------ | ----------: | ----------: | ---------------: | -----------------: | ---------: |
| ללא i18n (אפליקציית בסיס) |           - |    111.0 KB |               0% |                 0% |    15.7 ms |
| Paraglide JS              |      1.8 KB |    125.1 KB |            49.7% |                 0% |    22.1 ms |
| `react-intlayer`          |      4.5 KB |    126.8 KB |               0% |                 0% |    14.8 ms |
| `use-intl`                |     75.9 KB |    128.7 KB |               0% |                 0% |    17.4 ms |
| Lingui                    |     56.7 KB |    120.2 KB |             8.6% |                 0% |    21.9 ms |

מסקנות עיקריות:

- **זמן הריצה קטן במיוחד, ודפים אינם מדליפים תוכן של דפים אחרים.** זמן הריצה נוצר בהתאמה לקונפיגורציה שלכם, וההודעות מיובאות רק היכן שמשתמשים בהן בפועל.
- **זליגת שפות קיימת.** כל פונקציית הודעה מכילה את כל השפות, כך שכמחצית מהמחרוזות המתורגמות הנשלחות לדף הן בשפות שהמבקר אינו משתמש בהן. ככל שמוסיפים שפות נוספות, חלק זה הולך וגדל.
- **טעינת העמוד היא האיטית ביותר בקבוצה**, בין היתר משום שהשפה נפתרת דרך אסטרטגיות שונות בכל קריאה ולא נקראת מתוך React context מוכן.

> צפו בנתונים המלאים: [דוח ביצועים של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md), וב-[מאגר ה-benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [דוח ביצועים של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

## השוואת תכונות ב-TanStack Start

כיצד Paraglide JS משתווה לספריות האחרות הנפוצות ב-TanStack Start:

| תכונה                                     | `react-intlayer` (Intlayer)          | `use-intl`            | Paraglide JS                  | Lingui                       |
| ----------------------------------------- | ------------------------------------ | --------------------- | ----------------------------- | ---------------------------- |
| **תרגומים לצד קומפוננטות**                | ✅ ממוקם יחד                         | ❌ JSON מרוכז         | ❌ קובץ JSON אחד לכל שפה      | ⚠️ טקסט מקור בקומפוננטות     |
| **אינטגרציה עם TypeScript**               | ✅ טיפוסים הנוצרים אוטומטית          | ✅ דרך `AppConfig`    | ✅ פונקציות הודעה מוקלדות     | ⚠️ מאקרואים בלבד             |
| **זיהוי תרגומים חסרים**                   | ✅ שגיאות טיפוס ואזהרות build        | ⚠️ נפילה בזמן ריצה    | ⚠️ נפילה לשפת הבסיס           | ⚠️ נפילה לטקסט המקור         |
| **תוכן עשיר (JSX, Markdown)**             | ✅ תמיכה ישירה                       | ⚠️ תגיות דרך `t.rich` | ⚠️ מחרוזות בלבד               | ✅ JSX בתוך `<Trans>`        |
| **ניתוב מתורגם (Localized routing)**      | ✅ מובנה                             | ❌ `{-$locale}` ידני  | ✅ `urlPatterns` + שכתוב נתב  | ❌ `{-$locale}` ידני         |
| **החלפת שפה ללא טעינה מחדש**              | ✅ כן                                | ✅ כן                 | ❌ טעינת עמוד מלאה            | ✅ כן                        |
| **צורות ריבוי (Pluralization)**           | ✅ מבוסס Enumeration                 | ✅ ICU                | ✅ גרסאות (Variants)          | ✅ ICU                       |
| **ICU MessageFormat**                     | ✅ דרך `format: "icu"`               | ✅ טבעי               | ⚠️ דרך תוסף inlang            | ✅ טבעי                      |
| **פורמטים של תוכן**                       | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`            | ⚠️ inlang JSON                | ✅ PO, JSON, CSV             |
| **תרגום באמצעות בינה מלאכותית (AI)**      | ✅ ספק ומפתח משלכם                   | ❌ ללא                | ❌ ללא                        | ❌ ללא                       |
| **עורך ויזואלי / CMS**                    | ✅ עורך מקומי + CMS אופציונלי        | ❌ פלטפורמות חיצוניות | ⚠️ אפליקציות באקוסיסטם inlang | ❌ פלטפורמות חיצוניות        |
| **כלי עזר ל-SEO (hreflang, sitemap)**     | ✅ מובנים                            | ❌ ידני               | ⚠️ כתובות מתורגמות, השאר ידני | ❌ ידני                      |
| **גודל זמן ריצה (gzip, מתוך benchmark)**  | 4.5 KB                               | 75.9 KB               | 1.8 KB                        | 56.7 KB                      |
| **זליגה בתצורה הטובה ביותר (שפה / עמוד)** | 0% / 0%                              | 0% / 0%               | 49.7% / 0%                    | 8.6% / 0%                    |
| **בדיקת תרגומים חסרים ב-CI**              | ✅ `npx intlayer test`               | ⚠️ אינו מובנה         | ⚠️ אינו מובנה                 | ✅ `lingui compile --strict` |

> נתוני גודל זמן הריצה והזליגה נלקחו מתוך [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md).

- [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

> מדריכים נוספים ל-TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

## שיטות עבודה מומלצות

- **הגדירו `lang` ו-`dir` על `<html>`** מתוך השפה שנפתרה, ישירות ברינדור השרת.
- **שמרו על כתובת URL אחת לכל שפה** באמצעות אסטרטגיית קידומות (`/fr/about`), כך שכל גרסת שפה תהיה ניתנת לאינדוקס.
- **הציבו את `url` ראשון באסטרטגיית זיהוי השפה**, כך שכתובת ה-URL תהיה מקור האמת ומנועי חיפוש יקבלו בדיוק את הדף המבוקש.
- **השתמשו במפתחות תיאוריים שטוחים** (`about_title`) הממופים באופן נקי לשמות פונקציות.
- **שמרו ב-Git את `messages/*.json` בלבד, ולא את התיקייה הנוצרת `src/paraglide`**, כדי למנוע קונפליקטים על קבצים שנוצרים מחדש.
- **תרגמו את נתוני ה-metadata**, והצהירו על `canonical`, `hreflang` ו-`x-default` בכל עמוד.
- **צרו sitemap ו-robots.txt רב-לשוניים**, ובצעו pre-render לכל שפה.
- **השתמשו בקישורים אמיתיים עבור בורר השפות (Locale switcher)**, כדי שמנועי חיפוש יגלו כל גרסת שפה.

- [בינאום ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md)
- [מדריך hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/hreflang_guide_multilingual_seo.md)

## מדריך שלב אחר שלב להגדרת Paraglide JS באפליקציית TanStack Start

להלן מבנה הפרויקט שנבנה:

```bash
.
├── project.inlang
│   └── settings.json          # הגדרות שפות ופורמט הודעות
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # קבצים שנוצרים אוטומטית, מתעלמים ב-Git
    ├── server.ts              # Middleware של Paraglide
    ├── router.tsx             # שכתוב כתובות URL
    ├── i18n
    │   ├── config.ts          # כתובת אתר, עזרי שפה
    │   └── seo.ts             # בונה head()
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # מטפל ב- / ו- /fr
        ├── about.tsx          # מטפל ב- /about ו- /fr/about
        ├── $.tsx              # עמוד 404 מתורגם
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

שימו לב שאין תיקיית `$locale`: מנגנון שכתוב הנתב מסיר את קידומת השפה לפני התאמת הנתיבים.

<Steps>
<Step number={1} title="התקנת תלויות">

התחילו מפרויקט TanStack Start, ולאחר מכן אתחלו את Paraglide. פקודת האתחול יוצרת את `project.inlang/settings.json`, קובץ `messages/en.json` ראשוני, ומתקינה את החבילה.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: הקומפיילר ותוסף ה-Vite שלו. אין חבילת runtime נפרדת להתקנה: זמן הריצה נוצר ישירות בתוך הפרויקט שלכם.

</Step>
<Step number={2} title="הגדרת השפות שלכם">

הקובץ `project.inlang/settings.json` הוא מקור האמת היחיד להגדרת השפות. תוסף פורמט ההודעות קורא קובץ JSON יחיד לכל שפה.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="הגדרת תוסף ה-Vite ואסטרטגיית ה-URL">

התוסף מקמפל הודעות בכל שינוי קוד. שלוש הגדרות קריטיות עבור TanStack Start:

- **`strategy`**: הרשימה המסודרת של מקורות שמהם תיקרא השפה. הצבת `url` ראשון הופכת את כתובת ה-URL למקור האמת. `cookie` ו-`preferredLanguage` משמשים את ה-middleware כאשר ה-URL אינו קובע שפה מפורשת.
- **`urlPatterns`**: האופן שבו שפה ממופה לכתובת URL. שפות שאינן ברירת מחדל מופיעות ראשונות, שכן הדפוס התואם הראשון מנצח. כאן שפת ברירת המחדל נשארת ללא קידומת (`/about`), ושפות אחרות מקבלות קידומת (`/fr/about`).
- **`outputStructure: "message-modules"`**: מודול נפרד לכל הודעה, מה שמאפשר ל-bundler להסיר הודעות שדף אינו מייבא.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // שפת ברירת המחדל מופיעה אחרונה: היא תואמת לכל שאר הכתובות
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

הוסיפו את התיקייה שנוצרת אל `.gitignore`. היא נבנית מחדש בכל `dev` ו-`build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="יצירת קובצי התרגום">

כל מפתח הופך לפונקציה המיוצאת מ-`src/paraglide/messages`. מפתחות שטוחים במבנה snake_case מעניקים את שמות הפונקציות הנקיים ביותר. משתנים מוגדרים באמצעות סוגריים מסולסלים `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

צורות ריבוי משתמשות בתחביר הווריאציות של פורמט ההודעות של inlang:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="הוספת ה-Middleware בצד השרת">

ה-middleware מזהה את השפה של כל בקשה לפי האסטרטגיה שלכם, והופך אותה לזמינה עבור `getLocale()` לאורך כל רינדור השרת באמצעות הקשר של `AsyncLocalStorage`. מנגנון זה מבטיח שבקשות מקבילות בשפות שונות לא יתנגשו.

ב-TanStack Start, עוטפים את נקודת הכניסה של השרת:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="שכתוב כתובות מתורגמות בנתב">

אפשרות ה-`rewrite` של TanStack Router מתרגמת כתובות בגבולות הנתב:

- **קלט (input)**: `/fr/about` משוכתב ל-`/about` לפני ההתאמה לנתיב, כך שנתיב יחיד ב-`about.tsx` משרת את כל השפות;
- **פלט (output)**: כל `href` שנוצר (קישורים, הפניות, ניווט) מותאם לשפה הפעילה, כך ש-`<Link to="/about">` מייצר `/fr/about` בדף בצרפתית.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> מאחר שקישורים מותאמים אוטומטית על ידי השכתוב, אין צורך בקומפוננטת `LocalizedLink` מיוחדת: השתמשו ב-`Link` הרגיל של TanStack Router.

</Step>
<Step number={7} title="יצירת מסמך השורש">

הפונקציה `getLocale()` מחזירה את השפה שנפתרה על ידי ה-middleware בשרת, ואת השפה מה-URL בדפדפן, כך ש-`lang` ו-`dir` זהים ב-HTML שנשלח מהשרת ולאחר hydration.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** כתובת מקור ציבורית עבור canonical URLs, hreflang וה-sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph מצפה לקודים במבנה `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="שימוש בתרגומים בתוך הדפים שלכם">

הודעות הן פונקציות רגילות: מייבאים את `m`, קוראים לפונקציה ומעבירים משתנים כאובייקט. הכל מוקלד לחלוטין, כולל שמות המשתנים.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> פונקציית הודעה מקבלת גם שפה מפורשת: `m.about_title({}, { locale: "fr" })`. הדבר שימושי בקוד שרת שמרנדר שפה שונה מזו של הבקשה הנוכחית, למשל בעת הפקת אימיילים.

</Step>
<Step number={9} title="החלפת שפת התוכן" isOptional={true}>

רנדרו את הבורר כ**קישורים** עם `localizeHref`, כדי שמנועי חיפוש יגלו כל שפה. הפונקציה `setLocale` שומרת את הבחירה בעוגייה וטוענת מחדש את הדף בכתובת המותאמת לשפה החדשה: טעינה מלאה היא ההתנהגות הצפויה ב-Paraglide, מאחר שפונקציות ההודעה קוראות את השפה בכל קריאה ולא נרשמות ל-state של React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // נתיב הנתב, שכבר עבר de-localize על ידי השכתוב: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // מגדיר עוגייה וטוען מחדש ב-URL המתורגם
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="בינאום של נתוני Metadata" isOptional={true}>

כל גרסת שפה יכולה לקבל דירוג עצמאי, בתנאי שכל עמוד מציג:

- `<title>` ותיאור **מתורגמים**;
- קישור **canonical** המצביע על עצמו;
- חלופת **`hreflang` אחת לכל שפה**, בתוספת **`x-default`**;
- נתוני **Open Graph** עבור `og:locale`, `og:locale:alternate` ו-`og:url`;
- תגית **JSON-LD** עם מאפיין `inLanguage`.

הפונקציה `localizeUrl` של Paraglide בונה את הכתובות החלופיות מתוך ה-`urlPatterns` שלכם, כך שהן לעולם לא יחרגו מהניתוב האמיתי:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** נתיב ללא קידומת שפה, למשל "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="בינאום של ה-Sitemap" isOptional={true}>

קובץ sitemap רב-לשוני מפרט כל כתובת URL של כל שפה, כאשר כל רשומה מצהירה על כל חלופותיה באמצעות `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="בינאום של ה-robots.txt" isOptional={true}>

נתיבים פרטיים קיימים בכל שפה, לכן כללי `Disallow` חייבים לכסות כל נתיב מתורגם. הסירו את `public/robots.txt` אם נוצר כזה, והגישו אותו מתוך נתיב בראוטר:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="רינדור מוקדם (Pre-render) לכל שפה" isOptional={true}>

פרטו את הנתיב המתורגם של כל עמוד כדי ש-TanStack Start ירנדר מראש את כל גרסאות השפה. הפונקציה `localizeHref` היא קוד שנוצר אוטומטית ללא תלות בדפדפן, כך שהיא יכולה לרוץ ב-`vite.config.ts`, אך הקובץ קיים רק לאחר קומפילציה ראשונה. פירוט ידני של הנתיבים מונע את בעיית סדר הפעולות:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // שפת ברירת המחדל "en" ללא קידומת
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... אותן הגדרות משלב 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

מאחר שבורר השפות מרנדר קישורים אמיתיים, ההגדרה `crawlLinks: true` מגלה גם דפים שאולי שכחתם לציין ברשימה.

</Step>
<Step number={14} title="טיפול בעמודי 404 מתורגמים" isOptional={true}>

באמצעות מנגנון השכתוב, כתובת כגון `/fr/does-not-exist` מותאמת כ-`/does-not-exist`, והפונקציה `getLocale()` עדיין מחזירה `fr`. לכן ה-`notFoundComponent` של השורש משלב 7 מתרנדר בצרפתית. נתיב catch-all מבטיח שגם נתיבים עמוקים יגיעו לשם. סמנו את העמוד ב-`noindex`: ב-React 19 תגית ה-`<meta>` מועלית ישירות אל ה-`<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="גישה לשפה בתוך Server Functions" isOptional={true}>

פונקציות שרת רצות בתוך ההקשר של ה-middleware של Paraglide, כך ש-`getLocale()` פועלת גם שם:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="השוואה מול Intlayer" isOptional={true}>

אין מתאם תאימות ישיר (drop-in) מ-Paraglide ל-Intlayer, כיוון ששתיהן פועלות לפי עיקרון דומה: קימפול תוכן בזמן build ומשלוח ספריית זמן ריצה מינימלית ככל האפשר. ההבדלים באים לידי ביטוי במה שנשלח לדפדפן ובאופן ארגון התוכן:

- **שפות**: Intlayer טוענת [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) לכל שפה בנפרד (0% זליגת שפות ב-benchmark), בעוד שכל פונקציית הודעה ב-Paraglide נושאת את כל השפות (49.7%).
- **ארגון תוכן**: תוכן יכול לחיות בקובצי `.content.ts` לצד כל קומפוננטה, או בקבצים מרוכזים. ראו [בינאום לפי קומפוננטה לעומת בינאום מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/per-component_vs_centralized_i18n.md).
- **החלפת שפה**: התוכן נקרא מתוך React context, כך שהחלפת שפה מתרנדרת מחדש ללא צורך בטעינת עמוד מלאה.
- **קוד שנוצר**: שום קוד אינו מיוצר בתוך תיקיית `src`, כך שאין צורך לייצר קבצים מחדש לפני כל commit.

אם אתם מגיעים מספריות אחרות, [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) שומרים על ה-API של `use-intl`, `next-intl`, `react-i18next`, `react-intl` או Lingui ומחליפים את זמן הריצה בלבד.

- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

ראו [האם Intlayer קלה יותר מ-Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_intlayer_lighter_than_paraglide.md) ואת [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md).

- [האם Intlayer קלה יותר מ-Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_intlayer_lighter_than_paraglide.md)
- [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

</Step>
<Step number={17} title="אוטומציה של תרגומים באמצעות Intlayer" isOptional={true}>

Paraglide מרנדרת תרגומים, אך היא אינה מסייעת ב**הפקתם**. Intlayer היא **חינמית** ובעלת **קוד פתוח**, וכלי העבודה שלה מועילים גם בפרויקט Paraglide:

- **תרגום באמצעות בינה מלאכותית (AI)** תוך שימוש במפתח API ובספק לבחירתכם. ראו [מילוי אוטומטי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md) ואת ה-[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).
- **שמירה על קובצי ה-JSON שלכם** כמקור האמת בעזרת [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md).
- **בדיקת תרגומים חסרים** ב-CI. ראו [בדיקת תרגומים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md).
- **סריקת האתר הפעיל שלכם** לזיהוי תגיות `hreflang` חסרות, קישורי canonical שגויים וזליגות שפה באמצעות [פקודת scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/scan.md).

</Step>
</Steps>

## שאלות נפוצות

<FAQ>

<Question title="האם Paraglide JS היא בחירה טובה עבור TanStack Start?">

זוהי בחירה מצוינת: היא משמשת בדוגמאות הרשמיות של TanStack Router, יש לה את זמן הריצה הקטן ביותר ב-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) (~1.8 KB gzip), וההודעות מוקלדות לחלוטין. הפשרות הן שכל פונקציית הודעה מכילה את כל השפות, מה שגורם לזליגה של כמחצית מהמחרוזות למבקרים בשפות אחרות, ושהחלפת שפה דורשת טעינה מחדש של העמוד.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

</Question>
<Question title="האם יש צורך במקטע נתיב של $locale עם Paraglide?">

לא. מנגנון ה-`rewrite` של הנתב מסיר את קידומת השפה לפני התאמת הנתיב ומוסיף אותה בחזרה לקישורים שנוצרים, כך שנתיב יחיד ב-`about.tsx` משרת את `/about`, `/fr/about` ו-`/es/about`.

</Question>
<Question title="מדוע החלפת שפה גורמת לטעינה מחדש של העמוד?">

פונקציות ההודעה קוראות את השפה ישירות בעת קריאתן, ואינן מנויות ל-state של React. לכן `setLocale` מרעננת את הדף כברירת מחדל, כך שכל הודעה מתרנדרת מחדש בשפה החדשה. ניתן להעביר `{ reload: false }`, אך במקרה זה עליכם לדאוג לרינדור מחדש של העץ בעצמכם.

</Question>
<Question title="האם כדאי לשמור ב-Git את התיקייה הנוצרת src/paraglide?">

עדיף שלא. התיקייה נוצרת מחדש בכל `dev` ו-`build`, ושמירתה ב-Git עלולה להוביל לקונפליקטים במיזוג קבצים. שמרו במקום זאת את `messages/*.json` ואת `project.inlang/settings.json`.

</Question>
<Question title="כיצד מוסיפים תגיות hreflang עם Paraglide?">

משתמשים ב-`localizeUrl` כדי לבנות כתובת URL אבסולוטית אחת לכל שפה בתוך ה-`head()` של הנתיב, ומוסיפים `x-default` המצביע על שפת הבסיס. שלב 10 מציג פונקציית עזר לשימוש חוזר, ושלב 11 מוסיף את אותן החלופות לקובץ ה-sitemap.

</Question>
<Question title="האם Paraglide מבצעת tree-shaking לתרגומים שאינם בשימוש?">

**הודעות** שאינן בשימוש מוסרות כאשר מגדירים `outputStructure: "message-modules"`, כך שתוכן מדפים אחרים אינו זולג. **שפות** שאינן בשימוש אינן מוסרות: כל פונקציית הודעה כוללת את כל התרגומים, וזו הסיבה שבמבחן הביצועים נמדדת זליגת שפות של 49.7%.

</Question>
<Question title="האם ניתן להגר מ-Paraglide ל-Intlayer?">

כן. שתי הספריות מבוססות קומפיילר, כך שהמודל המחשבתי קרוב מאוד. שמרו את קובצי ה-JSON שלכם בעזרת [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md), ולאחר מכן החליפו קריאות `m.key()` ב-`useIntlayer`, דף אחר דף. ראו את [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md).

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

</Question>

</FAQ>
