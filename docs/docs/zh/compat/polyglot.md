---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 Polyglot.js 迁移到 Intlayer"
description: "了解如何使用兼容适配器从 Polyglot.js 迁移到 Intlayer。"
keywords:
  - polyglot
  - airbnb
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 Polyglot.js 迁移到 Intlayer

如果您正在使用 Airbnb 的 Polyglot.js，使用兼容层迁移到 Intlayer 非常简单直接。

## 操作步骤

只需在您的项目中运行初始化命令：

```bash
npx intlayer init
```

这将生成 `intlayer.config.ts`。然后，您可以使用 bundler 插件别名将 Polyglot 导入透明地重定向到 `@intlayer/polyglot`。

## 底层原理

Polyglot.js 语法通常依赖于 `polyglot.t('key', {name})`，使用 `%{name}` 插值和以 `"singular |||| plural"` 分隔的 `smart_count` 复数。

底层实现：

- **插值：** 兼容层原生处理 `%{var}` 占位符。
- **复数：** 字符串在 `||||` 处被分割，并根据活动语言环境针对原生 `Intl.PluralRules` 进行求值，按照 Polyglot 自身的每语言环境桶顺序进行处理。
- **字典：** 您无需向 `new Polyglot()` 提供大型 JSON 配置——Intlayer 动态处理字典并自动进行修剪。
