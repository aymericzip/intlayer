---
createdAt: 2026-09-26
updatedAt: 2026-11-03
priority: 9
title: "Next.js 16 i18n עם Lingui: מדריך הגדרת App Router"
description: "הגדירו את Lingui ב-Next.js 16 App Router: קומפוננטות שרת, מאקרואים של SWC, ניתוב שפות בעזרת proxy, metadata, hreflang, sitemap ו-robots.txt, כולל נתוני ביצועים (benchmark)."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - בינאום
  - i18n
  - SEO
  - בלוג
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "גרסה ראשונית"
author: aymericzip
---

# כיצד לבצע בינאום לאפליקציית Next.js באמצעות Lingui בשנת 2026

## תוכן עניינים

<TOC/>

## מה זה Lingui?

**Lingui** היא ספריית i18n הבנויה סביב **מאקרואים (macros)** ו**חילוץ הודעות (message extraction)**. אתם כותבים את טקסט המקור ישירות בתוך הקומפוננטות שלכם (`` t`Hello` ``, `<Trans>Hello</Trans>`), הפקודה `lingui extract` אוספת כל הודעה לקטלוגים (קובצי PO כברירת מחדל), ומטעין (loader) מקמפל אותם ל-JavaScript קומפקטי. ההודעות משתמשות בפורמט ICU MessageFormat, ו-Lingui תומכת ב-**React Server Components** ב-App Router.

מדריך זה מציג הגדרה של Lingui בפרויקט **Next.js 16 App Router**, הכוללת:

- **מאקרואים המקומפלים על ידי SWC**, כך ש-Turbopack שומר על מהירותו הגבוהה.
- **קומפוננטות שרת ולקוח** החולקות את אותו ממשק של `Trans` ו-`useLingui`.
- **ניתוב שפות (Locale routing)** באמצעות `proxy.ts`: הנתיב `/about` עבור שפת ברירת המחדל, `/fr/about` עבור שפות אחרות, וזיהוי שפה בביקור הראשון.
- **רינדור סטטי (Static rendering)** של כל שפה באמצעות `generateStaticParams`.
- **SEO רב-לשוני מלא**: `generateMetadata` מתורגם, קישורי canonical, תגיות `hreflang` עם `x-default`, שפות Open Graph, נתוני JSON-LD, קובצי `sitemap.ts`, `robots.ts` ועמודי 404 מתורגמים.

> מחפשים ספרייה אחרת?

- [מדריך next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-intl.md)
- [מדריך next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-i18next.md)
- [מדריך Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

> משתמשים ב-TanStack Start?

- [מדריך TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_tanstack-start_lingui.md)

> משווים בין ספריות?

- [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md)
- [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## מה מראה ה-Benchmark על Lingui ב-Next.js

ה-[i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md) מריץ אפליקציית Next.js זהה בת 10 עמודים ו-10 שפות עם כל ספרייה מובילה ומודד מה הדפדפן מוריד בפועל.

- [i18n benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

נתונים מרכזיים עבור `@lingui/core@6.6.0` ב-Next.js 16, שנמדדו ב-2026-09-26 (gzip):

| הגדרה                            | גודל ספרייה | JS לכל עמוד | זליגת שפות אחרות | זליגת עמודים אחרים |
| :------------------------------- | ----------: | ----------: | ---------------: | -----------------: |
| ללא i18n (אפליקציית בסיס)        |           - |    141.0 KB |               0% |                 0% |
| Lingui (התצורה במדריך זה)        |     72.1 KB |    145.4 KB |             2.8% |              89.9% |
| `@intlayer/lingui` (compat)      |     10.7 KB |    221.6 KB |              50% |                90% |
| `next-intlayer` (Intlayer מקורי) |      4.9 KB |    141.5 KB |               0% |                 0% |

מסקנות עיקריות:

- **קטלוג אחד לכל שפה עדיין מדליף הודעות של עמודים אחרים** ל-provider של הלקוח. שמרו כמה שיותר טקסט בקומפוננטות שרת, ששולחות HTML מרונדר ולא קטלוגים.
- **זמן הריצה של Lingui שוקל כ-72 KB gzip.** מתאם ה-compat של `@intlayer/lingui` מקצץ את זמן הריצה ל-~11 KB, אך במבחן ביצועים זה תצורת ה-Next.js compat עדיין שולחת קטלוגים שלמים לדף. ה-API המקורי של `next-intlayer` הוא התצורה שנשארת בגודל אפליקציית הבסיס.

> צפו בנתונים המלאים: [דוח ביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md), וב-[מאגר ה-benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [דוח ביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

## השוואת תכונות ב-Next.js

כיצד Lingui משתווה ל-`next-intl` ול-Intlayer בתכונות שפרויקט Next.js App Router זקוק להן בדרך כלל:

| תכונה                                    | `next-intlayer` (Intlayer)                       | Lingui                                        | `next-intl`                                |
| ---------------------------------------- | ------------------------------------------------ | --------------------------------------------- | ------------------------------------------ |
| **תרגומים לצד קומפוננטות**               | ✅ תוכן ממוקם לצד כל קומפוננטה                   | ⚠️ טקסט מקור בקומפוננטות, קטלוגים מרוכזים     | ❌ JSON מרוכז                              |
| **אינטגרציה עם TypeScript**              | ✅ טיפוסים קפדניים שנוצרים אוטומטית              | ⚠️ מאקרואים מוקלדים, קטלוגי הודעות לא         | ✅ טובה, דרך הרחבת `AppConfig`             |
| **זיהוי תרגומים חסרים**                  | ✅ שגיאות TypeScript ואזהרות בזמן build          | ⚠️ נפילה בזמן ריצה לטקסט המקור                | ⚠️ Fallback בזמן ריצה                      |
| **תוכן עשיר (JSX, Markdown)**            | ✅ תמיכה ישירה                                   | ✅ JSX בתוך `<Trans>`, ללא Markdown           | ⚠️ תגיות דרך `t.rich`, ללא Markdown        |
| **תרגום באמצעות בינה מלאכותית (AI)**     | ✅ ספק ומפתח API משלכם, עם הקשר האפליקציה        | ❌ ללא                                        | ❌ ללא                                     |
| **עורך ויזואלי / CMS**                   | ✅ עורך ויזואלי מקומי + CMS אופציונלי            | ❌ דרך פלטפורמות חיצוניות                     | ❌ דרך פלטפורמות חיצוניות                  |
| **ניתוב מתורגם (Localized routing)**     | ✅ מובנה                                         | ❌ כתיבת `proxy.ts` עצמאי                     | ✅ מקטע `[locale]` מובנה                   |
| **צורות ריבוי (Pluralization)**          | ✅ מבוסס Enumeration                             | ✅ ICU, מאקרו `<Plural>`                      | ✅ ICU                                     |
| **פורמטים של תוכן**                      | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml` | ✅ PO, JSON, CSV                              | ✅ `.json`, `.js`, `.ts`                   |
| **ICU MessageFormat**                    | ✅ דרך `format: "icu"`                           | ✅ טבעי                                       | ✅ טבעי                                    |
| **כלי עזר ל-SEO (hreflang, sitemap)**    | ✅ עזרי Metadata, sitemap ו-robots.txt           | ❌ ידני                                       | ✅ טובים                                   |
| **Server Components**                    | ✅ גישה ישירה בכל Server Component               | ⚠️ `setI18n` בכל layout ו-page                | ⚠️ `await getTranslations()` לכל קומפוננטה |
| **Tree-shaking ברמת הקומפוננטה**         | ✅ בזמן build (Babel / SWC)                      | ⚠️ קטלוג אחד לכל שפה, חולץ לפי דף הוא ניסיוני | ⚠️ ידני, עם `pick()` לפי נתיב              |
| **גודל זמן ריצה (gzip, מתוך benchmark)** | 4.9 KB                                           | 72.1 KB                                       | 14.7 KB                                    |
| **בדיקת תרגומים חסרים ב-CI**             | ✅ `npx intlayer test`                           | ✅ `lingui compile --strict`                  | ⚠️ אינו מובנה                              |
| **אקוסיסטם / קהילה**                     | ⚠️ קטנה יותר, צומחת במהירות                      | ✅ בוגרת                                      | ✅ גדולה                                   |

> גודלי זמן הריצה נלקחו מ-[דוח הביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md). לדיון מפורט, קראו את [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md).

- [דוח הביצועים של Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md)

> מדריכי Next.js נוספים:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

## שיטות עבודה מומלצות

- **הגדירו `lang` ו-`dir` על `<html>`** ב-layout של `[locale]`.
- **העדיפו Server Components** עבור טקסט: הן מרנדרות HTML בשרת ואינן זקוקות לקטלוג בלקוח.
- **קראו ל-`initLingui(locale)` בכל layout ודף.** layouts אינם מתרנדרים מחדש בניווט בין דפים, כך שדף אינו יכול להסתמך על כך שה-layout שלו הגדיר את השפה.
- **שמרו על כתובת URL אחת לכל שפה** ובצעו pre-render לכל שפה בעזרת `generateStaticParams`.
- **תרגמו את נתוני ה-metadata שלכם** ב-`generateMetadata`, כולל `canonical`, `hreflang` ו-`x-default`.
- **צרו sitemap ו-robots.txt רב-לשוניים** בעזרת המוסכמות של `sitemap.ts` ו-`robots.ts`.
- **השתמשו בקישורים אמיתיים עבור בורר השפות (Locale switcher)**, כדי שמנועי חיפוש יגלו כל גרסת שפה.
- **הריצו `lingui extract` ב-CI** כך שהודעה חדשה לעולם לא תגיע לייצור ללא תרגום.

- [בינאום ו-SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/internationalization_and_SEO.md)
- [מדריך hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/hreflang_guide_multilingual_seo.md)
- [השוואת SEO רב-לשוני ב-Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/nextjs-multilingual-seo-comparison.md)

## מדריך שלב אחר שלב להגדרת Lingui באפליקציית Next.js

להלן מבנה הפרויקט שנבנה:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # ניתוב וזיהוי שפות
    ├── locales
    │   ├── en
    │   │   └── messages.po         # נוצר על ידי `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # שפות, פונקציות עזר ל-URL
    │   ├── appRouterI18n.ts        # קטלוגים ומופעים לצד השרת בלבד
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # בונה generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # עמוד 404 מתורגם לנתיבים לא מוכרים
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="התקנת תלויות">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: זמן ריצה, `I18nProvider`, `setI18n` עבור Server Components, והמאקרואים (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: מקמפל את המאקרואים בתוך תהליך ה-SWC של Next.js.
- **@lingui/loader**: מקמפל קטלוגי `.po` בזמן ייבוא, כך שאין צורך בהרצת `lingui compile`.
- **@lingui/cli**: `lingui extract` לאיסוף הודעות לקטלוגים.

> `@lingui/swc-plugin` הוא תוסף WebAssembly הקשור לגרסת ה-SWC של Next.js. אם ה-build נכשל לאחר שדרוג Next.js, עדכנו את התוסף לגרסה המצוינת כתואמת ב-README שלו.

</Step>
<Step number={2} title="ריכוז הגדרות השפה">

קובץ יחיד מגדיר שפות ועזרי URL. הניתוב, ה-metadata, ה-sitemap ו-Lingui קוראים כולם ממנו.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** כתובת מקור ציבורית עבור canonical URLs, hreflang וה-sitemap. */
export const siteUrl = "https://example.com";

/** עוגייה השומרת את השפה שנבחרה במפורש על ידי המשתמש. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph מצפה לקודים במבנה `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, שפת ברירת המחדל ללא קידומת. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="הגדרת Lingui ו-Next.js">

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

תוסף ה-SWC מקמפל את המאקרואים, וה-loader מקמפל קובצי `.po`, הן עבור Turbopack (ברירת המחדל ב-Next.js 16) והן עבור webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

הוסיפו את סקריפטי החילוץ לקובץ ה-`package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="טעינת קטלוגים ויצירת מופעים בשרת">

לקומפוננטות שרת אין React context, ולכן Lingui מספקת את `setI18n` כדי לרשום את המופע עבור הרינדור הנוכחי. מודול זה טוען כל קטלוג **פעם אחת לכל תהליך שרת** ויוצר מופע `I18n` אחד לכל שפה. הוא מוגדר כ-`server-only`: קטלוגים של שפות אחרות לעולם אינם מגיעים ל-bundle של הלקוח.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * רושם את המופע עבור רינדור קומפוננטת השרת הנוכחית.
 * יש לקרוא לפונקציה זו בכל layout ודף.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

כדי ש-TypeScript יקבל את ייבוא ה-`.po`, הצהירו על המודול פעם אחת:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="יצירת ספק לקוח (Client Provider)">

קומפוננטות לקוח קוראות תרגומים מתוך React context. ה-provider מקבל את קטלוג השפה הפעילה מה-layout של השרת, ויוצר מופע משלו פעם אחת.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="הגדרת נתיבי שפה דינמיים">

המקטע `[locale]` מכיל את ה-root layout. הפונקציה `generateStaticParams` מבצעת pre-render לכל שפה בזמן build, וההגדרה `dynamicParams = false` מחזירה 404 עבור כל קידומת אחרת.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// קידומות לא מוכרות (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // פותר כתובות canonical ו-Open Graph יחסיות
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> ספק הלקוח מקבל את כל הקטלוג של השפה הפעילה. זה מה שה-benchmark מודד כ"זליגת עמודים אחרים". שמירת טקסט ב-Server Components מגבילה את מה שהלקוח באמת צריך. עבור אפליקציות גדולות, החולץ הניסיוני של Lingui לפי דף (`experimental.extractor` ב-`lingui.config.ts`) מפצל קטלוגים לפי נקודות כניסה.

</Step>
<Step number={7} title="שימוש בתרגומים בקומפוננטות שרת">

קומפוננטות שרת משתמשות באותם מאקרואים כמו קומפוננטות לקוח. יש להריץ את `initLingui` גם בתוך הדף, מאחר ש-layout אינו מתרנדר מחדש כאשר מנווטים בין הדפים שלו.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="שימוש בתרגומים בקומפוננטות לקוח">

קומפוננטות לקוח משתמשות באותם ייבואים. המאקרואים קוראים את המופע מתוך ה-`LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="חילוץ ותרגום ההודעות שלכם">

הריצו את פקודת החילוץ. Lingui כותבת כל הודעה שנמצאה ב-`src` לתוך קטלוג כל שפה:

```bash
npm run i18n:extract
```

לאחר מכן תרגמו את שדה ה-`msgstr` של כל רשומה:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> מצייני המיקום כדוגמת `<0>` שומרים על מיקום רכיבי ה-JSX של `<Trans>`, כך שמתרגמים יכולים להזיז אותם מבלי לשבור את מבנה הקוד.

</Step>
<Step number={10} title="הגדרת ה-Proxy עבור ניתוב שפות" isOptional={true}>

Next.js 16 שינתה את שמו של `middleware.ts` ל-`proxy.ts`. ה-proxy מיישם אסטרטגיית קידומת לפי צורך ("as-needed"):

- `/fr/about` מוגש כפי שהוא;
- `/en/about` מפנה ל-`/about`, כך שלשפת ברירת המחדל יש כתובת URL יחידה;
- `/about` משוכתב פנימית ל-`/en/about`, מבלי לשנות את ה-URL בדפדפן;
- ביקור ראשון ב-`/` מפנה לשפה המועדפת (עוגייה תחילה, ולאחר מכן `Accept-Language`).

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: כתובת אחת עבור שפת ברירת המחדל
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // ביקור ראשון ב-"/": העברת המבקר לשפה שלו
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → מוגש על ידי /en/about, ה-URL אינו משתנה
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // דילוג על נתיבי API, קבצים פנימיים של Next.js וקבצים (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="החלפת שפת התוכן" isOptional={true}>

ה-hook בשם `usePathname` מחזיר את ה-URL שהדפדפן רואה (`/about` או `/fr/about`). מסירים את השפה, ואז בונים את הקישור לכל שפה. הבורר מרנדר קישורים אמיתיים כדי שמנועי חיפוש יגיעו לכל גרסה, והעוגייה שומרת את הבחירה המפורשת.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="בניית קומפוננטת Link מותאמת שפה" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** נתיב ללא קידומת שפה, למשל "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

הקומפוננטה פועלת גם מתוך Server Components, מכיוון שהיא מתרנדרת בתוך `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="בינאום של נתוני Metadata" isOptional={true}>

כל גרסת שפה יכולה להתקדם בדירוג באופן עצמאי, בתנאי שכל דף חושף:

- `title` ו-`description` **מתורגמים**;
- קישור **canonical** המצביע על עצמו;
- חלופת **`hreflang` אחת לכל שפה**, בתוספת **`x-default`**;
- הגדרות **Open Graph** עבור `locale`, `alternateLocale` ו-`url`;
- תגית **JSON-LD** עם מאפיין `inLanguage`.

הפונקציה `generateMetadata` רצה מחוץ לעץ ה-React, ולכן היא משתמשת ישירות במופע השרת יחד עם המאקרו `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** נתיב ללא קידומת שפה, למשל "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... קומפוננטת העמוד משלב 7
```

נתוני JSON-LD מרונדרים על ידי העמוד עצמו. קובצי דפים רשאים לייצא רק שדות מוכרים של Next.js, לכן שמרו את הקומפוננטה בקובץ משלה:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// בתוך AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="בינאום של ה-Sitemap" isOptional={true}>

המוסכמה של `sitemap.ts` תומכת ב-`alternates.languages`, ש-Next.js מרנדרת כחלופות `xhtml:link`. רשמו כל כתובת URL של כל שפה:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="בינאום של ה-robots.txt" isOptional={true}>

נתיבים פרטיים קיימים בכל שפה, לכן הגדרת `disallow` חייבת לכסות כל נתיב מתורגם:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="טיפול בעמודי 404 מתורגמים" isOptional={true}>

הקובץ `not-found.tsx` מתרנדר בתוך ה-layout של `[locale]`, כך שיש לו גישה לספק הלקוח. נתיב ה-catch-all מפנה נתיבים לא ידועים בתוך השפה אליו. Next.js מוסיפה `noindex` לתגובות 404 באופן אוטומטי.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → not-found.tsx מתורגם
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="גישה לשפה בתוך Server Actions" isOptional={true}>

Server Actions אינן מקבלות פרמטרי נתיב ישירות. הגישה האמינה ביותר היא לשלוח את השפה יחד עם הטופס, מתוך העמוד שמכיר אותה:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="שמירה על המאקרואים וצמצום זמן הריצה עם Intlayer" isOptional={true}>

מתאם התאימות [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md) מאפשר להשאיר את קוד המקור ללא שינוי: המאקרואים מקומפלים כבעבר, והקריאות הנוצרות ל-`i18n._()`, `useLingui()` ו-`<Trans>` מוגשות על ידי מילוני Intlayer. במבחן הביצועים של Next.js, זמן הריצה יורד מ-**~72.1 KB ל-~10.7 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)

ב-Next.js, המתאם מחובר על ידי הגדרת alias מ-`@lingui/core` ו-`@lingui/react` ל-`@intlayer/lingui` ב-`next.config.ts` (עבור webpack ו-Turbopack), ועטיפת הקונפיגורציה באמצעות `withIntlayer` מתוך `next-intlayer/server`. השאירו את `@lingui/swc-plugin` כדי שהמאקרואים ימשיכו להתקמפל ראשונים. ההגדרה המלאה נמצאת ב[מדריך תאימות Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md).

- [מדריך תאימות Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)

כפי שטבלת ה-benchmark מראה, המתאם מפחית את זמן הריצה אך טרם פותר את הקטלוג הנשלח לכל דף ב-Next.js. השימוש הטוב ביותר בו הוא כגשר מעבר (migration bridge): ברגע שהוא פועל, ניתן להעביר קומפוננטות אחת אחת ל-API המקורי של `useIntlayer`, אשר שולח אך ורק את התוכן שכל קומפוננטה מרנדרת בפועל. ראו את [מדריך Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md), [Lingui מול @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer-lingui.md) ואת כל [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md).

- [מדריך Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)
- [Lingui מול @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer-lingui.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Step>
<Step number={19} title="אוטומציה של תרגומים באמצעות Intlayer" isOptional={true}>

Lingui מחלצת הודעות, אך מילוי עשרות קטלוגים באופן ידני גוזל את רוב הזמן. Intlayer היא **חינמית** ובעלת **קוד פתוח**, וכלי העבודה שלה פועלים לצד Lingui:

- **תרגום באמצעות בינה מלאכותית (AI)** תוך שימוש במפתח API ובספק לבחירתכם. ראו [מילוי אוטומטי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md) ואת ה-[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).
- **שמירה על קובצי ה-PO שלכם** כמקור האמת בעזרת [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md).
- **בדיקת תרגומים חסרים** ב-CI. ראו [בדיקת תרגומים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/testing.md).
- **ביקורת (audit) לאתר שלכם** לזיהוי תגיות `hreflang` חסרות, קישורי canonical שגויים וזליגות שפה באמצעות [פקודת scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/scan.md).

</Step>
</Steps>

## שאלות נפוצות

<FAQ>

<Question title="האם Lingui תומכת ב-Next.js App Router וב-Server Components?">

כן. החבילה `@lingui/react` תומכת ב-React Server Components. קומפוננטות שרת רושמות את המופע באמצעות `setI18n` מתוך `@lingui/react/server`, קומפוננטות לקוח קוראות אותו מתוך `I18nProvider`, ושתיהן משתמשות באותם מאקרואים של `Trans` ו-`useLingui`.

</Question>
<Question title="מדוע חובה לקרוא ל-initLingui בכל עמוד ובכל layout?">

לקומפוננטות שרת אין React context גלובלי, ולכן המופע נרשם לכל רינדור בנפרד. layouts נשמרים במהלך ניווטים ואינם מתרנדרים מחדש, כך שעמוד אינו יכול להסתמך על כך שה-layout שלו יגדיר את השפה עבורו. קריאה ל-`initLingui(locale)` בראש כל layout ודף שומרת עליהם עצמאיים.

</Question>
<Question title="האם כדאי להשתמש בתוסף ה-SWC או ב-Babel עם Next.js?">

השתמשו ב-`@lingui/swc-plugin`. הוא שומר על מהירות ה-SWC ועל Turbopack. הוספת תצורת Babel משביתה את ה-SWC ב-Next.js ומאיטה משמעותית את תהליך ה-build. הדרישה היחידה היא לוודא שגרסת התוסף תואמת לגרסת ה-SWC המותקנת ב-Next.js שלכם.

</Question>
<Question title="כיצד מתרגמים את generateMetadata עם Lingui?">

משיגים את מופע השרת בעזרת `getI18nInstance(locale)` ומתרגמים תיאורים שהוגדרו באמצעות המאקרו `msg`: ``i18n._(msg`About us`)``. מחזירים `alternates.canonical`, `alternates.languages` עם `x-default`, ואת `openGraph.locale`. שלב 13 במדריך מספק פונקציית עזר לשימוש חוזר.

</Question>
<Question title="מהו גודל ה-bundle של Lingui ב-Next.js?">

ה-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md) מודד כ-72 KB gzip עבור זמן הריצה. עם קטלוג אחד לכל שפה, עמודים שוקלים כ-145 KB לעומת 141 KB ללא בינאום, אך כל עמוד עדיין מקבל את הודעותיהם של שאר העמודים דרך ספק הלקוח.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl או next-i18next: במה כדאי לבחור עבור Next.js?">

Lingui מתאימה לצוותים שאוהבים לכתוב טקסט מקור ישירות בקומפוננטות ולעבוד עם קובצי PO ומתרגמים מקצועיים. next-intl מתאימה לצוותים המעדיפים קטלוגי JSON ו-API מבוסס `t("key")` שמשתלב בצורה הדוקה ב-Next.js. next-i18next מביאה עמה את מערך התוספים הרחב של i18next. ראו את [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md) ואת [דוח ביצועי Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md).

- [next-i18next מול next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-i18next_vs_next-intl_vs_intlayer.md)
- [דוח ביצועי Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

</Question>
<Question title="האם ניתן להגר מ-Lingui ל-Intlayer מבלי לשכתב את הקומפוננטות שלי?">

כן. המתאם [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md) משמר את המאקרואים ומחליף את זמן הריצה, כך שתוכלו לאחר מכן להעביר קומפוננטות ל-`useIntlayer` באופן הדרגתי. ראו את [מתאמי התאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/lingui.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>

</FAQ>
