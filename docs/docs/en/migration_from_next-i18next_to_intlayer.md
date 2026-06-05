---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from next-i18next to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your Next.js app from next-i18next to Intlayer — step by step, without breaking your existing code. Use the @intlayer/next-i18next compat adapter for a zero-disruption transition."
keywords:
  - next-i18next
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
  - next-i18next
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
---

# Migrating from next-i18next to Intlayer

## Why migrate from next-i18next to Intlayer?

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

Since `next-i18next` wraps `react-i18next` and `i18next` under the hood, there are two complementary strategies for migrating to Intlayer:

1. **Compat adapter (recommended for existing apps)** — Install `@intlayer/next-i18next`, `@intlayer/react-i18next`, and `@intlayer/i18next`. These packages expose the **exact same API** as their counterparts but delegate all translation work to Intlayer under the hood. You keep your existing `useTranslation`, `appWithTranslation`, `serverSideTranslations` calls, and Next.js Pages routing unchanged — the only change is the initialization.

2. **Full migration** — Gradually replace `next-i18next` APIs with native Intlayer hooks (`useIntlayer`) and co-locate content in `.content.ts` files alongside your components.

This guide covers **Strategy 1** first (drop-in compat adapter), then walks through the optional full migration.

---

## Table of Contents

<TOC/>

---

## Quick migration

The following steps are the minimum required to get your existing Next.js Pages Router app running on Intlayer with zero code changes in your pages and components.

<Steps>

<Step number={1} title="Install Dependencies">

Install the Intlayer core packages and the compat adapters:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> You can safely keep `next-i18next`, `react-i18next`, and `i18next` installed during migration, though you will remove them once aliased.

</Step>

<Step number={2} title="Configure Intlayer">

The `intlayer init` command creates a starter `intlayer.config.ts`. Update it to match your existing locales and point the `syncJSON` plugin at your `next-i18next` message files (usually inside `public/locales`):

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
      // matches i18next placeholder syntax: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** maps a locale and a namespace (`key`) to its JSON file path. **`location`** tells the Intlayer watcher which folder to monitor for changes. The `format: 'i18next'` option ensures that placeholders are parsed correctly for `next-i18next`.

</Step>

<Step number={3} title="Update Next.js Configuration">

Wrap your existing `next.config.ts` (or `.js`) with `createNextI18nPlugin` from `@intlayer/next-i18next/plugin`. This wrapper composes `withIntlayer` **and** injects the `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*` aliases, so your existing `import { useTranslation } from 'next-i18next'` calls are transparently redirected at build time. No source file changes are needed.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// You can remove the i18n configuration imported from next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer manages the Next.js i18n routing under the hood,
  // so you don't need to pass the i18n object here anymore.
};

export default withIntlayer(nextConfig);
```

> **You no longer need `next-i18next.config.js`.** Intlayer compiles all dictionaries at **build time**, handling locale detection, routing, and dictionary loading seamlessly.
>
> Prefer the plain `withIntlayer` from `next-intlayer/server`? It compiles your dictionaries but does **not** add the `next-i18next` / `react-i18next` / `i18next` aliases — you would then rename imports to `@intlayer/*` manually (see Step 4).

</Step>

</Steps>

That's it for the quick migration. Your Next.js app now runs on Intlayer while keeping every `useTranslation`, `serverSideTranslations`, and `appWithTranslation` call intact.

> **Typed translation keys — automatic.** Once Intlayer compiles your dictionaries, `useTranslation` and `getFixedT` are typed against your actual content. Keys are autocompleted in your IDE and invalid paths cause TypeScript errors at build time — no extra setup required.
>
> ```tsx
> // Pages Router — 'about' is a registered dictionary key
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
>
> // getStaticProps / getServerSideProps (i18next instance)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ typed
> ```

---

## Complete migration

The steps below are optional and can be done incrementally. They unlock the full Intlayer feature set: visual editor, CMS, typed content files, AI-powered translation, and more.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

The Intlayer plugin already handles aliasing at the bundler level. If you prefer to make the dependency explicit in your source files, you can rename imports manually:

| Before                                                                         | After                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

These are **drop-in replacements** — no changes to call signatures, arguments, or return types are required.

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

Once the compat adapter is in place, the following `next-i18next` boilerplate can be removed:

| File / pattern                                  | Why it's no longer needed                                                                                                                    |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                        | Intlayer handles routing, dictionary loading, and default locales internally based on `intlayer.config.ts`.                                  |
| `next-i18next` from `package.json`              | Replaced entirely by `@intlayer/next-i18next` and aliasing.                                                                                  |
| JSON language bundles (`public/locales/*.json`) | JSON bundles are only needed if you still use the `syncJSON` plugin. Once you migrate to `.content.ts` files you can delete the JSON folder. |

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
- **Intlayer with Next.js (Pages Router)** — Full setup guide for Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)
