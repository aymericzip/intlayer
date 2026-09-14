---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui：相同宏，不同运行时"
description: "当 React 应用程序保留其 Lingui 宏但通过 @intlayer/lingui 兼容适配器提供服务时会发生什么变化。在相同的 TanStack Start 代码上测量的组件大小、水合、泄漏和每页 JavaScript，包括适配器处于劣势的方面。"
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - 兼容适配器
  - 迁移
  - 国际化
  - i18n
  - 基准测试
  - 打包体积
  - 博客
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | 相同宏，不同运行时

`@intlayer/lingui` 是针对 `@lingui/core` 和 `@lingui/react` 的兼容适配器。你的 `` t`...` ``、`<Trans>`、`useLingui()` 和 `i18n._()` 调用保持完全不变；宏继续正常编译；改变的是运行时消息的来源。每个调用点不再依赖每个语言环境一个编译好的全局目录，而是绑定到专门为其编译的 Intlayer 字典。

本文在相同的 TanStack Start 应用程序上测量了这种替换，该程序分别使用纯 Lingui 和使用适配器构建了一次。这些数据来自 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)。关于这两个库作为独立库的对比，请阅读 [Lingui vs Intlayer](https://intlayer.org/zh/blog/lingui-vs-intlayer)。本文主要关注适配器改变了什么，以及在哪些方面它没有帮助。

<TOC/>

> **摘要 (tl;dr)**：在同一个 TanStack Start 应用程序中，`@intlayer/lingui` 在不改动宏的情况下，将平均组件体积从 **85.5 KB 降至 12.8 KB** gzip，水合时间从 **28 ms 降至 19.7 ms**，语言切换时间从 **5.9 ms 降至 2.9 ms**。在朴素设置（预先加载每个目录）中，它还消除了 **90% 的页面泄漏** 并减少了每页 12 KB。但在延迟加载设置中，它每页交付 **137 KB，而纯 Lingui 为 115 KB**：适配器在运行时解析 ICU，而 Lingui 交付预编译的标记数组。源语言环境泄漏（约 9-10%）在两边完全相同，因为它来自于嵌入在组件中的 `message` 回退，而不是来自运行时。该适配器是一个 Vite 插件；测试是在 TanStack Start 上进行的。

## 什么是 `@intlayer/lingui`

Lingui 由编译器和运行时组成。源码中的宏被提取到每个语言环境的 `.po`（或 JSON）目录中，编译为每个语言环境的 JS 模块，并通过 `i18n.load()` + `i18n.activate()` 加载到全局 `I18n` 实例中。每个 `useLingui()` 订阅该实例；每个 `_()` 调用都会在活动目录中查找其 ID。

`@intlayer/lingui` 保留了宏和 API，并替换了目录查找逻辑：

1. **导入别名化。** 来自 `@intlayer/lingui/plugin` 的 `lingui()` 插件包装了 `vite-intlayer` 并添加了 `resolve.alias` 条目，使得 `@lingui/core` 和 `@lingui/react` 解析为 `@intlayer/lingui`。你的导入代码无需改动。
2. **目录作为单一事实来源。** `syncJSON` 插件（或用于 `.po` 文件的 `syncPO`）读取你现有的目录并将其转换为 Intlayer 字典，当 CLI 或 CMS 更新时将翻译写回。通过 `splitKeys: "key-prefix"`，带点分 ID（`footer.github`、`hero.title`）的扁平目录会拆分成每个前缀一个的小字典，而不是一个 244 KB 的庞大文件。
3. **调用点绑定。** Intlayer 优化通道收集每个文件中传递给 `_`、`t` 和 `<Trans>` 的 ID，并将匹配的字典交付给组件。`<Trans id="hero.title">` 独立绑定；`useLingui()` 绑定到该文件中使用的每个前缀。不带点分的 ID（哈希 ID、`mockBanner`）将回退到 Lingui 的单一 `messages` 字典。

```tsx fileName="src/components/Hero.tsx"
// 你的代码，保持不变
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="编译器输出内容（简化版）"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

组件不再需要访问全局实例及其背后的整个目录。它仅访问 `hero`。这就是下表中组件大小列下降 7 倍的全部原因。

## 适配器保留、忽略和不替换的内容

| Lingui API                                            | 搭配 `@intlayer/lingui`                                                                                         |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `` t`...` ``、`msg`、`plural`、`select`、`<Trans>` 宏 | ✅ 保留。在 Intlayer 优化通道之前，在构建配置中保留 `@lingui/babel-plugin-lingui-macro` 或 `@lingui/swc-plugin` |
| `useLingui()` → `{ i18n, _, t }`                      | ✅ 保留。在 Provider 外部也能工作（语言环境派生自 `react-intlayer`）                                            |
| `i18n._(id, values)`、`i18n.t()`                      | ✅ 保留。显式 ID 和哈希 ID 均可解析                                                                             |
| ICU 复数、`select`、`selectordinal`、`#`              | ✅ 保留，通过 Intlayer 的 ICU 解析器处理                                                                        |
| `i18n.date()`、`i18n.number()`、`formats`             | ✅ 保留，由原生 `Intl` 支持                                                                                     |
| `I18nProvider`                                        | ✅ 保留。包装 `IntlayerProvider`；监听 `i18n.on("change")` 以确保 `activate()` 仍能触发重新渲染                 |
| `i18n.activate(locale)`                               | ✅ 保留                                                                                                         |
| `i18n.load(locale, messages)` / `loadAndActivate()`   | ⚠️ 作为**运行时回退**接受。编译后的字典优先；开发环境警告会建议移除该导入                                       |
| `setupI18n({ messages, missing })`                    | ⚠️ `messages` 作为运行时回退合并；`missing` 被忽略                                                              |
| `lingui extract` / `lingui compile`                   | ✅ 依然是你的日常工作流程。将 `syncPO` / `syncJSON` 指向提取的目录                                              |
| `I18nProvider` 上的 `defaultComponent`                | ⚠️ 存储在上下文中，但在渲染时未应用                                                                             |
| Next.js                                               | ❌ 该插件包装了 `vite-intlayer`。仅支持 Vite、TanStack Start 和 React Router                                    |

## 基准测试

### 测试衡量了什么

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 测试套件在每种设置下构建了**相同的应用程序**：**10 个页面**（home, about, blog, careers, contact, FAQ, pricing, products, settings, team），**10 种语言**（`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`），相同的组件和相同的内容。页面以 `en` 和 `fr` 进行测量。

Lingui 在四种加载策略下进行了构建，从预先导入每个编译好的目录（`static`）到按路由延迟导入目录（`scoped-dynamic`）。适配器在**相同的组件**上构建，仅更改了 `vite.config.ts` 和 `intlayer.config.ts`。其 `static` 行打包所有语言环境；其 `dynamic` 行（`importMode: 'dynamic'`）按需加载当前活动的语言环境。没有 "scoped" 变体：因为优化通道自动在每个调用点进行作用域划分。

对于每个构建，测试套件记录：

- **Lib size**：仅导入 i18n 库的空组件的 gzip 体积。
- **Page JS**：每页下载的 gzip JavaScript 体积，在所有页面和语言环境中取平均值。
- **Locale leak %**：下载的 JS 中属于用户**未**查看的语言环境的翻译字符串比例。
- **Page leak %**：下载的 JS 中属于用户**未**访问的页面的翻译字符串比例。
- **Component avg**：每个组件单独编译时的平均 gzip 体积。
- **E2E reactivity**：选择新语言环境到 DOM 中的 `html[lang]` 更新之间的挂钟时间（Playwright，5 次迭代）。
- **Hydration**：React 水合阶段耗时。

> 以下数据来自 **2026-09-12** 的测试运行，使用 `@lingui/react` 6.6.0 和 `@intlayer/lingui` 9.5.1。测试应用程序刻意设计得很小（每个语言环境几十个字符串），因此泄漏百分比反映的是一种**结构模式**：随着内容的增长，它们会不断增加，而运行时成本保持固定。

### TanStack Start 上的测试结果

| 配置                   | 策略           | 库体积 (gz) | 页面 JS 平均 (gz) | 语言泄漏 | 页面泄漏 | 组件平均体积 (gz) | E2E 响应性 |    水合耗时 |
| ---------------------- | -------------- | ----------: | ----------------: | -------: | -------: | ----------------: | ---------: | ----------: |
| **base** (无 i18n)     | -              |      0.0 KB |          111.0 KB |     0.0% |     0.0% |            0.7 KB |     8.1 ms |     21.6 ms |
| Lingui                 | static         |     11.2 KB |          152.2 KB |    50.0% |    90.0% |           58.0 KB |     3.9 ms |     19.9 ms |
| Lingui                 | dynamic        |     11.2 KB |      **115.2 KB** |     9.3% |     0.0% |           85.5 KB |     5.9 ms |     28.0 ms |
| Lingui                 | scoped-static  |     11.2 KB |          120.8 KB |     4.0% |     0.0% |          147.9 KB |     7.1 ms |     33.9 ms |
| Lingui                 | scoped-dynamic |     11.2 KB |          120.2 KB |     8.6% |     0.0% |           83.7 KB |    42.1 ms |     32.9 ms |
| **`@intlayer/lingui`** | static         | **10.3 KB** |          140.5 KB |    50.0% | **0.0%** |       **14.9 KB** | **3.3 ms** | **11.3 ms** |
| **`@intlayer/lingui`** | dynamic        | **10.3 KB** |          137.0 KB |     9.9% | **0.0%** |       **12.8 KB** | **2.9 ms** | **19.7 ms** |
| `intlayer` (原生)      | static         |      5.0 KB |          125.8 KB |    50.0% |     0.0% |            8.1 KB |     3.2 ms |     11.5 ms |
| `intlayer` (原生)      | dynamic        |      5.0 KB |          118.6 KB |     0.0% |     0.0% |            6.3 KB |     3.6 ms |     14.1 ms |

**如何解读数据**

- **组件体积缩小 7 倍。** 这是适配器的主要效果。根据策略不同，单独编译的 Lingui 组件平均体积为 **58-148 KB**，因为 `useLingui()` 会触及全局实例以及加载到其中的每个目录。使用适配器的相同组件平均只有 **12.8-14.9 KB**：它只触及自己的字典和 ICU 解析器，别无其他。
- **水合快 8-14 ms。** `i18n.load()` + `i18n.activate()` 在 React 开始水合前在客户端执行；Lingui 设置越偏向懒加载，这个过程耗时越长（28-34 ms）。使用适配器时，字典作为打包器已放置在页面分块中的普通导入到达：`static` 下为 **11.3 ms**，`dynamic` 下为 **19.7 ms**。
- **语言切换快 2 倍，且无卡顿。** Lingui 优化后的 `scoped-dynamic` 设置需要 **42 ms** 才能更新 `html[lang]`，因为路由目录在更改可见前必须经过获取、加载和激活。适配器在两种模式下均保持在 **2.9-3.3 ms**。
- **朴素设置免费获得优化。** 静态 Lingui 在每个页面上打包每个目录：152.2 KB，90% 页面泄漏。静态适配器：140.5 KB，0% 页面泄漏，组件完全相同。
- **每页字节数：Lingui 在 `dynamic` 中以 22 KB 胜出。** 这是一个需要坦诚面对的数据。Lingui 在构建时将消息编译为标记数组，并仅附带一个遍历它们的 11 KB 运行时。适配器则包含 Intlayer 的 ICU 解析器（比原生构建多出约 15 KB 的 `@intlayer/core`）、适配器层（~10 KB）和 `react-intlayer`（~6 KB）。在此应用中，结果是 **137.0 KB 对 115.2 KB**。如果每页字节数是你的唯一预算考量，并且你已经在使用延迟加载的 Lingui，适配器在这方面不会带来体积缩减。
- **两边的语言环境泄漏几乎相同。** 在 `dynamic` 下 Lingui 为 9.3%，适配器为 9.9%。这源于组件内部：`i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` 携带了英文源码作为回退，宏输出也是如此，除非显式剔除 message 字段。无论通过什么提供翻译，这部分英文都会落入 `fr` 分块中。原生 `intlayer`（`.content.ts`，无内联源码）则为 0%。

## 为什么数据会变化，以及为什么有一项保持不变

决定这些列的有两个因素：**组件绑定到了什么**，以及**消息以何种格式传输**。

**绑定方式。** 在 Lingui 中，划分的基本单元是语言环境。`fr` 的 `messages.mjs` 是一个单一模块；任何导入了加载该模块的实例的组件都可以访问其全部内容，因此打包工具无法进行比语言环境更细粒度的拆分。使用适配器时，基本单元是调用点：`hero` 和 `footer` 是独立的导入，按组件进行拆分和延迟加载。这就是组件体积、水合和页面泄漏大幅改善的原因。

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # lingui compile 输出，每种语言一个
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # 生成内容：每个 ID 前缀一个字典，分语言环境
└── src
    ├── locales
    │   ├── en/messages.json             # 未修改，依然是单一事实来源
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← 未修改
```

**传输格式。** Lingui 的编译步骤将 `{count, plural, one {# item} other {# items}}` 转换为标记数组；运行时从不需要解析 ICU。适配器将消息保留为文本，并使用 Intlayer 的 ICU 解析器进行解析。这是每页固定支付一次的约 15 KB 开销，也是 `dynamic` 行在体积上落后而在其他所有方面领先的原因。原生 Intlayer 避免了这一点，因为 `.content.ts` 字典使用编译器提前解析的 `enu()` / `insert()` 节点。

## 迁移只需三步

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

该命令会检测 Lingui，读取 `lingui.config.ts` 以选择 `syncPO`（`.po` 目录）或 `syncJSON`（JSON 目录），安装 `intlayer`、`react-intlayer`、`@intlayer/lingui` 及对应的同步插件，并在 `vite.config.ts` 中将 `@lingui/vite-plugin` 替换为适配器插件。保留 `@lingui/core`、`@lingui/react` 和你的宏插件：宏仍会继续编译，适配器也会复用 Lingui 的类型。

</Step>
<Step number={2} title="将 Intlayer 指向你的目录">

对于 JSON 目录（`lingui.config.ts` 中的 `format: "minimal"`）：

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
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // 按第一个分段对带点分 ID 进行分组：`footer.github` → 字典 `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

对于 `.po` 目录，将 `syncJSON` 替换为来自 `@intlayer/sync-po-plugin` 的 `syncPO`，并使用带有 `.po` 扩展名的相同 `source` 模式。请参阅 [Sync PO 插件文档](https://intlayer.org/zh/doc/plugin/sync-po)。

`splitKeys: "key-prefix"` 是让组件体积大幅缩小的关键。目录文件保留其扁平形态；拆分仅存在于生成的字典中，写回时会自动重新拼接 ID。

</Step>
<Step number={3} title="添加插件">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // 保留你的宏插件；它必须在 Intlayer 优化通道之前运行
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` 封装了 `vite-intlayer`（内容监听、字典编译、优化通道），并将 `@lingui/core` 和 `@lingui/react` 别名重定向到适配器。重新构建，上述性能收益便可立即生效。

</Step>
</Steps>

### 之后可以删除的内容

| 文件 / 模式                                          | 原因                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | 字典由使用它们的组件直接导入。`i18n.load()` 变为回退逻辑               |
| `i18n.load()` / `i18n.loadAndActivate()`             | 保留 `i18n.activate(locale)`；移除手动加载目录的代码                   |
| 构建脚本中的 `lingui compile`                        | 仅当你完全迁移到 JSON / `.po` 作为来源并且不再导入编译后的模块时可删除 |

### 除了字节之外的收获

- **缺失翻译检测。** 当某个语言环境缺少 ID 时，`npx intlayer test` 会使 CI 报错失败；而 `lingui extract` 仅输出统计数据。
- **`npx intlayer fill`** 使用你选择的 AI 提供商（OpenAI、Anthropic、Mistral、Gemini 等）自动补全缺失的条目，并直接写回你的目录中。
- **可视化编辑器和 CMS** 在相同的字典上运行，非技术人员也能通过友好的图形界面轻松编辑 `.po` / JSON 文件。
- **平滑迁移到 `.content.ts`。** 任何组件都可以随时从 `useLingui()` 切换到带有同目录内容文件的 `useIntlayer("hero")`。两种字典类型可以完美共存与合并。

## 开始前需了解的限制

- **`dynamic` 模式下的每页体积开销。** 如前所述：在小型应用中，相对于延迟加载的 Lingui 设置，预计每页大约增加 20 KB。这一差距不会随着内容的增加而扩大（因为它来自解析器而非目录），但也不会缩小。
- **源语言环境泄漏仍然存在。** 消息描述符和宏输出会嵌入英文源码作为回退。如果对此介意，解决方法是去除 `message` 字段或将该组件迁移到 `.content.ts`，适配器本身无法解决此问题。
- **`i18n.load()` 仅作为回退手段。** 如果你继续导入编译好的目录并调用 `load()`，将会同时加载旧包与新包。请务必移除这些导入。
- **仅支持 Vite。** `@intlayer/lingui` 没有提供 Next.js 插件。在 Lingui 上的 Next.js 项目应直接查阅 [`next-intlayer`](https://intlayer.org/zh/doc/environment/nextjs)。
- **`defaultComponent` 未生效。** 如果你依赖它来自动包裹每个 `<Trans>`，请在组件中显式编写包装器。

## 应该选择哪种方案？

- **继续留在 Lingui**：如果你已经配置好了 `scoped-dynamic`，你的唯一性能考量是极致的每页字节体积，且 42 ms 的语言切换和 30 ms 的水合耗时完全在应用承受范围之内。
- **使用 `@intlayer/lingui`**：如果你正在使用 Lingui，并希望在无需改动任何宏的前提下，获得更小的组件、更快的首屏水合与语言切换、在简单配置下实现 0% 页面泄漏、类型化 ID、CI 检查以及 AI 翻译填充。这是现有 Lingui 代码库的理想升级桥梁。
- **迁移到原生 Intlayer（`react-intlayer`）**：当你的团队开始重构组件时。它是测试表中唯一实现 **0% 语言环境泄漏**、5 KB 运行时且相比基准应用仅增加 7.6 KB/页的方案。

## 相关对比文章

- [Lingui vs Intlayer](https://intlayer.org/zh/blog/lingui-vs-intlayer)（库级别深度对比，相同基准测试）
- [next-intl vs @intlayer/next-intl](https://intlayer.org/zh/blog/next-intl-vs-intlayer-next-intl)（同系列适配器测评）
- [i18next vs @intlayer/i18next](https://intlayer.org/zh/blog/i18next-vs-intlayer-i18next)（同系列适配器测评）
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-vue-i18n)（同系列适配器测评）
- [兼容适配器参考：Lingui](https://intlayer.org/zh/doc/compatibility/lingui)
- [编译器型 vs 声明式 i18n](https://intlayer.org/zh/blog/compiler-vs-declarative-i18n)

## 总结

`@intlayer/lingui` 彻底改变了 Lingui 调用点的绑定机制：从绑定到全局实例及其各语言整体目录，转变为绑定到专门为该组件编译的独立字典。在相同的 TanStack Start 应用中，无需编辑任何宏即可实现 **组件体积缩小 7 倍**、**水合加快 8-14 ms**、**语言切换提速 2 倍**且消除了 42 ms 的性能骤降。它不会修改组件内置的回退内容（因此保留了源语言泄漏），并在运行时解析 ICU（使得动态加载模式下每页比纯 Lingui 多出约 20 KB）。在选型前，请务必明确团队的核心性能预算。

所有原始测试数据、测试应用和评测脚本均可在 [Benchmark Bloom 代码仓库](https://github.com/intlayer-org/benchmark-bloom) 中找到。欢迎自行复现并验证。

详情请参考 [“为什么选择 Intlayer？”文档](https://intlayer.org/zh/doc/why)。
