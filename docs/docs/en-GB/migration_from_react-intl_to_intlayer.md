---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrate from react-intl (FormatJS) to Intlayer"
description: "Migrate a React app from react-intl to Intlayer step by step. Keep useIntl, FormattedMessage and every Formatted* component working with the @intlayer/react-intl compat adapter."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migrating from react-intl (FormatJS) to Intlayer

## Why migrate from react-intl to Intlayer?

<AccordionGroup>
<Accordion header="Bundle size">

With react-intl, every message of the locale is passed to `IntlProvider`, so each page carries the whole catalogue. Intlayer only ships the dictionaries each page uses, which **reduces your bundle and page sizes by up to 50%**.

</Accordion>
<Accordion header="Maintainability">

Message ids are **typed** against your dictionaries: invalid ids fail at build time. Content can be co-located with the components that use it.

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

1. **Compat adapter (recommended for existing apps)**: Install `@intlayer/react-intl`. It exposes the same API as `react-intl` (`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…) and serves messages from Intlayer dictionaries. ICU MessageFormat, plurals, selects and rich text tags work as before.
2. **Full migration**: Gradually replace react-intl calls with `useIntlayer` and `.content.ts` files co-located with your components.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> Keep `react-intl` installed: it provides the TypeScript types.

</Step>
<Step number={2} title="Configure Intlayer">

Point the `syncJSON` plugin at your existing message files. react-intl catalogues are flat maps of dotted ids:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> The first segment of each id (`home`) becomes an Intlayer dictionary, so each page only loads the dictionaries it uses. When Intlayer writes translations back, the file keeps its flat shape.

</Step>
<Step number={3} title="Add the Vite plugin">

`reactIntlVitePlugin()` runs the Intlayer build and aliases `react-intl` to `@intlayer/react-intl`, so no source file changes are needed.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> Using another bundler? Rename the imports to `@intlayer/react-intl` (see Step 5) and use the Intlayer plugin for your bundler, for example `withIntlayer` from `next-intlayer` for Next.js.

</Step>
<Step number={4} title="Stop passing messages to IntlProvider">

`IntlProvider` keeps working, but messages are now loaded by Intlayer. Remove the `messages` prop and the catalogue import:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> If `messages` is still passed, it is ignored and a warning is printed in development.

</Step>
</Steps>

Your components keep working unchanged, with typed ids:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## Complete migration

<Steps>
<Step number={5} title="Explicit import renaming (optional)" isOptional={true}>

The Vite plugin already handles aliasing. To make the dependency explicit:

| Before                                          | After                                                     |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="Move content to .content.ts files" isOptional={true}>

New components can use native Intlayer content, side by side with existing react-intl calls:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

Filled translations are written back to your JSON files. See the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md) for AI configuration.

</Step>
</Steps>

## What you can delete after migration

| File / pattern                        | Why it's no longer needed                                  |
| ------------------------------------- | ---------------------------------------------------------- |
| `messages` prop and catalogue loading | Dictionaries are compiled and loaded by Intlayer.          |
| `formatjs compile` step               | Intlayer parses ICU messages from the JSON files directly. |
| `babel-plugin-formatjs` id generation | Use explicit dotted ids so each id maps to a dictionary.   |

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

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/react-intl.md)
- [Sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md)
- [Intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md)
- [Migrate from react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_react-i18next_to_intlayer.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)
