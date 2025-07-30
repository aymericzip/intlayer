---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 如何构建字典？
description: 学习如何构建字典。
keywords:
  - 构建
  - 字典
  - intlayer
  - 命令
  - 监听
  - vscode
  - 插件
  - 框架
  - next.js
  - vite
slugs:
  - doc
  - faq
  - build-dictionaries
---

# 构建字典

## 如何构建字典

Intlayer 提供了一个命令行工具来构建字典。

```bash
npx intlayer dictionaries build
```

该命令：

- 扫描项目中所有内容声明文件（`.content.{ts,tsx,js,mjs,cjs,json,...}`）。
- 生成字典并将其存储在 `.intlayer/dictionary` 文件夹中。

### 监听模式

如果您希望在内容声明文件发生更改时自动更新字典，请运行以下命令：

```bash
npx intlayer dictionaries build --watch
```

在此模式下，Intlayer 会在内容声明文件发生更改时扫描并构建字典，并自动更新 `.intlayer/dictionary` 文件夹。

### 使用 VSCode 扩展

您还可以使用[Intlayer VSCode 扩展](https://github.com/aymericzip/intlayer/tree/main/docs/zh/vs_code_extension.md)来增强您在 VSCode 中的 Intlayer 体验。

### 使用您喜欢的应用框架插件

如果您使用的是像 Next.js（Webpack / Turbopack）、Vite、React Native、Lynx 等框架，Intlayer 提供了一个插件，您可以使用该插件将 Intlayer 集成到您的应用程序中。

Intlayer 会在您的应用程序构建之前构建字典。
同样，在开发模式下，Intlayer 会监视内容声明文件的更改并自动重新构建字典。

因此，请参考您所使用框架的具体文档，了解如何集成该插件。
