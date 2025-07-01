---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Webpack Plugin for Intlayer i18n
description: NPM package providing Webpack configuration and plugin for seamless integration of Intlayer internationalization with Webpack-based applications.
keywords:
  - intlayer
  - webpack
  - plugin
  - configuration
  - i18n
  - JavaScript
  - NPM
  - bundler
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack: NPM Package to use the Intlayer Webpack Plugin into your application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`@intlayer/webpack`** package is used to provide a Webpack configuration to make working a Webpack based application with Intlayer. The package also provides a plugin to add into an existing Webpack application.

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

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## Doc History

- 5.5.10 - 2025-06-29: Init history
