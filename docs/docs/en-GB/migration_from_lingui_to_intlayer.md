---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrate from Lingui to Intlayer"
description: "Migrate a React app from Lingui to Intlayer step by step. Keep your Lingui macros, useLingui and <Trans> calls working with the @intlayer/lingui compat adapter."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrating from Lingui to Intlayer

## Why migrate from Lingui to Intlayer?

<AccordionGroup>
<Accordion header="Bundle size">

Lingui loads one compiled catalogue per locale, holding every message of the app. Intlayer splits content per dictionary and only ships what each page uses, which **reduces your bundle and page sizes by up to 50%**.

</Accordion>
<Accordion header="Maintainability">

Intlayer dictionaries are **fully typed**, and can be co-located with the components that use them. No `extract` / `compile` step to remember: dictionaries are built by the bundler plugin.

</Accordion>
<Accordion header="AI Agent">

Co-located content **reduces the context needed** by LLMs. Intlayer ships a **CLI** to test for missing translations, an **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**, an **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)** and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**.

</Accordion>
<Accordion header="Automation">

Translate missing messages in your CI/CD pipeline with the LLM of your choice, or in the background with the [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

</Accordion>
<Accordion header="Scaling with non-dev">

Intlayer provides a self-hosted **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)** so translators and copywriters can edit content in real time.

</Accordion>
</AccordionGroup>

> To understand where these libraries come from, read [the history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md).

## Migration strategies

1. **Compat adapter (recommended for existing apps)**: Install `@intlayer/lingui`. It exposes the same API as `@lingui/core` and `@lingui/react` (`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`) and serves messages from Intlayer dictionaries. Your macros (`` t`…` ``, `<Trans>`, `msg`, `plural`) keep compiling exactly as before.
2. **Full migration**: Gradually replace Lingui calls with `useIntlayer` and `.content.ts` files co-located with your components.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> Keep `@lingui/core`, `@lingui/react` and your macro plugin (`@lingui/babel-plugin-lingui-macro` or `@lingui/swc-plugin`) installed. The macros still run, and the Lingui packages provide the TypeScript types.

</Step>
<Step number={2} title="Configure Intlayer">

Intlayer reads your Lingui catalogues as the source of truth. With Lingui's default layout (`src/locales/{locale}/messages.po`), point the `syncPO` plugin at them:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="Using JSON catalogues instead">

With `@lingui/format-json`, use `syncJSON` with the ICU format:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> Use explicit message ids (`t({ id: "hero.title", message: "Welcome" })` or `<Trans id="hero.title">`). Ids generated from the source text are not resolved against the catalogues.

</Step>
<Step number={3} title="Replace the Lingui Vite plugin">

Swap `@lingui/vite-plugin` for `@intlayer/lingui/plugin`. The binding stays `lingui()`: it runs the Intlayer build and aliases `@lingui/core` and `@lingui/react` to `@intlayer/lingui`, so no source file changes are needed.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> Keep the macro plugin in the React plugin (Babel or `@lingui/swc-plugin`), so macros are compiled to `i18n._()` calls before Intlayer resolves them.

</Step>
</Steps>

Your components keep working unchanged:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

Switching locale still goes through `i18n.activate(locale)`, which updates every `useLingui()` consumer.

## Complete migration

<Steps>
<Step number={4} title="Remove runtime catalogue loading" isOptional={true}>

Messages now come from Intlayer dictionaries compiled at build time. Calls to `i18n.load()` / `i18n.loadAndActivate()` only serve as a fallback and print a warning in development. Replace them with `i18n.activate(locale)` and drop the `lingui compile` step. Keep `lingui extract` to collect new message ids.

</Step>
<Step number={5} title="Explicit import renaming (optional)" isOptional={true}>

The Vite plugin already handles aliasing. To make the dependency explicit:

| Before                                             | After                                                 |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="Move content to .content.ts files" isOptional={true}>

New components can use native Intlayer content, side by side with existing Lingui calls:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
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

Filled translations are written back to your Lingui catalogues. See the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md) for AI configuration.

</Step>
</Steps>

## What you can delete after migration

| File / pattern                                 | Why it's no longer needed                                   |
| ---------------------------------------------- | ----------------------------------------------------------- |
| `i18n.load()` / dynamic catalogue imports      | Dictionaries are compiled and loaded by Intlayer.           |
| `lingui compile` and compiled `.js` catalogues | Intlayer builds dictionaries from your catalogues directly. |
| `@lingui/vite-plugin`                          | Replaced by `lingui()` from `@intlayer/lingui/plugin`.      |

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

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/lingui.md)
- [Sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-po.md)
- [Intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md)
