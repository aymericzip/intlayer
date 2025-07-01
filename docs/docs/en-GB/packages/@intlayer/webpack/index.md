---
docName: package__@intlayer_webpack
url: https://intlayer.org/doc/package/@intlayer_webpack
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/@intlayer/webpack/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Webpack Plugin for Intlayer i18n
description: NPM package providing Webpack configuration and plugin for seamless integration of Intlayer internationalisation with Webpack-based applications.
keywords:
  - intlayer
  - webpack
  - plugin
  - configuration
  - i18n
  - JavaScript
  - NPM
  - bundler
---

# @intlayer/webpack: NPM Package to use the Intlayer Webpack Plugin in your application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks such as React and Express.js.

The **`@intlayer/webpack`** package provides a Webpack configuration to facilitate working with a Webpack-based application using Intlayer. The package also includes a plugin to integrate into an existing Webpack application.

## Usage

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Options
    }),
  ],
};
```

## Installation

Install the required package using your preferred package manager:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
yarn add @intlayer/webpack
```

## Doc History

- 5.5.10 - 2025-06-29: Initial history
