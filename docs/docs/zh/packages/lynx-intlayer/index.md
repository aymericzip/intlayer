---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 包文档 | lynx-intlayer
description: 查看如何使用 lynx-intlayer 包
keywords:
  - Intlayer
  - lynx-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - lynx-intlayer
---

# lynx-intlayer：为 Lynx 应用程序实现国际化（i18n）

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React 和 Express.js 等框架。

**`lynx-intlayer` 包** 允许您为 Vite 应用程序实现国际化。它包含 Metro 插件，通过环境变量将配置设置到 [Lynx 打包器](https://lynxjs.org/index.html) 中。

## 为什么要为您的 Lynx 应用程序实现国际化？

为您的 Lynx 应用程序实现国际化对于有效服务全球用户至关重要。它使您的应用程序能够以每个用户偏好的语言提供内容和信息。这种能力提升了用户体验，并通过使应用程序对不同语言背景的人更易访问和更具相关性，扩大了应用程序的覆盖范围。

## 配置

`lynx-intlayer` 包与 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/index.md) 无缝协作。有关更多信息，请查看相关文档。

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## 使用示例

查看如何将插件包含到您的 vite 配置中的示例。

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... 其他插件
    pluginIntlayerLynx(),
  ],
});
```

## 精通您的 Vite 应用程序的国际化

Intlayer 提供了许多功能，帮助您实现 Vite 应用程序的国际化。

**要了解有关这些功能的更多信息，请参阅 Lynx 应用程序的 [使用 Intlayer 和 Lynx 的 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_lynx+react.md) 指南。**

## 了解 Intlayer

- [Intlayer 网站](https://intlayer.org)
- [Intlayer 文档](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [向我们的智能文档提问](https://intlayer.org/doc/chat)

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
