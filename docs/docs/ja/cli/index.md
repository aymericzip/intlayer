---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Intlayer CLIを使用して多言語ウェブサイトを管理する方法を紹介します。このオンラインドキュメントの手順に従って、数分でプロジェクトをセットアップしましょう。
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
  - version: 7.2.3
    date: 2025-11-22
    changes: transformコマンドを追加
  - version: 7.1.0
    date: 2025-11-05
    changes: translateコマンドにskipIfExistsオプションを追加
  - version: 6.1.4
    date: 2025-01-27
    changes: CLI引数とコマンドのエイリアスを追加
  - version: 6.1.3
    date: 2025-10-05
    changes: コマンドにbuildオプションを追加
  - version: 6.1.2
    date: 2025-09-26
    changes: versionコマンドを追加
  - version: 6.1.0
    date: 2025-09-26
    changes: CLIでverboseオプションのデフォルトをtrueに設定
  - version: 6.1.0
    date: 2025-09-23
    changes: watchコマンドとwithオプションを追加
  - version: 6.0.1
    date: 2025-09-23
    changes: editorコマンドを追加
  - version: 6.0.0
    date: 2025-09-17
    changes: content testおよびlistコマンドを追加
  - version: 5.5.11
    date: 2025-07-11
    changes: CLIコマンドパラメータのドキュメントを更新
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴を初期化
---

# Intlayer CLI

---

## 目次

<TOC/>

---

## パッケージのインストール

npmを使用して必要なパッケージをインストールします:

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

> もし `intlayer` パッケージがすでにインストールされている場合、CLIは自動的にインストールされます。このステップはスキップ可能です。

## intlayer-cli パッケージ

`intlayer-cli` パッケージは、あなたの [intlayer 宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md) を辞書にトランスパイルすることを目的としています。

このパッケージは、`src/**/*.content.{ts|js|mjs|cjs|json}` のようなすべての intlayer ファイルをトランスパイルします。[Intlayer 宣言ファイルの宣言方法はこちらを参照してください](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)。

intlayer 辞書を解釈するには、[react-intlayer](https://www.npmjs.com/package/react-intlayer) や [next-intlayer](https://www.npmjs.com/package/next-intlayer) のようなインタープリターを使用できます。

## 設定ファイルのサポート

Intlayer は複数の設定ファイル形式をサポートしています：

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

利用可能なロケールやその他のパラメータの設定方法については、[設定ドキュメントはこちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## intlayer コマンドの実行

### 認証

- **[ログイン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/login.md)** - Intlayer CMSで認証し、アクセス認証情報を取得する

### コアコマンド

- **[辞書のビルド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/build.md)** - コンテンツ宣言ファイルから辞書をビルドします
- **[辞書の監視](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/watch.md)** - 変更を監視し、自動的に辞書をビルドします
- **[CLI バージョンの確認](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/version.md)** - インストールされている Intlayer CLI のバージョンを確認します

### 辞書管理

- **[辞書のプッシュ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/push.md)** - 辞書を Intlayer エディターおよび CMS にプッシュします
- **[辞書のプル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/pull.md)** - IntlayerエディターおよびCMSから辞書をプルします
- **[辞書の充填](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)** - AIを使用して辞書を充填、監査、翻訳します
- **[欠落翻訳のテスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/test.md)** - 欠落している翻訳をテストして特定します
- **[コンテンツ宣言ファイルの一覧表示](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/list.md)** - プロジェクト内のすべてのコンテンツ宣言ファイルを一覧表示します

### コンポーネント管理

- **[コンポーネントの変換](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/transform.md)** - 既存のコンポーネントをIntlayer対応に変換する

### 設定

- **[設定の管理](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/configuration.md)** - Intlayerの設定をCMSから取得・プッシュする

### ドキュメント管理

- **[ドキュメントの翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-translate.md)** - AIを使ってドキュメントファイルを自動翻訳する
- **[ドキュメントのレビュー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/doc-review.md)** - ドキュメントファイルの品質と一貫性をレビューする

### エディター & ライブ同期

- **[エディターコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/editor.md)** - Intlayerのエディターコマンドを使用する
- **[ライブシンクコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/live.md)** - ライブシンクを使用して、実行時にCMSのコンテンツ変更を反映する

### 開発ツール

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/sdk.md)** - 自分のコード内でIntlayer CLI SDKを使用する
- **[Intlayerコマンドのデバッグ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/debug.md)** - Intlayer CLIの問題をデバッグおよびトラブルシュートする

## `package.json`でintlayerコマンドを使用する

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **注意**: 以下の短縮エイリアスも使用できます:
>
> - `npx intlayer list` は `npx intlayer content list` の代わりに使用可能
> - `npx intlayer test` は `npx intlayer content test` の代わりに使用可能
