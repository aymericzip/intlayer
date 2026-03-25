---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Tanstack Start i18n - Tanstack Startアプリの翻訳方法 2026
description: Intlayerを使用してTanStack Startアプリケーションに国際化（i18n）を追加する方法を学びます。ロケール対応のルーティングでアプリを多言語化するための包括的なガイドに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - ロケールルーティング
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "initコマンドを追加"
  - version: 7.4.0
    date: 2025-12-11
    changes: "validatePrefixを導入し、ステップ14「ローカライズされたルートでの404ページの処理」を追加。"
  - version: 7.3.9
    date: 2025-12-05
    changes: "ステップ13「サーバーアクションでのロケールの取得（任意）」を追加。"
  - version: 7.2.3
    date: 2025-11-18
    changes: "ステップ13「Nitroの適応」を追加。"
  - version: 7.1.0
    date: 2025-11-17
    changes: "getPrefix関数の追加、useLocalizedNavigate、LocaleSwitcher、LocalizedLinkの使用により、デフォルトのプレフィックスを修正。"
  - version: 6.5.2
    date: 2025-10-03
    changes: "ドキュメントの更新"
  - version: 5.8.1
    date: 2025-09-09
    changes: "TanStack Start向けに追加"
---

# Intlayerを使用してTanStack Startウェブサイトを翻訳する | 国際化（i18n）

## 目次

<TOC/>

このガイドでは、ロケール対応のルーティング、TypeScriptサポート、および最新の開発手法を使用して、TanStack Startプロジェクトに**Intlayer**をシームレスに統合し、国際化を実現する方法を説明します。

## Intlayerとは？

**Intlayer**は、最新のウェブアプリケーションでの多言語サポートを簡素化するために設計された、革新的なオープンソースの国際化（i18n）ライブラリです。

Intlayerを使用すると、以下のことが可能になります：

- **コンポーネントレベルでの宣言的な辞書**を使用して、翻訳を簡単に管理できます。
- **メタデータ、ルート、およびコンテンツを動的にローカライズ**できます。
- **自動生成された型**によるTypeScriptサポートを確保し、オートコンプリートとエラー検出を向上させます。
- **動的なロケール検出および切り替え**などの高度な機能を利用できます。
- **TanStack Startのファイルベースのルーティングシステム**を使用して、ロケール対応のルーティングを有効にできます。

---

## TanStack StartアプリケーションでIntlayerをセットアップするためのステップバイステップガイド

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">
  
<iframe title="TanStack Startに最適なi18nソリューション？Intlayerを発見する" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHubの[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-tanstack-start-template)を参照してください。

---

### Git構成

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、Gitリポジトリにそれらをコミットすることを避けることができます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます：

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer
```

### (オプション) ステップ 1 : コンポーネントのコンテンツを抽出する

既存のコードベースがある場合、数千のファイルを変換するのは時間がかかることがあります。

このプロセスを容易にするために、Intlayerは、コンポーネントを変換しコンテンツを抽出するための [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md) / [エクストラクタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md) を提案しています。

セットアップするには、`intlayer.config.ts` ファイルに `compiler` セクションを追加します。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の構成
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 辞書キーの接頭辞
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の構成
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 辞書キーの接頭辞
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 他の構成
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。これにより、コンパイラを一度だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 辞書キーの接頭辞
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='抽出コマンド'>

コンポーネントを変換してコンテンツを抽出するためにエクストラクタを実行します

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babelコンパイラ'>

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // コンポーネントから辞書へコンテンツを抽出する
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # または npm run dev
```

```bash packageManager="pnpm"
pnpm run build # または pnpm run dev
```

```bash packageManager="yarn"
yarn build # または yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

## VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code拡張機能**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**オートコンプリート**。
- 翻訳の欠落に対する**リアルタイムのエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成および更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

## さらに進む

さらに進むには、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を実装したり、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化したりできます。

---

## ドキュメント参照

- [Intlayerドキュメント](https://intlayer.org)
- [TanStack Startドキュメント](https://reactrouter.com/)
- [useIntlayerフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [useLocaleフック](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)
- [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)
- [構成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
