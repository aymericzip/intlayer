# Intlayer ドキュメント

公式の **Intlayer** ドキュメントへようこそ！ここでは、**Next.js**、**React**、**Vite**、**Express**、またはその他のJavaScript環境での国際化（i18n）ニーズに対応するためのIntlayerの統合、設定、習得に必要なすべての情報を見つけることができます。

Intlayerは、アプリケーションの翻訳に柔軟でモダンなアプローチを提供します。このドキュメントでは、インストールとセットアップから、**AIによる翻訳**、**TypeScript**定義、**サーバーコンポーネント**サポートなどの高度な機能まで、シームレスで多言語対応の体験を作成するためのガイドを提供します。

---

## はじめに

- **[イントロダクション](https://github.com/aymericzip/intlayer/blob/main/docs/ja/introduction.md)**  
  Intlayerの仕組み、そのコア機能、そしてi18nにおけるゲームチェンジャーである理由を概観します。

- **[Intlayerの仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/ja/how_works_intlayer.md)**  
  アーキテクチャ設計に飛び込み、Intlayerがコンテンツ宣言から翻訳配信までをどのように処理するかを学びます。

- **[設定](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)**  
  プロジェクトのニーズに合わせてIntlayerをカスタマイズします。ミドルウェアオプション、ディレクトリ構造、詳細設定を探ります。

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)**  
  コマンドラインツールを使用してコンテンツと翻訳を管理します。コンテンツのプッシュとプル、翻訳の自動化などを学びます。

- **[Intlayer エディター](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_visual_editor.md)**  
  非開発者とのコラボレーションを簡素化し、AIを活用した翻訳を無料で直感的なCMSで実現します。

---

## コアコンセプト

### 辞書

コードに近い場所で多言語コンテンツを整理し、一貫性と保守性を保ちます。

- **[はじめに](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)**  
  Intlayerでコンテンツを宣言する基本を学びます。

- **[翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/translation.md)**  
  翻訳がどのように生成され、保存され、アプリケーションで利用されるかを理解します。

- **[列挙](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/enumeration.md)**  
  様々な言語で繰り返し使用される固定データセットを簡単に管理します。

- **[関数フェッチ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/function_fetching.md)**  
  プロジェクトのワークフローに合わせてカスタムロジックでコンテンツを動的に取得する方法を確認します。

---

## 環境と統合

Intlayerは柔軟性を念頭に設計されており、人気のあるフレームワークやビルドツールとのシームレスな統合を提供します：

- **[Next.js 15でのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)**
- **[Next.js 14（App Router）でのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_14.md)**
- **[Next.js Page RouterでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_page_router.md)**
- **[React CRAでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)**
- **[Vite + ReactでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)**
- **[ExpressでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_express.md)**

各統合ガイドには、**サーバーサイドレンダリング**、**動的ルーティング**、**クライアントサイドレンダリング**などのIntlayerの機能を使用するためのベストプラクティスが含まれており、高速でSEOに優れた、スケーラブルなアプリケーションを維持できます。

---

## パッケージ

Intlayerのモジュール設計は、特定の環境やニーズに対応する専用パッケージを提供します：

### `intlayer`

i18n設定を構成および管理するためのコアユーティリティ関数。

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

**Express**ベースのアプリでIntlayerを活用：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/express-intlayer/t.md)**  
  サーバールートやビュー用の最小限で簡単な翻訳ヘルパー。

### `react-intlayer`

**React**アプリケーションを強化する強力なフック：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js**とのシームレスな統合：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useLocale.md)**

---

## 追加リソース

- **[ブログ: Intlayerとi18next](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_i18next.md)**  
  Intlayerが人気の**i18next**ライブラリをどのように補完し、比較されるかを学びます。

- **[YouTubeでのライブチュートリアル](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  包括的なデモを視聴し、リアルタイムでIntlayerを統合する方法を学びます。

---

## 貢献とフィードバック

オープンソースとコミュニティ主導の開発の力を大切にしています。改善提案、新しいガイドの追加、またはドキュメントの問題修正を希望する場合は、[GitHubリポジトリ](https://github.com/aymericzip/intlayer/blob/main/docs)でプルリクエストを送信するか、問題を報告してください。

**アプリケーションをより速く、効率的に翻訳する準備はできましたか？** ドキュメントを読み進めて、今日からIntlayerを使い始めましょう。コンテンツを整理し、チームの生産性を向上させる堅牢で効率的な国際化アプローチを体験してください。

翻訳を楽しんでください！  
— Intlayer チーム
