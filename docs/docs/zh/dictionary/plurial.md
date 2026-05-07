---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: 复数 (Plural)
description: 了解如何在多语言网站中声明和使用区分语言区域的复数内容（基于 CLDR）。按照此在线文档中的步骤，在几分钟内完成项目设置。
keywords:
  - 复数
  - 复数化
  - CLDR
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
---

# 复数内容 / Intlayer 中的复数

## 复数如何工作

在 Intlayer 中，复数内容是通过 `plural` 函数实现的，它将 CLDR 复数类别（`zero`、`one`、`two`、`few`、`many`、`other`）映射到相应的内容。系统会根据当前激活的语言区域和计数，通过平台内置的 [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) API 自动选择正确的类别。

与 [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md) 不同，`enu` 是根据您自己定义的数值范围选择内容的，而 `plural` 将选择权交给 CLDR 规则。这使得它能够扩展到具有复杂复数规则的语言（如俄语、波兰语、阿拉伯语或威尔士语），而无需手动编写求余逻辑。

## 何时使用 `plural` vs `enu`

| 使用场景                                                     | 辅助函数 |
| ------------------------------------------------------------ | -------- |
| 符合语言区域语法的复数形式（1 个苹果 / 2 个苹果 / 5 个苹果） | `plural` |
| 自定义数值范围（`<5`，`>=10`）或非 CLDR 分桶                 | `enu`    |

如果您只针对英语（只有 `one` / `other`），两者皆可。对于任何具有 `few` / `many` / `two` 区别的语言，请优先选择 `plural`。

## 设置复数内容

要在 Intlayer 项目中设置复数内容，请创建一个使用 `plural` 辅助函数的内容模块。`other` 类别是必需的，并在语言区域未定义更具体类别时作为回退方案。

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      zh: plural({
        other: "{{count}} 个职位",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "zh": {
          "nodeType": "plural",
          "plural": {
            "other": "{{count}} 个职位"
          }
        }
      }
    }
  }
}
```

> 支持的类别包括 `zero`、`one`、`two`、`few`、`many`、`other`。您只需要声明目标语言使用的类别, 当没有特定类别匹配时，Intlayer 会回退到 `other`。
>
> `{{count}}` 占位符会自动替换为您在运行时传入的计数。您也可以包含其他占位符（参见下面的[自定义占位符](#custom-placeholders)）。

## 在 React Intlayer 中使用复数内容

要在 React 组件中使用复数内容，请通过 `useIntlayer` 钩子获取它，并传入计数进行调用。激活的语言区域和计数将结合在一起以匹配 CLDR 类别。

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* 英语中：                                     */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

您可以通过两种等效的方式调用返回的函数：

```tsx
totalOpenings(21); // 简写：仅传入计数
totalOpenings({ count: 21 }); // 显式形式
```

## 自定义占位符

复数文本可以包含除 `{{count}}` 之外的占位符。请在对象形式中与 `count` 一起传入：

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      other: "{{name}}，您有 {{count}} 条新消息",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice，您有 1 条新消息"

summary({ count: 7, name: "Alice" });
// → "Alice，您有 7 条新消息"
```

## CLDR 类别一览

不同的语言使用 CLDR 类别的不同子集。一些常见情况：

| 语言            | 使用的类别                                   |
| --------------- | -------------------------------------------- |
| 英语 (`en`)     | `one`, `other`                               |
| 法语 (`fr`)     | `one`, `many`, `other`                       |
| 俄语 (`ru`)     | `one`, `few`, `many`, `other`                |
| 波兰语 (`pl`)   | `one`, `few`, `many`, `other`                |
| 阿拉伯语 (`ar`) | `zero`, `one`, `two`, `few`, `many`, `other` |
| 日语 / 中文     | 仅 `other`                                   |

您无需死记硬背, 只需为您拥有翻译的类别进行声明，Intlayer 会在需要时回退到 `other`。

## 限制

与其他节点相比，`plural` 目前还不能与子节点嵌套使用。

示例：

有效：

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

无效：

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## 更多资源

有关配置和使用的更多详细信息，请参考以下资源：

- [枚举 (Enumeration) 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)
- [插值 (Insertion) 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)
- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_15.md)

这些资源提供了在各种环境和框架中设置和使用 Intlayer 的深入见解。
