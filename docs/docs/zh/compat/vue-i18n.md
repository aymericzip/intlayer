---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 Vue I18n 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Vue 应用程序从 vue-i18n 迁移到 Intlayer。"
keywords:
  - vue-i18n
  - vue
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 Vue I18n 迁移到 Intlayer

如果您的 Vue 应用程序当前使用 `vue-i18n`，您可以迁移到 Intlayer，而无需重写组件或翻译 hook。Intlayer 提供了一个兼容适配器，完美地镜像 `vue-i18n` 的 API，同时在底层利用 Intlayer 的强大功能。

## 操作步骤

要开始使用，只需在您的项目中运行初始化命令：

```bash
npx intlayer init
```

在初始化期间，Intlayer 将设置您的配置文件（`intlayer.config.ts`）并为迁移做好项目准备。您只需将 Intlayer 插件添加到您的 Vite 配置中，即可自动将 `vue-i18n` 导入别名化。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## 底层原理

`vueI18nVitePlugin` 将模块别名注入到您的 bundler 中。代码库中对 `vue-i18n` 的任何导入都将被透明地重定向到 `@intlayer/vue-i18n`。

**在底层，适配器原生处理复杂的 `vue-i18n` 语法：**

- **插值与复数：** 解析 `{name}` 和列表 `{0}` 插值。管道复数（`"car | cars"`）根据位置语义转换为 Intlayer 枚举/复数节点。
- **格式：** `d()` 和 `n()` 等函数在底层包装 `Intl`，遵循您选项中定义的 `datetimeFormats` 和 `numberFormats`。
- **全局与本地状态：** `global.locale` 映射到由 Intlayer 客户端支持的 `WritableComputedRef`，因此响应性行为与预期完全一致（例如 `locale.value = 'fr'`）。
- **指令：** `v-t` 指令已注册并正常运行。

您的应用程序继续与之前完全相同地渲染，但内容由您的 Intlayer 字典提供支持，为您带来类型安全、更好的 bundle 优化和无缝的 CMS 集成。
