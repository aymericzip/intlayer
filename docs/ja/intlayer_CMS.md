# Intlayer コンテンツ管理システム (CMS) ドキュメント

Intlayer CMS は、Intlayer プロジェクトのコンテンツを外部化するアプリケーションです。

そのために、Intlayer は「遠隔辞書」という概念を導入しています。

## 遠隔辞書の理解

Intlayer は「ローカル辞書」と「遠隔辞書」を区別します。

- 「ローカル辞書」とは、あなたの Intlayer プロジェクトで宣言された辞書のことです。ボタンの宣言ファイルやナビゲーションバーなどが含まれます。この場合、コンテンツを外部化することは意味がありません。なぜなら、このコンテンツは頻繁に変更されるべきではないからです。

- 「遠隔辞書」とは、Intlayer CMS によって管理される辞書です。これにより、チームが直接ウェブサイト上でコンテンツを管理できるようになり、A/B テスト機能や SEO 自動最適化を活用することも目指しています。

## ビジュアルエディタ vs CMS

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md) エディタは、ローカル辞書用のビジュアルエディタでコンテンツを管理するためのツールです。変更が加えられると、コンテンツはコードベース内で置き換えられます。つまり、アプリケーションは再構築され、ページは新しいコンテンツを表示するために再読み込みされます。

それに対し、Intlayer CMS は、遠隔辞書用のビジュアルエディタでコンテンツを管理するためのツールです。変更が加えられても、コンテンツは**コードベースに**影響を与えません。そして、ウェブサイトは自動的に変更されたコンテンツを表示します。

## 統合

パッケージのインストール方法の詳細については、以下の関連セクションを参照してください。

### Next.js との統合

Next.js との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Create React App との統合

Create React App との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Vite + React との統合

Vite + React との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)を参照してください。

## 設定

### 1. intlayer.config.ts ファイルでエディタを有効にする

Intlayer 設定ファイルでは、エディタの設定をカスタマイズできます：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    /**
     * クライアント ID とクライアントシークレットは、エディタを有効にするために必要です。
     * これにより、コンテンツを編集しているユーザーを識別できます。
     * 新しいクライアントを Intlayer ダッシュボード - プロジェクトで作成することで取得できます (https://intlayer.org/dashboard/projects)。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * オプション
     * デフォルトは `true`です。`false`のとき、エディタは非アクティブでアクセスできません。
     * セキュリティ上の理由から、特定の環境（例：本番環境）でエディタを無効にするために使用できます。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の設定
  editor: {
    /**
     * クライアント ID とクライアントシークレットは、エディタを有効にするために必要です。
     * これにより、コンテンツを編集しているユーザーを識別できます。
     * 新しいクライアントを Intlayer ダッシュボード - プロジェクトで作成することで取得できます (https://intlayer.org/dashboard/projects)。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * オプション
     * デフォルトは `true`です。`false`のとき、エディタは非アクティブでアクセスできません。
     * セキュリティ上の理由から、特定の環境（例：本番環境）でエディタを無効にするために使用できます。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の設定
  editor: {
    /**
     * クライアント ID とクライアントシークレットは、エディタを有効にするために必要です。
     * これにより、コンテンツを編集しているユーザーを識別できます。
     * 新しいクライアントを Intlayer ダッシュボード - プロジェクトで作成することで取得できます (https://intlayer.org/dashboard/projects)。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * オプション
     * デフォルトは `true`です。`false`のとき、エディタは非アクティブでアクセスできません。
     * セキュリティ上の理由から、特定の環境（例：本番環境）でエディタを無効にするために使用できます。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> クライアント ID とクライアントシークレットがない場合は、[Intlayer ダッシュボード - プロジェクト](https://intlayer.org/dashboard/projects)で新しいクライアントを作成することで取得できます。

> すべての利用可能なパラメータを確認するには、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

## CMS の使用

エディタがインストールされると、カーソルを使ってコンテンツにカーソルを合わせることで、Intlayer によってインデックス付けされた各フィールドを表示できます。

![コンテンツにカーソルを合わせる](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

コンテンツがアウトラインされている場合は、長押しすることで編集ドロワーを表示できます。
