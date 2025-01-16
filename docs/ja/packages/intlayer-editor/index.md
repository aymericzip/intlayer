# intlayer-editor: NPM パッケージで Intlayer ビジュアルエディタを使用する

**Intlayer** は、JavaScript 開発者のために特別に設計されたパッケージのスイートです。React、React、Express.js などのフレームワークと互換性があります。

**`intlayer-editor`** パッケージは、あなたの React プロジェクトに Intlayer ビジュアルエディタを統合する NPM パッケージです。

## Intlayer エディタの動作

intlayer エディタは、Intlayer の遠隔辞書とインタラクションすることができます。クライアント側にインストールされ、すべての設定済み言語でサイトのコンテンツを管理するための CMS のようなエディタにアプリケーションを変換します。

![Intlayer エディタインターフェイス](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## インストール

必要なパッケージをお気に入りのパッケージマネージャを使用してインストールします。

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

Intlayer 設定ファイル内で、エディタの設定をカスタマイズできます。

```typescript
const config: IntlayerConfig = {
  // ... その他の設定
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false の場合、エディタは非アクティブでアクセスできません。
    // クライアント ID とクライアントシークレットは、エディタを有効にするために必要です。
    // これらは、コンテンツを編集しているユーザーを特定するために使用されます。
    // これらは、Intlayer ダッシュボード - プロジェクトで新しいクライアントを作成することによって取得できます - (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> クライアント ID およびクライアントシークレットがない場合、[Intlayer ダッシュボード - プロジェクト](https://intlayer.org/dashboard/projects)で新しいクライアントを作成することによって取得できます。

> 利用可能なすべてのパラメータを確認するには、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

`intlayer-editor` パッケージは Intlayer に基づいており、JavaScript アプリケーション（例：React（Create React App）、Vite + React、Next.js）に対応しています。

パッケージのインストール方法の詳細については、以下の関連セクションを参照してください。

### Next.js との統合

Next.js との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Create React App との統合

Create React App との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Vite + React との統合

Vite + React との統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)を参照してください。

### 統合の例

Intlayer ビジュアルエディタを React プロジェクトに統合するには、以下の手順に従ってください。

- Intlayer エディタコンポーネントをあなたの React アプリケーションにインポートします：

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* あなたのアプリのコンテンツ */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Intlayer エディタスタイルをあなたの Next.js アプリケーションにインポートします：

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

## エディタの使用

エディタがインストールされ、有効になり、開始されたら、カーソルでコンテンツにホバーすることで Intlayer にインデックスされた各フィールドを表示できます。

![コンテンツにホバー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

コンテンツがアウトライン化されている場合、長押しして編集ドロワーを表示できます。
