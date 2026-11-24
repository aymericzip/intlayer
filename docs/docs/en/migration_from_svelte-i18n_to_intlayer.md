---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrate from svelte-i18n to Intlayer"
description: "Migrate a Svelte or SvelteKit app from svelte-i18n to Intlayer step by step. Keep the $_, $date and $number stores working with the @intlayer/svelte-i18n compat adapter."
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

# Migrating from svelte-i18n to Intlayer

## Why migrate from svelte-i18n to Intlayer?

<AccordionGroup>
<Accordion header="Bundle size">

svelte-i18n registers whole locale files at startup. Intlayer only ships the dictionaries each page uses, which **reduces your bundle and page sizes by up to 50%**.

</Accordion>
<Accordion header="Maintainability">

Keys are **typed** against your dictionaries: invalid keys fail at build time. Content can be co-located with the components that use it.

</Accordion>
<Accordion header="AI Agent">

Co-located content **reduces the context needed** by LLMs. Intlayer ships a **CLI** to test for missing translations, an **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, an **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**.

</Accordion>
<Accordion header="Automation">

Translate missing messages in your CI/CD pipeline with the LLM of your choice, or in the background with the [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

</Accordion>
<Accordion header="Scaling with non-dev">

Intlayer provides a self-hosted **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** so translators and copywriters can edit content in real time.

</Accordion>
</AccordionGroup>

> To understand where these libraries come from, read [the history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/history_of_i18n.md).

## Migration strategies

1. **Compat adapter (recommended for existing apps)**: Install `@intlayer/svelte-i18n`. It exposes the same API as `svelte-i18n` (`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…) and serves messages from Intlayer dictionaries. ICU MessageFormat works as before.
2. **Full migration**: Gradually replace svelte-i18n stores with `useIntlayer` from `svelte-intlayer` and `.content.ts` files co-located with your components.

## Table of Contents

<TOC/>

## Quick migration

<Steps>
<Step number={1} title="Install Dependencies">

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

> The `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

The command detects your environment and installs the required packages, for example:

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

> Keep `svelte-i18n` installed: it provides the TypeScript types.

</Step>
<Step number={2} title="Configure Intlayer">

Point the `syncJSON` plugin at your existing message files. With one file per namespace (`src/locales/en/home.json`), each file becomes a dictionary:

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

> `$_('home.title')` resolves to the `title` field of the `home` dictionary. If you use a single file per locale (`src/locales/en.json`) with nested namespaces, use `source: ({ locale }) => \`./src/locales/${locale}.json\`` instead: each top-level key becomes a dictionary.

</Step>
<Step number={3} title="Add the Vite plugin">

`svelteI18nVitePlugin()` runs the Intlayer build and aliases `svelte-i18n` to `@intlayer/svelte-i18n`, so no source file changes are needed.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> For SvelteKit, add `svelteI18nVitePlugin()` after `sveltekit()` in the same `plugins` array.

</Step>
<Step number={4} title="Simplify the i18n setup">

Keep `init()`, but remove `register()` and `addMessages()`: messages come from Intlayer dictionaries.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

Your components keep working unchanged:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

Setting `$locale = 'fr'` switches the language for both svelte-i18n stores and `useIntlayer`.

## Complete migration

<Steps>
<Step number={5} title="Explicit import renaming (optional)" isOptional={true}>

The Vite plugin already handles aliasing. To make the dependency explicit:

| Before                                       | After                                                  |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="Move content to .content.ts files" isOptional={true}>

New components can use native Intlayer content, side by side with existing svelte-i18n calls:

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
<Step number={7} title="Enable AI-powered translation" isOptional={true}>

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

Filled translations are written back to your JSON files. See the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for AI configuration.

</Step>
</Steps>

## What you can delete after migration

| File / pattern                       | Why it's no longer needed                            |
| ------------------------------------ | ---------------------------------------------------- |
| `register()` / `addMessages()` calls | Dictionaries are compiled and loaded by Intlayer.    |
| `waitLocale()` before rendering      | Messages are available as soon as the locale is set. |

## Configure TypeScript

Include the generated types in your `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git Configuration

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/svelte-i18n.md)
- [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md)
- [Intlayer with Vite and Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+svelte.md)
- [Intlayer with SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_svelte_kit.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
