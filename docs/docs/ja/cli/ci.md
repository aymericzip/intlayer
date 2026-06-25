---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: CIコマンド
description: CI/CDパイプラインとモノレポで自動注入された認証情報を使用してIntlayerコマンドを実行する方法を学びます。
keywords:
  - CI
  - CI/CD
  - 自動化
  - モノレポ
  - 認証情報
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "CIコマンドを追加"
author: aymericzip
---

# CIコマンド

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

CIコマンドは、自動化とCI/CDパイプライン用に設計されています。`INTLAYER_PROJECT_CREDENTIALS`環境変数から認証情報を自動的に注入し、モノレポ内の複数のプロジェクトでIntlayerコマンドを実行できます。

## 動作方法

CIコマンドは2つのモードで動作します：

1. **単一プロジェクトモード**: 現在の作業ディレクトリが`INTLAYER_PROJECT_CREDENTIALS`内のプロジェクトパスのいずれかと一致する場合、その特定のプロジェクトに対してのみコマンドを実行します。

2. **反復モード**: 特定のプロジェクトコンテキストが検出されない場合、すべての設定済みプロジェクトを反復処理し、それぞれに対してコマンドを実行します。

## 環境変数

コマンドには`INTLAYER_PROJECT_CREDENTIALS`環境変数の設定が必要です。この変数には、プロジェクトパスを認証情報にマッピングするJSONオブジェクトが含まれている必要があります：

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## パッケージマネージャーの検出

CIコマンドは、`npm_config_user_agent`環境変数に基づいて使用されているパッケージマネージャー（npm、yarn、pnpm、またはbun）を自動的に検出し、Intlayerを実行するために適切なコマンドを使用します。

## 引数

- **`<command...>`**: 実行するIntlayerコマンド（例：`fill`、`push`、`build`）。任意のIntlayerコマンドとその引数を渡すことができます。

  > 例: `npx intlayer ci fill --verbose`
  >
  > 例: `npx intlayer ci push`
  >
  > 例: `npx intlayer ci build`

## 例

### 単一プロジェクトモードでコマンドを実行

`INTLAYER_PROJECT_CREDENTIALS`内のパスのいずれかと一致するプロジェクトディレクトリにいる場合：

```bash
cd packages/app
npx intlayer ci fill
```

これにより、`packages/app`プロジェクトの認証情報が自動的に注入されて`fill`コマンドが実行されます。

### すべてのプロジェクトでコマンドを実行

プロジェクトパスと一致しないディレクトリにいる場合、コマンドはすべての設定済みプロジェクトを反復処理します：

```bash
cd /path/to/monorepo
npx intlayer ci push
```

これにより、`INTLAYER_PROJECT_CREDENTIALS`で設定された各プロジェクトに対して`push`コマンドが実行されます。

### 追加のフラグを渡す

基になるIntlayerコマンドに任意のフラグを渡すことができます：

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### CI/CDパイプラインで使用

CI/CD設定（例：GitHub Actions、GitLab CI）で、`INTLAYER_PROJECT_CREDENTIALS`をシークレットとして設定します：

```yaml
# GitHub Actionsの例
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: 辞書を埋める
    run: npx intlayer ci fill
```

## スキャフォルドされた GitHub Actions

`intlayer init` を実行すると、Intlayer はパッケージマネージャー (npm、yarn、pnpm、または bun) を検出し、`.github/workflows/` の下に 2 つの GitHub Actions ワークフローをスキャフォルドします。コマンドはそのパッケージマネージャーに対応します:

- **`intlayer-fill.yml`** — すべてのプルリクエストで、辞書をビルドし `intlayer fill --git-diff --mode complete` を実行して、変更された辞書の欠落している翻訳を生成し、結果を PR ブランチにコミットします。
- **`intlayer-test.yml`** — すべてのプルリクエストで、辞書をビルドし `intlayer test` を実行し、必要なロケールの翻訳が不足している場合はチェックを失敗させます。

既存のワークフローファイルが上書きされることはありません。スキャフォルディングをスキップするには、以下を実行します:

```bash
npx intlayer init --no-github-actions
```

### fill workflowへのAIアクセスの提供

スキャフォルドされた `intlayer-fill.yml` はAIアクセスが必要です。2つのオプションが利用可能です（workflowの `env` ブロックで設定）:

1. **独自のAIプロバイダーキー** — リポジトリ設定（Settings → Secrets and variables → Actions）に `AI_API_KEY` シークレットを追加します。workflowは `--provider`、`--model`、`--api-key` 経由でそれを転送します。
2. **Intlayer CMSアクセスキー** — `INTLAYER_CLIENT_ID` と `INTLAYER_CLIENT_SECRET` シークレットを追加し、`intlayer.config` の `editor` セクションに接続します。CMSアクセスキーはIntlayer backendを通じてAIアクセスを許可します。

`intlayer-test.yml` workflowはAIアクセスを必要としません。

## エラーハンドリング

- `INTLAYER_PROJECT_CREDENTIALS`が設定されていない場合、コマンドはエラーで終了します。
- `INTLAYER_PROJECT_CREDENTIALS`が有効なJSONでない場合、コマンドはエラーで終了します。
- プロジェクトパスが存在しない場合、警告とともにスキップされます。
- いずれかのプロジェクトが失敗した場合、コマンドは非ゼロのステータスコードで終了します。

## 使用例

- **モノレポの自動化**: モノレポ内の複数のプロジェクトでIntlayerコマンドを実行
- **CI/CDパイプライン**: 継続的インテグレーションワークフローでの辞書管理の自動化
- **一括操作**: 複数のIntlayerプロジェクトに対して同じ操作を一度に実行
- **シークレット管理**: 環境変数を使用して複数のプロジェクトの認証情報を安全に管理

## セキュリティのベストプラクティス

- CI/CDプラットフォームで`INTLAYER_PROJECT_CREDENTIALS`を暗号化されたシークレットとして保存
- 認証情報をバージョン管理にコミットしない
- 異なるデプロイ環境に対して環境固有の認証情報を使用
- 定期的に認証情報をローテーション
