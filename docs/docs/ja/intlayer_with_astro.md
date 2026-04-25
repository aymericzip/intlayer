---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Astro i18n - 2026年にAstroアプリケーションを翻訳する方法
description: Intlayerを使用してAstroサイトに国際化（i18n）を追加する方法を学びます。このガイドに従って、サイトを多言語化しましょう。
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
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドの追加"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Astro統合、設定、使用方法の更新"
---

# Intlayerを使用したAstroサイトの翻訳 | 国際化 (i18n)

## Intlayerとは？

**Intlayer**は、現代的なウェブアプリケーションでの多言語サポートを簡素化するために設計された、革新的でオープンソースの国際化 (i18n) ライブラリです。

Intlayerを使用すると、以下のことが可能になります：

- **翻訳の管理が容易**：コンポーネントレベルの宣言型辞書を使用します。
- **動的なローカライズ**：メタデータ、ルート、コンテンツを動的にローカライズできます。
- **TypeScriptのサポート**：自動生成された型により、オートコンプリートやエラー検出が向上します。
- **高度な機能**：動的なロケール検出や切り替えなどの機能を利用できます。

---

## AstroへのIntlayer設定ステップバイステップガイド

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-astro-template)を表示。

### ステップ1: 依存関係のインストール

お好みのパッケージマネージャーを使用して、必要なパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer astro-intlayer
# オプション: Reactアイランドのサポートを追加する場合
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# オプション: Reactアイランドのサポートを追加する場合
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# オプション: Reactアイランドのサポートを追加する場合
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および[CLIコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)のための国際化ツールを提供するコアパッケージ。

- **astro-intlayer**
  Intlayerを[Viteバンドラー](https://vite.dev/guide/why.html#why-bundle-for-production)と統合するためのAstro統合プラグイン、およびユーザーの優先ロケールの検出、クッキーの管理、URLリダイレクトの処理を行うミドルウェアが含まれています。

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
      // その他のロケール
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> この設定ファイルを使用して、ローカライズされたURL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでのIntlayerログの無効化などを設定できます。利用可能なパラメータの全リストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### ステップ3: Astro設定へのIntlayerの統合

Astroの設定にintlayerプラグインを追加します。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Astro統合プラグイン `intlayer()` は、IntlayerをAstroと統合するために使用されます。コンテンツ宣言ファイルの構築を確実にし、開発モードで監視します。Astroアプリケーション内でIntlayerの環境変数を定義し、パフォーマンス最適化のためのエイリアスを提供します。

### ステップ4: コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成・管理します：

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
      ja: "こんにちは世界",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は、`contentDir`（デフォルトは `./src`）に含まれ、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）と一致していれば、アプリケーション内のどこにでも定義できます。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### ステップ5: Astroでのコンテンツの使用

`intlayer`からエクスポートされたコアヘルパーを使用して、`.astro`ファイル内で直接辞書を消費できます。

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="ja">
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

ローカライズされたページを提供するための動的なルートセグメントを作成します（例：`src/pages/[locale]/index.astro`）：

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro統合により、開発中に言語認識ルーティングや環境定義を支援するViteミドルウェアが追加されます。独自のロジックや `intlayer` の `getLocalizedUrl` などのユーティリティを使用して、言語間のリンクを作成することもできます。

### ステップ7: お好みのフレームワークの使用を続ける

お好みのフレームワークを使用してアプリケーションを構築し続けましょう。

- Intlayer + React: [Intlayer with React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer with Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer with Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer with Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer with Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+preact.md)

### TypeScriptの設定

Intlayerはモジュール拡張（module augmentation）を使用してTypeScriptの利点を活かし、コードベースをより堅牢にします。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

そのためには、`.gitignore`ファイルに以下の指示を追加してください：

```bash
# Intlayerによって生成されたファイルを無視
.intlayer
```

### VS Code拡張機能

Intlayerを使用した開発体験を向上させるために、**公式のIntlayer VS Code拡張機能**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに詳しく

さらに詳しく知りたい場合は、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりすることもできます。
