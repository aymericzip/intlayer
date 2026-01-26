---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-native-intlayer 包文档
description: 为 Intlayer 提供的 React Native 支持，包含 Provider 和 polyfill。
keywords:
  - react-native-intlayer
  - react-native
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# react-native-intlayer 包

`react-native-intlayer` 包提供将 Intlayer 集成到 React Native 应用中所需的工具。它包含一个 Provider 组件以及用于本地化支持的 polyfill。

## 安装

```bash
npm install react-native-intlayer
```

## 导出

### Provider 组件

| 组件               | 说明                                             |
| ------------------ | ------------------------------------------------ |
| `IntlayerProvider` | 包裹应用并提供 Intlayer 上下文的 Provider 组件。 |

导入：

```tsx
import "react-native-intlayer";
```

### Polyfill

| 函数               | 说明                                                       |
| ------------------ | ---------------------------------------------------------- |
| `intlayerPolyfill` | 为 React Native 应用启用 Intlayer 所需的 polyfill 的函数。 |

导入：

```tsx
import "react-native-intlayer";
```

### Metro 配置

`react-native-intlayer` 包提供 Metro 配置工具，以确保 Intlayer 在 React Native 中正常工作。

| 函数                      | 描述                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| `configMetroIntlayer`     | 异步函数，准备 Intlayer 并合并 Metro 配置。                          |
| `configMetroIntlayerSync` | 同步函数，合并 Metro 配置但不准备 Intlayer 资源。                    |
| `exclusionList`           | 为 Metro 的 blockList 创建一个 RegExp 模式，以在打包时排除内容文件。 |

导入：

```tsx
import "react-native-intlayer/metro";
```
