---
createdAt: 2026-04-20
updatedAt: 2026-05-18
title: 2026 年 Vue 最佳 i18n 解决方案 - 基准报告
description: 比较 Vue 国际化（i18n）库，如 vue-i18n、fluent-vue 和 Intlayer。关于包大小、泄漏和反应性的详细性能报告。
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - performance
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.9.8
    date: 2026-05-18
    changes: "添加 GitHub 明星对比"
  - version: 8.7.12
    date: 2026-01-06
    changes: "初始化基准"
---

# Vue i18n 库 - 2026 基准报告

此页面是 Vue 上 i18n 解决方案的基准报告。

## 目录

<Toc/>

## 交互式基准

<I18nBenchmark framework="vite-vue" vertical/>

## 结果参考：

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> [查看完整的基准测试数据](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

查看完整的基准仓库 [此处](https://github.com/intlayer-org/benchmark-i18n/tree/main)。

## 简介

国际化解决方案是 Vue 应用中最重的依赖项之一。主要风险是发送不必要的内容：单个路由包中包含其他页面和其他语言的翻译。

随着应用增长，这个问题会迅速增加发送到客户端的 JavaScript，并减慢导航速度。

实际上，对于优化最差的实现，国际化页面的重量可能是非 i18n 版本的几倍。

另一个影响是开发者体验（DX）：如何声明内容、类型、命名空间组织、动态加载以及语言更改时的反应性。

## TL;DR

- **Intlayer**: 最轻量级的解决方案（v8.7.12），内置分层（scoping）和动态加载。
- **vue-i18n**: 具有丰富生态系统的行业标准，但在大型应用中可能会显著变重且难以进行代码拆分优化。
- **fluent-vue**: 创新的消息组织方式，但缺乏类型安全且极其沉重。

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

围绕 `const { t } = useI18n()` + `t('a.b.c')` 构建的语法非常方便，但往往鼓励在运行时保留大型 JSON 对象。除非库提供真正的按页面拆分策略，否则这种模式使 tree-shaking 变得困难。

## 研究方法

在此基准测试中，我们比较了以下库：

- `Base App`（无 i18n 库）
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

框架是 `Vue`，应用包含 **10 个页面** 和 **10 种语言**。

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

### 我测量了什么：

我为每个栈在真实浏览器中运行了相同的多语言应用，然后记录了线路上实际显示的内容以及耗时。尺寸报告为**普通网络压缩后**的尺寸，因为这比原始源代码计数更接近人们实际下载的内容。

- **国际化库大小**: 打包、tree-shaking 和压缩后，i18n 库的大小是空组件中 providers + composables 代码的大小。它不包括翻译文件的加载。它回答了在内容进入之前库本身有多“贵”。

- **每页 JavaScript**: 对于每个基准路由，浏览器在访问时拉取的脚本量，在套件中的页面（以及报告汇总的语言）中取平均值。重的页面就是慢的页面。

- **其他语言的泄漏 (Leakage)**: 指同一页面但另一种语言的内容，因错误而加载到被审计的页面中。这些内容是不必要的，应予以避免。（例如：`/fr/about` 页面内容出现在 `/en/about` 页面包中）

- **其他路由的泄漏**: 应用中**其他屏幕**的同样想法：当你只打开一个页面时，它们的文案是否也随之而来。（例如：`/en/about` 页面内容出现在 `/en/contact` 页面包中）。高分暗示拆分较弱或包范围过宽。

- **平均组件包大小**: 常见的 UI 部件被**逐一**测量，而不是隐藏在一个巨大的应用数字中。它显示国际化是否在静默地膨胀日常组件。例如，如果您的组件重新渲染，它将从内存加载所有这些数据。将巨大的 JSON 附加到任何组件就像连接一个庞大的未使用数据存储，这会减慢组件的性能。

- **语言切换响应能力**: 我使用应用自带的控制切换语言，并计时直到页面清晰切换的时间，这是访问者会注意到的，而不是实验室的微小步骤。

- **语言更改后的渲染工作**: 一个更细致的后续：一旦切换正在进行，界面为新语言重新绘制付出的努力。当“感觉到的”时间和框架成本不一致时很有用。

- **初始页面加载时间**: 从导航到浏览器认为页面已完全加载（针对我测试的场景）的时间。适用于比较冷启动。

- **哈イドレーション时间 (Hydration)**: 客户端将服务器 HTML 转换为可点击内容所花费的时间。表格中的破折号表示该实现在此基准测试中未提供可靠的哈イドレーション数字。

## GitHub 星数

GitHub 星数是项目受欢迎程度、社区信任和长期相关性的有力指标。虽然星数不是技术质量的直接衡量标准，但它们反映了有多少开发人员发现该项目有用、关注其进展并可能采用它。在评估项目价值时，星数有助于比较不同方案的吸引力，并提供对生态系统增长的见解。

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Cfluent-vue%2Ffluent-vue%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&fluent-vue/fluent-vue&aymericzip/intlayer)

## 结果详情

### 1 - 应当避免的解决方案

> Vue 生态系统中没有明确应当避免的解决方案。

### 2 - 可接受的解决方案

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** 毫无疑问是 Vue 中最常用的 i18n 库，它具有大量功能和庞大的生态系统。但在底层，该解决方案相当沉重。即使 vue-i18n 集成了消息的懒加载，它也缺乏分层（scoping）功能。在经典的 Vue SPA 应用中没有问题，但对于使用 @nuxt/i18n 的 Nuxt 应用，它会导致所有页面的消息都包含在单个页面中。对于包含 10 个以上页面的大型 Nuxt 应用，这可能会变得非常成问题。

该包非常重（~24.3kb，约为 `vue-intlayer` 的 9 倍）。

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** 通过 .ftl 格式提供了一种创新尝试。消息组织很棒，更容易上手。但在实践中，缺乏类型安全增加了错误风险，并且调试起来可能很快就会变得耗时。此外，该解决方案使用 vite 插件加载消息，强制将所有语言的所有内容加载到每个页面中。此外，这是一个极其沉重的解决方案（~92.7kb，约为 `vue-intlayer` 的 34 倍）。

### 3 - 建议

**(Intlayer)** (`vue-intlayer@8.7.12`):

出于客观性考虑，我个人不会对 `vue-intlayer` 做出评价，因为它是我的个人解决方案。
