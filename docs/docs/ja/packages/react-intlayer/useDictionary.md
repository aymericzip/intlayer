---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary フック - React Intlayer ドキュメント
description: Intlayerを使用したReactアプリケーションでのuseDictionaryフックの使用方法に関する完全ガイド。ビジュアルエディタなしでローカライズされたコンテンツを効率的に扱う方法を解説。
keywords:
  - useDictionary
  - React
  - フック
  - intlayer
  - ローカリゼーション
  - i18n
  - 辞書
  - 翻訳
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴初期化"
author: aymericzip
---

# React統合: `useDictionary` フック ドキュメント

このセクションでは、Reactアプリケーション内で`useDictionary`フックを使用するための詳細なガイドを提供します。ビジュアルエディタなしでローカライズされたコンテンツを効率的に扱うことが可能です。

## Reactでの使用例

以下は、Reactコンポーネントで`useDictionary`フックを使用する例です：

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

## サーバー統合

`IntlayerProvider` の外で `useDictionary` フックを使用する場合、コンポーネントをレンダリングするときにロケールを明示的にパラメータとして渡す必要があります。

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
