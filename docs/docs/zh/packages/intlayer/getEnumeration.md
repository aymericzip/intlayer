---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: t函数文档 | intlayer
description: 查看如何使用 intlayer 软件包的 getEnumeration 函数
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
---

# 文档: `getEnumeration` 函数在 `intlayer` 中

## 描述

`getEnumeration` 函数根据枚举对象中的预定义条件检索与特定数量相对应的内容。条件被定义为键，其优先级由对象中的顺序决定。

## 参数

- `enumerationContent: QuantityContent<Content>`

  - **描述**: 一个对象，其中键表示条件（例如，`<=`，`<`，`>=`，`=`），值表示相应的内容。键的顺序定义了它们的匹配优先级。
  - **类型**: `QuantityContent<Content>`
    - `Content` 可以是任何类型。

- `quantity: number`

  - **描述**: 用于与 `enumerationContent` 中的条件匹配的数值。
  - **类型**: `number`

## 返回值

- **类型**: `Content`
- **描述**: 与 `enumerationContent` 中第一个匹配条件相对应的内容。如果没有找到匹配项，则根据实现处理（例如，错误或回退内容）。

## 示例用法

### 基本用法

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "您有小于 -2.3",
    "<1": "您有小于一",
    "2": "您有二",
    ">=3": "您有三或更多",
  },
  2
);

console.log(content); // 输出: "您有二"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "您有小于一",
    "2": "您有二",
    ">=3": "您有三或更多",
  },
  2
);

console.log(content); // 输出: "您有二"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "您有小于一",
    "2": "您有二",
    ">=3": "您有三或更多",
  },
  2
);

console.log(content); // 输出: "您有二"
```

### 条件优先级

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "您有小于四",
    "2": "您有二",
  },
  2
);

console.log(content); // 输出: "您有小于四"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "您有小于四",
    "2": "您有二",
  },
  2
);

console.log(content); // 输出: "您有小于四"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "您有小于四",
    "2": "您有二",
  },
  2
);

console.log(content); // 输出: "您有小于四"
```

## 边界情况

- **没有匹配条件:**

  - 如果没有条件与提供的数量匹配，函数将返回 `undefined` 或明确处理默认/回退场景。

- **条件重叠:**

  - 如果条件重叠，则优先匹配第一个条件（基于对象顺序）。

- **无效键:**

  - 函数假定 `enumerationContent` 中的所有键都是有效的并且可解析为条件。无效或格式不正确的键可能导致意外行为。

- **TypeScript 强制:**
  - 函数确保 `Content` 类型在所有键中保持一致，从而在检索内容时提供类型安全性。

## 注意事项

- `findMatchingCondition` 工具用于根据给定数量确定适当的条件。

https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/**/*.md
