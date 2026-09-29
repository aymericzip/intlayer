---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/vue-i18n: Compat Adapter for vue-i18n"
description: "Keep your vue-i18n code and serve it from Intlayer: install @intlayer/vue-i18n, alias the imports, and see what the adapter changes under the hood."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/vue-i18n: Compat Adapter for vue-i18n

If your Vue application currently uses `vue-i18n`, you can migrate to Intlayer without rewriting your components or translating hooks. Intlayer provides a compat adapter that perfectly mirrors `vue-i18n`'s API while leveraging Intlayer's powerful features under the hood.

## What to do

To get started, simply run the initialization command in your project:

```bash
npx intlayer init --interactive
```

During the initialization, Intlayer will set up your configuration file (`intlayer.config.ts`) and prepare your project for migration. You will just need to add the Intlayer plugin to your Vite configuration to automatically alias the `vue-i18n` imports.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## What it does under the hood

The `vueI18nVitePlugin` injects a module alias into your bundler. Any import of `vue-i18n` in your codebase will be transparently redirected to `@intlayer/vue-i18n`.

**Under the hood, the adapter handles the complex `vue-i18n` syntax natively:**

- **Interpolation & Plurals:** Resolves `{name}` and list `{0}` interpolations. Pipe plurals (`"car | cars"`) are converted into Intlayer enumeration/plural nodes based on positional semantics.
- **Formats:** Functions like `d()` and `n()` wrap `Intl` under the hood, honoring the `datetimeFormats` and `numberFormats` defined in your options.
- **Global & Local State:** `global.locale` is mapped to a `WritableComputedRef` backed by the Intlayer client, so reactivity behaves exactly as expected (e.g. `locale.value = 'fr'`).
- **Directives:** The `v-t` directive is registered and functions normally.

Your application continues rendering exactly as before, but the content is powered by your Intlayer dictionaries, giving you type safety, better bundle optimization, and seamless CMS integration.

> To understand where these libraries come from, read the history of JavaScript i18n.

- [The history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/history_of_i18n.md)
