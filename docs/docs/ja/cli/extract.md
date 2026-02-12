---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 文字列の抽出
description: コンポーネントの近くに .content ファイルを作成して、コンポーネントから文字列を抽出する方法を学びます。
keywords:
  - 抽出
  - コンポーネント
  - 移行
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# 文字列の抽出

```bash
npx intlayer extract
```

このコマンドはコードファイルを解析し、コンポーネントから文字列を抽出してコンポーネント近くの .content ファイルに保存します。対話式のファイル選択または特定ファイルの指定をサポートします。

## エイリアス:

- `npx intlayer ext`

## 引数:

**ファイル選択オプション:**

- **`-f, --file [files...]`**: 抽出する特定のファイルのリスト。指定しない場合、CLIは一致するファイル（`**/*.{tsx,jsx,vue,svelte,ts,js}`）をスキャンし、抽出するファイルを選択するようプロンプトを表示します。

  > 例: `npx intlayer extract -f src/components/MyComponent.tsx`

**出力オプション:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: 生成されたコンテンツ宣言ファイルを保存するディレクトリ。

  > 例: `npx intlayer extract -o src/content`

- **`--code-only`**: コンポーネントのコードのみを抽出する（コンテンツ宣言は書き込まない）。

  > 例: `npx intlayer extract --code-only`

- **`--declaration-only`**: コンテンツ宣言のみを生成する（コンポーネントの書き換えは行わない）。

  > 例: `npx intlayer extract --declaration-only`

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--env`**: 環境を指定します。
- **`--env-file`**: カスタムの環境ファイルを指定します。
- **`--verbose`**: 詳細なログ出力を有効にします。

**必須プラグイン:**

extract コマンドは TypeScript / JSX ファイルでは追加のプラグインなしで動作します。ただし、Vue および Svelte プロジェクトでは以下のプラグインのインストールが必要です:

- **`@intlayer/vue-transformer`**: Vue ファイル用。
- **`@intlayer/svelte-transformer`**: Svelte ファイル用。
