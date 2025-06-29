---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Package Documentation | lynx-intlayer
description: See how to use the lynx-intlayer package
keywords:
  - Intlayer
  - lynx-intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# lynx-intlayer: Internationalize (i18n) an Lynx application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

**The `lynx-intlayer` package** allows you to internationalize your Vite application. It includes the Metro plugin to set the configuration through environment variables into the [Lynx bundler](https://lynxjs.org/index.html).

## Why Internationalize Your Lynx Application?

Internationalizing your Lynx application is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

## Configuration

The `lynx-intlayer` package works seamlessly with the [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md), and the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md). Have a look at the relevant documentation for more information.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Example of usage

See an example of how to include the plugins into your vite configuration.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... other plugins
    pluginIntlayerLynx(),
  ],
});
```

## Mastering the internationalization of your Vite application

Intlayer provides a lot of features to help you internationalize your Vite application.

**To learn more about these features, refer to the [React Internationalization (i18n) with Intlayer and Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx+react.md) guide for Lynx Application.**

## Read about Intlayer

- [Intlayer Website](https://intlayer.org)
- [Intlayer Documentation](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [Ask your questions to our smart documentation](https://intlayer.org/doc/chat)

## Doc History

- 5.5.10 - 2025-06-29: Init history
