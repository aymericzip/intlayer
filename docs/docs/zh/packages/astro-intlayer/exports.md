---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: astro-intlayer 软件包文档
description: Intlayer 的 Astro 集成，提供基于语言环境的路由、中间件、钩子 (hooks)、客户端存储以及字典管理配置。
keywords:
  - astro-intlayer
  - astro
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "添加 useIntlayer、useDictionary、useLocale 钩子、中间件和格式化工具文档"
  - version: 8.0.0
    date: 2026-01-21
    changes: "所有导出内容的统一文档"
author: aymericzip
---

# astro-intlayer 软件包

`astro-intlayer` 软件包提供了将 Intlayer 集成到 Astro 应用程序中所需的工具。它配置基于语言环境的路由、字典管理、构建时页面重写、请求中间件以及用于在服务器端渲染的 `.astro` 组件和客户端脚本中访问多语言内容的钩子。

## 安装

```bash
npm install astro-intlayer
```

## 导出项

### 集成

`astro-intlayer` 软件包提供了一个 Astro 集成，用于在项目中配置 Intlayer。

导入：

```tsx
import { intlayer } from "astro-intlayer";
```

或在 `astro.config.mjs` 中使用默认导入：

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| 函数       | 描述                                                                                                                      | 相关文档                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Astro 集成，负责准备字典、配置 Vite 插件（别名、路由代理、剪裁）、自动注册请求中间件并在重写的本地化 URL 输出预渲染页面。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/intlayer.md) |

### 钩子（服务端与客户端）

导入：

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| 钩子            | 描述                                                                                                                                      | 相关文档                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | 根据键选择一个字典并返回其本地化内容。在 `.astro` frontmatter 中从 `Astro.locals` 读取请求语言环境，在 `<script>` 中从客户端 store 读取。 | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | 转换字典对象并返回解析后的语言环境对应的内容。在 frontmatter 和客户端脚本中均可使用。                                                     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | 返回当前语言环境、默认语言环境、可用语言环境列表以及更新语言环境的函数。                                                                  | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useLocale.md)         |

### 中间件 (astro-intlayer/middleware)

导入：

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| 导出项      | 类型                | 描述                                                                                                             | 相关文档                                                                                                        |
| ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | 检测请求语言环境并附加 `Astro.locals.intlayer` 的 Astro 中间件。由 `intlayer()` 自动注册，或者手动导入进行组合。 | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/onRequest.md) |

### 实用工具

导入：

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| 函数                | 描述                                                                               | 相关文档 |
| ------------------- | ---------------------------------------------------------------------------------- | -------- |
| `getIntlayerLocals` | 辅助函数，用于在 `Astro.locals` 之外从请求存储范围检索当前 `IntlayerLocals` 对象。 | -        |

### 客户端实用工具 (astro-intlayer/client)

导入：

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

在浏览器或客户端 `<script>` 标签内导入时，`astro-intlayer` 会自动映射到 `astro-intlayer/client`（由 `vanilla-intlayer` 提供支持），提供客户端字典获取器、store 订阅者和语言环境持久化工具。

### 格式化工具 (astro-intlayer/format)

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
} from "astro-intlayer/format";
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

### HTML 实用工具 (astro-intlayer/html)

导入：

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| 导出项            | 类型       | 描述                                 |
| ----------------- | ---------- | ------------------------------------ |
| `renderHTML`      | `Function` | 用于渲染 HTML 节点的独立实用函数。   |
| `useHTML`         | `Hook`     | 获取 HTML 提供者上下文和配置的钩子。 |
| `useHTMLRenderer` | `Hook`     | 获取预配置的 HTML 渲染器函数的钩子。 |

### Markdown 实用工具 (astro-intlayer/markdown)

导入：

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
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
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| 类型              | 描述                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | 附加到 `Astro.locals.intlayer` 的对象，包含 `locale`、`defaultLocale` 和 `availableLocales`。 |
| `UseLocaleProps`  | `useLocale()` 接受的可选配置属性。                                                            |
| `UseLocaleResult` | `useLocale()` 的返回类型，提供语言环境属性和更新方法。                                        |
