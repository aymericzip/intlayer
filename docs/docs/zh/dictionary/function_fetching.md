---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 函数获取
description: 了解如何在您的多语言网站中声明和使用函数获取。按照本在线文档中的步骤，几分钟内即可设置您的项目。
keywords:
  - 函数获取
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# 函数获取

Intlayer 允许您在内容模块中声明内容函数，这些函数可以是同步的也可以是异步的。当应用程序构建时，Intlayer 会执行这些函数以获取函数的结果。返回值必须是一个 JSON 对象或简单值，如字符串或数字。

> 警告：函数获取当前不支持 JSON 内容声明和远程内容声明文件。

## 函数声明

以下是一个简单的同步函数获取内容的示例：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "这是由函数渲染的内容",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "这是由函数渲染的内容",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "这是由函数渲染的内容",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "这是由函数渲染的内容"
  }
}
```

在此示例中，`text` 键包含一个返回字符串的函数。您可以使用 Intlayer 的解释器包（如 `react-intlayer`）在您的 React 组件中渲染此内容。

## 异步函数获取

除了同步函数外，Intlayer 还支持异步函数，允许您从外部来源获取数据或使用模拟数据来模拟数据检索。

下面是一个模拟服务器获取的异步函数示例：

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // 等待200毫秒以模拟从服务器获取数据
  return await setTimeout(200).then(() => "这是从服务器获取的内容");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // 等待200毫秒以模拟从服务器获取数据
  await setTimeout(200);
  return "这是从服务器获取的内容";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // 等待200毫秒以模拟从服务器获取数据
  await setTimeout(200);
  return "这是从服务器获取的内容";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
无法从JSON文件获取内容，请改用.ts或.js文件
```

在这种情况下，`fakeFetch` 函数模拟了一个延迟以模拟服务器响应时间。Intlayer 会执行异步函数，并将结果用作 `text` 键的内容。

## 在 React 组件中使用基于函数的内容

要在 React 组件中使用基于函数的内容，您需要从 `react-intlayer` 导入 `useIntlayer`，并使用内容 ID 调用它以获取内容。示例如下：

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 输出：这是由函数渲染的内容 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 输出：这是从服务器获取的内容 */}
    </div>
  );
};

export default MyComponent;
```

在这种情况下，`fakeFetch` 函数模拟了延迟以模拟服务器响应时间。Intlayer 执行异步函数并使用结果作为 `text` 键的内容。

## 在 React 组件中使用基于函数的内容

要在 React 组件中使用基于函数的内容，您需要从 `react-intlayer` 导入 `useIntlayer` 并使用内容 ID 调用它以获取内容。示例如下：

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 输出：这是由函数渲染的内容 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 输出：这是从服务器获取的内容 */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 输出：这是由函数渲染的内容 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 输出：这是从服务器获取的内容 */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 输出：这是由函数渲染的内容 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 输出：这是从服务器获取的内容 */}
    </div>
  );
};

module.exports = MyComponent;
```
