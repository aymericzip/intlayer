---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 包文档 | react-scripts-intlayer
description: 查看如何使用 react-scripts-intlayer 包
keywords:
  - Intlayer
  - react-scripts-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-scripts-intlayer
---

# react-scripts-intlayer：在 React Create App 应用中使用 Intlayer 的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React 和 Express.js 等框架。

**`react-scripts-intlayer` 包** 包含用于将 Intlayer 集成到基于 Create React App 的应用中的 `react-scripts-intlayer` 命令和插件。这些插件基于 [craco](https://craco.js.org/) 并包含针对 [Webpack](https://webpack.js.org/) 打包工具的额外配置。

## 配置

`react-scripts-intlayer` 包可以无缝配合 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/index.md) 使用。请查看相关文档以获取更多信息。

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## 使用方法

### CLI 命令

`react-scripts-intlayer` 包提供以下 CLI 命令：

- `npx react-scripts-intlayer build`：使用 Intlayer 配置构建 React 应用。
- `npx react-scripts-intlayer start`：使用 Intlayer 配置启动开发服务器。

### 替换 package.json 脚本

要使用 `react-scripts-intlayer` 包，您需要将 `package.json` 中的脚本替换为以下命令：

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## 使用自定义 Webpack 配置

`react-scripts-intlayer` 基于 [craco](https://craco.js.org/)，它允许您自定义 Webpack 配置。
如果您需要自定义 Webpack 配置，也可以基于 intlayer craco 插件实现自己的设置。[查看示例](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)。

## 阅读完整的 React Create App Intlayer 指南

Intlayer 提供了许多功能，帮助您实现 React 应用的国际化。
[查看如何在 React Create App 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)。

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
