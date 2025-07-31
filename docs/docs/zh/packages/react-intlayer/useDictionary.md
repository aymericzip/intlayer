---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary Hook - React Intlayer 文档
description: 使用 Intlayer 在 React 应用中高效处理本地化内容的 useDictionary 钩子完整指南，无需视觉编辑器。
keywords:
  - useDictionary
  - React
  - 钩子
  - intlayer
  - 本地化
  - i18n
  - 字典
  - 翻译
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
---

# React 集成：`useDictionary` 钩子文档

本节提供了在 React 应用中使用 `useDictionary` 钩子的详细指导，使得无需视觉编辑器即可高效处理本地化内容。

## 在 React 中导入 `useDictionary`

可以根据上下文通过导入 `useDictionary` 钩子将其集成到 React 应用中：

- **客户端组件：**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // 用于客户端 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // 用于客户端 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // 用于客户端 React 组件
  ```

- **服务器端组件：**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // 用于服务器端 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // 用于服务器端 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // 用于服务器端 React 组件
  ```

## 参数

该 Hook 接受两个参数：

1. **`dictionary`**：一个声明的字典对象，包含特定键的本地化内容。
2. **`locale`**（可选）：期望的语言环境。如果未指定，默认为当前上下文的语言环境。

## 字典

所有字典对象都应声明在结构化内容文件中，以确保类型安全并防止运行时错误。您可以在[此处找到设置说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。以下是内容声明的示例：

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 定义组件内容字典对象
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      zh: "客户端组件示例", // 中文翻译
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      zh: "这是一个客户端组件示例的内容", // 中文翻译
    }),
  },
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "zh": "客户端组件示例"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "zh": "这是一个客户端组件示例的内容"
      }
    }
  }
}
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "zh": "客户端组件示例"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "zh": "这是一个客户端组件示例的内容"
      }
    }
  }
}
```

## React 中的示例用法

以下是如何在 React 组件中使用 `useDictionary` 钩子的示例：

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## 服务器集成

如果您在 `IntlayerProvider` 之外使用 `useDictionary` 钩子，则在渲染组件时必须显式提供 locale 作为参数：

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## 属性说明

与使用可视化编辑器的集成不同，这里不适用诸如 `buttonTitle.value` 之类的属性。相反，应直接访问内容中声明的本地化字符串。

```jsx
<button title={content.title}>{content.content}</button>
```

## 额外提示

- **类型安全**：始终使用 `Dictionary` 来定义字典，以确保类型安全。
- **本地化更新**：更新内容时，确保所有语言环境保持一致，避免缺失翻译。

本档案重点介绍了 `useDictionary` 钩子的集成，提供了一种简化的方式来管理本地化内容，无需依赖可视化编辑器的功能。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
