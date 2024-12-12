# React 集成: `useIntlayer` 钩子文档

本节提供了在 React 应用程序中使用 `useIntlayer` 钩子的详细指导，以实现高效的内容本地化。

## 在 React 中导入 `useIntlayer`

可以通过根据上下文导入 `useIntlayer` 钩子来集成到 React 应用程序中：

- **客户端组件：**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // 用于客户端 React 组件
  ```

- **服务器组件：**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // 用于服务器端 React 组件
  ```

## 参数

该钩子接受两个参数：

1. **`key`**: 用于检索本地化内容的字典键。
2. **`locale`** (可选): 所需的语言环境。如果未指定，则默认为上下文的语言环境。

## 内容声明

所有字典键必须在内容声明文件中声明，以增强类型安全性并避免错误。您可以在 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md) 找到设置说明。

## React 中的示例用法

在 React 组件中演示 `useIntlayer` 钩子：

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

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

## 处理属性

本地化属性时，适当地访问内容值：

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 其他资源

- **Intlayer 可视化编辑器**: 要获得更直观的内容管理体验，请参阅可视化编辑器文档 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

本节专门针对在 React 应用程序中集成 `useIntlayer` 钩子，简化本地化过程并确保不同语言环境下内容的一致性。
