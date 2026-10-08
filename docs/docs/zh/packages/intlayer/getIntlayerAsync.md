---
createdAt: 2026-08-23
updatedAt: 2026-10-08
priority: 5
title: getIntlayerAsync 函数文档 | intlayer
description: "使用 getIntlayerAsync 只加载并读取某一个语言的字典内容，不打包其他语言。"
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
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
  - getIntlayerAsync
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "省略语言环境时，等待请求的语言环境（Next.js 的 headers 和 cookies）"
  - version: 9.4.0
    date: 2026-08-23
    changes: "初始文档"
author: aymericzip
---

# 文档：`intlayer` 中的 `getIntlayerAsync` 函数

## 描述

`getIntlayerAsync` 函数通过其键选择一个字典，并为给定的语言环境解析其内容，**仅加载该语言环境**。

它是 [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md) 的异步对应物，用于在渲染之外读取字典的地方，路由 `head` / 元数据构建器、加载器、服务器函数。

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md)

而 `getIntlayer` 拉取包含每个语言环境的合并字典，[构建插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)（`@intlayer/babel`、`@intlayer/swc`）会将此调用重写为 `getDictionaryAsync(loaderMap, key, locale)`，指向 `.intlayer/dynamic_dictionaries/` 中的各语言环境块。因此，bundle 只会包含实际请求的语言环境。

- [构建插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)

没有这些插件，未优化的构建，调用会通过同步字典注册表解析：内容相同，但没有各语言环境的拆分。

**主要特性：**

- 与 `getIntlayer` 相同的类型化键、选择器和返回内容
- 在优化构建中仅加载请求的语言环境块
- 针对同一块的并发调用共享单个加载
- 可安全用于 `async` 元数据构建器、加载器和服务器函数

## 函数签名

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // 必需
  localeOrSelector?: LocalesValues | DictionarySelector, // 可选
  plugins?: Plugins[]                         // 可选
): Promise<DeepTransformContent<...>>
```

## 参数

- `key: DictionaryKeys`
  - **描述**: 要读取的字典的键，如您的内容文件中声明的那样。
  - **类型**: `DictionaryKeys`，每个声明的字典键的并集。
  - **必需**: 是

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **描述**: 用于解释内容的区域设置，或用于[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)的选择器对象。
    - `'fr'`：一个区域设置
    - `{ item: 2 }`：一个[集合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/collections.md)项（省略 `item` 以获取每个项作为数组）
    - `{ variant: 'black-friday' }`：一个命名的[变体](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/variants.md)（省略以使用 `default` 变体）
    - `{ variant: { id: 'prod_abc', userId: '123' } }`：一个结构化变体
    - 任何选择器都可以携带一个区域设置: `{ item: 2, locale: 'fr' }`
  - **类型**: `LocalesValues | DictionarySelector`
  - **必需**：否（可选）。省略时，按与 [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md) 相同的方式解析（请求的语言环境，然后是已保存的语言环境，然后是 `defaultLocale`）。由于是异步函数，当请求的语言环境只能异步读取时，它还可以等待该语言环境：在 Next.js 的 Server Components、`generateMetadata` 和 route handler 中，它会像 `next-intlayer/server` 的 `getLocale()` 一样读取请求的 `headers()` 和 `cookies()`。这次读取会让路由切换为动态渲染，因此只有在 `IntlayerProvider` 尚未提供语言环境时才会进行。

- `plugins: Plugins[]`
  - **描述**: 替换基础解释器插件的自定义节点转换器。仅限高级使用。
  - **类型**: `Plugins[]`
  - **必需**: 否（可选）

### 返回值

- **类型**: `Promise<Content>`，一个 promise，解析为字典的解释内容，类型由你的声明决定。

## 使用示例

### 基本用法

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`         |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Returns            | 内容                                                                                                            | 内容的 Promise             |
| Dictionary loaded  | 合并的字典（所有语言）                                                                                          | 仅请求的语言的块           |
| Best suited for    | 渲染、同步代码路径                                                                                              | 元数据、加载器、服务器函数 |
| Requires a plugin? | 否                                                                                                              | 否，按语言拆分需要构建插件 |

两者接受相同的参数并返回相同的内容：在两者之间切换只会改变**何时**加载和**加载多少**。

## 相关函数

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocale.md)

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
