# Intlayer 编辑器文档

Intlayer 编辑器是一个将您的应用程序转换为可视编辑器的工具。使用 Intlayer 编辑器，您的团队可以管理您网站中所有配置语言的内容。

![Intlayer 编辑器界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

`intlayer-editor` 包基于 Intlayer，适用于 JavaScript 应用程序，例如 React（创建 React 应用程序）、Vite + React 和 Next.js。

## 集成

有关如何安装该包的更多详细信息，请参阅下面的相关部分：

### 与 Next.js 集成

要与 Next.js 集成，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

要与 Create React App 集成，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

要与 Vite + React 集成，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)。

## Intlayer 编辑器的工作原理

每次您使用 Intlayer 编辑器进行更改时，服务器会自动将您的更改插入到项目中声明的任意位置的 [Intlayer 声明文件](https://github.com/aymericzip/intlayer/blob/main/docs/zh/content_declaration/get_started.md) 中。

通过这种方式，您无需担心文件的声明位置或查找您在字典集合中的键。

## 安装

一旦在您的项目中配置了 Intlayer，只需将 `intlayer-editor` 安装为开发依赖项：

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## 配置

### 1. 在您的 intlayer.config.ts 文件中启用编辑器

在您的 Intlayer 配置文件中，您可以自定义编辑器设置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // 如果为 false，则编辑器处于非活动状态无法访问。
    // 客户端 ID 和客户端密钥是启用编辑器所必需的。
    // 它们用于识别正在编辑内容的用户。
    // 可以通过在 Intlayer 控制面板 - 项目中创建新客户端来获取。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置设置
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // 如果为 false，则编辑器处于非活动状态无法访问。
    // 客户端 ID 和客户端密钥是启用编辑器所必需的。
    // 它们用于识别正在编辑内容的用户。
    // 可以通过在 Intlayer 控制面板 - 项目中创建新客户端来获取。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置设置
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // 如果为 false，则编辑器处于非活动状态无法访问。
    // 客户端 ID 和客户端密钥是启用编辑器所必需的。
    // 它们用于识别正在编辑内容的用户。
    // 可以通过在 Intlayer 控制面板 - 项目中创建新客户端来获取。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> 如果您没有客户端 ID 和客户端密钥，可以通过在 [Intlayer 控制面板 - 项目](https://intlayer.org/dashboard/projects) 中创建新客户端来获取它们。

> 要查看所有可用参数，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 2. 在您的应用程序中插入 Intlayer 编辑器提供者

要启用编辑器，您需要在应用程序中插入 Intlayer 编辑器提供者。

React JS 或 Vite + React 应用程序的示例：

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Next.js 应用程序的示例：

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* 您的应用程序 */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. 将样式表添加到您的应用程序

要显示编辑器样式，您需要将样式表添加到您的应用程序。

如果使用 tailwind，则可以将样式表添加到您的 `tailwind.config.js` 文件：

```js fileName="tailwind.config.js"
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

否则，您可以在应用程序中导入样式表：

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

或

```css fileName="app.css"
@import "intlayer-editor/css";
```

## 使用编辑器

安装、启用并启动编辑器后，您可以通过将光标悬停在内容上查看每个由 Intlayer 索引的字段。

![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

如果您的内容被勾勒出来，您可以长按以显示编辑抽屉。
