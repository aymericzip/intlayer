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
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin and comprehensive rewrite
---

# Next.js Internationalization (i18n) with next-i18next and Intlayer

## Table of Contents

<TOC/>

## What is next-i18next?

**next-i18next** is one of the most popular internationalization (i18n) frameworks for Next.js applications. Built on top of the powerful **i18next** ecosystem, it provides a comprehensive solution for managing translations, localization, and language switching in Next.js projects.

However, next-i18next comes with some challenges:

- **Complex configuration**: Setting up next-i18next requires multiple configuration files and careful setup of server-side and client-side i18n instances.
- **Scattered translations**: Translation files are typically stored in separate directories from components, making it harder to maintain consistency.
- **Manual namespace management**: Developers need to manually manage namespaces and ensure proper loading of translation resources.
- **Limited type safety**: TypeScript support requires additional configuration and doesn't provide automatic type generation for translations.

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in Next.js applications.

See a concrete comparison with next-intl in our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog post.

## Why Combine Intlayer with next-i18next?

While Intlayer provides an excellent standalone i18n solution (see our [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)), you might want to combine it with next-i18next for several reasons:

1. **Existing codebase**: You have an established next-i18next implementation and want to gradually migrate to Intlayer's improved developer experience.
2. **Legacy requirements**: Your project requires compatibility with existing i18next plugins or workflows.
3. **Team familiarity**: Your team is comfortable with next-i18next but wants better content management.

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

**Package explanations:**

- **intlayer**: Core library for content declaration and management
- **next-intlayer**: Next.js integration layer with build plugins
- **i18next**: Core i18n framework
- **next-i18next**: Next.js wrapper for i18next
- **i18next-resources-to-backend**: Dynamic resource loading for i18next
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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
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
