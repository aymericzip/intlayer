<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.webp" width="60%" alt="Intlayer ロゴ" />
  </a>
</p>

<h1 align="center">
  <strong>コンポーネントごとの i18n</strong>
</h1>
<h2 align="center">
  <strong>AI 駆動の翻訳。ビジュアルエディター。多言語 CMS。</strong>
</h2>

<br />

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md" rel="">Docs</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md" rel="">Next.js</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md" rel="">React + Vite</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm バージョン" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub スター" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="月間ダウンロード数" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="ライセンス"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="最終コミット"/>
  </a>
</p>

![ビデオを見る](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md" rel="">
  <img src="https://img.shields.io/badge/はじめに-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer とは何ですか？

ほとんどの i18n ライブラリは、複雑すぎるか、柔軟性に欠けるか、または最新のフレームワーク向けに設計されていません。

Intlayer は、ウェブおよびモバイルアプリ向けの**最新の i18n ソリューション**です。  
フレームワークに依存せず、**AI 搭載**で、無料の **CMS ＆ ビジュアルエディター**が含まれています。

**ロケールごとのコンテンツファイル**、**TypeScript の自動補完**、**ツリーシェイカブルな辞書**、および **CI/CD 統合**により、Intlayer は国際化を**より速く、よりクリーンに、よりスマートに**します。

## Intlayer の主な利点：

| 機能                                                                                                                                                | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.webp?raw=true" alt="Feature" width="700">                         | **マルチフレームワーク対応**<br><br>Intlayer は、Next.js、React、Vite、Vue.js、Nuxt、Preact、Express など、主要なフレームワークやライブラリすべてに対応しています。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **JavaScript 駆動のコンテンツ管理**<br><br>JavaScript の柔軟性を活用して、コンテンツを効率的に定義および管理します。<br><br> - [コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **ロケール別コンテンツ宣言ファイル**<br><br>自動生成の前にコンテンツを一度宣言することで、開発をスピードアップします。<br><br> - [ロケール別コンテンツ宣言ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true" alt="Feature" width="700">                           | **コンパイラ**<br><br>Intlayer コンパイラは、コンポーネントからコンテンツを自動的に抽出し、辞書ファイルを作成します。<br><br> - [コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **型安全な環境**<br><br>TypeScript を活用して、コンテンツ定義やコードのエラーを防ぎつつ、IDE の自動補完機能も利用できます。<br><br> - [TypeScript の設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md#configure-typescript)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **簡素化されたセットアップ**<br><br>最小限の設定で迅速に開始できます。国際化、ルーティング、AI、ビルド、コンテンツ管理の設定を簡単に調整可能です。<br><br> - [Next.js 統合を探る](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **簡素化されたコンテンツ取得**<br><br>各コンテンツごとに `t` 関数を呼び出す必要はありません。単一のフックを使ってすべてのコンテンツを直接取得できます。<br><br> - [React 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **一貫したサーバーコンポーネントの実装**<br><br>Next.js のサーバーコンポーネントに完全に適合し、クライアントコンポーネントとサーバーコンポーネントの両方で同じ実装を使用できます。各サーバーコンポーネントに `t` 関数を渡す必要はありません。<br><br> - [サーバーコンポーネント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md#step-7-utilize-content-in-your-code)                                                                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **整理されたコードベース**<br><br>コードベースをより整理された状態に保ちます：1つのコンポーネント = 同じフォルダ内の1つの辞書。翻訳をそれぞれのコンポーネントの近くに配置することで、保守性と明確さを向上させます。<br><br> - [Intlayer の仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md)                                                                                                                                                                                                                                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **強化されたルーティング**<br><br>Next.js、React、Vite、Vue.js などの複雑なアプリケーション構造にシームレスに対応し、アプリのルーティングを完全にサポートします。<br><br> - [Next.js 統合を探る](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Markdown サポート**<br><br>多言語コンテンツ（プライバシーポリシー、ドキュメントなど）向けに、ロケールファイルやリモートの Markdown をインポートして解釈します。Markdown のメタデータを解釈し、コード内でアクセス可能にします。<br><br> - [コンテンツファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file.md)                                                                                                                                                                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.webp?raw=true" alt="Feature" width="700">                      | **無料のビジュアルエディター ＆ CMS**<br><br>コンテンツライター向けに無料のビジュアルエディターと CMS が利用可能で、ローカリゼーションプラットフォームは不要です。Git を使ってコンテンツを同期させるか、CMS で完全または部分的に外部化できます。<br><br> - [Intlayer エディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) <br> - [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.webp?raw=true" alt="Feature" width="700">                             | **ツリーシェイカブルコンテンツ**<br><br>ツリーシェイカブルコンテンツにより、最終バンドルのサイズを削減します。コンポーネントごとにコンテンツを読み込み、未使用のコンテンツはバンドルから除外されます。遅延読み込みをサポートし、アプリの読み込み効率を向上させます。<br><br> - [アプリビルドの最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md#app-build-optimization)                                                                                                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.webp?raw=true" alt="Feature" width="700">                   | **静的レンダリング**<br><br>静的レンダリングを妨げません。<br><br> - [Next.js 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **AI 駆動の翻訳**<br><br>Intlayer の高度な AI 駆動翻訳ツールを使用し、ご自身の AI プロバイダー / API キーを使って、ワンクリックでウェブサイトを 231 言語に変換します。 <br><br> - [CI/CD 統合](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md) <br> - [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) <br> - [自動入力](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/autoFill.md)                                                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCP サーバー統合**<br><br>IDE の自動化のための MCP（モデルコンテキストプロトコル）サーバーを提供し、開発環境内でシームレスなコンテンツ管理と国際化（i18n）ワークフローを可能にします。<br><br> - [MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.webp?raw=true" alt="Feature" width="700">                   | **VSCode 拡張機能**<br><br>Intlayer は、コンテンツと翻訳の管理、辞書の構築、コンテンツの翻訳などを支援する VSCode 拡張機能を提供します。<br><br> - [VSCode 拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **相互運用性**<br><br>react-i18next、next-i18next、next-intl, react-intl, vue-i18n との相互運用性を可能にします。<br><br> - [Intlayer と react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_react-intl.md) <br> - [Intlayer と next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_next-intl.md) <br> - [Intlayer と next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_next-i18next.md) <br> - [Intlayer と vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_vue-i18n.md) <br> - [Intlayer の互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/benchmark.png?raw=true" alt="Feature" width="700">                           | **パフォーマンスとベンチマーク**<br><br>高度なツリーシェイキングと動的ローディングを使用してパフォーマンスを向上させ、ソリューションを可能な限り軽量に保ちます。 <br><br> - [パフォーマンスとベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## 📦 インストール

今日から Intlayer を始めて、よりスムーズで強力な国際化アプローチを体験しましょう。

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md" rel="">
  <img src="https://img.shields.io/badge/はじめに-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer
```

⚡ クイックスタート (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts
// app/home.content.ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Home",
      fr: "Accueil",
      es: "Inicio",
    }),
  },
} satisfies Dictionary;

export default content;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const HomePage = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md"> 完全ガイドを見る → </a>

## 🎥 YouTube でのライブチュートリアル

[![Intlayer を使ったアプリケーションの国際化方法](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md" rel="">
  <img src="https://img.shields.io/badge/はじめに-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 目次

Intlayer の包括的なドキュメントを探索し、Intlayer の使い始め方やプロジェクトへの統合方法を学びましょう。

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 はじめに</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md" rel=''>なぜ Intlayer なのか？</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/introduction.md" rel=''>イントロダクション</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ コンセプト</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md" rel=''>Intlayer の仕組み</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md" rel=''>設定</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md" rel=''>Intlayer CLI</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md" rel=''>コンパイラ</a></li>

  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md" rel=''>Intlayer エディター</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md" rel=''>Intlayer CMS</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md" rel=''>辞書</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md" rel=''>ロケール別コンテンツ宣言ファイル</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md" rel=''>翻訳</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md" rel=''>列挙</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/condition.md" rel=''>条件</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/nesting.md" rel=''>ネスティング</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md" rel=''>マークダウン</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md" rel=''>関数フェッチング</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md" rel=''>挿入</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file.md" rel=''>ファイル</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 環境</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md" rel=''>Next.js 16 と Intlayer</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md" rel=''>Next.js 15</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_14.md" rel=''>Next.js 14（App Router）</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md" rel=''>Next.js Page Router</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md" rel=''>コンパイラを使用した Next.js</a></li>
    </ul>
  </li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md" rel=''>React CRA</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md" rel=''>Vite + React</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md" rel=''>コンパイラを使用した Vite + React</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_router_v7.md" rel=''>React-router-v7</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_remix_3.md" rel=''>Remix 3</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md" rel=''>Tanstack start</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack+solid.md" rel=''>Solid</a></li>
    </ul>
  </li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro.md" rel=''>Astro</a>
    <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_react.md" rel=''>React</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_vue.md" rel=''>Vue</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_svelte.md" rel=''>Svelte</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_solid.md" rel=''>Solid</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_lit.md" rel=''>Lit</a></li>
    </ul>
  </li>

  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_native+expo.md" rel=''>React Native</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md" rel=''>Vite + Svelte</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_svelte_kit.md" rel=''>SvelteKit</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+preact.md" rel=''>Vite + Preact</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md" rel=''>Vite + Vue</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+solid.md" rel=''>Vite + Solid</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_solid_start.md" rel=''>Solid Start</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md" rel=''>Angular</a></li>  <li>
     <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md" rel=''>バックエンド</a>
     <ul>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md" rel=''>Express</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nestjs.md" rel=''>NestJS</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_fastify.md" rel=''>Fastify</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_adonisjs.md" rel=''>AdonisJS</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_hono.md" rel=''>Hono</a></li>
      <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_elysia.md" rel=''>Elysia</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📊 ベンチマーク</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md" rel=''>Next.js</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md" rel=''>TanStack Start</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/vue.md" rel=''>Vue</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/solid.md" rel=''>Solid</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md" rel=''>Svelte</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 ブログ</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/what_is_internationalization.md" rel=''>i18n とは何ですか？</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/internationalization_and_SEO.md" rel=''>i18n と SEO</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_next-i18next.md" rel=''>Intlayer と i18next</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_react-i18next.md" rel=''>Intlayer と react-intl</a></li>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_next-intl.md" rel=''>Intlayer と next-intl</a></li>
</ul>
</details>

## 多言語コンテンツ管理システム

単なる i18n ライブラリにとどまらず、Intlayer は完全な **多言語コンテンツ管理システム** です。フル機能の CMS が [app.intlayer.org](https://app.intlayer.org) で無料で使用できます。

Intlayer は、**開発者**、**コピーライター**、および **AI エージェント** を 1 つのワークフローに統合し、多言語ウェブサイトの作成と維持を容易にします。Intlayer は、次のスタックを単一のソリューションに置き換えます：

- i18n ソリューション（例：`i18next`、`next-intl`、`vue-i18n`）
- TMS（翻訳管理システム）（例：Crowdin、Phrase、Lokalise）
- ヘッドドレス CMS（例：Contentful、Strapi、Sanity）

![CMS Preview](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.webp?raw=true)

## 🌐 他言語の Readme

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/readme.md">English</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md">Русский</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md">日本語</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md">한국어</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md">Español</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md">Deutsch</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md">العربية</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md">Italiano</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md">English (UK)</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md">Português</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md">हिन्दी</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md">Türkçe</a>
</p>

## 🤝 コミュニティ

Intlayer はコミュニティと共に、そしてコミュニティのために構築されており、皆様のご意見をお待ちしています！

- ご提案はありますか？ [Issue を開く](https://github.com/aymericzip/intlayer/issues)
- バグや改善点を見つけましたか？[PR を送信する](https://github.com/aymericzip/intlayer/pulls)
- ヘルプが必要ですか？またはつながりたいですか？[Discord に参加する](https://discord.gg/7uxamYVeCk)

また、以下でもフォローできます：

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### 貢献

このプロジェクトへの貢献に関する詳細なガイドラインについては、[`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) ファイルをご参照ください。開発プロセス、コミットメッセージの規約、リリース手順などの重要な情報が含まれています。皆様の貢献は私たちにとって非常に価値があり、このプロジェクトをより良くするためのご尽力に感謝いたします！

[GitHub](https://github.com/aymericzip/intlayer)、[GitLab](https://gitlab.com/ay.pineau/intlayer)、または [Bitbucket](https://bitbucket.org/intlayer/intlayer/) を通じて貢献してください。

### ご支援ありがとうございます

Intlayer を気に入っていたいただけましたら、GitHub で ⭐ をお願いします。これにより他の方々がプロジェクトを見つけやすくなります！ [GitHub スターがなぜ重要なのかを知る](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-)。

[![スター履歴チャート](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
