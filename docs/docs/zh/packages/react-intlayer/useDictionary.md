---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 5
title: useDictionary Hook - React Intlayer 文档
description: "在 React 中使用 useDictionary 解析你自己声明的字典对象，解析其中的翻译、枚举等内容。"
keywords:
  - useDictionary
  - React
  - Hook
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

# React 集成：`useDictionary` Hook文档

本节提供了在 React 应用中使用 `useDictionary` Hook的详细指导，使得无需视觉编辑器即可高效处理本地化内容。

## React 中的示例用法

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

如果您在 `IntlayerProvider` 之外使用 `useDictionary` Hook，则在渲染组件时必须显式提供 locale 作为参数：

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
