---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer and vue-i18n
description: Integrate Intlayer with vue-i18n for a comprehensive Vue.js internationalisation solution
keywords:
  - vue-i18n
  - Intlayer
  - Internationalisation
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Add loadJSON plugin
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin and comprehensive rewrite
---

# Vue.js Internationalisation (i18n) with vue-i18n and Intlayer

## Table of Contents

<TOC/>

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalisation library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in Vue.js and Nuxt applications.

See a concrete comparison with vue-i18n in our [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/vue-i18n_vs_intlayer.md) blog post.

## Why Combine Intlayer with vue-i18n?

While Intlayer provides an excellent standalone i18n solution (see our [Vue.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md)), you might want to combine it with vue-i18n for several reasons:

1. **Existing codebase**: You have an established vue-i18n implementation and want to gradually migrate to Intlayer's improved developer experience.
2. **Legacy requirements**: Your project requires compatibility with existing vue-i18n plugins or workflows.
3. **Team familiarity**: Your team is comfortable with vue-i18n but wants better content management.
4. **Using Intlayer features**: You want to use Intlayer features like content declaration, translation automation, testing translations, and more.

**For that, Intlayer can be implemented as an adapter for vue-i18n to help automate your JSON translations in CLI or CI/CD pipelines, test your translations, and more.**

This guide shows you how to leverage Intlayer's superior content declaration system whilst maintaining compatibility with vue-i18n.

---

## Step-by-Step Guide to Set Up Intlayer with vue-i18n

### Step 1: Install Dependencies

Install the necessary packages using your preferred package manager:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Package explanations:**

- **intlayer**: Core library for content declaration and management
- **@intlayer/sync-json-plugin**: Plugin to synchronise Intlayer content declarations to vue-i18n JSON format

### Step 2: Implement the Intlayer plugin to wrap the JSON

Create an Intlayer configuration file to define your supported locales:

**If you also want to export JSON dictionaries for vue-i18n**, add the `syncJSON` plugin:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

The `syncJSON` plugin will automatically wrap the JSON. It will read and write the JSON files without changing the content architecture.

If you want to make that JSON coexist with Intlayer content declaration files (`.content` files), Intlayer will proceed as follows:

    1. load both JSON and content declaration files and transform them into an Intlayer dictionary.
    2. if there are conflicts between the JSON and the content declaration files, Intlayer will merge all those dictionaries. This depends on the priority of the plugins, and that of the content declaration file (all are configurable).

If changes are made using the CLI to translate the JSON, or using the CMS, Intlayer will update the JSON file with the new translations.

To see more details about the `syncJSON` plugin, please refer to the [syncJSON plugin documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md).

---

### (Optional) Step 3: Implement per-component JSON translations

By default, Intlayer will load, merge and synchronise both JSON and content declaration files. See [the content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md) for more details. But if you prefer, using an Intlayer plugin, you can also implement per-component management of JSON localised anywhere in your codebase.

For that, you can use the `loadJSON` plugin.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

This will load all the JSON files in the `src` directory that match the pattern `{key}.i18n.json` and load them as Intlayer dictionaries.

---

## Git Configuration

Exclude generated files from version control:

```plaintext fileName=".gitignore"
# Ignore files generated by Intlayer
.intlayer
intl
```

These files are automatically regenerated during the build process and do not need to be committed to your repository.

### VS Code Extension

For improved developer experience, install the official **Intlayer VS Code Extension**:

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
