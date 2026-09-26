---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "如何在 2026 年选择合适的 Svelte i18n 库"
description: "Svelte 与 SvelteKit 国际化选型决策指南。在对比 svelte-i18n、Paraglide、typesafe-i18n、wuchale 和 Intlayer 之前需要回答的关键问题，以及各方案在 bundle size、类型支持和 SSR 安全性方面的权衡与代价。"
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte 国际化
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n 库对比
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# 如何选择合适的 Svelte i18n 库

Svelte 本身没有内置任何 i18n 功能。没有 `$t`，没有 locale 原语，也没有消息格式。每一个选项都是第三方方案，而 Svelte 生态正是编译时 i18n 发展得最彻底的领域，因此各候选方案之间的差异比在 React 或 Vue 中更为显著。

本指南列出了在选型前需要优先厘清的几个问题，然后将答案映射到 `svelte-i18n`、Paraglide、`typesafe-i18n`、`wuchale` 和 Intlayer，涵盖 Vite + Svelte 以及 SvelteKit 场景。

![Svelte i18n 库生态系统](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 目录

<TOC/>

## 在对比各库之前需要回答的 6 个问题

1. **Vite SPA 还是 SvelteKit？** 在 SPA 中，模块级 store 完全适用：单标签页、单用户、单 locale。而在 SvelteKit 中，同一个单例会在服务端的并发请求之间共享，导致请求 B 渲染出请求 A 的语言。库要么为你提供针对每个请求的独立隔离机制（context、`locals`），要么需要你自己去实现。
2. **谁来编写翻译？** 开发者、TMS（翻译管理系统）、交付 ICU 字符串的翻译机构，还是 AI pipeline。`svelte-i18n` 支持 ICU，Paraglide 和 `typesafe-i18n` 使用各自的语法。应与翻译供应商的格式相匹配。
3. **有多少个 locale 和页面？** 2 个 locale 和 5 个页面可以一次性打包所有内容；10 个 locale 和 40 个路由则无法承受，运行时 catalog 与编译后消息之间的差异将成为主要成本。
4. **是否需要对 key 进行类型检查？** 在 `svelte-i18n` 中，`$_("cart.totl")` 属于运行时错误。编译时库从架构设计上将其直接转为类型错误。
5. **Svelte 4 stores 还是 Svelte 5 runes？** Runes 改变的是 locale 状态的语法，而不是状态共享的隔离问题。但在 `.ts` 文件中 `$state` 会编译为普通变量，因此如果你使用的是 Svelte 5，库的运行时必须具备 rune-aware（感知 runes）的能力。
6. **能否接受代码库中存在生成文件？** Paraglide 和 `typesafe-i18n` 都会在源码树中生成 JavaScript 或 TypeScript 文件。有些团队对此无所谓，而另一些团队在每个并行分支上都会遇到 merge conflicts。

写下你的答案，后文的所有分析都将围绕它们展开。

## 一图看懂技术演进版图

Svelte i18n 出现得比 React 或 Vue 更晚，并直接跳过了早期阶段，迈入了编译时浪潮。

![JavaScript i18n 库发展史](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="运行时字典（2019 至 2020 年）：svelte-i18n, sveltekit-i18n">

JSON catalogs，在浏览器中通过 `intl-messageformat` 解析 ICU，locale 存放在模块级 stores（`$locale`，`$_`）中。采用度最高，文档齐全，但 SSR 适配需要自行编写。

</Accordion>
<Accordion header="生成类型（2020 至 2022 年）：typesafe-i18n">

生成器监听 catalog 并生成类型化访问器（`$LL.cart.total()`）。模型严谨，代码库中包含生成文件，近期该仓库活跃度较低。

</Accordion>
<Accordion header="编译器与就近内容管理（2022 至 2026 年）：Paraglide, wuchale, Intlayer">

Paraglide 将每条消息编译为导出的函数，以便打包工具对路由未调用的部分进行 tree-shaking。`wuchale` 在构建时从 markup 中提取字符串。Intlayer 按组件声明内容，并生成类型与按组件划分的字典。

</Accordion>
</AccordionGroup>

[JavaScript i18n 历史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md) 详细探讨了每一波浪潮。

## 最关键的抉择：内容存放在哪里以及何时加载

两个架构选择解释了不同方案之间大部分的 bundle 差异：

- **集中式还是局部作用域内容。** 整个应用共用一个 `locales/en.json`，还是每个组件独立声明。
- **静态导入还是动态导入。** 启动时加载所有内容，还是按需获取当前 active locale（以及理想情况下当前 active route）的内容。

下图估算了一个包含 1 到 10 个页面、翻译为 1 到 10 个 locale、每页约 30 KB 文本的理论应用的 payload。

![按架构划分的理论内容泄漏](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` 默认位于左上方：`register("fr", () => import("./fr.json"))` 提供了按 locale 的动态加载，但一个 locale catalog 是一个完整对象，加载它就会同时加载所有页面的文案。Paraglide 是一个有趣的案例：因为每条消息都是独立的导出，tree-shaking 免费提供了页面维度的精简，[Svelte 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/svelte.md) 证实它在 Vite + Svelte 上确实如宣传的那样有效（但在 React 和 Next.js 的基准测试中并未奏效）。Intlayer 则通过按组件声明达到了相同的效果。

如果你对第 3 个问题的答案是“很多页面”，请把这一节作为比任何 API 偏好都更核心的考量。[按组件 vs 集中式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md) 一文探讨了这一权衡在维护层面的影响。

## 候选方案一览

各库的体积数据来源于 [Svelte 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/svelte.md)：空组件中的 store 加访问器在经过打包、tree-shaking 和压缩后的体积（基于 10 个页面和 10 个 locale 的应用）。内容体积单独计算。

| 库              | 消息存放位置                  | Locale 状态                                | 类型安全                 | 消息格式                      | 按路由代码分割        | 库体积                             |
| :-------------- | :---------------------------- | :----------------------------------------- | :----------------------- | :---------------------------- | :-------------------- | :--------------------------------- |
| `svelte-i18n`   | 每个 locale 一个 JSON catalog | 模块级 Svelte store                        | 2/5 — 手写 union         | ICU                           | 否                    | ~16.6 kB                           |
| `typesafe-i18n` | 生成的 TS 模块                | Store 适配器                               | 4/5 — 自动生成           | 自定义                        | 部分支持              | 较小                               |
| Paraglide       | inlang 项目，编译为函数       | 每次调用时从 cookie、URL 或 storage 中读取 | 3.5/5 — 自动生成         | 自定义                        | 是，通过 tree-shaking | 趋近于零（因为代码生成到代码库中） |
| `wuchale`       | 构建时从 markup 中提取        | Store                                      | 不适用（无 key）         | 自定义                        | 是                    | ~30.7 kB                           |
| Intlayer        | 组件旁的 `.content.ts`        | Context 加 store，支持 runes               | 5/5 — 自动生成，默认开启 | Intlayer (+ ICU, i18next, PO) | 是，按组件划分        | ~3.6 kB                            |

> 数据为基准测试特定版本下的快照。在仅根据体积做决定之前，请在自己的应用中进行测试。
> 类型安全：5/5 表示键、参数和每个语言环境均无需手动配置即可得到校验，包括 URL 格式化工具与辅助函数。

Paraglide 趋近于零的库体积是其架构使然：运行时代码直接生成到你的代码库中。Intlayer 需要 `vite-intlayer`，因此无法在没有构建步骤的情况下运行。

## 根据你的答案匹配合适的库

<AccordionGroup>
<Accordion header="Vite SPA，小团队，少量 locale">

`svelte-i18n`。它是文档最丰富的选项，`$_` 在 markup 中阅读非常自然，且 `register` 加 `waitLocale()` 涵盖了按 locale 懒加载的需求。注意在首次绘制时根据 `isLoading` 做判断，否则会出现原始 key 闪烁的问题。如果应用未来可能引入服务端，请从第一天起就将 locale 放入 Svelte context 中，而不是依赖模块 store；这在当下毫无成本，却能避免未来在生产环境中出现难以排查的 bug。

</Accordion>
<Accordion header="支持 locale 路由与 SSR 的 SvelteKit">

状态共享问题决定了这个选择。`svelte-i18n` 可以在 SvelteKit 上运行，但针对每个请求的隔离配置（`hooks.server.ts`、`locals`、`load`，然后调用 `setContext`）需要你自己编写，稍有不慎就容易出错。Paraglide 提供了处理路由并按每次调用读取 locale 的 SvelteKit 集成，从而避开了单例问题。Intlayer 将 `load` 数据中的 locale 设置到 context 中。[SvelteKit i18n 文章](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/sveltekit.md) 解释了 `[[lang]]` 与 `reroute` 的选择，你应该在选定库之前做好这一决策。

</Accordion>
<Accordion header="翻译来自 TMS 或交付 ICU 的机构">

`svelte-i18n` 通过 `intl-messageformat` 原生支持 ICU，因此可以直接与大多数供应商对接。Paraglide 和 `typesafe-i18n` 使用自定义语法，需要进行格式转换。Intlayer 对 ICU 的支持是部分的，因此如果你目前重度依赖 ICU 字符串，应将其视为阻碍因素。

</Accordion>
<Accordion header="Bundle size 是最高优先级约束">

选择编译时方案。Paraglide 的 tree-shaking 在 Vite + Svelte 上有效，且库自身开销趋近于零。Intlayer 的按组件字典能达到相同的体积效果，且无需在代码库中存放生成文件。`svelte-i18n` 打包了 ICU 解析器以及完整 catalog，在基准测试中仅库自身体积（不含任何翻译内容）就是 `svelte-intlayer` 的约 4.5 倍。

</Accordion>
<Accordion header="类型安全不可妥协">

除了纯裸配置的 `svelte-i18n` 之外都可以（在 `svelte-i18n` 中唯一的类型化手段是手写 union，且会迅速与 JSON 脱节）。`typesafe-i18n`、Paraglide 和 Intlayer 都会根据内容自动生成类型。在将代码库绑定到 `typesafe-i18n` 之前，请先检查其仓库的活跃度。[检测缺失翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md) 一文对比了各方案在构建阶段能够捕获的错误类型。

</Accordion>
<Accordion header="不希望代码库中包含生成文件">

这排除了 Paraglide 和 `typesafe-i18n`。`svelte-i18n` 和 Intlayer 将产物保留在 `node_modules` 或构建目录中；在 Intlayer 中，`.content.ts` 文件是手写的源码，编译后的字典和类型存放在 `.intlayer/` 中并被 git 忽略。

</Accordion>
<Accordion header="翻译将由 AI 生成">

此时集中式 JSON 已没有下游消费者来证明其存在价值。就近放置的内容加上能够补全缺失 locale 的 CLI 是更短的路径。Intlayer 的 `fill` 命令可以使用你自己的 API key（OpenAI、Anthropic、Mistral、Gemini）运行，并且只重新翻译发生变更的部分。Paraglide 的 inlang 生态提供了带有对应订阅计划的托管替代方案。

</Accordion>
</AccordionGroup>

## 各库的不足与短板

- **`svelte-i18n`**：本组中最重，无 key 类型检查，不支持按路由代码分割，模块级 store 在 SvelteKit 上会跨请求泄漏，除非你自行配置 context。
- **`typesafe-i18n`**：需要 watcher 进程，代码库中存在生成文件，且该仓库近期活跃度较低。
- **Paraglide**：生成文件需要提交到代码库并在每次 push 前重新生成，并行分支容易产生 merge conflicts；locale 在每次消息调用时从 cookie 或 storage 中读取，而不是从 store 中读取，这在 locale 切换时会带来额外的开销。
- **`wuchale`**：提取理念新颖，但仍处于早期阶段。在 React 基准测试中遇到了需要强制 provider 重新渲染的响应性问题，且文档较为单薄。
- **Intlayer**：必须使用构建插件，生态相对较小，部分支持 ICU，且内容在设计上分散在代码库各处，因此导出单个 JSON 供人工翻译人员使用需要借助工具。

## 各选项的代码实现对比

同一个组件：包含标题和复数形式的购物车摘要，分别使用各候选方案编写。重点不在于 markup，而在于内容存放在哪里、locale 如何存储以及类型检查器能获知哪些信息。

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

  <Tabs group="locale">
  <Tab value="en" label="英语">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="法语">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="西班牙语">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

通过 `intl-messageformat` 解析 ICU，locale 保存在模块级 store 中。`$_` 接收任意字符串；唯一的类型检查是你手动编写的 union。

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="英语">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="法语">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="西班牙语">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

每条消息都是一个生成的、带类型的函数，如果从未调用会被 tree-shaking 剔除。`paraglide/` 文件夹生成在你的代码库中，locale 是在每次调用时读取，而不是从 store 中读取。

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

  <Tabs group="locale">
  <Tab value="en" label="英语">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

  </Tab>
  <Tab value="fr" label="法语">

```ts fileName="src/i18n/fr/index.ts"
import type { Translation } from "../i18n-types";

const fr = {
  cart: {
    title: "Votre panier",
    items: "{count} article{{s}}",
  },
} satisfies Translation;

export default fr;
```

  </Tab>
  <Tab value="es" label="西班牙语">

```ts fileName="src/i18n/es/index.ts"
import type { Translation } from "../i18n-types";

const es = {
  cart: {
    title: "Tu carrito",
    items: "{count} artículo{{s}}",
  },
} satisfies Translation;

export default es;
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

由 watcher 进程生成的类型化访问器。模型设计严谨；生成文件存放在代码库中，且该项目近期较为沉寂。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
      zh: "你的购物车",
    }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
      zh: plural({ other: "{{count}} 件商品" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

所有 locale 集中在组件旁的单个文件中。`useIntlayer` 返回一个 readable store，因此 `$content` 是你熟悉的自动订阅机制，且 locale 存放在 context 中（具备 SSR 安全性），而不是模块单例中。

  </Tab>
</Tabs>

已经在用 `svelte-i18n` 了？[`@intlayer/svelte-i18n` 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/svelte-i18n.md) 能够在打包工具层面为该 package 设置别名，从而让 `$_`、`$date`、`$number` 以及你的扁平 key 继续工作，同时底层由 Intlayer 提供内容服务。

## 做出承诺前需要注意的事项

功能特性表只能说明一个库今天能做什么。以下这些点则能告诉你长期维护它的体验如何。

**检查仓库活跃度。**

关注 commit 频率、issue 响应时间以及最近一次 minor release 是否在今年。一个没有维护者的优秀设计本质上只是一个等待重构的技术债。

**不要单纯依据 npm 下载量来选型。**

安装量最多的库往往是发布最早的库，而不是最适合 2026 年 Svelte 代码库的方案。下载量衡量的是历史沉淀，而不是契合度。

![JavaScript i18n 库梯队排行](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**了解谁在资助维护者，以及他们靠什么盈利。**

`svelte-i18n` 由 Crowdin 支持，类似于 `next-intl` 和 `vue-i18n`。`i18next` 由 Locize 支持。Tolgee、Paraglide (inlang) 和 Intlayer 运营着各自的平台。营收依赖于托管翻译服务的供应商，往往没有动力让翻译在你的本地工具链中免费完成。Intlayer 是该集合中唯一通过 CLI 支持使用你自己的 API key 进行 AI 翻译、且提供可自托管 CMS 的方案。

**是否对 AI Agent 友好？**

AI Agent 在处理 i18n 时仍面临挑战：它们容易遗漏 locale、臆造 key 并混淆消息语法。该库是否提供 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md) 或 [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)，以便 Agent 可以列出、补全和测试内容？内容加载是否默认经过优化，还是需要有人每个季度都去审查 namespace 和懒加载 import？

**开箱即用的类型安全。**

指的不是“通过额外配置可以实现类型化”，而是“在全新安装后，输入错误的 key 就会导致 `tsc` 报错”。检查在 key 不存在时以及某个 locale 缺失翻译时会发生什么。

**未引用内容的检测。**

Catalog 只会不断增长。Intlayer 的构建流程会清理未使用的字段并记录日志（`build.purge`）。Paraglide 通过架构天然实现这一点，因为未调用的消息函数会被 tree-shaking 剔除。其他方案则需要你自己去清理。

**开发者体验。**

从配置到输出第一个翻译字符串所需的时间、能够在 hover 时显示翻译并跳转到声明的 [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md) 或 [VS Code 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)、用于 fill、test 和 push 的 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)、能把组件中硬编码的字符串提取出来、免去逐个键维护的[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)或提取工具，以及非开发人员无需提交 pull request 即可编辑内容的方式（[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)）。

## 常见问题解答

<FAQ>

<Question title="svelte-i18n 在 2026 年仍然是合适的默认选择吗？">

对于 catalog 较小的 Vite SPA 来说，是的。它是文档最完善的选项，且 ICU 兼容性对许多团队非常重要。在 SvelteKit 上或页面数量超过几十个时，它的代价（无类型检查、无作用域划分、共享 store）就会开始累积显现。

</Question>

<Question title="Paraglide 的 tree-shaking 是真实有效的吗？">

在 Vite + Svelte 上是真实的，基准测试证实了这一点。但在 React 配合 TanStack Start 或 Next.js 的相同基准测试中并未生效。建议在自己的技术栈中进行验证，而不是盲信任意一边的结果。

</Question>

<Question title="Runes 会改变我对库的选择吗？">

它们改变的是你自己的 locale 状态语法，而不是状态共享的隔离问题。关键在于该库的运行时在 Svelte 5 上是否感知 runes，以及它是否使用 context 而非模块 store。这两点都需要确认。

</Question>

<Question title="库的选择会影响 SEO 吗？">

会有间接影响。搜索引擎爬虫关注的是路由、`hreflang`、`<html lang>` 以及文本是否包含在服务端渲染的 HTML 中。详情请参阅 [hreflang 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)。

</Question>

</FAQ>

## 深入阅读

- [Svelte i18n 基准测试：bundle 体积、泄漏与 locale 切换耗时](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/svelte.md)
- [Svelte i18n：stores、runes 与模块级陷阱](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/svelte.md) 以及 [SvelteKit i18n：路由、SSR 与共享状态](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/sveltekit.md)
- [开箱即用的 `svelte-i18n` 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/svelte-i18n.md)
- [JavaScript i18n 发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)
- [编译器 vs 声明式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md)
- [按组件 vs 集中式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)
- [构建时 bundle 优化原理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)
- [在 Vite + Svelte 应用中配置 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+svelte.md) 以及 [在 SvelteKit 应用中配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_svelte_kit.md)
- 针对 [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_react_i18n_library.md)、[Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_vue_i18n_library.md) 和 [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_solid_i18n_library.md) 的同类选型指南
