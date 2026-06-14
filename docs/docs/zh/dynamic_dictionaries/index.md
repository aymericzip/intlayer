---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: 动态字典
description: Intlayer 的三种动态字典功能 — 集合、变体和动态记录 — 概述，用于构建灵活、运行时驱动的 i18n 内容。
keywords:
  - 动态字典
  - 集合
  - 变体
  - 动态记录
  - Intlayer
  - 国际化
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "发布动态字典功能"
author: aymericzip
---

# 动态字典

Intlayer 支持三种机制来表达超出每个键单个静态字典范围的内容。每种机制都是通过内容文件中的**顶层元数据字段**声明 ponder 的；不需要包装函数。

| 功能                                                                                                              | 元数据字段        | `useIntlayer` 中的选择器 |
| ----------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------ |
| [集合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/collections.md)         | `item: N`         | `{ item: N }`            |
| [变体](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/variants.md)            | `variant: "name"` | `{ variant: "name" }`    |
| [动态记录](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`              |

这三种机制都与语言环境参数结合使用，并支持通过 `importMode` 进行选择性/延迟加载。

## 什么时候使用哪一个

- **集合** — 在单独文件中管理的有序项目列表（常见问题条目、博客文章、产品）。
- **变体** — 用于 A/B 测试、季节性横幅或功能标志（feature flags）的命名内容替代方案。
- **动态记录** — 在运行时通过不透明 ID 获取的内容（CMS 记录、用户特定文案）。

## 选择器消除歧义

当字典中存在多个选择器时，解析顺序为：

```
variant → meta → item
```
