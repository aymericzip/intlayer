---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - מדריך מלא לתרגום אפליקציית Next.js שלכם על Vite"
description: "הגדירו את Intlayer עם vinext, ה-API של Next.js על גבי Vite: ניתוב לפי שפה עם proxy.ts, Server ו-Client Components, מטא-דאטה מתורגמת, sitemap ופריסה ל-Cloudflare Workers."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגמו את אתר ה-vinext שלכם באמצעות Intlayer

[vinext](https://github.com/cloudflare/vinext) מממש מחדש את ה-API של Next.js מעל Vite. תיקיית `app/`, ייבואי `next/*` והקובץ `proxy.ts` ממשיכים לעבוד, אבל הבנייה רצה דרך Vite ולא דרך Turbopack או webpack.

Intlayer משתלב בהגדרה הזו בשתי חבילות: `next-intlayer` עבור ה-hooks, ה-providers וה-proxy שהקומפוננטות שלכם כבר משתמשות בהם ב-Next.js, ו-`vite-intlayer` עבור צד הבנייה (קומפילציה של מילונים, מעקב ואופטימיזציה של ה-bundle).

> מריצים Next.js עם ה-toolchain שלו? עקבו במקום זאת אחרי [המדריך ל-Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).

- [המדריך ל-Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

## תוכן עניינים

<TOC/>

## למה Intlayer ולא חלופות אחרות?

בהשוואה לפתרונות כמו `next-intl` או `i18next`, Intlayer מגיע עם אופטימיזציות מובנות:

<AccordionGroup>
<Accordion header="נבנה עבור ה-API של Next.js, על Vite">

אותו קוד `next-intlayer` רץ ב-Next.js וב-vinext. Server Components מפענחים תוכן בשרת, Client Components קוראים אותו דרך ה-provider, וניתוב השפות רץ מתוך `proxy.ts` שלכם. מעבר בין שני ה-toolchains לא נוגע בקומפוננטות שלכם.

</Accordion>
<Accordion header="גודל ה-bundle">

במקום לטעון קבצי JSON ענקיים לדפים שלכם, טוענים רק את התוכן הנדרש. תוסף ה-Vite מחליף כל קריאה ל-`useIntlayer` בערכים שהקומפוננטה באמת משתמשת בהם, וכך **מקטין את גודל ה-bundle והדפים בעד 50%**.

</Accordion>
<Accordion header="קלות תחזוקה">

חלוקת התוכן לפי קומפוננטה **מפשטת את התחזוקה** של אפליקציות גדולות. אפשר לשכפל או למחוק תיקיית פיצ'ר בלי לעבור על כל בסיס הקוד של התוכן, ו-Intlayer **מוקלד במלואו** כדי לשמור על דיוק התוכן.

</Accordion>
<Accordion header="סוכן AI">

שמירת התוכן ליד הקומפוננטה **מקטינה את ההקשר הנדרש** ל-LLMs. Intlayer מגיע עם **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

תרגמו בצינור ה-CI/CD שלכם עם ה-LLM לפי בחירתכם, על חשבון ספק ה-AI שלכם. Intlayer מציע גם **קומפיילר** לאוטומציה של חילוץ תוכן, ו[פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) ל**תרגום ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="התרחבות עם מי שאינם מפתחים">

Intlayer מספק **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) לאירוח עצמי** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** לניהול תוכן רב-לשוני ב**זמן אמת** עם מתרגמים וקופירייטרים. אפשר לאחסן את התוכן מקומית ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית vinext

<Steps>
<Step number={1} title="התקנת התלויות">

התחילו מפרויקט vinext שעובד. כדי ליצור כזה, הריצו `npm create vinext-app@latest`. כדי להעביר אפליקציית Next.js קיימת, הריצו `npx vinext init`.

לאחר מכן התקינו את Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  החבילה המרכזית שמספקת את כלי הבינאום: ניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **next-intlayer**

  מספק את ה-providers, ה-hooks וה-proxy עבור ה-API של Next.js. vinext מפנה את `next/navigation`, `next/headers` ו-`next/server` למימושים משלו, ולכן `next-intlayer` עובד ללא שינוי.

- **vite-intlayer**

  תוסף ה-Vite שבונה את הצהרות התוכן שלכם, עוקב אחריהן בפיתוח ומבצע אופטימיזציה למילונים ב-bundle של הפרודקשן. הוא מחליף את תוסף Next.js בשם `withIntlayer()`, ש-vinext אינו מריץ.

</Step>
<Step number={2} title="הגדרת הפרויקט">

בחרו אם האפליקציה תשתמש בנתיבי URL מתורגמים (למשל `/en/about`, `/fr/about`) או תגיש תוכן בלי מקטע שפה בנתיב (למשל `/about`, כשהשפה מזוהה לפי cookies, כותרות או פרמטרי שאילתה).

<Tabs group="routing-mode">
<Tab label="עם נתיב שפה" value="with-locale-path">

### ארכיטקטורה

כל הדפים המתורגמים מקוננים תחת המקטע הדינמי `[locale]`. זה מומלץ ל-SEO ולרינדור סטטי, משום שלכל שפה יש כתובת URL משלה:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### תצורה

צרו קובץ `intlayer.config.ts` כדי להצהיר על השפות הנתמכות:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="בלי נתיב שפה" value="without-locale-path">

### ארכיטקטורה

הנתיבים אינם כוללים מקטע `[locale]`. כל הדפים נמצאים ישירות תחת `src/app/`, והשפה מגיעה מ-cookies, מכותרות או מפרמטרי שאילתה. זה מתאים ללוחות בקרה ולאפליקציות עם אימות:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### תצורה

הגדירו את `routing.mode` ל-`"search-params"` (למשל `/about?locale=fr`) או ל-`"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> הקובץ הזה קובע גם את הפניית ה-proxy, שמות ה-cookies, המיקום והסיומת של הצהרות התוכן, לוגים ועוד. ראו את [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) לרשימה המלאה.

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בתצורת Vite שלכם">

הוסיפו את התוסף `intlayer()` ליד `vinext()` בקובץ `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> התוסף `intlayer()` בונה את המילונים שלכם לפני תחילת הבנייה, עוקב אחרי קבצי התוכן בפיתוח, ומגדיר את ה-aliases והאופטימיזציות ש-`next-intlayer` משתמש בהם בסביבות RSC, SSR והלקוח.

> `intlayer()` מגיע גם עם middleware לניתוב שפות עבור שרת הפיתוח של Vite. ב-vinext, הקובץ `src/proxy.ts` כבר עושה את העבודה הזו, בפיתוח וב-runtime של הפרודקשן, ולכן האפשרות `ignore` מכבה את זה של Vite כדי לא לנתב כל בקשה פעמיים.

> אל תשתמשו ב-`withIntlayer()` בקובץ `next.config.ts`. vinext קורא את `next.config.ts` עבור אפשרויות כמו `redirects`, `rewrites` ו-`headers`, אך אינו מריץ תוספי webpack או Turbopack.

אם אתם פורסים ל-Cloudflare Workers, שמרו על התוסף `cloudflare()` ש-`vinext init` יצר:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="הגדרת נתיבי שפה דינמיים">

<Tabs group="routing-mode">
<Tab label="עם נתיב שפה" value="with-locale-path">

הסירו את כל התוכן מ-`RootLayout` והחליפו אותו בקוד הבא:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> השארת `RootLayout` ריק מאפשרת ל-layout של השפה להגדיר את התכונות [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) ו-[`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) על התג `<html>`.

הוסיפו layout בתיקיית `[locale]` שלכם:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> `IntlayerProvider` אחד מכסה את שני חצאי העץ: הוא מספק את השפה ל-Server Components ומרכיב את ה-provider של הלקוח כך ש-Client Components מקבלים את אותה שפה.

> המקטע `[locale]` מחזיק את השפה: `/en-US/about` מפוענח ל-`en-US`, ו-`/fr/about` ל-`fr`. הקובץ הקודם `src/app/page.tsx` כבר אינו בשימוש וניתן להסירו. ה-proxy (שלב 7) מגיש את שפת ברירת המחדל בשורש.

> `generateStaticParams` גורם ל-vinext לבצע prerender לכל דף עבור כל שפה. vinext גם אוכף את `dynamicParams`, ולכן שפה לא מוכרת מחזירה 404 כשמגדירים `export const dynamicParams = false`.

</Tab>
<Tab label="בלי נתיב שפה" value="without-locale-path">

אין תיקיית `[locale]`. הגדירו את `src/app/layout.tsx` כך שיקרא את השפה מהבקשה ויעטוף את האפליקציה ב-`IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="הצהרה על התוכן שלכם">

צרו הצהרות תוכן כדי לאחסן את התרגומים:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        "he-IL": "התחילו בעריכה של",
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
      "main": {
        "nodeType": "translation",
        "translation": {
          "he-IL": "התחילו בעריכה של",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> הצהרות תוכן יכולות להימצא בכל מקום בתוך התיקייה `contentDir` (כברירת מחדל `./src`), כל עוד הן תואמות לסיומת של הצהרות תוכן (כברירת מחדל `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים ראו את [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={6} title="שימוש בתוכן בקוד שלכם">

גשו למילונים שלכם מכל קומפוננטה:

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

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` הוא איזומורפי: תנאי הייצוא `react-server`, ש-vinext מחיל על סביבת ה-RSC שלו, נותן ל-Server Components את המימוש של השרת, בעוד Client Components מקבלים את המימוש מבוסס ה-context. אותה קריאה עובדת בשני הצדדים.

> כדי להשתמש בתוכן בתכונה מסוג `string`, כמו `alt`, `title`, `href` או `aria-label`, קראו את הערך שלו:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> למידע נוסף ראו את [תיעוד `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/useIntlayer.md).

- [תיעוד `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/useIntlayer.md)

> אם האפליקציה שלכם כבר קיימת, [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) ו[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) הופכים אלפי קומפוננטות בשנייה.

- [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Step>
<Step number={7} title="הגדרת ה-proxy לזיהוי שפה">

vinext מריץ את `proxy.ts` (ואת `middleware.ts`) כמו Next.js 16, בפיתוח ובפרודקשן, כולל ב-Cloudflare Workers. ייצאו את ה-proxy של Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` מזהה את השפה המועדפת של המשתמש, מפנה לכתובת המתאימה לפי [התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) ושומר את השפה ב-cookie. הוא גם מעביר את השפה ל-`getLocale()` ול-hooks של השרת, ולכן שמרו אותו גם בארכיטקטורה בלי נתיב שפה.

- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

> כדי לשרשר כמה proxies (למשל `intlayerProxy` עם אימות), השתמשו ב-`multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="בינאום המטא-דאטה שלכם" isOptional={true}>

vinext תומך ב-Metadata API. השתמשו ב-`generateMetadata` יחד עם `getIntlayer` כדי לתרגם את המטא-דאטה של הדפים:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      "he-IL": "אפליקציית ה-vinext שלי",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      "he-IL": "אפליקציית Next.js שרצה על Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
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

// ... Rest of the code
````

> הפונקציה `getIntlayer` המיובאת מ-`intlayer` מחזירה ערכים גולמיים, מוכנים לאובייקט המטא-דאטה. זו של `next-intlayer` עוטפת אותם עבור העורך הוויזואלי.

</Step>
<Step number={9} title="בינאום ה-sitemap.xml וה-robots.txt שלכם" isOptional={true}>

`sitemap.ts` ו-`robots.ts` עובדים כמו ב-Next.js. השתמשו ב-`getMultilingualUrls` כדי לרשום כל כתובת URL מתורגמת:

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

</Step>
<Step number={10} title="שינוי שפת התוכן" isOptional={true}>

השתמשו ב-`next/link` כדי לנווט לדף המתורגם. vinext שומר על ניווט בצד הלקוח ועל prefetching, ולכן המעבר מתבצע בלי רענון מלא:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> הפניות לתיעוד:
>
> - [ה-hook ‏`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/useLocale.md)
> - [הפונקציה `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocaleName.md)
> - [הפונקציה `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)
> - [הפונקציה `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="יצירת קומפוננטת קישור מתורגמת" isOptional={true}>

קומפוננטת `Link` מותאמת אישית מוסיפה את השפה הנוכחית כקידומת לכתובות URL פנימיות, כך שמשתמש צרפתי שלוחץ על `/about` מגיע ל-`/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="קבלת השפה הנוכחית ב-Server Actions" isOptional={true}>

קראו ל-`getLocale` מתוך `next-intlayer/server` בתוך Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` קורא את השפה שה-proxy הגדיר בכותרות הבקשה, אחר כך את ה-cookie של השפה, אחר כך את הכותרת `Accept-Language` של הדפדפן, וחוזר לשפת ברירת המחדל.

</Step>
<Step number={13} title="פריסה ל-Cloudflare Workers" isOptional={true}>

Intlayer מקמפל את המילונים לתוך ה-bundle בזמן הבנייה, ולכן שום דבר לא קורא את מערכת הקבצים בזמן ריצה והאפליקציה רצה כמו שהיא ב-workerd. בנו ופרסו באמצעות ה-CLI של vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> כדי לפרוס במקום אחר (Vercel, Netlify, AWS, Node.js), הוסיפו את תוסף ה-Vite בשם [Nitro](https://v3.nitro.build/) ליד `vinext()`, או הגדירו `output: "standalone"` ב-`next.config.ts`. ההגדרה של Intlayer לא משתנה.

</Step>
<Step number={14} title="חילוץ התוכן מהקומפוננטות שלכם" isOptional={true}>

בבסיס קוד קיים, Intlayer מספק [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) ו[מחלץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) להעברת מחרוזות שנכתבו ישירות בקוד להצהרות תוכן.

- [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

הפעילו את הקומפיילר ב-`intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

הריצו את המחלץ כדי להמיר את הקומפוננטות ולחלץ את התוכן:

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
 <Tab value='Vite compiler'>

תוסף ה-Vite ‏`intlayer()` כולל את הקומפיילר. לאחר שהגדרתם את `compiler.enabled`, הריצו את שרת הפיתוח או את הבנייה כרגיל:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### הגדרת TypeScript

Intlayer משתמש ב-module augmentation כדי להקליד את מפתחות התוכן והערכים שלכם.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

כללו את הטיפוסים שנוצרו בתצורת ה-TypeScript שלכם:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### תצורת Git

התעלמו מהקבצים ש-Intlayer מייצר:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### תוסף VS Code

התקינו את **[תוסף Intlayer ל-VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** הרשמי להשלמה אוטומטית של מפתחות, שגיאות תרגום חסר, תצוגות מקדימות בתוך השורה ופעולות מהירות. ראו את [תיעוד התוסף](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד התוסף](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### להמשך

הוסיפו את [העורך הוויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או הוציאו את התוכן החוצה עם ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהו vinext?">

vinext הוא תוסף Vite בקוד פתוח, בתחזוקת Cloudflare, שמממש מחדש את ה-API הציבורי של Next.js: App Router ו-Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlers ומודולי `next/*`. קוד ה-Next.js שלכם רץ על Vite, ונפרס באופן מובנה ל-Cloudflare Workers או לפלטפורמות אחרות דרך Nitro.

</Question>
<Question title="מה משתנה בהשוואה להגדרה של Next.js?">

רק שילוב הבנייה. ב-Next.js, `withIntlayer()` עוטף את `next.config.ts`. ב-vinext, תוסף `intlayer()` מ-`vite-intlayer` נכנס במקום זה ל-`vite.config.ts`. ה-providers, ה-hooks, `proxy.ts`, המטא-דאטה וקוד ה-sitemap נשארים זהים, ולכן אפשר לעקוב אחרי [המדריך ל-Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md) בכל מה שהדף הזה לא מכסה.

- [המדריך ל-Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

</Question>
<Question title="האם אני צריך את תצורת ה-i18n של Next.js או את תוסף ה-SWC?">

לא. השדה `i18n` ב-`next.config.ts` מכסה ב-vinext רק קידומות שפה של Pages Router, ו-Intlayer מבצע ניתוב משלו דרך `proxy.ts`. גם תוסף `@intlayer/swc` אינו נחוץ: תוסף ה-Vite כבר מחליף את הקריאות ל-`useIntlayer` כך שכל דף שולח רק את המילונים שהוא משתמש בהם. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md).

- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

</Question>
<Question title="האם אני צריך את `intlayer watch` בפיתוח?">

לא. תוסף ה-Vite ‏`intlayer()` מפעיל את מעקב התוכן יחד עם `vite dev`, ועריכת תוכן מעדכנת במהירות רק את הקומפוננטות שקוראות את המילון ששונה.

</Question>
<Question title="האם אפשר לעבור מ-`next-intl` או `i18next` בלי לכתוב מחדש את הקומפוננטות?">

כן. עקבו אחרי [מדריך המעבר מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-intl_to_intlayer.md) או [מדריך המעבר מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md), או שמרו על ה-API הנוכחי עם [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md), שחושפים את ה-API של `next-intl`, `react-i18next` ו-`react-intl` מעל מילוני Intlayer.

- [מדריך המעבר מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-intl_to_intlayer.md)
- [מדריך המעבר מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="האם חייבים לשים את השפה בכתובת ה-URL, כמו /fr/about?">

לא. `routing.mode` מקבל:

- `"prefix-no-default"` (ברירת מחדל): `/about` לשפת ברירת המחדל, `/fr/about` לשאר.
- `"prefix-all"`: לכל שפה יש קידומת, `/en/about` ו-`/fr/about`.
- `"no-prefix"`: אין שפה בנתיב, והיא נקבעת מ-cookie או מכותרת.
- `"search-params"`: `/about?locale=fr`.

ראו את [מדריך העזר לתצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) ואת הארכיטקטורה בלי נתיב שפה בשלב 2.

- [מדריך העזר לתצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="איך מתרגמים את האפליקציה אוטומטית עם AI?">

הריצו `npx intlayer fill`. ה-CLI מזהה תרגומים חסרים וממלא אותם עם ה-LLM לפי בחירתכם, באמצעות הספק ומפתח ה-API שלכם. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ואת [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="איך מאתרים תרגומים חסרים לפני שחרור?">

הריצו `npx intlayer test` ב-CI. הבנייה נכשלת כשחסר תוכן בשפה שהוצהרה. [תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md) מציג את אותן שגיאות בזמן ההקלדה, ו[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md) מסמן מחרוזות שנכתבו ישירות בקוד.

- [תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)
- [תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן. Intlayer הוא בקוד פתוח ברישיון Apache 2.0, והספרייה, ה-CLI, העורך הוויזואלי והקומפיילר חינמיים לשימוש, כולל שימוש מסחרי. ה-CMS המאוחסן הוא שירות בתשלום אופציונלי, וניתן גם [לאחסן אותו בעצמכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
