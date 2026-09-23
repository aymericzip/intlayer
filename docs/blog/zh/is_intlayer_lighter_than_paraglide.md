---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: Intlayer 比 Paraglide 更轻量吗？
description: Paraglide 在 i18n 基准测试中看起来几乎没有开销，因为其代码是直接生成到你的代码库中的。本文将深入分析其实际体积去了哪里、为什么按节点读取语言会带来性能损耗，以及 Intlayer 的动态加载如何做到仅下发单一语言而非全量语言包。
keywords:
  - Paraglide
  - Intlayer
  - 国际化
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer 比 Paraglide 更轻量吗？

是的。

`Paraglide` 作为业界公认非常轻量的 i18n 解决方案享有良好声誉，初看之下，[基准测试](https://intlayer.org/zh/doc/benchmark/tanstack) 也印证了这一点：其库体积几乎为零。然而，库体积为零并不代表下发到浏览器的体积为零。这只意味着字节被转移到了该指标不统计的地方。

<TOC/>

## 核心要点

**库体积只是被隐藏了，并没有消失：**

Paraglide 将其 runtime 和消息函数直接生成到你的代码库中。这部分代码虽然依然传输给浏览器，但被归类为_你的_代码，而不是库的代码。

**无 Provider 并非免费的午餐：**

每次调用 `m.my_key()` 都会自行解析语言，在渲染每个节点时都要读取 cookie 或本地存储，而不是从 context 中一次性读取。

**缺乏动态加载机制：**

Paraglide 会将一条消息的所有语言全部引入客户端 bundle 中。而 Intlayer 在配置 `importMode: 'dynamic'` 或 `'fetch'` 时，仅加载当前正在渲染的单一语言。

**Tree Shaking 并非总是生效：**

在我们的部分基准测试中，Paraglide 宣传的 Tree Shaking 未能起效。建议务必检查你自己的 bundle 体积。

## Paraglide 的体积究竟去了哪里？

在基准测试报告中，“库体积”指标衡量的是在添加任何业务内容之前，空组件中各 i18n 库的 Provider 和 Hook 体积。

| 库 (TanStack Start)           | 库体积 (gz) | 库体积 (min) |
| ----------------------------- | ----------- | ------------ |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB      | 4.5 KB       |
| `react-intlayer@9.5.1`        | 5.0 KB      | 15.2 KB      |

单看这项数据，Paraglide 确实获胜。但 Paraglide 本质上是一个编译器：它读取你的 `messages/*.json` 文件，并在你的仓库中生成一个 `paraglide/` 目录，其中包含 `runtime.js`（语言检测、cookie 和存储策略、URL 本地化）以及每个消息对应的 JavaScript 函数。

```bash
src/paraglide/
├── runtime.js      # 语言检测、策略、URL 辅助工具
├── server.js
├── messages.js     # 重新导出所有消息
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

由于这些代码位于你的 `src/` 目录下且通过相对路径导入，打包工具会将其归算到你的应用程序中，而不是 `node_modules` 包。因此，库体积一栏几乎显示为零，但相同的业务逻辑依旧被完整打包进了你的页面 bundle 中。

生成代码本身并不是坏事：生成的 runtime 仅包含你配置中真正需要的逻辑（前缀策略、cookie 与 local storage 选择等）。Intlayer 则通过另一种方式达到相同效果，即在构建时注入环境变量，使打包工具自动剔除你配置未启用的代码分支。这两种方案最终都比 `i18next` 或 `next-intl` 轻量 3 到 10 倍。

因此，真正公平的衡量标准并不是库体积，而是**每个页面实际传输的 JavaScript 体积**。

## 页面实测体积

TanStack Start 应用，10 个页面，在 `en` 和 `fr` 路由上进行实测（经 gzip 压缩）：

| 配置                               | 页面 JS 平均 (gz) | 超出基准    | 语言泄露率 | 跨页面泄露率 |
| ---------------------------------- | ----------------- | ----------- | ---------- | ------------ |
| 基准（无 i18n）                    | 111.0 KB          | -           | 0.0%       | 0.0%         |
| `paraglide`（任何策略）            | 125.1 KB          | +14.1 KB    | 49.7%      | 0.0%         |
| `intlayer` (`importMode: static`)  | 125.8 KB          | +14.8 KB    | 50.0%      | 0.0%         |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**      | **+7.6 KB** | **0.0%**   | **0.0%**     |

Next.js 16 App Router，同一应用：

| 配置             | 页面 JS 平均 (gz) | 超出基准    |
| ---------------- | ----------------- | ----------- |
| 基准（无 i18n）  | 141.0 KB          | -           |
| `paraglide-next` | 155.3 KB          | +14.3 KB    |
| `next-intlayer`  | **141.3 KB**      | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> 完整数据请参阅 [TanStack Start 基准测试报告](https://intlayer.org/zh/doc/benchmark/tanstack) 与 [Next.js 基准测试报告](https://intlayer.org/zh/doc/benchmark/nextjs)。所有 bundle 均可在 [基准测试仓库](https://github.com/intlayer-org/benchmark-i18n) 中核查。

实测结果呈现出两个明显特征：

- 在 `static` 模式下，Intlayer 传输的内容体积与 Paraglide 基本持平（125.8 KB 对比 125.1 KB）。这符合预期：两者都包含了页面所需消息的所有语言版本。
- 无论使用何种策略，Paraglide 的体积始终保持在 125.1 KB，因为它没有动态加载模式。上表中其每一行都等同于静态引入。

## 无 Provider：看似美妙却代价不菲的方案

Paraglide 不需要 Provider。你只需导入消息并直接调用：

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

没有 context，没有外层包裹组件，没有 hook。表面上看简单直观。但是语言依然必须由某个地方解析。每个生成的消息函数大致如下所示（简化代码）：

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // 每次调用都要重新解析

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...每个语言对应一个分支
};
```

而 `getLocale()` 会遍历已配置的各种策略（cookie、本地存储、URL、基础语言）以获取当前语言。这意味着你渲染的每个文本节点（`<>{m.my_key()}</>`）都会各自执行一次语言解析流程，包括在浏览器中读取 `document.cookie`。一个包含 200 个翻译字符串的页面，在单次渲染中就会解析 200 次语言，并且在每次重新渲染时周而复始。

基于 Provider 的库仅需读取**一次**语言，将其保存在 context（或 signal、store）中，所有节点直接读取已存在于内存中的值。Provider 的开销仅有几百字节。省去 Provider 会导致每次渲染都消耗 CPU 周期，这在基准测试中表现得尤为明显：在 TanStack Start 上，Paraglide 的页面加载时间与语言切换延迟均落后于 Intlayer（页面加载时间 22.1 ms 对比 14.6 ms，端到端响应度 4.3 ms 对比 3.2 ms）。

## 开发者体验（DX）

Paraglide 的事实来源是 JSON，但你从不直接导入这些 JSON 文件，而是导入生成的 `.js` 文件：

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/zh.json"
{
  "hero_title": "以所有语言发布你的应用程序"
}
```

```tsx fileName="Hero.tsx"
// 仅在编译器从 JSON 重新生成该文件后才存在
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      zh: "以所有语言发布你的应用程序",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

这种开发循环需要付出相应代价：

- 每次修改 JSON 文件，都必须等待重新生成完成，导入才能被识别或类型才能得到更新。
- 生成的 `paraglide/` 目录要么提交至 Git（这意味着每次涉及文案修改的 PR 都会在生成文件上产生合并冲突），要么将其忽略（这意味着在每次类型检查、测试和 CI 任务之前都必须额外执行一次生成步骤）。
- 每个字符串都被包裹成函数调用。常量在各处变成了 `m.key()`，即便在原本只需静态值的地方也是如此。

## Tree Shaking：请核查你的实际 Bundle

Paraglide 最主要的主打特性是：由于每个消息都是独立的 export，未使用的消息能被 Tree Shaking 剔除。在 Svelte + Vite 的基准测试中，它确实如宣传的那样生效了。

但在其它技术栈中并非如此。在我们针对 [Next.js](https://intlayer.org/zh/doc/benchmark/nextjs) 的测试中，Paraglide 的页面体积比基础应用多出 14 KB，而 `next-intlayer` 仅增加了 0.3 KB。在 TanStack Start 上的早期测试也表明，来自其他页面的消息同样混入了当前路由的 bundle 中。

Tree Shaking 效果取决于你的打包工具（Turbopack、Rolldown、Rollup）、消息导入语法（`import { m }` 与 `import * as m`）以及副作用分析能力。如果你因体积小巧而选择 Paraglide，请务必打开 bundle 可视化工具并在自己的项目中实际验证。

## 无动态加载机制

这是架构上的硬伤。Paraglide 无法做到一次只加载一种语言：每个消息函数都会静态导入每种语言的实现代码，因此所有语言都会全部打包到你的客户端 bundle 中。

在支持 2 种语言时，有一半的翻译数据传输被浪费了，这与前文测得的 ~50% 语言泄露率完全吻合。当支持 10 种语言时，浪费率高达 90%；当支持 30 种语言时，浪费率高达 97%。

即使改成动态加载也无法根治：由于每个消息是一个独立函数，如果按函数进行懒加载，将会导致成千上万次碎小的网络请求。

Intlayer 允许你全局或按字典自由配置加载模式：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | 传输至客户端的内容                          | 对比 Paraglide              |
| ------------ | ------------------------------------------- | --------------------------- |
| `static`     | 页面所用字典的所有语言版本                  | 理论体积完全一致            |
| `dynamic`    | 仅加载当前语言，按字典进行按需懒加载        | N 个语言时体积**轻量 N 倍** |
| `fetch`      | 仅加载当前语言，直接通过 Live Sync API 获取 | N 个语言时体积**轻量 N 倍** |

借助 [构建期转换优化](https://intlayer.org/zh/doc/concept/bundle-optimization) 与 `importMode: 'static'`，Intlayer 在理论上加载的内容与 Paraglide 毫无二致。而启用 `'dynamic'` 或 `'fetch'` 后，它仅加载当前语言所需的内容：对于支持 N 种语言的应用，翻译数据的网络传输量将比 Paraglide 小 N 倍。

## Paraglide 依然适用的场景

<AccordionGroup>
<Accordion header="语种较少的 Svelte + Vite 项目">

如果你的技术栈是 Svelte 搭配 Vite，且仅需支持两到三种语言，Tree Shaking 可以按预期工作，多语言带来的体积开销也相对可控。

</Accordion>
<Accordion header="现有基于 inlang 的工作流">

如果你的团队已经深度依赖 inlang 生态（Fink、Sherlock、消息格式插件），Paraglide 能够与其实现原生无缝集成。

</Accordion>
</AccordionGroup>

## 在你的应用中实际测验

使用免费的 [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) 检测线上生产应用的传输体积与语言泄露情况：

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

安装并初始化 Intlayer：

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

## 拓展阅读

- [TanStack Start i18n 基准测试](https://intlayer.org/zh/doc/benchmark/tanstack)
- [Next.js i18n 基准测试](https://intlayer.org/zh/doc/benchmark/nextjs)
- [Bundle 优化与 `importMode`](https://intlayer.org/zh/doc/concept/bundle-optimization)
- [如何挑选合适的 React i18n 库](https://intlayer.org/zh/blog/how-to-pick-react-i18n-library)
- [编译器驱动与声明式国际化的优劣权衡](https://intlayer.org/zh/blog/compiler-vs-declarative-i18n)
