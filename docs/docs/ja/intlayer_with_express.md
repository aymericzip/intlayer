---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Expressのバックエンドを翻訳する (i18n)
description: viteバックエンドを多言語化する方法を見つけましょう。国際化（i18n）して翻訳するためにドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメンテーション
  - Intlayer
  - Express
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - express
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

### コンテンツの宣言

翻訳を格納するためのコンテンツ宣言を作成および管理します:

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
        "ja": "英語で返されるコンテンツの例",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれていれば、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/get_started.md)を参照してください。

### Express アプリケーションのセットアップ

`express-intlayer` を使用するように Express アプリケーションをセットアップします:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

// ルート
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// サーバーを起動
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

// ルート
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      ja: "英語で返されるコンテンツの例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// サーバーを起動
app.listen(3000, () => console.log(`ポート3000で待機中`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t, getDictionary, getIntlayer } = require("express-intlayer");
const dictionaryExample = require("./index.content");

const app = express();

// 国際化リクエストハンドラーを読み込む
app.use(intlayer());

// ルート
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// サーバーを起動
app.listen(3000, () => console.log(`ポート3000でリッスン中`));
```

### 互換性

`express-intlayer` は以下と完全に互換性があります:

- Reactアプリケーション向けの [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.jsアプリケーション向けの [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Viteアプリケーション向けの [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)
  さまざまな環境（ブラウザやAPIリクエストを含む）で、あらゆる国際化ソリューションとシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーやクッキーからロケールを検出することも可能です：

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

デフォルトでは、`express-intlayer` は `Accept-Language` ヘッダーを解釈してクライアントの優先言語を判別します。

> 設定や高度なトピックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

### TypeScript の設定

`express-intlayer` は、TypeScript の強力な機能を活用して国際化プロセスを強化します。TypeScript の静的型付けにより、すべての翻訳キーが網羅されていることが保証され、翻訳漏れのリスクを減らし、保守性を向上させます。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成された型定義ファイル（デフォルトでは ./types/intlayer.d.ts）が tsconfig.json ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型定義を含める
  ],
}
```

### VS Code 拡張機能

Intlayer の開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 欠落している翻訳の **リアルタイムエラー検出**。
- 翻訳済みコンテンツの **インラインプレビュー**。
- 翻訳を簡単に作成・更新できる **クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Git 設定

Intlayer によって生成されたファイルは無視することを推奨します。これにより、Git リポジトリへのコミットを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加してください。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴の初期化
