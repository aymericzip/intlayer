---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 設定の管理
description: Intlayerの設定をCMSに取得およびプッシュする方法を学びます。
keywords:
  - 設定
  - コンフィグ
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# 設定の管理

## 設定の取得

`configuration get` コマンドは、Intlayerの現在の設定、特にロケール設定を取得します。これはセットアップの確認に役立ちます。

```bash
npx intlayer configuration get
```

## エイリアス:

- `npx intlayer config get`
- `npx intlayer conf get`

## 引数:

- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: デバッグのために詳細なログ出力を有効にします。（CLIではデフォルトでtrue）
- **`--no-cache`**: キャッシュを無効にします。

## 設定のプッシュ

`configuration push` コマンドは、設定をIntlayer CMSおよびエディターにアップロードします。このステップは、Intlayer Visual Editorで遠隔辞書を使用可能にするために必要です。

```bash
npx intlayer configuration push
```

## エイリアス:

- `npx intlayer config push`
- `npx intlayer conf push`

## 引数:

- **`--env`**: 環境を指定します（例：`development`、`production`）。
- **`--env-file`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。
- **`--verbose`**: デバッグのために詳細なログ出力を有効にします。（CLIではデフォルトでtrue）
- **`--no-cache`**: キャッシュを無効にします。

設定をプッシュすることで、プロジェクトはIntlayer CMSと完全に統合され、チーム間での辞書管理がシームレスに行えるようになります。
