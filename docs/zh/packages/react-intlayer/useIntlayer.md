# React 集成：`useIntlayer` Hook 文档

本节提供了在 React 应用程序中使用 `useIntlayer` hook 的详细指南，以实现高效的内容本地化。

## 在 React 中导入 `useIntlayer`

可以通过以下方式将 `useIntlayer` hook 集成到 React 应用程序中：

- **客户端组件：**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // 用于客户端的 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // 用于客户端的 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // 用于客户端的 React 组件
  ```

- **服务端组件：**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // 用于服务端的 React 组件
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // 用于服务端的 React 组件
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // 用于服务端的 React 组件
  ```

## 参数

该 hook 接受两个参数：

1. **`key`**：用于检索本地化内容的字典键。
2. **`locale`**（可选）：所需的语言环境。如果未指定，则默认为上下文的语言环境。

## 字典

所有字典键必须在内容声明文件中声明，以增强类型安全性并避免错误。您可以在[这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)找到设置说明。

## 在 React 中的示例用法

在 React 组件中演示 `useIntlayer` hook 的使用：

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

在本地化属性时，适当地访问内容值：

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 其他资源

- **Intlayer 可视化编辑器**：有关更直观的内容管理体验，请参考可视化编辑器文档[这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)。

本节专门针对在 React 应用程序中集成 `useIntlayer` hook，简化本地化过程并确保不同语言环境下的内容一致性。
