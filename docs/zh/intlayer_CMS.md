# Intlayer 内容管理系统 (CMS) 文档

Intlayer CMS 是一个应用程序，允许您将 Intlayer 项目的内容外部化。

为此，Intlayer 引入了“远程词典”的概念。

## 理解远程词典

Intlayer 区分了“本地”和“远程”词典。

- “本地”词典是指在您的 Intlayer 项目中声明的词典。例如按钮的声明文件或您的导航栏。在这种情况下，外部化您的内容没有意义，因为这些内容不应该经常变化。

- “远程”词典是通过 Intlayer CMS 管理的词典。它可以让您的团队直接在您的网站上管理内容，并且还旨在使用 A/B 测试功能和 SEO 自动优化。

## 视觉编辑器 vs CMS

[Intlayer 视觉](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 编辑器是一个工具，允许您在本地词典中使用视觉编辑器管理内容。一旦进行更改，内容将被替换为代码库中的内容。这意味着应用程序将被重新构建，并且页面将重新加载以显示新内容。

相比之下，Intlayer CMS 是一个工具，允许您在远程词典中使用视觉编辑器管理内容。一旦进行更改，内容将**不**影响您的代码库。网站将自动显示更改的内容。

## 集成

有关如何安装软件包的更多详细信息，请参见下面的相关部分：

### 与 Next.js 集成

有关与 Next.js 的集成，请参阅 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

有关与 Create React App 的集成，请参阅 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

有关与 Vite + React 的集成，请参阅 [设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)。

## 配置

### 1. 在您的 intlayer.config.ts 文件中启用编辑器

在您的 Intlayer 配置文件中，您可以自定义编辑器设置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    /**
     * 客户端 ID 和客户端密钥是启用编辑器所必需的。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 控制面板 - 项目中创建新客户端获得。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，则编辑器处于非活动状态，无法访问。
     * 可用于出于安全原因在特定环境中禁用编辑器，例如生产环境。
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
     * 客户端 ID 和客户端密钥是启用编辑器所必需的。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 控制面板 - 项目中创建新客户端获得。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，则编辑器处于非活动状态，无法访问。
     * 可用于出于安全原因在特定环境中禁用编辑器，例如生产环境。
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
     * 客户端 ID 和客户端密钥是启用编辑器所必需的。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 控制面板 - 项目中创建新客户端获得。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * 可选
     * 默认值为 `true`。如果为 `false`，则编辑器处于非活动状态，无法访问。
     * 可用于出于安全原因在特定环境中禁用编辑器，例如生产环境。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> 如果您没有客户端 ID 和客户端密钥，可以通过在 [Intlayer 控制面板 - 项目](https://intlayer.org/dashboard/projects) 创建新客户端来获得它们。

> 要查看所有可用参数，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 使用 CMS

当编辑器安装后，您可以通过将光标悬停在内容上查看每个由 Intlayer 索引的字段。

![悬停在内容上](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

如果您的内容被轮廓化，您可以长按它以显示编辑抽屉。
