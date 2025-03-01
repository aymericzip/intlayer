# @intlayer/webpack: アプリケーションで Intlayer Webpack プラグインを使用するための NPM パッケージ

**Intlayer** は、JavaScript 開発者向けに特別に設計されたパッケージ群です。React、Next.js、Express.js などのフレームワークと互換性があります。

**`@intlayer/webpack`** パッケージは、Intlayer を使用した Webpack ベースのアプリケーションを簡単に構成するための Webpack 設定を提供します。このパッケージは、既存の Webpack アプリケーションに追加できるプラグインも提供します。

## 使用方法

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // オプション
    }),
  ],
};
```

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールしてください:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
