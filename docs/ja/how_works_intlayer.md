# Intlayerの仕組み

## 概要

Intlayerの役割は、JavaScriptのコンテンツ宣言ファイルを辞書に解釈することです。

これには、Intlayerは次のいくつかのステップを経ます：

1. コンテンツファイルの宣言

   - コンテンツファイルは、TypeScript、ECMAScript、CommonJS、またはJSONのようなさまざまな形式で定義できます。
   - コンテンツファイルはプロジェクト内のどこにでも定義できるため、メンテナンス性とスケーラビリティが向上します。コンテンツファイルのファイル拡張子規則を尊重することが重要です。この拡張子はデフォルトで`*.content.{js|cjs|mjs|ts|tsx|json}`ですが、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で変更できます。

2. 辞書の生成

   - 辞書はコンテンツファイルから生成されます。デフォルトでは、intlayerの辞書はプロジェクトの`.intlayer/dictionary`ディレクトリに生成されます。
   - 生成できる辞書には2種類あります：intlayer辞書とi18n辞書（ベータ）。

3. 辞書タイプの生成

   - 辞書タイプはintlayer辞書から生成されます。デフォルトでは、intlayer辞書のタイプはプロジェクトの`types`ディレクトリに生成されます。

4. Intlayerモジュールの拡張の生成

   - Intlayerの[モジュール拡張](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)は、Intlayerの追加タイプを定義するためのTypeScriptの機能です。これにより、利用可能な引数や必須引数を提案することで開発体験が向上します。
     生成されたタイプの中で、intlayer辞書タイプや言語構成タイプが`types/intlayer.d.ts`ファイルに追加され、他のパッケージで使用されます。これを実現するためには、`tsconfig.json`ファイルがプロジェクトの`types`ディレクトリを含むように設定されている必要があります。

5. コンテンツファイルの監視

   - コンテンツファイルは、変更されるたびに再生成されるように監視されます。

6. 辞書の解釈
   - 辞書は最終的に解釈され、アプリケーションで使用されます。

## パッケージ

Intlayerは、翻訳プロセスにおいて特定の役割を持ついくつかのパッケージで構成されています。以下は、このパッケージの構造を示すグラフィカルな表現です：

![packages of intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer`パッケージは、アプリケーション内でコンテンツファイルにコンテンツを宣言するために使用されます。

### react-intlayer

`react-intlayer`パッケージは、intlayer辞書を解釈し、Reactアプリケーションで使用できるようにするために使用されます。

### next-intlayer

`next-intlayer`パッケージは、`react-intlayer`の上にレイヤーとして使用され、Next.jsアプリケーションでintlayer辞書を使用できるようにします。翻訳ミドルウェア、ルーティング、または`next.config.js`ファイルの設定など、Next.js環境でIntlayerを機能させるための基本的な機能を統合しています。

### vite-intlayer

ViteバンドラとのIntlayer統合のためのViteプラグインを含み、ユーザーの好ましいロケールの検出、クッキーの管理、およびURLリダイレクションの処理のためのミドルウェアを含みます。

### react-scripts-intlayer

Create React Appに基づくアプリケーションとのIntlayer統合のための`react-scripts-intlayer`コマンドとプラグインを含みます。これらのプラグインは[craco](https://craco.js.org/)に基づいており、[Webpack](https://webpack.js.org/)バンドラの追加設定が含まれています。

### intlayer-editor

`intlayer-editor`パッケージは、視覚エディタを使用できるようにするために使用されます。このパッケージは、アプリケーションにインストールされるオプションであり、`react-intlayer`パッケージによって使用されます。
サーバーとクライアントの2つの部分で構成されています。

クライアントは、`react-intlayer`によって使用されるUI要素を含みます。

サーバーはExpressに基づいており、エディタの視覚リクエストを受信し、コンテンツファイルを管理または修正するために使用されます。

### intlayer-cli

`intlayer-cli`パッケージは、`npx intlayer build`コマンドを使用して辞書を生成するために使用できます。`intlayer`がすでにインストールされている場合、cliは自動的にインストールされ、このパッケージは必要ありません。

### @intlayer/core

`@intlayer/core`パッケージは、主なIntlayerパッケージです。翻訳と辞書管理機能を含みます。`@intlayer/core`はマルチプラットフォームであり、辞書の解釈を実行するために他のパッケージに使用されます。

### @intlayer/config

`@intlayer/config`パッケージは、利用可能な言語、Next.jsミドルウェアのパラメーター、または統合されたエディタ設定など、Intlayer設定を構成するために使用されます。

### @intlayer/webpack

`@intlayer/webpack`パッケージは、Intlayerを使ったWebpackベースのアプリケーションを作業するためのWebpack設定を提供します。このパッケージは、既存のWebpackアプリケーションに追加するためのプラグインも提供します。

### @intlayer/cli

`@intlayer/cli`パッケージは、intlayerコマンドラインインターフェースに関連するスクリプトを宣言するために使用されるNPMパッケージです。すべてのintlayer CLIコマンドの一貫性を確保します。このパッケージは特に[intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ja/packages/intlayer-cli/index.md)や[intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ja/packages/intlayer/index.md)パッケージによって使用されます。

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry`パッケージは、intlayer辞書のエントリパスのみを返すパッケージです。ファイルシステム検索はブラウザからは不可能なので、Webバンドラ（WebpackやRollupなど）を使用して辞書のエントリパスを取得することはできません。このパッケージはエイリアスを付けることを目的としています。

### @intlayer/chokidar

`@intlayer/chokidar`パッケージは、コンテンツファイルを監視し、各変更ごとに変更された辞書を再生成するために使用されます。

## 私たちのスマートなドキュメントとチャット

- [私たちのスマートなドキュメントに質問してください](https://intlayer.org/docs/chat)
