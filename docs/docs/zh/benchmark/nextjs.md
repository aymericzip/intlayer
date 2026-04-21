---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: 2026 年 Next.js 最佳 i18n 解决方案 - 基准测试报告
description: 对比 next-intl、next-i18next 和 Intlayer 等 Next.js 国际化 (i18n) 库。关于打包体积、泄漏和响应性的详细性能报告。
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - 性能
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "初始化基准测试"
---

# Next.js i18n 库 — 2026 年基准测试报告

本页面是关于 Next.js i18n 解决方案的基准测试报告。

## 目录

<Toc/>

## 交互式基准测试

<I18nBenchmark framework="nextjs" vertical/>

## 结果参考：

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md

查看完整的基准测试仓库[点击这里](https://github.com/intlayer-org/benchmark-i18n)。

## 简介

国际化库对你的应用程序有很大影响。主要的风险在于当用户只访问一个页面时，却加载了所有页面和所有语言的内容。

随着应用规模的增长，打包体积会呈指数级增长，这会明显影响性能。

例如，在最糟糕的情况下，国际化后的页面体积可能会增加接近 4 倍。

i18n 库的另一个影响是开发速度变慢。将组件转换为支持多语言的内容非常耗时。

因为这个问题很棘手，所以存在许多解决方案——有些侧重于 DX（开发体验），有些侧重于性能或可扩展性等。

Intlayer 尝试在这些维度上进行优化。

## 测试你的应用

为了发现这些问题，我构建了一个免费扫描器，你可以在[这里](https://intlayer.org/i18n-seo-scanner)试用。

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 问题所在

有两种主要方法可以限制多语言应用对打包体积的影响：

- 将 JSON（或内容）拆分到不同的文件/变量/命名空间中，以便打包工具可以对特定页面未使用的内容进行 Tree-shaking。
- 仅按用户的语言动态加载页面内容。

这些方法的技术限制：

**动态加载**

即使你使用 Webpack 或 Turbopack 声明了类似 `[locale]/page.tsx` 的路由，并且定义了 `generateStaticParams`，打包工具也不会将 `locale` 视为静态常量。这意味着它可能会将所有语言的内容都拉入每个页面。限制这种情况的主要方法是通过动态导入（例如 `import('./locales/${locale}.json')`）加载内容。

在构建时，Next.js 会为每个语言环境生成一个 JS 包（例如 `./locales_fr_12345.js`）。当站点发送到客户端并运行时，浏览器会为所需的 JS 文件发出额外的 HTTP 请求。

> 解决同一问题的另一种方法是使用 `fetch()` 动态加载 JSON。这就是当 JSON 存储在 `/public` 下时 `Tolgee` 的工作方式，或者是依赖 `getStaticProps` 加载内容的 `next-translate` 的工作方式。流程是一样的：浏览器会发起额外的 HTTP 请求来下载资源。

**内容拆分**

如果你使用类似 `const t = useTranslation()` + `t('my-object.my-sub-object.my-key')` 的语法，通常整个 JSON 都必须包含在打包包中，以便库可以解析它并解析键。即使页面上没有用到，大部分内容也会被发送。

为了减轻这种情况，一些库要求你声明每个页面要加载哪些命名空间——例如 `next-i18next`、`next-intl`、`lingui`、`next-translate`、`next-international`。

相比之下，`Paraglide` 在构建前增加了一个额外步骤，将 JSON 转换为扁平的符号，如 `const en_my_var = () => 'my value'`。理论上，这可以在页面上实现 Tree-shaking 掉未使用的内容。正如我们将看到的，这种方法仍然存在权衡。

最后，`Intlayer` 应用了构建时优化，使得 `useIntlayer('my-key')` 会被直接替换为相应的内容。

## 方法论

在此基准测试中，我们对比了以下库：

- `Base App`（无 i18n 库）
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

我使用了 `Next.js` 版本 `16.2.4` 以及 App Router。

我构建了一个拥有 **10 个页面**和 **10 种语言**的多语言应用。

我对比了**四种加载策略**：

| 策略         | 无命名空间（全局）                 | 有命名空间（局部/作用域）                                    |
| :----------- | :--------------------------------- | :----------------------------------------------------------- |
| **静态加载** | **Static**: 启动时全部加载到内存。 | **Scoped static**: 按命名空间拆分；启动时全部加载。          |
| **动态加载** | **Dynamic**: 按语言环境按需加载。  | **Scoped dynamic**: 按命名空间和语言环境进行更细粒度的加载。 |

## 策略总结

- **Static (静态)**: 简单；初始加载后无网络延迟。缺点：打包体积大。
- **Dynamic (动态)**: 减轻初始重量（懒加载）。适用于语言环境较多的情况。
- **Scoped static (局部静态)**: 保持代码组织良（逻辑分离），且无需复杂的额外网络请求。
- **Scoped dynamic (局部动态)**: 代码分割和性能的最佳方案。通过仅加载当前视图和活动语言环境所需的内容来最小化内存占用。

### 我测量了什么：

我在真实浏览器中为每个技术栈运行了相同的多语言应用，然后记录了网络上传输的内容以及所需的时间。数值以**常规网页压缩后**的体积报告，因为这比原始源码计数更接近用户的实际下载量。

- **国际化库体积**: 在打包、Tree-shaking 和压缩后，i18n 库的体积，即一个空组件中 Provider（如 `NextIntlClientProvider`）+ Hook（如 `useTranslations`）代码的体积。这不包括翻译文件的加载。它反映了在引入内容之前，库本身的昂贵程度。

- **每页 JavaScript 量**: 对于基准测试中的每条路由，浏览器访问该页面时拉取的脚本量，按套件中的页面进行平均（如果报告有汇总，则按语言环境平均）。臃肿的页面即是慢页面。

- **来自其他语言环境的泄漏**: 同一页面但为其他语言的内容被错误地加载到了审计页面中。这些内容是不必要的，应当避免（例如 `/fr/about` 的页面内容出现在 `/en/about` 的页面包中）。

- **来自其他路由的泄漏**: 应用中**其他屏幕**的相同情况：当你只打开一个页面时，其他页面的文案是否也被打包了（例如 `/en/about` 的页面内容出现在 `/en/contact` 的页面包中）。得分高意味着分割薄弱或打包范围过广。

- **平均组件打包体积**: 通用 UI 组件被**逐个测量**，而不是隐藏在应用的总数据中。这显示了国际化是否会悄悄增加日常组件的体积。例如，如果你的组件重新渲染，它将从内存中加载所有这些数据。给任何组件附加一个巨大的 JSON，就像连接了一个庞大的未使用数据仓库，会降低组件性能。

- **语言切换响应性**: 我使用应用自带的控制组件切换语言，并计时直到页面明显完成切换所需的时间——这是访问者能感知到的时间，而非实验室微秒级步骤。

- **语言更改后的渲染工作**: 进一步的跟进：一旦切换开始，界面以新语言重新绘制所需的开销。当“感知”时间和框架开销不一致时非常有用。

- **页面初始加载时间**: 从导航开始到浏览器认为页面已完全加载所需的时间。适用于冷启动对比。

- **注水 (Hydration) 时间**: 当应用暴露该数据时，客户端将服务端 HTML 转换为可交互状态所需的时间。表格中的破折号表示该实现在本基准测试中未提供可靠的注水数值。

## 结果详情

### 1 — 应当避免的解决方案

应当明确避免诸如 `gt-next` 或 `lingo.dev` 之类的解决方案。它们结合了供应商锁定和代码库污染。尽管投入了大量时间尝试实施，但我从未让它们正常工作过——无论是在 TanStack Start 还是 Next.js 上。

遇到的问题：

**(General Translation)** (`gt-next@6.16.5`):

- 对于一个 110kb 的应用，`gt-react` 额外增加了超过 440kb。
- 第一次使用 General Translation 构建就提示 `Quota Exceeded, please upgrade your plan`（配额超出，请升级计划）。
- 翻译未渲染；我收到了错误 `Error: <T> used on the client-side outside of <GTProvider>`，这似乎是库的一个 Bug。
- 在实施 **gt-tanstack-start-react** 时，我还遇到了该库的一个[问题](https://github.com/generaltranslation/gt/issues/1210#event-24510646961)：`does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`，这导致应用崩溃。在报告此问题后，维护者在 24 小时内修复了它。
- 该库阻塞了 Next.js 页面的静态渲染。

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- AI 配额超出，完全阻塞了构建——这意味着不付钱就无法发布到生产环境。
- 编译器丢失了近 40% 的翻译内容。我不得不将所有的 `.map` 重写为扁平的组件块才使其工作。
- 它们的 CLI 存在 Bug，会无故重置配置文件。
- 构建时，当添加新内容时，它会完全抹除生成的 JSON 文件。结果是几个键的添加可能会导致 300 多个现有键被清除。

### 2 — 实验性解决方案

**(Wuchale)** (`wuchale@0.22.11`):

`Wuchale` 背后的想法很有趣，但尚不可行。我遇到了响应性问题，不得不强制重新渲染 Provider 才能使应用工作。文档也相当不清晰，增加了上手难度。

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` 提供了一种创新且经过深思熟虑的方法。即便如此，在这次基准测试中，其公司宣称的 Tree-shaking 在我的 Next.js 或 TanStack Start 设置中并未生效。工作流和 DX 比其他选项更复杂。
就个人而言，我不喜欢每次推送到代码库前都要重新生成 JS 文件，这通过 PR 产生了持续的合并冲突风险。该工具似乎也更关注 Vite 而非 Next.js。
最后，与其他解决方案相比，Paraglide 不使用存储（如 React Context）来检索当前语言环境以渲染内容。对于解析的每个节点，它都会从 localStorage / Cookie 等请求语言环境。这导致了影响组件响应性的不必要逻辑执行。

### 3 — 可接受的解决方案

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` 解决了前面提到的许多问题。我发现它比类似的工具更难采用。它不提供类型安全，这增加了在编译时捕捉缺失键的难度。我不得不使用自己的函数封装 Tolgee 的函数，以添加缺失键检测。

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` 是目前最热门的选项，也是 AI Agent 推荐最多的——但在我看来这是错误的。入门很容易，但在实践中，减少泄漏的优化非常复杂。结合动态加载 + 命名空间 + TypeScript 类型会极大降低开发速度。包体积也相当大（`NextIntlClientProvider` + `useTranslations` 约为 13kb，是 `next-intlayer` 的两倍多）。**next-intl** 曾会阻塞 Next.js 页面的静态渲染。它提供了一个名为 `setRequestLocale()` 的辅助工具。对于 `en.json` / `fr.json` 这样的集中式文件，这似乎得到了部分解决，但当内容拆分为 `en/shared.json` / `fr/shared.json` / `es/shared.json` 等命名空间时，静态渲染仍然会失效。

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` 可能最受欢迎，因为它是 JavaScript 应用中最早的 i18n 解决方案之一。它拥有许多社区插件。它与 `next-intl` 有着相同的重大缺点。包体积特别大（`I18nProvider` + `useTranslation` 约为 18kb，约为 `next-intlayer` 的 3 倍）。

消息格式也不同：`next-intl` 使用 ICU MessageFormat，而 `i18next` 使用自己的格式。

**(Next International)** (`next-international@1.3.1`):

`next-international` 也解决了上述问题，但与 `next-intl` 或 `next-i18next` 差异不大。它包含了用于特定命名空间翻译的 `scopedT()`，但使用它对打包体积几乎没有影响。

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui` 常受赞誉。就个人而言，我觉得围绕 `lingui extract` / `lingui compile` 的工作流比其他方案更复杂，且没有明显的优势。我还注意到语法不统一，容易误导 AI（例如 `t()`、`t''`、`i18n.t()`、`<Trans>`）。

### 4 — 推荐方案

**(Next Translate)** (`next-translate@3.1.2`):

如果你喜欢 `t()` 风格的 API，`next-translate` 是我的主要推荐方案。它通过 `next-translate-plugin` 优雅运作，利用 Webpack / Turbopack loader 通过 `getStaticProps` 加载命名空间。它也是这些方案中最轻量的（约 2.5kb）。对于命名空间拆分，在配置中为每个页面或路由定义命名空间的设计非常周到，比 **next-intl** 或 **next-i18next** 等主要替代方案更易于维护。在版本 `3.1.2` 中，我注意到静态渲染无法工作，Next.js 会回退到动态渲染。

**(Intlayer)** (`next-intlayer@8.7.5`):

出于客观性考量，我不会亲自评价 `next-intlayer`，因为这是我自己的解决方案。

### 个人见解

此见解纯属个人观点，不影响基准测试结果。在 i18n 领域，常能看到关于 `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` 模式的共识。

在 React 应用中，我个人认为将函数作为 `ReactNode` 注入是一种反模式。它还会增加可避免的复杂性和 JavaScript 执行开销（即使几乎察觉不到）。
