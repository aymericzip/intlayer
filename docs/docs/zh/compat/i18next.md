---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 i18next 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Vanilla JS/TS 应用程序从 i18next 迁移到 Intlayer。"
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 i18next 迁移到 Intlayer

有关详细的分步教程，请参阅我们完整的 [i18next 迁移指南](../migration_from_i18next_to_intlayer.md)。

Intlayer 完美复制了 `i18next` 的核心运行时特性。通过使用兼容 package，您的 Vanilla 应用程序或内部模块可以继续利用熟悉的语法。

## 操作步骤

首先，在您的项目中初始化 Intlayer：

```bash
npx intlayer init
```

如果您使用 Vite，请添加 Intlayer 插件以将导入路由到 `@intlayer/i18next`：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## 底层原理

`i18nextVitePlugin` 将 `i18next` 导入别名指向 `@intlayer/i18next`，避免因 JSON 文件包含而导致 bundle 体积膨胀。

底层实现：

- **实例配置：** `createInstance` 正确解析和应用命名空间回退，同时利用 Intlayer 的编译管道进行字典检索。
- **插值：** 原生支持 `{{name}}` 替换和 `$t(key)` 递归嵌套。
- **上下文与复数：** 识别并解析后缀格式，如 `key_male` 和 `key_one`/`key_other`，依据标准 `Intl.PluralRules` 进行求值。
- **返回对象：** `returnObjects: true` 模式可安全地从 Intlayer 字典中提取树形结构。
