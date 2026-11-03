---
createdAt: 2025-04-18
updatedAt: 2026-11-03
priority: 9
title: "Vite + Svelte i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer באפליקציית Vite ו-Svelte: תוכן מתורגם באמצעות stores, בורר שפות, נתיבים מותאמים לשפה ומילונים מוקלדים."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
applicationShowcase: https://intlayer-vite-svelte-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 5.5.11
    date: 2025-11-19
    changes: "עדכון תיעוד"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-Vite וה-Svelte שלך באמצעות Intlayer

<Tabs defaultTab="code">
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-svelte-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="הדגמה" value="demo">

<iframe
  src="https://intlayer-vite-svelte-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמה - intlayer-vite-svelte-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `svelte-i18n` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא ל-Svelte">

Intlayer מותאם לפעול בצורה מושלמת עם Svelte על ידי מתן **תחימת תוכן ברמת הרכיב (component-level content scoping)**, **תרגומים ריאקטיביים**, וכל התכונות הדרושות להרחבת בינאום (i18n).

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

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Vite ו-Svelte

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-vite-svelte-template) ב-GitHub.

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
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **svelte-intlayer**
  החבילה המשלבת את Intlayer באפליקציית Svelte. היא מספקת ספקי הקשר ו-stores עבור בינאום ב-Svelte.

- **vite-intlayer**
  כולל את תוסף ה-Vite לשילוב Intlayer עם [הבאנדלר Vite](https://vite.dev/guide/why.html#why-bundle-for-production), וכן תוכנת ביניים (middleware) לזיהוי השפה המועדפת של המשתמש, ניהול עוגיות וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלך">

### ארכיטקטורה

בארכיטקטורה זו, `svelte-intlayer` מספק stores וכלים ריאקטיביים לניהול תרגומים בתוך רכיבי Svelte. הצהרות תוכן ממוקמות ב-`src/` לצד הרכיבים.

```bash
.
├── src
│   ├── app.content.ts
│   ├── app.css
│   ├── App.svelte                    # רכיב השורש
│   ├── lib
│   │   ├── Counter.svelte
│   │   └── LocaleSwitcher.svelte
│   ├── main.ts                       # נקודת כניסה
│   └── vite-env.d.ts
├── index.html
├── intlayer.config.ts
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### תצורה

צור קובץ תצורה כדי להגדיר את השפות של האפליקציה שלך:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

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
};

export default config;
```

> באמצעות קובץ תצורה זה, תוכל להגדיר כתובות URL מותאמות לשפה, הפניות של middleware, שמות של קובצי cookie, מיקום וסיומות של הצהרות התוכן שלך, להשבית יומני Intlayer במסוף, ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיין ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בתצורת ה-Vite שלך">

הוסף את התוסף של intlayer לתצורה שלך.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> תוסף ה-Vite `intlayer()` משמש לשילוב Intlayer ב-Vite. הוא מבטיח את בניית קובצי הצהרת התוכן ומנטר אותם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={4} title="הצהרה על התוכן שלך">

צור ונהל את הצהרות התוכן שלך כדי לאחסן תרגומים:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      he: "שלום עולם",
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "he": "שלום עולם",
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> הצהרות התוכן שלך יכולות להיות מוגדרות בכל מקום באפליקציה שלך, כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיין ב[תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={5} title="שימוש ב-Intlayer בקוד שלך">

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- רינדור תוכן כתוכן פשוט  -->
<h1>{$content.title}</h1>
<!-- לרינדור התוכן כניתן לעריכה באמצעות העורך -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- לרינדור התוכן כמחרוזת -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

> אם האפליקציה שלך כבר קיימת, תוכל להשתמש ב-[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md), כמו גם ב[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md), כדי להמיר אלפי רכיבים בשניות.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Step>
<Step number={6} title="שינוי שפת התוכן שלך" isOptional={true}>

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from "svelte-intlayer";

// קבלת פרטי השפה ופונקציית setLocale
const { locale, availableLocales, setLocale } = useLocale();

// טיפול בשינוי שפה
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>
<Step number={7} title="רינדור Markdown ו-HTML" isOptional={true}>

Intlayer תומך ברינדור תוכן Markdown ו-HTML ב-Svelte.

כברירת מחדל, Intlayer מתייחס ל-Markdown ול-HTML כרכיבים אינטראקטיביים או כמחרוזות. כדי לרנדר אותם ב-Svelte, תוכל להשתמש ב-`{@const Component = ...}<Component />` עבור רכיבים או ב-`{@html ...}` עבור מחרוזות פשוטות.

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<!-- רינדור Markdown כרכיב -->
{@const MyMarkdownContent = $content.myMarkdownContent}<MyMarkdownContent />

<!-- רינדור תוכן HTML -->
{@html $content.myHtmlContent.toString()}

<!-- רינדור עם עקיפת רכיבים מותאמים אישית -->
{@const MyMarkdownContent = $content.myMarkdownContent.use({
    h1: (props) => {
      const h1 = document.createElement('h1');
      h1.style.color = 'red';
      h1.textContent = props.children;
      return h1;
    },
    MyCustomComponent: () => {
       const div = document.createElement('div');
       div.textContent = 'Custom Logic';
       return div;
    }
  })}
<MyMarkdownContent />
```

> [!TIP]
> תוכל גם לגשת לנתוני ה-front-matter של ה-markdown באמצעות המאפיין `$content.markdownContent.metadata.xxx`.

</Step>
<Step number={8} title="הגדרת עורך / CMS של Intlayer" isOptional={true}>

כדי להגדיר את עורך Intlayer, עליך לעקוב אחר [תיעוד עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md).

- [תיעוד עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

כדי להגדיר את ה-CMS של Intlayer, עליך לעקוב אחר [תיעוד ה-CMS של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [תיעוד ה-CMS של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Step>
<Step number={7} title="הוספת ניתוב מותאם לשפות (localized routing) לאפליקציה שלך" isOptional={true}>

כדי לטפל בניתוב מותאם לשפות באפליקציית ה-Svelte שלך, תוכל להשתמש ב-`svelte-spa-router` יחד עם `localeFlatMap` של Intlayer כדי לייצר נתיבים עבור כל שפה.

תחילה, התקן את `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

לאחר מכן, צור קובץ `Router.svelte` כדי להגדיר את הנתיבים שלך:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

עדכן את `main.ts` שלך כדי להרכיב את רכיב ה-`Router` במקום `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

לבסוף, עדכן את `App.svelte` שלך כדי לקבל את ה-prop של `locale` ולהשתמש בו עם `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from "svelte-intlayer";
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... שאר האפליקציה שלך ... -->
</main>
```

#### הגדרת ניתוב בצד השרת (אופציונלי)

במקביל, תוכל גם להשתמש ב-`intlayerProxy` כדי להוסיף ניתוב בצד השרת לאפליקציה שלך. תוסף זה יזהה אוטומטית את השפה הנוכחית על סמך כתובת ה-URL ויגדיר את קובץ ה-cookie המתאים לשפה. אם לא צוינה שפה, התוסף יקבע את השפה המתאימה ביותר על סמך העדפות שפת הדפדפן של המשתמש. אם לא זוהתה שפה, הוא יפנה לשפת ברירת המחדל.

> שים לב שכדי להשתמש ב-`intlayerProxy` בסביבת ייצור, עליך להעביר את החבילה `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מ-Intlayer v9, `intlayerProxy()` מצורף ישירות לתוסף `intlayer()` ומופעל כברירת מחדל דרך האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר עבור תאימות לאחור ועבור הגדרות הזקוקות לשליטה על סדר התוספים. הגדר `routing.enableProxy: false` כדי לבטל זאת. עיין ב[הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={8} title="שינוי כתובת ה-URL כאשר השפה משתנה" isOptional={true}>

כדי לאפשר למשתמשים להחליף שפות ולעדכן את כתובת ה-URL בהתאם, תוכל ליצור רכיב `LocaleSwitcher`. רכיב זה ישתמש ב-`getLocalizedUrl` מ-`intlayer` וב-`push` מ-`svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// קבלת פרטי השפה
const { locale, availableLocales } = useLocale();

// טיפול בהחלפת שפה
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

</Step>
<Step number={9} title="קישורים בינלאומיים (Internationalized Links)" isOptional={true}>

עבור קידום אתרים (SEO), מומלץ להוסיף קידומת של השפה לנתיבים שלך (למשל, `/about`, `/fr/about`).

```svelte fileName="src/lib/components/Link.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  export let href = "";
  const { locale } = useLocale();

  // עזר להוספת קידומת לכתובת ה-URL
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

</Step>
<Step number={10} title="חילוץ התוכן של הרכיבים שלך" isOptional={true}>

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

 </Tab>
 <Tab value='Babel compiler'>

 <Tabs>
 <Tab value='intlayer >= 9'>

> החל מ-v9, ה-`intlayerCompiler` כלול בתוסף `intlayer`. לכן אין צורך להוסיפו באופן ידני.

 </Tab>
 <Tab value='intlayer < 9'>

עדכן את `vite.config.ts` שלך כדי לכלול את תוסף `intlayerCompiler`:

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

</Steps>

### (אופציונלי) Sitemap ו-robots.txt (בזמן בנייה)

Intlayer כולל מעצבים כגון `generateSitemap` ו-`getMultilingualUrls` המפיקים פלט `sitemap.xml` ו-`robots.txt` רב-לשוני המוכן לסורקים (crawlers), אותו תוכל לכתוב לתיקיית `public/` בפרויקט שלך. בפועל מריצים סקריפט Node קצר **לפני** Vite (למשל בהוקים של npm כגון `predev` / `prebuild`) כך שהקבצים הללו יתקיימו כאשר בונים או מגישים את האפליקציה.

#### Sitemap

מחולל מפת האתר של Intlayer מכבד את הגדרות השפה שלך וכולל את המטא-נתונים הרגילים עבור סורקים.

> מפת האתר שנוצרת תומכת במרחב השמות `xhtml:link` (הרחבות XML של hreflang). בניגוד למחוללים בסיסיים הפולטים רק כתובות URL שטוחות, Intlayer מחבר קישורים דו-כיווניים בין כל וריאנט מקומי של כל דף (למשל `/about`, `/fr/about`, או `/about?lang=fr`, בהתאם למצב הניתוב שלך), מה שעוזר למנועי חיפוש לקשר בין כתובות URL מתורגמות.

#### Robots.txt

השתמש ב-`getMultilingualUrls` כדי שרשומות `Disallow` יכסו כל איות מקומי של נתיבים רגישים.

#### 1. הוסף את `generate-seo.mjs` בשורש הפרויקט

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

יש להתקין את `intlayer` כדי שהסקריפט יוכל לייבא אותה. הגדר את `SITE_URL` בסביבה עבור ייצור (למשל ב-CI).

> עדיף להשתמש ב-`generate-seo.mjs` עבור Node ESM. אם אתה משתמש ב-`generate-seo.js` במקום זאת, ודא שמוגדר `"type": "module"` ב-`package.json`, או הפעל את Node עם ESM מופעל.

#### 2. הרץ את הסקריפט לפני Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

התאם אם אתה משתמש ב-pnpm או ב-yarn. תוכל גם להפעיל את אותו הסקריפט מ-CI או משלב אחר אם זה מתאים לתהליך העבודה שלך.

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. זה מאפשר לך להימנע מביצוע commit שלהם למאגר ה-Git שלך.

כדי לעשות זאת, תוכל להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלך:

```bash
# Ignore the files generated by Intlayer
.intlayer
```

### הרחבת VS Code

כדי לשפר את חוויית הפיתוח שלך עם Intlayer, תוכל להתקין את **הרחבת Intlayer הרשמית ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטבעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בהרחבה, עיין ב[תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### להתקדם הלאה

כדי להתקדם הלאה, תוכל להטמיע את ה[עורך החזותי (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלך החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Vite ו-Svelte?">

ל-Vite אין דעה לגבי i18n, ולכן הבחירה מגיעה מהאקוסיסטם של Svelte:

- **`svelte-i18n`** ו-**`typesafe-i18n`**: קטלוגי הודעות מבוססי store הרשומים גלובלית.
- **`Paraglide`**: הודעות מהודרות, המתמקדות בשכבת ההודעות בלבד.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלך ([לצד כל רכיב או מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומעובד על ידי תוסף ה-Vite בזמן הבנייה, בעל טיפוסיות מלאה, עם תרגום AI, עורך חזותי ו-CMS.

היתרון הספציפי ל-Vite הוא שתרגומים נפתרים ועוברים tree shaking בזמן הידור במקום להיאחזר כ-JSON בזמן ריצה, כך שדף שולח רק את הרשומות שהוא מרנדר. עיין ב[למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="כמה תוספת בינאום מוסיפה לגודל ה-bundle שלי ב-Svelte?">

הרבה פחות מהגדרה מבוססת מרחב שמות, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. המהדר בזמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שבהן הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש מושמטים, ו[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל ה-bundle והדפים בעד 50%. עיין ב[אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/svelte.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/svelte.md)

</Question>
<Question title="האם אוכל לעבור מ-`svelte-i18n` או `typesafe-i18n` מבלי לשכתב את הרכיבים שלי?">

במידה רבה כן. עקוב אחר [מדריך המעבר מ-Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/svelte-i18n.md) כדי להעביר את התוכן. ניתן גם להעביר בהדרגה: [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתה מעביר רכיבים בזה אחר זה.

- [מדריך מעבר מ-Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/svelte-i18n.md)
- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי התרגום הקיימים שלי בפורמט JSON?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלך כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לך לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הפעל את `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלך, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכל לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 10 במדריך זה מפרט זאת.

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
<Question title="כיצד אני משתמש בתוכן מתורגם ברכיב Svelte?">

קרא ל-`useIntlayer` ברכיב שלך וקרא את התוכן המוחזר. הערך הוא ריאקטיבי, כך ששינוי השפה מרנדר מחדש את הרכיבים המשתמשים בו ללא טעינה מחדש של הדף. שלב 5 מציג את הרכיב, ושלב 7 עוסק ברינדור תוכן Markdown ו-HTML.

</Question>
<Question title="האם Intlayer עובד עם שרת הפיתוח של Vite וטעינה חמה (hot reload)?">

כן. תוסף ה-Vite `intlayer()` מנטר את קובצי ה-`.content.ts` שלך ובונה מחדש את המילונים המושפעים בעת שמירה, כך שהעריכות מופיעות ללא צורך בהפעלת שרת הפיתוח מחדש, והטיפוסים שנוצרו נוצרים מחדש בו זמנית כך שההשלמה האוטומטית נשארת מסונכרנת.

</Question>
<Question title="כיצד אני מגדיר ניתוב מותאם לשפות?">

שלבים 7 ו-8 מכסים את הנתיבים המותאמים לשפה ואת שכתוב ה-URL כאשר השפה משתנה, ושלב 9 מכסה קישורים בינלאומיים. `routing.mode` קובע את מבנה ה-URL: `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`), `"prefix-all"`, `"no-prefix"` (נקבע מתוך עוגייה, כותרת או דומיין) או `"search-params"` (`/about?locale=fr`). עיין ב[מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד אני תומך בשפות הנכתבות מימין לשמאל כמו ערבית או עברית?">

שלב 9 מכסה זאת. `getHTMLTextDir` מחזיר `ltr`, `rtl` או `auto` עבור שפה, כך שתוכל לקשור את `lang` ו-`dir` באלמנט השורש מתוך השפה הפעילה ולתת למאפיינים הלוגיים של ה-CSS שלך לטפל בשאר.

</Question>
<Question title="כיצד אני מטפל במטא-נתונים של SEO באפליקציית Vite המרונדרת בצד הלקוח?">

הגדר את `lang` ו-`dir` באלמנט ה-`html` מתוך השפה הפעילה, ופלוט חלופות `hreflang` עבור כל שפה מוצהרת בעזרת `getMultilingualUrls`, כולל `x-default`. עבור דפים שחייבים להיסרק באופן אמין, העדף הגדרה עם רינדור מוקדם או רינדור בצד השרת.

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
