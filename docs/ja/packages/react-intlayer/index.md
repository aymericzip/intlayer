# react-intlayer: Reactアプリケーションを国際化（i18n）するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特化したパッケージ群です。React、React、Express.jsなどのフレームワークと互換性があります。

**`react-intlayer`パッケージ**は、Reactアプリケーションを国際化するためのものです。Reactの国際化のためのコンテキストプロバイダーとフックを提供します。

## なぜReactアプリケーションを国際化するのか？

Reactアプリケーションを国際化することは、グローバルなオーディエンスに効果的に対応するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供することができます。この機能はユーザーエクスペリエンスを向上させ、異なる言語背景を持つ人々にとってアプリケーションをよりアクセスしやすく、関連性のあるものにすることで、アプリケーションのリーチを広げます。

## なぜIntlayerを統合するのか？

- **JavaScript駆動のコンテンツ管理**: JavaScriptの柔軟性を活用して、効率的にコンテンツを定義および管理します。
- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義を正確かつエラーのないものにします。
- **統合されたコンテンツファイル**: 翻訳を対応するコンポーネントの近くに保持し、保守性と明確性を向上させます。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## 使用例

Intlayerを使用すると、コードベースのどこにでも構造化された方法でコンテンツを宣言できます。

デフォルトでは、Intlayerは拡張子が`.content.{ts,tsx,js,jsx,mjs,cjs}`のファイルをスキャンします。

> デフォルトの拡張子は[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)の`contentDir`プロパティを設定することで変更できます。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### コンテンツを宣言する

`react-intlayer`は[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md)と連携して動作します。`intlayer`は、コード内のどこにでもコンテンツを宣言できるパッケージです。多言語コンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。

以下はコンテンツ宣言の例です:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### コード内でコンテンツを利用する

コンテンツを宣言したら、コード内で使用できます。以下はReactコンポーネントでコンテンツを使用する例です:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 関連するコンテンツ宣言を作成

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Reactアプリケーションの国際化をマスターする

Intlayerは、Reactアプリケーションを国際化するための多くの機能を提供します。

**これらの機能について詳しくは、[ViteとReactを使用したIntlayerによるReact国際化（i18n）](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)ガイド、または[React Create Appを使用したIntlayerによるReact国際化（i18n）](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)ガイドをご覧ください。**

## `react-intlayer`パッケージが提供する関数

`react-intlayer`パッケージは、アプリケーションを国際化するためのいくつかの関数も提供します。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayerAsync.md)
