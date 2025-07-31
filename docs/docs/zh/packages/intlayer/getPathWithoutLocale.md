---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getPathWithoutLocale 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getPathWithoutLocale 函数
keywords:
  - getPathWithoutLocale
  - 翻译
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
---

# 文档：`intlayer` 中的 `getPathWithoutLocale` 函数

## 描述

如果存在，则从给定的 URL 或路径名中移除语言区域段。它适用于绝对 URL 和相对路径名。

## 参数

- `inputUrl: string`

  - **描述**：要处理的完整 URL 字符串或路径名。
  - **类型**：`string`

- `locales: Locales[]`
  - **描述**：可选的支持语言区域数组。默认为项目中配置的语言区域。
  - **类型**：`Locales[]`

## 返回值

- **类型**：`string`
- **描述**：不包含语言区域段的 URL 字符串或路径名。

## 示例用法

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 输出: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 输出: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 输出: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 输出: "https://example.com/dashboard"
```

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
