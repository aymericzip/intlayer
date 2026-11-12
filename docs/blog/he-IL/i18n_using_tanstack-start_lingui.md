---
createdAt: 2026-09-26
updatedAt: 2026-11-03
priority: 9
title: "TanStack Start i18n עם Lingui: מדריך הגדרה מלא לשנת 2026"
description: "תרגמו את אפליקציית ה-TanStack Start שלכם עם Lingui: מאקרואים, קטלוגי PO, SSR, ניתוב שפות, hreflang, sitemap ו-robots.txt, כולל נתוני ביצועים (benchmark) של גודל ה-bundle."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - בינאום
  - i18n
  - SEO
  - קובצי PO
  - React
  - בלוג
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "גרסה ראשונית"
author: aymericzip
---

# כיצד לבצע בינאום לאפליקציית TanStack Start באמצעות Lingui בשנת 2026

## תוכן עניינים

<TOC/>

## מה זה Lingui?

**Lingui** היא ספריית i18n הבנויה סביב **מאקרואים (macros)** ו**חילוץ הודעות (message extraction)**. אתם כותבים את טקסט המקור ישירות בתוך הקומפוננטות שלכם (`` t`Hello` ``, `<Trans>Hello</Trans>`), הפקודה `lingui extract` אוספת כל הודעה לקטלוגים (קובצי PO כברירת מחדל), מתרגמים ממלאים אותם, ותוסף ה-Vite מקמפל אותם ל-JavaScript קומפקטי. ההודעות משתמשות בפורמט ICU MessageFormat, כך שישנה תמיכה מלאה בריבוי (plurals) ובבחירות מותנות (selects).

TanStack Start אינה מגיעה עם שכבת i18n מובנית, ולכן מדריך זה מחבר את Lingui אליה מאפס:

- **מאקרואים המקומפלים על ידי Babel** דרך `@rolldown/plugin-babel` (נדרש עם `@vitejs/plugin-react` בגרסה 6 ו-Vite 8).
- **ניתוב שפות (Locale routing)** באמצעות מקטע אופציונלי של `{-$locale}` (למשל `/about`, `/fr/about`).
- **קטלוג אחד לכל שפה, הנטען לפי דרישה**, ומופע `I18n` ייעודי לכל רינדור, כך שבקשות SSR מקבילות לעולם לא יחלקו שפה.
- **SEO רב-לשוני מלא**: תגיות `<title>` ותיאור מתורגמות, כתובת canonical, תגיות `hreflang` עם `x-default`, שפות Open Graph, נתוני JSON-LD, מפת אתר (sitemap), קובץ `robots.txt`, רינדור מוקדם (pre-rendering) ועמודי 404 מקומיים.

> מחפשים סטאק אחר?

- [מדריך TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_use-intl.md)
- [מדריך TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_paraglide.md)
- [מדריך TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

> משתמשים ב-Next.js?

- [מדריך Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_nextjs_lingui.md)

> משווים בין ספריות?

- [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## מה מראה ה-Benchmark על Lingui ב-TanStack Start

ה-[i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) מריץ אפליקציית TanStack Start זהה בת 10 עמודים ו-10 שפות עם כל ספרייה מובילה ומודד מה הדפדפן מוריד בפועל.

- [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

נתונים מרכזיים עבור `@lingui/core@6.6.0`, שנמדדו ב-2026-09-26 (gzip):

| הגדרה                             | גודל ספרייה | JS לכל עמוד | זליגת שפות אחרות | זליגת עמודים אחרים |
| :-------------------------------- | ----------: | ----------: | ---------------: | -----------------: |
| ללא i18n (אפליקציית בסיס)         |           - |    111.0 KB |               0% |                 0% |
| Lingui (התצורה במדריך זה)         |     56.7 KB |    115.2 KB |             9.3% |                 0% |
| `@intlayer/lingui` (compat)       |      9.8 KB |    136.7 KB |             9.9% |                 0% |
| `react-intlayer` (Intlayer מקורי) |      4.5 KB |    126.8 KB |               0% |                 0% |

מסקנות עיקריות:

- **טענו קטלוג אחד לכל שפה, לפי דרישה.** הדבר שומר על גודל הדפים קרוב מאוד לאפליקציית הבסיס.
- **זמן הריצה נשאר כבד יחסית** (~57 KB gzip). מתאם התאימות של `@intlayer/lingui` (שלב 16) משמר את המאקרואים שלכם ומקצץ את זמן הריצה ל-~10 KB בלבד.

> צפו בנתונים המלאים: [דוח ביצועים של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md), וב-[מאגר ה-benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [דוח ביצועים של TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

## השוואת תכונות ב-TanStack Start

כיצד Lingui משתווה לספריות האחרות הנפוצות ב-TanStack Start:

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

> נתוני גודל זמן הריצה והזליגה נלקחו מתוך [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md). הזליגה נמדדה בתצורה הטובה ביותר של כל ספרייה.

- [TanStack Start benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

> מדריכים נוספים ל-TanStack Start:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)

## שיטות עבודה מומלצות

- **הגדירו `lang` ו-`dir` על `<html>`** מתוך שפת הנתיב, כך שהם יהיו מדויקים כבר ב-HTML שמופק בשרת.
- **שמרו על כתובת URL אחת לכל שפה** עם קידומת מתאימה, כך שכל גרסת שפה תהיה ניתנת לאינדוקס.
- **צרו מופע `I18n` אחד לכל שפה**, ולעולם אל תשנו מופע גלובלי בזמן SSR: שתי בקשות מקבילות עלולות לדרוס זו את השפה של זו.
- **טענו רק את הקטלוג הפעיל**, ולעולם אל תייבאו את כולם בקוד הלקוח.
- **בחרו סגנון מאקרו אחד** (`useLingui` + `t` בקומפוננטות, `msg` עבור תיאורים נדחים) והיצמדו אליו. שילוב בין `t`, `i18n._`, `i18n.t` ו-`<Trans>` מקשה על קריאות הקוד למפתחים ולכלי AI.
- **הריצו `lingui extract` ב-CI** כך שהודעה חדשה לעולם לא תגיע לייצור ללא תרגום.
- **תרגמו את ה-metadata שלכם**, והצהירו על `canonical`, `hreflang` ו-`x-default` בכל עמוד.
- **הפיקו sitemap ו-robots.txt רב-לשוניים**, ובצעו pre-render לכל שפה.
- **השתמשו בקישורים אמיתיים עבור בורר השפות (Locale switcher)**, כדי שמנועי חיפוש יגלו כל גרסה.

- [בינאום ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md)
- [מדריך hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/hreflang_guide_multilingual_seo.md)

## מדריך שלב אחר שלב להגדרת Lingui באפליקציית TanStack Start

להלן מבנה הפרויקט שנבנה:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # נוצר על ידי `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Middleware לבקשות (הפניית שפה)
    ├── i18n
    │   ├── config.ts           # שפות, עזרי URL
    │   ├── lingui.ts           # טעינת קטלוגים, מופעי I18n
    │   ├── negotiateLocale.ts  # ניתוח Accept-Language
    │   └── seo.ts              # בונה head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Layout של שפה + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # עמוד 404 מתורגם
```

<Steps>
<Step number={1} title="התקנת תלויות">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: זמן ריצה, `I18nProvider` והמאקרואים (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: פקודת `lingui extract` לאיסוף הודעות לתוך קטלוגים.
- **@lingui/vite-plugin**: מקמפל קטלוגי `.po` בעת ייבוא, כך שאין צורך ב-`lingui compile`.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: ממירים את המאקרואים בזמן build.

</Step>
<Step number={2} title="ריכוז הגדרות השפה">

שפת ברירת המחדל נשארת ללא קידומת (`/about`), ושפות אחרות מקבלות קידומת (`/fr/about`).

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
<Step number={3} title="הגדרת Lingui">

קובץ התצורה של Lingui משתמש באותה רשימת שפות, כך שהקטלוגים, הנתב וה-sitemap מתואמים תמיד.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

הוסיפו את סקריפטי החילוץ:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

הפקודה `i18n:check` תיכשל ב-CI אם קומפוננטה מכילה הודעה שטרם חולצה ונשמרה ב-Git.

</Step>
<Step number={4} title="הגדרת Vite">

עם `@vitejs/plugin-react` בגרסה 6, תמיכת Babel אינה מובנית עוד. התוסף `@rolldown/plugin-babel` מריץ את תוסף המאקרו של Lingui, וההגדרה `linguiTransformerBabelPreset` מעבדת אך ורק קבצים המייבאים מאקרו, מה ששומר על מהירות בנייה גבוהה.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="טעינת קטלוגים לפי שפה">

שימוש בתבנית מחרוזת בתוך `import()` מאפשר ל-Vite לפלוט **chunk נפרד לכל קטלוג**, ותוסף Lingui מקמפל את קובץ ה-`.po` לתוכו. משתמש בצרפתית מוריד את הקטלוג הצרפתי בלבד.

ההודעות המקומפלות הן נתונים פשוטים, ולכן loader של נתיב יכול להחזיר אותן, לבצע עבורן serialization ל-HTML, ולהשתמש בהן מחדש ב-hydration.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * טוען את הקטלוג המקומפל של שפה אחת (chunk אחד לכל שפה).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * יוצר מופע I18n מבודד: בטוח לבקשות SSR מקבילות.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * טוען קטלוג ומחזיר מופע מוכן לשימוש עבור loaders ופונקציות שרת.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

כדי ש-TypeScript יקבל את ייבוא ה-`.po`, הצהירו על המודול פעם אחת:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="יצירת מסמך השורש">

נתיב השורש קורא את פרמטר השפה האופציונלי כדי להגדיר את `lang` ו-`dir` על תגית ה-`<html>` המרונדרת בשרת.

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

התיקייה `{-$locale}` יוצרת מקטע נתיב אופציונלי: גם `/about` וגם `/fr/about` תואמים לנתיב `/{-$locale}/about`. ה-layout דוחה קידומות לא מוכרות, טוען את קטלוג השפה הנוכחית ומספק מופע `I18n` ייעודי.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // קטלוג אינו משתנה עבור שפה נתונה
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // מופע אחד לכל שפה, לעולם אינו משותף בין בקשות שונות
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="שימוש בתרגומים בתוך הדפים שלכם">

כתבו את טקסט המקור ישירות בקומפוננטה. המאקרואים ממירים אותו למזהי הודעות בזמן build, ו-`lingui extract` מזהה אותם.

- `<Trans>` עבור תוכן JSX, כולל אלמנטים מקוננים;
- `useLingui().t` עבור מחרוזות (מאפיינים, props);
- `<Plural>` עבור צורות ריבוי ב-ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // תרגום ה-metadata ב-loader: הפונקציה head() נשארת סינכרונית
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> פעולת ה-`import()` הדינמית של קטלוג נשמרת ב-cache של מערכת המודולים, כך שקריאה ל-`loadI18n` במספר loaders אינה גורמת להורדה כפולה של הקטלוג.

</Step>
<Step number={9} title="חילוץ ותרגום ההודעות">

הריצו את פקודת החילוץ. Lingui תכתוב כל הודעה לתוך קטלוג כל שפה:

```bash
npm run i18n:extract
```

לאחר מכן תרגמו את שדה ה-`msgstr` של כל רשומה:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> כברירת מחדל, מזהי ההודעות מבוססים על hash של טקסט המקור: שינוי הטקסט באנגלית יוצר הודעה חדשה. השתמשו במזהים מפורשים (`<Trans id="about.title">About us</Trans>`) עבור טקסטים המשתנים בתדירות גבוהה.

</Step>
<Step number={10} title="בניית קומפוננטת Link מתורגמת" isOptional={true}>

כל הנתיבים נמצאים תחת `{-$locale}`, לכן קישורים חייבים לשאת את פרמטר השפה הנוכחי.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="החלפת שפת התוכן" isOptional={true}>

רנדרו את בורר השפות כ**קישורים**, כדי שמנועי חיפוש ימצאו כל גרסת שפה. שימוש ב-`to="."` שומר על העמוד הנוכחי ומחליף את פרמטר השפה בלבד. ה-loader של ה-layout טוען לאחר מכן את הקטלוג החדש.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
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
  // גרסת המאקרו מחזירה גם את מופע ה-i18n
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
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
              aria-current={locale === i18n.locale ? "page" : undefined}
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
<Step number={12} title="בינאום של נתוני Metadata" isOptional={true}>

כל גרסת שפה יכולה לקבל דירוג עצמאי, בתנאי שכל עמוד חושף `<title>` ותיאור מתורגמים, canonical עצמי, תגית `hreflang` אחת לכל שפה כולל `x-default`, שפות Open Graph, ו-JSON-LD עם `inLanguage`. ה-metadata מתורגם ב-loader (שלב 8), ופונקציית עזר זו בונה את השאר:

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
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
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

</Step>
<Step number={13} title="בינאום של ה-Sitemap ו-robots.txt" isOptional={true}>

ה-sitemap מפרט כל כתובת URL של כל שפה, כאשר כל רשומה מצהירה על כל חלופותיה באמצעות `xhtml:link`. קובץ `robots.txt` חוסם נתיבים פרטיים בכל שפה ומצביע אל ה-sitemap. הסירו את `public/robots.txt` אם נוצר כזה בפרויקט.

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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="רינדור מוקדם (Pre-render) לכל שפה" isOptional={true}>

רשמו כל נתיב מותאם שפה כדי ש-TanStack Start ירנדר מראש את כל גרסאות השפה בזמן build:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
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
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="הפניית מבקרים בפעם הראשונה וטיפול בעמודי 404" isOptional={true}>

Middleware לבקשות מפנה מבקר הנוחת ב-`/` לשפתו המועדפת (עוגייה תחילה, ולאחר מכן `Accept-Language`). קישורים עמוקים (deep links) אינם מופנים לעולם, כך שמנועי חיפוש ומשתמשים עם קישורים ישירים מקבלים תמיד בדיוק את הדף המבוקש.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
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
    if (new URL(request.url).pathname !== "/") return next();

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

עבור עמודי 404, נתיב catch-all מרנדר את ה-`notFoundComponent` המתורגם של ה-layout. סמנו אותו ב-`noindex`: ב-React 19 תגית ה-`<meta>` מועלית ישירות אל ה-`<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="שמירה על המאקרואים וצמצום זמן הריצה עם Intlayer" isOptional={true}>

מתאם התאימות [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md) מאפשר להשאיר את קוד המקור ללא שינוי: המאקרואים מתקמפלים בדיוק כבעבר, והקריאות הנוצרות ל-`i18n._()`, `useLingui()` ו-`<Trans>` מוגשות על ידי מילוני Intlayer מקומפלים. במבחן הביצועים, זמן הריצה יורד מ-**~56.7 KB ל-~9.8 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

הוסיפו את התוסף לאחר שלב המרת המאקרו, כך שהוא יוצר alias מ-`@lingui/core` ו-`@lingui/react` אל המתאם:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

הקטלוגים מסונכרנים באמצעות [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) (עבור קטלוגי JSON) או [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) (עבור קטלוגי PO). צפו בהגדרה המלאה ב[מדריך תאימות Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md), ובהשוואה מקיפה במאמר [Lingui מול @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer-lingui.md).

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [מדריך תאימות Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)
- [Lingui מול @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer-lingui.md)

</Step>
<Step number={17} title="אוטומציה של תרגומים באמצעות Intlayer" isOptional={true}>

Lingui מחלצת הודעות, אך מילוי עשרות קטלוגים באופן ידני גוזל את רוב הזמן. Intlayer היא **חינמית** ובעלת **קוד פתוח**, וכלי העבודה שלה פועלים לצד Lingui:

- **תרגום באמצעות בינה מלאכותית (AI)** תוך שימוש במפתח API ובספק לבחירתכם. ראו [מילוי אוטומטי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md) ואת ה-[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).
- **שמירה על קובצי ה-PO שלכם** כמקור האמת בעזרת [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md).
- **בדיקת תרגומים חסרים** ב-CI. ראו [בדיקת תרגומים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md).
- **ביקורת (audit) לאתר שלכם** לזיהוי תגיות `hreflang` חסרות, קישורי canonical שגויים וזליגות שפה באמצעות [פקודת scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/scan.md).

</Step>
</Steps>

## שאלות נפוצות

<FAQ>

<Question title="האם Lingui פועלת עם TanStack Start?">

כן. ל-Lingui אין אינטגרציה רשמית ייעודית ל-TanStack Start, אך תוסף ה-Vite שלה ותוסף המאקרו של Babel פועלים ללא בעיה. שתי הנקודות החשובות הן הרצת המאקרואים דרך `@rolldown/plugin-babel` (הואיל ו-Vite 8 ו-`@vitejs/plugin-react` v6 אינם כוללים עוד את Babel), ויצירת מופע `I18n` מבודד לכל שפה במקום הפעלת מופע גלובלי בזמן SSR.

</Question>
<Question title="מדוע לא להשתמש באובייקט ה-i18n הגלובלי מתוך @lingui/core?">

בשרת, תהליך יחיד מרנדר בקשות רבות בו-זמנית. קריאה ל-`i18n.activate("fr")` על אובייקט משותף עלולה להחליף את השפה של בקשה אחרת המתרנדרת במקביל באנגלית. הפונקציה `setupI18n` יוצרת מופע מבודד לכל שפה, דבר המבטיח בטיחות מלאה.

</Question>
<Question title="האם יש צורך להריץ lingui compile?">

לא. התוסף `@lingui/vite-plugin` מקמפל קטלוגי `.po` בעת ייבואם. אתם צריכים להריץ רק את `lingui extract` כדי לאסוף הודעות חדשות.

</Question>
<Question title="כיצד מתרגמים את כותרת העמוד ותיאור ה-meta עם Lingui?">

מגדירים אותם באמצעות המאקרו `msg`, ומתרגמים אותם ב-loader של הנתיב באמצעות ``i18n._(msg`...`)``. ה-loader מחזיר מחרוזות פשוטות, כך ש-`head()` נשארת סינכרונית והערכים עוברים serialization לקראת hydration. שלב 8 ושלב 12 מציגים את ההגדרה המלאה.

</Question>
<Question title="מהו גודל ה-bundle של Lingui ב-TanStack Start?">

ה-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md) מודד כ-56.7 KB gzip עבור זמן הריצה. עם קטלוג אחד לכל שפה הנטען לפי דרישה, דפים שוקלים כ-115 KB לעומת 111 KB ללא i18n. ייבוא סטטי של כל הקטלוגים יחד יעלה את המשקל לכ-152 KB.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

</Question>
<Question title="האם ניתן לשמור על המאקרואים של Lingui ולהגר ל-Intlayer?">

כן. המתאם [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md) שומר על המאקרואים ומחליף את זמן הריצה. לאחר מכן ניתן להעביר קומפוננטות ל-`useIntlayer` באופן הדרגתי. ראו את [מתאמי התאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>

</FAQ>
