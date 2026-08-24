---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayer 函数文档 | intlayer
description: 了解如何使用 intlayer package 中的 getIntlayer 函数
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# 文档：`intlayer` 中的 `getIntlayer` 函数

## 描述

`getIntlayer` 函数通过其键选择一个字典，并返回针对给定区域设置解释的内容。它是 `useIntlayer` 钩子的框架无关对应物：相同的内容、相同的选择器，但可在 React 上下文不可用的任何地方使用 — Node 脚本、服务器函数、路由加载器、元数据构建器、Express/Fastify 处理程序、测试。

它读取由 Intlayer 在 `.intlayer/` 中生成的字典，因此 `key` 参数是从您自己的内容声明中类型化和自动完成的，返回的对象从每个叶子节点都是完全类型化的。

**主要特性：**

- 类型化的字典键和类型化的返回内容
- 解释每个内容节点（`t()`、`enu()`、`cond()`、`insert()`、`nest()`、`md()`、`html()`、`file()`、`gender()`）
- 接受区域设置或选择器对象（集合、变体）
- 结果根据 `key + locale + selector` 进行记忆化
- 在开发中当字典缺失时回退到安全代理，而不是崩溃

---

## 函数签名

```typescript
getIntlayer(
  key: DictionaryKeys,                        // 必需
  localeOrSelector?: LocalesValues | DictionarySelector, // 可选
  plugins?: Plugins[]                         // 可选
): DeepTransformContent<...>
```

---

## 参数

- `key: DictionaryKeys`
  - **Description**: 要读取的字典的键，如在您的内容文件中声明的那样。
  - **Type**: `DictionaryKeys` — 每个声明的字典键的联合。
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: 用于解释内容的语言环境，或用于[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)的选择器对象。
    - `'fr'` — 一个语言环境
    - `{ item: 2 }` — 一个[集合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/collections.md)项目（省略 `item` 以获取每个项目作为数组）
    - `{ variant: 'black-friday' }` — 一个命名的[变体](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/variants.md)（省略以使用 `default` 版本）
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — 一个结构化变体
    - 任何选择器都可以携带一个语言环境：`{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — 默认为配置的 `defaultLocale`。

- `plugins: Plugins[]`
  - **Description**: 自定义节点转换器，替换基础解释器插件。仅用于高级用法；省略它以保持默认行为。
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### 返回值

- **Type**: 字典的解释内容，根据您的声明进行类型化。
- **Description**: 一个纯对象，镜像您字典的 `content` 字段，其中每个 Intlayer 节点都已解析为请求的语言环境的最终值。

---

## 示例用法

### 基本用法

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      zh: "你好",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### 不指定语言

省略语言参数会使用你在[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)中声明的 `defaultLocale` 来解释内容。

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // 使用默认语言解释
```

### 在服务器处理程序内

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### 使用选择器（集合和变体）

```typescript
import { getIntlayer } from "intlayer";

// 单个集合项
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// 集合的所有项，作为有序数组
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// 命名变体
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## 行为说明

### 缓存

结果在模块级缓存中进行了记忆化处理，缓存键由 `key + locale + selector` 组成。重复调用 `getIntlayer("app", "fr")` 只会解释一次字典，之后返回同一个对象。

### 缺失的字典

在开发过程中，请求一个没有生成字典的键会记录一次警告并返回一个安全的回退代理：读取 `content.title` 会产生字符串 `"app.title"` 而不是抛出错误。这使页面在修复缺失声明时保持可用。运行 Intlayer 构建（或开发服务器）以生成字典。

### Bundle size

`getIntlayer` 读取合并的字典，其中包含**每个**语言环境。在客户端 bundles 中，[构建插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)重写调用，以便只传输所需的内容。当你在渲染之外读取内容（元数据、加载器、服务器函数）并希望按需加载单个语言环境时，请使用 [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayerAsync.md)。

---

## 相关函数

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayerAsync.md): 异步版本，加载单个语言块。
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getDictionary.md): 解释你自己传递的字典对象，而不是按键查找。
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md): React hook 等效版本，从 provider 读取语言设置。

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
