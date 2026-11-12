---
createdAt: 2024-03-07
updatedAt: 2026-11-03
priority: 9
title: "Astro + Svelte i18n - מדריך מלא לתרגום האפליקציה שלכם"
description: "הגדירו את Intlayer ב-Astro עם islands של Svelte: רכיבים מתורגמים, נתיבים מותאמי שפה ו-hreflang, עם תוכן בעל טיפוסיות לכל רכיב."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Astro
  - Svelte
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - svelte
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "שימוש בהוקים useIntlayer / useLocale של astro-intlayer בדף ה-Astro"
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון שימוש ב-API של Solid useIntlayer לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "רענון עבור אינטגרציית Astro, הגדרות ושימוש"
author: aymericzip
---

# תרגום אתר Astro + Svelte שלכם באמצעות Intlayer

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - כיצד לבצע בינאום באפליקציה שלכם באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `astro-i18n` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא ל-Astro">

Intlayer מותאם לעבוד בצורה מושלמת עם Astro ומציע **ניתוב רב-לשוני (multilingual routing)**, **מפת אתר (sitemap)**, וכל התכונות הנדרשות להרחבת הבינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON מסיביים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייע **להקטין את גודל החבילה ודפי האתר בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

תיחום (scoping) התוכן באפליקציה **מקל על התחזוקה** באפליקציות בקנה מידה גדול. ניתן לשכפל או למחוק תיקיית תכונה (feature) בודדת ללא הנטל של בדיקת כל בסיס הקוד של התוכן. בנוסף, Intlayer מספק **טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכני AI">

מיקום משותף (co-location) של תוכן **מפחית את ההקשר הנדרש** עבור מודלי שפה גדולים (LLMs). כמו כן, Intlayer מגיע עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**, ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית הפיתוח (DX) לחלקה עוד יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה כדי לתרגם בתהליך ה-CI/CD שלכם באמצעות ה-LLM לבחירתכם בעלות ספק ה-AI שלכם. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת רשת](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) שתסייע **לתרגם ברקע**.

- [פלטפורמת רשת](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON מסיביים לרכיבים עלול להוביל לבעיות ביצועים ותגובתיות. Intlayer מייעל את טעינת התוכן בזמן הבנייה (build time).

</Accordion>
<Accordion header="הרחבה לעבודה עם צוותים שאינם מפתחים">

מעבר להיותו פתרון i18n בלבד, Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי (self-hosted)** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לפשוט וחלק. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer ב-Astro + Svelte

ראו את [תבנית האפליקציה (Application Template)](https://github.com/aymericzip/intlayer-astro-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות באמצעות מנהל החבילות שלכם:

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
npm install intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte
```

```bash packageManager="bun"
bun add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte
```

- **intlayer**
  חבילת הליבה המספקת כלי בינאום לניהול הגדרות, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **astro-intlayer**
  כוללת את תוסף האינטגרציה ל-Astro לשילוב Intlayer עם [ה-bundler של Vite](https://vite.dev/guide/why.html#why-bundle-for-production), middleware שמפענח את ה-locale של כל בקשה לתוך `Astro.locals.intlayer`, ואת ההוקים `useIntlayer` / `useDictionary` / `useLocale`. אותו נתיב ייבוא מפוענח למימוש השרת ב-frontmatter של `.astro` ולמימוש הלקוח (המבוסס על `vanilla-intlayer`) בבלוקי `<script>`.

- **svelte**
  חבילת הליבה של Svelte.

- **svelte-intlayer**
  החבילה המשלבת את Intlayer עם אפליקציות Svelte. היא מספקת את `setupIntlayer` ואת ה-stores `useIntlayer` ו-`useLocale` עבור בינאום ב-Svelte.

- **@astrojs/svelte**
  אינטגרציית Astro הרשמית המאפשרת שימוש ב-component islands של Svelte.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

### ארכיטקטורה

בארכיטקטורה זו, אינטגרציית `intlayer()` הרשומה ב-`astro.config.ts` בונה את המילונים שלכם ומוסיפה middleware שמפענח את ה-locale של כל בקשה וחושף אותו ב-`Astro.locals.intlayer`. הדפים ממוקמים תחת מקטע rest של `src/pages/[...locale]/`, כך ששפת ברירת המחדל מוגשת ללא קידומת וכל שפה אחרת מקבלת כתובת URL ייעודית משלה. קובצי `.astro` קוראים את התוכן באמצעות ההוקים `useIntlayer` / `useLocale` של `astro-intlayer` עבור רינדור השרת, ו-Svelte island (`src/components/svelte/SvelteIsland.svelte`) מקבל את ה-locale שזוהה בשרת כ-prop ומעביר אותו ל-`svelte-intlayer` עבור החלק האינטראקטיבי. הצהרות התוכן ממוקמות לצד הרכיבים שלכם ב-`src/`.

```bash
.
├── src
│   ├── app.content.ts                # הצהרת תוכן האפליקציה
│   ├── components
│   │   └── svelte
│   │       └── SvelteIsland.svelte   # Svelte island (תוכן + בורר שפות)
│   └── pages
│       ├── [...locale]
│       │   └── index.astro           # דף מותאם שפה הטוען את ה-island
│       ├── robots.txt.ts             # נקודת קצה עבור robots.txt
│       └── sitemap.xml.ts            # נקודת קצה עבור sitemap מותאם שפות
├── astro.config.ts                   # הגדרות Astro עם אינטגרציות intlayer() ו-svelte()
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### הגדרות

צרו קובץ הגדרות כדי להגדיר את השפות של האפליקציה שלכם:

```typescript fileName="intlayer.config.ts"
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

> באמצעות קובץ הגדרות זה, תוכלו להגדיר כתובות URL מותאמות לשפה, הפניות מחדש של middleware, שמות של עוגיות (cookies), את המיקום והסיומת של הצהרות התוכן שלכם, לבטל לוגים של Intlayer במסוף, ועוד. לרשימה מלאה של הפרמטרים הזמינים, עיינו ב-[תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בהגדרות ה-Astro שלכם">

הוסיפו את תוסף intlayer ואת אינטגרציית Svelte להגדרות שלכם.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), svelte()],
});
```

> תוסף האינטגרציה `intlayer()` ל-Astro משמש לשילוב Intlayer עם Astro. הוא מבטיח את בניית קובצי הצהרת התוכן ומנטר אותם במצב פיתוח (development). הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Astro. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

> אינטגרציית `svelte()` מאפשרת שימוש ב-component islands של Svelte באמצעות `client:only="svelte"`.

</Step>
<Step number={4} title="הצהרה על התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```typescript fileName="src/app.content.ts"
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

> ניתן להגדיר את הצהרות התוכן שלכם בכל מקום באפליקציה כל עוד הן כלולות בספריית `contentDir` (כברירת מחדל, `./src`), ומתאימות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב-[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={5} title="שימוש בתוכן שלכם ב-Astro">

צרכו את המילונים שלכם בקובצי `.astro` באמצעות ההוקים המיוצאים מ-`astro-intlayer`. הם חולקים את אותן חתימות של קישורי ה-framework: `useIntlayer("key")` מחזיר את תוכן המילון ו-`useLocale()` את ה-locale הנוכחי, ללא צורך בהעברת ארגומנטים נוספים.

ה-locale מגיע מה-middleware של `astro-intlayer`, שהאינטגרציה רושמת עבורכם לפני `src/middleware.ts` שלכם. הוא מפענח אותו עבור כל בקשה, מקידומת ה-URL, לאחר מכן מה-locale שנשמר בלקוח בעוגייה או כותרת, ולאחר מכן מ-`Accept-Language`, ושומר אותו ב-`Astro.locals.intlayer`. דפים שעברו prerender משתמשים רק ב-URL, מכיוון שהם מרונדרים פעם אחת עבור כל המבקרים.

עליכם להוסיף גם מטא-דאטה ל-SEO כמו קישורי hreflang וקישורים קנוניים (canonical) לכל דף, ולהטמיע את ה-Svelte island עבור תוכן אינטראקטיבי בצד הלקוח.

```astro fileName="src/pages/[...locale]/index.astro"
---
import { useIntlayer, useLocale } from "astro-intlayer";
import {
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  getHTMLTextDir,
} from "intlayer";
import SvelteIsland from "../../components/svelte/SvelteIsland.svelte";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

// ה-locale שפוענח על ידי ה-middleware (למשל: /es/about -> 'es')
const { locale } = useLocale();

// התוכן של מילון 'app' עבור אותו locale
const { title } = useIntlayer("app");
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: מורה למנועי חיפוש מהי הגרסה הראשית של דף זה -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: מיידע את מנועי החיפוש על כל הגרסאות המתורגמות -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: ברירת מחדל חלופית למשתמשים בשפות שאינן תואמות -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- ה-Svelte island מרנדר את כל התוכן האינטראקטיבי, כולל בורר השפות -->
    <SvelteIsland locale={locale} client:only="svelte" />
  </body>
</html>
```

> אם ברצונכם להשתמש בתוכן שלכם במאפיין מסוג `string`, כגון `alt`, `title`, `href`, `aria-label`, וכו', תוכלו להשתמש בערך הפונקציה, לדוגמה:

> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> `Astro.locals.intlayer` חושף גם את `locale`, `defaultLocale` ו-`availableLocales` ל-middleware ולנקודות הקצה שלכם. העבירו locale או בורר כארגומנט שני (`useIntlayer("app", "fr")`, `useIntlayer("faq", { item: 2 })`) כדי לדרוס את ה-locale של הבקשה עבור קריאה ספציפית.

> **הערה על הגדרת ניתוב:**
> מבנה הספריות שבו תשתמשו תלוי בהגדרת `middleware.routing` בקובץ `intlayer.config.ts` שלכם:
>
> - **`prefix-no-default` (ברירת מחדל):** שומר את שפת ברירת המחדל בנתיב השורש (ללא קידומת) ומוסיף קידומת לאחרות. השתמשו ב-`[...locale]` כדי לתפוס את כל המקרים.
> - **`prefix-all`:** לכל כתובות ה-URL מתווספת קידומת שפה. ניתן להשתמש ב-`[locale]` רגיל אם אינכם צריכים לטפל בשורש בנפרד.
> - **`search-param` או `no-prefix`:** אין צורך בתיקיית locale. ה-locale מנוהל באמצעות פרמטרי חיפוש (search parameters) או עוגיות.

</Step>
<Step number={6} title="יצירת רכיב ה-Svelte Island">

צרו את רכיב ה-island שעוטף את אפליקציית ה-Svelte שלכם. יש לקרוא ל-`setupIntlayer` עם ה-locale שזוהה בשרת לפני הגישה ל-store כלשהו.

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useIntlayer, useLocale, setupIntlayer } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  export let locale: LocalesValues;

  setupIntlayer(locale);

  const content = useIntlayer("app");
  const { locale: currentLocale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div>
  <h1>{$content.title}</h1>
  <!-- בורר השפות מרונדר ישירות בתוך ה-island -->
  <div class="locale-switcher">
    <span class="switcher-label">החלפת שפה:</span>
    <div class="locale-buttons">
      {#each availableLocales as localeItem}
        <button
          class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
          disabled={localeItem === $currentLocale}
          on:click={() => setLocale(localeItem)}
        >
          <span class="ls-own-name">{getLocaleName(localeItem)}</span>
          <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
          <span class="ls-code">{localeItem.toUpperCase()}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
```

> ה-prop `locale` מועבר מדף ה-Astro (לאחר שזוהה בשרת) ומשמש לאתחול `setupIntlayer`, מה שהופך אותו ל-locale ההתחלתי עבור כל ה-stores ברכיב.

</Step>
<Step number={7} title="הוספת בורר שפות (Locale Switcher)">

בורר השפות מוטמע ישירות ב-Svelte island (כפי שמוצג בשלב 6). הוא משתמש ב-`useLocale` מתוך `svelte-intlayer` ומנווט אל ה-URL המותאם לשפה כאשר המשתמש בוחר שפה חדשה:

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useLocale } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  // שימוש חוזר באותה הגדרת locale/setupIntlayer כמו בשלב 6 לעיל...

  const {
    locale: currentLocale,
    availableLocales,
    setLocale,
  } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // ניווט ל-URL המותאם לשפה בעת שינוי שפה
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div class="locale-switcher">
  <span class="switcher-label">החלפת שפה:</span>
  <div class="locale-buttons">
    {#each availableLocales as localeItem}
      <button
        class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
        disabled={localeItem === $currentLocale}
        on:click={() => setLocale(localeItem)}
      >
        <span class="ls-own-name">{getLocaleName(localeItem)}</span>
        <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
        <span class="ls-code">{localeItem.toUpperCase()}</span>
      </button>
    {/each}
  </div>
</div>
```

> **הערה על שמירת העדפה (Persistence):**
> שימוש ב-`onLocaleChange` לביצוע הפניה מחדש באמצעות `window.location.href` מבטיח מעבר ל-URL של השפה החדשה, ומאפשר ל-middleware של Intlayer לקבוע את עוגיית ה-locale ולזכור את העדפת המשתמש בביקורים עתידיים.

</Step>
<Step number={8} title="מפת אתר (Sitemap) ו-Robots.txt">

Intlayer מספק כלי עזר ליצירת מפות אתר וקובצי robots.txt מותאמים לשפות באופן דינמי.

#### מפת אתר (Sitemap)

Intlayer מגיע עם מחולל מפת אתר מובנה שיעזור לכם ליצור בקלות מפת אתר עבור האפליקציה שלכם. הוא מטפל בנתיבים מותאמים לשפות ומוסיף את המטא-דאטה הנדרש למנועי חיפוש.

> מפת האתר שנוצרת על ידי Intlayer תומכת במרחב השמות `xhtml:link` (הרחבות XML עבור Hreflang). בניגוד למחוללי מפות אתר רגילים שרק מפרטים כתובות URL גולמיות, Intlayer יוצר אוטומטית את הקישורים הדו-כיווניים הנדרשים בין כל גרסאות השפה של דף (לדוגמה, `/about`, `/about?lang=fr`, ו-`/about?lang=es`). הדבר מבטיח שמנועי חיפוש יאנדקסו ויגישו בצורה נכונה את גרסת השפה המתאימה לקהל היעד הנכון.

צרו את `src/pages/sitemap.xml.ts` כדי ליצור מפת אתר הכוללת את כל הנתיבים מותאמי השפה שלכם.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, {
    siteUrl: "https://example.com",
  });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

צרו את `src/pages/robots.txt.ts` כדי לשלוט בסריקה של מנועי חיפוש.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>
<Step number={15} title="חילוץ תוכן הרכיבים שלכם" isOptional={true}>

אם יש לכם בסיס קוד קיים, המרה של אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציע [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) כדי להמיר את הרכיבים שלכם ולחלץ את התוכן.

- [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

כדי להגדיר זאת, תוכלו להוסיף מקטע `compiler` בקובץ `intlayer.config.ts` שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... שאר ההגדרות שלכם
  compiler: {
    /**
     * מציין אם יש להפעיל את המהדר.
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * מציין אם יש לשמור את הרכיבים לאחר ההמרה.
     *
     * - אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. כך ההמרה תהיה קבועה, והמהדר ידלג על ההמרה בעיבוד הבא. בדרך זו, המהדר יכול להמיר את האפליקציה ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לתוך הקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד המקורי ללא שינוי. ההמרה תבוצע בזיכרון בלבד.
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

הריצו את המחלץ כדי להמיר את הרכיבים שלכם ולחלץ את התוכן

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

בנו את האפליקציה שלכם כדי להמיר את הרכיבים שלכם ולחלץ את התוכן

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

### הגדרת TypeScript

Intlayer משתמש בהרחבת מודולים (module augmentation) כדי ליהנות מיתרונות TypeScript ולהפוך את בסיס הקוד שלכם לחזק יותר.

![השלמה אוטומטית](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![שגיאת תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

וודאו שתצורת ה-TypeScript שלכם כוללת את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  // ... הגדרות ה-TypeScript הקיימות שלכם
  include: [
    // ... הגדרות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. זה מאפשר לכם להימנע מביצוע commit שלהם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלכם:

```bash
# התעלמות מהקבצים שנוצרו על ידי Intlayer
.intlayer
```

### הרחבת VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **ההרחבה הרשמית של Intlayer ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון פשוטים של תרגומים.

לפרטים נוספים על אופן השימוש בהרחבה, עיינו ב-[תיעוד הרחבת ה-VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת ה-VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### הרחבה נוספת

להמשך, תוכלו להטמיע את [העורך החזותי (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום של אתר Astro עם Svelte islands?">

אפשרות ה-`i18n` המובנית של Astro מטפלת בקידומות שפה והפניות מחדש, אך אינה מנהלת את התוכן עצמו, ולכן עדיין נדרשת שכבת הודעות, ו-island מוסיף אתגר נוסף: ה-island מריץ Svelte, לא Astro.

- **`i18n` של Astro בתוספת מילונים שנכתבו ידנית**, יחד עם **`svelte-i18n`** בתוך ה-island: שני מקורות תוכן שיש לסנכרן ביניהם, ללא טיפוסיות משותפת.
- **`Intlayer`**: שכבת תוכן אחת לשניהם. `astro-intlayer` מכסה את דפי ה-`.astro` ו-`svelte-intlayer` מכסה את ה-Svelte islands, תוך קריאת אותן הצהרות תוכן.

היכולת להצהיר על תווית פעם אחת ולהשתמש בה הן בדף סטטי והן ב-island אינטראקטיבי היא הסיבה לבחור בשכבת תוכן אחידה כאן. ראו [מדוע כדאי לבחור ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md).

- [מדוע כדאי לבחור ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)

</Question>
<Question title="בכמה מגדיל ה-i18n את גודל החבילה (bundle size) של Astro שלי?">

הרבה פחות מהגדרה מבוססת מרחבי שמות (namespaces), מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. דפי Astro מרונדרים בזמן הבנייה, ולכן הם שולחים HTML מתורגם וללא מילון כלל; רק ה-islands מקבלים מילון. המהדר בזמן הבנייה מפענח את קריאות התוכן לערכים המדויקים שבהם הרכיב משתמש, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הנפוצות, Intlayer מקטין את גודל החבילה והדפים בעד 50%. ראו [אופטימיזציית חבילה (bundle optimization)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ואת [מבחן הביצועים (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="האם ניתן להגר מ-`svelte-i18n` מבלי לשכתב את הרכיבים שלי?">

במידה רבה, כן. פעלו לפי [מדריך ההגירה מ-Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/svelte-i18n.md) כדי להעביר את התוכן. ניתן גם להגר באופן הדרגתי: [תוסף סנכרון JSON (sync JSON plugin)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים שלכם כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתם מעבירים רכיבים בזה אחר זה.

- [מדריך הגירה מ-Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/svelte-i18n.md)
- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי `/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומפיק מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) מבצע את אותה פעולה עבור קטלוגי gettext, ו-[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו את `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל רכיב, כך שתבדקו diff במקום להעתיק מחרוזות לקטלוג באופן ידני. שלב 15 במדריך זה מפרט את התהליך.

עבור צינור עבודה (pipeline) אוטומטי לחלוטין, [המהדר של Intlayer (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) מבצע את אותה פעולה בזמן הבנייה: הוא סורק את קוד המקור של ה-JSX, TSX, Vue ו-Svelte שלכם בכל שינוי, מייצר את המילונים ושומר אותם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין שום מפתחות לתחזק ידנית.

- [המהדר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

ישנן שתי מגבלות שכדאי להכיר לפני הפעלת המהדר. הוא פועל באמצעות ניתוח סטטי (static analysis), ולכן מחרוזות שקיימות רק בזמן ריצה, כמו קודי שגיאה מ-API או שדות CMS, אינן נגישות עבורו. בנוסף, עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כגון `className="active"` או קוד סטטוס, מה שדורש מספר ביאורים (annotations) בבסיס קוד גדול. [פקודת החילוץ (extract command)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אתכם בתהליך הבקרה.

- [פקודת חילוץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עורך וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מתוך לוח הפקודות (command palette) או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה רמת מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל המופעים (find all references), תצוגה מקדימה בריחוף (hover preview) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שעוזר בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר AI עונה מתוך תיעוד עדכני במקום לנחש, ויכול להריץ פקודות כמו `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: מיומנויות ממוקדות כמו `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בנוסף למיומנות ייעודית לכל framework, המלמדות סוכן AI את הגדרות הניתוב שלכם ואת טיפוסי צומתי התוכן (content node types).
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מתריע על מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם אני זקוק לספריית i18n נפרדת בתוך ה-Svelte island שלי?">

לא. `svelte-intlayer` קורא את אותם מילונים כמו צד ה-Astro, כך שאין צורך להתקין את `svelte-i18n` לצידו. שלב 6 מציג את רכיב ה-island המקבל את ה-locale הפעיל מהדף במקום לפענח אותו מחדש.

</Question>
<Question title="כיצד ה-island יודע איזה locale הדף מרנדר?">

דף ה-Astro מעביר אותו מטה כ-prop ו-`setupIntlayer` ב-island קולט אותו, כך שה-island עובר הידרציה (hydration) באותה שפה שרונדרה בשרת. זה מונע את ההבזק (flash) של שפת ברירת המחדל המתרחש כאשר island מזהה את ה-locale בעצמו בדפדפן.

</Question>
<Question title="האם התוכן המתורגם נשלח כ-HTML סטטי?">

כן עבור חלקי ה-Astro, המרונדרים בזמן הבנייה, כך שדפים מותאמים לשפה הם HTML סטטי רגיל שסורקי רשת קוראים ללא הרצת JavaScript. רק ה-islands מקבלים מילון, ורק עבור השפה שהם מרנדרים.

</Question>
<Question title="כיצד להגדיר ניתוב מותאם שפה ובורר שפות?">

שלב 7 מכסה את בורר השפות. ההגדרה `routing.mode` קובעת את מבנה ה-URL: `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`), `"prefix-all"`, `"no-prefix"` או `"search-params"`, וההגדרה `routing.domains` ממפה locale לדומיין ייעודי משלו. הפונקציה `getLocalizedUrl` משכתבת את הנתיב הנוכחי כך שהחלפת שפה משאירה את הקורא באותו הדף. עיינו ב-[מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך הגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד ליצור מפת אתר מותאמת שפה ותגיות hreflang?">

שלב 8 מכסה את `sitemap.xml` ואת `robots.txt`. הפונקציה `getMultilingualUrls` בונה את החלופות (alternates) עבור כל שפה מוצהרת, כולל `x-default`, שבו משתמשים מנועי חיפוש כדי להגיש את גרסת השפה הנכונה.

</Question>
<Question title="כיצד לתרגם את האתר באופן אוטומטי באמצעות AI?">

הריצו את `npx intlayer fill`. פקודה זו משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את ההרצה רק לתוכן שהשתנה ב-branch. ראו [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו-[אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי, מגדר וטקסט עשיר?">

כן: [צורות ריבוי (plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר (gender-based content)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [שילוב ערכים (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) עבור טקסט ארוך, ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות ריבוי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [שילוב ערכים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות [העורך החזותי (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על התשתית שלכם ומאפשר לכל אדם לערוך טקסט ישירות באפליקציה הפועלת, או [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), שמנהל תוכן חיצונית כך שניתן לשנותו ללא צורך ב-deployment.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="מהי העלות של העורך החזותי? האם זה מיותר אם איני זקוק לו?">

ל-[עורך החזותי של Intlayer (Intlayer visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) יש **אפס עלות** על האפליקציה שלכם אם הוא אינו מוגדר. הלוגיקה הנוספת נטענת רק אם היא מופעלת ונדרשת במפורש.

- [עורך חזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

אם הוא מופעל, העלות קלה ביותר (+5 KB, נטען דינמית רק בעת הפעלה) מכיוון שהלוגיקה העיקרית מנוהלת על ידי עורך השרת ב-[app.intlayer.org](https://app.intlayer.org) או דרך חבילת `intlayer-editor`. אם אתם זקוקים רק להגדרת תרגום פשוטה ללא עריכה חזותית, Intlayer אינו מוסיף שום תקורה לאפליקציה שלכם.

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל (hosted) הוא שירות אופציונלי בתשלום שניתן גם [לאחסנו באופן עצמאי (self-hosted)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אחסון עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
