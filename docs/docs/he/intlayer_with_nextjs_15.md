---
createdAt: 2025-10-25
updatedAt: 2026-11-03
priority: 9
title: "Next.js 15 i18n, מדריך מלא לתרגום האפליקציה שלכם"
description: "הגדירו את Intlayer ב-Next.js 15 App Router: middleware לניתוב שפות, params אסינכרוניים, Server ו-Client Components, ומטא-דאטה ו-sitemap מקומיים."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
applicationShowcase: https://next-15-intlayer-template-xt83.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "עדכון לארכיטקטורת Next.js >= 9.4.0"
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "הוספת אזכור של `x-default` באובייקט `alternates`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "הוספת אזכור של הפונקציה `withIntlayerSync()`"
  - version: 6.2.0
    date: 2025-10-09
    changes: "הוספת תיעוד עבור Hook ה-`useLocale` עם האפשרות `onLocaleChange`"
  - version: 5.6.6
    date: 2025-10-02
    changes: "הוספת תיעוד עבור הפונקציה `getLocale` ב-Server Actions"
  - version: 5.6.2
    date: 2025-09-23
    changes: "הוספת תיעוד למעקב אחר שינויים במילונים ב-Turbopack"
  - version: 5.6.2
    date: 2025-09-22
    changes: "הוספת תיעוד עבור ה-helper בשם `multipleMiddlewares`"
  - version: 5.6.0
    date: 2025-07-06
    changes: "המרת הפונקציה `withIntlayer()` לפונקציה מבוססת Promise"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגמו את אתר ה-Next.js 15 שלכם באמצעות Intlayer

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `next-intl` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא של Next.js">

Intlayer מותאם לעבודה עם **Server Components** לרינדור יעיל ותואם באופן מלא ל-[**Turbopack**](https://nextjs.org/docs/architecture/turbopack). הוא אינו חוסם רינדור סטטי ומציע middleware לצד כל התכונות הנדרשות לבינאום (i18n) בהיקף נרחב.

> Intlayer תואם ל-Next.js 12, 13, 14, 15 ו-16. אם אתם משתמשים ב-Next.js Pages Router, תוכלו לעיין ב[מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_page_router.md).
> ניתוב לפי שפה (Locale routing) שימושי עבור SEO, גודל ה-bundle וביצועים. אם אינכם זקוקים לו, תוכלו לעיין ב[מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md).
> עבור Next.js 12, 13, 14 ו-15 עם App Router, עיינו ב[מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_14.md).

- [Next.js Pages Router i18n: מדריך תרגום מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_page_router.md)
- [מדריך](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md)
- [Next.js 14 i18n, מדריך מלא לתרגום האפליקציה שלכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_14.md)

</Accordion>
<Accordion header="גודל ה-Bundle">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו אך ורק את התוכן הנחוץ. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

הגדרת היקף (scoping) התוכן של האפליקציה שלכם **מפשטת את התחזוקה** של אפליקציות בקנה מידה גדול. תוכלו לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המחשבתי של סקירת כל בסיס קוד התוכן שלכם. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכן AI">

הצמדת התוכן (co-location) **מפחיתה את ההקשר (context) הדרוש** למודלי שפה גדולים (LLMs). בנוסף, Intlayer מגיע עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)** ו-**[כישורי סוכן (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה כדי לתרגם בצינור ה-CI/CD שלכם באמצעות ה-LLM לבחירתכם, בעלות ספק ה-AI שלכם. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול להוביל לבעיות ביצועים ותגובתיות. Intlayer ממטב את טעינת התוכן שלכם בזמן הבנייה (build time).

</Accordion>
<Accordion header="הרחבת היקף העבודה עם צוותים שאינם מפתחים">

יותר מסתם פתרון i18n,‏ Intlayer מספק **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באחסון עצמי (self-hosted)** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** כדי לעזור לכם לנהל את התוכן הרב-לשוני שלכם **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק ופשוט. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Next.js

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-15-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - כיצד לבצע בינאום באפליקציה שלכם באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://next-15-intlayer-template-xt83.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-15-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית האפליקציה (Application Template)](https://github.com/aymericzip/intlayer-next-15-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות באמצעות npm:

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

> הדגל `--interactive` הוא אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכן AI.

> פקודה זו תזהה את הסביבה שלכם ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

- **next-intlayer**

  החבילה המשלבת את Intlayer עם Next.js. היא מספקת context providers ו-hooks עבור בינאום ב-Next.js. בנוסף, היא כוללת את הפלאגין של Next.js לשילוב Intlayer עם [Webpack](https://webpack.js.org/) או [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), כמו גם middleware לזיהוי השפה המועדפת על המשתמש, ניהול עוגיות וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

להלן המבנה הסופי שניצור:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout עבור ה-provider של Intlayer
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout עבור עיצוב ו-providers גלובליים
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> אם אינכם מעוניינים בניתוב לפי שפה (locale routing), ניתן להשתמש ב-Intlayer כ-provider / hook פשוט. ראו [מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md) לפרטים נוספים.

- [מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md)

צרו קובץ תצורה כדי להגדיר את השפות של האפליקציה שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // השפות הנוספות שלכם
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> באמצעות קובץ תצורה זה, תוכלו להגדיר כתובות URL מקומיות, הפניות middleware, שמות עוגיות, את המיקום והסיומת של הצהרות התוכן שלכם, לבטל יומני רישום של Intlayer במסוף ועוד. לרשימה מלאה של הפרמטרים הזמינים, עיינו ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בהגדרות Next.js">

הגדירו את תצורת Next.js שלכם לשימוש ב-Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* אפשרויות תצורה כאן */};

export default withIntlayer(nextConfig);
```

> הפלאגין של Next.js בשם `withIntlayer()` משמש לשילוב Intlayer ב-Next.js. הוא מבטיח את בניית קובצי הצהרת התוכן ומנטר אותם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך סביבות [Webpack](https://webpack.js.org/) או [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). בנוסף, הוא מספק כינויים (aliases) למיטוב ביצועים ומבטיח תאימות ל-Server Components.

> הפונקציה `withIntlayer()` היא פונקציה מבוססת Promise. היא מאפשרת להכין את מילוני Intlayer לפני תחילת הבנייה. אם ברצונכם להשתמש בה לצד פלאגינים אחרים, תוכלו להמתין לה באמצעות await. דוגמה:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> אם ברצונכם להשתמש בה באופן סינכרוני, תוכלו להשתמש בפונקציה `withIntlayerSync()`. דוגמה:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>
<Step number={4} title="הגדרת נתיבי שפה דינמיים">

הסירו את כל התוכן מ-`RootLayout` והחליפו אותו בקוד הבא:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // עדיין תוכלו לעטוף את הילדים עם ספקים אחרים, כגון `next-themes`, `react-query`, `framer-motion` וכו'.
  <>{children}</>
);

export default RootLayout;
```

> השארת רכיב ה-`RootLayout` ריק מאפשרת להגדיר את המאפיינים [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) ו-[`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) בתגית ה-`<html>`.

כדי ליישם ניתוב דינמי, ספקו את הנתיב עבור השפה על ידי הוספת layout חדש בתוך תיקיית `[locale]`:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> רכיב `IntlayerProvider` יחיד מכסה את שני חלקי העץ: הוא מזין את ה-context השרתי ברמת הבקשה הנקרא על ידי ה-hooks בשרת, ומרכיב את ה-client provider כך שרכיבי הלקוח יקבלו את אותה השפה.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> מקטע הנתיב `[locale]` משמש להגדרת השפה. דוגמה: `/en-US/about` יתייחס ל-`en-US` ו-`/fr/about` ל-`fr`.

> בשלב זה, תיתקלו בשגיאה: `Error: Missing <html> and <body> tags in the root layout.`. דבר זה צפוי מכיוון שהקובץ `/app/page.tsx` אינו בשימוש עוד וניתן להסירו. במקומו, מקטע הנתיב `[locale]` יפעיל את הדף `/app/[locale]/page.tsx`. כתוצאה מכך, הדפים יהיו נגישים דרך נתיבים כמו `/en`, `/fr`, `/es` בדפדפן שלכם. כדי להגדיר את שפת ברירת המחדל כדף השורש, עיינו בהגדרת ה-`middleware` בשלב 7.

לאחר מכן, יישמו את הפונקציה `generateStaticParams` ב-Layout של האפליקציה שלכם.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // שורה להוספה

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... שאר הקוד*/
};

export default LocaleLayout;
```

> `generateStaticParams` מבטיח שהאפליקציה שלכם תבנה מראש את הדפים הנדרשים עבור כל השפות, ובכך תפחית את זמן החישוב בזמן ריצה ותשפר את חוויית המשתמש. לפרטים נוספים, עיינו ב[תיעוד של Next.js לגבי generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer פועל עם `export const dynamic = 'force-static';` כדי להבטיח שהדפים ייבנו מראש עבור כל השפות.

</Step>
<Step number={5} title="הצהרת התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        he: "התחילו על ידי עריכת",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "he": "התחילו על ידי עריכת",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה שלכם, כל עוד הן נכללות בתיקייה `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

</Step>
<Step number={6} title="שימוש בתוכן בקוד שלכם">

גשו למילוני התוכן שלכם בכל רחבי האפליקציה:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />

    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** מורכב פעם אחת, ב-locale layout. הוא מספק את השפה הן ל-Server Components והן ל-Client Components, כך שדפים אינם צריכים לעטוף את עצמם יותר.
- ה-hooks בשרת פותרים את השפה בסדר הבא: השפה המועברת באתר הקריאה, לאחר מכן ה-context השרתי שהוזן על ידי ה-provider, ולבסוף השפה הנישאת על ידי הבקשה (הכותרת `x-intlayer-locale` המוגדרת על ידי ה-proxy של Intlayer, ולאחר מכן עוגיית השפה). שלב אחרון זה שומר על נכונות התוכן בניווט בצד הלקוח המרנדר מחדש רק את מקטע הדף, שבו ה-layout (ויחד איתו ה-provider) אינו רץ מחדש.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** משמש לספק את השפה לרכיבי צד לקוח. ניתן למקם אותו בכל רכיב אב, כולל ב-layout. עם זאת, מיקומו ב-layout מומלץ מכיוון ש-Next.js משתפת קוד layout בין דפים, מה שהופך את הפעולה ליעילה יותר. באמצעות שימוש ב-`IntlayerClientProvider` ב-layout, אתם נמנעים מאתחול מחדש שלו עבור כל דף, משפרים ביצועים ושומרים על הקשר לוקליזציה עקבי בכל האפליקציה שלכם.
- **`IntlayerServerProvider`** משמש לספק את השפה לילדים בשרת. לא ניתן להגדיר אותו ב-layout.

  > layout ו-page אינם יכולים לחלוק context שרתי משותף מכיוון שמערכת ה-context של השרת מבוססת על מאגר נתונים פר-בקשה (באמצעות מנגנון [ה-cache של React](https://react.dev/reference/react/cache)), מה שגורם לכל "context" להיווצר מחדש עבור מקטעים שונים באפליקציה. מיקום ה-provider ב-layout משותף ישבור בידוד זה וימנע העברה תקינה של ערכי ה-context השרתי לרכיבי השרת שלכם.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // צרו הצהרת תוכן מתאימה

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // צרו הצהרת תוכן מתאימה

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` הוא נתיב הייבוא האיזומורפי: תנאי הייצוא `react-server` מעניק ל-Server Components את מימוש השפה הסביבתית (ambient-locale), בעוד ש-Client Components מקבלים את המימוש המגובה ב-context. אותה הקריאה פועלת בשני הצדדים.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // צרו הצהרת תוכן מתאימה

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> אם ברצונכם להשתמש בתוכן שלכם במאפיין מסוג `string`, כגון `alt`, `title`, `href`, `aria-label` וכו', תוכלו להשתמש בערך הפונקציה כך:

> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> למידע נוסף על Hook ה-`useIntlayer`, עיינו ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useIntlayer.md).

- [תיעוד Hook ה-useIntlayer | next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useIntlayer.md)

</Step>
<Step number={7} title="הגדרת Middleware לזיהוי שפה" isOptional={true}>

הגדירו middleware לזיהוי השפה המועדפת על המשתמש:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> ה-`intlayerMiddleware` משמש לזיהוי השפה המועדפת על המשתמש והפנייתו לכתובת ה-URL המתאימה כפי שהוגדר ב[תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md). בנוסף, הוא מאפשר לשמור את השפה המועדפת של המשתמש בעוגייה.

- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

> החל מגרסה 9 של Intlayer, ה-middleware מכבד את האפשרות `routing.enableProxy` (`true` כברירת מחדל). הגדירו `routing.enableProxy: false` בתצורה שלכם כדי להפוך אותו למעביר ישיר (pass-through) מבלי להסיר קובץ זה. ראו את [הערות השחרור של v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md).

- [הערות השחרור של v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md)

> התאימו את הפרמטר `matcher` כך שיתאים לנתיבי האפליקציה שלכם. לפרטים נוספים, עיינו ב[תיעוד של Next.js לגבי הגדרת ה-matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

> אם עליכם לשרשר מספר רכיבי middleware יחד (למשל, `intlayerMiddleware` עם אימות או middleware מותאם אישית), Intlayer מספק כעת כלי עזר בשם `multipleMiddlewares`.

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

</Step>
<Step number={8} title="בינאום המטא-דאטה שלכם" isOptional={true}>

במקרה שבו ברצונכם לבצע בינאום למטא-דאטה שלכם, כגון כותרת הדף, תוכלו להשתמש בפונקציה `generateMetadata` המסופקת על ידי Next.js. בתוכה, תוכלו לשלוף את התוכן באמצעות הפונקציה `getIntlayer` כדי לתרגם את המטא-דאטה.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      he: "יצירת אפליקציית Next",
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      he: "נוצר על ידי create next app",
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "he": "לוגו Preact",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "he": "נוצר על ידי create next app",
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
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
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... שאר הקוד
````

> שימו לב כי הפונקציה `getIntlayer` המיובאת מ-`next-intlayer` מחזירה את התוכן עטוף ב-`IntlayerNode`, מה שמאפשר אינטגרציה עם העורך הויזואלי. לעומת זאת, הפונקציה `getIntlayer` המיובאת מ-`intlayer` מחזירה את התוכן ישירות ללא מאפיינים נוספים.

> למידע נוסף אודות אופטימיזציית מטא-דאטה, [עיינו בתיעוד הרשמי של Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>
<Step number={9} title="בינאום ה-sitemap.xml ו-robots.txt שלכם" isOptional={true}>

כדי לבצע בינאום עבור `sitemap.xml` ו-`robots.txt`, תוכלו להשתמש בפונקציה `getMultilingualUrls` המסופקת על ידי Intlayer. פונקציה זו מאפשרת ליצור כתובות URL רב-לשוניות עבור מפת האתר שלכם.

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> למידע נוסף אודות אופטימיזציית מפת אתר (sitemap), [עיינו בתיעוד הרשמי של Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). למידע נוסף אודות אופטימיזציית robots.txt, [עיינו בתיעוד הרשמי של Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>
<Step number={10} title="שינוי שפת התוכן שלכם" isOptional={true}>

כדי לשנות את שפת התוכן שלכם ב-Next.js, הדרך המומלצת היא להשתמש ברכיב `Link` כדי להפנות משתמשים לדף המקומי המתאים. רכיב `Link` מאפשר prefetching של הדף, מה שמסייע למנוע טעינה מלאה מחדש של הדף.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // יבטיח שכפתור החזרה בדפדפן יפנה לדף הקודם
          >
            <span>
              {/* קוד שפה, למשל FR */}
              {localeItem}
            </span>
            <span>
              {/* שם השפה בשפה שלה, למשל Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* שם השפה בשפה הנוכחית, למשל ספרדית כאשר השפה הנוכחית מוגדרת ל-Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* שם השפה באנגלית, למשל French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> דרך חלופית היא להשתמש בפונקציה `setLocale` המסופקת על ידי Hook ה-`useLocale`. פונקציה זו לא תאפשר ביצוע prefetch לדף. ראו את [תיעוד Hook ה-useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useLocale.md) לפרטים נוספים.

- [תיעוד Hook ה-useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useLocale.md)

> תוכלו גם להגדיר פונקציה באפשרות `onLocaleChange` כדי להפעיל פונקציה מותאמת אישית בעת שינוי השפה.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... שאר הקוד

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Change to French</button>
);
```

> הפניות לתיעוד:
>
> - [Hook ה-`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useLocale.md)
> - [הפונקציה `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocaleName.md)
> - [הפונקציה `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md)
> - [הפונקציה `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getHTMLTextDir.md)
> - [מאפיין `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [מאפיין `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [מאפיין `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [מאפיין `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

- [Hook ה-useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/next-intlayer/useLocale.md)
- [הפונקציה getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocaleName.md)
- [הפונקציה getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md)
- [הפונקציה getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="יצירת רכיב Link מקומי" isOptional={true}>

כדי להבטיח שהניווט באפליקציה שלכם יכבד את השפה הנוכחית, תוכלו ליצור רכיב `Link` מותאם אישית. רכיב זה מקדים באופן אוטומטי קישורים פנימיים עם קידומת השפה הנוכחית. לדוגמה, כאשר משתמש הדובר צרפתית לוחץ על קישור לדף "About", הוא מופנה ל-`/fr/about` במקום ל-`/about`.

התנהגות זו מועילה מכמה סיבות:

- **SEO וחוויית משתמש**: כתובות URL מקומיות עוזרות למנועי חיפוש לאנדקס נכון דפים ספציפיים לשפה ומספקות למשתמשים תוכן בשפתם המועדפת.
- **עקביות**: על ידי שימוש בקישור מקומי לאורך האפליקציה שלכם, אתם מבטיחים שהניווט יישאר בהקשר השפה הנוכחית, ומונעים מעברי שפה בלתי צפויים.
- **תחזוקתיות**: ריכוז לוגיקת הלוקליזציה ברכיב בודד מפשט את ניהול כתובות ה-URL, מה שהופך את בסיס הקוד שלכם לקל יותר לתחזוקה ולהרחבה ככל שהאפליקציה גדלה.

להלן היישום של רכיב `Link` מקומי ב-TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * פונקציית עזר לבדיקה האם כתובת URL נתונה היא חיצונית.
 * אם ה-URL מתחיל ב-http:// או https://, הוא נחשב חיצוני.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * רכיב Link מותאם אישית המתאים את המאפיין href לפי השפה הנוכחית.
 * עבור קישורים פנימיים, הוא משתמש ב-`getLocalizedUrl` כדי להוסיף קידומת שפה ל-URL (למשל, /fr/about).
 * דבר זה מבטיח שהניווט יישאר בתוך אותו הקשר שפה.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // אם הקישור הוא פנימי ומסופק href תקין, קבל את ה-URL המקומי.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

### כיצד זה עובד

- **זיהוי קישורים חיצוניים**:  
  פונקציית העזר `checkIsExternalLink` קובעת האם כתובת ה-URL היא חיצונית. קישורים חיצוניים נותרים ללא שינוי מכיוון שהם אינם זקוקים ללוקליזציה.

- **אחזור השפה הנוכחית**:  
  Hook ה-`useLocale` מספק את השפה הנוכחית (למשל, `fr` עבור צרפתית).

- **לוקליזציה של ה-URL**:  
  עבור קישורים פנימיים (שאינם חיצוניים), נעשה שימוש ב-`getLocalizedUrl` כדי להוסיף באופן אוטומטי קידומת שפה ל-URL. משמעות הדבר היא שאם המשתמש שלכם גולש בצרפתית, העברת `/about` כ-`href` תהפוך אותו ל-`/fr/about`.

- **החזרת הקישור**:  
  הרכיב מחזיר אלמנט `<a>` עם ה-URL המקומי, מה שמבטיח שהניווט יהיה עקבי עם השפה.

על ידי שילוב רכיב `Link` זה ברחבי האפליקציה שלכם, אתם שומרים על חוויית משתמש קוהרנטית ומודעת שפה, תוך הפקת תועלת משיפור ב-SEO ובשימושיות.

</Step>
<Step number={12} title="קבלת השפה הנוכחית ב-Server Actions" isOptional={true}>

אם אתם זקוקים לשפה הפעילה בתוך Server Action (למשל, כדי לתרגם הודעות דוא"ל או להריץ לוגיקה מודעת שפה), קראו ל-`getLocale` מ-`next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // בצעו פעולה כלשהי עם השפה
};
```

> הפונקציה `getLocale` פועלת לפי אסטרטגיה מדורגת לקביעת שפת המשתמש:
>
> 1. ראשית, היא בודקת את כותרות הבקשה (headers) עבור ערך שפה שאולי הוגדר על ידי ה-middleware
> 2. אם לא נמצאה שפה בכותרות, היא מחפשת שפה השמורה בעוגיות
> 3. אם לא נמצאה עוגייה, היא מנסה לזהות את השפה המועדפת על המשתמש מהגדרות הדפדפן שלו
> 4. כמוצא אחרון, היא חוזרת לשפת ברירת המחדל שהוגדרה באפליקציה
>
> דבר זה מבטיח בחירה בשפה המתאימה ביותר בהתבסס על ההקשר הזמין.

</Step>
<Step number={13} title="אופטימיזציה של גודל ה-Bundle" isOptional={true}>

בעת שימוש ב-`next-intlayer`, מילונים נכללים ב-bundle עבור כל דף כברירת מחדל. כדי למטב את גודל ה-bundle,‏ Intlayer מספק פלאגין SWC אופציונלי המחליף בתבונה קריאות `useIntlayer` באמצעות פקודות מאקרו. הדבר מבטיח שהמילונים ייכללו ב-bundles רק עבור דפים שבאמת משתמשים בהם.

כדי להפעיל אופטימיזציה זו, התקינו את החבילה `@intlayer/swc`. לאחר ההתקנה, `next-intlayer` יזהה וישתמש בפלאגין באופן אוטומטי:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> הערה: אופטימיזציה זו זמינה רק עבור Next.js 13 ומעלה.

> הערה: חבילה זו אינה מותקנת כברירת מחדל מכיוון שפלאגיני SWC עדיין נחשבים ניסיוניים ב-Next.js. הדבר עשוי להשתנות בעתיד.

> הערה: אם תגדירו את האפשרות כ-`importMode: 'dynamic'` או `importMode: 'fetch'` (בתצורת `dictionary`), היא תסתמך על Suspense, כך שתצטרכו לעטוף את קריאות ה-`useIntlayer` שלכם בגבול `Suspense`. משמעות הדבר היא שלא תוכלו להשתמש ב-`useIntlayer` ישירות ברמה העליונה של רכיב הדף / ה-Layout שלכם.

</Step>

</Steps>

### הגדרת TypeScript

Intlayer עושה שימוש ב-module augmentation כדי להפיק תועלת מ-TypeScript ולהפוך את בסיס הקוד שלכם לחזק יותר.

![השלמה אוטומטית](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![שגיאת תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

ודאו שתצורת ה-TypeScript שלכם כוללת את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  // ... תצורות ה-TypeScript הקיימות שלכם
  "include": [
    // ... תצורות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. הדבר מאפשר לכם להימנע מהעלאתם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלכם:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

### הרחבה ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **הרחבת VS Code הרשמית של Intlayer**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון פשוטים של תרגומים.

לפרטים נוספים על אופן השימוש בהרחבה, עיינו ב[תיעוד של הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md).

- [תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)

### להעמיק עוד

כדי להעמיק עוד, תוכלו ליישם את ה[עורך הויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Next.js 15?">

השדה `i18n` ב-`next.config.js` אינו חל על ה-App Router, ולכן שכבת הלוקליזציה היא תמיד בחירה בספרייה:

- **`next-intl`**, **`next-i18next` / `i18next`** ו-**`react-intl`**: האפשרויות ההיסטוריות, המבוססות על קטלוגי הודעות JSON או ICU הנטענים לפי namespace.
- **`Lingui`**: מונחה חילוץ (extraction driven), עם הודעות ICU המהודרות בזמן בנייה.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)), מהודר בזמן בנייה למילונים נפרדים לכל רכיב, בעל טיפוסיות מלאה, עם תרגום מבוסס AI, עורך ויזואלי ו-CMS כלולים.

ההבדל המעשי הוא מה שמגיע לדפדפן. ספריות מבוססות namespace שולחות קטלוגי JSON שלמים לדף, בעוד ש-Intlayer שולח רק את התוכן שהרכיבים המרונדרים צורכים בפועל, מה שמפחית את גודל ה-bundle והדף בעד 50%. ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md) ואת [מבחן הביצועים של i18n ב-Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/nextjs.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)
- [מבחן ביצועים של i18n ב-Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/nextjs.md)

</Question>
<Question title="כמה נפח מוסיף בינאום (i18n) לגודל ה-bundle שלי ב-Next.js?">

הרבה פחות מהגדרה מבוססת namespace, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. Server Components פותרים את התוכן שלהם בשרת, ומהדר זמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן נחוצות מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות המקובלות, Intlayer מפחית את גודל ה-bundle והדף בעד 50%. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/nextjs.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/nextjs.md)

</Question>
<Question title="האם ניתן להגר מ-next-intl,‏ next-i18next או i18next מבלי לכתוב מחדש את הרכיבים שלי?">

כן, וישנם שני מסלולים. תוכלו להגר את התוכן בהדרגה בעזרת [מדריך ההגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md) או [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הנוכחי שלכם במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md) חושפים בדיוק את אותו ה-API כמו `next-intl`,‏ `react-i18next` ו-`react-intl`, אך מוגשים באמצעות מילוני Intlayer, כך שרק הייבוא משתנה וקוד הרכיב נשאר בעינו.

- [מדריך הגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md)
- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md)

</Question>
<Question title="האם ניתן לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. ה-[פלאגין לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי `/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [פלאגין לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [פלאגין לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [פלאגין לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם אני חייב להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, יחלץ את המחרוזות הפונות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לבדוק diff במקום להעתיק מחרוזות לקטלוג אחת אחת. ראו את [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

עבור צינור אוטומטי לחלוטין, ה-[מהדר של Intlayer (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) עושה את אותו הדבר בזמן בנייה על מקורות JSX, TSX, Vue ו-Svelte, ומייצר את המילונים בכל שינוי כך שאין מפתחות שצריך לתחזק ידנית. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה נשארות מחוץ להישג ידו, והוא זקוק למספר הערות כדי להבדיל בין טקסט הפונה למשתמש לבין לוגיקת האפליקציה.

- [מהדר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

</Question>
<Question title="אילו כלי עורך וסוכן AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבה ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: קפיצה ממפתח ב-`useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מקומפוננטה, והרצת build, fill, test, push ו-pull מפלטת הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), חיפוש כל ההפניות, תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שעוזר במהלך ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer עבור Cursor,‏ VS Code,‏ Claude Desktop,‏ Claude Code ו-ChatGPT, כך שעוזר יענה מתוך תיעוד עדכני במקום לנחש, ויוכל להריץ פקודות כמו `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת אחד לכל framework, המלמדים סוכן את הגדרות הניתוב שלכם ואת סוגי צמתי התוכן.
- **[פלאגין ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מוקלדות בקוד (hardcoded), עם כללים נוספים למפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="באילו גרסאות של Next.js תומך Intlayer?">

Next.js 12, 13, 14, 15 ו-16. מדריך זה עוסק ב-Next.js 15. עבור Next.js 16, עקבו אחר [מדריך Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md). עבור Next.js 14, עקבו אחר [מדריך Next.js 14](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_14.md). עבור ה-Pages Router, עקבו אחר [מדריך Pages Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_page_router.md).

- [מדריך Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md)
- [מדריך Next.js 14](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_14.md)
- [מדריך Pages Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_page_router.md)

</Question>
<Question title="האם Intlayer פועל עם React Server Components?">

כן. ב-Next.js 15 ה-`params` ב-layouts ו-pages הפכו ל-Promise, ומדריך זה מבצע להם await לפני העברת השפה ל-provider. התוכן נפתר בשרת בתוך Server Components, כך שלא נשלח שום מילון ללקוח עבור טקסט המרונדר בשרת, ו-Client Components קוראים את אותם המילונים דרך ה-provider.

</Question>
<Question title="האם אני חייב לשים את השפה ב-URL, כמו /fr/about?">

לא. `routing.mode` מקבל `"prefix-no-default"` (ברירת המחדל, `/about` עבור שפת ברירת המחדל ו-`/fr/about` עבור האחרות), `"prefix-all"`, `"no-prefix"` (נפתר מעוגייה, כותרת או דומיין) ו-`"search-params"` (`/about?locale=fr`). ההגדרה `routing.domains` ממפה כל שפה לדומיין משלה. ראו את [הפניית התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md) ואת [המדריך ללא נתיב שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md).

- [הפניית תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)
- [מדריך ללא נתיב שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md)

</Question>
<Question title="כיצד אוכל להוסיף תגיות hreflang ומטא-דאטה מותאם לשפות עבור SEO?">

שלב 8 מכסה את `generateMetadata`, ושלב 9 מכסה את `sitemap.xml` ו-`robots.txt`. הפונקציה `getMultilingualUrls` בונה את מפת `alternates.languages` עבור כל שפה מוצהרת, כולל רשומת `x-default`, כך שמנועי חיפוש יגישו את גרסת השפה הנכונה.

</Question>
<Question title="האם אני זקוק ל-middleware?">

הוא זה שמזהה את שפת המבקר ומפנה לקידומת התואמת, כך שתרצו בו אלא אם אתם מנהלים ניתוב שפות בעצמכם. שלב 7 מציג את התצורה, כולל ה-matcher שמונע התנגשות עם נתיבי API, נכסים סטטיים ו-`_next`.

</Question>
<Question title="כיצד אוכל לבנות רכיב Link מקומי?">

שלב 11 מדגים זאת. הרכיב עוטף את ה-`Link` של Next.js ומעביר את ה-href דרך `getLocalizedUrl`, כך שקישור פנימי שנכתב כ-`/about` הופך ל-`/fr/about` עבור מבקר צרפתי מבלי שתצטרכו לחזור על השפה בכל מקום קריאה.

</Question>
<Question title="כיצד אוכל לתרגם את האפליקציה באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף הנוכחי. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) ו-[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים (plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md), תנאים, [החדרות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)
- [החדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות ה-[עורך הויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md), הפועל על התשתית שלכם ומאפשר לכל אחד לערוך טקסט ישירות באפליקציה הפועלת, או באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md), המחצין את התוכן כך שניתן לשנותו ללא פריסה מחדש.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Question>
<Question title="מהי העלות של העורך הויזואלי? האם זה מכביד אם אינני זקוק לו?">

ל-[עורך הויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) יש **אפס השפעה (zero cost)** על האפליקציה שלכם אם אינו מוגדר. הלוגיקה הנוספת נטענת רק אם הופעלה ונחוצה במפורש.

- [עורך ויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)

אם הוא מופעל, ההשפעה קלה במיוחד (+5 KB, נטען דינמית רק בעת הפעלה) מכיוון שהלוגיקה הראשית מנוהלת על ידי עורך השרת ב-[app.intlayer.org](https://app.intlayer.org) או דרך חבילת `intlayer-editor`. אם אתם זקוקים להגדרת תרגום פשוטה בלבד ללא עריכה ויזואלית, Intlayer אינו מוסיף שום עומס לאפליקציה שלכם.

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המאוחסן הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)

</Question>

</FAQ>
