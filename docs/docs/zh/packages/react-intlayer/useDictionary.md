---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary Hook - React Intlayer 文档
description: 使用 Intlayer 在 React 应用中高效处理本地化内容的 useDictionary 钩子完整指南，无需视觉编辑器。
keywords:
  - useDictionary
  - React
  - 钩子
  - intlayer
  - 本地化
  - i18n
  - 字典
  - 翻译
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史"
author: aymericzip
---

# React 集成：`useDictionary` 钩子文档

本节提供了在 React 应用中使用 `useDictionary` 钩子的详细指导，使得无需视觉编辑器即可高效处理本地化内容。

## React 中的示例用法

以下是如何在 React 组件中使用 `useDictionary` 钩子的示例：

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## 服务器集成

如果您在 `IntlayerProvider` 之外使用 `useDictionary` 钩子，则在渲染组件时必须显式提供 locale 作为参数：

```tsx fileName="./ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```
