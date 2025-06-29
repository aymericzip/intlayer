---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 包文档 | lynx-intlayer
description: 查看如何使用 lynx-intlayer 软件包
keywords:
  - Intlayer
  - lynx-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# lynx-intlayer: 国际化 (i18n) 一个 Lynx 应用程序

**Intlayer** 是专为 JavaScript 开发者设计的一套工具包。它兼容 React、React 和 Express.js 等框架。

**`lynx-intlayer` 包** 允许您对 Vite 应用程序进行国际化。它包括 Metro 插件，通过环境变量将配置设置到 [Lynx 打包工具](https://lynxjs.org/index.html)。

## 为什么要对您的 Lynx 应用程序进行国际化？

对您的 Lynx 应用程序进行国际化对于有效服务全球用户至关重要。它允许您的应用程序以每个用户偏好的语言提供内容和消息。这种能力提升了用户体验，并通过使您的应用程序更易于访问和更贴近不同语言背景的人群，从而扩大了应用程序的覆盖范围。

## 配置

`lynx-intlayer` 包与 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/index.md) 无缝协作。请查看相关文档以获取更多信息。

## 安装

使用您喜欢的包管理器安装必要的包：

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

查看如何将插件包含到您的 Vite 配置中的示例。

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

## 掌握 Vite 应用程序的国际化

Intlayer 提供了许多功能来帮助您对 Vite 应用程序进行国际化。

**要了解更多这些功能，请参考 [使用 Intlayer 和 Lynx 的 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_lynx+react.md) 指南，适用于 Lynx 应用程序。**

## 阅读关于 Intlayer 的信息

- [Intlayer 网站](https://intlayer.org)
- [Intlayer 文档](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [向我们的智能文档提问](https://intlayer.org/docchat)
