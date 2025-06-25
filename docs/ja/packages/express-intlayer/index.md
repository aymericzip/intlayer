---
docName: package__express-intlayer
url: /doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: パッケージドキュメント | express-intlayer
description: express-intlayerパッケージの使用方法を確認してください
keywords:
  - Intlayer
  - express-intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
---

# express-intlayer: Express.jsアプリケーションを国際化（i18n）するためのJavaScriptパッケージ

**Intlayer**は、JavaScript開発者向けに特化して設計されたパッケージ群です。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`express-intlayer`パッケージ**は、Express.jsアプリケーションを国際化するためのものです。ユーザーの優先ロケールを検出し、適切な辞書を返すミドルウェアを提供します。

## なぜバックエンドを国際化するのか？

バックエンドを国際化することは、グローバルなオーディエンスに効果的に対応するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを提供できます。この機能はユーザーエクスペリエンスを向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく、関連性の高いものにすることで、アプリケーションのリーチを広げます。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示**: エラーが発生した際に、ユーザーの母国語でメッセージを表示することで、理解を深め、フラストレーションを軽減します。これは、トーストやモーダルなどのフロントエンドコンポーネントに表示される動的なエラーメッセージに特に有用です。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化によりこのコンテンツを複数の言語で提供できます。これは、ユーザーが好む言語で商品説明や記事などのコンテンツを表示する必要があるeコマースサイトやコンテンツ管理システムなどのプラットフォームにとって重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。

- **多言語プッシュ通知**: モバイルアプリケーションでは、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションとリテンションを向上させることができます。このパーソナルなタッチにより、通知がより関連性が高く、実行可能に感じられます。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語で行うことで明確さが向上し、全体的なユーザーエクスペリエンスが向上します。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合し、サービスを世界規模で拡大するための重要なステップとなります。

## なぜIntlayerを統合するのか？

- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義を正確かつエラーのないものにします。

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールします:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
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

> 利用可能なパラメーターの完全なリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

## 使用例

`express-intlayer`を使用するようにExpressアプリケーションを設定します:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 国際化リクエストハンドラーをロード
app.use(intlayer());

// ルート
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// サーバーを起動
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// 国際化リクエストハンドラーをロード
app.use(intlayer());

// ルート
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// サーバーを起動
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// 国際化リクエストハンドラーをロード
app.use(intlayer());

// ルート
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// サーバーを起動
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### 互換性

`express-intlayer`は以下と完全に互換性があります:

- [Reactアプリケーション用の`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md)
- [Next.jsアプリケーション用の`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/index.md)
- [Viteアプリケーション用の`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/vite-intlayer/index.md)

また、ブラウザやAPIリクエストを含むさまざまな環境で、あらゆる国際化ソリューションとシームレスに動作します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを介してロケールを検出することもできます:

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

デフォルトでは、`express-intlayer`は`Accept-Language`ヘッダーを解釈してクライアントの優先言語を判断します。

## `express-intlayer`パッケージが提供する関数

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja-GB/packages/express-intlayer/t.md)
