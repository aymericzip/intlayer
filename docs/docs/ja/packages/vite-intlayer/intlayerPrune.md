---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite プラグイン ドキュメント | vite-intlayer
description: vite-intlayer パッケージの intlayerPrune プラグインの使い方
keywords:
  - intlayerPrune
  - vite
  - プラグイン
  - ツリーシェイキング
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayerPrune Vite プラグイン ドキュメント

`intlayerPrune` Vite プラグインは、アプリケーションのバンドルから未使用の辞書をツリーシェイクおよびプルーニングするために使用します。これにより、必要な多言語コンテンツのみを含めることで、最終的なバンドルサイズを削減できます。

## 使用方法

```ts
// vite.config.ts (Vite 設定ファイル)
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## 説明

このプラグインはソースコードを解析して、実際に使用されている辞書キーを特定します。続いて、バンドルされた辞書ファイルから未使用のコンテンツを削除します。特定のページやコンポーネントで辞書の一部しか使われないような、辞書が多数存在する大規模なプロジェクトで特に有用です。
