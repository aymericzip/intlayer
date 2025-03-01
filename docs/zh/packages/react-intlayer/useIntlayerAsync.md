# React 集成: `useIntlayerAsync` Hook 文档

`useIntlayerAsync` hook 扩展了 `useIntlayer` 的功能，不仅返回预渲染的字典，还可以异步获取更新，非常适合在初始渲染后频繁更新本地化内容的应用程序。

## 概述

- **异步字典加载：**  
  在初始挂载时，`useIntlayerAsync` 首先返回任何预先获取或静态捆绑的本地化字典（与 `useIntlayer` 类似），然后异步获取并合并任何新可用的远程字典。
- **进度状态管理：**  
  该 hook 还提供了一个 `isLoading` 状态，用于指示是否正在获取远程字典。这使开发人员可以显示加载指示器或骨架状态，从而提供更流畅的用户体验。

## 环境设置

Intlayer 提供了一个无头内容源管理（CSM）系统，使非开发人员能够无缝管理和更新应用程序内容。通过使用 Intlayer 的直观仪表板，您的团队可以编辑本地化文本、图像和其他资源，而无需直接修改代码。这简化了内容管理流程，促进了协作，并确保可以快速轻松地进行更新。

开始使用 Intlayer：

1. **注册并获取访问令牌**：[https://intlayer.org/dashboard](https://intlayer.org/dashboard)。
2. **将凭据添加到您的配置文件：**  
   在您的 React 项目中，使用您的凭据配置 Intlayer 客户端：

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

3. **将新本地化字典推送到 Intlayer：**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   此命令上传您的初始内容字典，使其可通过 Intlayer 平台进行异步获取和编辑。

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

1. **`key`**:  
   **类型**: `DictionaryKeys`  
   用于标识本地化内容块的字典键。此键应在您的内容声明文件中定义。

2. **`locale`**（可选）：  
   **类型**: `Locales`  
   您想要定位的特定语言环境。如果省略，hook 将使用当前 Intlayer 上下文中的语言环境。

3. **`isRenderEditor`**（可选，默认为 `true`）：  
   **类型**: `boolean`  
   决定内容是否应准备好与 Intlayer 编辑器覆盖一起渲染。如果设置为 `false`，返回的字典数据将排除编辑器特定功能。

## 返回值

该 hook 返回一个包含按 `key` 和 `locale` 键入的本地化内容的字典对象。它还包括一个 `isLoading` 布尔值，指示是否正在获取远程字典。

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
- 一旦获取完成，`title` 和 `description` 将更新为最新内容，`isLoading` 返回为 `false`。

## 处理属性本地化

您还可以检索各种 HTML 属性（例如 `alt`、`title`、`aria-label`）的本地化属性值：

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 字典文件

所有内容键必须在您的内容声明文件中定义，以确保类型安全并防止运行时错误。这些文件启用 TypeScript 验证，确保您始终引用现有键和语言环境。

有关设置内容声明文件的说明，请参见 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

## 更多信息

- **Intlayer 可视化编辑器：**  
  与 Intlayer 可视化编辑器集成，可直接从 UI 管理和编辑内容。更多详情请参见 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md)。

---

**总结**，`useIntlayerAsync` 是一个强大的 React hook，旨在通过合并预渲染或预获取的字典与异步字典更新来增强用户体验并保持内容的新鲜度。通过利用 `isLoading` 和基于 TypeScript 的内容声明，您可以将动态、本地化内容无缝集成到您的 React 应用程序中。
