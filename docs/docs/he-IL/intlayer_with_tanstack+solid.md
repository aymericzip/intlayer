---
createdAt: 2025-03-25
updatedAt: 2026-11-03
priority: 9
title: "בינאום TanStack Start + Solid (i18n): מדריך תרגום מלא"
description: "הגדירו את Intlayer ב-TanStack Start עם Solid: פרמטרי ניתוב של שפה (locale), תוכן מתורגם ריאקטיבי, מטא-נתונים מותאמים אישית ב-head ותגי hreflang."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - ניתוב שפות
  - מפת אתר
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "השוואה בין רזולוציה סטטית, דינמית ודינמית שמורה במטמון של מילוני מטא-נתונים בפונקציות head של הניתוב"
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.6.0
    date: 2026-03-29
    changes: "הוספת רינדור מוקדם (pre-render) ומפת אתר (sitemap)"
  - version: 8.5.1
    date: 2026-03-25
    changes: "נוספה תמיכה עבור Tanstack Start Solid.js"
author: aymericzip
---

# תרגום אתר Tanstack Start עם Solid.js באמצעות Intlayer

## תוכן עניינים

<TOC/>

מדריך זה מדגים כיצד לשלב את **Intlayer** עבור בינאום (i18n) חלק בפרויקטי Tanstack Start עם Solid.js, ניתוב מודע לשפה (locale-aware routing), תמיכה ב-TypeScript ושיטות פיתוח מודרניות.

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `react-i18next` או `i18next`,‏ Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור TanStack Start">

Intlayer מותאם לפעול בצורה מושלמת עם TanStack Start ו-Solid על ידי מתן **ניתוב רב-לשוני**, **מפת אתר (sitemap)**, וכל התכונות הנדרשות להרחבת הבינאום (i18n) בסדרי גודל משמעותיים.

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייע **להפחית את גודל החבילה והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות (Maintainability)">

תיחום התוכן של האפליקציה שלכם **מקל על התחזוקה** באפליקציות רחבות היקף. תוכלו לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המחשבתי של סקירת כל קוד התוכן שלכם. בנוסף, Intlayer בעל **טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכני בינה מלאכותית (AI Agents)">

הצבת תוכן בסמיכות לקוד (co-locating) **מפחיתה את ההקשר (context) הנדרש** על ידי מודלי שפה גדולים (LLMs).‏ Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה לתרגום ב-CI/CD pipeline שלכם באמצעות ה-LLM לבחירתכם בעלות של ספק ה-AI שלכם. Intlayer מציע גם **קומפיילר** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול להוביל לבעיות ביצועים וריאקטיביות. Intlayer מבצע אופטימיזציה לטעינת התוכן שלכם בזמן הבנייה (build time).

</Accordion>
<Accordion header="סקלביליות עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n,‏ Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי (self-hosted)** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק ופשוט. ניתן לאחסן תוכן מקומית ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Tanstack Start

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="הפתרון הטוב ביותר ל-i18n ב-Tanstack Start? גלו את Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית האפליקציה (Application Template)](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) ב-GitHub.

<Steps>
<Step number={1} title="יצירת פרויקט">

התחילו ביצירת פרויקט TanStack Start חדש על ידי מעקב אחר המדריך [Start new project](https://tanstack.com/start/latest/docs/framework/solid/quick-start) באתר של TanStack Start.

</Step>
<Step number={2} title="התקנת חבילות Intlayer">

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
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול הגדרות, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **solid-intlayer**
  החבילה שמשלבת את Intlayer עם אפליקציית Solid. היא מספקת context providers ו-hooks עבור בינאום ב-Solid.

- **vite-intlayer**
  כוללת את תוסף Vite לשילוב Intlayer עם [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), וכן middleware לזיהוי השפה המועדפת על המשתמש, ניהול קובצי cookie וטיפול בהפניות URL.

</Step>
<Step number={3} title="הגדרת הפרויקט שלכם">

### ארכיטקטורה

בארכיטקטורה זו, כל הנתיבים המותאמים אישית לשפה מקוננים תחת מקטע הנתיב `{-$locale}` ב-Solid. גישה זו מבטיחה שלכל שפה תהיה כתובת URL ייעודית תוך מתן אפשרות להוספת קידומת שפה אוטומטית, אימות ואופטימיזציית SEO.

```bash
.
├── src
│   ├── components
│   │   ├── Header.content.ts
│   │   ├── Header.tsx
│   │   ├── LocaleSwitcher.content.ts
│   │   ├── LocaleSwitcher.tsx
│   │   └── LocalizedLink.tsx
│   ├── routes
│   │   ├── {-$locale}
│   │   │   ├── 404.content.ts
│   │   │   ├── 404.tsx
│   │   │   ├── about.content.ts
│   │   │   ├── about.tsx
│   │   │   ├── index.content.tsx
│   │   │   ├── index.tsx
│   │   │   └── route.tsx             # תבנית שפה ואימות קידומת
│   │   ├── __root.tsx                # נתיב שורש עם IntlayerProvider
│   │   └── sitemap[.]xml.ts
│   ├── router.tsx
│   └── styles.css
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### הגדרות

צרו קובץ הגדרות כדי להגדיר את השפות של האפליקציה שלכם:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> באמצעות קובץ הגדרות זה, תוכלו להגדיר כתובות URL מותאמות לשפה, הפניות של middleware, שמות של קובצי cookie, את המיקום והסיומת של הצהרות התוכן שלכם, להשבית יומני רישום של Intlayer במסוף ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיינו ב-[תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={4} title="שילוב Intlayer בהגדרות Vite שלכם">

הוסיפו את התוסף של intlayer להגדרות שלכם:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> תוסף ה-Vite `intlayer()` משמש לשילוב Intlayer עם Vite. הוא מבטיח את בניית קובצי הצהרת התוכן ועוקב אחריהם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={5} title="יצירת Root Layout">

הגדירו את ה-root layout שלכם לתמיכה בבינאום באמצעות `useParams` כדי לזהות את השפה הנוכחית והגדרת המאפיינים `lang` ו-`dir` בתגית `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>
<Step number={6} title="יצירת Locale Layout">

צרו layout שמטפל בקידומת השפה ומבצע אימות. layout זה יבטיח שרק שפות חוקיות יעובדו.

> שלב זה הוא אופציונלי אם אינכם צריכים לאמת את קידומת השפה ברמת הנתיב.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // אימות קידומת השפה
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> כאן, `{-$locale}` הוא פרמטר נתיב דינמי המוחלף בשפה הנוכחית. סימון זה הופך את המקטע לאופציונלי, ומאפשר לו לעבוד עם מצבי ניתוב כגון `'prefix-no-default'` וכו'.

> שימו לב שמקטע זה עשוי לגרום לבעיות אם תשתמשו במספר מקטעים דינמיים באותו נתיב (לדוגמה, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> עבור מצב `'prefix-all'`, ייתכן שתעדיפו להחליף את המקטע ל-`$locale` במקום זאת.
> עבור מצב `'no-prefix'` או `'search-params'`, תוכלו להסיר את המקטע לחלוטין.

</Step>
<Step number={7} title="הצהרת התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
        he: "אודות",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
        he: "דף הבית",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
        he: "ברוכים הבאים ל-Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
        he: "זוהי דוגמה לשימוש ב-Intlayer עם TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה שלכם כל עוד הן כלולות בתיקיית `contentDir` (כברירת מחדל, `./app`), ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב-[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={8} title="יצירת רכיבים ו-Hooks מודעי שפה">

צרו רכיב `LocalizedLink` עבור ניווט מודע לשפה:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

לרכיב זה שתי מטרות:

- הסרת הקידומת המיותרת `{-$locale}` מכתובת ה-URL.
- הזרקת פרמטר השפה ל-URL כדי להבטיח שהמשתמש יופנה ישירות לנתיב המותאם לשפה.

לאחר מכן נוכל ליצור hook בשם `useLocalizedNavigate` עבור ניווט פרוגרמטי:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>
<Step number={9} title="שימוש ב-Intlayer בדפים שלכם">

> השתמשו ב-**`useIntlayer`** כברירת מחדל: זו הדרך המומלצת לקריאת תוכן בתוך רכיבים, והקומפיילר מפענח אותו עבור השפה המרונדרת. השתמשו ב-`getIntlayer` / `getIntlayerAsync` רק מחוץ לעץ של Solid: ב-`head` של הנתיב, ב-loaders ובפונקציות שרת.

גשו למילוני התוכן שלכם בכל רחבי האפליקציה:

#### דף בית מותאם שפה

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ב-Solid, הפונקציה `useIntlayer` מחזירה תוכן ריאקטיבי (לדוגמה, `content`). ניתן לגשת למאפיינים שלו ישירות.
>
> אם ברצונכם להשתמש בתוכן שלכם במאפיין מסוג `string`, כגון `alt`, `title`, `href`, `aria-label` וכו', תוכלו להשתמש בערך של הפונקציה, כך:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> למידע נוסף על ה-hook של `useIntlayer`, עיינו ב-[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useIntlayer.md).

- [תיעוד useIntlayer Hook | solid-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useIntlayer.md)

</Step>
<Step number={10} title="יצירת רכיב להחלפת שפה (Locale Switcher)">

צרו רכיב שיאפשר למשתמשים להחליף שפות:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> ב-Solid, המשתנה `locale` מ-`useLocale` הוא **signal accessor**. השתמשו ב-`locale()` (עם סוגריים) כדי לקרוא את הערך הנוכחי שלו בצורה ריאקטיבית.
>
> למידע נוסף על ה-hook של `useLocale`, עיינו ב-[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useLocale.md).

- [תיעוד useLocale Hook | solid-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useLocale.md)

</Step>
<Step number={11} title="ניהול מאפייני HTML">

כפי שראינו בשלב 5, ניתן לנהל את המאפיינים `lang` ו-`dir` של תגית `html` באמצעות `useParams` ברכיב השורש שלכם. הדבר מבטיח שהמאפיינים הנכונים יוגדרו גם בשרת וגם בלקוח.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

</Step>
<Step number={12} title="הוספת Middleware">

תוכלו גם להשתמש ב-`intlayerProxy` כדי להוסיף ניתוב בצד השרת לאפליקציה שלכם. תוסף זה יזהה אוטומטית את השפה הנוכחית על סמך כתובת ה-URL ויגדיר את קובץ ה-cookie המתאים של השפה. אם לא צוינה שפה, התוסף יקבע את השפה המתאימה ביותר על סמך העדפות השפה של הדפדפן של המשתמש. אם לא זוהתה שפה, הוא יפנה לשפת ברירת המחדל.

> שימו לב שכדי להשתמש ב-`intlayerProxy` בסביבת ייצור (production), עליכם להעביר את החבילה `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מ-Intlayer גרסה 9, `intlayerProxy()` ארוז ישירות בתוך התוסף `intlayer()` ומופעל כברירת מחדל באמצעות האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי: הוא נשמר עבור תאימות לאחור ולהגדרות הדורשות שליטה בסדר התוספים. הגדירו `routing.enableProxy: false` כדי לבטל זאת. ראו את [הערות השחרור של גרסה 9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות השחרור של גרסה 9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solid(),
  ],
});
```

</Step>
<Step number={13} title="בינאום המטא-נתונים שלכם">

<Tabs>

<Tab label="רזולוציה סטטית" value="static">

`getIntlayer` מפענח באופן סינכרוני מול המילון ה**ממוזג**, זה שמכיל כל שפה שהוצהרה. הפונקציה `head` נשארת סינכרונית ושום דבר אינו ממתין (no await), אך המילון הרב-לשוני כולו נכלל ב-chunk של הנתיב שנשלח לדפדפן.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // הנתיב עבור נתיב זה

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // קישור קנוני: מצביע על הדף הנוכחי המותאם לשפה
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: מיידע את Google על כל הגרסאות המותאמות לשפה
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: עבור משתמשים בשפות שאינן תואמות
        // הגדרת שפת ברירת מחדל כגיבוי (בדרך כלל השפה העיקרית שלכם)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

הכי מתאים למילוני מטא-נתונים קטנים, לקומץ שפות או בזמן בניית אב-טיפוס.

</Tab>

<Tab label="רזולוציה דינמית" value="dynamic">

`getIntlayerAsync` (זמין החל מ-**גרסה 9.4**) מתנהג כמו `getIntlayer`, אך תוסף הבנייה מכוון אותו ל-chunk הספציפי לכל שפה ב-`.intlayer/dynamic_dictionaries/` במקום למילון הממוזג. כתוצאה מכך, דף מספק רק את השפה שהוא מרנדר. מכיוון שה-chunk הזה נטען לפי דרישה, הפונקציה `head` הופכת ל-`async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // הנתיב עבור נתיב זה

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // קישור קנוני: מצביע על הדף הנוכחי המותאם לשפה
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: מיידע את Google על כל הגרסאות המותאמות לשפה
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: עבור משתמשים בשפות שאינן תואמות
        // הגדרת שפת ברירת מחדל כגיבוי (בדרך כלל השפה העיקרית שלכם)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> אם `head` קורא מספר מילונים, פענחו אותם באמצעות `Promise.all`: שימוש ב-await עבור כל `getIntlayerAsync` בשורה נפרדת משרשר את הבקשות במקום להריץ אותן במקביל.

הפשרה: הייבוא הדינמי מפוענח בזמן ש-`head` רץ, במסלול הקריטי של רינדור המסמך. בנתיב קר הדבר מעכב את ה-head במספר מילישניות ויכול לפגוע מעט ב-**LCP**.

</Tab>

<Tab label="רזולוציה דינמית שמורה במטמון" value="cached">

פענחו את המילון ב-`loader` של הנתיב וקראו אותו בחזרה מ-`loaderData` בתוך `head`. ה-loaders של הנתיבים התואמים רצים במקביל, ו-`staleTime: Infinity` מודיע ל-TanStack Router שהתוצאה לעולם אינה מתיישנת, כך שה-chunk לכל שפה מפוענח פעם אחת ומוגש ממטמון הנתב לאחר מכן, מה שמשאיר את `head` סינכרוני.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // מפוענח במקביל לנתיבים התואמים האחרים, מחוץ למסלול הקריטי של head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // המילון לעולם אינו משתנה עבור שפה נתונה: פענחו את ה-chunk פעם אחת
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // הנתיב עבור נתיב זה

    return {
      links: [
        // קישור קנוני: מצביע על הדף הנוכחי המותאם לשפה
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: מיידע את Google על כל הגרסאות המותאמות לשפה
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: עבור משתמשים בשפות שאינן תואמות
        // הגדרת שפת ברירת מחדל כגיבוי (בדרך כלל השפה העיקרית שלכם)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> ייתכן ש-`head` ייקרא לפני שה-loader יסיים, לכן `loaderData` מוגדר כעלול להיות `undefined`. שמרו על ה-optional chaining, או החזירו כותרת גיבוי חלופית.

אתם שומרים על ה-chunk הספציפי לכל שפה מבלי לשלם את מחירו במסלול הקריטי של ה-head. המחיר הוא חוויית פיתוח: יש להעביר את התוכן במפורש מה-loader ל-`head` דרך `loaderData`.

</Tab>

</Tabs>

### באיזו רזולוציה כדאי לי לבחור?

|              | רזולוציה סטטית  | רזולוציה דינמית                | רזולוציה דינמית שמורה במטמון              |
| ------------ | --------------- | ------------------------------ | ----------------------------------------- |
| API          | `getIntlayer`   | `getIntlayerAsync` (גרסה 9.4+) | `getIntlayerAsync` ב-`loader` (גרסה 9.4+) |
| חתימת `head` | סינכרונית       | `async`                        | סינכרונית, קוראת את `loaderData`          |
| שפות שנשלחות | כל שפה שהוצהרה  | השפה המבוקשת בלבד              | השפה המבוקשת בלבד                         |
| ניווטי לקוח  | אין צורך בפענוח | מופעל מחדש בכל התאמה           | מוגש ממטמון הנתב                          |
| חוויית מפתח  | הפשוטה ביותר    | `await` יחיד                   | תוכן מועבר דרך `loaderData`               |

</Step>
<Step number={14} title="אחזור השפה ב-server actions שלכם">

ייתכן שתרצו לגשת לשפה הנוכחית מתוך ה-server actions או נקודות הקצה של ה-API שלכם.
תוכלו לעשות זאת באמצעות הפונקציה המסייעת `getLocale` מ-`intlayer`.

להלן דוגמה לשימוש בפונקציות השרת של TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // קבלת ה-cookie מהבקשה (ברירת מחדל: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // קבלת ה-header מהבקשה (ברירת מחדל: 'x-intlayer-locale')
    // גיבוי באמצעות משא ומתן Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // אחזור תוכן באמצעות getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>
<Step number={15} title="ניהול דפי שגיאה 404 (Not Found)">

כאשר משתמש מבקר בדף שאינו קיים, תוכלו להציג דף 404 מותאם אישית, וקידומת השפה עשויה להשפיע על האופן שבו דף ה-404 מופעל.

#### הבנת הטיפול ב-404 של TanStack Router עם קידומות שפה

ב-TanStack Router, הטיפול בדפי 404 עם נתיבים מותאמים לשפה דורש גישה רב-שכבתית:

1. **נתיב 404 ייעודי**: נתיב ספציפי להצגת ממשק המשתמש של 404
2. **אימות ברמת הנתיב**: מאמת קידומות שפה ומפנה קידומות לא חוקיות ל-404
3. **נתיב Catch-all**: תופס כל נתיב שלא נמצאה לו התאמה בתוך מקטע השפה

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// פעולה זו יוצרת נתיב ייעודי של /[locale]/404
// הוא משמש הן כנתיב ישיר והן כרכיב המיובא בקבצים אחרים
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// מיוצא בנפרד כדי שניתן יהיה לעשות בו שימוש חוזר ב-notFoundComponent ובנתיבי catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad רץ לפני שהנתיב מתרנדר (הן בשרת והן בלקוח)
  // זהו המקום האידיאלי לאימות קידומת השפה
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix בודק אם השפה חוקית בהתאם להגדרות ה-intlayer שלכם
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // קידומת שפה לא חוקית - הפניה לדף 404 עם קידומת שפה חוקית
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent נקרא כאשר נתיב צאצא אינו קיים
  // לדוגמה, /en/non-existent-page מפעיל זאת בתוך ה-layout של /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// נתיב ה-$ (splat/catch-all) תואם לכל נתיב שאינו תואם לנתיבים אחרים
// לדוגמה, /en/some/deeply/nested/invalid/path
// זה מבטיח שכל הנתיבים ללא התאמה בתוך שפה יציגו את דף ה-404
// ללא זה, נתיבים עמוקים ללא התאמה עלולים להציג דף ריק או שגיאה
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>
<Step number={16} title="חילוץ התוכן של הרכיבים שלכם" isOptional={true}>

אם יש לכם בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציעה [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) כדי לשנות את הרכיבים שלכם ולחלץ את התוכן.

- [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

כדי להגדיר אותו, תוכלו להוסיף מקטע `compiler` בקובץ `intlayer.config.ts` שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... שאר ההגדרות שלכם
  compiler: {
    /**
     * מציין אם יש להפעיל את הקומפיילר.
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * מציין אם יש לשמור את הרכיבים לאחר שעברו טרנספורמציה.
     *
     * - אם `true`, הקומפיילר יכתוב מחדש את קובץ הרכיב בדיסק. הטרנספורמציה תהיה קבועה, והקומפיילר ידלג על הטרנספורמציה בפעם הבאה. בדרך זו, הקומפיילר יכול לשנות את האפליקציה, ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, הקומפיילר יזריק את קריאת הפונקציה `useIntlayer()` לתוך הקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד המקורי ללא שינוי. הטרנספורמציה תיעשה בזיכרון בלבד.
     */
    saveComponents: false,

    /**
     * קידומת מפתח המילון
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='פקודת Extract'>

הריצו את ה-extractor כדי להמיר את הרכיבים שלכם ולחלץ את התוכן

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
 <Tab value='Babel compiler'>

 <Tabs>
 <Tab value='intlayer >= 9'>

> החל מגרסה 9, ה-`intlayerCompiler` כלול בתוך התוסף `intlayer`. לכן אין צורך להוסיף אותו ידנית.

 </Tab>
 <Tab value='intlayer < 9'>

עדכנו את `vite.config.ts` שלכם כדי לכלול את התוסף `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // הוספת תוסף הקומפיילר
  ],
});
```

 </Tab>
 </Tabs>

בנו את האפליקציה שלכם כדי להמיר את הרכיבים ולחלץ את התוכן

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
<Step number={17} title="רינדור מוקדם (Pre-render) ויצירת מפת אתר (Sitemap)">

Intlayer מגיע עם מחולל מפת אתר מובנה שיעזור לכם ליצור בקלות מפת אתר עבור האפליקציה שלכם. הוא מטפל בנתיבים מותאמים לשפה ומוסיף את המטא-נתונים הנדרשים למנועי חיפוש.

> מפת האתר שנוצרת על ידי Intlayer תומכת ב-namespace של `xhtml:link` (הרחבות XML של Hreflang). בניגוד למחוללי מפת אתר רגילים המפרטים רק כתובות URL גולמיות, Intlayer יוצר אוטומטית את הקישורים הדו-כיווניים הנדרשים בין כל גרסאות השפה של דף מסוים (למשל, `/about`, `/about?lang=fr` ו-`/about?lang=es`). הדבר מבטיח שמנועי חיפוש יאנדקסו ויציגו כראוי את גרסת השפה המתאימה לקהל היעד הנכון.

כדי להשתמש בו, עליכם להגדיר תחילה את `vite.config.ts` כדי לאפשר רינדור מוקדם עבור הנתיבים המותאמים לשפה שלכם ולהשבית את יצירת מפת האתר המוגדרת כברירת מחדל ב-TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... שאר הייבואים

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... תוספים נוספים
    tanstackStart({
      // ... הגדרות נוספות
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

לאחר מכן, צרו נתיב `src/routes/sitemap[.]xml.ts` המשתמש בפונקציה `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: "https://example.com" }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>
<Step number={18} title="הגדרת TypeScript">

Intlayer משתמש ב-module augmentation כדי להפיק תועלת מ-TypeScript ולהפוך את בסיס הקוד שלכם לחזק יותר.

וודאו שהגדרות ה-TypeScript שלכם כוללות את הטיפוסים שנוצרו אוטומטית:

```json5 fileName="tsconfig.json"
{
  // ... ההגדרות הקיימות שלכם
  include: [
    // ... ה-includes הקיימים שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

</Step>

</Steps>

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. הדבר מאפשר לכם להימנע מביצוע commit שלהם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראות הבאות לקובץ ה-`.gitignore` שלכם:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

## תוסף ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **התוסף הרשמי של Intlayer ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

תוסף זה מספק:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון פשוטים של תרגומים.

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב-[תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

## להעמיק עוד

כדי להעמיק עוד, תוכלו להטמיע את [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## מקורות תיעוד

- [תיעוד Intlayer](https://intlayer.org)
- [תיעוד Tanstack Start](https://tanstack.com/start/latest)
- [ה-hook‏ useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useIntlayer.md)
- [ה-hook‏ useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useLocale.md)
- [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)
- [הגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית TanStack Start ו-Solid?">

TanStack Start אינה כוללת שכבת i18n מובנית, והאפשרויות באקו-סיסטם של Solid מצומצמות:

- **`@solid-primitives/i18n`**: מילון שטוח שאתם מרכיבים ומחברים לנתב בעצמכם.
- **`i18next`** עם מעטפת ל-Solid: קטלוגים בוגרים, אך ללא אינטגרציה עם הנתב של TanStack, פונקציית ה-`head` או שלב הרינדור המוקדם (pre-render).
- **`Paraglide`**: הודעות מקומפלות, ממוקד בשכבת ההודעות בלבד.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומקומפל בזמן הבנייה, עם ניתוב מודע לשפה, יצירת מפת אתר, תרגום באמצעות AI, עורך חזותי ו-CMS.

ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) ואת [מבחן הביצועים (benchmark) של i18n ב-TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [מבחן ביצועים TanStack Start i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

</Question>
<Question title="כמה משקל מוסיף i18n לגודל החבילה (bundle size) של TanStack Start שלי?">

הרבה פחות מהגדרה המבוססת על namespaces, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. קוד HTML המרונדר בשרת מפענח את התוכן שלו בשרת, והקומפיילר בזמן הבנייה מחליף קריאות `useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן בשימוש מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות המקובלות, Intlayer מפחית את גודל החבילה והדף בעד 50%. ראו [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

</Question>
<Question title="האם ניתן להגר מ-@solid-primitives/i18n או i18next מבלי לכתוב מחדש את הרכיבים שלי?">

במידה רבה, כן. עקבו אחר [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md) כדי להעביר את התוכן. תוכלו גם להגר בהדרגה: [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים שלכם כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתם מעבירים רכיבים בזה אחר זה.

- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 16 במדריך זה מפרט זאת.

עבור צינור עבודה אוטומטי לחלוטין, [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) עושה את אותו הדבר בזמן הבנייה: הוא סורק את קוד המקור שלכם ב-JSX,‏ TSX,‏ Vue ו-Svelte בכל שינוי, מייצר את המילונים ושומר עליהם מסונכרנים באמצעות hot module replacement, כך שאין צורך לתחזק מפתחות ידנית כלל.

- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

ישנן שתי מגבלות שכדאי להכיר לפני הפעלת הקומפיילר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן, עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כגון `className="active"` או קוד סטטוס, מה שמצריך מעט הערות (annotations) בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן על ידי השארתכם בתהליך הבקרה.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עורך וסוכני בינה מלאכותית זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות (command palette) או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל המופעים (find all references), תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שמסייע בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor,‏ VS Code,‏ Claude Desktop,‏ Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: יכולות ממוקדות כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת יכולת לכל סביבת פיתוח, המלמדות סוכן בינה מלאכותית את מבנה הניתוב שלכם ואת סוגי צמתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות בקוד (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם Intlayer תומך כאן ברינדור צד שרת (SSR) וברינדור מוקדם (pre-rendering)?">

כן. תוכן מפוענח במהלך SSR, ושלב 17 מכסה את הגדרת הרינדור המוקדם המייצרת מסמך סטטי אחד לכל נתיב מותאם שפה, בנוסף למפת האתר המותאמת לשפה שנוצרת מאותה טבלת נתיבים.

</Question>
<Question title="האם שינוי השפה מרנדר מחדש את כל האפליקציה שלי?">

לא. התוכן מגובה בסיגנלים של Solid (signals), כך שהחלפת שפה מעדכנת רק את צמתי ה-DOM שקוראים את הערכים שהשתנו.

</Question>
<Question title="כיצד אוכל להוסיף תגי hreflang ומפת אתר מותאמת לשפה?">

השתמשו בפונקציה המובנית `generateSitemap` בנתיב `src/routes/sitemap[.]xml.ts`. היא מייצרת את ה-namespace של `xhtml:link`, כך שכל גרסת שפה של דף מקושרת באופן דו-כיווני לאחרות. מטא-נתונים מותאמים לשפה ב-`head` מכוסים בשלב 13.

</Question>
<Question title="כיצד אוכל לטפל בדפי 404 בנתיבים מותאמים לשפה?">

שלב 15 מכסה זאת. הפונקציה `validatePrefix` בודקת האם מקטע השפה של כתובת ה-URL הוא שפה שהוצהרה, כך ש-`/xx/about` מחזיר 404 אמיתי במקום להיות מאונדקס כדף כפול.

</Question>
<Question title="האם חובה לשים את השפה בכתובת ה-URL?">

לא. האפשרות `routing.mode` מקבלת את הערכים `"prefix-no-default"` (ברירת המחדל), `"prefix-all"`, `"no-prefix"` ו-`"search-params"`, והאפשרות `routing.domains` ממפה כל שפה לדומיין משלה. ראו את [המדריך להגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך להגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד לבנות רכיב החלפת שפה ששומר על הנתיב הנוכחי?">

שלב 10 מציג את הרכיב. ה-hook‏ `useLocale` חושף את השפה הפעילה, את השפות הזמינות ופונקציית הגדרה ששומרת את הבחירה, בעוד ש-`getLocalizedUrl` משכתב את הנתיב הנוכחי לשפת היעד כך שהמשתמש נשאר באותו הדף.

</Question>
<Question title="כיצד אוכל לתרגם את האפליקציה אוטומטית באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את הריצה לתוכן שהשתנה בענף. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו-[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [החדרות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [החדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על גבי התשתית שלכם ומאפשר לכל אחד לערוך טקסט ישירות על גבי האפליקציה הפועלת, או [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), המוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחדש (deployment).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="מהי העלות של העורך החזותי? האם הוא מיותר אם אינני זקוק לו?">

ל-[עורך החזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) יש **אפס עלות ביצועים** על האפליקציה שלכם אם אינו מוגדר. הלוגיקה הנוספת נטענת רק אם היא מופעלת ונדרשת במפורש.

- [עורך חזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

אם הוא מופעל, המשקל קל ביותר (+5 KB, נטען דינמית רק בעת הפעלה) מכיוון שהלוגיקה העיקרית מנוהלת על ידי עורך השרת ב-[app.intlayer.org](https://app.intlayer.org) או באמצעות החבילה `intlayer-editor`. אם אתם זקוקים רק להגדרת תרגום פשוטה ללא עריכה חזותית, Intlayer אינו מוסיף כל תקורה לאפליקציה שלכם.

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל הוא שירות אופציונלי בתשלום שניתן גם [לאחסנו באופן עצמאי (self hosted)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אחסון עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
