---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 辞書のプッシュ
description: 辞書をIntlayerエディターとCMSにプッシュする方法を学びます。
keywords:
  - プッシュ
  - 辞書
  - CLI
  - Intlayer
  - エディター
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# 辞書のプッシュ

```bash
npx intlayer dictionary push
```

[intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)がインストールされている場合、辞書をエディターにプッシュすることもできます。このコマンドにより、辞書を[エディター](https://app.intlayer.org/)で利用可能にします。これにより、チームと辞書を共有し、アプリケーションのコードを編集せずにコンテンツを編集できます。

## エイリアス:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## 引数:

**辞書オプション:**

- **`-d`, `--dictionaries`**: プルする辞書のID。指定しない場合はすべての辞書がプッシュされます。

  > 例: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: プルする辞書のID（--dictionariesのエイリアス）。

  > 例: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer build --no-cache`

**環境変数オプション:**

- **`--env`**: 環境を指定します（例: `development`、`production`）。intlayerの設定ファイルで環境変数を使用している場合に便利です。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。intlayerの設定ファイルで環境変数を使用している場合に便利です。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`

  > 例: `npx intlayer dictionary push --env production`

**出力オプション:**

- **`-r`, `--delete-locale-dictionary`**: 辞書がプッシュされた後にロケールディレクトリを削除するかどうかの質問をスキップし、ディレクトリを削除します。デフォルトでは、辞書がローカルに定義されている場合、遠隔の辞書内容を上書きします。

  > 例: `npx intlayer dictionary push -r`

  > 例: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: 辞書がプッシュされた後にロケールディレクトリを削除するかどうかの質問をスキップし、ディレクトリを保持します。デフォルトでは、辞書がローカルに定義されている場合、遠隔の辞書内容を上書きします。

  > 例: `npx intlayer dictionary push -k`

  > 例: `npx intlayer dictionary push --keep-locale-dictionary`

**準備オプション:**

- **`--build`**: プッシュする前に辞書をビルドして、内容が最新であることを確認します。true はビルドを強制し、false はビルドをスキップし、undefined はビルドのキャッシュを使用することを許可します。

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。（CLIではデフォルトでtrue）

**Gitオプション:**

- **`--git-diff`**: ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）への変更を含む辞書のみで実行します。
- **`--git-diff-base`**: git diff のベース参照を指定します（デフォルトは `origin/main`）。
- **`--git-diff-current`**: git diff の現在の参照を指定します（デフォルトは `HEAD`）。
- **`--uncommitted`**: コミットされていない変更を含めます。
- **`--unpushed`**: プッシュされていない変更を含めます。
- **`--untracked`**: トラッキングされていないファイルを含めます。

- **`--build`**: プッシュ前に辞書をビルドして、内容が最新であることを保証します。`true` はビルドを強制し、`false` はビルドをスキップし、`undefined` はビルドのキャッシュを使用することを許可します。

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログ出力を有効にします。（CLIではデフォルトでtrue）

**Gitオプション:**

- **`--git-diff`**: ベース（デフォルトは `origin/main`）から現在のブランチ（デフォルトは `HEAD`）への変更を含む辞書のみを対象に実行します。
- **`--git-diff-base`**: git diffのベース参照を指定します（デフォルトは `origin/main`）。
- **`--git-diff-current`**: git diffの現在の参照を指定します（デフォルトは `HEAD`）。
- **`--uncommitted`**: コミットされていない変更を含めます。
- **`--unpushed`**: プッシュされていない変更を含めます。
- **`--untracked`**: トラッキングされていないファイルを含めます。

  > 例: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > 例: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
