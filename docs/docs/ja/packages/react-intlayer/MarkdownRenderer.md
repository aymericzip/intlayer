---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: MarkdownRenderer コンポーネントのドキュメント | react-intlayer
description: react-intlayer パッケージの MarkdownRenderer コンポーネントの使用方法を参照してください
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: 初期ドキュメント
---

# MarkdownRenderer コンポーネントのドキュメント

`MarkdownRenderer` コンポーネントは、カスタムコンポーネントを使用してマークダウンコンテンツをレンダリングします。

## 使用方法

```tsx
import { MarkdownRenderer } from "react-intlayer";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## Props（プロパティ）

| プロパティ   | 型                | 説明                                                                   |
| ------------ | ----------------- | ---------------------------------------------------------------------- |
| `children`   | `string`          | レンダリングするマークダウンコンテンツ。                               |
| `components` | `Overrides`       | 特定のマークダウン要素に対して使用するカスタムコンポーネントのマップ。 |
| `options`    | `MarkdownOptions` | マークダウンレンダラーの追加オプション。                               |
