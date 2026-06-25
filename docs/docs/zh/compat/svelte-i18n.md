---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 Svelte I18n 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Svelte 应用程序从 svelte-i18n 迁移到 Intlayer。"
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 Svelte I18n 迁移到 Intlayer

使用兼容适配器，将您的 Svelte 应用程序从 `svelte-i18n` 迁移到 Intlayer 只需片刻。

## 操作步骤

只需在您的项目中运行初始化命令：

```bash
npx intlayer init
```

这将生成 `intlayer.config.ts`。确保您的 SvelteKit / Vite 插件与 Intlayer 的别名插件封装在一起，以无缝地将 `svelte-i18n` 映射到 `@intlayer/svelte-i18n`。

## 底层原理

Svelte-i18n 依赖于大量使用的 store（`$_`、`$t`、`$format` 等）和 ICU MessageFormat。

底层实现：

- **Store：** Intlayer 代理 `svelte-i18n` store。`$_` 成为当前语言环境的派生 store，返回 Intlayer 解析器。
- **键值：** 您的扁平键（例如 `$_('home.title')`）被求值，使得第一个路径段代表 Intlayer 字典。
- **ICU 语法：** 由共享 ICU 解析器（等效于 `intl-messageformat` 解析）完全处理。
- **格式化器：** `$date`、`$time`、`$number` 调用安全地重定向到 Intlayer 的原生核心格式化器。
- **Babel/SWC 分析：** Intlayer 分析器在编译之前读取您的 `.svelte` 源文件中的 Svelte store 调用者（`$_`），以自动构建相关字典 chunk。
