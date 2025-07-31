---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: 条件内容
description: 了解如何在Intlayer中使用条件内容，以根据特定条件动态显示内容。按照本文档的步骤高效实现条件。
keywords:
  - 条件内容
  - 动态渲染
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - condition
---

# 条件内容 / Intlayer 中的条件

## 条件如何工作

在 Intlayer 中，通过 `cond` 函数实现条件内容，该函数将特定条件（通常是布尔值）映射到其对应的内容。这种方法使您能够根据给定条件动态选择内容。当与 React Intlayer 或 Next Intlayer 集成时，会根据运行时提供的条件自动选择适当的内容。

## 设置条件内容

要在您的 Intlayer 项目中设置条件内容，请创建一个包含条件定义的内容模块。以下是各种格式的示例。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "当条件为真时的内容",
      false: "当条件为假时的内容",
      fallback: "当条件不满足时的内容", // 可选
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "当条件为真时的内容",
      false: "当条件为假时的内容",
      fallback: "当条件不满足时的内容", // 可选
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "当条件为真时的内容",
      false: "当条件为假时的内容",
      fallback: "当条件不满足时的内容", // 可选
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "当条件为真时的内容",
        "false": "当条件为假时的内容",
        "fallback": "当条件不满足时的内容", // 可选
      },
    },
  },
}
```

> 如果未声明 fallback，当条件不满足时将使用最后声明的键作为 fallback。

## 在 React Intlayer 中使用条件内容

要在 React 组件中使用条件内容，请从 `react-intlayer` 包中导入并使用 `useIntlayer` 钩子。此钩子会获取指定键的内容，并允许您传入条件以选择适当的输出。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: 当条件为真时的内容 */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 输出: 当条件为假时的内容 */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 输出: 当条件不满足时的内容 */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 输出: 当条件不满足时的内容 */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: 当条件为真时的内容 */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 输出: 当条件为假时的内容 */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 输出: 当条件不满足时的内容 */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 输出: 当条件不满足时的内容 */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: 当条件为真时的内容 */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 输出: 当条件为假时的内容 */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 输出: 当条件不满足时的内容 */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 输出: 当条件不满足时的内容 */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## 其他资源

有关配置和使用的更多详细信息，请参考以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了在各种环境和框架中设置和使用 Intlayer 的进一步见解。
