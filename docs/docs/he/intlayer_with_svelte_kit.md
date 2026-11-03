---
createdAt: 2025-11-20
updatedAt: 2026-11-03
priority: 9
title: "SvelteKit i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer ב-SvelteKit: ניתוב שפות באמצעות hooks, תוכן מתורגם בפונקציות load וברכיבים, hreflang ומפת אתר."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-SvelteKit שלך באמצעות Intlayer

<Tabs defaultTab="code">
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת CodeSandbox - כיצד לבצע בינאום באפליקציה שלך באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="הדגמה" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמה - intlayer-sveltekit-template"
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
<Accordion header="כיסוי מלא ל-SvelteKit">

Intlayer מותאם לפעול בצורה מושלמת עם SvelteKit על ידי מתן **ניתוב רב-לשוני**, **תמיכה ב-SSR**, וכל התכונות הדרושות להרחבת בינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלך, טען רק את התוכן הדרוש. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלך בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

תיחום התוכן של האפליקציה שלך **מקל על התחזוקה** של אפליקציות בקנה מידה גדול. באפשרותך לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המנטלי של סקירת כל קוד התוכן שלך. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלך.

</Accordion>
<Accordion header="סוכני AI (AI Agents)">

מיקום משותף של תוכן (Co-locating) **מפחית את ההקשר הדרוש** למודלי שפה גדולים (LLMs). Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)** ו**[כישורי סוכן (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמש באוטומציה כדי לתרגם בצינור ה-CI/CD שלך בעזרת ה-LLM לבחירתך בעלות ספק ה-AI שלך. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, כמו גם [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) כדי לסייע **בתרגום ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול לגרום לבעיות ביצועים וריאקטיביות. Intlayer מבצע אופטימיזציה לטעינת התוכן בזמן הבנייה.

</Accordion>
<Accordion header="הרחבה עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n, Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באחסון עצמי** ו**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** שיעזרו לך לנהל את התוכן הרב-לשוני שלך **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, קופירייטרים וחברי צוות אחרים לחלק. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית SvelteKit

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-sveltekit-template) ב-GitHub.

כדי להתחיל, צור פרויקט SvelteKit חדש. הנה המבנה הסופי שניצור:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

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

- **intlayer**: חבילת הליבה של ה-i18n.
- **svelte-intlayer**: מספקת ספקי הקשר ו-stores עבור Svelte/SvelteKit.
- **vite-intlayer**: תוסף ה-Vite לשילוב הצהרות התוכן בתהליך הבנייה.

</Step>
<Step number={2} title="הגדרת הפרויקט שלך">

צור קובץ תצורה בשורש הפרויקט:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>
<Step number={3} title="שילוב Intlayer בתצורת ה-Vite שלך">

עדכן את `vite.config.ts` שלך כדי לכלול את תוסף Intlayer. תוסף זה מטפל בטרנספילציה של קובצי התוכן שלך.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // הסדר חשוב, יש למקם את Intlayer לפני SvelteKit
});
```

</Step>
<Step number={4} title="הצהרה על התוכן שלך">

צור את קובצי הצהרת התוכן שלך בכל מקום בתיקיית `src` (למשל, `src/lib/content` או לצד הרכיבים שלך). קבצים אלה מגדירים את התוכן הניתן לתרגום באפליקציה שלך באמצעות הפונקציה `t()` עבור כל שפה.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      he: "ברוכים הבאים ל-SvelteKit",
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>
<Step number={5} title="שימוש ב-Intlayer ברכיבים שלך">

כעת תוכל להשתמש בפונקציה `useIntlayer` בכל רכיב Svelte. היא מחזירה store ריאקטיבי המתעדכן אוטומטית כאשר השפה משתנה. הפונקציה תכבד אוטומטית את השפה הנוכחית (הן במהלך SSR והן במהלך ניווט בצד הלקוח).

> **הערה:** `useIntlayer` מחזירה Svelte store, לכן עליך להשתמש בקידומת `$` כדי לגשת לערכו הריאקטיבי (למשל, `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" תואם למפתח שהוגדר בשלב 4
  const content = useIntlayer("hero-section");
</script>

<!-- רינדור תוכן כתוכן פשוט  -->
<h1>{$content.title}</h1>
<!-- לרינדור התוכן כניתן לעריכה בעזרת העורך -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- לרינדור התוכן כמחרוזת -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>
<Step number={6} title="הגדרת ניתוב" isOptional={true}>

השלבים הבאים מציגים כיצד להגדיר ניתוב מבוסס שפה ב-SvelteKit. הדבר מאפשר לכתובות ה-URL שלך לכלול קידומת שפה (למשל, `/en/about`, `/fr/about`) לשיפור ה-SEO וחוויית המשתמש.

```bash
.
└─── src
    ├── app.d.ts                  # הגדרת טיפוס השפה (locale)
    ├── hooks.server.ts           # ניהול ניתוב שפות
    ├── lib
    │   └── getLocale.ts          # בדיקת השפה מהכותרת, עוגיות
    ├── params
    │   └── locale.ts             # הגדרת פרמטר השפה
    └── routes
        ├── [[locale=locale]]     # עטיפה בקבוצת נתיבים להגדרת השפה
        │   ├── +layout.svelte    # פריסה מקומית לנתיב
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # פריסת שורש עבור גופנים וסגנונות גלובליים
```

</Step>
<Step number={7} title="טיפול בזיהוי שפה בצד השרת">

ב-SvelteKit, השרת צריך לדעת את שפת המשתמש כדי לרנדר את התוכן הנכון במהלך SSR. אנו משתמשים ב-`hooks.server.ts` כדי לזהות את השפה מכתובת ה-URL או מהעוגיות.

צור או שנה את `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // בדיקה אם הנתיב הנוכחי כבר מתחיל בשפה (למשל /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // אם אין שפה ב-URL (למשל המשתמש מבקר ב-"/"), הפנה אותו
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // הפניה זמנית
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

לאחר מכן, צור פונקציית עזר לקבלת שפת המשתמש מאירוע הבקשה:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * קבלת שפת המשתמש מתוך אירוע הבקשה.
 * פונקציה זו משמשת ב-hook של `handle` ב-`src/hooks.server.ts`.
 *
 * תחילה היא מנסה לקבל את השפה מאחסון Intlayer (עוגיות או כותרות מותאמות אישית).
 * אם השפה לא נמצאה, היא נעזרת במשא ומתן של "Accept-Language" של הדפדפן.
 *
 * @param event - אירוע הבקשה מ-SvelteKit
 * @returns שפת המשתמש
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // ניסיון לקבל את השפה מאחסון Intlayer (עוגיות או כותרות)
  const storedLocale = getLocaleFromStorage({
    // גישה לעוגיות SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // גישה לכותרות SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // חזרה למשא ומתן "Accept-Language" של הדפדפן
  const negotiatorHeaders: Record<string, string> = {};

  // המרת אובייקט Headers של SvelteKit ל-Record<string, string> פשוט
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // בדיקת השפה מתוך כותרת ה-`Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // החזרת שפת ברירת המחדל אם לא נמצאה התאמה
  return defaultLocale;
};
```

> `getLocaleFromStorage` יבדוק את השפה מהכותרת או מהעוגייה בהתאם לתצורה שלך. עיין ב[תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md) לפרטים נוספים.

- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

> הפונקציה `localeDetector` תעבד את כותרת ה-`Accept-Language` ותחזיר את ההתאמה הטובה ביותר.

אם השפה אינה מוגדרת, ברצוננו להחזיר שגיאת 404. כדי להקל על כך, נוכל ליצור פונקציית `match` לבדיקה אם השפה תקינה:

```ts fileName="/src/params/locale.ts"
import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **הערה:** ודא שקובץ ה-`src/app.d.ts` שלך כולל את הגדרת השפה:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

עבור קובץ ה-`+layout.svelte`, נוכל להסיר הכל, כדי לשמור רק תוכן סטטי שאינו קשור ל-i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

לאחר מכן, צור דף ופריסה חדשים תחת הקבוצה `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// שימוש בטיפוס ה-Load הגנרי
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// אתחול Intlayer עם השפה מתוך הנתיב
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// שימוש במילון התוכן של הפריסה
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// שימוש במילון התוכן של דף הבית
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>
<Step number={8} title="קישורים בינלאומיים (Internationalized Links)" isOptional={true}>

עבור קידום אתרים (SEO), מומלץ להוסיף קידומת שפה לנתיבים שלך (למשל, `/en/about`, `/fr/about`). רכיב זה מוסיף אוטומטית קידומת של השפה הנוכחית לכל קישור.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // עזר להוספת קידומת של השפה הנוכחית לכתובת ה-URL
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

אם אתה משתמש ב-`goto` מ-SvelteKit, תוכל להשתמש באותה לוגיקה עם `getLocalizedUrl` כדי לנווט ל-URL המותאם לשפה:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // מנווט אל /en/about או /fr/about בהתאם לשפה
```

</Step>
<Step number={9} title="בורר שפות (Language Switcher)" isOptional={true}>

כדי לאפשר למשתמשים להחליף שפות, עדכן את כתובת ה-URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // יגדיר את השפה ב-store ויפעיל את onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>
<Step number={10} title="הוספת פרוקסי בצד השרת (Backend proxy)" isOptional={true}>

כדי להוסיף פרוקסי בצד השרת לאפליקציית ה-SvelteKit שלך, תוכל להשתמש בפונקציה `intlayerProxy` המסופקת על ידי התוסף `vite-intlayer`. תוסף זה יזהה אוטומטית את השפה המתאימה ביותר עבור המשתמש על סמך ה-URL, העוגיות והעדפות השפה של הדפדפן.

> החל מ-Intlayer v9, `intlayerProxy()` מצורף ישירות לתוסף `intlayer()` ומופעל כברירת מחדל דרך האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר עבור תאימות לאחור ועבור הגדרות הזקוקות לשליטה על סדר התוספים. הגדר `routing.enableProxy: false` כדי לבטל זאת. עיין ב[הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md).

- [הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md)

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],
});
```

</Step>
<Step number={11} title="הגדרת עורך / CMS של Intlayer" isOptional={true}>

כדי להגדיר את עורך Intlayer, עליך לעקוב אחר [תיעוד עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md).

- [תיעוד עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)

כדי להגדיר את ה-CMS של Intlayer, עליך לעקוב אחר [תיעוד ה-CMS של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

- [תיעוד ה-CMS של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

כדי שתוכל לראות את בורר עורך Intlayer, יהיה עליך להשתמש בתחביר הרכיב בתוך תוכן ה-Intlayer שלך.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- רינדור תוכן כתוכן פשוט  -->
  <h1>{$content.title}</h1>

  <!-- רינדור תוכן כרכיב (נדרש על ידי העורך) -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>
<Step number={12} title="חילוץ התוכן של הרכיבים שלך" isOptional={true}>

אם יש לך בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציע [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md) כדי להמיר את הרכיבים שלך ולחלץ את התוכן.

- [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)
- [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

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

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer.

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### להתקדם הלאה

- [עורך חזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית SvelteKit?">

- **`svelte-i18n`** ו-**`typesafe-i18n`**: קטלוגי הודעות מבוססי store, המחוברים לפונקציות ה-load באופן ידני.
- **`Paraglide`**: הודעות מהודרות עם טיפוסיות חזקה, המתמקדות בשכבת ההודעות בלבד.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלך ([לצד כל רכיב או מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומעובד בזמן הבנייה, עם ניתוב מודע לשפה, זיהוי שפה בצד השרת, תרגום AI, עורך חזותי ו-CMS.

ב-SvelteKit ההבדל ניכר בחלקים של צד השרת: זיהוי שפה ב-hooks, קישורים מותאמים לשפה ושילוב העורך מגיעים מובנים עם הספרייה במקום להיבנות מחדש בכל פרויקט. עיין ב[למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md) וב[השוואת ביצועים עבור Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/svelte.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)
- [השוואת ביצועים עבור Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/svelte.md)

</Question>
<Question title="כמה תוספת בינאום מוסיפה לגודל ה-bundle שלי ב-SvelteKit?">

הרבה פחות מהגדרה מבוססת מרחב שמות, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. תוכן המרונדר בשרת נפתר בשרת, והמהדר בזמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שבהן הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש מושמטים, ו[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל ה-bundle והדפים בעד 50%. עיין ב[אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/svelte.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/svelte.md)

</Question>
<Question title="האם אוכל לעבור מ-`svelte-i18n` או `typesafe-i18n` מבלי לשכתב את הרכיבים שלי?">

במידה רבה כן. עקוב אחר [מדריך המעבר מ-Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/svelte-i18n.md) כדי להעביר את התוכן. ניתן גם להעביר בהדרגה: [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתה מעביר רכיבים בזה אחר זה.

- [מדריך מעבר מ-Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/svelte-i18n.md)
- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי התרגום הקיימים שלי בפורמט JSON?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלך כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לך לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הפעל את `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלך, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכל לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 12 במדריך זה מפרט זאת.

עבור צינור אוטומטי לחלוטין, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) מבצע את אותו הדבר בזמן הבנייה: הוא סורק את קוד המקור שלך ב-JSX, TSX, Vue ו-Svelte בכל שינוי, מייצר את המילונים ושומר אותם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין מפתחות לתחזק ידנית כלל.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

כדאי להכיר שתי מגבלות לפני הפעלת המהדר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כמו `className="active"` או קוד סטטוס, מה שדורש כמה הערות בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אותך בתהליך קבלת ההחלטות.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

</Question>
<Question title="אילו כלי עריכה וכלי סוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: מעבר ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל האזכורים (find all references), תצוגה מקדימה בריחוף מעל ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא פותר גם קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שמסייע בזמן המעבר.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית משיב מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת כישור לכל framework, המלמדים סוכן את הגדרות הניתוב שלך ואת סוגי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם Intlayer עובד עם רינדור צד שרת (SSR) ורינדור מוקדם (prerendering) ב-SvelteKit?">

כן. שלב 7 מכסה זיהוי שפה בצד השרת ב-`hooks.server.ts`, כך שתגובת ה-HTML הראשונה כבר נושאת את השפה הנכונה, שזהו מה שמנועי חיפוש וסורקים חברתיים קוראים. נתיבים שרונדרו מראש פותרים את התוכן שלהם בזמן הבנייה.

</Question>
<Question title="כיצד אני מגדיר נתיבים מותאמים לשפה וקישורים בינלאומיים?">

שלבים 6 ו-8 מכסים זאת. מקטע שפה בעץ הנתיבים יחד עם `getLocalizedUrl` עבור קישורים שומרים על הניווט בתוך השפה הפעילה, ו-`routing.mode` קובע האם לשפת ברירת המחדל מתווספת קידומת בכלל. עיין ב[מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Question>
<Question title="כיצד אני בונה מחליף שפות ב-Svelte?">

שלב 9 מציג את הרכיב. `useLocale` חושף את השפה הפעילה, השפות המוצהרות ו-setter ששומר את הבחירה בעוגייה, בעוד ש-`getLocalizedUrl` משכתב את הנתיב הנוכחי כך שהקורא נשאר באותו הדף לאחר ההחלפה.

</Question>
<Question title="כיצד אני מתרגם אפליקציית SvelteKit באופן אוטומטי בעזרת AI?">

הפעל את `npx intlayer fill`, הממלא תרגומים חסרים באמצעות ה-LLM לבחירתך בעזרת הספק ומפתח ה-API שלך, ו-`--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף. עיין ב[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) וב[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md), תנאים, [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md) ו[מעצבי פורמט (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)
- [מעצבי פורמט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות ה[עורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md), הפועל על התשתית שלך ומאפשר לכל אחד לערוך טקסט במקום באפליקציה הפועלת, או ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md), המוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחודשת (deployment).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md).

- [אירוח עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)

</Question>

</FAQ>
