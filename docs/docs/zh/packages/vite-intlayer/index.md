---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 包文档 | vite-intlayer
description: 查看如何使用 vite-intlayer 包
keywords:
  - Intlayer
  - vite-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer：用于 Vite 应用程序国际化（i18n）的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包。它兼容 React、React 和 Express.js 等框架。

**`vite-intlayer` 包** 允许您对 Vite 应用程序进行国际化。它包含一个 Vite 插件，通过环境变量将配置设置到 [Vite 打包器](https://vitejs.dev/guide/why.html#why-bundle-for-production) 中。它还提供中间件，用于检测用户偏好的语言环境，并根据 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 将用户重定向到相应的 URL。

## 为什么要对您的 Vite 应用程序进行国际化？

对您的 Vite 应用程序进行国际化对于有效服务全球用户至关重要。它使您的应用程序能够以每个用户偏好的语言提供内容和信息。此功能提升了用户体验，并通过使应用程序对不同语言背景的人群更易访问和更具相关性，扩大了应用程序的覆盖范围。

## 配置

`vite-intlayer` 包与 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/index.md) 无缝协作。有关更多信息，请查看相关文档。

## 安装

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## 使用示例

查看如何将插件包含到您的 vite 配置中的示例。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerMiddlewarePlugin()],
});
```

> `intlayer()` 是用于将 Intlayer 集成到 Vite 的插件。它确保内容声明文件的构建，并在开发模式下进行监控。它在 Vite 应用中定义了 Intlayer 的环境变量。此外，它还提供别名以优化性能。

> `intlayerMiddlewarePlugin()` 为您的应用添加服务器端路由。该插件会根据 URL 自动检测当前语言环境并设置相应的语言环境 Cookie。如果未指定语言环境，插件将根据用户浏览器的语言偏好确定最合适的语言环境。如果未检测到语言环境，则会重定向到默认语言环境。

## 掌握您的 Vite 应用的国际化

Intlayer 提供了许多功能，帮助您实现 Vite 应用程序的国际化。

**要了解有关这些功能的更多信息，请参阅针对 Vite 和 React 应用程序的 [使用 Intlayer 和 Vite 进行 React 国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md) 指南。**

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
