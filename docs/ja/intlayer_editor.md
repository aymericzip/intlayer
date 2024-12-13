# Intlayer Editor Documentation

Intlayer Editorは、アプリケーションを視覚的なエディターに変換するツールです。Intlayer Editorを使用すると、チームは設定されたすべての言語でサイトのコンテンツを管理できます。

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

`intlayer-editor`パッケージは、Intlayerに基づいており、React（Create React App）、Vite + React、Next.jsなどのJavaScriptアプリケーションで利用可能です。

## Integrating

パッケージのインストール方法の詳細については、以下の関連セクションを参照してください。

### Integrating with Next.js

Next.jsとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Integrating with Create React App

Create React Appとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Integrating with Vite + React

Vite + Reactとの統合については、[セットアップガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)を参照してください。

## How Intlayer Editor Works

Intlayer Editorを使用して変更を加えるたびに、サーバーは自動的に変更を[Intlayer宣言ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)に挿入します。ファイルがプロジェクト内で宣言されている場所に関係なく、挿入されます。

このようにして、ファイルがどこで宣言されているのかや辞書コレクション内のキーを見つけることを心配する必要がありません。

## Installation

Intlayerがプロジェクトに設定されたら、単に`intlayer-editor`を開発依存関係としてインストールします。

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Configuration

### 1. intlayer.config.tsファイルでエディターを有効にする

Intlayer設定ファイルでは、エディター設定をカスタマイズできます。

```typescript
const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // falseの場合、エディターは非アクティブでアクセスできません。
    // クライアントIDとクライアントシークレットは、エディターを有効にするために必要です。
    // コンテンツを編集しているユーザーを特定するために使用されます。
    // 新しいクライアントをIntlayerダッシュボードのプロジェクトで作成することで取得できます (https://intlayer.org/dashboard/projects)。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> クライアントIDとクライアントシークレットを持っていない場合は、[Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects)で新しいクライアントを作成することで取得できます。

> 利用可能なすべてのパラメータを確認するには、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### 2. アプリケーションにIntlayer Editor Providerを挿入する

エディターを有効にするためには、Intlayer Editor Providerをアプリケーションに挿入する必要があります。

React JSまたはVite + Reactアプリケーションの例：

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>
        {/* あなたのアプリケーション */}
      </IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Next.jsアプリケーションの例：

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* あなたのアプリケーション */}
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. アプリケーションにスタイルシートを追加する

エディターのスタイルを表示するためには、アプリケーションにスタイルシートを追加する必要があります。

Tailwindを使用している場合は、スタイルシートを`tailwind.config.js`ファイルに追加できます：

```js
// tailwind.config.js
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... 残りのコンテンツ
  ],
  // ...
};
```

そうでない場合は、アプリケーションにスタイルシートをインポートできます：

```tsx
// app.tsx
import "intlayer-editor/css";
```

または

```css
/* app.css */
@import "intlayer-editor/css";
```

## Using the Editor

エディターがインストールされ、有効化され、起動されると、コンテンツの上にカーソルを移動させることで、Intlayerによってインデックスされた各フィールドを表示できます。

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

コンテンツがアウトライン表示されている場合は、長押しすることで編集ドロワーを表示できます。
