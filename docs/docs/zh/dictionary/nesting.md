---
docName: dictionary__nesting
url: https://intlayer.org/doc/concept/content/nesting
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: 词典嵌套
description: 了解如何在Intlayer中使用内容嵌套，以高效地重用和构造您的多语言内容。按照本文档的步骤无缝实施嵌套。
keywords:
  - Nesting
  - 内容重用
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 嵌套 / 子内容引用

## 嵌套如何工作

在 Intlayer 中，嵌套是通过 `nest` 函数实现的，它允许您引用和重用来自另一个字典的内容。与其重复内容，不如通过其键指向现有的内容模块。

## 设置嵌套

要在您的 Intlayer 项目中设置嵌套，您首先需要定义您希望重用的基础内容。然后，在一个单独的内容模块中，使用 `nest` 函数导入该内容。

### 基础字典

以下是一个基础字典的示例，用于在另一个字典中嵌套：

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### 使用 Nest 引用

现在，创建另一个内容模块，使用 `nest` 函数引用上述内容。您可以引用整个内容或特定的嵌套值：

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // 引用整个字典：
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // 引用特定的嵌套值：
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

作为第二个参数，您可以指定该内容中嵌套值的路径。如果未提供路径，则返回引用字典的整个内容。

## 在 React Intlayer 中使用嵌套

要在 React 组件中使用嵌套内容，可以利用 `react-intlayer` 包中的 `useIntlayer` 钩子。此钩子根据指定的键检索正确的内容。以下是如何使用它的示例：

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* 输出: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* 输出: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* 输出: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* 输出: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* 输出: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* 输出: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## 其他资源

有关配置和使用的更多详细信息，请参考以下资源：

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了在不同环境和各种框架中设置和使用 Intlayer 的更多见解。
