# Intlayer: アプリケーションを翻訳するための近道

**Intlayer**は、JavaScript開発者向けに設計された国際化ライブラリです。コード内のどこでもコンテンツを宣言できるようにします。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できます。TypeScriptを使用することで、**Intlayer**は開発をより強力かつ効率的にします。

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

- **JavaScriptベースのコンテンツ管理**: JavaScriptの柔軟性を活かして、効率的にコンテンツを定義および管理。
- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義を正確かつエラーのないものに。
- **統合されたコンテンツファイル**: 翻訳を対応するコンポーネントの近くに保ち、保守性と明確さを向上。
- **簡素化されたセットアップ**: 最小限の設定で迅速に開始可能、特にNext.jsプロジェクトに最適化。
- **サーバーコンポーネントのサポート**: Next.jsのサーバーコンポーネントに完全対応し、スムーズなサーバーサイドレンダリングを実現。
- **強化されたルーティング**: Next.jsアプリのルーティングを完全サポートし、複雑なアプリケーション構造にシームレスに適応。
- **相互運用性**: [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_react-i18next.md)、[next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_next-i18next.md)、[next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_next-intl.md)、および[react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_react-intl.md)との相互運用性を提供。
