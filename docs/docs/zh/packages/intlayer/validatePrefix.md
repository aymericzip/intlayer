---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: validatePrefix 函数文档 | intlayer
description: "使用 validatePrefix 根据 Intlayer 配置检查某个 URL 段是否为有效的语言前缀。"
keywords:
  - validatePrefix
  - 翻译
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# validatePrefix 函数文档

`validatePrefix` 函数根据配置检查给定的前缀是否为有效的 locale 前缀。

## 使用方法

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// 输出: true
```

## 参数

| 参数     | 类型     | 描述           |
| -------- | -------- | -------------- |
| `prefix` | `string` | 要验证的前缀。 |

## 返回值

当前缀有效时返回 `true`，否则返回 `false`。
