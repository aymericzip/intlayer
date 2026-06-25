---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerMinify Viteプラグインドキュメント | vite-intlayer
description: コンパイルされたIntlayer辞書JSONファイルを圧縮（ミニファイ）し、必要に応じてコンテンツフィールド名を難読化してバンドルサイズを削減するViteプラグイン。
keywords:
  - intlayerMinify
  - vite
  - プラグイン
  - 圧縮
  - バンドルサイズ
  - 辞書
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "ドキュメント初期化"
author: aymericzip
---

# intlayerMinify

`intlayerMinify`は、本番ビルド（production build）時にコンパイルされた辞書JSONファイルを圧縮するViteプラグインです。不要な空白をすべて取り除き、`intlayerPrune`と組み合わせることで、コンテンツフィールド名を短いアルファベットのエイリアス（`a`、`b`、`c`、…）にオプションで変更し、バンドルサイズをさらに削減します。

> [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/intlayer.md)を使用する場合、このプラグインはすでに自動的に含まれ、設定されています。プラグインのスタックをご自身で構成する場合にのみ、手動で登録する必要があります。

## 使用方法

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## 有効化の条件

`intlayerMinify`は、以下の3つの条件がすべて満たされている場合に**のみ**有効になります：

1. Viteコマンドが`build`である（`serve` / devではない）。
2. `build.optimize`が`true`である（または`undefined`であり、ビルド時のデフォルトである`true`になる）。
3. Intlayer設定で`build.minify`が`true`である。

エディタは完全で人間が読める辞書コンテンツを必要とするため、`editor.enabled`が`true`の場合、プラグインは自動的に**無効**になります。

## 圧縮される対象

プラグインは、2つの辞書の場所（`intlayer.system`から解決される場所）をターゲットにします：

- `dictionariesDir` — 静的な全言語共通の辞書（例：`.intlayer/dictionaries/*.json`）
- `dynamicDictionariesDir` — 言語ごとの動的な辞書

> フェッチモード辞書（`fetchDictionariesDir`）は、実行時に元のフィールド名を使用してリモートAPIから提供されるため、**決して**圧縮されません。フィールド名を変更すると、サーバーの応答とクライアント側のプロパティアクセスとの間に不一致が生じるためです。

## フィールド名の難読化（プロパティの圧縮）

`intlayerPrune`がコードベースを分析し、`pruneContext.dictionaryKeyToFieldRenameMap`にデータを入力すると、`intlayerMinify`はコンテンツフィールド名を短いエイリアスに変更します。例えば：

```json
// 変更前
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// 変更後（難読化あり）
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

対応するソースファイルのプロパティアクセスは、`intlayerOptimize`内のBabelパスによって変更されるため、実行時の動作は変わりません。

Intlayerの内部フィールド（`nodeType`、`translation`など）の名前が変更されることはありません。

## エッジケースの辞書

`pruneContext.dictionariesWithEdgeCases`でフラグが立てられた辞書（クリーンアップ（prune）フェーズで検出された構造的な異常）は、破損したデータを配信するのを防ぐために完全にスキップされ、圧縮も難読化もされません。

## 修飾子グループ（コレクション / バリアント / メタレコード）

`qualifierTypes`配列を持つ辞書（コレクション、バリアント、メタレコード）について、プラグインは`qualifierTypes`配列と`meta`サイドマップをそのまま保持します。`content`エントリのフィールド名のみが難読化されます。実行時のセレクターマッチングに使用される複合キーが変更されることはありません。
