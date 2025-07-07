---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - File Watching for Intlayer i18n
description: NPM package providing file watching capabilities for Intlayer, enabling automatic updates and hot reloading for internationalization content.
keywords:
  - intlayer
  - chokidar
  - file watching
  - hot reload
  - i18n
  - JavaScript
  - NPM
  - development
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar: NPM Package to Scan and build Intlayer declaration files into dictionaries

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`@intlayer/chokidar`** package is used to scan and build Intlayer declaration files into dictionaries using [chokidar](https://github.com/paulmillr/chokidar) and according to the [Intlayer configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

## Usage

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Build Intlayer dictionaries

watch({ persistent: true }); // Watch changes in the configuration files
```

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## Doc History

| Version | Date       | Changes      |
| ------- | ---------- | ------------ |
| 5.5.10  | 2025-06-29 | Init history |
