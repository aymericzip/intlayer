---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ESBuild 错误
description: 了解如何修复 ESBuild 错误。
keywords:
  - esbuild
  - 错误
  - intlayer
  - 插件
  - 框架
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - 文档
  - 常见问题
  - esbuild-错误
---

# ESBuild 错误

如果您在构建过程中遇到 ESBuild 错误，很可能是因为 Intlayer 插件未正确配置。

ESBuild 负责读取内容声明文件（`.content.{ts,js,mjs,cjs,json}`）并在 `.intlayer/dictionary` 文件夹中生成相应的字典。同时还会读取配置文件（`intlayer.config.ts`）。

Intlayer 提供了与您的打包工具集成的插件。它旨在为仅在服务器端运行的组件创建别名。

如果您使用的是像 Next.js（Webpack / Turbopack）、Vite、React Native、Lynx 等框架，Intlayer 提供了一个插件，您可以使用该插件将 Intlayer 集成到您的应用程序中。因此，请参考您所使用框架的具体文档，了解如何集成该插件。
