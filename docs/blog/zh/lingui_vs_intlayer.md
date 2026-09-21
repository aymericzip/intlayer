---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs Intlayer：2026 年基准测试与深度对比"
description: "在 Next.js 和 TanStack Start 上实测的两款基于编译器的 i18n 库。打包体积、内容泄漏、组件大小、水合性能、语言切换响应速度及开发者体验全面对比。"
keywords:
  - Lingui
  - Intlayer
  - 国际化
  - i18n
  - 基准测试
  - 打包体积
  - 编译器
  - 博客
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | React & Next.js 国际化 (i18n) 基准测试对比

Lingui 和 Intlayer 是本次基准测试中仅有的两个依赖**编译器**而非纯运行时的国际化库。Lingui 在构建时从宏中提取消息，并为每个语言环境编译目录。Intlayer 按组件编译字典，并按语言环境进行 Tree-shaking。理论上它们的表现应当十分接近，但实际测试数据揭示了它们在哪方面走向了分歧。

测试数据来源于 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)，这是一个开源基准测试套件，它使用每个库构建完全相同的应用程序，并记录浏览器实际下载和执行的代码细节。

<TOC/>

> **摘要 (tl;dr)**：在每页原始 JavaScript 下载体积方面，Lingui 最接近 Intlayer：在配置了延迟加载（lazy loading）后，TanStack Start 上为 **115-120 KB** 对 **118.6 KB**，Next.js 上为 **148.6 KB** 对 **141.3 KB**。但差距体现在其他维度：独立编译的 Lingui 组件体积高达 **58-153 KB**，而 Intlayer 仅为 **6-8 KB**；水合耗时 Lingui 需要 **28-34 ms**，而 Intlayer 仅需 **11-14 ms**；在所有优化设置中，源语言回退机制都会导致 **3-15%** 的英文内容泄漏到法语页面；而且要达到优化设置，必须手动按路由提取、编译和挑选目录。Intlayer 无需任何额外配置即可直接实现这些极致性能。

## 概要对比

- **Lingui** - 基于宏（`` t`...` ``、`<Trans>`、`msg`）、ICU MessageFormat 格式、`.po` / JSON 目录以及 `lingui extract` + `lingui compile` 规范工作流。将消息 ID 编译为短哈希，支持按语言环境动态加载目录。历史悠久、框架无关，围绕 `.po` 文件拥有强大的翻译工具链支持。
- **Intlayer** - 以组件为中心的内容模型。`.content.ts` 字典与所服务的组件同目录放置，构建时编译器自动按组件和语言环境进行 Tree-shaking 与延迟加载；根据内容自动生成严格的 TypeScript 类型，未翻译内容在构建时直接报错。内置中间件、SEO 辅助工具、可视化编辑器 / CMS 及 AI 辅助翻译。

| 库                    | GitHub Stars                                                                                                                                                                   | 总提交数                                                                                                                                                                           | 最后提交                                                                                                                                            | 首个版本      | NPM 版本                                                                                                            | NPM 下载量                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024 年 4 月  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | 2016 年 12 月 | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> 徽章会自动更新，快照数据随时间推移可能发生变化。

## 详细功能逐项对比

| 功能特性                                      | Intlayer (`react-intlayer` / `next-intlayer`)                               | Lingui (`@lingui/core` / `@lingui/react`)                                     |
| --------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **翻译就近组件维护**                          | ✅ 支持，`.content.ts` 与每个组件同目录放置                                 | ⚠️ 源代码通过宏内联在 JSX 中；翻译分散在集中的 `.po` 目录中                   |
| **TypeScript 深度集成**                       | ✅ 根据内容自动生成严格类型                                                 | ⚠️ 宏本身有类型，但消息 ID 无类型支持，目录缺失条目无法在编写时标出           |
| **缺失翻译检测**                              | ✅ TypeScript 报错 + 构建时错误/警告                                        | ⚠️ `lingui extract` 输出统计信息；运行时静默回退至英文原文                    |
| **富文本内容（JSX / Markdown / 组件）**       | ✅ 原生直接支持                                                             | ✅ 提供支持嵌套组件的 `<Trans>`                                               |
| **ICU 消息格式支持**                          | ⚠️ 正在演进中                                                               | ✅ 原生支持（`plural`、`select`、`selectOrdinal` 等宏）                       |
| **格式化处理（日期、数字、货币）**            | ✅ `useNumber`、`useDate` 等（底层基于 `Intl`）                             | ✅ `i18n.date()`、`i18n.number()`                                             |
| **本地化路由与中间件**                        | ✅ 内置代理/中间件，提供 `getMultilingualUrls`                              | ❌ 非核心功能，无内置方案                                                     |
| **SEO 辅助工具（hreflang、sitemap、robots）** | ✅ 内置全套开箱即用工具                                                     | ❌ 需手动实现                                                                 |
| **同步服务端组件（RSC）**                     | ✅ `next-intlayer/server` 的 `useIntlayer` 支持在任意子服务端组件中同步使用 | ⚠️ 每个请求都需要一个 `I18n` 实例，需通过 Props 层层传递或使用 `setI18n` 设置 |
| **Tree-shaking（仅打包使用内容）**            | ✅ 按组件、按语言环境，由编译器完全自动化处理                               | ⚠️ 通过 `lingui compile` 实现按语言切分；按路由切分需手动拆解目录             |
| **延迟加载（Lazy loading）**                  | ✅ `importMode: 'dynamic'`（仅需一行配置）                                  | ⚠️ 需手动 `import()` 编译后的目录并调用 `i18n.load()` / `i18n.activate()`     |
| **清理未使用内容**                            | ✅ 废弃字典在构建时自动丢弃                                                 | ✅ `lingui extract --clean` 可剔除过时消息                                    |
| **CI / 命令行缺失翻译测试**                   | ✅ `npx intlayer content test`                                              | ⚠️ `lingui extract` 提供统计（默认不返回非零退出码）                          |
| **构建流水线**                                | ✅ 单一插件即可（`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`）    | ⚠️ 需宏插件（Babel 或 SWC）加上独立的 `extract` 和 `compile` 步骤             |
| **AI 自动化翻译**                             | ✅ 内置集成，使用自备 API Key（OpenAI、Anthropic、Mistral 等）              | ❌ 无                                                                         |
| **可视化编辑器 / CMS**                        | ✅ 提供免费 Visual Editor + 可选云端 CMS                                    | ❌ 无（`.po` 文件依赖外部 TMS 平台）                                          |
| **MCP 服务端与 Agent Skills**                 | ✅ 支持                                                                     | ❌ 无                                                                         |
| **生态系统与社区成熟度**                      | ⚠️ 较年轻但发展极其迅猛                                                     | ✅ 历经长期检验，框架无关                                                     |

## 性能基准测试

### 评测标准与设置

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 测试套件使用每个库构建**完全相同的应用程序**：**10 个页面**（home, about, blog, careers, contact, FAQ, pricing, products, settings, team），**10 种语言**（`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`），组件和内容完全一致。在 `en` 和 `fr` 下进行测量。每个库最多评估四种**加载策略**：

| 加载策略           | 策略说明                                                         | 典型适用场景                 |
| ------------------ | ---------------------------------------------------------------- | ---------------------------- |
| **static**         | 所有语言环境编译后的目录一次性全量导入加载                       | 快速原型开发、AI 生成代码    |
| **dynamic**        | 仅通过 `import()` 载入当前活动语言的目录，但包含所有页面内容     | 大多数常规项目               |
| **scoped-static**  | 按路由切分目录，但在初始化时全部打包进首屏                       | 极少使用                     |
| **scoped-dynamic** | 按路由拆解目录 + 延迟 `import()`。仅下载当前页面及当前语言的内容 | 对流量和体积有严格预算的应用 |

Intlayer 无需单独的 "scoped" 变体：编译器自动**按组件维度**界定内容范围，因此其 `static` 与 `dynamic` 行本身就已经实现了按需切分。

每项构建测试均记录以下核心指标：

- **Lib size**：仅导入 i18n 库的空组件的 gzip 体积（固定运行时成本）。
- **Page JS**：每页下载的 gzip JavaScript 平均体积（在所有页面和语言中取均值）。
- **Locale leak %**：下载的 JS 中，属于用户**当前未查看**语言环境的翻译文本比例。
- **Page leak %**：下载的 JS 中，属于用户**当前未访问**页面的翻译文本比例。
- **Component avg**：每个组件单独编译时的平均 gzip 体积。
- **E2E reactivity**：从选择新语言到 DOM 中 `html[lang]` 属性完成更新的挂钟耗时（Playwright，取 5 次测试均值）。
- **Hydration**：React 水合阶段的执行耗时。

> 以下数据来自 **2026-09-12** 的评测记录，测试版本为 `@lingui/react` 6.6.0 与 `intlayer` 9.5.1。测试应用规模精简（每种语言几十个字符串），因此泄漏比例反映的是一种**结构性规律**：随着项目内容增长，泄漏量将成正比放大。

### Next.js 测试结果

| 库                  | 策略           | 库体积 (gz) | 页面 JS 平均 (gz) | 语言泄漏 | 页面泄漏 | 组件平均体积 (gz) | E2E 响应耗时 | 水合耗时 |
| ------------------- | -------------- | ----------: | ----------------: | -------: | -------: | ----------------: | -----------: | -------: |
| **base** (无 i18n)  | -              |      0.0 KB |          141.0 KB |     0.0% |     0.0% |            0.9 KB |      13.4 ms |  11.8 ms |
| Lingui              | static         |     11.9 KB |          207.4 KB |    50.0% |    90.0% |           73.3 KB |      15.3 ms |  15.2 ms |
| Lingui              | dynamic        |     11.9 KB |          145.4 KB |     2.8% |    89.9% |           19.9 KB |      15.7 ms |  12.7 ms |
| Lingui              | scoped-static  |     11.9 KB |          148.2 KB |     2.7% |    89.1% |           20.4 KB |      15.1 ms |  13.1 ms |
| Lingui              | scoped-dynamic |     11.9 KB |          148.6 KB |    14.8% |     0.0% |          152.6 KB |      16.1 ms |  14.8 ms |
| **`next-intlayer`** | static         |  **5.5 KB** |      **141.3 KB** | **0.0%** | **0.0%** |        **8.5 KB** |      15.5 ms |  16.9 ms |
| **`next-intlayer`** | dynamic        |  **5.5 KB** |      **141.3 KB** | **0.0%** | **0.0%** |        **6.9 KB** |  **15.3 ms** |  15.9 ms |

**数据深度剖析**

- **运行时固有开销。** 空组件下 Lingui 占用 11.9 KB gzip，Intlayer 仅占用 5.5 KB。整页对比中，Lingui 的最佳优化配置比 Intlayer **多出 7.3 KB**（148.6 KB 对 141.3 KB）；而 Intlayer 比没有任何 i18n 代码的 Base 应用仅增加 **0.3 KB**。
- **初级配置开销惊人。** 一次性加载所有语言目录会导致**每页达到 207.4 KB**，比基础应用剧增 66 KB。其中一半翻译属于非目标语言，90% 属于其他页面。
- **动态加载仅解决了语言切分，未解决页面级冗余。** 单一语言全量目录方案中，页面泄漏率仍徘徊在 90% 左右：无论访问哪个子页面，整个法语目录都会全量下发。Lingui 要达到 0% 页面泄漏，必须采用 `scoped-dynamic`（手动按路由抽取、编译并在页面单独挑选）。
- **源语言回退导致的固有泄漏。** 即便在最佳配置下，**仍有 3-15% 的英文原文字符串被打包到法语页面中**。这是因为 Lingui 宏保留了原文字符串作为运行时安全回退。Intlayer 在构建期便彻底解决了回退关系，客户端仅传输目标语言。
- **`scoped-dynamic` 下组件体积急剧放大。** 隔离编译下的单个组件平均体积暴增至 **152.6 KB**，因为通过导入引用，该组件将所有路由目录全都牵连了进来。而在 Intlayer 中，同样的组件使用 `useIntlayer()` 平均仅有 **6.9 KB**。

### TanStack Start 测试结果

| 库                          | 策略           | 库体积 (gz) | 页面 JS 平均 (gz) | 语言泄漏 | 页面泄漏 | 组件平均体积 (gz) | E2E 响应耗时 |    水合耗时 |
| --------------------------- | -------------- | ----------: | ----------------: | -------: | -------: | ----------------: | -----------: | ----------: |
| **base** (无 i18n)          | -              |      0.0 KB |          111.0 KB |     0.0% |     0.0% |            0.7 KB |       8.1 ms |     21.6 ms |
| Lingui                      | static         |     11.2 KB |          152.2 KB |    50.0% |    90.0% |           58.0 KB |       3.9 ms |     19.9 ms |
| Lingui                      | dynamic        |     11.2 KB |          115.2 KB |     9.3% |     0.0% |           85.5 KB |       5.9 ms |     28.0 ms |
| Lingui                      | scoped-static  |     11.2 KB |          120.8 KB |     4.0% |     0.0% |          147.9 KB |       7.1 ms |     33.9 ms |
| Lingui                      | scoped-dynamic |     11.2 KB |          120.2 KB |     8.6% |     0.0% |           83.7 KB |      42.1 ms |     32.9 ms |
| **`intlayer`**              | static         |  **5.0 KB** |      **125.8 KB** |    50.0% | **0.0%** |        **8.1 KB** |   **3.2 ms** | **11.5 ms** |
| **`intlayer`**              | dynamic        |  **5.0 KB** |      **118.6 KB** | **0.0%** | **0.0%** |        **6.3 KB** |       3.6 ms | **14.1 ms** |
| `@intlayer/lingui` (适配器) | dynamic        |     10.3 KB |          137.0 KB |     9.9% |     0.0% |           12.8 KB |   **2.9 ms** |     19.7 ms |

**数据深度剖析**

- **在单页 JS 体积上，Lingui 展现了微弱优势。** `dynamic` 策略下的 Lingui 录得 **115.2 KB**，比 Intlayer 的 118.6 KB 略少 3.4 KB。其经过哈希处理的编译目录极其紧凑，配合 TanStack Start 出色的路由拆分能力，使得其在 `dynamic` 阶段就能达到 0% 页面泄漏。
- **但在其他各项体验指标上，Intlayer 全面胜出。** 水合耗时 Lingui 需要 **28-34 ms**，而 Intlayer 仅需 **11-14 ms**：Lingui 的 `i18n.load()` + `i18n.activate()` 必须在客户端优先于 React 水合完成。单组件隔离体积 Lingui 为 **58-148 KB**，而 Intlayer 为 **6-8 KB**。由于回退机制，Lingui 的语言泄漏率始终无法归零。
- **优化配置下切换语言存在卡顿。** `scoped-dynamic` 下的 Lingui 耗时 **42 ms** 才能更新 `html[lang]`，因为新的路由目录必须经历网络请求、加载与激活才能反映在视图上。Intlayer 在两种模式下均稳定在 **3-4 ms** 极速完成。
- **Intlayer 的 `static` 模式已天然具备 0% 页面泄漏**，因为打包器只打包当前页面所渲染组件显式导入的字典。仅需增加一行配置（`importMode: 'dynamic'`）即可同时消除语言泄漏。
- **`@intlayer/lingui`** 允许开发者继续沿用 Lingui 宏语法，底层由 Intlayer 字典直接服务。它牺牲了少许整页体积（由于宏运行时驻留，为 137 KB），换取了大幅缩小的单组件（12.8 KB）和显著加快的水合速度。对于既有项目而言是非常理想的平滑升级通道。

## 根本成因剖析：两个编译器，两种不同的工作单元

两款库都引入了编译阶段。核心差异在于它们究竟**在编译什么**。

**Lingui 编译的是目录（Catalogs）。** 源代码中的宏被提取到单语言的 `.po` 文件中，继而被编译为单语言的 JS 模块。它的工作单元是**语言环境整体（Locale）**。若想进一步细分（按路由或组件），就必须创建多个目录，并在 `lingui.config.ts` 中精细配置规则，手动控制每个路由的加载行为。其 `I18n` 实例是全局唯一的，每一个 `useLingui()` 都会将组件牢牢绑定在这个全局实例上。

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compile 产物
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer 编译的是字典（Dictionaries）。** 每个 `.content.ts` 文件都是一个绑定到特定键的独立字典。编译器自动分析哪个组件导入了哪个键，并在字典及语言两个维度精确产出该组件所必需的 JSON。它的工作单元是**组件（Component）**。路由级隔离只是自然产生的结果：一个页面只会请求所渲染组件的字典。

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

这也是为什么 `scoped-dynamic` 模式在 Intlayer 中是自动生成的底层产物，而在 Lingui 中则是一项复杂的工程配置项目。

> 若要复现 `dynamic` 行的性能指标，只需在 `intlayer.config.ts` 中声明 `dictionary.importMode: 'dynamic'`。详见 [打包优化文档](https://intlayer.org/zh/doc/concept/bundle-optimization)。

## 开发者体验对比 (DX)

### 基础初始化

**Lingui**

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

随后需在打包器中接入 `@lingui/babel-plugin-lingui-macro`（或 `@lingui/swc-plugin`），在源码更改后运行 `lingui extract`，在应用构建前运行 `lingui compile`，并使用 `<I18nProvider i18n={i18n}>` 嵌套根视图。

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

在 `vite.config.ts` 中加入 `intlayer()`（在 Next.js 中使用 `withIntlayer()`），再用 `<IntlayerProvider>` 包裹组件树。无需独立的提取或编译命令行操作：启动打包器时字典自动完成编译。

### 组件内编写

**Lingui**

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

英文文本直接书写在组件内；法语翻译由 `lingui extract` 提取到 `src/locales/fr/messages.po` 的哈希键下。如果开发者遗漏了提取或编译步骤，界面将静默显示英文原文。

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
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

各语言配置统一存放在组件同级的单文件内。缺少 `fr` 内容会引发编译阻断，输入错误键名会立刻收到 TypeScript 的错误提示。

### 组件树之外的环境

如路由元数据、加载器（loaders）、服务端执行函数等非 React 树环境。

**Lingui**

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

每次调用都需重新实例化 `I18n`，手动导入正确的目录，并必须采用 `msg` + `i18n._()` 而不能直接写 `t`。正如 [基准测试记录](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) 所指出的，判断何时该使用 `t`、`` t` ` ``、`i18n.t()`、`msg` 还是 `<Trans>`，非常不够直观。

**Intlayer**

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

## 保留 Lingui 宏，接入 Intlayer 字典

`@intlayer/lingui` 是针对 `@lingui/core` 和 `@lingui/react` 的无缝兼容适配器。宏依然照常编译，底层调用的 `i18n._()` 直接由 Intlayer 字典提供支撑，同时配套的 `.po` 同步插件依然将现有目录视作单一事实来源。ICU 复数与条件分支渲染效果完全一致。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

构建流水线中保留 `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin`，确保其在 Intlayer 编译器之前执行。参阅 [Lingui 兼容适配器文档](https://intlayer.org/zh/doc/compatibility/lingui)。

## 该如何做出选型抉择？

- **选择 Lingui 的场景**：如果你深度依赖 **ICU MessageFormat** 与强类型宏，翻译团队已高度绑定于基于 **`.po`** 的专业 TMS 协作管线，喜欢在 JSX 内直接编写源码字符串，且团队有成熟能力自管提取、编译和目录拆分工作流。配置好延迟加载后，其单页体积具备极佳的竞争力。
- **选择 Intlayer 的场景**：如果你追求**组件级内聚内容**、**严格的 TypeScript 约束**、**构建期未翻译键自动报错**、**零配置全自动 Tree-shaking 与按需加载**、轻巧的单组件体积、闪电般的水合响应、瞬时语言切换，以及一整套现代内置协作套件（Visual Editor、CMS、AI 辅助翻译、MCP 服务端）。在大型模块化项目和设计系统中优势格外显著。
- **选择 `@intlayer/lingui` 的场景**：如果你已有庞大的 Lingui 项目，并希望在不重构既有宏代码的前提下，平滑、渐进式地拥抱 Intlayer 字典架构。

## 相关对比评测

- [next-intl vs Intlayer](https://intlayer.org/zh/blog/next-intl-vs-intlayer)（同一基准测试）
- [i18next vs Intlayer](https://intlayer.org/zh/blog/i18next-vs-intlayer)（同一基准测试）
- [vue-i18n vs Intlayer](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-benchmark)（同一基准测试）
- [编译器型与声明式 i18n 理念对比](https://intlayer.org/zh/blog/compiler-vs-declarative-i18n)

## GitHub 星标发展历程

GitHub Star 是直观体现项目受欢迎程度、社区信赖度以及长期活力的风向标。尽管星标数不直接等同于技术优劣，但它生动反映了有多少开发者认可并乐于在项目中采纳该方案。

[![星标历史趋势图](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## 总结

Lingui 毫无疑问是本次评测中最为强劲的“运行时+编译器”混合型库。其高度精简且哈希化的编译目录，使其单页 JavaScript 体积紧追 Intlayer，在 TanStack Start 上甚至实现了微弱的反超。如果仅仅把每页纯代码大小当成唯一指标，两者几乎可以打成平手。

但综合体验并非仅此一项。Lingui 的编译局限在语言环境这一级；其下的所有性能优化（按路由细分、延迟加载、剔除回退字符串）全部转嫁给了开发者的手动工程配置。基准测试清晰展现了这种边界所付出的代价：**组件体积放大 10-20 倍**、**水合变慢 2-3 倍**、**3-15% 无法根除的语言泄漏**，以及优化模式下 **42 ms** 的语言切换停顿。而 Intlayer 的编译器在组件粒度上展开工作，使得这些指标无需任何繁琐设置就能原生达到 **6-8 KB**、**11-14 ms**、**0%** 与 **3-4 ms** 的极致体验。

所有的原始测试数据、测试应用与执行脚本均已在 [Benchmark Bloom 代码仓库](https://github.com/intlayer-org/benchmark-bloom) 中完整开源。欢迎亲自克隆并运行验证。

欲了解更多设计哲学，请参阅 [“为什么选择 Intlayer？”文档](https://intlayer.org/zh/doc/why)。
