---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs @intlayer/next-intl: 相同的 API，不同的 Bundle"
description: 当 Next.js 应用程序的 next-intl 导入由 @intlayer/next-intl 兼容适配器提供时会发生什么。在相同代码上测量的 Bundle 大小、泄漏、组件大小和水合，以及适配器保留、忽略和无法替换的内容。
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | 相同的 API，不同的 Bundle

`@intlayer/next-intl` 是一个兼容适配器：它暴露 `next-intl` API（`useTranslations`、`getTranslations`、`useLocale`、`t.rich()`、ICU 复数、`NextIntlClientProvider`...），并从 Intlayer 编译的字典中提供服务。应用代码不会改变。但 bundle 会改变。

本文在同一个 Next.js 应用上对两者进行了比较，一次使用 `next-intl` 构建，一次使用适配器构建。这些数据来自 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)，一个记录浏览器实际下载内容的开源套件。如果你想要 `next-intl` vs Intlayer 作为库的比较，请阅读 [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer)。本文是关于当你保持组件原样不变时，适配器改变了什么。

<TOC/>

> **简明摘要**: 在同一个 Next.js 应用中，将 `next-intl` 替换为 `@intlayer/next-intl` 使每页 JavaScript 从 **153.6 KB 降至 147.5 KB**（gzip），平均组件从 **21.8 KB 降至 8.1 KB**，外页字符串泄漏从 **~90% 降至 0%**，水合从 **14.7 ms 降至 12.8 ms**，期间未编辑任何组件。在 TanStack Start 上，`use-intl` 等价物（`@intlayer/use-intl`）将组件从 **76-87 KB 缩减至 9-11 KB**，区域设置切换从 **7-21 ms 缩减至 4-9 ms**。适配器运行时成本为 **8.0 KB**，而 `next-intl` 为 **14.7 KB**，原生 `next-intlayer` 为 **5.5 KB**。导航和中间件在 Intlayer 的路由配置上重新实现；本地化 `pathnames` 是未被转移的唯一功能。

## `@intlayer/next-intl` 是什么

`next-intl` 是一个运行时：`getRequestConfig` 在每个请求时加载 `messages/{locale}.json`，`NextIntlClientProvider` 将其传送到客户端，`useTranslations("about")` 在渲染时从该对象读取密钥。每个优化（命名空间、`pick(messages, [...])` 按页面、懒加载）都需要你自己编写。

`@intlayer/next-intl` 保留了该链的第一部分和最后一部分，并替换了中间部分。你的组件仍然调用 `useTranslations("about")`；它们接收的内容来自在构建时编译的 Intlayer 字典，作用域限制在该组件，仅限活动区域设置。

三种机制使其工作：

1. **导入别名。** `@intlayer/next-intl/plugin` 中的 `createNextIntlPlugin()` 包装了 `withIntlayer` 并添加了 Webpack / Turbopack 别名，使得 `next-intl`、`next-intl/server`、`next-intl/navigation` 和 `next-intl/middleware` 解析到 `@intlayer/next-intl`。您的代码库中没有导入被重命名。
2. **JSON 作为真实来源。** `syncJSON` 插件读取您现有的 `messages/{locale}.json`，将其顶级键拆分为每个命名空间一个字典，当 CLI 或 CMS 更新它们时，将翻译写回相同的文件。您的翻译工作流程保持不变。
3. **调用点绑定。** Intlayer 优化 pass（Babel 或 SWC）会将 `useTranslations("about")` 重写为接收 `about` 字典的调用。组件不再访问全局消息树；而是访问其自己的内容。

```tsx fileName="app/[locale]/about/page.tsx"
// 你的代码，未改变
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="编译器发出的内容（简化版）"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

这就是为什么下面的组件大小和页面泄漏列列会改变的原因：一个页面只拉取它渲染的组件的字典，并且只以正在提供的语言环境拉取。

## adapter 保留、忽略和不替换的内容

| `next-intl` API                                                      | 使用 `@intlayer/next-intl`                                                                            |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ 保留。在构建时绑定到 `ns` 字典。键根据您的内容进行类型检查。                                       |
| `getTranslations({ locale, namespace })`                             | ✅ 保留                                                                                               |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ 保留。ICU 复数、`select`、`selectordinal`、`#`、`{ts, date, long}` 通过 Intlayer 的 ICU 解析器运行 |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ 保留                                                                                               |
| `useFormatter()`                                                     | ✅ 保留。`dateTime`、`number`、`relativeTime`、`list`、`dateTimeRange` 桥接到原生 `Intl`              |
| `NextIntlClientProvider`                                             | ✅ 已保留。`messages`、`timeZone` 和 `now` props **被接受但被忽略**（开发者警告会告诉你）             |
| `getMessages()`                                                      | ✅ 为了兼容性而保留；不再需要                                                                         |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ 不需要。字典在构建时被编译；没有按请求加载消息                                                     |
| `defineRouting()`                                                    | ✅ 已保留。省略的字段（`locales`、`defaultLocale`、`localePrefix`）从 `intlayer.config.ts` 读取       |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ 保留。在 Intlayer 的路由配置上重新实现；接受 `routing` 参数但忽略它                                |
| `pathnames`（本地化路由名称）                                        | ❌ 接受用于类型提示，**不进行插值**。保持纯路由名称或将该映射移到 Intlayer 的 `rewrite`               |
| `createMiddleware()`                                                 | ✅ 保留。返回 Intlayer 的代理；设置 `NEXT_LOCALE` cookie 以便 `useLocale()` 和你的语言切换器继续工作  |
| `NEXT_LOCALE` cookie                                                 | ✅ 默认读取（除非你自己配置 `routing.storage`）                                                       |
| 不带 namespace 的裸 `useTranslations()`                              | ⚠️ 可以工作，但调用点未绑定：它通过运行时注册表解析。传递一个 namespace 以获得 bundle 收益            |

## 基准测试

### 测量内容

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 套件使用每个设置构建**相同的应用程序**：**10 个页面**（主页、关于、博客、职业、联系、常见问题、定价、产品、设置、团队），**10 个语言环境**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`），相同的组件和相同的内容。页面在 `en` 和 `fr` 中进行测量。

`next-intl` 采用四种加载策略来构建，从朴素的设置（整个 `messages/{locale}.json` 加载）到最优的设置（每个路由一个命名空间 + 每页 `pick()`）。该适配器基于**与朴素设置相同的组件**构建，仅更改了 `next.config.ts` 和 `intlayer.config.ts`。它没有"作用域"变体：编译器按组件限定内容范围，因此其 `static` 和 `dynamic` 行已经被限定了范围。

对于每个构建，该套件记录：

- **Lib size**：仅导入 i18n 库的空组件的 gzip 大小。运行时的固定成本。
- **Page JS**：每页下载的 gzip JavaScript，在所有页面和语言环境中平均。
- **Locale leak %**: 下载的 JavaScript 中找到的翻译字符串中，属于用户**未**查看的语言环境的份额。
- **Page leak %**: 下载的 JavaScript 中找到的翻译字符串中，属于用户**未**访问的页面的份额。
- **Component avg**: 单独编译的每个组件的平均 gzip 大小。显示单个组件需要加载多少 i18n runtime 和目录。
- **E2E reactivity**: 选择新语言环境和 DOM 中 `html[lang]` 更新之间的实际耗时（Playwright，5 次迭代）。
- **Hydration**: React hydration 阶段的持续时间。

> 下面的数字来自于 **2026-09-12** 运行的测试，使用 `next-intl` / `use-intl` 4.14.2 和 `@intlayer/*` 9.5.1。测试应用程序故意保持较小规模（每个语言环境仅几十个字符串），因此泄漏百分比描述的是一个**模式**：随着内容的增加而增加，而运行时成本保持固定。

### Next.js 上的结果

| 设置                      | 策略           | 库大小 (gz) | 页面 JS 平均 (gz) | 语言环境泄漏 | 页面泄漏 | 组件平均 (gz) |  E2E 响应性 |        水合 |
| ------------------------- | -------------- | ----------: | ----------------: | -----------: | -------: | ------------: | ----------: | ----------: |
| **base** (no i18n)        | -              |      0.0 KB |          141.0 KB |         0.0% |     0.0% |        0.9 KB |     13.4 ms |     11.8 ms |
| `next-intl`               | static         |     14.7 KB |          153.6 KB |         4.2% |    89.8% |       21.8 KB |     16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |     14.7 KB |          153.6 KB |         9.7% |    89.9% |       21.8 KB |     15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |     14.7 KB |          153.6 KB |         0.0% |     0.0% |       80.1 KB |     17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |     14.7 KB |          153.6 KB |         0.0% |     0.0% |       22.9 KB |     17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |  **8.0 KB** |      **147.5 KB** |     **0.0%** | **0.0%** |    **8.1 KB** | **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |  **8.0 KB** |      **148.7 KB** |     **0.0%** | **0.0%** |    **8.1 KB** | **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |      5.5 KB |          141.3 KB |         0.0% |     0.0% |        8.5 KB |     15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |      5.5 KB |          141.3 KB |         0.0% |     0.0% |        6.9 KB |     15.3 ms |     15.9 ms |

**如何阅读**

- **相同的组件，每页少 6 KB。** 朴素应用的适配器构建落在 **147.5 KB**，低于每一个 `next-intl` 配置，包括完全优化的配置（153.6 KB）。运行时本身是差异：8.0 KB 对 14.7 KB，在每个页面上支付。
- **泄漏降至 0%，无需修改任何组件。** 朴素的 `next-intl` 设置在每个页面上传送约 90% 的外语页面字符串。使用 `next-intl` 达到 0% 需要使用 `scoped-*` 设置：每个路由一个命名空间，以及在每个页面中使用 `pick(messages, [...])` 。适配器从朴素代码达到 0% 是因为优化过程将每个 `useTranslations("ns")` 绑定到其自己的字典。
- **组件缩小 2.7 倍。** 独立编译的组件使用 `next-intl` 平均为 **21.8 KB**（它到达提供程序和消息树），使用适配器则为 **8.1 KB**。在 `next-intl` 的 `scoped-static` 设置中，该数字会 _上升_ 到 80 KB，因为每个路由的命名空间文件都可从选择它的页面访问。
- **Hydration 快 2 ms**（12.8 vs 14.7 ms）：在 React 可以 hydrate 之前，无需从 RSC payload 反序列化消息对象。
- **adapter 不是原生 runtime。** `next-intlayer` 位于 **141.3 KB**，比基础应用多 0.3 KB，带有 5.5 KB 的 runtime。adapter 在 Intlayer 的核心之上提供 `next-intl` API 表面（`useFormatter`、`t.rich`、ICU resolver），因此有 8.0 KB 和每页 +6 KB。它是桥接器，而不是目的地。

### TanStack Start 上的结果（`use-intl`）

`use-intl` 是 `next-intl` 的框架无关核心。其 adapter `@intlayer/use-intl` 采用相同的设计，配合 Vite plugin（`@intlayer/use-intl/plugin`）。

| 设置                     | 策略           | 库大小 (gz) | 页面 JS 平均 (gz) | 语言泄漏 | 页面泄漏 | 组件平均 (gz) | E2E 响应性 |        水合 |
| ------------------------ | -------------- | ----------: | ----------------: | -------: | -------: | ------------: | ---------: | ----------: |
| **base** (无 i18n)       | -              |      0.0 KB |          111.0 KB |     0.0% |     0.0% |        0.7 KB |     8.1 ms |     21.6 ms |
| `use-intl`               | 静态           |     14.1 KB |          179.8 KB |    50.0% |    89.8% |       76.0 KB |     6.7 ms |     15.3 ms |
| `use-intl`               | 动态           |     14.1 KB |          119.4 KB |     0.0% |    89.8% |       75.9 KB |     7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |     14.1 KB |          128.7 KB |     0.0% |     0.0% |       87.1 KB |    20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |     14.1 KB |          128.7 KB |     0.0% |     0.0% |       87.1 KB |    13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |  **7.3 KB** |          135.8 KB |    49.7% | **0.0%** |   **10.9 KB** | **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |  **7.3 KB** |      **129.7 KB** | **0.0%** | **0.0%** |    **9.3 KB** | **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |      5.0 KB |          125.8 KB |    50.0% |     0.0% |        8.1 KB |     3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |      5.0 KB |          118.6 KB |     0.0% |     0.0% |        6.3 KB |     3.6 ms |     14.1 ms |

**如何理解**

- **每页字节数与优化的 `use-intl` 相当。** `@intlayer/use-intl` 在 `dynamic` 模式下（129.7 KB）与 `use-intl` 的 `scoped-dynamic`（128.7 KB）相差 1 KB 以内，仅比 `use-intl` 的普通 `dynamic`（119.4 KB）多 10 KB。那个普通 `dynamic` 行仍然会泄露 90% 的外部页面字符串；字节数较低是因为测试应用的内容较小。适配器的 0% 是随着内容增长保持平稳的结果。
- **组件体积减小 7-9 倍。** `use-intl` 组件在每种策略中平均 **76-87 KB**，因为 `useTranslations` 绑定到提供程序的整个消息对象。适配器平均 **9-11 KB**。
- **区域设置切换更快。** 优化的 `use-intl` 设置需要 **13-21 ms** 来更新 `html[lang]`；适配器需要 **4-9 ms**。更少的组件重新渲染，并且不会从消息树中重新提取任何内容。
- **`static` 保留每个区域设置。** 适配器的 `static` 行显示 49.7% 的区域设置泄漏，与 `static` 模式下的本地 Intlayer 相同：所有区域设置都被打包，只有页面的字典。一行配置（`importMode: 'dynamic'`）就可以消除它。

## 为什么数字会变动

组件中没有任何改变，所以所有收益完全来自于 `useTranslations` 绑定的内容。

**使用 `next-intl`**，绑定是 provider。`NextIntlClientProvider` 为该 locale 接收整个 `messages` 对象；每个 `useTranslations("about")` 都从中读取。bundler 看到一个组件导入一个读取一个 context 的 hook，无法知道只使用了 `about` 分支。下面的路由都共享同一个消息对象，所以 page-leak 列显示约 ~90%，直到你自己分割文件。

```bash
.
├── messages
│   ├── en.json                       # 每个 namespace，每个页面
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**使用 `@intlayer/next-intl`**，绑定是字典。`syncJSON` 将 `messages/en.json` 转换为每个顶级键一个字典；编译器解析哪个组件调用 `useTranslations("about")` 并直接将其传递给 `about`，以活动的语言环境，作为bundler可以追踪和分割的导入。

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # 未改变，仍然是真实来源
│   └── fr.json
├── .intlayer/                        # 生成的：每个命名空间、每个语言环境一个字典
└── src
    ├── middleware.ts                 # createMiddleware() 现在返回 Intlayer 的代理
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (无 messages 属性)
        └── about/page.tsx            # useTranslations("about")  ← 保持不变
```

`src/i18n.ts` 和 `messages` 属性消失了。其他一切相同。

## 三步迁移

<Steps>
<Step number={1} title="安装">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

该命令检测 `next-intl` 并安装 `intlayer`、`next-intlayer`、`@intlayer/next-intl` 和 `@intlayer/sync-json-plugin`。保持 `next-intl` 已安装：它是适配器的 peer 依赖项，并提供类型。

</Step>
<Step number={2} title="将 Intlayer 指向你的消息">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" 捆绑每个语言环境；"dynamic" 按需加载活跃的语言环境
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU 占位符: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` 保持原位置不变。每个顶级键都会成为一个字典；`useTranslations("about")` 映射到 `about` 字典。

</Step>
<Step number={3} title="包装 next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` 组合了 `withIntlayer`（内容监听、字典编译、优化pass）和 `next-intl` → `@intlayer/next-intl` 的 Webpack 和 Turbopack 别名。构建，上表中的数字就是你的。

</Step>
</Steps>

### 之后你可以删除什么

| 文件 / 模式                                  | 原因                                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| `getRequestConfig` in `src/i18n.ts`          | 没有每个请求的消息加载。仅当该文件也导出 `createNavigation` helpers 时才保留该文件 |
| `messages={...}` on `NextIntlClientProvider` | adapter 读取已编译的输出；该 prop 被忽略，在开发中会记录警告                       |
| `await getMessages()` in layouts             | 同样原因                                                                           |
| Per-page `pick(messages, [...])`             | compiler 按组件进行picking                                                         |

### 除了字节外你还能获得什么

- **类型化的 keys。** `useTranslations("about")` 针对已编译的 `about` 字典进行类型检查。`t("does.not.exist")` 是 TypeScript 错误，而不是运行时 fallback。
- **`npx intlayer test`** 在某个 locale 缺少 key 时使导致 CI 失败。**`npx intlayer fill`** 使用你选择的提供商（OpenAI、Anthropic、Mistral、Gemini...）并使用你自己的 key 来翻译缺失的部分，并将结果写回 `messages/{locale}.json`。
- **Visual Editor 和 CMS** 在同一字典上工作，因此非开发者可以通过 UI 编辑 `messages/fr.json`，文件会自动更新。
- **逐步迁移到 `.content.ts`。** 任何组件都可以一次性地从 `useTranslations("about")` 切换到 `useIntlayer("about")` 并配置共置的 content 文件。JSON 和 `.content.ts` 字典共存并合并。

## 开始前需要了解的限制

- **路由配置移至 `intlayer.config.ts`。** `createNavigation(routing)` 和 `createMiddleware(routing)` 保持其签名但忽略该参数：locale、默认 locale 和前缀策略来自 Intlayer 的 `routing` 配置。如果你使用 `next-intl` 的本地化 `pathnames`（`/about` → `/a-propos`），适配器不会对其进行插值；Intlayer 的 `routing.rewrite` 涵盖了这个情况，但这是一个单独的更改。
- **无命名空间的 `useTranslations()` 未绑定。** 优化过程需要一个静态命名空间来了解要导入哪个字典。一个空调用仍然有效，通过一个引用每个字典的运行时注册表，这正是你试图移除的泄漏。传递命名空间。
- **该适配器不是免费的。** 8.0 KB 的运行时相对于 `next-intlayer` 的 5.5 KB，以及原生构建之上每页 +6-7 KB。它支付了 `next-intl` API 表面的成本。如果你到达了每个组件都已移至 `useIntlayer` 的阶段，请放弃该适配器。
- **提供者上的 `messages`、`timeZone`、`now` 被忽略。** 格式化器由原生 `Intl` 支持，只有语言环境影响其输出；如果你依赖于强制时区或固定的 `now` 用于水合稳定日期，请在调用点处理。

## 何时使用哪一个？

- **坚持使用 `next-intl`** 如果你的应用程序很小，你的 bundle 不是问题，你的团队对拥有命名空间和每页 `pick()` 感到舒适。
- **使用 `@intlayer/next-intl`**，如果你正在使用 `next-intl`，并希望获得 bundle、leakage 和 hydration 方面的改进、类型化的 keys 以及 CLI / CMS 工具，而无需重写代码。这是任何现有 `next-intl` codebase 的推荐入口点。
- **使用原生方案 (`next-intlayer`)**，用于新项目，或者一旦 adapter 完成其工作。它是这三者中最轻量的（5.5 KB，每页 +0.3 KB），并且支持同步 server components、per-component `.content.ts` 文件和完整功能集。

## 相关比较

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer)（库本身，相同的基准）
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next)（同一 adapter 系列）
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui)（相同的适配器系列）
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/blog/vue-i18n-vs-intlayer-vue-i18n)（相同的适配器系列）
- [迁移指南：next-intl 到 Intlayer](https://intlayer.org/doc/migration/next-intl)
- [兼容性适配器参考：next-intl](https://intlayer.org/doc/compatibility/next-intl)

## 总结

`@intlayer/next-intl` 做的是一件事：它改变了 `useTranslations` 的绑定对象，从持有每条消息的提供者变为为该组件编译的字典。在同一个 Next.js 应用中，每页只需 **6 KB**，**组件缩小 2.7 倍**，**0% 泄漏**，以及在任何人打开组件文件之前就有 **2 ms 的水合时间**。Navigation 和 middleware 保持其在 Intlayer 路由配置之上的 API，而原生的 `next-intlayer` runtime 仍然更加轻量。

所有原始数据、测试应用和脚本都在 [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom) 中。自己运行它。

有关更多详情，请参考 ['Why Intlayer?' 文档](https://intlayer.org/doc/why)。
