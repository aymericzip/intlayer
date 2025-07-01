---
docName: package__next-intlayer__useDictionary
url: https://intlayer.org/doc/packages/next-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useDictionary.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useDictionary Hook 文档 | next-intlayer
description: 查看如何使用 next-intlayer 包中的 useDictionary 钩子
keywords:
  - useDictionary
  - dictionary
  - key
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# React 集成：`useDictionary` 钩子文档

本节详细介绍了如何在 React 应用中使用 `useDictionary` 钩子，实现无需可视化编辑器即可高效处理本地化内容。

## 在 React 中导入 `useDictionary`

`useDictionary` 钩子可以根据上下文导入到 React 应用中：

- **客户端组件：**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // 用于客户端 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // 用于客户端 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // 用于客户端 React 组件
  ```

- **服务器端组件：**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // 用于服务器端 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // 用于服务器端 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // 用于服务器端 React 组件
  ```

## 参数

该钩子接受两个参数：

1. **`dictionary`**：一个声明的字典对象，包含特定键的本地化内容。
2. **`locale`**（可选）：期望的语言环境。如果未指定，默认为当前上下文的语言环境。

## 字典

所有字典对象都应声明在结构化内容文件中，以确保类型安全并防止运行时错误。您可以在[此处找到设置说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。以下是内容声明的示例：

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "客户端组件示例",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "这是一个客户端组件示例的内容",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      zh: "客户端组件示例",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      zh: "这是一个客户端组件示例的内容",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## React 客户端组件中的示例用法

下面是如何在 React 组件中使用 `useDictionary` 钩子的示例：

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## React 服务器组件中的示例用法

如果你在 `IntlayerServerProvider` 之外使用 `useDictionary` 钩子，必须在渲染组件时显式提供 locale 作为参数：

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## 属性说明

与使用可视化编辑器的集成不同，这里不适用诸如 `buttonTitle.value` 之类的属性。相反，直接访问内容中声明的本地化字符串。

```jsx
<button title={content.title}>{content.content}</button>
```

## 额外提示

- **类型安全**：始终使用 `Dictionary` 来定义你的字典，以确保类型安全。
- **本地化更新**：更新内容时，确保所有语言版本保持一致，以避免遗漏翻译。

本档案重点介绍 `useDictionary` 钩子的集成，提供了一种简化的方式来管理本地化内容，无需依赖可视化编辑器功能。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
