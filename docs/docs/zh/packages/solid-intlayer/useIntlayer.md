---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useIntlayer Hook 文档 | solid-intlayer
description: 查看如何在 solid-intlayer 包中使用 useIntlayer hook
keywords:
  - useIntlayer
  - 字典
  - Intlayer
  - intlayer
  - 国际化
  - 文档
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 为所有导出项统一文档
---

# useIntlayer Hook 文档

`useIntlayer` hook 允许你通过键从字典中检索本地化内容。在 Solid 中，该 hook 返回一个响应式的 **accessor** 函数，会在 locale 变化时自动更新。

## 用法

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## 描述

该 hook 执行以下任务：

1. **Locale Detection**：它使用 `IntlayerProvider` 上下文中的当前 locale。
2. **Dictionary Injection**：它会自动注入与所提供 key 对应的字典内容，使用由 Intlayer 编译器生成的优化声明。
3. **Reactivity**：它返回一个 Solid 的 accessor (`Accessor<T>`)，当全局 locale 状态改变时会自动重新计算。
4. **翻译处理**：它根据检测到的 locale 解析内容，处理字典中任何 `t()`、`enu()` 等定义。

## 参数

- **key**：字典的唯一键（在你的内容声明文件中定义）。
- **locale**（可选）：覆盖当前的 locale。

## 返回值

一个 accessor 函数（`() => Content`），返回本地化后的内容。
