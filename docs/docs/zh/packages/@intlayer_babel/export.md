---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "@intlayer/babel 包文档"
description: 用于 Intlayer 的 Babel 插件，处理构建期间的内容提取、导入优化、删除未使用字段以及混淆字段名称。
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - 国际化
  - i18n
  - 编译器
  - 优化
  - 清除
  - 压缩
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "统一所有导出的文档"
author: aymericzip
---

# @intlayer/babel 包

`@intlayer/babel` 包为 Intlayer 提供了一套专业的 Babel 插件。这些插件涵盖了整个构建生命周期：提取内容声明、将 `useIntlayer` / `getIntlayer` 调用重写为优化后的字典导入、清除未使用的字段以及压缩字段名称。

## 安装

```bash
npm install @intlayer/babel
```

## 导出

导入：

```ts
import { ... } from "@intlayer/babel";
```

---

### 插件

| 函数 / 类                      | 描述                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`   | Babel 插件，可从源文件中提取可翻译内容并自动注入 `useIntlayer` / `getIntlayer` 钩子。设计用于 Next.js 和基于 Babel 的构建工具。            |
| `intlayerOptimizeBabelPlugin`  | Babel 插件，可转换 `useIntlayer` 和 `getIntlayer` 调用，并将其导入重写为优化后的 JSON 字典导入（静态、动态或通过 fetch）。                 |
| `intlayerPurgeBabelPlugin`     | Babel 插件，可分析源文件并重写编译后的字典 JSON 文件，以移除未使用的字段（`build.purge`）或将其重命名为简短别名（`build.minify`）。        |
| `intlayerMinifyBabelPlugin`    | Babel 插件，可重写源文件以使用在混淆/压缩阶段分配的简短字段别名（例如 `content.title` ← `content.a`）。依赖于 `intlayerPurgeBabelPlugin`。 |
| `makeFieldRenameBabelPlugin`   | 工厂函数，用于生成一个 Babel 插件，根据 `PruneContext` 中填充的 `dictionaryKeyToFieldRenameMap` 重命名源文件中的字典内容字段访问。         |
| `makeUsageAnalyzerBabelPlugin` | 工厂函数，用于生成一个 Babel 插件，以分析源代码中 `useIntlayer` / `getIntlayer` 的使用情况，并在共享的 `PruneContext` 中聚合字段使用数据。 |
| `getSharedPruneContext`        | 辅助函数，用于返回指定根目录的共享 `PruneContext` 对象，如果尚未初始化，则返回 `null`。                                                    |

---

### 插件配置工具

| 函数                       | 描述                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | 加载 Intlayer 配置并返回准备好与 `intlayerExtractBabelPlugin` 配合使用的 `ExtractPluginOptions`。                   |
| `getOptimizePluginOptions` | 加载 Intlayer 配置和编译好的字典，并返回准备好与 `intlayerOptimizeBabelPlugin` 配合使用的 `OptimizePluginOptions`。 |
| `getPurgePluginOptions`    | 加载 Intlayer 配置并返回准备好与 `intlayerPurgeBabelPlugin` 配合使用的 `PurgePluginOptions`。                       |
| `getMinifyPluginOptions`   | 加载 Intlayer 配置并返回准备好与 `intlayerMinifyBabelPlugin` 配合使用的 `MinifyPluginOptions`。                     |

---

### 类型

| 类型                    | 描述                                                                          |
| ----------------------- | ----------------------------------------------------------------------------- |
| `CompilerMode`          | 编译器模式：用于带 HMR 支持的开发的 `'dev'`，或用于生产环境构建的 `'build'`。 |
| `ExtractPluginOptions`  | `intlayerExtractBabelPlugin` 的选项：文件列表、配置、`onExtract` 回调函数等。 |
| `ExtractResult`         | 提取结果：字典键、文件路径、内容和语言区域。                                  |
| `OptimizePluginOptions` | `intlayerOptimizeBabelPlugin` 的选项：字典路径、导入模式、每字典模式映射等。  |
| `PurgePluginOptions`    | `intlayerPurgeBabelPlugin` 的选项：根目录、清除/混淆/优化标志、组件文件列表。 |
| `MinifyPluginOptions`   | `intlayerMinifyBabelPlugin` 的选项：根目录、混淆/优化/editorEnabled 标志。    |
| `PruneContext`          | 分析和清除插件之间的共享状态：字段使用映射、重命名映射等。                    |
| `DictionaryFieldUsage`  | 单个字典的字段使用结果：`Set<string>`，在静态分析不确定时为 `'all'`。         |
| `NestedRenameEntry`     | 重命名树中的节点：`shortName` 和子节点映射。                                  |
| `NestedRenameMap`       | 重命名树中的一级：`Map<string, NestedRenameEntry>`。                          |
| `CompatCallerConfig`    | 用于兼容包（`compat-adapter`）的兼容使用分析器配置（调用者名称和处理选项）。  |
| `ScriptBlock`           | 从 SFC 文件（Vue 或 Svelte）中提取的脚本块：内容、起始偏移量和结束偏移量。    |

---

### 工具函数

| 函数                              | 描述                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | 将整数（从零开始）转换为简短的字母标识符：`0` → `'a'`，`25` → `'z'`，`26` → `'aa'` 等。                       |
| `buildNestedRenameMapFromContent` | 从编译好的字典的内容值中递归构建 `NestedRenameMap`，并遵循 Intlayer 节点结构（translation、enumeration 等）。 |
| `createPruneContext`              | 创建一个初始化为默认值的新的空 `PruneContext` 对象。                                                          |
| `extractScriptBlocks`             | 从 SFC 文件（Vue / Svelte）中提取 `<script>` 块，以便进行后续的 Babel 分析。                                  |
| `BABEL_PARSER_OPTIONS`            | 表示覆盖支持的框架（React/Vue/Svelte/Angular/...）的 Babel 解析器选项的常量。                                 |
| `INTLAYER_CALLER_NAMES`           | 原始 Intlayer 调用者名称的常量列表：`['useIntlayer', 'getIntlayer']`。                                        |

---

## 使用示例

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **注意：** `intlayerPurgeBabelPlugin` 必须在 `intlayerMinifyBabelPlugin` **之前**声明，因为后者需要读取前者构建的重命名映射。此外，这两者之前都必须先声明 `intlayerOptimizeBabelPlugin`，以便它在重写 `useIntlayer` 调用之前能够检测到字典键。
