---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-intlayer 包文档
description: 面向 React 的 Intlayer 实现，为 React 应用提供 hooks 和 providers。
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: 统一了所有导出项的文档
---

# react-intlayer 包

`react-intlayer` 包为在 React 应用中集成 Intlayer 提供必要的工具。它包含用于处理多语言内容的 context providers、hooks 和组件。

## 安装

```bash
npm install react-intlayer
```

## 导出

### Providers（提供者）

导入：

```tsx
import "react-intlayer";
```

| 组件                      | 描述                                                                               | 相关文档                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | 用于包裹应用并提供 Intlayer 上下文的主 provider。默认包含编辑器支持。              | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | 专注于内容的 provider 组件，不包含编辑器功能。当你不需要可视化编辑器时使用此组件。 | -                                                                                                                             |
| `HTMLProvider`            | 用于与 HTML 相关的国际化设置的 Provider。允许覆盖 HTML 标签对应的组件。            | -                                                                                                                             |

### 钩子

导入：

```tsx
import "react-intlayer";
```

| 钩子                   | 描述                                                                                                           | 相关文档                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useHTMLRenderer`      | 用于获取预配置的 HTML 渲染器函数的 Hook。                                                                      | -                                                                                                                       |
| `useMarkdownRenderer`  | 用于获取预配置的 Markdown 渲染器函数的 Hook。                                                                  | -                                                                                                                       |
| `useIntlayer`          | 客户端 Hook，按键选择一个字典并返回其内容。如果未提供 locale，则使用来自上下文的 locale。                      | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | 将字典对象转换并返回当前语言内容的 Hook。处理 `t()` 翻译、枚举等。                                             | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | 处理异步字典的 Hook。接受基于 Promise 的字典映射并为当前语言解析它。                                           | -                                                                                                                       |
| `useDictionaryDynamic` | 处理按键加载的动态词典的 Hook。内部使用 React Suspense 处理加载状态。                                          | -                                                                                                                       |
| `useLocale`            | 客户端 Hook，用于获取当前 locale、默认 locale、可用 locales，以及用于更新 locale 的函数。                      | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | 用于从 context 获取当前 locale 以及所有相关字段 (locale、defaultLocale、availableLocales、setLocale) 的 Hook。 | -                                                                                                                       |
| `useRewriteURL`        | 客户端 Hook，用于管理 URL 重写。如果针对当前 pathname 和 locale 存在重写规则，则会更新 URL。                   | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | 提供翻译函数 `t()` 的 Hook，用于通过键访问嵌套内容。模仿 i18next/next-intl 的模式。                            | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | 提供与语言环境绑定的 `Intl` 对象的 Hook。自动注入当前语言并使用优化的缓存。                                    | -                                                                                                                       |
| `useLocaleStorage`     | 提供在本地存储或 cookies 中持久化 locale 的 Hook。返回 getter 和 setter 函数。                                 | -                                                                                                                       |
| `useLocaleCookie`      | 已弃用。请改用 `useLocaleStorage`。用于在 cookies 中管理 locale 持久化的 Hook。                                | -                                                                                                                       |
| `useLoadDynamic`       | 用于使用 React Suspense 加载动态字典的 Hook。接受一个 key 和一个 promise，并缓存结果。                         | -                                                                                                                       |
| `useIntlayerContext`   | 提供当前 Intlayer 客户端上下文值（locale、setLocale 等）的 Hook。                                              | -                                                                                                                       |
| `useHTMLContext`       | Hook 用于从 HTMLProvider 上下文访问 HTML 组件的 overrides（覆盖）。                                            | -                                                                                                                       |

### 函数

导入：

```tsx
import "react-intlayer";
```

| 函数                 | 描述                                                                                          | 相关文档                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `renderHTML`         | 用于在组件外部渲染 HTML 的独立实用工具。                                                      | -                                                                                               |
| `renderMarkdown`     | 用于在组件外部渲染 Markdown 的独立实用工具。                                                  | -                                                                                               |
| `t`                  | 客户端翻译函数，返回所提供多语言内容的翻译。若未提供 locale，则使用上下文中的 locale。        | [翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |
| `getDictionary`      | 处理字典对象并返回指定 locale 的内容。处理 `t()` 翻译、枚举、Markdown、HTML 等。              | -                                                                                               |
| `getIntlayer`        | 从生成的声明中通过其键检索字典并返回其在指定 locale 下的内容。是 `getDictionary` 的优化版本。 | -                                                                                               |
| `setLocaleInStorage` | 在存储中设置 locale（根据配置使用 local storage 或 cookie）。                                 | -                                                                                               |
| `setLocaleCookie`    | 已弃用。请改用 `setLocaleInStorage`。在 cookie 中设置 locale。                                | -                                                                                               |
| `localeInStorage`    | 从存储中获取区域设置（local storage 或 cookie）。                                             | -                                                                                               |
| `localeCookie`       | 已弃用。请改用 `localeInStorage`。从 cookie 中获取区域设置。                                  | -                                                                                               |

### 组件

导入：

```tsx
import "react-intlayer";
```

或

```tsx
import "react-intlayer/markdown";
```

| 组件               | 描述                                                                                 | 相关文档                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `HTMLRenderer`     | 使用自定义组件渲染 HTML 内容。                                                       | -                                                                                                                             |
| `MarkdownProvider` | 提供用于 markdown 渲染上下文的 Provider。允许为 markdown 元素自定义组件覆盖。        | -                                                                                                                             |
| `MarkdownRenderer` | 使用自定义组件渲染 markdown 内容。支持所有标准 markdown 功能以及 Intlayer 特定语法。 | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/MarkdownRenderer.md) |

### 类型

导入:

```tsx
import "react-intlayer";
```

| 类型           | 描述                                                       |
| -------------- | ---------------------------------------------------------- |
| `IntlayerNode` | 表示 Intlayer 内容树中节点的类型。用于类型安全的内容操作。 |

### 服务器端（react-intlayer/server）

导入：

```tsx
import "react-intlayer/server";
```

| 导出                     | 类型        | 描述                                          |
| ------------------------ | ----------- | --------------------------------------------- |
| `IntlayerServerProvider` | `Component` | 用于服务端渲染的 Provider。                   |
| `IntlayerServer`         | `Component` | Intlayer 内容的服务器端包装器。               |
| `t`                      | `Function`  | 翻译函数的服务器端版本。                      |
| `useLocale`              | `Hook`      | 用于在服务器端访问区域设置（locale）的 Hook。 |
| `useIntlayer`            | `Hook`      | 服务器端版本的 `useIntlayer`。                |
| `useDictionary`          | `Hook`      | 服务器端版本的 `useDictionary`。              |
| `useI18n`                | `Hook`      | 服务器端版本的 `useI18n`。                    |
| `locale`                 | `Function`  | 用于在服务器端获取或设置 locale 的函数。      |
