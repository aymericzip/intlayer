<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer ロゴ" />
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
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
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

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/はじめに-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer とは何ですか？

ほとんどの i18n ライブラリは、複雑すぎるか、柔軟性に欠けるか、または最新のフレームワーク向けに設計されていません。

Intlayer は、ウェブおよびモバイルアプリ向けの**最新の i18n ソリューション**です。  
フレームワークに依存せず、**AI 搭載**で、無料の **CMS ＆ ビジュアルエディター**が含まれています。

**ロケールごとのコンテンツファイル**、**TypeScript の自動補完**、**ツリーシェイカブルな辞書**、および **CI/CD 統合**により、Intlayer は国際化を**より速く、よりクリーンに、よりスマートに**します。

## Intlayer の主な利点：

| 機能                                                                                                                                                | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **マルチフレームワーク対応**<br><br>Intlayer は、Next.js、React、Vite、Vue.js、Nuxt、Preact、Express など、主要なフレームワークやライブラリすべてに対応しています。                                                                                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **JavaScript 駆動のコンテンツ管理**<br><br>JavaScript の柔軟性を活用して、コンテンツを効率的に定義および管理します。<br><br> - [コンテンツ宣言](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **ロケール別コンテンツ宣言ファイル**<br><br>自動生成の前にコンテンツを一度宣言することで、開発をスピードアップします。<br><br> - [ロケール別コンテンツ宣言ファイル](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">                            | **コンパイラ**<br><br>Intlayer コンパイラは、コンポーネントからコンテンツを自動的に抽出し、辞書ファイルを作成します。<br><br> - [コンパイラ](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **型安全な環境**<br><br>TypeScript を活用して、コンテンツ定義やコードのエラーを防ぎつつ、IDE の自動補完機能も利用できます。<br><br> - [TypeScript の設定](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **簡素化されたセットアップ**<br><br>最小限の設定で迅速に開始できます。国際化、ルーティング、AI、ビルド、コンテンツ管理の設定を簡単に調整可能です。<br><br> - [Next.js 統合を探る](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **簡素化されたコンテンツ取得**<br><br>各コンテンツごとに `t` 関数を呼び出す必要はありません。単一のフックを使ってすべてのコンテンツを直接取得できます。<br><br> - [React 統合](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **一貫したサーバーコンポーネントの実装**<br><br>Next.js のサーバーコンポーネントに完全に適合し、クライアントコンポーネントとサーバーコンポーネントの両方で同じ実装を使用できます。各サーバーコンポーネントに `t` 関数を渡す必要はありません。<br><br> - [サーバーコンポーネント](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **整理されたコードベース**<br><br>コードベースをより整理された状態に保ちます：1つのコンポーネント = 同じフォルダ内の1つの辞書。翻訳をそれぞれのコンポーネントの近くに配置することで、保守性と明確さを向上させます。<br><br> - [Intlayer の仕組み](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **強化されたルーティング**<br><br>Next.js、React、Vite、Vue.js などの複雑なアプリケーション構造にシームレスに対応し、アプリのルーティングを完全にサポートします。<br><br> - [Next.js 統合を探る](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Markdown サポート**<br><br>多言語コンテンツ（プライバシーポリシー、ドキュメントなど）向けに、ロケールファイルやリモートの Markdown をインポートして解釈します。Markdown のメタデータを解釈し、コード内でアクセス可能にします。<br><br> - [コンテンツファイル](https://intlayer.org/doc/concept/content/file)                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **無料のビジュアルエディター ＆ CMS**<br><br>コンテンツライター向けに無料のビジュアルエディターと CMS が利用可能で、ローカリゼーションプラットフォームは不要です。Git を使ってコンテンツを同期させるか、CMS で完全または部分的に外部化できます。<br><br> - [Intlayer エディター](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **ツリーシェイカブルコンテンツ**<br><br>ツリーシェイカブルコンテンツにより、最終バンドルのサイズを削減します。コンポーネントごとにコンテンツを読み込み、未使用のコンテンツはバンドルから除外されます。遅延読み込みをサポートし、アプリの読み込み効率を向上させます。<br><br> - [アプリビルドの最適化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **静的レンダリング**<br><br>静的レンダリングを妨げません。<br><br> - [Next.js 統合](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **AI 駆動の翻訳**<br><br>Intlayer の高度な AI 駆動翻訳ツールを使用し、ご自身の AI プロバイダー / API キーを使って、ワンクリックでウェブサイトを 231 言語に変換します。 <br><br> - [CI/CD 統合](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自動入力](https://intlayer.org/doc/concept/auto-fill)                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCP サーバー統合**<br><br>IDE の自動化のための MCP（モデルコンテキストプロトコル）サーバーを提供し、開発環境内でシームレスなコンテンツ管理と国際化（i18n）ワークフローを可能にします。<br><br> - [MCP サーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode 拡張機能**<br><br>Intlayer は、コンテンツと翻訳の管理、辞書の構築、コンテンツの翻訳などを支援する VSCode 拡張機能を提供します。<br><br> - [VSCode 拡張機能](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **相互運用性**<br><br>react-i18next、next-i18next、next-intl, react-intl, vue-i18n との相互運用性を可能にします。<br><br> - [Intlayer と react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer と next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer と next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer と vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |

---

## 📦 インストール

今日から Intlayer を始めて、よりスムーズで強力な国際化アプローチを体験しましょう。

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/はじめに-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
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

<a href="https://intlayer.org/doc/environment/nextjs"> 完全ガイドを見る → </a>

## 🎥 YouTube でのライブチュートリアル

[![Intlayer を使ったアプリケーションの国際化方法](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/はじめに-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 目次

Intlayer の包括的なドキュメントを探索し、Intlayer の使い始め方やプロジェクトへの統合方法を学びましょう。

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 はじめに</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>なぜ Intlayer なのか？</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>イントロダクション</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ コンセプト</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>Intlayer の仕組み</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>設定</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>コンパイラ</a></li>

  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Intlayer エディター</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>辞書</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>ロケール別コンテンツ宣言ファイル</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>翻訳</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>列挙</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>条件</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>ネスティング</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>マークダウン</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>関数フェッチング</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>挿入</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>ファイル</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 環境</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Next.js 16 と Intlayer</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14（App Router）</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>コンパイラを使用した Next.js</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>コンパイラを使用した Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start" rel=''>Tanstack start</a></li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li>
     <a href="https://intlayer.org/doc/environment/express" rel=''>バックエンド</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
      <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/fastify" rel=''>Fastify</a></li>
      <li><a href="https://intlayer.org/doc/environment/adonisjs" rel=''>AdonisJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/hono" rel=''>Hono</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 ブログ</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/what_is_internationalization.md" rel=''>i18n とは何ですか？</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n と SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer と i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer と react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer と next-intl</a></li>
</ul>
</details>

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
