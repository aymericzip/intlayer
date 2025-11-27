---
createdAt: 2025-09-09
updatedAt: 2025-09-09
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

As an alternative, to automate your i18n process whilst keeping full control of your content, Intlayer also provides an auto-extraction command `intlayer transform` (see [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/transform.md)), or the `Intlayer: extract content to Dictionary` command from the Intlayer VS Code extension (see [VS Code extension documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)).

## Usage

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

### Next.js (Babel)

For Next.js or other Webpack-based applications using Babel, you can configure the compiler using the `@intlayer/babel` plugin.

#### Installation

```bash
npm install @intlayer/babel
```

#### Configuration

Update your `babel.config.js` (or `babel.config.json`) to include the extraction plugin. We provide a helper `getCompilerOptions` to load your Intlayer configuration automatically.

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // Automatically loads options from intlayer.config.ts
    ],
  ],
};
```

This configuration ensures that content declared in your components is automatically extracted and used to generate dictionaries during your build process.
