---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayerAsync 钩子文档 | react-intlayer
description: 查看如何使用 react-intlayer 包中的 useIntlayerAsync 钩子
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
  - react-intlayer
  - useIntlayerAsync
---

# React 集成：`useIntlayerAsync` 钩子文档

`useIntlayerAsync` 钩子扩展了 `useIntlayer` 的功能，不仅返回预渲染的字典，还异步获取更新，非常适合那些在初始渲染后频繁更新本地化内容的应用程序。

## 概述

- **异步字典加载：**  
  在初次挂载时，`useIntlayerAsync` 会首先返回任何预先获取或静态打包的本地字典（就像 `useIntlayer` 一样），然后异步获取并合并任何新可用的远程字典。
- **进度状态管理：**  
  该钩子还提供了一个 `isLoading` 状态，指示何时正在获取远程字典。这使开发者能够显示加载指示器或骨架状态，从而提供更流畅的用户体验。

## 环境设置

Intlayer 提供了一个无头内容源管理（CSM）系统，使非开发人员能够无缝管理和更新应用内容。通过使用 Intlayer 直观的仪表盘，您的团队可以编辑本地化文本、图片及其他资源，而无需直接修改代码。这简化了内容管理流程，促进协作，并确保更新能够快速且轻松地完成。

开始使用 Intlayer：

1. **在 [https://intlayer.org/dashboard](https://intlayer.org/dashboard) 注册并获取访问令牌。**
2. **将凭证添加到您的配置文件中：**  
   在您的 React 项目中，使用您的凭证配置 Intlayer 客户端：

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

3. **推送新的本地化字典到 Intlayer：**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   该命令会上传您的初始内容字典，使其可通过 Intlayer 平台进行异步获取和编辑。

## 在 React 中导入 `useIntlayerAsync`

在您的 React 组件中，导入 `useIntlayerAsync`：

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## 参数

1. **`key`**：  
   **类型**：`DictionaryKeys`  
   用于标识本地化内容块的字典键。该键应在您的内容声明文件中定义。

2. **`locale`**（可选）：  
   **类型**：`Locales`  
   您想要定位的特定语言环境。如果省略，钩子将使用当前 Intlayer 上下文中的语言环境。

3. **`isRenderEditor`**（可选，默认为 `true`）：  
   **类型**：`boolean`  
   决定内容是否应准备好用于带有 Intlayer 编辑器覆盖层的渲染。如果设置为 `false`，返回的字典数据将不包含编辑器特定的功能。

## 返回值

该 Hook 返回一个字典对象，包含以 `key` 和 `locale` 为键的本地化内容。它还包括一个 `isLoading` 布尔值，指示是否正在获取远程字典。

## 在 React 组件中的示例用法

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("内容正在加载...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>加载中…</h1>
          <p>请稍候，内容正在更新。</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("内容正在加载...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>加载中…</h1>
          <p>请稍候，内容正在更新。</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("内容正在加载...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>加载中…</h1>
          <p>请稍候，内容正在更新。</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**关键点：**

- 在初始渲染时，`title` 和 `description` 来自预先获取或静态嵌入的本地化字典。
- 当 `isLoading` 为 `true` 时，后台请求会获取更新的字典。
- 一旦请求完成，`title` 和 `description` 会更新为最新内容，`isLoading` 变回 `false`。

## 处理属性本地化

你也可以获取各种 HTML 属性的本地化值（例如，`alt`、`title`、`aria-label`）：

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 字典文件

所有内容键必须在你的内容声明文件中定义，以确保类型安全并防止运行时错误。这些文件支持 TypeScript 验证，确保你始终引用存在的键和本地化语言。

/// 设置内容声明文件的说明请参见 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

## 进一步信息

- **Intlayer 可视化编辑器：**  
  集成 Intlayer 可视化编辑器，直接从 UI 管理和编辑内容。更多详情请见 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

---

**总结**，`useIntlayerAsync` 是一个强大的 React 钩子，旨在通过将预渲染或预获取的字典与异步字典更新合并，提升用户体验并保持内容的新鲜度。通过利用 `isLoading` 和基于 TypeScript 的内容声明，您可以无缝地将动态的本地化内容集成到您的 React 应用程序中。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
