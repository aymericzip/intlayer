---
createdAt: 2025-09-09
updatedAt: 2026-11-03
priority: 10
title: "בינאום TanStack Start (i18n) - מדריך שלם לתרגום האפליקציה שלך"
description: "הגדר את Intlayer ב-TanStack Start: פרמטרי ניתוב שפה (locale), תוכן מתורגם בטוח ל-SSR, מטא-נתונים מותאמים אישית ב-head, hreflang ומפת אתר (sitemap)."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - ניתוב שפות
  - מפת אתר
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "השוואה בין פתרון סטטי, דינמי ודינמי עם שמירה במטמון של מילוני מטא-נתונים בפונקציות head של ניתוב"
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.6.0
    date: 2026-03-29
    changes: "הוספת רינדור מוקדם (pre-render) ומפת אתר (sitemap)"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "הצגת validatePrefix והוספת שלב 14, טיפול בדפי 404 עם נתיבים מותאמי שפה."
  - version: 7.3.9
    date: 2025-12-05
    changes: "הוספת שלב 13, אחזור השפה ב-server actions שלך (אופציונלי)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "הוספת שלב 13, התאמת Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "תיקון ברירת מחדל של קידומת על ידי הוספת פונקציית getPrefix עבור useLocalizedNavigate, LocaleSwitcher ו-LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "עדכון תיעוד"
  - version: 5.8.1
    date: 2025-09-09
    changes: "נוסף עבור Tanstack Start"
author: aymericzip
---

# תרגום אתר ה-Tanstack Start שלך באמצעות Intlayer

## תוכן עניינים

<TOC/>

מדריך זה מדגים כיצד לשלב את **Intlayer** עבור בינאום חלק בפרויקטי Tanstack Start עם ניתוב מודע-שפה, תמיכה מלאה ב-TypeScript ושיטות פיתוח מודרניות.

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `react-i18next`, `use-intl`, או `paraglide`, Intlayer מגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור TanStack Start">

Intlayer מותאם במלואו עבור TanStack Start, ומספק **ניתוב רב-לשוני**, **ניהול עוגיות (cookies)**, **יצירת מפת אתר (sitemap)**, **טעינת תוכן דינמית**, ואת כל התכונות הנדרשות כדי להרחיב את מאמצי הבינאום (i18n) שלך.

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלך, טען רק את התוכן הנחוץ. Intlayer מסייע **להקטין את גדלי החבילה והדפים שלך בשיעור של עד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

הגדרת היקף (scoping) לתוכן האפליקציה שלך **מפשטת את התחזוקה** באפליקציות גדולות. תוכל לשכפל או למחוק תיקיית פיצ'ר בודדת מבלי לשאת בעומס המנטלי של סקירת כל קוד התוכן של הפרויקט. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלך.

</Accordion>
<Accordion header="סוכני AI">

מיקום תוכן בסמוך לרכיבים (co-locating) **מפחית את ההקשר (context) הדרוש** למודלי שפה גדולים (LLMs). Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית הפיתוח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמש באוטומציה כדי לתרגם בצינור ה-CI/CD שלך באמצעות ה-LLM המועדף עליך בעלות ספק ה-AI שלך. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) כדי לסייע ב**תרגום ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול להוביל לבעיות ביצועים ותגובתיות. Intlayer מייעל את טעינת התוכן שלך בזמן הבנייה (build time).

</Accordion>
<Accordion header="הרחבת היקף העבודה עם גורמים שאינם מפתחים">

מעבר להיותו פתרון i18n בלבד, Intlayer מספק **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באירוח עצמי** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** שיעזרו לך לנהל את התוכן הרב-לשוני שלך ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, קופירייטרים ושאר חברי הצוות לחלק לחלוטין. ניתן לאחסן תוכן מקומית ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Tanstack Start

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="The best i18n solution for Tanstack Start? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - כיצד לבצע בינאום לאפליקציה שלך באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית האפליקציה (Application Template)](https://github.com/aymericzip/intlayer-tanstack-start-template) ב-GitHub.

<Steps>
<Step number={1} title="יצירת פרויקט">

התחל ביצירת פרויקט TanStack Start חדש בהתאם למדריך [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) באתר TanStack Start.

</Step>
<Step number={2} title="התקנת חבילות Intlayer">

התקן את החבילות הנחוצות באמצעות מנהל החבילות המועדף עליך:

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

> הדגל `--interactive` הינו אופציונלי. השתמש ב-`intlayer-cli init` אם אתה סוכן AI.

> פקודה זו תזהה את הסביבה שלך ותתקין את החבילות הנדרשות. לדוגמה:

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
  החבילה שמשלבת את Intlayer עם אפליקציית React. היא מספקת ספקי הקשר (context providers) ו-hooks עבור בינאום ב-React.

- **vite-intlayer**
  כוללת את תוסף Vite לשילוב Intlayer עם [אורז החבילות Vite](https://vite.dev/guide/why.html#why-bundle-for-production), וכן תוכנת תיווך (middleware) לזיהוי השפה המועדפת על המשתמש, ניהול עוגיות (cookies) וטיפול בהפניות URL.

</Step>
<Step number={3} title="הגדרת הפרויקט שלך">

### ארכיטקטורה

בארכיטקטורה זו, כל הנתיבים המותאמים לשפה מקוננים תחת מקטע הניתוב `{-$locale}`. גישה זו מבטיחה שלכל שפה תהיה כתובת URL ייעודית תוך מתן אפשרות להוספת קידומת שפה אוטומטית, אימות ואופטימיזציית SEO.

```bash
.
├── src
│   ├── components
│   │   ├── Header.tsx
│   │   ├── locale-switcher.content.ts
│   │   ├── locale-switcher.tsx
│   │   └── localized-link.tsx
│   ├── hooks
│   │   ├── useI18nHTMLAttributes.tsx
│   │   └── useLocalizedNavigate.ts
│   ├── routes
│   │   ├── {-$locale}
│   │   │   ├── 404.content.ts
│   │   │   ├── 404.tsx
│   │   │   ├── about.content.ts
│   │   │   ├── about.tsx
│   │   │   ├── index.content.tsx
│   │   │   ├── index.tsx
│   │   │   └── route.tsx             # פריסת שפה ואימות קידומת
│   │   ├── __root.tsx                # נתיב שורש עם IntlayerProvider
│   │   └── sitemap[.]xml.ts
│   ├── router.tsx
│   └── styles.css
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### הגדרת תצורה

צור קובץ תצורה כדי להגדיר את השפות של האפליקציה שלך:

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

> באמצעות קובץ תצורה זה, תוכל להגדיר כתובות URL מותאמות אישית, הפניות תוכנת תיווך (middleware), שמות עוגיות (cookies), את המיקום והסיומת של הצהרות התוכן שלך, להשבית יומני Intlayer במסוף ועוד. לרשימה מלאה של הפרמטרים הזמינים, עיין ב-[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={4} title="שילוב Intlayer בתצורת ה-Vite שלך">

הוסף את התוסף של intlayer לתצורה שלך:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
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
    viteReact(),
  ],
});

export default config;
```

> התוסף `intlayer()` ל-Vite משמש לשילוב Intlayer עם Vite. הוא מבטיח את בניית קובצי הצהרת התוכן ועוקב אחריהם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={5} title="יצירת פריסת שורש (Root Layout)">

הגדר את פריסת השורש שלך כך שתתמוך בבינאום באמצעות `useParams` כדי לזהות את השפה הנוכחית והגדרת התכונות `lang` ו-`dir` בתגית ה-`html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={6} title="יצירת פריסת שפה (Locale Layout)">

צור פריסה שמטפלת בקידומת השפה ומבצעת אימות.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
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
      });
    }
  },
  component: Outlet,
});
```

> כאן, `{-$locale}` הוא פרמטר ניתוב דינמי המוחלף בשפה הנוכחית. סימון זה הופך את המקטע לאופציונלי, ומאפשר לו לפעול עם מצבי ניתוב כגון `'prefix-no-default'` וכו'.

> שים לב שמקטע זה עלול לגרום לבעיות אם אתה משתמש במספר מקטעים דינמיים באותו נתיב (למשל, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> עבור מצב `'prefix-all'`, ייתכן שתעדיף להחליף את המקטע ל-`$locale` במקום זאת.
> עבור מצב `'no-prefix'` או `'search-params'`, תוכל להסיר את המקטע לחלוטין.

</Step>
<Step number={7} title="הצהרת התוכן שלך">

צור ונהל את הצהרות התוכן שלך כדי לאחסן תרגומים:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        he: "אודות",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        he: "דף הבית",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        he: "ברוכים הבאים ל-Intlayer + TanStack Router",
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        he: "זוהי דוגמה לשימוש ב-Intlayer עם TanStack Router",
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> ניתן להגדיר את הצהרות התוכן שלך בכל מקום באפליקציה כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `['.']`), ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיין ב-[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={8} title="יצירת רכיבים ו-Hooks מודעי-שפה">

צור רכיב `LocalizedLink` עבור ניווט מודע-שפה:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

לרכיב זה שתי מטרות:

- הסרת הקידומת המיותרת `{-$locale}` מכתובת ה-URL.
- הזרקת פרמטר השפה לכתובת ה-URL כדי להבטיח שהמשתמש יופנה ישירות לנתיב המתורגם.

לאחר מכן נוכל ליצור hook בשם `useLocalizedNavigate` עבור ניווט פרוגרמטי:

```tsx fileName="src/hooks/useLocalizedNavigate.ts"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import {
  LOCALE_ROUTE,
  type StripLocalePrefix,
} from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, params, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      ...rest,
      to: localizedTo,
      params: { locale: localePrefix, ...params } as any,
    });
  };

  return localizedNavigate;
};
```

</Step>
<Step number={9} title="שימוש ב-Intlayer בדפים שלך">

> השתמש ב-**`useIntlayer`** כברירת מחדל: זוהי הדרך המומלצת לקרוא תוכן בתוך רכיבים, והמהדר פותר אותו לשפה המרונדרת. פנה אל `getIntlayer` / `getIntlayerAsync` רק מחוץ לעץ של React: ב-`head` של נתיב, ב-loaders ובפונקציות שרת.

גש למילוני התוכן שלך ברחבי האפליקציה:

#### דף בית מותאם שפה

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.meta.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> אם ברצונך להשתמש בתוכן שלך במאפיין מסוג מחרוזת (`string`), כגון `alt`, `title`, `href`, `aria-label` וכו', תוכל להשתמש בערך הפונקציה, כמו:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> למידע נוסף על ה-hook `useIntlayer`, עיין ב-[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md).

- [תיעוד ה-Hook useIntlayer | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md)

</Step>
<Step number={10} title="יצירת רכיב בורר שפות (Locale Switcher)">

צור רכיב שיאפשר למשתמשים להחליף שפות:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* שפה - למשל FR */}
              {localeEl}
            </span>
            <span>
              {/* השפה בשפת המקור שלה - למשל Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* השפה בשפה הנוכחית - למשל Francés כאשר השפה הנוכחית מוגדרת כ-Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* השפה באנגלית - למשל French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> למידע נוסף על ה-hook `useLocale`, עיין ב-[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md).

- [תיעוד ה-Hook useLocale | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)

</Step>
<Step number={11} title="ניהול תכונות HTML">

כפי שראינו בשלב 5, תוכל לנהל את התכונות `lang` ו-`dir` של תגית ה-`html` באמצעות `useParams` ברכיב השורש שלך. זה מבטיח שהתכונות הנכונות יוגדרו הן בשרת והן בלקוח.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

</Step>
<Step number={12} title="הוספת תוכנת תיווך (Middleware)">

תוכל גם להשתמש ב-`intlayerProxy` כדי להוסיף ניתוב בצד השרת לאפליקציה שלך. תוסף זה יזהה אוטומטית את השפה הנוכחית על סמך כתובת ה-URL ויגדיר את עוגיית השפה המתאימה. אם לא צוינה שפה, התוסף יקבע את השפה המתאימה ביותר על סמך העדפות שפת הדפדפן של המשתמש. אם לא זוהתה שפה, הוא יפנה לשפת ברירת המחדל.

> שים לב שכדי להשתמש ב-`intlayerProxy` בסביבת ייצור, עליך להעביר את החבילה `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מגרסה Intlayer v9, `intlayerProxy()` ארוז ישירות בתוך התוסף `intlayer()` ומופעל כברירת מחדל באמצעות האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הינו אופציונלי כעת: הוא נשמר לתאימות לאחור ולהגדרות הדורשות שליטה בסדר התוספים. הגדר `routing.enableProxy: false` כדי לבטל זאת. עיין ב-[הערות שחרור v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות שחרור v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
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
    viteReact(),
  ],
});
```

</Step>
<Step number={13} title="בינאום של מטא-נתונים (Metadata)">

<Tabs>

<Tab label="פתרון סטטי (Static resolution)" value="static">

`getIntlayer` נפתר באופן סינכרוני מול המילון ה**ממוזג (merged)**, זה שמחזיק בכל שפה שהוצהרה. ה-`head` נשאר סינכרוני ושום דבר אינו מומתן (awaited), אך כל המילון הרב-לשוני נמשך לתוך מקטע הנתיב הנשלח לדפדפן.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // הנתיב עבור ניתוב זה

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

        // x-default: עבור משתמשים בשפות ללא התאמה
        // הגדרת שפת ברירת המחדל (בדרך כלל השפה הראשית שלך)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.meta.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

הכי מתאים עבור מילוני מטא-נתונים קטנים, מספר מצומצם של שפות, או במהלך יצירת אב-טיפוס.

</Tab>

<Tab label="פתרון דינמי (Dynamic resolution)" value="dynamic">

`getIntlayerAsync` (זמין החל מ-**v9.4**) מתנהג כמו `getIntlayer`, אך תוסף הבנייה מפנה אותו אל מקטע ספציפי לשפה ב-`.intlayer/dynamic_dictionaries/` במקום למילון הממוזג. דף מסוים שולח לפיכך רק את השפה שהוא מרנדר. מכיוון שמקטע זה נטען לפי דרישה, פונקציית `head` הופכת ל-`async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // הנתיב עבור ניתוב זה

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

        // x-default: עבור משתמשים בשפות ללא התאמה
        // הגדרת שפת ברירת המחדל (בדרך כלל השפה הראשית שלך)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.meta.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> אם `head` קורא מספר מילונים, פתור אותם באמצעות `Promise.all`: המתנה (await) לכל `getIntlayerAsync` בשורה נפרדת משרשרת את הבקשות במקום להריץ אותן במקביל.

הפשרה: הייבוא הדינמי נפתר בזמן ש-`head` פועל, בנתיב הקריטי של רינדור המסמך. בנתיב קר (cold route) הדבר מעכב את ה-head במספר מילי-שניות ועלול לפגוע במעט ב-**LCP**.

</Tab>

<Tab label="פתרון דינמי עם שמירה במטמון (Cached dynamic resolution)" value="cached">

פתור את המילון ב-`loader` של הנתיב וקרא אותו בחזרה מ-`loaderData` בתוך `head`. ה-loaders של הנתיבים התואמים רצים במקביל, ו-`staleTime: Infinity` מודיע ל-TanStack Router שהתוצאה לעולם אינה מתיישנת, כך שמקטע השפה הספציפי נפתר פעם אחת ומוגש ממטמון הנתב לאחר מכן, תוך השארת `head` סינכרוני.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // נפתר במקביל לנתיבים תואמים אחרים, מחוץ לנתיב הקריטי של ה-head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // המילון לעולם אינו משתנה עבור שפה נתונה: פתור את המקטע פעם אחת
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // הנתיב עבור ניתוב זה

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

        // x-default: עבור משתמשים בשפות ללא התאמה
        // הגדרת שפת ברירת המחדל (בדרך כלל השפה הראשית שלך)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.meta.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` עשוי להיקרא לפני שה-loader מסתיים, כך ש-`loaderData` מוגדר בטיפוסיות ככזה שעשוי להיות `undefined`. שמור על שרשור אופציונלי (optional chaining), או החזר כותרת גיבוי (fallback title).

אתה נהנה ממקטע ייעודי לשפה מבלי לשלם את מחירו בנתיב הקריטי של ה-head. המחיר הוא בחוויית הפיתוח: יש להעביר את התוכן במפורש מה-loader אל ה-`head` באמצעות `loaderData`.

</Tab>

</Tabs>

### באיזה פתרון כדאי לבחור?

|              | פתרון סטטי     | פתרון דינמי                | פתרון דינמי עם שמירה במטמון           |
| ------------ | -------------- | -------------------------- | ------------------------------------- |
| API          | `getIntlayer`  | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` ב-`loader` (v9.4+) |
| חתימת `head` | סינכרונית      | `async`                    | סינכרונית, קוראת `loaderData`         |
| שפות שנשלחות | כל שפה שהוצהרה | השפה המבוקשת בלבד          | השפה המבוקשת בלבד                     |
| ניווט לקוח   | אין מה לפתור   | כניסה מחדש בכל התאמה       | מוגש ממטמון הנתב                      |
| חוויית פיתוח | הפשוטה ביותר   | `await` אחד                | התוכן מועבר דרך `loaderData`          |

</Step>
<Step number={14} title="אחזור השפה ב-Server Actions שלך">

ייתכן שתרצה לגשת לשפה הנוכחית מתוך ה-server actions או נקודות הקצה של ה-API שלך.
תוכל לעשות זאת באמצעות עוזר `getLocale` מ-`intlayer`.

להלן דוגמה המשתמשת בפונקציות השרת של TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // קבלת העוגייה מהבקשה (ברירת מחדל: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // קבלת הכותרת מהבקשה (ברירת מחדל: 'x-intlayer-locale')
    // גיבוי באמצעות משא ומתן Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // אחזור תוכן באמצעות getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>
<Step number={15} title="ניהול דפי לא נמצא (404)">

כאשר משתמש מבקר בדף שאינו קיים, תוכל להציג דף "לא נמצא" מותאם אישית, וקידומת השפה עשויה להשפיע על האופן שבו מופעל דף ה-404.

#### הבנת הטיפול ב-404 של TanStack Router עם קידומות שפה

ב-TanStack Router, טיפול בדפי 404 עם נתיבים מותאמי שפה דורש גישה רב-שכבתית:

1. **נתיב 404 ייעודי**: נתיב ספציפי להצגת ממשק המשתמש של 404
2. **אימות ברמת הנתיב**: מאמת קידומות שפה ומפנה קידומות שאינן חוקיות ל-404
3. **נתיב תופס-כל (Catch-all route)**: לוכד כל נתיב ללא התאמה בתוך מקטע השפה

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// פעולה זו יוצרת נתיב ייעודי /[locale]/404
// הוא משמש הן כנתיב ישיר והן מיובא כרכיב בקבצים אחרים
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// מיוצא בנפרד כדי שניתן יהיה לעשות בו שימוש חוזר ב-notFoundComponent ובנתיבי תופס-כל
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // לפני טעינה רץ לפני רינדור הנתיב (הן בשרת והן בלקוח)
  // זהו המקום האידיאלי לאימות קידומת השפה
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix בודק האם השפה תקינה לפי תצורת intlayer שלך
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // קידומת שפה לא חוקית - הפניה לדף 404 עם קידומת שפה תקינה
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent נקרא כאשר נתיב צאצא אינו קיים
  // למשל, /en/non-existent-page מפעיל זאת בתוך פריסת /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// הנתיב $ (splat/catch-all) תואם לכל נתיב שאינו תואם לנתיבים אחרים
// למשל, /en/some/deeply/nested/invalid/path
// זה מבטיח שכל הנתיבים ללא התאמה בתוך שפה יציגו את דף ה-404
// ללא זה, נתיבים עמוקים ללא התאמה עלולים להציג דף ריק או שגיאה
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>
<Step number={16} title="חילוץ התוכן של הרכיבים שלך" isOptional={true}>

אם יש לך בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציע [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) כדי להמיר את הרכיבים שלך ולחלץ את התוכן.

- [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

להגדרה, תוכל להוסיף מקטע `compiler` בקובץ `intlayer.config.ts` שלך:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... שאר התצורה שלך
  compiler: {
    /**
     * מציין אם המהדר צריך להיות מופעל.
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * מציין אם יש לשמור את הרכיבים לאחר המרתם.
     *
     * - אם `true`, המהדר יכתוב מחדש את קובץ הרכיב בדיסק. כך שההמרה תהיה קבועה, והמהדר ידלג על ההמרה בתהליך הבא. בדרך זו, המהדר יכול להמיר את האפליקציה, ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד הבסיסי ללא שינוי. ההמרה תתבצע רק בזיכרון.
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
 <Tab value='Extract command'>

הפעל את המחלץ כדי להמיר את הרכיבים שלך ולחלץ את התוכן:

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

> החל מ-v9, ה-`intlayerCompiler` כלול בתוסף `intlayer`. לכן אין צורך להוסיף אותו ידנית.

 </Tab>
 <Tab value='intlayer < 9'>

עדכן את ה-`vite.config.ts` שלך כך שיכלול את התוסף `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // מוסיף את תוסף המהדר
  ],
});
```

 </Tab>
 </Tabs>

בנה את האפליקציה שלך כדי להמיר את הרכיבים שלך ולחלץ את התוכן:

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

Intlayer מגיע עם מחולל מפת אתר מובנה שיעזור לך ליצור מפת אתר עבור האפליקציה שלך בקלות. הוא מטפל בנתיבים מותאמי שפה ומוסיף את המטא-נתונים הדרושים למנועי חיפוש.

> מפת האתר שנוצרת על ידי Intlayer תומכת במרחב השמות `xhtml:link` (הרחבות Hreflang XML). בניגוד למחוללי מפת אתר ברירת מחדל המפרטים רק כתובות URL גולמיות, Intlayer יוצר באופן אוטומטי את הקישורים הדו-כיווניים הנדרשים בין כל גרסאות השפה של דף (למשל, `/about`, `/about?lang=fr`, ו-`/about?lang=es`). זה מבטיח שמנועי חיפוש יאנדקסו ויגישו נכון את גרסת השפה המתאימה לקהל היעד הנכון.

כדי להשתמש בו, ראשית עליך להגדיר את ה-`vite.config.ts` שלך כדי לאפשר רינדור מוקדם עבור הנתיבים המותאמים לשפה שלך ולהשבית את יצירת מפת האתר המוגדרת כברירת מחדל ב-TanStack Start.

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
// ... ייבואים נוספים

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
      // ... הגדרות תצורה נוספות
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

לאחר מכן, צור נתיב `src/routes/sitemap[.]xml.ts` המשתמש בפונקציה `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

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

Intlayer משתמש בהרחבת מודולים (module augmentation) כדי להפיק תועלת מ-TypeScript ולהפוך את בסיס הקוד שלך לחזק יותר.

ודא שתצורת ה-TypeScript שלך כוללת את הטיפוסים שנוצרו אוטומטית:

```json5 fileName="tsconfig.json"
{
  // ... התצורות הקיימות שלך
  include: [
    // ... ה-includes הקיימים שלך
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

</Step>

</Steps>

### תצורת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. זה מאפשר לך להימנע מביצוע commit שלהם למאגר ה-Git שלך.

לשם כך, תוכל להוסיף את ההוראות הבאות לקובץ ה-`.gitignore` שלך:

```plaintext fileName=".gitignore"
# התעלמות מהקבצים שנוצרו על ידי Intlayer
.intlayer
```

## הרחבת VS Code

כדי לשפר את חוויית הפיתוח שלך עם Intlayer, תוכל להתקין את **הרחבת Intlayer הרשמית ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בהרחבה, עיין ב-[תיעוד הרחבת Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

## להעמיק יותר

כדי להעמיק, תוכל ליישם את ה-[עורך הוויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלך החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## הפניות לתיעוד

- [תיעוד Intlayer](https://intlayer.org)
- [תיעוד Tanstack Start](https://reactrouter.com/)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)
- [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)
- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית TanStack Start?">

TanStack Start אינה מגיעה עם שכבת i18n משלה, ולכן הבחירה היא ספרייה:

- **`i18next` / `react-i18next`** ו-**`react-intl`**: קטלוגי הודעות בלתי תלויים במסגרת, המחוברים ידנית לנתב.
- **`Lingui`**: הודעות ICU עם שלב הידור.
- **`Paraglide`**: הודעות מהודרות, המתמקדות בשכבת ההודעות בלבד.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלך ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)) ומהודר בזמן בנייה, עם מפתחות בעלי טיפוסיות, ניתוב מודע-שפה, יצירת מפת אתר, תרגום באמצעות AI, עורך ויזואלי ו-CMS.

ההבדל החשוב ב-TanStack Start הוא הניתוב ורינדור השרת. Intlayer משתלב עם הנתב המבוסס על קבצים, פונקציית ה-`head` ושלב הרינדור המוקדם, במקום להשאיר אותך להרכיב ספק (provider), גלאי שפה ומפת אתר באופן ידני. ראה [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) ואת [מבחן הביצועים של TanStack Start i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [מבחן ביצועים של TanStack Start i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

</Question>
<Question title="בכמה i18n מגדיל את גודל החבילה (bundle size) של TanStack Start?">

הרבה פחות מהגדרה מבוססת מרחבי שמות (namespaces), מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. סימון שמרונדר בשרת פותר את תוכנו בשרת, והמהדר בזמן הבנייה מחליף קריאות `useIntlayer` בערכי המילון המדויקים שבהם הרכיב משתמש, כך שמפתחות שאינם בשימוש ושפות שאינן בשימוש מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות המקובלות, Intlayer מקטין את גודל החבילה והדף בשיעור של עד 50%. ראה [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)

</Question>
<Question title="האם ניתן להגר מ-react-i18next או react-intl מבלי לשכתב את הרכיבים שלי?">

כן, ויש שני נתיבים. תוכל להגר את התוכן בהדרגה באמצעות [מדריך ההגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md) או [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md). לחלופין, תוכל לשמור על ה-API הנוכחי שלך במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושפים בדיוק את אותו ה-API כמו `react-i18next`, `react-intl` ו-`i18next`, אך מוגשים על ידי מילוני Intlayer, כך שרק הייבואים משתנים וקוד הרכיבים נותר בעינו.

- [מדריך הגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md)
- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="האם אוכל לשמור על קובצי התרגום הקיימים שלי ב-JSON?">

כן. ה-[תוסף לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלך כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לך לפצל תוכן לפי שפה במקום לקבץ שפות בקובץ אחד.

- [תוסף לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עלי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הפעל את `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלך, ישלוף את המחרוזות הפונות למשתמש ויכתוב קובץ `.content` לצד כל רכיב, כך שתוכל לסקור שינויים (diff) במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 16 במדריך זה מפרט זאת.

עבור תהליך אוטומטי לחלוטין, [מהדר Intlayer (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) עושה את אותו הדבר בזמן הבנייה: הוא סורק את קוד ה-JSX, TSX, Vue ו-Svelte שלך בכל שינוי, מייצר את המילונים ושומר עליהם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין כלל צורך לתחזק מפתחות באופן ידני.

- [מהדר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

ראוי להכיר שתי מגבלות לפני הפעלת המהדר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נותרות מחוץ להישג ידו. כמו כן, עליו להבדיל בין טקסט הפונה למשתמש לבין לוגיקת אפליקציה כמו `className="active"` או קוד סטטוס, מה שמצריך מעט ביאורים (annotations) בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אותך בתמונה.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עורך וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מכרטיסיית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל ההפניות (find all references), תצוגה מקדימה בריחוף של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שעוזר במהלך ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר יענה מתוך תיעוד עדכני במקום לנחש, ויוכל להריץ פקודות כמו `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת אחד לכל סביבת עבודה, שמלמדים סוכן את הגדרות הניתוב שלך ואת טיפוסי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם Intlayer תומך ברינדור צד שרת (SSR) ורינדור מוקדם ב-TanStack Start?">

כן. תוכן נפתר במהלך SSR, והמדריך מכסה את תצורת הרינדור המוקדם (pre-render) הפולטת מסמך סטטי אחד לכל נתיב מותאם שפה. שלב 17 מראה כיצד להפעיל `prerender` ב-`vite.config.ts` ולהפיק מפת אתר מותאמת שפה מאותה טבלת ניתוב.

</Question>
<Question title="כיצד אוכל להוסיף תגיות hreflang ומפת אתר מותאמת שפה?">

השתמש בפונקציה המובנית `generateSitemap` בנתיב `src/routes/sitemap[.]xml.ts`. שלא כמו רשימת כתובות URL פשוטה, היא פולטת את מרחב השמות `xhtml:link`, כך שכל גרסת שפה של דף מקשרת באופן דו-כיווני לאחרות ומנועי חיפוש מאנדקסים את הגרסה הנכונה עבור כל קהל יעד. מטא-נתונים מותאמים אישית ב-`head` מכוסים בשלב 13.

</Question>
<Question title="האם עלי לכלול את השפה בכתובת ה-URL?">

לא. `routing.mode` שולט במבנה ה-URL: `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`), `"prefix-all"` (`/en/about`), `"no-prefix"` (נפתר מעוגייה, כותרת או דומיין) או `"search-params"` (`/about?locale=fr`). ניתן גם למפות שפות לדומיינים נפרדים באמצעות `routing.domains`. ראה [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד אוכל לבנות בורר שפות ששומר על הנתיב הנוכחי?">

השתמש ב-`useLocale` יחד עם רכיב הקישור המותאם לשפה המתואר בשלב 10. `useLocale` חושף את השפה הפעילה, השפות הזמינות ופונקציית עדכון ששומרת את הבחירה, בעוד ש-`getLocalizedUrl` משכתב את הנתיב הנוכחי לשפת היעד כך שהמשתמש נשאר באותו הדף במקום לנחות בדף הבית.

</Question>
<Question title="כיצד עלי לטפל בדפי 404 בנתיבים מותאמי שפה?">

שלב 15 מכסה זאת. `validatePrefix` מדווח לך האם מקטע השפה של כתובת ה-URL הוא שפה שהוצהרה, כך ש-`/xx/about` מחזיר שגיאת 404 אמיתית במקום להתייחס אליו כנתיב רגיל. ללא זאת, קידומת לא ידועה נפתרת באופן שקט ומנועי חיפוש מאנדקסים דף כפול.

</Question>
<Question title="כיצד אוכל לתרגם אפליקציית TanStack Start באופן אוטומטי באמצעות AI?">

הפעל `npx intlayer fill`. ה-CLI מאתר תרגומים חסרים וממלא אותם באמצעות ה-LLM שתבחר, תוך שימוש בספק ובמפתח ה-API שלך. הוסף `--git-diff` כדי לתרגם רק את התוכן שהשתנה בענף הנוכחי, מה ששומר על עלויות הרצת ה-CI נמוכות. ראה [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו-[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בצורות רבים, מגדר וטקסט עשיר?">

כן. הצהרות תוכן תומכות ב-[צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [שיבוץ (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md) ו-[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) עבור טקסט ארוך, עם [מעצבי תבניות (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [שיבוץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבי תבניות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות ה-[עורך הוויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על גבי התשתית שלך ומאפשר לכל אדם לערוך טקסט ישירות באתר החי, או ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), אשר מחצין תוכן כך שהוא יכול להשתנות ללא צורך בפריסה (deployment).

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="מהי העלות של העורך הוויזואלי? האם זה מכביד אם איני זקוק לו?">

ל-[עורך הוויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) יש **אפס עלות** על האפליקציה שלך אם אינו מוגדר. הלוגיקה הנוספת נטענת רק אם היא מופעלת במפורש ונחוצה.

- [עורך ויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

אם מופעל, העלות קלה ביותר (+5 KB, נטען דינמית רק בעת הפעלה) מכיוון שהלוגיקה העיקרית מטופלת על ידי עורך השרת ב-[app.intlayer.org](https://app.intlayer.org) או דרך חבילת `intlayer-editor`. אם אתה זקוק רק להגדרת תרגום פשוטה ללא עריכה ויזואלית, Intlayer אינו מוסיף שום תקורה לאפליקציה שלך.

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המארח הוא שירות אופציונלי בתשלום שניתן גם ל-[אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
