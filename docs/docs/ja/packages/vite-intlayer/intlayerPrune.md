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
    changes: "Init doc"
author: aymericzip
---

# intlayerPrune Vite プラグイン ドキュメント

`intlayerPrune` Vite プラグインは、アプリケーションのバンドルから未使用の辞書をツリーシェイクおよびプルーニングするために使用します。これにより、必要な多言語コンテンツのみを含めることで、最終的なバンドルサイズを削減できます。

## 使用法

### `intlayer()` の一部として（推奨）

Intlayer の設定を通じてプルーニングを有効にすると、メインプラグインがすべてを処理します：

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // プルーニングと縮小化の両方を有効にします
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### スタンドアロン

プラグインスタックを手動で構成している場合、`intlayerPrune` と `intlayerMinify` は `PruneContext` オブジェクトを共有します。このオブジェクトは一度作成して、両方に渡す必要があります：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // オプション、同じコンテキストから読み取ります
  ],
});
```

## どのように機能するか

### 1. 使用状況分析（buildStart）

`buildStart` 中に、`intlayerOptimize` プラグイン（`intlayer()` の一部でもあります）は `build.filesList` にリストされているすべてのコンポーネントソースファイルをスキャンします。`useIntlayer('key')` または `getIntlayer('key')` の各呼び出しについて、どのフィールドがアクセスされているかを正確に記録します。例えば：

```ts
const { title, description } = useIntlayer("myDict");
// 記録: myDict → { title, description }
```

これにより、`transform` 呼び出しが実行される前に `pruneContext.fieldUsageMap` が構築されます。

### 2. JSON pruning (transform, enforce: 'pre')

Viteがコンパイル済みの辞書JSONファイルを処理する場合、`intlayerPrune`はViteの組み込みJSON → ESM変換の前に処理を行います。`pruneContext`からfield-usageマップを読み取り、記録された使用セットに含まれていないすべてのcontentフィールドを削除します。

2つのコンテンツ形状がサポートされています：

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`。フィールドは`translation`内のロケールごとに削除されます。
- **Dynamic (per-locale) dictionaries** — `{ fieldA: ..., fieldB: ... }`のようなflat構造。フィールドはトップレベルで削除されます。

### 3. エッジケース

辞書のコンテンツ構造が認識できない場合（例：異常にネストされた形状）、`pruneContext.dictionariesWithEdgeCases` に追加され、**そのままにされます**。警告がログに出力されます。`intlayerMinify` もこれらの辞書をスキップします。

### 4. Field-rename map

Pruning が成功すると、`intlayerPrune` は `pruneContext.dictionaryKeyToFieldRenameMap` も書き込みます。これは元のフィールド名から短いエイリアスへのマッピングです。`intlayerMinify` はこのマップを読み込んで出力 JSON 内のフィールドの名前を変更し、`intlayerOptimize` の Babel rename pass はソースファイル内のプロパティアクセスをそれに応じて更新します。

## アクティベーション条件

`intlayerPrune` は以下のすべてが当てはまる場合**のみ**アクティブになります:

1. Vite コマンドが `build` である。
2. `build.optimize` が `true` である (または `undefined` で、ビルドではデフォルトで `true`)。
3. Intlayer の設定で `build.purge` が `true` である。

`editor.enabled` が `true` の場合、エディターが完全な辞書コンテンツを必要とするため、自動的に**無効化**されます。
