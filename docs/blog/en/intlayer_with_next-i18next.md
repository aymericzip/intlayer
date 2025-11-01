---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer and next-i18next
description: Integrate Intlayer with next-i18next for a comprehensive Next.js internationalization solution
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Add loadJSON plugin
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin and comprehensive rewrite
---

# Next.js Internationalization (i18n) with next-i18next and Intlayer

## Table of Contents

<TOC/>

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in Next.js applications.

See a concrete comparison with next-intl in our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog post.

## Why Combine Intlayer with next-i18next?

While Intlayer provides an excellent standalone i18n solution (see our [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)), you might want to combine it with next-i18next for several reasons:

1. **Existing codebase**: You have an established next-i18next implementation and want to gradually migrate to Intlayer's improved developer experience.
2. **Legacy requirements**: Your project requires compatibility with existing i18next plugins or workflows.
3. **Team familiarity**: Your team is comfortable with next-i18next but wants better content management.
4. **Using Intlayer features**: You want to use Intlayer features like content declaration, translation automation, testing translations, and more.

**For that, Intlayer can be implemented as an adapter for next-i18next to help automating your JSON translations in CLI or CI/CD pipelines, testing your translations, and more.**

This guide shows you how to leverage Intlayer's superior content declaration system while maintaining compatibility with next-i18next.

---

## Step-by-Step Guide to Set Up Intlayer with next-i18next

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
- **@intlayer/sync-json-plugin**: Plugin to sync Intlayer content declarations to i18next JSON format

### Step 2: Implement the Intlayer plugin to wrap the JSON

Create an Intlayer configuration file to define your supported locales:

**If you want to also export JSON dictionaries for i18next**, add the `syncJSON` plugin:

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

The `syncJSON` plugin will automatically wrap the JSON. It will read and write the JSON files without changing the content architecture.

If you want to make coexist that JSON with intlayer content declaration files (`.content` files), Intlayer will proceed this way:

    1. load both JSON and content declaration files and transform them into a intlayer dictionary.
    2. if there is conflicts between the JSON and the content declaration files, Intlayer will process to the merge of that all dictionaries. Depending of the priority of the plugins, and the one of the content declaration file (all are configurable).

If changes are made using the CLI to translate the JSON, or using the CMS, Intlayer will update the JSON file with the new translations.

To see more details about the `syncJSON` plugin, please refer to the [syncJSON plugin documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md).

---

### (Optional) Step 3: Implement per-component JSON translations

By default, Intlayer will load, merge and synchronize both JSON and content declaration files. See [the content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) for more details. But if you prefer, using a Intlayer plugin, you can also implement per-component management of JSON localized anywhere in your codebase.

For that, you can use the `loadJSON` plugin.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
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
      priority: 1, // Ensures these JSON files take precedence over files at `./public/locales/en/${key}.json`
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
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

These files are automatically regenerated during the build process and don't need to be committed to your repository.

### VS Code Extension

For improved developer experience, install the official **Intlayer VS Code Extension**:

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
