---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next vs @intlayer/i18next：相同的 API，截然不同的 Bundle"
description: 当 React 或 Next.js 应用保持其 i18next、react-i18next 和 next-i18next 调用不变，但改由 @intlayer/i18next 适配器提供服务时会发生什么变化。基于同一套代码测量的每页 JavaScript 体积、组件大小、文本泄漏与水合性能，以及适配器保留、忽略和无法替代的功能。
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - 兼容适配器
  - 迁移
  - 国际化
  - i18n
  - 基准测试
  - Bundle 大小
  - 博客
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | 相同的 API，截然不同的 Bundle

`@intlayer/i18next`、`@intlayer/react-i18next` 和 `@intlayer/next-i18next` 是兼容适配器。它们暴露了你的代码已经在使用的 `i18next` API（`useTranslation`、`t()`、`<Trans>`、`i18n.changeLanguage()`、`getFixedT`、`serverSideTranslations` 等），并通过 Intlayer 编译好的字典来提供数据。组件不需要做任何更改，只是其底层的运行时发生了改变。

本文在同一个 Next.js 应用程序上对比了这种替换：一次使用 `next-i18next` 构建，另一次使用 `@intlayer/next-i18next` 构建。测试数据来源于 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)。如需对比作为独立库的 `i18next` 与 Intlayer，请阅读 [i18next vs Intlayer](https://intlayer.org/zh/blog/i18next-vs-intlayer)。本文则专注于：当你保持原有代码不变时，适配器带来了哪些实际变化。

<TOC/>

> **核心摘要 (tl;dr)**：在同一个 Next.js 应用中，将 `next-i18next` 替换为 `@intlayer/next-i18next` 后，每页传输的 gzip JavaScript 体积从 **218.5 KB 降至 150.7 KB**（朴素初始配置），甚至比深度手动优化的 `next-i18next` 配置（163.4 KB）还要小 **12.7 KB**。组件平均大小从 **78.5 KB 骤降至 9.7 KB**，跨页无关文本泄漏从 **~90% 归零至 0%**，水合时间从 **15.6 ms 缩短至 11.3 ms**，运行时体积从 **19.7 KB 降至 9.4 KB**。无需修改任何组件代码，只需替换一个 Provider 文件。`i18next` 插件（后端加载器、语言检测器）被允许传入但不会执行任何逻辑：因为运行时已经没有任何多余内容需要加载或检测。

## 什么是 `@intlayer/i18next`

`i18next` 是一个重运行时架构。`i18n.init({ resources })` 或后端插件将 `locales/{lng}/{ns}.json` 加载到全局单例中；`useTranslation("about")` 让组件订阅该单例；`t("title")` 在渲染时按键查找文本。命名空间拆分、按需懒加载、页面级命名空间列表以及类型安全，全部需要开发者手动配置与维护。

适配器完整保留了 API，但彻底替换了底层的全局单例模式：

1. **导入路径别名化。** `@intlayer/next-i18next/plugin` 中的 `createNextI18nPlugin()`（或 `withI18next`）包装了 `withIntlayer`，并注入 Webpack / Turbopack 别名，使 `next-i18next`、`react-i18next` 和 `i18next` 自动解析到对应的 `@intlayer/*` 模块。在 Vite 上，`@intlayer/react-i18next/plugin` 中的 `reactI18nextVitePlugin()` 执行相同的重定向。无需重命名代码中的任何 import 语句。
2. **JSON 作为唯一真实数据源。** `syncJSON` 插件以 `format: "i18next"` 读取你现有的 `locales/{lng}/{ns}.json` 文件（确保 `{{name}}`、`$t()` 嵌套、`_one` / `_other` 与上下文后缀被正确解析），并在 CLI 或 CMS 更改文本时将翻译同步写回文件。
3. **调用点精准绑定。** Intlayer 的编译优化通道会将 `useTranslation("about")` 重写为一个直接接收当前语言环境对应 `about` 字典的调用。组件彻底摆脱了对全局 Store 的依赖。

```tsx fileName="components/About.tsx"
// 你的业务代码，原封不动
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="编译器生成的代码（概念简化展示）"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

正是这种编译时重写，使得组件体积与页面级文本泄漏数据在下文中展现出飞跃性的改善。

## 适配器保留、忽略与无法替代的特性清单

| `i18next` API                                                                   | 搭配 `@intlayer/*` 时的状态                                                                           |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ 完整保留。构建期自动绑定到 `ns` 字典；键名根据实际内容提供精准 TypeScript 类型推导                 |
| `t("key", { name })`, `{{interpolation}}`, `$t(key)` 嵌套                       | ✅ 完整保留                                                                                           |
| `key_one` / `key_other` 复数形式、`key_male` 上下文、`returnObjects`            | ✅ 完整保留。复数规则通过原生 `Intl.PluralRules` 运算                                                 |
| 带有 `components`、`<1>...</1>` 编号标签和 `values` 的 `<Trans>`                | ✅ 完整保留                                                                                           |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ 完整保留                                                                                           |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ 完整保留。`changeLanguage` 直接驱动 Intlayer 的语言切换                                            |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ 完整保留                                                                                           |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` 调用插件的 `init` 后直接返回；后端与检测器无多余内容需要加载或检测                         |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` 参数会被**直接忽略**并在开发环境输出警告；需移除 JSON 硬编码导入以获得 Bundle 缩减红利 |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ 内部渲染 `IntlayerProvider`；`i18n` 属性被忽略。在 App Router 中直接传递 locale（详见下文）        |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ 返回预期的对象结构但无需额外加载。保留无害，删除亦可                                               |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ 完整保留                                                                                           |
| `next-i18next.config.js`                                                        | ⚠️ 不会被读取。所有语言环境配置统一收敛至 `intlayer.config.ts`                                        |
| 不传命名空间的裸 `useTranslation()` 调用                                        | ✅ 自动绑定到全量 `translation` 字典（`splitKeys: false`）                                            |

## 基准性能测试

### 测试环境与度量标准

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 测试套件在每种方案下构建了**完全相同的应用**：包含 **10 个页面**（首页、关于、博客、招聘、联系、常见问题、定价、产品、设置、团队），涵盖 **10 种语言**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`），组件与内容保持绝对一致。指标在 `en` 与 `fr` 页面上进行基准采集。

`next-i18next` 测试了四种加载策略：从全语言 JSON 静态打包进 `resources`（`static`），到按路由拆分命名空间并通过后端动态懒加载（`scoped-dynamic`）。适配器则运行在**与朴素初学者方案完全一致的组件代码**上，仅更新了 `next.config.ts`、`intlayer.config.ts` 和 Provider 包装。无需任何人工的 "scoped" 繁琐配置：编译器天然支持组件级作用域隔离。

每个构建版本记录的关键指标如下：

- **Lib 大小**：仅引入 i18n 基础库的空白组件的 gzip 大小。
- **每页 JS 均值**：跨所有页面和语言环境下，页面实际下载的 gzip JavaScript 平均体积。
- **语言包泄漏率 (Locale leak %)**：下载的 JS 中，属于用户**未选择浏览**的其它语言字符串所占的比例。
- **跨页文本泄漏率 (Page leak %)**：下载的 JS 中，属于用户**当前未访问**的其它页面文本所占的比例。
- **组件平均体积**：独立打包各组件时的平均 gzip 体积。
- **E2E 交互响应耗时**：从选择新语言到 DOM 中 `html[lang]` 完成更新的实际耗时（Playwright 测量，5 次循环平均）。
- **水合时间 (Hydration)**：React 客户端水合完成所耗费的毫秒数。

> 以下数据来源于 **2026-09-12** 的测试基准，采用 `next-i18next` 16.3.0（`react-i18next` 17.0.13, `i18next` 26.4.2）与 `@intlayer/next-i18next` 9.5.1。测试应用体积适中，因此泄漏比例揭示的是一种**宏观规律**：随着项目业务文本膨胀，泄漏的数据量会成倍增长，而运行时的固定开销则基本恒定。

### Next.js 平台对比数据

| 方案                         | 加载策略       | Lib 体积 (gz) | 每页 JS 均值 (gz) | 语言泄漏率 | 跨页泄漏率 | 组件均值 (gz) | E2E 响应耗时 |    水合耗时 |
| ---------------------------- | -------------- | ------------: | ----------------: | ---------: | ---------: | ------------: | -----------: | ----------: |
| **base** (无 i18n)           | -              |        0.0 KB |          141.0 KB |       0.0% |       0.0% |        0.9 KB |      13.4 ms |     11.8 ms |
| `next-i18next`               | static         |       19.7 KB |          218.5 KB |       0.0% |      89.8% |       78.5 KB |      16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |       19.7 KB |          169.5 KB |      50.0% |      89.8% |       26.1 KB |      15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |       19.7 KB |          220.1 KB |       0.0% |      89.8% |       78.9 KB |      16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |       19.7 KB |          163.4 KB |       0.0% |       0.0% |       27.1 KB |      15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |    **9.4 KB** |      **150.7 KB** |   **0.0%** |   **0.0%** |    **9.7 KB** |  **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |    **9.4 KB** |      **150.7 KB** |   **0.0%** |   **0.0%** |    **9.7 KB** |  **11.9 ms** | **10.6 ms** |
| `next-intlayer` (原生)       | static         |        5.5 KB |          141.3 KB |       0.0% |       0.0% |        8.5 KB |      15.5 ms |     16.9 ms |
| `next-intlayer` (原生)       | dynamic        |        5.5 KB |          141.3 KB |       0.0% |       0.0% |        6.9 KB |      15.3 ms |     15.9 ms |

**深度数据解读**

- **相比朴素配置，每页立省 68 KB。** 在朴素配置中，`resources: { en, fr, ... }` 将所有语言和所有命名空间捆绑到每个页面，体积高达 **218.5 KB**。而在相同业务代码下接入适配器后，体积直接降至 **150.7 KB**。它甚至击败了 `next-i18next` 经过繁琐深度优化的最佳方案（163.4 KB）达 12.7 KB，因为仅 `i18next` 运行时本身就占据了 19.7 KB，而适配器仅占 9.4 KB。
- **无需改动业务组件，直接实现 0% 泄漏。** 除深度人工切分的方案外，`next-i18next` 普遍包含 ~90% 的无关页面文本。而 `dynamic` 策略的问题更为严峻：不仅没有解决跨页文本泄漏，还因为语言级后端默认拉取整个 `translation` 命名空间而引入了 **50% 的未选中语言泄漏**。适配器方案直接让老代码达成 0% / 0% 的极致纯净度。
- **组件体积缩小至 1/8。** 隔离打包时，传统的 `useTranslation()` 组件由于 `t` 强绑定于全局 Store，内联 `resources` 时平均重达 **78.5 KB**，即便挂载后端也有 **26-27 KB**。而通过适配器重定向后，平均仅为 **9.7 KB**。
- **更迅捷的水合与语言切换。** 水合耗时从 15.6 ms 降至 **11.3 ms**（对比 `dynamic` 方案中后端请求阻塞关键渲染路径导致的 27.7 ms 提升尤为显著）。语言实时切换耗时也从 15-16 ms 缩减至 **11-12 ms**。
- **适配器不等于原生极致架构。** 原生的 `next-intlayer` 仅有 **141.3 KB**，仅比无任何国际化逻辑的基础应用多了 0.3 KB。适配器为了维持 `i18next` API 的兼容性（插值语法、复数与上下文后缀解析、`<Trans>` 标签树解析），在 Intlayer 核心之上保留了一层 9.4 KB 的兼容垫片。它是迈向现代化的无缝桥梁，而非终点。

> 本次评测暂未包含 Vite / TanStack Start 上的 `react-i18next` 适配器。有关 TanStack Start 的基准表现可参考 [i18next vs Intlayer](https://intlayer.org/zh/blog/i18next-vs-intlayer)：每页 127-184 KB，后端异步加载下的语言切换延迟约为 123-185 ms。

## 性能巨幅提升的底层机理

业务 `components/` 目录没有改动一行代码，所有性能收益完全归结于 `useTranslation` 到底绑定在什么载体上。

**在 `i18next` 中**，组件必须挂载到全局实例上。凡是预加载进该实例的内容（`static` 下的全部语种，或 `dynamic` 下当前语种的全部字典），都能被任何一个调用 `useTranslation()` 的组件直接访问。打包工具无法对实例内部的数据进行细粒度拆分，运行时也无法预知组件渲染时会访问哪些键名。

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # 塞满所有页面的庞大文本
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

**在 `@intlayer/next-i18next` 中**，组件直接与精简字典绑定。`syncJSON` 将每个命名空间文件解析并独立封装为字典；编译优化通道将组件精准重定向为对其声明字典的直接导入，这让打包工具能够像处理普通 JS 模块一样，按照页面和语言维度进行 Tree-shaking 与按需代码分割。

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # 维持原样，继续作为团队真实数据源
│   └── fr/translation.json
├── .intlayer/                        # 编译生成：按命名空间、按语言分割的独立字典
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← 源码零修改
```

原有的 `i18n/i18n.ts` 及其引用的 `resources` 导入瞬间变为死代码，被打包器彻底剔除。这就是 68 KB 缩减的根源。

## 三步极速迁移指南

<Steps>
<Step number={1} title="安装与初始化">

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

该命令会自动检测项目中的 `i18next` / `react-i18next` / `next-i18next`，安装 `intlayer`、对应的框架包（`next-intlayer` 或 `react-intlayer`）、匹配的 `@intlayer/*` 适配器及 `@intlayer/sync-json-plugin`，并初始化 `intlayer.config.ts`。请保留原有依赖的安装状态：它们作为对等依赖（peer dependencies）并提供类型定义。

</Step>
<Step number={2} title="配置语言包文件源">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // i18next 方言：支持 {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // 每个命名空间对应独立文件：`useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

如果每个语言仅有一个大而全的 `translation.json`（i18next 的默认命名空间），请配置 `splitKeys: false`，使得整个文件作为单一字典维系，无参数的裸 `useTranslation()` 即可正常工作。

</Step>
<Step number={3} title="挂载构建插件">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

在 Next.js App Router 下，客户端组件从 `[locale]` 动态路由段捕获当前语言。适配器的 `I18nextProvider` 不再接收手动传入的语言实例，只需在全局 Provider 中完成一次替换：

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

其下层的所有业务组件继续原汁原味地调用 `useTranslation()` 即可。

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` 内部集成 `vite-intlayer` 并自动完成对 `react-i18next` 与 `i18next` 的无缝拦截重定向。若是非 React 项目，直接使用 `@intlayer/i18next/plugin` 的 `i18nextVitePlugin()` 即可。

</Tab>
</Tabs>

</Step>
</Steps>

### 迁移完成后可安全删除的文件与逻辑

| 文件 / 代码模式                                        | 删除原因                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------ |
| `resources: { en, fr, ... }` 与庞大的 JSON import      | 适配器会忽略该注入；这正是 68 KB 冗余体积的来源                    |
| `i18next-http-backend`, `i18next-resources-to-backend` | 运行时再无发起网络请求拉取翻译的必要                               |
| `i18next-browser-languagedetector`                     | 语言探测已全面委托给 Intlayer 路由规则（URL 前缀、Cookie、Header） |
| `getStaticProps` 中的 `serverSideTranslations()`       | 仅返回空结构占位；保留无害，但实属多余代码                         |
| `next-i18next.config.js`                               | 不再被读取。所有国际化规范已由 `intlayer.config.ts` 集中管理       |
| 各页面繁琐的 `ns: [...]` 声明列表                      | 编译器会根据组件上下文自动确定所依赖的命名空间                     |

### 字节瘦身之外的工程收益

- **严格的类型推导。** `useTranslation("about")` 会自动基于编译后的 `about` 字典进行类型检查；拼错的键名如 `t("does.not.exist")` 会直接触发 TypeScript 编译报错，而不再是默默返回错误字符串。
- **CI 自动化门禁。** 运行 **`npx intlayer test`** 可在持续集成流水线中针对任意语言缺失的键直接报错阻断。通过 **`npx intlayer fill`** 可配置自有模型密钥（OpenAI、Anthropic、Mistral、Gemini 等）自动补齐遗漏翻译并写回 `locales/{lng}/{ns}.json`。
- **可视化编辑器与专属 CMS。** 直接与同一个 JSON 底层同步，业务翻译人员可在可视化 UI 中直观编辑，保存即自动提交至 Git。
- **渐进式演进至 `.content.ts`。** 各组件可随时单独由 `useTranslation("about")` 平滑转变为搭配同级内容文件的 `useIntlayer("about")`。JSON 与 `.content.ts` 字典能够完美混用。

## 启动迁移前必须明确的技术边界

- **运行时后端与动态探测器将不再生效。** `i18n.use(HttpBackend)` 仅会执行插件基础初始化，并不会在页面访问时动态拉取外部翻译接口。如果原应用依赖于请求发生时由 CMS 动态返回翻译，建议切换至 Intlayer 官方 CMS 或使用 `intlayer pull` / `push` 指令。
- **`resources` 参数被忽略而非智能合并。** 与部分轻度包装器不同，`@intlayer/i18next` 不会将内联的 `resources` 作为降级兜底方案。每一个键都必须真实存在于同步好的本地字典中（可通过 `intlayer test` 校验）。
- **App Router 需要且仅需要修改一次 Provider。** 即上述所示的一处微调。若采用 Pages Router 搭配 `appWithTranslation`，则连这处都不需要修改。
- **`next-i18next.config.js` 会被彻底跳过。** 原有的 `localePath`、`fallbackLng`、`reloadOnPrerender` 等选项不再生效；所有相关逻辑统一迁移至 `intlayer.config.ts`。
- **适配器自身具备少量固定体积。** 包含 9.4 KB 的运行时以及相比原生 `next-intlayer` 每页多出 9.4 KB。当项目所有组件都逐步平移至原生的 `useIntlayer` 后，即可直接卸载适配器。

## 选型决策指南

- **继续坚守 `i18next` 原生方案**：如果你的系统高度依赖运行时接口后端（即每次请求必须动态拉取 CMS 最新内容）、强依赖特定三方插件生态，或者属于适配器尚未覆盖的非 React 运行时环境。
- **全面接入 `@intlayer/*` 兼容适配器**：如果你正在使用 `react-i18next` / `next-i18next`，希望在零业务代码重写的条件下立刻获得 68 KB 减重、8 倍更小的轻量组件、0% 文本泄漏、类型安全保障和 CI 自动化。这是既有 `i18next` 项目的最佳渐进式改造路径。
- **拥抱原生纯血架构 (`next-intlayer` / `react-intlayer`)**：适合全新启动的项目，或者已经通过适配器平稳完成过渡的团队。它拥有无与伦比的超轻量表现（5.5 KB，每页仅增加 0.3 KB），并彻底解锁同步 Server Components 与组件级 `.content.ts` 同构体验。

## 相关对比与进阶文档

- [i18next vs Intlayer](https://intlayer.org/zh/blog/i18next-vs-intlayer)（库级别深度全方位基准测试）
- [next-intl vs @intlayer/next-intl](https://intlayer.org/zh/blog/next-intl-vs-intlayer-next-intl)（同系列适配器测评）
- [Lingui vs @intlayer/lingui](https://intlayer.org/zh/blog/lingui-vs-intlayer-lingui)（同系列适配器测评）
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-vue-i18n)（同系列适配器测评）
- 迁移指引：[i18next](https://intlayer.org/zh/doc/migration/i18next), [react-i18next](https://intlayer.org/zh/doc/migration/react-i18next), [next-i18next](https://intlayer.org/zh/doc/migration/next-i18next)
- 适配器技术规范：[i18next](https://intlayer.org/zh/doc/compatibility/i18next), [react-i18next](https://intlayer.org/zh/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/zh/doc/compatibility/next-i18next)

## 总结

`i18next` 是本次基准评测中最为笨重的运行时，而 `@intlayer` 适配器在不需要重构业务 API 的前提下剥离了绝大部分冗余负载。在同一个 Next.js 应用程序上，只需一个配置文件、一行构建插件和一处 Provider 微调，即可换来**每页节省 68 KB**、超越手写最高极限优化达 **12.7 KB**、**组件体积缩小 8 倍**、**无用文本泄漏归零**以及**水合耗时提速 4 ms** 的综合收益。

所有未经加工的原始测试数据、可运行的示例工程与度量脚本均已在 [Benchmark Bloom 官方仓库](https://github.com/intlayer-org/benchmark-bloom) 开源。

更多设计理念，请查阅 [为什么选择 Intlayer？](https://intlayer.org/zh/doc/why)。
