# Documentation: `getEnumeration` 函数在 `intlayer`

## 描述:

`getEnumeration` 函数根据在枚举对象中预定义条件检索与特定数量相对应的内容。条件被定义为键，它们的优先级由在对象中的顺序决定。

## 参数:

- `enumerationContent: QuantityContent<Content>`

  - **描述**: 一个对象，其中键表示条件（例如：`<=`、`<`、`>=`、`=`），值表示相应的内容。键的顺序定义了它们的匹配优先级。
  - **类型**: `QuantityContent<Content>`
    - `Content` 可以是任何类型。

- `quantity: number`

  - **描述**: 用于与 `enumerationContent` 中的条件进行匹配的数值。
  - **类型**: `number`

## 返回:

- **类型**: `Content`
- **描述**: 与 `enumerationContent` 中第一个匹配条件相对应的内容。如果没有找到匹配，则默认根据实现进行处理（例如，错误或后备内容）。

## 示例用法:

### 基本用法:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "你拥有的少于 -2.3",
    "<1": "你拥有的少于一个",
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
    "<1": "你拥有的少于一个",
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
    "<1": "你拥有的少于一个",
    "2": "你拥有两个",
    ">=3": "你拥有三个或更多",
  },
  2
);

console.log(content); // 输出: "你拥有两个"
```

### 条件优先级:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "你拥有的少于四个",
    "2": "你拥有两个",
  },
  2
);

console.log(content); // 输出: "你拥有的少于四个"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "你拥有的少于四个",
    "2": "你拥有两个",
  },
  2
);

console.log(content); // 输出: "你拥有的少于四个"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "你拥有的少于四个",
    "2": "你拥有两个",
  },
  2
);

console.log(content); // 输出: "你拥有的少于四个"
```

## 边缘情况:

- **没有匹配的条件:**

  - 如果没有条件与提供的数量匹配，函数将返回 `undefined` 或明确处理默认/后备场景。

- **模糊条件:**

  - 如果条件重叠，第一个匹配的条件（基于对象顺序）优先。

- **无效的键:**

  - 函数假定 `enumerationContent` 中的所有键都是有效的，并且可以解析为条件。无效或格式不正确的键可能导致意外行为。

- **TypeScript 强制:**
  - 函数确保所有键的 `Content` 类型一致，从而允许在检索内容时具有类型安全。

## 注意事项:

- `findMatchingCondition` 实用程序用于根据给定的数量确定适当的条件。
