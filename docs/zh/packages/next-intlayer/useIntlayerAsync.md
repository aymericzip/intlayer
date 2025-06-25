---
docName: package__next-intlayer__useIntlayerAsync
url: https://intlayer.org/doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useIntlayerAsync钩子文档 | next-intlayer
description: 查看如何为next-intlayer包使用useIntlayerAsync钩子
keywords:
  - useIntlayerAsync
  - 字典
  - 键
  - Intlayer
  - 国际化
  - 文档
  - Next.js
  - JavaScript
  - React
---

# Next.js 集成: `useIntlayerAsync` 钩子文档

`useIntlayerAsync` 钩子扩展了 `useIntlayer` 的功能，不仅返回预渲染的字典，还可以异步获取更新，非常适合在初始渲染后频繁更新本地化内容的应用程序。

## 概述

- **异步字典加载：**  
  在客户端，`useIntlayerAsync` 首先返回预渲染的语言环境字典（与 `useIntlayer` 类似），然后异步获取并合并任何新可用的远程字典。
- **进度状态管理：**  
  该钩子还提供了一个 `isLoading` 状态，指示何时正在获取远程字典。这使开发人员能够显示加载指示器或骨架状态，从而提供更流畅的用户体验。

## 环境设置

Intlayer 提供了一个无头内容源管理（CSM）系统，使非开发人员能够无缝管理和更新应用程序内容。通过使用 Intlayer 的直观仪表板，您的团队可以编辑本地化文本、图像和其他资源，而无需直接修改代码。这简化了内容管理流程，促进了协作，并确保可以快速轻松地进行更新。

要开始使用 Intlayer，您需要先注册并在 [https://intlayer.org/dashboard](https://intlayer.org/dashboard) 获取访问令牌。获得凭据后，将其添加到您的配置文件中，如下所示：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

配置凭据后，您可以通过运行以下命令将新的语言环境字典推送到 Intlayer：

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

此命令会上传您的初始内容字典，使其可以通过 Intlayer 平台进行异步获取和编辑。

## 在 Next.js 中导入 `useIntlayerAsync`

由于 `useIntlayerAsync` 是为 **客户端** 组件设计的，因此您需要从与 `useIntlayer` 相同的客户端入口点导入它：

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

如果您使用的是带有服务器和客户端组件分离的 Next.js App Router，请确保导入文件顶部标注了 `"use client"`。

## 参数

1. **`key`：**  
   **类型：** `DictionaryKeys`  
   用于标识本地化内容块的字典键。此键应在您的内容声明文件中定义。

2. **`locale`**（可选）：  
   **类型：** `Locales`  
   您想要定位的特定语言环境。如果省略，钩子将使用客户端上下文中的语言环境。

3. **`isRenderEditor`**（可选，默认为 `true`）：  
   **类型：** `boolean`  
   决定内容是否应准备好与 Intlayer 编辑器覆盖一起渲染。如果设置为 `false`，返回的字典数据将排除编辑器特定功能。

## 返回值

该钩子返回一个包含按 `key` 和 `locale` 键入的本地化内容的字典对象。它还包括一个 `isLoading` 布尔值，指示是否正在获取远程字典。

## 在 Next.js 中的示例用法

### 客户端组件示例

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("内容正在加载...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("内容正在加载...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("内容正在加载...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**关键点：**

- 在初始渲染时，`title` 和 `description` 来自预渲染的语言环境字典。
- 当 `isLoading` 为 `true` 时，会在后台发起远程请求以获取更新的字典。
- 获取完成后，`title` 和 `description` 会更新为最新内容，`isLoading` 返回 `false`。

## 处理属性本地化

与 `useIntlayer` 一样，您可以检索各种 HTML 属性（例如 `alt`、`title`、`aria-label`）的本地化属性值：

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 字典文件

所有内容键都必须在您的内容声明文件中定义，以确保类型安全并防止运行时错误。这些文件启用 TypeScript 验证，确保您始终引用现有的键和语言环境。

有关设置内容声明文件的说明，请参阅 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

## 更多信息

- **Intlayer 可视化编辑器：**  
  集成 Intlayer 可视化编辑器以直接从 UI 管理和编辑内容。更多详情请参阅 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)。

---

**总结**，`useIntlayerAsync` 是一个强大的客户端钩子，旨在通过结合预渲染字典和异步字典更新来增强用户体验并保持内容的新鲜度。通过利用 `isLoading` 和基于 TypeScript 的内容声明，您可以将动态、本地化内容无缝集成到您的 Next.js 应用程序中。
