---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync 函数文档 | intlayer
description: 了解如何使用 intlayer 包中的 getDictionaryAsync 函数
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: `intlayer` 中的 `getDictionaryAsync` 函数

## 描述

`getDictionaryAsync` 函数加载字典的**单个语言环境块**并返回其解释后的内容。

它是 [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getDictionary.md) 的对应物，用于在 `.intlayer/dynamic_dictionaries/` 中发出的每个语言环境加载器映射：它不是接收包含每个语言环境的字典，而是接收加载器映射并仅等待请求的语言环境所需的块。

> 在应用程序代码中，你通常会调用 [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayerAsync.md)，而不是这个函数。[构建插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 会将每个 `getIntlayerAsync('key', locale)` 调用重写为 `getDictionaryAsync(loaderMap, 'key', locale)` 调用。`getDictionaryAsync` 会被导出供自定义加载器和为自己的加载器映射构建工具使用。

**主要特性：**

- 仅加载请求的语言环境块
- 支持普通(`locale → loader`)和限定(`locale → qualifierId → loader`)加载器映射
- 对同一块的并发加载进行去重，并缓存解决的内容
- 失败的加载会从缓存中清除，以便后续调用重新尝试该块

---

## 函数签名

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // 必需
  key: string,                                           // 必需
  localeOrSelector?: LocalesValues | DictionarySelector, // 可选
  plugins?: Plugins[]                                    // 可选
): Promise<DeepTransformContent<...>>
```

---

## 参数

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **描述**: 按语言的加载器映射。普通映射将语言与加载器关联；限定映射（用于集合和变体）将语言与限定符 id 关联，然后与加载器关联。对于限定映射，仅加载选择器指向的块。
  - **类型**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **必需**: 是

- `key: string`
  - **描述**: 字典键，用于命名块缓存。
  - **类型**: `string`
  - **必需**: 是

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **描述**: 用于解释内容的语言，或选择器对象（`{ item }`、`{ variant }`，可选择带有 `locale`）。参见[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)。
  - **类型**: `LocalesValues | DictionarySelector`
  - **必需**: 否（可选）— 默认为配置的 `defaultLocale`。

- `plugins: Plugins[]`
  - **描述**: Node 转换器。默认为基础解释器集。
  - **类型**: `Plugins[]`
  - **必需**: 否（可选）

### 返回值

- **Type**: `Promise<Content>` — 一个 promise，解析为加载的 chunk 的解释内容。
- **Description**: 当 map 对请求的 locale 及其任何 fallback 都没有发出 chunk 时，解析为 `null`，镜像缺失的合格坐标如何解析。

---

## 使用示例

### 使用生成的 loader map

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### 使用自定义加载器映射

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### 在合格的map上使用选择器

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## 行为注释

### 缓存和去重

缓存存储每个 `key + locale + selector` 三元组的 **promise**，因此对同一 chunk 的并发调用会等待单次加载。被拒绝的加载会从缓存中移除，因此失败的 chunk 会在下次调用时重试，而不是永远重放同样的失败。

### 区域设置回退

普通加载器映射沿着与同步模式相同的回退链进行遍历：首先是请求的区域设置，然后是其回退，如果没有发出任何块，则为 `null`。

---

## 相关函数

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayerAsync.md): 应用程序调用的函数；build 插件将其重写为 `getDictionaryAsync`。
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getDictionary.md): 同步对应函数，接收完整的字典。
- [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md): 集合和变体，以及它们生成的 loader 映射。

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
