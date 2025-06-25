# intlayer-editor: Intlayerビジュアルエディタを使用するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージスイートです。React、React、Express.jsなどのフレームワークと互換性があります。

**`intlayer-editor`** パッケージは、IntlayerビジュアルエディタをReactプロジェクトに統合するためのNPMパッケージです。

## Intlayer Editorの仕組み

intlayerエディタは、Intlayerのリモート辞書と対話することを可能にします。クライアントサイドにインストールすることで、アプリケーションをCMSのようなエディタに変換し、設定されたすべての言語でサイトのコンテンツを管理できます。

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします:

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

Intlayerの設定ファイルで、エディタの設定をカスタマイズできます:

```typescript
const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // falseの場合、エディタは非アクティブでアクセスできません。
    // クライアントIDとクライアントシークレットはエディタを有効にするために必要です。
    // これらは、コンテンツを編集しているユーザーを識別するために使用されます。
    // Intlayerダッシュボード - プロジェクト (https://intlayer.org/dashboard/projects) で新しいクライアントを作成することで取得できます。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> クライアントIDとクライアントシークレットをお持ちでない場合は、[Intlayerダッシュボード - プロジェクト](https://intlayer.org/dashboard/projects)で新しいクライアントを作成して取得できます。

> 利用可能なすべてのパラメータについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

`intlayer-editor`パッケージはIntlayerに基づいており、React (Create React App)、Vite + React、Next.jsなどのJavaScriptアプリケーションで利用可能です。

パッケージのインストール方法の詳細については、以下の該当セクションを参照してください:

### Next.jsとの統合

Next.jsとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Create React Appとの統合

Create React Appとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Vite + Reactとの統合

Vite + Reactとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)を参照してください。

### 統合例

ReactプロジェクトにIntlayerビジュアルエディタを統合するには、以下の手順に従います:

- IntlayerエディタコンポーネントをReactアプリケーションにインポートします:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>
            {/* アプリのコンテンツをここに記述 */}
          </IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- IntlayerエディタのスタイルをNext.jsアプリケーションにインポートします:

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

エディタがインストールされ、有効化され、起動されると、カーソルをコンテンツ上にホバーすることで、Intlayerによってインデックスされた各フィールドを表示できます。

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

コンテンツがアウトライン表示されている場合、長押しすることで編集ドロワーを表示できます。
