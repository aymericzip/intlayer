---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite プラグイン ドキュメント | vite-intlayer
description: vite-intlayer パッケージの intlayer プラグインの使い方を確認します
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: ドキュメントの初期作成
---

# intlayer Vite プラグイン ドキュメント

`intlayer` の Vite プラグインは、Intlayer の設定をビルドプロセスに統合します。辞書のエイリアスを管理し、開発モードでは辞書ウォッチャーを起動し、ビルドのために辞書を準備します。

## 使用方法

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## 説明

このプラグインは次の処理を行います:

1. **辞書の準備**: ビルドまたは開発プロセスの開始時に、辞書を最適化されたファイルにコンパイルします。
2. **ウォッチモード**: 開発モードでは、辞書ファイルの変更を監視し、自動的に再コンパイルします。
3. **エイリアス**: アプリケーション内で辞書にアクセスするためのエイリアスを提供します。
4. **ツリーシェイキング**: `intlayerPrune` プラグインを通じて未使用の翻訳のツリーシェイキングをサポートします。
