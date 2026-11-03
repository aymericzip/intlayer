---
createdAt: 2024-12-07
updatedAt: 2026-11-03
priority: 9
title: "Next.js Pages Router i18n: מדריך תרגום מלא"
description: "הגדירו את Intlayer ב-Next.js Pages Router: נתיבים מקומיים עם getStaticPaths, דפים ורכיבים מתורגמים, hreflang ו-sitemap."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Page Router
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 5.6.0
    date: 2025-07-06
    changes: "המרת הפונקציה `withIntlayer()` לפונקציה מבוססת Promise"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגמו את אתר ה-Next.js ו-Page Router שלכם באמצעות Intlayer

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `next-intl` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא של Next.js">

Intlayer מותאם לעבודה עם **Server Components** לרינדור יעיל ותואם באופן מלא ל-[**Turbopack**](https://nextjs.org/docs/architecture/turbopack). הוא אינו חוסם רינדור סטטי ומציע middleware לצד כל התכונות הנדרשות לבינאום (i18n) בהיקף נרחב.

> Intlayer תואם ל-Next.js 12, 13, 14, 15 ו-16. אם אתם משתמשים ב-Next.js Pages Router, תוכלו לעיין ב[מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_page_router.md).
> ניתוב לפי שפה (Locale routing) שימושי עבור SEO, גודל ה-bundle וביצועים. אם אינכם זקוקים לו, תוכלו לעיין ב[מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md).
> עבור Next.js 12, 13, 14 ו-15 עם App Router, עיינו ב[מדריך זה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_14.md).

- [Next.js Pages Router i18n: מדריך תרגום מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_page_router.md)
- [מדריך](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)
- [Next.js 14 i18n, מדריך מלא לתרגום האפליקציה שלכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_14.md)

</Accordion>
<Accordion header="גודל ה-Bundle">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו אך ורק את התוכן הנחוץ. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

הגדרת היקף (scoping) התוכן של האפליקציה שלכם **מפשטת את התחזוקה** של אפליקציות בקנה מידה גדול. תוכלו לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המחשבתי של סקירת כל בסיס קוד התוכן שלכם. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכן AI">

הצמדת התוכן (co-location) **מפחיתה את ההקשר (context) הדרוש** למודלי שפה גדולים (LLMs). בנוסף, Intlayer מגיע עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[כישורי סוכן (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה כדי לתרגם בצינור ה-CI/CD שלכם באמצעות ה-LLM לבחירתכם, בעלות ספק ה-AI שלכם. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול להוביל לבעיות ביצועים ותגובתיות. Intlayer ממטב את טעינת התוכן שלכם בזמן הבנייה (build time).

</Accordion>
<Accordion header="הרחבת היקף העבודה עם צוותים שאינם מפתחים">

יותר מסתם פתרון i18n,‏ Intlayer מספק **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי (self-hosted)** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** כדי לעזור לכם לנהל את התוכן הרב-לשוני שלכם **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק ופשוט. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Next.js המשתמשת ב-Page Router

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

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **next-intlayer**

  החבילה המשלבת את Intlayer עם Next.js. היא מספקת context providers ו-hooks עבור בינאום ב-Next.js. בנוסף, היא כוללת את הפלאגין של Next.js לשילוב Intlayer עם [Webpack](https://webpack.js.org/) או [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), כמו גם middleware לזיהוי השפה המועדפת על המשתמש, ניהול עוגיות וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

צרו קובץ תצורה כדי להגדיר את השפות הנתמכות על ידי האפליקציה שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // הוסיפו כאן את השפות הנוספות שלכם
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> באמצעות קובץ תצורה זה, תוכלו להגדיר כתובות URL מקומיות, הפניות middleware, שמות עוגיות, את המיקום והסיומת של הצהרות התוכן שלכם, לבטל יומני רישום של Intlayer במסוף ועוד. לרשימה מלאה של הפרמטרים הזמינים, עיינו ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בהגדרות Next.js">

ערכו את תצורת ה-Next.js שלכם כדי לשלב את Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // תצורת ה-Next.js הקיימת שלכם
};

export default withIntlayer(nextConfig);
```

> הפלאגין של Next.js בשם `withIntlayer()` משמש לשילוב Intlayer ב-Next.js. הוא מבטיח את בניית קובצי הצהרת התוכן ומנטר אותם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך סביבות [Webpack](https://webpack.js.org/) או [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). בנוסף, הוא מספק כינויים (aliases) למיטוב ביצועים ומבטיח תאימות ל-Server Components.

> הפונקציה `withIntlayer()` היא פונקציה מבוססת Promise. אם ברצונכם להשתמש בה לצד פלאגינים אחרים, תוכלו להמתין לה באמצעות await. דוגמה:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>
<Step number={4} title="הגדרת Middleware לזיהוי שפה">

הגדירו middleware כדי לזהות ולטפל באופן אוטומטי בשפה המועדפת על המשתמש:

> החל מגרסה 9 של Intlayer, ה-middleware מכבד את האפשרות `routing.enableProxy` (`true` כברירת מחדל). הגדירו `routing.enableProxy: false` בתצורה שלכם כדי להפוך אותו למעביר ישיר (pass-through) מבלי להסיר קובץ זה. ראו את [הערות השחרור של v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות השחרור של v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> התאימו את הפרמטר `matcher` כך שיתאים לנתיבי האפליקציה שלכם. לפרטים נוספים, עיינו ב[תיעוד של Next.js לגבי הגדרת ה-matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

</Step>
<Step number={5} title="הגדרת נתיבי שפה דינמיים">

יישמו ניתוב דינמי כדי להגיש תוכן מותאם שפה על בסיס שפת המשתמש.

1.  **יצירת דפים ספציפיים לשפה:**

    שנו את שם קובץ הדף הראשי שלכם כך שיכלול את המקטע הדינמי `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **עדכון `_app.tsx` לתמיכה בלוקליזציה:**

    ערכו את הקובץ `_app.tsx` שלכם כדי לכלול את ספקי Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat=["typescript", 'esm', 'cjs']
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerProvider } from "next-intlayer";

    const App: FC<AppProps> = ({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerProvider>
      );
    };

    export default App;
    ```

3.  **הגדרת `getStaticPaths` ו-`getStaticProps`:**

    בקובץ `[locale]/index.tsx`, הגדירו את הנתיבים וה-props לטיפול בשפות שונות.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* התוכן שלכם כאן */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* התוכן שלכם כאן */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* התוכן שלכם כאן */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` ו-`getStaticProps` מבטיחים שהאפליקציה שלכם תבנה מראש את הדפים הנדרשים עבור כל השפות ב-Next.js Page Router. גישה זו מפחיתה את זמן החישוב בזמן ריצה ומובילה לחוויית משתמש משופרת. לפרטים נוספים, עיינו בתיעוד Next.js עבור [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) ו-[`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

</Step>
<Step number={6} title="הצהרת התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      he: "ברוכים הבאים לאתר שלי",
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      he: "התחילו על ידי עריכת דף זה.",
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "he": "התחילו על ידי עריכת דף זה.",
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "he": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

למידע נוסף על הצהרת תוכן, עיינו ב[מדריך הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [מדריך הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={7} title="שימוש בתוכן בקוד שלכם">

גשו למילוני התוכן שלכם בכל רחבי האפליקציה כדי להציג תוכן מתורגם.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* רכיבים נוספים */}
    </div>
  );
};

// ... שאר הקוד, כולל getStaticPaths ו-getStaticProps

export default HomePage;
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // ודאו שיש לכם הצהרת תוכן תואמת

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> בעת שימוש בתרגומים במאפייני `string` (למשל `alt`, `title`, `href`, `aria-label`), קראו לערך הפונקציה כך:

> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> למידע נוסף על Hook ה-`useIntlayer`, עיינו ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/useIntlayer.md).

- [תיעוד Hook ה-useIntlayer | next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/useIntlayer.md)

</Step>
<Step number={8} title="בינאום המטא-דאטה שלכם" isOptional={true}>

במקרה שבו ברצונכם לבצע בינאום למטא-דאטה שלכם, כגון כותרת הדף, תוכלו להשתמש בפונקציה `getStaticProps` המסופקת על ידי Next.js Page Router. בתוכה, תוכלו לשלוף את התוכן באמצעות הפונקציה `getIntlayer` כדי לתרגם את המטא-דאטה.

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

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

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
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

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* יצירת תגיות hreflang עבור SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* תוכן הדף */}
      <main>{/* תוכן הדף שלכם כאן */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

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

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... שאר הקוד כולל getStaticPaths
````

> שימו לב כי הפונקציה `getIntlayer` המיובאת מ-`next-intlayer` מחזירה את התוכן עטוף ב-`IntlayerNode`, מה שמאפשר אינטגרציה עם העורך הויזואלי. לעומת זאת, הפונקציה `getIntlayer` המיובאת מ-`intlayer` מחזירה את התוכן ישירות ללא מאפיינים נוספים.

> למידע נוסף אודות אופטימיזציית מטא-דאטה, [עיינו בתיעוד הרשמי של Next.js](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata).

</Step>
<Step number={9} title="שינוי שפת התוכן שלכם" isOptional={true}>

כדי לשנות את שפת התוכן שלכם ב-Next.js, הדרך המומלצת היא להשתמש ברכיב `Link` כדי להפנות משתמשים לדף המקומי המתאים. רכיב `Link` מאפשר prefetching של הדף, מה שמסייע למנוע טעינה מלאה מחדש של הדף.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat={["typescript", "esm"]}
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

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

> דרך חלופית היא להשתמש בפונקציה `setLocale` המסופקת על ידי Hook ה-`useLocale`. פונקציה זו לא תאפשר ביצוע prefetch לדף ותטען את הדף מחדש.

> במקרה זה, ללא הפניה באמצעות `router.push`, רק קוד צד השרת שלכם ישנה את שפת התוכן.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... שאר הקוד

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Change to French</button>
);
```

> ה-API של `useLocalePageRouter` זהה ל-`useLocale`. למידע נוסף על Hook ה-`useLocale`, עיינו ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/useLocale.md).

- [תיעוד Hook ה-useLocale | next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/next-intlayer/useLocale.md)

> הפניות לתיעוד:
>
> - [הפונקציה `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocaleName.md)
> - [הפונקציה `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)
> - [הפונקציה `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getHTMLTextDir.md)
> - [מאפיין `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [מאפיין `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [מאפיין `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [מאפיין `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

- [הפונקציה getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocaleName.md)
- [הפונקציה getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)
- [הפונקציה getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={10} title="יצירת רכיב Link מקומי" isOptional={true}>

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
<Step number={11} title="אופטימיזציה של גודל ה-Bundle" isOptional={true}>

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

כדי לשמור על המאגר שלכם נקי ולהימנע מביצוע commit לקבצים שנוצרו אוטומטית, מומלץ להתעלם מקבצים שנוצרו על ידי Intlayer.

הוסיפו את השורות הבאות לקובץ ה-`.gitignore` שלכם:

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

לפרטים נוספים על אופן השימוש בהרחבה, עיינו ב[תיעוד של הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

## משאבים נוספים

- **תיעוד Intlayer:** [מאגר GitHub](https://github.com/aymericzip/intlayer)
- **מדריך מילונים:** [מילון](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)
- **תיעוד תצורה:** [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

על ידי מעקב אחר מדריך זה, תוכלו לשלב ביעילות את Intlayer באפליקציית ה-Next.js שלכם באמצעות Page Router, מה שיאפשר תמיכת בינאום חזקה וסקלבילית בפרויקטי האינטרנט שלכם.

### להעמיק עוד

כדי להעמיק עוד, תוכלו ליישם את ה[עורך הויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Next.js Pages Router?">

ה-Pages Router עדיין תומך בשדה `i18n` המובנה של `next.config.js`, אך הוא מטפל רק בניתוב שפות ובזיהוי שפה, ולעולם לא בתרגומים עצמם, כך שעדיין עליכם לבחור שכבת תוכן:

- **`next-i18next` / `i18next`** ו-**`next-intl`**: קובצי JSON ב-namespaces הנטענים לפי דף, הצמד המסורתי עם ה-Pages Router.
- **`react-intl`** ו-**`Lingui`**: הודעות ICU עם שלב חילוץ (extraction).
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)) ומהודר לכל רכיב בנפרד, בעל טיפוסיות מלאה, עם תרגום מבוסס AI, עורך ויזואלי ו-CMS.

ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) ואת [מבחן הביצועים של i18n ב-Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [מבחן ביצועים של i18n ב-Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

</Question>
<Question title="כמה נפח מוסיף בינאום (i18n) לגודל ה-bundle שלי ב-Next.js?">

הרבה פחות מהגדרה מבוססת namespace, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. התוכן נפתר במהלך `getStaticProps` ו-`getServerSideProps` במקום להישלח כקטלוגים, ומהדר זמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן נחוצות מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות המקובלות, Intlayer מפחית את גודל ה-bundle והדף בעד 50%. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)

</Question>
<Question title="האם ניתן להגר מ-next-intl,‏ next-i18next או i18next מבלי לכתוב מחדש את הרכיבים שלי?">

כן, וישנם שני מסלולים. תוכלו להגר את התוכן בהדרגה בעזרת [מדריך ההגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-intl_to_intlayer.md) או [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הנוכחי שלכם במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושפים בדיוק את אותו ה-API כמו `next-intl`,‏ `react-i18next` ו-`react-intl`, אך מוגשים באמצעות מילוני Intlayer, כך שרק הייבוא משתנה וקוד הרכיב נשאר בעינו.

- [מדריך הגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_next-intl_to_intlayer.md)
- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="האם ניתן לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. ה-[פלאגין לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי `/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [פלאגין לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [פלאגין לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [פלאגין לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם אני חייב להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלכם, יחלץ את המחרוזות הפונות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לבדוק diff במקום להעתיק מחרוזות לקטלוג אחת אחת.

עבור צינור אוטומטי לחלוטין, ה-[מהדר של Intlayer (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) עושה את אותו הדבר בזמן בנייה: הוא סורק את קובצי ה-JSX, TSX, Vue ו-Svelte שלכם בכל שינוי, מייצר את המילונים ושומר עליהם מסונכרנים באמצעות Hot Module Replacement, כך שאין שום מפתחות לתחזק ידנית.

- [מהדר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

כדאי להכיר שתי מגבלות לפני הפעלת המהדר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן, עליו להבדיל בין טקסט הפונה למשתמש לבין לוגיקת האפליקציה כמו `className="active"` או קוד סטטוס, מה שמצריך מספר הערות בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אתכם בשליטה.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עורך וסוכן AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבה ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח ב-`useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מקומפוננטה, והרצת build, fill, test, push ו-pull מפלטת הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), חיפוש כל ההפניות, תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שעוזר במהלך ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer עבור Cursor,‏ VS Code,‏ Claude Desktop,‏ Claude Code ו-ChatGPT, כך שעוזר יענה מתוך תיעוד עדכני במקום לנחש, ויוכל להריץ פקודות כמו `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת אחד לכל framework, המלמדים סוכן את הגדרות הניתוב שלכם ואת סוגי צמתי התוכן.
- **[פלאגין ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מוקלדות בקוד (hardcoded), עם כללים נוספים למפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם כדאי להישאר ב-Pages Router או להגר ל-App Router?">

שום דבר כאן אינו מחייב את המעבר. Intlayer תומך בשניהם, והצהרות התוכן זהות, כך שהגירת הנתב בשלב מאוחר יותר אינה מצריכה כתיבה מחדש של ה-i18n שלכם. אם אתם כבר מתכננים את המעבר, עקבו אחר [מדריך Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md) במקום זאת וקבלו רינדור של Server Components, אשר מרחיק לחלוטין מילונים מהלקוח.

- [מדריך Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)

</Question>
<Question title="האם אפשרות ה-i18n המובנית של Next.js עדיין עובדת עם Pages Router?">

כן, וזהו ההבדל העיקרי מה-App Router, שבו היא אינה חלה. היא מעניקה לכם קידומות שפה וזיהוי של `Accept-Language`, אך ללא שום שכבת הודעות, כך שהיא פותרת ניתוב ומשאירה את התרגום לספרייה. תוכלו להמשיך להשתמש בה, או לאפשר ל-Intlayer לנהל גם את הניתוב דרך `routing.mode` וה-middleware בשלב 4.

</Question>
<Question title="כיצד אוכל להוסיף תגיות hreflang ומטא-דאטה מותאם לשפות עבור SEO?">

שלב 8 מכסה זאת. בנו את החלופות (alternates) עם `getMultilingualUrls`, כולל רשומת `x-default`, והוציאו אותן מתוך `next/head` בכל דף כך שמנועי חיפוש יגישו את גרסת השפה הנכונה.

</Question>
<Question title="כיצד אוכל לבנות רכיב Link מקומי?">

שלב 10 מדגים זאת. הרכיב עוטף את ה-`Link` של Next.js ומעביר את ה-href דרך `getLocalizedUrl`, כך שקישור פנימי שנכתב כ-`/about` הופך ל-`/fr/about` עבור מבקר צרפתי מבלי שתצטרכו לחזור על השפה בכל מקום קריאה.

</Question>
<Question title="כיצד אוכל לתרגם את האפליקציה באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף הנוכחי. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו-[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים (plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [החדרות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [החדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות ה-[עורך הויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על התשתית שלכם ומאפשר לכל אחד לערוך טקסט ישירות באפליקציה הפועלת, או באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), המחצין את התוכן כך שניתן לשנותו ללא פריסה מחדש.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המאוחסן הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
