---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs Intlayer: 2026 基准测试与对比"
description: Bundle 大小、内容泄漏、locale 切换响应性和开发者体验在 Next.js 和 TanStack Start 上的测量。你应该在 2026 年选择哪个 i18n 库？
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Next.js 国际化 (i18n) 基准测试

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` 是 Next.js 最流行的 i18n 库。Intlayer 是一个基于编译器、组件作用域的替代方案。两者都可以本地化 App Router 应用程序。问题是应用程序构建后每个库的成本是多少。

本文不是教程。这是一个由 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 的数据支持的比较，Benchmark Bloom 是一个开源基准测试套件，它使用每个库构建相同的应用程序，并测量浏览器实际下载和执行的内容。

<TOC/>

> **tl;dr**: 在相同的 Next.js 应用上，`next-intl` 在每个页面上增加 **+12.6 KB gzip** 的 JavaScript，而 Intlayer 仅增加 **+0.3 KB**。无需额外工作，`next-intl` 在每个页面上附带 **~90% 的外语页面字符串**。要通过 `next-intl` 达到 0% 泄漏，需要命名空间作用域和按页面的 `pick(messages, [...])`。Intlayer 默认达到 0%，因为其编译器按组件作用内容。如果你想要 Intlayer 输出的 `next-intl` API，`@intlayer/next-intl` 适配器测得每个页面 **147.5 KB** 对比原始的 **153.6 KB**。

## 简而言之

- **next-intl** - 轻量级、文档齐全、支持 ICU 消息格式、App Router 第一类支持（含 middleware）、formatters 和 navigation 助手。内容存储在集中式 JSON catalogs 中；性能优化（namespaces、per-page message picking、lazy loading）需要你自己实现。
- **Intlayer** - 以组件为中心的内容模型。`.content.ts` 字典与服务的组件并置，build-time compiler 对每个组件和每个 locale 进行 tree-shake 和 lazy-load，从你的内容生成严格的 TypeScript 类型，缺失的翻译在 build 时会失败。提供 middleware、SEO 助手、Visual Editor / CMS 和 AI 辅助翻译。

| 库                    | GitHub Stars                                                                                                                                                                   | 总提交数                                                                                                                                                                           | 最后提交                                                                                                                                            | 首个版本   | NPM 版本                                                                                                      | NPM 下载量                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024年4月  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | 2020年11月 | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> 徽章自动更新。快照会随时间变化。

## 并排功能比较

| 功能                                      | `next-intlayer` (Intlayer)                                           | `next-intl`                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **组件附近的翻译**                        | ✅ 是的，`.content.ts` 与每个组件并置                                | ❌ 否，集中的 `messages/{locale}.json`                                               |
| **TypeScript 集成**                       | ✅ 从内容自动生成的严格类型                                          | ✅ 良好，通过 `global.d.ts` 增强类型化的键                                           |
| **缺失翻译检测**                          | ✅ TypeScript 错误 + 构建时错误/警告                                 | ⚠️ 运行时回退 + 控制台警告                                                           |
| **富内容（JSX / Markdown / 组件）**       | ✅ 直接支持                                                          | ⚠️ `t.rich()` / `t.markup()` 配合标签占位符                                          |
| **ICU 支持**                              | ⚠️ 开发中                                                            | ✅ 是                                                                                |
| **格式化（日期、数字、货币）**            | ✅ `useNumber`、`useDate` 等（底层使用 Intl）                        | ✅ `useFormatter()`（底层使用 Intl）                                                 |
| **本地化路由与中间件**                    | ✅ 内置代理/中间件，`getMultilingualUrls`                            | ✅ 内置中间件，`Link`，`redirect`，`usePathname`                                     |
| **SEO 助手（hreflang、sitemap、robots）** | ✅ 内置助手                                                          | ⚠️ 手动配置，基于路由配置                                                            |
| **同步服务器组件**                        | ✅ `useIntlayer` 来自 `next-intlayer/server`，适用于任何子服务器组件 | ⚠️ `getTranslations` 是异步的；同步子组件需要通过 props 传递 `t`                     |
| **静态渲染**                              | ✅ 不阻止静态渲染                                                    | ⚠️ 需要 `setRequestLocale()`；命名空间 catalogs 在我们的测试中仍会使页面退出静态渲染 |
| **Tree-shaking（仅发送使用过的内容）**    | ✅ 按组件、按语言，由编译器自动化                                    | ⚠️ 手动：命名空间 + 每个页面的 `pick(messages, [...])`                               |
| **懒加载**                                | ✅ `importMode: 'dynamic'`（一行配置）                               | ⚠️ 手动在 `getRequestConfig` 中进行动态导入                                          |
| **清除未使用的内容**                      | ✅ 已过时的字典在构建时被移除                                        | ❌ 未内置                                                                            |
| **测试缺失的翻译 (CLI / CI)**             | ✅ `npx intlayer content test`                                       | ⚠️ 未内置；文档建议使用 `npx @lingual/i18n-check`                                    |
| **AI 驱动的翻译**                         | ✅ 内置，使用您自己的提供者密钥                                      | ❌ 否                                                                                |
| **Visual Editor / CMS**                   | ✅ 免费可视化编辑器 + 可选 CMS                                       | ❌ 否（外部本地化平台）                                                              |
| **MCP server & Agent Skills**             | ✅ 是                                                                | ❌ 否                                                                                |
| **Ecosystem / community**                 | ⚠️ 较小但增长迅速                                                    | ✅ 大型，Next.js 的参考标准                                                          |

## 基准测试

### 测量的内容

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 套件使用每个库构建**相同的应用程序**：**10 个页面**（首页、关于、博客、职业、联系、常见问题、定价、产品、设置、团队），**10 个语言环境**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`），相同的组件和相同的内容。页面在 `en` 和 `fr` 中进行测量。每个库实现了多达四种**加载策略**，从最初的设置到最优的设置：

| 策略               | 描述                                                    | 谁在这样做            |
| ------------------ | ------------------------------------------------------- | --------------------- |
| **static**         | 每个 locale 和每个页面打包在一起                        | 快速原型、AI 生成代码 |
| **dynamic**        | 仅加载活跃的 locale，但同时加载所有页面                 | 大多数项目            |
| **scoped-static**  | 按路由命名空间，无懒加载                                | 罕见                  |
| **scoped-dynamic** | 按路由命名空间 + 懒加载。仅发送当前 locale 中的当前页面 | 性能预算严格的应用    |

Intlayer 没有"scoped"变体：编译器会自动按**组件**对内容进行作用域划分，因此其 `static` 和 `dynamic` 行已经是作用域的。

对于每次构建，该套件记录：

- **Lib size**: 仅导入 i18n 库的空组件的 gzip 大小。运行时的固定成本。
- **Page JS**: 每个页面下载的 gzip JavaScript，在所有页面和语言环境中平均计算。
- **Locale leak %**: 下载的 JS 中找到的已翻译字符串中属于用户**未**查看的语言环境的份额（在 `en` 和 `fr` 上进行指纹识别，因此 50% 表示"另一个测量的语言环境完全存在"；使用 10 个捆绑的语言环境时，实际浪费更高）。
- **Page leak %**: 下载的 JS 中找到的已翻译字符串中属于用户**未**浏览的页面的份额。
- **Component avg**: 各个编译的每个组件的平均 gzip 大小。显示单个组件拖入多少 i18n 运行时。
- **E2E reactivity**: 选择新locale和`html[lang]`在DOM中更新之间的实时时间（Playwright，5次迭代）。
- **Hydration**: React hydration阶段持续时间。

> 下面的数字来自**2026-09-12**运行，使用`next-intl` 4.14.2、`use-intl` 4.14.2和`intlayer` 9.5.1。测试应用程序故意很小（每个locale只有几十个字符串），所以泄漏百分比描述的是一个**模式**：随着您的内容增长而增长，但运行时成本保持固定。

### Next.js (App Router)上的结果

选择您关注的指标和库：

<I18nBenchmark framework="nextjs" vertical/>

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (no i18n)             | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**如何阅读**

- **运行时成本。** 基础应用程序每页重 141.0 KB。`next-intl` 将其增加到 153.6 KB（**每页额外 +12.6 KB gzip**），Intlayer 增加到 141.3 KB（**额外 +0.3 KB**）。这个差异不取决于你有多少个字符串：它是库运行时的成本。
- **Leakage.** 在两个最多团队实际使用的设置中（`static` 和 `dynamic`），`next-intl` 会在每个页面上传送 **~90% 的外语页面字符串**：整个 `en.json` 都会进入客户端 provider。要达到 0% 需要使用 `scoped-*` 设置：将目录分割成命名空间，然后在每个页面中 `pick()` 正确的。Intlayer 在两行中都是 0%，无需任何额外配置。
- **每页面 JS 大小在不同策略间对 `next-intl` 没有变化。** 测试内容很小，所以 ~90% 的泄漏这里只有几 KB。在一个有数百个字符串每页面的真实应用中，这个比例会成为主导成本。同时 +12.6 KB 的 runtime 在每个配置中都会被支付。
- **组件大小。** 调用 `useTranslations()` 的组件编译到平均 21.8 KB；使用 `useIntlayer()` 的相同组件编译到 6.9 KB。在 `scoped-static` 设置中，`next-intl` 组件跳升到 80.1 KB，因为每个组件都内联其命名空间 catalog。
- **Reactivity 和 hydration** 在 Next.js 上对两个库都处于相同的范围（15-18 ms）。这里都不是瓶颈。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 完整表格、每个库和每种策略，请参阅 [Next.js 基准测试报告](https://intlayer.org/zh/doc/benchmark/nextjs)。

### TanStack Start 上的结果（`use-intl`）

`use-intl` 是 `next-intl` 的框架无关核心。相同的 API，相同的消息格式。在 TanStack Start 上将其与 `intlayer` 进行比较，移除了方程的 Next.js 特定部分。

<I18nBenchmark framework="tanstack" vertical/>

| Library                       | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |
| ----------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: |
| **base** (no i18n)            | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |
| `use-intl`                    | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |
| `use-intl`                    | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |
| `use-intl`                    | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |
| `use-intl`                    | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |
| **`intlayer`**                | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |
| **`intlayer`**                | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |        7.3 KB |         129.7 KB |        0.0% |      0.0% |             9.3 KB |         8.7 ms |

**如何阅读**

- 朴素的 `use-intl` 设置比基础应用多装载了 **68.8 KB 的 JS**，其中一半的字符串属于错误的语言环境，90% 属于错误的页面。
- `use-intl` 在 `dynamic` 模式下达到 119.4 KB，接近 Intlayer 的 118.6 KB，但仍然存在 **89.8% 页面泄漏**：活跃 locale 的所有页面字符串都在每个页面加载。按路由作用域划分（`scoped-*`）可以消除泄漏，但需要额外支付约 9 KB 的 chunk 开销。
- Intlayer 的 `static` 行已经实现 **0% 页面泄漏**：编译器仅打包页面上的组件使用的字典。启用 `importMode: 'dynamic'`（在 `intlayer.config.ts` 中只需一行）也消除了 locale 泄漏。
- **组件大小是架构的亮点**：使用 `use-intl` 每个组件 76-87 KB，而使用 Intlayer 仅 6-8 KB。`useTranslations()` 将每个组件绑定到全局消息树；`useIntlayer()` 将其绑定到自己的字典。
- **区域设置切换**使用 Intlayer 快 2-4 倍（3 毫秒 vs 7-21 毫秒）。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> 完整表格请参阅 [TanStack Start 基准测试报告](https://intlayer.org/zh/doc/benchmark/tanstack)。

## 为什么存在差距？集中式目录 vs. 编译的字典

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` 遵循经典模型：每个区域设置一个 JSON，在 `getRequestConfig` 中加载，推送到 `NextIntlClientProvider`，通过 `t("namespace.key")` 读取。

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

运行时无法知道页面将使用哪些 key，因此安全的默认做法是发送整个 catalog。优化意味着**你**需要将 catalog 拆分成 namespace，**你**需要决定每个页面需要哪些 namespace，并且**你**需要在组件移动时保持该映射同步。基准测试中的 `scoped-dynamic` 行是该工作的回报，但大多数团队从未实现过。

未能实现这一目标的成本在两个维度上同时增长：页面和语言环境：

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer 翻转了这个责任。内容在组件旁边声明：

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

在构建时，编译器（`@intlayer/swc` / `@intlayer/babel`）会检查哪个组件导入了哪个字典。它只为活跃的语言环境捆绑那些字典，并删除未被导入的字典。"scoped-dynamic"模式成为构建的输出，而不是团队必须维护的纪律。

> 要获得 `dynamic` 行的数字，请在 `intlayer.config.ts` 中设置 `dictionary.importMode: 'dynamic'`。请参阅 [bundle 优化文档](https://intlayer.org/doc/concept/bundle-optimization)。

## 开发者体验

### Client 组件

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  // 使用 useTranslations 获取 counter 命名空间的翻译
  const t = useTranslations("counter");
  // 使用 useFormatter 获取数字格式化工具
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> 记住在渲染此组件的每个页面上，将 `counter` 命名空间包含在传递给 `NextIntlClientProvider` 的消息中。

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ zh: "计数器", en: "Counter", fr: "Compteur" }),
    increment: t({ zh: "增加", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  // 获取国际化内容
  const { label, increment } = useIntlayer("counter");
  // 获取数字格式化工具
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

无需在页面上注册任何内容：该组件包含其自己的内容。

</Tab>
</Tabs>
### 同步服务器组件

设计系统组件（导航栏、页脚、卡片）通常是作为客户端组件的子组件渲染的服务器组件，因此它们不能是 `async`。

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

页面必须 `await getTranslations("counter")` 和 `await getFormatter()`，然后将结果作为 props 向下传递。该组件不再是自包含的。

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>
### 元数据

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// 本地化路径函数
const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

// 生成元数据
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## 保持 next-intl API，获得 Intlayer 的输出

您不必重写组件来获得上述基准数字。`@intlayer/next-intl` 是一个开箱即用的适配器：它保持 `useTranslations`、`getTranslations`、`useFormatter`、`t.rich()`、ICU 复数形式和 `next-intl/navigation` 助手，并从 Intlayer 编译器编译的 Intlayer 字典中提供它们。

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
ts fileName="next.config.ts"
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

在基准测试中，同一应用的兼容性构建从**每页 153.6 KB 降至 147.5 KB**，从**每个组件 21.8 KB 降至 8.1 KB**，以及从**约 90% 的页面泄漏降至 0%**，应用代码保持不变。你现有的 `messages/{locale}.json` 文件可以通过 [JSON 同步插件](https://intlayer.org/doc/compatibility/next-intl)保持作为真实来源。

查看 [next-intl 迁移指南](https://intlayer.org/doc/migration/next-intl)获取分步说明。

## 何时选择哪个？

<AccordionGroup>
<Accordion header="选择 next-intl">

您需要 Next.js 的生态标准，依赖 ICU MessageFormat，您的应用规模较小或中等，或者您与需要集中式 JSON 的翻译平台（Crowdin、Phrase、Lokalise...）集成。如果注重性能，请预留时间按命名空间划分目录并在每个页面使用 `pick()` 选择消息。

</Accordion>
<Accordion header="选择 Intlayer">

您需要**组件级作用域内容**、**严格的 TypeScript**、**构建时缺失键报错**、**零成本 tree-shaking 和按需加载**、同步服务端组件以及内置编辑工具（[可视化编辑器](https://intlayer.org/zh/doc/concept/editor)、[CMS](https://intlayer.org/zh/doc/concept/cms)、[AI 自动翻译](https://intlayer.org/zh/doc/concept/auto-fill)、[MCP 服务端](https://intlayer.org/zh/doc/mcp-server)）。特别适用于大型模块化代码库和设计系统。

</Accordion>
<Accordion header="选择 @intlayer/next-intl">

您已经在项目中使用了 `next-intl`，希望在无需重写的情况下获得包体积缩减优势。[兼容适配器](https://intlayer.org/zh/doc/compatibility/next-intl)保留了您的导入和 `messages/{locale}.json` 文件作为单一真实来源。在 [next-intl 对比 @intlayer/next-intl](https://intlayer.org/zh/blog/next-intl-vs-intlayer-next-intl) 中进行了同台实测。

</Accordion>
</AccordionGroup>

## 常见问题

<FAQ>

<Question title="next-intl 比 Intlayer 慢吗？">

在渲染阶段不是。两者的差异在于传输内容：`next-intl` 在每个页面上增加 **+12.6 KB gzip** 的运行时开销，并且在常见的配置下，每个页面都会携带 ~90% 的无关页面文本。在 Next.js 上语言切换与注水（hydration）耗时相近（15-18 毫秒）；在 TanStack Start 上，`use-intl` 耗时 7-21 毫秒，而 Intlayer 仅需 3-4 毫秒。

</Question>

<Question title="使用 next-intl 可以实现 0% 泄漏吗？">

可以，通过 `scoped-dynamic` 配置：将 `messages/{locale}.json` 按路由拆分为单个命名空间，然后在每个页面中使用 `pick(messages, [...])` 并在组件调整时持续维护该映射关系。基准测试中的 `scoped-*` 行正代表这项工作。而 Intlayer 天然就能达到 0%，因为编译器会在组件层级对内容进行作用域划分。请参阅[包体积优化](https://intlayer.org/zh/doc/concept/bundle-optimization)。

</Question>

<Question title="迁移时需要重写组件吗？">

不需要。`@intlayer/next-intl` 保留了 `useTranslations`、`getTranslations`、`useFormatter`、`t.rich()`、ICU 复数语法和导航助手，并通过编译后的字典进行提供。只需在 `next.config.ts` 中添加一行插件配置。详情请参阅 [next-intl 迁移指南](https://intlayer.org/zh/doc/migration/next-intl)。

</Question>

<Question title="Intlayer 支持 ICU MessageFormat 吗？">

原生 API 正在积极完善 ICU 支持。兼容适配器（`@intlayer/next-intl`、`@intlayer/use-intl`）均能完美执行 ICU：复数、`select`、`selectordinal`、`#` 和 `{ts, date, long}` 都会经过 Intlayer 的 ICU 解析器处理。详情请参阅 [ICU 消息格式解析](https://intlayer.org/zh/blog/icu-message-format)。

</Question>

<Question title="我可以保留 messages/{locale}.json 文件吗？">

可以。[JSON 同步插件](https://intlayer.org/zh/doc/compatibility/next-intl)会读取这些文件，将其顶层键拆分为字典，并在 CLI 或 CMS 更新时将翻译写回同一文件。译者的工作流程完全保持不变。

</Question>

</FAQ>

## 相关比较

同一基准测试，其他库：

- [i18next vs Intlayer](https://intlayer.org/zh/blog/i18next-vs-intlayer)
- [Lingui vs Intlayer](https://intlayer.org/zh/blog/lingui-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/zh/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/zh/blog/react-i18next-vs-react-intl-vs-intlayer)

深入了解 next-intl：

- [next-intl vs @intlayer/next-intl](https://intlayer.org/zh/blog/next-intl-vs-intlayer-next-intl), 在同一应用上实测的适配器
- [Is next-intl outdated?](https://intlayer.org/zh/blog/is-next-intl-outdated)
- [Using Intlayer with next-intl](https://intlayer.org/zh/blog/intlayer-with-next-intl)
- [How to internationalize a Next.js app with next-intl](https://intlayer.org/zh/blog/nextjs-internationalization-using-next-intl)

参考文档：

- [Next.js 基准测试报告](https://intlayer.org/zh/doc/benchmark/nextjs) 与 [TanStack Start 基准测试报告](https://intlayer.org/zh/doc/benchmark/tanstack)
- [兼容适配器：next-intl](https://intlayer.org/zh/doc/compatibility/next-intl) 与 [迁移指南](https://intlayer.org/zh/doc/migration/next-intl)
- [包体积优化](https://intlayer.org/zh/doc/concept/bundle-optimization) 与 [Intlayer 编译器](https://intlayer.org/zh/doc/compiler)
- [组件级 vs 集中式 i18n](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)
- [编译器驱动 vs 声明式 i18n](https://intlayer.org/zh/blog/compiler-vs-declarative-i18n)

## GitHub Stars

GitHub Stars 是项目受欢迎程度、社区信任度和长期相关性的强有力指标。虽然不是技术质量的直接衡量标准，但它们反映了有多少开发者认为该项目有用、关注其进展，以及可能采用它的开发者数量。

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## 结论

`next-intl` 是一个可靠的、维护良好的库，基准测试证实它远不是 Next.js 上最差的选择。但是它的集中式目录模型将每项优化都交给了开发者：天真的设置会泄漏约 90% 的外语页面内容，而 runtime 本身在每个页面上就花费 +12.6 KB gzip。

Intlayer 将这些工作转移到编译器中。按组件字典、按语言环境的懒加载和无用内容清理是构建输出，而不是约定。在同一个应用上的结果：**每页 +0.3 KB**，**0% 泄漏**，组件**小 3 倍**，以及在 TanStack Start 上语言切换**快 2-4 倍**。

所有原始数据、测试应用和脚本都在 [Benchmark Bloom 仓库](https://github.com/intlayer-org/benchmark-bloom) 中。自己运行它。

有关更多详细信息，请参阅 ['为什么选择 Intlayer?' 文档](https://intlayer.org/doc/why)。
