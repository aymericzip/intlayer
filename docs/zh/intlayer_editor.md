# Intlayer 编辑器文档

Intlayer 编辑器是一个将您的应用程序转换为可视编辑器的工具。使用 Intlayer 编辑器，您的团队可以管理您网站中所有配置语言的内容。

![Intlayer 编辑器界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

`intlayer-editor` 包基于 Intlayer，并适用于 JavaScript 应用程序，如 React（创建 React 应用程序）、Vite + React 和 Next.js。

## 集成

有关如何安装该包的更多详细信息，请参见以下相关部分：

### 与 Next.js 集成

有关与 Next.js 的集成，请参考[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

有关与 Create React App 的集成，请参考[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

有关与 Vite + React 的集成，请参考[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)。

## Intlayer 编辑器的工作原理

每次您使用 Intlayer 编辑器进行更改时，服务器会自动将您的更改插入到项目中任何地方声明的[Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md)。

通过这种方式，您不必担心文件在哪里声明，或查找您在字典集合中的关键字。

## 安装

一旦在您的项目中配置了 Intlayer，只需将 `intlayer-editor` 安装为开发依赖项：

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## 配置

### 1. 在您的 intlayer.config.ts 文件中启用编辑器

在您的 Intlayer 配置文件中，您可以自定义编辑器设置：

```typescript
const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // 如果为 false，编辑器处于非活动状态，无法访问。
    // 客户端 ID 和客户端密钥是启用编辑器所必需的。
    // 它们用于识别正在编辑内容的用户。
    // 可以通过在 Intlayer 仪表板 - 项目中创建新客户端来获得它们 (https://intlayer.org/dashboard/projects)。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> 如果您没有客户端 ID 和客户端密钥，可以通过在[Intlayer 仪表板 - 项目](https://intlayer.org/dashboard/projects)中创建新客户端来获得它们。

> 有关所有可用参数的信息，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 2. 在您的应用程序中插入 Intlayer 编辑器提供程序

要启用编辑器，您需要在您的应用程序中插入 Intlayer 编辑器提供程序。

对于 React JS 或 Vite + React 应用程序的示例：

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

对于 Next.js 应用程序的示例：

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. 将样式表添加到您的应用程序

要显示编辑器样式，您需要将样式表添加到您的应用程序。

如果使用了 tailwind，您可以将样式表添加到您的 `tailwind.config.js` 文件中：

```js
// tailwind.config.js
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... 其余内容
  ],
  // ...
};
```

否则，您可以在应用程序中引入样式表：

```tsx
// app.tsx
import "intlayer-editor/css";
```

或者

```css
/* app.css */
@import "intlayer-editor/css";
```

## 使用编辑器

当编辑器安装、启用并启动后，您可以通过将鼠标光标悬停在内容上来查看 Intlayer 索引的每个字段。

![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

如果您的内容轮廓显示，您可以长按以显示编辑抽屉。
