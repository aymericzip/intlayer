---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite 插件文档 | vite-intlayer
description: 查看如何在 vite-intlayer 包中使用 intlayerPrune 插件
keywords:
  - intlayerPrune
  - vite
  - 插件
  - tree-shaking
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "初始化文档"
author: aymericzip
---

# intlayerPrune Vite 插件文档

`intlayerPrune` Vite 插件用于对应用包中未使用的字典进行 tree-shaking 和裁剪。这样可以通过仅包含必要的多语言内容来减小最终包的体积。

> 当你使用 [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md) 时，该插件已自动包含并配置。只有在你自己组合插件堆栈时，才需要手动注册它。

## 使用

### 作为 `intlayer()` 的一部分（推荐）

通过您的 Intlayer 配置启用剪枝，主插件会处理一切：

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // 启用剪枝和最小化
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### 独立使用

如果您是手动组合插件堆栈，`intlayerPrune` 和 `intlayerMinify` 共享一个 `PruneContext` 对象，该对象必须创建一次并传递给两者：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // 可选，从同一上下文读取
  ],
});
```

## 它的工作原理

### 1. 使用情况分析 (buildStart)

在 `buildStart` 期间，`intlayerOptimize` 插件（也是 `intlayer()` 的一部分）扫描 `build.filesList` 中列出的每个组件源文件。对于每个 `useIntlayer('key')` 或 `getIntlayer('key')` 调用，它会准确记录访问了哪些字段，例如：

```ts
const { title, description } = useIntlayer("myDict");
// 记录: myDict → { title, description }
```

这在任何 `transform` 调用运行之前建立了 `pruneContext.fieldUsageMap`。

### 2. JSON 修剪 (transform, enforce: 'pre')

当 Vite 处理编译的字典 JSON 文件时，`intlayerPrune` 在 Vite 的内置 JSON → ESM 转换之前拦截它。它从 `pruneContext` 读取字段使用情况映射，并删除任何不在记录的使用集中的内容字段。

支持两种内容形状：

- **静态字典** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`。字段在 `translation` 内按语言环境修剪。
- **动态（按语言环境）字典** — 扁平化 `{ fieldA: ..., fieldB: ... }`。字段在顶级进行修剪。

### 3. Edge cases

如果字典的内容结构无法识别（例如，不寻常的嵌套形状），它会被添加到 `pruneContext.dictionariesWithEdgeCases` 中并**保持不变**。会记录一条警告。`intlayerMinify` 也会跳过这些字典。

### 4. Field-rename map

当剪枝成功时，`intlayerPrune` 也会写入 `pruneContext.dictionaryKeyToFieldRenameMap` — 一个从原始字段名到简短别名的映射。`intlayerMinify` 读取此映射以在输出 JSON 中重命名字段，而 `intlayerOptimize` 的 Babel 重命名传递相应地更新源文件中的属性访问。

## 激活条件

`intlayerPrune` **仅当**以下所有条件都为真时才会激活：

1. Vite 命令是 `build`。
2. `build.optimize` 是 `true`（或 `undefined`，在构建时默认为 `true`）。
3. 在您的 Intlayer 配置中 `build.purge` 是 `true`。

当 `editor.enabled` 为 `true` 时，它仍保持启用：可视化编辑器通过 `dictionaryKey` + `keyPath` 对照未合并的字典来解析每一次编辑，而该插件从不触碰这些字典；被清除的字段是没有任何组件会读取的字段——因此它永远不会被渲染，也无法在页面中被选中。
