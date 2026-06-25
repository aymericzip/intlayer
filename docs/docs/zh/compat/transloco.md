---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 Transloco 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Angular 应用程序从 Transloco 迁移到 Intlayer。"
keywords:
  - transloco
  - angular
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 Transloco 迁移到 Intlayer

如果您的 Angular 应用程序当前使用 `@jsverse/transloco`，您可以使用我们的兼容适配器迁移到 Intlayer。这一过渡让您在利用 Intlayer 强大字典结构的同时，维持现有的模板语法。

## 操作步骤

只需在您的项目中运行初始化命令：

```bash
npx intlayer init
```

这将生成必要的 `intlayer.config.ts` 配置。然后，您将用 `@intlayer/transloco` 模块替换您的 Transloco 导入，或依赖构建别名。

## 底层原理

Transloco 使用作用域和 `TranslocoService`（`translate`、`selectTranslate`），以及结构性指令（`*transloco="let t"`）和管道（`| transloco`）。

底层实现：

- **作用域：** 自然映射到 Intlayer 字典键，为 bundle 优化提供出色的修剪能力。
- **服务和指令：** Intlayer 的 Angular 适配器无缝替换了 provider，允许您现有的模板管道和指令针对 Intlayer 字典解析字符串。
- **构建时解析：** TypeScript 分析器识别 `instant/get` 调用，即使模板使用无法静态跟踪，回退修剪也能确保正确性。
