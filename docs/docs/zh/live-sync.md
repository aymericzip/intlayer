---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: 实时同步（Live Sync）| 让应用实时反映 CMS 内容变更
description: 让您的应用在运行时实时反映 Intlayer CMS 的内容变更，无需重新构建或重新部署。
keywords:
  - 实时同步
  - Live Sync
  - CMS
  - 可视化编辑器
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "从 Intlayer CMS 文档中拆分为独立页面"
  - version: 6.0.1
    date: 2025-09-22
    changes: "添加实时同步文档"
  - version: 6.0.0
    date: 2025-09-04
    changes: "用 `liveSync` 字段替换 `hotReload` 字段"
author: aymericzip
---

# 实时同步

实时同步让您的应用在运行时反映 CMS 内容的更改。无需重新构建或重新部署。启用后，更新会被流式传输到实时同步服务器，刷新您的应用读取的字典。

## 目录

<TOC/>

---

> 实时同步需要持续的服务器连接，并且仅在企业版计划中可用。

通过更新您的 Intlayer 配置来启用实时同步：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
```

启动 Live Sync 服务器以包裹您的应用程序：

使用 Next.js 的示例：

```json5 fileName="package.json"
{
  "scripts": {
    // ... 其他脚本
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Live Sync 服务器包裹您的应用程序，并在更新内容到达时自动应用。

为了接收来自 CMS 的变更通知，Live Sync 服务器会与后端保持 SSE 连接。当 CMS 中的内容发生变化时，后端会将更新转发给 Live Sync 服务器，服务器会写入新的字典。您的应用将在下一次导航或浏览器刷新时反映更新, 无需重新构建。

流程图（CMS/后端 -> Live Sync 服务器 -> 应用服务器 -> 前端）：

![Live Sync 逻辑示意图](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

工作原理：

![Live Sync 流程 CMS/后端/Live Sync 服务器/应用服务器/前端示意图](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## 开发工作流程（本地）

- 在开发过程中，应用启动时会获取所有远程字典，因此您可以快速测试更新。
- 要在本地使用 Next.js 测试 Live Sync，请包装您的开发服务器：

```json5 fileName="package.json"
{
  "scripts": {
    // ... 其他脚本
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // 适用于 Vite
  },
}
```

启用优化，以便 Intlayer 在开发期间应用实时导入转换：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

此设置将您的开发服务器与实时同步服务器包装在一起，在启动时获取远程字典，并通过 SSE 从 CMS 流式传输更新。刷新页面以查看更改。

注意事项和限制：

- 将实时同步源添加到您的站点安全策略（CSP）中。确保实时同步 URL 被允许在 `connect-src` 中（如果相关，也包括 `frame-ancestors`）。
- 实时同步不适用于静态输出。对于 Next.js，页面必须是动态的才能在运行时接收更新（例如，适当使用 `generateStaticParams`、`generateMetadata`、`getServerSideProps` 或 `getStaticProps`，以避免完全静态的限制）。
- 应用程序 URL 应与您在编辑器配置中设置的 URL (`applicationURL`) 匹配。
- CMS URL
- 确保项目配置已推送到 Intlayer CMS。

- 可视化编辑器使用 iframe 来显示您的网站。确保您网站的内容安全策略（CSP）允许 CMS URL 作为 `frame-ancestors`（默认是 'https://intlayer.org'）。检查编辑器控制台是否有任何错误。

## Useful links

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [自托管指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)
