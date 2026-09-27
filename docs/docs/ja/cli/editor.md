---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer editor：ビジュアルエディターのコマンド"
description: "CLI から Intlayer ビジュアルエディターを起動・設定し、実行中のアプリケーション上でコンテンツをその場で編集します。"
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
author: aymericzip
---

# エディターコマンド

`editor` コマンドは `intlayer-editor` コマンドをラップし直します。

> `editor` コマンドを使用するには、`intlayer-editor` パッケージがインストールされている必要があります。（詳細は [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) を参照）

```json fileName="package.json"
"scripts": {
  "intlayer:editor:start": "npx intlayer editor start --with 'next dev --turbopack'"
}
```
