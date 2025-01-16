# intlayer-editor: NPM 包用于使用 Intlayer 可视化编辑器

**Intlayer** 是专为 JavaScript 开发人员设计的一套软件包。它与 React、React 和 Express.js 等框架兼容。

**`intlayer-editor`** 包是一个 NPM 包，可以将 Intlayer 可视化编辑器集成到您的 React 项目中。

## Intlayer 编辑器如何工作

intlayer 编辑器允许与 Intlayer 远程词典进行交互。它可以在客户端安装并将您的应用程序转变为 CMS 风格的编辑器，以管理您网站中所有配置语言的内容。

![Intlayer 编辑器界面](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor_ui.png)

## 安装

使用您首选的软件包管理器安装必要的软件包：

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
    enabled: process.env.INTLAYER_ENABLED === "true", // 如果为 false，编辑器将处于非活动状态且无法访问。
    // 客户端 ID 和客户端密钥是启用编辑器所需的。
    // 它们可以标识正在编辑内容的用户。
    // 您可以通过在 Intlayer 控制台 - 项目中创建新客户端来获取它们 (https://intlayer.org/dashboard/projects)。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> 如果您没有客户端 ID 和客户端密钥，可以通过在 [Intlayer 控制台 - 项目](https://intlayer.org/dashboard/projects) 中创建新客户端来获取它们。

> 有关所有可用参数，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)

`intlayer-editor` 包基于 Intlayer，可用于 JavaScript 应用程序，例如 React（Create React App）、Vite + React 和 Next.js。

有关如何安装该软件包的更多详细信息，请参阅以下相关部分：

### 与 Next.js 集成

有关与 Next.js 集成的信息，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

有关与 Create React App 集成的信息，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)

### 与 Vite + React 集成

有关与 Vite + React 集成的信息，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)

### 集成示例

要将 Intlayer 可视化编辑器集成到您的 React 项目中，请按照以下步骤操作：

- 将 Intlayer 编辑器组件导入到您的 React 应用程序中：

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* 在此处放置您的应用内容 */}</IntlayerEditor>
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

当编辑器安装、启用并启动后，您可以通过将光标悬停在您的内容上来查看每个由 Intlayer 索引的字段。

![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_editor_hover_content.png)

如果您的内容已被轮廓标出，您可以长按它以显示编辑抽屉。
