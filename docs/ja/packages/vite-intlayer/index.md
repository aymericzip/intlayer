# vite-intlayer: NPMパッケージでViteアプリケーションを国際化する (i18n)

**Intlayer**は、特にJavaScript開発者のために設計されたパッケージのスイートです。React、React、およびExpress.jsなどのフレームワークと互換性があります。

**`vite-intlayer`パッケージ**は、Viteアプリケーションを国際化するためのものです。それは、環境変数を介して設定を[Viteバンドラー](https://vitejs.dev/guide/why.html#why-bundle-for-production)に設定するためのViteプラグインを含みます。また、ユーザーの優先ロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で指定された適切なURLにリダイレクトするためのミドルウェアも提供します。

## なぜViteアプリケーションを国際化するのか？

Viteアプリケーションを国際化することは、グローバルなオーディエンスに効果的にサービスを提供するために不可欠です。これにより、ユーザーごとの好ましい言語でコンテンツやメッセージを配信できます。この機能はユーザー体験を向上させ、異なる言語的背景を持つ人々にとってアプリケーションがよりアクセス可能で関連性のあるものにすることによって、アプリケーションのリーチを広げます。

## 設定

`vite-intlayer`パッケージは、[`react-intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md)および[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md)とシームレスに動作します。詳細については関連するドキュメントを確認してください。

## インストール

お好みのパッケージマネージャを使用して必要なパッケージをインストールします：

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## 使用例

Vite設定にプラグインを含める方法の例を見てみましょう。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Viteプラグインは、IntlayerをViteに統合するために使用されます。これは、コンテンツ宣言ファイルのビルドを確保し、開発モードでそれらを監視します。Viteアプリケーション内にIntlayer環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

> `intLayerMiddlewarePlugin()`は、アプリケーションにサーバーサイドのルーティングを追加します。このプラグインは、URLに基づいて現在のロケールを自動的に検出し、適切なロケールクッキーを設定します。ロケールが指定されていない場合、プラグインはユーザーのブラウザ言語の設定に基づいて最も適切なロケールを決定します。ロケールが検出されない場合、デフォルトのロケールにリダイレクトされます。

## Viteアプリケーションの国際化を習得する

Intlayerは、Viteアプリケーションの国際化を支援するための多くの機能を提供します。

**これらの機能について詳しくは、ViteおよびReactアプリケーションのための[React国際化 (i18n) とIntlayerおよびVite](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)ガイドを参照してください。**
