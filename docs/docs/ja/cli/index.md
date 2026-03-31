---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - 多言語サイトのためのすべてのIntlayer CLIコマンド
description: 多言語サイトを管理するためのIntlayer CLIの使用方法をご紹介します。このオンラインドキュメントに従って、数分でプロジェクトをセットアップしてください。
keywords:
  - CLI
  - コマンドラインインターフェース
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "standaloneコマンドの追加"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CIコマンドの追加"
  - version: 7.5.11
    date: 2026-01-06
    changes: "list projectsコマンドの追加"
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドの追加"
  - version: 7.2.3
    date: 2025-11-22
    changes: "extractコマンドの追加"
  - version: 7.1.0
    date: 2025-11-05
    changes: "translateコマンドにskipIfExistsオプションを追加"
  - version: 6.1.4
    date: 2025-01-27
    changes: "CLI引数とコマンドのエイリアスを追加"
  - version: 6.1.3
    date: 2025-10-05
    changes: "コマンドにbuildオプションを追加"
  - version: 6.1.2
    date: 2025-09-26
    changes: "versionコマンドの追加"
  - version: 6.1.0
    date: 2025-09-26
    changes: "CLIでverboseオプションをデフォルトでtrueに設定"
  - version: 6.1.0
    date: 2025-09-23
    changes: "watchコマンドとwithオプションの追加"
  - version: 6.0.1
    date: 2025-09-23
    changes: "editorコマンドの追加"
  - version: 6.0.0
    date: 2025-09-17
    changes: "content testおよびlistコマンドの追加"
  - version: 5.5.11
    date: 2025-07-11
    changes: "CLIコマンドパラメータのドキュメントを更新"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
---

# Intlayer CLI - 多言語サイトのためのすべてのIntlayer CLIコマンド

---

## 目次

<TOC/>

---

## パッケージのインストール

npmを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> `intlayer` パッケージがすでにインストールされている場合、CLIは自動的にインストールされます。このステップはスキップできます。

## intlayer-cli パッケージ

`intlayer-cli` パッケージは、[Intlayer宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)をディクショナリにトランスパイルするためのものです。

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json}` などのすべてのIntlayerファイルをトランスパイルします。[Intlayer宣言ファイルの宣言方法を参照してください](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

Intlayerディクショナリを解釈するには、[react-intlayer](https://www.npmjs.com/package/react-intlayer) や [next-intlayer](https://www.npmjs.com/package/next-intlayer) などのインタープリターを使用できます。

## 設定ファイルのサポート

Intlayerは、複数の設定ファイル形式をサポートしています：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

利用可能な言語やその他のパラメータの設定方法については、[こちらから設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## Intlayerコマンドの実行

### 認証

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/login.md)** - Intlayer CMSで認証し、アクセス資格情報を取得します。

### コアコマンド

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/build.md)** - コンテンツ宣言ファイルからディクショナリをビルドします。
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/watch.md)** - 変更を監視し、ディクショナリを自動的に再ビルドします。
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/standalone.md)** - Intlayerと指定したパッケージを含むスタンドアロンJavaScriptバンドルを作成します。
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/version.md)** - インストールされているIntlayer CLIのバージョンを確認します。
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/list_projects.md)** - ディレクトリまたはGitリポジトリ内のすべてのIntlayerプロジェクトを一覧表示します。

### ディクショナリ管理

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/push.md)** - ディクショナリをIntlayerエディターおよびCMSに送信します。
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/pull.md)** - IntlayerエディターおよびCMSからディクショナリを取得します。
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)** - AIを使用してディクショナリを埋め、監査し、翻訳します。
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/test.md)** - 翻訳の欠落をテストして特定します。
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/list.md)** - プロジェクト内のすべてのコンテンツ宣言ファイルを一覧表示します。

### コンポーネント管理

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)** - コンポーネントから文字列を抽出し、コンポーネントの近くの .content ファイルに保存します。

### 設定

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/init.md)** - 自動設定を使用してプロジェクトでIntlayerをセットアップします。
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/configuration.md)** - Intlayer設定を取得し、CMSに送信します。

### ドキュメント管理

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-translate.md)** - AIを使用してドキュメントファイルを自動的に翻訳します。
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-review.md)** - ドキュメントファイルの品質と一貫性をレビューします。

### エディターとライブ同期

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/editor.md)** - Intlayerエディターのコマンドを使用します。
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/live.md)** - Live Syncを使用して、CMSからのコンテンツ変更を実行時に反映させます。

### CI/CDと自動化

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/ci.md)** - CI/CDパイプライン用に自動的に資格情報を挿入してIntlayerコマンドを実行します。

### 開発ツール

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/sdk.md)** - 独自のコード内でIntlayer CLI SDKを使用します。
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/debug.md)** - Intlayer CLIの問題をデバッグして修正します。

## `package.json` での Intlayer コマンドの使用

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **注意**: 以下の短いエイリアスも使用できます：
>
> - `npx intlayer list`: `npx intlayer content list` の代わり
> - `npx intlayer test`: `npx intlayer content test` の代わり
> - `npx intlayer projects-list` または `npx intlayer pl`: `npx intlayer projects list` の代わり
