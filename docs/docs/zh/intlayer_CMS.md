---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "将「实时同步」章节移动到独立页面（live-sync.md），此处仅保留简短介绍和链接"
  - version: 6.0.1
    date: 2025-09-22
    changes: "添加实时同步文档"
  - version: 6.0.0
    date: 2025-09-04
    changes: "用 `liveSync` 字段替换 `hotReload` 字段"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
author: aymericzip
---

# Intlayer 内容管理系统（CMS）文档

<iframe title="适用于您的 Web 应用的可视化编辑器 + CMS：Intlayer 详解" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS 是一个应用程序，允许您将 Intlayer 项目的内容外部化。

为此，Intlayer 引入了“远程字典”的概念。

![Intlayer CMS 界面](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 目录

<TOC/>

---

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

运行以下命令登录 Intlayer CMS：

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

这将打开您的默认浏览器以完成身份验证过程并接收使用 Intlayer 服务所需的凭据（客户端 ID 和客户端密钥）。

在您的 Intlayer 配置文件中，您可以自定义 CMS 设置：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * 可以通过在 Intlayer 控制面板 - 项目 (https://app.intlayer.org/projects) 中创建新客户端来获取。
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

> 如果您没有客户端 ID 和客户端密钥，可以通过在[Intlayer 控制面板 - 项目](https://app.intlayer.org/projects)中创建新客户端来获取。

> 要查看所有可用参数，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 使用 CMS

### 推送您的配置

要配置 Intlayer CMS，您可以使用[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/zh/cli/index.md)命令。

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> 如果您在 `intlayer.config.ts` 配置文件中使用了环境变量，可以通过 `--env` 参数指定所需的环境：

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

此命令会将您的配置上传到 Intlayer CMS。

### 推送字典

要将您的本地化字典转换为远程字典，您可以使用[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/zh/cli/index.md)命令。

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> 如果您在 `intlayer.config.ts` 配置文件中使用环境变量，可以使用 `--env` 参数指定所需的环境：

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

此命令会上传您的初始内容字典，使其可通过 Intlayer 平台进行异步获取和编辑。

### 编辑字典

然后，您将能够在 [Intlayer CMS](https://app.intlayer.org/content) 中查看和管理您的字典。

## 实时同步

实时同步让您的应用在运行时反映 CMS 内容的更改。无需重新构建或重新部署。启用后，更新会被流式传输到实时同步服务器，刷新您的应用读取的字典。

完整的设置指南（启用方式、启动 Live Sync 服务器、本地开发工作流程和限制条件）请参阅 [Live Sync 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/live-sync.md)。

## 调试

如果您遇到 CMS 的任何问题，请检查以下内容：

- 应用程序正在运行。

- [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 配置在您的 Intlayer 配置文件中设置正确。
  - 必需字段：
    - 应用程序 URL 应该与您在编辑器配置中设置的 URL 相匹配（`applicationURL`）。
    - CMS URL

- 确保项目配置已推送到 Intlayer CMS。

- 可视化编辑器使用 iframe 来显示您的网站。确保您的网站的内容安全策略 (CSP) 允许 CMS URL 作为 `frame-ancestors`（默认为 'https://app.intlayer.org'）。检查编辑器控制台中的任何错误。
