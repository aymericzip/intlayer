---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: nuxt-intlayer 包文档
description: Intlayer 的 Nuxt 集成，为 Nuxt 应用提供一个模块。
keywords:
  - nuxt-intlayer
  - nuxt
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 为所有导出统一文档
---

# nuxt-intlayer 包

`nuxt-intlayer` 包提供一个 Nuxt 模块，用于将 Intlayer 集成到你的 Nuxt 项目中。

## 安装

```bash
npm install nuxt-intlayer
```

## 导出

### 模块

`nuxt-intlayer` 包提供一个 Nuxt 模块，用于将 Intlayer 集成到你的 Nuxt 项目中。

导入：

```tsx
import "nuxt-intlayer";
```

或将其添加到 `nuxt.config.ts`：

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Export    | Type         | Description                                |
| --------- | ------------ | ------------------------------------------ |
| `default` | `NuxtModule` | 默认导出是用于配置 Intlayer 的 Nuxt 模块。 |
