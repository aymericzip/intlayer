---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgradeコマンドの追加"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra コマンドの追加"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`ci` コマンドを `--ci` フラグに置き換え"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scanコマンドの追加"
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
author: aymericzip
---

# Intlayer CLI - 多言語サイトのためのすべてのIntlayer CLIコマンド

## 目次

<TOC/>

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

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` などのすべてのIntlayerファイルをトランスパイルします。[Intlayer宣言ファイルの宣言方法を参照してください](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/login" />
</TechGrid>

> `intlayer login` は、すべての認証されたコマンドが使用する **access key** (`clientId` / `clientSecret`) を発行します。シークレットはサーバー側の認証情報であり、クライアント bundle に到達することはありません — [access key の安全な保管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/login.md#access-key-の安全な保管)を参照してください。

### コアコマンド

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/list_projects" />
</TechGrid>

### ディクショナリ管理

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/list" />
</TechGrid>

### コンポーネント管理

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract" />
</TechGrid>

### 設定

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/configuration" />
</TechGrid>

### ドキュメント管理

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-review" />
</TechGrid>

### エディターとライブ同期

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/live" />
</TechGrid>

### 監査と診断

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/scan" />
</TechGrid>

### 開発ツール

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/debug" />
</TechGrid>

## `package.json` での Intlayer コマンドの使用

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **注意**: 以下の短いエイリアスも使用できます：
>
> - `npx intlayer list`: `npx intlayer content list` の代わり
> - `npx intlayer test`: `npx intlayer content test` の代わり
> - `npx intlayer projects-list` または `npx intlayer pl`: `npx intlayer projects list` の代わり
