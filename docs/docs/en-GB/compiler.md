---
createdAt: 2025-09-09
updatedAt: 2026-02-25
title: Intlayer Compiler | Automated Content Extraction for i18n
description: Automate your internationalisation process with the Intlayer Compiler. Extract content directly from your components for faster, more efficient i18n in Vite, Next.js, and more.
keywords:
  - Intlayer
  - Compiler
  - Internationalisation
  - i18n
  - Automation
  - Extraction
  - Speed
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: Update compiler options
  - version: 7.3.1
    date: 2025-11-27
    changes: Release Compiler
---

# Intlayer Compiler | Automated Content Extraction for i18n

## What is the Intlayer Compiler?

The **Intlayer Compiler** is a powerful tool designed to automate the process of internationalisation (i18n) in your applications. It scans your source code (JSX, TSX, Vue, Svelte) for content declarations, extracts them, and automatically generates the necessary dictionary files. This allows you to keep your content co-located with your components while Intlayer handles the management and synchronisation of your dictionaries.

## Why Use the Intlayer Compiler?

- **Automation**: Eliminates manual copy-pasting of content into dictionaries.
- **Speed**: Optimised content extraction ensuring your build process remains fast.
- **Developer Experience**: Keep content declarations right where they are used, improving maintainability.
- **Live Updates**: Supports Hot Module Replacement (HMR) for instant feedback during development.

See the [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md) blog post for a deeper comparison.

## Why not use the Intlayer Compiler?

Whilst the compiler offers an excellent "just works" experience, it also introduces some trade-offs you should be aware of:

- **Heuristic ambiguity**: The compiler must guess what is user-facing content vs. application logic (e.g., `className="active"`, status codes, product IDs). In complex codebases, this can lead to false positives or missed strings that require manual annotations and exceptions.
- **Static-only extraction**: Compiler-based extraction relies on static analysis. Strings that only exist at runtime (API error codes, CMS fields, etc.) cannot be discovered or translated by the compiler alone, so you still need a complementary runtime i18n strategy.

For a deeper architectural comparison, see the blog post [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md).

As an alternative, to automate your i18n process whilst keeping full control of your content, Intlayer also provides an auto-extraction command `intlayer extract` (see [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md)), or the `Intlayer: extract content to Dictionary` command from the Intlayer VS Code extension (see [VS Code extension documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)).

## Usage

<Tabs>
 <Tab value='vite'>

### Vite

For Vite-based applications (React, Vue, Svelte, etc.), the easiest way to use the compiler is through the `vite-intlayer` plugin.

#### Installation

```bash
npm install vite-intlayer
```

#### Configuration

Update your `vite.config.ts` to include the `intlayerCompiler` plugin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Framework Support

The Vite plugin automatically detects and handles different file types:

- **React / JSX / TSX**: Handled natively.
- **Vue**: Requires `@intlayer/vue-compiler`.
- **Svelte**: Requires `@intlayer/svelte-compiler`.

Make sure to install the appropriate compiler package for your framework:

```bash
# For Vue
npm install @intlayer/vue-compiler

# For Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

For Next.js or other Webpack-based applications using Babel, you can configure the compiler using the `@intlayer/babel` plugin.

#### Installation

```bash
npm install @intlayer/babel
```

#### Configuration

Update your `babel.config.js` (or `babel.config.json`) to include the extraction plugin. We provide a helper `getExtractPluginOptions` to load your Intlayer configuration automatically.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

This configuration ensures that content declared in your components is automatically extracted and used to generate dictionaries during your build process.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>

### Custom config

To customise the compiler behaviour, you can update the `intlayer.config.ts` file in the root of your project.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     * Set to 'build-only' to skip the compiler during development and speed up start times.
     */
    enabled: true,

    /**
     * Pattern to traverse the code to optimise.
     */
    transformPattern: [
      "**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}",
      "!**/node_modules/**",
    ],

    /**
     * Pattern to exclude from the optimisation.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * Output directory for the optimised dictionaries.
     */
    outputDir: "i18n",

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Indicates if the components should be saved after being transformed.
     * That way, the compiler can be run only once to transform the app, and then it can be removed.
     */
    saveComponents: false,
  },
};

export default config;
```

### Fill missing translation

Intlayer provide a CLI tool to help you fill missing translations. You can use the `intlayer` command to test and fill missing translations from your code.

```bash
npx intlayer test         # Test if there is missing translations
```

```bash
npx intlayer fill         # Fill missing translations
```

> For more details, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/ci.md)
