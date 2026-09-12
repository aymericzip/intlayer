---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci` フラグを追加"
  - version: 8.1.5
    date: 2026-02-23
    changes: "checkTypesオプションを追加"
author: aymericzip
---

# 辞書のビルド

辞書をビルドするには、以下のコマンドを実行します。

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

またはウォッチモードで

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

このコマンドはデフォルトで `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` にある宣言コンテンツファイルを検出し、`.intlayer` ディレクトリに辞書をビルドします。

## エイリアス:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## 引数:

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer build --base-dir ./src`

- **`--with`**: ビルドと並行してコマンドを開始します。

  > 例: `npx intlayer build --env production`

- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。intlayerの設定ファイルで環境変数を使用している場合に便利です。

  > 例: `npx intlayer build --env-file .env.production.local`

- **`--with`**: ビルドと並行してコマンドを開始します。

  > 例: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: prepareステップをスキップします。

  > 例: `npx intlayer build --skip-prepare`

- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer build --no-cache`

- **`--ci`**: モノレポ内のすべての Intlayer プロジェクトでコマンドを実行します（プロジェクトディレクトリ内から実行した場合はそのプロジェクトのみ）。プロジェクトごとの資格情報は、プロジェクトパスを `{ "clientId", "clientSecret" }` に対応付ける JSON オブジェクト `INTLAYER_PROJECT_CREDENTIALS` から挿入できます。

  > 例: `npx intlayer build --ci`

- **`--check-types`**: コンテンツ宣言ファイルの型をチェックします。

  > 例: `npx intlayer build --check-types`
