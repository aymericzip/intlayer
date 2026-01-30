---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: adonis-intlayer 包文档
description: 用于 Intlayer 的 AdonisJS 中间件，提供翻译函数和语言区域检测。
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 初始文档
---

# adonis-intlayer 包

`adonis-intlayer` 包为 AdonisJS 应用程序提供了一个处理国际化的中间件。它检测用户的语言区域并提供翻译函数。

## 安装

```bash
npm install adonis-intlayer
```

## 导出

### 中间件

该包提供了一个 AdonisJS 中间件来处理国际化。

| 函数                 | 描述                                                                                                                                                                                         | 相关文档                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | AdonisJS 中间件，检测用户的语言区域并使用 Intlayer 数据填充请求上下文。它还设置了一个 CLS (Async Local Storage) 命名空间用于请求生命周期访问，从而启用 `t`、`getIntlayer` 等全局函数的使用。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/adonis-intlayer/intlayer.md) |

### 函数

| 函数            | 描述                                                                                                                            | 相关文档                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | 获取当前语言区域内容的翻译函数。在由 `intlayer` 中间件管理的请求生命周期内工作。使用 CLS (Async Local Storage) 访问请求上下文。 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |
| `getIntlayer`   | 通过生成声明中的键检索字典，并返回指定语言区域的内容。`getDictionary` 的优化版本。使用 CLS 访问请求上下文。                     | -                                                                                                      |
| `getDictionary` | 处理字典对象并返回指定语言区域的内容。处理 `t()` 翻译、枚举、markdown、HTML 等。使用 CLS 访问请求上下文。                       | -                                                                                                      |
| `getLocale`     | 使用 CLS 从请求上下文中检索当前语言区域。                                                                                       | -                                                                                                      |
