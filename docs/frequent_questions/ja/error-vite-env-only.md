---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` & Intlayer – 偽陽性の `node:fs` インポート拒否エラー
description: Intlayer + React-Router + Vite 環境で vite-env-only が `node:fs` のインポートを拒否すると報告する理由と、その対処法。
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - インポート拒否
  - エイリアス
  - クライアントバンドル
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# Intlayer 環境で `vite-env-only` が `node:fs` を拒否する

古い React-Router v7 の提案で言及されているような **vite-env-only** プラグインを使用していて、以下のようなエラーが表示される場合:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…クライアントバンドルに**`node:fs` は含まれていない**にもかかわらず、これは**false positive（誤検出）**です。

## 原因

`vite-env-only` は Vite のグラフ解決で **早い段階** に Babel ベースのチェックを実行し、以下の処理の _前_ に行われます:

- エイリアス解決（Intlayer の browser と node のマッピングを含む）、
- デッドコード削除、
- SSR とクライアントの解決、
- React-Router のような仮想モジュール。

Intlayer のパッケージには Node とブラウザの両方で動作するコードが含まれています。中間段階では、`node:fs` のような Node 組み込みが、Vite がクライアントビルドから取り除く**前に**グラフに現れることがあります。`vite-env-only` はそれを検出して即座にエラーにしますが、最終的なバンドルには含まれていません。

## React-Router とサーバーモジュール

React-Router のドキュメントにある **server module conventions（サーバーモジュールの慣例）**
(https://reactrouter.com/api/framework-conventions/server-modules)、チームはクライアントバンドルにサーバー専用のインポートが漏れ出すのを防ぐために、**明示的に `vite-env-only` の使用を推奨しています\*\*。

しかし、これらの規約はサーバー専用コードを除去するために Vite のエイリアス、条件付きエクスポート、そしてツリーシェイキングに依存しています。エイリアスと条件付きエクスポートは既に適用されているものの、`@intlayer/core` のようなパッケージにはその段階でまだ一部の Node ベースのユーティリティが存在します（クライアントでは実際にはインポートされません）。ツリーシェイキングがまだ実行されていないため、それらの関数は Babel によって解析され続け、`vite-env-only` がそれらの `node:` インポートを検出して誤検出（false positive）を引き起こします — 最終的なクライアントバンドルからは正しく削除されているにもかかわらず。

## 修正方法 / 回避策

### 推奨: `vite-env-only` を削除する

単純にそのプラグインを削除してください。多くの場合不要です — Vite は独自の解決でクライアントとサーバーのインポートを既に処理します。

これにより Intlayer を変更することなく `node:fs` による誤検出が解消します。

### 代わりに最終ビルドを検証する

それでもクライアントに Node の組み込みがないことを確認したい場合は、**ビルド後に**行ってください。例:

```bash
pnpm build
grep -R "node:" dist/
```

結果が何も返らなければ、クライアントバンドルはクリーンです。

## まとめ

- `vite-env-only` はチェックが早すぎるため `node:fs` でエラーになることがある。
- Vite + Intlayer + React-Router の server modules の慣習は通常、サーバー専用の参照を正しく除去する。
- プラグインを削除するか、_最終出力_ を検証することが通常は最良の解決策です。
