---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 Lingui 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的应用程序从 Lingui 迁移到 Intlayer。"
keywords:
  - lingui
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 Lingui 迁移到 Intlayer

如果您的项目目前依赖 Lingui 基于宏的编译，迁移到 Intlayer 可以让您在保持强大宏工作流的同时，以 Intlayer 的 JSON 编译策略作为原生支撑。

## 操作步骤

首先，在您的项目中初始化 Intlayer：

```bash
npx intlayer init
```

这将创建您的 `intlayer.config.ts`。确保在构建步骤中保留 `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin`，使其在 Intlayer 编译器*之前*运行。然后，使用 bundler 插件别名将 `@lingui/core` 和 `@lingui/react` 路由到 `@intlayer/lingui`。

## 底层原理

Lingui 利用宏（如 `` t`Hello ${name}` `` 和 `<Trans>`），这些宏被编译为运行时调用，如 `i18n._(id, values)`。

底层实现：

- **宏：** 与之前完全一致地编译，确保源代码语法不受任何干扰。
- **运行时翻译：** 别名化的 `i18n._()` 使用 Intlayer 字典。显式命名的 ID 和哈希 ID 都通过 Intlayer 的 `.po` 同步插件完全映射，以安全地聚合和修剪键值。
- **ICU 能力：** 由于 Intlayer 的统一 ICU 解析器，对复数化、选择和 ICU 变体的支持保持稳健，确保输出结果完全一致。
