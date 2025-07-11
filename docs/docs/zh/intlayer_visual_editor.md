---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Intlayer 可视编辑器 | 使用可视编辑器编辑您的内容
description: 发现如何使用 Intlayer 编辑器来管理您的多语言网站。按照本在线文档中的步骤，在几分钟内设置您的项目。
keywords:
  - 编辑器
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
---

# Intlayer 可视化编辑器文档

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer 可视化编辑器是一种工具，可以将您的网站包装起来，通过可视化编辑器与您的内容声明文件进行交互。

![Intlayer 可视化编辑器界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

`intlayer-editor` 包基于 Intlayer，可用于 JavaScript 应用程序，例如 React (Create React App)、Vite + React 和 Next.js。

## 可视化编辑器 vs CMS

Intlayer 可视化编辑器是一种工具，允许您在本地字典的可视化编辑器中管理内容。一旦进行了更改，内容将在代码库中被替换。这意味着应用程序将被重新构建，页面将重新加载以显示新内容。

相比之下，[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 是一种工具，允许您在远程字典的可视化编辑器中管理内容。一旦进行了更改，内容将**不会**影响您的代码库。网站将自动显示更改后的内容。

## 将 Intlayer 集成到您的应用程序中

有关如何集成 Intlayer 的更多详细信息，请参阅以下相关部分：

### 与 Next.js 集成

有关与 Next.js 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

有关与 Create React App 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

有关与 Vite + React 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)。

## Intlayer 编辑器如何工作

应用程序中的可视化编辑器包括以下两部分：

- 一个前端应用程序，它将在 iframe 中显示您的网站。如果您的网站使用了 Intlayer，可视化编辑器将自动检测您的内容，并允许您与之交互。一旦进行了修改，您将能够下载更改。

- 当您点击下载按钮时，可视化编辑器将向服务器发送请求，用新内容替换您的内容声明文件（无论这些文件在您的项目中声明在哪里）。

> 请注意，目前 Intlayer 编辑器将您的内容声明文件写为 JSON 文件。

## 安装

在您的项目中配置好 Intlayer 后，只需将 `intlayer-editor` 安装为开发依赖项：

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

在您的 Intlayer 配置文件中，您可以自定义编辑器设置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    /**
     * 必需
     * 应用程序的 URL。
     * 这是可视化编辑器的目标 URL。
     * 示例：'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，编辑器将处于非活动状态且无法访问。
     * 可用于出于安全原因在特定环境（如生产环境）中禁用编辑器。
     */
    enabled: process.env.INTLAYER_ENABLED,
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
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置设置
  editor: {
    /**
     * 必需
     * 应用程序的 URL。
     * 这是可视化编辑器的目标 URL。
     * 示例：'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，编辑器将处于非活动状态且无法访问。
     * 可用于出于安全原因在特定环境（如生产环境）中禁用编辑器。
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * 可选
     * 默认值为 `8000`。
     * 可视化编辑器服务器使用的端口。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 可选
     * 默认值为 "http://localhost:8000"
     * 应用程序可访问的编辑器服务器 URL。用于限制可以与应用程序交互的来源以提高安全性。如果设置为 `'*'`，编辑器可以从任何来源访问。如果更改了端口，或者编辑器托管在不同的域上，则应设置此项。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
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
     * 这是可视化编辑器的目标 URL。
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
     * 默认值为 `true`。如果为 `false`，编辑器将处于非活动状态且无法访问。
     * 可用于出于安全原因在特定环境（如生产环境）中禁用编辑器。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> 要查看所有可用参数，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 使用编辑器

1. 安装编辑器后，您可以使用以下命令启动编辑器：

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **请注意，您应该并行运行您的应用程序。** 应用程序 URL 应与您在编辑器配置中设置的 URL (`applicationURL`) 匹配。

2. 然后，打开提供的 URL。默认值为 `http://localhost:8000`。

   您可以通过将光标悬停在内容上查看每个由 Intlayer 索引的字段。

   ![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. 如果您的内容被标出，您可以长按它以显示编辑抽屉。

## 环境配置

编辑器可以配置为使用特定的环境文件。当您希望在开发和生产环境中使用相同的配置文件时，这非常有用。

要使用特定的环境文件，您可以在启动编辑器时使用 `--env-file` 或 `-f` 标志：

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> 请注意，环境文件应位于项目的根目录中。

或者，您可以使用 `--env` 或 `-e` 标志来指定环境：

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## 调试

如果您在使用可视化编辑器时遇到任何问题，请检查以下内容：

- 可视化编辑器和应用程序是否正在运行。

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 配置是否正确设置在您的 Intlayer 配置文件中。

  - 必需字段：
    - 应用程序 URL 应与您在编辑器配置中设置的 URL (`applicationURL`) 匹配。

- 可视化编辑器使用 iframe 来显示您的网站。请确保您网站的内容安全策略（CSP）允许将 CMS URL 作为 `frame-ancestors`（默认值为 'http://localhost:8000'）。如有错误，请检查编辑器控制台。

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史
