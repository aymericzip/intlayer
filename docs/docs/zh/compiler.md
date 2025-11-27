---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer 编译器 | 用于 i18n 的自动内容提取
description: 使用 Intlayer 编译器自动化您的国际化流程。直接从组件中提取内容，实现 Vite、Next.js 等框架中更快速、更高效的 i18n。
keywords:
  - Intlayer
  - 编译器
  - 国际化
  - i18n
  - 自动化
  - 提取
  - 速度
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: 发布编译器
---

# Intlayer 编译器 | 用于 i18n 的自动内容提取

## 什么是 Intlayer 编译器？

**Intlayer 编译器** 是一个强大的工具，旨在自动化您应用程序中的国际化（i18n）流程。它会扫描您的源代码（JSX、TSX、Vue、Svelte）中的内容声明，提取它们，并自动生成所需的字典文件。这使您能够将内容与组件放置在一起，而 Intlayer 则负责管理和同步您的字典。

## 为什么使用 Intlayer 编译器？

- **自动化**：消除手动将内容复制粘贴到字典中的步骤。
- **速度**：优化的内容提取，确保构建过程保持快速。
- **开发者体验**：将内容声明保留在使用它们的位置，提高可维护性。
- **实时更新**：支持热模块替换（HMR），在开发过程中即时反馈。

请参阅[Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md)博客文章，了解更深入的比较。

## 为什么不使用 Intlayer 编译器？

虽然编译器提供了出色的"开箱即用"体验，但它也引入了一些您应该了解的权衡：

- **启发式歧义**：编译器必须猜测什么是面向用户的内容，什么是应用程序逻辑（例如，`className="active"`、状态代码、产品 ID）。在复杂的代码库中，这可能导致误报或遗漏的字符串，需要手动注释和异常处理。
- **仅静态提取**：基于编译器的提取依赖于静态分析。仅在运行时存在的字符串（API 错误代码、CMS 字段等）无法被编译器单独发现或翻译，因此您仍然需要补充的运行时 i18n 策略。

有关更深入的架构比较，请参阅博客文章[Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md)。

作为替代方案，为了在保持对内容的完全控制的同时自动化您的 i18n 流程，Intlayer 还提供了自动提取命令 `intlayer transform`（请参阅[CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/transform.md)），或 Intlayer VS Code 扩展的 `Intlayer: extract content to Dictionary` 命令（请参阅[VS Code 扩展文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)）。

## 使用方法

### Vite

对于基于 Vite 的应用（React、Vue、Svelte 等），使用编译器最简单的方法是通过 `vite-intlayer` 插件。

#### 安装

```bash
npm install vite-intlayer
```

#### 配置

更新你的 `vite.config.ts`，以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 添加编译器插件
  ],
});
```

#### 框架支持

Vite 插件会自动检测并处理不同的文件类型：

- **React / JSX / TSX**：原生支持。
- **Vue**：需要安装 `@intlayer/vue-compiler`。
- **Svelte**：需要安装 `@intlayer/svelte-compiler`。

请确保为你的框架安装了相应的编译器包：

```bash
# Vue 使用
npm install @intlayer/vue-compiler

# Svelte 使用
npm install @intlayer/svelte-compiler
```

### Next.js（Babel）

对于使用 Babel 的 Next.js 或其他基于 Webpack 的应用，可以通过 `@intlayer/babel` 插件配置编译器。

#### 安装

```bash
npm install @intlayer/babel
```

#### 配置

更新您的 `babel.config.js`（或 `babel.config.json`）以包含提取插件。我们提供了一个辅助函数 `getCompilerOptions`，用于自动加载您的 Intlayer 配置。

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // 自动从 intlayer.config.ts 加载选项
    ],
  ],
};
```

此配置确保在构建过程中，组件中声明的内容会被自动提取并用于生成字典。
