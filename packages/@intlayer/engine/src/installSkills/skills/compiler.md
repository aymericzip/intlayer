---
name: intlayer-compiler
description: Intlayer Compiler setup and usage. Configures automatic content extraction for your components without the need to define .content files manually.
metadata:
  author: Intlayer
  url: https://intlayer.org
  license: Apache-2.0
  category: productivity
  tags: [i18n, compiler]
  documentation: https://intlayer.org/doc/compiler
  support: contact@intlayer.org
---

# Intlayer Compiler Skill

The **Intlayer Compiler Skill** provides instructions on how to set up and use the Intlayer compiler to automatically extract content from your application.

## Key Features

- **Automatic Content Extraction**: All content will be extracted automatically from your components.
- **No Manual Content Files**: Alleviates the need to manually create `.content` files.

## Setup and Usage

To set up the Intlayer compiler for your project (Vite, Next.js, Babel, Webpack), refer to the documentation:

- [Intlayer Compiler](https://intlayer.org/doc/compiler.md)

- **Vite** (React, Preact, Solid, Lit, Vue, Svelte, Astro): bundled into the `intlayer()` plugin of `vite-intlayer`.
- **Next.js**: install `@intlayer/babel`; `withIntlayer` registers the extractor loader on Turbopack and webpack.
- **Babel / Webpack**: add `intlayerExtractBabelPlugin` from `@intlayer/babel`.
- `.vue` and `.svelte` files additionally require `@intlayer/vue-compiler` / `@intlayer/svelte-compiler`.
- Not using a supported bundler? Run `npx intlayer extract` instead.

Once the compiler plugins are properly configured, simply write your translatable strings inline according to the framework's specifics, and the Intlayer compiler will automatically generate the dictionaries.

For more information, visit the [Intlayer Compiler Architecture Documentation](https://intlayer.org/doc/compiler.md).

### Packages

- [vite-intlayer intlayerCompiler](https://intlayer.org/doc/packages/vite-intlayer/intlayerCompiler.md)
- [@intlayer/babel Exports](https://intlayer.org/doc/packages/@intlayer/babel/export.md)
