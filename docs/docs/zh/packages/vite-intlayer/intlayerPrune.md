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
    changes: 初始化文档
---

# intlayerPrune Vite 插件文档

`intlayerPrune` Vite 插件用于对应用包中未使用的字典进行 tree-shaking 和裁剪。这样可以通过仅包含必要的多语言内容来减小最终包的体积。

## 用法

```ts
// vite.config.ts（Vite 配置）
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## 描述

该插件会分析你的源代码以识别哪些字典键实际上被使用。然后它会从打包后的字典文件中移除任何未使用的内容。对于拥有大量字典但在特定页面或组件中仅使用其中一部分的大型项目，这尤其有用。
