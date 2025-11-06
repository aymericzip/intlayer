---
createdAt: 2025-08-23
updatedAt: 2025-11-06
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
  - version: 7.0.7
    date: 2025-11-06
    changes: Add AI provider support doc
  - version: 7.0.6
    date: 2025-11-01
    changes: Add loadJSON plugin
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin and comprehensive rewrite
---

# How to automate your next-i18next JSON translations using Intlayer

## Table of Contents

<TOC/>

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in Next.js applications.

See a concrete comparison with next-intl in our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog post.

## Why Combine Intlayer with next-i18next?

While Intlayer provides an excellent standalone i18n solution (see our [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)), you might want to combine it with next-i18next for several reasons:

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

### Step 4: Set up AI provider

Intlayer unlocks a set of advanced automation and developer-friendly features for your i18next workflow.

- **Automatic detection and filling of missing translations**: Intlayer scans your JSON dictionaries, finds untranslated or missing keys, and translates only those, so 99% of your JSON remains untouched.
- **Chunked translation for large JSON files**: When your translation files are very large, Intlayer automatically splits processing into manageable chunks, translating them independently to avoid API limits and memory issues.
- **Namespace parallelization**: If you have hundreds of namespaces (or files), Intlayer parallelizes the translation tasks, efficiently speeding up your CI/CD or bulk translation operations.
- **Flexible AI provider support**: Choose your preferred AI provider (e.g., OpenAI, Claude, Gemini), simply by configuring credentials. Use your own API key, and switch providers as needed.
- **Resilient AI response handling**: Intlayer can handle edge cases where your AI provider returns text as either a string or an object, even auto-retrying when the format is inconsistent.
- **CLI & CI/CD ready**: Run Intlayer’s checks and auto-filling directly in your tests or pipelines, making your localization process robust and automated.
- **Integrates on top of your existing setup**: You don’t need to change your i18next or Next.js foundation. Intlayer works as an add-on plugin to your current setup, giving you all of these benefits with minimal migration.

Here is an example of how to set up the AI provider:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Then you can execute the following command to fill your translations:

```bash
npx intlayer fill
```

This will fill your translations with the AI provider you have configured.

> See all the available AI providers in the [Intlayer AI configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#ai-configuration).
> See all the available commands in the [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md).

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
