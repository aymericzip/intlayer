---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer Hook 文档 | react-intlayer
description: 查看如何在 react-intlayer 包中使用 useIntlayer 钩子
keywords:
  - useIntlayer
  - 字典
  - 键
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史
---

# React 集成：`useIntlayer` 钩子文档

本节提供了在 React 应用中使用 `useIntlayer` 钩子的详细指导，帮助实现高效的内容本地化。

## 在 React 中导入 `useIntlayer`

`useIntlayer` 钩子可以根据上下文通过导入方式集成到 React 应用中：

- **客户端组件：**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // 用于客户端 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // 用于客户端 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // 用于客户端 React 组件
  ```

- **服务器端组件：**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // 用于服务器端 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // 用于服务器端 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // 用于服务器端 React 组件
  ```

## 参数

该钩子接受两个参数：

1. **`key`**：用于获取本地化内容的字典键。
2. **`locale`**（可选）：期望的语言环境。如果未指定，则默认为上下文的语言环境。

## 字典

所有字典键必须在内容声明文件中声明，以增强类型安全并避免错误。您可以在[此处找到设置说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

## React 中的示例用法

演示在 React 组件中使用 `useIntlayer` 钩子：

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 处理属性

在本地化属性时，请适当访问内容值：

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 额外资源

- **Intlayer 可视化编辑器**：如需更直观的内容管理体验，请参阅可视化编辑器文档 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

本节专门针对在 React 应用中集成 `useIntlayer` 钩子，简化本地化流程，确保不同语言环境下内容的一致性。
