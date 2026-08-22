---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | 跟踪内容曝光并运行 A/B 测试
description: 探索 @intlayer/analytics 如何跟踪页面/区域设置浏览量和内容曝光，以及如何使用它对您的 Intlayer 内容运行 A/B 测试。
keywords:
  - 分析 (Analytics)
  - A/B 测试
  - 受众 (Audience)
  - 国际化 (Internationalization)
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "安装 `@intlayer/analytics` 后默认启用分析功能"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics 包，Provider/Node级别跟踪，A/B 测试，仪表板"
author: aymericzip
---

# Intlayer Analytics 文档

`@intlayer/analytics` 是一个可选的配套包，它可以告诉您**哪些内容实际显示给了您的访问者** —— 哪个页面、哪个区域设置（locale）以及哪个特定的翻译内容片段 —— 从而让您能够了解您的受众并**对内容运行 A/B 测试**。

## 目录

<TOC/>

---

## 跟踪内容

`@intlayer/analytics` 会批处理三种类型的匿名事件：

| 事件 (Event)       | 捕获位置                               | 它的作用                                                                                                           |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `page_view`        | Provider 级别 (`IntlayerProvider`)     | 会话在首次加载、路由更改或切换区域设置时查看了哪个页面和区域设置。                                                 |
| `content_exposure` | Node 级别 (`useIntlayer` / 解释器插件) | 实际解析并显示了哪个字典键 (dictionary key) / 键路径 —— 并且，如果它是实验的一部分，具体是哪个**变体 (variant)**。 |
| `conversion`       | 任何调用 `useConversion()` 的地方      | 将达成的目标（注册、点击、购买等）归因于该会话所暴露的 A/B 变体。                                                  |

事件收集在内存中，并作为**大约每 20 秒一次的单一批量请求**发送 —— 而不是在每次击键或渲染时发送 —— 因此分析功能永远不会影响首次渲染时间，也不会在每次交互时增加网络请求。

## 它如何为内容的 A/B 测试提供支持

Intlayer 已经允许您声明内容 [变体 (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)（例如，一个具有 `control` 和 `black_friday` 变体的 `hero-banner` 字典）。`@intlayer/analytics` 完成了整个循环：

1. `getVariant(experimentKey, variants)` 确定性地将每个匿名会话分配给一个变体 —— 它是会话 ID 和实验键 (experiment key) 的纯函数，因此分配在**整个会话期间保持稳定**，并且在首次渲染之前**不需要服务器往返**（无闪烁，无布局偏移）。
2. 每个 `content_exposure` 事件都会携带所显示的 `variant`。
3. `useConversion()` 允许您将目标（例如 `"cta_click"`）归因于该变体。
4. 仪表板的实验结果端点 (endpoint) 比较各变体的转化率，包括统计显著性（z 检验）。

## 安装

`@intlayer/analytics` 是每个框架包（`react-intlayer`、`next-intlayer`、`vue-intlayer` 等）的**可选依赖（optional dependency）**，因此大多数项目已经安装了它。如果你的安装流程跳过可选依赖（例如 `npm install --no-optional`），请显式安装：

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

只需安装该包即可启用分析功能：`analytics.enabled` 默认为 `true`，当在你的项目中找不到该包时，`@intlayer/config` 会将其解析为 `false`。如果您不安装它，每个集成点都将解析为空操作 (no-op) —— 请参阅下文的[未安装时零成本](#未安装时零成本)。

## 配置

分析功能无需任何配置即可启动：它**默认启用**，并**复用现有的 `editor` 配置块**作为其上报地址和项目密钥。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // 也用作分析数据摄取端点
    clientId: "your-client-id", // 也用作分析项目密钥
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — 发送分析事件的基本 URL (`POST {backendURL}/api/analytics/events`)。
- `editor.clientId` — 归因于每个摄取事件的公共项目密钥。它也充当**启用开关**：在配置 `clientId` 之前，分析将保持完全禁用（并被摇树优化去除，见下文）。

如果您自托管 Intlayer，分析会自动指向您自己的实例，因为它共享 `editor.backendURL`。

### 如何关闭

可选的 `analytics` 配置块用于调整——或关闭——数据收集：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // 默认值：true —— 将整个集成排除在打包结果之外
    flushInterval: 20_000, // 两次批量发送之间的毫秒数
    sampleRate: 1, // 要记录的会话比例，从 0（不记录）到 1（全部记录）
  },
};

export default config;
```

卸载 `@intlayer/analytics` 与设置 `enabled: false` 效果相同。完整字段列表请参阅[配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

## 框架支持

Analytics 已连接到 `react-intlayer` 共享的 `IntlayerProvider` 中，因此今天只要使用该 provider 的任何地方都可以使用它：

| 框架                                                     | 状态                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------------- |
| React                                                    | ✅ 可用                                                                    |
| Next.js (`next-intlayer`)                                | ✅ 可用 (通过 `react-intlayer`)                                            |
| React Native / Expo (`react-native-intlayer`)            | ✅ 可用 (通过 `react-intlayer`)                                            |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 计划中 — 相同的客户端，遵循 `@intlayer/editor` 推出模式的提供商级别绑定 |

## 使用方法

### 自动 Provider 级别跟踪

无需更改代码。一旦安装了 `@intlayer/analytics` 并配置了 `editor.clientId`，`IntlayerProvider` 会自动：

- 在挂载时初始化分析客户端，
- 在初始加载时记录一个 `page_view`，
- 在每次更改区域设置时记录一个 `page_view`，
- 启动约 20 秒的刷新循环，并在卸载/关闭选项卡时刷新任何剩余事件（通过 `navigator.sendBeacon`，回退至 `fetch(..., { keepalive: true })`）。

### 自动 Node 级别跟踪

每次 `useIntlayer` 解析用于显示的内容片段时，解释器都会为该确切的 `dictionaryKey` + 键路径 + 区域设置报告一个 `content_exposure` 事件 —— 同样，无需更改代码。在刷新窗口内同一节点的重复曝光会合并为一个带有 `count`（计数）的事件，因此重新渲染 50 次的列表不会发送 50 个事件。

### 跟踪 A/B 测试的转化

使用 `useConversion()` 将目标归因于会话看到的变体：

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      开始使用
    </button>
  );
};
```

### 在客户端解析变体

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## 隐私与性能

- **设计上匿名**：会话由轮换 ID 标识；后端永远只存储该 ID 的 **SHA-256 哈希值** —— 从不存储原始 ID，从不存储 IP 地址。
- **位置是粗略的**：只有一个国家/地区代码，该代码从 CDN 地理位置标头（`cf-ipcountry`、`x-vercel-ip-country` 等）派生 —— 不会读取或存储 IP。
- **默认情况下 URL 排除搜索参数**，因此永远不会捕获查询字符串。
- **采样**：`sampleRate` 允许您在高流量应用程序中仅保留一小部分内容曝光事件。
- **批处理**：大约每 20 秒发送一个请求 (`flushInterval`)，或者如果缓冲区满了则提前发送 (`maxBufferSize`) —— 永远不会每个事件发送一个请求。

### 未安装时零成本

`@intlayer/analytics` 遵循与 `@intlayer/editor` 完全相同的可选依赖模式：

- 每个集成点通过**包裹在 `try/catch` 中的动态 `import()`** 加载包 —— 从未安装 `@intlayer/analytics` 的应用程序永远不会支付包大小或运行时成本，也永远不会看到错误；
- 一个编译时环境变量（`INTLAYER_ANALYTICS_ENABLED`），当该包未安装、`analytics.enabled` 为 `false`，或未配置 `editor.clientId` 时，它会由 `@intlayer/config` 自动设置为 `'false'`，允许打包器 (bundlers) **将整个集成作为死代码消除 (dead-code-eliminate)**；
- 分析在 Intlayer 编辑器/CMS 预览 iframe 中被禁用，因此编辑器会话永远不会算作真实流量。

## 仪表板：Analytics 页面

一旦您的项目收集了事件，[Intlayer 仪表板](https://app.intlayer.org/analytics) 中的 **Analytics（分析）** 页面（选择项目后在侧边栏中可见）会显示：

- **活跃用户** — 选定滚动窗口（7 / 30 / 90 天）内的独立访客。
- **今日用户** 和 **过去 7 天的用户**。
- 选定窗口内的 **页面浏览量**。
- 每日独立访客的 **演变图**。
- **区域设置 (Locales)** 和 **位置 (Location)** 细分选项卡，按区域设置和国家/地区对您的受众进行排名。

## 后端 API 参考

所有读取端点都需要身份验证；数据摄取是公开的，并且由主体中的 `clientId` 进行归因。

| 方法 (Method) | 端点 (Endpoint)                             | 描述                                                       |
| ------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `POST`        | `/api/analytics/events`                     | 摄取一批事件（公开，由主体中的 `clientId` 归因）。         |
| `GET`         | `/api/analytics/overview`                   | 认证项目的页面/区域设置总数。                              |
| `GET`         | `/api/analytics/audience?days=30`           | 独立访客，页面浏览量，每日序列，区域设置 + 国家/地区分类。 |
| `GET`         | `/api/analytics/content-stats`              | 每个内容的曝光总数，按字典键 / 键路径 / 区域设置分组。     |
| `GET`         | `/api/analytics/experiments/:experimentKey` | A/B 实验中每个变体的转化率和统计显著性。                   |

您还可以使用 [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 以编程方式调用这些端点：

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## 有用的链接

- [动态字典 - 集合与变体 (Collections & Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [自托管指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)
