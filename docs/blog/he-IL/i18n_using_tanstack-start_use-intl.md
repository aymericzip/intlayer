---
createdAt: 2026-09-26
updatedAt: 2026-11-03
priority: 9
title: "TanStack Start i18n עם use-intl: מדריך הגדרה מלא לשנת 2026"
description: "תרגמו את אפליקציית ה-TanStack Start שלכם עם use-intl: ניתוב שפות, הודעות מוקלדות, SSR, hreflang, sitemap ו-robots.txt, כולל נתוני ביצועים (benchmark) של גודל ה-bundle."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - בינאום
  - i18n
  - SEO
  - Sitemap
  - React
  - בלוג
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "גרסה ראשונית"
author: aymericzip
---

# כיצד לבצע בינאום לאפליקציית TanStack Start באמצעות use-intl בשנת 2026

## תוכן עניינים

<TOC/>

## מה זה use-intl?

**use-intl** היא ליבת ה-API הבלתי-תלויה בפריימוורק של `next-intl`. היא מספקת את אותם ממשקים מוכרים של `useTranslations`, `useFormatter` ו-`IntlProvider`, תמיכה מלאה ב-ICU MessageFormat ואינטגרציה הדוקה עם TypeScript, ללא תלות ישירה ב-Next.js. הדבר הופך אותה לאחת הבחירות הנפוצות ביותר לתרגום אפליקציות **TanStack Start**, וזו הספרייה שעוזרי AI ממליצים עליה לעיתים קרובות עבור סטאק זה.

TanStack Start אינה מגיעה עם שכבת i18n מובנית. ניתוב, זיהוי שפה, SEO metadata והפקת sitemap נשארים באחריותכם. מדריך זה מפרט את התהליך מקצה לקצה:

- **ניתוב מותאם שפה** באמצעות מקטע אופציונלי `{-$locale}` (למשל `/about`, `/fr/about`).
- **טעינת הודעות לפי נתיב**, כך שכל דף מוריד אך ורק את ה-namespaces והשפה שהוא מרנדר.
- **רינדור בצד השרת (SSR) ו-hydration** ללא אי-התאמות של טקסט או תאריכים.
- **SEO רב-לשוני מלא**: תגיות `<title>` ותיאור מתורגמות, כתובת canonical, חלופות `hreflang` עם `x-default`, שפות Open Graph, נתוני JSON-LD, מפת אתר (sitemap) עם קישורי `xhtml:link`, קובץ `robots.txt` ורינדור מוקדם של כל שפה.

> מחפשים סטאק אחר?

- [מדריך TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_paraglide.md)
- [מדריך TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_lingui.md)
- [מדריך TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

> משתמשים ב-Next.js במקום? ראו את [מדריך next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-intl.md).

- [מדריך next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-intl.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## מה מראה ה-Benchmark על use-intl ב-TanStack Start

ה-[i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) מריץ אפליקציית TanStack Start זהה בת 10 עמודים ו-10 שפות עם כל ספרייה מובילה ומודד מה הדפדפן מוריד בפועל.

- [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

נתונים מרכזיים עבור `use-intl@4.14.2`, שנמדדו ב-2026-09-26 (gzip):

| הגדרה                             | גודל ספרייה | JS לכל עמוד | זליגת שפות אחרות | זליגת עמודים אחרים |
| :-------------------------------- | ----------: | ----------: | ---------------: | -----------------: |
| ללא i18n (אפליקציית בסיס)         |           - |    111.0 KB |               0% |                 0% |
| `use-intl` (התצורה במדריך זה)     |     75.9 KB |    128.7 KB |               0% |                 0% |
| `@intlayer/use-intl` (compat)     |      6.7 KB |    129.4 KB |               0% |                 0% |
| `react-intlayer` (Intlayer מקורי) |      4.5 KB |    126.8 KB |               0% |                 0% |

מסקנות עיקריות:

- **פצלו הודעות לפי דף וטענו אותן לפי שפה.** זה מונע לחלוטין זליגת שפות ועמודים אחרים, וזה בדיוק מה שהשלבים להלן מיישמים.
- **זמן הריצה עצמו נותר כבד** (~76 KB gzip), מאחר שמפענח ה-ICU נשלח ישירות ללקוח. מתאם התאימות של `@intlayer/use-intl` (שלב 17) שומר על אותו API בדיוק עם זמן ריצה של ~7 KB בלבד.

> צפו בנתונים המלאים: [דוח ביצועים של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md), וב-[מאגר ה-benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [דוח ביצועים של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

## השוואת תכונות ב-TanStack Start

כיצד `use-intl` משתווה לספריות האחרות הנפוצות ב-TanStack Start:

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
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

## שיטות עבודה מומלצות

- **הגדירו `lang` ו-`dir` על `<html>`** עבור נגישות, קוראי מסך ומנועי חיפוש.
- **שמרו על כתובת URL אחת לכל שפה.** השתמשו בקידומת שפה בנתיב (`/fr/about`) במקום הסתמכות על עוגיות בלבד, כדי שכל גרסה תהיה ניתנת לסריקה ולשיתוף.
- **פצלו הודעות לפי namespace** (`common`, `home`, `about`) וטענו אותן לכל נתיב בנפרד.
- **טענו אך ורק את השפה הפעילה.** לעולם אל תייבאו קובצי שפות שונות בתוך מודול הנשלח לדפדפן.
- **קבעו אזור זמן קבוע (timeZone)** בתוך `IntlProvider`. אחרת תאריכים יעוצבו לפי אזור הזמן של השרת בזמן SSR ולפי אזור הזמן של הלקוח ב-hydration, מה שיוביל לשגיאות אי-התאמה.
- **תרגמו את נתוני ה-metadata**, והצהירו על `canonical`, `hreflang` ו-`x-default` בכל עמוד.
- **הפיקו sitemap ו-robots.txt רב-לשוניים**, ובצעו pre-render לכל שפה.
- **השתמשו בקישורים אמיתיים עבור בורר השפות**, ולא ב-`<select>`, כדי שמנועי חיפוש יגלו כל גרסה.
- **הקלידו את ההודעות שלכם** כדי שמפתחות חסרים ייכשלו בזמן קומפילציה.

- [בינאום ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md)
- [מדריך hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/hreflang_guide_multilingual_seo.md)

## מדריך שלב אחר שלב להגדרת use-intl באפליקציית TanStack Start

להלן מבנה הפרויקט שנבנה:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... אותם קבצים
│   └── es
│       └── ... אותם קבצים
├── vite.config.ts
└── src
    ├── start.ts                  # Middleware לבקשות (הפניית שפה)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # שפות, עזרי URL
    │   ├── messages.ts           # טעינת הודעות לפי namespace ושפה
    │   ├── negotiateLocale.ts    # ניתוח Accept-Language
    │   └── seo.ts                # בונה head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Layout של שפה + IntlProvider
            ├── index.tsx         # / ו- /fr
            ├── about.tsx         # /about ו- /fr/about
            └── $.tsx             # עמוד 404 מתורגם
```

<Steps>
<Step number={1} title="התקנת תלויות">

התחילו מפרויקט TanStack Start, ולאחר מכן התקינו את `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: מספקת את `IntlProvider`, `useTranslations`, `useFormatter` ואת `createTranslator` (הניתנת לשימוש מחוץ ל-React, למשל ב-`head()`).

</Step>
<Step number={2} title="ריכוז הגדרות השפה">

צרו מקור אמת יחיד עבור השפות ועזרי ה-URL שלכם. כל קובץ אחר בפרויקט מייבא מכאן, כך שהוספת שפה חדשה מתבצעת בשורה אחת בלבד.

שפת ברירת המחדל נשארת ללא קידומת (`/about`), ושאר השפות מקבלות קידומת (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** כתובת מקור ציבורית עבור canonical URLs, hreflang וה-sitemap. */
export const siteUrl = "https://example.com";

/** עוגייה השומרת את השפה שנבחרה במפורש על ידי המשתמש. */
export const localeCookieName = "locale";

/** Open Graph מצפה לקודים במבנה `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** ממפה את פרמטר הנתיב האופציונלי `{-$locale}` לשפה נתמכת. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** הערך להעברה כפרמטר `locale`: `undefined` עבור שפת ברירת המחדל. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, שפת ברירת מחדל ללא קידומת. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="יצירת קובצי התרגום">

ארגנו הודעות לפי שפה ולפי namespace. הקובץ `common` מכיל את מה שכל דף צריך (ניווט, footer), וכל דף מקבל קובץ משלו, כולל ה-metadata שלו.

הספרייה `use-intl` משתמשת ב-**ICU MessageFormat**, כך שריבוי, בחירות מותנות ומשתנים מעוצבים חיים בתוך ההודעה עצמה.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

צרו גם את `home.json` באותו אופן, עם אובייקט `metadata` ותוכן העמוד.

</Step>
<Step number={4} title="טעינת הודעות לפי Namespace ולפי שפה">

טוען זה הוא החלק החשוב ביותר לביצועים. השימוש ב-`import.meta.glob` מורה ל-Vite לפלוט **chunk נפרד לכל קובץ JSON**. נתיב המבקש את `["about"]` בצרפתית מוריד אך ורק את `messages/fr/about.json`, ובכך מושגים 0% זליגת שפות ו-0% זליגת עמודים.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** מבנה כל namespace, מוסק מתוך קובצי המקור באנגלית. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: כל קובץ JSON הופך ל-chunk עצמאי, הנטען לפי דרישה
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * טוען את ה-namespaces המבוקשים עבור שפה אחת, במקביל.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="הגדרת טיפוסים עבור ההודעות">

הרחבת מודול (Module augmentation) מעניקה השלמה אוטומטית בעת שימוש ב-`useTranslations("about")` ו-`t("counter.label")`, ומציגה שגיאת קומפילציה ברורה על כל שגיאת כתיב או מפתח שהוסר.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

ודאו שההגדרה `resolveJsonModule` מופעלת בקובץ `tsconfig.json`.

</Step>
<Step number={6} title="יצירת מסמך השורש">

נתיב השורש מרנדר את תגית `<html>`. הוא קורא את פרמטר השפה האופציונלי כדי להגדיר את `lang` ו-`dir`, כך שהם יהיו תקינים כבר ב-HTML המופק בשרת.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false קורא פרמטרים מכל נתיב שהותאם
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

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
```

</Step>
<Step number={7} title="יצירת נתיב Layout עבור השפה">

התיקייה `{-$locale}` יוצרת מקטע נתיב **אופציונלי**: גם `/about` וגם `/fr/about` תואמים לנתיב `/{-$locale}/about`. רכיב זה:

1. דוחה קידומות לא מוכרות (`/xx/about` → 404).
2. טוען את ה-namespace של `common` עבור השפה הנוכחית בלבד.
3. מספק את ההודעות באמצעות `IntlProvider`.

תוצאת ה-loader נשמרת ב-HTML לשימוש חוזר ב-hydration, כך שהלקוח אינו מוריד את `common.json` שנית. הגדרת `staleTime: Infinity` שומרת אותה ב-cache בניווט צד לקוח.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about עם קידומת לא מוכרת → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // הודעות אינן משתנות עבור שפה נתונה
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // אזור זמן קבוע מונע אי-התאמות תאריכים בין SSR ל-hydration
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> ה-`IntlProvider` אינו ממזג אוטומטית הודעות מ-provider אב. השלב הבא יוצר קומפוננטה קטנה שממזגת הודעות, כך שכל דף יוסיף את ה-namespace שלו על גבי `common`.

</Step>
<Step number={8} title="הגדרת תחום (Scope) להודעות העמוד">

כל עמוד טוען את ה-namespace הייעודי לו ב-loader, ולאחר מכן עוטף את תוכנו ב-`ScopedMessages`, הממזג את הודעות הדף עם הודעות האב.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * מוסיף namespaces ברמת הנתיב על גבי ההודעות שכבר סופקו.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="שימוש בתרגומים בתוך הדפים שלכם">

ה-loader של הדף טוען את ה-namespace של `about` עבור השפה הנוכחית, פונקציית `head()` בונה ממנו נתוני metadata מתורגמים ומלאים עבור SEO (ראו שלב 13), והקומפוננטה מרנדרת את התוכן.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator פועל מחוץ ל-React, מושלם עבור head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="שימוש בתרגומים ובמעצבים בקומפוננטות">

כל קומפוננטה הנמצאת תחת הספקים יכולה לקרוא ל-`useTranslations` ול-`useFormatter`. צורות ריבוי נפתרות בעזרת ICU, ומספרים מעוצבים בהתאם למוסכמות השפה הפעילה.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="בניית קומפוננטת Link מתורגמת" isOptional={true}>

כל הנתיבים חיים תחת `{-$locale}`, לכן קישור חייב לשאת את פרמטר השפה הנוכחית. מעטפת זו שומרת על מאפיין `to` המוקלד של TanStack Router ומזריקה את השפה אוטומטית.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="החלפת שפת התוכן" isOptional={true}>

רנדרו את הבורר כ**קישורים**, ולא כ-`<select>`. קישורים ניתנים לסריקה, כך שמנועי חיפוש מגלים כל גרסה, והם עובדים גם ללא JavaScript. הגדרת `to="."` שומרת על העמוד הנוכחי ומחליפה את פרמטר השפה בלבד. העוגייה זוכרת את הבחירה המפורשת עבור ה-middleware משלב 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={13} title="בינאום של נתוני Metadata" isOptional={true}>

כאן ההשקעה ב-i18n מניבה תוצאות: כל גרסת שפה יכולה להתקדם בדירוג באופן עצמאי. כל עמוד חייב לחשוף:

- תגיות `<title>` ותיאור **מתורגמות**;
- קישור **canonical** המצביע על עצמו (ולא על שפת ברירת המחדל);
- חלופת **`hreflang` אחת לכל שפה**, בתוספת **`x-default`** עבור שפות שאינן נתמכות;
- נתוני **Open Graph** עבור `og:locale`, `og:locale:alternate` ו-`og:url`;
- תגית **JSON-LD** עם מאפיין `inLanguage`.

פונקציית עזר יחידה בונה את כל המבנה:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

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
      // Canonical: כל שפה מהווה עמוד קנוני בפני עצמו
      { rel: "canonical", href: url },
      // hreflang: כל גרסאות השפה, כולל הנוכחית
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: ברירת מחדל למבקרים ששפתם אינה נתמכת
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
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

השתמשו בה בכל `head()` של עמוד, כפי שמוצג בשלב 9. עבור דף הבית, העבירו `path: "/"`.

</Step>
<Step number={14} title="בינאום של ה-Sitemap" isOptional={true}>

מפת אתר רב-לשונית מפרטת **כל כתובת URL של כל שפה**, כאשר כל רשומה מצהירה על כל חלופותיה באמצעות `xhtml:link`. Google משתמשת בהערות אלו בדיוק כמו בתגיות `hreflang` של העמוד.

נתיבי השרת של TanStack Start מאפשרים להגיש אותה ישירות מקובץ נתיב:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
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
<Step number={15} title="בינאום של ה-robots.txt" isOptional={true}>

נתיבים פרטיים קיימים בכל שפה, לכן כללי `Disallow` חייבים לכסות כל קידומת. הסירו את `public/robots.txt` אם נוצר כזה, והגישו אותו מתוך נתיב:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="הפניית מבקרים בפעם הראשונה לשפתם המועדפת" isOptional={true}>

Middleware לבקשות שולח מבקר הנוחת ב-`/` לשפתו המועדפת, בהתבסס על עוגיית השפה תחילה, ולאחר מכן על ה-header של `Accept-Language`. רק הנתיב `/` מופנה: קישורים ישירים אינם מופנים לעולם, כך שמנועי חיפוש ומשתמשים מקבלים בדיוק את הדף המבוקש.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * בוחר את השפה הנתמכת הטובה ביותר מתוך ה-header של Accept-Language.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> מבקר שבוחר במפורש באנגלית בבורר השפות מקבל `locale=en` בעוגייה, כך שהוא לא יופנה שוב לעולם. בפריסה סטטית לחלוטין (שלב 18), הנתיב `/` מוגש כקובץ וה-middleware אינו רץ, דבר תקין לחלוטין: הדף נשאר נגיש ובורר השפות מטפל בכל השאר.

</Step>
<Step number={17} title="שמירה על ה-API של use-intl וצמצום זמן הריצה עם Intlayer" isOptional={true}>

ה-benchmark מראה כי החלק הכבד ביותר בהגדרת use-intl הוא זמן הריצה עצמו (~76 KB gzip). מתאם התאימות [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושף את **אותו ממשק API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, ריבוי ICU, `t.rich`), אך מגיש אותו מתוך מילוני Intlayer מקומפלים: **~6.7 KB במקום ~75.9 KB**, עם 0% זליגת שפות ו-0% זליגת עמודים, ללא כל שינוי בקומפוננטות שלכם.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

תוסף ה-Vite יוצר alias מ-`use-intl` אל המתאם, כך שייבואים קיימים ממשיכים לעבוד:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

קובצי ה-JSON שלכם נשארים מקור האמת הודות ל[תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // chunk אחד לכל שפה, הנטען לפי דרישה
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

> המתאם מהווה גם נתיב הגירה חלק: ברגע שהוא פועל, תוכלו להעביר קומפוננטות אחת אחת ל-API המקורי של `useIntlayer`. ראו את [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md).

- [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="רינדור מוקדם (Pre-render) לכל שפה" isOptional={true}>

HTML סטטי הוא הדף המהיר ביותר להגשה והקל ביותר לאינדוקס. פרטו כל נתיב מותאם שפה כדי ש-TanStack Start ירנדר מראש את כל גרסאות השפה בזמן build, לצד קובצי ה-sitemap וה-robots:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
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
<Step number={19} title="טיפול בעמודי 404 מתורגמים" isOptional={true}>

ה-layout משלב 7 כבר זורק `notFound()` עבור קידומות לא מוכרות. הוסיפו נתיב catch-all כדי שנתיבים לא מוכרים בתוך שפה מסוימת ירנדרו גם הם עמוד 404 מתורגם, וסמנו אותו ב-`noindex`: ב-React 19 תגית ה-`<meta>` מועלית ישירות אל ה-`<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → מתרנדר על ידי notFoundComponent של ה-layout
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="גישה לשפה בתוך Server Functions" isOptional={true}>

פונקציות שרת אינן מקבלות פרמטרי נתיב ישירות. קראו את עוגיית השפה, והשתמשו ב-`Accept-Language` כגיבוי, כדי לשלוח אימייל מתורגם או לשמור העדפת שפה:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

כדי לתרגם בתוך פונקציית השרת, שלבו אותה עם `loadMessages` ו-`createTranslator` מתוך `use-intl`.

</Step>
<Step number={21} title="אוטומציה של תרגומים באמצעות Intlayer" isOptional={true}>

הספרייה use-intl מציגה תרגומים, אך אינה מסייעת ב**הפקתם**. Intlayer היא **חינמית** ובעלת **קוד פתוח**, ומשלימה פער זה גם אם תמשיכו להשתמש ב-use-intl:

- **בדיקת תרגומים חסרים** ב-CI או בבדיקות יחידה. ראו [בדיקת תרגומים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md).
- **תרגום באמצעות בינה מלאכותית (AI)** תוך שימוש במפתח API ובספק לבחירתכם: הפקודה `npx intlayer fill` מתרגמת מפתחות חסרים בהתבסס על הקשר האפליקציה. ראו [מילוי אוטומטי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md) ואת ה-[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).
- **שמירה על קובצי ה-JSON שלכם** כמקור האמת בעזרת [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md).
- **עריכת תוכן ויזואלית** בעזרת [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) ו-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), כך שחברי צוות שאינם מפתחים יוכלו לעדכן תרגומים.
- **הענקת הקשר לסוכני AI** באמצעות [שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md) ו-[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md).
- **סריקת האתר הפעיל שלכם** לזיהוי תגיות `hreflang` חסרות, קישורי canonical שגויים וזליגות שפה באמצעות [פקודת scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/scan.md).

לגילוי כל התכונות, ראו [מדוע לבחור ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md).

- [מדוע לבחור ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)

</Step>
</Steps>

## שאלות נפוצות

<FAQ>

<Question title="האם use-intl היא בחירה טובה עבור TanStack Start?">

כן, במידה ואתם מעוניינים ב-API של `next-intl` מחוץ ל-Next.js. היא מספקת הודעות בפורמט ICU, מעצבים ותמיכה מצוינת ב-TypeScript, ונמנעת מאילוצים ייחודיים ל-Next.js כגון `setRequestLocale`. הפשרה היא במשקל: ה-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) מודד כ-76 KB gzip עבור זמן הריצה, וקונפיגורציה בסיסית שולחת את כל השפות והעמודים לדפדפן. טעינת namespaces לפי נתיב ולפי שפה, כפי שמוסבר במדריך זה, מונעת את הזליגות הללו לחלוטין.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

</Question>
<Question title="מה ההבדל בין use-intl ל-next-intl?">

`use-intl` היא הליבה של `next-intl`. החבילה `next-intl` מוסיפה שכבות אינטגרציה מעליה הייעודיות ל-Next.js: middleware, עזרי ניווט, `getTranslations` עבור Server Components ותצורות בקשה. ב-TanStack Start משתמשים ב-`use-intl` ישירות ומממשים את הניתוב בעזרת TanStack Router, כפי שהודגם לעיל.

</Question>
<Question title="האם כדאי להשתמש בקידומת שפה ב-URL או בעוגייה לשמירת השפה?">

השתמשו בקידומת שפה בכתובת ה-URL. כך לכל גרסת שפה יש כתובת ייחודית שמנועי חיפוש יכולים לאנדקס ומשתמשים יכולים לשתף. עוגייה עדיין שימושית לזכירת בחירה מפורשת, כפי שעושה ה-middleware להפניות בשלב 16.

</Question>
<Question title="מדוע מתרחשות שגיאות אי-התאמה (hydration mismatches) בעת עיצוב תאריכים?">

השרת והדפדפן מעצבים תאריכים באזורי זמן שונים. העבירו ערך `timeZone` מפורש אל `IntlProvider` (או את אזור הזמן של המבקר הנשמר בעוגייה), כך ששני הצדדים ייצרו את אותו הטקסט בדיוק.

</Question>
<Question title="כיצד ניתן להקטין את גודל ה-bundle של use-intl?">

ראשית, פצלו הודעות לפי namespace וטענו אותן לפי נתיב ולפי שפה באמצעות `import.meta.glob`, מה שמבטל זליגת שפות ועמודים. שנית, אם גודל זמן הריצה קריטי עבורכם, עברו למתאם [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md): אותו API בדיוק, ~6.7 KB במקום ~75.9 KB ב-benchmark.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="כיצד מתרגמים את הכותרת ותיאור ה-meta עם use-intl?">

קוראים ל-`createTranslator` בתוך פונקציית ה-`head()` של הנתיב עם ההודעות המוחזרות מה-loader, ומחזירים קישורי `title`, `description`, canonical ו-`hreflang`. שלב 13 מספק פונקציית עזר לשימוש חוזר.

</Question>
<Question title="האם ניתן להגר מ-use-intl ל-Intlayer באופן הדרגתי?">

כן. התקינו תחילה את מתאם התאימות (שלב 17): הקומפוננטות שלכם ימשיכו לקרוא ל-`useTranslations`, המופעל כעת על ידי Intlayer. לאחר מכן תוכלו להעביר קומפוננטות אחת אחת ל-`useIntlayer`, ולהגדיר תוכן ישירות לצידן. ראו את [מתאמי התאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) ואת [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md).

- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)
- [מדריך TanStack Start עם Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

</Question>

</FAQ>
