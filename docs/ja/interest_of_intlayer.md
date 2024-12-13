# Intlayer: あなたのアプリケーションを翻訳するための近道

**Intlayer** は、JavaScript 開発者のために特別に設計された国際化ライブラリです。コードのどこにでもコンテンツを宣言することを可能にします。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScript を使用することで、**Intlayer** は開発をより強力で効率的にします。

## 使用例

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## なぜ Intlayer を選ぶのか？

- **JavaScript 主導のコンテンツ管理**: JavaScript の柔軟性を利用して、コンテンツを効率的に定義および管理します。
- **タイプ安全な環境**: TypeScript を活用して、すべてのコンテンツ定義が正確でエラーフリーであることを確保します。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントに近く保ち、保守性と明確性を向上させます。
- **簡素化されたセットアップ**: 最小限の設定で迅速に立ち上げ可能で、特に Next.js プロジェクトに最適化されています。
- **サーバーコンポーネントのサポート**: Next.js のサーバーコンポーネントに完全に適しており、スムーズなサーバーサイドレンダリングを保証します。
- **強化されたルーティング**: Next.js アプリルーティングの完全なサポート、複雑なアプリケーション構造にシームレスに適応します。
- **相互運用性**: i18next の相互運用性を許可します。(ベータ)
