# Getting Started internationalizing (i18n) with Intlayer and Express

`express-intlayer`は、Expressアプリケーションのための強力な国際化（i18n）ミドルウェアであり、クライアントの好みに基づいたローカライズされたレスポンスを提供することで、バックエンドサービスを世界的にアクセス可能にするように設計されています。

## なぜバックエンドを国際化するのか？

バックエンドを国際化することは、グローバルなオーディエンスに効果的にサービスを提供するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを届けることができます。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとって、アプリケーションがよりアクセシブルで関連性のあるものにすることで、リーチを広げます。

### 実践的なユースケース

- **ユーザーの言語でバックエンドエラーを表示**: エラーが発生した場合、ユーザーの母国語でメッセージを表示することで理解を改善し、フラストレーションを軽減します。これは、トーストやモーダルなどのフロントエンドコンポーネントで表示される動的エラーメッセージに特に役立ちます。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化により、このコンテンツを複数の言語で提供できます。これは、商品説明、記事、他のコンテンツをユーザーが好む言語で表示する必要があるeコマースサイトやコンテンツ管理システムにとって重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受取人の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。

- **多言語プッシュ通知**: モバイルアプリケーションにおいて、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションと維持率が向上します。この個人的なアプローチにより、通知がより関連性を持ち、行動を促すものに感じられます。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語で行うことで明確さが保証され、全体的なユーザー体験が向上します。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズともより良く整合し、サービスを世界中に拡大するための重要なステップとなります。

## はじめに

### インストール

`express-intlayer`を使用するには、npmを使用してパッケージをインストールします：

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### セットアップ

プロジェクトのルートに`intlayer.config.ts`を作成して、国際化設定を構成します：

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

### Expressアプリケーションのセットアップ

あなたのExpressアプリケーションを`express-intlayer`を使用するようにセットアップします：

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 国際化リクエストハンドラをロード
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

// サーバーを開始
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// 国際化リクエストハンドラをロード
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

// サーバーを開始
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// 国際化リクエストハンドラをロード
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

// サーバーを開始
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### 互換性

`express-intlayer`は以下と完全に互換性があります：

- `react-intlayer` for Reactアプリケーション
- `next-intlayer` for Next.jsアプリケーション

また、さまざまな環境での国際化ソリューションともシームレスに動作します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを通じてロケールを検出することができます：

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

デフォルトでは、`express-intlayer`は`Accept-Language`ヘッダーを解釈してクライアントの好みの言語を判断します。

> 設定や高度なトピックの詳細については、私たちの[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を訪れてください。

## TypeScriptによるPowered by

`express-intlayer`は、国際化プロセスを強化するためにTypeScriptの強力な機能を活用しています。TypeScriptの静的型付けは、翻訳キーがすべて考慮されることを保証し、翻訳の欠落リスクを減らし、メンテナンス性を向上させます。

> 生成された型（デフォルトでは./types/intlayer.d.ts）がtsconfig.jsonファイルに含まれていることを確認してください。
