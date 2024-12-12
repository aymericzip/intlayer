# React Integration: `useDictionary` フックのドキュメント

このセクションでは、Reactアプリケーション内での`useDictionary`フックの使用に関する詳細なガイダンスを提供します。これにより、視覚的エディターなしでローカライズされたコンテンツを効率的に扱うことが可能になります。

## Reactでの`useDictionary`のインポート

`useDictionary`フックは、コンテキストに基づいてReactアプリケーションに統合できます。

- **クライアントコンポーネント:**

  ```javascript
  import { useDictionary } from "react-intlayer"; // クライアントサイドのReactコンポーネントで使用されます
  ```

- **サーバーコンポーネント:**

  ```javascript
  import { useDictionary } from "react-intlayer/server"; // サーバーサイドのReactコンポーネントで使用されます
  ```

## パラメータ

フックは2つのパラメータを受け取ります。

1. **`dictionary`**: 特定のキーに対するローカライズされたコンテンツを含む宣言された辞書オブジェクト。
2. **`locale`**（オプション）: 希望するロケール。指定しない場合は、現在のコンテキストのロケールがデフォルトとなります。

## コンテンツの宣言

すべての辞書オブジェクトは、型安全性を確保し、ランタイムエラーを防ぐために構造化されたコンテンツファイルで宣言する必要があります。セットアップ手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)で確認できます。以下は、コンテンツ宣言の例です。

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## Reactでの使用例

以下は、Reactコンポーネント内で`useDictionary`フックを使用する方法の例です。

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "react-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## サーバー統合

`IntlayerProvider`の外で`useDictionary`フックを使用する場合、コンポーネントをレンダリングする際にはロケールを明示的にパラメータとして提供する必要があります。

```tsx
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## 属性に関する注意点

視覚的エディターを使用した統合とは異なり、`buttonTitle.value`のような属性はここでは適用されません。代わりに、コンテンツで宣言されたローカライズされた文字列に直接アクセスします。

```tsx
<button title={content.title}>{content.content}</button>
```

## 追加のヒント

- **型安全性**: 辞書を定義する際は常に`DeclarationContent`を使用して型安全性を確保してください。
- **ローカリゼーションの更新**: コンテンツを更新する際は、すべてのロケールが一貫していることを確認し、翻訳の欠落を避けてください。

このドキュメントでは、`useDictionary`フックの統合に焦点を当てており、視覚的エディター機能に依存せず、ローカライズされたコンテンツを管理するための合理的なアプローチを提供します。
