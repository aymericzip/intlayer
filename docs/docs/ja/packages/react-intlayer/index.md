---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | react-intlayer
description: react-intlayerパッケージの使い方を見る
keywords:
  - Intlayer
  - react-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
---

# react-intlayer: Reactアプリケーションを国際化（i18n）するためのNPMパッケージ

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`react-intlayer`パッケージ**は、Reactアプリケーションを国際化することを可能にします。Reactの国際化のためのコンテキストプロバイダーやフックを提供します。

## なぜReactアプリケーションを国際化するのか？

Reactアプリケーションを国際化することは、グローバルなユーザーに効果的に対応するために不可欠です。これにより、各ユーザーの好みの言語でコンテンツやメッセージを提供できるようになります。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく、関連性の高いアプリケーションにすることで、アプリケーションのリーチを広げます。

## なぜIntlayerを統合するのか？

- **JavaScriptによるコンテンツ管理**：JavaScriptの柔軟性を活かして、効率的にコンテンツを定義・管理できます。
- **型安全な環境**：TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーのないものになるようにします。
- **統合されたコンテンツファイル**：翻訳をそれぞれのコンポーネントの近くに保持し、保守性と明確さを向上させます。

## インストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールしてください：

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

Intlayerを使うと、コードベースのどこでも構造化された方法でコンテンツを宣言できます。

デフォルトでは、Intlayerは拡張子が `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` のファイルをスキャンします。

> デフォルトの拡張子は、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)の `contentDir` プロパティを設定することで変更できます。

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

`react-intlayer` は [`intlayer` パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/index.md) と連携して動作するように作られています。`intlayer` はコードのどこにでもコンテンツを宣言できるパッケージで、多言語コンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。

以下はコンテンツ宣言の例です：

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx fileName="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "車が1台",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};

export default component1Content;
```

```jsx fileName="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "車が1台",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};

module.exports = component1Content;
```

```json fileName="src/Component1/index.content.json" codeFormat="json"
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
        "<-1": "マイナス1台未満の車",
        "-1": "マイナス1台の車",
        "0": "車はありません",
        "1": "1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車"
      }
    }
  }
}
```

### コード内でコンテンツを利用する

コンテンツを宣言したら、コード内で使用できます。以下はReactコンポーネントでコンテンツを使用する例です：

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
  const { myTranslatedContent } = useIntlayer("component-1"); // 関連コンテンツ宣言を作成

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Reactアプリケーションの国際化を極める

Intlayerは、Reactアプリケーションの国際化を支援する多くの機能を提供します。

**これらの機能の詳細については、ViteとReactアプリケーション向けの[React Internationalization (i18n) with Intlayer and Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)ガイド、またはReact Create App向けの[React Internationalization (i18n) with Intlayer and React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)ガイドを参照してください。**

## `react-intlayer`パッケージが提供する関数

`react-intlayer`パッケージは、アプリケーションの国際化を支援するいくつかの関数も提供しています。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/t.md)
  **これらの機能の詳細については、Vite と React アプリケーション向けの [React Internationalization (i18n) with Intlayer and Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md) ガイド、または React Create App 向けの [React Internationalization (i18n) with Intlayer and React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md) ガイドを参照してください。**

## `react-intlayer` パッケージで提供される関数

`react-intlayer` パッケージは、アプリケーションの国際化を支援するいくつかの関数も提供しています。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 初期履歴
