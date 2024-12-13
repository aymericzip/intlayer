# React 集成：`useDictionary` Hook 文档

本部分提供有关在 React 应用程序中使用 `useDictionary` hook 的详细指导，使您能够高效处理本地化内容，而无需视觉编辑器。

## 在 React 中导入 `useDictionary`

可以根据上下文导入 `useDictionary` hook，以将其集成到 React 应用程序中：

- **客户端组件：**

  ```javascript
  import { useDictionary } from "next-intlayer"; // 用于客户端 React 组件
  ```

- **服务器组件：**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // 用于服务器端 React 组件
  ```

## 参数

此 hook 接受两个参数：

1. **`dictionary`**：一个声明的字典对象，包含特定键的本地化内容。
2. **`locale`**（可选）：所需的语言环境。如果未指定，则默认使用当前上下文的语言环境。

## 内容声明

所有字典对象应在结构化内容文件中声明，以确保类型安全并防止运行时错误。您可以在 [此处](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md) 找到设置说明。以下是内容声明的示例：

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
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
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## 在 React 中的示例用法

以下是如何在 React 组件中使用 `useDictionary` hook 的示例：

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## 服务器集成

如果您在 `IntlayerServerProvider` 之外使用 `useDictionary` hook，则必须在渲染组件时显式提供语言环境作为参数：

```tsx
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## 属性说明

与使用视觉编辑器的集成不同，像 `buttonTitle.value` 这样的属性在此处不适用。相反，请直接访问在您的内容中声明的本地化字符串。

```tsx
<button title={content.title}>{content.content}</button>
```

## 其他提示

- **类型安全**：始终使用 `DeclarationContent` 定义您的字典，以确保类型安全。
- **本地化更新**：更新内容时，确保所有语言环境一致，以避免缺少翻译。

本文件专注于 `useDictionary` hook 的集成，提供了一种简化的方法来管理本地化内容，而无需依赖视觉编辑器功能。
