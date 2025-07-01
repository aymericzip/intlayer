---
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Intlayerの利点
description: プロジェクトでIntlayerを使用する利点とメリットを発見しましょう。なぜIntlayerが他のフレームワークの中で際立っているのかを理解してください。
keywords:
  - 利点
  - メリット
  - Intlayer
  - フレームワーク
  - 比較
slugs:
  - doc
  - concept
  - interest
---

# Intlayer: あなたのウェブサイトを翻訳するためのカスタマイズされた方法

**Intlayer** はJavaScript開発者向けに特別に設計された国際化ライブラリです。コードのあらゆる場所でコンテンツの宣言を可能にします。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScriptを使用することで、**Intlayer** は開発をより強力かつ効率的にします。

## 使用例

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// コンポーネントの翻訳コンテンツの定義
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// コンポーネントの翻訳コンテンツの定義
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

// コンポーネント例の定義
export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// コンポーネント例の定義
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// コンポーネント例の定義
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## なぜIntlayerを選ぶのか？

| 機能                                 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JavaScript駆動のコンテンツ管理**   | JavaScriptの柔軟性を活用して、コンテンツを効率的に定義および管理します。                                                                                                                                                                                                                                                                                                                                                                                                     |
| **型安全な環境**                     | TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーのないものになるようにします。                                                                                                                                                                                                                                                                                                                                                                                     |
| **統合されたコンテンツファイル**     | 翻訳をそれぞれのコンポーネントの近くに配置し、保守性と明確さを向上させます。                                                                                                                                                                                                                                                                                                                                                                                                 |
| **簡素化されたセットアップ**         | 最小限の設定で迅速に開始でき、特にNext.jsプロジェクトに最適化されています。                                                                                                                                                                                                                                                                                                                                                                                                  |
| **サーバーコンポーネントサポート**   | Next.jsのサーバーコンポーネントに完全対応し、スムーズなサーバーサイドレンダリングを実現します。                                                                                                                                                                                                                                                                                                                                                                              |
| **強化されたルーティング**           | Next.jsアプリのルーティングを完全にサポートし、複雑なアプリケーション構造にもシームレスに適応します。                                                                                                                                                                                                                                                                                                                                                                        |
| **整理されたコードベース**           | コードベースをより整理された状態に保ちます：1つのコンポーネントにつき、同じフォルダー内に1つの辞書を配置します。                                                                                                                                                                                                                                                                                                                                                             |
| **CI 自動翻訳**                      | 独自の OpenAI API キーを使用して CI 内で翻訳を自動入力し、L10n プラットフォームを必要としません。                                                                                                                                                                                                                                                                                                                                                                            |
| **MCPサーバー統合**                  | IDEの自動化のためのMCP（モデルコンテキストプロトコル）サーバーを提供し、開発環境内でシームレスなコンテンツ管理と国際化ワークフローを可能にします。[詳細はこちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)。                                                                                                                                                                                                                              |
| **Markdown サポート**                | プライバシーポリシーのような多言語コンテンツのために、マークダウンファイルをインポートして解釈します。                                                                                                                                                                                                                                                                                                                                                                       |
| **無料のビジュアルエディターとCMS**  | 翻訳のためにコンテンツライターと協力する必要がある場合、無料のビジュアルエディターとCMSが利用可能です。これにより、ローカリゼーションプラットフォームの必要性が再び排除され、コードベースからのコンテンツの外部化が可能になります。                                                                                                                                                                                                                                          |
| **簡略化されたコンテンツ取得**       | 各コンテンツごとに `t` 関数を呼び出す必要はありません。単一のフックを使用して、すべてのコンテンツを直接取得できます。                                                                                                                                                                                                                                                                                                                                                        |
| **一貫した実装**                     | クライアントコンポーネントとサーバーコンポーネントの両方で同じ実装を使用でき、各サーバーコンポーネントに `t` 関数を渡す必要がありません。                                                                                                                                                                                                                                                                                                                                    |
| **ツリーシェイカブルなコンテンツ**   | コンテンツはツリーシェイカブルであり、最終的なバンドルを軽量化します。                                                                                                                                                                                                                                                                                                                                                                                                       |
| **ノンブロッキング静的レンダリング** | Intlayerは`next-intl`のように静的レンダリングをブロックしません。                                                                                                                                                                                                                                                                                                                                                                                                            |
| **非ブロッキング静的レンダリング**   | Intlayerは`next-intl`のように静的レンダリングをブロックしません。                                                                                                                                                                                                                                                                                                                                                                                                            |
| **相互運用性**                       | [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react-i18next.md)、[next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_next-i18next.md)、[next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_next-intl.md)、および[react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react-intl.md)との相互運用性を提供します。 |

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
