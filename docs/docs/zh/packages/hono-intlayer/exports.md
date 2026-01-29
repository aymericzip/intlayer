---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: hono-intlayer 包文档
description: 用于 Intlayer 的 Hono 中间件，提供翻译函数和语言检测。
keywords:
  - hono-intlayer
  - hono
  - 中间件
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: 统一所有导出的文档
---

# hono-intlayer 包

`hono-intlayer` 包为 Hono 应用程序提供了一个处理国际化的中间件。它检测用户的语言并填充上下文对象。

## 安装

```bash
npm install hono-intlayer
```

## 导出

### 中间件

导入：

```tsx
import { intlayer } from "hono-intlayer";
```

| 函数       | 描述                                                                                                                                                                                                     | 相关文档                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | 将 Intlayer 集成到 Hono 应用程序中的 Hono 中间件。处理来自存储（cookie、标头）的语言检测，使用 `t`、`getIntlayer` 和 `getDictionary` 填充上下文，并设置 CLS 命名空间以便在请求生命周期内进行程序化访问。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/hono-intlayer/intlayer.md) |

### 函数

导入：

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| 函数            | 描述                                                                                                                                       | 相关文档                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | 获取 Hono 中当前语言内容的全局翻译函数。利用 CLS（异步本地存储），必须在由 `intlayer` 中间件管理的请求上下文中使用。也可以通过上下文访问。 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |
| `getIntlayer`   | 通过生成声明中的键检索字典，并返回指定语言的内容。`getDictionary` 的优化版本。使用 CLS 访问请求上下文。也可以通过上下文访问。              | -                                                                                                      |
| `getDictionary` | 处理字典对象并返回指定语言的内容。处理 `t()` 翻译、枚举、markdown、HTML 等。使用 CLS 访问请求上下文。也可以通过上下文访问。                | -                                                                                                      |
