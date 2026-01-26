---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: fastify-intlayer 包文档
description: Intlayer 的 Fastify 插件，提供翻译函数和 locale 检测。
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# fastify-intlayer 包

`fastify-intlayer` 包为 Fastify 应用提供了一个处理国际化的插件。它会检测用户的 locale 并装饰请求对象。

## 安装

```bash
npm install fastify-intlayer
```

## 导出

### 插件

导入：

```tsx
import "fastify-intlayer";
```

| 函数       | 描述                                                                                                                                                                                                                                | 相关文档                                                                                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | 将 Intlayer 集成到你的 Fastify 应用的 Fastify 插件。处理来自存储（cookies、headers）的语言检测，装饰请求对象以包含 `intlayer` 数据（包含 `t`、`getIntlayer` 和 `getDictionary`），并为请求生命周期期间的编程访问设置 CLS 命名空间。 | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/fastify-intlayer/intlayer.md) |

### 函数

导入：

```tsx
import "fastify-intlayer";
```

| 函数            | 描述                                                                                                                                                                     | 相关文档                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | 全局翻译函数，用于在 Fastify 中检索当前 locale 的内容。使用 CLS（Async Local Storage），必须在由 `intlayer` 插件管理的请求上下文中使用。也可通过 `req.intlayer.t` 访问。 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md) |
| `getIntlayer`   | 从生成的声明中按键检索字典并返回指定 locale 的内容。是 `getDictionary` 的优化版本。使用 CLS 访问请求上下文。也可通过 `req.intlayer.getIntlayer` 访问。                   | -                                                                                                      |
| `getDictionary` | 处理字典对象并返回指定 locale 的内容。处理 `t()` 翻译、枚举、Markdown、HTML 等。使用 CLS 访问请求上下文。也可以通过 `req.intlayer.getDictionary` 访问。                  | -                                                                                                      |
