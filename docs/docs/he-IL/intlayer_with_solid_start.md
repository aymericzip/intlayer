---
createdAt: 2025-08-06
updatedAt: 2026-11-03
priority: 9
title: "Solid Start i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer ב-SolidStart: ניתוב שפות ברינדור שרת, תוכן מתורגם ריאקטיבי, hreflang ומפת אתר רב-לשונית."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - ניתוב שפות
  - מפת אתר
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
applicationShowcase: https://intlayer-solid-start-template.vercel.app
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-SolidStart שלך באמצעות Intlayer

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="פתרון ה-i18n הטוב ביותר עבור Vite ו-Solid? גלו את Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת CodeSandbox - כיצד לבצע בינאום באפליקציה שלך באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

  <Tab label="הדגמה" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת תבנית Intlayer Solid Start"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

מדריך זה מכסה אפליקציית SolidStart **המרונדרת בצד השרת (server-rendered)**: זיהוי השפה מתרחש בבקשה, דפים מרונדרים בשרת בשפה הנכונה, והאותות של `<html lang>`, `hreflang` ומפת האתר הנדרשים למנועי חיפוש נפלטים בצד השרת.

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `@solid-primitives/i18n` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא ל-Solid">

Intlayer מותאם לפעול בצורה מושלמת עם Solid על ידי מתן **תחימת תוכן ברמת הרכיב (component-level content scoping)**, **תרגומים ריאקטיביים**, וכל התכונות הדרושות להרחבת בינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלך, טען רק את התוכן הדרוש. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלך בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

תיחום התוכן של האפליקציה שלך **מקל על התחזוקה** של אפליקציות בקנה מידה גדול. באפשרותך לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המנטלי של סקירת כל קוד התוכן שלך. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלך.

</Accordion>
<Accordion header="סוכני AI (AI Agents)">

מיקום משותף של תוכן (Co-locating) **מפחית את ההקשר הדרוש** למודלי שפה גדולים (LLMs). Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו**[כישורי סוכן (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמש באוטומציה כדי לתרגם בצינור ה-CI/CD שלך בעזרת ה-LLM לבחירתך בעלות ספק ה-AI שלך. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, כמו גם [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) כדי לסייע **בתרגום ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול לגרום לבעיות ביצועים וריאקטיביות. Intlayer מבצע אופטימיזציה לטעינת התוכן בזמן הבנייה.

</Accordion>
<Accordion header="הרחבה עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n, Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי** ו**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** שיעזרו לך לנהל את התוכן הרב-לשוני שלך **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, קופירייטרים וחברי צוות אחרים לחלק. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית SolidStart

<Steps>
<Step number={1} title="התקנת תלויות">

התקן את החבילות הדרושות באמצעות npm:

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

> הדגל `--interactive` הוא אופציונלי. השתמש ב-`intlayer-cli init` אם אתה סוכן AI.

> פקודה זו תזהה את הסביבה שלך ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **solid-intlayer**

  החבילה המשלבת את Intlayer באפליקציית Solid. היא מספקת ספקי הקשר (context providers) והוקים עבור בינאום ב-Solid.

- **vite-intlayer**

  כולל את תוסף ה-Vite לשילוב Intlayer עם [הבאנדלר Vite](https://vite.dev/guide/why.html#why-bundle-for-production), וכן את מטפל ניתוב השפות המזהה את השפה המועדפת על המשתמש, מנהל עוגיות ומטפל בהפניות URL.

> `vite-intlayer` נוגע כאן לצד השרת ולא רק לזמן הבנייה: הוא מספק את מטפל הבקשות ששרת ה-Nitro של SolidStart מריץ. שמירתו ב-`dependencies` היא ברירת המחדל הבטוחה. ניתן להעבירו ל-`devDependencies` רק אם אתה פורס את ספריית `.output` הבנויה, שלתוכה Nitro מוטמע את המטפל.

</Step>
<Step number={2} title="הגדרת הפרויקט שלך">

צור קובץ תצורה כדי להגדיר את השפות של האפליקציה שלך:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // השפות הנוספות שלך
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

עם `prefix-no-default`, שפת ברירת המחדל מוגשת מכתובות URL ללא קידומת:

```plaintext
/            /about          → English  (default locale)
/fr          /fr/about       → French
/es          /es/about       → Spanish
```

> באמצעות קובץ תצורה זה, תוכל להגדיר כתובות URL מותאמות לשפה, הפניות של middleware, שמות של קובצי cookie, מיקום וסיומות של הצהרות התוכן שלך, להשבית יומני Intlayer במסוף, ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיין ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בתצורת ה-Vite שלך">

הוסף את תוסף Intlayer לתצורה שלך:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> תוסף ה-Vite `intlayer()` בונה את קובצי הצהרת התוכן שלך, מנטר אותם במצב פיתוח ומגדיר את משתני הסביבה של Intlayer בתוך האפליקציה. הוא גם מספק כינויים (aliases) המבצעים אופטימיזציה לביצועים.

### ניתוב שפות מגיע יחד עם התוסף

SolidStart פועל על גבי [Nitro](https://nitro.build), ו-`intlayer()` רושם את מטפל ניתוב השפות שלו ישירות לתוך צינור השרת של Nitro (דרך האפשרות `routing.enableProxy`, שהיא `true` כברירת מחדל). אין צורך להגדיר שום דבר נוסף: בשרת בנוי, כל בקשה נבדקת לפני שהיא מגיעה לנתב, ו:

- השפה נקראת מקידומת ה-URL, לאחר מכן מעוגיית `INTLAYER_LOCALE`, ולאחר מכן מכותרת ה-`Accept-Language`;
- כתובת URL ללא קידומת מופנית לחלופה המותאמת שלה כאשר השפה שנפתרה אינה שפת ברירת המחדל (`/` ← `/fr`);
- כתובת URL עם קידומת מיותרת מופנית בחזרה לצורתה הקנונית (`/en/about` ← `/about`);
- עוגיית השפה נכתבת בחזרה בתגובה.

</Step>
<Step number={4} title="הצהרה על התוכן שלך">

צור ונהל את הצהרות התוכן שלך כדי לאחסן תרגומים:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      he: "שלום עולם!",
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      he: "אפליקציית SolidStart מבוססת בינאום עם Intlayer.",
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      he: "בקרו ב-start.solidjs.com כדי ללמוד כיצד לבנות אפליקציות SolidStart.",
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "he": "שלום עולם!",
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "he": "אפליקציית SolidStart מבוססת בינאום עם Intlayer.",
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "he": "בקרו ב-start.solidjs.com כדי ללמוד כיצד לבנות אפליקציות SolidStart.",
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **דגש מיוחד עבור SolidStart**: כל קובץ `.ts` / `.tsx` תחת `src/routes` הופך לנתיב, ולקובץ `.content.ts` יש export ברירת מחדל, כך שהוא יזוהה כדף. שמור את הצהרות התוכן של **הדפים** שלך מחוץ לספריית הנתיבים (`src/contents/` עובד מצוין). תוכן של **רכיבים** יכול להישאר ממוקם יחד איתם, מכיוון ש-`src/components` אינו נסרק על ידי נתב מערכת הקבצים.

> הצהרות התוכן שלך יכולות להיות מוגדרות בכל מקום באפליקציה שלך, כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> לפרטים נוספים, עיין ב[תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={5} title="הוספת ניתוב מותאם לשפות (localized routing)">

מטרת שלב זה היא לתת לכל שפה כתובת URL משלה, שזהו מה שמנועי חיפוש מאנדקסים.

העבר את הדפים שלך תחת **מקטע דינמי אופציונלי**. בנתב מערכת הקבצים של SolidStart, `[[locale]]` מתקמפל לתבנית הנתיב `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← פריסה המאמתת את המקטע
  [[locale]]/
    index.tsx             → /        ו- /fr        ו- /es
    about.tsx             → /about   ו- /fr/about  ו- /es/about
  [...404].tsx            → catch-all עבור כל שאר הנתיבים
```

התפקיד היחיד של קובץ הפריסה הוא להגביל את המקטע לשפה מוגדרת:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router` מרחיב את `:locale?` לשתי תבניות, אחת עם המקטע ואחת בלעדיו, ובודק אותן לפי סדר ספציפיות יורד. `matchFilters` הוא מה שעושה את ההבדל בין הגדרה תקינה לכזו שמבלבלת:

| כתובת URL   | ללא `matchFilters`                     | עם `matchFilters`                   |
| ----------- | -------------------------------------- | ----------------------------------- |
| `/fr/about` | דף אודות בצרפתית                       | דף אודות בצרפתית                    |
| `/about`    | דף אודות (מקטע סטטי מנצח)              | דף אודות                            |
| `/unknown`  | **דף הבית**, בשקט, עם `locale=unknown` | אין התאמה ← מגיע אל ה-404 catch-all |

> העדף את `[locale]` (חובה) על פני `[[locale]]` אם אתה משתמש במצב ניתוב `'prefix-all'`, והסר את המקטע לחלוטין עבור `'no-prefix'` או `'search-params'`.

</Step>
<Step number={6} title="אספקת השפה לאפליקציה שלך">

כתובת ה-URL היא מקור האמת היחיד לשפה: ה-middleware כבר הפנה את הבקשה לנתיב המותאם שלה, ולכן קריאת הנתיב בפריסת השורש שומרת על תיאום בין רינדור השרת לבין הידרציית הלקוח, וגורמת לכל ניווט בצד הלקוח לעדכן את השפה ללא עלות נוספת.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // השרת מרנדר את ה-<html> ב-entry-server.tsx; ניווטים בצד הלקוח
  // בין שפות חייבים לעדכן את המאפיינים בעצמם.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider` מגיב ל-prop של `locale` שלו, ולכן העברת קריאת ה-accessor `locale()` בתוך ה-JSX מספיקה: Solid מהדר אותה ל-getter, וכל העץ מתרנדר מחדש בשפה החדשה כאשר ה-URL משתנה.

</Step>
<Step number={7} title="הגדרת מאפייני lang ו-dir של HTML בשרת">

אלמנט ה-`<html>` מתרנדר על ידי `entry-server.tsx`, מחוץ ל-`Router`. קרא את השפה מכתובת ה-URL של הבקשה במקום זאת:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

סורקים מקבלים כעת את השפה הנכונה בבית הראשון (first byte):

```html
<html dir="ltr" lang="fr"></html>
```

</Step>
<Step number={8} title="שימוש ב-Intlayer בדפים שלך">

גש למילוני התוכן שלך בכל רחבי האפליקציה:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> ב-Solid, הפונקציה `useIntlayer` מחזירה תוכן ריאקטיבי (למשל, `content`). ניתן לגשת למאפיינים שלו ישירות.

> אם ברצונך להשתמש בתוכן שלך במאפיין מחרוזת (`string`), כגון `alt`, `title`, `href`, `aria-label` וכדומה, תוכל להשתמש בערך של הפונקציה, כגון:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> למידע נוסף על ההוק `useIntlayer`, עיין ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useIntlayer.md).

- [תיעוד ההוק useIntlayer | solid-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useIntlayer.md)

צומתי תוכן אינם מוגבלים לתרגומים פשוטים. מונה ריבוי (pluralized counter), לדוגמה:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        he: "לחיצה {{count}}",
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        he: "{{count}} לחיצות",
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()` בוחר את הקטגוריה דרך `Intl.PluralRules` עבור השפה הפעילה, כך ששפות עם יותר משתי צורות רבים פועלות ללא קוד נוסף.

</Step>
<Step number={9} title="יצירת רכיב קישור מותאם לשפה (Localized Link)">

צור רכיב `Link` מותאם אישית המוסיף אוטומטית קידומת של השפה הנוכחית לכתובות URL פנימיות:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

כתיבת `href="/about"` פעם אחת מפיקה כעת `/about`, `/fr/about` או `/es/about` בהתאם לשפה הפעילה, ללא קידומת ידנית בשום מקום בדפים שלך.

</Step>
<Step number={10} title="יצירת רכיב בורר שפות (Locale Switcher)">

רנדר את הבורר כ**קישורי עוגן אמיתיים (real anchors)** ולא כ-`<select>`: כל שפה בדף הנוכחי הופכת לקישור הניתן לסריקה ופתיחה בלשונית חדשה, דבר שבקרת JavaScript בלבד אינה יכולה להציע.

`getPathWithoutLocale` מסיר את מקטע השפה מהנתיב הנוכחי, ו-`getLocalizedUrl` בונה אותו מחדש עבור שפת היעד, כך שהקישורים תואמים למצב הניתוב שלך מבלי לקודד שום דבר ידנית. הניווט הוא מה שמשנה את השפה המרונדרת, נתיב ה-`[[locale]]` גוזר אותה מכתובת ה-URL, בעוד ש-`setLocale` שומר את הבחירה בעוגיית `INTLAYER_LOCALE` כך שביקור עתידי בכתובת URL ללא קידומת ייפתר לאותה שפה.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // נתיב קנוני (ללא שפה) של הדף המוצג כעת
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // התאמה מדויקת בלבד, כדי שקישור שפת ברירת המחדל לא יסומן כפעיל בכל דף
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // מבטיח שכפתור "אחורה" בדפדפן יחזור לדף הקודם
              replace
            >
              {/* שם השפה בשפת המקור שלה - למשל עברית / Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> ב-Solid, `locale` מ-`useLocale` הוא **signal accessor**. השתמש ב-`locale()` (עם סוגריים) כדי לקרוא את ערכו הנוכחי בצורה ריאקטיבית.
>
> `getLocaleName(localeItem)` מרנדר כל שפה בשפה שלה, `English / Français / Español / עברית`. העבר ארגומנט שני כדי לתרגם את השמות לשפה המוצגת כעת: `getLocaleName(localeItem, locale())` נותן `English / French / Spanish` באנגלית, `אנגלית / צרפתית / ספרדית` בעברית.
>
> `<A>` כבר מגדיר `aria-current="page"` על הקישור התואם לכתובת ה-URL הנוכחית, כך שאין צורך להוסיף דבר עבור זה. `replace` נקרא מהמאפיין המרונדר על ידי הנתב: הוא מחליף את רשומת ההיסטוריה במקום להוסיף רשומה חדשה, כך שכפתור "אחורה" בדפדפן מחזיר לדף שבו ביקרת לפני ההחלפה ולא לאותו דף בשפה הקודמת.
>
> המאפיינים `dir` ו-`hreflang` בכל קישור שומרים על כיוון נכון של שמות שפות הנכתבות מימין לשמאל ומיידעים טכנולוגיות מסייעות וסורקים לאיזו שפה כל קישור מצביע.
>
> למידע נוסף על ההוק `useLocale`, עיין ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useLocale.md).

- [תיעוד ההוק useLocale | solid-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useLocale.md)

</Step>
<Step number={11} title="פליטת קישורי canonical ו-hreflang" isOptional={true}>

הערות `hreflang` מודיעות למנועי חיפוש ש-`/about`, `/fr/about` ו-`/es/about` הם אותו דף בשפות שונות. `getMultilingualUrls` גוזר אותן מהנתיב הקנוני (ללא שפה), בהתאם למצב הניתוב שלך, כך ששום דבר אינו מקודד ידנית:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** כתובת URL מוחלטת של הדף המרונדר. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

רנדר אותו ב-head של המסמך, היכן שכתובת ה-URL של הבקשה זמינה:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … בתוך <head>, לצד שאר תגיות המטא:
<AlternateLinks url={url} />;
```

`GET /fr/about` מגיש לאחר מכן:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

</Step>
<Step number={12} title="ניהול דפי 404 שלא נמצאו" isOptional={true}>

נתיב splat בשורש של `src/routes` תופס כל נתיב שמקטע השפה לא התאים לו, כולל קידומות שפה לא חוקיות שנדחו על ידי `matchFilters`. מכיוון שהשפה עדיין מגיעה מכתובת ה-URL דרך פריסת השורש, דף ה-404 מוצג בשפת המבקר:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| בקשה              | תוצאה                              |
| ----------------- | ---------------------------------- |
| `/xx`             | `404`, `xx` אינה שפה מוגדרת        |
| `/nonexistent`    | `404` בשפת ברירת המחדל             |
| `/fr/nonexistent` | `404` בצרפתית (`Page introuvable`) |

</Step>
<Step number={13} title="יצירת מפת אתר רב-לשונית (Sitemap)" isOptional={true}>

מחולל מפת האתר של Intlayer מרחיב כל נתיב לרשומה אחת לכל שפה ומחבר את החלופות של `xhtml:link` ביניהן, כך שהנתיב צריך לרשום רק את הנתיבים הקנוניים ללא שפה.

> בניגוד למחוללים בסיסיים הפולטים רק כתובות URL שטוחות, Intlayer מחבר קישורים דו-כיווניים בין כל וריאנט מקומי של כל דף, מה שעוזר למנועי חיפוש לקשר בין כתובות URL מתורגמות ולהגיש את הכתובת הנכונה לקהל הנכון.

SolidStart הופך קובץ המייצא מתודת HTTP לנתיב API, ומסיר את הסיומת `.ts` מהנתיב, כך ש-`src/routes/sitemap.xml.ts` מוגש ב-`/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

export const GET = (_event: APIEvent) => {
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
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> נתיבי API אינם תומכים בפרמטרים אופציונליים, לכן שמור קובץ זה בשורש של `src/routes`, מחוץ למקטע `[[locale]]`. מפת האתר כבר מכילה את כל השפות.

תוכל לבנות קובץ `robots.txt` באותה דרך עם `getMultilingualUrls`, כך שרשומות `Disallow` יכסו כל איות מקומי של נתיב רגיש:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: https://example.com/sitemap.xml`,
    ].join("
"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>
<Step number={14} title="שליפת השפה בפונקציות השרת שלך" isOptional={true}>

ייתכן שתרצה לגשת לשפה הנוכחית מתוך פונקציית שרת או נתיב API.

בהגדרה מבוססת קידומות כמו זו, **כתובת ה-URL היא הקובעת**: `getLocaleFromPath` קורא את הקידומת מכתובת ה-URL של הבקשה. `getLocale` הוא ברירת המחדל עבור בקשות שאינן נושאות קידומת שפה. הוא בודק את עוגיית `INTLAYER_LOCALE`, לאחר מכן את כותרת ה-`x-intlayer-locale`, ולאחר מכן מנהל משא ומתן של `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // קבלת העוגייה מהבקשה (ברירת מחדל: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // קבלת הכותרת מהבקשה (ברירת מחדל: 'x-intlayer-locale'),
      // עם חזרה למשא ומתן של Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // שליפת תוכן מחוץ לרכיב באמצעות getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> אל תסתמך כאן על `getLocale` בלבד: עוגיית השפה נכתבת רק לאחר שהמבקר מחליף שפה באופן אקטיבי, ולכן ביקור ראשון ב-`/fr/...` ייפתר לשפת ברירת המחדל.

</Step>
<Step number={15} title="חילוץ התוכן של הרכיבים שלך" isOptional={true}>

אם יש לך בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציע [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) כדי להמיר את הרכיבים שלך ולחלץ את התוכן.

- [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

כדי להגדיר זאת, תוכל להוסיף סעיף `compiler` בקובץ ה-`intlayer.config.ts` שלך:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... שאר התצורה שלך
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
     * מציין אם יש לשמור את הרכיבים לאחר שהומרו.
     *
     * - אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. כך שההמרה תהיה קבועה, והמהדר ידלג על ההמרה בתהליך הבא. בדרך זו, המהדר יכול להמיר את האפליקציה, ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד ללא שינוי. ההמרה תבוצע רק בזיכרון.
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

הפעל את פקודת החילוץ כדי להמיר את הרכיבים שלך ולחלץ את התוכן:

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

> העבר את קובצי התוכן שנוצרו עבור הדפים שלך אל מחוץ ל-`src/routes` לאחר מכן, מהסיבה שהוסברה בשלב 5.

 </Tab>
 <Tab value='Babel compiler'>

 <Tabs>
 <Tab value='intlayer >= 9'>

> החל מ-v9, ה-`intlayerCompiler` כלול בתוסף `intlayer`. לכן אין צורך להוסיפו באופן ידני.

 </Tab>
 <Tab value='intlayer < 9'>

עדכן את `vite.config.ts` שלך כדי לכלול את תוסף `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // הוספת תוסף המהדר
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
<Step number={16} title="הגדרת TypeScript">

Intlayer משתמש בהרחבת מודולים (module augmentation) כדי ליהנות מהיתרונות של TypeScript ולהפוך את בסיס הקוד שלך לחזק יותר.

ודא שתצורת ה-TypeScript שלך כוללת את הטיפוסים שנוצרו אוטומטית:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... התצורות הקיימות שלך
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

מפתחות מילון ונתיבי תוכן נבדקים כעת בזמן הידור:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

## אימות ההגדרה שלך

בנה והפעל את השרת, ולאחר מכן בדוק שהבקשות הבאות מתנהגות כמצופה:

```bash
npm run build
node .output/server/index.mjs
```

| בקשה                                   | תגובה צפויה                       |
| -------------------------------------- | --------------------------------- |
| `GET /`                                | `200`, אנגלית                     |
| `GET /` עם `Accept-Language: fr`       | `302` ← `/fr`                     |
| `GET /` עם עוגייה `INTLAYER_LOCALE=es` | `302` ← `/es`                     |
| `GET /fr`                              | `200`, צרפתית, `<html lang="fr">` |
| `GET /fr/about`                        | `200`, דף אודות בצרפתית           |
| `GET /en/about`                        | `302` ← `/about` (הפניה קנונית)   |
| `GET /xx`                              | `404`                             |
| `GET /fr/nonexistent`                  | `404` בצרפתית                     |
| `GET /sitemap.xml`                     | `200`, מפת אתר XML רב-לשונית      |

השורות המרנדרות דף מתנהגות באופן זהה תחת `vite dev`. שלוש שורות ההפניה חלות רק על שרת בנוי אלא אם כן תרשום את המטפל כ-middleware בעצמך. ראה שלב 3.

> הפעל את שרת הפיתוח על גבי Node (`vite dev`) ולא על גבי Bun (`bun --bun vite dev`): ה-SSR של SolidStart נכשל כרגע תחת סביבת ההרצה של Bun עם `Expected a Response object, but received 'NodeResponse'`. הדבר אינו קשור ל-Intlayer, הוא משתחזר גם בתבנית נקייה, ומשפיע רק על שרת הפיתוח, לא על `vite build`.

## הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. זה מאפשר לך להימנע מביצוע commit שלהם למאגר ה-Git שלך.

כדי לעשות זאת, תוכל להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלך:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## הרחבת VS Code

כדי לשפר את חוויית הפיתוח שלך עם Intlayer, תוכל להתקין את **הרחבת Intlayer הרשמית ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטבעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בהרחבה, עיין ב[תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

## להתקדם הלאה

כדי להתקדם הלאה, תוכל להטמיע את ה[עורך החזותי (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלך החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## הפניות לתיעוד

- [תיעוד Intlayer](https://intlayer.org)
- [תיעוד SolidStart](https://start.solidjs.com)
- [הוק useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useIntlayer.md)
- [הוק useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/solid-intlayer/useLocale.md)
- [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)
- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Solid Start?">

- **`@solid-primitives/i18n`**: הפרימיטיב הקהילתי, מילון שטוח שאתה מרכיב, טוען ומגדיר טיפוסים עבורו בעצמך.
- **`i18next`** עם עטיפת Solid: קטלוגים בוגרים, אך ללא מענה לניתוב מודע לשפה או רינדור שרת ב-Solid Start.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלך ([לצד כל רכיב או מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומעובד בזמן הבנייה, עם נתיבים מותאמים אישית, פתרון שפה בצד השרת, קישורי canonical ו-hreflang, מפת אתר רב-לשונית, תרגום AI, עורך חזותי ו-CMS.

ב-Solid Start ההבדל ניכר בחלקי השרת, שמדריך זה מכסה כשלבים ייעודיים במקום להשאיר אותם לטיפולך. עיין ב[למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) וב[השוואת ביצועים עבור Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [השוואת ביצועים עבור Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md)

</Question>
<Question title="כמה תוספת בינאום מוסיפה לגודל ה-bundle שלי ב-Solid Start?">

הרבה פחות מהגדרה מבוססת מרחב שמות, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. תוכן המרונדר בשרת נפתר בשרת, והמהדר בזמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שבהן הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש מושמטים, ו[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל ה-bundle והדפים בעד 50%. עיין ב[אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md)

</Question>
<Question title="האם אוכל לעבור מ-`@solid-primitives/i18n` או `i18next` מבלי לשכתב את הרכיבים שלי?">

במידה רבה כן. עקוב אחר [מדריך המעבר מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md) כדי להעביר את התוכן. ניתן גם להעביר בהדרגה: [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתה מעביר רכיבים בזה אחר זה.

- [מדריך מעבר מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי התרגום הקיימים שלי בפורמט JSON?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלך כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לך לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הפעל את `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלך, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכל לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 15 במדריך זה מפרט זאת.

עבור צינור אוטומטי לחלוטין, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) מבצע את אותו הדבר בזמן הבנייה: הוא סורק את קוד המקור שלך ב-JSX, TSX, Vue ו-Svelte בכל שינוי, מייצר את המילונים ושומר אותם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין מפתחות לתחזק ידנית כלל.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

כדאי להכיר שתי מגבלות לפני הפעלת המהדר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כמו `className="active"` או קוד סטטוס, מה שדורש כמה הערות בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אותך בתהליך קבלת ההחלטות.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עריכה וכלי סוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: מעבר ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל האזכורים (find all references), תצוגה מקדימה בריחוף מעל ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא פותר גם קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שמסייע בזמן המעבר.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית משיב מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת כישור לכל framework, המלמדים סוכן את הגדרות הניתוב שלך ואת סוגי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם Intlayer עובד עם רינדור צד שרת (SSR) ב-Solid Start?">

כן. שלב 6 מספק את השפה לאפליקציה בשרת ושלב 7 מגדיר שם את המאפיינים `lang` ו-`dir`, כך שתגובת ה-HTML הראשונה כבר נושאת את השפה הנכונה, שזהו מה שסורקים ובוטים של תצוגה מקדימה קוראים.

</Question>
<Question title="האם שינוי השפה מרנדר מחדש את כל האפליקציה שלי?">

לא. התוכן מגובה על ידי signals של Solid, כך שהחלפת שפה מעדכנת רק את צומתי ה-DOM שקוראים את הערכים שהשתנו, ללא הרצה מחדש של הרכיבים שעוטפים אותם.

</Question>
<Question title="כיצד אני מוסיף קישורי canonical ו-hreflang?">

שלב 11 מכסה זאת. `getMultilingualUrls` בונה את החלופות עבור כל שפה מוצהרת, כולל `x-default`, ושלב 13 מזין את אותם הנתונים לתוך מפת אתר רב-לשונית כך שכל גרסת שפה של דף מקשרת לאחרות.

</Question>
<Question title="כיצד אני מטפל בדפי 404 בנתיבים מותאמים לשפה?">

שלב 12 מכסה זאת. `matchFilters` מאמת את מקטע השפה של ה-URL, כך ש-`/xx/about` מחזיר 404 אמיתי במקום להיחשב כנתיב ולהיות מאונדקס כדף כפול.

</Question>
<Question title="האם חובה לשים את השפה בכתובת ה-URL?">

לא. `routing.mode` מקבל `"prefix-no-default"` (ברירת המחדל), `"prefix-all"`, `"no-prefix"` ו-`"search-params"`, ו-`routing.domains` ממפה כל שפה לדומיין משלה. עיין ב[מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד אני מקבל את השפה בפונקציית שרת?">

שלב 14 מכסה זאת. השפה שנפתרה עבור הבקשה זמינה בתוך פונקציות שרת, כך שנתונים שנשלפים שם יכולים להיות מותאמים לשפה באותו שלב במקום להיות מתורגמים שוב בלקוח.

</Question>
<Question title="כיצד אני מתרגם את האפליקציה באופן אוטומטי בעזרת AI?">

הפעל את `npx intlayer fill`. הפקודה ממלאת תרגומים חסרים באמצעות ה-LLM לבחירתך, תוך שימוש בספק ובמפתח ה-API שלך, ו-`--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף. עיין ב[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) וב[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו[מעצבי פורמט (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבי פורמט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות ה[עורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על התשתית שלך ומאפשר לכל אחד לערוך טקסט במקום באפליקציה הפועלת, או ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), המוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחודשת (deployment).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
