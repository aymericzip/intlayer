---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - 2026年にFastifyアプリを翻訳する方法
description: Fastifyバックエンドを多言語化する方法をご紹介します。国際化(i18n)と翻訳の手順については、ドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Fastify
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "initコマンドの追加"
  - version: 7.6.0
    date: 2025-12-31
    changes: "履歴の初期化"
---

# Intlayerを使用したFastifyバックエンドウェブサイトの翻訳 | 国際化 (i18n)

`fastify-intlayer`は、Fastifyアプリケーション向けの強力な国際化(i18n)プラグインです。クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルにアクセス可能にするよう設計されています。

> GitHubでパッケージの実装を確認する: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラーが発生した際、ユーザーの母国語でメッセージを表示することで、理解を深め、フラストレーションを軽減します。これは、トーストやモーダルなどのフロントエンドコンポーネントに表示される動的なエラーメッセージに特に有用です。
- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、国際化によって複数の言語でコンテンツを提供できるようになります。これは、ユーザーの好みの言語で商品説明や記事などを表示する必要があるECサイトやコンテンツ管理システムなどのプラットフォームにとって極めて重要です。
- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に高めることができます。
- **多言語プッシュ通知**: モバイルアプリケーションの場合、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションと継続率を向上させることができます。このパーソナライズされたアプローチにより、通知がより関連性が高く、実行可能なものと感じられるようになります。
- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語に対応することで、明快さを確保し、全体的なユーザーエクスペリエンスを向上させることができます。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合するようになり、サービスを世界規模で拡張するための重要なステップとなります。

## はじめに

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHubで[アプリケーションテンプレート](https://github.com/aymericzip/intlayer-fastify-template)を確認してください。

### インストール

`fastify-intlayer`の使用を開始するには、npmを使用してパッケージをインストールします。

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### 設定

プロジェクトのルートに`intlayer.config.ts`を作成して、国際化設定を構成します。

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します。

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれている限り、アプリケーション内のどこにでも定義できます。また、コンテンツ宣言のファイル拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,cjs}`）と一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### Fastifyアプリケーションの設定

`fastify-intlayer`を使用するようにFastifyアプリケーションを設定します。

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 国際化プラグインのロード
await fastify.register(intlayer);

// ルート
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// サーバーの起動
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// 国際化プラグインのロード
await fastify.register(intlayer);

// ルート
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// サーバーの起動
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// async/await用のサーバー起動ラッパー
const start = async () => {
  try {
    // 国際化プラグインのロード
    await fastify.register(intlayer);

    // ルート
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### 互換性

`fastify-intlayer`は、以下と完全に互換性があります。

- Reactアプリケーション用 [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.jsアプリケーション用 [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Viteアプリケーション用 [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)

また、ブラウザやAPIリクエストなど、さまざまな環境におけるあらゆる国際化ソリューションとシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーまたはCookieを介してロケールを検出することもできます。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... その他の設定オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... その他の設定オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

デフォルトでは、`fastify-intlayer`は`Accept-Language`ヘッダーを解釈して、クライアントの優先言語を決定します。

> 設定および詳細なトピックについては、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### TypeScriptの設定

`fastify-intlayer`は、国際化プロセスを改善するためにTypeScriptの強力な機能を活用しています。TypeScriptの静的型付けにより、すべての翻訳キーが考慮されていることが保証され、翻訳漏れのリスクが軽減され、保守性が向上します。

自動生成された型（デフォルトでは./types/intlayer.d.ts）がtsconfig.jsonファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### VS Code拡張機能

Intlayerでの開発体験を向上させるために、公式の**Intlayer VS Code Extension**をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します。

- 翻訳キーの**オートコンプリート**。
- 翻訳漏れに対する**リアルタイムのエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新できる**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extensionドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Gitの設定

Intlayerによって生成されたファイルは無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを避けることができます。

そのためには、`.gitignore`ファイルに以下の指示を追加します。

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視する
.intlayer

```
