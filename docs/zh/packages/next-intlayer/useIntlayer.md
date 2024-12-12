# Next.js 集成: `useIntlayer` Hook 文档

`useIntlayer` hook 专为 Next.js 应用程序量身定制，以高效获取和管理本地化内容。本文档将专注于如何在 Next.js 项目中使用该 hook，确保正确的本地化实践。

## 在 Next.js 中导入 `useIntlayer`

根据您是在 Next.js 应用程序中处理客户端组件还是服务器端组件，可以按如下方式导入 `useIntlayer` hook：

- **客户端组件：**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // 用于客户端组件
  ```

- **服务器组件：**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // 用于服务器端组件
  ```

## 参数

1. **`key`**: 用于检索内容的字典键的字符串标识符。
2. **`locale`** (可选): 要使用的特定语言环境。如果省略，则 hook 默认为客户端或服务器上下文中设置的语言环境。

## 内容声明文件

所有内容键都必须在内容声明文件中定义，以防止运行时错误并确保类型安全。这种方法还促进了 TypeScript 集成，以便在编译时进行验证。

有关设置内容声明文件的说明请查看 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

## 在 Next.js 中的示例用法

下面是如何在 Next.js 页面中实现 `useIntlayer` hook，以根据应用程序当前的语言环境动态加载本地化内容：

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return (
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

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

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

import { useIntlayer } from "next-intlayer/server";

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

## 属性本地化处理

要本地化属性，例如 `alt`、`title`、`href`、`aria-label` 等，请确保正确引用内容：

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## 进一步信息

- **Intlayer 可视化编辑器**: 了解如何使用可视化编辑器进行更简单的内容管理 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

本文档概述了 `useIntlayer` hook 在 Next.js 环境中的使用，为您管理 Next.js 应用程序中的本地化提供了强大解决方案。
