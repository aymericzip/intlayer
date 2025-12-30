---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer を初期化する
description: プロジェクトで Intlayer を初期化する方法を学びます。
keywords:
  - 初期化
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init コマンドを追加
---

# Intlayer を初期化する

```bash
npx intlayer init
```

`init` コマンドは、必要なファイルや設定を構成してプロジェクト内で Intlayer を自動的にセットアップします。Intlayer を始めるために推奨される方法です。

## エイリアス:

- `npx intlayer init`

## 引数:

- `--project-root [projectRoot]` - 任意。プロジェクトのルートディレクトリを指定します。指定しない場合、コマンドは現在の作業ディレクトリからプロジェクトルートを検索します。

## 実行内容:

`init` コマンドは次のセットアップ作業を実行します：

1. **プロジェクト構造を検証** - `package.json` ファイルが存在する有効なプロジェクトディレクトリにいることを確認します
2. **`.gitignore` を更新** - 生成されたファイルをバージョン管理から除外するために、`.gitignore` に `.intlayer` を追加します
3. **TypeScript を構成** - すべての `tsconfig.json` ファイルを更新して Intlayer の型定義（`.intlayer/**/*.ts`）を含めます
4. **設定ファイルを作成** - デフォルト設定で `intlayer.config.ts`（TypeScript プロジェクト向け）または `intlayer.config.mjs`（JavaScript プロジェクト向け）を生成します
5. **Vite 設定を更新** - Vite の設定ファイルが検出された場合、`vite-intlayer` プラグインのインポートを追加します
6. **Next.js の設定を更新** - Next.js の設定ファイルが検出された場合、`next-intlayer` プラグインのインポートを追加します

## Examples:

### Basic initialization:

```bash
npx intlayer init
```

これにより、現在のディレクトリに Intlayer が初期化され、プロジェクトのルートが自動的に検出されます。

### Initialize with custom project root:

```bash
npx intlayer init --project-root ./my-project
```

これにより、指定したディレクトリに Intlayer が初期化されます。

## Example output:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## 注意事項:

- コマンドは冪等（idempotent）です — 複数回安全に実行できます。既に設定されている手順はスキップされます。
- 既に設定ファイルが存在する場合、上書きされません。
- `include` 配列を持たない TypeScript の設定ファイル（例: references を使った solution スタイルの設定）はスキップされます。
- プロジェクトルートに `package.json` が見つからない場合、コマンドはエラーで終了します。
