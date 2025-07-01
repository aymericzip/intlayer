---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Intlayer 国际化的 Webpack 插件
description: 提供 Webpack 配置和插件的 NPM 包，实现 Intlayer 国际化与基于 Webpack 的应用的无缝集成。
keywords:
  - intlayer
  - webpack
  - 插件
  - 配置
  - 国际化
  - JavaScript
  - NPM
  - 打包工具
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack：在您的应用中使用 Intlayer Webpack 插件的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React 和 Express.js 等框架。

**`@intlayer/webpack`** 包用于提供 Webpack 配置，使基于 Webpack 的应用能够与 Intlayer 配合使用。该包还提供了一个插件，可以添加到现有的 Webpack 应用中。

## 使用方法

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // 选项
    }),
  ],
};
```

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
