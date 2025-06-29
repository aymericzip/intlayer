---
docName: package__vite-intlayer
url: https://intlayer.org/doc/packages/vite-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 包文档 | vite-intlayer
description: 查看如何使用 vite-intlayer 软件包
keywords:
  - Intlayer
  - vite-intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# vite-intlayer: 用于国际化 (i18n) Vite 应用的 NPM 包

**Intlayer** 是专为 JavaScript 开发者设计的一套工具包。它兼容 React、React 和 Express.js 等框架。

**`vite-intlayer` 包** 允许您对 Vite 应用进行国际化。它包括一个 Vite 插件，通过环境变量将配置设置到 [Vite 打包器](https://vitejs.dev/guide/why.html#why-bundle-for-production)。此外，它还提供中间件来检测用户的首选语言环境，并根据 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 将用户重定向到适当的 URL。

## 为什么要对 Vite 应用进行国际化？

对 Vite 应用进行国际化对于有效服务全球用户至关重要。它使您的应用能够以每个用户的首选语言提供内容和消息。这种能力提升了用户体验，并通过使您的应用对不同语言背景的用户更具可访问性和相关性，从而扩大了应用的覆盖范围。

## 配置

`vite-intlayer` 包可以无缝地与 [`react-intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/index.md) 和 [`intlayer` 包](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/index.md) 一起使用。有关更多信息，请参阅相关文档。

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

查看如何将插件包含到您的 Vite 配置中的示例。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite 插件用于将 Intlayer 集成到 Vite 中。它确保内容声明文件的构建，并在开发模式下监视它们。它在 Vite 应用中定义 Intlayer 环境变量。此外，它还提供别名以优化性能。

> `intLayerMiddlewarePlugin()` 为您的应用添加服务器端路由。此插件将根据 URL 自动检测当前语言环境并设置适当的语言环境 Cookie。如果未指定语言环境，插件将根据用户的浏览器语言偏好确定最合适的语言环境。如果未检测到语言环境，它将重定向到默认语言环境。

## 掌握 Vite 应用的国际化

Intlayer 提供了许多功能来帮助您对 Vite 应用进行国际化。

**要了解更多这些功能，请参考 [使用 Intlayer 和 Vite 以及 React 进行国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md) 的指南，适用于 Vite 和 React 应用。**
