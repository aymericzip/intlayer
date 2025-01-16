# intlayer-cli: Intlayer CLIを使用するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージのスイートです。React、React、Express.jsなどのフレームワークと互換性があります。

**`intlayer-cli`**パッケージは、`@intlayer/cli`パッケージを消費し、`intlayer`コマンドラインインターフェースで使用可能にするNPMパッケージです。

> このパッケージは、[`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md)パッケージがインストールされている場合は必要ありません。`intlayer`パッケージに比べて、`intlayer-cli`パッケージはCLIツールのみを含む軽量パッケージで、`@intlayer/core`の依存関係は含まれていません。

## インストール

好みのパッケージマネージャーを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## 使用法

`intlayer-cli`パッケージの使用例は以下の通りです：

```bash
npx intlayer build
```

## CLIコマンド

Intlayerは以下を行うためのCLIツールを提供します：

- コンテンツ宣言を監査し、不足している翻訳を補完する
- コンテンツ宣言から辞書を構築する
- CMSからローカルプロジェクトに遠隔辞書をプッシュおよびプルする

詳細については、[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を参照してください。
