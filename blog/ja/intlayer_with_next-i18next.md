---
blogName: intlayer_with_next-i18next
url: https://intlayer.org/blog/intlayer-with-next-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_next-i18next.md
createdAt: 2024-08-11
updatedAt: 2025-01-02
title: Intlayerとnext-i18next
description: Next.jsアプリのためにnext-i18nextとIntlayerを連携する
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - 国際化
  - ドキュメンテーション
  - Next.js
  - JavaScript
  - React
---

# Next.js Internationalization (i18n) with next-i18next and Intlayer

Both next-i18next and Intlayer are open-source internationalization (i18n) frameworks designed for Next.js applications. They are widely used for managing translations, localization, and language switching in software projects.

Both solutions include three principal notions:

1. **コンテンツ宣言**: アプリケーションの翻訳可能なコンテンツを定義するための方法。

   - `i18next`の場合は`resource`として名付けられ、コンテンツ宣言は、1つまたは複数の言語の翻訳のためのキー-バリューのペアを含む構造化されたJSONオブジェクトです。詳細については、[i18nextのドキュメント](https://www.i18next.com/translation-function/essentials)を参照してください。
   - `Intlayer`の場合は`content declaration file`として名付けられ、コンテンツ宣言は構造化データをエクスポートするJSON、JS、またはTSファイルになることができます。詳細については、[Intlayerのドキュメント](https://intlayer.org/fr/doc/concept/content)を参照してください。

2. **ユーティリティ**: アプリケーション内でコンテンツ宣言を構築および解釈するためのツールであり、`getI18n()`、`useCurrentLocale()`、または`useChangeLocale()`はnext-i18next用で、`useIntlayer()`または`useLocale()`はIntlayer用です。

3. **プラグインおよびミドルウェア**: URLリダイレクション、バンドルの最適化などを管理するための機能であり、`next-i18next/middleware`はnext-i18next用、`intlayerMiddleware`はIntlayer用です。

## Intlayer vs. i18next: 主な違い

i18nextとIntlayerの違いを探るには、私たちの[次-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/ja/i18next_vs_next-intl_vs_intlayer.md)ブログ投稿をチェックしてください。

## Intlayerでnext-i18next辞書を生成する方法

### next-i18nextを使用する理由は？

Intlayerのコンテンツ宣言ファイルは、通常、より良い開発者体験を提供します。これらは、2つの主な利点により、より柔軟でメンテナブルです。

1. **柔軟な配置**: Intlayerのコンテンツ宣言ファイルは、アプリケーションのファイルツリー内のどこにでも配置でき、未使用のコンテンツ宣言を残すことなく、コピーされたり削除されたりしたコンポーネントの管理を簡素化します。

   例ファイル構造:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # コンテンツ宣言ファイル
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # コンテンツ宣言ファイル
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # コンテンツ宣言ファイル
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # コンテンツ宣言ファイル
               └── index.jsx
   ```

2. **中央集中的な翻訳**: Intlayerは、すべての翻訳を単一のファイルに保存し、翻訳が欠けることがないようにします。TypeScriptを使用する場合は、欠けている翻訳が自動的に検出され、エラーとして報告されます。

### インストール

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Intlayerを構成してi18next辞書をエクスポートする

> i18nextリソースのエクスポートは、他のフレームワークとの1:1の互換性を保証するものではありません。問題を最小限に抑えるために、Intlayerベースの構成を維持することをお勧めします。

i18nextリソースをエクスポートするには、`intlayer.config.ts`ファイルでIntlayerを構成します。例の構成:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

### i18next構成への辞書のインポート

生成されたリソースをi18next構成にインポートするには、`i18next-resources-to-backend`を使用します。以下は例です:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### コンテンツ宣言

さまざまな形式のコンテンツ宣言ファイルの例:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### next-i18nextリソースをビルドする

next-i18nextリソースをビルドするには、以下のコマンドを実行します:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

これにより、`./i18next/resources`ディレクトリにリソースが生成されます。期待される出力:

```bash
.
└── i18next
    └── resources
       └── ja
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

注意: i18nextの名前空間はIntlayerの宣言キーに対応します。

### Next.jsプラグインの実装

構成が完了したら、次にIntlayerのコンテンツ宣言ファイルが更新されるたびにi18nextリソースを再ビルドするようにNext.jsプラグインを実装します。

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Next.jsコンポーネントでコンテンツを使用する

Next.jsプラグインを実装した後、そのコンテンツをコンポーネント内で使用できます:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
