---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: 2026 年，vue-i18n 已经过时了吗？
description: vue-i18n 在过去十年中一直是 Vue 和 Nuxt 的标准配置。但在我们的基准测试中，它却是主流框架中最庞大的 i18n 运行时。本文将探讨其深层原因。
keywords:
  - vue-i18n
  - Intlayer
  - 国际化
  - i18n
  - Vue
  - Nuxt
  - 打包体积
  - 博客
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# 2026 年，vue-i18n 已经过时了吗？

在 Vue 生态系统中，鲜有库能达到 `vue-i18n` 的普及度。自 Vue 2 时代起由 Kazupon 持续维护，它支撑着 `@nuxtjs/i18n`，几乎是多语言 Vue 应用的默认首选。

然而，2026 年的基准测试得出了一个出人意料的数据：**在所有测试的前端框架中，`vue-i18n` 竟是最庞大的本地化运行时。**

在基于 Vite + Vue 搭建的仅 31.5 KB 的空白初始项目中，引入 `vue-i18n` 后，单页平均 JavaScript 体积飙升至 **136.4 KB**，翻了 4 倍有余。

为什么一个以轻量、灵动著称的框架，其配套的国际化工具却如此厚重？其纯运行时的传统模型在今天是否依然合理？

<TOC/>

## 核心观点

**测试中体积最大的运行时：**

在未载入任何翻译内容前，其基础体积即达 **24.3 KB（gzip 压缩后，未压缩约 83.2 KB）**，约是 `intlayer` 核心运行时（2.7 KB）的 **9 倍**。

**单页开销增加 330%：**

`vue-i18n` 让一个基础 Vue 页面从 31.5 KB 暴增至 136.4 KB。相比之下，Intlayer 仅为 59.3 KB，**单页体积减少了 56%**。

**浏览器里附带编译器：**

除非在打包配置中显式设置别名，否则 `vue-i18n` 默认会把一个功能完整的消息格式编译器打包进浏览器，用于在客户端实时解析文本。

**维护节奏趋于平缓：**

在过去的 12 个月里，`vue-i18n` 提交了约 259 次 commit，工作重心主要落在常规 Bug 修复与 Vue 新版本的被动兼容。

**缺乏现代原生工具链：**

缺乏官方提供的 Language Server (LSP)、面向 AI 的 MCP Server 或基于 CLI 的全自动化翻译支持。

## 维护模式 vs. 现代工具生态

| 仓库                  | Stars                                                                                                                                                  | 总 Commit 数                                                                                                                                                        | 年 Commit 数                                                                                                                                                       | 最近一次 Commit                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

过去一年的产出：

- `intlify/vue-i18n`：**259 次 commit**（Vue 3 与 Nuxt 的例行维护）。
- `aymericzip/intlayer`：**4,343 次 commit**（持续投入编译器优化、LSP 语言服务以及深度 AI 集成）。

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

久经考验的库往往代表稳定，但现代化前端开发已全面转向构建期 AST 转换、无用代码精简和 AI 赋能。受制于纯运行时的架构设计，旧模型较难自如融入这些革新。

## 基于 Vite + Vue 的实测数据

针对包含 10 个页面、10 种语言的 Vite + Vue 3 应用进行测试：

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> 在真实浏览器中开启 gzip 压缩环境下测试。完整数据见 [Vue 基准测试文档](https://intlayer.org/zh/doc/benchmark/vue)。

### 库本身的基础体积

未引入任何翻译文本时客户端的空白开销：

| 库                | Gzip 压缩后 | Minified 未压缩 |
| ----------------- | ----------- | --------------- |
| `vue-i18n@11.4.0` | 24.3 KB     | 83.2 KB         |
| `intlayer@8.7.12` | **2.7 KB**  | **7.6 KB**      |

仅 `vue-i18n` 运行时的体积就达到 **24.3 KB（gzip 压缩后）**，几乎相当于整个 Vue 核心库的大小。而 Intlayer 仅增加 **2.7 KB**。

### 页面体积与数据泄漏分析

| 配置            | 单页平均 JS (gz) | 跨语言泄漏 | 跨页面泄漏 | 平均组件大小 (gz) |
| --------------- | ---------------- | ---------- | ---------- | ----------------- |
| 基准（无 i18n） | 31.5 KB          | 0.0%       | 90.0%      | 0.9 KB            |
| `vue-i18n`      | **136.4 KB**     | 50.2%      | 90.0%      | 196.0 KB          |
| Intlayer        | **59.3 KB**      | 51.1%      | **0.0%**   | **6.5 KB**        |

### 核心观察

**比例增幅极其明显：**

由于 Vue 基础框架非常小巧（约 31 KB），引入 `vue-i18n` 会使页面总体积直接跃升四倍多。

**严重的跨路由文本泄漏：**

在默认模式下，单个路由接收到的**翻译内容中有 90%** 实际上属于其他页面。Intlayer 通过静态剔除将该数据降低至 **0.0%**。

**独立作用域组件体积过大：**

由于词典数据在各个作用域中被重复复制，使用 `vue-i18n` 的局部组件平均体积高达 196 KB，而在 Intlayer 中仅为 **6.5 KB**。

## 为什么 vue-i18n 如此沉重？

### 打包进浏览器的 AST 编译器

`vue-i18n` 内置了完整的消息格式编译器。复杂的复数规则、变量插值在客户端运行期间实时被转译成抽象语法树（AST）。

要规避这一开销，开发者必须手动在打包器中为 `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` 配置别名，并借助 `@intlify/unplugin-vue-i18n` 实施预编译。但在实际工程中，这一步骤经常被遗漏。

### 单体式功能捆绑

`vue-i18n` 集成了日期和数字格式化工具、链式消息、传统 Options API 兼容垫片（`$t`、`v-t`）以及响应式 Proxy 逻辑。即便你的组件只是在 `<script setup>` 中读取普通字符串，也必须全盘加载。

### 动态键名阻断 Tree-shaking

由于 `"home.hero.title"` 在运行时动态求值，打包工具无法静态推测被使用的文本范围。多余的翻译内容不得不全部存留在包内。

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

[Intlayer 编译器](https://intlayer.org/zh/doc/compiler)能够准确识别访问了哪些属性，在生成客户端 bundle 之前剔除无用字段。具体解析请查阅[打包优化](https://intlayer.org/zh/doc/concept/bundle-optimization)。

## 开发者体验对比

### 分离式 JSON vs. 组件就近组织

在 `vue-i18n` 中，翻译通常放在独立的 `locales/` 文件夹中。Intlayer 则支持把内容声明直接放置在组件文件同级：

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/zh.json"
{
  "hero": {
    "title": "用每一种语言发布产品"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      zh: "用每一种语言发布产品",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

移动或删除 `Hero.vue` 时，与其绑定的多语言声明文件也会一并同步处理。

### 代码提示 vs. 严格完备性检查

`DefineLocaleMessage` 能带来基于基准模式的代码补全，但无法验证多语言翻译的完备性。即使 `zh.json` 中遗漏了键，TypeScript 也不会阻止编译。

在 Intlayer 中，多语言数据遵循严格校验机制。开启 [`strictMode`](https://intlayer.org/zh/doc/concept/configuration) 后，只要任意语言存在未翻译词条，构建流程便会即刻报错中断。

### IDE 与 AI 辅助工具

| 功能特性                  | `vue-i18n`             | Intlayer                                                         |
| ------------------------- | ---------------------- | ---------------------------------------------------------------- |
| **VS Code 扩展**          | 第三方插件 (i18n Ally) | ✅ [官方专属插件](https://intlayer.org/zh/doc/vs-code-extension) |
| **Language Server (LSP)** | ❌ 无                  | ✅ [专属 LSP 服务](https://intlayer.org/zh/doc/lsp)              |
| **AI MCP Server**         | ❌ 无                  | ✅ [内置 MCP Server](https://intlayer.org/zh/doc/mcp-server)     |
| **AI Agent Skills**       | ❌ 无                  | ✅ [开箱即用 Skills](https://intlayer.org/zh/doc/agent_skills)   |
| **可视化上下文 CMS**      | ❌ 无                  | ✅ [免费开源 CMS](https://intlayer.org/zh/doc/concept/editor)    |

## 翻译流水线

`vue-i18n` 没有提供内置的翻译命令。开发者通常必须将文件导出给第三方平台（如 Crowdin 或 Phrase）。

Intlayer 提供了开箱即用的闭环工作流：

**本地 AI 自动补全（`intlayer fill`）：**

直接配合个人的 OpenAI、Anthropic、Mistral 或 Gemini API 密钥，自动补齐缺失词条。

**自主托管的可视化 CMS：**

集成 [Intlayer CMS](https://intlayer.org/zh/doc/concept/cms)，方便非技术人员直观修改文案，并直接以 Git 提交的形式落盘。

**开源宽松授权：**

全套组件均基于 Apache 2.0 协议发布。

## 什么时候选用 vue-i18n 依然合适？

<AccordionGroup>
<Accordion header="长期运行的稳定 Nuxt 2/3 项目">

若既有项目的路由层已与 `@nuxtjs/i18n` 深度强绑定，推倒重来的成本可能过高。

</Accordion>
<Accordion header="重度依赖特殊 ICU 特性">

如需要高度定制的嵌套链接式消息或特殊的本地化格式规则。

</Accordion>
<Accordion header="轻量个人小项目">

如果生产环境打包体积并不影响应用的核心使用体验。

</Accordion>
</AccordionGroup>

## 如何改进我现有的 vue-i18n 配置？

Intlayer 提供了平滑替换的兼容包，完整再现了 `vue-i18n` 与 `@nuxtjs/i18n` 的核心函数签名（`useI18n`、`$t`、`<i18n-t>`）。你无需重构模板或组合式函数（composables），即可无缝过渡到基于编译器的轻量级架构。

只需运行单条命令即可完成集成：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

该交互式 CLI 工具会自动完成以下工作：

1. 安装 `@intlayer/vue-i18n` 或 `@intlayer/nuxt-i18n` 兼容包。
2. 配置 Vite 或 Nuxt 打包别名（alias），使现有的导入语句和模板用法平滑路由至 Intlayer，之后便可直接从 `package.json` 中移除 `vue-i18n`。
3. 立即激活语言服务器（LSP）诊断，从客户端包中剥离 24 KB 的运行时 AST 解析器，并开启本地 AI 自动化翻译流程，无需繁杂的工程重构。

更多详细步骤请参考我们的专题文档：

- **平滑兼容层：** 使用 [`vue-i18n` 兼容层](https://intlayer.org/zh/doc/compatibility/vue-i18n) 或 [`@nuxtjs/i18n` 兼容层](https://intlayer.org/zh/doc/compatibility/nuxtjs-i18n)，即可在保留旧有模板语法的同时享受现代构建优化。
- **迁移指南参考：** 查阅迁移手册逐步将 JSON 转换为类型安全的字典配置：[从 vue-i18n 迁移](https://intlayer.org/zh/doc/migration/vue-i18n)、[从 @nuxtjs/i18n 迁移](https://intlayer.org/zh/doc/migration/nuxtjs-i18n)。
- **混合使用方案：** 你也可以在运行时维持 `vue-i18n`，仅[将 Intlayer 与 vue-i18n 搭配使用](https://intlayer.org/zh/blog/intlayer-with-vue-i18n)，以低成本引入严格类型检查和本地 AI 翻译。

使用免费的 [i18n SEO 分析器](https://intlayer.org/i18n-seo-scanner) 测量你当前应用的实际打包体积和内容泄漏情况：

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 相关阅读

- [Vue & Vite i18n 性能评测：深度对比报告](https://intlayer.org/zh/doc/benchmark/vue)
- [vue-i18n 与 Intlayer 全方位对比](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer)
- [2026 年，next-intl 已经过时了吗？](https://intlayer.org/zh/blog/is-next-intl-outdated)
- [编译型国际化与声明式架构优势剖析](https://intlayer.org/zh/blog/compiler-vs-declarative-i18n)
