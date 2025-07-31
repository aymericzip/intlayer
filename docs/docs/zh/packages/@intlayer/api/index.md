---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - Intlayer API 集成的 SDK
description: 提供与 Intlayer API 交互的软件开发工具包（SDK）的 NPM 包，用于内容审核、组织、项目和用户管理。
keywords:
  - intlayer
  - API
  - SDK
  - 集成
  - 内容审核
  - 组织
  - 项目
  - JavaScript
slugs:
  - doc
  - packages
  - intlayer
  - api
---

# @intlayer/api：与 Intlayer API 交互的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React 和 Express.js 等框架。

**`@intlayer/api`** 包是一个用于与 Intlayer API 交互的软件开发工具包（SDK）。它提供了一组函数，用于审核内容声明、与组织、项目和用户进行交互等。

## 使用方法

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
