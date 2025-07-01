---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | intlayer
description: intlayerパッケージの使い方を見る
keywords:
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer: 多言語辞書（i18n）管理のためのNPMパッケージ

**Intlayer**はJavaScript開発者向けに特別に設計されたパッケージ群です。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`intlayer`パッケージ**は、コードのどこでもコンテンツを宣言できるようにします。多言語コンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。TypeScriptを使うことで、**Intlayer**はより強力で効率的な開発ツールを提供し、開発を向上させます。

## なぜIntlayerを統合するのか？

- **JavaScript駆動のコンテンツ管理**：JavaScriptの柔軟性を活かして、効率的にコンテンツを定義・管理します。
- **型安全な環境**：TypeScriptを活用し、すべてのコンテンツ定義が正確でエラーのないものになるようにします。
- **統合されたコンテンツファイル**：翻訳をそれぞれのコンポーネントに近い場所に保持し、保守性と明確さを向上させます。

## インストール

必要なパッケージをお好みのパッケージマネージャーでインストールしてください：

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Intlayerの設定

Intlayerはプロジェクトを設定するための設定ファイルを提供します。このファイルをプロジェクトのルートに配置してください。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

## 使用例

Intlayerを使用すると、コードベースのどこでも構造化された方法でコンテンツを宣言できます。

デフォルトでは、Intlayerは拡張子が `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` のファイルをスキャンします。

> デフォルトの拡張子は、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)の `contentDir` プロパティを設定することで変更できます。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    ├── ClientComponent
    │   ├── index.content.mjs
    │   └── index.mjx
    └── ServerComponent
        ├── index.content.mjs
        └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### コンテンツの宣言

以下はコンテンツ宣言の例です：

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
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
      ">19": "多くの車",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
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
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ja: "こんにちは世界",
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
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ja": "こんにちは世界"
      }
    },
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

### 辞書をビルドする

[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md) を使用して辞書をビルドできます。

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

このコマンドはすべての `*.content.*` ファイルをスキャンし、コンパイルして、**`intlayer.config.ts`** で指定されたディレクトリ（デフォルトは `./.intlayer`）に結果を書き込みます。

典型的な出力例は以下のようになります：

```bash
.
└── .intlayer
    ├── dictionary  # コンテンツの辞書を含むディレクトリ
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # アプリケーションで使用する辞書のエントリーポイントを含むディレクトリ
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # 辞書の自動生成された型定義を含むディレクトリ
        ├── intlayer.d.ts  # Intlayerの自動生成型定義を含むファイル
        ├── client-component.d.ts
        └── server-component.d.ts
```

### i18next リソースのビルド

Intlayerは[i18next](https://www.i18next.com/)用の辞書を生成するように設定できます。そのためには、`intlayer.config.ts`ファイルに以下の設定を追加する必要があります。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayerにi18next用のメッセージファイルを生成するよう指示します
    dictionaryOutput: ["i18next"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayerにi18next用のメッセージファイルを生成するよう指示します
    dictionaryOutput: ["i18next"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayerにi18next用のメッセージファイルを生成するよう指示します
    dictionaryOutput: ["i18next"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

出力例:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

例えば、**en/client-component.json** は以下のようになっているかもしれません:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "いくつかの車"
}
```

### next-intl 辞書のビルド

Intlayer は [i18next](https://www.i18next.com/) または [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl) 用の辞書をビルドするように設定できます。そのためには、`intlayer.config.ts` ファイルに以下の設定を追加する必要があります。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer に next-intl 用のメッセージファイルを生成させる設定
    dictionaryOutput: ["next-intl"],

    // Intlayer がメッセージ JSON ファイルを書き出すディレクトリ
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayerにnext-intl用のメッセージファイルを生成するよう指示します
    dictionaryOutput: ["next-intl"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayerにnext-intl用のメッセージファイルを生成するよう指示します
    dictionaryOutput: ["next-intl"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

出力例:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

例えば、**en/client-component.json** は次のようになります:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "こんにちは世界",
  "zero_numberOfCar": "車はありません",
  "one_numberOfCar": "車が1台",
  "two_numberOfCar": "車が2台",
  "other_numberOfCar": "いくつかの車"
}
```

## CLIツール

IntlayerはCLIツールを提供しています。これにより：

- コンテンツ宣言を監査し、欠落している翻訳を補完する
- コンテンツ宣言から辞書を構築する
- CMSからローカルプロジェクトへ遠隔辞書をプッシュおよびプルする

詳細は[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_cli.md)を参照してください。

## アプリケーションでIntlayerを使用する

コンテンツを宣言したら、アプリケーション内でIntlayerの辞書を利用できます。

Intlayerはアプリケーション用のパッケージとして利用可能です。

### Reactアプリケーション

ReactアプリケーションでIntlayerを使用するには、[react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)を使用できます。

### Next.jsアプリケーション

Next.jsアプリケーションでIntlayerを使用するには、[next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)を使用できます。

### Expressアプリケーション

ExpressアプリケーションでIntlayerを使用するには、[express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/express-intlayer/index.md)を使用できます。

## `intlayer`パッケージが提供する関数

`intlayer`パッケージは、アプリケーションの国際化を支援するいくつかの関数も提供しています。

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
