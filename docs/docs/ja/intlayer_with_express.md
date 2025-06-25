---
docName: intlayer_with_express
url: https://intlayer.org/doc/environment/express
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Expressのバックエンドを翻訳する (i18n)
description: viteバックエンドを多言語化する方法を見つけましょう。国際化（i18n）して翻訳するためにドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメンテーション
  - Intlayer
  - Express
  - JavaScript
  - バックエンド
---

# IntlayerとExpressを使用した国際化 (i18n) の開始

`express-intlayer` は、Expressアプリケーション向けの強力な国際化 (i18n) ミドルウェアであり、クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルに利用可能にします。

## なぜバックエンドを国際化するのか？

バックエンドを国際化することは、グローバルなオーディエンスに効果的にサービスを提供するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを提供できます。この機能はユーザーエクスペリエンスを向上させ、異なる言語背景を持つ人々にとってアプリケーションをよりアクセスしやすく、関連性の高いものにします。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示**: エラーが発生した際に、ユーザーの母国語でメッセージを表示することで、理解が深まり、フラストレーションが軽減されます。これは、トーストやモーダルのようなフロントエンドコンポーネントに表示される動的なエラーメッセージに特に有用です。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化により複数の言語でコンテンツを提供できます。これは、ユーザーが好む言語で商品説明や記事、その他のコンテンツを表示する必要があるeコマースサイトやコンテンツ管理システムのようなプラットフォームにとって重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。

- **多言語プッシュ通知**: モバイルアプリケーションでは、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションとリテンションを向上させることができます。このパーソナルなタッチにより、通知がより関連性が高く、行動を促すものになります。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語で行うことで明確さが向上し、全体的なユーザーエクスペリエンスが向上します。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合し、サービスを世界規模で拡大するための重要なステップとなります。

## 始めるにあたって

### インストール

`express-intlayer` を使用するには、npmを使用してパッケージをインストールします:

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

プロジェクトのルートに `intlayer.config.ts` を作成して国際化設定を構成します:

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

`express-intlayer` を使用するようにExpressアプリケーションをセットアップします:

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

`express-intlayer` は以下と完全に互換性があります:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md) (Reactアプリケーション向け)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md) (Next.jsアプリケーション向け)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md) (Viteアプリケーション向け)

また、ブラウザやAPIリクエストを含むさまざまな環境での国際化ソリューションとシームレスに動作します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを通じてロケールを検出することもできます:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 他の設定オプション
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

デフォルトでは、`express-intlayer` は `Accept-Language` ヘッダーを解釈してクライアントの好みの言語を判断します。

> 設定や高度なトピックに関する詳細は、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

### TypeScriptの設定

`express-intlayer` は、国際化プロセスを強化するためにTypeScriptの強力な機能を活用しています。TypeScriptの静的型付けにより、すべての翻訳キーが考慮され、翻訳漏れのリスクが軽減され、保守性が向上します。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

自動生成された型 (デフォルトでは ./types/intlayer.d.ts) を tsconfig.json ファイルに含めることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存のTypeScript設定
  "include": [
    // ... 既存のTypeScript設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Gitの設定

Intlayerによって生成されたファイルを無視することをお勧めします。これにより、これらのファイルをGitリポジトリにコミットするのを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加します:

```plaintext fileName=".gitignore"
# Intlayerによって生成されたファイルを無視
.intlayer
```
