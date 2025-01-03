# Intlayerの動作

## 概要

Intlayerの役割は、JavaScriptコンテンツ宣言ファイルを辞書に変換することです。

これを行うために、Intlayerはいくつかのステップを経ます。

1. コンテンツファイルの宣言

   - コンテンツファイルはTypeScript、ECMAScript、CommonJS、またはJSONなどのさまざまな形式で定義できます。
   - コンテンツファイルはプロジェクトのどこにでも定義できるため、メンテナンス性とスケーラビリティが向上します。コンテンツファイルのファイル拡張子の規約を守ることが重要です。この拡張子はデフォルトで `*.content.{js|cjs|mjs|ts|tsx|json}` ですが、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で変更できます。

2. 辞書の生成

   - 辞書はコンテンツファイルから生成されます。デフォルトでは、intlayerの辞書はプロジェクトの `.intlayer/dictionary` ディレクトリに生成されます。
   - 生成できる辞書には、intlayer辞書とi18n辞書（ベータ版）の2種類があります。

3. 辞書タイプの生成

   - 辞書タイプはintlayer辞書から生成されます。デフォルトでは、intlayer辞書タイプはプロジェクトの `types` ディレクトリに生成されます。

4. Intlayerモジュール拡張の生成

   - Intlayerの[モジュール拡張](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)はTypeScriptの機能で、Intlayerのために追加の型を定義することができます。これにより、利用可能な引数や必須引数を提案することで、開発体験が向上します。
     生成された型の中には、intlayer辞書タイプや言語設定タイプが `types/intlayer.d.ts` ファイルに追加され、他のパッケージで使用されます。これを行うためには、 `tsconfig.json` ファイルを設定して、プロジェクトの `types` ディレクトリを含める必要があります。

5. コンテンツファイルの監視

   - コンテンツファイルは、変更されるたびに再生成されるように監視されます。

6. 辞書の解釈
   - 辞書は最終的に解釈され、アプリケーションで使用されます。

## パッケージ

Intlayerは、翻訳プロセスに特定の役割を持ついくつかのパッケージで構成されています。このパッケージの構造のグラフィカルな表現は次のとおりです：

![intlayerのパッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer`パッケージは、アプリケーションでコンテンツファイルにコンテンツを宣言するために使用されます。

### react-intlayer

`react-intlayer`パッケージは、intlayer辞書を解釈し、Reactアプリケーションで使用できるようにするために使用されます。

### next-intlayer

`next-intlayer`パッケージは、`react-intlayer`の上にレイヤーとして使用され、Next.jsアプリケーションでintlayer辞書を使用できるようにします。翻訳ミドルウェア、ルーティング、または `next.config.js`ファイルの設定など、Next.js環境でIntlayerが機能するために必要な機能を統合しています。

### intlayer-editor

`intlayer-editor`パッケージは、ビジュアルエディタを使用するために使用されます。このパッケージはオプションで、アプリケーションにインストールでき、`react-intlayer`パッケージによって使用されます。
サーバーとクライアントの2つの部分で構成されています。

クライアントは `react-intlayer` によって使用されるUI要素を含みます。

サーバーはExpressに基づいており、エディタの視覚リクエストを受信し、コンテンツファイルを管理または変更するために使用されます。

### intlayer-cli

`intlayer-cli`パッケージは、 `npx intlayer build`コマンドを使用して辞書を生成するために使用できます。 `intlayer`がすでにインストールされている場合、CLIは自動的にインストールされ、このパッケージは必要ありません。

### @intlayer/core

`@intlayer/core`パッケージは、マスタIntlayerパッケージです。翻訳や辞書管理機能を含みます。 `@intlayer/core`はマルチプラットフォームであり、他のパッケージによって辞書の解釈を行うために使用されます。

### @intlayer/config

`@intlayer/config`パッケージは、利用可能な言語、Next.jsミドルウェアパラメータ、または統合エディタ設定など、Intlayerの設定を構成するために使用されます。

### @intlayer/webpack

`@intlayer/webpack`パッケージは、Next.jsおよびReactにコンパイルプラグインを追加するために使用されます。

### @intlayer/cli

`@intlayer/cli`パッケージは、すべてのintlayer CLIコマンドの一貫性を確保するために使用されます。

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry`パッケージは、intlayer辞書のエントリパスのみを返すパッケージです。ブラウザからファイルシステム検索が不可能なため、WebpackやRollupのようなバンドラーを使用して辞書のエントリパスを取得することは不可能です。このパッケージはエイリアスとして使用されることを目的としています。

### @intlayer/chokidar

`@intlayer/chokidar`パッケージは、コンテンツファイルを監視し、各変更時に修正された辞書を再生成するために使用されます。
