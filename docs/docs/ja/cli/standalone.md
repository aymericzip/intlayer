---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: スタンドアロンバンドル
description: アプリケーションコンテンツのスタンドアロンJavaScriptバンドルを作成する方法。
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "スタンドアロンコマンドのドキュメントの初期化"
---

# スタンドアロンバンドル

`standalone` コマンドを使用すると、Intlayerと指定した他のパッケージを含む、スタンドアロンのJavaScriptバンドルを作成できます。これは、パッケージマネージャーやバンドラーがない環境（シンプルなHTML/JSアプリケーションなど）でIntlayerを使用する場合に特に便利です。

バンドルは [esbuild](https://esbuild.github.io/) を使用して、リクエストされたパッケージとその依存関係を1つのファイルにまとめ、Webプロジェクトで簡単にインポートできるようにします。

## 使用法

```bash
npx intlayer standalone --packages [パッケージ名...] [オプション]
```

## オプション

- `-o, --outfile [outfile]` - 任意。出力ファイル名。デフォルトは `intlayer-bundle.js`。
- `--packages [パッケージ名...]` - 必須。バンドルに含めるパッケージのリスト（例：`intlayer`, `vanilla-intlayer`）。
- `--version [version]` - 任意。バンドルするパッケージのバージョン。指定しない場合、デフォルトでIntlayer CLIのバージョンが使用されます。
- `--minify` - 任意。出力を最小化するかどうか。デフォルトは `true`。
- `--platform [platform]` - 任意。バンドルのターゲットプラットフォーム（例：`browser`, `node`）。デフォルトは `browser`。
- `--format [format]` - 任意。バンドルの出力フォーマット（例：`esm`, `cjs`, `iife`）。デフォルトは `esm`。

## 共通オプション

- `--env-file [envFile]` - 環境ファイル。
- `-e, --env [env]` - 環境。
- `--base-dir [baseDir]` - ベースディレクトリ。
- `--no-cache` - キャッシュを無効化。
- `--verbose` - 詳細な出力。

## 例：

### Vanilla JS 用のバンドルを作成する：

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

これにより、`intlayer` パッケージと `vanilla-intlayer` パッケージの両方を含む、最小化されたESM形式の `intlayer.js` ファイルが作成され、`<script>` タグを介してブラウザで使用できるようになります。

### 特定のバージョンをバンドルする：

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### 別の形式でバンドルする：

```bash
npx intlayer standalone --packages intlayer --format iife
```

## 動作の仕組み：

1. **一時的な環境の作成** - 依存関係を管理するための一時ディレクトリをセットアップします。
2. **パッケージのインストール** - `npm` または `bun`（利用可能な場合）を使用して、リクエストされたパッケージとその依存関係をインストールします。
3. **エントリポイントの生成** - リクエストされたすべてのパッケージをエクスポートし、ブラウザで実行される際にグローバル変数として公開する一時的なエントリポイントファイルを作成します。
4. **esbuild によるバンドル** - esbuildを使用してすべてを1つのファイルにまとめ、必要に応じて最小化とフォーマットを適用します。
5. **ファイルの生成** - 指定された出力パスに生成されたバンドルを書き込みます。

## グローバル変数

バンドルがブラウザに読み込まれると、リクエストされたパッケージが `window` オブジェクト上のグローバル変数として公開されます。変数名はパッケージ名に基づいています（例：`intlayer` は `Intlayer`、`vanilla-intlayer` は `VanillaIntlayer`）。

```javascript
// バンドルからIntlayerにアクセス
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
