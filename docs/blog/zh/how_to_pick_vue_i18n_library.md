---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "如何在 2026 年选择合适的 Vue i18n 国际化库"
description: Vue 与 Nuxt 国际化选型决策指南。在对比 vue-i18n、@nuxtjs/i18n、fluent-vue、Paraglide 与 Intlayer 之前需要明确的关键问题，以及各方案在打包体积（bundle size）、类型支持（typing）与 SSR 负载方面的成本权衡。
keywords:
  - vue i18n
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# 如何选择合适的 Vue i18n 库

"Vue i18n" 既是一个通用术语，也是几乎所有人都会安装的库的名称。这既方便又容易产生误解：`vue-i18n` 是一个不错的默认选择，但它并非唯一选项。而在执行 `npm install` 之前，往往很少有人会先思考那些决定技术选型的关键问题（是否使用 SSR、页面数量有多少、谁来编写翻译）。

本指南将首先梳理这些问题，然后将答案映射到适用于原生 Vite + Vue 以及 Nuxt 的库。

![Vue i18n 库生态系统](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 目录

<TOC/>

## 对比各库之前需要回答的 6 个问题

1. **Vite SPA 还是 Nuxt？** 在 SPA 中，语言包的成本主要是 JS bundle 体积问题。在 Nuxt 中，它还会变成 HTML payload 问题，因为翻译文本会被序列化到 SSR state 中并在客户端进行 hydration。绝大多数关于“vue-i18n 运行缓慢”的反馈都源于 Nuxt 应用的这一机制。
2. **谁来编写翻译？** 开发者、TMS、交付 ICU 字符串的翻译机构，还是 AI pipeline。`vue-i18n` 使用其特有的管道符分隔复数语法，而非标准 ICU 格式。如果文案来自外部，这一点非常关键。
3. **有多少个 locale 和页面？** 2 个 locale 和 5 个页面可以直接打包所有内容。10 个 locale 和 40 个路由则不可行，此时加载策略会成为主要的性能瓶颈。
4. **翻译 key 是否需要类型检查？** 在 `vue-i18n` 中，除非传入 message schema 泛型，否则 `t("cart.totl")` 仍然可以通过编译，而该 schema 往往又会与懒加载语言包产生冲突。
5. **内容包含什么？** 仅包含 UI 标签，还是包含 markdown、句中链接以及针对特定 locale 的组件。当面对富文本内容时，返回纯字符串的 `t()` 会显得力不从心。
6. **CSP 是否是硬性约束？** 默认的 `vue-i18n` 构建会在浏览器中使用 `new Function` 编译 message。纯 runtime 构建需要配合 `@intlify/unplugin-vue-i18n` 在 build time 进行预编译。

记录下这些问题的答案。下文的所有分析都将围绕它们展开。

## 整体格局一览

Vue 生态中的 i18n 库比 React 更少，且它们源于不同的架构发展浪潮。

![JavaScript i18n 库发展历程](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="运行时字典（2015 至 2019）：vue-i18n, @nuxt/i18n">

`vue-i18n` 出现于 2015 年，自此成为默认选择。`@nuxt/i18n` 对其进行了封装，提供了 locale 路由、SEO 标签以及按 locale 懒加载功能。Message 会被编译为 render function，如果配置了 unplugin 则在 build time 编译，否则在浏览器运行时编译。

</Accordion>
<Accordion header="替代格式（2020）：fluent-vue">

Mozilla Fluent 的 `.ftl` 文件带来了更友好的 message 语法，并支持感知语法的多变体处理。但它不支持 key 的类型推导，且 Vite 插件会将所有 locale 全部打包进每个页面中。

</Accordion>
<Accordion header="编译器与就近放置内容（2024 至 2026）：Paraglide, Intlayer">

Paraglide 为每个 message 生成一个独立函数，并交由打包工具（bundler）进行 tree-shaking。Intlayer 则在 `.content.ts` 文件中针对每个 component 声明内容，自动生成类型定义，并仅按需传输当前路由渲染所需的内容。

</Accordion>
</AccordionGroup>

[JavaScript i18n 发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)详细介绍了各个发展阶段。

## 最关键的决策：内容存放在哪里以及何时加载

两种结构性选择决定了不同方案之间大部分的 bundle 体积差异：

- **集中式还是局部作用域（scoped）内容。** 整个应用共用一个 `locales/en.json`，还是每个 component 各自声明。
- **静态导入还是动态导入。** 启动时全量加载，还是按需获取当前激活的 locale（理想情况下还包括当前路由）。

下图估算了一个包含 1 到 10 个页面、翻译为 1 到 10 种语言、每页约 30 KB 文本的理论应用的 payload 情况。

![不同架构下的理论内容泄漏情况](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` 支持动态加载维度：在 `import()` 后调用 `setLocaleMessage` 意味着不再需要加载用户不阅读的其他 9 种语言。但它无法做到按页面维度拆分。一个 locale 的 catalog 是一个完整的对象，加载它会同时载入每个页面的文案。在 SPA 中可能不易察觉，但在使用 `@nuxtjs/i18n` 且页面超过 10 个的 Nuxt 应用中，每个路由都会重复携带所有其他路由的文本两次：一次在 JS chunk 中，另一次在 SSR payload 中。

[Vue 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/vue.md)将其衡量为“其他路由泄漏”和“其他 locale 泄漏”。如果对第 3 个问题的回答是“页面很多”，那么这一部分的考量将重于任何 API 偏好。[组件级对比集中式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)一文讨论了同一权衡在维护层面的影响。

## 候选库对比

库体积数据来自 [Vue 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/vue.md)：在包含 10 个页面、10 种语言的应用中，空 component 中引入 plugin 加上 composable，在打包、tree-shaking 和代码压缩后的体积。内容大小单独计算。

| 库             | 内容模型                                            | 类型安全                       | Message 格式                        | 按路由代码拆分        | 库体积                             |
| :------------- | :-------------------------------------------------- | :----------------------------- | :---------------------------------- | :-------------------- | :--------------------------------- |
| `vue-i18n`     | 每个 locale 集中式 catalog，可选 SFC `<i18n>` block | 2/5 — 通过 schema 泛型手动启用 | 自定义（管道符复数）                | 否                    | ~24.3 kB                           |
| `@nuxtjs/i18n` | 与 `vue-i18n` 相同，外加路由与 SEO 标签支持         | 2/5 — 相同                     | 相同                                | 否，仅按 locale 拆分  | ~24.3 kB                           |
| `fluent-vue`   | `.ftl` 文件（Mozilla Fluent）                       | 1/5 — 无                       | Fluent                              | 否                    | ~29.7 kB                           |
| Paraglide      | inlang 项目，自动生成函数                           | 3.5/5 — 自动生成               | 自定义                              | 通过 tree-shaking     | 接近于 0（因为代码生成到代码库中） |
| Intlayer       | 每个 component 一个 `.content.ts`                   | 5/5 — 自动生成，默认开启       | Intlayer (+ ICU, i18next, vue-i18n) | 是，按 component 拆分 | ~3.9 kB                            |

> 数据仅代表基准测试当时版本的快照。在仅凭体积做决定之前，建议在自己的应用中进行测试。
> 类型安全：5/5 表示键、参数和每个语言环境均无需手动配置即可得到校验，包括 URL 格式化工具与辅助函数。

Paraglide 接近于零的运行时体积源于其架构设计：运行时代码直接生成到你的代码库中，这意味着每次 push 前都需要重新生成，并且生成的文件容易引发 merge conflict。Intlayer 需要 `vite-intlayer`（或 Nuxt 模块）支持，因此必须依赖构建步骤。

## 将需求与库进行匹配

<AccordionGroup>
<Accordion header="Vite SPA，小型团队，少数 locale">

使用 Composition 模式（`legacy: false`）的 `vue-i18n`，配合 `@intlify/unplugin-vue-i18n` 仅引入 runtime-only build。使用 `import()` 懒加载 locale。这能满足大多数小型应用的需求，社区解决方案也随处可见。SFC 的 `<i18n>` block 能将 message 与 component 放在一起，这很有帮助，但围绕它们的提取和 TMS 工具链没有 JSON catalog 那么完善，因此团队应尽早确定使用哪种方式。

</Accordion>
<Accordion header="具备 locale 路由、sitemap 和 hreflang 的 Nuxt 应用">

`@nuxtjs/i18n` 开箱即用地提供了路由策略、`hreflang` 标签和 locale 检测功能，单凭这一点就足以让它成为页面较少的内容类网站的理想之选。它的限制在于按 locale 管理的 catalog：超过 10 个页面后，SSR payload 就会携带所有页面的文案。如果属于这种情况，要么手动为 `vue-i18n` 配置按路由拆分 message，要么转向局部作用域内容方案。[Nuxt i18n 文章](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/nuxt.md)首先详细介绍了路由策略的选择。

</Accordion>
<Accordion header="翻译来自 TMS 或交付 ICU 格式的翻译机构">

`vue-i18n` 的复数语法（`"no item | one item | {count} items"`）并非 ICU 格式，无法通用。需要特别告知翻译人员，且 TMS 导出的内容也不会生成该格式。要么在建立第一个 catalog 之前统一格式，要么选择格式与供应商兼容的库。Intlayer 目前对 ICU 仅提供部分支持，因此如果现在接收的是 ICU 字符串，这一点也需要重点考虑。

</Accordion>
<Accordion header="大型应用，路由众多，对 bundle 或 SSR payload 预算有严格限制">

优先选择在 build time 编译的局部作用域内容方案。Paraglide 通过 tree-shaking 达成这一目标，在 Vite 上表现符合预期。Intlayer 则通过按 component 声明来实现，仅传输当前路由渲染所需的内容。在 `vue-i18n` 中，虽然可以手动按路由拆分 message，但没有强制约束机制，一旦某个公共 component 引入了全局命名空间，就会在无形中破坏这种拆分。

</Accordion>
<Accordion header="类型安全不可妥协">

`vue-i18n` 可以通过向 `createI18n` 传递 schema 泛型来实现类型推导。虽然可行，但一旦使用懒加载 catalog 就会失效，因为 schema 描述的 message 当时可能尚未加载。如果不希望手动维护这些，请选择能够根据内容自动生成类型的库：Paraglide 或 Intlayer。[检测缺失翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md)一文对比了各方案在 build time 能捕获的问题。

</Accordion>
<Accordion header="内容不仅限于 UI 标签">

Markdown 页面、中间带有 `<RouterLink>` 的句子、按 locale 定制的 component。`vue-i18n` 提供了用于 component 插值的 `<i18n-t>`，功能可用但较为繁琐。Intlayer 的 content node 可以直接支持 markdown、HTML 和嵌套 object，更适合内容密集型应用。

</Accordion>
<Accordion header="翻译将由 AI 生成">

在这种情况下，集中式 JSON 失去了存在的必要。就近放置内容加上自动补全缺失 locale 的 CLI 是更高效的路径。Intlayer 的 `fill` 命令可以使用你自己的 API key（OpenAI、Anthropic、Mistral、Gemini）运行，并且只对发生变更的内容进行增量翻译。

</Accordion>
</AccordionGroup>

## 各库的不足之处

- **`vue-i18n`**：体积最大，采用自定义复数格式，类型支持需要手动配置且在懒加载时较脆弱，不支持按路由作用域划分，未使用的废弃 key 会默默堆积。在 Vue 3 应用中保留 `legacy: true` 会保留 Vue 2 兼容层，并失去 `useI18n()` 的类型推导支持。
- **`@nuxtjs/i18n`**：继承了上述所有缺点，且一旦路由超过十几个，SSR payload 就会携带所有页面的字符串。
- **`fluent-vue`**：Message 语法优秀，但缺乏 key 类型检查，且 Vite 插件会将所有语言的所有内容打包进每个页面中。基准测试中体积最大。
- **Paraglide**：生成的文件需要提交到 Git 仓库，每次 push 前都要重新生成，且每次调用 message 时都是从 cookie 或 storage 读取 locale，而非响应式 store，在切换 locale 时会带来额外开销。
- **Intlayer**：必须依赖构建插件，生态相对较小，对 ICU 仅部分支持，且内容在设计上分散在整个 codebase 中，因此为翻译人员导出单个 JSON 文件需要额外工具支持。

## 各方案的代码实现示例

下面是用各候选库编写的同一个 component 示例：包含标题和复数计数的购物车摘要。值得关注的不是 template 本身，而是内容存放在哪里以及 `vue-tsc` 对其类型了解多少。

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="英语">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="法语">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="西班牙语">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

使用管道符分隔的复数是 vue-i18n 特有的格式，并非 ICU。除非向 `createI18n` 传递 message schema 泛型，否则 `t` 可以接受任意字符串。

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="英语">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="法语">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="西班牙语">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Fluent 的语法能很好地处理复数和语法变体。Message id 是无类型的字符串，且 Vite 插件会将所有 locale 打包进每个页面。

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

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

每个 message 都是生成的类型化函数，因此遗漏 key 会直接报 import 错误。`paraglide/` 目录会生成到仓库中，并在每次修改时重新生成。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      zh: "你的购物车",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      zh: plural({ other: "{{count}} 件商品" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

所有语言集中在 component 旁边的同一个文件中。类型在构建时生成，因此 `title` 支持自动补全，拼写错误无法通过 `vue-tsc` 校验。`<title />` 会渲染为一个可视化编辑器可以定位的 node；`{{ items(props.count) }}` 则返回纯字符串。

  </Tab>
</Tabs>

已经在用 `vue-i18n`？[`@intlayer/vue-i18n` 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/vue-i18n.md)可以在 bundler 层对 package 进行别名替换，因此在 Intlayer 提供内容服务的同时，`useI18n()`、`$t`、管道符复数和 `v-t` 仍可继续正常工作。[迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_vue-i18n_to_intlayer.md)介绍了后续如何彻底移除适配器，同时也有针对 [Nuxt 的专属迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_nuxtjs_i18n_to_intlayer.md)。

## 最终选型前的建议

功能特性表只能说明一个库当前支持什么，而以下几点则决定了长期维护的实际体验。

**检查仓库活跃度。**

查看 Commit 频率、Issue 响应时间，以及最近一次 minor release 是否在今年发布。一个缺乏维护者的优秀设计最终只会演变成一场不得不面对的迁移。

**不要盲目根据 npm 下载量选型。**

安装量最多的库往往只是因为发布最早，并不代表它适合 2026 年的 Vue codebase。下载量反映的是历史沉淀，而不是契合度。

![JavaScript i18n 库梯队排名](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**了解谁在资助维护者，以及他们的盈利模式。**

`vue-i18n` 由 Crowdin 赞助（如同 `next-intl` 和 `svelte-i18n`），`i18next` 由 Locize 赞助。Tolgee、Paraglide（inlang）和 Intlayer 则各自运营自己的平台。如果供应商的收入来自托管翻译服务，他们就缺乏动力在开发工具链内部提供免费翻译能力。Intlayer 是其中唯一支持在 CLI 中通过自带 API key 进行 AI 翻译，并且提供可自托管 CMS 的方案。

**是否支持 AI Agent？**

AI Agent 在处理 i18n 时仍常遇到困难：容易遗漏 locale、捏造 key，或混淆 message 语法。该库是否提供了 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md) 或 [MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)，以便 Agent 列出、填充和测试内容？此外，内容加载是否默认进行了优化，还是需要每个季度人工审查 namespace 和懒加载导入？

**开箱即用的类型安全。**

指的不是“经过额外配置后支持类型”，而是“在全新安装的项目中，错误的 key 会直接导致 `tsc` 报错”。检查当 key 不存在时，或者某个 locale 缺失某条翻译时，系统的表现如何。

**未使用内容的检测能力。**

语言包文件往往只增不减。Intlayer 的 build 过程可以清理未使用的字段并输出日志（`build.purge`）。Paraglide 则在架构层面通过 tree-shaking 自动剔除未调用的 message 函数。其他库通常需要人工进行清理。

**开发者体验。**

从环境配置到输出第一个翻译字符串的时间；是否提供 [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md) 或 [VS Code 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)以支持悬停预览翻译和跳转定义；是否包含用于 fill、test 和 push 的 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)、能把组件中硬编码的字符串提取出来、免去逐个键维护的[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)或提取工具；以及是否为非开发人员提供了无需提交 Pull Request 即可编辑内容的途径（[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)）。

## 常见问题解答

<FAQ>

<Question title="在 2026 年，vue-i18n 仍然是合适的默认选择吗？">

对于大多数 Vue 应用来说，是的。它的生态系统最完善，文档详尽，且成本可预期：较大的运行时体积、自定义的复数格式，以及需要自行构建和维护的按路由作用域划分机制。

</Question>

<Question title="在 Nuxt 中应该使用 @nuxtjs/i18n 还是手动集成 vue-i18n？">

除非路由结构非常特殊或应用页面极少，否则建议使用官方模块。手动集成意味着需要自行实现 locale 路由、middleware、`hreflang` 和 sitemap，这些工作比看起来要复杂得多。

</Question>

<Question title="我需要基于编译器的库吗？">

只有在 bundle 体积、SSR payload、生成的类型推导或构建时缺失 key 检查确实是刚需时才需要。[编译器对比声明式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md)一文解释了编译器能带来的优势以及可能出现的问题。

</Question>

<Question title="库的选择会影响 SEO 吗？">

会产生间接影响。搜索引擎爬虫关注的是路由结构、`hreflang`、`<html lang>` 以及文本是否包含在服务端渲染的 HTML 中。详见 [hreflang 多语言 SEO 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)。

</Question>

</FAQ>

## 延伸阅读

- [Vue i18n 基准测试：打包体积、泄漏分析与语言切换耗时](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/vue.md)
- [Vue i18n：vue-i18n 的工作原理与痛点](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/vue.md) 与 [Nuxt i18n 文章](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer 功能逐项对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/vue-i18n_vs_intlayer.md) 与 [vue-i18n vs Intlayer 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/vue-i18n_vs_intlayer_benchmark.md)
- [vue-i18n 过时了吗？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/is_vue-i18n_outdated.md)
- [JavaScript i18n 发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)
- [编译器对比声明式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md)
- [组件级对比集中式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)
- [在 Vite + Vue 应用中配置 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md) 与 [在 Nuxt 应用中配置 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nuxt.md)
- 针对其他框架的选型指南：[React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_react_i18n_library.md)、[Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_svelte_i18n_library.md) 以及 [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_solid_i18n_library.md)
