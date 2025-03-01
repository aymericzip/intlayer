# Next.js 集成：`useIntlayer` 钩子文档

`useIntlayer` 钩子专为 Next.js 应用程序设计，用于高效地获取和管理本地化内容。本篇文档将重点介绍如何在 Next.js 项目中使用该钩子，确保正确的本地化实践。

## 在 Next.js 中导入 `useIntlayer`

根据您在 Next.js 应用中是使用客户端组件还是服务端组件，可以按以下方式导入 `useIntlayer` 钩子：

- **客户端组件：**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // 用于客户端组件
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // 用于客户端组件
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // 用于客户端组件
  ```

- **服务端组件：**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // 用于服务端组件
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // 用于服务端组件
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // 用于服务端组件
  ```

## 参数

1. **`key`**: 用于指定要检索内容的字典键的字符串标识符。
2. **`locale`**（可选）：要使用的特定语言环境。如果未提供，钩子将默认使用客户端或服务端上下文中设置的语言环境。

## 字典文件

确保所有内容键都在内容声明文件中定义，以防止运行时错误并确保类型安全。这种方法还可以通过 TypeScript 集成实现编译时验证。

有关设置内容声明文件的说明，请参阅[此处](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

## 在 Next.js 中的示例用法

以下是如何在 Next.js 页面中实现 `useIntlayer` 钩子，以根据应用程序的当前语言环境动态加载本地化内容：

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 处理属性本地化

要本地化 `alt`、`title`、`href`、`aria-label` 等属性，请确保正确引用内容：

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## 进一步信息

- **Intlayer 可视化编辑器**：了解如何使用可视化编辑器更轻松地管理内容[此处](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)。

本篇文档专门介绍了在 Next.js 环境中使用 `useIntlayer` 钩子，为您的 Next.js 应用程序提供了管理本地化的强大解决方案。
