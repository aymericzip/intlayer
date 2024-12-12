# React Integration: `useDictionary` フック ドキュメンテーション

このセクションでは、Reactアプリケーション内での`useDictionary`フックの使用に関する詳細なガイダンスを提供し、ビジュアルエディターを使用せずにローカライズされたコンテンツを効率的に処理できるようにします。

## Reactでの`useDictionary`のインポート

`useDictionary`フックは、文脈に基づいてインポートすることによってReactアプリケーションに統合できます。

- **クライアントコンポーネント:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // クライアント側のReactコンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // サーバー側のReactコンポーネントで使用
  ```

## パラメータ

このフックは2つのパラメータを受け取ります。

1. **`dictionary`**: 特定のキーに対するローカライズされたコンテンツを含む宣言済み辞書オブジェクト。
2. **`locale`**（オプション）: 希望するロケール。指定しない場合は、現在のコンテキストのロケールがデフォルトとなります。

## コンテンツ宣言

すべての辞書オブジェクトは、型安全性を確保し、ランタイムエラーを防ぐために構造化されたコンテンツファイルで宣言する必要があります。セットアップ手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)で確認できます。コンテンツ宣言の例は以下の通りです。

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

以下は、Reactコンポーネントで`useDictionary`フックを使用する方法の例です。

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
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

`useDictionary`フックを`IntlayerServerProvider`の外で使用する場合、コンポーネントをレンダリングするときにロケールを明示的にパラメータとして提供する必要があります。

```tsx
import { useDictionary } from "next-intlayer/server";
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

## 属性に関する注意事項

ビジュアルエディターを使用した統合とは異なり、`buttonTitle.value`のような属性はここでは適用されません。代わりに、コンテンツに宣言されたローカライズされた文字列に直接アクセスします。

```tsx
<button title={content.title}>{content.content}</button>
```

## 追加のヒント

- **型安全性**: 常に`DeclarationContent`を使用して辞書を定義し、型安全性を確保してください。
- **ローカライズの更新**: コンテンツを更新する際は、すべてのロケールが一貫していることを確認し、翻訳漏れを避けてください。

このドキュメンテーションは、`useDictionary`フックの統合に焦点を当て、ビジュアルエディター機能に依存せずにローカライズされたコンテンツを管理するための効率的なアプローチを提供します。
