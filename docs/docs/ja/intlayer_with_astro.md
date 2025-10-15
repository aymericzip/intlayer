---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Astroアプリを翻訳する方法 – i18nガイド 2025
description: Intlayerを使用してViteとReactアプリケーションに国際化（i18n）を追加する方法を学びます。このガイドに従ってアプリを多言語対応にしましょう。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 6.2.0
    date: 2025-10-03
    changes: Astro統合、設定、使用法のリフレッシュ
---

# IntlayerでAstroを翻訳する | 国際化（i18n）

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-astro-template)をご覧ください。

## Intlayerとは？

**Intlayer**は、最新のウェブアプリケーションにおける多言語対応を簡素化するために設計された革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使うと、以下が可能です：

- **コンポーネントレベルで宣言的な辞書を使用して翻訳を簡単に管理**できます。
- **メタデータ、ルート、コンテンツを動的にローカライズ**できます。
- **自動生成された型によりTypeScriptサポートを確保**し、オートコンプリートやエラー検出を向上させます。
- **動的なロケール検出や切り替えなどの高度な機能**を活用できます。

---

## AstroでIntlayerをセットアップするステップバイステップガイド

### ステップ1：依存関係のインストール

パッケージマネージャーを使って必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Optional: add React island support
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# オプション: Reactアイランドサポートを追加
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# オプション: Reactアイランドサポートを追加
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**  
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)のための国際化ツールを提供するコアパッケージ。

- **astro-intlayer**  
  Astroとの統合プラグインを含み、Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と連携させるほか、ユーザーの優先ロケールの検出、クッキー管理、URLリダイレクトの処理を行うミドルウェアも提供します。

### ステップ2: プロジェクトの設定

アプリケーションの言語を設定するための設定ファイルを作成します：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 他のロケールをここに追加
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを通じて、ローカライズされたURLの設定、ミドルウェアのリダイレクション、クッキー名、コンテンツ宣言の場所と拡張子の指定、コンソールでのIntlayerログの無効化などを行うことができます。利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Astro設定にIntlayerを統合する

intlayerプラグインを設定に追加します。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` Astro統合プラグインは、IntlayerをAstroと統合するために使用されます。これは、コンテンツ宣言ファイルのビルドを確実に行い、開発モードでそれらを監視します。Astroアプリケーション内でIntlayerの環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスも提供します。

### ステップ4: コンテンツを宣言する

翻訳を格納するためのコンテンツ宣言を作成および管理します：

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### ステップ 5: Astro でコンテンツを使用する

`intlayer` からエクスポートされるコアヘルパーを使って、`.astro` ファイル内で辞書を直接利用できます。

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### ステップ6: ローカライズされたルーティング

ローカライズされたページを提供するために、動的なルートセグメントを作成します。例えば `src/pages/[locale]/index.astro` のようにします。

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astroの統合は、開発中にViteのミドルウェアを追加し、ロケール対応のルーティングや環境定義を支援します。独自のロジックや、`intlayer` の `getLocalizedUrl` のようなユーティリティ関数を使って、ロケール間のリンクを作成することも可能です。

### ステップ7: お気に入りのフレームワークを使い続ける

お気に入りのフレームワークを使い続けて、アプリケーションを構築してください。

- Intlayer + React: [Intlayer with React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer with Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer with Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer with Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer with Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+preact.md)

### TypeScriptの設定

Intlayerはモジュール拡張を使用してTypeScriptの利点を活かし、コードベースをより強固にします。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScriptの設定に自動生成された型が含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Git設定

Intlayerによって生成されたファイルは無視することを推奨します。これにより、Gitリポジトリへのコミットを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加できます。

```plaintext
# Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 欠落している翻訳の **リアルタイムエラー検出**。
- 翻訳されたコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進むために

さらに進むためには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使ってコンテンツを外部化することができます。

---
