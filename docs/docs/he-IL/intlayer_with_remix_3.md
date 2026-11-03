---
createdAt: 2026-09-09
updatedAt: 2026-11-03
priority: 9
title: "בינאום (i18n) ב-Remix 3 - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer ב-Remix 3: זיהוי שפה ב-router middleware, טיפול בנתיבים ותצוגות מתורגמות, וכתובות URL מותאמות לשפה."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - תקני רשת
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "שימוש ב-middleware וב-hooks של remix-intlayer"
  - version: 9.5.0
    date: 2026-09-09
    changes: "תיעוד ראשוני עבור Remix 3"
author: aymericzip
---

# תרגום אתר ה-Remix 3 שלך באמצעות Intlayer

מדריך זה מדגים כיצד לשלב את **Intlayer** עבור בינאום (i18n) חלק באפליקציות **Remix 3** עם ניתוב מודע לשפה (locale-aware routing), הגדרות תוכן מוגנות בטיפוסיות (type-safe content declarations), רכיבי JSX המרונדרים בשרת ותמיכה בריבוי סביבות ריצה כולל Node.js, Bun, Deno ו-Cloudflare Workers.

## מה זה Remix 3?

**Remix 3** מייצג שינוי ארכיטקטוני יסודי לעבר **framework רשת מודולרי (composable), בלתי תלוי בסביבת ריצה, שנבנה כולו על גבי תקני רשת (web standards)**. במקום להיות כבול לבאנדלרים ספציפיים או ל-APIs קנייניים של שרתים, Remix 3 מופץ כחבילות מודולריות בעלות ייעוד מוגדר:

- **`remix/fetch-router`** (או `remix/router`): ניתוב קל משקל ותואם תקנים שנבנה על גבי Fetch API (`Request` ו-`Response`).
- **`remix/component`**: מודל רכיבי JSX (`jsxImportSource: "remix/component"`). רכיב הוא פונקציית setup שמחזירה פונקציית render, כך שהוא נראה כמו React אך שומר מצב (state) ב-closures רגילים של JavaScript.
- **`remix/middleware/render`**: מתקין את `context.render(<Page />)` בכל בקשה, ומזרים (streaming) את עץ ה-JSX כ-`Response` של HTML.
- **`remix/node-fetch-server`**: מתאמי שרת עבור Node.js, עם תמיכה טבעית ב-Bun, ב-Deno ובסביבות edge.
- **`remix/cookie`**: ניתוח (parsing) וסריאליזציה של עוגיות מאובטחות קריפטוגרפית.

בשילוב עם **Intlayer** וחבילת **`remix-intlayer`**, middleware לשפות ובנוסף אותם ה-hooks כמו `useIntlayer` / `useDictionary` / `useLocale` של `react-intlayer`, המחוברים להקשר הבקשה (request context) של Remix, מקבלים מערכת בינאום מלאה המספקת בטיחות בזמן הידור, תרגומי AI אוטומטיים, רינדור שרת ללא תקורה (zero-overhead) וניתוב שפות חלק.

## תוכן עניינים

<TOC/>

## מדוע לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מסורתיים כמו `i18next` או טועני תרגומים מותאמים אישית, Intlayer מציעה חוויית פיתוח משולבת המותאמת לארכיטקטורת רשת מודרנית:

<AccordionGroup>
<Accordion header="כיסוי מלא של Remix 3 ותקני רשת">

Intlayer נבנתה לעבודה חלקה עם תקני רשת (`Request`, `Response`, `Headers` ו-`URL`). החבילה `remix-intlayer` מתחברת ל-Fetch router של Remix 3 כ-middleware קל משקל, מחלצת את השפה מנתיבי ה-URL, מעוגיות או מכותרות `Accept-Language`, וחושפת אותה לשאר שלבי הבקשה (handlers, תצוגות ורכיבי `remix/component`) מבלי להעביר אותה ידנית ומבלי לכבול אתכם לסביבת ריצה מסוימת.

</Accordion>
<Accordion header="הגדרות תוכן מוגנות טיפוסיות (Type-Safe)">

היפרדו ממפתחות JSON שבירים ומקריסות בזמן ריצה כתוצאה ממפתחות חסרים. Intlayer אוכפת בדיקות TypeScript על פני כל השפות המוצהרות, ומתריעה בזמן הבנייה אם תרגום חסר או אינו תקין.

</Accordion>
<Accordion header="אפס תקורה ב-Bundle בצד השרת">

Remix 3 מרנדר רכיבי JSX בשרת ומזרים את ה-HTML ללקוח. רק הטקסט שנבחר עבור השפה המבוקשת מגיע לזרם הפלט. אין צורך בחבילות הידרציה של לקוח או בקטלוגי תרגום כבדים, אלא אם רכיב מסומן במפורש כ-`clientEntry`.

</Accordion>
<Accordion header="מוכן לסוכני AI ואוטומציה">

Intlayer ממקמת את הגדרות התוכן (`.content.ts`) לצד לוגיקת הניתוב שלכם, מה שמפחית את הקשר הטוקנים הנדרש למודלי שפה גדולים (LLMs). פקודות CLI מובנות כגון `intlayer fill` ו-`intlayer test` מאפשרות להפוך תרגומים לאוטומטיים בצינורות CI/CD בעלות של ספק ה-AI שלכם.

</Accordion>
<Accordion header="עורך חזותי ואינטגרציית CMS">

מעבר לתהליכי עבודה מוטי-קוד (code-first), Intlayer מספקת [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי ו-[Remote CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המאפשרים לעורכים, מתרגמים ואנשי תוכן ללא רקע טכני לעדכן תכנים מבלי לפרוס מחדש את הקוד.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [Remote CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב

<Tabs defaultTab="code">
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-remix-3-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את `intlayer`, `remix-intlayer` ו-`remix` (גרסה 3) באמצעות מנהל החבילות המועדף עליכם:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: מנוע הבינאום המרכזי המספק ניהול תצורה, הגדרת מילונים (`t()`, `Dictionary`), כלי CLI ומפענח זמן ריצה.
- **`remix-intlayer`**: האינטגרציה עבור Remix 3: ה-middleware של הניתוב `intlayer()` הפותר את השפה של כל בקשה, וה-hooks כגון `useIntlayer`, `useDictionary` ו-`useLocale` שקוראים אותה בכל מקום בהמשך הזרם.
- **`remix`**: חבילת ה-framework המאוחדת של Remix 3 המייצאת את `remix/router`, `remix/routes`, `remix/component`, `remix/middleware/render` ו-`remix/node-fetch-server`.

</Step>
<Step number={2} title="הגדרת Intlayer">

### ארכיטקטורה

בארכיטקטורה זו, ה-middleware בשם `intlayer()` של `remix-intlayer` נרשם ב-`createRouter()` לפני ה-middleware בשם `render()`. הוא מסיר את קידומת השפה לפני התאמת הניתוב, כך שהנתיבים מוגדרים פעם אחת ב-`src/routes.ts` ללא מקטע `:locale`, והוא מריץ את המשך הבקשה בתוך תחום `AsyncLocalStorage`, מה שמאפשר ל-`useIntlayer` / `useLocale` לקרוא את השפה ללא צורך בארגומנטים ב-route handlers ובתצוגות `remix/component`. קובצי הגדרת התוכן ממוקמים לצד התצוגות שלכם ב-`src/`:

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### הגדרות

צרו קובץ `intlayer.config.ts` בשורש הפרויקט שלכם כדי להצהיר על השפות הנתמכות והגדרות הבינאום:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> להגדרות תצורה נוספות (כגון מצב קפדני strict mode או העדפות אחסון ניתוב), עיינו ב[תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="הצהרה על התוכן הרב-לשוני שלכם">

הצהירו על התוכן המתורגם שלכם בקובץ `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      he: "ברוכים הבאים ל-Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      he: "אפליקציה מודולרית מבוססת תקני רשת עם i18n מובנה.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      he: "החלף שפה:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer תומכת גם בפורמטים JSON, YAML ו-CommonJS להצהרת תוכן. ראו את [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={4} title="בניית מילוני Intlayer">

הידור הגדרות המילונים מאפשר ליצור טיפוסי TypeScript ורישומי זמן ריצה:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

פעולה זו מהדרת את התוכן שלכם אל תוך ספריית הארטיפקטים `.intlayer`, ומאפשרת השלמה אוטומטית מלאה של TypeScript ושליפת מילונים מהירה.

</Step>
<Step number={5} title="הוספת ה-Middleware של Intlayer">

Remix 3 מספקת צינור middleware מודולרי באמצעות `createRouter({ middleware: [...] })`.

`remix-intlayer` מספקת את ה-middleware של `intlayer()`, המקבילה ב-Remix לפרוקסי של `next-intlayer` ו-`vite-intlayer`. עבור כל בקשה נכנסת הוא:

1. **מנתב את השפה**, בהתאם ל-`routing.mode` (כברירת מחדל `prefix-no-default`). כתובת URL ללא קידומת שפה מנותבת מחדש לכתובת המקומית של השפה שזוהתה (עוגיית האחסון `INTLAYER_LOCALE` או כותרת מותאמת אישית `x-intlayer-locale`, לאחר מכן משא ומתן סטנדרטי לפי `Accept-Language`, ולבסוף ה-`defaultLocale` שלכם) אלא אם כן אותה שפה אינה דורשת קידומת. כתובת עם קידומת כגון `/fr/about` מוגשת **מנתיב `/about`** בצרפתית, `/en/about` מנותבת מחדש ל-`/about`, וכללי `routing.rewrite` מוחלים לשני הכיוונים (`/fr/about` ← `/fr/a-propos`). נכסים סטטיים, ובמערכי `routing.domains` דומיינים של שפות, מטופלים באותו אופן כמו בשאר האינטגרציות.
2. **פותר את השפה** לתוך הקשר הבקשה של Remix, כ-`context.intlayer` (או `context.get(Intlayer)`), עם `locale`, `defaultLocale` ו-`availableLocales`.
3. **שומר על השפה** באמצעות העוגייה / הכותרת שהוגדרו, כך שבקשות עוקבות יפתרו את אותה השפה.

מכיוון שקידומת השפה מוסרת לפני התאמת הראוטר, הנתיבים שלכם מוגדרים פעם אחת, ללא מקטע `:locale`, ללא תלות במצב הניתוב. ה-middleware מריץ לאחר מכן את שאר הבקשה בתוך תחום `AsyncLocalStorage` המחובר להקשר הבקשה, מה שמאפשר ל-hooks של החבילה לקרוא את השפה ללא ארגומנטים, ב-route handlers, בתצוגות וברכיבי `remix/component` כאחד:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// בכל מקום בהמשך הזרם של ה-middleware
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` או `useIntlayer("faq", { item: 2 })` דורסים את שפת הבקשה עבור קריאה בודדת, ו-`useDictionary(homeContent)` קורא מילון מיובא במקום מפתח. מחוץ לבקשה, ה-hooks חוזרים לשפת ברירת המחדל.

> ה-middleware מכין בנוסף את מילוני Intlayer בעת עליית השרת, כך שגם אם נשכחה הרצת `intlayer build` הרישום לא יישאר ריק.

> הגדירו `routing.enableProxy: false` ב-`intlayer.config.ts` כדי לשמור רק על זיהוי השפה ולנהל את הניתוב בעצמכם. `intlayer({ ignore })` משאיר את הבקשות התואמות ללא שינוי (למשל קידומת API), ו-`intlayer({ isDevServer })` שולט האם השפה השמורה תניע הפניות במצב האוטומטי של `enableProxy`.

</Step>
<Step number={6} title="הגדרת נתיבים מוגני טיפוסיות (Type-Safe Routes)">

הגדירו את נתיבי האפליקציה שלכם באמצעות `route()` מ-`remix/routes`. הגדירו אותם פעם אחת, ללא מקטע שפה. ה-middleware ישרת כל שפה מתוכם:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  home: "/",
});
```

שימוש ב-`route()` מעניק לכם יצירת כתובות URL בטוחה בטיפוסיות בכל האפליקציה, ו-`getLocalizedPath` מחיל עליה את מצב הניתוב:

```typescript
import { getLocalizedPath } from "intlayer";

routes.home.href(); // "/"
getLocalizedPath(routes.home.href(), "fr"); // "/fr"
getLocalizedPath(routes.home.href(), "en"); // "/" (שפת ברירת מחדל)
```

</Step>
<Step number={7} title="רינדור עמודים מתורגמים באמצעות JSX">

Remix 3 מרנדרת ממשק משתמש באמצעות רכיבי JSX מ-`remix/component`. רכיב הוא **פונקציית setup** המקבלת `Handle` ומחזירה **פונקציית render**. שלב ה-setup רץ פעם אחת לכל מופע, ה-render רץ בכל עדכון, וה-props נקראים דרך `handle.props`.

התחילו עם מעטפת `Document` משותפת המגדירה את מאפייני `<html lang="..." dir="...">` לפי השפה שנפתרה על ידי ה-middleware:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/component";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

לאחר מכן צרו את דף הבית. הוא קורא את המילון המתורגם באמצעות `useIntlayer` ומרנדר בורר שפות:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> JSX של Remix אינו React: המאפיין `class` נכתב כפי שהוא (גם `className` מתקבל), ורינדורים מחדש מופעלים במפורש עם `handle.update()`. ערכים משובצים עוברים escape באופן אוטומטי. ה-hooks של Intlayer הם פונקציות פשוטות הקוראות את תחום הבקשה, ולכן ניתן לקרוא להם מפונקציית ה-setup או מפונקציית ה-render כאחד.

</Step>
<Step number={8} title="חיבור ה-Router והשרת">

הוסיפו את ה-middleware של `render()` מ-`remix/middleware/render` לצד ה-middleware של Intlayer. הוא מתקין את `context.render(node, init)` בכל בקשה, מה שמזרים את עץ ה-JSX לתוך `Response` של HTML (תוך הוספת `<!DOCTYPE html>` בהתחלה והגדרת כותרת `Content-Type`):

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. אתחול ה-router עם Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. מיפוי route handlers: כולם מגיעים אל `home` עבור `/`, `/fr`, `/es`...
router.map(routes, {
  actions: {
    home(context) {
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` מקבל אובייקט `ResponseInit` אופציונלי כארגומנט שני, למשל `context.render(<NotFoundPage />, { status: 404 })`. השפה שנפתרה נשארת נגישה מה-handler כ-`context.intlayer.locale`, למשל לצורך בניית מטען `Response.json`.

לבסוף, חשפו את ה-router באמצעות fetch handler סטנדרטי. אותו router רץ על גבי Node.js, Bun, Deno ו-Cloudflare Workers:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="בדיקה ומילוי אוטומטי של תרגומים">

Intlayer מספקת CLI לביקורת תרגומים חסרים ולמילוי שלהם באופן אוטומטי באמצעות AI:

```bash packageManager="npm"
# בדיקת תרגומים חסרים
npx intlayer test

# מילוי תרגומים חסרים באמצעות AI
npx intlayer fill
```

```bash packageManager="pnpm"
# בדיקת תרגומים חסרים
pnpm dlx intlayer test

# מילוי תרגומים חסרים באמצעות AI
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# בדיקת תרגומים חסרים
yarn dlx intlayer test

# מילוי תרגומים חסרים באמצעות AI
yarn dlx intlayer fill
```

```bash packageManager="bun"
# בדיקת תרגומים חסרים
bun x intlayer test

# מילוי תרגומים חסרים באמצעות AI
bun x intlayer fill
```

</Step>
</Steps>

## הגדרת TypeScript

כוונו את ה-JSX לסביבת הריצה של `remix/component` וודאו שקובץ `tsconfig.json` שלכם כולל את הטיפוסים שנוצרו ב-`.intlayer`:

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/component",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> ההגדרה `jsxImportSource: "remix/component"` היא שגורמת ל-`<HomePage />` להיפתר ל-`createElement` של Remix במקום לזה של React.

## סיכום

באמצעות Remix 3 ו-Intlayer, עומד לרשותכם מחסנית טכנולוגית רזה, מוגנת טיפוסיות לחלוטין וניידת בין סביבות ריצה הפועלת בהתאם לתקני רשת פתוחים. האפליקציה שלכם יכולה להתרחב בקלות מדפי נחיתה שיווקיים מתורגמים ועד לשירותים מבוזרים גלובלית המרונדרים ב-Edge.
