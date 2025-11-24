---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: エディターコマンド
description: Intlayerのエディターコマンドの使い方を学びます。
keywords:
  - エディター
  - ビジュアルエディター
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - editor
---

# エディターコマンド

`editor` コマンドは `intlayer-editor` コマンドをラップし直します。

> `editor` コマンドを使用するには、`intlayer-editor` パッケージがインストールされている必要があります。（詳細は [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) を参照）

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
