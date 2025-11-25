---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: 优化 i18n 包大小与性能
description: 通过优化国际化（i18n）内容来减少应用程序包大小。学习如何利用 Intlayer 实现字典的树摇和懒加载。
keywords:
  - 包优化
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
  - version: 6.0.0
    date: 2025-11-25
    changes: 初始化历史记录
---

# 优化 i18n 包大小与性能

传统 i18n 解决方案依赖 JSON 文件时，最常见的挑战之一是内容大小的管理。如果开发者没有手动将内容分割到不同的命名空间，用户通常会下载所有页面甚至所有语言的翻译内容，仅仅为了查看单个页面。

例如，一个有 10 个页面且翻译成 10 种语言的应用，用户可能会下载 100 个页面的内容，尽管他们只需要**一个**（当前语言的当前页面）。这会导致带宽浪费和加载时间变慢。

> 要检测这种情况，可以使用包分析工具，如 `rollup-plugin-visualizer`（vite）、`@next/bundle-analyzer`（next.js）或 `webpack-bundle-analyzer`（React CRA / Angular 等）。

**Intlayer 通过构建时优化解决了这个问题。** 它分析您的代码以检测每个组件实际使用的字典，并仅将必要的内容重新注入到您的包中。

## 目录

<TOC />

## 工作原理

Intlayer 采用 **按组件划分的方法**。与全局 JSON 文件不同，您的内容定义在组件旁边或组件内部。在构建过程中，Intlayer 会：

1. **分析**您的代码以查找 `useIntlayer` 调用。
2. **构建**相应的字典内容。
3. **替换**`useIntlayer` 调用为基于您配置的优化代码。

这确保了：

- 如果组件未被导入，其内容不会包含在包中（死代码消除）。
- 如果组件是懒加载的，其内容也会被懒加载。

## 按平台设置

### Next.js

Next.js 需要 `@intlayer/swc` 插件来处理转换，因为 Next.js 使用 SWC 进行构建。

> 该插件默认已安装，因为 SWC 插件在 Next.js 中仍处于实验阶段，未来可能会有所变化。

### Vite

Vite 使用 `@intlayer/babel` 插件，该插件作为 `vite-intlayer` 的依赖包含在内。优化默认启用。

### Webpack

要在 Webpack 上启用 Intlayer 的包优化，您需要安装并配置相应的 Babel（`@intlayer/babel`）或 SWC（`@intlayer/swc`）插件。

### Expo / Lynx

该平台目前**尚不支持**包优化。支持将在未来版本中添加。

## 配置

您可以通过 `intlayer.config.ts` 文件中的 `build` 属性来控制 Intlayer 如何优化您的包。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // 或 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> 在大多数情况下，建议保持 `optimize` 的默认选项。

> 更多详情请参阅文档配置：[Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

### 构建选项

以下选项可在 `build` 配置对象中使用：

| 属性                  | 类型                            | 默认值                          | 描述                                                                                                                                          |
| :-------------------- | :------------------------------ | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                       | `undefined`                     | 控制是否启用构建优化。如果为 `true`，Intlayer 会用优化后的注入替换字典调用。如果为 `false`，则禁用优化。理想情况下在生产环境中设置为 `true`。 |
| **`importMode`**      | `'static' , 'dynamic' , 'live'` | `'static'`                      | 决定字典的加载方式（详见下文）。                                                                                                              |
| **`traversePattern`** | `string[]`                      | `['**/*.{js,ts,jsx,tsx}', ...]` | 定义 Intlayer 应扫描以进行优化的文件的全局匹配模式。使用此选项可排除无关文件，加快构建速度。                                                  |
| **`outputFormat`**    | `'esm', 'cjs'`                  | `'esm', 'cjs'`                  | 控制构建后字典的输出格式。                                                                                                                    |

## 导入模式

`importMode` 设置决定字典内容如何注入到你的组件中。

### 1. 静态模式（`default`）

在静态模式下，Intlayer 会将 `useIntlayer` 替换为 `useDictionary`，并将字典直接注入到 JavaScript 包中。

- **优点：** 即时渲染（同步），在 hydration 期间无需额外的网络请求。
- **缺点：** 包含该特定组件所有可用语言的翻译。
- **适用场景：** 单页应用（SPA）。

**转换后的代码示例：**

```tsx
// 你的代码
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

在动态模式下，Intlayer 将 `useIntlayer` 替换为 `useDictionaryAsync`。这使用 `import()`（类似 Suspense 的机制）来懒加载当前语言环境的 JSON 文件。

- **优点：** **按语言环境进行树摇优化。** 观看英文版本的用户只会下载英文词典，法文词典则不会被加载。
- **缺点：** 在 hydration 期间，每个组件都会触发一次网络请求（资源获取）。
- **适用场景：** 大块文本、文章，或支持多语言且对包大小要求严格的应用。

**转换后的代码示例：**

```tsx
// 你的代码
const content = useIntlayer("my-key");

// 优化后的代码（动态）
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> 当使用 `importMode: 'dynamic'` 时，如果在单个页面上有 100 个组件使用 `useIntlayer`，浏览器将尝试发起 100 次单独的请求。为了避免这种“瀑布式”请求，建议将内容分组到更少的 `.content` 文件中（例如，每个页面部分一个字典），而不是每个原子组件一个。

> 目前，`importMode: 'dynamic'` 尚未完全支持 Vue 和 Svelte。建议在这些框架中使用 `importMode: 'static'`，直到后续更新。

### 3. 实时模式

行为类似于动态模式，但会优先尝试从 Intlayer 实时同步 API 获取字典。如果 API 调用失败或内容未标记为实时更新，则回退到动态导入。

> 更多详情请参阅 CMS 文档：[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)

## 总结：静态模式 vs 动态模式

| 功能             | 静态模式                   | 动态模式                   |
| :--------------- | :------------------------- | :------------------------- |
| **JS 包大小**    | 较大（包含组件的所有语言） | 最小（仅代码，无内容）     |
| **初始加载**     | 即时（内容包含在包内）     | 轻微延迟（获取 JSON）      |
| **网络请求**     | 无额外请求                 | 每个字典一次请求           |
| **Tree Shaking** | 组件级别                   | 组件级别 + 语言级别        |
| **最佳使用场景** | UI 组件，小型应用          | 文字较多的页面，多语言支持 |
