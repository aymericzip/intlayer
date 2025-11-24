---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: コンポーネントの変換
description: 既存のコンポーネントをIntlayerで使用するように変換する方法を学びます。
keywords:
  - 変換
  - コンポーネント
  - マイグレーション
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# コンポーネントの変換

```bash
npx intlayer transform
```

このコマンドはコードファイルを解析し、既存のコンポーネントをIntlayerで使用するように移行するのを支援します。対話的なファイル選択や特定ファイルの指定に対応しています。

## エイリアス:

- `npx intlayer trans`

## 引数:

**ファイル選択オプション:**

- **`-f, --file [files...]`**: 変換する特定のファイルのリスト。指定しない場合、CLIは一致するファイル（`**/*.{tsx,jsx,vue,svelte,ts,js}`）をスキャンし、どのファイルを変換するか選択を促します。

  > 例: `npx intlayer transform -f src/components/MyComponent.tsx`

**出力オプション:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: 生成されたコンテンツ宣言ファイルを保存するディレクトリ。

  > 例: `npx intlayer transform -o src/content`

- **`--code-only`**: コンポーネントのコードのみを変換し、コンテンツ宣言は書き込みません。

  > 例: `npx intlayer transform --code-only`

- **`--declaration-only`**: コンテンツ宣言のみを生成し、コンポーネントの書き換えは行いません。

  > 例: `npx intlayer transform --declaration-only`

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--env`**: 環境を指定します。
- **`--env-file`**: カスタム環境ファイルを指定します。
- **`--verbose`**: 詳細なログ出力を有効にします。

**必要なプラグイン:**

transform コマンドは TypeScript / JSX ファイルでは追加プラグインなしで動作します。ただし、Vue および Svelte プロジェクトでは以下のプラグインのインストールが必要です:

- **`@intlayer/vue-transformer`**: Vue ファイル用。
- **`@intlayer/svelte-transformer`**: Svelte ファイル用。
