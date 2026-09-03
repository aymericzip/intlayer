---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n：Glob 导入、分包与构建期文案处理"
description: 探讨 i18n 中真正属于 Vite 特性的核心逻辑。使用 import.meta.glob 实现懒加载字典、为何按路由切分语言包常常失效、HMR 缺陷以及编译期插件机制。
keywords:
  - vite i18n
  - import.meta.glob
  - vite 代码分割
  - 懒加载翻译
  - vite 插件 i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n：真正属于 Vite 本身而非前端框架的技术内幕

网络上大部分所谓的“Vite i18n”教程，本质上只是恰巧使用了 Vite 的 React 或 Vue 教程。本文聚焦于更底层的工程机制：字典是如何被导入的、Rollup 是如何对其分包的，以及你手写的懒加载为什么在实际生产中往往并不“懒”。

## 目录

<TOC/>

## 静态导入是默认模式，且属于即时加载

最直接的配置是在模块顶部静态导入每一个语言字典：

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

这会导致三个语言字典全部被打包进入口 Chunk 中，并在每个页面加载时强行推送给所有访问者。对于只有两种语言、一百来条文案的项目尚可接受；一旦扩展到十种语言，它就会变成打包产物中最严重的性能浪费。

## `import.meta.glob` 与最容易配错的配置项

Vite 的 Glob 导入功能是解决这一问题的常规手段：

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

懒加载是默认行为：每个条目都是一个返回动态导入的函数，Rollup 会为每个文件单独输出一个独立 Chunk。而一旦加上 `{ eager: true }`，所有字典都会被内联并入当前模块中，与优化的初衷背道而驰：

```ts
// 所有语言全部硬塞进入口 Chunk 中（极力不推荐）：
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

其中的陷阱在于，这两种写法在本地开发环境中运行良好，因为 Vite 在开发模式下以非打包形式单独提供各模块。真正的差异只在 `dist` 产物中显现。请通过 `npx vite build && npx vite preview` 实际构建并检查入口 Chunk 究竟塞入了什么。

## 按路由拆分语言包往往无法真正拆开

这是一个经常让开发者感到意外的现象。你按照页面将字典拆散存放：

```
locales/en/home.json
locales/en/checkout.json
```

若有两个不同的路由同时导入了 `checkout.json`，Rollup 就会将该文件提升为一个在两个页面之间共享的公共 Chunk。Rollup 的分包策略是由模块依赖图谱决定的，而不是依据你的目录结构：任何能从多个入口访问的模块都会被提升为公共依赖。新增第三个路由不会改变现状，而引入第四个路由时可能会导致完全不同的分包重组。

因此，按路由切分语言包只有在模块导入图谱严格互不相交时才能成立。如果包体积是关键指标，请依靠可视化工具验证，而不是凭空假设：

```bash
npx vite build && npx vite-bundle-visualizer
```

若需要强行划定分包边界，可以使用 `build.rollupOptions.output.manualChunks`，但代价是必须长期手动维护。

## 字典文件默认不支持热更新（HMR）

修改一个组件代码，Vite 能够即时热替换页面模块。但当你修改 `locales/fr.json` 时，根据导入方式的不同，页面很可能毫无反应。动态导入的 JSON 文件缺乏原生的 HMR 边界，导致模块图谱无法知晓应当如何让下游消费组件失效并重新渲染。

许多开发者每改一个文案就习惯性地重启开发服务器，却不知道这本可以通过工程化手段避免。这一职责应当由 i18n 插件承担：它需要监听 HMR 更新事件，并将最新的文案消息动态推送到运行中的应用中。在技术选型时，务必关注对应的 Vite 插件是否妥善支持了该能力。

## `define` 会在构建期将语言环境直接写死

在构建时固化默认语言环境是很有吸引力的做法：

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` 是在编译阶段执行的纯文本替换。构建期间存在的具体值就是最终产物中固化的值，这迫使你必须针对每种语言单独执行一次完整构建。这种策略虽然完全合法（例如 Angular 官方的原生 i18n 便采用此方案），但若你的诉求是通过一次构建部署服务所有语言，这绝非良策。

对于需要随用户请求动态变化的数据，切勿放进 `define`，而应在运行时动态求值。

## 将文案解析工作前置到构建阶段

这个生态中所有成熟的技术选型最终都走向了同一个方向：彻底停止在浏览器中解析文案格式。

| 插件                         | 前置到构建阶段的处理工作                                              |
| :--------------------------- | :-------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | 将 vue-i18n 文案编译为渲染函数（仅发布纯运行时轻量包）                |
| Lingui (宏 + 插件)           | 提取并编译字典，将宏调用转换为精简的消息 ID                           |
| Paraglide (inlang)           | 将每条文案编译为独立的、支持 Tree-shaking 的函数                      |
| `vite-intlayer`              | 构建组件级字典，自动清除（purge）未使用的字段并进行键名压缩（minify） |

这样能带来双重收益：运行时的文案编译器不再打包进产物中，且未被引用的字段可以通过静态分析直接剔除。代价是开发服务器和 CI 都必须挂载对应的插件，而在脱离 Vite 环境直接运行裸 `tsc` 或测试工具时需要配置额外的类型支持。

vue-i18n 是最典型的例子：如果不加 `@intlify/unplugin-vue-i18n`，打包产物中将包含一个调用 `new Function` 的解析器，不仅徒增包体积，还会破坏严格的 CSP（内容安全策略）限制。

## SSR：严禁在模块顶级作用域缓存语言状态

如果你接入了 SSR（无论是通过上层框架还是通过 `vite-plugin-ssr`），必须死守这条铁律：模块级变量中保存的当前语言环境，会被该 Node.js 进程下的所有并发请求共享。

```ts
// 在浏览器中安全无虞。在服务端则是跨请求的数据污染漏洞：
export let currentLocale = "en";
```

两个并发访问服务器的用户会陷入竞态条件，导致其中一人收到另一种语言的渲染结果。在本地单人调试时绝不会复现该 Bug。必须按请求独立求值，并通过上下文（Context）或框架自带的请求级上下文隔离存储显式透传。

## Intlayer 的 Vite 插件

Intlayer 提供了一个一体化的 Vite 插件，统一处理字典构建、开发环境热监听以及打包优化流程：

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

模块导入重写、无用文案清理（purge）和键名压缩（minify）默认开启。核心控制项收敛在 `intlayer.config.ts` 中：

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // 剔除任何组件都未读取的内容字段
    minify: true, // 将文案键名重命名为紧凑的短别名
  },
};

export default config;
```

由于文案是伴随组件就近声明而非集中在单一庞大文件中，清除流程可以直接依赖模块依赖图谱，从而实现安全的死代码消除。权衡在于：任何编译代码的环境（包括 CI 与测试框架）都必须配置该插件。详情见 [包体积优化指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)。

## 常见错误

- **对本意为懒加载的 Glob 配置了 `{ eager: true }`。** 本地运行良好，上线后所有语言全量打包。
- **误以为目录结构天然等同于 Chunk 边界。** Rollup 追踪的是导入依赖图，而非文件目录。
- **为了看到文案修改而反复重启开发服务器。** 这是缺少 HMR 支持的表现。
- **在 `define` 中固化语言环境。** 迫使项目走向“一种语言一次构建”的模式。
- **在 SSR 场景中将语言环境保存在模块顶级作用域。** 引发难以排查的跨请求并发污染。
- **在开发服务器上评估包体积与性能。** 未经打包的单文件模块无法代表生产环境的构建产物。

## 深入阅读

- [包体积优化：清除、压缩以及实际传输给浏览器的产物分析](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)
- [跨框架性能基准测试报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)
- [配置参考手册](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [在 Vite + React 项目中集成 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)
- [i18next 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next.md)
- [React i18n：Provider 架构的内在原理](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/react.md)
- [Vue i18n：运作机制与技术局限](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/vue.md)
- [组件就近 i18n 与集中式 i18n 的架构对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)
