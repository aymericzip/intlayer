---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "如何在 2026 年选择合适的 Solid i18n 库"
description: "SolidJS 与 SolidStart 国际化选型指南。在对比 @solid-primitives/i18n、solid-i18next、Paraglide、Lingui 和 Intlayer 之前需要明确的关键问题，以及各方案在响应性、bundle size 与类型支持方面的权衡。"
keywords:
  - solidjs i18n
  - solid start i18n
  - solid 国际化
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - i18n 库对比
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# 如何选择合适的 Solid i18n 库

Solid 的响应式模型改变了 i18n 库所需承担的工作。组件仅运行一次，因此在 setup 阶段存储在 `const` 中的翻译只是一段冻结的静态字符串；而一个向你返回普通字符串而非 accessor 的库，会导致页面在切换语言时，除了那三个写了冻结字符串的组件之外其他地方都更新了。为 Solid 选择 i18n 库，一方面取决于 API 设计，另一方面取决于哪一个库能让你更难写出这种错误。

本指南列出了选型前需要明确的核心问题，并将它们映射到适用于 Vite + Solid 及 SolidStart 的 `@solid-primitives/i18n`、`solid-i18next`、Paraglide、`@lingui/solid` 和 Intlayer。

![Solid i18n 库生态系统](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 目录

<TOC/>

## 在对比各库之前需要回答的 6 个问题

1. **Vite SPA 还是 SolidStart？** 在 SPA 中，locale 可以仅仅存放在一个 signal 中。而在 SolidStart 中，locale 必须由服务端从 URL 解析，并且爬虫在没有 JavaScript 的情况下必须看到的内容（`<html lang>`、`hreflang`）都属于 `entry-server.tsx`。
2. **语言切换需要多高的响应性？** 切换语言时整页刷新对某些应用是可以接受的。如果不可接受，库提供的值必须是 signal 或 accessor，并且读取它们时必须被 track，而不是单纯复制值。
3. **谁来编写翻译？** 开发者、TMS、交付 ICU 字符串的翻译机构，还是 AI 流水线。`solid-i18next` 使用 i18next 的格式。`@solid-primitives/i18n` 取决于你的 dictionary 对象结构。请匹配对应的协作方。
4. **有多少个 locale 和页面？** 2 个 locale 和 5 个页面可以一次性打包所有内容。10 个 locale 和 40 个路由则无法承受，lazy catalog 加上按需 scoping 将成为主要成本。
5. **是否需要对 key 进行类型约束？** `@solid-primitives/i18n` 会直接从源 dictionary 推导类型。`solid-i18next` 需要手动声明类型。编译时方案则会自动生成类型。
6. **你需要多大的功能覆盖面？** Cookie 管理、带 locale 前缀的路由、重定向、格式化器（formatters）。最轻量的方案完全不包含这些功能，在业务规模扩大之前这没有任何问题。

记下你的答案，后文的所有内容都将围绕它们展开。

## 一图看懂生态格局

Solid 是这里最年轻的生态系统，可选项也最少，分布在三波演进浪潮中。

![JavaScript i18n 库发展史](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="运行时字典：solid-i18next">

专为 Solid 封装的 i18next。具备 namespace、backend、detector 以及积累了十年的插件生态。是所有方案中最重的，并且承担与 React 中相同的 `t("a.b")` 运行时开销。

</Accordion>
<Accordion header="极简原语（2022 年）：@solid-primitives/i18n">

一个由你自行维护的扁平 dictionary、一个返回 accessor 的 `translator()`，以及从源对象推导出的类型。体积极小，没有 scoping，没有路由，没有格式化器。社区的默认方案。

</Accordion>
<Accordion header="编译器与同构/同置内容（2024 至 2026 年）：Paraglide、Intlayer、@lingui/solid">

Paraglide 为每条消息生成一个独立函数。Intlayer 在 `.content.ts` 文件中按组件声明内容，并返回由 signal 驱动的节点。Lingui 的 Solid 绑定于 2026 年推出，带来了基于宏的内容提取能力。

</Accordion>
</AccordionGroup>

[JavaScript i18n 发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md) 详细介绍了每一波浪潮。

## 最关键的抉择：内容存放在哪里以及何时加载

两个架构层面的选择决定了不同方案之间大部分 bundle 体积的差异：

- **集中式还是组件级作用域内容（scoped content）。** 整个应用共用一个 dictionary，还是每个组件独立声明。
- **静态导入还是动态导入。** 启动时加载所有内容，还是仅按需获取当前激活的 locale（以及理想情况下当前激活的路由内容）。

下图估算了一个包含 1 到 10 个页面、翻译为 1 到 10 种语言环境、每页约 30 KB 文本的理论应用的 payload 大小。

![不同架构下的理论内容泄漏对比](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` 在这两个维度上都不做处理：你通过 `createResource` 按 locale 加载 dictionary，从而实现动态加载，其余部分完全由你自行实现。`solid-i18next` 支持 namespace 和 lazy backend，但没有强制映射机制，因此一个导入了 `common` 的公共组件会使该文件成为每个路由的依赖项。Paraglide 通过 tree-shaking 实现页面维度的拆分，但在 [Solid 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/solid.md) 的实现中并未生效。Intlayer 则通过按组件声明来实现这一目标。

如果你对第 4 个问题的回答是“许多页面”，那么相比任何 API 偏好，更应该重点权衡本节内容。[组件级与集中式 i18n 对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md) 一文从维护角度探讨了相同的权衡。

## 候选方案一览

各库的大小数据来自 [Solid 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/solid.md)：在包含 10 个页面、10 种语言环境的应用中，空组件内引入 provider 加上 accessor，经过打包、tree-shaking 和压缩（minification）后的体积。翻译内容单独计算。

| 库                       | 内容模型                       | 语言切换时的响应性                   | 类型安全                   | Scoping 与 Lazy Loading      | 库体积                             |
| :----------------------- | :----------------------------- | :----------------------------------- | :------------------------- | :--------------------------- | :--------------------------------- |
| `@solid-primitives/i18n` | 自行维护的扁平 dictionary      | Signal，translator 返回 accessor     | 3/5 — 从源 dictionary 推导 | 无内置支持                   | ~0.6 kB                            |
| `solid-i18next`          | i18next 目录与 namespace       | Store，通过 provider 触发重新渲染    | 2/5 — 手动声明             | Namespace、lazy backend      | ~14.9 kB                           |
| Paraglide                | inlang 项目，自动生成函数      | 每次调用时从 cookie 或 storage 读取  | 3.5/5 — 自动生成           | Tree-shaking（测试中未生效） | 接近于零（因为代码生成到代码库中） |
| `@lingui/solid`          | 代码中的源文本，编译生成的目录 | 基于 Signal                          | 2/5 — 来自编译器           | 按 catalog                   | ~11.8 kB                           |
| Intlayer                 | 每个组件对应一个 `.content.ts` | 基于 Signal 的节点，组件无需重新运行 | 5/5 — 自动生成，默认开启   | 支持，按组件划分             | ~4.3 kB                            |

> 数据为基准测试对应版本下的快照。`@lingui/solid` 的体积来自 TanStack Start 基准测试。在仅依据体积做决策之前，请先在自己的应用中进行测试。
> 类型安全：5/5 表示键、参数和每个语言环境均无需手动配置即可得到校验，包括 URL 格式化工具与辅助函数。

Paraglide 接近于零的库体积是由其架构决定的：运行时代码直接生成到你的代码仓库中。Intlayer 依赖 `vite-intlayer`，因此无法脱离构建步骤运行。

## 根据你的需求匹配最佳库

<AccordionGroup>
<Accordion header="Vite SPA，文案目录较小，希望轻装上阵">

`@solid-primitives/i18n`。扁平的 dictionary，返回 accessor 的 `translator()`，无需额外配置即可自动推导类型。对于小型应用来说是最佳选择，阅读其源码仅需十分钟。需要你自行编写的部分包括：locale 持久化、路由、格式化器以及按路由代码分割。如果这些需求列表不断增加，那就是迁移到更完善方案的信号。

</Accordion>
<Accordion header="来自 React 背景并拥有现成 i18next 代码库">

`solid-i18next` 允许你原封不动地复用现有的 catalog、namespace、backend 和 detector。它是所有选项中最重的一个，并且具有与 `react-i18next` 相同的成本：手动类型声明、虽然可行但耗时的优化工作，以及返回普通字符串的 `t()`，这很容易导致翻译被冻结的 bug。请务必将读取操作包裹在 JSX 或 memo 中，切勿在 setup 阶段将其存为变量。

</Accordion>
<Accordion header="采用带 locale 前缀路由与 SSR 的 SolidStart">

Locale 必须在服务端从 URL 中获取，以确保双端一致；在客户端才检测语言环境为时已晚。`@solid-primitives/i18n` 和 `solid-i18next` 将 `[[locale]]` 路由、`matchFilters`、重定向以及 `entry-server.tsx` 标签完全留给你自行处理。Paraglide 提供了一个处理路由的 Vite 插件。Intlayer 则直接内置了中间件与路由辅助工具。无论选择哪个方案，都请将 `<html lang>` 和 `hreflang` 放在 `entry-server.tsx` 中；在 SolidStart v2 中，`@solidjs/meta` 是在 hydration 之后才在客户端生效的。[Solid i18n 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/solid.md) 详细介绍了该配置流程。

</Accordion>
<Accordion header="语言切换必须即时且细粒度">

选择值基于 signal 或 accessor 且读取操作会被 track 的库。`@solid-primitives/i18n` 的 accessor 和 Intlayer 的节点都只会更新读取它们的 DOM 节点，无需重新运行组件。`solid-i18next` 通过 provider 触发重新渲染。Paraglide 在每次消息调用时从 cookie 或 storage 读取 locale，而不是从 signal 读取，虽然能正常工作，但每个节点承担的工作量超出了必要范围。

</Accordion>
<Accordion header="大型应用，路由众多，有严格的 bundle 预算">

采用在构建时编译的 scoped content 方案。Intlayer 仅打包路由实际渲染的内容。Paraglide 理论上应通过 tree-shaking 达到这一目标；建议在你的实际配置中进行验证，因为在基准测试中并未生效。对于 `solid-i18next`，从第一天起就应规划好 namespace 和 lazy loading 策略，并在 code review 中严格把关。

</Accordion>
<Accordion header="类型安全不可妥协">

`@solid-primitives/i18n` 开箱即用提供类型推导，这已经超越了大多数 React 库的能力。对于在 lazy loading 和按路由分割后依然有效的生成类型，Paraglide、`@lingui/solid` 和 Intlayer 都能直接从内容生成类型。[检测缺失翻译](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/detecting_missing_translations.md) 一文对比了各方案在构建时能捕获的错误。

</Accordion>
<Accordion header="翻译文案由 AI 自动生成">

在这种情况下，集中式 dictionary 已经没有存在的理由。组件同置内容（colocated content）加上能自动补全缺失语言的 CLI 是更高效的路径。Intlayer 的 `fill` 命令使用你自己的 API key（OpenAI、Anthropic、Mistral、Gemini）运行，并且仅重新翻译发生变更的内容。

</Accordion>
</AccordionGroup>

## 各库的局限与短板

- **`@solid-primitives/i18n`**：除了自行构建之外没有内置的 lazy loading 或 scoping，无内置路由，无 cookie 处理，无格式化器。非常适合小型应用，但在企业级专业项目中很快就会显得力不从心。
- **`solid-i18next`**：体积最重，需要手动声明类型，采用自有的复数格式，且 `t()` 返回字符串，导致如果在 setup 中存储翻译值就会出现文案冻结。
- **Paraglide**：生成的文件必须提交到代码仓库并在每次 push 前重新生成；tree-shaking 在 Solid 基准测试中未生效；每次调用时从 storage 读取 locale 而非基于 signal。
- **`@lingui/solid`**：2026 年推出的新库，生产环境反馈较少。继承了 Lingui 的 `extract` / `compile` 构建步骤以及多种相互重叠的语法。
- **Intlayer**：必须使用构建插件，生态相对较小，部分 ICU 支持，且内容在设计上分散在整个代码库中，因此导出单个 JSON 供人工翻译需要借助配套工具。

## 各方案的代码实现对比

使用各个候选方案实现同一个组件，包含标题和复数形式的购物车摘要。请注意翻译是在哪里读取的：在 JSX 中读取会被 track，而在 setup 函数体中读取则会变成冻结的字符串。

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="英语">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};
```

  </Tab>
  <Tab value="fr" label="法语">

```ts fileName="src/i18n/fr.ts"
import type { en } from "./en";

export const fr: typeof en = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="西班牙语">

```ts fileName="src/i18n/es.ts"
import type { en } from "./en";

export const es: typeof en = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Key 直接从 English 对象推导类型，无需 codegen 代码生成。没有复数规则，没有 lazy loading，也没有路由；每一项都需要你自行添加。

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="英语">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="法语">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="西班牙语">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

直接沿用 i18next 的 catalog、namespace 和插件。`t` 返回普通字符串，因此如果在 setup 阶段执行 `const title = t("cart:title")` 会导致文案冻结；请务必在 JSX 内部调用。

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

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

每条消息都是一个自动生成的、带类型的函数。Locale 在每次调用时从 cookie 或 storage 读取而非 signal，因此切换语言时的响应性需要你自行配置。

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      zh: "你的购物车",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        zh: "{{count}} 件商品",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        zh: "{{count}} 件商品",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

所有语言环境都集中在组件旁边的同一个文件中。`useIntlayer` 返回由 signal 驱动的节点，因此 locale 变更时仅更新读取它们的 DOM 节点。JSX 中的 `{content.title}` 会被 track；而 setup 函数体中的 `content.title.value` 则不会。

  </Tab>
</Tabs>

对于现有的 i18next 代码库，[i18next 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next.md) 可以在打包工具层面设置别名，使得现有的 catalog 和 `t()` 继续工作，同时由 Intlayer 提供内容支持，[迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 涵盖了其余细节。

## 做出最终决定前需考虑的事项

功能特性表只能告诉你一个库今天能做什么，而以下几点能告诉你与它长期共存的体验如何。

**检查代码仓库活跃度。**

关注 commit 提交频率、issue 响应时间，以及最近的 minor 版本是否发布在今年。一个设计良好但无人维护的项目，本质上就是一个等待迁移的隐患。

**不要单纯依据 npm 下载量选型。**

安装量最多的库往往只是最早发布的库，而不一定是契合 2026 年 Solid 代码库的库。下载量衡量的是历史，而不是契合度。

![JavaScript i18n 库天梯图](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**了解谁在为维护者提供资金支持，以及他们售卖什么。**

`i18next`（`solid-i18next` 背后的库）由 Locize 支持。`next-intl`、`vue-i18n`、`svelte-i18n` 和 Lingui 由 Crowdin 支持。Tolgee、Paraglide (inlang) 和 Intlayer 各自运营自己的平台。如果商业供应商的核心收入来自托管翻译服务，他们就几乎没有动力让你在自己的工具链内免费完成翻译。Intlayer 是该集合中唯一支持通过 CLI 使用你自己的 API key 进行 AI 翻译，并且提供可自托管 CMS 的方案。

**是否支持 AI Agent？**

AI Agent 在处理 i18n 时仍面临挑战：容易遗漏 locale、凭空捏造 key、混淆消息语法。该库是否提供了 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md) 或 [MCP 服务端](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)，以便 Agent 能够列出、填充和测试内容？内容加载是否默认经过优化，还是需要人工每季度审查 namespace 和 lazy import？

**开箱即用的类型安全。**

并非“经过额外配置后可以支持类型”，而是“在全新安装后输入错误的 key 就会导致 `tsc` 报错”。检查当 key 不存在以及某种语言缺少一条翻译时会发生什么。

**未引用内容的检测与清理。**

文案目录往往只增不减。Intlayer 的构建流程会清理未使用的字段并记录日志（`build.purge`）。Paraglide 通过架构天然实现这一点，因为未被调用的消息函数会被 tree-shake 移除。其他方案则需要你自行手动排查清理。

**开发者体验。**

从开始配置到翻译出第一个字符串所需的时间、能在 hover 时显示翻译并跳转到声明处的 [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md) 或 [VS Code 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)、用于填充、测试和推送的 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)、能把组件中硬编码的字符串提取出来、免去逐个键维护的[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)或提取工具，以及非开发人员无需提交 Pull Request 即可编辑内容的方式（[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)）。

## 常见问题解答

<FAQ>

<Question title="@solid-primitives/i18n 足以用于生产环境吗？">

对于小型应用来说足够了，并且它是现有最轻量的选择。但当你需要按路由划分 lazy catalog、SolidStart 上的 locale 路由、cookie 持久化或格式化器时，它就不再够用，因为所有这些都需要你自行构建。

</Question>

<Question title="为什么切换 locale 时翻译没有更新？">

因为 Solid 组件仅执行一次。在 setup 阶段赋值给 `const` 的翻译只是一个普通字符串，而不是一个响应式订阅。请在 JSX、effect 或 memo 内部读取它，或者选择值本身就是 accessor 的库，从而降低写错的概率。

</Question>

<Question title="我需要基于编译器的库吗？">

只有当 bundle 体积、生成的类型定义或构建时缺失 key 检查是你的硬性需求时才需要。[编译器与声明式 i18n 对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md) 一文解释了编译器能为你带来什么，以及它们在哪些场景下可能会出现偏差。

</Question>

<Question title="库的选择会影响 SEO 吗？">

间接影响。搜索引擎爬虫关注路由、`hreflang`、`<html lang>` 以及文本是否存在于服务端渲染的 HTML 中，在 SolidStart 中这意味着需要配置好 `entry-server.tsx`。详见 [hreflang 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)。

</Question>

</FAQ>

## 深入了解

- [Solid i18n 基准测试：bundle 大小、泄漏与语言切换耗时](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/solid.md)
- [Solid i18n：为什么切换语言时翻译会冻结](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/list_i18n_technologies/frameworks/solid.md)
- [即插即用的 i18next 兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next.md) 与 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md)
- [JavaScript i18n 发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)
- [编译器与声明式 i18n 对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/compiler_vs_declarative_i18n.md)
- [组件级与集中式 i18n 对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)
- [构建时 bundle 优化原理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)
- [在 Vite + Solid 应用中配置 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+solid.md) 与 [在 SolidStart 应用中配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_solid_start.md)
- 同系列指南：[React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_react_i18n_library.md)、[Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_vue_i18n_library.md) 与 [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/how_to_pick_svelte_i18n_library.md)
