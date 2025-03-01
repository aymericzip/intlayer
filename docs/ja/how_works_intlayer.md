# Intlayerの仕組み

## 概要

Intlayerの役割は、JavaScriptのコンテンツ宣言ファイルを辞書に変換することです。

これを実現するために、Intlayerは以下のステップを経ます：

1. コンテンツファイルの宣言

   - コンテンツファイルは、TypeScript、ECMAScript、CommonJS、JSONなど、さまざまな形式で定義できます。
   - コンテンツファイルはプロジェクト内のどこにでも定義でき、これによりメンテナンス性と拡張性が向上します。コンテンツファイルの拡張子の規約を守ることが重要です。この拡張子はデフォルトで`*.content.{js|cjs|mjs|ts|tsx|json}`ですが、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で変更可能です。

2. 辞書の生成

   - 辞書はコンテンツファイルから生成されます。デフォルトでは、intlayer辞書はプロジェクトの`.intlayer/dictionary`ディレクトリに生成されます。
   - 生成される辞書には、intlayer辞書とi18n辞書（ベータ版）の2種類があります。

3. 辞書型の生成

   - 辞書型はintlayer辞書から生成されます。デフォルトでは、intlayer辞書型はプロジェクトの`types`ディレクトリに生成されます。

4. Intlayerモジュール拡張の生成

   - Intlayerの[モジュール拡張](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)は、Intlayerに追加の型を定義できるTypeScriptの機能です。これにより、利用可能な引数や必要な引数を提案することで開発体験が向上します。
     生成された型の中には、intlayer辞書型や言語設定型が含まれ、`types/intlayer.d.ts`ファイルに追加され、他のパッケージで使用されます。このためには、`tsconfig.json`ファイルがプロジェクトの`types`ディレクトリを含むように設定されている必要があります。

5. コンテンツファイルの監視

   - コンテンツファイルは、変更されるたびに再生成されるよう監視されます。

6. 辞書の解釈
   - 辞書は最終的に解釈され、アプリケーションで使用されます。

## パッケージ

Intlayerは、翻訳プロセスにおいて特定の役割を持つ複数のパッケージで構成されています。以下は、このパッケージの構造を示す図です：

![intlayerのパッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer`パッケージは、コンテンツファイル内でコンテンツを宣言するためにアプリケーションで使用されます。

### react-intlayer

`react-intlayer`パッケージは、intlayer辞書を解釈し、それをReactアプリケーションで利用可能にします。

### next-intlayer

`next-intlayer`パッケージは、`react-intlayer`の上にレイヤーとして機能し、Next.jsアプリケーションでintlayer辞書を利用可能にします。翻訳ミドルウェア、ルーティング、`next.config.js`ファイルの設定など、Next.js環境でIntlayerを動作させるための基本機能を統合しています。

### vite-intlayer

[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)との統合のためのViteプラグインを含み、ユーザーの優先ロケールの検出、クッキーの管理、URLリダイレクトの処理のためのミドルウェアも含まれています。

### react-scripts-intlayer

`react-scripts-intlayer`コマンドとプラグインを含み、Create React AppベースのアプリケーションとIntlayerを統合します。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラーの追加設定を含みます。

### intlayer-editor

`intlayer-editor`パッケージは、ビジュアルエディターを使用可能にするために使用されます。このパッケージはオプションで、アプリケーションにインストールでき、`react-intlayer`パッケージによって使用されます。
サーバーとクライアントの2つの部分で構成されています。

クライアントには、`react-intlayer`によって使用されるUI要素が含まれています。

サーバーはExpressに基づいており、エディタービジュアルリクエストを受信し、コンテンツファイルを管理または変更します。

### intlayer-cli

`intlayer-cli`パッケージは、`npx intlayer build`コマンドを使用して辞書を生成するために使用されます。`intlayer`がすでにインストールされている場合、CLIは自動的にインストールされ、このパッケージは不要です。

### @intlayer/core

`@intlayer/core`パッケージは、Intlayerのマスターパッケージです。翻訳と辞書管理機能を含みます。`@intlayer/core`はマルチプラットフォームであり、他のパッケージによって辞書の解釈を実行するために使用されます。

### @intlayer/config

`@intlayer/config`パッケージは、利用可能な言語、Next.jsミドルウェアのパラメータ、統合エディターの設定など、Intlayerの設定を構成するために使用されます。

### @intlayer/webpack

`@intlayer/webpack`パッケージは、WebpackベースのアプリケーションでIntlayerを動作させるためのWebpack設定を提供します。このパッケージは、既存のWebpackアプリケーションに追加するプラグインも提供します。

### @intlayer/cli

`@intlayer/cli`パッケージは、intlayerコマンドラインインターフェースに関連するスクリプトを宣言するために使用されるNPMパッケージです。すべてのintlayer CLIコマンドの一貫性を確保します。このパッケージは、[intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ja/packages/intlayer-cli/index.md)や[intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ja/packages/intlayer/index.md)パッケージによって消費されます。

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry`パッケージは、intlayer辞書のエントリパスのみを返すパッケージです。ブラウザからのファイルシステム検索は不可能であるため、WebpackやRollupのようなバンドラーを使用して辞書のエントリパスを取得することはできません。このパッケージはエイリアスとして使用されることを目的としています。

### @intlayer/chokidar

`@intlayer/chokidar`パッケージは、コンテンツファイルを監視し、各変更時に修正された辞書を再生成するために使用されます。

### @intlayer/editor

`@intlayer/editor`パッケージは、辞書エディターに関連するユーティリティを提供します。特に、アプリケーションをIntlayerエディターとインターフェースするためのAPIや、辞書を操作するためのユーティリティを含みます。このパッケージはクロスプラットフォームです。

### @intlayer/editor-react

`@intlayer/editor-react`パッケージは、ReactアプリケーションをIntlayerエディターとインターフェースするための状態、コンテキスト、フック、コンポーネントを提供します。

## スマートドキュメントとのチャット

- [スマートドキュメントに質問する](https://intlayer.org/ja/docs/chat)
