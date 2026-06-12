---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: IntlayerNode 型。これは何ですか？
description: IntlayerNode 型とは何ですか？なぜ私の文字列が IntlayerNode&lt;string&gt; に変換されるのですか？
keywords:
  - 導入
  - はじめる
  - Intlayer
  - アプリケーション
  - パッケージ
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "ドキュメントの初期化"
author: aymericzip
---

# IntlayerNode 型とは何ですか？

`IntlayerNode<T>` 型は、`next-intlayer`、`react-intlayer`、`vue-intlayer`、`preact-intlayer`、`solid-intlayer`、`angular-intlayer`、`svelte-intlayer`、`lit-intlayer`、`vanilla-intlayer` などの intlayer パッケージによって提供される特別な型です。

## 使用例

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

  return title; // 型: IntlayerNode&lt;string&gt; を返します
};
```

  </Tab>

// Todo docs/docs/ja/dictionary/markdown.md のように他のフレームワークをタブとして追加する
</Tabs>

### なぜ Intlayer は IntlayerNode を挿入するのですか？

Intlayer は、CMS / ビジュアルエディタのコンテキストでビジュアルエディタのセレクタをレンダリングできるようにするために、IntlayerNode を挿入します。

![ビジュアルエディタのデモ](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

IntlayerNode は、拡張された React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla ノードですが、ベースとなるプリミティブノードのプロパティにアクセスすることも可能です。

例えば：

```js
const content = useIntlayer("app");

// 文字列の場合
content.title; // IntlayerNode&lt;string&gt; を返す
content.title.value; // ベースとなるコンテンツ（ここでは文字列）を返す

content.title.toString(); // 文字列を返す
content.title.toLowerCase(); // 文字列を返す
String(content.title); // 文字列を返す
content.title.toUpperCase(); // 大文字に変換された文字列を返す
content.title.replace("a", "b"); // 変更された文字列を返す
// ...
```

> IntlayerNode のプロパティへのアクセスは機能しますが、ビジュアルエディタでセレクタを表示する機能が損なわれます。

> IntlayerNode は、数値や `IntlayerNode<number>` などの他の型をラップすることもできます。
