---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 NuxtJS I18n 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Nuxt.js 应用程序从 @nuxtjs/i18n 迁移到 Intlayer。"
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 NuxtJS I18n 迁移到 Intlayer

使用 Nuxt 适配器模块，将您的 Nuxt 应用程序从 `@nuxtjs/i18n` 迁移到 Intlayer 是一个无缝的过程。

## 操作步骤

要初始化项目，运行：

```bash
npx intlayer init
```

这将设置 `intlayer.config.ts`。然后，在您的 `nuxt.config.ts` 的模块数组中添加 Intlayer Nuxt 模块（例如 `@intlayer/nuxt-i18n`）。这将自动为您的应用程序应用兼容配置。

## 底层原理

`@nuxtjs/i18n` 包装了 `vue-i18n`，同时提供 Nuxt 特定的路由组合式函数（`useLocalePath`、`useSwitchLocalePath`、`<NuxtLinkLocale>`）。

底层实现：

- **翻译：** 原生依赖 `@intlayer/vue-i18n` 兼容层来处理所有字符串翻译任务（完全支持 `vue-i18n` 格式、管道复数和响应性）。
- **路由：** 使用 Intlayer 的本地化 URL 辅助函数镜像路由组合式函数。
- **配置：** 直接从您的 `intlayer.config.ts` 读取 `availableLocales` 和默认设置，以自动协调 Nuxt 页面。
