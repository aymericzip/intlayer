---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n 与 Intlayer 对比
description: 比较 vue-i18n 与 Intlayer 在 Vue/Nuxt 应用中的国际化 (i18n) 方案
keywords:
  - vue-i18n
  - Intlayer
  - 国际化
  - i18n
  - 博客
  - Vue
  - Nuxt
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n VS Intlayer | Vue 国际化 (i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

本指南比较了两个流行的 **Vue 3**（及 **Nuxt**）国际化选项：**vue-i18n** 和 **Intlayer**。
我们聚焦于现代 Vue 工具链（Vite，Composition API），并评估：

1. **架构与内容组织**
2. **TypeScript 与安全性**
3. **缺失翻译处理**
4. **路由与 URL 策略**
5. **性能与加载行为**
6. **开发者体验 (DX)、工具链与维护**
7. **SEO 与大型项目的可扩展性**

<TOC/>

> **简而言之**：两者都能实现 Vue 应用的本地化。如果你需要**组件范围的内容**、**严格的 TypeScript 类型**、**构建时缺失键检查**、**支持 Tree-shaking 的字典**，以及**内置的路由/SEO 辅助工具**，再加上**可视化编辑器和 AI 翻译**，那么 **Intlayer** 是更完整、更现代的选择。

## 高层定位

- **vue-i18n** - Vue 的事实标准国际化库。支持灵活的消息格式（ICU 风格）、单文件组件（SFC）中的 `<i18n>` 块用于本地消息，并拥有庞大的生态系统。安全性和大规模维护主要依赖开发者自身。
- **Intlayer** - 面向组件的内容模型，适用于 Vue/Vite/Nuxt，具备**严格的 TypeScript 类型检查**、**构建时校验**、**摇树优化**、**路由和 SEO 辅助工具**，可选的**可视化编辑器/CMS**，以及**AI 辅助翻译**。

## 构建时的性能成本

在查看功能特性表之前，先来看实测数据。[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 使用每个库构建相同的 Vite + Vue 3 应用（10 个页面，10 种语言），并记录浏览器下载的数据：

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

仅 `vue-i18n` 的运行时体积就是 Intlayer 的 **6 倍**，每个页面携带了 **90% 属于其他页面的字符串**，而且单独编译的组件会拖入 **196 KB**，因为 `useI18n()` 将其绑定到了全局消息树。包含响应性和页面加载时间的完整测试，请参阅 [vue-i18n 与 Intlayer 基准测试](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-benchmark)。

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> 完整表格请参阅 [Vue 基准测试报告](https://intlayer.org/zh/doc/benchmark/vue)。

## 并列功能对比（Vue 重点）

| 功能                                         | **Intlayer**                                                           | **vue-i18n**                                             |
| -------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| **组件附近的翻译**                           | ✅ 是，内容与组件共置（例如，`MyComp.content.ts`）                     | ✅ 是，通过 SFC `<i18n>` 块（可选）                      |
| **TypeScript 集成**                          | ✅ 高级，自动生成 **严格** 类型和键自动补全                            | ✅ 良好的类型定义；**严格的键安全性需要额外的设置/规范** |
| **缺失翻译检测**                             | ✅ **构建时** 警告/错误和 TS 显示                                      | ⚠️ 运行时回退/警告                                       |
| **丰富内容（组件/Markdown）**                | ✅ 直接支持丰富节点和Markdown内容文件                                  | ⚠️ 有限支持（组件通过`<i18n-t>`，Markdown通过外部插件）  |
| **AI驱动的翻译**                             | ✅ 内置使用您自己的AI提供商密钥的工作流程                              | ❌ 未内置                                                |
| **可视化编辑器 / CMS**                       | ✅ 免费的可视化编辑器和可选的CMS                                       | ❌ 未内置（使用外部平台）                                |
| **本地化路由**                               | ✅ 为 Vue Router/Nuxt 提供生成本地化路径、URL 和 `hreflang` 的辅助工具 | ⚠️ 非核心功能（使用 Nuxt i18n 或自定义 Vue Router 配置） |
| **动态路由生成**                             | ✅ 支持                                                                | ❌ 不提供（由 Nuxt i18n 提供）                           |
| **复数化与格式化**                           | ✅ 枚举模式；基于 Intl 的格式化工具                                    | ✅ ICU 风格消息；Intl 格式化工具                         |
| **内容格式**                                 | ✅ `.ts`、`.js`、`.json`、`.md`、`.txt`（YAML 进行中）                 | ✅ `.json`、`.js`（加上 SFC `<i18n>` 块）                |
| **ICU 支持**                                 | ⚠️ 进行中                                                              | ✅ 支持                                                  |
| **SEO 辅助工具（站点地图、robots、元数据）** | ✅ 内置辅助工具（框架无关）                                            | ❌ 非核心功能（Nuxt i18n/社区提供）                      |
| **SSR/SSG**                                  | ✅ 支持 Vue SSR 和 Nuxt；不阻塞静态渲染                                | ✅ 支持 Vue SSR/Nuxt                                     |
| **Tree-shaking（仅打包使用的内容）**         | ✅ 构建时按组件进行                                                    | ⚠️ 部分支持；需要手动代码拆分/异步消息                   |
| **懒加载**                                   | ✅ 按语言/词典级别                                                     | ✅ 支持异步语言消息                                      |
| **清理未使用内容**                           | ✅ 是（构建时）                                                        | ❌ 非内置功能                                            |
| **大型项目可维护性**                         | ✅ 鼓励模块化、设计系统友好的结构                                      | ✅ 可行，但需要严格的文件/命名空间管理                   |
| **生态系统 / 社区**                          | ⚠️ 较小但增长迅速                                                      | ✅ Vue 生态系统中庞大且成熟                              |

## 深度比较

<AccordionGroup>
<Accordion header="1) 架构与可扩展性">

- **vue-i18n**：常见的设置是为每个语言环境使用**集中式目录**（可选地拆分为文件/命名空间）。SFC `<i18n>` 块允许局部消息，但随着项目增长，团队通常会回归使用共享目录。 请参阅[组件级与集中式 i18n 对比](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)。
- **Intlayer**：提倡将**每个组件的字典**存储在其对应组件旁边。这减少了跨团队冲突，保持内容可发现性，并自然限制了漂移/未使用的键。

**重要原因：** 在大型 Vue 应用或设计系统中，**模块化内容**比单体目录更易于扩展。

</Accordion>
<Accordion header="2) TypeScript 与安全性">

- **vue-i18n**：良好的 TS 支持；**严格键类型**通常需要自定义模式/泛型和谨慎的约定。
- **Intlayer**：从您的内容中**生成严格类型**，提供**IDE 自动补全**和针对拼写错误/缺失键的**编译时错误**。

**重要性说明：** 强类型可以在**运行前**捕获问题。

</Accordion>
<Accordion header="3) 缺失翻译的处理">

- **vue-i18n**：**运行时**警告/回退（例如，回退到默认语言或键）。 请参阅[检测缺失翻译](https://intlayer.org/zh/blog/detecting-missing-translations)。
- **Intlayer**：通过**构建时**检测，针对不同语言和键发出警告/错误。

**重要性说明：** 构建时强制执行确保生产环境界面干净且一致。

</Accordion>
<Accordion header="4) 路由与 URL 策略 (Vue Router/Nuxt)">

- **两者**都支持本地化路由。 请参阅 [hreflang 指南](https://intlayer.org/zh/blog/hreflang-guide-multilingual-seo)。
- **Intlayer** 提供辅助工具来 **生成本地化路径**，**管理语言前缀**，并为 SEO 生成 **`<link rel="alternate" hreflang>`** 标签。在 Nuxt 中，它补充了框架的路由功能。

**重要性：** 减少自定义粘合层，实现跨语言环境的 **更清晰的 SEO**。

</Accordion>
<Accordion header="5) 性能与加载行为">

- **vue-i18n**：支持异步加载语言消息；避免过度打包需要你自行管理（需谨慎拆分目录）。 上述基准测试提供了具体数据：每页 134.9 KB 对比 57.1 KB。
- **Intlayer**：在构建时进行 **Tree-shaking**，并按字典/语言进行 **懒加载**。未使用的内容不会被打包。

**重要性：** 更小的包体积和更快的多语言 Vue 应用启动速度。

</Accordion>
<Accordion header="6) 开发者体验与工具生态">

- **vue-i18n**：成熟的文档和社区；您通常会依赖**外部本地化平台**来进行编辑工作流程。
- **Intlayer**：提供免费的**可视化编辑器**，可选的**CMS**（支持 Git 或外部化），一个**VSCode 扩展**，**CLI/CI** 工具，以及使用您自己的提供商密钥的**AI 辅助翻译**。、**MCP 服务器**

**重要原因：** 降低运维成本，缩短开发与内容的循环时间。

</Accordion>
<Accordion header="7) SEO、SSR 与 SSG">

- **两者**均支持 Vue SSR 和 Nuxt。 请参阅[国际化与 SEO](https://intlayer.org/zh/blog/SEO-and-i18n)。
- **Intlayer**：增加了**SEO 辅助工具**（站点地图/元数据/`hreflang`），与框架无关，并且能很好地配合 Vue/Nuxt 构建。

**重要原因：** 实现国际化 SEO，无需定制复杂配置。

</Accordion>
</AccordionGroup>

## 为什么选择 Intlayer？（问题与方法）

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

大多数 i18n 方案（包括 **vue-i18n**）都从**集中式目录**开始：

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="每种语言一个文件" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="每种语言一个文件夹" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

该文件夹不断膨胀，每种语言中的每个功能都有一个命名空间：

![A locales folder with dozens of namespace files per language](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)

随着应用程序的增长，这通常会减慢开发速度：

1. **对于新组件**，你需要创建/编辑远程目录，连接命名空间，并进行翻译（通常通过从 AI 工具手动复制粘贴）。
2. **在更改组件时**，你需要寻找共享的键，进行翻译，保持各语言版本同步，删除无用键，并对齐 JSON 结构。

**Intlayer** 将内容限定在**每个组件范围内**，并将其**保存在代码旁边**，就像我们已经对 CSS、故事、测试和文档所做的那样：

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

每个语言文件都必须手动编辑，且键只是普通字符串：拼写错误在生产环境中会直接渲染为 `componentExample.greting`。

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

所有语言都位于组件旁边的一个类型化文件中。

</Tab>
</Tabs>

这种方法：

- **加快开发速度**（声明一次；IDE/AI 自动补全）。
- **清理代码库**（1 个组件 = 1 个字典）。
- **简化复制/迁移**（复制组件及其内容一起复制）。
- **避免死键**（未使用的组件不导入内容）。
- **优化加载**（懒加载组件携带其内容）。

## Intlayer 的额外功能（与 Vue 相关）

- **跨框架支持**：支持 Vue、Nuxt、Vite、React、Express 等。
- **基于 JavaScript 的内容管理**：在代码中声明，灵活度高。
- **每个语言环境的声明文件**：为所有语言环境预设内容，工具自动生成其余部分。
- **类型安全环境**：强大的 TypeScript 配置，支持自动补全。
- **简化内容获取**：单一钩子/组合函数获取字典的所有内容。
- **有序的代码库**：一个组件对应一个字典，存放在同一文件夹。
- **增强的路由功能**：为 **Vue Router/Nuxt** 提供本地化路径和元数据的辅助工具。
- **Markdown 支持**：按语言环境导入远程/本地 Markdown；将 frontmatter 暴露给代码。
- **免费可视化编辑器和可选 CMS**：无需付费本地化平台即可创作；支持 Git 友好的同步。
- **可摇树内容**：仅打包使用的内容；支持懒加载。
- **静态渲染友好**：不阻塞静态站点生成（SSG）。
- **AI驱动的翻译**：使用您自己的AI提供商/API密钥，支持翻译成231种语言。
- **MCP服务器和VSCode扩展**：在您的IDE中自动化i18n工作流和内容创作。
- **互操作性**：在需要时与**vue-i18n**、**react-i18next**和**react-intl**桥接。

## 何时选择哪一个？

<AccordionGroup>
<Accordion header="选择 vue-i18n">

如果您想要 **标准的 Vue 方案**，习惯于自己管理语言目录和命名空间，且应用属于 **中小型规模**（或者您已经在重度依赖 Nuxt i18n）。SFC `<i18n>` 块和运行时 `setLocaleMessage()` 是 Intlayer 刻意不予保留的功能。

</Accordion>
<Accordion header="选择 Intlayer">

如果您看重 **组件作用域内容**、**严格的 TypeScript**、**构建期安全保证**、**Tree-shaking** 以及开箱即用的路由、SEO 和编辑器工具，特别是对于 **大型模块化 Vue/Nuxt 代码库** 和设计系统。请从 [Intlayer 与 Vue](https://intlayer.org/zh/doc/environment/vite-and-vue) 或 [与 Nuxt](https://intlayer.org/zh/doc/environment/nuxt-and-vue) 开始。

</Accordion>
<Accordion header="选择 @intlayer/vue-i18n">

如果您当前在使用 `vue-i18n`，希望无需修改 `.vue` 文件即可获得包体积优化。[兼容适配器](https://intlayer.org/zh/doc/compatibility/vue-i18n) 保留了 `createI18n`、`useI18n`、`t()`、`d()`、`n()`、`$t` 和 `v-t`，并从编译后的字典提供服务。详细数据见 [vue-i18n 与 @intlayer/vue-i18n](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-vue-i18n)。

</Accordion>
</AccordionGroup>

## 与 vue-i18n 的互操作性

`intlayer` 还可以帮助管理您的 `vue-i18n` 命名空间。

使用 `intlayer`，您可以按照喜爱的 i18n 库格式声明内容，intlayer 将在您选择的位置生成命名空间（例如：`/messages/{{locale}}/{{namespace}}.json`）。 请参阅 [vue-i18n 兼容性文档](https://intlayer.org/zh/doc/compatibility/vue-i18n) 以及 [Nuxt i18n 适配器](https://intlayer.org/zh/doc/compatibility/nuxtjs-i18n)。

## 常见问题解答

<FAQ>

<Question title="Intlayer 是 vue-i18n 的替代品还是其上层的封装？">

两者兼具，取决于您的采纳方式。`vue-intlayer` 是一个拥有独立 `useIntlayer()` 组合式函数的原生运行时。`@intlayer/vue-i18n` 则是一个兼容适配器，它保留了 `vue-i18n` 的 API 并替换了其底层绑定，让您无需改动组件即可平滑迁移，随后逐个文件进行过渡。

</Question>

<Question title="我的 SFC <i18n> 块会发生什么？">

适配器不会读取它们。请将这些消息移至语言 JSON 文件中，或移至组件旁边的 `.content.ts` 文件中（这提供了相同的理念并支持自动生成的类型）。这是唯一无法直接继承的 `vue-i18n` 功能。

</Question>

<Question title="Intlayer 支持 Nuxt 吗？">

支持。[Intlayer 与 Nuxt](https://intlayer.org/zh/doc/environment/nuxt-and-vue) 涵盖多语言路由、语言检测中间件和站点地图生成。如果您目前使用的是 `@nuxtjs/i18n`，[Nuxt i18n 兼容适配器](https://intlayer.org/zh/doc/compatibility/nuxtjs-i18n) 提供了理想的迁移路径。

</Question>

<Question title="我可以继续将 locales/{locale}.json 作为唯一数据源吗？">

可以。[JSON 同步插件](https://intlayer.org/zh/doc/compatibility/vue-i18n) 会以 `vue-i18n` 方言语法（`{name}`、`{0}`、`"car | cars"` 管道复数）读取它们，并在 CLI 或 CMS 进行更新时将翻译写回。

</Question>

<Question title="ICU 可以在 Vue 上的 Intlayer 中使用吗？">

原生 ICU 支持正在开发中。`@intlayer/vue-i18n` 适配器解析 `vue-i18n` 自身的消息语法，包括管道复数以及命名和列表插值。有关 Intlayer 自身的复数模型，请参阅[枚举内容](https://intlayer.org/zh/doc/concept/content/enumeration)。

</Question>

</FAQ>

## GitHub Stars

GitHub stars 是项目受欢迎程度、社区信任度和长期相关性的强有力指标。虽然不是技术质量的直接衡量标准，但它们反映了有多少开发者认为该项目有用、关注其进展，以及可能会采用它。对于估计项目的价值，stars 有助于在各种方案之间进行性能对比，并提供生态系统增长的见解。

[![Star History Chart](https://api.star-history.com/svg?repos=intlify/vue-i18n&repos=aymericzip/intlayer&type=Date)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## 结论

**vue-i18n** 和 **Intlayer** 都能很好地本地化 Vue 应用。区别在于你需要自己构建多少内容，才能实现一个健壮且可扩展的方案：

- 使用 **Intlayer**，**模块化内容**、**严格的 TS**、**构建时安全性**、**摇树优化的包**以及**路由/SEO/编辑器工具**均为**开箱即用**。
- 如果您的团队优先考虑在多语言、组件驱动的 Vue/Nuxt 应用中的**可维护性和速度**，Intlayer 提供了目前**最完整**的体验。

## 延伸阅读

- [vue-i18n vs Intlayer benchmark](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-benchmark), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/zh/blog/vue-i18n-vs-intlayer-vue-i18n), the adapter on the same app
- [Is vue-i18n outdated?](https://intlayer.org/zh/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/zh/blog/how-to-pick-vue-i18n-library)
- [Using Intlayer with vue-i18n](https://intlayer.org/zh/blog/intlayer-with-vue-i18n)
- [Vue benchmark report](https://intlayer.org/zh/doc/benchmark/vue)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/zh/doc/migration/vue-i18n)
- [Bundle optimization](https://intlayer.org/zh/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/zh/doc/compiler)

Refer to ['Why Intlayer?' doc](https://intlayer.org/zh/doc/why) for more details.
