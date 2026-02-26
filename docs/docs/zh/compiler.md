---
createdAt: 2025-09-09
updatedAt: 2026-02-25
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
  - version: 8.1.7
    date: 2026-02-25
    changes: 更新编译器选项
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

作为替代方案，为了在保持对内容的完全控制的同时自动化您的 i18n 流程，Intlayer 还提供了自动提取命令 `intlayer extract`（请参阅[CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)），或 Intlayer VS Code 扩展的 `Intlayer: extract content to Dictionary` 命令（请参阅[VS Code 扩展文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)）。

## 使用方法

<Tabs>
 <Tab value='vite'>

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

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

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

 </Tab>
 <Tab value='nextjs'>

### Next.js（Babel）

对于使用 Babel 的 Next.js 或其他基于 Webpack 的应用，可以通过 `@intlayer/babel` 插件配置编译器。

#### 安装

```bash
npm install @intlayer/babel
```

#### 配置

更新您的 `babel.config.js`（或 `babel.config.json`）以包含提取插件。我们提供了一个辅助函数 `getExtractPluginOptions`，用于自动加载您的 Intlayer 配置。

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

此配置确保在构建过程中，组件中声明的内容会被自动提取并用于生成字典。

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>

### 自定义配置

要自定义编译器的行为，您可以更新项目根目录中的 `intlayer.config.ts` 文件。

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * 指示是否应启用编译器。
     * 设置为 'build-only' 可在开发期间跳过编译器并加快启动速度。
     */
    enabled: true,

    /**
     * 遍历要优化的代码的模式。
     */
    transformPattern: [
      "**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}",
      "!**/node_modules/**",
    ],

    /**
     * 要从优化中排除的模式。
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * 优化后字典的输出目录。
     */
    outputDir: "i18n",

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "", // 移除基本前缀

    /**
     * 指示是否应在转换后保存组件。
     * 这样，编译器只需运行一次即可转换应用程序，然后可以将其移除。
     */
    saveComponents: false,
  },
};

export default config;
```

### 填充缺失的翻译

Intlayer 提供了一个 CLI 工具来帮助您填充缺失的翻译。您可以使用 `intlayer` 命令来测试并从代码中填充缺失的翻译。

```bash
npx intlayer test         # 测试是否存在缺失的翻译
```

```bash
npx intlayer fill         # 填充缺失的翻译
```

> 有关更多详细信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/ci.md)
