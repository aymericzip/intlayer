---
docName: dictionary__insertion
url: https://intlayer.org/doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 插入
description: 学习如何在内容中声明和使用插入占位符。本指南将引导您通过步骤，在预定义的内容结构中动态插入值。
keywords:
  - 插入
  - 动态内容
  - 占位符
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 插入内容 / Intlayer 中的插入

## 插入的工作原理

在 Intlayer 中，插入内容是通过 `insertion` 函数实现的，该函数识别字符串中的占位符字段（例如 `{{name}}` 或 `{{age}}`），这些字段可以在运行时动态替换。这种方法允许您创建灵活的模板式字符串，其中内容的特定部分由应用程序传入的数据决定。

当与 React Intlayer 或 Next Intlayer 集成时，您只需提供包含每个占位符值的数据对象，Intlayer 会自动渲染内容并替换占位符。

## 设置插入内容

要在您的 Intlayer 项目中设置插入内容，请创建一个包含插入定义的内容模块。以下是各种格式的示例。

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "你好，我的名字是 {{name}}，我今年 {{age}} 岁！" // 插入的字符串，包含动态占位符
    ),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "你好，我的名字是 {{name}}，我今年 {{age}} 岁！" // 插入的字符串，包含动态占位符
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 定义插入内容的字典类型
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("你好，我的名字是 {{name}}，我今年 {{age}} 岁！"),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "你好，我的名字是 {{name}}，我今年 {{age}} 岁！",
    },
  },
}
```

## 在 React Intlayer 中使用插入内容

要在 React 组件中使用插入内容，请从 `react-intlayer` 包中导入并使用 `useIntlayer` 钩子。该钩子会检索指定键的内容，并允许您传入一个对象，将内容中的每个占位符映射到您希望显示的值。

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 您可以使用不同的值重复使用相同的插入内容 */
tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 你可以用不同的值重复使用相同的插入内容 */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 你可以用不同的值重复使用相同的插入内容 */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 你可以用不同的值重复使用相同的插入内容 */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## 附加资源

有关配置和使用的更详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
  const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
const { myInsertion } = useIntlayer("my_key");

return (

<div>
<p>
{
/_ 输出: "Hello, my name is John and I am 30 years old!" _/
myInsertion({ name: "John", age: "30" })
}
</p>
<p>
{
/_ 你可以使用不同的值重复使用相同的插入 _/
myInsertion({ name: "Alice", age: "25" })
}
</p>
</div>
);
};

module.exports = InsertionComponent;

```

## 附加资源

有关配置和使用的更详细信息，请参阅以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 输出: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 你可以使用不同的值重复使用相同的插入 */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## 附加资源

有关配置和使用的更详细信息，请参考以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了关于在各种环境和框架中设置和使用 Intlayer 的更多见解。

## 文档历史

- 5.5.10 - 2025-06-29: 初始化历史
