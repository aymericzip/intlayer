---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: remix-intlayer 包文档
description: remix-intlayer 包的导出项文档，为 Remix 3 应用程序提供国际化 (i18n) 支持。
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer 导出的初始文档"
author: aymericzip
---

# remix-intlayer 包

`remix-intlayer` 包提供了将 Intlayer 集成到 Remix 3 应用程序中所需的工具。它包含用于请求语言环境检测的中间件、请求上下文访问以及用于检索字典和管理语言环境的钩子 (hooks)。

## 安装

```bash
npm install remix-intlayer
```

## 包导出项

### 中间件

| 导出项     | 类型       | 描述                                                                      | 相关文档                                                                                                                       |
| ---------- | ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `intlayer` | 中间件函数 | 用于 Remix 3 的中间件，用于检测请求语言环境、处理重定向并填充请求上下文。 | [intlayer 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/intlayerMiddleware.md) |

### 上下文存储

| 导出项                      | 类型                         | 描述                                                                                                              | 相关文档                                                                                                             |
| --------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | RequestContext 键 / 存储标识 | 用于从 Remix 3 请求上下文 (`context.get(Intlayer)`) 中检索 Intlayer 状态的请求上下文键。                          | [Intlayer 上下文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                     | 直接安装在请求上下文中的属性名称（`'intlayer'`），允许通过 `context.intlayer` 以及 `context.get(Intlayer)` 访问。 | -                                                                                                                    |

### 钩子 (Hooks)

| 导出项          | 类型 | 描述                                                                           | 相关文档                                                                                                                     |
| --------------- | ---- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | 钩子 | 根据当前请求语言环境，按键获取并处理字典内容。                                 | [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | 钩子 | 从导入的字典对象中获取与当前请求语言环境匹配的内容。                           | [useDictionary 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | 钩子 | 提供对当前请求语言环境、默认语言环境以及项目中所有可用语言环境列表的访问权限。 | [useLocale 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)         |

### 实用工具

导入：

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| 函数                  | 描述                                                                                                                              | 相关文档 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `createLocaleRouting` | 根据请求、配置和选项计算区域设置路由决策（`redirect`、`rewrite` 或 `pass`）的纯函数。                                             | -        |
| `getIntlayerState`    | 在 React 组件外部从 `AsyncLocalStorage` 请求作用域中读取当前的 `IntlayerState`（`locale`、`defaultLocale`、`availableLocales`）。 | -        |

### 格式化工具 (remix-intlayer/format)

导入：

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| 钩子              | 描述                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| `useIntl`         | 返回绑定到请求或客户端语言环境的 Intl 实例，具备缓存和订阅功能。           |
| `useDate`         | 返回预绑定到当前语言环境的日期格式化函数 (`Intl.DateTimeFormat`)。         |
| `useNumber`       | 返回预绑定到当前语言环境的数字格式化函数 (`Intl.NumberFormat`)。           |
| `useCurrency`     | 返回预绑定到当前语言环境的货币格式化函数。                                 |
| `usePercentage`   | 返回预绑定到当前语言环境的百分比格式化函数。                               |
| `useRelativeTime` | 返回预绑定到当前语言环境的相对时间格式化函数 (`Intl.RelativeTimeFormat`)。 |
| `useList`         | 返回预绑定到当前语言环境的列表格式化函数 (`Intl.ListFormat`)。             |
| `useUnit`         | 返回预绑定到当前语言环境的单位格式化函数。                                 |
| `useCompact`      | 返回预绑定到当前语言环境的紧凑数字格式化函数（例如 `1.5K`）。              |

### HTML 实用工具 (remix-intlayer/html)

导入：

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| 导出项            | 类型       | 描述                                 |
| ----------------- | ---------- | ------------------------------------ |
| `renderHTML`      | `Function` | 用于渲染 HTML 节点的独立实用函数。   |
| `useHTML`         | `Hook`     | 获取 HTML 提供者上下文和配置的钩子。 |
| `useHTMLRenderer` | `Hook`     | 获取预配置的 HTML 渲染器函数的钩子。 |

### Markdown 实用工具 (remix-intlayer/markdown)

导入：

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| 导出项                | 类型       | 描述                                     |
| --------------------- | ---------- | ---------------------------------------- |
| `compileMarkdown`     | `Function` | 将 Markdown 字符串编译为结构化表示。     |
| `renderMarkdown`      | `Function` | 将 Markdown 内容渲染为输出节点。         |
| `parseMarkdown`       | `Function` | 将原始 Markdown 内容解析为 AST。         |
| `useMarkdown`         | `Hook`     | 获取 Markdown 提供者上下文的钩子。       |
| `useMarkdownRenderer` | `Hook`     | 获取预配置的 Markdown 渲染器函数的钩子。 |

### 类型

导入：

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| 类型                        | 描述                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `IntlayerState`             | 存储在 Remix 请求上下文中的状态对象，包含 `locale`、`defaultLocale` 和 `availableLocales`。 |
| `IntlayerMiddlewareOptions` | 传递给 `intlayer()` 中间件的配置选项。                                                      |
| `LocaleRoutingOptions`      | 自定义语言环境前缀、检测和重定向的选项。                                                    |
| `LocaleRoutingAction`       | 表示路由决策的可辨识联合：`redirect`、`rewrite` 或 `pass`。                                 |
| `LocaleRoutingRequest`      | `createLocaleRouting` 所需的最小请求表示。                                                  |
| `UseLocaleResult`           | `useLocale()` 的返回类型，包含 `locale`、`defaultLocale` 和 `availableLocales`。            |
