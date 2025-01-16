# react-intlayer: NPM パッケージで React アプリケーションを国際化（i18n）

**Intlayer** は、JavaScript 開発者のために特別に設計されたパッケージのスイートです。これは React、React、そして Express.js のようなフレームワークと互換性があります。

**`react-intlayer` パッケージ** を使用すると、React アプリケーションを国際化できます。これは React の国際化のためのコンテキストプロバイダーとフックを提供します。

## なぜ React アプリケーションを国際化するのか？

React アプリケーションを国際化することは、グローバルなオーディエンスに効果的にサービスを提供するために不可欠です。これは、各ユーザーの好ましい言語でコンテンツやメッセージを配信できるようにします。この機能はユーザーエクスペリエンスを向上させ、異なる言語的背景を持つ人々にとってよりアクセスしやすく、関連性のあるものにすることで、アプリケーションの到達範囲を広げます。

## Intlayer を統合する理由は？

- **JavaScript Powered Content Management**: JavaScript の柔軟性を活用して、コンテンツを効率的に定義および管理します。
- **タイプセーフ環境**: TypeScript を利用して、すべてのコンテンツ定義が正確でエラーがないことを保証します。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントに近く保ち、保守性と明確性を向上させます。

## インストール

必要なパッケージをお好みのパッケージマネージャーを使用してインストールしてください：

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

Intlayer を使用すると、コードベース内のどこにでも構造化された方法でコンテンツを宣言できます。

デフォルトでは、Intlayer は拡張子 `.content.{ts,tsx,js,jsx,mjs,cjs}` のファイルをスキャンします。

> デフォルトの拡張子を変更するには、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md) の `contentDir` プロパティを設定してください。

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

### コンテンツの宣言

`react-intlayer` は [`intlayer` パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md) と連携するために作られています。`intlayer` は、コード内のどこにでもコンテンツを宣言することを可能にするパッケージです。これは、多言語のコンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。

以下はコンテンツ宣言の例です：

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      ja: "こんにちは世界", // 日本語の翻訳
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "1台未満の車",
      "-1": "1台の車がありません",
      "0": "車がありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      ja: "こんにちは世界", // 日本語の翻訳
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "1台未満の車",
      "-1": "1台の車がありません",
      "0": "車がありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      ja: "こんにちは世界", // 日本語の翻訳
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "1台未満の車",
      "-1": "1台の車がありません",
      "0": "車がありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
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
        "ja": "こんにちは世界", // 日本語の翻訳
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "1台未満の車",
        "-1": "1台の車がありません",
        "0": "車がありません",
        "1": "1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車"
      }
    }
  }
}
```

### コード内でのコンテンツの利用

コンテンツを宣言したら、それをコード内で使用できます。以下は、React コンポーネントでコンテンツを使用する方法の例です：

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

## React アプリケーションの国際化をマスターする

Intlayer は、React アプリケーションを国際化するための多くの機能を提供します。

**これらの機能について詳細を学ぶには、[Vite と React での Intlayer と React 国際化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md) ガイドや、[React Create App と Intlayer による React 国際化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md) ガイドを参照してください。**

## `react-intlayer` パッケージが提供する関数

`react-intlayer` パッケージは、アプリケーションを国際化するのを助けるためのいくつかの関数も提供しています。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/useIntlayerAsync.md)
