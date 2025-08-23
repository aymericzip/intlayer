---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: はじめに
description: Intlayerの仕組みを紹介します。Intlayerがアプリケーションで使用する手順を確認します。各パッケージの役割を説明します。
keywords:
  - はじめに
  - 入門
  - Intlayer
  - アプリケーション
  - パッケージ
slugs:
  - doc
  - get-started
---

# Intlayer ドキュメント

公式Intlayerドキュメントへようこそ！ここでは、Next.js、React、Vite、Express、またはその他のJavaScript環境での国際化（i18n）ニーズに対応するために、Intlayerを統合、設定、習得するために必要なすべての情報を見つけることができます。

## はじめに

### Intlayerとは何ですか？

**Intlayer**は、JavaScript開発者向けに特別に設計された国際化ライブラリです。コードのあらゆる場所でコンテンツを宣言することができます。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScriptを使用することで、**Intlayer**は開発をより強力かつ効率的にします。

Intlayerは、コンテンツを簡単に編集・管理できるオプションのビジュアルエディタも提供しています。このエディタは、コンテンツ管理に視覚的なインターフェースを好む開発者や、コードを気にせずにコンテンツを生成するチームに特に役立ちます。

### 使用例

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// コンポーネントのコンテンツ定義
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## 主な機能

Intlayerは、現代のウェブ開発のニーズに応える多彩な機能を提供します。以下は主な機能で、それぞれの詳細なドキュメントへのリンクも記載しています：

- **国際化サポート**：組み込みの国際化サポートで、アプリケーションのグローバル展開を強化します。
- **ビジュアルエディター**：Intlayer専用のエディタープラグインで開発ワークフローを改善します。[ビジュアルエディターガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)をご覧ください。
- **設定の柔軟性**: 詳細な設定オプションを使ってセットアップをカスタマイズしましょう。詳しくは[設定ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。
- **高度なCLIツール**: Intlayerのコマンドラインインターフェースを使ってプロジェクトを効率的に管理しましょう。機能の詳細は[CLIツールのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)で確認できます。

## コアコンセプト

### 辞書 (Dictionary)

コードの近くに多言語コンテンツを整理し、一貫性と保守性を保ちましょう。

- **[はじめに](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)**  
  Intlayerでコンテンツを宣言する基本を学びましょう。

- **[翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)**  
  翻訳がどのように生成され、保存され、アプリケーションで利用されるかを理解します。

- **[列挙](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md)**  
  複数言語にわたる繰り返しや固定データセットを簡単に管理します。

- **[条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/conditional.md)**  
  Intlayerで条件ロジックを使用して動的なコンテンツを作成する方法を学びます。

- **[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)**  
  挿入プレースホルダーを使って文字列に値を挿入する方法を発見します。

- **[関数フェッチング](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)**  
  プロジェクトのワークフローに合わせてカスタムロジックでコンテンツを動的に取得する方法を確認します。

- **[マークダウン](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)**  
  Intlayerでリッチコンテンツを作成するためのMarkdownの使い方を学びます。

- **[ファイル埋め込み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file_embeddings.md)**  
  Intlayerで外部ファイルを埋め込み、コンテンツエディターで使用する方法を発見します。

- **[ネスティング](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/nesting.md)**  
  Intlayerでコンテンツをネストして複雑な構造を作成する方法を理解します。

### 環境と統合

Intlayerは柔軟性を念頭に設計されており、人気のあるフレームワークやビルドツールとのシームレスな統合を提供します：

- **[Next.js 15 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)**
- **[Next.js 14（App Router）と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_14.md)**
- **[Next.js Page Router と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md)**
- **[React CRA と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)**
- **[Vite + ReactでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)**
- **[React NativeとExpoでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_native+expo.md)**
- **[LynxとReactでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_lynx+react.md)**
- **[ExpressでのIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md)**

各統合ガイドには、**サーバーサイドレンダリング**、**動的ルーティング**、**クライアントサイドレンダリング**など、Intlayerの機能を活用するためのベストプラクティスが含まれており、高速でSEOに優れた、非常にスケーラブルなアプリケーションを維持できます。

## 貢献とフィードバック

私たちはオープンソースとコミュニティ主導の開発の力を重視しています。改善提案をしたい場合、新しいガイドを追加したい場合、またはドキュメントの問題を修正したい場合は、遠慮なくプルリクエストを提出するか、[GitHubリポジトリ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja)でイシューを開いてください。

**アプリケーションの翻訳をより速く、より効率的に始める準備はできていますか？** ぜひドキュメントに飛び込んで、今日からIntlayerを使い始めましょう。コンテンツを整理し、チームの生産性を高める、堅牢で効率的な国際化アプローチを体験してください。

---

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
