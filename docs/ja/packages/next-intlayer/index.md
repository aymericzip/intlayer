# next-intlayer: NPMパッケージを国際化（i18n）するためのNext.jsアプリケーション

**Intlayer**は、JavaScript開発者向けに特別に設計されたパッケージのスイートです。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`next-intlayer`パッケージ**は、Next.jsアプリケーションを国際化することを可能にします。Next.js国際化のためのコンテクストプロバイダーとフックを提供します。さらに、Intlayerを[Webpack](https://webpack.js.org/)や[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)と統合するためのNext.jsプラグイン、およびユーザーの好ましいロケールを検出し、クッキーを管理し、URLリダイレクションを処理するミドルウェアも含まれています。

## Next.jsアプリケーションを国際化する理由

Next.jsアプリケーションを国際化することは、グローバルオーディエンスに効果的にサービスを提供するために不可欠です。それにより、アプリケーションはユーザーの好みの言語でコンテンツやメッセージを提供できます。この機能は、ユーザーエクスペリエンスを向上させ、異なる言語的背景を持つ人々に対してアプリケーションの到達範囲を広げ、よりアクセスしやすく、関連性のあるものにします。

## Intlayerを統合する理由

- **JavaScript駆動のコンテンツ管理**: JavaScriptの柔軟性を活用して、コンテンツを効率的に定義および管理します。
- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーのないことを保証します。
- **統合されたコンテンツファイル**: 翻訳をそれぞれのコンポーネントに近づけ、保守性と明確性を高めます。

## インストール

必要なパッケージを好みのパッケージマネージャーを使用してインストールします：

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## 使用例

Intlayerを使用すると、コードベースのどこでも構造的にコンテンツを宣言できます。

デフォルトでは、Intlayerは`.content.{ts,tsx,js,jsx,mjs,cjs}`拡張子のファイルをスキャンします。

> デフォルトの拡張子は、[設定ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)の`contentDir`プロパティを設定することで変更できます。

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
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
    └── components
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
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### コンテンツの宣言

`next-intlayer`は、[`intlayer`パッケージ](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/intlayer/index.md)と連携して機能するように設計されています。`intlayer`は、コードのどこでもコンテンツを宣言できるようにするパッケージです。それは、多言語コンテンツの宣言を構造化された辞書に変換し、アプリケーションにシームレスに統合します。

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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
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

### コードでのコンテンツの活用

コンテンツを宣言したら、それをコード内で使用できるようになります。以下は、Reactコンポーネントでコンテンツを使用する方法の例です：

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 関連するコンテンツ宣言を作成します

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 関連するコンテンツ宣言を作成します

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 関連するコンテンツ宣言を作成します

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Next.jsアプリケーションの国際化をマスターする

Intlayerは、Next.jsアプリケーションを国際化するための多くの機能を提供します。以下は主な機能のいくつかです：

- **サーバーコンポーネントの国際化**: Intlayerを使用すると、サーバーコンポーネントをクライアントコンポーネントと同様に国際化できます。つまり、クライアントとサーバーの両方のコンポーネントに対して同じコンテンツ宣言を使用できます。
- **ロケール検出のためのミドルウェア**: Intlayerはユーザーの好ましいロケールを検出するためのミドルウェアを提供します。このミドルウェアは、ユーザーの好ましいロケールを検出し、[設定](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)に指定された適切なURLにリダイレクトします。
- **メタデータの国際化**: Intlayerは、Next.jsが提供する`generateMetadata`関数を使用して、ページタイトルなどのメタデータを国際化する方法を提供します。`getTranslationContent`関数を使用してメタデータを翻訳できます。
- **sitemap.xmlとrobots.txtの国際化**: Intlayerはsitemap.xmlとrobots.txtファイルを国際化することを可能にします。`getMultilingualUrls`関数を使用して、sitemapの多言語URLを生成できます。
- **URLの国際化**: Intlayerは、`getMultilingualUrls`関数を使用してURLを国際化することを可能にします。この関数は、sitemapの多言語URLを生成します。

**これらの機能の詳細については、[Next.js Internationalization (i18n) with Intlayer and Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)ガイドを参照してください。**

## `next-intlayer`パッケージによって提供される関数

`next-intlayer`パッケージは、アプリケーションを国際化するのに役立ついくつかの関数も提供します。

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/useIntlayerAsync.md)
