---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionary 函数文档 | intlayer
description: 查看如何在 intlayer package 中使用 getDictionary 函数
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "初始文档"
author: aymericzip
---

# 文档：`intlayer` 中的 `getDictionary` 函数

## 描述

`getDictionary` 函数解析**您自己传递的字典对象**，并返回其为给定区域设置解析后的内容。它单次遍历内容并根据需要应用每个解析器插件，解析 `t()` 翻译、枚举、条件、插入、嵌套、markdown、HTML 和文件节点。

与 [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md)（在生成的注册表中按键查找字典）不同，`getDictionary` 接收字典本身。这使其成为处理在运行时构建、从 API 或 CMS 获取或在测试中声明的内容的合适工具。

**主要功能：**

- 适用于任何遵循字典结构（`{ key, content }`）的对象
- 也接受合格的字典组（集合、变体）和选择器
- 完全类型化：返回的对象镜像您传递的 `content`
- 接受自定义解析器插件

---

## 函数签名

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // 必需
  localeOrSelector?: LocalesValues | DictionarySelector, // 可选
  plugins?: Plugins[]                                // 可选
): DeepTransformContent<...>
```

---

## 参数

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **描述**: 要解释的字典（或合格字典组）。
  - **类型**: `Dictionary | QualifiedDictionaryGroup`
  - **必需**: 是

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **描述**: 用于解释内容的区域设置，或选择器对象（`{ item }`、`{ variant }`，可选择带 `locale`）。请参阅[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)。
  - **类型**: `LocalesValues | DictionarySelector`
  - **必需**: 否（可选）— 默认为配置的 `defaultLocale`。

- `plugins: Plugins[]`
  - **描述**: 节点转换器数组，定义如何解释识别的节点。如果省略，将使用默认的解释器插件集。
  - **类型**: `Plugins[]`
  - **必需**: 否（可选）

### 返回值

- **类型**：字典的解释内容。
- **描述**：你传递的 `content`，其中所有 Intlayer 节点都为请求的区域设置进行了解析。对于没有 `item` 选择器的集合组，返回一个有序的解释条目数组；当选择器不指向任何内容时，返回 `null`。

---

## 示例用法

### 基本用法

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        zh: "你好",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### 解释运行时获取的内容

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### 使用选择器

```typescript
import { getDictionary } from "intlayer";

// 一个合格的字典组被解析为单个条目…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …或者当没有给定 `item` 时返回一个有序数组
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## 相关函数

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getIntlayer.md): 相同的解释，但字典是通过键在生成的注册表中查找的。
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getDictionaryAsync.md): 针对每个区域设置加载器映射的对应函数。
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useDictionary.md): 等效的 React hook，从提供程序读取区域设置。

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
