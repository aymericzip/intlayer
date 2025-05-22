# intlayer: 多言語辞書を管理するためのNPMパッケージ (i18n)

**Intlayer**は、JavaScript開発者向けに特化して設計されたパッケージ群です。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`intlayer`パッケージ**を使用すると、コード内のどこにでもコンテンツを宣言できます。多言語コンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。TypeScriptを使用することで、**Intlayer**はより強力で効率的なツールを提供し、開発を強化します。

## Intlayerを統合する理由

- **JavaScript駆動のコンテンツ管理**: JavaScriptの柔軟性を活用して、効率的にコンテンツを定義および管理します。
- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーのないものになるようにします。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントに近い場所に保ち、保守性と明確性を向上させます。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします:

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

Intlayerは、プロジェクトを設定するための設定ファイルを提供します。このファイルをプロジェクトのルートに配置してください。

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

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

## 使用例

Intlayerを使用すると、コードベースのどこにでも構造化された方法でコンテンツを宣言できます。

デフォルトでは、Intlayerは拡張子が`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`のファイルをスキャンします。

> デフォルトの拡張子は、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で`contentDir`プロパティを設定することで変更できます。

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

### コンテンツを宣言する

以下はコンテンツ宣言の例です:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// クライアントコンポーネントのコンテンツを定義
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
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// クライアントコンポーネントのコンテンツを定義
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
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// クライアントコンポーネントのコンテンツを定義
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
      ">5": "Some cars",
      ">19": "Many cars",
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

### 辞書をビルドする

[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md)を使用して辞書をビルドできます。

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

このコマンドはすべての`*.content.*`ファイルをスキャンし、それらをコンパイルして、**`intlayer.config.ts`**で指定されたディレクトリ（デフォルトでは`./.intlayer`）に結果を書き込みます。

出力例:

```bash
.
└── .intlayer
    ├── dictionary  # コンテンツの辞書を含む
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # アプリケーションで使用する辞書のエントリポイントを含む
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # 辞書の自動生成された型定義を含む
        ├── intlayer.d.ts  # Intlayerの自動生成された型定義を含む
        ├── client-component.d.ts
        └── server-component.d.ts
```

### i18nextリソースをビルドする

Intlayerは[i18next](https://www.i18next.com/)用の辞書をビルドするように設定できます。そのためには、次の設定を`intlayer.config.ts`ファイルに追加する必要があります:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayerにi18next用のメッセージファイルを生成させる
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
    // Intlayerにi18next用のメッセージファイルを生成させる
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
    // Intlayerにi18next用のメッセージファイルを生成させる
    dictionaryOutput: ["i18next"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

出力:

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

例えば、**en/client-component.json**は次のようになります:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

### next-intl辞書をビルドする

Intlayerは[i18next](https://www.i18next.com/)または[next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl)用の辞書をビルドするように設定できます。そのためには、次の設定を`intlayer.config.ts`ファイルに追加する必要があります:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayerにnext-intl用のメッセージファイルを生成させる
    dictionaryOutput: ["next-intl"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
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
    // Intlayerにnext-intl用のメッセージファイルを生成させる
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
    // Intlayerにnext-intl用のメッセージファイルを生成させる
    dictionaryOutput: ["next-intl"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

出力:

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

例えば、**en/client-component.json**は次のようになります:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

## CLIツール

IntlayerはCLIツールを提供します:

- コンテンツ宣言を監査し、欠落している翻訳を補完します
- コンテンツ宣言から辞書をビルドします
- CMSからローカルプロジェクトへの辞書のプッシュおよびプルを行います

詳細については、[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を参照してください。

## アプリケーションでIntlayerを使用する

コンテンツを宣言した後、アプリケーション内でIntlayer辞書を利用できます。

Intlayerはアプリケーション用のパッケージとして利用可能です。

### Reactアプリケーション

ReactアプリケーションでIntlayerを使用するには、[react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md)を使用できます。

### Next.jsアプリケーション

Next.jsアプリケーションでIntlayerを使用するには、[next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/index.md)を使用できます。

### Expressアプリケーション

ExpressアプリケーションでIntlayerを使用するには、[express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/express-intlayer/index.md)を使用できます。

## `intlayer`パッケージが提供する関数

`intlayer`パッケージは、アプリケーションを国際化するためのいくつかの関数も提供します。

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/getPathWithoutLocale.md)
