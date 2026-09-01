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

### 从浏览器调用 API

同一个令牌支撑着一个无需凭证的小型客户端，因此静态站点或 SPA 可以在运行时读取其 CMS 内容，无需服务器、无需 Server Action，也不会在打包产物中泄露任何密钥：

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

它根据 `editor.clientId` 自行完成身份验证，令牌的交换、缓存与续期均在内部处理。其作用域限定了它能访问的范围：已发布的字典内容与分析数据摄取。其他任何操作（推送字典、读取项目、消耗 AI 额度）都需要真正的凭证，因此需要服务器或已登录的用户。

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

## 使用方法

### 自动 Provider 级别跟踪

无需更改代码。一旦安装了 `@intlayer/analytics` 并配置了 `editor.clientId`，`IntlayerProvider` 会自动：

- 在挂载时初始化分析客户端，
- 在初始加载时记录一个 `page_view`，
- 在每次更改区域设置时记录一个 `page_view`，
- 启动约 20 秒的刷新循环，并在卸载/关闭选项卡时刷新任何剩余事件（通过 `navigator.sendBeacon`，回退至 `fetch(..., { keepalive: true })`）。

每个框架的接入点不同，但都是你搭建 Intlayer 时已经使用过的那个位置，因此无需额外添加任何代码：

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` 会在内部挂载分析 provider。

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` 重新导出了 React 的 `IntlayerProvider`，所以分析功能以同样的方式接入。

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `intlayer` 插件会在根组件的生命周期中注册分析钩子。

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > 使用 Nuxt 时，`nuxt-intlayer` 会替你安装该插件，无需任何操作。

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` 会从设置 Intlayer 的组件中启动分析功能。

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` 会在内部挂载分析 provider。

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` 会以懒加载（lazy）方式挂载分析 provider，因此该代码块不会阻塞关键渲染路径。

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` 已经包含了 `provideIntlayerAnalytics()`。

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > 仅当你需要单独管理各个 provider 时，才单独使用 `provideIntlayerAnalytics()`。

  </Tab>
</Tabs>

### 自动 Node 级别跟踪

每次 `useIntlayer` 解析用于显示的内容片段时，解释器都会为该确切的 `dictionaryKey` + 键路径 + 区域设置报告一个 `content_exposure` 事件 —— 同样，无需更改代码。在刷新窗口内同一节点的重复曝光会合并为一个带有 `count`（计数）的事件，因此重新渲染 50 次的列表不会发送 50 个事件。

### 跟踪 A/B 测试的转化

使用 `useConversion()` 将目标归因于会话看到的变体：

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
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

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

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

    > `useConversion` 是一个客户端 Hook：请将组件标记为 `"use client"`。

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        开始使用
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      开始使用
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

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

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

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

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">开始使用</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### 在客户端解析变体

`useExperiment()` 会将会话分配到一个变体，并记录用作转化率分母的曝光。请用 `isAssigned` 来控制依赖变体的子树的渲染，避免访问者在分配结果确定之前看到对照组内容一闪而过：

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` 是一个普通字符串。

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` 是一个普通字符串。分配发生在浏览器中，因此该组件必须是客户端组件。

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` 和 `isAssigned` 是 `Ref`。

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` 和 `isAssigned` 是 store：请使用 `$` 前缀读取它们。

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` 是一个普通字符串。

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` 和 `isAssigned` 是 `Accessor`：调用它们即可读取值。

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` 和 `isAssigned` 是 `Signal`：调用它们即可读取值。

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

权重是可选的 — 为每个变体传递一个权重来改变分割比例，例如 `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`。

子应用随后读取与之匹配的字典的 [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/variants.md)：

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> 在**子组件**中读取 variant 是使其在 React 之外工作的关键：在 Vue、Svelte、Solid 和 Angular 中，传递给 `useIntlayer` 的选择器在组件设置时被捕获，所以读取必须发生在仅在 variant 已知时才挂载的组件中。

如果实验涵盖整个页面而不是单个字典，请将变体提升到提供者上——参见 [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/variants.md#ambient-variant)。下面的每个 `useIntlayer` 都会针对它进行解析，无需更改调用站点。

如果你需要在组件外部获取原始赋值，直接访问客户端：

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` 只进行分配——它不记录曝光。优先使用 `useExperiment()`，否则转化率将没有分母。

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

> **仅限服务器端。** `createIntlayerCMS()` 使用 `clientId` + `clientSecret` 进行身份验证，secret 永远不会在浏览器中可用，如果此代码片段在浏览器中运行，它将发出未经身份验证的请求。请将其保留在路由处理程序、服务器操作或脚本中。

## 有用的链接

- [动态字典 - 集合与变体 (Collections & Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- [Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)
- [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [自托管指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)
