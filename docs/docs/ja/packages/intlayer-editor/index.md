---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - ビジュアル翻訳エディターパッケージ
description: Intlayer向けのビジュアルエディターパッケージで、翻訳管理とAI支援による共同コンテンツ編集の直感的なインターフェースを提供します。
keywords:
  - intlayer
  - editor
  - visual
  - translation
  - collaborative
  - AI
  - NPM
  - interface
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor: Intlayerビジュアルエディターを使用するためのNPMパッケージ

**Intlayer**はJavaScript開発者向けに特化して設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`intlayer-editor`** パッケージは、IntlayerのビジュアルエディターをReactプロジェクトに統合するためのNPMパッケージです。

## Intlayerエディターの仕組み

intlayerエディターはIntlayerの遠隔辞書と連携することができます。クライアント側にインストール可能で、アプリケーションをCMSのようなエディターに変換し、設定されたすべての言語でサイトのコンテンツを管理できます。

![Intlayerエディターインターフェース](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## インストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### 設定

Intlayerの設定ファイルでは、エディターの設定をカスタマイズできます：

```typescript
const config: IntlayerConfig = {
  // ... その他の設定
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // falseの場合、エディターは無効になりアクセスできません。
    // エディターを有効にするにはクライアントIDとクライアントシークレットが必要です。
    // これらはコンテンツを編集しているユーザーを識別するために使用されます。
    // IntlayerダッシュボードのProjectsで新しいクライアントを作成することで取得できます（https://intlayer.org/dashboard/projects）。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> クライアントIDとクライアントシークレットをお持ちでない場合は、[Intlayer ダッシュボード - プロジェクト](https://intlayer.org/dashboard/projects)で新しいクライアントを作成して取得できます。

> 利用可能なすべてのパラメータについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

`intlayer-editor` パッケージは Intlayer をベースにしており、React（Create React App）、Vite + React、Next.js などの JavaScript アプリケーションで利用可能です。

パッケージのインストール方法の詳細については、以下の該当セクションを参照してください。

### Next.js との統合

Next.js との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Create React App との統合

Create React App との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Vite + React との統合

Vite + React との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)を参照してください。

### 統合の例

Intlayer ビジュアルエディターを React プロジェクトに統合するには、以下の手順に従ってください：

- React アプリケーションに Intlayer エディターコンポーネントをインポートします：

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          {/* Your components here */}
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Import the Intlayer editor styles into your Next.js application:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## エディターの使用方法

エディターがインストールされ、有効化され、起動されると、カーソルをコンテンツ上にホバーすることで、Intlayerによってインデックス付けされた各フィールドを確認できます。

![コンテンツ上にホバー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

コンテンツがアウトライン表示されている場合は、長押しすることで編集ドロワーを表示できます。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
