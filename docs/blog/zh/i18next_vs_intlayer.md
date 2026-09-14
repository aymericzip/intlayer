---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs Intlayer: 2026年基准测试与深度对比"
description: "在 Next.js 和 TanStack Start 上对比评测 react-i18next、next-i18next 与 Intlayer。涵盖打包体积、多余内容泄露、语言切换响应速度及开发体验。"
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - 国际化
  - i18n
  - 基准测试
  - 打包体积
  - 博客
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | React & Next.js 国际化 (i18n) 基准测试对比

`i18next` 是 JavaScript 生态中最广泛使用的国际化（i18n）框架。通过 `react-i18next` 和 `next-i18next`，它为大量的 React 和 Next.js 应用提供支持。Intlayer 则是基于编译器、按组件作用域划分的现代化替代方案。

本文基于实测数据而非功能清单进行对比。所有数据均来自 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)，这是一个开源基准测试套件，它使用每个库构建完全相同的应用，并精确记录浏览器实际下载的内容。

<TOC/>

> **核心结论 (tl;dr)**: 在本次基准测试中，`i18next` 是最重的运行时: 在朴素配置的 Next.js 应用中，每页增加 **+77 KB gzip**；在完成完整的命名空间与懒加载优化后，仍增加 **+22 KB**。而 Intlayer 仅增加 **+0.3 KB**。除完全隔离作用域的配置外，所有 `i18next` 配置都会**泄露约 90% 的其他页面翻译文本**；Intlayer 默认保持 **0%** 泄露。使用懒加载后端时，`react-i18next` 的语言切换耗时为 **123-185 ms**，而 Intlayer 仅需 **3-4 ms**。`@intlayer/next-i18next` 适配器保持了 `i18next` API 不变，页面体积从原版的 **218.5 KB** 降至 **150.7 KB**。

## 简要概括

- **i18next / react-i18next / next-i18next** - 成熟、插件丰富、与框架解耦。支持命名空间、语言检测器、后端加载器、ICU 插件、富文本 `<Trans>` 组件。翻译内容集中存放在 `locales/{lng}/{ns}.json`。功能强大，但所有优化（命名空间拆分、按需按页加载、类型安全）都需要开发者手动配置和长期维护。
- **Intlayer** - 以组件为核心的内容模型。`.content.ts` 字典文件与组件存放在一起，构建期编译器自动按组件和语言进行 Tree-shaking 和按需懒加载，从内容直接生成严格的 TypeScript 类型，缺失翻译会在构建时报错。自带中间件、SEO 工具函数、可视化编辑器 / CMS 以及 AI 辅助翻译。

| 库                      | GitHub Stars                                                                                                                                                                       | 总提交数                                                                                                                                                                               | 最近提交                                                                                                                                                | 首个版本   | NPM 版本                                                                                                              | NPM 月下载量                                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | 2024年4月  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | 2012年1月  | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | 2015年12月 | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | 2018年11月 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> 徽章数据自动更新，快照数据会随时间发生变化。

## 详细功能对比

| 功能特性                                     | Intlayer (`react-intlayer` / `next-intlayer`)                                   | i18next (`react-i18next` / `next-i18next`)                         |
| -------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **翻译与组件就近存放**                       | ✅ 支持，`.content.ts` 与对应组件存放在同级目录                                 | ❌ 不支持，集中在 `locales/{lng}/{ns}.json`                        |
| **TypeScript 类型集成**                      | ✅ 根据实际内容自动生成严格类型                                                 | ⚠️ 基础支持；严格类型需扩展 `CustomTypeOptions` 并手动定义资源类型 |
| **缺失翻译检测**                             | ✅ TypeScript 报错 + 构建期错误/警告                                            | ⚠️ 运行时回退（`saveMissing`，返回原 key）                         |
| **富文本支持 (JSX / Markdown / 自定义组件)** | ✅ 原生直接支持                                                                 | ⚠️ 使用带数字占位符的 `<Trans>`                                    |
| **ICU 消息格式**                             | ⚠️ 开发中                                                                       | ⚠️ 需引入插件（`i18next-icu`）                                     |
| **复数形式 (Pluralization)**                 | ✅ 基于枚举的声明模式                                                           | ✅ `_one` / `_other` 后缀（基于 Intl.PluralRules）                 |
| **格式化 (日期、数字、货币)**                | ✅ `useNumber`, `useDate` 等（底层基于标准 Intl）                               | ⚠️ 插值格式化器或手动调用 `Intl.*`                                 |
| **本地化路由与中间件**                       | ✅ 内置代理/中间件支持，`getMultilingualUrls`                                   | ⚠️ 核心库不包含；需自定义中间件或依赖第三方库                      |
| **SEO 工具函数 (hreflang, sitemap, robots)** | ✅ 内置提供                                                                     | ❌ 需手动实现                                                      |
| **同步服务端组件 (RSC)**                     | ✅ `next-intlayer/server` 中的 `useIntlayer` 可在任何子服务端组件中直接同步调用 | ⚠️ 需在顶层页面调用 `getFixedT`，然后通过 Props 逐层向下传递 `t`   |
| **Tree-shaking (仅打包当前使用的翻译)**      | ✅ 按组件、按语言自动由编译器精准分析                                           | ⚠️ 需手动拆分命名空间 + 每页维护 `ns` 列表 + 配置后端              |
| **按需懒加载 (Lazy Loading)**                | ✅ `importMode: 'dynamic'`（仅需一行配置）                                      | ✅ 需配置后端插件（`i18next-resources-to-backend` 等）             |
| **无用内容清理 (Purge)**                     | ✅ 构建时自动剔除未被任何组件引用的字典                                         | ❌ 无内置支持                                                      |
| **缺失翻译测试 (CLI / CI)**                  | ✅ `npx intlayer content test`                                                  | ⚠️ 依赖 `i18next-parser` 或第三方工具                              |
| **AI 辅助翻译**                              | ✅ 内置集成，支持配置个人 API 密钥（OpenAI、Claude、Gemini 等）                 | ❌ 无（Locize 为独立收费平台）                                     |
| **可视化编辑器 / CMS**                       | ✅ 提供免费可视化编辑器 + 可选 CMS                                              | ❌ 无（依赖 Locize 等外部平台）                                    |
| **MCP 服务器与 Agent Skills**                | ✅ 原生支持                                                                     | ❌ 不支持                                                          |
| **生态成熟度与社区规模**                     | ⚠️ 较新但增长迅速                                                               | ✅ 生态最成熟、规模最庞大                                          |

## 基准测试评测

### 测试环境与度量标准

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 测试套件使用每种技术栈构建**完全相同的应用**: **10 个页面**（首页、关于、博客、招聘、联系、常见问题、定价、产品、设置、团队），**10 种语言**（`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`），完全相同的组件结构与内容。页面测试针对 `en` 和 `fr`。每个库均实现了最多四种**加载策略**:

| 加载策略           | 策略说明                                                          | 常见使用场景                   |
| ------------------ | ----------------------------------------------------------------- | ------------------------------ |
| **static**         | 所有语言和页面的翻译一次性打包（`init()` 中直接内嵌 `resources`） | 快速原型验证、AI 生成的代码    |
| **dynamic**        | 仅通过后端按需加载当前语言，但一次性加载该语言的所有命名空间      | 大多数日常项目                 |
| **scoped-static**  | 每个路由独立一个命名空间，但所有路由的内容预先打包在主包中        | 极少数项目                     |
| **scoped-dynamic** | 路由级别命名空间拆分 + 后端懒加载。仅下载当前页面、当前语言的内容 | 具备严格前端性能预算的大型应用 |

Intlayer 无需独立的 "scoped" 策略: 编译器会自动**以组件为粒度**进行作用域隔离，因此其 `static` 和 `dynamic` 策略本身已具备极致的作用域精简。

基准测试采集以下核心指标:

- **Lib size**: 仅导入 i18n 库的空组件 gzip 体积，代表运行时的固定引入成本。
- **Page JS**: 每页平均下载的 JavaScript gzip 体积（跨所有页面与语言的平均值）。
- **Locale leak %**: 下载的 JS 中，属于用户**未**访问语言的翻译字符占比。
- **Page leak %**: 下载的 JS 中，属于用户**未**处于当前页面的翻译字符占比。
- **Component avg**: 单独编译单个组件时的平均 gzip 体积。
- **E2E reactivity**: 在页面中切换语言后，DOM 中 `html[lang]` 完成更新的真实时间（Playwright 测试 5 次取平均）。
- **Hydration**: React 客户端水合（Hydration）阶段所耗费的时间。

> 以下数据来自 **2026-09-12** 的基准运行，测试版本为 `next-i18next` 16.3.0、`react-i18next` 17.0.13 和 `intlayer` 9.5.1。测试应用体积适中，因此泄露比例反映的是**架构模式**: 随着业务文本的增长，泄露量将成倍上升，而运行时固定成本保持不变。

### Next.js 平台测试结果 (`next-i18next`)

| 方案                              | 策略           | 库体积 (gz) | 页面平均 JS (gz) | 语言泄露率 | 页面泄露率 | 组件平均体积 (gz) | 端到端响应时间 | 水合耗时 |
| --------------------------------- | -------------- | ----------: | ---------------: | ---------: | ---------: | ----------------: | -------------: | -------: |
| **base** (无 i18n)                | -              |      0.0 KB |         141.0 KB |       0.0% |       0.0% |            0.9 KB |        13.4 ms |  11.8 ms |
| `next-i18next`                    | static         |     19.7 KB |         218.5 KB |       0.0% |      89.8% |           78.5 KB |        16.4 ms |  15.6 ms |
| `next-i18next`                    | dynamic        |     19.7 KB |         169.5 KB |      50.0% |      89.8% |           26.1 KB |        15.4 ms |  27.7 ms |
| `next-i18next`                    | scoped-static  |     19.7 KB |         220.1 KB |       0.0% |      89.8% |           78.9 KB |        16.4 ms |  14.7 ms |
| `next-i18next`                    | scoped-dynamic |     19.7 KB |         163.4 KB |       0.0% |       0.0% |           27.1 KB |        15.9 ms |  15.1 ms |
| **`next-intlayer`**               | static         |  **5.5 KB** |     **141.3 KB** |   **0.0%** |   **0.0%** |        **8.5 KB** |    **15.5 ms** |  16.9 ms |
| **`next-intlayer`**               | dynamic        |  **5.5 KB** |     **141.3 KB** |   **0.0%** |   **0.0%** |        **6.9 KB** |    **15.3 ms** |  15.9 ms |
| `@intlayer/next-i18next` (兼容层) | static         |      9.4 KB |         150.7 KB |       0.0% |       0.0% |            9.7 KB |        10.7 ms |  11.3 ms |
| `@intlayer/next-i18next` (兼容层) | dynamic        |      9.4 KB |         150.7 KB |       0.0% |       0.0% |            9.7 KB |        11.9 ms |  10.6 ms |

**测试结果深度解读**

- **运行时成本**: `i18next` 核心加上 `react-i18next` 是本次评测中最重的运行时: 空组件占用 **19.7 KB gzip**，而 `next-intlayer` 仅为 5.5 KB。
- **初学者配置代价高昂**: 在 `init()` 中直接内联 `resources` 会导致**每页达到 218.5 KB**，比基础无 i18n 应用多出整整 +77.5 KB，每个页面都在携带所有命名空间。
- **深度优化的维护成本极高**: 使用后端动态加载（`dynamic`）能节省 49 KB，但**依然泄露 90% 的异地页面文本**，且在该配置下有一半的文本属于其他语言。只有在此基础上进一步配置路由级命名空间（`scoped-dynamic`）才能彻底消除泄露，体积降至 **163.4 KB**，但仍然比零配置的 Intlayer（141.3 KB）**每页多出 22.4 KB**。
- **组件级打包体积**: 调用 `useTranslation()` 的组件打包体积在 26 到 79 KB 之间；而使用 `useIntlayer()` 的相同组件仅需 6.9 KB。
- **水合延迟**: 在 `dynamic` 配置下，水合耗时飙升至 27.7 ms，这是因为客户端在 React 启动水合之前，i18next 实例必须完成初始化并解析后端。

### TanStack Start 平台测试结果 (`react-i18next`)

为了排除 Next.js 平台特有机制的影响，在 TanStack Start 上直接运行纯粹的 `react-i18next`:

| 方案               | 策略           | 库体积 (gz) | 页面平均 JS (gz) | 语言泄露率 | 页面泄露率 | 组件平均体积 (gz) | 端到端响应时间 | 水合耗时 |
| ------------------ | -------------- | ----------: | ---------------: | ---------: | ---------: | ----------------: | -------------: | -------: |
| **base** (无 i18n) | -              |      0.0 KB |         111.0 KB |       0.0% |       0.0% |            0.7 KB |         8.1 ms |  21.6 ms |
| `react-i18next`    | static         |     18.4 KB |         180.3 KB |      50.0% |      89.8% |           24.3 KB |        12.9 ms |  85.1 ms |
| `react-i18next`    | dynamic        |     18.4 KB |         136.4 KB |      23.1% |      89.8% |           24.8 KB |       123.1 ms |  32.9 ms |
| `react-i18next`    | scoped-static  |     18.4 KB |         184.2 KB |      50.7% |      89.8% |           25.3 KB |       185.1 ms |  25.2 ms |
| `react-i18next`    | scoped-dynamic |     18.4 KB |         127.2 KB |       0.0% |       0.0% |           26.7 KB |        17.6 ms |  11.3 ms |
| **`intlayer`**     | static         |  **5.0 KB** |     **125.8 KB** |      50.0% |   **0.0%** |        **8.1 KB** |     **3.2 ms** |  11.5 ms |
| **`intlayer`**     | dynamic        |  **5.0 KB** |     **118.6 KB** |   **0.0%** |   **0.0%** |        **6.3 KB** |     **3.6 ms** |  14.1 ms |

**测试结果深度解读**

- 朴素 `react-i18next` 应用相比基础应用**每页增加 +69 KB**，水合耗时高达 **85 ms**（是基础应用的 4 倍），因为在首屏渲染之前，客户端需要解析并注册整个资源树。
- **语言切换暴露了懒加载的固有网络延迟**: 当资源依赖后端按需拉取时，切换语言必须经历网络往返才能完成 `html[lang]` 属性的更新: `dynamic` 需 **123 ms**，`scoped-static` 需 **185 ms**。而 Intlayer 在两种模式下均只需 **3-4 ms**，DOM 更新瞬间完成，绝不受网络请求阻塞。
- 经过复杂手工优化的 `scoped-dynamic` 虽然将体积压缩到了 127.2 KB，但仍比 Intlayer 的 `dynamic` 配置**重 8.6 KB**，并且为此必须在每个路由配置路由映射、资源加载器和 Suspense 边界。
- Intlayer 的 `static` 策略已默认具备 **0% 页面泄露**，因为仅打包当前页面组件显式导入的字典。若开启 `importMode: 'dynamic'`，更可彻底杜绝语言层面的泄露。
- **组件体积差异**: `react-i18next` 单组件占用 24-27 KB，而 Intlayer 仅为 6-8 KB。因为 `useTranslation()` 会将每个组件与全局 i18next 实例绑定。

## 为什么差距如此悬殊？全局实例模式 vs 编译时字典

`i18next` 最初于 2012 年设计为纯运行时架构: 全局单一实例维护资源仓库，各种插件对其进行扩展，并在组件渲染时通过 `t()` 查找键名。这种设计赋予了它极高的通用性（支持任何框架、后端与文件格式），但也是其性能开销的根源:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # 必须明确知道该页面依赖 ["common", "about"]
```

全局实例在运行时无法预知某个组件到底会请求哪些键，因此只能加载开发者预先指定的整个命名空间。优化意味着**开发者必须**手动拆分翻译文件为命名空间、**必须**在每个页面手动枚举所需命名空间，并且在组件移动或重构时**必须**手动同步这一映射清单。正如[基准测试总结](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md)所言: “在保证类型安全的同时，精确维护每个页面需要哪些命名空间简直是一场噩梦”。

Intlayer 彻底抛弃了全局实例模式。翻译内容直接声明在组件同级，编译器在构建阶段直接解析依赖图谱:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` 可以精确识别哪个组件引用了哪个字典，仅针对当前激活的语言按需打包这些字典，并彻底剔除无用文本。"scoped-dynamic" 这种极其理想的加载模式成为构建工具的自动化产物，而不是团队必须手工遵守的开发负担。

> 若要复现 `dynamic` 行的数据，只需在 `intlayer.config.ts` 中声明 `dictionary.importMode: 'dynamic'`。详见[打包优化文档](https://intlayer.org/zh/doc/concept/bundle-optimization)。

## 开发者体验对比 (DX)

### 初始化配置

**next-i18next (App Router)**

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

此外还需要编写客户端 `I18nProvider`，配置 `generateStaticParams`，并在每个页面显式指定 `namespaces` 数组。

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

### 客户端组件开发

**react-i18next**

```json fileName="src/locales/en/about.json"
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
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> 渲染该组件的页面必须确保预加载了 `about` 命名空间，且除非扩展 `CustomTypeOptions`，否则 `t("counter.label")` 只是无类型保护的普通字符串。

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

`label` 和 `increment` 拥有完全严格的自动类型推导；输错字段名会直接触发 TypeScript 编译报错，如果缺少法语翻译则会在构建时立即拦截。

### 同步服务端组件 (RSC)

**next-i18next**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

顶层页面必须先调用 `i18n.getFixedT(locale, "about")`，然后通过 Props 将 `t` 和 `locale` 逐层传递给子组件。

**Intlayer**

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

## 保留 i18next API，直接享受 Intlayer 的极致性能

你不必重写所有组件也能享受上述基准测试中的性能红利。`@intlayer/i18next`、`@intlayer/react-i18next` 和 `@intlayer/next-i18next` 提供了即插即用的兼容适配器: 代码中现有的 `useTranslation`、`t()`、`<Trans>`、`{{interpolation}}`、复数形式与上下文后缀均可无缝工作，底层则由 Intlayer 编译器自动优化并按需分发字典。

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

在基准测试中，基于适配器构建的同一 Next.js 应用在业务代码完全未改动的前提下，页面体积从 **218.5 KB 降至 150.7 KB**，单组件平均体积从 **78.5 KB 降至 9.7 KB**，页面内容泄露率从 **~90% 直降至 0%**，水合时间由 15.6 ms 缩短至 11.3 ms。通过 JSON 同步插件，你现有的 `locales/{lng}/{ns}.json` 仍然可以作为唯一事实来源继续使用。

详见迁移指南: [i18next](https://intlayer.org/zh/doc/migration/i18next), [react-i18next](https://intlayer.org/zh/doc/migration/react-i18next), [next-i18next](https://intlayer.org/zh/doc/migration/next-i18next)。

## 如何做出选择？

- **选择 i18next**: 如果你的应用极度依赖其庞大的插件生态（特定语言检测器、特殊后端、ICU、Locize 等），需要在 React 之外（如 Node.js 后端服务、原生 JS 或其他前端框架）统一国际化方案，团队成员已有深度积累，或者外部翻译平台硬性要求使用 `locales/{lng}/{ns}.json` 目录结构。若追求性能，需预留充足精力维护命名空间与页面加载清单。
- **选择 Intlayer**: 如果你追求**就近组织组件文本**、**严苛的 TypeScript 类型安全**、**构建期漏翻即时报错**、**零配置自动 Tree-shaking 与按需懒加载**、瞬时语言切换、原生同步服务端组件支持以及开箱即用的可视化编辑器 / CMS / AI 翻译工具流。在大型复杂模块化项目及设计系统中表现尤为出色。
- **选择 `@intlayer/*-i18next` 适配器**: 如果你已经在运行大型 i18next 项目，并希望零成本获取打包体积缩减与响应速度提升。

## 相关对比

- [next-intl vs Intlayer](https://intlayer.org/zh/blog/next-intl-vs-intlayer) (同一基准测试)
- [Lingui vs Intlayer](https://intlayer.org/zh/blog/lingui-vs-intlayer) (同一基准测试)
- [vue-i18n vs Intlayer 评测](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-benchmark) (同一基准测试)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/zh/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/zh/blog/react-i18next-vs-react-intl-vs-intlayer)
- [i18next 已经过时了吗？](https://intlayer.org/zh/blog/is-i18next-outdated)

## GitHub 关注度趋势 (STARs)

GitHub Stars 是衡量开源项目普及度、社区信赖度以及长期活力的直观指标。它虽不完全等同于代码质量，但清晰反映了全球开发者的关注热度与生产采纳意向。

[![Star 历史趋势图](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## 总结

`i18next` 赢得了属于它的行业地位: 跨平台通用，插件应有尽有，且经过了十多年的稳定维护。然而基准测试揭示了以运行时为中心的设计所带来的高昂代价。常规配置会让页面增加 **+70-77 KB gzip**，**泄露约 90% 的异地内容**，且通过懒加载切换语言需要 **100 ms 以上**。尽管通过严苛的人工优化可以解决泄露，但这需要建立路由与命名空间的手动映射表，且最终体积依然比 Intlayer **重 9-22 KB**。

Intlayer 将繁杂的优化任务全部转移至编译器完成。组件级独立字典、按语言懒加载以及死文本剔除完全是编译阶段的自动产物。在相同的应用中，它带来了: **页面仅增加 +0.3 KB**、**0% 冗余泄露**、组件体积**缩小 3-10 倍**、语言切换仅需 **3-4 ms**。

所有原始测试数据、测试用例与自动化脚本均公开在 [Benchmark Bloom 仓库](https://github.com/intlayer-org/benchmark-bloom)。欢迎亲自克隆并复现。

了解更多架构优势，请参阅 ['Why Intlayer?' 文档](https://intlayer.org/zh/doc/why)。
