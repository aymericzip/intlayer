---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: getLocale 函数文档 | intlayer
description: 了解如何在 intlayer 包中使用 getLocale 函数
keywords:
  - getLocale
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# getLocale 函数文档

`getLocale` 函数允许你从给定的字符串（例如 URL 或路径）中检测 locale。

## 用法

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// 输出: 'fr'
```

## 参数

| --------- | -------- | ---------------------------------------------- |
| `path` | `string` | 要从中提取 locale 的路径或字符串。 |
| --------- | -------- | ---------------------------------------------- |
| `path` | `string` | 用于从中提取区域设置的路径或字符串。 |

## 返回值

检测到的区域设置；如果未检测到任何区域设置，则返回默认区域设置。
