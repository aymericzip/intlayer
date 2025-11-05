---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: How to automate your react-intl JSON translations using Intlayer
description: Automate your JSON translations with Intlayer and react-intl for enhanced internationalization in React applications.
keywords:
  - react-intl
  - Intlayer
  - Internationalization
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Add loadJSON plugin
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin
---

# How to automate your react-intl JSON translations using Intlayer

## Table of Contents

<TOC/>

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in React applications.

See a concrete comparison with react-intl in our [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/react-i18next_vs_react-intl_vs_intlayer.md) blog post.

## Why Combine Intlayer with react-intl?

While Intlayer provides an excellent standalone i18n solution (see our [React integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)), you might want to combine it with react-intl for several reasons:

1. **Existing codebase**: You have an established react-intl implementation and want to gradually migrate to Intlayer's improved developer experience.
2. **Legacy requirements**: Your project requires compatibility with existing react-intl plugins or workflows.
3. **Team familiarity**: Your team is comfortable with react-intl but wants better content management.
4. **Using Intlayer features**: You want to use Intlayer features like content declaration, translation automation, testing translations, and more.

**For that, Intlayer can be implemented as an adapter for react-intl to help automating your JSON translations in CLI or CI/CD pipelines, testing your translations, and more.**

This guide shows you how to leverage Intlayer's superior content declaration system while maintaining compatibility with react-intl.

## Step-by-Step Guide to Set Up Intlayer with react-intl

### Step 1: Install Dependencies

Install the necessary packages:

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

**Package descriptions:**

- **intlayer**: Core library for internationalization management, content declaration, and building
- **@intlayer/sync-json-plugin**: Plugin to export Intlayer content declarations to react-intl compatible JSON format

### Step 2: Implement the Intlayer plugin to wrap the JSON

Create an Intlayer configuration file to define your supported locales:

**If you want to also export JSON dictionaries for react-intl**, add the `syncJSON` plugin:

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
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
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

This will load all the JSON files in the `src` directory that match the pattern `{key}.i18n.json` and load them as Intlayer dictionaries.

## Git Configuration

It's recommended to ignore auto-generated Intlayer files:

```plaintext fileName=".gitignore"
# Ignore files generated by Intlayer
.intlayer
```

These files can be regenerated during your build process and don't need to be committed to version control.

### VS Code Extension

For improved developer experience, install the official **Intlayer VS Code Extension**:

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
