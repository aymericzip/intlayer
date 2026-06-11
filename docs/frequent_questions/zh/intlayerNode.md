---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: IntlayerNode 类型。它是什么？
description: 什么是 IntlayerNode 类型？为什么我的字符串被转换为 IntlayerNode&lt;string&gt;？
keywords:
  - 介绍
  - 开始使用
  - Intlayer
  - 应用程序
  - 软件包
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "初始化文档"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# 什么是 IntlayerNode 类型？

`IntlayerNode<T>` 类型是由 intlayer 的软件包（如 `next-intlayer`、`react-intlayer`、`vue-intlayer`、`preact-intlayer`、`solid-intlayer`、`angular-intlayer`、`svelte-intlayer`、`lit-intlayer` 和 `vanilla-intlayer`）提供的特殊类型。

## 使用示例

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // 返回类型：IntlayerNode&lt;string&gt;
};
```

  </Tab>

// Todo 像 docs/docs/zh/dictionary/markdown.md 一样添加其他框架作为标签
</Tabs>

### 为什么 Intlayer 插入 IntlayerNode？

Intlayer 插入 IntlayerNode 是为了能够在 CMS / 可视化编辑器的上下文中渲染可视化编辑器的选择器（Selectors）。

![可视化编辑器演示](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode 是一个增强的 React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla 节点，但也可以访问基础原始节点的属性。

例如：

```js
const content = useIntlayer("app");

// 字符串的情况
content.title; // 返回 IntlayerNode&lt;string&gt;
content.title.value; // 返回基础内容，这里是一个字符串

content.title.toString(); // 返回字符串
content.title.toLowerCase(); // 返回字符串
String(content.title); // 返回字符串
content.title.toUpperCase(); // 返回大写字符串
content.title.replace("a", "b"); // 返回修改后的字符串
// ...
```

> 访问 IntlayerNode 的属性是可行的，但会破坏在可视化编辑器中显示选择器的能力。

> IntlayerNode 也可以包装数字或其他类型，如 `IntlayerNode<number>`
