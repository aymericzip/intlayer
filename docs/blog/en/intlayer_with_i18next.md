---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: How to automate your i18next JSON translations using Intlayer
description: Automate your JSON translations with Intlayer and i18next for enhanced internationalization in JavaScript applications.
keywords:
  - Intlayer
  - i18next
  - Internationalisation
  - i18n
  - Localisation
  - Translation
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Migration
  - Integration
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Add loadJSON plugin
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin
---

# How to automate your i18next JSON translations using Intlayer

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in JavaScript applications.

See a concrete comparison with i18next in our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog post.

## Why Combine Intlayer with i18next?

While Intlayer provides an excellent standalone i18n solution (see our [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)), you might want to combine it with i18next for several reasons.

Intlayer offers a rich set of **advanced features** that go beyond traditional i18n tools. It helps you:

- **Automatically detect and fill missing translations** to streamline localization.
- **Test and validate your translations** directly in your development or CI/CD workflows.
- **Manage content per component**, enabling a clean, scalable, and maintainable structure across your app.
- **Externalize your content**, making it easily editable by your whole team (developers, translators, and content managers).

However, **i18next** remains an excellent and widely adopted i18n solution thanks to its **mature ecosystem**, **broad community support**, and **extensive plugin compatibility**.

By combining **Intlayer** with **i18next**, you get the best of both worlds — i18next’s stability and ecosystem maturity, with Intlayer’s modern content management, automation, and developer experience improvements.

This guide explains how to leverage Intlayer as an **adapter for i18next**, allowing you to:

- Gradually migrate from i18next to Intlayer.
- Keep existing i18next plugins and workflows.
- Automate your JSON translations in CLI or CI/CD pipelines.
- Test, sync, and manage translations more effectively.

## Table of Contents

<TOC/>

## Step-by-Step Guide to Set Up Intlayer with i18next

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
- **@intlayer/sync-json-plugin**: Plugin to export Intlayer content declarations to i18next compatible JSON format

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

This will load all the JSON files in the `src` directory that match the pattern `{key}.i18n.json` and load them as Intlayer dictionaries.

---

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
