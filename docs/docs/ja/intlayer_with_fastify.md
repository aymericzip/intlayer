---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastifyバックエンドを翻訳する方法 – i18nガイド 2026
description: Fastifyバックエンドを多言語対応にする方法を解説します。国際化（i18n）と翻訳の手順に従ってください。
keywords:
  - 国際化 (Internationalization)
  - ドキュメント (Documentation)
  - Intlayer
  - Fastify
  - JavaScript
  - バックエンド (Backend)
slugs:
  - doc
  - environment
  - fastify
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: initコマンドを追加
  - version: 7.6.0
    date: 2025-12-31
    changes: 履歴を初期化
---

# Intlayerを使ってFastifyバックエンドサイトを翻訳する | 国際化 (i18n)

`fastify-intlayer` は、Fastifyアプリケーション向けの強力な国際化（i18n）プラグインで、クライアントの設定に基づいてローカライズされたレスポンスを提供し、バックエンドサービスをグローバルに利用可能にすることを目的としています。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラー発生時にユーザーの母国語でメッセージを表示することで理解が深まり、フラストレーションを軽減します。これは、トーストやモーダルなどフロントエンドコンポーネントで表示される動的なエラーメッセージに特に有用です。

`fastify-intlayer` は Fastify アプリケーション向けの強力な国際化 (i18n) プラグインで、クライアントの設定に基づいてローカライズされたレスポンスを返すことでバックエンドサービスをグローバルに利用可能にすることを目的としています。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラー発生時にユーザーの母語でメッセージを表示することで理解が深まり、混乱や不満を軽減できます。これは、トーストやモーダルのようなフロントエンドコンポーネントで表示される動的なエラーメッセージに特に有用です。
- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化によりそのコンテンツを複数言語で配信できます。これは、商品説明や記事、その他のコンテンツをユーザーの希望する言語で表示する必要があるECサイトやコンテンツ管理システムのようなプラットフォームにとって重要です。
- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化によりそのコンテンツを複数の言語で配信できます。これは、商品説明、記事、その他のコンテンツをユーザーが好む言語で表示する必要があるeコマースサイトやコンテンツ管理システム（CMS）などのプラットフォームにとって重要です。
- **多言語メールの送信**: 取引メール、マーケティングキャンペーン、通知など、受信者の言語でメールを送ることで、エンゲージメントや効果が大幅に向上します。
- **多言語プッシュ通知**: モバイルアプリケーションでは、ユーザーの好む言語でプッシュ通知を送信することで、エンゲージメントとリテンションを向上させることができます。このパーソナルな配慮により、通知がより関連性が高く行動を促しやすく感じられます。
- **その他のコミュニケーション**: SMS メッセージ、システムアラート、ユーザーインターフェイスの更新など、バックエンドから送られるあらゆる形式のコミュニケーションは、ユーザーの言語で提供されることで明確さが増し、全体的なユーザー体験が向上します。

バックエンドを国際化することで、アプリケーションは文化的差異を尊重するだけでなく、グローバル市場のニーズにもより適合し、サービスを世界規模でスケールさせるための重要なステップとなります。

## はじめに

### インストール

`fastify-intlayer` の使用を開始するには、npm を使ってパッケージをインストールします：

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

### セットアップ

プロジェクトルートに `intlayer.config.ts` を作成し、国際化の設定を構成します：

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// 国際化設定
const config: IntlayerConfig = {
  internationalization: {
    // サポートするロケールを指定
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    // デフォルトのロケールを指定
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

// 国際化設定（ESM）
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    // サポートするロケールを指定
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    // デフォルトのロケールを指定
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

// 国際化設定（CommonJS）
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    // サポートするロケールを指定
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

/** @type {import('intlayer').IntlayerConfig} */ // IntlayerConfig 型注釈
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

/** @type {import('intlayer').IntlayerConfig} */ // IntlayerConfig 型注釈
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

### コンテンツを宣言する

翻訳を保存するためのコンテンツ宣言を作成および管理します:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ja: "英語で返されるコンテンツの例",
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
      ja: "英語で返されるコンテンツの例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ja: "英語で返されるコンテンツの例",
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
      ja: "英語で返されるコンテンツの例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ja: "返されるコンテンツの例（英語）",
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
        "ja": "返されるコンテンツの例（英語）",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、アプリケーション内の任意の場所に定義できます。ただし `contentDir` ディレクトリ（デフォルトは `./src`）に含まれている必要があります。また、コンテンツ宣言ファイルの拡張子は（デフォルトで）`.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` に一致する必要があります。

> 詳細は[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### Fastify アプリケーションのセットアップ

Fastify アプリケーションを `fastify-intlayer` を使用するように設定します:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

javascript fileName="src/index.mjs" codeFormat="esm"
// 国際化プラグインを読み込む
await fastify.register(intlayer);

// ルート
fastify.get("/t_example", async (_req, reply) => {
  return t({
    ja: "日本語で返されるコンテンツの例",
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

// サーバーを起動
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

// 国際化プラグインを登録
await fastify.register(intlayer);

// ルート
fastify.get("/t_example", async (_req, reply) => {
  return t({
    ja: "英語で返されるコンテンツの例",
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

// サーバーを起動
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

// async/await 用のサーバー起動ラッパー
const start = async () => {
  try {
    // 国際化プラグインを登録
    await fastify.register(intlayer);

    // ルート
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        ja: "返却されるコンテンツの例（英語）",
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

`fastify-intlayer` は以下と完全に互換性があります：

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)>) Reactアプリケーション用
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)>) Next.jsアプリケーション用
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)>) Vite アプリケーション向け

また、ブラウザや API リクエストを含むさまざまな環境で、任意の国際化ソリューションとシームレスに動作します。ミドルウェアをカスタマイズして、ヘッダーやクッキーからロケールを検出するようにできます:

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
  // ... 他の設定オプション
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
  // ... 他の設定オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

デフォルトでは、`fastify-intlayer` はクライアントの優先言語を判定するために `Accept-Language` ヘッダーを解釈します。

> 設定や高度なトピックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

### TypeScript の設定

`fastify-intlayer` は TypeScript の強力な機能を活用して国際化プロセスを強化します。TypeScript の静的型付けにより、すべての翻訳キーが網羅されていることが保証され、翻訳漏れのリスクが低減され、保守性が向上します。

自動生成される型（デフォルトでは ./types/intlayer.d.ts）を tsconfig.json ファイルに含めていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### VS Code 拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します:

- **翻訳キーのオートコンプリート**。
- **翻訳の欠落に対するリアルタイムエラー検出**。
- **翻訳コンテンツのインラインプレビュー**。
- **翻訳を簡単に作成・更新するためのクイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code Extension のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Git 設定

Intlayerによって生成されるファイルは無視することを推奨します。これにより、それらをGitリポジトリにコミットするのを回避できます。

これを行うには、次の指示を `.gitignore` ファイルに追加できます:

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```
