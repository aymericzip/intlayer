---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Intlayer ドキュメント - JavaScript向け完全i18nガイド
description: JavaScript、React、Next.js、Expressなどのフレームワーク向けのモダンな国際化ライブラリIntlayerの完全ドキュメント。
keywords:
  - intlayer
  - 国際化
  - i18n
  - JavaScript
  - React
  - Next.js
  - ドキュメント
  - 翻訳
  - 多言語
slugs:
  - doc
  - index
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴初期化
---

# Intlayer ドキュメント

公式の**Intlayer**ドキュメントへようこそ！ここでは、**Next.js**、**React**、**Vite**、**Express**、またはその他のJavaScript環境で作業しているかに関わらず、Intlayerを統合、設定、そしてマスターするために必要なすべての情報を見つけることができます。

Intlayerは、アプリケーションの翻訳に柔軟でモダンなアプローチを提供します。インストールとセットアップから、**AIによる翻訳**、**TypeScript**定義、**サーバーコンポーネント**対応などの高度な機能まで、ドキュメントがあなたを導き、シームレスで多言語対応の体験を実現する力を与えます。

---

## はじめに

- **[イントロダクション](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/introduction.md)**  
  Intlayerの仕組み、そのコア機能、そしてなぜi18nにおいて画期的な存在であるかの概要を把握しましょう。

- **[Intlayerの仕組み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md)**  
  アーキテクチャ設計に深く入り込み、Intlayerがコンテンツの宣言から翻訳の配信までどのように処理しているかを学びます。

- **[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)**  
  プロジェクトのニーズに合わせてIntlayerをカスタマイズしましょう。ミドルウェアのオプション、ディレクトリ構造、そして高度な設定を探ります。

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)**  
  コンテンツと翻訳をコマンドラインツールで管理します。コンテンツのプッシュやプル、翻訳の自動化などの方法を発見してください。

- **[Intlayerエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)**  
  非開発者とのコラボレーションを簡素化し、無料で直感的なCMS内でAIを活用して翻訳を強化します。

---

## コアコンセプト

### 辞書

多言語コンテンツをコードの近くに整理し、一貫性と保守性を保ちます。

- **[はじめに](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)**  
  Intlayerでコンテンツを宣言する基本を学びます。

- **[翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)**  
  翻訳がどのように生成され、保存され、アプリケーションで利用されるかを理解しましょう。

- **[列挙](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md)**  
  複数言語にわたる繰り返しや固定データのセットを簡単に管理します。

- **[条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/conditional.md)**  
  Intlayerで条件ロジックを使用して動的なコンテンツを作成する方法を学びます。

- **[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)**  
  挿入プレースホルダーを使って文字列に値を挿入する方法を発見しましょう。

- **[関数フェッチ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)**
- **[関数フェッチ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)**  
  プロジェクトのワークフローに合わせてカスタムロジックで動的にコンテンツを取得する方法を確認します。

- **[マークダウン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)**  
  Intlayerでリッチコンテンツを作成するためにMarkdownを使用する方法を学びます。

- **[ファイル埋め込み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file_embeddings.md)**  
  Intlayerで外部ファイルを埋め込み、コンテンツエディタで使用する方法を発見します。

- **[ネスティング](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/nesting.md)**  
  Intlayerでコンテンツをネストして複雑な構造を作成する方法を理解します。

---

## 環境と統合

Intlayerは柔軟性を念頭に置いて構築されており、人気のあるフレームワークやビルドツールとのシームレスな統合を提供します：

- **[Next.js 15とIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)**
- **[Next.js 14（App Router）とIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_14.md)**
- **[Next.js Page RouterとIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md)**
- **[React CRAとIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)**
- **[Vite + ReactとIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)**
- **[React Native と Expo での Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_native+expo.md)**
- **[Lynx と React での Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_lynx+react.md)**
- **[Express での Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md)**

各統合ガイドには、**サーバーサイドレンダリング**、**動的ルーティング**、**クライアントサイドレンダリング**など、Intlayer の機能を活用するためのベストプラクティスが含まれており、高速で SEO に優れ、非常にスケーラブルなアプリケーションを維持できます。

---

## パッケージ

Intlayer のモジュラー設計は、特定の環境やニーズに対応した専用パッケージを提供します。

### `intlayer`

i18n設定を構成および管理するためのコアユーティリティ関数。

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

**Express**ベースのアプリケーション内でIntlayerを活用しましょう：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/express-intlayer/t.md)**  
  サーバールートやビューのための、最小限でシンプルな翻訳ヘルパー。

### `react-intlayer`

**React** アプリケーションを強力なフックで強化しましょう：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

**Next.js** とシームレスに統合：

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/useLocale.md)**

---

## 追加リソース

- **[ブログ: Intlayer と i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_i18next.md)**  
  Intlayer が人気のある **i18next** ライブラリとどのように補完し、比較されるかを学びましょう。

- **[YouTubeでのライブチュートリアル](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  包括的なデモを視聴し、Intlayer をリアルタイムで統合する方法を学びましょう。

---

## 貢献とフィードバック

私たちはオープンソースとコミュニティ主導の開発の力を重視しています。改善提案、新しいガイドの追加、またはドキュメントの問題修正を希望される場合は、遠慮なくプルリクエストを送信するか、[GitHubリポジトリ](https://github.com/aymericzip/intlayer/blob/main/docs/docs)でイシューを開いてください。

**アプリケーションの翻訳をより速く、より効率的に始めませんか？** 今すぐドキュメントにアクセスしてIntlayerの使用を開始しましょう。コンテンツを整理し、チームの生産性を高める堅牢で効率的な国際化アプローチを体験してください。
