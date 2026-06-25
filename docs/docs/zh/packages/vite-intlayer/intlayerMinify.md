---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerMinify Vite 插件文档 | vite-intlayer
description: Vite 插件，用于压缩编译后的 Intlayer 字典 JSON 文件，并可选地混淆内容字段名称以减小包大小。
keywords:
  - intlayerMinify
  - vite
  - 插件
  - 压缩
  - 包大小
  - 字典
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "初始化文档"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` 是一个 Vite 插件，用于在生产环境构建（production build）期间压缩编译后的字典 JSON 文件。它会清除所有不必要的空格，并在与 `intlayerPrune` 结合时，可选地将内容字段名称重命名为简短的字母别名（`a`, `b`, `c`, …），以进一步减小包大小。

> 当您使用 [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md) 时，该插件已自动包含并配置。只有在您自己构建插件栈时，才需要手动注册它。

## 用法

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## 激活条件

`intlayerMinify` 仅在以下三个条件均满足时处于活动状态：

1. Vite 命令为 `build`（不是 `serve` / dev 开发服务）。
2. `build.optimize` 为 `true`（或 `undefined`，构建时默认为 `true`）。
3. 您的 Intlayer 配置中 `build.minify` 为 `true`。

当 `editor.enabled` 为 `true` 时，它会自动**禁用**，因为编辑器需要完整、人类可读的字典内容。

## 哪些内容会被压缩

该插件针对两个字典位置（解析自 `intlayer.system`）：

- `dictionariesDir` — 静态全语言字典（例如 `.intlayer/dictionaries/*.json`）
- `dynamicDictionariesDir` — 每种语言的动态字典

> 获取模式字典（`fetchDictionariesDir`）**从不**会被压缩，因为它们在运行时使用其原始字段名称从远程 API 提供服务。重命名字段将导致服务器响应与客户端属性访问之间出现不匹配。

## 字段名混淆（属性压缩）

当 `intlayerPrune` 分析了代码库并填充了 `pruneContext.dictionaryKeyToFieldRenameMap` 时，`intlayerMinify` 也会将内容字段名称重命名为简短别名。例如：

```json
// 混淆前
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// 混淆后（进行混淆处理）
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

对应的源文件属性访问已由 `intlayerOptimize` 内的 Babel 处理重命名，因此运行时行为保持不变。

内部 Intlayer 字段（`nodeType`, `translation` 等）绝不会被重命名。

## 边缘情况字典

在 `pruneContext.dictionariesWithEdgeCases` 中被标记的字典（在修剪（prune）阶段检测到结构异常）将被完全跳过 — 既不压缩也不混淆 — 以避免发布损坏的数据。

## 限饰组（集合 / 变体 / 元记录）

对于具有 `qualifierTypes` 数组的字典（集合、变体和元记录），插件会逐字保留 `qualifierTypes` 数组和 `meta` 侧图。仅混淆 `content` 条目的字段名称。用于运行时选择器匹配的复合键绝不会被修改。
