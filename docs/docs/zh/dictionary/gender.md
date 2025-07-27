---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: 基于性别的内容
description: 了解如何在 Intlayer 中使用基于性别的内容，根据性别动态显示内容。按照本指南高效地在项目中实现性别特定内容。
keywords:
  - 基于性别的内容
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
  - gender
---

# 基于性别的内容 / Intlayer 中的性别

## 性别的工作原理

在 Intlayer 中，基于性别的内容是通过 `gender` 函数实现的，该函数将特定的性别值（'male'，'female'）映射到相应的内容。此方法使您能够根据给定的性别动态选择内容。当与 React Intlayer 或 Next Intlayer 集成时，会根据运行时提供的性别自动选择适当的内容。

## 设置基于性别的内容

要在您的 Intlayer 项目中设置基于性别的内容，请创建一个包含性别特定定义的内容模块。以下是各种格式的示例。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "针对男性用户的内容",
      female: "针对女性用户的内容",
      fallback: "未指定性别时的内容", // 可选
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "针对男性用户的内容",
      female: "针对女性用户的内容",
      fallback: "未指定性别时的内容", // 可选
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "针对男性用户的内容",
      female: "针对女性用户的内容",
      fallback: "未指定性别时的内容", // 可选
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "针对男性用户的内容",
        "female": "针对女性用户的内容",
        "fallback": "未指定性别时的内容", // 可选
      },
    },
  },
}
```

> 如果未声明回退内容，当性别未指定或不匹配任何定义的性别时，将使用最后声明的键作为回退内容。

## 在 React Intlayer 中使用基于性别的内容

要在 React 组件中使用基于性别的内容，请从 `react-intlayer` 包中导入并使用 `useIntlayer` 钩子。该钩子会获取指定键的内容，并允许你传入性别以选择合适的输出。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出：针对男性用户的内容 */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 输出：针对女性用户的内容 */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 输出：针对男性用户的内容 */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 输出：针对女性用户的内容 */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 输出：当未指定性别时的内容 */
          myGender("")
        }
      </p>
      <p>
        {
          /* 输出：当未指定性别时的内容 */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出：男性用户的内容 */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 输出：女性用户的内容 */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 输出：男性用户的内容 */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 输出：女性用户的内容 */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 输出：未指定性别时的内容 */
          myGender("")
        }
      </p>
      <p>
        {
          /* 输出：未指定性别时的内容 */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出：针对男性用户的内容 */
          myGender("male")
        }
      </p>
      <p>
        {
          /* 输出：针对女性用户的内容 */
          myGender("female")
        }
      </p>
      <p>
        {
          /* 输出：针对男性用户的内容 */
          myGender("m")
        }
      </p>
      <p>
        {
          /* 输出：针对女性用户的内容 */
          myGender("f")
        }
      </p>
      <p>
        {
          /* 输出：当性别未指定时的内容 */
          myGender("")
        }
      </p>
      <p>
        {
          /* 输出：当性别未指定时的内容 */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## 附加资源

有关配置和使用的更详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了关于在各种环境和框架中设置和使用 Intlayer 的更多见解。

## 文档历史

| 版本  | 日期       | 变更内容                   |
| ----- | ---------- | -------------------------- |
| 5.7.2 | 2025-07-27 | 引入基于性别的内容显示功能 |
