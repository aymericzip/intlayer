---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: astro-intlayer 包文档
description: 用于 Intlayer 的 Astro 集成，提供基于区域设置（locale）的路由和字典管理的配置。
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一所有导出项的文档
---

# astro-intlayer 包

`astro-intlayer` 包提供将 Intlayer 集成到 Astro 应用所需的工具。它配置基于区域设置（locale）的路由和字典管理。

## 安装

```bash
npm install astro-intlayer
```

## 导出

### 集成

astro-intlayer 包为你的项目提供一个用于在 Astro 中设置 Intlayer 的集成。

导入：

```tsx
import "astro-intlayer";
```

或将其添加到 `astro.config.mjs`：

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| 函数       | 说明                                      |
| ---------- | ----------------------------------------- |
| `intlayer` | 在你的项目中设置 Intlayer 的 Astro 集成。 |
