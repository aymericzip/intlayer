---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: 2026 年 TanStack Start 最佳 i18n 解决方案 - 基准测试报告
description: 对比 react-i18next、use-intl 和 Intlayer 等 TanStack Start 国际化库。关于打包体积、泄漏和响应性的详细性能报告。
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - 性能
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "初始化基准测试"
---

# TanStack Start i18n 库 — 2026 年基准测试报告

本页面是关于 TanStack Start i18n 解决方案的基准测试报告。

## 目录

<Toc/>

## 交互式基准测试

<I18nBenchmark framework="tanstack" vertical/>

## 结果参考：

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md

查看完整的基准测试仓库[点击这里](https://github.com/intlayer-org/benchmark-i18n/tree/main)。

## 简介

国际化解决方案是 React 应用中最重型的依赖之一。在 TanStack Start 上，主要风险在于发送了不必要的内容：同个路由的打包包中包含了其他页面和其他语言环境的翻译。

随着应用规模的增长，这个问题会使发送到客户端的 JavaScript 体积迅速膨胀，并拖慢导航速度。

实际上，在优化程度最低的实现中，国际化后的页面体积可能比无 i18n 的版本重数倍。

另一个影响是开发体验（DX）：内容声明方式、类型、命名空间组织、动态加载以及语言环境更改时的响应性。

## 测试你的应用

为了快速发现 i18n 泄漏问题，我建立了一个免费扫描器，你可以在[这里](https://intlayer.org/i18n-seo-scanner)试用。

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 问题所在

要限制多语言应用的成本，有两个关键手段：

- 按页面/命名空间拆分内容，这样在不需要时就不会加载整个字典
- 仅在需要时动态加载正确的语言环境

理解这些方法的技术限制：

**动态加载**

如果没有动态加载，大多数解决方案会从第一次渲染开始就将消息保留在内存中，这对于路由和语言环境较多的应用来说会产生巨大的开销。

采用动态加载意味着需要权衡：初始 JS 减少了，但有时切换语言时会多出一次请求。

**内容拆分**

围绕 `const t = useTranslation()` + `t('a.b.c')` 构建的语法非常方便，但往往鼓励在运行时保留大型 JSON 对象。除非库提供了真正的按页拆分策略，否则这种模型很难进行 Tree-shaking。

## 方法论

在此基准测试中，我们对比了以下库：

- `Base App`（无 i18n 库）
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

框架使用 `TanStack Start`，构建了一个拥有 **10 个页面**和 **10 种语言**的多语言应用。

我们对比了**四种加载策略**：

| 策略         | 无命名空间（全局）                 | 有命名空间（局部/作用域）                                    |
| :----------- | :--------------------------------- | :----------------------------------------------------------- |
| **静态加载** | **Static**: 启动时全部加载到内存。 | **Scoped static**: 按命名空间拆分；启动时全部加载。          |
| **动态加载** | **Dynamic**: 按语言环境按需加载。  | **Scoped dynamic**: 按命名空间和语言环境进行更细粒度的加载。 |

## 策略总结

- **Static (静态)**: 简单；初始加载后无网络延迟。缺点：打包体积大。
- **Dynamic (动态)**: 减轻初始重量（懒加载）。适用于语言环境较多的情况。
- **Scoped static (局部静态)**: 保持代码组织良（逻辑分离），且无需复杂的额外网络请求。
- **Scoped dynamic (局部动态)**: 代码分割和性能的最佳方案。通过仅加载当前视图和活动语言环境所需的内容来最小化内存占用。

## 结果详情

### 1 — 应当避免的解决方案

应当明确避开诸如 `gt-react` 或 `lingo.dev` 之类的解决方案。它们结合了供应商锁定和代码库污染。更糟的是：尽管投入了大量时间尝试实施，但我从未让它们在 TanStack Start 上正常工作（类似于 Next.js 下的 `gt-next`）。

遇到的问题：

**(General Translation)** (`gt-react@latest`):

- 对于一个约 110kb 的应用，`gt-react` 额外增加了超过 440kb（参考同个基准测试中 Next.js 实现的量级）。
- 第一次使用 General Translation 构建就提示 `Quota Exceeded, please upgrade your plan`。
- 翻译未渲染；我收到了错误 `Error: <T> used on the client-side outside of <GTProvider>`，这似乎是库的一个 Bug。
- 在实施 **gt-tanstack-start-react** 时，我还遇到了该库的一个[问题](https://github.com/generaltranslation/gt/issues/1210#event-24510646961)：`does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`，这导致应用崩溃。在报告此问题后，维护者在 24 小时内修复了它。
- 这些库通过 `initializeGT()` 函数使用了一种反模式，阻碍了打包包进行干净的 Tree-shaking。

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- AI 配额超出（或服务端依赖受阻），使得不付钱的情况下构建或部署极具风险。
- 编译器丢失了近 40% 的翻译内容。我不得不将所有的 `.map` 重写为扁平的组件块才使其工作。
- 它们的 CLI 存在 Bug，会无故重置配置文件。
- 构建时，当有新内容添加时，它会完全抹除生成的 JSON 文件。结果是几个键的改动就可能抹去数百个现有键。
- 我曾在 TanStack Start 上遇到该库的响应性问题：切换语言环境时，我必须强制重新渲染 Provider 才能使其生效。

### 2 — 实验性解决方案

**(Wuchale)** (`wuchale@0.22.11`):

`Wuchale` 背后的想法很有趣，但尚非可行方案。我遇到了该库的响应性问题，不得不强制重新渲染 Provider 才能让应用在 TanStack Start 上运行。文档也相当模糊，增加了上手难度。

### 3 — 可接受的解决方案

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` 提供了一种创新且经过深思熟虑的方法。即便如此，在此基准测试中，其公司宣称的 Tree-shaking 在我的 Next.js 实现或 TanStack Start 中并未生效。工作流和 DX 也比其他选项更复杂。就个人而言，我不喜欢每次推送到代码库前都要重新生成 JS 文件，这通过 PR 产生了持续的合并冲突风险。

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` 解决了前面提到的许多问题。我发现它比其他采用类似方法的工具更难上手。它不提供类型安全，这极大增加了在编译时捕捉缺失键的难度。我不得不使用自己的 API 封装 Tolgee 的 API 以添加缺失键检测。

在 TanStack Start 上我也遇到了响应性问题：切换语言环境时，我必须强制 Provider 重新渲染并订阅语言环境更改事件，切换后的加载才能正常进行。

**(use-intl)** (`use-intl@4.9.1`):

`use-intl` 是 React 生态中最时髦的“intl”成员（与 `next-intl` 同系），常被 AI Agent 推荐，但在我看来，在性能优先的环境下这是错误的。入门相对简单，但在实践中，优化和限制泄漏的过程相当复杂。同样，结合动态加载 + 命名空间 + TypeScript 类型会极大降低开发速度。

在 TanStack Start 上你可以避开 Next.js 特有的陷阱（`setRequestLocale`、静态渲染），但核心问题是一样的：如果没有严格的规范，打包包很快会承载过多消息，而且维护每条路由的命名空间会变得非常痛苦。

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next` 可能最受欢迎，因为它是最早满足 JavaScript 应用 i18n 需求的方案之一。它还针对特定问题拥有广泛的社区插件。

尽管如此，它与基于 `t('a.b.c')` 的技术栈有着相同的重大缺点：优化是可能的，但非常耗时，且大型项目容易陷入不良实践（命名空间 + 动态加载 + 类型）。

消息格式也不同：`use-intl` 使用 ICU MessageFormat，而 `i18next` 使用自己的格式——如果混合使用它们，会增加工具链或迁移的复杂度。

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` 常受赞誉。就个人而言，我觉得围绕 `lingui extract` / `lingui compile` 的工作流比其他方案更复杂，且在此 TanStack Start 基准测试中没有明显的优势。我还注意到语法不统一，容易误导 AI（例如 `t()`、`t''`、`i18n.t()`、`<Trans>`）。

**(react-intl)** (`react-intl@10.1.1`):

`react-intl` 是来自 Format.js 团队的高性能实现。但 DX 依然繁琐：`const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` 增加了复杂度和额外的 JavaScript 开销，并将全局 i18n 实例绑定到了 React 树中的许多节点。

### 4 — 推荐方案

在本次 TanStack Start 基准测试中，没有与 `next-translate`（Next.js 插件 + `getStaticProps`）直接对应的方案。对于那些确实想要 `t()` API 且拥有成熟生态的团队，`react-i18next` 和 `use-intl` 仍是“合理”的选择，但要做好投入大量时间进行优化以避免泄漏的准备。

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

出于客观性考量，我不会亲自评价 `react-intlayer`，因为这是我自己的解决方案。

### 个人见解

此见解纯属个人观点，不影响基准测试结果。尽管如此，在 i18n 领域，常能看到关于 `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` 模式的共识。

在 React 应用中，我个人认为将函数作为 `ReactNode` 注入是一种反模式。它还会增加可避免的复杂性和 JavaScript 执行开销（即使几乎察觉不到）。
