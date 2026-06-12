---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: 优化 i18n 打包体积与性能
description: 通过优化国际化（i18n）内容来减小应用程序包的大小。了解如何利用 Intlayer 实现字典的 tree shaking 和延迟加载（lazy loading）。
keywords:
  - 打包优化
  - 内容自动化
  - 动态内容
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "为 Babel/Webpack 引入了 `intlayerPurgeBabelPlugin` 和 `intlayerMinifyBabelPlugin`，明确了插件管线"
  - version: 8.7.0
    date: 2026-04-08
    changes: "向构建配置中添加了 `minify` 和 `purge` 选项"
author: aymericzip
---

# 优化 i18n 打包体积与性能

依赖 JSON 文件的传统 i18n 解决方案中最常见的挑战之一是管理内容体积。如果开发者没有手动将内容拆分到各个命名空间（namespaces），用户通常会为了查看一个页面而下载所有页面、甚至是所有语言的翻译。

例如，一个应用有 10 个页面并被翻译成了 10 种语言，可能导致用户为了这 10 个页面下载所有的内容，尽管他们只想要**一个页面**的内容（当前语言版本的当前页面）。这不仅会造成带宽浪费，也会导致更慢的加载时间。

**Intlayer 通过在构建时（build-time）进行优化来解决这一问题。** 它可以分析你的代码以检测每个组件实际使用了哪些字典，并只将必要的内容注入到你的打包结果（bundle）中。

## 目录

<TOC />

## 分析你的包大小

分析你的打包结果是找出“臃肿”的 JSON 文件和考虑进行代码分割（code-splitting）的首要步骤。这些工具可以生成你应用程序编译代码的树状可视视图（treemap），让你能够清楚地看到究竟是哪些库占据了最多的空间。

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite 在底层使用了 Rollup。插件 `rollup-plugin-visualizer` 能够生成一个交互式 HTML 文件，展示依赖图（graph）中每个模块的体积。

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // 自动在浏览器中打开报告
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

对于使用了 App Router 和 Turbopack 的项目，Next.js 提供了一个内置的实验性分析器，它不需要额外的依赖。

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

如果你在 Next.js 中使用的是默认的 Webpack 打包器，请使用官方的 bundle analyzer。你可以通过在构建期间设置一个环境变量来触发它。

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // 你的 Next.js 配置
});
```

**用法:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### 纯 Webpack

针对 Create React App (ejected)、Angular 或是自定义 Webpack 的设置，使用业界标准的 `webpack-bundle-analyzer`。

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## 它是如何运作的

Intlayer 使用一种**基于组件的方法（per-component approach）**。与全局 JSON 文件不同，你的内容会在组件旁边或是组件内部进行定义。在构建流程中，Intlayer 将会：

1. **分析**你的代码以寻找 `useIntlayer` 的调用。
2. **构建**对应的字典内容。
3. **替换** `useIntlayer` 调用为依据你的配置进行优化后的代码。

这样能够确保：

- 如果一个组件未被导入，它的内容将不会包含在打包产物中（Dead Code Elimination / 死代码消除）。
- 如果一个组件被延迟加载，其内容同样会被延迟加载。

## 插件参考

Intlayer 的构建优化被划分为若干个职责单一的插件。了解它们各自的用途可以防止在配置它们时产生困惑。

### Babel 插件 (`@intlayer/babel`)

这些被直接运用在基于 Webpack 设置的 `babel.config.js` 当中（比如使用了 Babel 的 Next.js、CRA，或是自定义的 Webpack 等）。

| 插件                          | 功能说明                                                                                             |
| :---------------------------- | :--------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | 扫描 `.content.ts` 文件并把编译好的字典写入 `.intlayer/`                                             |
| `intlayerOptimizeBabelPlugin` | 将 `useIntlayer('key')` 重写为 `useDictionary(hash)` 并注入匹配对应字典的 `import` 语句              |
| `intlayerPurgeBabelPlugin`    | 扫描所有源代码文件，从已编译的 `.intlayer/**/*.json` 字典文件中删除**未被使用的内容字段**            |
| `intlayerMinifyBabelPlugin`   | **重命名内容字段的键（keys）** 为简短的字母别名（例如 `title` 变成 `a`），作用范围包括 JSON 与源代码 |

> **插件的执行顺序很重要。** 在你的 `babel.config.js` 里，purge 和 minify 的插件必须放置在 optimize 插件**之前**。优化步骤（optimize）会把 `useIntlayer('key')` 替换为模糊的 `useDictionary(hash)`，此举抹除了能够让 purge 和 minify 识别哪些字段被使用过的字典 key 信息。

每一个 Babel 插件都有对应的选项助手（options helper），该助手会在配置加载时读取一遍 `intlayer.config.ts`，并返回预解析的值：

| 选项助手                     | 配套插件                      |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite 插件 (`vite-intlayer`)

Vite 用户**不需要直接对它们进行配置**。当你在 `vite.config.ts` 里调用 `withIntlayer()` 时，它们会自动生效。只需要在 `intlayer.config.ts` 中设定 `build.purge` 和 `build.minify`，即可开启相应的功能，且不需要额外的插件注册过程。

| 内部 Vite 插件    | 等效行为                                                                            |
| :---------------- | :---------------------------------------------------------------------------------- |
| Usage analyzer    | 等同于 `intlayerPurgeBabelPlugin` 的分析步骤                                        |
| Dictionary prune  | 等同于 `intlayerPurgeBabelPlugin` 的 JSON 写入步骤                                  |
| Dictionary minify | 等同于 `intlayerMinifyBabelPlugin` 的 JSON 写入步骤                                 |
| Babel transform   | 等同于 `intlayerMinifyBabelPlugin` 的代码重命名步骤 + `intlayerOptimizeBabelPlugin` |

## 各平台配置指南

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js 需要依靠 `@intlayer/swc` 插件来进行优化步骤（导入重写），因为 Next.js 采用 SWC 作为编译器。

> 该插件并未默认安装，因为 SWC 插件在 Next.js 当中目前仍处于实验阶段。未来这部分有可能会发生改变。

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

安装完毕后，Intlayer 将会自动侦测并使用该插件。

至于**清除（purge）和最小化（minify）**步骤（即字段移除和字段重命名），请连同 `@intlayer/babel` 一并安装并加入 Babel 插件。由于 Next.js 依靠 SWC 处理代码转化，但仍会评估 `babel.config.js` 以决定插件配置，因此上述 Babel 插件能够在进入 SWC 前作为预处理步骤得以执行。

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: 移除 .intlayer/**/*.json 里未被使用的内容字段
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: 对 JSON 以及源代码里的内容字段的键（keys）进行重命名
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // 注意: 在这里不需要使用 intlayerOptimizeBabelPlugin，因为
    // @intlayer/swc 已经处理了 useIntlayer → useDictionary 的重写过程。
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite 使用了包含在 `vite-intlayer` 依赖当中的 `@intlayer/babel` 插件。整个优化管线 —— 包括导入重写、清除和压缩 —— 是默认开启的，且无需任何额外的插件注册。

在 `intlayer.config.ts` 里设定相对应的标志来开启 purge 以及 minify：

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // 将未被使用的字段从打好的 JSON 包中移除
    minify: true, // 将字段名重命名为简短的别名
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (以及配置了 Babel 的 Next.js)

安装 `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

在 `babel.config.js` 里按照正确的顺序添加所有四个插件：

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: 编译 .content.ts 文件 → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: 从 .intlayer/**/*.json 移除不必要的字段
    //    (读取 intlayer.config.ts 内的 build.purge 配置)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: 压缩并重命名 JSON + 源代码里的字段名
    //    (读取 intlayer.config.ts 内的 build.minify 配置)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: 重写 useIntlayer('key') → useDictionary(hash)
    //    它必须位于末尾，因为该操作会抹去原本的 dictionary 键名。
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## 配置选项

你可通过在你的 `intlayer.config.ts` 里的 `build` 属性来控制 Intlayer 怎样去优化你的代码包。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.CHINESE],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // 决定在构建时是否直接用直引字典覆盖 useIntlayer() 的调用。
    // undefined = 自动（在生产环境中开启），true = 始终开启，false = 始终关闭。
    optimize: undefined,

    // 将已编译字典里的字段键名改写为简短的字母名称（例如：title → a）。
    // 这将缩小 JSON 的体积；前提条件是启用了 optimize。
    minify: true,

    // 将未曾在代码里真正访问过的内容字段移除。
    // 前提条件是启用了 optimize。
    purge: true,
  },
};

export default config;
```

> 在大多数情况之下，推荐为 `optimize` 保留它的默认值（`undefined`）。

> 请参阅配置参考资料以了解所有的选项：[配置说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

### 构建选项

| 属性           | 类型                   | 默认值      | 详细说明                                                                                                                                     |
| :------------- | :--------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | 用于开启 import 语句的重写。`undefined` = 仅在打包成生产环境模式时生效。当设定为 `false` 的时候，同样会导致 purge 以及 minify 均一并被关闭。 |
| **`minify`**   | `boolean`              | `false`     | 用于对已编译好的 JSON 档案里的内容键名改写成短的单字母名称。同理也会一并将源代码里相关访问属性同样改名。仅当 `optimize` 为 `false` 时无效。  |
| **`purge`**    | `boolean`              | `false`     | 用于移除无论如何也不会被调用的且静态的源文件的内容字段，从 JSON 输出中去除掉。仅当 `optimize` 为 `false` 时无效。                            |

### 压缩 / Minification (重命名字段键值)

`build.minify` **并非**压缩你的 JavaScript —— 那是你的打包器应该处理的工作。它的工作，是把编译后的字典对应的 JSON 文件的每一个自定义内容的字段，全用短位的字母标识来替代，借此将其体积进行压缩：

```
// Minify 之前
{ "title": "Hello", "subtitle": "World" }

// Minify 之后
{ "a": "Hello", "b": "World" }
```

该重新命名的方法同样也会应用到那些处于代码里的属性名访问阶段，所以在最终编译好的结果里，`content.title` 便会演变为 `content.a`。它们在运行时的实际表现完全一致。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> 如果在 `optimize` 被设为 `false`、又或是启用了可视化编辑器也就是当 `editor.enabled` 设定为了 `true` 时（由于编辑器需要保留字段名称以便做后续处理），重命名这个操作都将会被跳过。

> 同理，如果是利用了 `importMode: 'fetch'` 来载入字段时此过程同样不适用。因为它们的内容会以原始命名由后端 API 所提供，对客户端内容随意重命名会破坏客户端与服务端的匹配契约。

### 字段清除 / Purging (去掉未被引用的字段内容)

`build.purge` 能自动分析究竟哪些字段真真切切地被你的源代码所引用，进而只把实际引用过的数据予以保留，把其他的垃圾数据从编译生成的 JSON 里排除掉。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**示例说明:** 我们有一个包含五个不同字段数据的字典，但是代码实际就用到了里边的俩：

```
// Purge 执行前
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Purge 之后（这里仅仅只用到了 title 与 subtitle）
{ "title": "…", "subtitle": "…" }
```

> 与前边提到的类似，当 `optimize` 是 `false` 或是开启了可视化编辑器(`editor.enabled` 取值 `true`) 时，它会选择跳过对数据的清除操作。

> 当检测到某份代码因为异常无法顺利解析、又或者当把由 `useIntlayer` 输出的值以静态解析器难以预测分析的模式在不同组件中来回丢（比如被打包成对象传入等而未被进行解构）的时候，它同样会跳过，以此保守地保留整部字典的全部信息，避免意外发生。

### 导入模式（Import Mode）

对于包含多个页面和地区规模比较大的应用程序来说，你的 JSON 可能会占去绝大一部分包（Bundle）的内容。所以，你可以凭借着 `importMode` 这个参数让 Intlayer 来调整对字典内容本身的实际拉取行为。

### 全局定义

该参数可以经由你本身的 `intlayer.config.ts` 这个文件在全局进行指定。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // 默认为 'static'
  },
};

export default config;
```

### 为字典独立配置

我们也可以在这其中部分独立词典原本配置内的 `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` 把该参数改写成另外想要的规则。

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // 将原本的模式改写
  content: {
    // ...
  },
};

export default appContent;
```

| 属性             | 取值类型                           | 默认设置   | 描述说明                                                                                           |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **已被弃用**: 建议调整为 `dictionary.importMode`。这决定了应当怎样加载各项字典。（细节参考下文）。 |

这处 `importMode` 设置用于指挥组件拉取各项内容的真实手段。要么被指定在了全局 `intlayer.config.ts` 中的 `dictionary` 里，要不便以 `content.ts` 形式来分别定制。

### 1. 静态模式（Static Mode - `default`）

在这个默认设定下，Intlayer 自动把全部 `useIntlayer` 变成了 `useDictionary` 以做到将所需的翻译数据无缝拼接入 JavaScript 包内。

- **优势（Pros）:** 即时就能被加载（属于同步型），由于没有水合（hydration）从而意味着额外的零请求。
- **缺点（Cons）:** 但这个包同样也就塞满了给该组件用的**各种不同可用语言的对应版本**，这非常占空间。
- **最佳应用场合:** 单页应用（SPA）。

**代码在转换之后的图示（举例）:**

```tsx
// 这是你的原本代码
const content = useIntlayer("my-key");

// (静态) 优化图解。
// 仅为了解释说明而列，出于优化实际上的最终输出略有差别
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      zh: "我的标题",
    },
  },
});
```

### 2. 动态模式（Dynamic Mode）

在这一设定之下，Intlayer 自动把全部 `useIntlayer` 全给变成了 `useDictionaryAsync`。这个操作能将拉取行文变成动态 `import()`（这和 Suspense 的表现接近），并有针对性地对当地所在的特殊语言去单独异步请求其实际数据。

- **优势（Pros）:** **支持基于地区语言所实施的代码树抖动分离（Tree shaking）。** 说白了就是，正在浏览英语界面的使用者**仅仅**会只被发送那部分英文对应的词典内容，法文或是其他国家的数据都不会加载。
- **缺点（Cons）:** 这个阶段下，将会让组件因数据要求而针对各项水合需求（hydration）各自产生不同种的调用申请（拉取各部件内容）。
- **最佳应用场合:** 内容巨大且充斥了长文博客的复杂平台、亦或是本身涵盖了大量的翻译种类因而在包（bundle）体积极为严格的情况下使用。

**代码在转换之后的图示（举例）:**

```tsx
// 这是你的原本代码
const content = useIntlayer("my-key");

// (动态) 优化图解。
// 仅为了解释说明而列，出于优化实际上的最终输出略有差别
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  zh: () =>
    import(".intlayer/dynamic_dictionary/my-key/zh.json").then(
      (mod) => mod.default
    ),
});
```

> 使用了 `importMode: 'dynamic'` 这个方案之时，如果某一页刚好凑齐了 100 个包含了 `useIntlayer` 内容的部件时，浏览器就有极大的概率朝着服务器丢过去多达 100 种不重样的 fetch 请求。如果意在免于这样的连环「瀑布效应」，尝试尽可能去少写单个的独立 `.content` （尝试着每几块凑一起合并起来比如每一个大的分块区共享其内容字典，而非是切得那么碎，比如连每一个单小按钮都设单独请求。）如果把多个带有单独名字 `.content` 内容给附加上相同的 Key 名称，程序依然能够很轻易将这些零散碎落的数据融合成单独庞大且统一的一本完整的字典对象里去。

### 3. Fetch 模式（Fetch Mode）

行为跟 Dynamic 有所重叠，不过最优先则是朝 Intlayer Live Sync API 请求其词典内容。假如获取数据时遭到拦截或者内容不属于实时的数据内容体系的话，接下来便将其作为兜底顺延递回之前的动切请求。

**代码在转换之后的图示（举例）:**

```tsx
// 这是你的原本代码
const content = useIntlayer("my-key");

// 能够将它（Fetch）看成这类实现
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  zh: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/zh").then((res) =>
      res.json()
    ),
});
```

> 如果还需要获得对于 CMS 获取方面的认知的话：可以去查看 [CMS 说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

> 此模式同样会一如既往地因为 JSON 内容会直接借由后端直接输送而不遭受 purge 跟 minify 等等这几类数据剔除方案的干扰。

## 概要: 静态 和 动态

| 模式特征                   | 静态模式（Static Mode）                                      | 动态模式（Dynamic Mode）                  |
| :------------------------- | :----------------------------------------------------------- | :---------------------------------------- |
| **JS 产生的 Bundle 体积**  | 庞大（包含了供各个不同组件使用时调用的其他全部外语语系信息） | 小巧（内容直接为空、只有代码框架）        |
| **最初加载所需时间**       | 极速（毕竟那些所需信息一开始都已经存在于包（Bundle）里面了） | 略需等待（拉取 JSON 所需消耗时间）        |
| **附带发生的网络请求**     | 无，无需任何等待直接 0 次                                    | 取决字典请求次数（一次 Key 取出就是一回） |
| **树抖动（Tree Shaking）** | 按单一组件的级别而做分割                                     | 依组件级别外加依据地区与语种去实施拆分    |
| **最佳应用与方案环境**     | 普通交互式元件内容或单一界面的轻型程序等                     | 极其充满内容的纯文区块或极其繁多的语系    |
