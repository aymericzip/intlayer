---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 NGX-Translate 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Angular 应用程序从 ngx-translate 迁移到 Intlayer。"
keywords:
  - ngx-translate
  - angular
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - ngx-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 NGX-Translate 迁移到 Intlayer

使用兼容适配器，将您的 Angular 应用程序从 `ngx-translate` 迁移到 Intlayer 非常简单，让您无需重写所有模板。

## 操作步骤

首先运行：

```bash
npx intlayer init
```

这将设置 `intlayer.config.ts`。替换您的 `TranslateModule.forRoot()` 设置，并将导入别名适当地指向 `@intlayer/ngx-translate`。

## 底层原理

`ngx-translate` 使用 `TranslateService`（`instant`、`get`、`stream`）以及 `{{ 'KEY' | translate:params }}` 管道和 `[translate]` 指令。

底层实现：

- **服务：** `TranslateService` 包装了 `getIntlayer` 和一个语言环境可观察对象，提供完全相同的方法。
- **管道和指令：** 重新实现以直接针对 Intlayer 字典进行解析。
- **加载器：** `TranslateHttpLoader` 设置被转换为警告存根，因为 Intlayer 在构建时（或通过标准动态导入）固有地解析和 bundle 您的字典，完全消除了对 HTTP 加载器的需求。
