---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Vite と Solid のウェブサイトを翻訳する（i18n）
description: Vite と Solid のウェブサイトを多言語対応にする方法を紹介します。国際化（i18n）と翻訳のドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
# applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
---

# Intlayer と Vite と Solid で国際化（i18n）を始める

> このパッケージは開発中です。詳細は[issue](https://github.com/aymericzip/intlayer/issues/117)をご覧ください。Solid向けIntlayerに関心がある場合は、issueに「いいね」をして応援してください。

<!-- GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-solid-template)もご参照ください。 -->

## Intlayerとは何ですか？

**Intlayer**は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うと、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使って翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型によりTypeScriptのサポートを保証**し、オートコンプリートやエラー検出を向上させます。
- **動的なロケール検出や切り替えなどの高度な機能を活用**できます。

---

## ViteとSolidアプリケーションでIntlayerをセットアップするステップバイステップガイド

### ステップ1: 依存関係のインストール

npmを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  国際化のための設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のツールを提供するコアパッケージ。

- **solid-intlayer**
  IntlayerをSolidアプリケーションと統合するパッケージです。Solidの国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのViteプラグイン、およびユーザーの優先ロケール検出、クッキー管理、URLリダイレクト処理のためのミドルウェアを含みます。

### ステップ 2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> この設定ファイルを通じて、ローカライズされたURL、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Vite設定にIntlayerを統合する

intlayerプラグインを設定に追加します。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

### ステップ 3: Vite 設定に Intlayer を統合する

intlayer プラグインを設定に追加します。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> `intlayer()` は Vite プラグインで、Intlayer を Vite に統合するために使用されます。コンテンツ宣言ファイルのビルドを保証し、開発モードでそれらを監視します。Vite アプリケーション内で Intlayer の環境変数を定義します。さらに、パフォーマンス最適化のためのエイリアスも提供します。

### ステップ 4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します。

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> コンテンツ宣言は、アプリケーション内のどこにでも定義できます。`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り有効です。また、コンテンツ宣言ファイルの拡張子は（デフォルトで `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ5: Intlayerをコードで利用する

[未完]

### （オプション）ステップ6: コンテンツの言語を変更する

[未完]

### （オプション）ステップ7: アプリケーションにローカライズされたルーティングを追加する

[未完]

### （オプション）ステップ8: ロケール変更時にURLを変更する

[未完]

### （オプション）ステップ9: HTMLの言語属性と言語方向属性を切り替える

[to complete]

### （オプション）ステップ10：ローカライズされたリンクコンポーネントの作成

[to complete]

### Git設定

Intlayerによって生成されたファイルは、Gitリポジトリにコミットしないように無視することを推奨します。

これを行うには、`.gitignore`ファイルに以下の指示を追加してください。

```plaintext
# Intlayerによって生成されたファイルを無視する
.intlayer
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Codeマーケットプレイスからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- **翻訳されたコンテンツのインラインプレビュー**。
- **翻訳を簡単に作成・更新するためのクイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進みたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化することができます。

---

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
