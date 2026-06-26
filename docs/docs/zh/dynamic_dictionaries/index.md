---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: 动态字典
description: Intlayer 动态字典功能（集合与变体）的概览，用于构建灵活的、由运行时驱动的 i18n 内容。
keywords:
  - 动态字典
  - 集合
  - 变体
  - Intlayer
  - 国际化
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "动态字典功能发布"
  - version: 9.1.0
    date: 2026-06-26
    changes: "将动态记录合并到变体中——`variant` 现在接受字符串或对象"
author: aymericzip
---

# 动态字典

Intlayer 支持两种机制来表达超出每个键单一静态字典的内容。每种机制都通过内容文件中的**顶层元数据字段**声明；无需包装函数。

| 功能                                                                                                      | 元数据字段                              | `useIntlayer` 中的选择器                        |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| [集合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/collections.md) | `item: N`                               | `{ item: N }`                                   |
| [变体](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/variants.md)    | `variant: "name"` _或_ `variant: { … }` | `{ variant: "name" }` _或_ `{ variant: { … } }` |

两者都可与 locale 参数组合，并支持通过 `importMode` 进行选择性 / 惰性加载。

## 何时使用哪一个

- **集合** — 在单独文件中管理的有序项目列表（FAQ 条目、博客文章、产品）。
- **变体** — 具名或结构化的内容替代项：
  - 用于 A/B 测试、季节性横幅或功能开关的**字符串**变体；
  - 用于 CMS 记录、用户特定文案，或由一组字段寻址的任何内容的**对象**变体（即以前的“动态记录”）。

> 早期版本为按记录键控的内容提供单独的 `meta` 字段。它已合并到 `variant` 中：向 `variant` 传递一个**对象**，而不是使用 `meta`。

## 选择器消歧

一个键可以同时声明两个维度（例如每个项目都有变体的集合）。它们按以下顺序解析：

```
variant → item
```

因此，对 variant × item 键使用 `{ variant: "promo" }` 会以数组形式返回所有 promo 项目，而添加 `{ item: 2 }` 则将其缩小到单个条目。
