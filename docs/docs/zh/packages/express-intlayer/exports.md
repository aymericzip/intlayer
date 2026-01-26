---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer 包文档
description: Intlayer 的 Express 中间件，提供翻译函数和语言环境检测。
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一所有导出项的文档
---

# express-intlayer 包

`express-intlayer` 包为 Express 应用提供了一个用于处理国际化的中间件。它会检测用户的语言环境并提供翻译函数。

## 安装

```bash
npm install express-intlayer
```

## 导出

### 中间件

导入：

```tsx
import "express-intlayer";
```

| Function   | 描述                                                                                                                                                                                                                    | 相关文档                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Express 中间件，用于检测用户的 locale 并将 Intlayer 数据填充到 `res.locals`。从 cookies/headers 中执行 locale 检测，将 `t`、`getIntlayer` 和 `getDictionary` 注入 `res.locals`，并为请求生命周期访问设置 CLS 命名空间。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/express-intlayer/intlayer.md) |

### 函数

Import:

```tsx
import "express-intlayer";
```

| 函数            | 描述                                                                                                                                | 相关文档                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | 翻译函数，检索当前 locale 的内容。在由 `intlayer` 中间件管理的请求生命周期内工作。使用 CLS（Async Local Storage）访问请求上下文。   | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |
| `getIntlayer`   | 从生成的 declaration 中按 key 检索 dictionary 并返回其在指定 locale 下的内容。`getDictionary` 的优化版本。使用 CLS 访问请求上下文。 | -                                                                                                      |
| `getDictionary` | 处理 dictionary 对象并返回指定 locale 的内容。处理 `t()` 翻译、枚举、Markdown、HTML 等。使用 CLS 访问请求上下文。                   | -                                                                                                      |
