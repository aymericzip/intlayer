---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Intlayerの仕組み
description: Intlayerが内部でどのように機能するかを学びます。Intlayerを強力にするアーキテクチャとコンポーネントを理解しましょう。
keywords:
  - Intlayer
  - どのように機能するか
  - アーキテクチャ
  - コンポーネント
  - 内部動作
slugs:
  - doc
  - concept
  - how-works-intlayer
---

# Intlayerの仕組み

## 概要

Intlayerの主なアイデアは、コンポーネントごとのコンテンツ管理を採用することです。そのため、Intlayerの背後にある考え方は、コンテンツをコードベースのどこにでも、例えばコンポーネントと同じディレクトリ内に宣言できるようにすることです。

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

これを実現するために、Intlayerの役割は、プロジェクト内に存在するさまざまな形式の`コンテンツ宣言ファイル`をすべて見つけ出し、それらから`辞書`を生成することです。

したがって、主に2つのステップがあります：

- ビルドステップ
- 解釈ステップ

### 辞書のビルドステップ

ビルドステップは以下の3つの方法で実行できます：

- CLIを使用して`npx intlayer build`を実行
- [vscode拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)を使用
- [`vite-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)などのアプリプラグインを使用、または[Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)用の同等のプラグインを使用。これらのプラグインのいずれかを使用すると、アプリケーションを開始（開発）またはビルド（本番）する際に、Intlayerが自動的に辞書をビルドします。

1. コンテンツファイルの宣言
   - コンテンツファイルは、TypeScript、ECMAScript、CommonJS、JSONなど、さまざまな形式で定義できます。
   - コンテンツファイルはプロジェクト内のどこにでも定義でき、これによりメンテナンス性とスケーラビリティが向上します。コンテンツファイルの拡張子の規約を守ることが重要です。この拡張子はデフォルトで`*.content.{js|cjs|mjs|ts|tsx|json}`ですが、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で変更できます。

2. `辞書`の生成
   - 辞書はコンテンツファイルから生成されます。デフォルトでは、Intlayer辞書はプロジェクトの`.intlayer/dictionaries`ディレクトリに生成されます。
   - これらの辞書は、すべてのニーズに対応し、アプリケーションのパフォーマンスを最適化するために、さまざまな形式で生成されます。

3. 辞書型の生成
   `辞書`に基づいて、Intlayerはアプリケーションで使用可能な型を生成します。

- 辞書型はIntlayerの`コンテンツ宣言ファイル`から生成されます。デフォルトでは、Intlayer辞書型はプロジェクトの`.intlayer/types`ディレクトリに生成されます。

- Intlayerの[モジュール拡張](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)は、Intlayerに追加の型を定義できるTypeScriptの機能です。これにより、利用可能な引数や必要な引数を提案することで開発体験が向上します。
  生成された型の中には、Intlayer辞書型や言語設定型が含まれ、`types/intlayer.d.ts`ファイルに追加され、他のパッケージで使用されます。これを行うには、`tsconfig.json`ファイルがプロジェクトの`types`ディレクトリを含むように設定されている必要があります。

### 辞書の解釈ステップ

Intlayerを使用すると、`useIntlayer`フックを使ってアプリケーション内でコンテンツにアクセスできます。

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

このフックはロケールの検出を管理し、現在のロケールに対応するコンテンツを返します。このフックを使用すると、Markdownの解釈、複数形の管理なども可能です。

> Intlayerのすべての機能を見るには、[辞書ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

## 遠隔コンテンツ

Intlayerを使用すると、コンテンツをローカルで宣言し、それをCMSにエクスポートして非技術的なチームが編集できるようにすることができます。

そのため、Gitでコードを操作するのと同様に、CMSからアプリケーションにコンテンツをプッシュおよびプルすることが可能です。

CMSを使用して外部化された辞書の場合、Intlayerは基本的なフェッチ操作を行い、遠隔の辞書を取得してローカルの辞書とマージします。プロジェクトで設定されている場合、Intlayerはアプリケーションの起動（開発）やビルド（本番）時にCMSからのコンテンツ取得を自動的に管理します。

## ビジュアルエディタ

Intlayerは、視覚的にコンテンツを編集できるビジュアルエディタも提供しています。この[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)は、外部の`intlayer-editor`パッケージで利用可能です。

![ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- サーバーは、クライアントからのリクエストを受け取り、`dictionaries`やクライアント側でアクセス可能にするための設定など、アプリケーションのコンテンツを取得するシンプルなExpressアプリケーションです。
- 一方、クライアントは視覚的なインターフェースを使ってコンテンツとやり取りするためのReactアプリケーションです。
  `useIntlayer`を使ってコンテンツを呼び出し、エディタが有効になっている場合、文字列は自動的に`IntlayerNode`という名前のProxyオブジェクトでラップされます。このノードは、ビジュアルエディタのインターフェースを含むラップされたiframeと通信するために`window.postMessage`を使用します。
  エディタ側では、これらのメッセージを受信してコンテンツとの実際のインタラクションをシミュレートし、アプリケーションのコンテキスト内で直接テキストを編集できるようにします。

## アプリビルドの最適化

アプリケーションのバンドルサイズを最適化するために、Intlayerはアプリケーションのビルドを最適化するための2つのプラグインを提供しています：`@intlayer/babel`と`@intlayer/swc`プラグイン。
BabelおよびSWCプラグインは、アプリケーションの抽象構文木（AST）を解析してIntlayer関数の呼び出しを最適化されたコードに置き換えることで動作します。このプロセスにより、実際に使用されている辞書のみがインポートされるようになり、チャンクの最適化とバンドルサイズの削減が行われるため、本番環境での最終バンドルが軽量化されます。

開発モードでは、Intlayerは辞書の集中型静的インポートを使用して開発体験を簡素化します。

[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で`importMode = "dynamic"`オプションを有効にすると、Intlayerは動的インポートを使用して辞書をロードします。このオプションは、アプリケーションのレンダリング時に非同期処理を回避するためにデフォルトで無効になっています。

> `@intlayer/babel`は`vite-intlayer`パッケージでデフォルトで利用可能です。

> `@intlayer/swc`は、Next.jsでSWCプラグインがまだ実験的であるため、`next-intlayer`パッケージにはデフォルトでインストールされていません。

アプリケーションのビルドを設定する方法については、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## パッケージ

Intlayerは、翻訳プロセスにおいて特定の役割を持つ複数のパッケージで構成されています。このパッケージの構造を示す図は以下の通りです：

![intlayerのパッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer`パッケージは、コンテンツファイル内でコンテンツを宣言するためにアプリケーションで使用されます。

### react-intlayer

`react-intlayer`パッケージは、Intlayer辞書を解釈し、Reactアプリケーションで使用可能にします。

### next-intlayer

`next-intlayer`パッケージは、`react-intlayer`の上にレイヤーを構築し、Next.jsアプリケーションでIntlayer辞書を使用可能にします。翻訳ミドルウェア、ルーティング、または`next.config.js`ファイルの設定など、Next.js環境でIntlayerを動作させるための重要な機能を統合しています。

### vue-intlayer

`vue-intlayer`パッケージは、Intlayer辞書を解釈し、Vueアプリケーションで使用可能にします。

### nuxt-intlayer

### nuxt-intlayer

`nuxt-intlayer`パッケージは、NuxtモジュールとしてIntlayer辞書をNuxtアプリケーションで使用可能にします。翻訳ミドルウェア、ルーティング、`nuxt.config.js`ファイルの設定など、Nuxt環境でIntlayerを動作させるための重要な機能を統合しています。

### svelte-intlayer (作業中)

`svelte-intlayer`パッケージは、Intlayer辞書を解釈し、Svelteアプリケーションで使用可能にします。

### solid-intlayer (作業中)

`solid-intlayer`パッケージは、Intlayer辞書を解釈し、Solid.jsアプリケーションで使用可能にします。

### preact-intlayer

`preact-intlayer`パッケージは、Intlayer辞書を解釈し、Preactアプリケーションで使用可能にします。

### angular-intlayer (作業中)

`angular-intlayer`パッケージは、Intlayer辞書を解釈し、Angularアプリケーションで使用可能にします。

### express-intlayer

`express-intlayer`パッケージは、Express.jsバックエンドでIntlayerを使用するために使用されます。

### react-native-intlayer

`react-native-intlayer`パッケージは、MetroバンドラーでIntlayerを動作させるためのプラグインを統合するツールを提供します。

### lynx-intlayer

`lynx-intlayer`パッケージは、LynxバンドラーでIntlayerを動作させるためのプラグインを統合するツールを提供します。

### vite-intlayer

Viteバンドラー([Vite](https://vite.dev/guide/why.html#why-bundle-for-production))とIntlayerを統合するためのViteプラグイン、およびユーザーの優先ロケールを検出し、クッキーを管理し、URLリダイレクトを処理するためのミドルウェアを含みます。

### react-scripts-intlayer

`react-scripts-intlayer`パッケージには、Create React AppベースのアプリケーションとIntlayerを統合するためのコマンドとプラグインが含まれています。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラーの追加設定も含まれています。

### intlayer-editor

`intlayer-editor`パッケージは、ビジュアルエディターの使用を可能にするために使用されます。このパッケージはオプションであり、アプリケーションにインストールして`react-intlayer`パッケージによって使用されます。
2つの部分で構成されています：サーバーとクライアント。

クライアントには、`react-intlayer`で使用されるUI要素が含まれています。

Expressに基づいたサーバーは、ビジュアルエディターのリクエストを受信し、コンテンツファイルを管理または変更するために使用されます。

### intlayer-cli

`intlayer-cli`パッケージは、`npx intlayer dictionaries build`コマンドを使用して辞書を生成するために使用できます。`intlayer`がすでにインストールされている場合、CLIは自動的にインストールされ、このパッケージは必要ありません。

### @intlayer/core

`@intlayer/core`パッケージは、Intlayerの主要なパッケージです。翻訳および辞書管理機能が含まれています。`@intlayer/core`はマルチプラットフォームであり、他のパッケージによって辞書の解釈を実行するために使用されます。

### @intlayer/config

`@intlayer/config`パッケージは、利用可能な言語、Next.jsミドルウェアパラメーター、または統合エディター設定など、Intlayerの設定を構成するために使用されます。

### @intlayer/webpack

`@intlayer/webpack`パッケージは、WebpackベースのアプリケーションをIntlayerと連携させるためのWebpack設定を提供します。このパッケージは、既存のWebpackアプリケーションに追加するプラグインも提供します。

### @intlayer/cli

`@intlayer/cli`パッケージは、Intlayerコマンドラインインターフェースに関連するスクリプトを宣言するために使用されるNPMパッケージです。すべてのIntlayer CLIコマンドの一貫性を確保します。このパッケージは特に、[intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ja/packages/intlayer-cli/index.md)や[intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ja/packages/intlayer/index.md)パッケージによって使用されます。

### @intlayer/mcp

`@intlayer/mcp`パッケージは、Intlayerエコシステム向けにAI搭載のIDE支援を提供するMCP（Model Context Protocol）サーバーを提供します。ドキュメントを自動的に読み込み、Intlayer CLIと統合されます。
`@intlayer/mcp`パッケージは、Intlayerエコシステムに特化したAI搭載のIDE支援を提供するMCP（Model Context Protocol）サーバーを提供します。ドキュメントを自動的に読み込み、Intlayer CLIと統合されます。

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

`@intlayer/dictionaries-entry`、`@intlayer/unmerged-dictionaries-entry`、および`@intlayer/dynamic-dictionaries-entry`パッケージは、Intlayer辞書のエントリパスを返します。ブラウザからファイルシステムを検索することは不可能なため、WebpackやRollupのようなバンドラーを使用して辞書のエントリパスを取得することはできません。これらのパッケージはエイリアスとして設計されており、Vite、Webpack、Turbopackなどのさまざまなバンドラーでのバンドル最適化を可能にします。

### @intlayer/chokidar

`@intlayer/chokidar`パッケージは、コンテンツファイルを監視し、変更があるたびに修正された辞書を再生成するために使用されます。

### @intlayer/editor

`@intlayer/editor`パッケージは、辞書エディターに関連するユーティリティを提供します。特に、アプリケーションとIntlayerエディターを連携させるためのAPIや、辞書を操作するためのユーティリティが含まれています。このパッケージはクロスプラットフォーム対応です。

### @intlayer/editor-react

`@intlayer/editor-react`パッケージは、ReactアプリケーションとIntlayerエディターを連携させるための状態、コンテキスト、フック、およびコンポーネントを提供します。

### @intlayer/babel

`@intlayer/babel`パッケージは、ViteおよびWebpackベースのアプリケーション向けに辞書のバンドルを最適化するツールを提供します。

### @intlayer/swc

`@intlayer/swc`パッケージは、Next.jsアプリケーション向けに辞書のバンドルを最適化するツールを提供します。

### @intlayer/api

`@intlayer/api`パッケージは、バックエンドとやり取りするためのAPI SDKです。

### @intlayer/design-system

`@intlayer/design-system`パッケージは、CMSとビジュアルエディター間でデザイン要素を共有するために使用されます。

### @intlayer/backend

`@intlayer/backend`パッケージは、バックエンドタイプをエクスポートし、将来的にはスタンドアロンパッケージとしてバックエンドを提供する予定です。

## スマートドキュメントとチャットする

- [スマートドキュメントに質問する](https://intlayer.org/doc/chat)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 初期履歴
