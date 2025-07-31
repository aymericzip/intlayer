---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync Hook 文档 | next-intlayer
description: 查看如何使用 next-intlayer 包中的 useIntlayerAsync Hook
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Next.js 集成：`useIntlayerAsync` Hook 文档

`useIntlayerAsync` Hook 扩展了 `useIntlayer` 的功能，不仅返回预渲染的字典，还能异步获取更新，非常适合那些在初始渲染后频繁更新本地化内容的应用。

## 概述

- **异步字典加载：**  
  在客户端，`useIntlayerAsync` 首先返回预渲染的本地化字典（与 `useIntlayer` 相同），然后异步获取并合并任何新可用的远程字典。
- **进度状态管理：**  
  该 Hook 还提供了一个 `isLoading` 状态，指示何时正在获取远程字典。这样开发者可以显示加载指示器或骨架屏，以提供更流畅的用户体验。

## 环境设置

Intlayer 提供了一个无头内容源管理（CSM）系统，使非开发人员能够无缝管理和更新应用内容。通过使用 Intlayer 直观的仪表盘，您的团队可以编辑本地化文本、图像和其他资源，而无需直接修改代码。这简化了内容管理流程，促进了协作，并确保更新能够快速且轻松地完成。

要开始使用 Intlayer，您首先需要在 [仪表盘](https://intlayer.org/dashboard) 注册并获取访问令牌。获得凭证后，将其添加到您的配置文件中，如下所示：

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
// 配置对象
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID, // 客户端ID
    clientSecret: process.env.INTLAYER_CLIENT_SECRET, // 客户端密钥
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
// 配置对象
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID, // 客户端ID
    clientSecret: process.env.INTLAYER_CLIENT_SECRET, // 客户端密钥
  },
};

module.exports = config;
```

配置好您的凭据后，您可以通过运行以下命令将新的本地化词典推送到 Intlayer：

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

此命令会上传您的初始内容词典，使其可通过 Intlayer 平台进行异步获取和编辑。

## 在 Next.js 中导入 `useIntlayerAsync`

由于 `useIntlayerAsync` 旨在用于**客户端**组件，您需要从与 `useIntlayer` 相同的客户端入口导入它：

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

如果您使用的是 Next.js App Router 并且服务器组件与客户端组件分开，请确保导入文件顶部标注了 `"use client"`。

## 参数

1. **`key`**：  
   **类型**：`DictionaryKeys`  
   用于标识本地化内容块的字典键。该键应在您的内容声明文件中定义。

2. **`locale`**（可选）：  
   **类型**：`Locales`  
   您想要定位的特定语言环境。如果省略，钩子将使用客户端上下文中的语言环境。

3. **`isRenderEditor`**（可选，默认值为 `true`）：  
   **类型**：`boolean`  
   确定内容是否应准备好通过 Intlayer 编辑器覆盖层进行渲染。如果设置为 `false`，返回的字典数据将不包含编辑器特定的功能。

## 返回值

该 Hook 返回一个字典对象，包含以 `key` 和 `locale` 为键的本地化内容。同时还包含一个 `isLoading` 布尔值，指示是否正在获取远程字典。

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

- 在初始渲染时，`title` 和 `description` 来自预渲染的本地化字典。
- 当 `isLoading` 为 `true` 时，会在后台发起远程请求以获取更新后的字典。
- 请求完成后，`title` 和 `description` 会更新为最新内容，且 `isLoading` 会变回 `false`。

## 处理属性本地化

与 `useIntlayer` 类似，您可以获取各种 HTML 属性的本地化属性值（例如 `alt`、`title`、`aria-label`）：

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 字典文件

所有内容键必须在您的内容声明文件中定义，以确保类型安全并防止运行时错误。这些文件支持 TypeScript 验证，确保您始终引用存在的键和语言环境。

/// 设置内容声明文件的说明请参见[这里](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

## 进一步信息

- **Intlayer 可视化编辑器：**  
  集成 Intlayer 可视化编辑器，直接从 UI 管理和编辑内容。更多详情请见[这里](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

---

**总结**，`useIntlayerAsync` 是一个强大的客户端钩子，旨在通过结合预渲染字典与异步字典更新，提升用户体验并保持内容的新鲜度。通过利用 `isLoading` 和基于 TypeScript 的内容声明，您可以无缝地将动态、本地化的内容集成到您的 Next.js 应用中。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
