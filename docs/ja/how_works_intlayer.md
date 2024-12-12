# Intlayerの動作

## 概要

Intlayerの役割は、JavaScriptコンテンツ宣言ファイルを辞書に解釈することです。

これには、Intlayerはいくつかのステップを経て行います：

1. コンテンツファイルの宣言

   - コンテンツファイルは、TypeScript、ECMAScript、CommonJS、またはJSONなど、さまざまな形式で定義できます。
   - コンテンツファイルはプロジェクトのどこにでも定義できるため、より良いメンテナンスとスケーラビリティが可能です。コンテンツファイルのファイル拡張子の規則を尊重することが重要です。この拡張子はデフォルトで `*.content.{js|cjs|mjs|ts|tsx|json}` ですが、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で変更することができます。

2. 辞書の生成

   - 辞書はコンテンツファイルから生成されます。デフォルトでは、intlayer辞書はプロジェクトの `.intlayer/dictionary` ディレクトリに生成されます。
   - 生成できる辞書のタイプは2つあります：intlayer辞書とi18n辞書（ベータ版）です。

3. 辞書タイプの生成

   - 辞書タイプはintlayer辞書から生成されます。デフォルトでは、intlayer辞書タイプはプロジェクトの `.intlayer/types` ディレクトリに生成されます。

4. Intlayerモジュールの拡張生成

   - Intlayerの[モジュール拡張](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)は、Intlayerの追加タイプを定義できるTypeScriptの機能です。これにより、利用可能な引数や必須引数を提案することで、開発体験が向上します。
     生成されたタイプの中には、intlayer辞書タイプや言語構成タイプが `types/intlayer.d.ts` ファイルに追加され、他のパッケージによって使用されます。これを行うには、`tsconfig.json` ファイルがプロジェクトの `.intlayer/types` ディレクトリを含むように設定されている必要があります。

5. コンテンツファイルの監視

   - コンテンツファイルは、変更されるたびに再生成されるように監視されます。

6. 辞書の解釈
   - 最終的に辞書は解釈され、アプリケーションで使用されます。

## パッケージ

Intlayerは、翻訳プロセスで特定の役割を持ついくつかのパッケージで構成されています。以下に、このパッケージの構造のグラフィカルな表現を示します：

![intlayerのパッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` パッケージは、アプリケーションでコンテンツファイルにコンテンツを宣言するために使用されます。

### react-intlayer

`react-intlayer` パッケージは、intlayer辞書を解釈し、Reactアプリケーションで使用可能にするために使用されます。

### next-intlayer

`next-intlayer` パッケージは、`react-intlayer` の上にレイヤーとして使用され、Next.jsアプリケーションでintlayer辞書を使用可能にします。翻訳ミドルウェア、ルーティング、または `next.config.js` ファイルの設定など、Next.js環境でIntlayerが機能するために必要な機能を統合します。

### intlayer-editor

`intlayer-editor` パッケージは、ビジュアルエディタの使用を可能にします。このパッケージはオプショナルで、アプリケーションにインストール可能で、`react-intlayer` パッケージによって使用されます。
サーバーとクライアントの2つの部分から構成されています。

クライアントには、`react-intlayer` によって使用されるUI要素が含まれています。

サーバーはExpressに基づいており、エディタのビジュアルリクエストを受信し、コンテンツファイルを管理または変更します。

### intlayer-cli

`intlayer-cli` パッケージは、`npx intlayer build` コマンドを使用して辞書を生成するために使用されます。 `intlayer` がすでにインストールされている場合、cliは自動的にインストールされ、このパッケージは必要ありません。

### @intlayer/core

`@intlayer/core` パッケージは、マスターIntlayerパッケージです。翻訳および辞書管理機能を含みます。`@intlayer/core`はマルチプラットフォームであり、辞書の解釈を行うために他のパッケージによって使用されます。

### @intlayer/config

`@intlayer/config` パッケージは、利用可能な言語、Next.jsミドルウェアパラメータ、または統合編集者設定など、Intlayer設定を構成するために使用されます。

### @intlayer/webpack

`@intlayer/webpack` パッケージは、Next.jsおよびReactにコンパイルプラグインを追加するために使用されます。

### @intlayer/cli

`@intlayer/cli` パッケージは、すべてのintlayer CLIコマンドの一貫性を確保するために使用されます。

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry` パッケージは、intlayer辞書のエントリーパスのみを返すパッケージです。ブラウザからのファイルシステム検索は不可能なため、WebpackやRollupなどのバンドラーを使用して辞書のエントリーパスを取得することはできません。このパッケージはエイリアスされることを目的としています。

### @intlayer/chokidar

`@intlayer/chokidar` パッケージは、コンテンツファイルを監視し、各変更時に修正された辞書を再生成するために使用されます。
