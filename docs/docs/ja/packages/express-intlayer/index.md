---
docName: package__express-intlayer
url: https://intlayer.org/doc/packages/express-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/express-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: パッケージドキュメント | express-intlayer
description: express-intlayerパッケージの使い方を見る
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

**Intlayer**はJavaScript開発者向けに特化して設計されたパッケージ群です。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`express-intlayer`パッケージ**は、Express.jsアプリケーションを国際化することを可能にします。ユーザーの優先ロケールを検出するミドルウェアを提供し、ユーザーに適した辞書を返します。

## なぜバックエンドを国際化するのか？

バックエンドを国際化することは、グローバルなユーザーに効果的に対応するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを提供できます。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく、関連性の高いものにすることで、アプリケーションのリーチを広げます。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラーが発生した際に、ユーザーの母国語でメッセージを表示することで理解が深まり、フラストレーションが軽減されます。これは特に、トーストやモーダルのようなフロントエンドコンポーネントで表示される動的なエラーメッセージに有効です。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションにおいて、国際化は複数の言語でコンテンツを提供できることを保証します。これは、ユーザーの好みの言語で商品説明や記事、その他のコンテンツを表示する必要があるeコマースサイトやコンテンツ管理システムのようなプラットフォームにとって非常に重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果が大幅に向上します。

- **多言語プッシュ通知**: モバイルアプリケーションでは、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションとリテンションを強化できます。このパーソナルな対応により、通知がより関連性が高く、行動を促すものに感じられます。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆるコミュニケーションは、ユーザーの言語で行うことで明確さが増し、全体的なユーザー体験が向上します。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合し、サービスを世界規模で拡大するための重要なステップとなります。

## なぜIntlayerを統合するのか？

- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーのないものになるようにします。

## インストール

お好みのパッケージマネージャーを使って必要なパッケージをインストールしてください：

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

`express-intlayer` を使用するように Express アプリケーションを設定します：

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
      fr: "フランス語で返されるコンテンツの例",
      "es-ES": "スペイン語（スペイン）で返されるコンテンツの例",
      "es-MX": "スペイン語（メキシコ）で返されるコンテンツの例",
    })
  );
});

// サーバーを起動
app.listen(3000, () => console.log(`ポート3000でリッスン中`));
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
      fr: "フランス語で返されるコンテンツの例",
      "es-MX": "スペイン語（メキシコ）で返されるコンテンツの例",
      "es-ES": "スペイン語（スペイン）で返されるコンテンツの例",
    })
  );
});

// サーバーを起動
app.listen(3000, () => console.log(`ポート3000でリッスン中`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// 国際化リクエストハンドラーを読み込み
app.use(intlayer());

// ルート
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "フランス語で返されるコンテンツの例",
      "es-MX": "スペイン語（メキシコ）で返されるコンテンツの例",
      "es-ES": "スペイン語（スペイン）で返されるコンテンツの例",
    })
  );
});

// サーバーを起動
app.listen(3000, () => console.log(`ポート3000でリッスン中`));
```

### 互換性

`express-intlayer` は以下と完全に互換性があります：

- Reactアプリケーション用の [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.jsアプリケーション用の [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Viteアプリケーション用の [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)

また、ブラウザやAPIリクエストなど様々な環境での国際化ソリューションともシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーやクッキーからロケールを検出することも可能です：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定オプション
  middleware: {
    headerName: "my-locale-header", // ロケールを検出するためのヘッダー名
    cookieName: "my-locale-cookie", // ロケールを検出するためのクッキー名
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
    headerName: "my-locale-header", // ロケールを検出するためのヘッダー名
    cookieName: "my-locale-cookie", // ロケールを検出するためのクッキー名
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定オプション
  middleware: {
    headerName: "my-locale-header", // ロケールを指定するヘッダー名
    cookieName: "my-locale-cookie", // ロケールを保存するクッキー名
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
    headerName: "my-locale-header", // ロケールを指定するヘッダー名
    cookieName: "my-locale-cookie", // ロケールを保存するクッキー名
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
    headerName: "my-locale-header", // ロケールを指定するヘッダー名
    cookieName: "my-locale-cookie", // ロケールを保存するクッキー名
  },
};

module.exports = config;
```

デフォルトでは、`express-intlayer` はクライアントの優先言語を判別するために `Accept-Language` ヘッダーを解釈します。

## `express-intlayer` パッケージで提供される関数

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/express-intlayer/t.md)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 初期履歴
