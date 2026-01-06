---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Intlayer プロジェクトを一覧表示
description: ディレクトリまたは git リポジトリ内のすべての Intlayer プロジェクトを一覧表示する方法を学びます。
keywords:
  - 一覧
  - プロジェクト
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Intlayer プロジェクトを一覧表示

```bash
npx intlayer projects list
```

このコマンドは Intlayer の設定ファイルを含むディレクトリを検出して、すべての Intlayer プロジェクトを検索・一覧表示します。モノレポ、ワークスペース、または git リポジトリ内のすべての Intlayer プロジェクトを見つけるのに便利です。

## エイリアス:

- `npx intlayer projects-list`
- `npx intlayer pl`

## 引数:

- **`--base-dir [path]`**: 検索を開始する基準ディレクトリを指定します。デフォルトは現在の作業ディレクトリです。

  > 例: `npx intlayer projects list --base-dir /path/to/workspace`

  > 例: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: ベースディレクトリではなく git ルートディレクトリから検索します。モノレポや git リポジトリ内のすべての Intlayer プロジェクトを見つけるのに便利です。

  > 例: `npx intlayer projects list --git-root`

- **`--json`**: 結果をフォーマットされたテキストではなくJSONとして出力します。スクリプト作成やプログラムからのアクセスに便利です。

  > 例: `npx intlayer projects list --json`

## 動作方法:

コマンドは指定したディレクトリ（`--git-root` が使用された場合は git ルート）内で Intlayer の設定ファイルを検索します。次の設定ファイルパターンを探します:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

これらのファイルのいずれかを含む各ディレクトリは Intlayer プロジェクトと見なされ、出力に一覧表示されます。

## 例:

### 現在のディレクトリ内のプロジェクトを一覧表示:

```bash
npx intlayer projects list
```

### 現在のディレクトリ内のプロジェクトを一覧表示:

```bash
npx intlayer projects list --base-dir ./packages
```

### 特定ディレクトリ内のプロジェクトを一覧表示:

```bash
npx intlayer projects list --base-dir ./packages
```

### Git リポジトリ内のすべてのプロジェクトを一覧表示:

```bash
npx intlayer projects list --git-root
```

### ショートカットエイリアスを使う:

```bash
npx intlayer pl --git-root
```

### JSONとして出力:

```bash
npx intlayer projects list --json
```

## 出力例:

### フォーマットされた出力:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON出力:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## ユースケース:

- **Monorepo management**: モノレポ構成内のすべての Intlayer プロジェクトを検出する
- **Project discovery**: ワークスペース内の Intlayer 対応プロジェクトを見つける
- **CI/CD**: 自動化ワークフロー内で Intlayer プロジェクトを検証する
- **ドキュメント**: Intlayer を使用しているすべてのプロジェクトを一覧表示するドキュメントを生成する

出力は各プロジェクトディレクトリへの絶対パスを提供するため、複数の Intlayer プロジェクトに移動したり、スクリプトで操作を実行したりするのが容易になります。
