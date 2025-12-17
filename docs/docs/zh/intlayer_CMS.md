---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | 将您的内容外部化到 Intlayer CMS
description: 将您的内容外部化到 Intlayer CMS，以将内容管理委托给您的团队。
keywords:
  - CMS
  - 可视化编辑器
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: 添加实时同步文档
  - version: 6.0.0
    date: 2025-09-04
    changes: 用 `liveSync` 字段替换 `hotReload` 字段
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# Intlayer 内容管理系统（CMS）文档

<iframe title="适用于您的 Web 应用的可视化编辑器 + CMS：Intlayer 详解" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS 是一个应用程序，允许您将 Intlayer 项目的内容外部化。

为此，Intlayer 引入了“远程字典”的概念。

![Intlayer CMS 界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 理解远程字典

Intlayer 区分“本地”字典和“远程”字典。

- “本地”字典是指在您的 Intlayer 项目中声明的字典。例如按钮的声明文件，或您的导航栏。在这种情况下，将内容外部化没有意义，因为这些内容通常不需要频繁更改。

- “远程”字典是通过 Intlayer CMS 管理的字典。它可以让您的团队直接在网站上管理内容，同时也支持使用 A/B 测试功能和 SEO 自动优化。

## 可视化编辑器与 CMS

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 编辑器是一个工具，允许您在本地字典的可视化编辑器中管理内容。一旦进行更改，内容将被替换到代码库中。这意味着应用程序将被重新构建，页面将重新加载以显示新内容。

相比之下，Intlayer CMS 是一个工具，允许您在远程字典的可视化编辑器中管理内容。一旦进行更改，内容将**不会**影响您的代码库。网站将自动显示更改后的内容。

## 集成

有关如何安装该包的更多详细信息，请参阅下面的相关部分：

### 与 Next.js 集成

对于与 Next.js 的集成，请参阅[安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)。

### 与 Create React App 集成

对于与 Create React App 的集成，请参阅[安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)。

### 与 Vite + React 集成

对于与 Vite + React 的集成，请参阅[安装指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)。

## 配置

在您的 Intlayer 配置文件中，您可以自定义 CMS 设置：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    /**
     * 必填
     *
     * 应用程序的 URL。
     * 这是可视化编辑器所针对的 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必填
     *
     * 启用编辑器需要客户端 ID 和客户端密钥。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 控制面板 - 项目 (https://intlayer.org/dashboard/projects) 中创建新客户端来获取。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，您可以设置 CMS 的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认情况下，设置为 https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，您可以设置后端的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认情况下，设置为 https://back.intlayer.org
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
     * 必填
     *
     * 应用程序的 URL。
     * 这是可视化编辑器所针对的 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必填
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
     * 默认情况下，设置为 https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 可选
     *
     * 如果您自行托管 Intlayer CMS，可以设置后端的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认情况下，设置为 https://back.intlayer.org
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
     * 必填
     *
     * 应用程序的 URL。
     * 这是可视化编辑器所针对的 URL。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必填
     *
     * 启用编辑器需要客户端ID和客户端密钥。
     * 它们用于识别正在编辑内容的用户。
     * 可以通过在 Intlayer 控制面板 - 项目 (https://intlayer.org/dashboard/projects) 中创建新客户端来获取。
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
     * 如果您自行托管 Intlayer CMS，您可以设置后端的 URL。
     *
     * Intlayer CMS 的 URL。
     * 默认设置为 https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> 如果您没有客户端 ID 和客户端密钥，可以通过在[Intlayer 控制面板 - 项目](https://intlayer.org/dashboard/projects)中创建新客户端来获取。

> 要查看所有可用参数，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 使用 CMS

### 推送您的配置

要配置 Intlayer CMS，您可以使用[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/zh/intlayer_cli.md)命令。

```bash
npx intlayer config push
```

> 如果您在 `intlayer.config.ts` 配置文件中使用了环境变量，可以通过 `--env` 参数指定所需的环境：

```bash
npx intlayer config push --env production
```

此命令会将您的配置上传到 Intlayer CMS。

### 推送字典

要将您的本地化字典转换为远程字典，您可以使用[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/zh/intlayer_cli.md)命令。

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> 如果您在 `intlayer.config.ts` 配置文件中使用环境变量，可以使用 `--env` 参数指定所需的环境：

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

此命令会上传您的初始内容字典，使其可通过 Intlayer 平台进行异步获取和编辑。

### 编辑字典

然后，您将能够在 [Intlayer CMS](https://intlayer.org/dashboard/content) 中查看和管理您的字典。

## 实时同步

实时同步让您的应用在运行时反映 CMS 内容的更改。无需重新构建或重新部署。启用后，更新会被流式传输到实时同步服务器，刷新您的应用读取的字典。

> 实时同步需要持续的服务器连接，并且仅在企业版计划中可用。

通过更新您的 Intlayer 配置来启用实时同步：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置设置
  editor: {
    /**
     * 当检测到更改时，启用本地配置的热重载。
     * 例如，当添加或更新字典时，应用程序会更新页面上显示的内容。
     *
     * 由于热重载需要与服务器保持持续连接，
     * 因此仅对 `enterprise` 计划的客户开放。
     *
     * 默认值：false
     */
    liveSync: true,
  },
  build: {
    /**
     * 控制字典的导入方式：
     *
     * - "live"：字典通过 Live Sync API 动态获取。
     *   替换 useIntlayer 为 useDictionaryDynamic。
     *
     * 注意：Live 模式使用 Live Sync API 获取字典。如果 API 调用失败，
     * 字典将动态导入。
     * 注意：只有带有远程内容和 "live" 标志的字典使用 live 模式。
     * 其他字典为了性能使用动态模式。
     */
    importMode: "live",
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
     * 当检测到更改时，启用本地配置的热重载。
     * 例如，当添加或更新词典时，应用程序会更新页面上显示的内容。
     *
     * 由于热重载需要与服务器保持持续连接，因此仅对 `enterprise` 计划的客户可用。
     *
     * 默认值：false
     */
    liveSync: true,
  },
  build: {
    /**
     * 控制词典的导入方式：
     *
     * - "live"：词典通过 Live Sync API 动态获取。
     *   用 useDictionaryDynamic 替代 useIntlayer。
     *
     * 注意：Live 模式使用 Live Sync API 获取词典。如果 API 调用失败，
     * 词典将动态导入。
     * 注意：只有带有远程内容且标记为“live”的词典才使用实时模式。
     * 其他词典为了性能考虑使用动态模式。
     */
    importMode: "live",
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
     * 当检测到更改时，启用本地配置的热重载。
     * 例如，当添加或更新词典时，应用程序会更新页面上显示的内容。
     *
     * 由于热重载需要与服务器保持持续连接，
     * 因此仅对 `enterprise` 计划的客户端可用。
     *
     * 默认值：false
     */
    liveSync: true,

    /**
     * Live Sync 服务器的端口。
     *
     * 默认值：4000
     */
    liveSyncPort: 4000,

    /**
     * Live Sync 服务器的 URL。
     *
     * 默认值：http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * 控制字典的导入方式：
     *
     * - "live"：使用 Live Sync API 动态获取字典。
     *   替换 useIntlayer 为 useDictionaryDynamic。
     *
     * 注意：Live 模式使用 Live Sync API 获取字典。如果 API 调用失败，
     * 字典将以动态方式导入。
     * 注意：只有带有远程内容和“live”标志的字典使用 live 模式。
     * 其他字典为性能考虑使用动态模式。
     */
    importMode: "live",
  },
};

module.exports = config;
```

启动 Live Sync 服务器以包裹您的应用程序：

使用 Next.js 的示例：

```json5 fileName="package.json"
{
  "scripts": {
    // ... 其他脚本
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

使用 Vite 的示例：

```json5 fileName="package.json"
{
  "scripts": {
    // ... 其他脚本
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Live Sync 服务器包裹您的应用程序，并在更新内容到达时自动应用。

为了接收来自 CMS 的变更通知，Live Sync 服务器会与后端保持 SSE 连接。当 CMS 中的内容发生变化时，后端会将更新转发给 Live Sync 服务器，服务器会写入新的字典。您的应用将在下一次导航或浏览器刷新时反映更新——无需重新构建。

流程图（CMS/后端 -> Live Sync 服务器 -> 应用服务器 -> 前端）：

![Live Sync 逻辑示意图](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

工作原理：

![Live Sync 流程 CMS/后端/Live Sync 服务器/应用服务器/前端示意图](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### 开发工作流程（本地）

- 在开发过程中，应用启动时会获取所有远程字典，因此您可以快速测试更新。
- 要在本地使用 Next.js 测试 Live Sync，请包装您的开发服务器：

```json5 fileName="package.json"
{
  "scripts": {
    // ... 其他脚本
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // 适用于 Vite
  },
}
```

启用优化，以便 Intlayer 在开发期间应用实时导入转换：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

此设置将您的开发服务器与实时同步服务器包装在一起，在启动时获取远程字典，并通过 SSE 从 CMS 流式传输更新。刷新页面以查看更改。

注意事项和限制：

- 将实时同步源添加到您的站点安全策略（CSP）中。确保实时同步 URL 被允许在 `connect-src` 中（如果相关，也包括 `frame-ancestors`）。
- 实时同步不适用于静态输出。对于 Next.js，页面必须是动态的才能在运行时接收更新（例如，适当使用 `generateStaticParams`、`generateMetadata`、`getServerSideProps` 或 `getStaticProps`，以避免完全静态的限制）。
- 应用程序 URL 应与您在编辑器配置中设置的 URL (`applicationURL`) 匹配。
- CMS URL
- 确保项目配置已推送到 Intlayer CMS。

- 可视化编辑器使用 iframe 来显示您的网站。确保您网站的内容安全策略（CSP）允许 CMS URL 作为 `frame-ancestors`（默认是 'https://intlayer.org'）。检查编辑器控制台是否有任何错误。
