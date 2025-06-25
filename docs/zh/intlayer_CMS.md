---
docName: intlayer_CMS
url: /doc/concept/cms
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Intlayer CMS | 将您的内容外部化到Intlayer CMS
description: 将您的内容外部化到Intlayer CMS，以代表您的团队管理您的内容。
keywords:
  - CMS
  - 可视编辑器
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer 内容管理系统 (CMS) 文档

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS 是一个允许您将 Intlayer 项目的内容外部化的应用程序。

为此，Intlayer 引入了“远程字典”的概念。

![Intlayer CMS 界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 理解远程字典

Intlayer 区分“本地”字典和“远程”字典。

- “本地”字典是指在您的 Intlayer 项目中声明的字典。例如按钮的声明文件或导航栏。在这种情况下，外部化内容没有意义，因为这些内容通常不会频繁更改。

- “远程”字典是通过 Intlayer CMS 管理的字典。这种字典可以让您的团队直接在网站上管理内容，同时也可以用于 A/B 测试功能和 SEO 自动优化。

## 可视化编辑器与 CMS

[Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 是一个工具，允许您在本地字典中以可视化方式管理内容。一旦更改完成，内容将被替换到代码库中。这意味着应用程序将被重新构建，页面将重新加载以显示新内容。

相比之下，Intlayer CMS 是一个工具，允许您在远程字典中以可视化方式管理内容。一旦更改完成，内容将**不会**影响您的代码库。网站将自动显示更改后的内容。

## 集成

有关如何安装包的更多详细信息，请参阅以下相关部分：

### 与 Next.js 集成

有关与 Next.js 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

有关与 Create React App 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

有关与 Vite + React 集成的内容，请参阅[设置指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_vite+react.md)。

## 配置

在您的 Intlayer 配置文件中，您可以自定义 CMS 设置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    /**
     * 必需
     *
     * 应用程序的 URL。
     * 这是可视化编辑器的目标 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必需
     *
     * 启用编辑器需要客户端 ID 和客户端密钥。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 仪表板 - 项目 (https://intlayer.org/dashboard/projects) 中创建新客户端来获取。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，可以设置 CMS 的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认设置为 https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，可以设置后端的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认设置为 https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * 应用程序的 URL。
     * 这是可视化编辑器的目标 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必需
     *
     * 启用编辑器需要客户端 ID 和客户端密钥。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 仪表板 - 项目 (https://intlayer.org/dashboard/projects) 中创建新客户端来获取。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，可以设置 CMS 的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认设置为 https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，可以设置后端的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认设置为 https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * 应用程序的 URL。
     * 这是可视化编辑器的目标 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必需
     *
     * 启用编辑器需要客户端 ID 和客户端密钥。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 仪表板 - 项目 (https://intlayer.org/dashboard/projects) 中创建新客户端来获取。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，可以设置 CMS 的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认设置为 https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，可以设置后端的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认设置为 https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> 如果您没有客户端 ID 和客户端密钥，可以通过在 [Intlayer 仪表板 - 项目](https://intlayer.org/dashboard/projects) 中创建新客户端来获取。

> 要查看所有可用参数，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

## 使用 CMS

### 推送您的配置

要配置 Intlayer CMS，您可以使用 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/zh/intlayer_cli.md) 命令。

```bash
npx intlayer config push
```

> 如果您在 `intlayer.config.ts` 配置文件中使用了环境变量，可以使用 `--env` 参数指定所需的环境：

```bash
npx intlayer config push --env production
```

此命令将您的配置上传到 Intlayer CMS。

### 推送字典

要将您的本地字典转换为远程字典，可以使用 [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/zh/intlayer_cli.md) 命令。

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> 如果您在 `intlayer.config.ts` 配置文件中使用了环境变量，可以使用 `--env` 参数指定所需的环境：

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

此命令上传您的初始内容字典，使其可以通过 Intlayer 平台进行异步获取和编辑。

### 编辑字典

然后，您将能够在 [Intlayer CMS](https://intlayer.org/dashboard/content) 中查看和管理您的字典。

## 热加载

当检测到更改时，Intlayer CMS 能够热加载字典。

如果没有热加载，则需要重新构建应用程序以显示新内容。

通过激活 [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration) 配置，当检测到更新时，应用程序将自动替换更新的内容。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    // ... 其他配置设置

    /**
     * 指示应用程序是否应在检测到更改时热加载本地配置。
     * 例如，当添加或更新新字典时，应用程序将更新页面中显示的内容。
     *
     * 因为热加载需要与服务器的持续连接，所以仅适用于 `enterprise` 计划的客户。
     *
     * 默认值：false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置设置
  editor: {
    // ... 其他配置设置

    /**
     * 指示应用程序是否应在检测到更改时热加载本地配置。
     * 例如，当添加或更新新字典时，应用程序将更新页面中显示的内容。
     *
     * 因为热加载需要与服务器的持续连接，所以仅适用于 `enterprise` 计划的客户。
     *
     * 默认值：false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其他配置设置
  editor: {
    // ... 其他配置设置

    /**
     * 指示应用程序是否应在检测到更改时热加载本地配置。
     * 例如，当添加或更新新字典时，应用程序将更新页面中显示的内容。
     *
     * 因为热加载需要与服务器的持续连接，所以仅适用于 `enterprise` 计划的客户。
     *
     * 默认值：false
     */
    hotReload: true,
  },
};

module.exports = config;
```

热加载会在服务器端和客户端替换内容。

- 在服务器端，您需要确保应用程序进程对 `.intlayer/dictionaries` 目录具有写入权限。
- 在客户端，热加载允许应用程序在浏览器中热加载内容，而无需重新加载页面。然而，此功能仅适用于客户端组件。

> 因为热加载需要使用 `EventListener` 与服务器保持持续连接，所以仅适用于 `enterprise` 计划的客户。

## 调试

如果您在使用 CMS 时遇到问题，请检查以下内容：

- 应用程序正在运行。

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 配置已正确设置在您的 Intlayer 配置文件中。

  - 必需字段：
    - 应用程序 URL 应与您在编辑器配置中设置的 URL (`applicationURL`) 匹配。
    - CMS URL

- 确保项目配置已推送到 Intlayer CMS。

- 可视化编辑器使用 iframe 显示您的网站。确保您的网站的内容安全策略 (CSP) 允许 CMS URL 作为 `frame-ancestors`（默认值为 'https://intlayer.org'）。检查编辑器控制台是否有任何错误。
