---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite 插件文档 | vite-intlayer
description: 查看如何在 vite-intlayer 包中使用 intlayer 插件
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayer Vite 插件文档

`intlayer` Vite 插件将 Intlayer 配置集成到构建流程中。它处理词典别名，在开发模式下启动词典监听器，并为构建准备词典。

## 用法

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## 描述

该插件执行以下任务：

1. **准备字典**：在构建或开发过程开始时，将字典编译为优化后的文件。
2. **监听模式**：在开发模式下，它会监视字典文件的更改并自动重新编译。
3. **别名**：为在应用中访问字典提供别名。
4. **Tree-shaking**：它通过 `intlayerPrune` 插件支持对未使用的翻译进行 tree-shaking。
