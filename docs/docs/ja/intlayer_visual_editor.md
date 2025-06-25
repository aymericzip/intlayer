---
docName: intlayer_visual_editor
url: https://intlayer.org/doc/concept/editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Intlayerビジュアルエディター | ビジュアルエディターを使用してコンテンツを編集します
description: Intlayerエディターを使用して多言語ウェブサイトを管理する方法を発見してください。このオンラインドキュメントの手順に従って、数分でプロジェクトを設定することができます。
keywords:
  - エディター
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer Visual Editor ドキュメント

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor は、ビジュアルエディタを使用してコンテンツ宣言ファイルと対話するためにウェブサイトをラップするツールです。

![Intlayer Visual Editor インターフェース](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

`intlayer-editor` パッケージは Intlayer に基づいており、React (Create React App)、Vite + React、Next.js などの JavaScript アプリケーションで利用可能です。

## ビジュアルエディタ vs CMS

Intlayer Visual Editor は、ローカル辞書のビジュアルエディタでコンテンツを管理できるツールです。変更が行われると、コンテンツはコードベース内で置き換えられます。つまり、アプリケーションが再構築され、ページがリロードされて新しいコンテンツが表示されます。

対照的に、[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) は、遠隔辞書のビジュアルエディタでコンテンツを管理できるツールです。変更が行われても、コードベースには影響を与えません。そして、ウェブサイトは自動的に変更されたコンテンツを表示します。

## アプリケーションへの Intlayer の統合

Intlayer の統合方法についての詳細は、以下の関連セクションを参照してください:

### Next.js との統合

Next.js との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md) を参照してください。

### Create React App との統合

Create React App との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md) を参照してください。

### Vite + React との統合

Vite + React との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md) を参照してください。

## Intlayer Editor の仕組み

アプリケーション内のビジュアルエディタには以下の2つの要素が含まれます:

- ウェブサイトを iframe に表示するフロントエンドアプリケーション。ウェブサイトが Intlayer を使用している場合、ビジュアルエディタは自動的にコンテンツを検出し、対話できるようにします。変更が行われると、変更をダウンロードすることができます。

- ダウンロードボタンをクリックすると、ビジュアルエディタはサーバーにリクエストを送信し、プロジェクト内で宣言されている場所に新しいコンテンツでコンテンツ宣言ファイルを置き換えます。

> 現時点では、Intlayer Editor はコンテンツ宣言ファイルを JSON ファイルとして書き込みます。

## インストール

プロジェクトで Intlayer が設定されたら、`intlayer-editor` を開発依存関係としてインストールしてください:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## 設定

Intlayer 設定ファイルで、エディタの設定をカスタマイズできます:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    /**
     * 必須
     * アプリケーションの URL。
     * これはビジュアルエディタがターゲットとする URL です。
     * 例: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 任意
     * デフォルトは `true`。`false` の場合、エディタは無効化されアクセスできません。
     * 本番環境などのセキュリティ上の理由でエディタを無効化する場合に使用します。
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * 任意
     * デフォルトは `8000`。
     * エディタサーバーのポート。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 任意
     * デフォルトは "http://localhost:8000"
     * エディタサーバーの URL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
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
     * アプリケーションの URL。
     * これはビジュアルエディタがターゲットとする URL です。
     * 例: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 任意
     * デフォルトは `true`。`false` の場合、エディタは無効化されアクセスできません。
     * 本番環境などのセキュリティ上の理由でエディタを無効化する場合に使用します。
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * 任意
     * デフォルトは `8000`。
     * ビジュアルエディタサーバーが使用するポート。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 任意
     * デフォルトは "http://localhost:8000"
     * アプリケーションから到達可能なエディタサーバーの URL。
     * セキュリティ上の理由でアプリケーションと対話できるオリジンを制限するために使用します。
     * `'*'` に設定すると、エディタはすべてのオリジンからアクセス可能です。
     * ポートが変更された場合や、エディタが異なるドメインにホストされている場合に設定する必要があります。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
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
     * アプリケーションの URL。
     * これはビジュアルエディタがターゲットとする URL です。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * 任意
     * デフォルトは `8000`。
     * エディタサーバーのポート。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * 任意
     * デフォルトは "http://localhost:8000"
     * エディタサーバーの URL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * 任意
     * デフォルトは `true`。`false` の場合、エディタは無効化されアクセスできません。
     * 本番環境などのセキュリティ上の理由でエディタを無効化する場合に使用します。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> 利用可能なすべてのパラメータについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) を参照してください。

## エディタの使用方法

1. エディタがインストールされたら、次のコマンドを使用してエディタを開始できます:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **アプリケーションを並行して実行する必要があります。** アプリケーション URL はエディタ設定 (`applicationURL`) に設定したものと一致する必要があります。

2. 提供された URL を開きます。デフォルトは `http://localhost:8000` です。

   Intlayer によってインデックス付けされた各フィールドを、カーソルでコンテンツ上をホバーすることで表示できます。

   ![コンテンツ上をホバー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. コンテンツがアウトライン表示されている場合、長押しして編集ドロワーを表示できます。

## デバッグ

ビジュアルエディタに問題がある場合は、以下を確認してください:

- ビジュアルエディタとアプリケーションが実行中である。

- Intlayer 設定ファイルで [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) 設定が正しく設定されている。

  - 必須フィールド:
    - アプリケーション URL はエディタ設定 (`applicationURL`) に設定したものと一致する必要があります。

- ビジュアルエディタは iframe を使用してウェブサイトを表示します。ウェブサイトのコンテンツセキュリティポリシー (CSP) が `frame-ancestors` として CMS URL を許可していることを確認してください (デフォルトは 'http://localhost:8000')。エディタコンソールでエラーを確認してください。
