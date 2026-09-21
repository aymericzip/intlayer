---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs @intlayer/vue-i18n：相同的 API，不同的 Bundle"
description: 当 Vue 3 应用保持其 vue-i18n 调用但通过 @intlayer/vue-i18n compat 适配器提供服务时会发生什么变化。在相同的 Vite + Vue 代码上测量的每页 JavaScript、运行时大小、组件大小和泄漏，以及适配器保留、忽略和无法替换的内容。
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | 相同的 API，不同的 Bundle

`@intlayer/vue-i18n` 是一个兼容适配器：它公开了 `vue-i18n` API（`createI18n`、`useI18n`、`t()`、`d()`、`n()`、`$t`、`v-t`、`i18n.global.locale`...），并从 Intlayer 编译的字典中提供服务。你的 `.vue` 文件不会改变。改变的是 `t("footer.github")` 绑定的内容。

本文在同一个 Vite + Vue 3 应用上测量了这个替换，该应用分别使用 `vue-i18n` 和适配器构建。数据来自 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)。如需了解 `vue-i18n` 和 Intlayer 作为库的对比，请阅读 [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) 和 [vue-i18n vs Intlayer 基准测试](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark)。本文讨论的是当你保持组件不变时，适配器会带来什么改变。

<TOC/>

> **总结**: 在同一个 Vite + Vue 3 应用中，将 `vue-i18n` 替换为 `@intlayer/vue-i18n` 后，每页 JavaScript 从 **134.9 KB 降至 47.0 KB** gzip（不含 i18n 的应用为 41.3 KB），运行时从 **24.3 KB 降至 7.9 KB**，平均组件从 **196 KB 降至 8.4 KB**，跨页面字符串泄露从 **90% 降至 0%**，且无需编辑任何 `.vue` 文件。`createI18n({ messages })` 仍作为备选方案继续工作；移除 JSON 导入即可获得上述数字。SFC `<i18n>` 块和运行时 `setLocaleMessage()` 这两个功能无法转移。

## 什么是 `@intlayer/vue-i18n`

`vue-i18n` 是一个运行时库。`createI18n({ messages: { en, fr, ... } })` 构建一个全局实例，持有每个区域的所有消息；`useI18n()` 将每个组件绑定到它；`t("footer.github")` 在渲染时遍历树。这种设计使得 SFC `<i18n>` 块和 `setLocaleMessage()` 成为可能，同时也是为什么每个组件的依赖图包含整个树的原因。

`@intlayer/vue-i18n` 保持 API 并替换树：

1. **导入别名。** `@intlayer/vue-i18n/plugin` 中的 `vueI18nVitePlugin()` 包装 `vite-intlayer` 并添加一个 `resolve.alias`，使得 `vue-i18n` 解析为 `@intlayer/vue-i18n`。没有导入被重命名。
2. **JSON 作为真实来源。** `syncJSON` 插件读取你现有的 `locales/{locale}.json`（使用 `format: "vue-i18n"`，以便正确解析 `{name}`、`{0}` 列表插值和 `"car | cars"` 管道复数），当 CLI 或 CMS 更新它们时，会将翻译写回。
3. **调用点绑定。** Intlayer 优化通过重写 `useI18n()` 调用点，使组件接收其键名在活跃locale中的字典，作为bundler可以追踪和分割的imports。

```vue fileName="src/components/Footer.vue"
<!-- 你的代码，保持不变 -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="编译器生成的内容 (简化版)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

该组件不再访问全局消息树。它只访问 `footer`。这就是为什么下面的组件大小列从 196 KB 下降到 8 KB。

## adapter 保留、忽略和不替换的内容

| `vue-i18n` API                                                       | 使用 `@intlayer/vue-i18n`                                                                            |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`    | ✅ 保留。`t` 键针对你的字典进行了类型化                                                              |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`          | ✅ 保留。`{name}`、`{0}` 和管道分隔的复数形式解析方式与以前相同                                      |
| `d(date, "long")`, `n(value, "currency")`                            | ✅ 保留。来自 `createI18n()` 的 `datetimeFormats` / `numberFormats` 得到遵守，由原生 `Intl` 提供支持 |
| `i18n.global.locale.value = "fr"`                                    | ✅ 保留。由 Intlayer 客户端支持的 `WritableComputedRef`；响应式行为与之前相同                        |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n`（Options API） | ✅ 保留。由 `app.use(i18n)` 注册到 `app.config.globalProperties`                                     |
| `v-t` 指令                                                           | ✅ 保留                                                                                              |
| `legacy: true`                                                       | ✅ 接受                                                                                              |
| `createI18n({ messages })`                                           | ⚠️ `messages` 被用作**运行时 fallback**，并会有开发警告。移除 JSON imports 以获得 bundle 优化        |
| `setLocaleMessage()`, `mergeLocaleMessage()`                         | ❌ 警告并不执行任何操作。运行时消息加载被构建时字典替代                                              |
| SFC `<i18n>` 自定义块                                                | ❌ 不被读取。将这些消息移入 locale JSON（或组件旁的 `.content.ts`）                                  |
| `@nuxtjs/i18n`                                                       | ⚠️ 独立适配器，请查看 [Nuxt 兼容性文档](https://intlayer.org/doc/compatibility/nuxtjs-i18n)          |

## 基准测试

### 测量了什么

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 套件使用相同的 Vite + Vue 3 应用程序构建每个设置：**10 个页面**（home、about、blog、careers、contact、FAQ、pricing、products、settings、team），**10 个语言环境**（`en`、`fr`、`es`、`de`、`it`、`pt`、`zh`、`ja`、`ko`、`ru`），相同的组件和相同的内容。页面在 `en` 和 `fr` 中进行测量。

两者都以**静态**配置构建，这是大多数 Vue 项目使用的配置：对于 `vue-i18n`，每个语言环境的 JSON 导入并传递给 `createI18n({ messages })`；对于适配器，使用相同的组件，改变 `vite.config.ts` 和 `intlayer.config.ts` 并移除 `messages` 导入。包含原生 `vue-intlayer` 作为参考。

对于每个构建，套件记录：

- **Lib size**: 空组件的 gzip（和压缩后）大小，该组件仅导入 i18n 库。
- **Page JS**: 每个页面下载的 gzip JavaScript，在所有页面和语言环境中平均。
- **Locale leak %**: 下载的 JS 中属于用户**未**查看的语言环境的已翻译字符串的份额。
- **Page leak %**: 下载的 JS 中属于用户**未**访问的页面的已翻译字符串的份额。
- **Component avg**: 单独编译的每个组件的平均 gzip 大小。
- **E2E reactivity**: 选择新语言环境和 `html[lang]` 在 DOM 中更新之间的实际时间（Playwright，5 次迭代）。
- **Page load**: `PerformanceNavigationTiming.duration`。

> 下面的数字来自 **2026-09-12** 运行的数据，使用 `vue-i18n` 11.4.0 和 `@intlayer/vue-i18n` 9.5.1。测试应用程序故意很小（每个语言环境只有几十个字符串），所以泄露百分比描述的是一个**模式**：当你的内容增加时，泄露会增长，但运行时成本保持不变。

### Vite + Vue 3 的结果

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (no i18n)       | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> 基础应用的页面泄漏列为空：没有 i18n 库，指纹识别会在共享块中挑选硬编码的字符串，该数字没有意义。

**如何理解它**

- **每个页面减少 88 KB，组件相同。** `vue-i18n` 将 41.3 KB 的应用增加到 **134.9 KB**。相同组件的适配器构建落在 **47.0 KB**，比基础应用多 5.7 KB。大多数差异来自 `createI18n({ messages })` 将 74.9 KB 的 `src/locales` 拉入每个页面，而适配器从不将其作为一个块捆绑。
- **运行时缩小 3 倍。** 仅导入 `vue-i18n` 的空组件成本为 **24.3 KB gzip / 83.2 KB minified**：`@intlify/core-base`、message compiler 和 runtime。adapter 成本为 **7.9 KB / 23.2 KB**，大部分是 Intlayer 的 core 加上 `vue-i18n` API surface。
- **组件：小 23 倍。** 单独编译的 `useI18n()` 组件平均为 **196 KB**，因为 `t` 绑定到持有每个 locale 所有消息的实例。使用 adapter，相同的组件平均为 **8.4 KB**：它到达自己的字典。
- **泄漏。** `vue-i18n` 在每个页面上都会打包每个语言环境和每个页面的字符串：50% 的语言环境泄漏（在两个指纹识别的语言环境上；捆绑十个语言环境时实际浪费更高），90% 的页面泄漏。该适配器将页面泄漏降低到 **0%**，因为每个组件只导入其自己的字典。在这次 `static` 运行中，语言环境泄漏为 15%；`importMode: 'dynamic'` 是移除它的设置，该配置不在此 Vue 运行中。
- **响应性和页面加载。** 对于两者而言，语言环境切换成本低廉（1.5-2.8 ms）；一旦消息在内存中，Vue 的响应性系统会实现这一点。页面加载从 13.6 ms 降低到 **9.3 ms**，与减少 88 KB 的 JavaScript 解析量一致。
- **关于原生行。** `vue-intlayer` 在此运行中在 `static` 模式下捆绑了每个区域设置，达到 57.1 KB，运行时为 3.9 KB；适配器的同步字典携带更少的外国语言环境字符串，因此每页数据更低。原生运行时仍然是三者中最轻的，其 `.content.ts` 模型是 SFC `<i18n>` 块找到其等效项的地方。

## 为什么数字会变化

`src/components/` 中的内容没有改变，所以收益来自 `useI18n` 绑定到的内容。

**使用 `vue-i18n`** 时，绑定是全局实例。`createI18n({ messages: { en, fr, ... } })` 是一个导入，包含所有内容；每个调用 `useI18n()` 的组件都可以访问所有内容，因此 bundler 无法在实例以下进行分割。优化意味着 _你_ 需要按路由拆分 `en.json`，在路由守卫中调用 `setLocaleMessage()`，并在组件移动时保持路由到文件的映射正确。

```bash
.
├── locales
│   ├── en.json                    # 每个页面的字符串
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**使用 `@intlayer/vue-i18n`**，绑定是字典。`syncJSON` 将 `en.json` 的每个顶级键转换为字典；优化过程将组件所需的那些作为导入提供给 bundler 追踪并按页面拆分。

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # 未更改，仍为真实来源
│   └── fr.json
├── .intlayer/                     # 生成：每个顶级键对应一个字典，每个语言环境
└── src
    ├── i18n.ts                    # createI18n({})   ← messages 导入已删除
    ├── main.ts                    # app.use(i18n)    ← 未更改
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← 未更改
```

`i18n.ts` 中的 `messages` 导入是唯一需要删除的一行。那就是 88 KB。

## 分三个步骤迁移

<Steps>
<Step number={1} title="安装">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

该命令检测 `vue-i18n`，安装 `intlayer`、`vue-intlayer`、`@intlayer/vue-i18n` 和 `@intlayer/sync-json-plugin`，并预填充 `intlayer.config.ts`。保持 `vue-i18n` 已安装：它是一个对等依赖项，并提供类型。

</Step>
<Step number={2} title="将 Intlayer 指向您的 locale 文件">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" 捆绑每个语言环境; "dynamic" 按需加载活跃的语言环境
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n 方言: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json` 保持在原来的位置。每个顶级键（`footer`、`hero`...）都会变成一个字典。

</Step>
<Step number={3} title="添加插件并删除消息导入">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// 之前: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` 包装了 `vite-intlayer`（内容监听、字典编译、优化过程）并将 `vue-i18n` 别名指向适配器。移除 `messages` 导入是减少 88 KB 的关键；保留它会使应用继续工作，但会同时发送两个版本。

</Step>
</Steps>

### 之后可以删除的内容

| 文件 / 模式                                     | 原因                                                          |
| ----------------------------------------------- | ------------------------------------------------------------- |
| `import en from "./locales/en.json"` 及类似语句 | 仅由适配器用作回退方案。这是 88 KB 的来源                     |
| 路由守卫中的 `setLocaleMessage()`               | 无操作。按路由加载现在是编译器的工作                          |
| `@intlify/unplugin-vue-i18n`                    | 不需要：它预编译消息和 SFC blocks，而适配器不读取这些内容     |
| SFC `<i18n>` 块                                 | 未被读取；将它们移动到 locale JSON 或每个组件的 `.content.ts` |

### 除了字节数之外你还能获得什么

- **类型化的键。** `t("footer.github")` 针对编译的 `footer` 字典进行类型检查；错误的路径会产生 TypeScript 错误，而不是将键呈现为文本。
- **`npx intlayer test`** 在 CI 中对任何 locale 中缺少的键失败。**`npx intlayer fill`** 使用你自己的提供商密钥（OpenAI、Anthropic、Mistral、Gemini...）翻译缺少的键，并将其写回 `locales/{locale}.json`。
- **Visual Editor 和 CMS** 操作相同的 JSON，因此非开发人员可以通过 UI 进行编辑，文件会自动更新。
- **逐步迁移到 `.content.ts`。** 任何组件都可以通过一个共同位置的内容文件从 `useI18n()` 切换到 `useIntlayer("footer")`。JSON 和 `.content.ts` 字典可以共存并合并。

## 开始前需要了解的限制

- **SFC `<i18n>` 块不被读取。** 如果你的消息存在于组件内部，它们需要移动到 locale 文件（或 `.content.ts`，这是相同的想法但带有类型）。
- **运行时消息加载已消除。** `setLocaleMessage()` 和 `mergeLocaleMessage()` 会发出警告并返回。从 CMS 在运行时获取的翻译需要 Intlayer 的 CMS，或者使用 `intlayer pull` / `push` 命令。
- **`messages` 是一个回退方案，不是免费的。** 在 `createI18n()` 中保留 JSON 导入会在 bundle 中保留 75 KB。一旦 `intlayer test` 通过，就删除它们。
- **该适配器不是原生运行时。** 7.9 KB 对比 `vue-intlayer` 的 3.9 KB。一旦每个组件都迁移到 `useIntlayer`，就可以删除它。

## 何时使用哪个？

- **继续使用 `vue-i18n`** 如果你的应用依赖 SFC `<i18n>` 块、运行时 `setLocaleMessage()` 流程，或者 90 KB 每页对你的用户来说不是问题。
- **使用 `@intlayer/vue-i18n`** 如果你在用 `vue-i18n` 并想要节省 88 KB、缩小 23 倍的组件、0% 页面泄漏、类型化的键和 CI 检查，而无需编辑 `.vue` 文件。这是现有 `vue-i18n` codebase 的入口点。
- **使用原生方案（`vue-intlayer`）** 用于新项目，或在适配器完成其工作后。它具有最轻的运行时（3.9 KB）和按组件的 `.content.ts` 模型，用类型化内容替代 `<i18n>` 块。

## 相关比较

- [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) (功能和开发体验)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (库，相同基准)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/blog/next-intl-vs-intlayer-next-intl) (相同adapter系列)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (相同adapter系列)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (相同adapter系列)
- [迁移指南：vue-i18n 到 Intlayer](https://intlayer.org/doc/migration/vue-i18n)
- [兼容适配器参考：vue-i18n](https://intlayer.org/doc/compatibility/vue-i18n), [Nuxt i18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n)

## 总结

`@intlayer/vue-i18n` 改变了 `useI18n()` 的绑定方式：从持有每个locale的每条消息的全局实例转变为为该组件编译的字典。在同一个 Vite + Vue 3 应用上，每页减少 **88 KB**，运行时减少 **3倍**，组件减少 **23倍**，页面泄漏 **0%**，仅需配置文件、一行插件和删除一个导入。SFC `<i18n>` 块和运行时消息加载是它不支持的两个功能，而原生 `vue-intlayer` 运行时仍然保持其一半的大小。

所有原始数据、测试应用程序和脚本都在 [Benchmark Bloom 仓库](https://github.com/intlayer-org/benchmark-bloom) 中。自己运行它。

有关更多详细信息，请参考 ['Why Intlayer?' 文档](https://intlayer.org/doc/why)。
