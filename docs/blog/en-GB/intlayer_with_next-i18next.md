---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer and next-i18next
description: Integrate Intlayer with next-i18next for a comprehensive Next.js internationalisation solution
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internationalisation
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

# Next.js Internationalisation (i18n) with next-i18next and Intlayer

## Table of Contents

<TOC/>

## What is next-i18next?

**next-i18next** is one of the most popular internationalisation (i18n) frameworks for Next.js applications. Built on top of the powerful **i18next** ecosystem, it provides a comprehensive solution for managing translations, localisation, and language switching in Next.js projects.

However, next-i18next comes with some challenges:

- **Complex configuration**: Setting up next-i18next requires multiple configuration files and careful setup of server-side and client-side i18n instances.
- **Scattered translations**: Translation files are typically stored in separate directories from components, making it harder to maintain consistency.
- **Manual namespace management**: Developers need to manually manage namespaces and ensure proper loading of translation resources.
- **Limited type safety**: TypeScript support requires additional configuration and does not provide automatic type generation for translations.

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalisation library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in Next.js applications.

See a concrete comparison with next-intl in our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog post.

## Why Combine Intlayer with next-i18next?

While Intlayer provides an excellent standalone i18n solution (see our [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)), you might want to combine it with next-i18next for several reasons.

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
- **@intlayer/sync-json-plugin**: Plugin to synchronise Intlayer content declarations to i18next JSON format

### Step 2: Implement the Intlayer plugin to wrap the JSON

Create an Intlayer configuration file to define your supported locales:

**If you also want to export JSON dictionaries for i18next**, add the `syncJSON` plugin:

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

If you want to make that JSON coexist with Intlayer content declaration files (`.content` files), Intlayer will proceed as follows:

    1. load both JSON and content declaration files and transform them into an Intlayer dictionary.
    2. if there are conflicts between the JSON and the content declaration files, Intlayer will merge all those dictionaries. This depends on the priority of the plugins, and that of the content declaration file (all are configurable).

If changes are made using the CLI to translate the JSON, or using the CMS, Intlayer will update the JSON file with the new translations.

To see more details about the `syncJSON` plugin, please refer to the [syncJSON plugin documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md).

---

### (Optional) Step 3: Implement per-component JSON translations

By default, Intlayer will load, merge and synchronise both JSON and content declaration files. See [the content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md) for more details. But if you prefer, using an Intlayer plugin, you can also implement per-component management of JSON localised anywhere in your codebase.

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
     * Will load all the JSON files in the src that match the pattern {key}.i18n.json
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

These files are automatically regenerated during the build process and do not need to be committed to your repository.

### VS Code Extension

For improved developer experience, install the official **Intlayer VS Code Extension**:

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
