---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerCompiler Vite 插件文档 | vite-intlayer
description: Vite 插件，用于在构建/转换时从组件文件中提取内联 Intlayer 内容声明并将其写入字典 JSON 文件。
keywords:
  - intlayerCompiler
  - vite
  - 插件
  - 编译器
  - 内容
  - 字典
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "集成到 intlayer() 中；初始化文档"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` 是一个 Vite 插件，它扫描组件源文件以查找**内联 Intlayer 内容声明**（即直接在组件内部定义的内容，而不是在单独的 `.content.ts` 文件中），并在转换（transform）阶段将它们写入字典 JSON 文件中。

> **自 Intlayer v9 起**，当您的 Intlayer 配置中同时设置了 `compiler.enabled` 为 `true` 且设置了 `compiler.output` 时，`intlayerCompiler` 会自动包含在主 [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md) 插件中。只有当您希望完全控制编译器特定配置时，才需要单独注册它。

## 用法

### 作为 `intlayer()` 的一部分（推荐，v9+）

通过您的 Intlayer 配置启用编译器：

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // 提取的字典写入的位置
  },
});
```

然后使用标准插件，无需额外交册：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### 独立使用（需要时）

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## 选项

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| 选项             | 类型                      | 描述                                                                  |
| ---------------- | ------------------------- | --------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | 转发给 `getConfiguration()` 的 Intlayer 配置覆盖项。                  |
| `compilerConfig` | `Partial<CompilerConfig>` | 编译器特定配置部分的覆盖项（例如 `enabled`, `output`, `filesList`）。 |

### 示例

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## 工作原理

### 转换（Transform）阶段

对于每个与 `compiler.filesList` 匹配的源文件，编译器插件执行以下操作：

1. 将文件内容传递给 `@intlayer/babel` 中的 `extractContent`。
2. 对找到的每个声明调用 `onExtract`，这会将生成的字典 JSON 写入 `compiler.output`。
3. 返回转换后的源代码，内联声明已替换为标准的 `useIntlayer('key')` / `getIntlayer('key')` 调用。

支持的文件类型：`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`。

### HMR（热模块替换）

在开发模式下保存组件文件时，编译器：

1. 通过 Vite 的 `handleHotUpdate` 钩子检测文件更改。
2. 从更新后的文件中重新提取内容。
3. 写入更新后的字典 JSON。
4. 触发页面完全重新加载（`server.ws.send({ type: 'full-reload' })`）。

500 毫秒的防抖（debounce）可防止字典写入本身（这也会触发文件更改事件）导致无限的重新提取循环。

### 去重（Deduplication）

`intlayerCompiler` 使用与其他捆绑插件相同的 `createPrimaryInstanceGuard` 去重机制。当同时存在 `intlayer()`（已捆绑编译器）和手动 `intlayerCompiler()` 调用时，仅运行第一个注册 ins — 不会重复写入任何字典。
