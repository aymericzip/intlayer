---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: MarkdownRenderer 组件文档 | react-intlayer
description: 查看如何使用 react-intlayer 包的 MarkdownRenderer 组件
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: 初始化文档
---

# MarkdownRenderer 组件文档

`MarkdownRenderer` 组件使用自定义组件渲染 Markdown 内容。

## 使用方法

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## 属性（Props）

| Prop         | Type              | 描述                                           |
| ------------ | ----------------- | ---------------------------------------------- |
| `children`   | `string`          | 要渲染的 Markdown 内容。                       |
| `components` | `Overrides`       | 用于为特定 Markdown 元素指定自定义组件的映射。 |
| `options`    | `MarkdownOptions` | Markdown 渲染器的附加选项。                    |
