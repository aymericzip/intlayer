# Intlayer コンテンツ管理システム (CMS) ドキュメント

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS は、Intlayer プロジェクトのコンテンツを外部化することを可能にするアプリケーションです。

このために、Intlayer は「遠隔辞書」の概念を導入します。

![Intlayer CMS インターフェース](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## 遠隔辞書の理解

Intlayer は「ローカル辞書」と「遠隔辞書」を区別します。

- 「ローカル辞書」は、Intlayer プロジェクト内で宣言される辞書です。ボタンやナビゲーションバーの宣言ファイルなどが該当します。この場合、コンテンツを外部化する意味はあまりありません。なぜなら、このコンテンツは頻繁に変更されることが想定されていないからです。

- 「遠隔辞書」は、Intlayer CMS を通じて管理される辞書です。これにより、チームがウェブサイト上で直接コンテンツを管理できるようになり、A/B テスト機能や SEO 自動最適化を使用することも目的としています。

## ビジュアルエディタ vs CMS

[Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md) エディタは、ローカル辞書のコンテンツをビジュアルエディタで管理するためのツールです。変更が行われると、コンテンツはコードベースに置き換えられます。つまり、アプリケーションが再構築され、新しいコンテンツを表示するためにページがリロードされます。

対照的に、Intlayer CMS は遠隔辞書のコンテンツをビジュアルエディタで管理するためのツールです。変更が行われても、コードベースには影響を与えません。そして、ウェブサイトは自動的に変更されたコンテンツを表示します。

## 統合

パッケージのインストール方法についての詳細は、以下の関連セクションを参照してください。

### Next.js との統合

Next.js との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Create React App との統合

Create React App との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Vite + React との統合

Vite + React との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)を参照してください。

## 設定

Intlayer 設定ファイル内で、CMS 設定をカスタマイズできます。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    /**
     * 必須
     *
     * アプリケーションの URL。
     * これはビジュアルエディタがターゲットとする URL です。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必須
     *
     * クライアント ID とクライアントシークレットはエディタを有効にするために必要です。
     * これらはコンテンツを編集しているユーザーを識別するために使用されます。
     * Intlayer ダッシュボード - プロジェクト (https://intlayer.org/dashboard/projects) で新しいクライアントを作成することで取得できます。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 任意
     *
     * Intlayer CMS をセルフホストする場合、CMS の URL を設定できます。
     *
     * Intlayer CMS の URL。
     * デフォルトでは https://intlayer.org に設定されています。
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 任意
     *
     * Intlayer CMS をセルフホストする場合、バックエンドの URL を設定できます。
     *
     * Intlayer CMS の URL。
     * デフォルトでは https://back.intlayer.org に設定されています。
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の設定
  editor: {
    /**
     * 必須
     *
     * アプリケーションの URL。
     * これはビジュアルエディタがターゲットとする URL です。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必須
     *
     * クライアント ID とクライアントシークレットはエディタを有効にするために必要です。
     * これらはコンテンツを編集しているユーザーを識別するために使用されます。
     * Intlayer ダッシュボード - プロジェクト (https://intlayer.org/dashboard/projects) で新しいクライアントを作成することで取得できます。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 任意
     *
     * Intlayer CMS をセルフホストする場合、CMS の URL を設定できます。
     *
     * Intlayer CMS の URL。
     * デフォルトでは https://intlayer.org に設定されています。
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 任意
     *
     * Intlayer CMS をセルフホストする場合、バックエンドの URL を設定できます。
     *
     * Intlayer CMS の URL。
     * デフォルトでは https://back.intlayer.org に設定されています。
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の設定
  editor: {
    /**
     * 必須
     *
     * アプリケーションの URL。
     * これはビジュアルエディタがターゲットとする URL です。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * 必須
     *
     * クライアント ID とクライアントシークレットはエディタを有効にするために必要です。
     * これらはコンテンツを編集しているユーザーを識別するために使用されます。
     * Intlayer ダッシュボード - プロジェクト (https://intlayer.org/dashboard/projects) で新しいクライアントを作成することで取得できます。
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 任意
     *
     * Intlayer CMS をセルフホストする場合、CMS の URL を設定できます。
     *
     * Intlayer CMS の URL。
     * デフォルトでは https://intlayer.org に設定されています。
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * 任意
     *
     * Intlayer CMS をセルフホストする場合、バックエンドの URL を設定できます。
     *
     * Intlayer CMS の URL。
     * デフォルトでは https://back.intlayer.org に設定されています。
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> クライアント ID とクライアントシークレットをお持ちでない場合は、[Intlayer ダッシュボード - プロジェクト](https://intlayer.org/dashboard/projects)で新しいクライアントを作成することで取得できます。

> 利用可能なすべてのパラメータについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

## CMS の使用

### 設定をプッシュする

Intlayer CMS を設定するには、[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ja/intlayer_cli.md) コマンドを使用します。

```bash
npx intlayer config push
```

> `intlayer.config.ts` 設定ファイルで環境変数を使用している場合は、`--env` 引数を使用して目的の環境を指定できます。

```bash
npx intlayer config push --env production
```

このコマンドは、設定を Intlayer CMS にアップロードします。

### 辞書をプッシュする

ローカル辞書を遠隔辞書に変換するには、[intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ja/intlayer_cli.md) コマンドを使用します。

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> `intlayer.config.ts` 設定ファイルで環境変数を使用している場合は、`--env` 引数を使用して目的の環境を指定できます。

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

このコマンドは、初期コンテンツ辞書をアップロードし、非同期フェッチおよび Intlayer プラットフォームを通じた編集が可能になります。

### 辞書を編集する

その後、[Intlayer CMS](https://intlayer.org/dashboard/content) で辞書を確認および管理できるようになります。

## ホットリロード

Intlayer CMS は、変更が検出された場合に辞書をホットリロードすることができます。

ホットリロードがない場合、新しいコンテンツを表示するにはアプリケーションの新しいビルドが必要です。

[`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration) 設定を有効にすると、変更が検出された際にアプリケーションは自動的に更新されたコンテンツを置き換えます。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    // ... 他の設定

    /**
     * ロケール設定が変更された場合にアプリケーションがホットリロードを行うかどうかを示します。
     * 例えば、新しい辞書が追加または更新された場合、アプリケーションはページに表示するコンテンツを更新します。
     *
     * ホットリロードにはサーバーへの継続的な接続が必要なため、`enterprise` プランのクライアントのみ利用可能です。
     *
     * デフォルト: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の設定
  editor: {
    // ... 他の設定

    /**
     * ロケール設定が変更された場合にアプリケーションがホットリロードを行うかどうかを示します。
     * 例えば、新しい辞書が追加または更新された場合、アプリケーションはページに表示するコンテンツを更新します。
     *
     * ホットリロードにはサーバーへの継続的な接続が必要なため、`enterprise` プランのクライアントのみ利用可能です。
     *
     * デフォルト: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の設定
  editor: {
    // ... 他の設定

    /**
     * ロケール設定が変更された場合にアプリケーションがホットリロードを行うかどうかを示します。
     * 例えば、新しい辞書が追加または更新された場合、アプリケーションはページに表示するコンテンツを更新します。
     *
     * ホットリロードにはサーバーへの継続的な接続が必要なため、`enterprise` プランのクライアントのみ利用可能です。
     *
     * デフォルト: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

ホットリロードは、サーバーサイドとクライアントサイドの両方でコンテンツを置き換えます。

- サーバーサイドでは、アプリケーションプロセスが `.intlayer/dictionaries` ディレクトリへの書き込みアクセス権を持っていることを確認してください。
- クライアントサイドでは、ホットリロードによりページをリロードすることなくブラウザ内でコンテンツをホットリロードできます。ただし、この機能はクライアントコンポーネントでのみ利用可能です。

> ホットリロードには `EventListener` を使用したサーバーへの継続的な接続が必要なため、`enterprise` プランのクライアントのみ利用可能です。

## デバッグ

CMS に問題が発生した場合、以下を確認してください。

- アプリケーションが実行中であること。

- Intlayer 設定ファイルで [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 設定が正しく設定されていること。

  - 必須フィールド:
    - アプリケーション URL がエディタ設定 (`applicationURL`) に設定したものと一致していること。
    - CMS URL

- プロジェクト設定が Intlayer CMS にプッシュされていることを確認してください。

- ビジュアルエディタは iframe を使用してウェブサイトを表示します。ウェブサイトのコンテンツセキュリティポリシー (CSP) が `frame-ancestors` として CMS URL ('https://intlayer.org' がデフォルト) を許可していることを確認してください。エディタコンソールでエラーを確認してください。
