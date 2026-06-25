---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "@intlayer/babel パッケージドキュメント"
description: コンテンツ抽出、インポートの最適化、未使用フィールドのクリーンアップ、ビルド中のフィールド名の難読化を処理するIntlayer用のBabelプラグイン。
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - 国際化
  - i18n
  - コンパイラ
  - 最適化
  - クリーンアップ
  - ミニファイ
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "すべてのエクスポートのドキュメントを統一"
author: aymericzip
---

# @intlayer/babel パッケージ

`@intlayer/babel` パッケージは、Intlayer向けに特化した一連のBabelプラグインを提供します。これらのプラグインは、コンテンツ宣言の抽出、`useIntlayer` / `getIntlayer`呼び出しの最適化された辞書インポートへの書き換え、未使用フィールドのクリーンアップ、フィールド名の圧縮など、ビルドサイクル全体をカバーします。

## インストール

```bash
npm install @intlayer/babel
```

## エクスポート

インポート方法:

```ts
import { ... } from "@intlayer/babel";
```

---

### プラグイン

| 関数 / クラス                  | 説明                                                                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`   | ソースファイルから翻訳可能なコンテンツを抽出し、`useIntlayer` / `getIntlayer`フックを自動的に注入するBabelプラグイン。Next.jsおよびBabelベースのビルドツールでの使用向けに設計されています。                 |
| `intlayerOptimizeBabelPlugin`  | `useIntlayer`および`getIntlayer`呼び出しを変換し、そのインポートを最適化されたJSON辞書インポート（静的、動的、またはフェッチ経由）に書き換えるBabelプラグイン。                                              |
| `intlayerPurgeBabelPlugin`     | ソースファイルを分析し、コンパイルされた辞書JSONファイルを書き換えて、未使用のフィールドを削除する（`build.purge`）か、短いアルファベットのエイリアスに名前を変更する（`build.minify`）Babelプラグイン。     |
| `intlayerMinifyBabelPlugin`    | ミニファイ（圧縮）フェーズ中に割り当てられた短いフィールドエイリアス（例：`content.title` ← `content.a`）を使用するようにソースファイルを書き換えるBabelプラグイン。`intlayerPurgeBabelPlugin`に依存します。 |
| `makeFieldRenameBabelPlugin`   | `PruneContext`に入力された`dictionaryKeyToFieldRenameMap`に従って、ソースファイル内の辞書コンテンツフィールドアクセス名を変更するBabelプラグインを生成するファクトリ関数。                                   |
| `makeUsageAnalyzerBabelPlugin` | ソースコード内での`useIntlayer` / `getIntlayer`の使用状況を分析し、共有`PruneContext`内にフィールドの使用状況データを集計するBabelプラグインを生成するファクトリ関数。                                       |
| `getSharedPruneContext`        | 指定されたベースディレクトリに対する共有`PruneContext`オブジェクトを返すヘルパー関数。まだ初期化されていない場合は`null`を返します。                                                                         |

---

### プラグイン設定ユーティリティ

| 関数                       | 説明                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `getExtractPluginOptions`  | Intlayer設定を読み込み、`intlayerExtractBabelPlugin`で使用できる状態の`ExtractPluginOptions`を返します。                       |
| `getOptimizePluginOptions` | Intlayer設定とコンパイル済み辞書を読み込み、`intlayerOptimizeBabelPlugin`で使用できる状態の`OptimizePluginOptions`を返します。 |
| `getPurgePluginOptions`    | Intlayer設定を読み込み、`intlayerPurgeBabelPlugin`で使用できる状態の`PurgePluginOptions`を返します。                           |
| `getMinifyPluginOptions`   | Intlayer設定を読み込み、`intlayerMinifyBabelPlugin`で使用できる状態の`MinifyPluginOptions`を返します。                         |

---

### 型

| 型                      | 説明                                                                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | コンパイラモード：`'dev'` HMRサポート付き開発用、または`'build'`本番ビルド用。                                                     |
| `ExtractPluginOptions`  | `intlayerExtractBabelPlugin`のオプション：ファイルリスト、設定、`onExtract`コールバックなど。                                      |
| `ExtractResult`         | 抽出結果：辞書キー、ファイルパス、コンテンツ、およびロケール。                                                                     |
| `OptimizePluginOptions` | `intlayerOptimizeBabelPlugin`のオプション：辞書パス、インポートモード、辞書ごとのモードマップなど。                                |
| `PurgePluginOptions`    | `intlayerPurgeBabelPlugin`のオプション：ベースディレクトリ、クリーンアップ/ミニファイ/最適化フラグ、コンポーネントファイルリスト。 |
| `MinifyPluginOptions`   | `intlayerMinifyBabelPlugin`のオプション：ベースディレクトリ、ミニファイ/最適化/editorEnabledフラグ。                               |
| `PruneContext`          | 分析プラグインとクリーンアッププラグインの間で共有される状態：フィールド使用マップ、名前変更マップなど。                           |
| `DictionaryFieldUsage`  | 単一の辞書に対するフィールド使用結果：静的分析で確定できない場合は`Set<string>`または`'all'`。                                     |
| `NestedRenameEntry`     | 名前変更ツリー内のノード：`shortName`と子ノードのマップ。                                                                          |
| `NestedRenameMap`       | 名前変更ツリー内の1つのレベル：`Map<string, NestedRenameEntry>`。                                                                  |
| `CompatCallerConfig`    | 互換アダプタ（compat-adapter）パッケージ用の互換使用アナライザ設定（呼び出し元名と処理オプション）。                               |
| `ScriptBlock`           | SFCファイル（VueまたはSvelte）から抽出されたスクリプトブロック：コンテンツ、開始オフセット、および終了オフセット。                 |

---

### ユーティリティ関数

| 関数                              | 説明                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | 整数（ゼロから開始）を短いアルファベットの識別子に変換します：`0` → `'a'`、`25` → `'z'`、`26` → `'aa'`など。                                |
| `buildNestedRenameMapFromContent` | コンパイルされた辞書のコンテンツ値から、Intlayerノード構造（translation、enumerationなど）を考慮して`NestedRenameMap`を再帰的に構築します。 |
| `createPruneContext`              | デフォルト値で初期化された新しい空の`PruneContext`オブジェクトを作成します。                                                                |
| `extractScriptBlocks`             | 後続のBabel分析のために、SFCファイル（Vue / Svelte）から`<script>`ブロックを抽出します。                                                    |
| `BABEL_PARSER_OPTIONS`            | サポートされているフレームワーク（React/Vue/Svelte/Angular/...）をカバーするBabelパーサーオプションを表す定数。                             |
| `INTLAYER_CALLER_NAMES`           | オリジナルのIntlayer呼び出し元名の定数リスト：`['useIntlayer', 'getIntlayer']`。                                                            |

---

## 使用例

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **注意：** `intlayerPurgeBabelPlugin`は、後者が前者の構築した名前変更マップを読み取るため、`intlayerMinifyBabelPlugin`よりも**前**に宣言する必要があります。また、`useIntlayer`呼び出しが書き換えられる前に辞書キーを検知できるようにするため、両方の前に`intlayerOptimizeBabelPlugin`を配置する必要があります。
