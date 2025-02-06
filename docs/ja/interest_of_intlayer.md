# Intlayer: アプリケーションを翻訳するための近道

**Intlayer** は、JavaScript 開発者向けに特別に設計された国際化ライブラリです。コードのどこにでもコンテンツを宣言できるようにします。マルチリンガルコンテンツの宣言を構造化された辞書に変換し、コードに容易に統合できるようにします。TypeScript を使用することで、**Intlayer** はあなたの開発をより強力で効率的にします。

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

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

## なぜ Intlayer を選ぶべきか？

- **JavaScript 主導のコンテンツ管理**: JavaScript の柔軟性を活用して、効率的にコンテンツを定義および管理します。
- **型安全な環境**: TypeScript を活用して、すべてのコンテンツ定義が正確でエラーがないことを保証します。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントに近づけて保管し、保守性と明確性を向上させます。
- **簡素化されたセットアップ**: 最小限の設定で迅速に立ち上げが可能で、特に Next.js プロジェクトに最適化されています。
- **サーバーコンポーネントのサポート**: Next.js のサーバーコンポーネントに完全に適合し、スムーズなサーバーサイドレンダリングを保証します。
- **強化されたルーティング**: Next.js アプリのルーティングを完全にサポートし、複雑なアプリケーション構造にシームレスに適応します。
- **相互運用性**: i18next との相互運用性を許可します。(ベータ版)
