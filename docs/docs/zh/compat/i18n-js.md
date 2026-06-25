---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 i18n-js 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的应用程序从 i18n-js 迁移到 Intlayer。"
keywords:
  - i18n-js
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 i18n-js 迁移到 Intlayer

从 `i18n-js` 库迁移到 Intlayer 是一个高度优化的迁移过程，旨在将大型翻译配置迁移到 Intlayer 结构化的文件解析系统中。

## 操作步骤

在您的仓库中执行以下设置命令：

```bash
npx intlayer init
```

准备好 `intlayer.config.ts` 后，您可以在 bundler 配置中添加 Intlayer 的别名，使 `i18n-js` 的任何导入都指向兼容 package `@intlayer/i18n-js`。

## 底层原理

`i18n-js` 通过 `i18n.t('scope.key', {name})` 等表达式访问命名空间，并支持语言回退和特定的复数映射。

底层实现：

- **插值：** 兼容适配器可以轻松地将 `%{name}` 映射解析为目标运行时字典值。
- **复数化：** 替换 `one/other` 子键，并将其映射到 Intlayer 强大的底层复数机制（`Intl.PluralRules`），从而抽象掉手动映射的需求。
- **语言环境：** 无需在启动时加载单体语言 payload，字典根据通过原生 Intlayer 配置设置的当前上下文进行最优化加载。
