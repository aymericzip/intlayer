---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from react-i18next / i18next to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your React or Next.js app from react-i18next or i18next to Intlayer — step by step, without breaking your existing code. Use the @intlayer/react-i18next and @intlayer/i18next compat adapters for a zero-disruption transition."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrating from react-i18next / i18next to Intlayer

## Why migrate from react-i18next / i18next to Intlayer?

<AccordionGroup>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

Intlayer is also the solution with the **most active development** in the i18n ecosystem — issues are fixed fast, new framework adapters land regularly, and the core API is continuously refined based on real-world production feedback.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>

<Accordion header="Scaling with non-dev">

More than just an i18n solution, Intlayer provides a **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>

</AccordionGroup>

---

## Migration strategies

There are two complementary strategies for migrating from `react-i18next` / `i18next` to Intlayer:

1. **Compat adapter (recommended for existing apps)** — Install `@intlayer/react-i18next` (for React components) and/or `@intlayer/i18next` (for the core `i18n` instance). These packages expose the **exact same API** as `react-i18next` / `i18next` but delegate all translation work to Intlayer under the hood. You keep your existing `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` calls — the only change is the import path.

2. **Full migration** — Gradually replace `react-i18next` APIs with native Intlayer hooks (`useIntlayer`, `IntlayerProvider`) and co-locate content in `.content.ts` files alongside your components.

This guide covers **Strategy 1** first (drop-in compat adapter), then walks through the optional full migration.

---

## Table of Contents

<TOC/>

---

## Quick migration

The following steps are the minimum required to get your existing `react-i18next` app running on Intlayer with zero code changes.

<Steps>

<Step number={1} title="Install Dependencies">

Install the Intlayer core packages and the compat adapters:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> You can keep `react-i18next` and `i18next` installed — the compat adapters use them as `devDependencies` / optional `peerDependencies` for TypeScript types. You don't need to change any `package.json` peers.

</Step>

<Step number={2} title="Configure Intlayer">

The `intlayer init` command creates a starter `intlayer.config.ts`. Update it to match your existing locales and point the `syncJSON` plugin at your message files:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add all your existing locales here
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // matches react-i18next placeholder syntax: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** maps a locale to its JSON file path. **`location`** tells the Intlayer watcher which folder to monitor for changes. The `format: 'i18next'` option ensures that placeholders like `{{name}}` are parsed correctly.

</Step>

<Step number={3} title="Add the Intlayer Plugin to your Bundler">

Wrap your existing bundler config with the compat plugin. It composes the core Intlayer plugin, wires up content watching, and — critically — **injects module aliases** so that your existing `import … from 'react-i18next'` (and `'i18next'`) calls are transparently redirected to `@intlayer/react-i18next` / `@intlayer/i18next` at build time. No source file changes are needed.

**For Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` wraps `vite-intlayer`'s `intlayer()` plugin and adds the `react-i18next` / `i18next` aliases. Using the plain `intlayer()` plugin from `vite-intlayer` compiles dictionaries but does **not** add those aliases — you would then rename imports to `@intlayer/*` manually (see Step 4).

**For Next.js:**

If you are using `next-i18next` (Pages Router integration), install `@intlayer/next-i18next` and `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Then add the compat plugin to your `next.config.ts` (it injects the `next-i18next` / `react-i18next` / `i18next` aliases):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* your options */};

export default withIntlayer(nextConfig);
```

> **You no longer need `i18next.init()` or manual provider bootstrapping.** Intlayer compiles all dictionaries at **build time**, so there is no runtime loading step. The aliased provider handles initialization for you.

</Step>

</Steps>

That's it for the quick migration. Your app now runs on Intlayer while keeping every `react-i18next` import and API intact.

> **Typed translation keys — automatic.** Once Intlayer compiles your dictionaries, `useTranslation` and `getFixedT` are typed against your actual content. Keys are autocompleted in your IDE and invalid paths cause TypeScript errors at build time — no extra setup required.
>
> ```tsx
> // 'about' is a registered dictionary key → t() only accepts valid dot-paths
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
>
> // Server-side (i18next instance)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ typed
> ```

---

## Complete migration

The steps below are optional and can be done incrementally. They unlock the full Intlayer feature set: visual editor, CMS, typed content files, AI-powered translation, and more.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

The Intlayer plugins already handle aliasing at the bundler level. If you prefer to make the dependency explicit in your source files, you can rename imports manually:

| Before                                             | After                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

For Next.js (`next-i18next`):

| Before                                                                         | After                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Once Intlayer is wired up, use its CLI to fill missing translations automatically:

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

Add the AI configuration to `intlayer.config.ts`:

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
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // default
    // model: "gpt-4o-mini",   // default
  },
};

export default config;
```

> See [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for all available options.

</Step>

</Steps>

---

## What you can delete after migration

Once the compat adapters are in place, the following `react-i18next` / `i18next` boilerplate can be removed:

| File / pattern                           | Why it's no longer needed                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Intlayer's provider initializes everything automatically; there is no runtime loading step.                                                  |
| `I18nextProvider` / `initReactI18next`   | The Intlayer plugin handles injection and bootstrapping under the hood.                                                                      |
| JSON language bundles (`locales/*.json`) | JSON bundles are only needed if you still use the `syncJSON` plugin. Once you migrate to `.content.ts` files you can delete the JSON folder. |

When you are ready to go further, Intlayer **automatically discovers all `.content.ts` and `.content.json` files anywhere in your codebase** (by default, anywhere inside `./src`). You can place a `my-component.content.ts` file right next to your `MyComponent.tsx` and Intlayer will pick it up at build time with no additional configuration — no imports, no registration, no centralized index file needed. This makes co-locating translations with pages and components completely frictionless.

---

## Configure TypeScript

Intlayer uses module augmentation to provide full TypeScript intellisense for your translation keys. Make sure your `tsconfig.json` includes the auto-generated types:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

Add Intlayer's generated directory to your `.gitignore`:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## Go Further

- **Visual Editor** — Manage translations visually in your browser: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
- **CMS** — Externalize and manage content remotely: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- **VS Code Extension** — Get autocompletion and real-time translation error detection: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)
- **CLI Reference** — Full list of CLI commands: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- **Intlayer with React** — Full setup guide for React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)
- **Intlayer with Next.js** — Full setup guide for Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)
