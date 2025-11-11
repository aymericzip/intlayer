<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer ロゴ" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer：AI翻訳とCMSを備えたオープンソースの柔軟なi18nツールキット。</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">ドキュメント</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm バージョン" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub スター" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="月間ダウンロード数" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="ライセンス"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="最終コミット"/>
  </a>
</p>

![ビデオを見る](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/はじめに-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayerとは何ですか？

ほとんどのi18nライブラリは、複雑すぎるか、柔軟性に欠けるか、または最新のフレームワーク向けに設計されていません。

Intlayerは、ウェブおよびモバイルアプリ向けの**最新のi18nソリューション**です。  
フレームワークに依存せず、**AI搭載**で、無料の**CMS＆ビジュアルエディター**が含まれています。

**ロケールごとのコンテンツファイル**、**TypeScriptの自動補完**、**ツリーシェイカブルな辞書**、および**CI/CD統合**により、Intlayerは国際化を**より速く、よりクリーンに、よりスマートに**します。

## Intlayerの主な利点：

| 機能                                                                                                                                                | 説明                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **クロスフレームワーク対応**<br><br>Intlayerは、Next.js、React、Vite、Vue.js、Nuxt、Preact、Expressなど、主要なフレームワークやライブラリすべてに対応しています。                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **JavaScript駆動のコンテンツ管理**<br><br>JavaScriptの柔軟性を活用して、コンテンツを効率的に定義および管理します。<br><br> - [コンテンツ宣言](https://intlayer.org/doc/concept/content)                                                                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **ロケール別コンテンツ宣言ファイル**<br><br>自動生成の前にコンテンツを一度宣言することで、開発をスピードアップします。<br><br> - [ロケール別コンテンツ宣言ファイル](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **型安全な環境**<br><br>TypeScriptを活用して、コンテンツ定義やコードのエラーを防ぎつつ、IDEの自動補完機能も利用できます。<br><br> - [TypeScriptの設定](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **簡素化されたセットアップ**<br><br>最小限の設定で迅速に開始できます。国際化、ルーティング、AI、ビルド、コンテンツ処理の設定を簡単に調整可能です。<br><br> - [Next.js統合を探る](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="機能" width="700">                      | **簡素化されたコンテンツ取得**<br><br>各コンテンツごとに `t` 関数を呼び出す必要はありません。単一のフックを使ってすべてのコンテンツを直接取得できます。<br><br> - [React 統合](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **一貫したサーバーコンポーネントの実装**<br><br>Next.jsのサーバーコンポーネントに完全に適合し、クライアントコンポーネントとサーバーコンポーネントの両方で同じ実装を使用できます。各サーバーコンポーネントに`t`関数を渡す必要はありません。<br><br> - [サーバーコンポーネント](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **整理されたコードベース**<br><br>コードベースをより整理された状態に保ちます：1つのコンポーネント = 同じフォルダ内の1つの辞書。翻訳をそれぞれのコンポーネントの近くに配置することで、保守性と明確さを向上させます。<br><br> - [Intlayerの仕組み](https://intlayer.org/doc/concept/how-works-intlayer)                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **強化されたルーティング**<br><br>Next.js、React、Vite、Vue.jsなどの複雑なアプリケーション構造にシームレスに対応し、アプリのルーティングを完全にサポートします。<br><br> - [Next.js統合を探る](https://intlayer.org/doc/environment/nextjs)                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Markdown サポート**<br><br>多言語コンテンツ（プライバシーポリシー、ドキュメントなど）向けに、ロケールファイルやリモートのMarkdownをインポートして解釈します。Markdownのメタデータを解釈し、コード内でアクセス可能にします。<br><br> - [コンテンツファイル](https://intlayer.org/doc/concept/content/file)                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **無料のビジュアルエディター＆CMS**<br><br>コンテンツライター向けに無料のビジュアルエディターとCMSが利用可能で、ローカリゼーションプラットフォームは不要です。Gitを使ってコンテンツを同期させるか、CMSで完全または部分的に外部化できます。<br><br> - [Intlayer エディター](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **ツリーシェイカブルコンテンツ**<br><br>ツリーシェイカブルコンテンツにより、最終バンドルのサイズを削減します。コンポーネントごとにコンテンツを読み込み、未使用のコンテンツはバンドルから除外されます。遅延読み込みをサポートし、アプリの読み込み効率を向上させます。<br><br> - [アプリビルドの最適化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **静的レンダリング**<br><br>静的レンダリングを妨げません。<br><br> - [Next.js 統合](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **AI駆動の翻訳**<br><br>Intlayerの高度なAI駆動翻訳ツールを使用し、ご自身のAIプロバイダー / APIキーを使って、ワンクリックでウェブサイトを231言語に変換します。 <br><br> - [CI/CD統合](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自動入力](https://intlayer.org/doc/concept/auto-fill)                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **MCPサーバー統合**<br><br>IDEの自動化のためのMCP（モデルコンテキストプロトコル）サーバーを提供し、開発環境内でシームレスなコンテンツ管理と国際化（i18n）ワークフローを可能にします。<br><br> - [MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode 拡張機能**<br><br>Intlayer は、コンテンツと翻訳の管理、辞書の構築、コンテンツの翻訳などを支援する VSCode 拡張機能を提供します。<br><br> - [VSCode 拡張機能](https://intlayer.org/doc/ja/vs-code-extension)                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **相互運用性**<br><br>react-i18next、next-i18next、next-intl、react-intlとの相互運用性を可能にします。<br><br> - [Intlayer と react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer と next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer と next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)           |

---

## 📦 インストール

今日からIntlayerを始めて、よりスムーズで強力な国際化アプローチを体験しましょう。

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
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

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> 完全ガイドを見る → </a>

## 🎥 YouTubeでのライブチュートリアル

[![Intlayerを使ったアプリケーションの国際化方法](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## 目次

Intlayerの包括的なドキュメントを探索し、Intlayerの使い始め方やプロジェクトへの統合方法を学びましょう。

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 はじめに</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">なぜIntlayerなのか？</a></li>
  <li><a href="https://intlayer.org/doc">イントロダクション</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ コンセプト</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Intlayerの仕組み</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">設定</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">AIプロバイダー</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayerエディター</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">辞書</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">ロケール別コンテンツ宣言ファイル</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">翻訳</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">列挙</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">条件</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">ネスティング</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">マークダウン</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">関数フェッチング</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">挿入</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">ファイル</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 環境</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Next.js 15 と Intlayer</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14（App Router）</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Tanstack スタート</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 ブログ</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/what_is_internationalization.md">i18nとは何か</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18nとSEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayerとi18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayerとreact-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer と next-intl</a></li>
</ul>
</details>

## 🌐 他言語の Readme

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[ドイツ語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[イタリア語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[英語（英国）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[ポルトガル語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[ヒンディー語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[トルコ語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 コミュニティ

Intlayerはコミュニティと共に、そしてコミュニティのために構築されており、皆様のご意見をお待ちしています！

- ご提案はありますか？ [Issueを開く](https://github.com/aymericzip/intlayer/issues)
- バグや改善点を見つけましたか？[プルリクエストを送信する](https://github.com/aymericzip/intlayer/pulls)
- ヘルプが必要ですか？またはつながりたいですか？[Discordに参加する](https://discord.gg/7uxamYVeCk)

また、以下でもフォローできます：

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### 貢献

### 貢献について

このプロジェクトへの貢献に関する詳細なガイドラインについては、[`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) ファイルをご参照ください。開発プロセス、コミットメッセージの規約、リリース手順などの重要な情報が含まれています。皆様の貢献は私たちにとって非常に価値があり、このプロジェクトをより良くするためのご尽力に感謝いたします！

### ご支援ありがとうございます

Intlayerを気に入っていただけましたら、GitHubで⭐をお願いします。これにより他の方々がプロジェクトを見つけやすくなります！

[![スター履歴チャート](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
