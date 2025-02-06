# React Integration: `useDictionary` Hook Documentation

このセクションでは、Reactアプリケーション内で`useDictionary`フックを使用するための詳細なガイダンスを提供し、視覚的なエディターなしでローカライズされたコンテンツを効率的に扱えるようにします。

## Importing `useDictionary` in React

`useDictionary`フックは、コンテキストに基づいてReactアプリケーションに統合できます：

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // クライアントサイドのReactコンポーネントで使用します
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // クライアントサイドのReactコンポーネントで使用します
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // クライアントサイドのReactコンポーネントで使用します
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // サーバーサイドのReactコンポーネントで使用します
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // サーバーサイドのReactコンポーネントで使用します
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // サーバーサイドのReactコンポーネントで使用します
  ```

## Parameters

このフックは2つのパラメーターを受け入れます：

1. **`dictionary`**: 特定のキーのローカライズされたコンテンツを含む宣言された辞書オブジェクト。
2. **`locale`**（オプション）：希望するロケール。指定されていない場合は、現在のコンテキストのロケールがデフォルトになります。

## Content Declaration

すべての辞書オブジェクトは、型安全を確保し、ランタイムエラーを防ぐために構造化されたコンテンツファイルに宣言する必要があります。セットアップ手順については[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/get_started.md)を参照してください。以下は、コンテンツ宣言の例です：

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

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

/** @type {import('intlayer').DeclarationContent} */
// コンテンツの宣言
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

/** @type {import('intlayer').DeclarationContent} */
// コンテンツの宣言
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

## Example Usage in React

以下は、Reactコンポーネント内で`useDictionary`フックを使用する方法の例です：

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

## Server Integration

`IntlayerProvider`の外で`useDictionary`フックを使用している場合、コンポーネントをレンダリングするときにロケールを明示的にパラメーターとして提供する必要があります：

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

## Notes on Attributes

視覚的なエディタを使用した統合とは異なり、`buttonTitle.value`のような属性はここでは適用されません。代わりに、コンテンツに宣言されたローカライズされた文字列に直接アクセスします。

```jsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **型安全**: 常に`DeclarationContent`を使用して辞書を定義し、型安全を確保してください。
- **ローカライズの更新**: コンテンツを更新するときは、すべてのロケールが一貫していることを確認し、翻訳が不足しないようにしてください。

このドキュメントは、`useDictionary`フックの統合に焦点を当て、視覚的なエディタ機能に依存せずにローカライズされたコンテンツを管理するための合理化されたアプローチを提供します。
