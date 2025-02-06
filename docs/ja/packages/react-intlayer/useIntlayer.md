# React Integration: `useIntlayer` フックのドキュメント

このセクションでは、Reactアプリケーション内で`useIntlayer`フックを使用する方法についての詳細なガイダンスを提供し、効率的なコンテンツのローカリゼーションを実現します。

## Reactでの`useIntlayer`のインポート

`useIntlayer`フックは、コンテキストに基づいてインポートすることでReactアプリケーションに統合できます:

- **クライアントコンポーネント:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // クライアント側のReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // クライアント側のReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // クライアント側のReactコンポーネントで使用
  ```

- **サーバーコンポーネント:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // サーバー側のReactコンポーネントで使用
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // サーバー側のReactコンポーネントで使用
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // サーバー側のReactコンポーネントで使用
  ```

## パラメータ

フックは2つのパラメータを受け入れます:

1. **`key`**: ローカライズされたコンテンツを取得するための辞書キー。
2. **`locale`**（オプション）: 希望のロケール。指定されない場合はコンテキストのロケールがデフォルトとなります。

## コンテンツ宣言

すべての辞書キーは、型の安全性を高め、エラーを避けるためにコンテンツ宣言ファイル内で宣言する必要があります。セットアップ手順については[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/dictionary/get_started.md)を参照してください。

## Reactでの使用例

Reactコンポーネント内で`useIntlayer`フックをデモンストレーションします:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 属性の処理

属性をローカライズする際は、コンテンツ値に適切にアクセスします:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 追加リソース

- **Intlayer ビジュアルエディタ**: より直感的なコンテンツ管理体験を得るためには、ビジュアルエディタのドキュメントを[こちら](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)で参照してください。

このセクションは、Reactアプリケーションにおける`useIntlayer`フックの統合を特に対象としており、ローカリゼーションプロセスを簡素化し、異なるロケール間でのコンテンツの一貫性を確保します。
