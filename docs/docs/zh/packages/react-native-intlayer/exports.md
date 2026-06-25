---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: react-native-intlayer 包文档
description: 为 Intlayer 提供的 React Native 支持，包含 provider、hook、polyfill 和 Metro 配置。
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "重新导出完整的 react-intlayer API（hook、工具、format/html/markdown 子路径），使 React Native 应用只需依赖 react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "统一所有导出的文档"
author: aymericzip
---

# react-native-intlayer 包

`react-native-intlayer` 包提供将 Intlayer 集成到 React Native 应用中所需的工具。它重新导出完整的 `react-intlayer` API（hook 和工具），并提供适用于 React Native 的 `IntlayerProvider`，以及 React Native 所需的 polyfill 和 Metro 配置。

> 在 React Native 应用中，请从 `react-native-intlayer` 导入**所有内容**。您无需直接安装或导入 `react-intlayer`。

## 安装

```bash
npm install react-native-intlayer
```

## 导出

### Provider 组件

| 组件               | 说明                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| `IntlayerProvider` | 包裹应用并提供 Intlayer 上下文的 Provider 组件。自动应用所需的 polyfill。 |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hook 和工具

这些内容从 `react-intlayer` 重新导出，因此您可以直接从 `react-native-intlayer` 导入：

| 导出                                                                                                              | 说明                     |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `useIntlayer`                                                                                                     | 访问字典键的本地化内容。 |
| `useLocale`                                                                                                       | 读取和更改当前语言环境。 |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | 以多种方式加载字典内容。 |
| `useI18n`                                                                                                         | 兼容 i18next 的 hook。   |
| `t`                                                                                                               | 内联翻译助手。           |
| `getIntlayer`, `getDictionary`                                                                                    | 命令式内容获取器。       |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | 语言环境持久化助手。     |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| 函数               | 说明                                                       |
| ------------------ | ---------------------------------------------------------- |
| `intlayerPolyfill` | 为 React Native 应用启用 Intlayer 所需的 polyfill 的函数。 |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> 当您导入 `IntlayerProvider` 时，polyfill 会自动应用。仅当您需要在 provider 挂载之前使用 polyfill 时，才需要手动调用 `intlayerPolyfill`。

### 格式化工具

数字、日期及其他基于 Intl 的格式化 hook 可从 `/format` 子路径获取：

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Markdown 和 HTML 渲染

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Metro 配置

`react-native-intlayer` 包提供 Metro 配置工具，以确保 Intlayer 在 React Native 中正常工作。

| 函数                      | 描述                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| `configMetroIntlayer`     | 异步函数，准备 Intlayer 并合并 Metro 配置。                          |
| `configMetroIntlayerSync` | 同步函数，合并 Metro 配置但不准备 Intlayer 资源。                    |
| `exclusionList`           | 为 Metro 的 blockList 创建一个 RegExp 模式，以在打包时排除内容文件。 |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
