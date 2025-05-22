# Intlayer: あなたのウェブサイトを翻訳するためのカスタマイズされた方法

**Intlayer**は、JavaScript開発者向けに特別に設計された国際化ライブラリです。コード内のどこでもコンテンツを宣言することができます。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できます。TypeScriptを使用することで、**Intlayer**は開発をより堅牢で効率的にします。

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

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## なぜIntlayerを選ぶのか？

- **JavaScriptベースのコンテンツ管理**: JavaScriptの柔軟性を活用して、コンテンツを効率的に定義・管理できます。
- **型安全な環境**: TypeScriptを使用して、すべてのコンテンツ定義が正確でエラーのないことを保証します。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントの近くに保持し、保守性と明確性を向上させます。
- **簡素化されたセットアップ**: 最小限の設定で素早く始められ、Next.jsプロジェクトに特に最適化されています。
- **サーバーコンポーネントのサポート**: Next.jsのサーバーコンポーネントに最適で、スムーズなサーバーサイドレンダリングを保証します。
- **改善されたルーティング**: Next.jsアプリケーションのルーティングを完全にサポートし、複雑なアプリケーション構造にシームレスに適応します。
- **整理されたコードベース**: コードベースをより整理された状態に保ちます：1コンポーネント = 1辞書を同じフォルダに配置。
- **自動TypeScript型**: TypeScript型が自動的に実装され、キーの名前変更や削除によるコードの破損を防ぎます。
- **CI自動翻訳**: 独自のOpenAI APIキーを使用してCIで翻訳を自動的に入力し、L10nプラットフォームの必要性を排除します。
- **Markdownサポート**: プライバシーポリシーなどの多言語コンテンツ用のMarkdownファイルをインポートして解釈します。
- **無料のビジュアルエディタとCMS**: コンテンツライターと翻訳作業を行う必要がある場合に利用できる無料のビジュアルエディタとCMSを提供し、ローカライゼーションプラットフォームの必要性を再度排除し、コードベースからのコンテンツの外部化を可能にします。
- **簡素化されたコンテンツ取得**: 各コンテンツ要素に対して`t`関数を呼び出す必要がなく、単一のフックを使用してすべてのコンテンツを直接取得できます。
- **一貫した実装**: クライアントとサーバーコンポーネントで同じ実装を使用し、各サーバーコンポーネントを通じて`t`関数を渡す必要がありません。
- **Tree-shakableコンテンツ**: コンテンツはtree-shakableで、最終的なバンドルを軽量化します。
- **非ブロッキング静的レンダリング**: Intlayerは`next-intl`のように静的レンダリングをブロックしません。
- **相互運用性**: [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-i18next.md)、[next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-i18next.md)、[next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-intl.md)、[react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-intl.md)との相互運用性を可能にします。
