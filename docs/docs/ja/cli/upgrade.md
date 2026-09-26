---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 5
title: CLI - Intlayerパッケージのアップグレード
description: Intlayer CLIのupgradeコマンドを使用して、プロジェクトまたはモノレポ内のすべてのIntlayerパッケージをリストし、最新バージョンにアップグレードする方法を学びます。
keywords:
  - CLI
  - Upgrade
  - アップグレード
  - Packages
  - モノレポ
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgradeコマンドの追加"
author: aymericzip
---

# Intlayerパッケージのアップグレード

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

`upgrade` コマンドは、モノレポのワークスペースを含むプロジェクト内の各 `package.json` に宣言されているIntlayerパッケージを一覧表示し、公開されている最新バージョンにアップグレードします。`intlayer init` と同様のパッケージアップグレード手順を単体で実行します。

## 引数:

- `--project-root [projectRoot]` - 省略可能。プロジェクトのルートディレクトリ。デフォルトでは、現在の作業ディレクトリの上にある最も近い `package.json` から開始します。
- `--dry-run` - 省略可能。ファイルを変更せずに、パッケージとその対象バージョンを一覧表示します。
- `--tag <tag>` - 省略可能。アップグレード先のnpm dist-tag（例: `canary`）。デフォルトは `latest` です。

## 処理内容:

1. **Intlayerパッケージのリスト化** - プロジェクト内の各 `package.json`（`node_modules` およびビルド出力をスキップ）をスキャンし、`intlayer`、`@intlayer/*`、`*-intlayer`、`intlayer-*` の依存関係および devDependencies を検出します。
2. **対象バージョンの取得** - 各パッケージの指定されたdist-tag（デフォルトは `latest`）のバージョンをnpmレジストリから読み取ります。
3. **バージョンの範囲を書き換え** - 各古い範囲をその場で更新し、演算子（`^`、`~`、またはなし）とファイルのインデントを維持します。
4. **一度だけインストール** - ロックファイルが存在する最も近いディレクトリ（ワークスペースルート）から、そのロックファイルを管理するパッケージマネージャーを使用して一度だけインストールを実行します:

| ロックファイル                       | コマンド       |
| ------------------------------------ | -------------- |
| `bun.lock` / `bun.lockb`             | `bun install`  |
| `pnpm-lock.yaml`                     | `pnpm install` |
| `yarn.lock`                          | `yarn install` |
| `package-lock.json` またはロックなし | `npm install`  |

ロックファイルが存在しない場合は、npmにフォールバックする前に `package.json` の `packageManager` フィールド（例: `"bun@1.2.0"`）が使用されます。

`workspace:*`、`file:`、`link:`、`catalog:`、またはgit URLなど、レジストリを指していない範囲は変更されません。

## 例:

### 適用せずに利用可能なアップグレードを一覧表示する:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### canaryリリースにアップグレードする:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## 出力例:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## 注意点:

- すべてのワークスペースをアップグレードするにはリポジトリのルートからコマンドを実行します。特定のワークスペースのみをアップグレードするにはそのワークスペースから実行します。
- バージョンを取得できないパッケージ（オフライン、プライベート、または未公開パッケージ）はリストに表示され、変更されずに残ります。
- インストールが失敗した場合でも、更新された範囲は `package.json` に保持されます。パッケージマネージャーのインストールコマンドを手動で実行してください。
