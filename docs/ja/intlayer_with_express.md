# Getting Started internationalizing (i18n) with Intlayer and Express

`express-intlayer`は、Expressアプリケーション用の強力な国際化（i18n）ミドルウェアであり、クライアントの好みに基づいたローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルにアクセス可能にするよう設計されています。

## なぜバックエンドを国際化する必要があるのか？

バックエンドを国際化することは、グローバルなオーディエンスに効果的にサービスを提供するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを配信できます。この機能はユーザーエクスペリエンスを向上させ、異なる言語的背景を持つ人々にとってよりアクセスしやすく、関連性のあるアプリケーションにすることができます。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示**: エラーが発生した際に、ユーザーの母国語でメッセージを表示することで、理解が向上し、フラストレーションを軽減できます。これは、トーストやモーダルのようなフロントエンドコンポーネントに表示される動的エラーメッセージに特に役立ちます。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化により、複数の言語でこのコンテンツを提供できることが保証されます。これは、製品説明、記事、その他のコンテンツをユーザーの好む言語で表示する必要があるeコマースサイトやコンテンツ管理システムにとって重要です。

- **多言語のメール送信**: トランザクションメール、マーケティングキャンペーン、通知にかかわらず、受取人の言語でメールを送信することで、エンゲージメントと効果が大幅に向上する可能性があります。

- **多言語のプッシュ通知**: モバイルアプリケーションでは、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションとリテンションを高めることができます。このパーソナルな配慮は、通知をより関連性が高く、実行可能に感じさせることができます。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのすべての形態のコミュニケーションは、ユーザーの言語であることが明確さを保証し、全体的なユーザーエクスペリエンスを向上させます。

バックエンドの国際化により、アプリケーションは文化的な違いを尊重するだけでなく、グローバルな市場ニーズにより適合し、サービスを世界中にスケールアップするための重要なステップとなります。

## はじめに

### インストール

`express-intlayer`の使用を開始するには、npmを使用してパッケージをインストールします：

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
// 設定を定義します
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
// 設定を定義します
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

Expressアプリケーションを`express-intlayer`を使用するように設定します：

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// 国際化リクエストハンドラーをロードします
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

// 国際化リクエストハンドラーをロードします
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

// 国際化リクエストハンドラーをロードします
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

`express-intlayer`は完全に互換性があります：

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md) Reactアプリケーション用
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/index.md) Next.jsアプリケーション用
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/vite-intlayer/index.md) Viteアプリケーション用

また、ブラウザやAPIリクエストを含むさまざまな環境で、あらゆる国際化ソリューションとシームレスに動作します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを介してロケールを検出することもできます：

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
// 設定を定義します
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
// 設定を定義します
const config = {
  // ... その他の設定オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

デフォルトでは、`express-intlayer`は`Accept-Language`ヘッダーを解釈して、クライアントの好みの言語を判断します。

> 設定や高度なトピックに関する詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を訪れてください。

## TypeScriptによって駆動されています

`express-intlayer`は、国際化プロセスを向上させるためにTypeScriptの強力な機能を活用します。TypeScriptの静的型付けは、すべての翻訳キーが考慮されることを保証し、翻訳の欠落を減少させ、保守性を向上させます。

> 生成された型（デフォルトで./types/intlayer.d.ts）は、tsconfig.jsonファイルに含めるようにしてください。
