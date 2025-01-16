# express-intlayer: JavaScriptパッケージでExpress.jsアプリケーションを国際化する (i18n)

**Intlayer**は、JavaScript開発者のために特別に設計されたパッケージのスイートです。React、Next.js、Express.jsなどのフレームワークと互換性があります。

**`express-intlayer`パッケージ**を使用すると、Express.jsアプリケーションの国際化が可能になります。これは、ユーザーの好ましいロケールを検出し、ユーザーに適切な辞書を返すミドルウェアを提供します。

## なぜバックエンドを国際化するのか？

バックエンドの国際化は、効果的にグローバルなオーディエンスにサービスを提供するために不可欠です。これにより、アプリケーションは各ユーザーの好ましい言語でコンテンツやメッセージを提供できます。この機能は、ユーザーエクスペリエンスを向上させ、異なる言語的背景を持つ人々にとって、アプリケーションのリーチを広げます。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラーが発生した場合、ユーザーの母国語でメッセージを表示することで理解が深まり、フラストレーションが軽減されます。これは、トーストやモーダルなどのフロントエンドコンポーネントで表示される可能性のある動的エラーメッセージに特に有用です。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、国際化によりこのコンテンツを複数の言語で提供できます。これは、ユーザーが好む言語で製品の説明、記事、その他のコンテンツを表示する必要がある、eコマースサイトやコンテンツ管理システムなどのプラットフォームにとって重要です。

- **多言語のメールを送信する**: 取引メール、マーケティングキャンペーン、通知など、受取人の言語でメールを送信することで、エンゲージメントと効果が大幅に向上します。

- **多言語のプッシュ通知**: モバイルアプリケーションにおいて、ユーザーの好ましい言語でプッシュ通知を送信することで、インタラクションと保持を強化できます。この個人的なタッチは、通知をより関連性が高く、行動を促すものに感じさせることができます。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語で行うことで明瞭さが確保され、全体のユーザーエクスペリエンスが向上します。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重し、グローバルな市場ニーズにより適合するようになり、サービスを世界中に拡大するための重要なステップとなります。

## Intlayerを統合する理由

- **型安全な環境**: TypeScriptを活用して、すべてのコンテンツ定義が正確でエラーのないことを保証します。

## インストール

好みのパッケージマネージャーを使用して必要なパッケージをインストールします。

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

Intlayerはプロジェクトを設定するための構成ファイルを提供します。このファイルをプロジェクトのルートに配置します。

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

> 利用可能なパラメータの完全なリストについては、[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)を参照してください。

## 使用例

`express-intlayer`を使用するようにExpressアプリケーションを設定します：

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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/react-intlayer/index.md) - Reactアプリケーション用
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/next-intlayer/index.md) - Next.jsアプリケーション用
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/vite-intlayer/index.md) - Viteアプリケーション用

また、さまざまな環境（ブラウザやAPIリクエスト）で動作する任意の国際化ソリューションとシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを通じてロケールを検出できます：

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

デフォルトでは、`express-intlayer`は`Accept-Language`ヘッダーを解釈して、クライアントの好ましい言語を決定します。

## `express-intlayer`パッケージが提供する関数

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ja/packages/express-intlayer/t.md)
