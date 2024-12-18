# Next.js 集成: `useIntlayerAsync` Hook 文档

`useIntlayerAsync` 钩子扩展了 `useIntlayer` 的功能，不仅返回预渲染的字典，还异步获取更新，非常适合在初始渲染后频繁更新本地化内容的应用程序。

## 概述

- **异步字典加载:**  
  在客户端，`useIntlayerAsync` 首先返回预渲染的语言字典（就像 `useIntlayer` 一样），然后异步获取并合并任何新可用的远程字典。
- **进度状态管理:**  
  该钩子还提供一个 `isLoading` 状态，指示何时正在获取远程字典。这使开发人员能够显示加载指示器或骨架状态，以实现更流畅的用户体验。

## 环境设置

Intlayer 提供一个无头的内容源管理 (CSM) 系统，使非开发人员能够无缝管理和更新应用程序内容。通过使用 Intlayer 的直观仪表板，您的团队可以编辑本地化文本、图像和其他资源，而无需直接修改代码。这简化了内容管理流程，促进了协作，并确保可以快速轻松地进行更新。

要开始使用 Intlayer，您首先需要在 [https://intlayer.org/dashboard](https://intlayer.org/dashboard) 注册并获取访问令牌。获得凭据后，将其添加到您的配置文件中，如下所示：

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

配置凭据后，您可以通过运行以下命令将新的语言字典推送到 Intlayer：

```bash
npm intlayer push -d my-first-dictionary-key
```

该命令上传您的初始内容字典，使其可供通过 Intlayer 平台进行异步获取和编辑。

## 在 Next.js 中导入 `useIntlayerAsync`

由于 `useIntlayerAsync` 旨在用于 **客户端** 组件，您将从与 `useIntlayer` 相同的客户端入口点导入它：

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

确保导入文件顶部标注为 `"use client"`，如果您使用 Next.js 应用路由，且服务器和客户端组件分开。

## 参数

1. **`key`**:  
   **类型**: `DictionaryKeys`  
   用于标识本地化内容块的字典键。该键应在您的内容声明文件中定义。

2. **`locale`** (可选):  
   **类型**: `Locales`  
   您希望针对的特定语言环境。如果省略，则钩子使用客户端上下文中的语言环境。

3. **`isRenderEditor`** (可选，默认为 `true`):  
   **类型**: `boolean`  
   确定内容是否应准备好显示 Intlayer 编辑器覆盖层。如果设置为 `false`，则返回的字典数据将不包括编辑器特定功能。

## 返回值

该钩子返回一个字典对象，其中包含以 `key` 和 `locale` 为键的本地化内容。它还包括一个 `isLoading` 布尔值，指示是否正在获取远程字典。

## Next.js 中的示例用法

### 客户端组件示例

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    // 如果内容正在加载，输出日志
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

**要点:**

- 在初始渲染时，`title` 和 `description` 来自预渲染的语言字典。
- 当 `isLoading` 为 `true` 时，在后台发出远程请求以获取更新后的字典。
- 获取完成后，`title` 和 `description` 将更新为最新内容，`isLoading` 返回 `false`。

## 处理属性本地化

与 `useIntlayer` 一样，您可以检索各种 HTML 属性（例如，`alt`、`title`、`aria-label`）的本地化属性值：

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## 内容声明文件

所有内容键必须在您的内容声明文件中定义，以确保类型安全并防止运行时错误。这些文件启用 TypeScript 验证，确保您始终引用现有键和语言环境。

有关设置内容声明文件的说明，请参见 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

## 进一步信息

- **Intlayer 视觉编辑器:**  
  集成 Intlayer 视觉编辑器，以便直接从 UI 管理和编辑内容。更多详细信息 [这里](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor.md)。

---

**总结来说**, `useIntlayerAsync` 是一个强大的客户端钩子，旨在通过将预渲染字典与异步字典更新结合在一起，增强用户体验并保持内容的新鲜度。通过利用 `isLoading` 和基于 TypeScript 的内容声明，您可以无缝将动态、本地化的内容集成到您的 Next.js 应用程序中。
