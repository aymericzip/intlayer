# Intlayer Editor Documentation

Intlayer Editorは、あなたのアプリケーションをビジュアルエディタに変えるツールです。Intlayer Editorを使用することで、あなたのチームは全ての設定された言語でサイトのコンテンツを管理できるようになります。

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

`intlayer-editor`パッケージはIntlayerに基づいており、React（Create React App）、Vite + React、Next.jsなどのJavaScriptアプリケーションで利用可能です。

## Integrating

パッケージのインストール方法についての詳細は、以下の関連セクションを参照してください：

### Integrating with Next.js

Next.jsとの統合については、[setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Integrating with Create React App

Create React Appとの統合については、[setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Integrating with Vite + React

Vite + Reactとの統合については、[setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)を参照してください。

## How Intlayer Editor Works

Intlayer Editorを使用して変更を加えるたびに、サーバーはあなたのプロジェクト内でこれらのファイルが宣言されている場所に、あなたの変更を自動的に挿入します。これは、あなたがファイルがどこに宣言されているのか、または辞書コレクションの中でキーを見つけることに悩む必要がないことを意味します。

## Installation

Intlayerがプロジェクトに設定されたら、開発依存関係として`intlayer-editor`をインストールします：

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## Configuration

### 1. intlayer.config.tsファイルでエディタを有効にする

Intlayerの設定ファイルで、エディタの設定をカスタマイズできます：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の設定
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // falseの場合、エディタは無効でアクセスできません。
    // クライアントIDとクライアント秘密は、エディタを有効にするために必要です。
    // これらは、コンテンツを編集しているユーザーを特定することを可能にします。
    // 新しいクライアントをIntlayerダッシュボード - プロジェクトで作成することで取得できます (https://intlayer.org/dashboard/projects)。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
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
    enabled: process.env.INTLAYER_ENABLED === "true", // falseの場合、エディタは無効でアクセスできません。
    // クライアントIDとクライアント秘密は、エディタを有効にするために必要です。
    // これらは、コンテンツを編集しているユーザーを特定することを可能にします。
    // 新しいクライアントをIntlayerダッシュボード - プロジェクトで作成することで取得できます (https://intlayer.org/dashboard/projects)。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
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
    enabled: process.env.INTLAYER_ENABLED === "true", // falseの場合、エディタは無効でアクセスできません。
    // クライアントIDとクライアント秘密は、エディタを有効にするために必要です。
    // これらは、コンテンツを編集しているユーザーを特定することを可能にします。
    // 新しいクライアントをIntlayerダッシュボード - プロジェクトで作成することで取得できます (https://intlayer.org/dashboard/projects)。
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> クライアントIDとクライアント秘密がない場合は、新しいクライアントを作成することで取得できます、[Intlayerダッシュボード - プロジェクト](https://intlayer.org/dashboard/projects)で。

> すべての利用可能なパラメータを確認するには、[configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

### 2. アプリケーションにIntlayer Editor Providerを挿入する

エディタを有効にするには、アプリケーションにIntlayer Editor Providerを挿入する必要があります。

React JSまたはVite + Reactアプリケーションの例：

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>
      {/* あなたのアプリケーション */}
    </IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>
      {/* あなたのアプリケーション */}
    </IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>
      {/* あなたのアプリケーション */}
    </IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Next.jsアプリケーションの例：

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* あなたのアプリケーション */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* あなたのアプリケーション */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* あなたのアプリケーション */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. アプリケーションにスタイルシートを追加する

エディタのスタイルを表示するには、アプリケーションにスタイルシートを追加する必要があります。

Tailwindが使用されている場合は、`tailwind.config.js`ファイルにスタイルシートを追加できます：

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... コンテンツの残り部分
  ],
  // ...
};
```

それ以外の場合は、アプリケーションでスタイルシートをインポートできます：

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

または

```css fileName="app.css"
@import "intlayer-editor/css";
```

## Using the Editor

エディタがインストールされ、有効になり、起動すると、カーソルでコンテンツにマウスオーバーすることでIntlayerによってインデックス付けされた各フィールドを表示できます。

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

コンテンツがアウトラインされている場合は、長押しして編集ドロワーを表示できます。
