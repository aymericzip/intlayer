---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getEnumeration 函数文档 | intlayer
description: 查看如何使用 intlayer 包中的 getEnumeration 函数
keywords:
  - getEnumeration
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
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 文档：`intlayer` 中的 `getEnumeration` 函数

## 描述

`getEnumeration` 函数根据枚举对象中预定义的条件，检索与特定数量对应的内容。条件以键的形式定义，其优先级由对象中键的顺序决定。

## 参数

- `enumerationContent: QuantityContent<Content>`

  - **描述**：一个对象，键表示条件（例如 `<=`、`<`、`>=`、`=`），值表示对应的内容。键的顺序定义了匹配的优先级。
  - **类型**：`QuantityContent<Content>`
    - `Content` 可以是任意类型。

- `quantity: number`

  - **描述**：用于与 `enumerationContent` 中条件匹配的数值。
  - **类型**：`number`

## 返回值

- **类型**：`Content`
- **描述**：对应于 `enumerationContent` 中第一个匹配条件的内容。如果没有找到匹配项，则根据实现进行默认处理（例如错误处理或回退内容）。

## 示例用法

### 基本用法

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "你拥有的数量少于 -2.3",
    "<1": "你拥有的数量少于 1",
    "2": "你拥有两个",
    ">=3": "你拥有三个或更多",
  },
  2
);

console.log(content); // 输出: "你拥有两个"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "你拥有的数量少于 1",
    "2": "你拥有两个",
    ">=3": "你拥有三个或更多",
  },
  2
);

console.log(content); // 输出: "你拥有两个"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "你拥有的数量少于 1",
    "2": "你拥有两个",
    ">=3": "你拥有三个或更多",
  },
  2
);

console.log(content); // 输出: "你拥有两个"
```

### 条件优先级

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "你拥有的数量少于 4",
    "2": "你拥有两个",
  },
  2
);

console.log(content); // 输出: "你拥有的数量少于 4"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "你拥有的数量少于 4",
    "2": "你拥有两个",
  },
  2
);

console.log(content); // 输出: "你有少于四个"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "你有少于四个",
    "2": "你有两个",
  },
  2
);

console.log(content); // 输出: "你有少于四个"
```

## 边界情况

- **无匹配条件：**

  - 如果没有条件匹配所提供的数量，函数将返回 `undefined` 或者显式处理默认/回退场景。

- **条件重叠：**

  - 如果条件重叠，优先使用第一个匹配的条件（基于对象的顺序）。

- **无效键：**

  - 该函数假设 `enumerationContent` 中的所有键都是有效且可解析为条件的。无效或格式不正确的键可能导致意外行为。

- **TypeScript 强制：**
  - 该函数确保所有键的 `Content` 类型一致，从而保证检索内容时的类型安全。

## 备注

- 使用 `findMatchingCondition` 工具根据给定的数量确定适当的条件。
