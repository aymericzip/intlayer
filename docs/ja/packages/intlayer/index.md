# intlayer: 多言語コンテンツ宣言を管理するためのNPMパッケージ (i18n)

**Intlayer**は、JavaScript開発者のために特別に設計されたパッケージのスイートです。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`intlayer`パッケージ**は、コードのどこにでもコンテンツを宣言できるようにします。多言語のコンテンツ宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。TypeScriptを使用することで、**Intlayer**はより強力で効率的なツールを提供し、開発を向上させます。

## なぜIntlayerを統合するのか？

- **JavaScript駆動のコンテンツ管理**: JavaScriptの柔軟性を活かして、効率的にコンテンツを定義し管理します。
- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーがないことを保証します。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントに近づけて、保守性と明瞭性を高めます。

## インストール

好みのパッケージマネージャを使用して、必要なパッケージをインストールします：

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

Intlayerは、プロジェクトをセットアップするための設定ファイルを提供します。このファイルをプロジェクトのルートに置きます。

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

デフォルトでは、Intlayerは拡張子が`.content.{ts,tsx,js,jsx,mjs,cjs}`のファイルをスキャンします。

> デフォルトの拡張子は、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)内で`contentDir`プロパティを設定することで変更できます。

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

以下はコンテンツ宣言の例です：

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
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
      "<-1": "Less than minus one car", // 1台未満
      "-1": "Minus one car", // 1台マイナス
      "0": "No cars", // 車なし
      "1": "One car", // 1台
      ">5": "Some cars", // 何台かの車
      ">19": "Many cars", // 多くの車
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
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
      "<-1": "Less than minus one car", // 1台未満
      "-1": "Minus one car", // 1台マイナス
      "0": "No cars", // 車なし
      "1": "One car", // 1台
      ">5": "Some cars", // 何台かの車
      ">19": "Many cars", // 多くの車
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

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
      "<-1": "Less than minus one car", // 1台未満
      "-1": "Minus one car", // 1台マイナス
      "0": "No cars", // 車なし
      "1": "One car", // 1台
      ">5": "Some cars", // 何台かの車
      ">19": "Many cars", // 多くの車
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
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
        "<-1": "Less than minus one car", // 1台未満
        "-1": "Minus one car", // 1台マイナス
        "0": "No cars", // 車なし
        "1": "One car", // 1台
        ">5": "Some cars", // 何台かの車
        ">19": "Many cars" // 多くの車
      }
    }
  }
}
```

### 辞書を構築する

[需要に応じたintlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を使用して、辞書を構築できます。

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

このコマンドは、すべての`*.content.*`ファイルをスキャンし、コンパイルして、**`intlayer.config.ts`**で指定したディレクトリ（デフォルトは`./.intlayer`）に結果を書き込みます。

典型的な出力は次のようになります：

```bash
.
├── .intlayer
│   ├── dictionary  # コンテンツの辞書を含む
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # アプリケーションで使用するための辞書のエントリポイントを含む
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # 辞書の自動生成された型定義を含む
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # Intlayerの自動生成された型定義を含む
```

### i18nextリソースを構築する

Intlayerを設定して、[i18next](https://www.i18next.com/)のための辞書を構築することができます。そのためには、次の設定を`intlayer.config.ts`ファイルに追加する必要があります：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayerにi18nextのメッセージファイルを生成させる
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
    // Intlayerにi18nextのメッセージファイルを生成させる
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
    // Intlayerにi18nextのメッセージファイルを生成させる
    dictionaryOutput: ["i18next"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

出力：

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

例えば、**en/client-component.json**は次のように見えるかもしれません：

```json filePath="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

### i18nextまたはnext-intl辞書を構築する

Intlayerは、[i18next](https://www.i18next.com/)または[next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl)のための辞書を構築するように設定できます。そのためには、次の設定を`intlayer.config.ts`ファイルに追加する必要があります：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayerにnext-intlのメッセージファイルを生成させる
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
    // Intlayerにnext-intlのメッセージファイルを生成させる
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
    // Intlayerにnext-intlのメッセージファイルを生成させる
    dictionaryOutput: ["next-intl"],

    // IntlayerがメッセージJSONファイルを書き込むディレクトリ
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 利用可能なパラメータの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

出力：

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

例えば、**en/client-component.json**は次のように見えるかもしれません：

```json filePath="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

## CLIツール

IntlayerはCLIツールを提供しており、以下が可能です：

- コンテンツ宣言を監査し、欠落している翻訳を補完する
- コンテンツ宣言から辞書を構築する
- 遠隔辞書をCMSからローカルプロジェクトにプッシュまたはプルする

詳細については、[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を参照してください。

## アプリケーションにIntlayerを使用する

コンテンツが宣言されたら、アプリケーションでIntlayerの辞書を使用できます。

Intlayerは、アプリケーション用のパッケージとして利用可能です。

### Reactアプリケーション

ReactアプリケーションでIntlayerを使用するには、[react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md)を使用します。

### Next.js アプリケーション

Next.js アプリケーションでIntlayerを使用するには、[next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/index.md)を使用します。

### Expressアプリケーション

ExpressアプリケーションでIntlayerを使用するには、[express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/express-intlayer/index.md)を使用します。

## `intlayer`パッケージが提供する機能

`intlayer`パッケージは、アプリケーションを国際化するのに役立ついくつかの関数も提供しています。

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
