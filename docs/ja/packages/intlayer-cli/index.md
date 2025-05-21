# intlayer-cli: Intlayer CLIを使用するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージ群です。React、React、Express.jsなどのフレームワークと互換性があります。

**`intlayer-cli`**パッケージは、`@intlayer/cli`パッケージを利用し、`intlayer`コマンドラインインターフェースを利用可能にするNPMパッケージです。

> [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ja/packages/intlayer/index.md)パッケージがインストールされている場合、このパッケージは必要ありません。`intlayer`パッケージと比較して、`intlayer-cli`パッケージはCLIツールのみを含む軽量パッケージであり、`@intlayer/core`の依存関係は含まれていません。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールしてください:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## 使用方法

以下は`intlayer-cli`パッケージの使用例です:

```bash
npx intlayer dictionaries build
```

## CLIコマンド

Intlayerは以下のためのCLIツールを提供します:

- コンテンツ宣言を監査し、不足している翻訳を補完する
- コンテンツ宣言から辞書を構築する
- CMSからローカルプロジェクトへ、またはその逆にリモート辞書をプッシュおよびプルする

詳細については[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を参照してください。
