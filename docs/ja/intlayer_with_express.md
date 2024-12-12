# Getting Started internationalizing (i18n) with Intlayer and Express

`express-intlayer`は、クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルに利用可能にするために設計された、強力な国際化（i18n）ミドルウェアです。

## なぜバックエンドを国際化するのか？

バックエンドを国際化することは、グローバルなオーディエンスに効果的にサービスを提供するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを提供できるようになります。この機能は、ユーザーエクスペリエンスを向上させ、異なる言語的背景を持つ人々にとってよりアクセスしやすく、関連性のあるアプリケーションの範囲を広げます。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示**: エラーが発生した際に、ユーザーの母国語でメッセージを表示することで、理解が深まり、フラストレーションが軽減されます。これは、トーストやモーダルなどのフロントエンドコンポーネントで表示される可能性のある動的エラーメッセージに特に有用です。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化によりこのコンテンツを複数の言語で提供できるようになります。これは、商品説明、記事、およびユーザーが好む言語で他のコンテンツを表示する必要があるeコマースサイトやコンテンツ管理システムなどにとって重要です。

- **多言語のメール送信**: 取引メール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。

- **多言語プッシュ通知**: モバイルアプリケーションの場合、ユーザーの好みの言語でプッシュ通知を送信することにより、インタラクションと保持が向上します。このパーソナルなアプローチは、通知をより関連性の高い有効なものに感じさせます。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式の通信は、ユーザーの言語で提供されることで明確さが確保され、全体的なユーザーエクスペリエンスが向上します。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズともより良く調和し、世界中でサービスをスケールするための重要なステップとなります。

## 始める前に

### インストール

`express-intlayer`を使用するには、npmを使用してパッケージをインストールします。

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### セットアップ

プロジェクトルートに`intlayer.config.ts`を作成して、国際化設定を構成します。

```typescript
// intlayer.config.ts
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

### Expressアプリケーションのセットアップ

`express-intlayer`を使用するようにExpressアプリケーションを設定します。

```typescript
// src/index.ts
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

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Example of returned error content in English",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// サーバーを開始
app.listen(3000, () => {
  console.info(`Listening on port 3000`);
});
```

### 互換性

`express-intlayer`は以下と完全に互換性があります。

- `react-intlayer`：Reactアプリケーション向け
- `next-intlayer`：Next.jsアプリケーション向け

ブラウザやAPIリクエストを含むさまざまな環境で動作する他の国際化ソリューションともシームレスに動作します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを介してロケールを検出できます。

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // その他の設定オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

デフォルトでは、`express-intlayer`は`Accept-Language`ヘッダーを解釈してクライアントの好みの言語を決定します。

> 設定や高度なトピックに関する詳細情報は、私たちの[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/concept/configuration.md)を訪れてください。

## TypeScriptによって提供される

`express-intlayer`は、国際化プロセスを強化するためにTypeScriptの強力な機能を活用しています。TypeScriptの静的型付けは、すべての翻訳キーが考慮されていることを保証し、翻訳の欠落リスクを減らし、保守性を向上させます。

> 生成された型（デフォルトでは./types/intlayer.d.ts）は、tsconfig.jsonファイルに含めることを確認してください。
