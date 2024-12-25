# Intlayer Documentation

ようこそ、公式**Intlayer**ドキュメントへ！ここでは、**Next.js**、**React**、**Vite**、**Express**、または他のJavaScript環境を使用して、国際化（i18n）ニーズに合わせてIntlayerを統合、構成、マスターするために必要なすべての情報を見つけることができます。

Intlayerは、アプリケーションの翻訳に柔軟でモダンなアプローチを提供します。私たちのドキュメントは、インストールと設定から、**AI駆動の翻訳**、**TypeScript**定義、**サーバーコンポーネント**サポートなどの高度な機能までをガイドし、シームレスで多言語対応の体験を構築する力を与えます。

---

## Getting Started

- **[Introduction](https://github.com/aymericzip/intlayer/blob/main/docs/ja/introduction.md)**  
  Intlayerの動作、コア機能、そしてi18nにおけるゲームチェンジャーとしての理由を概観します。

- **[How Intlayer Works](https://github.com/aymericzip/intlayer/blob/main/docs/ja/how_works_intlayer.md)**  
  アーキテクチャの設計に飛び込み、Intlayerがコンテンツの宣言から翻訳の配信までをどのように処理するか学びます。

- **[Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)**  
  あなたのプロジェクトのニーズに合わせてIntlayerをカスタマイズします。ミドルウェアオプション、ディレクトリ構造、高度な設定を探ります。

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)**  
  コマンドラインツールを使用してコンテンツと翻訳を管理します。コンテンツをプッシュおよびプルする方法、翻訳の自動化、その他多数について発見します。

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)**  
  非開発者とのコラボレーションを簡素化し、AIを活用して翻訳を強化します—私たちの無料で直感的なCMSで。

---

## Core Concepts

### Content Declaration

コードに近い多言語コンテンツを整理して、一貫性を持たせ、維持しやすくします。

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)**  
  Intlayerでのコンテンツ宣言の基本を学びます。

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/translation.md)**  
  翻訳がどのように生成、保存、アプリケーションで使用されるかを理解します。

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/enumeration.md)**  
  様々な言語で繰り返しまたは固定セットのデータを簡単に管理します。

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/function_fetching.md)**  
  プロジェクトのワークフローに合わせて、カスタムロジックでコンテンツを動的に取得する方法を確認します。

---

## Environments & Integrations

柔軟性を念頭に置いてIntlayerを構築し、人気のあるフレームワークやビルドツールにシームレスに統合しています：

- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_express.md)**

各統合ガイドには、Intlayerの機能を使用するためのベストプラクティス—**サーバーサイドレンダリング**、**動的ルーティング**、または**クライアントサイドレンダリング**など—が含まれており、迅速でSEOフレンドリー、かつ大規模なアプリケーションを維持できます。

---

## Packages

Intlayerのモジュラー設計は、特定の環境やニーズ向けの専用パッケージを提供します。

### `intlayer`

i18n設定を構成し、管理するためのコアユーティリティ関数。

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

**Express**ベースのアプリでIntlayerを活用します：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/express-intlayer/t.md)**  
  サーバールートやビュー用のミニマルで簡単な翻訳ヘルパー。

### `react-intlayer`

強力なフックを使用して**React**アプリケーションを強化します：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js**とシームレスに統合します：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useLocale.md)**

---

## Additional Resources

- **[Blog: Intlayer and i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_i18next.md)**  
  Intlayerが人気の**i18next**ライブラリとどのように補完し、比較されるかを学びます。

- **[Live Tutorial on YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  包括的なデモを視聴し、リアルタイムでIntlayerを統合する方法を学びます。

---

## Contributing & Feedback

私たちは、オープンソースとコミュニティ主導の開発の力を重視しています。改善を提案したり、新しいガイドを追加したり、ドキュメントの問題を修正したりしたい場合は、プルリクエストを提出するか、私たちの[GitHubリポジトリ](https://github.com/aymericzip/intlayer/blob/main/docs)に問題を開くことができます。

**アプリケーションをより迅速かつ効率的に翻訳する準備はできていますか？** 私たちのドキュメントを読み進めて、今日からIntlayerを使用し始めましょう。あなたのコンテンツを整理し、チームの生産性を高めるための堅牢で効率的な国際化アプローチを体験してください。

翻訳を楽しんでください！  
— Intlayerチーム
