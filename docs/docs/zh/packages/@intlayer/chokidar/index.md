---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Intlayer 国际化的文件监视
description: 提供文件监视功能的 NPM 包，支持 Intlayer，实现国际化内容的自动更新和热重载。
keywords:
  - intlayer
  - chokidar
  - 文件监视
  - 热重载
  - i18n
  - JavaScript
  - NPM
  - 开发
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar：用于扫描并构建 Intlayer 声明文件为字典的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React Native 和 Express.js 等框架。

**`@intlayer/chokidar`** 包用于使用 [chokidar](https://github.com/paulmillr/chokidar) 并根据 [Intlayer 配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 扫描并构建 Intlayer 声明文件为字典。

## 使用方法

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // 构建 Intlayer 字典

watch({ persistent: true }); // 监视配置文件的更改
```

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
