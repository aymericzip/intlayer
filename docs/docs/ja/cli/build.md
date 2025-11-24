---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 辞書のビルド
description: コンテンツ宣言ファイルからIntlayerの辞書をビルドする方法を学びます。
keywords:
  - ビルド
  - 辞書
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# 辞書のビルド

辞書をビルドするには、以下のコマンドを実行します。

```bash
npx intlayer build
```

またはウォッチモードで

```bash
npx intlayer build --watch
```

このコマンドはデフォルトで `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` にある宣言コンテンツファイルを検出し、`.intlayer` ディレクトリに辞書をビルドします。

## エイリアス:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## 引数:

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer build --base-dir ./src`

- **`--env`**: 環境を指定します（例：`development`、`production`）。intlayerの設定ファイルで環境変数を使用している場合に便利です。

  > 例: `npx intlayer build --env production`

- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。intlayerの設定ファイルで環境変数を使用している場合に便利です。

  > 例: `npx intlayer build --env-file .env.production.local`

- **`--with`**: ビルドと並行してコマンドを開始します。

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer build --base-dir ./src`

- **`--env`**: 環境を指定します（例：`development`、`production`）。intlayerの設定ファイルで環境変数を使用している場合に便利です。

  > 例: `npx intlayer build --env production`

- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。intlayerの設定ファイルで環境変数を使用している場合に便利です。

  > 例: `npx intlayer build --env-file .env.production.local`

- **`--with`**: ビルドと並行してコマンドを開始します。

  > 例: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: prepareステップをスキップします。

  > 例: `npx intlayer build --skip-prepare`

- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer build --no-cache`
