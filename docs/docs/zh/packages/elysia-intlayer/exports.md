---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer 包文档
description: Intlayer 的 Elysia 插件，提供翻译函数和 locale 检测。
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "统一所有导出的文档"
author: aymericzip
---

# elysia-intlayer 包

`elysia-intlayer` 包为 Elysia 应用提供了一个处理国际化的插件。它会检测用户的 locale，并向路由上下文注入一个 `intlayer` 对象。

## 安装

```bash
npm install elysia-intlayer
```

## 导出

### 插件

导入：

```tsx
import { intlayer } from "elysia-intlayer";
```

| 函数       | 描述                                                                                                                                                                                                                                                                | 相关文档                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | 将 Intlayer 集成到你的 Elysia 应用中的 Elysia 插件。负责先从 storage（cookies、headers）、再从 `Accept-Language` 进行 locale 检测，向路由上下文注入暴露 `locale`、`t`、`getIntlayer` 和 `getDictionary` 的 `intlayer` 对象，并建立 `AsyncLocalStorage` 请求上下文。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/elysia-intlayer/intlayer.md) |

### 函数

导入：

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| 函数            | 描述                                                                                                                                                                         | 相关文档                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | 在 Elysia 中获取当前 locale 内容的全局翻译函数。使用 `AsyncLocalStorage` 访问由 `intlayer` 插件建立的请求上下文，在其之外则回退到默认 locale。也可以通过 `intlayer.t` 访问。 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |
| `getIntlayer`   | 从生成的声明中按 key 获取字典，并返回其在当前 locale 下的内容。`getDictionary` 的优化版本。使用 `AsyncLocalStorage` 访问请求上下文。也可以通过 `intlayer.getIntlayer` 访问。 | -                                                                                                      |
| `getDictionary` | 处理字典对象并返回当前 locale 的内容。处理 `t()` 翻译、枚举、markdown、HTML 等。使用 `AsyncLocalStorage` 访问请求上下文。也可以通过 `intlayer.getDictionary` 访问。          | -                                                                                                      |

### 类型

导入：

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| 类型                | 描述                                                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | 注入到每个路由上下文中的 `intlayer` 对象的结构：`locale`、`locale_storage`、`locale_detected`、`defaultLocale`、`t`、`getIntlayer`、`getDictionary`。 |
| `TranslateFunction` | 翻译函数的签名，将 locale map 转换为与当前请求 locale 匹配的内容。                                                                                    |
