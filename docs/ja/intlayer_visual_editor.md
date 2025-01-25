# Intlayer Visual Editor Documentation

Intlayer Visual Editorは、ビジュアルエディタを使用してコンテンツ宣言ファイルとインタラクションを持つために、Webサイトをラップするツールです。

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

`intlayer-editor`パッケージはIntlayerに基づいており、React（Create React App）、Vite + React、Next.jsなどのJavaScriptアプリケーションで利用可能です。

## Visual editor vs CMS

Intlayer Visual editorは、ローカル辞書用のビジュアルエディタでコンテンツを管理することを可能にするツールです。変更が加えられると、コードベース内のコンテンツが置き換えられます。これは、アプリケーションが再構築され、新しいコンテンツを表示するためにページが再読み込みされることを意味します。

対照的に、[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_CMS.md)は、遠隔辞書用のビジュアルエディタでコンテンツを管理することを可能にするツールです。変更が加えられると、コンテンツは**コードベースには影響しません**。ウェブサイトは自動的に変更されたコンテンツを表示します。

## Integrate Intlayer into your application

Intlayerを統合する方法の詳細については、以下の関連セクションを参照してください。

### Integrating with Next.js

Next.jsとの統合については、[setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)を参照してください。

### Integrating with Create React App

Create React Appとの統合については、[setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)を参照してください。

### Integrating with Vite + React

Vite + Reactとの統合については、[setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)を参照してください。

## How Intlayer Editor Works

アプリケーション内のビジュアルエディタには、以下の2つの要素が含まれています。

- あなたのウェブサイトをiframe内に表示するフロントエンドアプリケーション。もしあなたのウェブサイトがIntlayerを使用している場合、ビジュアルエディタは自動的にコンテンツを検出し、インタラクションを取ることを可能にします。修正が加えられると、変更をダウンロードできるようになります。

- ダウンロードボタンをクリックすると、ビジュアルエディタはサーバーにリクエストを送り、新しいコンテンツであなたのコンテンツ宣言ファイルを置き換えます（これらのファイルがプロジェクト内のどこに宣言されていても）。

> 現在、Intlayer Editorはあなたのコンテンツ宣言ファイルをJSONファイルとして書き込みます。

## Installation

Intlayerがプロジェクト内で構成されたら、単に`intlayer-editor`を開発依存関係としてインストールします：

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Configuration

### 1. intlayer.config.tsファイル内でエディタを有効にする

Intlayerの設定ファイル内で、エディタの設定をカスタマイズできます：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定
  editor: {
    /**
     * 必須
     * アプリケーションのURL。
     * これはビジュアルエディタがターゲットにするURLです。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * オプショナル
     * デフォルトは`8000`。
     * エディタサーバーのポート。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * オプショナル
     * デフォルトは"http://localhost:8000"
     * エディタサーバーのURL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * オプショナル
     * デフォルトは`true`。`false`の場合、エディタは非アクティブになりアクセスできません。
     * セキュリティ上の理由から、特定の環境（例：本番）でエディタを無効にするために使用できます。
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
  // ... その他の設定
  editor: {
   /**
     * 必須
     * アプリケーションのURL。
     * これはビジュアルエディタがターゲットにするURLです。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * オプショナル
     * デフォルトは`8000`。
     * エディタサーバーのポート。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * オプショナル
     * デフォルトは"http://localhost:8000"
     * エディタサーバーのURL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * オプショナル
     * デフォルトは`true`。`false`の場合、エディタは非アクティブになりアクセスできません。
     * セキュリティ上の理由から、特定の環境（例：本番）でエディタを無効にするために使用できます。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... その他の設定
  editor: {
    /**
     * 必須
     * アプリケーションのURL。
     * これはビジュアルエディタがターゲットにするURLです。
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * オプショナル
     * デフォルトは`8000`。
     * エディタサーバーのポート。
     */
    port: process.env.INTLAYER_PORT,
    /**
     * オプショナル
     * デフォルトは"http://localhost:8000"
     * エディタサーバーのURL。
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * オプショナル
     * デフォルトは`true`。`false`の場合、エディタは非アクティブになりアクセスできません。
     * セキュリティ上の理由から、特定の環境（例：本番）でエディタを無効にするために使用できます。
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> 利用可能なすべてのパラメータを確認するには、[configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

## Using the Editor

1. エディタがインストールされていると、次のコマンドを使用してエディタを起動できます：

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. 次に、提供されたURLを開きます。デフォルトでは`http://localhost:8000`です。

   あなたのコンテンツの上にカーソルを合わせることで、Intlayerによってインデックスされた各フィールドを見ることができます。

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. コンテンツがアウトラインされている場合は、長押しすることで編集ドロワーを表示できます。
