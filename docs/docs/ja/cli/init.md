---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init：プロジェクトに Intlayer を導入"
description: "intlayer init で既存プロジェクトに Intlayer を追加：フレームワークを検出し、パッケージをインストールして設定ファイルを書き込みます。"
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
  - version: 9.5.13
    date: 2026-09-29
    changes: "init はパッケージのインストールとフレームワークの設定のみを行う。各ステップ専用のサブコマンドを追加。ターミナルがない場合 --interactive は失敗する"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra サブコマンドの追加"
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore オプションの追加"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init コマンドの追加"
author: aymericzip
---

# Intlayerの初期化

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

`init` コマンドは Intlayer のパッケージをインストールし、フレームワークを設定します（設定ファイル、TypeScript、バンドラープラグイン、ミドルウェア/プロキシ、プロバイダー）。Intlayer を始めるための推奨される方法です。

それ以外（CI ワークフロー、AI スキル、MCP サーバー、エディターツール、lint ルール、CMS、インフラストラクチャ）はオプトインです。`--interactive` のチェックリストから選ぶか、専用のサブコマンドを実行してください（下記参照）。

## エイリアス:

- `npx intlayer init`

## 引数:

- `--project-root [projectRoot]` - 任意。プロジェクトのルートディレクトリを指定します。指定しない場合、コマンドは現在の作業ディレクトリからプロジェクトのルートを探します。
- `--no-gitignore` - 任意。`.gitignore` ファイルの自動更新をスキップします。このフラグが設定されている場合、`.intlayer` は `.gitignore` に追加されません。
- `--no-framework-setup` - 任意。プロジェクトのファイルを変更せず、パッケージのインストールのみを行います。
- `--routing <routing>` - 任意。ロケールのルーティング: `prefix-no-default`（デフォルト）、`prefix-all`、`no-prefix`、`search-params`、`none`。
- `--content <layout>` - 任意。コンテンツの宣言方法:
  - `multilingual` - `{fileName}.content.{ts,json}` コンポーネントの隣、すべてのロケールを1つのファイルに（`compiler.output` を設定）。
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` コンポーネントの隣（`compiler.output` および `dictionary.locale` を設定）。
  - `centralized` - ロケールごとに1つの `/locales/{locale}.{json,po}` カタログ（`syncJSON` / `syncPO` プラグインを追加）。
  - `namespaces` - `/locales/{locale}/{namespace}.{json,po}` カタログ（`syncJSON` / `syncPO` プラグインを追加）。
- `--content-format <format>` - 任意、`--content` と併用。`multilingual` / `per-locale` には `ts` または `json`、`centralized` / `namespaces` には `json` または `po`。デフォルトは最初のもの。
- `--message-format <format>` - 任意、JSON での `--content centralized` または `namespaces` と併用。カタログのメッセージ構文: `icu`（デフォルト）、`i18next`、`vue-i18n`、`intlayer`。
- `-i, --interactive` - 任意。デフォルトのセットの代わりに、チェックリスト（パッケージ、CI、スキル、MCP、VS Code、LSP、lint、CMS、インフラストラクチャ、…）からセットアップ手順を選びます。ターミナルが必要です。ターミナルがない場合（AI エージェント、CI）、コマンドは失敗し、代わりに実行するサブコマンドを一覧表示します。
- `--no-github-actions` - 任意。`--interactive` と併用すると、選択されていても GitHub Actions ワークフローを作成しません。

## 動作の仕組み:

`init` コマンドは以下のセットアップタスクを実行します：

1. **プロジェクト構造の検証** - `package.json` ファイルがある有効なプロジェクトディレクトリにいることを確認します。
2. **パッケージをインストール** - スタックに不足している Intlayer パッケージ（例: `react-intlayer`、`vite-intlayer`）をインストールし、古いものを更新します。
3. **`.gitignore` の更新** - 生成されたファイルをバージョン管理から除外するために、`.intlayer` を `.gitignore` ファイルに追加します（`--no-gitignore` でスキップ可能）。
4. **TypeScript の構成** - すべての `tsconfig.json` ファイルを更新し、Intlayer の型定義 (`.intlayer/**/*.ts`) を含めます。
5. **設定ファイルの作成** - デフォルト設定で `intlayer.config.ts`（TypeScript プロジェクトの場合）または `intlayer.config.mjs`（JavaScript プロジェクトの場合）を生成します。
6. **バンドラー / フレームワークの設定を更新** - Vite、Next.js、Nuxt、Astro などの設定に Intlayer プラグインを追加し、フレームワークが対応している場合はミドルウェア/プロキシとプロバイダーを作成します。

## 1 ステップずつ設定する

`--interactive` チェックリストの各ステップには専用のサブコマンドがあります。値をフラグで渡せば何も質問しないため、AI エージェントや CI ジョブから安全に実行できます。

| コマンド                                                              | 設定される内容                                                                                    |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | 不足している Intlayer パッケージをインストールし、古いものを更新                                  |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | 設定ファイル、TypeScript、バンドラープラグイン、ミドルウェア/プロキシ、プロバイダー、`.gitignore` |
| `intlayer init github-actions`                                        | `fill` と `test` の GitHub Actions ワークフロー                                                   |
| `intlayer init vscode-extension`                                      | `.vscode/extensions.json` で Intlayer 拡張機能を推奨                                              |
| `intlayer init lsp`                                                   | `.vscode/settings.json` に Intlayer 言語サーバー                                                  |
| `intlayer init eslint`                                                | プロジェクトがすでに lint を使っている場合の Intlayer lint ルール（ESLint / oxlint）              |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | AI エージェント向けスキルとしての Intlayer ドキュメント                                           |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Intlayer MCP サーバー                                                                             |
| `intlayer init extension [--browser <chrome/firefox>]`                | Intlayer ブラウザ拡張機能のストアページを開く                                                     |
| `intlayer init cms`                                                   | ブラウザで Intlayer CMS にログインし、認証情報を `.env` に保存                                    |
| `intlayer init infra --mode <desktop/docker/compose>`                 | デスクトップアプリまたはセルフホストのスタック                                                    |

### AI エージェントや CI ジョブから実行する

AI エージェントのシェルにはターミナルがないため、質問に答えることができません。デフォルトのコマンドを実行し、その後に必要なサブコマンドを実行してください:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

ターミナルがない場合:

- `init skills` は、`--skills` が指定されていない限り、スタックに合ったスキルをインストールします（例: `--skills Usage Content React`）。
- `init skills` と `init mcp` は、`--platform` が指定されていない限り、検出された AI プラットフォーム（Claude Code、Cursor、VS Code、Windsurf、…）を使います。何も検出されない場合は、プラットフォームの一覧を表示して失敗します。
- `init mcp` は、`--transport` が指定されていない限り `stdio` トランスポートを使います。
- `init infra` には `--mode` が必須です。`init extension` は、`--browser` が指定されていない限りストアのリンクを表示するだけです。

MCP サーバーは常にプロジェクト内に設定されます（Claude Code の場合は `.mcp.json`）。

## 例:

### 基本的な初期化:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

これにより、現在のディレクトリでIntlayerが初期化され、プロジェクトのルートが自動的に検出されます。

### カスタム プロジェクト ルートでの初期化:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

これにより、指定されたディレクトリでIntlayerが初期化されます。

### .gitignore を更新せずに初期化する:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

これにより、すべての設定ファイルがセットアップされますが、`.gitignore` は変更されません。

### インフラストラクチャのセットアップ（デスクトップアプリまたはセルフホスティング）:

```bash
npx intlayer init infra
```

ホストされたインストーラー（macOS / Linux では `https://intlayer.org/install.sh`、Windows では `install.ps1`）をダウンロードして実行し、Intlayerの実行方法を尋ねます:

- **デスクトップアプリ** - Intlayer Cloudに接続されたネイティブダッシュボードをマシンにインストールします。
- **オールインワン Docker** - 単一コンテナ内にダッシュボード + API + MongoDB + Redis + MinIO を集約。
- **Docker Compose** - スケーラブルなセルフホスティング向けにサービスごとに1つのコンテナを用意。

`--mode` でメニューをスキップできます:

```bash
npx intlayer init infra --mode compose
```

同様の手順は `npx intlayer init --interactive` でも提供されます。インストーラーの設定については [`init infra` リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/infra.md) を、各モードで設定される内容については [セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md) を参照してください。

- [`init infra` リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/infra.md)
- [セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)

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
