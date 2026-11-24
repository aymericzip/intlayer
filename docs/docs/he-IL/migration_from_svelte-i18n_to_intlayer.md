---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "מעבר מ-svelte-i18n ל-Intlayer"
description: "העבירו אפליקציית Svelte או SvelteKit מ-svelte-i18n ל-Intlayer שלב אחר שלב. ה-stores ‏$_, ‏$date ו-$number ממשיכים לעבוד עם ה-compat adapter ‏@intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# מעבר מ-svelte-i18n ל-Intlayer

## למה לעבור מ-svelte-i18n ל-Intlayer?

<AccordionGroup>
<Accordion header="גודל ה-bundle">

svelte-i18n רושמת קובצי locale שלמים בעת העלייה. Intlayer שולחת רק את המילונים שכל עמוד משתמש בהם, וכך **מקטינה את גודל ה-bundles והעמודים בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

המפתחות **מוגדרים בטיפוסים** לפי המילונים שלכם: מפתחות לא תקינים נכשלים בזמן ה-build. התוכן יכול לשבת ליד הקומפוננטות שמשתמשות בו.

</Accordion>
<Accordion header="סוכן AI">

תוכן שיושב ליד הקומפוננטות **מקטין את ההקשר הנדרש** ל-LLM. Intlayer מספקת **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**.

</Accordion>
<Accordion header="אוטומציה">

תרגמו הודעות חסרות ב-pipeline של CI/CD עם ה-LLM שתבחרו, או ברקע דרך [פלטפורמת הווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

</Accordion>
<Accordion header="התרחבות עם אנשים שאינם מפתחים">

Intlayer מספקת **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)** באירוח עצמי ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** כדי שמתרגמים וכותבי תוכן יערכו תוכן בזמן אמת.

</Accordion>
</AccordionGroup>

> כדי להבין מאיפה הגיעו הספריות האלה, קראו את [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md).

## אסטרטגיות מעבר

1. **Compat adapter (מומלץ לאפליקציות קיימות)**: התקינו את `@intlayer/svelte-i18n`. הוא חושף את אותו API של `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) ומגיש את ההודעות מתוך המילונים של Intlayer. ICU MessageFormat עובד כמו קודם.
2. **מעבר מלא**: החליפו בהדרגה את ה-stores של svelte-i18n ב-`useIntlayer` מתוך `svelte-intlayer` ובקובצי `.content.ts` לצד הקומפוננטות.

## תוכן העניינים

<TOC/>

## מעבר מהיר

<Steps>
<Step number={1} title="התקנת תלויות">

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

> הדגל `--interactive` אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכן AI.

הפקודה מזהה את הסביבה שלכם ומתקינה את ה-packages הנדרשים, לדוגמה:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> השאירו את `svelte-i18n` מותקן: הוא מספק את טיפוסי TypeScript.

</Step>
<Step number={2} title="הגדרת Intlayer">

כוונו את התוסף `syncJSON` אל קובצי ההודעות הקיימים. עם קובץ אחד לכל namespace ‏(`src/locales/en/home.json`), כל קובץ הופך למילון:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')` מפוענח לשדה `title` של המילון `home`. אם אתם משתמשים בקובץ יחיד לכל locale ‏(`src/locales/en.json`) עם namespaces מקוננים, השתמשו במקום זאת ב-`source: ({ locale }) => \`./src/locales/${locale}.json\``: כל מפתח ברמה העליונה הופך למילון.

</Step>
<Step number={3} title="הוספת תוסף ה-Vite">

`svelteI18nVitePlugin()` מריץ את ה-build של Intlayer ויוצר alias מ-`svelte-i18n` אל `@intlayer/svelte-i18n`, בלי שינוי בקובצי המקור.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> ב-SvelteKit, הוסיפו את `svelteI18nVitePlugin()` אחרי `sveltekit()` באותו מערך `plugins`.

</Step>
<Step number={4} title="פישוט הגדרת ה-i18n">

השאירו את `init()`, אבל הסירו את `register()` ו-`addMessages()`: ההודעות מגיעות מהמילונים של Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

הקומפוננטות שלכם ממשיכות לעבוד ללא שינוי:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

הגדרת `$locale = 'fr'` מחליפה את השפה גם ב-stores של svelte-i18n וגם ב-`useIntlayer`.

## מעבר מלא

<Steps>
<Step number={5} title="שינוי שם מפורש של imports (אופציונלי)" isOptional={true}>

תוסף ה-Vite כבר מטפל ב-aliases. כדי להפוך את התלות למפורשת:

| לפני                                         | אחרי                                                   |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="העברת התוכן לקובצי .content.ts" isOptional={true}>

קומפוננטות חדשות יכולות להשתמש בתוכן נייטיב של Intlayer לצד קריאות svelte-i18n קיימות:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="הפעלת תרגום מבוסס AI" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

התרגומים שהושלמו נכתבים בחזרה לקובצי ה-JSON שלכם. להגדרת ה-AI עיינו ב[תיעוד ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

</Step>
</Steps>

## מה אפשר למחוק אחרי המעבר

| קובץ / תבנית                          | למה כבר לא נחוץ                      |
| ------------------------------------- | ------------------------------------ |
| קריאות `register()` / `addMessages()` | Intlayer מקמפלת וטוענת את המילונים.  |
| `waitLocale()` לפני רינדור            | ההודעות זמינות מיד כשה-locale מוגדר. |

## הגדרת TypeScript

כללו את הטיפוסים שנוצרו ב-`tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## הגדרת Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/svelte-i18n.md)
- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [Intlayer עם Vite ו-Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+svelte.md)
- [Intlayer עם SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_svelte_kit.md)
- [העורך הוויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
