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
    changes: CIコマンドを追加
---

# CIコマンド

```bash
npx intlayer ci <command...>
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

```bash
npx intlayer ci fill --verbose --mode complete
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
