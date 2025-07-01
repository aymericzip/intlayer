---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - 可视化翻译编辑器包
description: Intlayer 的可视化编辑器包，提供直观的界面用于管理翻译和借助 AI 协助进行协作内容编辑。
keywords:
  - intlayer
  - 编辑器
  - 可视化
  - 翻译
  - 协作
  - AI
  - NPM
  - 界面
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor：用于使用 Intlayer 可视化编辑器的 NPM 包

**Intlayer** 是一套专为 JavaScript 开发者设计的包集合。它兼容 React、React 和 Express.js 等框架。

**`intlayer-editor`** 包是一个 NPM 包，可将 Intlayer 可视化编辑器集成到您的 React 项目中。

## Intlayer 编辑器如何工作

intlayer 编辑器允许与 Intlayer 远程词典进行交互。它可以安装在客户端，将您的应用程序转变为类似 CMS 的编辑器，以管理网站中所有配置语言的内容。

![Intlayer 编辑器界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## 安装

使用您喜欢的包管理器安装所需的包：

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### 配置

在您的 Intlayer 配置文件中，您可以自定义编辑器设置：

```typescript
const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // 如果为 false，编辑器将处于非激活状态，无法访问。
    // 启用编辑器需要客户端 ID 和客户端密钥。
    // 它们用于识别正在编辑内容的用户。
    // 可以通过在 Intlayer 仪表板 - 项目 (https://intlayer.org/dashboard/projects) 中创建新客户端来获取。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> 如果您没有客户端 ID 和客户端密钥，可以通过在[Intlayer 控制面板 - 项目](https://intlayer.org/dashboard/projects)中创建一个新客户端来获取它们。

> 要查看所有可用参数，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

`intlayer-editor` 包基于 Intlayer，适用于 JavaScript 应用程序，如 React（Create React App）、Vite + React 和 Next.js。

有关如何安装该包的更多详细信息，请参阅下面的相关部分：

### 与 Next.js 集成

有关与 Next.js 集成的信息，请参阅[安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

对于 Create React App 的集成，请参阅[安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)

### 与 Vite + React 集成

对于 Vite + React 的集成，请参阅[安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)

### 集成示例

要将 Intlayer 可视化编辑器集成到您的 React 项目中，请按照以下步骤操作：

- 在您的 React 应用中导入 Intlayer 编辑器组件：

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          {/* Your components here */}
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- 将 Intlayer 编辑器样式导入到您的 Next.js 应用程序中：

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## 使用编辑器

当编辑器安装、启用并启动后，您可以将光标悬停在内容上，查看 Intlayer 索引的每个字段。

![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

如果您的内容被描边，您可以长按它以显示编辑抽屉。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
