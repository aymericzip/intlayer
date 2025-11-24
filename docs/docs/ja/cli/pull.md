---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 辞書のプル
description: IntlayerエディターとCMSから辞書をプルする方法を学びます。
keywords:
  - プル
  - 辞書
  - CLI
  - Intlayer
  - エディター
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# 遠隔辞書のプル

```bash
npx intlayer pull
```

[Intlayerエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)がインストールされている場合、エディターからも辞書をプルできます。この方法で、アプリケーションのニーズに合わせて辞書の内容を上書きすることが可能です。

## エイリアス:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## 引数:

**辞書オプション:**

- **`-d, --dictionaries`**: プルする辞書のID。指定しない場合は、すべての辞書がプルされます。

  > 例: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: プルする辞書のID（--dictionariesのエイリアス）。

  > 例: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer build --no-cache`

**環境変数オプション:**

- **`--env`**: 環境を指定します（例: `development`、`production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`

  > 例: `npx intlayer dictionary push --env production`

**出力オプション:**

- **`--new-dictionaries-path`** : 新しい辞書が保存されるディレクトリへのパス。指定しない場合、新しい辞書はプロジェクトの `./intlayer-dictionaries` ディレクトリに保存されます。辞書の内容に `filePath` フィールドが指定されている場合、この引数は無視され、指定された `filePath` ディレクトリに保存されます。

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。（CLIではデフォルトでtrue）

## 例:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
