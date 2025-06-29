---
docName: introduction
url: https://intlayer.org/doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: イントロダクション
description: Intlayerの仕組みを発見してください。アプリケーションでIntlayerが使用する手順を確認してください。さまざまなパッケージの機能を確認してください。
keywords:
  - イントロダクション
  - 始める
  - Intlayer
  - アプリケーション
  - パッケージ
---

# Intlayer ドキュメント

公式の Intlayer ドキュメントへようこそ！ここでは、Next.js、React、Vite、Express、またはその他の JavaScript 環境での国際化 (i18n) ニーズに対応するための Intlayer の統合、設定、および習得に必要なすべての情報を見つけることができます。

## はじめに

### Intlayer とは？

**Intlayer** は、JavaScript 開発者向けに特別に設計された国際化ライブラリです。コード内のどこにでもコンテンツを宣言できるようにします。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScript を使用して、**Intlayer** は開発をより強力かつ効率的にします。

Intlayer は、コンテンツを簡単に編集および管理できるオプションのビジュアルエディターも提供します。このエディターは、コンテンツ管理のためのビジュアルインターフェースを好む開発者や、コードを気にせずにコンテンツを生成するチームに特に役立ちます。

### 使用例

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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

Intlayer は、現代のウェブ開発のニーズに応えるさまざまな機能を提供します。以下は主な機能と、それぞれの詳細なドキュメントへのリンクです：

- **国際化サポート**: 組み込みの国際化サポートでアプリケーションのグローバル展開を強化します。
- **ビジュアルエディター**: Intlayer 用に設計されたエディタープラグインで開発ワークフローを改善します。[ビジュアルエディターガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) をご覧ください。
- **柔軟な設定**: [設定ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) に詳述された広範な設定オプションでセットアップをカスタマイズします。
- **高度な CLI ツール**: Intlayer のコマンドラインインターフェースを使用してプロジェクトを効率的に管理します。[CLI ツールドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md) で機能を探ってください。

## コアコンセプト

### 辞書

多言語コンテンツをコードの近くに整理して、一貫性と保守性を保ちます。

- **[はじめに](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)**  
  Intlayer でコンテンツを宣言する基本を学びます。

- **[翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)**  
  翻訳がどのように生成、保存、およびアプリケーションで利用されるかを理解します。

- **[列挙](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md)**  
  さまざまな言語で繰り返しまたは固定されたデータセットを簡単に管理します。

- **[関数フェッチ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)**  
  プロジェクトのワークフローに合わせてカスタムロジックでコンテンツを動的に取得する方法を確認します。

### 環境と統合

Intlayer は柔軟性を念頭に設計されており、人気のあるフレームワークやビルドツールとシームレスに統合できます：

- **[Next.js 15 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (App Router) と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_14.md)**
- **[Next.js ページルーターと Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md)**
- **[React CRA と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)**
- **[Vite + React と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)**
- **[Express と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md)**

各統合ガイドには、**サーバーサイドレンダリング**、**動的ルーティング**、または **クライアントサイドレンダリング** などの Intlayer の機能を使用するためのベストプラクティスが含まれています。これにより、高速で SEO に優れた、スケーラブルなアプリケーションを維持できます。

## 貢献とフィードバック

私たちはオープンソースとコミュニティ主導の開発の力を重視しています。改善提案、新しいガイドの追加、またはドキュメントの問題の修正を希望する場合は、[GitHub リポジトリ](https://github.com/aymericzip/intlayer/blob/main/docs/docs) でプルリクエストを送信するか、問題を報告してください。

**アプリケーションをより速く、より効率的に翻訳する準備はできましたか？** ドキュメントを読み進めて、今日から Intlayer を使い始めましょう。コンテンツを整理し、チームの生産性を向上させる堅牢で効率的な国際化アプローチを体験してください。

翻訳を楽しんでください！
