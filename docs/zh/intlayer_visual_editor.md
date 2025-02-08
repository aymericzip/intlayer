# Intlayer 可视化编辑器文档

Intlayer 可视化编辑器是一个工具，可以将您的网站与内容声明文件结合，通过可视化编辑器进行交互。

![Intlayer 可视化编辑器界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

`intlayer-editor` 包基于 Intlayer，适用于 JavaScript 应用程序，如 React（Create React App）、Vite + React 和 Next.js。

## 可视化编辑器与 CMS 的对比

Intlayer 可视化编辑器是一个允许您在本地词典中通过可视化编辑器管理内容的工具。一旦进行更改，内容将被替换在代码库中。这意味着应用程序将被重新构建，页面将被重新加载以显示新内容。

与此相反， [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 是一个允许您在远程词典中通过可视化编辑器管理内容的工具。一旦进行更改，内容将 **不** 影响您的代码库。网站将自动显示更改后的内容。

## 将 Intlayer 集成到您的应用程序中

有关如何集成 intlayer 的更多详细信息，请参见下面的相关部分：

### 与 Next.js 集成

有关与 Next.js 的集成，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

有关与 Create React App 的集成，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

有关与 Vite + React 的集成，请参考 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)。

## Intlayer 编辑器如何工作

应用程序中的可视化编辑器包括两部分：

- 一个前端应用程序，它将您的网站显示在 iframe 中。如果您的网站使用 Intlayer，可视化编辑器将自动检测您的内容，并允许您与之交互。一旦进行修改，您将能够下载您的更改。

- 一旦您点击下载按钮，可视化编辑器将向服务器发送请求，以用新内容替换您的内容声明文件（无论这些文件在项目中的声明位置）。

> 请注意，目前，Intlayer 编辑器将以 JSON 文件的形式写入您的内容声明文件。

## 安装

一旦 Intlayer 在您的项目中配置完成，只需将 `intlayer-editor` 安装为开发依赖：

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## 配置

### 1. 在您的 intlayer.config.ts 文件中启用编辑器

在您的 Intlayer 配置文件中，您可以自定义编辑器设置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    /**
     * 必需
     * 应用程序的 URL。
     * 这是可视化编辑器针对的 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 可选
     * 默认值为 `8000`。
     * 编辑器服务器的端口。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 可选
     * 默认值为 "http://localhost:8000"
     * 编辑器服务器的 URL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，则编辑器处于非活动状态，无法访问。
     * 可用于出于安全原因（如生产环境）禁用特定环境的编辑器。
     */
    enabled: process.env.INTLAYER_ENABLED,
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
   /**
     * 必需
     * 应用程序的 URL。
     * 这是可视化编辑器针对的 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 可选
     * 默认值为 `8000`。
     * 编辑器服务器的端口。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 可选
     * 默认值为 "http://localhost:8000"
     * 编辑器服务器的 URL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，则编辑器处于非活动状态，无法访问。
     * 可用于出于安全原因（如生产环境）禁用特定环境的编辑器。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置设置
  editor: {
    /**
     * 必需
     * 应用程序的 URL。
     * 这是可视化编辑器针对的 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 可选
     * 默认值为 `8000`。
     * 编辑器服务器的端口。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 可选
     * 默认值为 "http://localhost:8000"
     * 编辑器服务器的 URL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，则编辑器处于非活动状态，无法访问。
     * 可用于出于安全原因（如生产环境）禁用特定环境的编辑器。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> 要查看所有可用参数，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 使用编辑器

1. 当编辑器安装完成后，您可以使用以下命令启动编辑器：

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. 然后，打开提供的 URL。默认 `http://localhost:8000`。

   您可以通过将光标悬停在内容上查看每个字段的索引。

   ![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. 如果您的内容被标记，您可以长按它以显示编辑抽屉。
