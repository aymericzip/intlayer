---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: "lynx-intlayer 包文档"
description: "lynx-intlayer 包将 Intlayer 集成到 Lynx 应用中，提供移动端语言支持所需的 polyfill 和辅助函数。"
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Unified documentation for all exports"
author: aymericzip
---

# lynx-intlayer 包

`lynx-intlayer` 包提供将 Intlayer 集成到 Lynx 应用所需的工具。

## 安装

```bash
npm install lynx-intlayer
```

## 导出

### Polyfill（兼容填充）

导入：

```tsx
import "lynx-intlayer";
```

| 函数               | 描述                                                  |
| ------------------ | ----------------------------------------------------- |
| `intlayerPolyfill` | 为 Lynx 应用必要的 polyfills 以支持 Intlayer 的函数。 |

### Rsbuild 插件

`lynx-intlayer` 包提供一个 Rsbuild 插件，用于将 Intlayer 集成到 Lynx 的构建流程中。

导入：

```tsx
import "lynx-intlayer";
```

| 函数                 | 描述                                              |
| -------------------- | ------------------------------------------------- |
| `pluginIntlayerLynx` | 将 Intlayer 集成到 Lynx 构建流程的 Rsbuild 插件。 |
