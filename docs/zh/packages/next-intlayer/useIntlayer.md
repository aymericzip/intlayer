# Next.js 集成：`useIntlayer` Hook 文档

`useIntlayer` hook 专为 Next.js 应用程序量身定制，以高效获取和管理本地化内容。本文档将集中介绍如何在 Next.js 项目中使用此 hook，确保适当的本地化实践。

## 在 Next.js 中导入 `useIntlayer`

根据您是在使用 Next.js 应用程序中的客户端组件还是服务器端组件，您可以按如下方式导入 `useIntlayer` hook：

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

- **服务器端组件：**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // 用于服务器端组件
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // 用于服务器端组件
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // 用于服务器端组件
  ```

## 参数

1. **`key`**：要从中检索内容的字典键的字符串标识符。
2. **`locale`**（可选）：要使用的特定语言环境。如果省略，则 hook 默认为客户端或服务器上下文中设置的语言环境。

## 内容声明文件

所有内容键必须在内容声明文件中定义，以防止运行时错误并确保类型安全。这种方法还促进了 TypeScript 集成，以进行编译时验证。

有关设置内容声明文件的说明，请参见 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

## 在 Next.js 中的示例用法

以下是如何在 Next.js 页面中实现 `useIntlayer` hook，以根据应用程序的当前语言环境动态加载本地化内容：

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

要本地化诸如 `alt`、`title`、`href`、`aria-label` 等属性，请确保正确引用内容：

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## 进一步信息

- **Intlayer 可视化编辑器**：了解如何使用可视化编辑器以便于内容管理 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

本文档概述了 `useIntlayer` hook 的具体使用，特别是在 Next.js 环境中，为您的 Next.js 应用程序提供了管理本地化的强大解决方案。
