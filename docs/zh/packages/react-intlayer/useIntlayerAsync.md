# React 集成: `useIntlayerAsync` Hook 文档

`useIntlayerAsync` hook 扩展了 `useIntlayer` 的功能，不仅返回预渲染的字典，还异步获取更新，使其成为应用程序在初始渲染后经常更新本地化内容的理想选择。

## 概述

- **异步字典加载:**  
  在初始挂载时，`useIntlayerAsync` 首先返回任何预取或静态捆绑的区域字典（就像 `useIntlayer` 会做的那样），然后异步获取并合并任何新可用的远程字典。
- **进度状态管理:**  
  该 hook 还提供一个 `isLoading` 状态，指示何时正在获取远程字典。这允许开发人员显示加载指示器或骨架状态，以增强用户体验。

## 环境设置

Intlayer 提供了一个无头的内容源管理 (CSM) 系统，使非开发人员能够无缝管理和更新应用程序内容。通过使用 Intlayer 的直观仪表板，您的团队可以编辑本地化文本、图像和其他资源，而无需直接修改代码。这简化了内容管理过程，促进了协作，并确保可以快速、轻松地进行更新。

要开始使用 Intlayer：

1. **注册并获取访问令牌** 在 [https://intlayer.org/dashboard](https://intlayer.org/dashboard)。
2. **将凭证添加到您的配置文件：**  
   在您的 React 项目中，使用您的凭证配置 Intlayer 客户端：

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **将新的区域字典推送到 Intlayer：**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   此命令上传您的初始内容字典，使其可用于异步获取和通过 Intlayer 平台进行编辑。

## 在 React 中导入 `useIntlayerAsync`

在您的 React 组件中，导入 `useIntlayerAsync`：

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## 参数

1. **`key`**:  
   **类型**: `DictionaryKeys`  
   用于标识本地化内容块的字典键。此键应在您的内容声明文件中定义。

2. **`locale`** (可选):  
   **类型**: `Locales`  
   您要针对的特定区域。如果省略，hook 使用当前 Intlayer 上下文中的区域。

3. **`isRenderEditor`** (可选，默认为 `true`):  
   **类型**: `boolean`  
   确定内容是否应准备好与 Intlayer 编辑器覆盖层一起呈现。如果设置为 `false`，则返回的字典数据将排除编辑器特定的功能。

## 返回值

该 hook 返回一个字典对象，其中包含按 `key` 和 `locale` 键入的本地化内容。它还包括一个 `isLoading` 布尔值，指示当前是否正在获取远程字典。

## 在 React 组件中的示例用法

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("内容正在加载中...");
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

- 在初始渲染时，`title` 和 `description` 来自预取或静态嵌入的区域字典。
- 当 `isLoading` 为 `true` 时，后台请求会获取更新的字典。
- 一旦获取完成，`title` 和 `description` 将会更新为最新内容，`isLoading` 返回 `false`。

## 处理属性本地化

您还可以检索各种 HTML 属性（例如 `alt`、`title`、`aria-label`）的本地化属性值：

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 内容声明文件

所有内容键必须在您的内容声明文件中定义，以确保类型安全并防止运行时错误。这些文件启用 TypeScript 验证，以确保您始终引用现有键和区域。

有关设置内容声明文件的说明，请参见 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

## 进一步信息

- **Intlayer 可视化编辑器：**  
  与 Intlayer 可视化编辑器集成，从 UI 直接管理和编辑内容。更多详细信息 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

---

**总之，** `useIntlayerAsync` 是一个强大的 React hook，旨在通过合并预渲染或预取的字典与异步字典更新来增强用户体验和保持内容的实时性。通过利用 `isLoading` 和基于 TypeScript 的内容声明，您可以将动态、本地化的内容无缝集成到您的 React 应用程序中。
