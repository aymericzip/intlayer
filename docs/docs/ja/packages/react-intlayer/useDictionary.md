# React統合: `useDictionary`フックのドキュメント

このセクションでは、Reactアプリケーション内で`useDictionary`フックを使用するための詳細なガイダンスを提供し、ビジュアルエディタを使用せずに効率的にローカライズされたコンテンツを管理する方法を説明します。

## Reactでの`useDictionary`のインポート

`useDictionary`フックは、以下のコンテキストに基づいてインポートすることでReactアプリケーションに統合できます:

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // クライアントサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // クライアントサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // クライアントサイドのReactコンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // サーバーサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // サーバーサイドのReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // サーバーサイドのReactコンポーネントで使用
  ```

## パラメータ

このフックは、以下の2つのパラメータを受け取ります:

1. **`dictionary`**: 特定のキーに対するローカライズされたコンテンツを含む宣言済みの辞書オブジェクト。
2. **`locale`** (オプション): 希望するロケール。指定されない場合は現在のコンテキストのロケールがデフォルトになります。

## 辞書

すべての辞書オブジェクトは、型の安全性を確保し、実行時エラーを防ぐために構造化されたコンテンツファイルで宣言する必要があります。セットアップ手順は[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)で確認できます。以下はコンテンツ宣言の例です:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
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
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
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
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
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
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## Reactでの使用例

以下は、Reactコンポーネントで`useDictionary`フックを使用する例です:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## サーバー統合

`IntlayerProvider`の外部で`useDictionary`フックを使用する場合、コンポーネントをレンダリングする際にロケールを明示的にパラメータとして指定する必要があります:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## 属性に関する注意点

ビジュアルエディタを使用する統合とは異なり、`buttonTitle.value`のような属性はここでは適用されません。代わりに、コンテンツで宣言されたローカライズされた文字列に直接アクセスします。

```jsx
<button title={content.title}>{content.content}</button>
```

## 追加のヒント

- **型の安全性**: 辞書を定義する際は常に`Dictionary`を使用して型の安全性を確保してください。
- **ローカライズの更新**: コンテンツを更新する際は、すべてのロケールが一貫していることを確認し、翻訳漏れを防いでください。

このドキュメントは、`useDictionary`フックの統合に焦点を当てており、ビジュアルエディタ機能に依存せずにローカライズされたコンテンツを管理するための効率的なアプローチを提供します。
