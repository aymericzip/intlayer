---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer：2026 基准测试"
description: 在同一个 Vite + Vue 3 应用上测量 vue-i18n 与 Intlayer。库体积、每页 JavaScript、内容泄漏、组件体积以及语言切换的响应速度，并对数字加以解释。
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Vue 国际化 (i18n) 基准测试

`vue-i18n` 是 Vue 的参考 i18n 库。Intlayer 是一个基于编译器、按组件作用域划分内容的替代方案，并提供 Vue 集成（`vue-intlayer`）。我们已经比较过它们的[功能和开发体验](https://intlayer.org/blog/vue-i18n-vs-intlayer)。本文关注的是应用构建完成后，每个库各自的成本。

数据来自 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)，这是一个开源套件，它用每个库构建同一个应用程序，并记录浏览器实际下载和执行的内容。

<TOC/>

> **tl;dr**：在同一个 Vite + Vue 3 应用上，`vue-i18n` 每页交付 **134.9 KB** 的 gzip 压缩 JavaScript，而无 i18n 的应用为 **41.3 KB**。Intlayer 交付 **57.1 KB**。仅 `vue-i18n` 的运行时就重达 **24.3 KB gzip**（是 Intlayer 3.9 KB 的 6 倍），每个页面携带 **90% 的其他页面字符串**，而单独编译的组件会拖入 **196 KB**，因为它绑定到全局消息树。`@intlayer/vue-i18n` 适配器保留了 `vue-i18n` 的 API，测得每页 **47.0 KB**。

## 简而言之

- **vue-i18n** - Vue 2 / Vue 3 事实上的 i18n 库，也是 `@nuxtjs/i18n` 的核心。ICU 风格的消息、SFC `<i18n>` 块、`v-t` 指令、`d()` / `n()` 格式化器、庞大的生态系统。消息在 `createI18n()` 时注册到全局实例上；按语言的懒加载是手动的 `setLocaleMessage()` 模式，按路由拆分需要你自己构建。
- **Intlayer** - 以组件为中心的内容模型。`.content.ts` 字典与其服务的组件放在一起，构建时编译器（`vite-intlayer`）按组件、按语言进行 tree-shaking 和懒加载，从你的内容生成严格的 TypeScript 类型，缺失的翻译在构建时报错。附带路由 / SEO 辅助工具、可视化编辑器 / CMS 以及 AI 辅助翻译。

| 库                    | GitHub Stars                                                                                                                                                                   | 总提交数                                                                                                                                                                           | 最后提交                                                                                                                                            | 首个版本      | NPM 版本                                                                                                    | NPM 下载量                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024 年 4 月  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | 2016 年 12 月 | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> 徽章会自动更新。快照会随时间变化。

## 功能逐项对比

| 功能                                          | `vue-intlayer` (Intlayer)                            | `vue-i18n`                                                |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| **翻译靠近组件**                              | ✅ 是，`.content.ts` 与每个组件放在一起              | ✅ 通过 SFC `<i18n>` 块（可选）；全局目录是常见的配置     |
| **TypeScript 集成**                           | ✅ 从内容自动生成严格类型                            | ✅ 类型良好；严格的键安全需要为 schema 定义类型并保持纪律 |
| **缺失翻译检测**                              | ✅ TypeScript 错误 + 构建时错误/警告                 | ⚠️ 运行时回退 + 控制台警告                                |
| **富内容（组件 / Markdown）**                 | ✅ 直接支持                                          | ⚠️ `<i18n-t>` 组件插值；Markdown 需外部插件               |
| **ICU 支持**                                  | ⚠️ 进行中                                            | ✅ 是                                                     |
| **格式化（日期、数字、货币）**                | ✅ 基于 Intl 的格式化器                              | ✅ `d()` / `n()` 配合 `datetimeFormats` / `numberFormats` |
| **本地化路由**                                | ✅ Vue Router / Nuxt 辅助工具，`getMultilingualUrls` | ⚠️ 非核心（`@nuxtjs/i18n` 或自定义路由配置）              |
| **SEO 辅助工具（hreflang、sitemap、robots）** | ✅ 内置辅助工具                                      | ❌ 非核心                                                 |
| **Tree-shaking（只交付使用的内容）**          | ✅ 按组件、按语言，由编译器自动完成                  | ⚠️ 手动：拆分目录，按路由调用 `setLocaleMessage()`        |
| **懒加载**                                    | ✅ `importMode: 'dynamic'`（一行配置）               | ✅ 手动 `import()` + `setLocaleMessage()`                 |
| **清除未使用的内容**                          | ✅ 无用字典在构建时被移除                            | ❌ 未内置                                                 |
| **测试缺失翻译（CLI / CI）**                  | ✅ `npx intlayer content test`                       | ⚠️ 第三方（`vue-i18n-extract`）                           |
| **AI 翻译**                                   | ✅ 内置，使用你自己的提供商密钥                      | ❌ 否                                                     |
| **可视化编辑器 / CMS**                        | ✅ 免费可视化编辑器 + 可选 CMS                       | ❌ 否（外部本地化平台）                                   |
| **MCP 服务器与 Agent Skills**                 | ✅ 是                                                | ❌ 否                                                     |
| **生态系统 / 社区**                           | ⚠️ 较小但增长迅速                                    | ✅ 在 Vue 生态中庞大且成熟                                |

## 基准测试

### 测量了什么

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 套件用每个库构建**同一个 Vite + Vue 3 应用程序**：**10 个页面**（home、about、blog、careers、contact、FAQ、pricing、products、settings、team）、**10 种语言**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`）、相同的组件和相同的内容。页面在 `en` 和 `fr` 下测量。

两个库都在 **static** 配置下测试，这是大多数 Vue 项目实际交付的方式：对 `vue-i18n`，导入每种语言的 JSON 并传给 `createI18n({ messages })`；对 Intlayer，使用默认的 `importMode: 'static'`。在该模式下 Intlayer 也会打包所有语言，但编译器仍然**按组件**限定内容范围，所以一个页面只携带它所渲染组件的字典。

对每个构建，套件记录：

- **Lib size**：只导入 i18n 库的空组件的 gzip 体积。运行时的固定成本。
- **Page JS**：每页下载的 gzip JavaScript，对所有页面和语言取平均。
- **Locale leak %**：下载的 JS 中，属于用户**未**查看语言的翻译字符串所占比例（以 `en` 和 `fr` 做指纹，因此 50% 意味着“另一种被测语言完整存在”；打包 10 种语言时，实际浪费更高）。
- **Page leak %**：下载的 JS 中，属于用户**不在**的页面的翻译字符串所占比例。
- **Component avg**：每个组件单独编译时的平均 gzip 体积。显示单个组件拖入了多少 i18n 运行时和目录。
- **E2E reactivity**：从选择新语言到 DOM 中 `html[lang]` 更新之间的实际耗时（Playwright，5 次迭代）。
- **Page load**：`PerformanceNavigationTiming.duration`。

> 下方数字来自 **2026-09-12** 的运行，使用 `vue-i18n` 11.4.0 和 `intlayer` 9.5.0 / 9.5.1。测试应用故意做得很小（每种语言几十个字符串），因此泄漏百分比描述的是一种**模式**：它们随你的内容增长，而运行时成本保持固定。

### Vite + Vue 3 上的结果

| 库                            | 策略   | Lib size (gz) | Lib size (min) | Page JS 平均 (gz) | Locale leak | Page leak | Component 平均 (gz) | E2E 响应速度 | Page load |
| ----------------------------- | ------ | ------------: | -------------: | ----------------: | ----------: | --------: | ------------------: | -----------: | --------: |
| **base**（无 i18n）           | -      |        0.0 KB |         0.0 KB |           41.3 KB |        0.0% |         - |              1.1 KB |       1.8 ms |   10.8 ms |
| `vue-i18n`                    | static |       24.3 KB |        83.2 KB |          134.9 KB |       50.0% |     90.0% |            196.0 KB |       2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static |    **3.9 KB** |    **11.1 KB** |       **57.1 KB** |       56.8% |  **0.0%** |          **7.7 KB** |   **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static |        7.9 KB |        23.2 KB |           47.0 KB |       15.0% |      0.0% |              8.4 KB |       1.5 ms |    9.3 ms |

> 基础应用的 page-leak 列留空：没有 i18n 库时，指纹识别会捕获共享 chunk 中硬编码的字符串，该数字没有意义。

**如何解读**

- **运行时成本。** `vue-i18n` 是整个基准测试中最重的运行时之一：只导入它的空组件就要 **24.3 KB gzip / 83.2 KB 压缩后**。`vue-intlayer` 只要 3.9 KB gzip。无论你有多少字符串，这个差距在每个页面上都要付出。
- **每页 JavaScript。** 无 i18n 的应用重 41.3 KB。`vue-i18n` 让它增至三倍多，达到 **134.9 KB**；Intlayer 落在 **57.1 KB**，+15.8 KB，其中大部分是打包的十种语言（见下一点）。
- **泄漏。** 使用 `createI18n({ messages: { en, fr, ... } })` 时，每个页面都交付所有语言和所有页面的字符串：**50% 的语言泄漏**（在两种指纹语言上）和 **90% 的页面泄漏**。Intlayer 的 `static` 模式也打包所有语言（因此语言泄漏数字相当），但**页面泄漏为 0%**：一个页面只拉取它渲染的组件的字典。切换到 `importMode: 'dynamic'` 还能消除语言泄漏；该配置不在本次 Vue 运行范围内。
- **组件体积是架构差异的体现。** 调用 `useI18n()` 的组件平均编译为 **196 KB**，因为 `t()` 绑定到持有所有语言所有消息的全局实例。同一个组件使用 `useIntlayer()` 编译为 **7.7 KB**：它只触及自己的字典。
- **响应速度**对两者都不是问题（2-5 ms）。一旦消息在内存中，Vue 的响应式系统让语言切换非常廉价。
- **`@intlayer/vue-i18n`**，即插即用的适配器，保留了 `vue-i18n` 的 API，测得**每页 47.0 KB**、**每组件 8.4 KB**，应用代码未做改动。

> 作为参考，同一次运行测得 `fluent-vue` 每页 171.8 KB、运行时 29.7 KB、每组件 217 KB。

## 差距从何而来？全局实例 vs 编译后的字典

`vue-i18n` 是一个运行时。`createI18n()` 构建一个全局实例，为每种语言持有一棵消息树；`useI18n()` 把每个组件绑定到它；`t("footer.github")` 在渲染时查找键。正是这一点使 SFC `<i18n>` 块、`v-t` 和运行时消息加载成为可能，也正是因此每个组件的依赖图都包含整棵树：

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # 每种语言一个文件，包含所有页面
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

优化意味着**你**把 `en.json` 拆成按路由的文件，**你**在路由守卫中调用 `setLocaleMessage()`，并且**你**在组件移动时维护路由到文件的映射。运行时无法替你做这些，因为它不知道组件会请求哪些键。

Intlayer 把这些知识移到构建阶段。内容在组件旁声明，`vite-intlayer` 解析哪个组件导入哪个字典：

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

编译器按字典、按语言精确输出该组件需要的 JSON，并丢弃没有任何导入的字典。按路由的作用域是按组件作用域的自然结果，而不是一项任务。

> 若还想丢弃未使用的语言，在 `intlayer.config.ts` 中设置 `dictionary.importMode: 'dynamic'`。参见 [bundle 优化文档](https://intlayer.org/doc/concept/bundle-optimization)。

## 开发体验

### 设置

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### 组件

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

在你自己为消息 schema 定义类型之前，`t('counter.label')` 只是一个字符串；拼写错误会直接渲染出键名。

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` 和 `increment` 是有类型的；拼写错误是 TypeScript 错误，缺失的法语值是构建错误。

### 按语言懒加载

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

然后在路由守卫中调用 `loadLocaleMessages()`，如果想要按页面的作用域，还得自己按路由拆分 `locales/{locale}.json`。

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## 保留 vue-i18n 的 API，获得 Intlayer 的输出

`@intlayer/vue-i18n` 是一个即插即用的适配器：`useI18n()`、`t()`、`d()`、`n()`、`{name}` 和 `{0}` 插值、管道复数（`"car | cars"`）、`v-t` 和 `i18n.global.locale` 都继续工作，但由 `vite-intlayer` 编译的 Intlayer 字典提供服务。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

在基准测试中，同一应用的 compat 构建每页从 **134.9 KB 降到 47.0 KB**，每组件从 **196 KB 降到 8.4 KB**，组件未做改动。通过 JSON 同步插件，你现有的 `locales/{locale}.json` 可以继续作为事实来源。

参见 [vue-i18n 迁移指南](https://intlayer.org/doc/migration/vue-i18n)和[兼容性文档](https://intlayer.org/doc/compatibility/vue-i18n)。Nuxt 用户可通过 [`@nuxtjs/i18n` 兼容性](https://intlayer.org/doc/compatibility/nuxtjs-i18n)走同样的路径。

## 何时选择哪一个？

- **选择 vue-i18n**，如果你想要标准的 Vue 方式、依赖 ICU 消息或 SFC `<i18n>` 块、已经在使用 `@nuxtjs/i18n`，或者翻译平台期望集中式 JSON。如果 bundle 体积很重要，请预留时间来拆分目录并按路由懒加载。
- **选择 Intlayer**，如果你想要**按组件作用域的内容**、**严格的 TypeScript**、**构建时的缺失键错误**、**零成本的 tree-shaking 和懒加载**，以及内置的编辑工具（可视化编辑器、CMS、AI 翻译、MCP 服务器）。对大型模块化 Vue / Nuxt 代码库和设计系统尤其适用。
- **选择 `@intlayer/vue-i18n`**，如果你已经在用 `vue-i18n`，想在不重写的情况下获得 bundle 收益。

## 相关对比

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer)（同一基准测试）
- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer)（同一基准测试）
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer)（同一基准测试）
- [vue-i18n vs Intlayer（功能与 DX）](https://intlayer.org/blog/vue-i18n-vs-intlayer)
- [vue-i18n 过时了吗？](https://intlayer.org/blog/is-vue-i18n-outdated)

## GitHub Star

GitHub star 是项目受欢迎程度、社区信任度和长期相关性的有力指标。虽然不是技术质量的直接衡量，但它反映了有多少开发者认为该项目有用、关注其进展并可能采用它。

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## 结论

`vue-i18n` 成熟、灵活，并与 Vue 深度集成。基准测试展示了其运行时优先的设计在 Vite 构建上的代价：**24 KB gzip 的运行时**，一个无 i18n 时仅 41 KB 的应用**每页 134.9 KB**，每个页面上 **90% 是其他页面的内容**，以及每个都达到 **196 KB** 的组件，因为它们挂在全局消息树上。

Intlayer 把工作移进编译器。按组件的字典和无用内容清除是构建产物，而不是约定。在同一应用上：**3.9 KB 运行时**、**每页 57.1 KB**、**0% 页面泄漏**、组件**小 25 倍**。如果重写不在考虑之列，`@intlayer/vue-i18n` 可以在不改动组件的情况下走完大部分路程。

所有原始数据、测试应用和脚本都在 [Benchmark Bloom 仓库](https://github.com/intlayer-org/benchmark-bloom)中。自己跑一遍吧。

更多细节请参阅[“为什么选择 Intlayer？”文档](https://intlayer.org/doc/why)。
