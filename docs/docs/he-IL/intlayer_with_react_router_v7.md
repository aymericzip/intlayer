---
createdAt: 2025-09-04
updatedAt: 2026-11-03
priority: 10
title: "בינאום (i18n) ב-React Router v7 - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer ב-React Router v7: מקטעי נתיבים מותאמי שפה, loaders ורכיבים מתורגמים, hreflang ו-sitemap רב-לשוני."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - ניתוב שפות
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 7.5.6
    date: 2025-12-27
    changes: "עדכון Layout וטיפול בשגיאות 404"
  - version: 6.1.5
    date: 2025-10-03
    changes: "עדכון התיעוד"
  - version: 5.8.2
    date: 2025-09-04
    changes: "נוסף עבור React Router v7"
author: aymericzip
---

# תרגום אתר React Router v7 באמצעות Intlayer

מדריך זה מדגים כיצד לשלב את **Intlayer** עבור בינאום (i18n) חלק בפרויקטי React Router v7 עם ניתוב מודע לשפה, תמיכה ב-TypeScript ושיטות פיתוח מודרניות.

הוא מכסה הן **ניתוב מבוסס הגדרות** (`routes.ts`) והן **ניתוב מבוסס מערכת קבצים** (`@react-router/fs-routes`).

## תוכן עניינים

<TOC/>

## מדוע לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות המובילים כמו `react-i18next` או `i18next`,‏ Intlayer מגיעה עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור React Router">

Intlayer מותאמת לעבודה מושלמת עם React Router על ידי מתן **ניתוב מודע לשפה**, **middleware לזיהוי שפה** וכל התכונות הנדרשות להרחבת בינאום (i18n) בקנה מידה רחב.

</Accordion>
<Accordion header="גודל ה-Bundle">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנחוץ. Intlayer מסייעת **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

הגדרת תחום התוכן ברמת הרכיב **מפשטת את התחזוקה** באפליקציות גדולות. ניתן לשכפל או למחוק תיקיית פיצ'ר בודדת מבלי לשאת בעומס המנטלי של סקירת כל בסיס קוד התוכן שלכם. בנוסף, Intlayer מספקת **טיפוסיות מלאה (fully typed)** כדי להבטיח את תקינות התוכן.

</Accordion>
<Accordion header="סוכני AI">

מיקום התוכן לצד הרכיבים **מצמצם את ההקשר הנדרש** עבור מודלי שפה גדולים (LLMs). Intlayer מספקת גם חבילת כלים כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית הפיתוח לחלקה עוד יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה לתרגום בצינור ה-CI/CD שלכם באמצעות ה-LLM שבחרתם, בעלות ספק ה-AI שלכם. Intlayer מציעה בנוסף **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המאפשרת **תרגום ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON גדולים לרכיבים עלול לגרום לבעיות ביצועים ותגובתיות. Intlayer מבצעת אופטימיזציה של טעינת התוכן בזמן הבנייה.

</Accordion>
<Accordion header="התרחבות בשיתוף צוותים ללא רקע בפיתוח">

מעבר להיותה פתרון i18n,‏ Intlayer מספקת **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי** ו-**[מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** המסייעים לנהל תוכן רב-לשוני ב**זמן אמת**, ומאפשרים שיתוף פעולה חלק עם מתרגמים, כותבי תוכן וחברי צוות נוספים. ניתן לאחסן תוכן באופן מקומי ו/או מרוחק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית React Router v7

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="How to translate an React Router v7 app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="קוד (מבוסס הגדרות)" value="code-config">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer (Config-based)"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="קוד (נתיבים מבוססי מערכת קבצים)" value="code-fs">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-fs-routes-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer (File-System Routes)"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו (מבוסס הגדרות)" value="demo">

<iframe
  src="https://intlayer-react-router-v7.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer React Router v7 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית ניתוב מבוסס הגדרות](https://github.com/aymericzip/intlayer-react-router-v7-template) או [תבנית נתיבים מבוססי מערכת קבצים](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות באמצעות מנהל החבילות המועדף עליכם:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **react-intlayer**

  החבילה המשלבת את Intlayer באפליקציית React. היא מספקת ספקי הקשר (context providers) ו-hooks עבור בינאום ב-React.

- **vite-intlayer**

  כוללת את תוסף Vite לשילוב Intlayer עם [הבאנדלר Vite](https://vite.dev/guide/why.html#why-bundle-for-production), וכן middleware לזיהוי השפה המועדפת על המשתמש, ניהול עוגיות וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

<Tabs group="routing-type">
<Tab label="ניתוב מבוסס הגדרות" value="config-based">

### ארכיטקטורה

בארכיטקטורה זו, הנתיבים מוגדרים תכנותית ב-`app/routes.ts` עם מקטעים דינמיים אופציונליים של `/:locale?`. דפים מתורגמים, פריסות (layouts) והצהרות תוכן מאורגנים בתוך ספריית `app/`:

```bash
.
├── app
│   ├── components
│   │   ├── locale-switcher.content.ts
│   │   ├── locale-switcher.tsx
│   │   ├── localized-link.tsx
│   │   ├── navbar.content.ts
│   │   └── navbar.tsx
│   ├── hooks
│   │   ├── useI18nHTMLAttributes.tsx
│   │   └── useLocalizedNavigate.tsx
│   ├── routes
│   │   ├── about
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── root.tsx                      # Root layout for IntlayerProvider
│   └── routes.ts                     # Route definition file
├── intlayer.config.ts
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

### הגדרות

צרו קובץ תצורה `intlayer.config.ts` כדי להצהיר על השפות הנתמכות באפליקציה שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

</Tab>
<Tab label="נתיבים מבוססי מערכת קבצים" value="fs-routes">

### ארכיטקטורה

בארכיטקטורה זו, הנתיבים פועלים לפי מוסכמות מערכת הקבצים של React Router v7 באמצעות `flatRoutes`, כאשר נקודות (`.`) מייצגות מקטעי URL ו-`($locale)` מציין מקטע שפה מקומי אופציונלי:

```bash
.
├── app
│   ├── components
│   │   ├── locale-switcher.content.ts
│   │   ├── locale-switcher.tsx
│   │   ├── localized-link.tsx
│   │   ├── navbar.content.ts
│   │   └── navbar.tsx
│   ├── hooks
│   │   ├── useI18nHTMLAttributes.tsx
│   │   └── useLocalizedNavigate.tsx
│   ├── routes
│   │   ├── ($locale)._index.content.ts
│   │   ├── ($locale)._index.tsx
│   │   ├── ($locale).about.content.ts
│   │   └── ($locale).about.tsx
│   ├── root.tsx                      # Root layout for IntlayerProvider
│   └── routes.ts                     # Route definition file using flatRoutes
├── intlayer.config.ts
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

### הגדרות

צרו קובץ תצורה `intlayer.config.ts` כדי להצהיר על השפות הנתמכות באפליקציה שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

</Tab>
</Tabs>

> באמצעות קובץ תצורה זה, תוכלו להגדיר כתובות URL מקומיות, הפניות middleware, שמות עוגיות, מיקום וסיומות של קובצי הצהרת התוכן, ביטול לוגים של Intlayer במסוף ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיינו ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בהגדרות ה-Vite שלכם">

הוסיפו את תוסף ה-intlayer לתצורה שלכם:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> תוסף ה-Vite בשם `intlayer()` משמש לשילוב Intlayer עם Vite. הוא דואג לבניית קובצי הצהרת התוכן ועוקב אחריהם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={4} title="הגדרת נתיבי React Router v7">

<Tabs group="routing-type">
<Tab label="ניתוב מבוסס הגדרות" value="config-based">

הגדירו את תצורת הניתוב שלכם עם נתיבים מודעי שפה:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:locale?", "routes/page.tsx"), // דף בית מקומי
  route("/:locale?/about", "routes/about/page.tsx"), // דף אודות מקומי
] satisfies RouteConfig;
```

</Tab>
<Tab label="נתיבים מבוססי מערכת קבצים" value="fs-routes">

הגדירו את תצורת הניתוב לשימוש בנתיבים מבוססי מערכת קבצים באמצעות `flatRoutes`:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // התעלמות מקובצי הצהרת תוכן כדי שלא יטופלו כנתיבים
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> הפונקציה `flatRoutes` מ-`@react-router/fs-routes` מאפשרת ניתוב מבוסס מערכת קבצים, שבו מבנה הקבצים בספריית `routes/` קובע את נתיבי האפליקציה. האפשרות `ignoredRouteFiles` מבטיחה שקובצי הצהרת התוכן של Intlayer (`.content.ts` וכד') לא יטופלו כקובצי נתיב.

</Tab>
</Tabs>

</Step>
<Step number={5} title="יצירת רכיבי פריסה (Layout Components)">

הגדירו את פריסת השורש (root layout) ואת הפריסות הספציפיות לשפה:

#### פריסת שורש (Root Layout)

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  data,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";

// ... קוד App, links ו-ErrorBoundary ללא שינוי

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  if (!locale) {
    throw data("Language not supported", { status: 404 });
  }

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={6} title="הצהרה על התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם לאחסון התרגומים:

```tsx fileName="app/routes/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      he: "ברוכים הבאים ל-React Router v7 + Intlayer",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      he: "בנו אפליקציות רב-לשוניות בקלות באמצעות React Router v7 ו-Intlayer.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      he: "אודותינו",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      he: "דף הבית",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה, כל עוד הן כלולות בספריית `contentDir` (כברירת מחדל, `./app`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> במקרה של שימוש בניתוב מבוסס מערכת קבצים, ניתן למקם את הקובץ ב-`app/routes/($locale)._index.content.ts`.

> לפרטים נוספים, עיינו ב[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={7} title="יצירת רכיבים מודעי שפה">

צרו רכיב `LocalizedLink` עבור ניווט מודע לשפה:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

במידה ותרצו לנווט לנתיבים מקומיים באופן תכנותי, תוכלו להשתמש ב-hook בשם `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>
<Step number={8} title="שימוש ב-Intlayer בדפים שלכם">

גשו למילוני התוכן שלכם בכל רחבי האפליקציה:

#### דף בית מקומי

<Tabs group="routing-type">
<Tab label="ניתוב מבוסס הגדרות" value="config-based">

```tsx fileName="app/routes/page.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/page";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Tab>
<Tab label="נתיבים מבוססי מערכת קבצים" value="fs-routes">

```tsx fileName="app/routes/($locale)._index.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/($locale)._index";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Tab>
</Tabs>

> למידע נוסף על ה-hook בשם `useIntlayer`, עיינו ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md).

- [תיעוד ה-Hook useIntlayer | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md)

> אם האפליקציה שלכם כבר קיימת, תוכלו להשתמש ב-[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) וכן ב-[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) כדי להמיר אלפי רכיבים בשניות.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Step>
<Step number={9} title="יצירת רכיב בורר שפות (Locale Switcher)">

צרו רכיב המאפשר למשתמשים להחליף שפה:

<Tabs group="routing-type">
<Tab label="ניתוב מבוסס הגדרות" value="config-based">

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  defaultLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* השפה - למשל FR */}
              {localeItem}
            </span>
            <span>
              {/* שם השפה בשפה עצמה - למשל Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* שם השפה בשפה הנוכחית - למשל Francés כשהשפה הנוכחית מוגדרת כ-Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={defaultLocale}>
              {/* שם השפה באנגלית - למשל French */}
              {getLocaleName(localeItem, defaultLocale)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

</Tab>
<Tab label="נתיבים מבוססי מערכת קבצים" value="fs-routes">

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  defaultLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            reloadDocument // טעינה מחדש של הדף להחלת השפה החדשה
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* השפה - למשל FR */}
              {localeItem}
            </span>
            <span>
              {/* שם השפה בשפה עצמה - למשל Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* שם השפה בשפה הנוכחית - למשל Francés כשהשפה הנוכחית מוגדרת כ-Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={defaultLocale}>
              {/* שם השפה באנגלית - למשל French */}
              {getLocaleName(localeItem, defaultLocale)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

</Tab>
</Tabs>

> למידע נוסף על ה-hook בשם `useLocale`, עיינו ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md).

- [תיעוד ה-Hook useLocale | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)

</Step>
<Step number={10} title="ניהול מאפייני HTML">

צרו hook לניהול מאפייני lang ו-dir ב-HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

לאחר מכן השתמשו בו ברכיב השורש שלכם:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // ייבוא ה-hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // הפעלת ה-hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

</Step>
<Step number={11} title="הוספת Middleware">

תוכלו גם להשתמש ב-`intlayerProxy` כדי להוסיף ניתוב צד-שרת לאפליקציה שלכם. תוסף זה יזהה אוטומטית את השפה הנוכחית על פי כתובת ה-URL ויגדיר את עוגיית השפה המתאימה. אם לא צוינה שפה, התוסף יקבע את השפה המתאימה ביותר על פי העדפות הדפדפן של המשתמש. אם לא זוהתה שפה, הוא יפנה לשפת ברירת המחדל.

> שימו לב שכדי להשתמש ב-`intlayerProxy` בסביבת ייצור (production), עליכם להעביר את החבילה `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מ-Intlayer גרסה 9,‏ `intlayerProxy()` מצורף ישירות לתוך התוסף `intlayer()` ומופעל כברירת מחדל באמצעות האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר לתאימות לאחור ועבור הגדרות הדורשות שליטה בסדר התוספים. הגדירו `routing.enableProxy: false` כדי לבטל זאת. ראו את [הערות הגרסה של v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות הגרסה של v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={12} title="חילוץ תוכן הרכיבים שלכם" isOptional={true}>

אם יש לכם בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציעה [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) להמרת הרכיבים שלכם וחילוץ התוכן מתוכם.

- [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

כדי להגדירו, תוכלו להוסיף מקטע `compiler` בקובץ `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... שאר התצורה שלכם
  compiler: {
    /**
     * מציין אם המהדר מופעל.
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * מציין אם לשמור את הרכיבים לאחר המרתם.
     *
     * - אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. כך ההמרה תהיה קבועה, והמהדר ידלג על ההמרה בתהליך הבא. בדרך זו, המהדר יכול להמיר את האפליקציה ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד המקורי ללא שינוי. ההמרה תתבצע בזיכרון בלבד.
     */
    saveComponents: false,

    /**
     * קידומת מפתח מילון
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab label="פקודת חילוץ" value="Extract command">

הריצו את המחלץ להמרת הרכיבים שלכם וחילוץ התוכן:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab label="מהדר Babel" value="Babel compiler">

 <Tabs>
 <Tab value="intlayer >= 9">

> החל מגרסה v9, ה-`intlayerCompiler` כלול ישירות בתוסף `intlayer`. לכן אין צורך להוסיפו ידנית.

 </Tab>
 <Tab value="intlayer < 9">

עדכנו את `vite.config.ts` לכלול את תוסף `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // הוספת תוסף המהדר
  ],
});
```

 </Tab>
 </Tabs>

בנו את האפליקציה שלכם כדי להמיר את הרכיבים ולחלץ את התוכן:

```bash packageManager="npm"
npm run build # או npm run dev
```

```bash packageManager="pnpm"
pnpm run build # או pnpm run dev
```

```bash packageManager="yarn"
yarn build # או yarn dev
```

```bash packageManager="bun"
bun run build # או bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

## הגדרת TypeScript

Intlayer משתמשת בהרחבת מודולים (module augmentation) כדי ליהנות מיתרונות TypeScript ולהפוך את בסיס הקוד שלכם לחזק יותר.

ודאו שתצורת ה-TypeScript שלכם כוללת את הטיפוסים שנוצרו אוטומטית:

```json5 fileName="tsconfig.json"
{
  // ... ההגדרות הקיימות שלכם
  include: [
    // ... ה-includes הקיימים שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

## הגדרת Git

מומלץ להתעלם מקבצים שנוצרו על ידי Intlayer כדי למנוע את שמירתם במאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראה הבאה לקובץ `.gitignore`:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

## הרחבת VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **הרחבת Intlayer הרשמית ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בהרחבה, עיינו ב[תיעוד הרחבת ה-VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת ה-VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

## להעמיק עוד

כדי להעמיק עוד, תוכלו להטמיע את [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להוציא את ניהול התוכן שלכם החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## הפניות לתיעוד

- [תיעוד Intlayer](https://intlayer.org)
- [תיעוד React Router v7](https://reactrouter.com/)
- [ה-hook בשם useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md)
- [ה-hook בשם useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)
- [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)
- [הגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

מדריך מקיף זה מספק את כל מה שדרוש כדי לשלב את Intlayer עם React Router v7 לאפליקציה רב-לשונית מלאה עם ניתוב מודע לשפה ותמיכה ב-TypeScript.

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית React Router v7?">

React Router v7 אינה כוללת שכבת הודעות מובנית, ולכן משלבים אותה עם ספריית i18n:

- **`react-i18next` / `i18next`**: מרחבי שמות (namespaces) של JSON הנטענים בזמן ריצה, עם מזהה שפה נפרד שיש לחבר לראוטר.
- **`react-intl`** ו-**`Lingui`**: הודעות ICU עם שלב חילוץ (extraction).
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)), מקומפל בזמן הבנייה, בעל טיפוסיות מקצה לקצה, עם כלי עזר לניתוב מודע לשפה, תרגום ב-AI, עורך חזותי ו-CMS.

ראו [מדוע Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) ואת [מבחן הביצועים (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [מדוע Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [מבחן ביצועים (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="בכמה מוסיף ה-i18n לגודל ה-Bundle שלי ב-React Router?">

הרבה פחות מהגדרה מבוססת מרחבי שמות, מכיוון שדף אינו מוריד לעולם קטלוג שאינו מרנדר. קוד HTML המרונדר בשרת פותר את תוכנו בשרת, והמהדר בזמן הבנייה מחליף קריאות `useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן בשימוש מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות המקובלות, Intlayer מפחיתה את גודל ה-bundle והדף בעד 50%. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="האם ניתן להגר מ-react-i18next או מ-react-intl מבלי לכתוב מחדש את הרכיבים שלי?">

כן, וישנם שני מסלולים. תוכלו להגר את התוכן בהדרגה באמצעות [מדריך ההגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md) או [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הקיים שלכם במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושפים בדיוק את אותו ה-API של `react-i18next`, `react-intl` ו-`i18next`, אך מוגשים באמצעות מילוני Intlayer, כך שהייבואים משתנים וקוד הרכיב נשאר בעינו.

- [מדריך הגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md)
- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="האם ניתן לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי `/messages/{locale}/{namespace}.json` כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לפצל תוכן לפי שפה במקום לקבץ שפות בקובץ יחיד.

- [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer תקרא את הרכיבים שלכם, תחלץ את המחרוזות המוצגות למשתמש ותכתוב קובץ `.content` לצד כל רכיב, כך שתסקרו diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 12 במדריך זה מסביר זאת בפירוט.

עבור תהליך אוטומטי לחלוטין, [המהדר של Intlayer (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) מבצע את אותה פעולה בזמן הבנייה: הוא סורק את קוד המקור של ה-JSX, TSX, Vue ו-Svelte שלכם בכל שינוי, מייצר את המילונים ושומר עליהם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין צורך לתחזק מפתחות ידנית כלל.

- [המהדר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

שתי מגבלות שכדאי להכיר לפני הפעלת המהדר: הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות מ-CMS, אינן נגישות לו. בנוסף, עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כמו `className="active"` או קוד סטטוס, מה שדורש כמה ביאורים (annotations) בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אתכם בתהליך הבקרה.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עריכה וכלי סוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), חיפוש כל ההפניות, תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, והתראה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שמסייע בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר יענה מתוך תיעוד עדכני במקום לנחש, ויוכל להריץ פקודות כמו `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: מיומנויות ממוקדות כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת מיומנות ייעודית לכל framework, המלמדות סוכן על מערך הניתוב וטיפוסי צמתי התוכן שלכם.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מתריע על מחרוזות מובנות בקוד (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="כיצד מוסיפים מקטע שפה לנתיבים שלי?">

הצהירו על מקטע `:locale` בעץ הנתיבים שלכם ותנו ל-Intlayer לפענח אותו. הפונקציה `validatePrefix` בודקת אם המקטע הוא שפה מוצהרת, כך שקידומת לא מוכרת מחזירה 404 במקום לרנדר דף כפול, ו-`getLocalizedUrl` משכתבת כל נתיב לשפת היעד. אם אתם משתמשים בנתיבי מערכת קבצים, הוסיפו את המקטע הדינמי `($locale)` בתחילת שמות קובצי הנתיבים שלכם.

</Question>
<Question title="האם עליי להכניס את השפה לתוך ה-URL?">

לא. האפשרות `routing.mode` מקבלת את הערכים `"prefix-no-default"` (ברירת המחדל), `"prefix-all"`, `"no-prefix"` ו-`"search-params"`, והאפשרות `routing.domains` ממפה שפה לדומיין ייעודי משלה. בכל מקרה השפה נשמרת בעוגייה. ראו את [הפניית התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [הפניית התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="האם זה עובד עם React Router במצב framework, עם SSR ו-loaders?">

כן. התוכן נפתר בזמן רינדור השרת, והשפה הפעילה זמינה ב-loaders וב-actions, כך שנתוני השרת יכולים לעבור לוקליזציה באותו שלב שבו מרונדר הדף. ניווט לקוח שומר על השפה ללא צורך בטעינה מחדש מלאה.

</Question>
<Question title="כיצד מוסיפים תגיות hreflang עבור SEO?">

בנו את מפת החלופות (alternates map) באמצעות `getMultilingualUrls` והפיקו אותה מייצוא ה-`meta` או ה-`links` של הנתיב, כולל רשומת `x-default`. אותו כלי עזר מזין גם `sitemap.xml` מותאם שפות.

</Question>
<Question title="כיצד בונים בורר שפות שנשאר בעמוד הנוכחי?">

השתמשו ב-`useLocale` עבור השפה הפעילה והשפות הזמינות, וב-`getLocalizedUrl` כדי לתרגם את הנתיב הנוכחי לשפת היעד. המשתמש נשאר באותו נתיב במקום להישלח בחזרה לדף הבית, מה שמונע גם אובדן של מיקום הגלילה ושל פרמטרי השאילתה.

</Question>
<Question title="כיצד מתרגמים את האפליקציה באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`, הממלאת תרגומים חסרים באמצעות ה-LLM לפי בחירתכם תוך שימוש בספק ובמפתח ה-API שלכם. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ואת [האינטגרציה ל-CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [אינטגרציה ל-CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומכת בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים (plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [שיבוצים (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [שיבוצים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך תוכן מבלי לגעת בקוד?">

באמצעות [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי או [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), שמוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחדש.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="מהי העלות של העורך החזותי? האם זה מיותר אם אינני זקוק לו?">

ל[עורך החזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) יש **אפס השפעה (zero cost)** על האפליקציה שלכם אם הוא אינו מוגדר. הלוגיקה הנוספת נטענת רק אם היא מופעלת ונדרשת במפורש.

- [העורך החזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

אם הוא מופעל, התקורה קלה ביותר (+5 KB הנטענים דינמית רק בעת הפעלה) מכיוון שהלוגיקה הראשית מנוהלת על ידי עורך השרת ב-[app.intlayer.org](https://app.intlayer.org) או דרך חבילת `intlayer-editor`. אם אתם זקוקים רק למערך תרגום פשוט ללא עריכה חזותית, Intlayer אינה מוסיפה כל תקורה לאפליקציה שלכם.

</Question>
<Question title="האם Intlayer היא חינמית ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המתארח הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
