# React 集成：`useDictionary` 钩子文档

本节提供了在 React 应用程序中使用 `useDictionary` 钩子的详细指南，支持在没有可视化编辑器的情况下高效处理本地化内容。

## 在 React 中导入 `useDictionary`

可以通过以下方式将 `useDictionary` 钩子集成到 React 应用程序中：

- **客户端组件：**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // 用于客户端的 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // 用于客户端的 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // 用于客户端的 React 组件
  ```

- **服务端组件：**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // 用于服务端的 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // 用于服务端的 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // 用于服务端的 React 组件
  ```

## 参数

该钩子接受两个参数：

1. **`dictionary`**：一个声明的字典对象，包含特定键的本地化内容。
2. **`locale`**（可选）：所需的语言环境。如果未指定，则默认为当前上下文的语言环境。

## 字典

所有字典对象应在结构化内容文件中声明，以确保类型安全并防止运行时错误。您可以在[此处](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)找到设置说明。以下是内容声明的示例：

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
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## 在 React 客户端组件中的示例用法

以下是如何在 React 组件中使用 `useDictionary` 钩子的示例：

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

## 在 React 服务端组件中的示例用法

如果您在 `IntlayerServerProvider` 之外使用 `useDictionary` 钩子，则在渲染组件时必须显式提供语言环境作为参数：

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

## 关于属性的注意事项

与使用可视化编辑器的集成不同，这里不适用诸如 `buttonTitle.value` 之类的属性。相反，直接访问您内容中声明的本地化字符串。

```jsx
<button title={content.title}>{content.content}</button>
```

## 其他提示

- **类型安全**：始终使用 `Dictionary` 定义您的字典以确保类型安全。
- **本地化更新**：更新内容时，请确保所有语言环境一致，以避免遗漏翻译。

本篇文档专注于 `useDictionary` 钩子的集成，提供了一种无需依赖可视化编辑器功能的简化本地化内容管理方法。
