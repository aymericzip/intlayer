---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayerの初期化
description: プロジェクトでIntlayerを初期化する方法。
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore オプションの追加"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init コマンドの追加"
---

# Intlayerの初期化

```bash
npx intlayer init
```

`init` コマンドは、必要なファイルと設定をセットアップすることで、プロジェクトにIntlayerを自動的に構成します。これはIntlayerを開始する際の推奨される方法です。

## エイリアス:

- `npx intlayer init`

## 引数:

- `--project-root [projectRoot]` - 任意。プロジェクトのルートディレクトリを指定します。指定しない場合、コマンドは現在の作業ディレクトリからプロジェクトのルートを探します。
- `--no-gitignore` - 任意。`.gitignore` ファイルの自動更新をスキップします。このフラグが設定されている場合、`.intlayer` は `.gitignore` に追加されません。

## 動作の仕組み:

`init` コマンドは以下のセットアップタスクを実行します：

1. **プロジェクト構造の検証** - `package.json` ファイルがある有効なプロジェクトディレクトリにいることを確認します。
2. **`.gitignore` の更新** - 生成されたファイルをバージョン管理から除外するために、`.intlayer` を `.gitignore` ファイルに追加します（`--no-gitignore` でスキップ可能）。
3. **TypeScript の構成** - すべての `tsconfig.json` ファイルを更新し、Intlayer の型定義 (`.intlayer/**/*.ts`) を含めます。
4. **設定ファイルの作成** - デフォルト設定で `intlayer.config.ts`（TypeScript プロジェクトの場合）または `intlayer.config.mjs`（JavaScript プロジェクトの場合）を生成します。
5. **Vite 設定の更新** - Vite 設定ファイルが検出された場合、`vite-intlayer` プラグインのインポートを追加します。
6. **Next.js 設定の更新** - Next.js 設定ファイルが検出された場合、`next-intlayer` プラグインのインポートを追加します。

## 例:

### 基本的な初期化:

```bash
npx intlayer init
```

これにより、現在のディレクトリでIntlayerが初期化され、プロジェクトのルートが自動的に検出されます。

### カスタム プロジェクト ルートでの初期化:

```bash
npx intlayer init --project-root ./my-project
```

これにより、指定されたディレクトリでIntlayerが初期化されます。

### .gitignore を更新せずに初期化する:

```bash
npx intlayer init --no-gitignore
```

これにより、すべての設定ファイルがセットアップされますが、`.gitignore` は変更されません。

## 出力例:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## 注意事項:

- このコマンドはべき等です。複数回安全に実行でき、すでに構成されているステップはスキップされます。
- 設定ファイルがすでに存在する場合、上書きされません。
- `include` 配列のない TypeScript 設定（Solution スタイルの設定など）はスキップされます。
- プロジェクトのルートに `package.json` が見つからない場合、コマンドはエラーで終了します。
