---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: 优化 i18n 构建包大小与性能
description: 通过优化国际化 (i18n) 内容来减小应用程序构建包的大小。学习如何利用 Intlayer 对字典进行 Tree Shaking 和延迟加载。
keywords:
  - 构建包优化
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "在构建配置中增加了 `minify` 和 `purge` 选项"
---

# 优化 i18n 构建包大小与性能

依赖 JSON 文件的传统 i18n 解决方案面临的最常见挑战之一是管理内容大小。如果开发人员不手动将内容分离到命名空间中，用户往往为了查看单个页面而下载每个页面甚至每种语言的翻译。

例如，一个包含 10 个页面并翻译成 10 种语言的应用程序，可能会导致用户下载 100 个页面的内容，即使他们只需要**一页**（当前语言的当前页面）。这会导致带宽浪费和加载速度变慢。

**Intlayer 通过构建时优化解决了这个问题。** 它分析您的代码以检测每个组件实际使用的字典，并仅将必要的内容重新注入到您的构建包中。

## 目录

<TOC />

## 扫描您的构建包

分析构建包是识别“重型”JSON 文件和代码分割机会的第一步。这些工具可以生成应用程序编译后代码的可视化树图 (treemap)，让您确切地看到哪些库占用了最多的空间。

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite 底层使用 Rollup。`rollup-plugin-visualizer` 插件生成一个交互式 HTML 文件，显示图中每个模块的大小。

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // 在浏览器中自动打开报告
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

对于使用 App Router 和 Turbopack 的项目，Next.js 提供了一个内置的实验性分析器，不需要额外的依赖。

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

如果您在 Next.js 中使用默认的 Webpack 打包器，请使用官方的构建包分析器。通过在构建期间设置环境变量来触发它。

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
  // 您的 Next.js 配置
});
```

**用法：**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### 标准 Webpack

对于 Create React App (ejected)、Angular 或自定义 Webpack 设置，请使用行业标准的 `webpack-bundle-analyzer`。

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

## 工作原理

Intlayer 使用**按组件优化**的方法。与全局 JSON 文件不同，您的内容定义在组件旁边或内部。在构建过程中，Intlayer 会：

1.  **分析**您的代码以查找 `useIntlayer` 调用。
2.  **构建**相应的字典内容。
3.  根据您的配置用优化后的代码**替换** `useIntlayer` 调用。

这确保了：

- 如果一个组件没有被引入，它的内容就不会包含在构建包中（Dead Code Elimination）。
- 如果一个组件是延迟加载的，它的内容也会被延迟加载。

## 按平台设置

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js 需要 `@intlayer/swc` 插件来处理转换，因为 Next.js 使用 SWC 进行构建。

> 该插件默认不安装，因为 SWC 插件对 Next.js 仍处于实验阶段。未来可能会发生变化。

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

安装后，Intlayer 将自动检测并使用该插件。

 </Tab>
 <Tab value="vite">

### Vite

Vite 使用 `@intlayer/babel` 插件，该插件作为 `vite-intlayer` 的依赖项包含在内。优化默认启用。无需额外操作。

 </Tab>
 <Tab value="webpack">

### Webpack

要在 Webpack 上启用 Intlayer 构建包优化，您需要安装并配置相应的 Babel (`@intlayer/babel`) 或 SWC (`@intlayer/swc`) 插件。

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

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## 配置

您可以通过 `intlayer.config.ts` 中的 `build` 属性来控制 Intlayer 如何优化您的构建包。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * 压缩字典以减小构建包大小。
     */
     minify: true;

    /**
     * 清除字典中未使用的键
     */
     purge: true;

    /**
     * 指示构建是否应检查 TypeScript 类型
     */
    checkTypes: false;
  },
};

export default config;
```

> 在绝大多数情况下，建议保持 `optimize` 的默认选项。

> 有关更多详情，请参见配置文档：[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

### 构建选项

`build` 配置对象下提供以下选项：

| 属性           | 类型      | 默认值      | 描述                                                                                                                                    |
| :------------- | :-------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | 控制是否启用构建优化。如果为 `true`，Intlayer 使用优化后的注入替换字典调用。如果为 `false`，则禁用优化。建议在生产环境中设置为 `true`。 |
| **`minify`**   | `boolean` | `false`     | 是否压缩字典以减小构建包大小。                                                                                                          |
| **`purge`**    | `boolean` | `false`     | 是否清除字典中未使用的键。                                                                                                              |

### 压缩 (Minification)

压缩字典可以删除不必要的空格、注释，并减小 JSON 内容的大小。这对于大型字典尤其有用。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> 注意：如果禁用 `optimize` 或启用了可视化编辑器（因为编辑器需要完整内容以便编辑），则会忽略压缩。

### 清除 (Purging)

清除确保只有代码中实际使用的键才会包含在最终的字典构建包中。如果您的大型字典包含许多并非在应用程序每个部分都使用的键，这可以显著减小构建包的大小。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> 注意：如果禁用 `optimize`，则会忽略清除。

### 导入模式 (Import Mode)

对于包含多个页面和语言的大型应用程序，您的 JSON 文件可能占用构建包大小的很大一部分。Intlayer 允许您控制字典的加载方式。

导入模式可以在 `intlayer.config.ts` 文件中全局定义默认值。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

也可以在您的 `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` 文件中为每个字典定义。

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // 覆盖默认导入模式
  content: {
    // ...
  },
};

export default appContent;
```

| 属性             | 类型                               | 默认值     | 描述                                                                         |
| :--------------- | :--------------------------------- | :--------- | :--------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **已弃用**：请改用 `dictionary.importMode`。确定字典的加载方式（详见下文）。 |

`importMode` 设置规定了字典内容如何注入到您的组件中。
您可以在 `intlayer.config.ts` 文件的 `dictionary` 对象下全局定义它，或者在字典的 `.content.ts` 文件中覆盖它。

### 1. 静态模式 (`default`)

在静态模式下，Intlayer 将 `useIntlayer` 替换为 `useDictionary`，并将字典直接注入 JavaScript 构建包中。

- **优点：** 即时渲染（同步），水合过程中零额外网络请求。
- **缺点：** 构建包包含该特定组件**所有**可用语言的翻译。
- **最适合：** 单页应用程序 (SPA)。

**转换后的代码示例：**

```tsx
// 您的代码
const content = useIntlayer("my-key");

// 优化后的代码（静态）
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. 动态模式

在动态模式下，Intlayer 将 `useIntlayer` 替换为 `useDictionaryAsync`。这使用 `import()`（类似于 Suspense 的机制）来延迟加载当前语言特定的 JSON。

- **优点：** **语言级别的 Tree Shaking。** 查看英文版本的用户将*仅*下载英文字典，永远不会加载法文字典。
- **缺点：** 在水合过程中每个组件都会触发一次网络请求（资源获取）。
- **最适合：** 大型文本块、文章或支持多种语言且构建包大小至关重要的应用程序。

**转换后的代码示例：**

```tsx
// 您的代码
const content = useIntlayer("my-key");

// 优化后的代码（动态）
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> 使用 `importMode: 'dynamic'` 时，如果您在单个页面上有 100 个组件使用 `useIntlayer`，浏览器将尝试 100 次单独的获取。为了避免这种请求“瀑布”，请将内容分组到更少的 `.content` 文件中（例如，每个页面部分一个字典），而不是每个原子组件一个。

### 3. 获取模式 (Fetch Mode)

行为类似于动态模式，但首先尝试从 Intlayer Live Sync API 获取字典。如果 API 调用失败或内容未标记为实时更新，则会回退到动态导入。

> 有关更多详情，请参见 CMS 文档：[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

> 在获取模式下，不能使用清除和压缩。

## 总结：静态 vs 动态

| 特性              | 静态模式                   | 动态模式                 |
| :---------------- | :------------------------- | :----------------------- |
| **JS 构建包大小** | 较大（包含组件的所有语言） | 最小（仅代码，无内容）   |
| **初始加载**      | 即时（内容在构建包中）     | 轻微延迟（获取 JSON）    |
| **网络请求**      | 0 次额外请求               | 每个字典 1 次请求        |
| **Tree Shaking**  | 组件级                     | 组件级 + 语言级          |
| **最佳用例**      | UI 组件、小型应用          | 文本较多的页面、多种语言 |
