---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vite-intlayer 包文档
description: 用于 Intlayer 的 Vite 插件，提供字典别名和监听器。
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 为所有导出统一文档
---

# vite-intlayer 包

`vite-intlayer` 包提供了一个 Vite 插件，用于将 Intlayer 集成到基于 Vite 的应用中。

## 安装

```bash
npm install vite-intlayer
```

## 导出

### 插件

导入：

```tsx
import "vite-intlayer";
```

| 功能                 | 描述                                                       | 相关文档                                                                                                               |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | 主要的 Vite 插件，将 Intlayer 集成到构建流程中。           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**已弃用**) `intlayer` 的别名。                           | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | 开发时的中间件插件，用于处理语言检测和路由。               | -                                                                                                                      |
| `intlayerMiddleware` | (**已弃用**) `intlayerProxy` 的别名。                      | -                                                                                                                      |
| `intlayerPrune`      | 用于在构建期间对未使用的字典进行 tree-shake 和修剪的插件。 | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vite-intlayer/intlayerPrune.md) |
