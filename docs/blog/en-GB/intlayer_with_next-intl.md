---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: How to automate your next-intl JSON translations using Intlayer
description: Automate your JSON translations with Intlayer and next-intl for enhanced internationalisation in Next.js applications.
keywords:
  - Intlayer
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Add loadJSON plugin
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin
---

# How to automate your next-intl JSON translations using Intlayer

<iframe title="How to automate your next-intl JSON translations using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalisation library designed to address the shortcomings of traditional i18n solutions. It offers a modern approach to content management in Next.js applications.

See a concrete comparison with next-intl in our [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) blog post.

## Why Combine Intlayer with next-intl?

While Intlayer provides an excellent standalone i18n solution (see our [Next.js integration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md)), you might want to combine it with next-intl for several reasons.

Intlayer offers a rich set of **advanced features** that go beyond traditional i18n tools. It helps you.

- **Automatically detect and fill missing translations** to streamline localization.
- **Test and validate your translations** directly in your development or CI/CD workflows.
- **Manage content per component**, enabling a clean, scalable, and maintainable structure across your app.
- **Externalize your content**, making it easily editable by your whole team (developers, translators, and content managers).

However, **next-intl** remains an excellent and widely adopted i18n solution thanks to its **mature ecosystem**, **broad community support**, and **extensive plugin compatibility**.

By combining **Intlayer** with **next-intl**, you get the best of both worlds — next-intl’s stability and ecosystem maturity, with Intlayer’s modern content management, automation, and developer experience improvements.

This guide explains how to leverage Intlayer as an **adapter for next-intl**, allowing you to:

- Gradually migrate from next-intl to Intlayer.
- Keep existing next-intl plugins and workflows.
- Automate your JSON translations in CLI or CI/CD pipelines.
- Test, sync, and manage translations more effectively.

## Table of Contents

<TOC/>

## Step-by-Step Guide to Set Up Intlayer with next-intl

### Step 1: Install Dependencies

Install the necessary packages:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Package descriptions:**

- **intlayer**: Core library for internationalisation management, content declaration, and building
- **@intlayer/sync-json-plugin**: Plugin to export Intlayer content declarations to next-intl compatible JSON format

### Step 2: Implement the Intlayer plugin to wrap the JSON

Create an Intlayer configuration file to define your supported locales:

**If you also want to export JSON dictionaries for next-intl**, add the `syncJSON` plugin:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalisation: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

The `syncJSON` plugin will automatically wrap the JSON. It will read and write the JSON files without changing the content architecture.

If you want to make that JSON coexist with intlayer content declaration files (`.content` files), Intlayer will proceed as follows:

    1. load both JSON and content declaration files and transform them into an intlayer dictionary.

    2. if there are conflicts between the JSON and the content declaration files, Intlayer will proceed to merge all those dictionaries. This depends on the priority of the plugins, and that of the content declaration file (all are configurable).

If changes are made using the CLI to translate the JSON, or using the CMS, Intlayer will update the JSON file with the new translations.

For more details about the `syncJSON` plugin, please refer to the [syncJSON plugin documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md).

## Git Configuration

It is recommended to ignore auto-generated Intlayer files:

```plaintext fileName=".gitignore"
# Ignore files generated by Intlayer
.intlayer
```

These files can be regenerated during your build process and do not need to be committed to version control.

### VS Code Extension

For an improved developer experience, install the official **Intlayer VS Code Extension**:

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
