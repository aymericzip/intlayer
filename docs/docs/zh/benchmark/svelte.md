---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: 2026 年 Svelte 最佳 i18n 解决方案 - 基准报告
description: 比较 Svelte 国际化（i18n）库，如 svelte-i18n、Paraglide 和 Intlayer。关于包大小、泄漏和反应性的详细性能报告。
keywords:
  - benchmark
  - i18n
  - intl
  - svelte
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - svelte
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-svelte-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "添加 GitHub 明星对比"
  - version: 8.7.12
    date: 2026-01-06
    changes: "初始化基准"
---

# Svelte i18n 库 - 2026 基准报告

此页面是 Svelte 上 i18n 解决方案的基准报告。

## 目录

<Toc/>

## 交互式基准

<I18nBenchmark framework="vite-svelte" vertical/>

## 结果参考：

<ClickToOpenIframe
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md"
  width="100%"
  height="600px"
  style="border:none;"
/>

> [查看完整的基准测试数据](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_svelte.md)

查看完整的基准仓库 [此处](https://github.com/intlayer-org/benchmark-i18n/tree/main)。

## 简介

国际化解决方案是 Svelte 应用中最重的依赖项之一。主要风险是发送不必要的内容：单个路由包中包含其他页面和其他语言的翻译。

随着应用增长，这个问题会迅速增加发送到客户端的 JavaScript，并减慢导航速度。

实际上，对于优化最差的实现，国际化页面的重量可能是非 i18n 版本的几倍。

另一个影响是开发者体验（DX）：如何声明内容、类型、命名空间组织、动态加载以及语言更改时的反应性。

## TL;DR

- **Intlayer**: 性能最高效的选择（v8.7.12），占用空间最小。
- **Paraglide**: tree-shaking 的有力竞争者，但开发者体验更复杂，且有反应性开销。
- **svelte-i18n**: 功能完善且是 Svelte 的标准，但包重量大得多（约为 Intlayer 的 7 倍）。

## 测试您的应用

为了快速发现 i18n 泄漏问题，我建立了一个免费扫描仪，可在 [此处](https://intlayer.org/i18n-seo-scanner) 试用。

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 问题所在

限制多语言应用成本有两个关键杠杆：

- 按页面 / 命名空间拆分内容，这样在不需要时就不会加载整个字典
- 仅在需要时动态加载正确的语言

了解这些方案的技术限制：

**动态加载**

如果没有动态加载，大多数解决方案会从首次渲染开始将消息保留在内存中，这对于具有许多路由和语言的应用会产生显著开销。

使用动态加载，您接受一个权衡：减少初始 JS，但有时在切换语言时会有额外的请求。

**内容拆分**

围绕 `t('a.b.c')` 构建的语法非常方便，但往往鼓励在运行时保留大型 JSON 对象。这种模式使 tree-shaking 变得困难，除非库提供真正的按页面拆分策略。

## 研究方法

在此基准测试中，我们比较了以下库：

- `Base App`（无 i18n 库）
- `svelte-intlayer` (v8.7.12)
- `svelte-i18n` (v4.0.1)
- `@inlang/paraglide-js` (v2.17.0)

框架是 `Svelte`，应用包含 **10 个页面** 和 **10 种语言**。

我们比较了 **四种加载策略**：

| 策略         | 无命名空间（全局）                     | 具有命名空间（分层/scoped）                             |
| :----------- | :------------------------------------- | :------------------------------------------------------ |
| **静态加载** | **Static**: 启动时所有内容都在内存中。 | **Scoped static**: 按命名空间拆分；启动时加载所有内容。 |
| **动态加载** | **Dynamic**: 按需按语言加载。          | **Scoped dynamic**: 按命名空间和语言进行细粒度加载。    |

## 策略摘要

- **静态 (Static)**: 简单；初始加载后无网络延迟。缺点：包体积大。
- **动态 (Dynamic)**: 减轻初始重量（懒加载）。当您有多种语言时非常理想。
- **分层静态 (Scoped static)**: 保持代码有序（逻辑分离），无需复杂的额外网络请求。
- **分层动态 (Scoped dynamic)**: _代码拆分_ 和性能的最佳方法。通过仅加载当前视图和活动语言所需的内容来最小化内存使用。

## GitHub 星数

GitHub 星数是项目受欢迎程度、社区信任和长期相关性的有力指标。虽然星数不是技术质量的直接衡量标准，但它们反映了有多少开发人员发现该项目有用、关注其进展并可能采用它。在评估项目价值时，星数有助于比较不同方案的吸引力，并提供对生态系统增长的见解。

[![Star History Chart](https://api.star-history.com/chart?repos=kaisermann%2Fsvelte-i18n%2Copral%2Fparaglide-js%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#kaisermann/svelte-i18n&opral/paraglide-js&aymericzip/intlayer)

## 结果详情

### 1 - 应当避免的解决方案

> Svelte 生态系统中没有明确应当避免的解决方案。

### 2 - 可接受的解决方案

**(Paraglide)** (`@inlang/paraglide-js@2.17.0`):

`Paraglide` 提供了一种创新且深思熟虑的方法。在 Vite + Svelte 应用中，他们宣传的 tree-shaking 按预期工作，这很棒。
但在 React + TanStack Start 的情况下，tree-shaking 没有按预期工作，Next.js 也是如此。尽管如此，在 Svelte 和 TanStack Start 项目中使用 Paraglide 还是值得关注的。
工作流程和 DX 也比其他选项更复杂。
我个人不喜欢在每次推送前重新生成 JS 文件，这会通过 PR 在开发者之间造成持续的合并冲突风险。该工具似乎也比 Next.js 更专注于 Vite。
最后，与其他解决方案相比，Paraglide 不使用 store（例如 Svelte store）来检索当前语言以渲染内容。对于解析的每个节点，它都会从 localStorage / cookie 等请求语言。这导致执行不必要的逻辑，从而影响组件的反应性。

> 关于 paraglide 的说明：该解决方案在您的代码库中注入代码进行导入，因此基准报告中的“库大小”指标几乎为 0。代码生成是一件好事，因为使用的函数将仅包含必要的逻辑（全局前缀 vs 无前缀、cookie vs 存储等）。相比之下，Intlayer 在构建期间通过注入环境变量来进行过滤，以迫使打包器根据逻辑对内容进行 tree-shake。得益于此，paraglide 和 intlayer 最终比 i18next 或 next-intl 轻 6 到 10 倍。

**(svelte-i18n)** (`svelte-i18n@3.4.0`):

此解决方案满足 Svelte 项目中 i18n 的所有需求。但正如 i18next 或其他主流 i18n 解决方案的情况一样，它有点重（~15.9kb，约为 `svelte-intlayer` 的 7 倍）。

### 3 - 建议

**(Intlayer)** (`svelte-intlayer@8.7.12`):

出于客观性考虑，我个人不会对 `svelte-intlayer` 做出评价，因为它是我的个人解决方案。

### 个人笔记

此笔记仅代表个人观点，不影响基准测试结果。尽管如此，在 i18n 领域，您经常会看到围绕 `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` 模式的翻译内容共识。

在 Svelte 应用中，将函数作为 `Slot` 注入在我的观点中是一种反模式。它还增加了可避免的复杂性和 JavaScript 执行开销（即使几乎察觉不到）。
