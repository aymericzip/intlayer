---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from vue-i18n to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your Vue or Nuxt app from vue-i18n to Intlayer — step by step, without breaking your existing code. Use the @intlayer/vue-i18n compat adapter for a zero-disruption transition."
keywords:
  - vue-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrating from vue-i18n to Intlayer

## Why migrate from vue-i18n to Intlayer?

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

There are two complementary strategies for migrating from `vue-i18n` to Intlayer:

1. **Compat adapter (recommended for existing apps)** — Install `@intlayer/vue-i18n` (for Vue components). This package exposes the **exact same API** as `vue-i18n` but delegates all translation work to Intlayer under the hood. You keep your existing `$t`, `useI18n()`, and `<i18n-t>` calls — the only change is the import path and initialization.

2. **Full migration** — Gradually replace `vue-i18n` APIs with native Intlayer hooks (`useIntlayer`) and co-locate content in `.content.ts` files alongside your components.

This guide covers **Strategy 1** first (drop-in compat adapter), then walks through the optional full migration.

---

## Table of Contents

<TOC/>

---

## Quick migration

The following steps are the minimum required to get your existing `vue-i18n` app running on Intlayer with zero code changes in your components.

<Steps>

<Step number={1} title="Install Dependencies">

Install the Intlayer core packages and the compat adapter:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> You can keep `vue-i18n` installed — the compat adapter uses it as a `devDependency` / `peerDependency` for TypeScript types.

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
      // matches vue-i18n placeholder syntax: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** maps a locale to its JSON file path. **`location`** tells the Intlayer watcher which folder to monitor for changes. The `format: 'icu'` option ensures that placeholders are parsed correctly for `vue-i18n`.

</Step>

<Step number={3} title="Add the Intlayer Plugin to your Bundler">

Wrap your existing bundler config with the compat plugin. It composes the core Intlayer plugin, wires up content watching, and — critically — **injects a module alias** so that your existing `import … from 'vue-i18n'` calls are transparently redirected to `@intlayer/vue-i18n` at build time. No source file changes are needed.

**For Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` wraps `vite-intlayer`'s `intlayer()` plugin and adds the `vue-i18n` alias. Using the plain `intlayer()` plugin from `vite-intlayer` compiles dictionaries but does **not** add the alias — you would then rename imports to `@intlayer/vue-i18n` manually (see Step 4).

**For Nuxt:**

If you are using `@nuxtjs/i18n` (Nuxt integration), install `nuxt-intlayer` and add it to your `nuxt.config.ts`:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // You can safely remove @nuxtjs/i18n from your modules
});
```

> **You no longer need `createI18n()` or manual provider bootstrapping.** Intlayer compiles all dictionaries at **build time**, so there is no runtime loading step. The aliased provider handles initialization for you.

</Step>

</Steps>

That's it for the quick migration. Your app now runs on Intlayer while keeping every `vue-i18n` import and API intact.

> **Typed translation keys — automatic.** Once Intlayer compiles your dictionaries, `useI18n` is typed against your actual content when you pass a `namespace` option. Keys are autocompleted in your IDE and invalid paths cause TypeScript errors at build time — no extra setup required.
>
> ```ts
> // 'about' is a registered dictionary key
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
> ```

---

## Complete migration

The steps below are optional and can be done incrementally. They unlock the full Intlayer feature set: visual editor, CMS, typed content files, AI-powered translation, and more.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

The Intlayer plugins already handle aliasing at the bundler level. If you prefer to make the dependency explicit in your source files, you can rename imports manually:

| Before                                  | After                                             |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

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
      format: "icu",
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

Once the compat adapters are in place, the following `vue-i18n` boilerplate can be removed:

| File / pattern                            | Why it's no longer needed                                                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `createI18n()` calls                      | Intlayer's provider initializes everything automatically; there is no runtime loading step.                                                  |
| Vue plugin registration (`app.use(i18n)`) | The Intlayer plugin handles injection and bootstrapping under the hood.                                                                      |
| JSON language bundles (`locales/*.json`)  | JSON bundles are only needed if you still use the `syncJSON` plugin. Once you migrate to `.content.ts` files you can delete the JSON folder. |

When you are ready to go further, Intlayer **automatically discovers all `.content.ts` and `.content.json` files anywhere in your codebase** (by default, anywhere inside `./src`). You can place a `my-component.content.ts` file right next to your `MyComponent.vue` and Intlayer will pick it up at build time with no additional configuration — no imports, no registration, no centralized index file needed. This makes co-locating translations with pages and components completely frictionless.

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
- **Intlayer with Vue** — Full setup guide for Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md)
- **Intlayer with Nuxt** — Full setup guide for Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md)
