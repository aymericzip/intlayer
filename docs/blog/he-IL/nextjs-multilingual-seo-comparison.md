---
createdAt: 2025-09-28
updatedAt: 2026-11-03
priority: 8
title: "SEO ו-i18n ב-Next.js: Hreflang, Metadata, Sitemap"
description: למדו כיצד להגדיר SEO רב-לשוני באפליקציית Next.js שלכם באמצעות next-intl, next-i18next ו-Intlayer.
keywords:
  - Intlayer
  - SEO
  - בינאום
  - Internationalization
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - blog-seo-i18n-nextjs
author: aymericzip
---

# SEO ו-i18n ב-Next.js: תרגום בלבד אינו מספיק

כאשר מפתחים חושבים על בינאום (i18n), הרפלקס הראשון הוא לעתים קרובות: _לתרגם את התוכן_. אך לעתים קרובות שוכחים שהמטרה העיקרית של בינאום היא להפוך את האתר שלכם לגלוי יותר ברחבי העולם.
אם אפליקציית ה-Next.js הרב-לשונית שלכם אינה מנחה את מנועי החיפוש כיצד לסרוק ולהבין את גרסאות השפה השונות, רוב המאמץ שלכם עלול לרדת לטמיון.

במאמר זה נבחן **מדוע i18n הוא כוח-על עבור SEO** וכיצד ליישם אותו נכון ב-Next.js באמצעות `next-intl`, `next-i18next` ו-`Intlayer`.

## מדוע SEO ו-i18n

הוספת שפות אינה קשורה רק לחוויית משתמש (UX). זהו גם מנוף רב-עוצמה עבור **נראות אורגנית**. הנה הסיבות לכך:

1. **יכולת גילוי טובה יותר (Discoverability):** מנועי חיפוש מאנדקסים גרסאות מקומיות ומדרגים אותן עבור משתמשים המחפשים בשפת האם שלהם.
2. **מניעת תוכן משוכפל (Duplicate Content):** תגי canonical ו-alternate מתאימים מבהירים לסורקים איזה דף שייך לכל שפה (locale).
3. **חוויית משתמש משופרת:** מבקרים מגיעים מיד לגרסה הנכונה של האתר.
4. **יתרון תחרותי:** אתרים מעטים מיישמים SEO רב-לשוני בצורה מדויקת, מה שמאפשר לכם לבלוט.

## שיטות מומלצות עבור SEO רב-לשוני ב-Next.js

הנה רשימת בדיקה שכל אפליקציה רב-לשונית צריכה ליישם:

- **הגדרת תגי מטא מסוג `hreflang` ב-`<head>`**  
  מסייעת ל-Google להבין אילו גרסאות קיימות עבור כל שפה.

- **רישום כל הדפים המתורגמים ב-`sitemap.xml`**  
  השתמשו בסכמת `xhtml` כדי שסורקים יוכלו למצוא חלופות בקלות.

- **החרגת נתיבים פרטיים/מקומיים ב-`robots.txt`**  
  למשל, אל תאפשרו אינדוקס של `/dashboard`, `/fr/dashboard`, `/es/dashboard`.

- **שימוש בקישורים מקומיים (Localized Links)**  
  לדוגמה: `<a href="/fr/about">À propos</a>` במקום קישור ל-`/about` ברירת המחדל.

אלו צעדים פשוטים, אך דילוג עליהם עלול לעלות לכם בנראות במנועי החיפוש.

## דוגמאות מימוש

מפתחים לעתים קרובות שוכחים לקשר כראוי בין הדפים שלהם בשפות השונות, לכן נבחן כיצד הדבר עובד בפועל בספריות שונות.

<Tabs>
  <Tab label="next-intl" value="next-intl">

### **next-intl**

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
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

// ... Rest of the page code
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

  </Tab>
  <Tab label="next-i18next" value="next-i18next">

### **next-i18next**

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Prefix path with locale unless it's the default locale */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Absolute URL helper */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Dynamically import the correct JSON file
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

### **Intlayer**

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Rest of the page code
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer מספקת את הפונקציה `getMultilingualUrls` כדי לייצר כתובות URL רב-לשוניות עבור ה-sitemap שלכם.

  </Tab>
</Tabs>

## בדקו את האתר שלכם באמצעות Intlayer SEO Scanner

כדי לוודא שהאפליקציה הרב-לשונית שלכם מותאמת באופן מושלם, אנו ממליצים להשתמש ב-[Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner). זהו כלי ייעודי לבדיקת אתרים רב-לשוניים, המסייע לזהות תגי hreflang חסרים, קישורים שבורים ובעיות SEO נוספות בכל הדפים המקומיים שלכם.

## סיכום

הטמעה נכונה של i18n ב-Next.js אינה מסתכמת בתרגום טקסט בלבד, אלא דורשת להבטיח שמנועי חיפוש ומשתמשים יידעו בדיוק איזו גרסה של התוכן יש להציג.
הגדרת hreflang, מפות אתר (sitemaps) וכללי robots היא זו שהופכת תרגומים לערך SEO אמיתי.

בעוד ש-next-intl ו-next-i18next מציעות דרכים טובות לחבר את החלקים הללו, הן דורשות לרוב הגדרה ידנית רבה כדי לשמור על עקביות בין השפות השונות.

כאן בדיוק Intlayer בולטת:

היא מגיעה עם כלי עזר מובנים כגון `getMultilingualUrls`, ההופכים אינטגרציה של hreflang, sitemap ו-robots לפשוטה וכמעט ללא מאמץ.

המטא-דאטה (metadata) נשארת מרוכזת במקום להיות מפוזרת בין קובצי JSON שונים או פונקציות עזר מותאמות אישית.

היא תוכננה מראש במיוחד עבור Next.js, כך שאתם מבזבזים פחות זמן על ניפוי שגיאות בהגדרות ויותר זמן על פיתוח ושחרור תכונות.

אם המטרה שלכם היא לא רק לתרגם אלא להרחיב SEO רב-לשוני בצורה חלקה ויעילה, Intlayer מספקת את הפתרון הנקי והעמיד ביותר לעתיד.

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)
