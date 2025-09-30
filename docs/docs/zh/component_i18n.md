---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: 在 React 和 Next.js 中制作多语言（i18n）组件
description: 学习如何声明和获取本地化内容，以使用 Intlayer 构建多语言 React 或 Next.js 组件。
keywords:
  - i18n
  - 组件
  - react
  - 多语言
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# 如何使用 Intlayer 制作多语言（i18n）组件

本指南展示了在两种常见环境中制作多语言 UI 组件的最简步骤：

- React（Vite/单页应用）
- Next.js（应用路由）

您将首先声明内容，然后在组件中获取内容。

## 1) 声明您的内容（适用于 React 和 Next.js）

在组件附近创建一个内容声明文件。这可以让翻译内容靠近使用位置，并且支持类型安全。

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

如果您更喜欢配置文件，也支持 JSON 格式。

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "一个多语言的 React 组件",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) 获取您的内容

### 情况 A — React 应用 (Vite/SPA)

默认方法：使用 `useIntlayer` 通过键来获取内容。这使组件保持简洁且类型安全。

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

服务器端渲染或在提供者外部使用时：使用 `react-intlayer/server`，并在需要时传入明确的 `locale`。

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

另一种方式：如果你更喜欢在调用处组织结构，可以使用 `useDictionary` 读取整个声明的对象。

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### 方案 B — Next.js（App 路由）

优先使用服务器组件以确保数据安全和性能。在服务器文件中使用来自 `next-intlayer/server` 的 `useIntlayer`，在客户端组件中使用来自 `next-intlayer` 的 `useIntlayer`。

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

提示：对于页面元数据和 SEO，您还可以使用 `getIntlayer` 获取内容，并通过 `getMultilingualUrls` 生成多语言 URL。

## 为什么 Intlayer 的组件方法是最佳选择

- **内容共置**：内容声明与组件紧密相邻，减少偏差并提升设计系统中的复用性。
- **类型安全**：键和值结构均为强类型；缺失的翻译会在构建时而非运行时暴露。
- **服务器优先**：原生支持服务器组件，提升安全性和性能；客户端钩子依然保持良好的使用体验。
- **摇树优化**：仅打包组件实际使用的内容，保持大型应用的负载体积小。
- **开发体验与工具**：内置中间件、SEO助手，以及可选的可视化编辑器/AI翻译，简化日常工作流程。

请参阅针对 Next.js 的对比和模式总结：https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## 相关指南和参考资料

- React 设置（Vite）：https://intlayer.org/doc/environment/vite-and-react
- React Router v7：https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack 入门：https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Next.js 设置：https://intlayer.org/doc/environment/nextjs
- 为什么选择 Intlayer 而不是 next-intl 或 next-i18next：https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

这些页面包含端到端的设置、提供者、路由和 SEO 辅助工具。
